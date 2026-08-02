import { Router } from "express";
import { supabase } from "../lib/supabase.js";

const router = Router();

// GET /api/search?q=recursion&type=all|topics|materials|questions&limit=20
router.get("/", async (req, res) => {
  const { q, type = "all", limit = "20" } = req.query;

  if (!q || String(q).trim().length < 2) {
    return res.status(400).json({ error: "Query param 'q' must be at least 2 characters" });
  }

  const searchQuery = String(q).trim().split(/\s+/).join(" & ");
  const take = Math.min(parseInt(limit, 10) || 20, 50);

  const results = {};

  try {
    if (type === "all" || type === "topics") {
      const { data, error } = await supabase
        .from("syllabus_topics")
        .select("id, title, description, level, role_id, source, source_url")
        .textSearch("search_vector", searchQuery, { type: "websearch" })
        .limit(take);
      if (error) throw error;
      results.topics = data;
    }

    if (type === "all" || type === "materials") {
      const { data, error } = await supabase
        .from("study_materials")
        .select("id, title, topic_id, source, source_url, license")
        .textSearch("search_vector", searchQuery, { type: "websearch" })
        .limit(take);
      if (error) throw error;
      results.materials = data;
    }

    if (type === "all" || type === "questions") {
      const { data, error } = await supabase
        .from("questions")
        .select("id, question, difficulty, topic_id, company_id")
        .textSearch("search_vector", searchQuery, { type: "websearch" })
        .limit(take);
      if (error) throw error;
      results.questions = data;
    }

    res.json({ query: q, results });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
