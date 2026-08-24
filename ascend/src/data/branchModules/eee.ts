import type { BranchModuleData } from "./types";
import { makeVideoLinks } from "./types";

export const EEE_MODULES: BranchModuleData[] = [
  {
    moduleTitle: "Electric Circuit Theory & Power Systems",
    roles: ["eee-design", "eee-power", "eee-renewable"],
    industryUseCase: "Smart Grid Voltage Stability & Microgrid Inverter Control at ABB/Siemens",
    harvardOxfordRef: "Oxford Power Systems Engineering & High-Voltage Direct Current (HVDC) Transmission",
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
        buggy: `def parallel_req(r1, r2):\n    return r1 + r2 / (r1 * r2) • Bug: wrong operator order`,
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
      starter: `def parallel_resistance(resistors):\n    • Return 1 / sum(1/r for r in resistors)\n    pass`
    }
  },
  {
    moduleTitle: "AC Circuits – Phasors, Impedance & Power Factor",
    roles: ["eee-design", "eee-power", "eee-renewable"],
    industryUseCase: "Smart Grid Voltage Stability & Microgrid Inverter Control at ABB/Siemens",
    harvardOxfordRef: "Oxford Power Systems Engineering & High-Voltage Direct Current (HVDC) Transmission",
    level: "Level 2 – AC Analysis",
    branch: ["eee"],
    videos: makeVideoLinks("AC Circuits Phasors Impedance Power Factor Correction RLC Resonance"),
    studyMaterial: {
      summary: `Sinusoidal AC circuits are analyzed using Phasor notation (Complex Numbers):

Complex Impedance Z = R + jX:
- Resistance R (in-phase with voltage).
- Inductive Reactance X_L = ωL = 2πfL (voltage leads current by 90°).
- Capacitive Reactance X_C = 1 / (ωC) = 1 / (2πfC) (current leads voltage by 90°).

Resonance in Series RLC:
- Occurs when X_L = X_C → Resonance frequency f_r = 1 / (2π √(LC)).
- Impedance Z = R (minimum), current is maximum and purely resistive (Power Factor = 1.0).

Power Triangle:
- Real / Active Power P = V * I * cos φ (Watts).
- Reactive Power Q = V * I * sin φ (VAR).
- Apparent Power S = V * I = √(P² + Q²) (VA).
- Power Factor = cos φ = P / S. Capacitor banks add leading reactive power to correct low lagging power factors.`,
      keyPoints: [
        "Inductive loads cause lagging power factor; Capacitive loads cause leading power factor.",
        "Resonance Frequency f_r = 1 / (2π √(LC)). At series resonance, impedance Z = R.",
        "Low power factor increases utility bills and cable heating due to higher total current I = P / (V cos φ).",
        "Quality Factor Q = ω_0 L / R measures resonance selectivity."
      ],
      example: `• Python Power Factor & Apparent Power Calculator
import math

def calculate_ac_power(v, i, pf_angle_deg):
    pf = math.cos(math.radians(pf_angle_deg))
    p_real = v * i * pf • Watts
    s_apparent = v * i • VA
    q_reactive = v * i * math.sin(math.radians(pf_angle_deg)) • VAR
    return p_real, s_apparent, pf

print(calculate_ac_power(230, 10, 36.87)) • Output: (1840W, 2300VA, 0.8 PF)`,
      complexity: "AC Phasor Matrix Solver: O(N³) with complex numbers"
    },
    aiExplain: {
      steps: [
        "1. Convert time-domain sinusoidal voltages and currents v(t) into Phasors V∠θ.",
        "2. Calculate complex impedances Z_L = jωL and Z_C = -j/(ωC).",
        "3. Combine series/parallel impedances using complex arithmetic Z_eq = R + jX.",
        "4. Solve I = V / Z_eq to obtain magnitude and phase angle φ.",
        "5. Calculate Real Power P = VI cos φ and design capacitor bank to correct power factor to ~0.95+."
      ],
      analogy: "Apparent Power (kVA) is like a mug of beer: Real Power (kW) is the actual liquid beer you enjoy, and Reactive Power (kVAR) is the foam on top — you need a little foam, but too much foam wastes space!"
    },
    debug: [
      {
        title: "Fix Inductive Reactance Formula",
        buggy: `• BUG: Forgot 2*pi in frequency formula\ndef xl(freq, L):\n    return freq * L • Missing 2 * math.pi!`,
        fixed: `import math\ndef xl(freq, L):\n    return 2 * math.pi * freq * L`,
        hint: "Inductive reactance X_L = ωL = 2πfL."
      }
    ],
    quiz: [
      { q: "What is the impedance of a series RLC circuit at resonance?", options: ["Infinity", "Zero", "Equal to Resistance R", "Equal to X_L"], answer: 2 },
      { q: "What component is connected in parallel with industrial loads to improve lagging power factor?", options: ["Inductor", "Capacitor Bank", "Resistor", "Transformer"], answer: 1 },
      { q: "What is the formula for resonance frequency f_r?", options: ["1 / (2π LC)", "1 / (2π √(LC))", "2π √(LC)", "√(L/C)"], answer: 1 },
      { q: "What is the unit of Reactive Power Q?", options: ["Watts (W)", "Volt-Amperes (VA)", "Volt-Amperes Reactive (VAR)", "Joules (J)"], answer: 2 },
      { q: "In a purely inductive AC circuit, what is the phase relationship between voltage and current?", options: ["In phase", "Voltage leads current by 90°", "Current leads voltage by 90°", "Out of phase by 180°"], answer: 1 }
    ],
    mnc: [
      { company: "Schneider Electric", year: "2023", question: "How does Active Power Factor Correction (PFC) work in modern SMPS power supplies?", answer: "Uses a boost converter topology with microcontrollers to shape input current waveform to match input voltage waveform in phase, achieving PF > 0.99." },
      { company: "ABB", year: "2023", question: "Explain total harmonic distortion (THD) in AC power lines", answer: "THD measures ratio of sum of powers of all harmonic components to power of fundamental frequency. High THD causes equipment overheating and transformer loss." },
      { company: "Siemens", year: "2022", question: "Why are transformers rated in kVA instead of kW?", answer: "Transformer losses depend on voltage (iron loss) and current (copper loss), regardless of load power factor cos φ. Rating in kVA covers maximum thermal capacity." }
    ],
    mock: [
      { type: "Technical", question: "What happens if a capacitor bank is over-sized for power factor correction?", tip: "Over-compensation causes the system power factor to become LEADING, leading to over-voltages on transmission lines via the Ferranti Effect." }
    ],
    coding: {
      problem: "RLC Resonance Frequency",
      desc: "Given L in Henrys and C in Farads, calculate the resonance frequency in Hz.",
      input: "L = 0.1, C = 0.00001",
      output: "159.15 Hz",
      starter: `import math\n\ndef resonance_freq(l, c):\n    • Return 1 / (2 * pi * sqrt(l * c))\n    pass`
    }
  },
  {
    moduleTitle: "Electrical Machines – Motors & Generators",
    roles: ["eee-design", "eee-power", "eee-renewable"],
    industryUseCase: "Smart Grid Voltage Stability & Microgrid Inverter Control at ABB/Siemens",
    harvardOxfordRef: "Oxford Power Systems Engineering & High-Voltage Direct Current (HVDC) Transmission",
    level: "Level 3 – Electrical Machines",
    branch: ["eee"],
    videos: makeVideoLinks("Electrical Machines DC Motor Induction Motor Synchronous Generator Torque Speed"),
    studyMaterial: {
      summary: `Electromechanical energy conversion transfers energy between electrical and mechanical forms:

DC Machines:
- Working Principle: Lorentz Force F = B * I * L.
- DC Motor Torque: T = K * Φ * I_a. Back EMF: E_b = V - I_a * R_a.
- Speed Control: N ∝ (V - I_a * R_a) / Φ. Controlled via armature voltage or field weakening.

3-Phase Induction Motors:
- Stator winding carries 3-phase AC creating Rotating Magnetic Field (RMF) at Synchronous Speed N_s = 120 * f / P.
- Rotor turns at speed N < N_s. Slip s = (N_s - N) / N_s.
- Starters: Direct-On-Line (DOL), Star-Delta, Variable Frequency Drive (VFD).

Synchronous Generators (Alternators):
- Driven by prime mover at exact synchronous speed N_s.
- Generates grid power in thermal/hydro power stations.`,
      keyPoints: [
        "Back EMF E_b acts as a self-regulating governor in DC motors.",
        "Induction Motor CANNOT run at synchronous speed (N_s); if N = N_s, slip = 0 and induced torque drops to zero.",
        "Star-Delta starter reduces starting current to 1/3 of Direct-On-Line value.",
        "VFD (Variable Frequency Drive) controls induction motor speed by varying voltage and frequency (V/f constant)."
      ],
      example: `• Python Induction Motor Synchronous Speed & Slip
def motor_specs(freq, poles, actual_rpm):
    ns = (120 * freq) / poles
    slip = (ns - actual_rpm) / ns
    return ns, slip

print("Ns (RPM), Slip:", motor_specs(50, 4, 1440)) • Output: (1500 RPM, 0.04 or 4% slip)`,
      complexity: "Torque-Speed Curve: Non-linear polynomial"
    },
    aiExplain: {
      steps: [
        "1. Apply 3-phase AC to stator to establish Rotating Magnetic Field (RMF) at speed N_s.",
        "2. RMF cuts rotor conductors, inducing EMF via Faraday's Law.",
        "3. Induced current flows in shorted rotor bars, creating rotor magnetic field.",
        "4. Interaction of stator RMF and rotor field generates electromagnetic torque.",
        "5. Rotor accelerates up to speed N = N_s * (1 - s)."
      ],
      analogy: "An induction motor is like a dog chasing a mechanical rabbit on a racetrack: the rabbit runs at synchronous speed (N_s), and the dog runs just behind (N); if the dog catches the rabbit (slip = 0), there's no chase left (zero torque)!"
    },
    debug: [
      {
        title: "Fix Synchronous Speed Calculation",
        buggy: `• BUG: Forgot factor of 120 in Ns formula\ndef ns(f, p):\n    return f / p • Incorrect!`,
        fixed: `def ns(f, p):\n    return (120 * f) / p`,
        hint: "Synchronous speed N_s = (120 * f) / P where P is number of poles."
      }
    ],
    quiz: [
      { q: "What is the synchronous speed of a 4-pole motor operating at 50 Hz?", options: ["1000 RPM", "1500 RPM", "3000 RPM", "750 RPM"], answer: 1 },
      { q: "What happens if an induction motor reaches synchronous speed (slip = 0)?", options: ["Torque becomes infinite", "Torque drops to zero", "Motor reverses direction", "Motor burns out"], answer: 1 },
      { q: "By how much does a Star-Delta starter reduce starting current compared to DOL?", options: ["1/2", "1/3", "1/4", "2/3"], answer: 1 },
      { q: "What parameter is controlled by a VFD to vary AC motor speed while maintaining constant flux?", options: ["Current only", "Voltage and Frequency ratio (V/f)", "Resistance", "Capacitance"], answer: 1 },
      { q: "Which DC motor offers near-constant speed under varying load conditions?", options: ["DC Series Motor", "DC Shunt Motor", "Cumulative Compound Motor", "Universal Motor"], answer: 1 }
    ],
    mnc: [
      { company: "ABB", year: "2023", question: "Why should a DC Series Motor NEVER be started without load?", answer: "At no-load, field flux Φ is near zero. Speed N ∝ 1/Φ approaches dangerously high runaway speeds leading to mechanical destruction." },
      { company: "Siemens", year: "2023", question: "Explain Regenerative Braking in electric trains", answer: "When electric train brakes, motor acts as generator feed power back into catenary grid, converting kinetic energy into electricity." },
      { company: "Kirloskar", year: "2022", question: "How is Direction of Rotation reversed in a 3-phase induction motor?", answer: "Interchange any two of the three input phase supply leads (e.g. swap R and Y lines)." }
    ],
    mock: [
      { type: "Technical", question: "What is the difference between Synchronous Motor and Induction Motor?", tip: "Synchronous motor runs at constant N_s regardless of load (requires DC excitation on rotor, not self-starting). Induction motor runs at N < N_s (singly excited, self-starting)." }
    ],
    coding: {
      problem: "Calculate Motor Slip & Speed",
      desc: "Given frequency f, poles p, and slip percentage, calculate actual motor RPM.",
      input: "f = 50, p = 4, slip_percent = 4.0",
      output: "1440.0",
      starter: `def motor_rpm(f, p, slip_percent):\n    • Return ns * (1 - slip)\n    pass`
    }
  },
  {
    moduleTitle: "Control Systems – Transfer Function, Bode Plot & PID",
    roles: ["eee-design", "eee-power", "eee-renewable"],
    industryUseCase: "Smart Grid Voltage Stability & Microgrid Inverter Control at ABB/Siemens",
    harvardOxfordRef: "Oxford Power Systems Engineering & High-Voltage Direct Current (HVDC) Transmission",
    level: "Level 4 – Control Systems",
    branch: ["eee"],
    videos: makeVideoLinks("Control Systems Transfer Function Bode Plot Root Locus PID Controller"),
    studyMaterial: {
      summary: `Control Systems govern dynamic output behavior to match reference commands:

Transfer Function H(s) = Y(s) / X(s):
- Ratio of Laplace transform of output to input assuming zero initial conditions.
- Poles: Roots of denominator polynomial (determine stability).
- Zeros: Roots of numerator polynomial.

Stability Analysis:
- Routh-Hurwitz Criterion: All coefficients in 1st column of Routh array must have same sign for stability.
- Root Locus: Trajectory of closed-loop poles as system gain K varies from 0 to infinity.
- Bode Plot: Frequency response plots of Magnitude (dB) and Phase (degrees) vs log frequency.
- Phase Margin (PM) and Gain Margin (GM) quantify system stability robustness.

PID Control:
- u(t) = K_p * e(t) + K_i * ∫e(t)dt + K_d * (de/dt).`,
      keyPoints: [
        "System is BIBO stable if ALL poles lie strictly in Left-Half of s-plane (LHP).",
        "Phase Margin > 0 and Gain Margin > 0 dB ensure closed-loop stability.",
        "Integral (I) controller eliminates steady-state error but reduces stability margin.",
        "Derivative (D) controller improves transient response speed and damps oscillations."
      ],
      example: `• Python Closed-Loop Transfer Function
def closed_loop_gain(g_s, h_s):
    • T(s) = G(s) / (1 + G(s)*H(s))
    return g_s / (1 + g_s * h_s)

print("T(s) for G=10, H=0.1:", closed_loop_gain(10, 0.1)) • Output: 5.0`,
      complexity: "Routh-Hurwitz Array: O(N²) where N is order of characteristic equation"
    },
    aiExplain: {
      steps: [
        "1. Derive differential equations of physical plant (electrical/mechanical).",
        "2. Take Laplace Transform to obtain open-loop Transfer Function G(s)H(s).",
        "3. Find characteristic equation 1 + G(s)H(s) = 0 and locate poles.",
        "4. Plot Bode diagram to calculate Gain Margin and Phase Margin.",
        "5. Tune PID gains (Kp, Ki, Kd) using Ziegler-Nichols method for desired step response."
      ],
      analogy: "Cruise control in a car: G(s) is the engine and car physics, Sensor measures speed, Error = Target - Speed. PID applies gas (P), accumulates uphill resistance (I), and eases off as target is reached (D)!"
    },
    debug: [
      {
        title: "Fix Unstable Pole Check",
        buggy: `• BUG: Checking if any pole is negative for stability\ndef is_stable(poles):\n    return any(p < 0 for p in poles) • Bug: should be ALL poles in LHP (real part < 0)`,
        fixed: `def is_stable(poles):\n    return all(p < 0 for p in poles) • All real parts must be negative`,
        hint: "For stability, ALL system poles must lie in Left-Half Plane (LHP, real part < 0)."
      }
    ],
    quiz: [
      { q: "Where must system poles lie for a linear system to be BIBO stable?", options: ["Right-half s-plane", "Left-half s-plane", "On imaginary axis", "At origin"], answer: 1 },
      { q: "Which PID component eliminates steady-state error?", options: ["Proportional", "Integral", "Derivative", "Feedforward"], answer: 1 },
      { q: "What does a Gain Margin > 0 dB indicate?", options: ["Unstable system", "Stable system", "Zero gain", "Infinite bandwidth"], answer: 1 },
      { q: "What theorem is used to determine closed-loop stability from frequency response?", options: ["Nyquist Stability Criterion", "Thevenin Theorem", "Maxwell's Equations", "Fourier Series"], answer: 0 },
      { q: "What is the effect of adding a pole to a transfer function?", options: ["Increases stability", "Pushes root locus towards right half plane (reduces stability)", "Eliminates delay", "Increases gain"], answer: 1 }
    ],
    mnc: [
      { company: "Honeywell", year: "2023", question: "How to tune PID parameters using Ziegler-Nichols Open-Loop method?", answer: "Apply step input to open-loop plant, measure reaction curve lag time L and time constant T, then calculate Kp=1.2T/L, Ki=2L, Kd=0.5L." },
      { company: "Yokogawa", year: "2023", question: "Explain Phase Margin requirement in industrial automation", answer: "Phase Margin PM = 180° + ∠G(jω_gc). Recommended PM is 45° to 60° to prevent excessive ringing and overshoot." },
      { company: "ABB", year: "2022", question: "Difference between Transfer Function and State-Space Model", answer: "Transfer function is frequency-domain SISO representation for zero initial conditions; State-Space is time-domain MIMO representation handling non-zero initial conditions." }
    ],
    mock: [
      { type: "Technical", question: "What is Integral Windup in PID controllers and how is it prevented?", tip: "Occurs when actuator saturates (e.g. valve 100% open) while error persists, causing integral term to accumulate huge values. Prevented using anti-windup clamping or resetting integral accumulator when saturated." }
    ],
    coding: {
      problem: "First Order Step Response",
      desc: "Calculate response y(t) = K * (1 - exp(-t / tau)) for a 1st order system.",
      input: "k = 5.0, tau = 2.0, t = 2.0",
      output: "3.1606",
      starter: `import math\n\ndef step_response(k, tau, t):\n    • Return k * (1 - exp(-t / tau))\n    pass`
    }
  },
  {
    moduleTitle: "Power Electronics – Converters, Inverters & EV Drives",
    roles: ["eee-design", "eee-power", "eee-renewable"],
    industryUseCase: "Smart Grid Voltage Stability & Microgrid Inverter Control at ABB/Siemens",
    harvardOxfordRef: "Oxford Power Systems Engineering & High-Voltage Direct Current (HVDC) Transmission",
    level: "Level 5 – Power Electronics",
    branch: ["eee"],
    videos: makeVideoLinks("Power Electronics Buck Boost Converter Inverter IGBT EV Drives PWM"),
    studyMaterial: {
      summary: `Power Electronics uses solid-state semiconductor switches to convert electrical energy efficiently:

Switches:
- MOSFET (high speed, low voltage < 600V), IGBT (high voltage/current in EVs and traction), SCR / Thyristor (high power line-frequency control).

DC-DC Converters (Choppers):
- Buck Converter (Step-Down): V_out = D * V_in (Duty cycle D = t_on / T).
- Boost Converter (Step-Up): V_out = V_in / (1 - D).
- Buck-Boost Converter (Inverting Step-Up/Down): V_out = - V_in * D / (1 - D).

Inverters (DC to AC):
- Sinusoidal Pulse Width Modulation (SPWM) varies pulse widths to reconstruct AC sine wave while shifting harmonics to high switching frequencies.

EV Drives & Solar Inverters:
- Bidirectional DC-DC converters manage EV battery charging/discharging.
- MPPT (Maximum Power Point Tracking) algorithms optimize solar PV efficiency.`,
      keyPoints: [
        "Switching converters achieve >90% efficiency by operating switches in ON (zero V) or OFF (zero I) states.",
        "Duty Cycle D = t_on / T (ranges from 0 to 1).",
        "IGBT combines MOSFET high input impedance gate with BJT low conduction losses.",
        "Freewheeling diode provides path for inductive current during switch OFF time, preventing over-voltage spikes."
      ],
      example: `• Python Buck & Boost Converter Output Voltage
def buck_converter(v_in, duty_cycle):
    return v_in * duty_cycle

def boost_converter(v_in, duty_cycle):
    return v_in / (1.0 - duty_cycle)

print("Buck (V_in=48V, D=0.25):", buck_converter(48, 0.25)) • Output: 12V
print("Boost (V_in=12V, D=0.75):", boost_converter(12, 0.75)) • Output: 48V`,
      complexity: "PWM Switching Frequency: 20 kHz - 500 kHz"
    },
    aiExplain: {
      steps: [
        "1. Microcontroller generates high-frequency PWM signal at duty cycle D.",
        "2. Gate Driver amplifies PWM signal to switch MOSFET/IGBT rapidly.",
        "3. During Switch ON: Inductor stores energy in magnetic field.",
        "4. During Switch OFF: Inductor releases energy to load through Freewheeling Diode.",
        "5. Output capacitor smooths voltage ripple to deliver steady DC."
      ],
      analogy: "A Buck Converter is like a rapidly pulsing water tap filling a bucket (capacitor): turning the tap fully ON for 25% of the time and OFF for 75% fills the bucket to exactly 25% height smoothly!"
    },
    debug: [
      {
        title: "Fix Boost Converter Division by Zero",
        buggy: `• BUG: Duty cycle D=1.0 causes zero division\ndef boost(v_in, d):\n    return v_in / (1 - d) • Crash when d=1.0!`,
        fixed: `def boost(v_in, d):\n    d = min(0.95, max(0.0, d)) • Clamp duty cycle < 0.95\n    return v_in / (1 - d)`,
        hint: "Never allow duty cycle D = 1.0 in Boost converters as theoretical output approaches infinity."
      }
    ],
    quiz: [
      { q: "What is the output voltage of a Buck converter with V_in = 24V and Duty Cycle D = 0.5?", options: ["48V", "12V", "24V", "6V"], answer: 1 },
      { q: "Which power switch combines MOSFET gate control with BJT current capability for high power EVs?", options: ["SCR", "TRIAC", "IGBT", "Zener Diode"], answer: 2 },
      { q: "What happens to output voltage in a Boost converter as duty cycle D increases towards 1?", options: ["Decreases to 0", "Increases significantly", "Remains constant", "Reverses polarity"], answer: 1 },
      { q: "What is the function of a freewheeling diode in converter circuits?", options: ["Increase voltage", "Provide continuous path for inductive current during switch turn-off", "Amplify signal", "Regulate frequency"], answer: 1 },
      { q: "Which modulation technique is standard for generating clean AC waveforms in solar inverters?", options: ["AM", "SPWM (Sinusoidal Pulse Width Modulation)", "FM", "PCM"], answer: 1 }
    ],
    mnc: [
      { company: "Tesla", year: "2023", question: "Why are SiC (Silicon Carbide) MOSFETs replacing Silicon IGBTs in modern EV traction inverters?", answer: "SiC features wider bandgap, 10x higher breakdown field, faster switching speed, lower switching losses, and higher temperature operation (>200°C), improving EV range by 5-10%." },
      { company: "Schneider", year: "2023", question: "Explain MPPT (Maximum Power Point Tracking) Perturb & Observe algorithm", answer: "Slightly perturbs solar panel operating voltage; if power increases, continue in same direction; if power decreases, reverse perturbation direction." },
      { company: "Tata Power", year: "2022", question: "What is the role of Bidirectional DC-DC Converters in Energy Storage Systems?", answer: "Allows power flow in both directions: Buck mode during battery charging from grid/solar, Boost mode during battery discharge to grid." }
    ],
    mock: [
      { type: "Technical", question: "What causes switching losses in power semiconductor switches?", tip: "During turn-on and turn-off transitions, overlap of non-zero voltage and non-zero current across the switch produces instantaneous power loss P = V * I. Higher switching frequency increases total switching loss." }
    ],
    coding: {
      problem: "Buck-Boost Output Voltage",
      desc: "Calculate output voltage magnitude for a Buck-Boost converter given V_in and duty cycle D.",
      input: "v_in = 12.0, d = 0.6",
      output: "18.0",
      starter: `def buck_boost_voltage(v_in, d):\n    • Return v_in * (d / (1 - d))\n    pass`
    }
  }
