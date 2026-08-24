import type { BranchModuleData } from "./types";
import { makeVideoLinks } from "./types";

export const MECH_MODULES: BranchModuleData[] = [
  {
    moduleTitle: "Mechatronics, PID Controllers & Robotics",
    roles: ["mech-iiot", "mech-cad", "mech-robotics", "mech-automation", "mech-control"],
    industryUseCase: "Autonomous Industrial Robot Kinematics & Motion Planning at KUKA/Boston Dynamics",
    harvardOxfordRef: "MIT 2.12 Intro to Robotics & Forward/Inverse Kinematics Dynamics",
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
      example: `• Python PID Controller Loop Simulation
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
        buggy: `def update(self, error, dt):\n    self.integral += error • Bug: missing dt factor and no anti-windup clamping`,
        fixed: `def update(self, error, dt):\n    self.integral += error * dt\n    self.integral = max(-100, min(100, self.integral)) • Clamp anti-windup`,
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
      starter: `def p_control(setpoint, measured, kp):\n    • Return Kp * error\n    pass`
    }
  },
  {
    moduleTitle: "Engineering Mechanics & Strength of Materials",
    roles: ["mech-iiot", "mech-cad", "mech-robotics", "mech-automation", "mech-control"],
    industryUseCase: "Autonomous Industrial Robot Kinematics & Motion Planning at KUKA/Boston Dynamics",
    harvardOxfordRef: "MIT 2.12 Intro to Robotics & Forward/Inverse Kinematics Dynamics",
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
      example: `• Python Stress-Strain & Young's Modulus
def calculate_stress_strain(force_n, area_mm2, orig_len_mm, delta_len_mm):
    stress = force_n / area_mm2 • MPa
    strain = delta_len_mm / orig_len_mm
    youngs_modulus = stress / strain • MPa
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
        buggy: `• BUG: Mixing meters and millimeters in bending stress calculation\ndef bending_stress(m_nm, y_mm, i_mm4):\n    return (m_nm * y_mm) / i_mm4 • Incorrect units (Nm vs mm)!`,
        fixed: `def bending_stress(m_nm, y_mm, i_mm4):\n    m_nmm = m_nm * 1000 • Convert Nm to N-mm\n    return (m_nmm * y_mm) / i_mm4`,
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
      starter: `def bending_stress_mpa(m_nm, y_mm, i_mm4):\n    • Return (M * 1000 * y) / I\n    pass`
    }
  },
  {
    moduleTitle: "Thermodynamics & Thermal Power Engineering",
    roles: ["mech-iiot", "mech-cad", "mech-robotics", "mech-automation", "mech-control"],
    industryUseCase: "Autonomous Industrial Robot Kinematics & Motion Planning at KUKA/Boston Dynamics",
    harvardOxfordRef: "MIT 2.12 Intro to Robotics & Forward/Inverse Kinematics Dynamics",
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
      example: `• Python Carnot Efficiency Calculator
def carnot_efficiency(temp_celsius_hot, temp_celsius_cold):
    t_h = temp_celsius_hot + 273.15
    t_c = temp_celsius_cold + 273.15
    eff = 1.0 - (t_c / t_h)
    return eff * 100 • Percentage

print("Carnot Efficiency (%):", carnot_efficiency(500, 30)) • Output: ~60.78%`,
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
        buggy: `• BUG: Using Celsius directly instead of Kelvin\ndef carnot(th_c, tc_c):\n    return 1 - (tc_c / th_c) • WRONG result when using Celsius!`,
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
      starter: `def carnot_eff_percent(th_c, tc_c):\n    • Return percentage efficiency\n    pass`
    }
  },
  {
    moduleTitle: "Fluid Mechanics & Turbo-Machinery",
    roles: ["mech-iiot", "mech-cad", "mech-robotics", "mech-automation", "mech-control"],
    industryUseCase: "Autonomous Industrial Robot Kinematics & Motion Planning at KUKA/Boston Dynamics",
    harvardOxfordRef: "MIT 2.12 Intro to Robotics & Forward/Inverse Kinematics Dynamics",
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
      example: `• Python Pipe Flow Velocity via Continuity Equation
def pipe_exit_velocity(diameter1_m, velocity1_m_s, diameter2_m):
    area1 = (3.14159 / 4.0) * (diameter1_m ** 2)
    area2 = (3.14159 / 4.0) * (diameter2_m ** 2)
    velocity2 = (area1 * velocity1_m_s) / area2
    return velocity2

print("Exit Velocity (m/s):", pipe_exit_velocity(0.1, 2.0, 0.05)) • Output: 8.0 m/s`,
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
        buggy: `• BUG: Using radius instead of diameter in area formula with d^2\ndef area(d):\n    return 3.14159 * d ** 2 • Incorrect by 4x factor!`,
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
      starter: `def classify_flow(rho, v, d, mu):\n    • Re = (rho * v * d) / mu\n    pass`
    }
  },
  {
    moduleTitle: "CAD/CAM, CNC Programming & Industry 4.0",
    roles: ["mech-iiot", "mech-cad", "mech-robotics", "mech-automation", "mech-control"],
    industryUseCase: "Autonomous Industrial Robot Kinematics & Motion Planning at KUKA/Boston Dynamics",
    harvardOxfordRef: "MIT 2.12 Intro to Robotics & Forward/Inverse Kinematics Dynamics",
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
      starter: `def machining_time_min(cut_len, feed_rate):\n    • Return cut_len / feed_rate\n    pass`
    }
  }
