import type { BranchModuleData } from "./types";
import { makeVideoLinks } from "./types";

type MechanicalTopic = {
  title: string;
  level: string;
  search: string;
  summary: string;
  principle: string;
  formula: string;
  example: string;
  analogy: string;
  debugBug: string;
  debugFix: string;
  debugHint: string;
  company: string;
  interview: string;
  interviewAnswer: string;
  codingProblem: string;
  codingDescription: string;
  codingInput: string;
  codingOutput: string;
  starter: string;
};

const buildMechanicalTopic = (topic: MechanicalTopic): BranchModuleData => ({
  moduleTitle: topic.title,
  level: topic.level,
  branch: ["mech"],
  videos: makeVideoLinks(topic.search),
  studyMaterial: {
    summary: topic.summary,
    deepDiveTextbook: `Start every ${topic.title} problem by defining the system boundary, assumptions, units, and acceptance criterion. ${topic.principle} Use the governing relationship ${topic.formula}; then validate whether the result is physically realistic before selecting a design or operating decision.`,
    keyPoints: [
      topic.principle,
      `Core relationship: ${topic.formula}`,
      "Keep units consistent before substituting numerical values.",
      "State assumptions explicitly; they determine whether a simple model is valid."
    ],
    example: topic.example,
    complexity: "Engineering calculation: O(1); detailed design requires iteration and validation."
  },
  aiExplain: {
    steps: [
      "Identify the component, inputs, constraints, and required output.",
      "Draw a diagram or process flow and list known quantities with units.",
      `Apply ${topic.formula} using justified assumptions.`,
      "Check signs, limiting cases, safety margins, and practical manufacturability.",
      "Communicate the recommendation with the calculation and its assumptions."
    ],
    analogy: topic.analogy
  },
  debug: [{ title: `Fix a ${topic.title} calculation error`, buggy: topic.debugBug, fixed: topic.debugFix, hint: topic.debugHint }],
  quiz: [
    { q: `Which statement best describes the central idea in ${topic.title}?`, options: [topic.principle, "Ignore operating constraints", "Use mixed units without conversion", "Assume every process is lossless"], answer: 0 },
    { q: `Which relationship should be checked first for this topic?`, options: [topic.formula, "F = ma only", "V = IR only", "pH = -log[H+] only"], answer: 0 },
    { q: "What is the safest first step before calculation?", options: ["Define system and units", "Round all inputs", "Skip assumptions", "Choose a material by colour"], answer: 0 },
    { q: "Why are engineering assumptions documented?", options: ["They establish model validity", "They remove the need for testing", "They guarantee zero cost", "They replace units"], answer: 0 },
    { q: "Which is a sound final check?", options: ["Compare result with physical limits", "Accept any positive value", "Delete units", "Increase load until failure"], answer: 0 }
  ],
  mnc: [
    { company: topic.company, year: "2024", question: topic.interview, answer: topic.interviewAnswer },
    { company: "Tata Motors", year: "2023", question: `How would you validate an engineering decision involving ${topic.title}?`, answer: "Define requirements, calculate using a traceable model, review assumptions, compare against test or simulation data, and document safety and manufacturing constraints." },
    { company: "L&T", year: "2023", question: "What do you do when a calculated value conflicts with shop-floor observations?", answer: "Check measurements and units, revisit assumptions and boundary conditions, then update the model only after identifying the discrepancy's cause." }
  ],
  mock: [{ type: "Technical", question: `Explain how you would apply ${topic.title} to a component failure investigation.`, tip: "Use a structured answer: define failure mode, collect operating data, calculate the governing quantity, identify root cause, and recommend verification." }],
  coding: { problem: topic.codingProblem, desc: topic.codingDescription, input: topic.codingInput, output: topic.codingOutput, starter: topic.starter }
});