,
  {
    moduleTitle: "Circuit Theory – Kirchhoff's Laws",
    roles: ["eee-design", "eee-power", "eee-renewable"],
    industryUseCase: "Smart Grid Voltage Stability & Microgrid Inverter Control at ABB/Siemens",
    harvardOxfordRef: "Oxford Power Systems Engineering & High-Voltage Direct Current (HVDC) Transmission",
    level: "Level 1 – Foundations",
    branch: ["eee"],
    videos: makeVideoLinks("Kirchhoff Laws KVL KCL Circuit Analysis"),
    studyMaterial: {
      summary: "Kirchhoff's Current Law (KCL) and Voltage Law (KVL) are the fundamental tools for analyzing electrical circuits. KCL: currents sum to zero at a node. KVL: voltages sum to zero around a loop.",
      deepDiveTextbook: `KIRCHHOFF'S CIRCUIT LAWS\n\nKCL (Current Law): Sum of currents entering a node = Sum leaving. ΣI_in = ΣI_out (or ΣI = 0 at node).\nBased on conservation of charge — charge cannot accumulate at a node.\n\nKVL (Voltage Law): Sum of voltage drops around any closed loop = 0. ΣV = 0 around loop.\nBased on conservation of energy — potential difference is path-independent.\n\nNode Voltage Method:\n1. Select reference node (ground).\n2. Assign voltage variables to each non-reference node.\n3. Write KCL at each non-reference node in terms of node voltages.\n4. Solve system of equations.\nN-1 equations for N nodes.\n\nMesh Current Method:\n1. Identify meshes (inner loops).\n2. Assign mesh current to each loop.\n3. Write KVL for each mesh.\n4. Solve for mesh currents.\nM equations for M meshes.\n\nSuperposition: For linear circuits, total response = sum of responses from each independent source alone.\nThevenin: Any linear 2-terminal network = Vth (open-circuit voltage) + Rth (series resistance).\nNorton: Equivalent to In (short-circuit current) in parallel with Rn = Rth.`,
      keyPoints: ["KCL: ΣI=0 at node (current conservation)","KVL: ΣV=0 around loop (energy conservation)","Node voltage method: N-1 equations for N nodes","Thevenin = Voc + Rth series; Norton = Isc in parallel with Rth"],
      example: `• Nodal Analysis Example\n• Circuit: V1=10V source, R1=2Ω, R2=4Ω, R3=6Ω\n• Nodes: V1 (known=10V), V2 (unknown)\nimport numpy as np\n\n• KCL at node V2: (V2-10)/2 + V2/4 + V2/6 = 0\n• Multiply by 12: 6(V2-10) + 3V2 + 2V2 = 0\n• 11V2 = 60 → V2 = 60/11 ≈ 5.45V\nA = np.array([[6+3+2]])\nb = np.array([[60]])\nV2 = np.linalg.solve(A, b)\nprint(f"V2 = {V2[0][0]:.2f} V")`,
      comparisonTable: { headers: ["Method","Equations","Best For","Variables"], rows: [["Nodal","N-1 KCL","Many parallel branches","Node voltages"],["Mesh","M KVL","Many series elements","Mesh currents"],["Superposition","One source at a time","Understanding contributions","Individual responses"],["Thevenin/Norton","2 calculations","Load analysis","Equivalent circuit"]] },
      flowchartSteps: ["Identify nodes and meshes","Assign node voltages or mesh currents","Apply KCL (nodal) or KVL (mesh)","Write equations in matrix form","Solve using Gaussian elimination or Cramer's rule","Verify with power balance: ΣP_generated = ΣP_absorbed"],
      concept3DSimulation: { title: "Node Voltage Solution", description: "Circuit nodes shown with voltage levels; current arrows indicate KCL balance at each node.", interactiveNodes: [{name:"Node Analyzer",type:"KCL Applier",details:"Writes current balance equation at each node"},{name:"Matrix Solver",type:"Linear System",details:"Solves [G][V]=[I] using linear algebra"},{name:"Power Checker",type:"Verification",details:"Confirms ΣP=0 for energy conservation"}] },
      complexity: "Nodal: O(N³) matrix solve | Thevenin: O(N) calculation"
    },
    aiExplain: { steps: ["Label all node voltages","At each node: currents in = currents out","Write as linear equations","Solve the system"], analogy: "KCL is like water pipes: water flowing into a junction must equal water flowing out. KVL is like a hiking trail: net elevation change for a complete loop is always zero." },
    debug: [{ title: "Sign error in KVL", buggy: "Going around loop: +V1 - IR1 + IR2 = 0  • wrong sign if current direction assumed wrong", fixed: "Assign consistent current direction. If loop solution gives negative I, actual current flows opposite to assumed direction.", hint: "KVL sign convention: voltage rise (+) when going from - to + terminal. Voltage drop (-) when going from + to -." }],
    quiz: [
      { q: "KCL is based on conservation of:", options: ["Energy","Charge","Momentum","Flux"], answer: 1 },
      { q: "Thevenin equivalent consists of:", options: ["Current source + parallel R","Voltage source + series R","Two resistors","Current source only"], answer: 1 },
      { q: "Node voltage method uses:", options: ["KVL only","KCL only","Both KCL and KVL","Neither"], answer: 1 },
      { q: "KVL: sum of voltages around closed loop =", options: ["Total current","Total resistance","Zero","Supply voltage"], answer: 2 }
    ],
    mnc: [
      { company: "Siemens", year: "2023", question: "Find Thevenin equivalent of a circuit with 12V source, 6Ω and 3Ω resistors for load at terminals", answer: "Vth = Voc = 12 × 3/(6+3) = 4V. Rth: deactivate sources (short voltage source) = 6||3 = 2Ω. Thevenin equivalent: 4V source in series with 2Ω." },
      { company: "ABB", year: "2022", question: "Why is nodal analysis preferred over mesh analysis for op-amp circuits?", answer: "Op-amp circuits have current sources and floating voltage sources easily handled by nodal analysis. Super-node technique handles voltage sources. Mesh requires supermesh. Also, simulation tools (SPICE) use modified nodal analysis (MNA) internally." }
    ],
    mock: [{ type: "Technical", question: "Explain maximum power transfer theorem.", tip: "Maximum power transferred to load when RL = Rth (load resistance equals Thevenin resistance). Maximum power = Vth²/(4Rth). Efficiency = 50% at max power transfer. Used in RF/communication systems. Not used where efficiency matters more (power transmission)." }],
    coding: { problem: "Solve Nodal Analysis", desc: "Implement nodal analysis solver for resistive circuits.", input: "conductance_matrix G, current_vector I", output: "node_voltages V = G⁻¹ * I", starter: "import numpy as np\n\ndef nodal_analysis(G, I):\n    • Solve [G][V] = [I] using numpy\n    V = np.linalg.solve(G, I)\n    return V\n\n• Example: 2-node circuit\nG = np.array([[0.75, -0.5], [-0.5, 0.75]])\nI = np.array([2.0, -1.0])\nprint(nodal_analysis(G, I))" }
  },
  {
    moduleTitle: "Electrical Machines – DC & AC Motors",
    roles: ["eee-design", "eee-power", "eee-renewable"],
    industryUseCase: "Smart Grid Voltage Stability & Microgrid Inverter Control at ABB/Siemens",
    harvardOxfordRef: "Oxford Power Systems Engineering & High-Voltage Direct Current (HVDC) Transmission",
    level: "Level 2 – Intermediate",
    branch: ["eee"],
    videos: makeVideoLinks("DC Motor AC Induction Motor Electrical Machines"),
    studyMaterial: {
      summary: "Electrical machines convert between electrical and mechanical energy. DC motors are speed-controllable; AC induction motors are robust and widely used in industry. Understanding their characteristics is fundamental for drive systems.",
      deepDiveTextbook: `ELECTRICAL MACHINES\n\nDC Motor:\nEquivalent circuit: Vs = Ea + Ia*Ra (Ia = armature current, Ra = armature resistance)\nBack EMF: Ea = KΦω (K = machine constant, Φ = flux, ω = speed)\nTorque: T = KΦIa\nSpeed: N = (Vs - IaRa)/(KΦ) — speed increases as flux decreases, load decreases.\n\nDC Motor Types:\n- Series: Field winding in series with armature. High starting torque. Speed drops with load. Never run unloaded (dangerously high speed). Used in traction, cranes.\n- Shunt: Field winding in parallel. Near-constant speed with load. Used for CNC machines.\n- Compound: Combined. Better characteristics.\n\nAC Induction Motor:\nStator creates rotating magnetic field at synchronous speed: Ns = 120f/P (f=frequency, P=poles)\nRotor runs slightly slower: actual speed Nr = Ns(1-s) where s = slip ratio\nTypical slip: 3-5% at full load.\nTorque-slip characteristic: maximum torque at breakdown slip, starting torque lower.\n\nSpeed Control Methods:\n- DC: Armature voltage, field flux, armature resistance control.\n- AC: Variable frequency drive (VFD) — V/f = constant for constant torque.\n\nEfficiency: Losses = Copper (I²R), Iron (eddy current + hysteresis), Mechanical (friction).\nEfficiency η = Pout/Pin = T*ω/(Vs*Is).`,
      keyPoints: ["DC motor speed ∝ 1/flux — reducing field increases speed","AC induction motor speed = Ns(1-s), slip 3-5% at full load","VFD controls AC motor speed by varying V and f proportionally","Series DC motor must never run unloaded — dangerous overspeed"],
      example: `• DC Motor Speed Calculation\ndef dc_motor_speed(Vs, Ia, Ra, K, phi):\n    Ea = Vs - Ia * Ra  • Back EMF\n    omega = Ea / (K * phi)  • Angular speed in rad/s\n    N = omega * 60 / (2 * 3.14159)  • Speed in RPM\n    return N, Ea\n\n• AC Induction Motor Slip\ndef induction_motor(f, P, Nr):\n    Ns = 120 * f / P  • Synchronous speed in RPM\n    slip = (Ns - Nr) / Ns\n    return Ns, slip\n\nprint(induction_motor(50, 4, 1450))  • 1500 RPM, 0.033 slip`,
      comparisonTable: { headers: ["Motor Type","Speed Control","Starting Torque","Application","Maintenance"], rows: [["DC Shunt","Easy (armature V)","Medium","CNC, printing","Brushes wear"],["DC Series","Field control","Very High","Traction, cranes","Brushes wear"],["AC Induction","VFD needed","Medium","Industry standard","Almost none"],["BLDC","Electronic","High","EVs, drones","Low (no brushes"]] },
      flowchartSteps: ["Supply voltage applied to motor","Armature current flows (DC) or stator field created (AC)","Magnetic field interacts → torque produced","Rotor accelerates to running speed","Back EMF (DC) or slip (AC) reaches steady state","Load torque balanced by motor torque","Speed stabilizes at operating point"],
      concept3DSimulation: { title: "Motor Torque-Speed Curve", description: "Curve shows how motor torque varies with speed — intersection with load curve = operating point.", interactiveNodes: [{name:"Torque Generator",type:"Electromagnetic Torque",details:"Force on current-carrying conductors in magnetic field"},{name:"Back EMF",type:"Speed Dependent Voltage",details:"Opposes applied voltage, limits current and speed"},{name:"Operating Point",type:"Equilibrium",details:"Where motor torque equals load torque"}] },
      complexity: "Motor equations: O(1) analytical | Drive simulation: O(N) time steps"
    },
    aiExplain: { steps: ["Apply voltage to motor terminals","Current flows creating magnetic force","Rotor starts turning (torque > load)","Back EMF builds up as speed increases","Current decreases until torque = load — steady state"], analogy: "Like pedaling a bicycle: you push harder (voltage) to go faster, but the faster you go the harder it is to push more (back EMF), reaching a natural balance point." },
    debug: [{ title: "Series motor runaway", buggy: "Series motor connected with no load → speed increases to dangerous levels", fixed: "Always connect series motor with mechanical load, or add protective governor/VFD with speed limit", hint: "In DC series motor: T = KΦIa, Φ ∝ Ia. At no load, Ia → 0, Φ → 0, so speed = Ea/KΦ → ∞. Always load series motors." }],
    quiz: [
      { q: "AC induction motor synchronous speed formula:", options: ["Ns = 60f/P","Ns = 120f/P","Ns = 240f/P","Ns = f*P"], answer: 1 },
      { q: "VFD controls AC motor by varying:", options: ["Only voltage","Only frequency","Voltage and frequency together","Only current"], answer: 2 },
      { q: "DC series motor should never be:", options: ["Run at full load","Run in reverse","Run without load","Connected to VFD"], answer: 2 },
      { q: "Typical slip of induction motor at full load:", options: ["0%","1%","3-5%","20%"], answer: 2 }
    ],
    mnc: [
      { company: "ABB", year: "2023", question: "How does a VFD save energy in pump applications?", answer: "Pump power ∝ flow³ (affinity laws). Reducing speed by 20% reduces power by 50%. VFD adjusts motor speed to match demand instead of throttling with valves. Typical energy savings: 30-50%. Additional benefits: soft start (no inrush current), speed control, protection against overload." },
      { company: "BHEL", year: "2022", question: "Explain regenerative braking in electric motors.", answer: "Motor operates as generator during braking — mechanical energy converted back to electrical. DC motor: reverse armature current, energy fed back to supply. AC induction: operate above synchronous speed (negative slip). Used in EVs, lifts, trains. Energy returned to grid or stored in batteries/capacitors." }
    ],
    mock: [{ type: "Technical", question: "Compare induction motor and synchronous motor for industrial applications.", tip: "Induction: self-starting, simple, robust, cheaper, slight speed variation with load (slip). Synchronous: runs at exact synchronous speed, can provide power factor correction (leading PF when over-excited), higher efficiency, requires DC excitation or permanent magnets, not self-starting. Use synchronous for precise speed or PF correction; induction for general purpose." }],
    coding: { problem: "Motor Drive Efficiency Calculator", desc: "Calculate motor drive system efficiency considering all losses.", input: "Vs=415V, Is=10A, pf=0.85, Pout=4000W", output: "Efficiency = 84.3%", starter: "import math\n\ndef motor_efficiency(Vs, Is, pf, Pout):\n    Pin = Vs * Is * pf * math.sqrt(3)  • 3-phase\n    efficiency = (Pout / Pin) * 100\n    losses = Pin - Pout\n    return efficiency, losses\n\nprint(motor_efficiency(415, 10, 0.85, 4000))" }
  },
  {
    moduleTitle: "Power Systems – Generation to Distribution",
    roles: ["eee-design", "eee-power", "eee-renewable"],
    industryUseCase: "Smart Grid Voltage Stability & Microgrid Inverter Control at ABB/Siemens",
    harvardOxfordRef: "Oxford Power Systems Engineering & High-Voltage Direct Current (HVDC) Transmission",
    level: "Level 2 – Intermediate",
    branch: ["eee"],
    videos: makeVideoLinks("Power Systems Generation Transmission Distribution Grid"),
    studyMaterial: {
      summary: "Electric power systems generate, transmit, and distribute electricity from power plants to consumers. Understanding the grid hierarchy, transformers, and load flow is essential for power engineering careers.",
      deepDiveTextbook: `POWER SYSTEMS FUNDAMENTALS\n\nGrid Hierarchy:\n1. Generation: Power plants (thermal, hydro, nuclear, solar, wind). Generated at 11-33kV.\n2. Transmission: Step-up transformer → 132kV/220kV/400kV/765kV for long-distance low-loss transmission.\n3. Sub-transmission: 33kV/66kV for regional distribution.\n4. Distribution: Step-down to 11kV, then 415V/240V for consumers.\n\nWhy High Voltage Transmission?\nPower loss = I²R. For same power P = VI, higher V → lower I → lower I²R losses.\nExample: Transmitting 100MW at 11kV: I = 5.25kA, losses huge.\nAt 400kV: I = 144A, losses 1370× lower.\n\nTransformer:\nVoltage ratio: V1/V2 = N1/N2 (turns ratio a)\nCurrent ratio: I1/I2 = N2/N1 = 1/a\nPower: P1 = P2 (ideal). Efficiency >99% for large transformers.\nEquivalent circuit: leakage inductance + winding resistance + core loss (eddy + hysteresis).\n\nLoad Flow Analysis (Newton-Raphson):\nFind bus voltages/angles satisfying P and Q injections.\nP = Σ|Vi||Vj||Yij|cos(δi-δj-θij)\nQ = Σ|Vi||Vj||Yij|sin(δi-δj-θij)\n\nFaults: LLL (3-phase symmetric), LLG, LL, LG (most common ~70% of faults).\nProtection: Overcurrent relays, distance relays (21 relay), differential relays.`,
      keyPoints: ["High voltage transmission: P_loss = I²R, higher V → lower I → less loss","Transformer V1/V2 = N1/N2, I1/I2 = N2/N1","Load flow finds bus voltages satisfying power balance","LG fault is most common (70%), LLL is most severe"],
      example: `• Per Unit System Calculation\ndef per_unit(actual, base):\n    return actual / base\n\n• Example: 132kV system, Sbase=100MVA\nVbase = 132e3  • Volts\nSbase = 100e6  • VA\nZbase = Vbase**2 / Sbase  • 174.24 Ohm\n\nZ_actual = 50  • Ohm\nZ_pu = per_unit(Z_actual, Zbase)  • 0.287 pu\n\nprint(f"Zbase = {Zbase:.2f} Ω")\nprint(f"Z = {Z_pu:.3f} pu")`,
      comparisonTable: { headers: ["Fault Type","Frequency","Severity","Symmetry"], rows: [["Single Line-Ground (LG)","~70%","Low","Unsymmetrical"],["Line-Line (LL)","~15%","Medium","Unsymmetrical"],["Double Line-Ground (LLG)","~10%","High","Unsymmetrical"],["3-Phase (LLL)","~5%","Highest","Symmetrical"]] },
      flowchartSteps: ["Power generated at plant (11-33kV)","Step-up transformer (400kV for long distance)","Transmission lines (towers, conductors)","Step-down at grid substation (132kV)","Regional distribution (33kV/11kV)","Distribution transformers (415V/240V)","Consumer connection"],
      concept3DSimulation: { title: "Power Grid Voltage Profile", description: "Voltage steps shown: generation → step-up → transmission → step-down → distribution → consumer.", interactiveNodes: [{name:"Step-Up Transformer",type:"Voltage Amplifier",details:"Boosts voltage for low-loss long-distance transmission"},{name:"Transmission Line",type:"High-V Conductor",details:"Carries power with minimal I²R losses at high voltage"},{name:"Step-Down Substation",type:"Load Center",details:"Reduces voltage for safe consumer delivery"}] },
      complexity: "Load flow: O(N²) per iteration, ~5-10 Newton-Raphson iterations"
    },
    aiExplain: { steps: ["Generate at low voltage","Step up for efficient long-distance transmission","Step down at substations","Distribute to consumers at safe voltage"], analogy: "Like a water supply system: pump pressure (voltage) is increased to push water through long pipes (transmission), then pressure reduced at neighborhoods (substations) for home taps (consumers)." },
    debug: [{ title: "Per-unit system mismatch", buggy: "Adding impedances from different voltage bases without converting: 0.1pu + 0.05pu (different base) = 0.15pu (WRONG)", fixed: "Convert all to same base: Znew = Zold * (Vbase_old/Vbase_new)² * (Sbase_new/Sbase_old)", hint: "Per-unit values must be on the same base to be added. Always convert to a common base before calculations." }],
    quiz: [
      { q: "Why transmit power at high voltage?", options: ["Faster transmission","Lower I²R losses","Higher frequency","Better regulation"], answer: 1 },
      { q: "Most common fault type in power systems:", options: ["3-phase (LLL)","Line-Line (LL)","Double Line-Ground","Single Line-Ground (LG)"], answer: 3 },
      { q: "Transformer turns ratio a = N1/N2 relates currents as:", options: ["I1/I2 = a","I1/I2 = 1/a","I1 = I2","I1/I2 = a²"], answer: 1 },
      { q: "Load flow analysis solves for:", options: ["Fault currents","Bus voltages and angles","Transformer ratings","Protection settings"], answer: 1 }
    ],
    mnc: [
      { company: "NTPC", year: "2023", question: "What is the significance of power factor in power systems?", answer: "PF = cos φ = P/(S). Low PF means high reactive current for same real power → larger conductor sizes, higher I²R losses, lower system capacity. Power companies penalize industrial consumers for low PF (<0.9). Capacitor banks used for PF correction. Leading PF from capacitors/over-excited synchronous motors compensates lagging PF of inductive loads." },
      { company: "PGCIL", year: "2022", question: "Explain voltage stability and what causes voltage collapse.", answer: "Voltage stability: system maintains acceptable voltages after disturbance. Voltage collapse: cascade failure where load demands more reactive power than available, voltage drops, more reactive needed, unstable. Triggered by heavy loading, contingencies, insufficient reactive sources. Prevention: reactive compensation, SVCs, FACTS devices, load shedding schemes." }
    ],
    mock: [{ type: "Technical", question: "What is the purpose of SCADA in power systems?", tip: "SCADA (Supervisory Control and Data Acquisition): monitors and controls entire power grid remotely. RTUs at substations measure V, I, breaker status, send to control center via communication. Operators can remotely open/close breakers, change tap settings. Energy Management System (EMS) runs load flow, state estimation. Critical infrastructure — cybersecurity essential." }],
    coding: { problem: "3-Phase Power Calculator", desc: "Calculate 3-phase real, reactive, and apparent power from measurements.", input: "V_line=415V, I_line=50A, pf=0.8", output: "P=24.2kW, Q=18.1kVAR, S=30.3kVA", starter: "import math\n\ndef three_phase_power(V_line, I_line, pf):\n    S = math.sqrt(3) * V_line * I_line  • Apparent power VA\n    P = S * pf  • Real power W\n    Q = S * math.sqrt(1 - pf**2)  • Reactive power VAR\n    return P/1000, Q/1000, S/1000  • kW, kVAR, kVA\n\nprint(three_phase_power(415, 50, 0.8))" }
  },
  {
    moduleTitle: "Renewable Energy – Solar & Wind",
    roles: ["eee-design", "eee-power", "eee-renewable"],
    industryUseCase: "Smart Grid Voltage Stability & Microgrid Inverter Control at ABB/Siemens",
    harvardOxfordRef: "Oxford Power Systems Engineering & High-Voltage Direct Current (HVDC) Transmission",
    level: "Level 2 – Intermediate",
    branch: ["eee"],
    videos: makeVideoLinks("Solar PV Wind Energy Renewable Power Systems"),
    studyMaterial: {
      summary: "Solar PV and wind energy are the fastest-growing electricity sources globally. Understanding solar cell physics, maximum power point tracking (MPPT), and wind turbine aerodynamics is essential for modern power engineers.",
      deepDiveTextbook: `RENEWABLE ENERGY SYSTEMS\n\nSolar PV:\nPhotovoltaic effect: photons with energy > Eg excite electrons across p-n junction → voltage and current.\nSolar cell equivalent circuit: Current source Iph in parallel with diode + series resistance Rs.\nI-V characteristic: I = Iph - I0(e^(qV/nkT) - 1)\nKey parameters:\n- Isc (short-circuit current): maximum current at V=0\n- Voc (open-circuit voltage): maximum voltage at I=0\n- MPP (Maximum Power Point): Pmax = Vmp × Imp ≈ 0.8 × Isc × Voc\n- Fill Factor FF = Pmax/(Voc × Isc). Good cells: FF > 0.75\n- Efficiency η = Pmax/(Pin * Area). Commercial silicon: 18-22%.\n\nMPPT (Maximum Power Point Tracking):\nP&O (Perturb and Observe): Perturb duty cycle, measure dP/dV, move toward MPP.\nIncrementalConductance: Track when dI/dV = -I/V (at MPP).\n\nWind Energy:\nBetz limit: Maximum power extraction = 59.3% of wind kinetic energy.\nTurbine power: P = 0.5 × Cp × ρ × A × v³\n(Cp = power coefficient ≤0.593, ρ = air density, A = swept area, v = wind speed)\nCut-in speed ~3m/s, rated speed ~12m/s, cut-out ~25m/s.\n\nGrid Integration:\nInverters convert DC (solar) to AC. Grid-tied inverters synchronize to grid frequency/phase.\nBattery storage (Li-ion) buffers intermittency. Smart grid manages variable generation.`,
      keyPoints: ["Solar MPP ≈ 0.8 × Isc × Voc; MPPT maximizes power extraction","Betz limit: max 59.3% wind energy extractable","Wind power ∝ v³ — doubling wind speed = 8× more power","Grid-tied inverter must synchronize frequency and phase to grid"],
      example: `• Solar PV System Sizing\ndef pv_system_size(daily_load_kWh, peak_sun_hours, panel_W, efficiency):\n    daily_generation = panel_W/1000 * peak_sun_hours * efficiency\n    panels_needed = math.ceil(daily_load_kWh / daily_generation)\n    system_kWp = panels_needed * panel_W / 1000\n    return panels_needed, system_kWp\n\nimport math\n• 20 kWh/day load, 5 peak sun hours, 400W panels, 80% system efficiency\npanels, kWp = pv_system_size(20, 5, 400, 0.80)\nprint(f"Panels: {panels}, System: {kWp:.1f} kWp")`,
      comparisonTable: { headers: ["Technology","Capacity Factor","Land Use","Grid Dispatchable","Cost Trend"], rows: [["Solar PV","15-25%","Medium","No (storage needed)","Falling fast"],["Wind Onshore","25-40%","Low (shared)","No (storage needed)","Falling"],["Hydro","40-60%","High (reservoir)","Yes (dispatchable)","Stable"],["Nuclear","85-95%","Very Low","Yes (baseload)","High, stable"]] },
      flowchartSteps: ["Solar: sunlight → PV panel (DC output)","DC to MPPT charge controller","Battery storage or direct to inverter","DC to AC inverter (grid-synchronized)","Net metering or off-grid load","Wind: wind → turbine rotation → generator → inverter → grid"],
      concept3DSimulation: { title: "Solar I-V and P-V Curves", description: "I-V curve shows operating points; P-V curve shows MPP as peak. Temperature and irradiance effects shown.", interactiveNodes: [{name:"PV Cell Model",type:"Diode Circuit",details:"Current source Iph with diode and series resistance"},{name:"MPPT Tracker",type:"DC-DC Converter",details:"Adjusts duty cycle to keep operating at maximum power point"},{name:"Grid Inverter",type:"AC Synchronizer",details:"Converts DC to AC at grid frequency and phase"}] },
      complexity: "MPPT P&O: O(1) per iteration | System sizing: O(N) annual data"
    },
    aiExplain: { steps: ["Sunlight hits PV cells → DC electricity generated","MPPT controller continuously adjusts to extract maximum power","Inverter converts DC to grid-compatible AC","Excess power goes to grid or battery"], analogy: "MPPT is like always driving at your car's most fuel-efficient speed — even as wind (irradiance) changes, you continuously adjust speed (operating point) to stay most efficient." },
    debug: [{ title: "Shading effect on series strings", buggy: "One shaded panel in series string → entire string current limited to shaded panel's Isc", fixed: "Add bypass diodes across each panel. Shaded panel bypassed — rest of string continues operating.", hint: "In series strings, lowest current panel limits all. Bypass diodes allow current to flow around shaded panels — critical for partial shading." }],
    quiz: [
      { q: "Betz limit for wind energy is:", options: ["40%","50%","59.3%","70%"], answer: 2 },
      { q: "Wind power is proportional to:", options: ["v","v²","v³","v⁴"], answer: 2 },
      { q: "Fill Factor for good solar cells:", options: ["> 0.5","> 0.6","> 0.75","= 1.0"], answer: 2 },
      { q: "MPPT stands for:", options: ["Multi-Phase Power Transfer","Maximum Power Point Tracking","Modular Panel Power Technology","Minimum Pulse Period Time"], answer: 1 }
    ],
    mnc: [
      { company: "Siemens Gamesa", year: "2023", question: "How do wind turbines control power output above rated wind speed?", answer: "Pitch control: rotate blade angle (pitch) toward feathered position to reduce aerodynamic efficiency. Reduces Cp at high winds. Maintains rated power output without over-speeding. Stall control (passive): blade aerodynamically stalls at high speed without active control — simpler but less precise. Modern turbines use active pitch + generator torque control." },
      { company: "First Solar", year: "2022", question: "Explain LCOE and why solar LCOE has fallen 90% in 10 years.", answer: "LCOE (Levelized Cost of Electricity) = total lifecycle cost / total energy produced. Solar LCOE fell from ~$350/MWh (2010) to ~$35/MWh (2023) due to: 1) Panel efficiency improvements (12% → 22%). 2) Manufacturing scale (supply chain learning curve). 3) Larger plants (economies of scale). 4) Cheaper financing (lower perceived risk). 5) Better inverters and BOS components." }
    ],
    mock: [{ type: "Technical", question: "How does a grid-tied solar inverter maintain grid synchronization?", tip: "Phase-locked loop (PLL) tracks grid voltage phase and frequency. Inverter modulates output to match grid. IEEE 1547 requires disconnection if grid frequency ≠ 60Hz ± 0.5Hz. Anti-islanding protection: detects loss of grid (frequency/phase shift) and disconnects within 2 seconds to protect line workers." }],
    coding: { problem: "Wind Farm Power Forecast", desc: "Given wind speed forecast, calculate expected wind farm power output.", input: "wind_speeds=[3,8,12,15,20,25], Cp=0.4, area=7854m², air_density=1.225", output: "Power at each wind speed (0 at cut-in, rated above rated speed)", starter: "def wind_power(v, Cp, A, rho=1.225, v_cutin=3, v_rated=12, v_cutout=25, P_rated=2e6):\n    if v < v_cutin or v > v_cutout:\n        return 0\n    elif v >= v_rated:\n        return P_rated\n    else:\n        return 0.5 * Cp * rho * A * v**3\n\nfor v in [3,8,12,15,20,25]:\n    print(f'v={v}: P={wind_power(v,0.4,7854)/1e3:.1f} kW')" }
  }
];
