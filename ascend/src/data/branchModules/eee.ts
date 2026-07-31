import type { BranchModuleData } from "./types";
import { makeVideoLinks } from "./types";

export const EEE_MODULES: BranchModuleData[] = [
  {
    moduleTitle: "Electric Circuit Theory & Power Systems",
    level: "Level 1 – Electrical Core",
    branch: ["eee"],
    videos: makeVideoLinks("Electric Circuit Theory KCL KVL Thevenin Transformer"),
    studyMaterial: {
      summary: `Electrical circuits obey fundamental conservation laws:
- Kirchhoff's Current Law (KCL): ∑ I_in = ∑ I_out at any node (Charge Conservation).
- Kirchhoff's Voltage Law (KVL): ∑ V = 0 around any closed loop (Energy Conservation).
Thevenin's Theorem: Reduces any linear two-terminal circuit to an equivalent voltage source V_th in series with resistance R_th.
Transformers: Step up or step down AC voltage using mutual induction: V1/V2 = N1/N2 = I2/I1.`,
      keyPoints: [
        "KCL applies to nodal analysis; KVL applies to mesh loop analysis.",
        "To find R_th: Deactivate all independent sources (short voltage sources, open current sources).",
        "Transformer losses: Copper loss (I²R in windings) and Core loss (Hysteresis + Eddy Current).",
        "Power Factor (cos φ) = Real Power (P in kW) / Apparent Power (S in kVA)."
      ],
      example: `Two resistors 6Ω and 3Ω are in parallel connected across a 12V battery.
Equivalent Resistance R_eq = (6 * 3) / (6 + 3) = 18 / 9 = 2Ω.
Total Supply Current I = V / R_eq = 12 / 2 = 6A.
Current in 6Ω resistor = 6 * (3 / 9) = 2A.
Current in 3Ω resistor = 6 * (6 / 9) = 4A.`,
      complexity: "Nodal Matrix Solver: O(v³)"
    },
    aiExplain: {
      steps: [
        "1. Identify essential nodes and independent loops in circuit.",
        "2. Apply KCL at non-reference nodes to set up linear equations.",
        "3. Solve system of equations V = I*R to get node voltages.",
        "4. Calculate branch currents and power dissipation P = V*I.",
        "5. Verify power conservation: ∑ P_supplied = ∑ P_consumed."
      ],
      analogy: "KCL is like water pipes meeting at a junction — total gallons entering per minute must equal total gallons leaving!"
    },
    debug: [
      {
        title: "Fix Parallel Resistance Calculation Bug",
        buggy: `def parallel_req(r1, r2):\n    return r1 + r2 / (r1 * r2) # Bug: wrong operator order`,
        fixed: `def parallel_req(r1, r2):\n    return (r1 * r2) / (r1 + r2)`,
        hint: "Parallel resistance formula is (R1 * R2) / (R1 + R2)."
      }
    ],
    quiz: [
      { q: "What principle underlies Kirchhoff's Current Law (KCL)?", options: ["Conservation of Energy", "Conservation of Charge", "Conservation of Momentum", "Ohm's Law"], answer: 1 },
      { q: "How do you deactivate an independent voltage source when finding R_th?", options: ["Open circuit it", "Short circuit it", "Replace with 1kΩ", "Multiply by 2"], answer: 1 },
      { q: "In a transformer, if turns ratio N1/N2 = 2, what is V1/V2?", options: ["0.5", "1", "2", "4"], answer: 2 },
      { q: "What type of loss in a transformer core is reduced by using laminated sheets?", options: ["Copper loss", "Eddy current loss", "Friction loss", "Dielectric loss"], answer: 1 },
      { q: "What is the power factor of a purely resistive load?", options: ["0", "0.5 lagging", "0.8 leading", "1.0"], answer: 3 }
    ],
    mnc: [
      { company: "Siemens", year: "2023", question: "Why is power transmitted at high voltages over long distances?", answer: "Transmission losses are I²R. Raising voltage lowers current for same power P=VI, dramatically reducing heat loss." },
      { company: "ABB", year: "2023", question: "Explain the working principle of 3-Phase Induction Motor", answer: "3-phase AC in stator creates Rotating Magnetic Field (RMF) at synchronous speed, inducing current in rotor to generate torque." },
      { company: "PowerGrid", year: "2022", question: "How to improve power factor in industrial plants?", answer: "Connect capacitor banks in parallel with inductive loads to supply lagging reactive power (kVAR)." }
    ],
    mock: [
      { type: "Technical", question: "What is the difference between Synchronous Speed and Rotor Speed in Induction Motor?", tip: "Rotor speed N is always slightly less than Synchronous speed Ns; the relative speed difference is called Slip s = (Ns - N) / Ns." }
    ],
    coding: {
      problem: "Parallel Equivalent Resistance",
      desc: "Calculate equivalent resistance for an array of parallel resistors.",
      input: "resistors = [6, 3]",
      output: "2.0",
      starter: `def parallel_resistance(resistors):\n    # Return 1 / sum(1/r for r in resistors)\n    pass`
    }
  }
];
