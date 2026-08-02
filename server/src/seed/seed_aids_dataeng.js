import "dotenv/config";
import { supabase } from "../lib/supabase.js";

async function upsertBranch(code, name) {
  const { data, error } = await supabase.from("branches").upsert({ code, name }, { onConflict: "code" }).select().single();
  if (error) throw error;
  return data;
}
async function upsertRole(branchId, code, name) {
  const { data, error } = await supabase.from("roles").upsert({ branch_id: branchId, code, name }, { onConflict: "branch_id,code" }).select().single();
  if (error) throw error;
  return data;
}
async function insertTopic(roleId, level, title, description, source, sourceUrl, order) {
  const { data, error } = await supabase.from("syllabus_topics").insert({ role_id: roleId, level, title, description, source, source_url: sourceUrl, order_index: order }).select().single();
  if (error) throw error;
  return data;
}
async function insertMaterial(topicId, title, content, source, sourceUrl, license) {
  const { error } = await supabase.from("study_materials").insert({ topic_id: topicId, title, content, format: "markdown", source, source_url: sourceUrl, license });
  if (error) throw error;
}
async function insertQuestions(topicId, items) {
  const { error } = await supabase.from("questions").insert(items.map((q) => ({ topic_id: topicId, ...q })));
  if (error) throw error;
}

async function main() {
  const branch = await upsertBranch("aids", "Artificial Intelligence & Data Science");
  const role = await upsertRole(branch.id, "data-engineer", "Data Engineer");

  const t1 = await insertTopic(role.id, 1, "ETL Pipelines & Data Modeling",
    "How raw, messy data becomes something a data scientist can actually query and trust.",
    "Wikipedia - Extract, transform, load", "https://en.wikipedia.org/wiki/Extract,_transform,_load", 1);
  await insertMaterial(t1.id, "Why ETL exists and what each stage actually does",
    `Extract pulls data from source systems - production databases, APIs, log files, third-party feeds - each with different formats, update frequencies, and failure modes. The extract stage has to handle schema drift (a source adding a new field breaks nothing if the extractor is defensive) and partial failures (a source being briefly unavailable shouldn't corrupt the whole pipeline).

Transform is where raw data becomes analysis-ready: deduplication, type conversion, joining across sources, handling nulls and malformed records, and applying business logic (e.g. converting all timestamps to UTC, standardizing currency). This stage is usually where the real engineering effort goes, because source data is messier in practice than any documentation suggests - fields get repurposed over time, formats change without notice, and edge cases (a user with no email, a negative quantity) accumulate.

Load writes the transformed data into its destination - typically a data warehouse structured for fast analytical queries rather than the row-by-row transactional access patterns of the source systems it came from. This is why warehouses (columnar storage) look and perform very differently from the operational databases feeding them - operational databases optimize for fast single-row reads/writes, warehouses optimize for scanning millions of rows across few columns.

Modern pipelines increasingly favor ELT over ETL - load raw data into the warehouse first, then transform inside it using the warehouse's own compute (via SQL or tools like dbt). This defers transformation logic to a place where it's versioned, testable, and re-runnable against the same raw data, instead of being buried in an opaque pipeline script that's hard to audit or rerun.`,
    "Original notes", "", "original");
  await insertQuestions(t1.id, [
    { question: "What's the practical difference between ETL and ELT?", answer: "ETL transforms data before loading it into the warehouse, often in a separate processing layer. ELT loads raw data first and transforms it inside the warehouse using its own compute (commonly SQL/dbt), making transformations more auditable, testable, and easier to rerun against unchanged raw data.", difficulty: "Medium", source: "Common interview pattern" },
    { question: "Why do warehouses use columnar storage instead of row storage like operational databases?", answer: "Analytical queries typically scan many rows but few columns (e.g. sum of revenue across a year). Columnar storage reads only the needed columns from disk, dramatically reducing I/O compared to row storage, which would read entire rows including unneeded columns.", difficulty: "Medium", source: "Common interview pattern" },
  ]);

  const t2 = await insertTopic(role.id, 1, "Data Quality & Pipeline Reliability",
    "Why a pipeline that runs without errors can still silently produce wrong numbers.",
    "Wikipedia - Data quality", "https://en.wikipedia.org/wiki/Data_quality", 2);
  await insertMaterial(t2.id, "The difference between a pipeline that runs and a pipeline you can trust",
    `A pipeline can complete successfully - no exceptions, no failed jobs - and still be badly wrong. A source schema change that silently drops a field, a duplicate ingestion that doubles revenue numbers, a timezone mismatch that shifts every timestamp by hours - none of these throw errors, they just produce quietly incorrect output that looks completely normal until someone downstream notices the dashboard doesn't match reality.

Data quality checks catch this class of problem by validating assumptions explicitly: row counts within expected ranges, no unexpected nulls in required fields, referential integrity between related tables, and freshness checks (has this table actually been updated today, or is it silently stale). These checks run as part of the pipeline itself, failing loudly the moment an assumption breaks, rather than relying on someone eventually noticing a bad number in a report.

Idempotency matters more in data engineering than almost any other discipline: a pipeline that gets rerun (due to a retry after failure, a backfill, or manual intervention) must produce the same result as running once - not double the data. This usually means designing loads around upsert/merge logic keyed on a natural identifier, rather than blind appends that duplicate rows on rerun.

Monitoring and alerting close the loop: pipeline duration trending upward, row counts deviating from historical patterns, and data quality check failures should all trigger alerts before a stakeholder discovers the problem in a dashboard. The cost asymmetry is real - a failed alert is an annoyance; a silently wrong number that drives a business decision is a much more expensive failure.`,
    "Original notes", "", "original");
  await insertQuestions(t2.id, [
    { question: "Why is idempotency important in a data pipeline design?", answer: "Pipelines get rerun - retries, backfills, manual reruns. A non-idempotent pipeline duplicates data on rerun (e.g. appending the same rows twice); an idempotent one (using upsert/merge on a natural key) produces the same correct result regardless of how many times it runs.", difficulty: "Medium", source: "Common interview pattern" },
  ]);

  console.log("Seeded AIDS / Data Engineer: 2 topics.");
}

main().catch((e) => { console.error("Seed failed:", e.message); process.exit(1); });
