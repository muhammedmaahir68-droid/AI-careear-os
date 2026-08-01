// Fourth pilot seed: AIML branch, Machine Learning Engineer role.
// Same pattern as the other seed files.
//
// Run with: node src/seed/seed_aiml_mleng.js

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
  const branch = await upsertBranch("aiml", "Artificial Intelligence & Machine Learning");
  const role = await upsertRole(branch.id, "mleng", "Machine Learning Engineer");

  const t1 = await insertTopic(
    role.id, 1,
    "Bias-Variance and Model Evaluation",
    "Why a model that fits training data perfectly is often the worse model, and how to measure that honestly.",
    "MIT OpenCourseWare 6.036 - Introduction to Machine Learning",
    "https://ocw.mit.edu/courses/6-036-introduction-to-machine-learning-fall-2020/",
    1
  );
  await insertMaterial(
    t1.id,
    "The bias-variance tradeoff isn't abstract - it's the whole game",
    `A model's total error can be broken into three parts: bias, variance, and irreducible noise. Bias is error from wrong assumptions - fitting a straight line to curved data will always underperform no matter how much data you give it, because the model's structure is fundamentally too simple. Variance is error from sensitivity to the specific training data - a model that memorizes noise in the training set will perform differently every time you retrain it on a slightly different sample, and that instability shows up as poor performance on new data.

High bias looks like underfitting: poor performance on both training and test data, because the model never learned the real pattern. High variance looks like overfitting: excellent training performance, poor test performance, because the model learned the training set's noise instead of its signal. The fix for each is different and often opposite - underfitting needs a more expressive model or better features; overfitting needs regularization, more data, or a simpler model, which is why diagnosing which one you have (by looking at the training vs validation gap) has to happen before you pick a fix.

Cross-validation exists to get an honest performance estimate without wasting data. A single train/test split gives one noisy estimate; k-fold cross-validation trains and evaluates k times on different splits and averages the result, which is both more stable and lets you use nearly all your data for training in each fold.

The metric you optimize for has to match the actual problem. Accuracy is misleading on imbalanced data - a model that always predicts "not fraud" on a dataset that's 99% not-fraud gets 99% accuracy while being useless. Precision, recall, and F1 exist specifically because accuracy alone hides this failure mode, and which of them matters most depends on whether false positives or false negatives are more costly in your actual application.`,
    "Original notes",
    "",
    "original"
  );
  await insertQuestions(t1.id, [
    { question: "Your model has 98% training accuracy and 71% test accuracy. What's happening and what do you do?", answer: "Classic overfitting - high variance. The model memorized training-set specifics rather than generalizable patterns. Fixes: add regularization (L1/L2, dropout), get more training data, reduce model complexity, or use cross-validation to tune hyperparameters more carefully.", difficulty: "Medium", source: "Common interview pattern" },
    { question: "Why is accuracy a poor metric for a fraud detection model?", answer: "Fraud is rare, so a model that predicts 'not fraud' for everything achieves high accuracy while catching zero actual fraud. Precision and recall (or F1, or PR-AUC) reflect the actual tradeoff between missed fraud and false alarms, which accuracy hides entirely.", difficulty: "Medium", source: "Common interview pattern" },
  ]);

  const t2 = await insertTopic(
    role.id, 1,
    "Neural Network Fundamentals",
    "What's actually happening during forward and backward passes, without hand-waving the math.",
    "MIT OpenCourseWare 6.036",
    "https://ocw.mit.edu/courses/6-036-introduction-to-machine-learning-fall-2020/",
    2
  );
  await insertMaterial(
    t2.id,
    "Forward pass, loss, backward pass - the actual mechanics",
    `A neural network's forward pass is just repeated matrix multiplication and nonlinear functions: each layer takes the previous layer's output, multiplies by a weight matrix, adds a bias, and passes the result through an activation function (ReLU, sigmoid, tanh). The nonlinearity is not optional decoration - stack purely linear layers and the whole network collapses mathematically into a single linear function, no matter how many layers you add. The activation function is what lets the network represent curved, non-linear decision boundaries at all.

The loss function measures how wrong the current prediction is compared to the true label - mean squared error for regression, cross-entropy for classification. Training is the process of adjusting every weight in the network to make this loss smaller.

Backpropagation is the algorithm that computes how much each individual weight contributed to the final error, using the chain rule from calculus applied layer by layer, backward from the output. This is what makes training feasible: instead of guessing weight adjustments, backprop gives an exact gradient - the direction and magnitude to nudge each weight to reduce loss.

Gradient descent then uses that gradient to actually update the weights: weight = weight - learning_rate * gradient. The learning rate is a genuinely consequential hyperparameter - too high and training oscillates or diverges; too low and training crawls or gets stuck in a poor local region. Modern optimizers like Adam adapt the effective learning rate per-parameter automatically, which is why they're the default starting point over plain gradient descent in most real training setups.`,
    "Original notes",
    "",
    "original"
  );
  await insertQuestions(t2.id, [
    { question: "Why can't a deep neural network with only linear activations learn a non-linear decision boundary?", answer: "Composing linear functions produces another linear function, no matter how many layers are stacked. Without a non-linear activation between layers, the entire network is mathematically equivalent to a single linear layer.", difficulty: "Medium", source: "Common interview pattern" },
    { question: "What does backpropagation actually compute?", answer: "The gradient of the loss with respect to every weight in the network, using the chain rule applied backward from the output layer. It tells you the direction and magnitude to adjust each weight to reduce the loss.", difficulty: "Medium", source: "Common interview pattern" },
  ]);

  console.log("Seeded AIML / ML Engineer: 2 topics, 2 materials, 4 questions.");
}

main().catch((err) => {
  console.error("Seed failed:", err.message);
  process.exit(1);
});
