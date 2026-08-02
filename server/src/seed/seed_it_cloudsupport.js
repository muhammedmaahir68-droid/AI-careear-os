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
  const branch = await upsertBranch("it", "Information Technology");
  const role = await upsertRole(branch.id, "cloud-support", "Cloud Support Engineer");

  const t1 = await insertTopic(role.id, 1, "Cloud Fundamentals: Compute, Storage, Networking",
    "The three building blocks every cloud service is made of, and how they map to on-prem concepts.",
    "Wikipedia - Cloud computing", "https://en.wikipedia.org/wiki/Cloud_computing", 1);
  await insertMaterial(t1.id, "Mapping cloud services back to what they actually are",
    `Every cloud provider's confusing list of services reduces to variations on three primitives: compute, storage, and networking. Compute is a place code runs - a virtual machine (EC2, Azure VM) is a full rentable server; a container service runs containers without managing the underlying VM; a serverless function (Lambda) runs code only when triggered, with no server management and billing by execution time rather than uptime. The right choice depends on control needed versus operational overhead wanted - VMs give full control and full responsibility, serverless gives minimal control but near-zero operational burden.

Storage splits into object storage (S3-style - store and retrieve files by key, not designed for frequent small updates, extremely durable and cheap at scale), block storage (attached disks for VMs, like a virtual hard drive, low-latency random access), and file storage (shared network filesystems multiple instances can mount simultaneously). Picking the wrong type is a common early mistake - trying to use object storage like a database, or block storage for something that needs to be shared across many instances.

Networking in the cloud centers on the Virtual Private Cloud (VPC) - an isolated network you define, with subnets, route tables, and security groups controlling what can talk to what. A public subnet has a route to the internet; a private subnet doesn't, which is exactly where you'd put a database that should never be directly internet-accessible. Security groups act as a stateful firewall at the instance level - understanding stateful (return traffic automatically allowed) versus stateless (network ACLs, where you must explicitly allow both directions) is a frequent point of confusion.`,
    "Original notes", "", "original");
  await insertQuestions(t1.id, [
    { question: "When would you choose serverless functions over a virtual machine?", answer: "When the workload is event-driven or intermittent rather than constantly running - serverless bills only for actual execution time and requires no server management, but trades away fine-grained control and can have cold-start latency. A constantly-busy workload is usually cheaper and more predictable on a VM or container service.", difficulty: "Medium", source: "Common interview pattern" },
    { question: "Why would you put a database in a private subnet instead of a public one?", answer: "A private subnet has no direct route to the internet, so the database isn't directly reachable from outside the VPC even if misconfigured. Application servers in a public or private subnet connect to it internally, reducing the attack surface significantly.", difficulty: "Medium", source: "Common interview pattern" },
  ]);

  const t2 = await insertTopic(role.id, 1, "Monitoring, Incident Response & SLAs",
    "What happens after something breaks in production, and how support teams are actually measured.",
    "Wikipedia - Service-level agreement", "https://en.wikipedia.org/wiki/Service-level_agreement", 2);
  await insertMaterial(t2.id, "Why monitoring, alerting, and SLAs are three different things",
    `Monitoring collects data about system behavior - CPU usage, error rates, response times, queue depths. Alerting decides which of that data matters enough to wake someone up, and this distinction matters because over-alerting (paging someone for every minor blip) causes real alert fatigue, where genuinely critical alerts get ignored because they're buried among noise. Good alerting is tuned to symptoms users actually feel (elevated error rate, slow response time) rather than every internal metric that fluctuates normally.

An SLA (Service Level Agreement) is a contractual commitment - typically uptime percentage (99.9% uptime allows about 8.7 hours of downtime per year; 99.99% allows about 52 minutes). SLOs (Service Level Objectives) are the internal targets a team holds itself to, usually stricter than the external SLA, giving buffer before an SLA is actually breached. SLIs (Service Level Indicators) are the actual measured values - the raw data SLOs and SLAs are evaluated against.

Incident response has a standard shape worth knowing: detect (monitoring/alerting fires), triage (assess severity and impact), mitigate (stop the bleeding - often a rollback or failover, not necessarily the root-cause fix), resolve (root cause actually fixed), and postmortem (blameless review of what happened and what process/system change prevents recurrence). The order matters - mitigation before full root-cause understanding is normal and correct; restoring service quickly and then investigating thoroughly beats leaving users impacted while doing a deep investigation live.

A postmortem culture that's blameless (focused on system and process gaps, not individual blame) produces more honest incident reports, which is what actually prevents repeat incidents - people who fear blame tend to under-report the real contributing factors.`,
    "Original notes", "", "original");
  await insertQuestions(t2.id, [
    { question: "What's the difference between an SLO and an SLA?", answer: "An SLA is an external, often contractual commitment to customers. An SLO is an internal target a team holds itself to, usually stricter than the SLA, giving buffer before the SLA itself is actually breached.", difficulty: "Medium", source: "Common interview pattern" },
    { question: "During an incident, why might a team roll back before fully understanding the root cause?", answer: "Mitigation (stopping user impact) is prioritized over full root-cause resolution during an active incident. A rollback restores service quickly; the deeper investigation into why it broke happens afterward, in the postmortem, without users being impacted during that investigation.", difficulty: "Medium", source: "Common interview pattern" },
  ]);

  console.log("Seeded IT / Cloud Support: 2 topics.");
}

main().catch((e) => { console.error("Seed failed:", e.message); process.exit(1); });
