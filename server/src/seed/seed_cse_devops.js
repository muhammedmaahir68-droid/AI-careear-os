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
  const branch = await upsertBranch("cse", "Computer Science Engineering");
  const role = await upsertRole(branch.id, "devops", "DevOps Engineer");

  const t1 = await insertTopic(role.id, 1, "CI/CD Pipelines",
    "Turning 'it works on my machine' into a repeatable, automated path to production.",
    "Wikipedia - CI/CD", "https://en.wikipedia.org/wiki/CI/CD", 1);
  await insertMaterial(t1.id, "Why CI and CD are separate concepts that solve different problems",
    `Continuous Integration means every code change is automatically built and tested the moment it's pushed - the goal is catching integration problems (two developers' changes conflicting, a change breaking an existing test) within minutes, not days later when someone else tries to build on top of broken code. The core discipline CI enforces is that main branch always stays in a working, deployable state.

Continuous Delivery extends this by automatically preparing every passing build for release - packaged, versioned, ready to deploy - but a human still decides when to actually deploy it. Continuous Deployment goes one step further and deploys automatically the moment a build passes all checks, with no human gate at all. The distinction matters: CD (delivery) is common even in cautious organizations; full continuous deployment requires real confidence in test coverage and rollback mechanisms.

A pipeline typically runs: lint/static analysis, unit tests, build artifact creation, integration tests, then deployment stages (often dev -> staging -> production, each with its own gate). Failing fast matters - catching a lint error in 30 seconds is far cheaper than discovering the same issue after a 20-minute integration test suite finishes.

Rollback strategy is what separates a mature pipeline from a risky one: blue-green deployment keeps two identical environments and switches traffic between them instantly if the new version has problems; canary deployment routes a small percentage of traffic to the new version first, catching problems before they affect everyone. Both let a bad deploy be undone in seconds instead of requiring an emergency fix under pressure.`,
    "Original notes", "", "original");
  await insertQuestions(t1.id, [
    { question: "What's the practical difference between Continuous Delivery and Continuous Deployment?", answer: "Continuous Delivery automatically prepares every passing build for release but requires a human to trigger the actual deployment. Continuous Deployment removes that human gate entirely - passing all checks means it deploys automatically.", difficulty: "Easy", source: "Common interview pattern" },
    { question: "Why use canary deployment instead of deploying a new version to 100% of traffic at once?", answer: "Canary deployment routes a small percentage of traffic to the new version first, limiting the blast radius if there's a problem. Issues are caught while affecting a small fraction of users, before the rollout continues to everyone.", difficulty: "Medium", source: "Common interview pattern" },
  ]);

  const t2 = await insertTopic(role.id, 1, "Containers & Orchestration",
    "Why Docker and Kubernetes exist, and what problem each one actually solves.",
    "Wikipedia - Docker (software)", "https://en.wikipedia.org/wiki/Docker_(software)", 2);
  await insertMaterial(t2.id, "The problem containers solve, and the problem Kubernetes solves on top of that",
    `A container packages an application with everything it needs to run - dependencies, runtime, configuration - into one portable unit that behaves identically whether it runs on a developer's laptop, a test server, or production. This solves the "works on my machine" class of problem directly: the container is the machine, in a sense, so environment inconsistency stops being the cause of bugs.

Containers share the host OS kernel (unlike virtual machines, which each run a full separate OS), making them far lighter and faster to start - this is why you can run dozens of containers on hardware that might only comfortably run a handful of VMs.

Once you have more than a few containers running across multiple machines, a new set of problems appears: which machine should run which container, what happens when a container crashes, how do containers find and talk to each other, how do you roll out an update without downtime. This is what Kubernetes (or similar orchestrators) manages - it schedules containers onto available machines, restarts ones that crash, handles service discovery and load balancing between them, and coordinates rolling updates.

A Kubernetes Pod is the smallest deployable unit - usually one container, sometimes a tightly coupled group. A Deployment manages a set of identical Pods, handling scaling and rolling updates. A Service gives a stable network identity to a set of Pods even as individual Pods are replaced - this is the piece that makes "which specific container instance is running" an implementation detail the rest of the system doesn't need to care about.`,
    "Original notes", "", "original");
  await insertQuestions(t2.id, [
    { question: "Why are containers lighter weight than virtual machines?", answer: "Containers share the host OS kernel rather than each running a full separate operating system like VMs do. This makes them start faster and use far less overhead, letting many more containers run on the same hardware compared to VMs.", difficulty: "Easy", source: "Common interview pattern" },
    { question: "What problem does a Kubernetes Service solve that a Pod alone doesn't?", answer: "Pods are ephemeral - they get replaced during updates, crashes, or scaling. A Service provides a stable network identity and load balancing across whichever Pods currently exist, so other parts of the system don't need to track individual Pod IPs that change over time.", difficulty: "Medium", source: "Common interview pattern" },
  ]);

  console.log("Seeded CSE / DevOps: 2 topics.");
}

main().catch((e) => { console.error("Seed failed:", e.message); process.exit(1); });
