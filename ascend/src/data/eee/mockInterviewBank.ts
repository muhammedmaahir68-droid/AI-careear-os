// EEE branch — mock interview question bank.
export type MockQuestion = { question: string; difficulty: "easy" | "medium" | "hard"; ideal_answer_points: string };

export const EEE_MOCK_INTERVIEW: Record<string, MockQuestion[]> = {
  "eee-power": [
    { question: "What is per-unit system and why is it used in power system analysis?", difficulty: "easy",
      ideal_answer_points: "Normalizes quantities relative to a base, simplifies calculations across transformers." },
    { question: "Explain the difference between real power, reactive power, and apparent power.", difficulty: "medium",
      ideal_answer_points: "P (working), Q (non-working, reactive), S (vector sum); power factor relationship." },
    { question: "Design a protection scheme for a distribution feeder against overcurrent faults.", difficulty: "hard",
      ideal_answer_points: "Relay coordination, breaker selection, time-current curves." },
  ],
  "eee-control": [
    { question: "What is system stability, and how do poles determine it?", difficulty: "easy",
      ideal_answer_points: "Poles in the left half-plane (continuous) mean a stable system." },
    { question: "Explain the difference between feedback and feedforward control.", difficulty: "medium",
      ideal_answer_points: "Feedback reacts to error; feedforward anticipates disturbances proactively." },
    { question: "Design a control system for maintaining constant temperature in an industrial oven.", difficulty: "hard",
      ideal_answer_points: "Sensor choice, actuator, PID tuning, safety interlocks." },
  ],
  "eee-design": [
    { question: "What is the difference between AC and DC circuit analysis?", difficulty: "easy",
      ideal_answer_points: "Phasor/frequency-domain analysis vs steady-state resistive analysis." },
    { question: "Explain grounding and its importance in electrical design.", difficulty: "medium",
      ideal_answer_points: "Safety, fault current path, equipment protection." },
    { question: "Design the electrical layout for a small manufacturing unit's power distribution.", difficulty: "hard",
      ideal_answer_points: "Load calculation, panel sizing, cable routing, protection devices." },
  ],
  "eee-renewable": [
    { question: "What is the difference between a string inverter and a microinverter?", difficulty: "easy",
      ideal_answer_points: "Central conversion for a panel string vs per-panel conversion; shading tolerance differs." },
    { question: "Explain Maximum Power Point Tracking (MPPT).", difficulty: "medium",
      ideal_answer_points: "Algorithm to extract maximum available power from a solar panel under varying conditions." },
    { question: "Design a hybrid solar-grid system for a facility needing backup power.", difficulty: "hard",
      ideal_answer_points: "Sizing, transfer switch logic, battery backup, grid interconnection compliance." },
  ],
  "eee-automation": [
    { question: "What is the difference between analog and digital I/O in PLCs?", difficulty: "easy",
      ideal_answer_points: "Continuous signal range vs on/off states." },
    { question: "Explain the purpose of an HMI in an automated system.", difficulty: "medium",
      ideal_answer_points: "Human-machine interface for monitoring/control by operators." },
    { question: "Design a PLC-based control system for a bottle-filling production line.", difficulty: "hard",
      ideal_answer_points: "Sensor placement, sequencing logic, fault handling, safety stops." },
  ],
};
