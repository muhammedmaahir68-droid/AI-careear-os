import { Router } from "express";
import { supabase } from "../lib/supabase.js";

const router = Router();

// GET /api/companies/:branchCode
router.get("/:branchCode", async (req, res) => {
  const { branchCode } = req.params;

  const { data, error } = await supabase
    .from("companies")
    .select("id, name, logo, difficulty, avg_package, rounds, branch:branches!inner(code)")
    .eq("branches.code", branchCode);

  if (error) return res.status(500).json({ error: error.message });
  res.json({ companies: data });
});

// GET /api/companies/detail/:companyId
router.get("/detail/:companyId", async (req, res) => {
  const { companyId } = req.params;

  const { data: company, error: companyErr } = await supabase
    .from("companies")
    .select("*")
    .eq("id", companyId)
    .single();

  if (companyErr || !company) {
    return res.status(404).json({ error: "Company not found" });
  }

  const { data: questions, error: qErr } = await supabase
    .from("questions")
    .select("id, question, answer, difficulty, source")
    .eq("company_id", companyId);

  if (qErr) return res.status(500).json({ error: qErr.message });

  res.json({ company, questions });
});

export default router;
