import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

export interface StudyGroup {
  id: string;
  name: string;
  topic: string;
  description: string;
  icon: string;
  color: string;
  member_count: number;
  is_member: boolean;
}

export interface CommunityEvent {
  id: string;
  title: string;
  speaker: string;
  type: string;
  event_time: string;
  attendee_count: number;
  is_rsvpd: boolean;
}

export function useCommunityHub() {
  const [userId, setUserId] = useState<string | null>(null);
  const [groups, setGroups] = useState<StudyGroup[]>([]);
  const [events, setEvents] = useState<CommunityEvent[]>([]);
  const [loading, setLoading] = useState(true);

  // Get the current user ID directly from Supabase auth — works even if 'profiles' row is missing
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUserId(data.user?.id ?? null);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => {
      setUserId(session?.user?.id ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  const loadData = async (uid: string | null) => {
    setLoading(true);
    try {
      const [groupsRes, membersRes, eventsRes, rsvpsRes] = await Promise.all([
        supabase.from("study_groups").select("*").order("created_at"),
        supabase.from("study_group_members").select("group_id, user_id"),
        supabase.from("community_events").select("*").order("event_time"),
        supabase.from("event_rsvps").select("event_id, user_id"),
      ]);

      const members = membersRes.data || [];
      const rsvps = rsvpsRes.data || [];

      // De-duplicate groups by id (guard against duplicate seed inserts)
      const rawGroups = groupsRes.data || [];
      const seen = new Set<string>();
      const uniqueGroups = rawGroups.filter((g) => {
        if (seen.has(g.id)) return false;
        seen.add(g.id);
        return true;
      });

      // De-duplicate events by id
      const rawEvents = eventsRes.data || [];
      const seenE = new Set<string>();
      const uniqueEvents = rawEvents.filter((e) => {
        if (seenE.has(e.id)) return false;
        seenE.add(e.id);
        return true;
      });

      const enrichedGroups: StudyGroup[] = uniqueGroups.map((g) => ({
        ...g,
        member_count: members.filter((m) => m.group_id === g.id).length,
        is_member: !!uid && members.some((m) => m.group_id === g.id && m.user_id === uid),
      }));

      const enrichedEvents: CommunityEvent[] = uniqueEvents.map((e) => ({
        ...e,
        attendee_count: rsvps.filter((r) => r.event_id === e.id).length,
        is_rsvpd: !!uid && rsvps.some((r) => r.event_id === e.id && r.user_id === uid),
      }));

      setGroups(enrichedGroups);
      setEvents(enrichedEvents);
    } catch (err) {
      console.error("Failed to load community data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData(userId);

    // Subscribe to real-time changes so counts update live across all users
    const channel = supabase
      .channel("community-hub-changes")
      .on("postgres_changes", { event: "*", schema: "public", table: "study_group_members" }, () => loadData(userId))
      .on("postgres_changes", { event: "*", schema: "public", table: "event_rsvps" }, () => loadData(userId))
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  const toggleGroupMembership = async (groupId: string, isMember: boolean) => {
    if (!userId) {
      alert("Please sign in to join a study group!");
      return;
    }

    // Optimistic UI update — instant feel
    setGroups((prev) =>
      prev.map((g) =>
        g.id === groupId
          ? { ...g, is_member: !isMember, member_count: g.member_count + (isMember ? -1 : 1) }
          : g
      )
    );

    try {
      if (isMember) {
        const { error } = await supabase.from("study_group_members").delete().eq("group_id", groupId).eq("user_id", userId);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("study_group_members").insert({ group_id: groupId, user_id: userId });
        if (error) throw error;
      }
    } catch (err) {
      console.error("Failed to toggle group membership:", err);
      loadData(userId); // Revert optimistic update
    }
  };

  const toggleEventRsvp = async (eventId: string, isRsvpd: boolean) => {
    if (!userId) {
      alert("Please sign in to RSVP to an event!");
      return;
    }

    // Optimistic UI update — instant feel
    setEvents((prev) =>
      prev.map((e) =>
        e.id === eventId
          ? { ...e, is_rsvpd: !isRsvpd, attendee_count: e.attendee_count + (isRsvpd ? -1 : 1) }
          : e
      )
    );

    try {
      if (isRsvpd) {
        const { error } = await supabase.from("event_rsvps").delete().eq("event_id", eventId).eq("user_id", userId);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("event_rsvps").insert({ event_id: eventId, user_id: userId });
        if (error) throw error;
      }
    } catch (err) {
      console.error("Failed to toggle event RSVP:", err);
      loadData(userId); // Revert optimistic update
    }
  };

  return { groups, events, loading, userId, toggleGroupMembership, toggleEventRsvp };
}
