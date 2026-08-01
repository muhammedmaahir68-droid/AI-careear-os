// Third pilot seed: IT branch, QA / Software Testing role.
// Same pattern as seed_cse_sde.js and seed_ece_embedded.js.
//
// Run with: node src/seed/seed_it_qa.js

import "dotenv/config";
import { supabase } from "../lib/supabase.js";

async function upsertBranch(code, name) {
  const { data, error } = await supabase
    .from("branches").upsert({ code, name }, { onConflict: "code" }).select().single();
  if (error) throw error;
  return data;
}
async function upsertRole(branchId, code, name) {
  const { data, error } = await supabase
    .from("roles").upsert({ branch_id: branchId, code, name }, { onConflict: "branch_id,code" }).select().single();
  if (error) throw error;
  return data;
}
async function insertTopic(roleId, level, title, description, source, sourceUrl, order) {
  const { data, error } = await supabase
    .from("syllabus_topics")
    .insert({ role_id: roleId, level, title, description, source, source_url: sourceUrl, order_index: order })
    .select().single();
  if (error) throw error;
  return data;
}
async function insertMaterial(topicId, title, content, source, sourceUrl, license) {
  const { error } = await supabase.from("study_materials").insert({
    topic_id: topicId, title, content, format: "markdown", source, source_url: sourceUrl, license,
  });
  if (error) throw error;
}
async function insertQuestions(topicId, items) {
  const rows = items.map((q) => ({ topic_id: topicId, ...q }));
  const { error } = await supabase.from("questions").insert(rows);
  if (error) throw error;
}

async function main() {
  const branch = await upsertBranch("it", "Information Technology");
  const role = await upsertRole(branch.id, "qa", "QA / Software Testing Engineer");

  const t1 = await insertTopic(
    role.id, 1,
    "Manual Testing Foundations",
    "Test case design, defect lifecycle, and the thinking behind finding bugs before users do.",
    "Wikipedia - Software testing",
    "https://en.wikipedia.org/wiki/Software_testing",
    1
  );
  await insertMaterial(
    t1.id,
    "Why test cases are written before the bug is found, not after",
    `Good testing isn't randomly clicking around an app - it's a structured attempt to break assumptions the developer made. A test case captures one specific assumption: given this input and this state, the system should produce this output. Writing it down before you run it forces you to be precise about what "correct" means, which is exactly the step people skip when they just "try the app and see."

Test case design techniques exist because exhaustive testing is impossible - you can't test every input. Equivalence partitioning groups inputs that should behave the same way (e.g. all valid email formats) so you test one representative from each group instead of every possible email. Boundary value analysis focuses on the edges of those groups, because bugs cluster at boundaries - a form accepting ages 18-65 is far more likely to break at exactly 17, 18, 65, and 66 than at 40.

The defect lifecycle matters because a bug you found and reported isn't the same as a bug that's fixed. New -> Assigned -> In Progress -> Fixed -> Retest -> Closed (or Reopened if the retest fails) is the actual workflow, and the retest step is where testers most often get sloppy - verifying a fix means re-running the original failing case, not just checking the code changed.

Positive testing confirms the system does what it should with valid input. Negative testing confirms the system correctly rejects or handles invalid input - and negative testing is where most real-world bugs live, because developers naturally build for the happy path and forget the malformed one.`,
    "Original notes",
    "",
    "original"
  );
  await insertQuestions(t1.id, [
    { question: "What's the difference between a test case and a test scenario?", answer: "A test scenario is a high-level idea of what to test ('verify login works'). A test case is the specific, detailed execution of that scenario with exact steps, input data, and expected result.", difficulty: "Easy", source: "Common interview pattern" },
    { question: "Why is boundary value analysis more effective than random testing?", answer: "Defects cluster at the edges of valid ranges because that's where off-by-one errors and incorrect comparison operators (< vs <=) actually occur. Testing boundaries targets where bugs statistically live instead of spreading effort evenly across all possible inputs.", difficulty: "Medium", source: "Common interview pattern" },
  ]);

  const t2 = await insertTopic(
    role.id, 1,
    "Automation Testing with Selenium",
    "Moving from manual clicking to scripted, repeatable browser tests.",
    "Wikipedia - Selenium (software)",
    "https://en.wikipedia.org/wiki/Selenium_(software)",
    2
  );
  await insertMaterial(
    t2.id,
    "What automation actually buys you (and what it doesn't)",
    `Automation doesn't replace manual testing - it replaces the specific manual testing that's repetitive and stable. A regression suite that re-verifies "login still works" after every deploy is a perfect automation candidate: the steps never change, and running it by hand 50 times a month is wasted human attention. Exploratory testing - actually probing a new feature for unexpected behavior - is a poor automation candidate because the whole point is discovering things you didn't already know to check for.

Selenium WebDriver controls a real browser programmatically: it finds elements (by ID, CSS selector, XPath), performs actions (click, type, wait), and asserts on the result. The single most common cause of flaky automated tests isn't Selenium itself - it's timing. A script that clicks a button before the page finished loading fails inconsistently, which is why explicit waits (wait until this element is clickable) are the standard, not implicit sleeps (wait 3 seconds and hope).

The Page Object Model pattern exists because raw Selenium scripts get unmaintainable fast: every UI change breaks every test that touches that element. POM centralizes each page's elements and actions into one class, so a UI change means updating one file, not fifty test scripts.

A test pyramid framing is worth internalizing: many fast unit tests at the bottom, fewer integration tests in the middle, and a small number of slow, expensive end-to-end UI tests (Selenium territory) at the top. Teams that invert this - mostly UI automation, few unit tests - end up with slow, brittle test suites that people learn to ignore when they fail.`,
    "Original notes",
    "",
    "original"
  );
  await insertQuestions(t2.id, [
    { question: "Why do Selenium tests fail intermittently even when the app hasn't changed?", answer: "Usually timing - the script tries to interact with an element before the page or an async action has finished loading. Explicit waits tied to actual element state fix this; fixed sleep() calls just mask it inconsistently.", difficulty: "Medium", source: "Common interview pattern" },
    { question: "What problem does the Page Object Model solve?", answer: "It centralizes element locators and page actions into one class per page, so a UI change requires updating one place instead of every test script that references that element.", difficulty: "Medium", source: "Common interview pattern" },
  ]);

  console.log("Seeded IT / QA: 2 topics, 2 materials, 4 questions.");
}

main().catch((err) => {
  console.error("Seed failed:", err.message);
  process.exit(1);
});