export const MECH_MODULES: BranchModuleData[] = [
  {
    moduleTitle: "Mechatronics, PID Controllers & Robotics",
    level: "Level 1 – Automation Core",
    branch: ["mech"],
    videos: makeVideoLinks("PID Controller Mechatronics Robotics Feedback Loops"),
    studyMaterial: {
      summary: `Mechatronics combines Mechanical Engineering, Electronics, and Computer Control.
PID Controller regulates process variables (position, speed, temperature) using error e(t) = target - actual:
- Proportional (P): Output ∝ e(t). High Kp speeds response but increases overshoot.
- Integral (I): Output ∝ ∫e(t)dt. Eliminates steady-state error.
- Derivative (D): Output ∝ de(t)/dt. Damps system oscillation and reduces overshoot.`,
      keyPoints: [
        "PID Control Law: u(t) = Kp * e(t) + Ki * ∫e(t)dt + Kd * (de/dt).",
        "Zeroth Law of Thermodynamics defines thermal equilibrium and temperature.",
        "First Law: Energy conservation ΔU = Q - W.",
        "Bernoulli's Equation: P + 0.5*ρ*v² + ρ*g*h = Constant along a streamline."
      ],
      example: `# Python PID Controller Loop Simulation
class PIDController:
    def __init__(self, kp, ki, kd):
        self.kp, self.ki, self.kd = kp, ki, kd
        self.integral = 0
        self.prev_error = 0

    def update(self, setpoint, measured_value, dt):
        error = setpoint - measured_value
        self.integral += error * dt
        derivative = (error - self.prev_error) / dt
        self.prev_error = error
        return (self.kp * error) + (self.ki * self.integral) + (self.kd * derivative)`,
      complexity: "Update Step: O(1) time"
    },
    aiExplain: {
      steps: [
        "1. Compute error e(t) = Target_Setpoint - Sensor_Reading.",
        "2. P term pushes towards goal proportional to current gap.",
        "3. I term accumulates persistent small errors to reach exact target.",
        "4. D term predicts future trajectory to apply gentle braking.",
        "5. Output u(t) drives actuators (motors, valves, heaters)."
      ],
      analogy: "Driving a car: P is pressing gas when far from target speed; I is steadily holding pedal to overcome uphill resistance; D is applying brakes smoothly as you approach red light!"
    },
    debug: [
      {
        title: "Fix PID Integral Windup Bug",
        buggy: `def update(self, error, dt):\n    self.integral += error # Bug: missing dt factor and no anti-windup clamping`,
        fixed: `def update(self, error, dt):\n    self.integral += error * dt\n    self.integral = max(-100, min(100, self.integral)) # Clamp anti-windup`,
        hint: "Multiply error by dt for numerical integration and clamp integral term to prevent windup overflow."
      }
    ],
    quiz: [
      { q: "Which term in PID controller eliminates steady-state error?", options: ["Proportional (P)", "Integral (I)", "Derivative (D)", "Feedforward"], answer: 1 },
      { q: "What does the Derivative (D) term respond to?", options: ["Accumulated error history", "Current error magnitude", "Rate of change of error", "Constant offset"], answer: 2 },
      { q: "Which law of thermodynamics states energy cannot be created or destroyed?", options: ["Zeroth Law", "First Law", "Second Law", "Third Law"], answer: 1 },
      { q: "What equation governs incompressible frictionless fluid flow along streamline?", options: ["Navier-Stokes", "Bernoulli's Equation", "Fourier's Law", "Euler Equation"], answer: 1 },
      { q: "In robotics, what is Kinematics?", options: ["Study of motion without considering forces", "Study of motor currents", "CAD modeling", "Thermal stress analysis"], answer: 0 }
    ],
    mnc: [
      { company: "Tata Motors", year: "2023", question: "Explain the role of ECU in Electric Vehicle thermal management", answer: "Electronic Control Unit (ECU) monitors battery temperature via sensors and regulates liquid coolant pumps using PID loops." },
      { company: "Bosch", year: "2023", question: "Difference between Open Loop and Closed Loop Control Systems", answer: "Open Loop has no feedback (e.g. simple timer toaster); Closed Loop uses sensor feedback to adjust output continuously (e.g. cruise control)." },
      { company: "L&T", year: "2022", question: "Explain 4th Industrial Revolution (Industry 4.0) concepts in Manufacturing", answer: "Integration of Cyber-Physical Systems, IoT sensor networks, digital twins, and AI automation on factory floors." }
    ],
    mock: [
      { type: "Technical", question: "What is a Digital Twin in modern mechanical engineering?", tip: "A real-time virtual simulation model of a physical machine synced with IoT sensors to predict maintenance needs before failures occur." }
    ],
    coding: {
      problem: "Proportional Controller Step",
      desc: "Implement a simple P-controller step that returns control signal given setpoint, measured value, and Kp.",
      input: "setpoint = 100, measured = 80, Kp = 0.5",
      output: "10.0",
      starter: `def p_control(setpoint, measured, kp):\n    # Return Kp * error\n    pass`
    }
  },
  {
    moduleTitle: "Engineering Mechanics & Strength of Materials",
    level: "Level 1 – Fundamentals",
    branch: ["mech"],
    videos: makeVideoLinks("Engineering Mechanics Statics Dynamics Stress Strain Friction Moment of Inertia"),
    studyMaterial: {
      summary: `Engineering Mechanics analyzes forces and their effects on rigid and deformable bodies:

Statics & Equilibrium:
- Coplanar Force Systems: ∑ F_x = 0, ∑ F_y = 0, ∑ M = 0.
- Free Body Diagrams (FBD): Isolate body showing all external reaction forces and loads.
- Centroids & Area Moment of Inertia (I_x, I_y): Parallel Axis Theorem I = I_g + A * d².

Strength of Materials (SOM):
- Stress σ = Force / Area (N/mm² or MPa). Strain ε = ΔL / L (Dimensionless).
- Hooke's Law: Stress = Young's Modulus E * Strain (within elastic limit).
- Bending Stress Formula: σ / y = M / I = E / R.
- Torsion Formula for circular shafts: T / J = τ / r = G * θ / L.`,
      keyPoints: [
        "Young's Modulus E = Stress / Strain measures material stiffness.",
        "Poisson's Ratio ν = - Lateral Strain / Longitudinal Strain (typically 0.25 - 0.35 for metals).",
        "Shear Force Diagram (SFD) and Bending Moment Diagram (BMD) locate maximum bending stress.",
        "Factor of Safety (FOS) = Ultimate Strength / Allowable Working Stress."
      ],
      example: `# Python Stress-Strain & Young's Modulus
def calculate_stress_strain(force_n, area_mm2, orig_len_mm, delta_len_mm):
    stress = force_n / area_mm2 # MPa
    strain = delta_len_mm / orig_len_mm
    youngs_modulus = stress / strain # MPa
    return stress, strain, youngs_modulus

print("Stress(MPa), Strain, E(GPa):", calculate_stress_strain(10000, 100, 1000, 0.5))`,
      complexity: "Beam Bending Equation: Linear differential solver"
    },
    aiExplain: {
      steps: [
        "1. Isolate structural member and draw Free Body Diagram (FBD).",
        "2. Apply equilibrium equations ∑F=0 and ∑M=0 to calculate support reactions.",
        "3. Draw Shear Force (SFD) and Bending Moment (BMD) diagrams along beam length.",
        "4. Identify location of maximum bending moment M_max.",
        "5. Apply Bending Stress formula σ = M * y / I to ensure σ < Allowable Yield Stress."
      ],
      analogy: "Young's Modulus is like the springiness of a mattress: a steel mattress barely dips under heavy weight (high E), while a foam mattress dips easily (low E)!"
    },
    debug: [
      {
        title: "Fix Bending Stress Units Bug",
        buggy: `# BUG: Mixing meters and millimeters in bending stress calculation\ndef bending_stress(m_nm, y_mm, i_mm4):\n    return (m_nm * y_mm) / i_mm4 # Incorrect units (Nm vs mm)!`,
        fixed: `def bending_stress(m_nm, y_mm, i_mm4):\n    m_nmm = m_nm * 1000 # Convert Nm to N-mm\n    return (m_nmm * y_mm) / i_mm4`,
        hint: "Convert Bending Moment M from N-m to N-mm by multiplying by 1000 so stress is in N/mm² (MPa)."
      }
    ],
    quiz: [
      { q: "What is the ratio of stress to strain within the elastic limit called?", options: ["Bulk Modulus", "Young's Modulus", "Shear Modulus", "Poisson's Ratio"], answer: 1 },
      { q: "What is the unit of Stress in SI system?", options: ["Newton (N)", "Pascal (Pa) or N/m²", "Joule (J)", "Watt (W)"], answer: 1 },
      { q: "According to Parallel Axis Theorem, what is I_x equal to?", options: ["I_g - A*d²", "I_g + A*d²", "I_g * d²", "I_g / A"], answer: 1 },
      { q: "Where does maximum bending stress occur in a symmetrical beam section?", options: ["At the Neutral Axis", "At the extreme top/bottom fibers", "At mid-height", "At support ends"], answer: 1 },
      { q: "What is Poisson's ratio for an ideal incompressible material?", options: ["0", "0.25", "0.5", "1.0"], answer: 2 }
    ],
    mnc: [
      { company: "L&T", year: "2023", question: "Explain Euler's Column Buckling formula for critical load P_cr", answer: "P_cr = (π² * E * I) / (L_eq)². L_eq depends on end conditions: both ends hinged (L_eq = L), fixed-free (L_eq = 2L), both ends fixed (L_eq = 0.5L)." },
      { company: "Tata Motors", year: "2023", question: "Difference between Ductile and Brittle fracture", answer: "Ductile materials (Steel) undergo significant plastic deformation with necking before failure; Brittle materials (Cast Iron) fail suddenly along cleavage planes without warning." },
      { company: "Mahindra", year: "2022", question: "What is Mohr's Circle used for in stress analysis?", answer: "Graphical representation of principal stresses and maximum shear stress at any inclined plane in a 2D bi-axial stress element." }
    ],
    mock: [
      { type: "Technical", question: "Why are I-beams widely used in structural construction over solid rectangular beams?", tip: "An I-beam places most material at top and bottom flanges (far from neutral axis), maximizing Area Moment of Inertia I for maximum bending resistance per unit weight." }
    ],
    coding: {
      problem: "Calculate Bending Stress",
      desc: "Given Moment M (Nm), distance from neutral axis y (mm), and Moment of Inertia I (mm4), return stress in MPa.",
      input: "m_nm = 500, y_mm = 50, i_mm4 = 1000000",
      output: "25.0",
      starter: `def bending_stress_mpa(m_nm, y_mm, i_mm4):\n    # Return (M * 1000 * y) / I\n    pass`
    }
  },
  {
    moduleTitle: "Thermodynamics & Thermal Power Engineering",
    level: "Level 2 – Thermal Core",
    branch: ["mech"],
    videos: makeVideoLinks("Thermodynamics Laws Carnot Cycle Rankine Cycle IC Engines Otto Diesel"),
    studyMaterial: {
      summary: `Thermodynamics studies energy transformations between heat and mechanical work:

Laws of Thermodynamics:
- Zeroth Law: Basis of temperature measurement.
- First Law: Energy Conservation ΔU = Q - W.
- Second Law: Heat cannot spontaneously flow from cold to hot without external work (Clausius statement); No heat engine can have 100% efficiency (Kelvin-Planck statement).
- Third Law: Entropy of a pure crystalline substance approaches zero as absolute temperature T → 0 K.

Thermodynamic Cycles:
- Carnot Cycle: Reversible ideal cycle with maximum efficiency η_Carnot = 1 - T_C / T_H.
- Otto Cycle: Gasoline 4-stroke engine (constant volume heat addition).
- Diesel Cycle: Diesel engine (constant pressure heat addition).
- Rankine Cycle: Steam power plants (Boiler, Turbine, Condenser, Pump).`,
      keyPoints: [
        "Carnot efficiency depends ONLY on absolute temperatures of hot (T_H) and cold (T_C) reservoirs in Kelvin.",
        "Entropy (S) is a measure of molecular disorder and energy degradation (ΔS ≥ 0 for irreversible processes).",
        "Otto cycle efficiency increases with compression ratio r: η = 1 - (1 / r^(γ-1)).",
        "Enthalpy H = U + P*V."
      ],
      example: `# Python Carnot Efficiency Calculator
def carnot_efficiency(temp_celsius_hot, temp_celsius_cold):
    t_h = temp_celsius_hot + 273.15
    t_c = temp_celsius_cold + 273.15
    eff = 1.0 - (t_c / t_h)
    return eff * 100 # Percentage

print("Carnot Efficiency (%):", carnot_efficiency(500, 30)) # Output: ~60.78%`,
      complexity: "Cycle State Calculation: O(1) algebraic formulas"
    },
    aiExplain: {
      steps: [
        "1. Identify system type (Closed, Open/Control Volume, Isolated).",
        "2. Convert temperatures to Kelvin absolute scale T(K) = T(°C) + 273.15.",
        "3. Apply 1st Law Energy Equation: Q_in - W_out = ΔU (or ΔH for open systems).",
        "4. Calculate cycle efficiency η = Net Work / Heat Input.",
        "5. Evaluate entropy generation ΔS_gen to check 2nd Law feasibility."
      ],
      analogy: "Entropy is like messy room clutter: without putting energy into cleaning it, things naturally get messier over time (2nd Law — disorder always increases)!"
    },
    debug: [
      {
        title: "Fix Temperature Unit Bug in Carnot Efficiency",
        buggy: `# BUG: Using Celsius directly instead of Kelvin\ndef carnot(th_c, tc_c):\n    return 1 - (tc_c / th_c) # WRONG result when using Celsius!`,
        fixed: `def carnot(th_c, tc_c):\n    th_k = th_c + 273.15\n    tc_k = tc_c + 273.15\n    return 1 - (tc_k / th_k)`,
        hint: "Thermodynamic equations MUST convert temperatures to Kelvin absolute scale."
      }
    ],
    quiz: [
      { q: "What is the Carnot efficiency of an engine operating between 600 K and 300 K?", options: ["25%", "50%", "75%", "100%"], answer: 1 },
      { q: "Which cycle models the ideal operation of a spark-ignition (gasoline) engine?", options: ["Rankine Cycle", "Diesel Cycle", "Otto Cycle", "Brayton Cycle"], answer: 2 },
      { q: "Which law of thermodynamics defines the concept of Entropy?", options: ["Zeroth Law", "First Law", "Second Law", "Third Law"], answer: 2 },
      { q: "What process takes place at constant volume?", options: ["Isothermal", "Isobaric", "Isochoric", "Adiabatic"], answer: 2 },
      { q: "In an Adiabatic process, what is the heat transfer Q equal to?", options: ["Q = W", "Q = 0", "Q = ΔU", "Q = Infinity"], answer: 1 }
    ],
    mnc: [
      { company: "BHEL", year: "2023", question: "How does Reheating and Regeneration improve thermal efficiency in Rankine Steam Power Plants?", answer: "Reheating expands steam in stages to keep moisture < 12% at turbine exit. Regeneration uses bled steam to preheat boiler feed water, raising mean temperature of heat addition." },
      { company: "Thermax", year: "2023", question: "Difference between Otto and Diesel cycle compression ratios", answer: "Otto cycle compression ratio r = 6-10 (limited by knocking/pre-ignition); Diesel cycle compression ratio r = 14-22 (uses high heat of compression to auto-ignite diesel fuel)." },
      { company: "Ashok Leyland", year: "2022", question: "What is Knocking/Detonation in IC Engines?", answer: "Uncontrolled rapid auto-ignition of unburned end-gas ahead of flame front, causing sharp metallic pinging noises and high pressure spikes." }
    ],
    mock: [
      { type: "Technical", question: "Why can no real heat engine achieve Carnot efficiency?", tip: "Carnot cycle assumes frictionless reversible processes and infinitely slow isothermal heat transfer, which are impossible in real friction-filled, fast-moving physical engines." }
    ],
    coding: {
      problem: "Carnot Engine Efficiency",
      desc: "Given hot reservoir temp TH (°C) and cold reservoir TC (°C), return Carnot efficiency percentage rounded to 2 decimal places.",
      input: "th_c = 400, tc_c = 25",
      output: "55.69",
      starter: `def carnot_eff_percent(th_c, tc_c):\n    # Return percentage efficiency\n    pass`
    }
  },
  {
    moduleTitle: "Fluid Mechanics & Turbo-Machinery",
    level: "Level 3 – Fluids Core",
    branch: ["mech"],
    videos: makeVideoLinks("Fluid Mechanics Bernoulli Equation Reynolds Number Viscosity Pumps Turbines"),
    studyMaterial: {
      summary: `Fluid Mechanics investigates behavior of liquids and gases at rest and in motion:

Fluid Statics:
- Pascal's Law: Pressure in a fluid at rest is isotropic (equal in all directions).
- Hydrostatic Pressure: P = ρ * g * h.
- Buoyancy (Archimedes' Principle): Buoyant force F_b = Weight of displaced fluid.

Fluid Dynamics:
- Continuity Equation (Mass Conservation): A1 * V1 = A2 * V2 (for incompressible flow).
- Bernoulli's Equation (Energy Conservation): P / (ρ*g) + V² / (2g) + z = Constant.
- Reynolds Number (Re): Re = (ρ * V * D) / μ.
  • Re < 2000: Smooth Laminar Flow.
  • Re > 4000: Chaotic Turbulent Flow.

Turbo-Machinery:
- Hydraulic Turbines: Pelton Wheel (Impulse turbine for high head), Francis / Kaplan (Reaction turbines for medium/low head).
- Centrifugal Pumps: Convert mechanical energy into hydraulic head via rotating impeller. Cavitation occurs if pressure drops below vapor pressure P_v.`,
      keyPoints: [
        "Continuity equation A1*V1 = A2*V2 shows velocity increases when pipe area decreases.",
        "Bernoulli's equation trades off static pressure P and dynamic pressure 0.5*ρ*V².",
        "Reynolds Number Re determines transition from smooth laminar flow to turbulent mixing.",
        "Cavitation forms vapor bubbles that collapse violently on impeller blades, causing pitting and erosion."
      ],
      example: `# Python Pipe Flow Velocity via Continuity Equation
def pipe_exit_velocity(diameter1_m, velocity1_m_s, diameter2_m):
    area1 = (3.14159 / 4.0) * (diameter1_m ** 2)
    area2 = (3.14159 / 4.0) * (diameter2_m ** 2)
    velocity2 = (area1 * velocity1_m_s) / area2
    return velocity2

print("Exit Velocity (m/s):", pipe_exit_velocity(0.1, 2.0, 0.05)) # Output: 8.0 m/s`,
      complexity: "Navier-Stokes Solver: Non-linear PDE (CFD numerical integration)"
    },
    aiExplain: {
      steps: [
        "1. Check if fluid is incompressible (Mach number M < 0.3).",
        "2. Apply Continuity Equation A1*V1 = A2*V2 to find local flow velocities.",
        "3. Calculate Reynolds Number Re = ρVD/μ to classify flow regime (Laminar vs Turbulent).",
        "4. Apply Bernoulli's equation along streamline to calculate static pressure drops.",
        "5. Check Net Positive Suction Head (NPSH) for pumps to prevent Cavitation."
      ],
      analogy: "Putting your thumb over the end of a garden hose reduces the outlet area (A2), forcing water to jet out at much higher velocity (V2) as predicted by the Continuity Equation!"
    },
    debug: [
      {
        title: "Fix Pipe Area Calculation Bug",
        buggy: `# BUG: Using radius instead of diameter in area formula with d^2\ndef area(d):\n    return 3.14159 * d ** 2 # Incorrect by 4x factor!`,
        fixed: `def area(d):\n    return (3.14159 / 4.0) * (d ** 2)`,
        hint: "Area of circular pipe in terms of diameter D is (π / 4) * D²."
      }
    ],
    quiz: [
      { q: "What flow regime exists in a pipe when Reynolds Number Re < 2000?", options: ["Turbulent", "Laminar", "Transitional", "Compressible"], answer: 1 },
      { q: "What equation expresses conservation of mass in fluid flow?", options: ["Bernoulli's Equation", "Continuity Equation", "Fourier's Law", "Euler Equation"], answer: 1 },
      { q: "Which hydraulic turbine is an Impulse Turbine designed for high heads?", options: ["Francis Turbine", "Kaplan Turbine", "Pelton Wheel", "Propeller Turbine"], answer: 2 },
      { q: "What harmful phenomenon occurs in pumps when local pressure drops below liquid vapor pressure?", options: ["Water Hammer", "Cavitation", "Surging", "Aliasing"], answer: 1 },
      { q: "According to Pascal's Law, how is static pressure transmitted in a fluid at rest?", options: ["Only downwards", "Equally in all directions", "Only horizontally", "Towards walls"], answer: 1 }
    ],
    mnc: [
      { company: "Flowserve", year: "2023", question: "Explain Net Positive Suction Head (NPSH) required vs available for centrifugal pumps", answer: "NPSHA = (P_atm - P_v)/(ρg) + h_s - h_f. For pump operation without damaging cavitation, NPSHA MUST be greater than NPSHR specified by pump manufacturer." },
      { company: "KSB Pumps", year: "2023", question: "Difference between Francis and Kaplan turbines", answer: "Francis is mixed-flow reaction turbine for medium heads (40-300m); Kaplan is axial-flow reaction turbine with adjustable runner blades for low heads (< 40m) and high flow rates." },
      { company: "L&T Hydro", year: "2022", question: "What is Water Hammer in pipelines and how is it mitigated?", answer: "High pressure shock wave caused by sudden valve closure. Mitigated using slow-closing valves, surge tanks, or air vessels." }
    ],
    mock: [
      { type: "Technical", question: "Why does dynamic pressure increase when static pressure decreases in a venturi tube?", tip: "Bernoulli's Principle: Total Head = P/(ρg) + V²/(2g) + z = Constant. As fluid enters narrow throat, velocity V increases (increasing dynamic pressure V²/(2g)), so static pressure P MUST drop to preserve constant total energy." }
    ],
    coding: {
      problem: "Reynolds Number Flow Classifier",
      desc: "Given density, velocity, diameter, and dynamic viscosity, return 'Laminar' (Re < 2000), 'Transitional' (2000 <= Re <= 4000), or 'Turbulent' (Re > 4000).",
      input: "rho = 1000, v = 1.5, d = 0.05, mu = 0.001",
      output: "Turbulent",
      starter: `def classify_flow(rho, v, d, mu):\n    # Re = (rho * v * d) / mu\n    pass`
    }
  },
  {
    moduleTitle: "CAD/CAM, CNC Programming & Industry 4.0",
    level: "Level 4 – Advanced Manufacturing",
    branch: ["mech"],
    videos: makeVideoLinks("CAD CAM CNC Programming G Code M Code Industry 4.0 Digital Twin Automation"),
    studyMaterial: {
      summary: `Modern manufacturing integrates Digital Design (CAD), Computer-Aided Manufacturing (CAM), and Smart Automation:

CAD/CAM Systems:
- Computer-Aided Design (CAD): 3D Parametric Solid Modeling (CATIA, SolidWorks, Creo), Surface Modeling, Assembly Constraints.
- Computer-Aided Manufacturing (CAM): Generates cutter location (CL) data and translates into CNC G-Codes & M-Codes.

CNC Programming:
- G-Codes (Preparatory Functions):
  • G00: Rapid Positioning.
  • G01: Linear Interpolation (cutting feed).
  • G02 / G03: Clockwise / Counter-Clockwise Circular Interpolation.
- M-Codes (Miscellaneous Functions):
  • M03: Spindle ON Clockwise.
  • M05: Spindle Stop.
  • M06: Tool Change.
  • M30: Program End and Reset.

Industry 4.0 & Smart Factories:
- Industrial Internet of Things (IIoT), Digital Twins, Automated Guided Vehicles (AGVs), Collaborative Robots (Cobots), Additive Manufacturing (3D Printing - FDM, SLA, SLS).`,
      keyPoints: [
        "G00 is rapid traverse (non-cutting movement); G01 is controlled linear cutting feed rate (F).",
        "GD&T (Geometric Dimensioning & Tolerancing) specifies feature tolerances like Form, Profile, Orientation, and Runout.",
        "Digital Twin creates a real-time virtual counterpart of physical manufacturing equipment synced via IIoT sensors.",
        "Additive manufacturing (3D printing) builds parts layer-by-layer directly from 3D STL CAD models."
      ],
      example: `( Sample CNC Milling G-Code )
G90 G21 ( Absolute programming, Metric units )
M03 S1500 ( Spindle ON at 1500 RPM )
G00 X0 Y0 Z5 ( Rapid position above workpiece )
G01 Z-2.0 F100 ( Feed down to 2mm depth )
G01 X50.0 Y0 F250 ( Linear cut to X=50 )
G02 X50.0 Y50.0 R25.0 ( Circular arc cut )
G00 Z10 ( Retract tool )
M05 M30 ( Spindle Stop, End of Program )`,
      complexity: "Toolpath Generation: O(N log N) spatial Octree intersection"
    },
    aiExplain: {
      steps: [
        "1. Create 3D CAD model with exact dimensions and GD&T tolerances.",
        "2. Import CAD model into CAM software to define stock material and zero origin (WCS).",
        "3. Select cutting tools (end mills, drills) and set cutting feeds and speeds.",
        "4. Generate G-code toolpaths and run CNC machining simulation.",
        "5. Transfer G-code to CNC machine controller and execute automated machining."
      ],
      analogy: "CAD is writing the musical score; CAM is translating the score into instrument notes; CNC machine is the automated piano playing the song perfectly every single time!"
    },
    debug: [
      {
        title: "Fix G-Code Rapid Collision Risk Bug",
        buggy: `( BUG: Rapid G00 move straight into workpiece without lowering Z safely )\nG00 X50 Y50 Z-5 ( G00 rapid motion while cutting metal will break tool! )`,
        fixed: `G00 X50 Y50 Z5 ( Rapid position above workpiece in clear air )\nG01 Z-5 F100 ( Controlled feed cut into metal using G01 )`,
        hint: "NEVER use G00 (rapid) while cutter is in contact with material! Always use G01 with controlled feed rate F."
      }
    ],
    quiz: [
      { q: "Which G-code commands linear interpolation cutting movement at specified feed rate?", options: ["G00", "G01", "G02", "G03"], answer: 1 },
      { q: "What does M03 code command in CNC programming?", options: ["Coolant ON", "Spindle ON Clockwise", "Tool Change", "Program End"], answer: 1 },
      { q: "What file format is standard for 3D Printing / Additive Manufacturing?", options: ["PDF", "STL", "STEP", "DXF"], answer: 1 },
      { q: "What does G02 command in CNC milling?", options: ["Linear cut", "Clockwise circular arc interpolation", "Counter-clockwise circular arc", "Dwell timer"], answer: 1 },
      { q: "What is a Digital Twin in Industry 4.0?", options: ["Two identical physical machines", "A real-time virtual simulation synced with IoT sensors", "Backup CAD file", "Dual spindle CNC"], answer: 1 }
    ],
    mnc: [
      { company: "Siemens PLM", year: "2023", question: "Explain Subroutines (Canned Cycles) in CNC Programming", answer: "Canned cycles (e.g. G81 drilling cycle, G71 turning cycle) replace repetitive long code blocks with a single parametric instruction." },
      { company: "Bosch", year: "2023", question: "What is OPC-UA protocol in Smart Manufacturing?", answer: "Open Platform Communications Unified Architecture — industrial machine-to-machine communication protocol for secure IIoT data exchange." },
      { company: "Fanuc", year: "2022", question: "Compare 3-Axis vs 5-Axis CNC machining", answer: "3-axis moves along X, Y, Z linear axes. 5-axis adds A and B rotational axes, allowing complex contoured aerospace/medical parts to be machined in a single setup." }
    ],
    mock: [
      { type: "Technical", question: "Why is GD&T (Geometric Dimensioning and Tolerancing) superior to traditional ± coordinate tolerancing?", tip: "GD&T explicitly defines functional geometric requirements (flatness, true position, perpendicularity) using cylindrical tolerance zones, reducing scrap rates while ensuring 100% interchangeable assembly fit." }
    ],
    coding: {
      problem: "CNC G-Code Feed Time Calculator",
      desc: "Calculate machining time in minutes given cut length (mm) and feed rate F (mm/min).",
      input: "cut_length_mm = 250.0, feed_rate_mm_min = 100.0",
      output: "2.5",
      starter: `def machining_time_min(cut_len, feed_rate):\n    # Return cut_len / feed_rate\n    pass`
    }
  },
  ...[
    {
      title: "Machine Design: Shafts, Bearings & Keys", level: "Level 2 – Design Core", search: "Machine Design Shafts Bearings Keys", summary: "Machine design converts loading requirements into safe, manufacturable components. Shaft design combines bending and torsion; bearing selection considers load, speed, life, lubrication, and alignment. Keys transmit torque but introduce stress concentration.", principle: "Design against fatigue as well as static failure, and select a factor of safety appropriate to uncertainty and consequence.", formula: "Equivalent twisting moment Te = sqrt((Kb M)^2 + (Kt T)^2).", example: "For a rotating shaft, calculate bending moment M and torque T, apply shock factors, then size diameter from allowable shear stress.", analogy: "A shaft is like a pencil being twisted while bent: both actions together determine when it fails.", debugBug: "def bearing_life(c, p):\n    return (c / p) ** 3  # Missing rated-life multiplier", debugFix: "def bearing_life(c, p):\n    return ((c / p) ** 3) * 1_000_000  # revolutions", debugHint: "State whether life is in million revolutions or hours and convert using speed.", company: "SKF", interview: "How do you choose between a ball bearing and a roller bearing?", interviewAnswer: "Ball bearings suit moderate radial/axial loads and high speed; roller bearings carry higher radial load but are generally less tolerant of misalignment and very high speed.", codingProblem: "Bearing Life in Hours", codingDescription: "Return L10 life in hours from dynamic rating C, load P, exponent p, and rpm.", codingInput: "C=30000, P=10000, p=3, rpm=1000", codingOutput: "450.0", starter: "def bearing_life_hours(c, load, exponent, rpm):\n    return ((c / load) ** exponent * 1_000_000) / (60 * rpm)" },
    {
      title: "Theory of Machines & Mechanical Vibrations", level: "Level 2 – Dynamics", search: "Theory of Machines Mechanical Vibrations", summary: "Theory of machines studies mechanisms, governors, gears, balancing, and vibration. Vibration analysis predicts resonance, isolation needs, and fatigue risk in rotating equipment.", principle: "Avoid continuous operation near natural frequency because small excitation can create large resonance amplitudes.", formula: "Natural frequency wn = sqrt(k/m); damping ratio zeta = c/(2 sqrt(km)).", example: "A 100 kg machine on springs with k = 160000 N/m has wn = 40 rad/s before damping is considered.", analogy: "Pushing a playground swing at its rhythm builds a large motion; that rhythm is resonance.", debugBug: "omega_n = k / m  # incorrect dimensions", debugFix: "omega_n = (k / m) ** 0.5", debugHint: "Natural frequency is the square root of stiffness divided by mass.", company: "GE Vernova", interview: "What is resonance and how can it be controlled?", interviewAnswer: "Resonance occurs when forcing frequency approaches natural frequency. Change mass or stiffness, add damping, isolate excitation, or avoid the speed range during operation.", codingProblem: "Natural Frequency", codingDescription: "Return undamped natural frequency in rad/s for mass and stiffness.", codingInput: "mass=100, stiffness=160000", codingOutput: "40.0", starter: "def natural_frequency(mass, stiffness):\n    return (stiffness / mass) ** 0.5" },
    {
      title: "Heat Transfer: Conduction, Convection & Radiation", level: "Level 2 – Thermal Analysis", search: "Heat Transfer Conduction Convection Radiation", summary: "Heat transfer governs heat exchangers, engines, electronics cooling, furnaces, and insulation. Engineers choose materials and geometry to control conduction, convection, and radiation.", principle: "Heat flows from higher to lower temperature, with rate determined by thermal resistance and temperature difference.", formula: "Q = k A (T1 - T2) / L for one-dimensional steady conduction.", example: "A wall with high conductivity and small thickness transfers more heat; adding insulation increases resistance and reduces loss.", analogy: "A wool jacket slows heat loss like a high-resistance wall slows conduction.", debugBug: "q = k * area * delta_t * length  # length should divide", debugFix: "q = k * area * delta_t / length", debugHint: "A thicker conducting path raises thermal resistance.", company: "Thermax", interview: "Why are fins used on air-cooled engines?", interviewAnswer: "Fins increase exposed surface area, increasing convective heat transfer when the air-side heat-transfer coefficient is relatively low.", codingProblem: "Wall Heat Rate", codingDescription: "Return steady conduction heat transfer in watts.", codingInput: "k=0.8, area=2, delta_t=50, length=0.1", codingOutput: "800.0", starter: "def conduction_heat_rate(k, area, delta_t, length):\n    return k * area * delta_t / length" },
    {
      title: "Refrigeration, Air Conditioning & HVAC", level: "Level 3 – Thermal Systems", search: "Refrigeration Air Conditioning HVAC Vapor Compression", summary: "HVAC maintains thermal comfort and process conditions using refrigeration cycles, psychrometrics, fans, ducts, and controls. Vapor-compression systems use compressor, condenser, expansion device, and evaporator.", principle: "A refrigeration system moves heat from a low-temperature region by consuming work; capacity and efficiency must both be evaluated.", formula: "COPR = QL / Winput.", example: "If an evaporator removes 12 kW while the compressor uses 3 kW, COP is 4.", analogy: "A refrigerator is a heat pump that carries heat uphill, like lifting water to a higher tank using electricity.", debugBug: "cop = work_input / cooling_load", debugFix: "cop = cooling_load / work_input", debugHint: "Refrigerator COP is useful cooling divided by work input.", company: "Daikin", interview: "What causes evaporator coil frosting?", interviewAnswer: "Moist air condenses and freezes on a coil below 0°C; insufficient airflow, low refrigerant pressure, or failed defrost can worsen it.", codingProblem: "Refrigeration COP", codingDescription: "Return COP from cooling load and work input.", codingInput: "cooling_kw=12, work_kw=3", codingOutput: "4.0", starter: "def refrigeration_cop(cooling_kw, work_kw):\n    return cooling_kw / work_kw" },
    {
      title: "Internal Combustion Engines & Emissions", level: "Level 3 – Automotive Systems", search: "IC Engines Combustion Emissions", summary: "IC-engine performance depends on combustion, air-fuel ratio, compression ratio, timing, heat transfer, friction, and exhaust after-treatment. Modern engines balance power, fuel economy, and emissions.", principle: "Brake power is the usable crankshaft output; indicated power is higher because friction and pumping losses consume energy.", formula: "Brake thermal efficiency = brake power / (fuel mass flow × calorific value).", example: "Measure torque and speed on a dynamometer to calculate brake power, then compare fuel energy rate for efficiency.", analogy: "Indicated power is your full salary; brake power is what remains after unavoidable deductions.", debugBug: "power_w = torque_nm * rpm  # rpm is not angular speed", debugFix: "power_w = torque_nm * 2 * 3.14159265 * rpm / 60", debugHint: "Convert rotational speed from rpm to rad/s.", company: "Ashok Leyland", interview: "How does exhaust gas recirculation reduce NOx?", interviewAnswer: "EGR dilutes intake charge and lowers peak combustion temperature, reducing thermal NOx formation; it must be balanced against soot and efficiency.", codingProblem: "Brake Power", codingDescription: "Return brake power in watts from torque and rpm.", codingInput: "torque=200, rpm=3000", codingOutput: "62831.85", starter: "def brake_power(torque_nm, rpm):\n    return torque_nm * 2 * 3.14159265 * rpm / 60" },
    {
      title: "Metrology, Limits, Fits & Quality Control", level: "Level 2 – Manufacturing Quality", search: "Metrology Limits Fits Quality Control", summary: "Metrology ensures parts meet functional requirements through measurement systems, limits and fits, gauges, surface finish, and statistical process control. Quality is built into the process rather than inspected in afterward.", principle: "A measurement is useful only when its uncertainty is small enough relative to the tolerance being controlled.", formula: "Process capability Cp = (USL - LSL) / (6 sigma).", example: "For a 10.00 ±0.10 mm feature with sigma 0.02 mm, Cp = 0.20/(0.12) = 1.67.", analogy: "Tolerance is the lane width and process variation is how much a car wanders; capability tells whether it stays in the lane.", debugBug: "cp = (usl - lsl) / sigma", debugFix: "cp = (usl - lsl) / (6 * sigma)", debugHint: "Six standard deviations represent the conventional full process spread.", company: "Maruti Suzuki", interview: "What is the difference between a clearance fit and an interference fit?", interviewAnswer: "A clearance fit always leaves positive clearance for motion; an interference fit has negative clearance and requires force or thermal assembly for a rigid joint.", codingProblem: "Process Capability Cp", codingDescription: "Return Cp for specification limits and process standard deviation.", codingInput: "usl=10.1, lsl=9.9, sigma=0.02", codingOutput: "1.67", starter: "def cp(usl, lsl, sigma):\n    return (usl - lsl) / (6 * sigma)" },
    {
      title: "Welding, Casting & Metal Forming", level: "Level 2 – Manufacturing Processes", search: "Welding Casting Metal Forming Manufacturing", summary: "Primary manufacturing processes shape material through solidification, joining, and plastic deformation. Process choice affects defects, properties, dimensional control, cost, and production rate.", principle: "Heat input and cooling rate strongly influence weld microstructure, distortion, residual stress, and heat-affected-zone properties.", formula: "Welding heat input per length = eta V I / travel speed.", example: "Reducing travel speed raises heat input per unit length and can increase penetration but also distortion.", analogy: "Cooking a thin pancake slowly applies more heat to one spot than moving quickly across it; weld travel speed behaves similarly.", debugBug: "heat_input = voltage * current * speed", debugFix: "heat_input = efficiency * voltage * current / speed", debugHint: "Energy per unit length increases when travel speed decreases.", company: "Bharat Heavy Electricals", interview: "Name common welding defects and their prevention.", interviewAnswer: "Porosity, lack of fusion, cracks, and undercut are controlled through clean joint preparation, correct parameters, shielding, preheat where required, and qualified procedures.", codingProblem: "Weld Heat Input", codingDescription: "Return heat input per unit length from efficiency, voltage, current, and speed.", codingInput: "eta=0.8, voltage=24, current=200, speed=5", codingOutput: "768.0", starter: "def weld_heat_input(eta, voltage, current, speed):\n    return eta * voltage * current / speed" },
    {
      title: "Finite Element Analysis & Design Validation", level: "Level 4 – CAE", search: "Finite Element Analysis FEA Mechanical", summary: "Finite element analysis discretizes a component into elements to estimate stress, deformation, temperature, and modes. It supports design decisions but requires correct boundary conditions, mesh checks, and correlation with tests.", principle: "A colourful contour plot is not evidence by itself; convergence, boundary-condition realism, and validation determine credibility.", formula: "For linear elasticity, sigma = E epsilon; refine mesh until the result of interest stabilizes.", example: "Model a bracket, constrain only its real mounting faces, apply distributed load, refine around fillets, and compare peak stress away from singular corners.", analogy: "FEA is like approximating a curved mosaic with many small tiles: more well-placed tiles capture detail better.", debugBug: "# Apply a fixed support to every face\nconstraints = all_faces", debugFix: "# Constrain only faces that are physically restrained\nconstraints = mounting_faces", debugHint: "Over-constraining artificially stiffens the model and can hide failures.", company: "Tata Technologies", interview: "How do you verify an FEA model?", interviewAnswer: "Check units, loads, contacts, and reactions; perform mesh convergence; compare simple regions with hand calculations; then correlate critical results with test data where possible.", codingProblem: "Linear Strain", codingDescription: "Return strain from stress and Young's modulus.", codingInput: "stress_pa=200000000, youngs_pa=200000000000", codingOutput: "0.001", starter: "def strain(stress_pa, youngs_pa):\n    return stress_pa / youngs_pa" },
    {
      title: "Engineering Materials, Corrosion & Failure Analysis", level: "Level 2 – Materials", search: "Engineering Materials Corrosion Failure Analysis", summary: "Material selection links mechanical properties, environment, manufacturing route, availability, and life-cycle cost. Failure analysis distinguishes overload, fatigue, wear, creep, and corrosion mechanisms.", principle: "Select materials for the service environment and failure mode, not only for their room-temperature strength.", formula: "Corrosion rate is commonly reported as mass loss/(area × time) or penetration per year.", example: "Stainless steel may resist aqueous corrosion better than carbon steel, but chloride environments can still cause pitting or stress-corrosion cracking.", analogy: "Choosing a material only by strength is like choosing shoes only by colour: the environment and task decide whether they work.", debugBug: "corrosion_rate = mass_loss * area / time", debugFix: "corrosion_rate = mass_loss / (area * time)", debugHint: "Normalize mass loss by exposed area and duration for a meaningful comparison.", company: "Hindustan Unilever", interview: "Why can stainless steel fail in chloride service?", interviewAnswer: "Chlorides can locally break the passive film and initiate pitting or stress-corrosion cracking, especially at elevated temperature or under tensile stress.", codingProblem: "Corrosion Mass-Loss Rate", codingDescription: "Return normalized mass-loss rate.", codingInput: "mass_loss=2, area=100, time=10", codingOutput: "0.002", starter: "def corrosion_rate(mass_loss, area, time):\n    return mass_loss / (area * time)" },
    {
      title: "Industrial Engineering, Lean & Operations Research", level: "Level 3 – Operations", search: "Industrial Engineering Lean Manufacturing Operations Research", summary: "Industrial engineering improves productivity, flow, quality, ergonomics, and cost through work study, line balancing, lean tools, inventory models, and optimization.", principle: "Eliminate non-value-added work before automating it; stable flow reveals the true bottleneck.", formula: "Takt time = available production time / customer demand.", example: "With 450 available minutes and demand of 150 units, the takt time is 3 minutes per unit.", analogy: "Takt time is the beat a production line must follow to keep pace with customer demand.", debugBug: "takt = demand / available_time", debugFix: "takt = available_time / demand", debugHint: "Takt is time allowed per unit, not units per time.", company: "Toyota", interview: "What is the difference between takt time and cycle time?", interviewAnswer: "Takt time is demand-driven allowable time per unit; cycle time is the actual time a process takes. Cycle time must meet or beat takt for the process to keep up.", codingProblem: "Takt Time", codingDescription: "Return allowed minutes per unit.", codingInput: "available_minutes=450, demand=150", codingOutput: "3.0", starter: "def takt_time(available_minutes, demand):\n    return available_minutes / demand" },
    {
      title: "Renewable Energy & Energy Management", level: "Level 3 – Sustainable Engineering", search: "Renewable Energy Energy Management Mechanical Engineering", summary: "Mechanical engineers design and operate solar thermal systems, wind turbines, biomass equipment, heat pumps, waste-heat recovery, and energy-management programs.", principle: "The cheapest energy is often the energy not used; first reduce losses, then optimize supply and recovery.", formula: "Energy = power × time; efficiency = useful output / input.", example: "A 5 kW pump operating 8 hours consumes 40 kWh before motor and control losses are considered.", analogy: "Energy management is like fixing leaks in a bucket before buying a larger hose to fill it.", debugBug: "energy_kwh = power_kw / hours", debugFix: "energy_kwh = power_kw * hours", debugHint: "Power is a rate; multiply by time to obtain energy.", company: "Suzlon", interview: "Why is wind-turbine power not proportional to wind speed?", interviewAnswer: "Available wind power is proportional to the cube of wind speed, so small wind-speed changes can produce large changes in output within operating limits.", codingProblem: "Electrical Energy Use", codingDescription: "Return energy in kWh from power in kW and operating hours.", codingInput: "power_kw=5, hours=8", codingOutput: "40", starter: "def energy_kwh(power_kw, hours):\n    return power_kw * hours" },
    {
      title: "Vehicle Dynamics, Braking & Suspension", level: "Level 3 – Automotive Engineering", search: "Vehicle Dynamics Braking Suspension", summary: "Vehicle dynamics covers longitudinal, lateral, and vertical behaviour. Braking, suspension, steering geometry, tyre forces, and weight transfer determine stability, comfort, and stopping performance.", principle: "Tyre-road friction limits the combined braking and cornering force; load transfer changes the normal load at each wheel.", formula: "Braking distance d = v^2 / (2 mu g) for ideal constant deceleration on level ground.", example: "At 20 m/s with mu = 0.8, ideal braking distance is about 25.5 m before reaction distance.", analogy: "A tyre has a fixed grip budget: spending more on turning leaves less available for braking.", debugBug: "distance = velocity / (2 * mu * g)", debugFix: "distance = velocity ** 2 / (2 * mu * g)", debugHint: "Stopping distance follows energy, so speed is squared.", company: "Mahindra & Mahindra", interview: "Why does ABS improve control during braking?", interviewAnswer: "ABS modulates brake pressure to prevent sustained wheel lock, keeping tyres near peak slip so steering control and stability are retained.", codingProblem: "Ideal Braking Distance", codingDescription: "Return braking distance in metres for velocity, friction coefficient, and g.", codingInput: "v=20, mu=0.8, g=9.81", codingOutput: "25.48", starter: "def braking_distance(v, mu, g=9.81):\n    return v ** 2 / (2 * mu * g)" },
    {
      title: "Robotics Kinematics & Automated Assembly", level: "Level 4 – Automation", search: "Robotics Kinematics Automated Assembly", summary: "Industrial robotics combines coordinate frames, kinematics, actuators, end effectors, sensors, safety systems, and cycle-time design. Reliable automation also requires fixturing and error recovery.", principle: "Forward kinematics maps joint coordinates to tool position; inverse kinematics finds feasible joint configurations for a target pose.", formula: "For a planar two-link arm: x = l1 cos(theta1) + l2 cos(theta1 + theta2).", example: "Use coordinate transformations to verify that a robot can reach every point in a fixture without singularity or collision.", analogy: "A robot arm is a chain of rulers joined by hinges; each hinge angle changes where the fingertip ends up.", debugBug: "x = l1 * cos(theta1) + l2 * cos(theta2)", debugFix: "x = l1 * cos(theta1) + l2 * cos(theta1 + theta2)", debugHint: "The second link angle is relative to the first link in the common planar convention.", company: "ABB", interview: "What is a robot singularity?", interviewAnswer: "It is a configuration where the Jacobian loses rank, so some tool motions require impractically high joint speeds or become indeterminate; paths should avoid or handle it.", codingProblem: "Planar Arm X Position", codingDescription: "Return end-effector x coordinate; angles are in radians.", codingInput: "l1=1, l2=1, theta1=0, theta2=0", codingOutput: "2", starter: "from math import cos\ndef arm_x(l1, l2, theta1, theta2):\n    return l1 * cos(theta1) + l2 * cos(theta1 + theta2)" },
    {
      title: "Piping Systems, Pumps & Plant Utilities", level: "Level 3 – Plant Engineering", search: "Piping Systems Pumps Plant Utilities", summary: "Plant utilities distribute water, steam, compressed air, and process fluids through pipes, valves, pumps, and heat exchangers. Design balances pressure drop, pump head, reliability, safety, and maintenance.", principle: "The operating point occurs where the pump curve intersects the system curve; changing valve resistance shifts the system curve.", formula: "Darcy-Weisbach pressure loss: deltaP = f (L/D) (rho v^2 / 2).", example: "Longer pipes, smaller diameters, rougher surfaces, and higher velocity all increase frictional loss.", analogy: "A piping system is like a road network: narrower, rougher, or longer routes require more effort to move the same traffic.", debugBug: "pressure_drop = f * (diameter / length) * rho * v**2 / 2", debugFix: "pressure_drop = f * (length / diameter) * rho * v**2 / 2", debugHint: "Friction loss grows with L/D, not D/L.", company: "Reliance Industries", interview: "How do you avoid cavitation in a pump installation?", interviewAnswer: "Ensure available NPSH exceeds required NPSH with margin by minimizing suction losses, maintaining liquid level, controlling temperature, and selecting appropriate pump speed and impeller.", codingProblem: "Darcy Pressure Drop", codingDescription: "Return pressure drop from Darcy friction factor, length, diameter, density, and velocity.", codingInput: "f=0.02, L=100, D=0.1, rho=1000, v=2", codingOutput: "40000", starter: "def darcy_pressure_drop(f, length, diameter, rho, velocity):\n    return f * (length / diameter) * rho * velocity**2 / 2" },
    {
      title: "Product Design, DFM & Lifecycle Engineering", level: "Level 4 – Product Development", search: "Product Design DFM DFMA Lifecycle Engineering", summary: "Product development integrates user needs, requirements, concept selection, design for manufacturing and assembly, reliability, testing, serviceability, and end-of-life considerations.", principle: "A design that is easy to manufacture, assemble, inspect, service, and recycle delivers more value than a technically elegant but impractical one.", formula: "Reliability for independent series components: Rsystem = product of component reliabilities.", example: "A three-component series system with reliabilities 0.99, 0.98, and 0.97 has system reliability below every individual component.", analogy: "A series system is like a chain expedition: the whole trip succeeds only if every required link succeeds.", debugBug: "system_reliability = sum(reliabilities)", debugFix: "system_reliability = r1 * r2 * r3", debugHint: "For independent required components in series, multiply reliabilities.", company: "Whirlpool", interview: "Give three DFM improvements for a sheet-metal enclosure.", interviewAnswer: "Standardize bend radii and fasteners, avoid features too close to bends, design for single-direction tooling access, and use tolerances that match the process capability.", codingProblem: "Series System Reliability", codingDescription: "Return reliability of independent series components.", codingInput: "r1=0.99, r2=0.98, r3=0.97", codingOutput: "0.9411", starter: "def series_reliability(*reliabilities):\n    result = 1\n    for reliability in reliabilities:\n        result *= reliability\n    return result" },
    {
      title: "Maintenance Engineering & Reliability Centered Maintenance", level: "Level 3 – Asset Reliability", search: "Maintenance Engineering Reliability Centered Maintenance", summary: "Maintenance engineering uses preventive, predictive, corrective, and reliability-centered strategies to protect safety, availability, quality, and cost. Condition monitoring uses vibration, temperature, oil, and ultrasonic data.", principle: "The best maintenance task addresses a specific failure mode at the right interval; excessive maintenance can introduce new failures and waste resources.", formula: "Availability A = MTBF / (MTBF + MTTR).", example: "An asset with MTBF 900 hours and MTTR 100 hours has 90% inherent availability.", analogy: "Maintenance is like health care: monitoring and timely intervention prevent a small issue from becoming an emergency.", debugBug: "availability = mttr / (mtbf + mttr)", debugFix: "availability = mtbf / (mtbf + mttr)", debugHint: "Availability is the fraction of time between failures, not repair time.", company: "Siemens", interview: "How would vibration data help diagnose a bearing fault?", interviewAnswer: "Trend overall vibration and inspect frequency spectra for characteristic defect frequencies, harmonics, and sidebands; confirm with operating condition and lubrication history.", codingProblem: "Inherent Availability", codingDescription: "Return availability from mean time between failures and mean time to repair.", codingInput: "mtbf=900, mttr=100", codingOutput: "0.9", starter: "def availability(mtbf, mttr):\n    return mtbf / (mtbf + mttr)" }
  ].map(buildMechanicalTopic)
];
