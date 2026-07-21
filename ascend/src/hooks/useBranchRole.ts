import { useEffect, useState, useCallback } from "react";
import { supabase } from "../lib/supabase";

import { AIML_SYLLABUS } from "../data/aiml/syllabus";
import { AIML_HR_QUESTIONS } from "../data/aiml/hrQuestions";
import { AIML_MOCK_INTERVIEW } from "../data/aiml/mockInterviewBank";

import { CSE_SYLLABUS } from "../data/cse/syllabus";
import { CSE_HR_QUESTIONS } from "../data/cse/hrQuestions";
import { CSE_MOCK_INTERVIEW } from "../data/cse/mockInterviewBank";

import { IT_SYLLABUS } from "../data/it/syllabus";
import { IT_HR_QUESTIONS } from "../data/it/hrQuestions";
import { IT_MOCK_INTERVIEW } from "../data/it/mockInterviewBank";

import { AIDS_SYLLABUS } from "../data/aids/syllabus";
import { AIDS_HR_QUESTIONS } from "../data/aids/hrQuestions";
import { AIDS_MOCK_INTERVIEW } from "../data/aids/mockInterviewBank";

import { ECE_SYLLABUS } from "../data/ece/syllabus";
import { ECE_HR_QUESTIONS } from "../data/ece/hrQuestions";
import { ECE_MOCK_INTERVIEW } from "../data/ece/mockInterviewBank";

import { EEE_SYLLABUS } from "../data/eee/syllabus";
import { EEE_HR_QUESTIONS } from "../data/eee/hrQuestions";
import { EEE_MOCK_INTERVIEW } from "../data/eee/mockInterviewBank";

import { MECH_SYLLABUS } from "../data/mech/syllabus";
import { MECH_HR_QUESTIONS } from "../data/mech/hrQuestions";
import { MECH_MOCK_INTERVIEW } from "../data/mech/mockInterviewBank";

// Static fallback so the branch/role picker and syllabus render
// immediately even before Supabase is seeded, and never breaks if
// a network call fails. Once the supabase_seed_*.sql files have
// been run, live Supabase rows are used instead.
const STATIC_FALLBACK: Record<string, { syllabus: any; hr: any; mock: any }> = {
  aiml: { syllabus: AIML_SYLLABUS, hr: AIML_HR_QUESTIONS, mock: AIML_MOCK_INTERVIEW },
  cse:  { syllabus: CSE_SYLLABUS,  hr: CSE_HR_QUESTIONS,  mock: CSE_MOCK_INTERVIEW },
  it:   { syllabus: IT_SYLLABUS,   hr: IT_HR_QUESTIONS,   mock: IT_MOCK_INTERVIEW },
  aids: { syllabus: AIDS_SYLLABUS, hr: AIDS_HR_QUESTIONS, mock: AIDS_MOCK_INTERVIEW },
  ece:  { syllabus: ECE_SYLLABUS,  hr: ECE_HR_QUESTIONS,  mock: ECE_MOCK_INTERVIEW },
  eee:  { syllabus: EEE_SYLLABUS,  hr: EEE_HR_QUESTIONS,  mock: EEE_MOCK_INTERVIEW },
  mech: { syllabus: MECH_SYLLABUS, hr: MECH_HR_QUESTIONS, mock: MECH_MOCK_INTERVIEW },
};

export function useBranchRole(userId: string | null) {
  const [branchId, setBranchId] = useState<string | null>(null);
  const [roleId, setRoleId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) { setLoading(false); return; }
    (async () => {
      const { data } = await supabase
        .from("user_role_selection")
        .select("branch_id, role_id")
        .eq("user_id", userId)
        .maybeSingle();
      if (data) { setBranchId(data.branch_id); setRoleId(data.role_id); }
      setLoading(false);
    })();
  }, [userId]);

  const selectRole = useCallback(async (branch: string, role: string) => {
    setBranchId(branch); setRoleId(role);
    if (!userId) return;
    await supabase.from("user_role_selection").upsert({
      user_id: userId, branch_id: branch, role_id: role, selected_at: new Date().toISOString(),
    });
  }, [userId]);

  return { branchId, roleId, loading, selectRole };
}

export function useRoleContent(branchId: string | null, roleId: string | null) {
  const [syllabus, setSyllabus] = useState<any[] | null>(null);
  const [hrQuestions, setHrQuestions] = useState<any[] | null>(null);
  const [mockQuestions, setMockQuestions] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!branchId || !roleId) return;
    setLoading(true);
    (async () => {
      try {
        const [{ data: levels }, { data: hrq }, { data: mockq }] = await Promise.all([
          supabase.from("syllabus_levels").select("*, syllabus_items(*)").eq("role_id", roleId).order("level_number"),
          supabase.from("hr_questions").select("*").eq("role_id", roleId),
          supabase.from("mock_interview_questions").select("*").eq("role_id", roleId),
        ]);
        setSyllabus(levels && levels.length ? levels : STATIC_FALLBACK[branchId]?.syllabus?.[roleId] ?? null);
        setHrQuestions(hrq && hrq.length ? hrq : STATIC_FALLBACK[branchId]?.hr?.[roleId] ?? null);
        setMockQuestions(mockq && mockq.length ? mockq : STATIC_FALLBACK[branchId]?.mock?.[roleId] ?? null);
      } catch {
        // Supabase not reachable / tables not seeded yet — fall back to static data
        setSyllabus(STATIC_FALLBACK[branchId]?.syllabus?.[roleId] ?? null);
        setHrQuestions(STATIC_FALLBACK[branchId]?.hr?.[roleId] ?? null);
        setMockQuestions(STATIC_FALLBACK[branchId]?.mock?.[roleId] ?? null);
      } finally {
        setLoading(false);
      }
    })();
  }, [branchId, roleId]);

  return { syllabus, hrQuestions, mockQuestions, loading };
}
