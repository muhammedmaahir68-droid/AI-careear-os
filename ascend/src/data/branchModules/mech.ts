import type { BranchModuleData } from "./types";
import { makeVideoLinks } from "./types";

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
  }
];