,
  {
    moduleTitle: "Thermodynamics – Laws & Cycles",
    roles: ["mech-iiot", "mech-cad", "mech-robotics", "mech-automation", "mech-control"],
    industryUseCase: "Autonomous Industrial Robot Kinematics & Motion Planning at KUKA/Boston Dynamics",
    harvardOxfordRef: "MIT 2.12 Intro to Robotics & Forward/Inverse Kinematics Dynamics",
    level: "Level 1 – Foundations",
    branch: ["mech"],
    videos: makeVideoLinks("Thermodynamics Laws Carnot Cycle Entropy"),
    studyMaterial: {
      summary: "Thermodynamics governs energy conversion. The four laws provide fundamental constraints. Thermodynamic cycles (Carnot, Rankine, Otto, Diesel) form the basis for all heat engines and refrigeration systems.",
      deepDiveTextbook: `THERMODYNAMICS FUNDAMENTALS\n\nLaws of Thermodynamics:\n0th Law: Thermal equilibrium — if A=B and B=C in temperature, then A=C. (defines temperature)\n1st Law: Energy conservation. Q - W = ΔU. Heat added minus work done = change in internal energy.\n2nd Law: Entropy of isolated system never decreases. ΔS ≥ 0. Direction of heat flow (hot to cold).\n3rd Law: Entropy approaches constant as T → 0 K.\n\nCarnot Cycle (ideal heat engine):\n1. Isothermal expansion (T_H): heat Q_H absorbed\n2. Adiabatic expansion: temperature drops from T_H to T_L\n3. Isothermal compression (T_L): heat Q_L rejected\n4. Adiabatic compression: temperature rises from T_L to T_H\nEfficiency: η_Carnot = 1 - T_L/T_H (temperatures in Kelvin)\nThis is the MAXIMUM possible efficiency — no real engine can exceed it.\n\nOtto Cycle (gasoline engine): η = 1 - 1/r^(γ-1) where r = compression ratio, γ = Cp/Cv\nDiesel Cycle: η = 1 - (1/r^(γ-1)) × [(r_c^γ - 1)/(γ(r_c - 1))]\nRankine Cycle (steam power plant): boiler → turbine → condenser → pump → repeat.\n\nEntropy: S = Q/T for reversible process. Irreversibility always increases entropy.\nExergy: Maximum useful work from a system. Exergy destroyed = T₀ × ΔS_gen.`,
      keyPoints: ["1st Law: Q - W = ΔU (energy balance)","Carnot efficiency = 1 - TL/TH (maximum possible)","2nd Law: entropy always increases in real processes","Otto cycle efficiency depends only on compression ratio"],
      example: `• Carnot Efficiency Calculation\ndef carnot_efficiency(T_hot, T_cold):\n    """T in Kelvin"""\n    return 1 - T_cold / T_hot\n\n• Steam power plant: boiler at 500°C, condenser at 30°C\nT_H = 500 + 273  • = 773 K\nT_L = 30 + 273   • = 303 K\neta = carnot_efficiency(T_H, T_L)\nprint(f"Carnot efficiency: {eta*100:.1f}%")  • 60.8%\n\n• Otto cycle compression ratio 8:1, gamma=1.4\nr = 8; gamma = 1.4\neta_otto = 1 - 1/(r**(gamma-1))\nprint(f"Otto efficiency: {eta_otto*100:.1f}%")  • 56.5%`,
      comparisonTable: { headers: ["Cycle","Working Fluid","Efficiency Formula","Application"], rows: [["Carnot","Any","1-TL/TH","Theoretical max"],["Rankine","Steam/water","Turbine work/Heat in","Power plants"],["Otto","Air (gasoline)","1-1/r^(γ-1)","Car engines"],["Diesel","Air (diesel)","Complex","Trucks, generators"],["Brayton","Air","1-1/r_p^((γ-1)/γ)","Gas turbines, jets"]] },
      flowchartSteps: ["Heat source provides Q_H to working fluid","Working fluid expands — does work on turbine/piston","Exhaust at lower temperature T_L","Heat Q_L rejected to cold reservoir","For cyclic: fluid returned to initial state","Net work = Q_H - Q_L"],
      concept3DSimulation: { title: "PV Diagram — Thermodynamic Cycles", description: "Pressure-Volume diagram shows expansion and compression paths. Area enclosed = net work output.", interactiveNodes: [{name:"Isothermal Process",type:"Constant Temperature",details:"PV = constant; T fixed; heat and work exchange"},{name:"Adiabatic Process",type:"No Heat Transfer",details:"PV^γ = constant; Q=0; temperature changes with expansion"},{name:"Cycle Enclosure",type:"Net Work",details:"Area inside cycle = net work per cycle; larger area = more power"}] },
      complexity: "Cycle analysis: O(1) algebraic | Simulation: O(N) time steps"
    },
    aiExplain: { steps: ["Supply heat at high temperature","Working fluid expands doing work","Reject heat at low temperature","Net work = heat in minus heat out"], analogy: "Like a water wheel: high-pressure water (hot reservoir) falls, doing work on wheel. Low-level water (cold reservoir) flows away. You can never get more work than the height difference allows — that's Carnot's limit." },
    debug: [{ title: "Celsius instead of Kelvin in Carnot formula", buggy: "eta = 1 - 30/500  • WRONG — Celsius gives wrong answer (94%)", fixed: "eta = 1 - (30+273)/(500+273)  • Kelvin: 60.8%", hint: "Carnot formula requires absolute temperature in Kelvin. Always add 273.15 to Celsius." }],
    quiz: [
      { q: "Carnot efficiency formula:", options: ["1 - TH/TL","1 - TL/TH","TH - TL","QH/W"], answer: 1 },
      { q: "2nd Law states entropy of isolated system:", options: ["Always decreases","Stays constant","Never decreases","Is zero"], answer: 2 },
      { q: "1st Law: Q - W =", options: ["0","ΔP","ΔU","ΔH"], answer: 2 },
      { q: "Otto cycle efficiency depends on:", options: ["Temperature ratio","Compression ratio only","Fuel type","RPM"], answer: 1 }
    ],
    mnc: [
      { company: "GE", year: "2023", question: "How does combined cycle power plant achieve >60% efficiency?", answer: "Brayton cycle (gas turbine) exhaust at 600°C goes to heat recovery steam generator (HRSG), produces steam for Rankine cycle (steam turbine). Combined cycle captures waste heat from gas turbine for additional power. Simple gas turbine: ~35-40%. Combined cycle: 60-65%. World record: ~64% (Bouchain plant)." },
      { company: "Toyota", year: "2022", question: "How does an Atkinson cycle engine differ from Otto cycle?", answer: "Atkinson cycle: expansion ratio > compression ratio. Piston travels further on expansion stroke than compression. More work extracted per cycle. Higher thermal efficiency (up to 41% vs 30% for Otto). Trade-off: lower peak power. Used in hybrid vehicles (Toyota Prius) where high efficiency at partial load matters more than peak power." }
    ],
    mock: [{ type: "Technical", question: "Explain refrigeration cycle and COP.", tip: "Reverse Carnot/Rankine cycle: refrigerant absorbs heat Q_L from cold space, compressor does work W, heat Q_H rejected to hot space (Q_H = Q_L + W). COP_refrigerator = Q_L/W = T_L/(T_H - T_L) for Carnot. COP_heat_pump = Q_H/W = T_H/(T_H - T_L). COP > 1 possible (heat pump moves energy, not creates it)." }],
    coding: { problem: "Thermodynamic Cycle Simulator", desc: "Simulate Otto cycle and calculate work, heat, and efficiency.", input: "r=8, gamma=1.4, T1=300K, P1=101kPa, Q_in=1800kJ/kg", output: "Efficiency=56.5%, W_net=1017kJ/kg", starter: "def otto_cycle(r, gamma, T1, P1, Qin):\n    • State 1: Initial\n    • State 2: After isentropic compression\n    T2 = T1 * r**(gamma-1)\n    • State 3: After constant volume heat addition\n    T3 = T2 + Qin / 0.718  • Cv = 0.718 kJ/kg·K for air\n    • State 4: After isentropic expansion\n    T4 = T3 / r**(gamma-1)\n    • Heat rejected\n    Qout = 0.718 * (T4 - T1)\n    W_net = Qin - Qout\n    eta = W_net / Qin\n    return W_net, eta" }
  },
  {
    moduleTitle: "Fluid Mechanics – Bernoulli & Flow Analysis",
    roles: ["mech-iiot", "mech-cad", "mech-robotics", "mech-automation", "mech-control"],
    industryUseCase: "Autonomous Industrial Robot Kinematics & Motion Planning at KUKA/Boston Dynamics",
    harvardOxfordRef: "MIT 2.12 Intro to Robotics & Forward/Inverse Kinematics Dynamics",
    level: "Level 1 – Foundations",
    branch: ["mech"],
    videos: makeVideoLinks("Fluid Mechanics Bernoulli Equation Flow Analysis"),
    studyMaterial: {
      summary: "Fluid mechanics describes how liquids and gases behave under forces. Bernoulli's equation (energy conservation for fluids) and continuity equation (mass conservation) are essential for designing pumps, turbines, pipes, and aircraft.",
      deepDiveTextbook: `FLUID MECHANICS FUNDAMENTALS\n\nFluid Properties:\nDensity ρ (kg/m³): mass per unit volume. Water: 1000, Air: 1.225.\nViscosity μ (Pa·s): resistance to shear. Dynamic viscosity. Kinematic: ν = μ/ρ.\nSurface tension: cohesive force at liquid-air interface.\n\nContinuity Equation (Mass Conservation):\nFor incompressible flow: A1V1 = A2V2 (flow rate Q = AV = constant)\nCompressible: ρ1A1V1 = ρ2A2V2\n\nBernoulli's Equation (Energy Conservation along streamline):\nP + ½ρV² + ρgh = constant\nP = pressure [Pa], V = velocity [m/s], h = height [m], ρ = density.\nValid for: steady, incompressible, inviscid, along a streamline.\n\nReynolds Number: Re = ρVD/μ = VD/ν\nRe < 2300: Laminar flow (smooth, layered)\nRe > 4000: Turbulent flow (chaotic, mixing)\n2300-4000: Transition zone\n\nHagen-Poiseuille (Laminar pipe flow): Q = πR⁴ΔP/(8μL)\nPressure loss proportional to length, inversely to R⁴ — small diameter pipes have huge friction losses.\n\nDarcy-Weisbach (Turbulent): ΔP = f(L/D)(½ρV²)\nf = friction factor (Moody chart or Churchill equation)\n\nFlow Meters: Pitot tube measures stagnation pressure → velocity. Venturimeter uses Bernoulli through constriction.`,
      keyPoints: ["Bernoulli: P + ½ρV² + ρgh = const (energy/unit volume)","Continuity: A1V1 = A2V2 for incompressible flow","Re < 2300 laminar; Re > 4000 turbulent","Hagen-Poiseuille: Q ∝ R⁴ — radius has huge effect on pipe flow"],
      example: `import math\n\n• Bernoulli Application: Venturimeter\ndef venturimeter_flowrate(D1, D2, P1, P2, rho=1000):\n    A1 = math.pi * D1**2 / 4\n    A2 = math.pi * D2**2 / 4\n    delta_P = P1 - P2\n    V2 = math.sqrt(2 * delta_P / (rho * (1 - (A2/A1)**2)))\n    Q = A2 * V2\n    return Q\n\n• Pipe: 200mm → 100mm, ΔP = 20kPa\nQ = venturimeter_flowrate(0.2, 0.1, 120000, 100000)\nprint(f"Flow rate: {Q*1000:.2f} L/s")`,
      comparisonTable: { headers: ["Flow Type","Re Range","Friction","Velocity Profile","Heat Transfer"], rows: [["Laminar","< 2300","Low (viscous)","Parabolic","Poor"],["Transition","2300-4000","Unpredictable","Irregular","Variable"],["Turbulent","≥ 4000","High","Flatter profile","Excellent"]] },
      flowchartSteps: ["Define control volume (CV)","Apply mass balance: ρin*Ain*Vin = ρout*Aout*Vout","Apply energy balance (Bernoulli or energy equation)","Identify all forces on CV (pressure, gravity, friction)","Calculate unknowns (velocity, pressure, flow rate)","Check Reynolds number — verify laminar/turbulent assumption"],
      concept3DSimulation: { title: "Venturimeter Flow Visualization", description: "Flow accelerates through constriction — velocity increases, pressure drops (Bernoulli). Streamlines shown.", interactiveNodes: [{name:"Inlet Section",type:"High Pressure Zone",details:"Large cross-section: slow velocity, high pressure"},{name:"Throat",type:"Low Pressure Zone",details:"Small cross-section: high velocity, low pressure (Bernoulli)"},{name:"Pressure Tap",type:"Measurement",details:"Differential pressure measured to calculate flow rate"}] },
      complexity: "Bernoulli: O(1) | CFD simulation: O(N³) for 3D mesh"
    },
    aiExplain: { steps: ["Fluid moving faster has lower pressure (Bernoulli)","Narrower pipe → faster flow (continuity)","Pressure energy converts to kinetic energy","This principle creates lift on airplane wings"], analogy: "Like squeezing a garden hose — narrowing makes water go faster (continuity). Airplane wing curved on top: air goes faster over top → lower pressure → lift (Bernoulli)" },
    debug: [{ title: "Bernoulli applied across streamlines", buggy: "Applying Bernoulli between two points in different streamlines in turbulent flow", fixed: "Bernoulli only valid along same streamline, in steady, inviscid, incompressible flow", hint: "Bernoulli has 4 strict conditions: (1) steady flow, (2) incompressible, (3) inviscid (no viscosity), (4) along same streamline." }],
    quiz: [
      { q: "Continuity equation for incompressible flow:", options: ["P1+½ρV1²=P2+½ρV2²","A1V1=A2V2","ρ1V1=ρ2V2","Q1≠Q2"], answer: 1 },
      { q: "Reynolds number for laminar flow:", options: [">4000","2300-4000","<2300","=2300"], answer: 2 },
      { q: "Hagen-Poiseuille: Q ∝", options: ["R","R²","R³","R⁴"], answer: 3 },
      { q: "Bernoulli assumes flow is:", options: ["Turbulent only","Compressible","Steady, inviscid, incompressible","High velocity only"], answer: 2 }
    ],
    mnc: [
      { company: "Airbus", year: "2023", question: "Explain how lift is generated on an aircraft wing.", answer: "Wing (airfoil) shaped so upper surface is more curved. Air flows faster over top (longer path), slower underneath. By Bernoulli: faster flow = lower pressure. Pressure difference creates upward force (lift). Angle of attack increases lift until stall (boundary layer separates). Lift = ½ρV²CLA where CL = lift coefficient, A = wing area." },
      { company: "ONGC", year: "2022", question: "How does a centrifugal pump work and how to select it?", answer: "Impeller rotates → imparts kinetic energy to fluid → converts to pressure in volute. Pump curve: head vs flow rate. System curve: static head + friction losses vs flow. Operating point = intersection. Select pump so operating point is at best efficiency point (BEP). Oversized pump wastes energy, cavitates. Undersized can't meet flow requirement." }
    ],
    mock: [{ type: "Technical", question: "Explain cavitation in pumps and how to prevent it.", tip: "Cavitation: local pressure drops below vapor pressure → bubbles form → collapse violently near surfaces → erosion damage and noise. Prevention: 1) Ensure NPSH_available > NPSH_required (margin 1.5-2m). 2) Raise suction tank level or lower pump. 3) Reduce suction pipe losses. 4) Don't oversurface the pump. 5) Select pump with adequate NPSH_r." }],
    coding: { problem: "Pipe Network Analysis", desc: "Find flow rate in a branching pipe network using Hardy-Cross method.", input: "Pipe lengths, diameters, friction factors, demand at nodes", output: "Flow in each pipe satisfying mass balance", starter: "def hardy_cross_iteration(pipes, demands, iterations=50):\n    • pipes = list of (resistance, assumed_Q)\n    • Hardy-Cross correction: ΔQ = -ΣhL / (2Σ|hL/Q|)\n    for _ in range(iterations):\n        for loop in loops:\n            num = sum(R*Q*abs(Q) for R,Q in loop)\n            den = 2 * sum(R*abs(Q) for R,Q in loop)\n            dQ = -num/den\n            • Apply correction to all pipes in loop\n    return pipes" }
  },
  {
    moduleTitle: "Strength of Materials – Stress & Strain",
    roles: ["mech-iiot", "mech-cad", "mech-robotics", "mech-automation", "mech-control"],
    industryUseCase: "Autonomous Industrial Robot Kinematics & Motion Planning at KUKA/Boston Dynamics",
    harvardOxfordRef: "MIT 2.12 Intro to Robotics & Forward/Inverse Kinematics Dynamics",
    level: "Level 2 – Intermediate",
    branch: ["mech"],
    videos: makeVideoLinks("Stress Strain Strength of Materials Beams"),
    studyMaterial: {
      summary: "Strength of Materials (Mechanics of Materials) analyzes internal forces, stresses, and deformations in structural members. Understanding stress-strain relationships, Mohr's circle, and beam bending is fundamental for mechanical design.",
      deepDiveTextbook: `MECHANICS OF MATERIALS\n\nStress and Strain:\nNormal Stress: σ = F/A (Pa). Axial load divided by cross-sectional area.\nShear Stress: τ = V/A. Transverse force divided by area.\nNormal Strain: ε = ΔL/L (dimensionless). Deformation per unit length.\nShear Strain: γ = τ/G (G = shear modulus)\n\nHooke's Law (elastic region): σ = Eε, τ = Gγ\nE = Young's Modulus (stiffness). Steel: 200GPa, Aluminum: 70GPa, Concrete: 30GPa.\nPoisson's Ratio: ν = -ε_lateral/ε_axial. Steel: 0.3. Describes lateral contraction.\n\nBeam Bending:\nFlexure Formula: σ = My/I (bending stress)\nM = bending moment, y = distance from neutral axis, I = second moment of area.\nMaximum stress at extreme fibers (y = c): σ_max = Mc/I = M/Z where Z = I/c (section modulus)\n\nShear Formula: τ = VQ/(Ib)\nV = shear force, Q = first moment of area, I = moment of inertia, b = width.\n\nDeflection: EI d²y/dx² = M(x)\nFor simply supported beam with central load P: δ_max = PL³/(48EI)\n\nMohr's Circle: Graphical method for stress transformation.\nCenter: (σx+σy)/2. Radius: √[((σx-σy)/2)² + τxy²]\nPrincipal stresses: σ1,2 = center ± radius (zero shear)\nMax shear: τ_max = radius`,
      keyPoints: ["Flexure: σ = My/I — stress proportional to distance from neutral axis","Deflection of simply supported beam with central load: δ = PL³/48EI","Mohr's circle finds principal stresses and max shear stress","Factor of safety = ultimate strength / allowable stress"],
      example: `• Beam Bending Analysis\ndef simply_supported_beam(P, L, E, I):\n    """Central point load P, span L, EI = flexural rigidity"""\n    • Maximum bending moment at center\n    M_max = P * L / 4\n    • Maximum deflection at center\n    delta_max = P * L**3 / (48 * E * I)\n    return M_max, delta_max\n\n• Example: Steel beam 5m span, 50kN load\n• W200x100: I = 113×10⁻⁶ m⁴, E = 200GPa\nP=50000; L=5; E=200e9; I=113e-6\nM, delta = simply_supported_beam(P, L, E, I)\nprint(f"M_max = {M/1000:.1f} kN·m, δ_max = {delta*1000:.2f} mm")`,
      comparisonTable: { headers: ["Section","I (relative)","Weight (relative)","Efficiency","Use Case"], rows: [["Rectangle","1.0","1.0","Low","Simple members"],["I-Section","6-8x","~0.6","High","Beams, columns"],["Hollow Circle","~4x","~0.5","High","Shafts under torque"],["T-Section","4-5x","~0.7","Medium","Composite floors"]] },
      flowchartSteps: ["Identify loading and support conditions","Draw free body diagram","Find support reactions (ΣF=0, ΣM=0)","Draw shear force and bending moment diagrams","Locate maximum M and V","Apply flexure/shear formulas for stress","Check against allowable stress with factor of safety"],
      concept3DSimulation: { title: "Beam Bending Stress Distribution", description: "Cross-section shows compressive stress on top, tensile on bottom. Neutral axis at center has zero stress.", interactiveNodes: [{name:"Neutral Axis",type:"Zero Stress Line",details:"No normal stress here; shear stress maximum"},{name:"Extreme Fiber",type:"Maximum Bending Stress",details:"σ_max = Mc/I at top and bottom of cross-section"},{name:"Deflected Shape",type:"Elastic Curve",details:"EI·y'' = M(x) — curvature proportional to bending moment"}] },
      complexity: "Beam analysis: O(N) for distributed loads | FEA: O(DOF²) stiffness solve"
    },
    aiExplain: { steps: ["Apply load to beam","Beam bends — top compresses, bottom stretches","Stress proportional to distance from center","Maximum stress at extreme fibers (top and bottom)"], analogy: "Like bending a rubber eraser — the top side gets shorter (compression), bottom gets longer (tension), and the middle line stays the same length (neutral axis, zero stress)." },
    debug: [{ title: "Neglecting shear deformation", buggy: "delta = PL³/(48EI)  • ignores shear for deep beams (L/D < 5)", fixed: "delta_total = PL³/(48EI) + PL/(4*G*As)  • include shear term for short beams", hint: "Simple beam formula ignores shear deformation. For beams with span/depth < 5, shear deformation can be significant (Timoshenko beam theory)." }],
    quiz: [
      { q: "Flexure formula for bending stress:", options: ["σ = My/I","σ = F/A","σ = VQ/Ib","σ = Eε"], answer: 0 },
      { q: "Neutral axis in beam bending has:", options: ["Maximum stress","Zero normal stress","Maximum shear","Tensile stress only"], answer: 1 },
      { q: "Central load deflection of simply supported beam:", options: ["PL²/8EI","PL³/48EI","PL³/3EI","PL/4EI"], answer: 1 },
      { q: "Mohr's circle radius gives:", options: ["Principal stress","Maximum shear stress","Normal strain","Young's modulus"], answer: 1 }
    ],
    mnc: [
      { company: "L&T", year: "2023", question: "Design a simply supported steel beam to carry 100kN at midspan, 8m span.", answer: "M_max = PL/4 = 100×8/4 = 200kN·m. Required section modulus Z = M/σ_allow = 200kN·m / 165MPa = 1212cm³ (σ_allow = 250/1.5 = 165MPa for structural steel). Select W-section with Z > 1212cm³. Check deflection: δ = PL³/48EI ≤ L/360 = 22mm. Verify shear stress." },
      { company: "DRDO", year: "2022", question: "What is fatigue failure and how do S-N curves help in design?", answer: "Fatigue: failure under cyclic loading at stress below ultimate strength. Crack initiates at stress concentration, propagates with cycles. S-N curve: stress amplitude vs cycles to failure. Endurance limit (σe) for steel: below this stress, infinite life. Design rule: operating stress < σe/safety factor. Factors: surface finish, size, notch sensitivity reduce endurance limit." }
    ],
    mock: [{ type: "Technical", question: "Compare elastic and plastic deformation. What is significance of yield strength?", tip: "Elastic: deformation recovers when load removed (spring-like). Plastic: permanent deformation beyond yield point. Yield strength σy = stress where 0.2% permanent strain occurs (0.2% offset method for metals without clear yield). Design: stress < σy/safety factor (elastic design). Seismic design allows plastic deformation. Yield point = onset of plastic flow — critical design limit." }],
    coding: { problem: "Shear Force and Bending Moment Diagrams", desc: "Calculate and plot SFD and BMD for simply supported beam with multiple loads.", input: "span=6m, loads=[(2kN at 2m), (4kN at 4m)], supports at 0 and 6m", output: "SFD and BMD arrays at 0.1m intervals", starter: "def analyze_beam(span, loads, support_positions):\n    • Find reactions using ΣF=0 and ΣM=0\n    • Calculate shear force at each position\n    • Integrate shear to get bending moment\n    positions = [i*0.1 for i in range(int(span/0.1)+1)]\n    SFD = []\n    BMD = []\n    • ... compute at each position\n    return positions, SFD, BMD" }
  },
  {
    moduleTitle: "Robotics – Kinematics & Control",
    roles: ["mech-iiot", "mech-cad", "mech-robotics", "mech-automation", "mech-control"],
    industryUseCase: "Autonomous Industrial Robot Kinematics & Motion Planning at KUKA/Boston Dynamics",
    harvardOxfordRef: "MIT 2.12 Intro to Robotics & Forward/Inverse Kinematics Dynamics",
    level: "Level 3 – Advanced",
    branch: ["mech"],
    videos: makeVideoLinks("Robotics Kinematics Inverse Kinematics Robot Control"),
    studyMaterial: {
      summary: "Robotics combines mechanical design, kinematics, and control to create autonomous machines. Forward kinematics finds end-effector position from joint angles. Inverse kinematics does the reverse — essential for robot arm programming and path planning.",
      deepDiveTextbook: `ROBOTICS FUNDAMENTALS\n\nDenavit-Hartenberg (DH) Convention:\nStandard method to describe robot kinematics using 4 parameters per joint:\n- d: link offset along previous z\n- θ: joint angle about previous z (variable for revolute)\n- a: link length along x\n- α: link twist about x\nHomogeneous transformation matrix: T = Rz(θ) × Tz(d) × Tx(a) × Rx(α)\nTotal forward kinematics: T_0n = T_01 × T_12 × ... × T_(n-1)n\n\nForward Kinematics: joint angles → end-effector position/orientation\nInverse Kinematics: end-effector pose → joint angles\nIK is complex — multiple solutions (elbow up/down), singularities, no solution for unreachable poses.\nNumerical IK: Jacobian pseudo-inverse method. J⁺ = Jᵀ(JJᵀ)⁻¹. Δθ = J⁺ Δx.\n\nRobot Types:\n- Serial (open chain): 6DOF arm. High flexibility, limited stiffness.\n- Parallel (Stewart platform): High stiffness, limited workspace.\n- SCARA: 4DOF, fast, for pick-and-place.\n\nPath Planning:\nJoint space: interpolate joint angles. Simple, smooth.\nCartesian space: move end-effector in straight line. Requires IK at each step.\nObstacle avoidance: RRT (Rapidly-Exploring Random Trees), A*, potential fields.\n\nDynamics: Euler-Lagrange or Newton-Euler. Torque = M(q)q̈ + C(q,q̇)q̇ + G(q)\nM = inertia matrix, C = Coriolis/centrifugal, G = gravity.`,
      keyPoints: ["DH convention: 4 parameters per joint define robot geometry","Forward kinematics: chain of transformation matrices T_0n","Jacobian matrix J relates joint velocities to end-effector velocity","Dynamics: τ = M(q)q̈ + C(q,q̇)q̇ + G(q) for torque control"],
      example: `import numpy as np\n\n• 2DOF Planar Robot Forward Kinematics\ndef forward_kinematics_2dof(theta1, theta2, L1, L2):\n    x = L1*np.cos(theta1) + L2*np.cos(theta1+theta2)\n    y = L1*np.sin(theta1) + L2*np.sin(theta1+theta2)\n    return x, y\n\n• Jacobian for 2DOF\ndef jacobian_2dof(theta1, theta2, L1, L2):\n    J = np.array([\n        [-L1*np.sin(theta1) - L2*np.sin(theta1+theta2), -L2*np.sin(theta1+theta2)],\n        [ L1*np.cos(theta1) + L2*np.cos(theta1+theta2),  L2*np.cos(theta1+theta2)]\n    ])\n    return J`,
      comparisonTable: { headers: ["Robot Type","DOF","Workspace","Speed","Payload","Application"], rows: [["6DOF Serial","6","Large","Medium","50-500kg","Welding, assembly"],["SCARA","4","Cylinder","Fast","1-20kg","PCB, packaging"],["Delta","3","Small dome","Very Fast","0.5-5kg","Pick and place"],["Cartesian","3","Rectangular","Slow","Heavy","CNC machines"]] },
      flowchartSteps: ["Define task in Cartesian space (waypoints)","Inverse kinematics: convert to joint angles","Trajectory planning: smooth motion between waypoints","Joint controllers: PID for each joint","Feedforward: add gravity and inertia compensation","Monitor and feedback from encoders","End-effector reaches target pose"],
      concept3DSimulation: { title: "6DOF Robot Arm Kinematics", description: "3D visualization of robot arm showing DH frames, Jacobian columns, and reachable workspace.", interactiveNodes: [{name:"DH Frames",type:"Coordinate Systems",details:"Each joint has local frame defined by 4 DH parameters"},{name:"Jacobian Matrix",type:"Velocity Mapping",details:"6×n matrix mapping joint velocities to end-effector twist"},{name:"IK Solver",type:"Joint Angle Finder",details:"Numerically finds joint angles for desired end-effector pose"}] },
      complexity: "FK: O(N) matrices | IK numerical: O(N²) per iteration"
    },
    aiExplain: { steps: ["Define each joint's geometry (DH parameters)","Multiply transformation matrices along chain","Get end-effector position and orientation","For IK: use Jacobian to iteratively solve joint angles"], analogy: "Like finding where your hand is given each arm segment and joint angle (FK). Inverse kinematics is like figuring out how to position your shoulder and elbow to place your hand in a specific spot." },
    debug: [{ title: "Jacobian singularity", buggy: "At singular configuration: det(J)=0 → joint velocities go to infinity for any small motion", fixed: "1) Avoid singular configurations. 2) Damped least-squares: Δθ = Jᵀ(JJᵀ + λ²I)⁻¹Δx", hint: "Singularities occur when arm is fully extended, wrist and shoulder aligned, etc. Damped LS adds λ² term to regularize near-singular Jacobians." }],
    quiz: [
      { q: "DH convention uses how many parameters per joint?", options: ["2","3","4","6"], answer: 2 },
      { q: "Forward kinematics computes:", options: ["Joint angles from end-effector pose","End-effector pose from joint angles","Torques from forces","Path planning"], answer: 1 },
      { q: "Jacobian matrix maps:", options: ["Forces to torques","Joint velocities to end-effector velocity","Positions to angles","Angles to forces"], answer: 1 },
      { q: "Jacobian singularity occurs when:", options: ["Robot moves fast","det(J) = 0 — no unique solution","All joints at zero","Payload is maximum"], answer: 1 }
    ],
    mnc: [
      { company: "ABB Robotics", year: "2023", question: "How would you design a collision avoidance system for a robot arm?", answer: "1) Model robot as capsules/spheres for fast collision checking. 2) Plan path in C-space using RRT or RRT*. 3) Online: check next trajectory point for collisions before executing. 4) Use depth cameras or LiDAR for dynamic obstacles. 5) Safety-rated monitoring (SIL2/PLd) for collaborative robots. 6) Virtual safety zones (DCS in ABB). React within 1 control cycle (<10ms)." },
      { company: "Boston Dynamics", year: "2022", question: "Explain whole-body control for legged robots.", answer: "WBC: simultaneously satisfies multiple tasks with priority (e.g., balance > end-effector position > joint limits). Uses task-space formulation: F = M*a + Coriolis + gravity. Quadratic program optimizes joint torques subject to friction cone, contact force constraints. Runs at 1kHz. Handles pushes while maintaining balance by redistributing contact forces." }
    ],
    mock: [{ type: "Technical", question: "How does SLAM work in mobile robotics?", tip: "SLAM (Simultaneous Localization and Mapping): build map while estimating position in it. Sensor (lidar/camera) → feature extraction → data association (match current to previous features) → pose estimation (graph optimization or EKF). EKF-SLAM: extended Kalman filter tracks robot pose + map landmarks. Graph-SLAM: pose graph optimized offline. ORB-SLAM (visual): feature-based with loop closure." }],
    coding: { problem: "2-DOF Robot Inverse Kinematics", desc: "Given target (x,y), find joint angles θ1, θ2 for 2-link robot arm.", input: "x=0.8, y=0.6, L1=0.5, L2=0.5", output: "θ1=36.87°, θ2=73.74°", starter: "import numpy as np\n\ndef inverse_kinematics_2dof(x, y, L1, L2):\n    • Check reachability: |x²+y²| <= (L1+L2)²\n    r = np.sqrt(x**2 + y**2)\n    if r > L1 + L2:\n        return None  • Unreachable\n    • Cosine rule for θ2\n    cos_theta2 = (x**2 + y**2 - L1**2 - L2**2) / (2*L1*L2)\n    theta2 = np.arctan2(np.sqrt(1 - cos_theta2**2), cos_theta2)\n    • θ1 from geometry\n    theta1 = np.arctan2(y, x) - np.arctan2(L2*np.sin(theta2), L1+L2*np.cos(theta2))\n    return np.degrees(theta1), np.degrees(theta2)" }
  }
];
