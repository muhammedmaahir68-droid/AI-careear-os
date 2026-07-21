// src/hooks/useModules.ts

import { useEffect, useState } from "react";
import { supabase } from "../lib/api";
import type { Module } from "../types";

/** Hook to fetch all modules (public) */
export function useModules() {
  const [modules, setModules] = useState<Module[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchModules = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase.from<Module>("modules").select("*");
        if (error) throw error;
        setModules(data as Module[]);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };
    fetchModules();
  }, []);

  return { modules, loading, error };
}
