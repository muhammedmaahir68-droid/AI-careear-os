// Second pilot seed: ECE branch, Embedded Systems Engineer role.
// Same pattern as seed_cse_sde.js — original notes, real depth, attributed
// sources. Copy this file's structure for EEE, MECH, AIML, AIDS, IT roles.
//
// Run with: node src/seed/seed_ece_embedded.js

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
  const branch = await upsertBranch("ece", "Electronics & Communication Engineering");
  const role = await upsertRole(branch.id, "embedded", "Embedded Systems Engineer");

  const t1 = await insertTopic(
    role.id, 1,
    "Microcontroller Fundamentals & GPIO",
    "How a microcontroller actually executes your code down to registers, and how digital I/O works at the hardware level.",
    "MIT OpenCourseWare 6.115 - Microcomputer Project Laboratory",
    "https://ocw.mit.edu/courses/6-115-microcomputer-project-laboratory-spring-2011/",
    1
  );
  await insertMaterial(
    t1.id,
    "What actually happens when you write to a GPIO pin",
    `A microcontroller is a full computer - CPU, RAM, flash, and peripherals - on one chip, and the peripheral you touch first is always GPIO (general purpose input/output). Every pin is backed by a set of memory-mapped registers: a direction register decides input or output, a data/output register sets or reads the electrical level, and often a pull-up/pull-down register controls the pin's idle state. Writing "digitalWrite(pin, HIGH)" in a framework is really just writing a single bit into one of these registers - the abstraction hides the register math, not the mechanism.

Clock speed matters more than people expect. Every instruction takes a fixed number of clock cycles, so a busy-wait delay loop that works at 8 MHz will run 4x faster and break at 32 MHz. This is exactly why hardware timers exist instead of counting loop iterations for timing - a timer peripheral counts actual clock ticks independent of what the CPU is doing, and can trigger an interrupt at a precise moment.

Interrupts are the other core concept: instead of the CPU polling a pin in a loop (wasting cycles, missing fast events), an interrupt controller watches for a hardware event - a pin change, a timer overflow, a UART byte arriving - and pauses normal execution to run a short interrupt service routine (ISR). The discipline here is real: ISRs should be short and fast, set a flag or push to a queue, and let the main loop do the actual work, because you're blocking every other interrupt while inside one.

Power matters in embedded work in a way it doesn't in app development. Sleep modes exist because a microcontroller running full-speed 24/7 on a coin cell battery is a design failure, not a coding one - understanding which peripherals stay active in which sleep mode (and what wakes the chip back up) is often the actual interview question hiding behind "explain low power design."`,
    "Original notes",
    "",
    "original"
  );
  await insertQuestions(t1.id, [
    { question: "What's the difference between polling and interrupts for reading a sensor?", answer: "Polling repeatedly checks the sensor in a loop, wasting CPU cycles and potentially missing fast events between checks. Interrupts let the CPU do other work and only react when the sensor signals, but ISRs must be kept short since they block other interrupts.", difficulty: "Easy", source: "Common interview pattern" },
    { question: "Why would you use a hardware timer instead of a software delay loop?", answer: "A software delay loop's timing depends on clock speed and compiler optimization, making it unreliable across builds. A hardware timer counts actual clock cycles independently and can trigger precisely, which is essential for anything timing-critical like PWM or communication protocols.", difficulty: "Medium", source: "Common interview pattern" },
  ]);

  const t2 = await insertTopic(
    role.id, 1,
    "Communication Protocols: UART, I2C, SPI",
    "The three protocols nearly every embedded system uses to talk between chips, and when to reach for each one.",
    "MIT OpenCourseWare 6.115",
    "https://ocw.mit.edu/courses/6-115-microcomputer-project-laboratory-spring-2011/",
    2
  );
  await insertMaterial(
    t2.id,
    "Choosing between UART, I2C, and SPI",
    `These three protocols solve the same problem - move bytes between two chips - with different tradeoffs, and picking the right one is usually about pin count, speed, and how many devices you need on the bus.

UART is the simplest: two wires (TX/RX), no shared clock, both sides just have to agree on a baud rate in advance. It's point-to-point only - one UART talks to exactly one other UART - which makes it the natural choice for a microcontroller talking to a GPS module, a Bluetooth module, or a debug console, but a poor choice the moment you need more than two devices on the line.

I2C uses two shared wires (SDA for data, SCL for clock) and supports multiple devices on the same bus, each identified by a 7-bit address. The controller (master) drives the clock, so devices don't need to agree on timing in advance the way UART does. The tradeoff is speed - standard I2C tops out around 400kHz - and the fact that a stuck slave can hang the whole bus, which is why I2C debugging often starts with a logic analyzer, not printf.

SPI trades pin count for speed and simplicity: separate clock, data-in, data-out lines, plus one chip-select line per device. Because there's a dedicated line per device rather than shared addressing, SPI has no addressing overhead and can run substantially faster than I2C - this is why SD cards, displays, and high-speed sensors default to SPI. The cost is pin count: N devices need N chip-select lines in addition to the three shared lines.

The practical rule of thumb: UART for simple two-device serial links, I2C when you have many low-speed sensors and want to save pins, SPI when you need speed and can spare the extra chip-select pins.`,
    "Original notes",
    "",
    "original"
  );
  await insertQuestions(t2.id, [
    { question: "Why can I2C support multiple devices on two wires while UART can't?", answer: "I2C devices each have a unique address and the master initiates communication by addressing a specific device on the shared bus. UART has no addressing scheme - it's a direct point-to-point link between exactly two devices.", difficulty: "Medium", source: "Common interview pattern" },
    { question: "You need to read from 5 sensors as fast as possible with pins to spare. Which protocol and why?", answer: "SPI - it's faster than I2C and the extra chip-select pins needed per device are a fair tradeoff when pin count isn't the constraint and speed is the priority.", difficulty: "Medium", source: "Common interview pattern" },
  ]);

  console.log("Seeded ECE / Embedded Systems: 2 topics, 2 materials, 4 questions.");
}

main().catch((err) => {
  console.error("Seed failed:", err.message);
  process.exit(1);
});
