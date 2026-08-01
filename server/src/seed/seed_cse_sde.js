// Pilot seed: CSE branch, SDE role.
// Content below is written from scratch (not copied from any source) and
// each topic links out to genuinely open-licensed references for further
// reading (MIT OpenCourseWare - CC BY-NC-SA, Wikipedia - CC BY-SA).
// This file is the pattern to copy for every other branch/role.
//
// Run with: node src/seed/seed_cse_sde.js
// Requires server/.env with SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY.

import "dotenv/config";
import { supabase } from "../lib/supabase.js";

async function upsertBranch(code, name) {
  const { data, error } = await supabase
    .from("branches")
    .upsert({ code, name }, { onConflict: "code" })
    .select()
    .single();
  if (error) throw error;
  return data;
}

async function upsertRole(branchId, code, name) {
  const { data, error } = await supabase
    .from("roles")
    .upsert({ branch_id: branchId, code, name }, { onConflict: "branch_id,code" })
    .select()
    .single();
  if (error) throw error;
  return data;
}

async function insertTopic(roleId, level, title, description, source, sourceUrl, order) {
  const { data, error } = await supabase
    .from("syllabus_topics")
    .insert({
      role_id: roleId,
      level,
      title,
      description,
      source,
      source_url: sourceUrl,
      order_index: order,
    })
    .select()
    .single();
  if (error) throw error;
  return data;
}

async function insertMaterial(topicId, title, content, source, sourceUrl, license) {
  const { error } = await supabase.from("study_materials").insert({
    topic_id: topicId,
    title,
    content,
    format: "markdown",
    source,
    source_url: sourceUrl,
    license,
  });
  if (error) throw error;
}

async function insertQuestions(topicId, items) {
  const rows = items.map((q) => ({ topic_id: topicId, ...q }));
  const { error } = await supabase.from("questions").insert(rows);
  if (error) throw error;
}

async function main() {
  const branch = await upsertBranch("cse", "Computer Science Engineering");
  const role = await upsertRole(branch.id, "sde", "Software Development Engineer");

  // --- Level 1: Arrays, Strings & Hashing ---
  const t1 = await insertTopic(
    role.id, 1,
    "Arrays, Strings & Hashing",
    "The base layer every coding interview builds on: contiguous memory, string manipulation, and O(1) average lookups with hash maps.",
    "MIT OpenCourseWare 6.006 - Introduction to Algorithms",
    "https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/",
    1
  );
  await insertMaterial(
    t1.id,
    "Why arrays and hash maps come first",
    `Arrays give constant-time access by index because elements sit in contiguous memory - the address of element i is just base_address + i * element_size. That's the whole trick, and it's why array problems are usually about *how you move through* the data, not the lookup itself: two pointers closing in from both ends, a sliding window that grows and shrinks, or prefix sums that let you answer range queries without re-scanning.

Hash maps solve a different problem: you often don't want position i, you want "have I seen this value before, and where." A hash map trades that linear scan for close to O(1) average lookup by mapping a key to a bucket via a hash function. The word "average" matters - worst case is O(n) if every key collides into the same bucket, which is why hash function quality and load factor matter in real implementations.

Strings are arrays of characters with extra rules: immutability in some languages (so concatenation in a loop can quietly become O(n^2)), and pattern matching problems (substrings, anagrams) that almost always reduce to a sliding window plus a frequency map of characters.

Practice pattern to build fluency, not memorization: two-pointer problems (pair sum, container with most water), sliding window problems (longest substring without repeating characters, minimum window substring), and frequency-map problems (anagram groups, first unique character). Once these three patterns are automatic, most "easy" and "medium" array/string interview questions stop being novel and start being pattern recognition.`,
    "Original notes",
    "",
    "original"
  );
  await insertQuestions(t1.id, [
    { question: "Given an array of integers, find two numbers that add up to a target.", answer: "Use a hash map: for each number, check if target-number has been seen; if not, store number -> index and continue. Single pass, O(n) time, O(n) space.", difficulty: "Easy", source: "Common interview pattern" },
    { question: "Find the longest substring without repeating characters.", answer: "Sliding window with a set/map tracking characters currently in the window. Expand the right pointer; when a repeat is found, shrink from the left until the repeat is gone. O(n) time.", difficulty: "Medium", source: "Common interview pattern" },
    { question: "Group anagrams from a list of strings.", answer: "Sort each string's characters to get a canonical key, or use a 26-length character-count tuple as the key, then group strings in a hash map by that key.", difficulty: "Medium", source: "Common interview pattern" },
  ]);

  // --- Level 1: Trees, Graphs & Recursion ---
  const t2 = await insertTopic(
    role.id, 1,
    "Trees, Graphs & Recursion",
    "Non-linear structures and the recursive thinking needed to traverse and reason about them.",
    "MIT OpenCourseWare 6.006 - Introduction to Algorithms",
    "https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/",
    2
  );
  await insertMaterial(
    t2.id,
    "Recursion as the native language of trees",
    `A tree is a graph with no cycles and a single root, and almost every tree operation has the same shape: solve the problem for the current node using the already-solved answers from its children. That's recursion, and it's why "write a recursive function" is usually the fastest path to a correct tree solution before you even think about optimizing.

Depth-first traversal (preorder, inorder, postorder) visits a node relative to when it visits its children - process-then-recurse, recurse-left-process-recurse-right, or recurse-then-process. Breadth-first traversal (level order) uses a queue instead of the call stack, visiting the tree level by level, which is what you want for "shortest path in unweighted structure" type questions.

Graphs generalize trees by allowing cycles and multiple paths between nodes. The same DFS/BFS toolkit applies, but now you need a visited set to avoid infinite loops. DFS with a visited set answers "is there a path" and "find all connected components." BFS answers "shortest path" in an unweighted graph because it explores in strict distance order from the source.

The recursion pattern to internalize: define what the function returns for a single node assuming its children already gave correct answers, write the base case for a null/leaf node, then combine. Height of a tree, whether a tree is balanced, lowest common ancestor, and path-sum problems are all this same shape with a different combine step.`,
    "Original notes",
    "",
    "original"
  );
  await insertQuestions(t2.id, [
    { question: "Find the maximum depth of a binary tree.", answer: "Recursive: depth(node) = 1 + max(depth(left), depth(right)), base case null returns 0.", difficulty: "Easy", source: "Common interview pattern" },
    { question: "Determine if a binary tree is balanced.", answer: "A helper that returns height, and returns -1 as a sentinel the moment any subtree is found unbalanced, short-circuits recursion instead of recomputing height repeatedly - avoids O(n^2).", difficulty: "Medium", source: "Common interview pattern" },
    { question: "Number of islands (connected components in a grid).", answer: "Treat the grid as an implicit graph; DFS or BFS from every unvisited land cell, marking visited cells, counting how many times you start a fresh traversal.", difficulty: "Medium", source: "Common interview pattern" },
  ]);

  console.log("Seeded CSE / SDE: 2 topics, 2 materials, 6 questions.");
  console.log("Copy this file's structure to seed other roles and branches.");
}

main().catch((err) => {
  console.error("Seed failed:", err.message);
  process.exit(1);
});
