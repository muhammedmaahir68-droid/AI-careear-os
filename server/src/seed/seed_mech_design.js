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
  const branch = await upsertBranch("mech", "Mechanical Engineering");
  const role = await upsertRole(branch.id, "design", "Mechanical Design Engineer");

  const t1 = await insertTopic(role.id, 1, "Stress, Strain & Factor of Safety",
    "The core mechanics reasoning behind every part that has to not break.",
    "Wikipedia - Stress (mechanics)", "https://en.wikipedia.org/wiki/Stress_(mechanics)", 1);
  await insertMaterial(t1.id, "Why a part rated for the load can still fail",
    `Stress is force divided by the area it acts over - the same force concentrated on a small area creates much higher stress than spread over a large one, which is exactly why sharp corners and small holes are common failure points: they concentrate stress far above the nominal average, a phenomenon called stress concentration. A design that looks fine using average stress calculations can still fail at a fillet or hole because the local stress there is several times higher.

Strain is the resulting deformation relative to original size, and the stress-strain relationship (Hooke's Law in the elastic region: stress = E × strain) defines how stiff a material is. Below the yield point, a part returns to its original shape when load is removed - elastic behavior. Push past yield, and deformation becomes permanent - plastic behavior. Design for anything that needs to keep its shape must stay below yield, with margin.

Factor of safety is that margin, deliberately built in: FOS = failure stress / design stress. A FOS of 2 means the part is designed to handle half the load that would actually fail it. This isn't paranoia - it accounts for material variability, load estimation uncertainty, fatigue over repeated cycles, and manufacturing imperfections that a single calculation can't fully capture. The right FOS depends on the application: aerospace uses tight, weight-driven margins with heavy testing; a static bracket in a low-consequence application can use a larger, cheaper margin instead of extensive validation.

Fatigue failure is the case that catches people off guard: a part can survive a load far below its yield strength if applied once, but fail after thousands or millions of cycles of that same load applied repeatedly - this is why rotating shafts and vibrating components are analyzed against fatigue (S-N) curves, not just static yield strength.`,
    "Original notes", "", "original");
  await insertQuestions(t1.id, [
    { question: "Why does a sharp internal corner on a bracket matter even if average stress calculations look fine?", answer: "Sharp corners create stress concentration - local stress there can be several times the nominal average stress calculated for the part, making it a likely failure initiation point even when the overall design 'passes' on paper.", difficulty: "Medium", source: "Common interview pattern" },
    { question: "A part survives a static load test but fails in the field after months of use. What's the likely cause?", answer: "Fatigue failure from repeated cyclic loading below the material's yield strength - static testing doesn't reveal fatigue life, which requires cyclic (S-N curve) analysis specifically.", difficulty: "Medium", source: "Common interview pattern" },
  ]);

  const t2 = await insertTopic(role.id, 1, "CAD, Tolerancing & Manufacturing for Design",
    "Designing a part that can actually be made, assembled, and repeated at scale.",
    "Wikipedia - Geometric dimensioning and tolerancing", "https://en.wikipedia.org/wiki/Geometric_dimensioning_and_tolerancing", 2);
  await insertMaterial(t2.id, "Why tolerances aren't just extra decimal places",
    `Every manufacturing process has inherent variation - no two machined parts are exactly identical, even from the same machine and program. Tolerances define the acceptable range of that variation, and getting them right is a real engineering tradeoff: tighter tolerances cost more (slower machining, more inspection, higher scrap rate) but looser tolerances risk parts that don't fit or function together.

Geometric Dimensioning and Tolerancing (GD&T) goes beyond simple plus-or-minus dimensions to control form, orientation, location, and runout precisely - because two parts can both meet basic dimensional tolerances yet still fail to assemble if their features aren't properly located relative to each other. A hole in the right position but tilted, or flat but not perpendicular to a mounting face, can still cause an assembly failure that basic tolerancing misses entirely.

Design for manufacturability (DFM) means designing with the actual production process in mind from the start, not adapting afterward. A part that's easy to draw in CAD but requires five separate machining setups, or an injection-molded part with undercuts that need expensive side-action tooling, is a design cost problem hiding as a manufacturing problem. The fix is almost always cheaper earlier - catching a DFM issue in the CAD review is far less costly than redesigning tooling after it's built.

Fits (clearance, transition, interference) govern how two mating parts behave: a shaft slightly smaller than its hole (clearance fit) allows rotation or sliding; a shaft slightly larger (interference fit) creates a press-fit joint that holds without fasteners. Choosing the wrong fit type for the function - like specifying clearance where you actually need a press-fit joint - is a common early-career design mistake.`,
    "Original notes", "", "original");
  await insertQuestions(t2.id, [
    { question: "Why can two parts each pass individual dimensional inspection but still fail to assemble together?", answer: "Basic plus-or-minus tolerancing doesn't control feature location, orientation, or form relative to other features. GD&T addresses this - a hole can be the right diameter and depth but tilted or mislocated in a way basic dimensioning misses.", difficulty: "Medium", source: "Common interview pattern" },
  ]);

  console.log("Seeded MECH / Design Engineer: 2 topics.");
}

main().catch((e) => { console.error("Seed failed:", e.message); process.exit(1); });
