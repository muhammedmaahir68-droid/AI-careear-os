import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { getPlacementReadinessScore } from "../lib/ai";
import { useAuth } from "../context/AuthContext";

export interface ReadinessHistoryRow {
  id: string;
  score: number;
  recommendation: string;
  calculated_at: string;
}

export function usePlacementReadiness() {
  const { profile } = useAuth();
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(true);
  const [history, setHistory] = useState<ReadinessHistoryRow[]>([]);
  const [calculating, setCalculating] = useState(false);

  useEffect(() => {
    if (!profile) {
      setCheckedItems({});
      setHistory([]);
      setLoading(false);
      return;
    }

    const loadData = async () => {
      setLoading(true);
      try {
        const [checklistRes, historyRes] = await Promise.all([
          supabase.from("placement_checklist").select("item_id, completed").eq("user_id", profile.id),
          supabase.from("placement_readiness_history").select("*").eq("user_id", profile.id).order("calculated_at", { ascending: false })
        ]);

        if (checklistRes.data) {
          const map: Record<string, boolean> = {};
          checklistRes.data.forEach(row => {
            map[row.item_id] = row.completed;
          });
          setCheckedItems(map);
        }

        if (historyRes.data) {
          setHistory(historyRes.data as ReadinessHistoryRow[]);
        }
      } catch (err) {
        console.error("Failed to load placement readiness data:", err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [profile]);

  const toggleItem = async (itemId: string, currentStatus: boolean) => {
    if (!profile) return;
    const newStatus = !currentStatus;
    
    // Optimistic UI update
    setCheckedItems(prev => ({ ...prev, [itemId]: newStatus }));

    try {
      const { error } = await supabase.from("placement_checklist").upsert({
        user_id: profile.id,
        item_id: itemId,
        completed: newStatus,
        updated_at: new Date().toISOString()
      }, { onConflict: "user_id,item_id" });

      if (error) throw error;
    } catch (err) {
      console.error("Failed to toggle item:", err);
      // Revert optimistic update on error
      setCheckedItems(prev => ({ ...prev, [itemId]: currentStatus }));
    }
  };

  const calculateScore = async (totalItems: number) => {
    if (!profile || calculating) return;
    setCalculating(true);

    try {
      const completedCount = Object.values(checkedItems).filter(Boolean).length;
      const checklistProgress = totalItems > 0 ? (completedCount / totalItems) * 100 : 0;
      
      const xp = profile.xp || 0;
      // Synthesize skill breakdown from XP matching the Dashboard logic
      const scores = {
        Aptitude: Math.min(100, Math.floor(xp / 10)),
        Coding: Math.min(100, Math.floor(xp / 15)),
        SQL: Math.min(100, Math.floor(xp / 20)),
        Communication: Math.min(100, Math.floor(xp / 25)),
        DSA: Math.min(100, Math.floor(xp / 30)),
        Interview: Math.min(100, Math.floor(xp / 40))
      };

      const result = await getPlacementReadinessScore({
        checklistProgress,
        xp,
        completedModules: profile.completed_modules || 0,
        streak: profile.streak || 0,
        scores
      });

      // Save to Supabase
      const { data, error } = await supabase.from("placement_readiness_history").insert({
        user_id: profile.id,
        score: result.score,
        recommendation: result.recommendation,
        calculated_at: new Date().toISOString()
      }).select().single();

      if (error) throw error;

      if (data) {
        setHistory(prev => [data as ReadinessHistoryRow, ...prev]);
      }
    } catch (err) {
      console.error("Failed to calculate readiness score:", err);
    } finally {
      setCalculating(false);
    }
  };

  return {
    checkedItems,
    history,
    loading,
    calculating,
    toggleItem,
    calculateScore
  };
}
