import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

export interface StudyGroup {
  id: string;
  name: string;
  topic: string;
  description: string;
  icon: string;
  color: string;
  created_by: string | null;
  member_count: number;
  is_member: boolean;
  is_owner: boolean;
}

export interface CommunityEvent {
  id: string;
  title: string;
  speaker: string;
  type: string;
  event_time: string;
  created_by: string | null;
  attendee_count: number;
  is_rsvpd: boolean;
  is_owner: boolean;
  is_past: boolean;
}

export interface CreateGroupInput {
  name: string;
  topic: string;
  description: string;
}

export interface CreateEventInput {
  title: string;
  speaker: string;
  type: string;
  event_time: string; // ISO string
}

export function useCommunityHub() {
  const [userId, setUserId] = useState<string | null>(null);
  const [groups, setGroups] = useState<StudyGroup[]>([]);
  const [events, setEvents] = useState<CommunityEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  // Get the current user ID directly from Supabase auth
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
      const now = new Date().toISOString();

      const [groupsRes, membersRes, eventsRes, rsvpsRes] = await Promise.all([
        supabase.from("study_groups").select("*").order("created_at"),
        supabase.from("study_group_members").select("group_id, user_id"),
        // Only fetch events that haven't ended yet (auto-expiry)
        supabase.from("community_events").select("*").gte("event_time", new Date(Date.now() - 60 * 60 * 1000).toISOString()).order("event_time"),
        supabase.from("event_rsvps").select("event_id, user_id"),
      ]);

      const members = membersRes.data || [];
      const rsvps = rsvpsRes.data || [];
      const nowTime = Date.now();

      // De-duplicate groups by id
      const seen = new Set<string>();
      const uniqueGroups = (groupsRes.data || []).filter((g) => {
        if (seen.has(g.id)) return false;
        seen.add(g.id);
        return true;
      });

      // De-duplicate events by id
      const seenE = new Set<string>();
      const uniqueEvents = (eventsRes.data || []).filter((e) => {
        if (seenE.has(e.id)) return false;
        seenE.add(e.id);
        return true;
      });

      const enrichedGroups: StudyGroup[] = uniqueGroups.map((g) => ({
        ...g,
        member_count: members.filter((m) => m.group_id === g.id).length,
        is_member: !!uid && members.some((m) => m.group_id === g.id && m.user_id === uid),
        is_owner: !!uid && g.created_by === uid,
      }));

      const enrichedEvents: CommunityEvent[] = uniqueEvents.map((e) => ({
        ...e,
        attendee_count: rsvps.filter((r) => r.event_id === e.id).length,
        is_rsvpd: !!uid && rsvps.some((r) => r.event_id === e.id && r.user_id === uid),
        is_owner: !!uid && e.created_by === uid,
        is_past: new Date(e.event_time).getTime() < nowTime,
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

    const channel = supabase
      .channel("community-hub-changes")
      .on("postgres_changes", { event: "*", schema: "public", table: "study_group_members" }, () => loadData(userId))
      .on("postgres_changes", { event: "*", schema: "public", table: "event_rsvps" }, () => loadData(userId))
      .on("postgres_changes", { event: "*", schema: "public", table: "study_groups" }, () => loadData(userId))
      .on("postgres_changes", { event: "*", schema: "public", table: "community_events" }, () => loadData(userId))
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  const toggleGroupMembership = async (groupId: string, isMember: boolean) => {
    if (!userId) { alert("Please sign in to join a study group!"); return; }
    setGroups((prev) => prev.map((g) =>
      g.id === groupId ? { ...g, is_member: !isMember, member_count: g.member_count + (isMember ? -1 : 1) } : g
    ));
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
      loadData(userId);
    }
  };

  const toggleEventRsvp = async (eventId: string, isRsvpd: boolean) => {
    if (!userId) { alert("Please sign in to RSVP to an event!"); return; }
    setEvents((prev) => prev.map((e) =>
      e.id === eventId ? { ...e, is_rsvpd: !isRsvpd, attendee_count: e.attendee_count + (isRsvpd ? -1 : 1) } : e
    ));
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
      loadData(userId);
    }
  };

  const createGroup = async (input: CreateGroupInput) => {
    if (!userId) { alert("Please sign in to create a group!"); return false; }
    if (!input.name.trim() || !input.topic.trim()) return false;
    setActionLoading(true);
    try {
      const { error } = await supabase.from("study_groups").insert({
        name: input.name.trim(),
        topic: input.topic.trim(),
        description: input.description.trim() || "A new study group.",
        icon: "users",
        color: "blue",
        created_by: userId,
      });
      if (error) throw error;
      await loadData(userId);
      return true;
    } catch (err) {
      console.error("Failed to create group:", err);
      return false;
    } finally {
      setActionLoading(false);
    }
  };

  const deleteGroup = async (groupId: string) => {
    if (!userId) return;
    setGroups((prev) => prev.filter((g) => g.id !== groupId));
    try {
      const { error } = await supabase.from("study_groups").delete().eq("id", groupId).eq("created_by", userId);
      if (error) throw error;
    } catch (err) {
      console.error("Failed to delete group:", err);
      loadData(userId);
    }
  };

  const createEvent = async (input: CreateEventInput) => {
    if (!userId) { alert("Please sign in to create an event!"); return false; }
    if (!input.title.trim() || !input.event_time) return false;
    setActionLoading(true);
    try {
      const { error } = await supabase.from("community_events").insert({
        title: input.title.trim(),
        speaker: input.speaker.trim() || "Community",
        type: input.type || "Event",
        event_time: input.event_time,
        created_by: userId,
      });
      if (error) throw error;
      await loadData(userId);
      return true;
    } catch (err) {
      console.error("Failed to create event:", err);
      return false;
    } finally {
      setActionLoading(false);
    }
  };

  const deleteEvent = async (eventId: string) => {
    if (!userId) return;
    setEvents((prev) => prev.filter((e) => e.id !== eventId));
    try {
      const { error } = await supabase.from("community_events").delete().eq("id", eventId).eq("created_by", userId);
      if (error) throw error;
    } catch (err) {
      console.error("Failed to delete event:", err);
      loadData(userId);
    }
  };

  return {
    groups, events, loading, actionLoading, userId,
    toggleGroupMembership, toggleEventRsvp,
    createGroup, deleteGroup,
    createEvent, deleteEvent,
  };
}
