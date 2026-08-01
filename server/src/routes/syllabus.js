import { Router } from "express";
import { supabase } from "../lib/supabase.js";

const router = Router();

// GET /api/syllabus/:branchCode/:roleCode
// Returns the full leveled syllabus tree for a role, with nested topics.
router.get("/:branchCode/:roleCode", async (req, res) => {
  const { branchCode, roleCode } = req.params;

  const { data: role, error: roleErr } = await supabase
    .from("roles")
    .select("id, name, code, branch:branches!inner(code)")
    .eq("code", roleCode)
    .eq("branches.code", branchCode)
    .single();

  if (roleErr || !role) {
    return res.status(404).json({ error: "Branch or role not found" });
  }

  const { data: topics, error: topicsErr } = await supabase
    .from("syllabus_topics")
    .select("id, level, parent_id, title, description, source, source_url")
    .eq("role_id", role.id)
    .order("level", { ascending: true });

  if (topicsErr) {
    return res.status(500).json({ error: topicsErr.message });
  }

  res.json({ role: role.name, topics });
});

// GET /api/syllabus/topic/:topicId/materials
// Returns study notes attached to a topic.
router.get("/topic/:topicId/materials", async (req, res) => {
  const { topicId } = req.params;

  const { data, error } = await supabase
    .from("study_materials")
    .select("id, title, content, format, source, source_url, license")
    .eq("topic_id", topicId);

  if (error) return res.status(500).json({ error: error.message });
  res.json({ materials: data });
});

// GET /api/syllabus/topic/:topicId/questions
router.get("/topic/:topicId/questions", async (req, res) => {
  const { topicId } = req.params;

  const { data, error } = await supabase
    .from("questions")
    .select("id, question, answer, difficulty, source")
    .eq("topic_id", topicId);

  if (error) return res.status(500).json({ error: error.message });
  res.json({ questions: data });
});

export default router;
