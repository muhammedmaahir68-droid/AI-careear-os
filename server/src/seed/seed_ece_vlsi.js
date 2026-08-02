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
  const branch = await upsertBranch("ece", "Electronics & Communication Engineering");
  const role = await upsertRole(branch.id, "vlsi", "VLSI Design Engineer");

  const t1 = await insertTopic(role.id, 1, "CMOS Logic & Digital Design Basics",
    "How transistors become logic gates, and why CMOS won over every competing technology.",
    "Wikipedia - CMOS", "https://en.wikipedia.org/wiki/CMOS", 1);
  await insertMaterial(t1.id, "Why CMOS dominates digital design",
    `A CMOS logic gate is built from complementary pairs of transistors - PMOS transistors conduct when the input is low, NMOS transistors conduct when the input is high. In any stable state, exactly one type is conducting and the other is off, meaning almost no current flows through the gate except during the brief moment it switches states. This is the entire reason CMOS became dominant: static power consumption is near zero, unlike older technologies (like NMOS-only or bipolar logic) that drew constant current even while idle.

Dynamic power - the power actually consumed when switching - follows P = C × V² × f: capacitance being switched, voltage squared, and switching frequency. This formula explains two major industry trends directly: voltage scaling (lower operating voltage cuts power quadratically, which is why chip voltages have dropped generation over generation) and the practical ceiling on clock frequency increases (power scales linearly with frequency, so pushing frequency higher without other changes burns proportionally more power - part of why chip designs shifted toward multiple cores instead of just raising clock speed further).

Propagation delay - how long it takes a gate's output to respond to an input change - depends on how much capacitance needs charging or discharging and how much current the transistors can drive. This is why gate sizing (making transistors wider to drive more current) is a real design lever: wider transistors switch faster but consume more area and power, a tradeoff VLSI designers make explicitly for each gate depending on how timing-critical that path is.

Standard cell libraries exist because hand-designing every gate for every chip is impractical - a library provides pre-characterized, pre-verified logic gates (AND, OR, flip-flops, etc.) at known sizes with known timing and power characteristics, and chip design becomes largely an exercise in connecting these known building blocks correctly, verified by automated tools rather than hand-checked transistor by transistor.`,
    "Original notes", "", "original");
  await insertQuestions(t1.id, [
    { question: "Why does CMOS have near-zero static power consumption compared to older logic families?", answer: "In any stable logic state, exactly one of the complementary PMOS/NMOS transistor pair conducts while the other is off, so almost no current flows except briefly during switching. Older technologies often had current paths that stayed on continuously even when idle.", difficulty: "Medium", source: "Common interview pattern" },
    { question: "Why did chip designs shift toward multiple cores instead of just increasing clock frequency further?", answer: "Dynamic power scales roughly linearly with frequency but has practical thermal and power delivery limits at high clock speeds. Adding cores increases total throughput without pushing any single core's frequency (and thus power density) past those limits.", difficulty: "Medium", source: "Common interview pattern" },
  ]);

  const t2 = await insertTopic(role.id, 1, "RTL Design & Verification Flow",
    "How a design goes from Verilog/VHDL code to a verified chip layout.",
    "Wikipedia - Register-transfer level", "https://en.wikipedia.org/wiki/Register-transfer_level", 2);
  await insertMaterial(t2.id, "The path from RTL code to silicon",
    `RTL (Register-Transfer Level) design describes hardware behavior in terms of how data moves between registers on each clock cycle, written in a hardware description language like Verilog or VHDL. Unlike software, RTL code describes concurrent hardware - every always block or process in the code represents logic that exists and operates simultaneously in the actual silicon, which is why RTL bugs (like accidentally inferring a latch instead of a flip-flop) can be subtle and easy to miss reading the code sequentially the way you'd read software.

Synthesis converts RTL into a gate-level netlist - actual logic gates from a standard cell library, connected to implement the described behavior, optimized for the target timing, area, and power constraints. This is where abstract RTL becomes something with real physical characteristics: an actual number of gates, an actual critical path delay.

Verification is arguably where more VLSI engineering time goes than design itself, because a bug found after fabrication is enormously expensive to fix - re-spinning a chip costs real fabrication time and money, unlike a software patch. Simulation-based verification runs testbenches against the RTL to check behavior against expected results. Formal verification mathematically proves properties hold for all possible inputs, catching corner cases a testbench might never happen to exercise. Coverage metrics (code coverage, functional coverage) quantify how much of the design's actual behavior has been exercised by tests, because 100% simulation passing means nothing if the tests only covered a fraction of real scenarios.

Static Timing Analysis (STA) checks that every path in the design meets timing at the target clock frequency, without needing to simulate - it's exhaustive and fast, checking every path mathematically rather than only the paths a testbench happens to exercise, which is why it's the standard method for signing off timing rather than relying on simulation alone.`,
    "Original notes", "", "original");
  await insertQuestions(t2.id, [
    { question: "Why is verification often described as consuming more engineering effort than RTL design itself?", answer: "A bug caught in simulation costs an engineer's time. A bug caught after fabrication requires re-spinning the chip - real fabrication cost and months of delay. That cost asymmetry justifies extensive verification effort (simulation, formal verification, coverage analysis) relative to design time.", difficulty: "Medium", source: "Common interview pattern" },
    { question: "What does Static Timing Analysis check that simulation-based verification might miss?", answer: "STA exhaustively checks timing on every path in the design mathematically, regardless of whether a testbench happens to exercise that specific path. Simulation only verifies the specific scenarios the testbench covers, so a timing violation on an untested path could be missed by simulation alone.", difficulty: "Medium", source: "Common interview pattern" },
  ]);

  console.log("Seeded ECE / VLSI: 2 topics.");
}

main().catch((e) => { console.error("Seed failed:", e.message); process.exit(1); });
