// EEE branch — full syllabus for all role tracks.
export type SyllabusItem = { id: string; title: string; type: "concept" | "checklist" | "resource" };
export type SyllabusLevel = { id: string; level: number; title: string; description: string; items: SyllabusItem[] };

export const EEE_SYLLABUS: Record<string, SyllabusLevel[]> = {
  "eee-power": [
    { id: "l1", level: 1, title: "Power Systems Foundations", description: "Core power concepts",
      items: [
        { id: "i1", title: "Generation, transmission, distribution basics", type: "concept" },
        { id: "i2", title: "Three-phase systems, per-unit calculations", type: "concept" },
      ] },
    { id: "l2", level: 2, title: "Protection & Stability", description: "Keeping the grid safe",
      items: [
        { id: "i1", title: "Relays, circuit breakers, protection schemes", type: "concept" },
        { id: "i2", title: "Load flow analysis basics", type: "checklist" },
      ] },
    { id: "l3", level: 3, title: "Placement Ready", description: "Interview prep",
      items: [
        { id: "i1", title: "Mock interview: explain grounding and protection systems", type: "checklist" },
        { id: "i2", title: "Get your Placement Readiness Score from AI", type: "checklist" },
      ] },
  ],
  "eee-control": [
    { id: "l1", level: 1, title: "Control Theory Foundations", description: "Core concepts",
      items: [
        { id: "i1", title: "Transfer functions, block diagrams", type: "concept" },
        { id: "i2", title: "PID control fundamentals", type: "concept" },
      ] },
    { id: "l2", level: 2, title: "Applied Control Systems", description: "Real-world control",
      items: [
        { id: "i1", title: "PLC programming basics", type: "checklist" },
        { id: "i2", title: "Build 1 control system project (e.g., temperature control)", type: "checklist" },
      ] },
    { id: "l3", level: 3, title: "Placement Ready", description: "Interview prep",
      items: [
        { id: "i1", title: "Mock interview: tune a PID controller scenario", type: "checklist" },
        { id: "i2", title: "Get your Placement Readiness Score from AI", type: "checklist" },
      ] },
  ],
  "eee-design": [
    { id: "l1", level: 1, title: "Circuit Design Foundations", description: "Core electrical design",
      items: [
        { id: "i1", title: "Circuit analysis, component selection", type: "concept" },
        { id: "i2", title: "PCB design basics", type: "concept" },
      ] },
    { id: "l2", level: 2, title: "Design Tools & Practice", description: "Practical design skills",
      items: [
        { id: "i1", title: "CAD tools (AutoCAD Electrical/EPLAN)", type: "checklist" },
        { id: "i2", title: "Design 1 electrical panel/circuit end to end", type: "checklist" },
      ] },
    { id: "l3", level: 3, title: "Placement Ready", description: "Interview prep",
      items: [
        { id: "i1", title: "Mock interview: walk through a circuit design decision", type: "checklist" },
        { id: "i2", title: "Get your Placement Readiness Score from AI", type: "checklist" },
      ] },
  ],
  "eee-renewable": [
    { id: "l1", level: 1, title: "Renewable Energy Foundations", description: "Core concepts",
      items: [
        { id: "i1", title: "Solar PV fundamentals, wind energy basics", type: "concept" },
      ] },
    { id: "l2", level: 2, title: "System Design", description: "Practical renewable systems",
      items: [
        { id: "i1", title: "Inverter/charge controller sizing", type: "checklist" },
        { id: "i2", title: "Design 1 solar system for a given load", type: "checklist" },
      ] },
    { id: "l3", level: 3, title: "Placement Ready", description: "Interview prep",
      items: [
        { id: "i1", title: "Mock interview: size a solar system for a household", type: "checklist" },
        { id: "i2", title: "Get your Placement Readiness Score from AI", type: "checklist" },
      ] },
  ],
  "eee-automation": [
    { id: "l1", level: 1, title: "Automation Foundations", description: "Core concepts",
      items: [
        { id: "i1", title: "PLC/SCADA basics, ladder logic", type: "concept" },
      ] },
    { id: "l2", level: 2, title: "Industrial Automation", description: "Applied automation",
      items: [
        { id: "i1", title: "Sensors, actuators, HMI basics", type: "checklist" },
        { id: "i2", title: "Build 1 automation project (ladder logic simulation)", type: "checklist" },
      ] },
    { id: "l3", level: 3, title: "Placement Ready", description: "Interview prep",
      items: [
        { id: "i1", title: "Mock interview: design a ladder logic for a conveyor system", type: "checklist" },
        { id: "i2", title: "Get your Placement Readiness Score from AI", type: "checklist" },
      ] },
  ],
};
