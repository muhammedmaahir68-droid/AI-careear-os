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
  const branch = await upsertBranch("eee", "Electrical & Electronics Engineering");
  const role = await upsertRole(branch.id, "power-systems", "Power Systems Engineer");

  const t1 = await insertTopic(role.id, 1, "Power Generation & Transmission Basics",
    "How electricity actually gets from a generator to a wall socket, and why the grid is designed the way it is.",
    "Wikipedia - Electric power transmission", "https://en.wikipedia.org/wiki/Electric_power_transmission", 1);
  await insertMaterial(t1.id, "Why transmission happens at high voltage",
    `Power loss in a transmission line is I²R - it depends on current squared, not voltage. For a fixed amount of power delivered (P = VI), raising the voltage lowers the current needed, and since loss scales with the square of current, even a modest voltage increase cuts losses dramatically. This is the entire reason transmission lines run at hundreds of kilovolts while your wall socket delivers 230V - transformers step voltage up for the long haul and back down for safe delivery.

Three-phase power exists because it delivers constant power flow (unlike single-phase, which pulses to zero twice per cycle) and lets you build simpler, more efficient motors and generators. The three phases are offset 120 degrees from each other, so as one phase's instantaneous power dips, another is rising - summed together, total power stays constant.

Grid stability is a real engineering constraint, not an afterthought: generation must match demand instantly, because electricity can't be stored at grid scale (batteries and pumped hydro are still a small fraction of capacity). Frequency (50Hz or 60Hz depending on region) is the shared heartbeat of the grid - if demand exceeds supply, frequency drops; if supply exceeds demand, it rises. Grid operators constantly adjust generation to hold frequency within a tight band, and large mismatches are what cause cascading blackouts.`,
    "Original notes", "", "original");
  await insertQuestions(t1.id, [
    { question: "Why is power transmitted at high voltage instead of high current?", answer: "Transmission loss is I²R - proportional to current squared. Raising voltage for the same power delivered (P=VI) lowers current, and since loss scales quadratically with current, this dramatically cuts losses over long distances.", difficulty: "Easy", source: "Common interview pattern" },
    { question: "What happens to grid frequency when demand suddenly exceeds generation?", answer: "Frequency drops, because generators (mostly rotating machines) slow down slightly as more load is drawn than power supplied. Grid operators respond by bringing more generation online or shedding load to restore balance.", difficulty: "Medium", source: "Common interview pattern" },
  ]);

  const t2 = await insertTopic(role.id, 1, "Protection Systems & Relays",
    "How the grid protects itself from faults automatically, in milliseconds, without a human in the loop.",
    "Wikipedia - Protective relay", "https://en.wikipedia.org/wiki/Protective_relay", 2);
  await insertMaterial(t2.id, "Why protection has to be automatic and fast",
    `A short circuit on a transmission line can draw currents tens of times normal load within milliseconds - equipment damage and fire risk scale with how long that fault current flows. Protection relays exist to detect abnormal conditions (overcurrent, differential current, distance to fault) and trip a circuit breaker to isolate just the faulted section, fast enough that the rest of the grid barely notices.

Overcurrent relays trip when current exceeds a threshold - simple, but they need coordination: a relay closer to the fault should trip before one further upstream, so only the smallest necessary section of the grid goes dark. This coordination is done through time-graded settings, where relays further from the source have progressively longer trip delays.

Differential protection compares current entering and leaving a protected zone (a transformer, a bus, a line segment) - under normal conditions these should be equal; any significant difference means current is leaking out through a fault, and the relay trips immediately, without needing to wait for a threshold or coordinate timing with anything else.

Distance relays (common on transmission lines) don't measure current directly - they measure impedance, which correlates with distance to a fault along the line, letting a single relay protect a specific zone of the line while remaining backup-aware of the zone beyond it.`,
    "Original notes", "", "original");
  await insertQuestions(t2.id, [
    { question: "What's the difference between overcurrent and differential protection?", answer: "Overcurrent protection trips based on a current threshold and needs timing coordination between relays. Differential protection compares current in vs current out of a zone and trips instantly on imbalance, without needing timing coordination.", difficulty: "Medium", source: "Common interview pattern" },
  ]);

  console.log("Seeded EEE / Power Systems: 2 topics.");
}

main().catch((e) => { console.error("Seed failed:", e.message); process.exit(1); });
