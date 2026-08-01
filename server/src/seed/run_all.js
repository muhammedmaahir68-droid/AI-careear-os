// Runs every seed file in this folder in sequence.
// As you add seed_it_qa.js, seed_eee_core.js, seed_aiml_mleng.js etc,
// import and add them to the list below.

import { spawn } from "child_process";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));

const seeds = [
  "seed_cse_sde.js",
  "seed_ece_embedded.js",
  // add each new branch/role seed file here as it's written
];

async function run(file) {
  return new Promise((resolve, reject) => {
    const p = spawn("node", [join(__dirname, file)], { stdio: "inherit" });
    p.on("exit", (code) => (code === 0 ? resolve() : reject(new Error(`${file} exited with ${code}`))));
  });
}

for (const file of seeds) {
  console.log(`\n--- Running ${file} ---`);
  await run(file);
}

console.log("\nAll seeds complete.");
