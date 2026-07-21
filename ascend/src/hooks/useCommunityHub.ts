import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { useAuth } from "../context/AuthContext";

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
  const { profile } = useAuth();
  const [groups, setGroups] = useState<StudyGroup[]>([]);
  const [events, setEvents] = useState<CommunityEvent[]>([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
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

      const enrichedGroups: StudyGroup[] = (groupsRes.data || []).map((g) => ({
        ...g,
        member_count: members.filter((m) => m.group_id === g.id).length,
        is_member: !!profile && members.some((m) => m.group_id === g.id && m.user_id === profile.id),
      }));

      const enrichedEvents: CommunityEvent[] = (eventsRes.data || []).map((e) => ({
        ...e,
        attendee_count: rsvps.filter((r) => r.event_id === e.id).length,
        is_rsvpd: !!profile && rsvps.some((r) => r.event_id === e.id && r.user_id === profile.id),
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
    loadData();

    // Subscribe to real-time changes on members and rsvps tables
    const memberChannel = supabase
      .channel("community-members")
      .on("postgres_changes", { event: "*", schema: "public", table: "study_group_members" }, () => loadData())
      .on("postgres_changes", { event: "*", schema: "public", table: "event_rsvps" }, () => loadData())
      .subscribe();

    return () => {
      supabase.removeChannel(memberChannel);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile?.id]);

  const toggleGroupMembership = async (groupId: string, isMember: boolean) => {
    if (!profile) return;

    // Optimistic update
    setGroups((prev) =>
      prev.map((g) =>
        g.id === groupId
          ? { ...g, is_member: !isMember, member_count: g.member_count + (isMember ? -1 : 1) }
          : g
      )
    );

    try {
      if (isMember) {
        await supabase.from("study_group_members").delete().eq("group_id", groupId).eq("user_id", profile.id);
      } else {
        await supabase.from("study_group_members").insert({ group_id: groupId, user_id: profile.id });
      }
    } catch (err) {
      console.error("Failed to toggle group membership:", err);
      loadData(); // Revert by reloading
    }
  };

  const toggleEventRsvp = async (eventId: string, isRsvpd: boolean) => {
    if (!profile) return;

    // Optimistic update
    setEvents((prev) =>
      prev.map((e) =>
        e.id === eventId
          ? { ...e, is_rsvpd: !isRsvpd, attendee_count: e.attendee_count + (isRsvpd ? -1 : 1) }
          : e
      )
    );

    try {
      if (isRsvpd) {
        await supabase.from("event_rsvps").delete().eq("event_id", eventId).eq("user_id", profile.id);
      } else {
        await supabase.from("event_rsvps").insert({ event_id: eventId, user_id: profile.id });
      }
    } catch (err) {
      console.error("Failed to toggle event RSVP:", err);
      loadData(); // Revert by reloading
    }
  };

  return { groups, events, loading, toggleGroupMembership, toggleEventRsvp };
}
