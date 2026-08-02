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
  const branch = await upsertBranch("aiml", "Artificial Intelligence & Machine Learning");
  const role = await upsertRole(branch.id, "data-scientist", "Data Scientist");

  const t1 = await insertTopic(role.id, 1, "Statistical Inference & Hypothesis Testing",
    "How to tell the difference between a real effect and random noise, rigorously.",
    "Wikipedia - Statistical hypothesis testing", "https://en.wikipedia.org/wiki/Statistical_hypothesis_testing", 1);
  await insertMaterial(t1.id, "Why 'the numbers look different' isn't a conclusion",
    `A hypothesis test starts by assuming there's no real effect (the null hypothesis) and asks: how likely would we see data this extreme, or more extreme, purely by chance if that assumption were true? That likelihood is the p-value. A small p-value (conventionally below 0.05) means the observed data would be unlikely under the null hypothesis, giving reason to reject it - but critically, a p-value is not the probability the null hypothesis is true, and treating it that way is one of the most common statistical misinterpretations in practice.

Statistical significance and practical significance are different things entirely. With enough data, even a genuinely tiny, meaningless effect can become statistically significant - the sample size is large enough that even noise-level differences pass the significance threshold. This is why effect size (how large the actual difference is) matters alongside p-value - a statistically significant 0.01% conversion rate improvement might not be worth shipping, even though it's "real."

Confidence intervals communicate more than a p-value alone: instead of just "significant or not," a 95% confidence interval gives a plausible range for the true effect size, which is usually more useful for actual decision-making than a binary significance verdict.

Multiple comparisons is a trap that catches people testing many things at once: running 20 independent tests at a 5% significance threshold means roughly one is expected to show "significance" purely by chance, even if nothing real is happening. Corrections like Bonferroni exist specifically to control this false-positive inflation when many hypotheses are tested simultaneously - skipping this correction is a common source of false "discoveries" in A/B testing dashboards that run many metrics at once.`,
    "Original notes", "", "original");
  await insertQuestions(t1.id, [
    { question: "What does a p-value of 0.03 actually mean?", answer: "There's a 3% probability of observing data this extreme or more extreme, assuming the null hypothesis (no real effect) is true. It does not mean there's a 3% chance the null hypothesis is true, or a 97% chance the effect is real - a very common misinterpretation.", difficulty: "Medium", source: "Common interview pattern" },
    { question: "Why might a statistically significant A/B test result not be worth acting on?", answer: "Statistical significance only says the effect is unlikely to be pure noise, not that the effect is large enough to matter practically. With a large enough sample, even a trivially small effect size becomes statistically significant - effect size needs to be evaluated alongside significance.", difficulty: "Medium", source: "Common interview pattern" },
  ]);

  const t2 = await insertTopic(role.id, 1, "Feature Engineering & Model Interpretability",
    "Why the features you build often matter more than the model you pick, and how to explain what a model actually learned.",
    "Wikipedia - Feature engineering", "https://en.wikipedia.org/wiki/Feature_engineering", 2);
  await insertMaterial(t2.id, "Why feature engineering often beats a fancier model",
    `Raw data rarely arrives in the form a model learns best from. Feature engineering transforms it - extracting day-of-week from a timestamp, computing a ratio between two raw columns, one-hot encoding categorical variables, binning a continuous variable into meaningful ranges. A well-engineered feature can encode domain knowledge a model would otherwise have to infer from data alone, and often the difference between a mediocre model and a good one is better features, not a more sophisticated algorithm applied to the same raw inputs.

Handling categorical variables correctly matters more than it seems: one-hot encoding works well for low-cardinality categories but explodes dimensionality with high-cardinality ones (like zip codes or product IDs with thousands of values). Target encoding (replacing a category with the average outcome for that category) handles high cardinality better but risks leaking target information if not done carefully with proper cross-validation folds.

Model interpretability has become a real requirement, not a nice-to-have, especially in regulated domains (credit, healthcare, hiring) where a model's decision needs to be explainable. Feature importance from tree-based models gives a global view of which features matter most overall. SHAP values go further, explaining individual predictions - why this specific applicant was denied, not just which features matter on average across all applicants - which is what's actually needed to answer a real "why was I denied" question.

The tradeoff between interpretability and raw performance is real but often overstated: a well-tuned gradient boosted tree with good features frequently matches or beats a deep neural network on structured/tabular data while remaining far more interpretable, which is why tree-based models remain the default choice for most real-world tabular data problems rather than deep learning.`,
    "Original notes", "", "original");
  await insertQuestions(t2.id, [
    { question: "Why can target encoding leak information if not done carefully?", answer: "If the target encoding uses the same rows it's later used to predict, it effectively bakes the true answer into the feature (data leakage). Doing it correctly requires computing encodings within cross-validation folds so no row's encoding is derived using its own target value.", difficulty: "Hard", source: "Common interview pattern" },
    { question: "What can SHAP values tell you that global feature importance can't?", answer: "Global feature importance shows which features matter on average across the whole model. SHAP values explain individual predictions - how much each feature contributed to one specific prediction for one specific instance, which is needed to answer 'why was this particular case decided this way.'", difficulty: "Medium", source: "Common interview pattern" },
  ]);

  console.log("Seeded AIML / Data Scientist: 2 topics.");
}

main().catch((e) => { console.error("Seed failed:", e.message); process.exit(1); });
