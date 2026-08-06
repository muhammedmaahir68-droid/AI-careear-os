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
  },
  {
    moduleTitle: "AC Circuits – Phasors, Impedance & Power Factor",
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
      example: `# Python Power Factor & Apparent Power Calculator
import math

def calculate_ac_power(v, i, pf_angle_deg):
    pf = math.cos(math.radians(pf_angle_deg))
    p_real = v * i * pf # Watts
    s_apparent = v * i # VA
    q_reactive = v * i * math.sin(math.radians(pf_angle_deg)) # VAR
    return p_real, s_apparent, pf

print(calculate_ac_power(230, 10, 36.87)) # Output: (1840W, 2300VA, 0.8 PF)`,
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
        buggy: `# BUG: Forgot 2*pi in frequency formula\ndef xl(freq, L):\n    return freq * L # Missing 2 * math.pi!`,
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
      starter: `import math\n\ndef resonance_freq(l, c):\n    # Return 1 / (2 * pi * sqrt(l * c))\n    pass`
    }
  },
  {
    moduleTitle: "Electrical Machines – Motors & Generators",
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
      example: `# Python Induction Motor Synchronous Speed & Slip
def motor_specs(freq, poles, actual_rpm):
    ns = (120 * freq) / poles
    slip = (ns - actual_rpm) / ns
    return ns, slip

print("Ns (RPM), Slip:", motor_specs(50, 4, 1440)) # Output: (1500 RPM, 0.04 or 4% slip)`,
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
        buggy: `# BUG: Forgot factor of 120 in Ns formula\ndef ns(f, p):\n    return f / p # Incorrect!`,
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
      starter: `def motor_rpm(f, p, slip_percent):\n    # Return ns * (1 - slip)\n    pass`
    }
  },
  {
    moduleTitle: "Control Systems – Transfer Function, Bode Plot & PID",
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
      example: `# Python Closed-Loop Transfer Function
def closed_loop_gain(g_s, h_s):
    # T(s) = G(s) / (1 + G(s)*H(s))
    return g_s / (1 + g_s * h_s)

print("T(s) for G=10, H=0.1:", closed_loop_gain(10, 0.1)) # Output: 5.0`,
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
        buggy: `# BUG: Checking if any pole is negative for stability\ndef is_stable(poles):\n    return any(p < 0 for p in poles) # Bug: should be ALL poles in LHP (real part < 0)`,
        fixed: `def is_stable(poles):\n    return all(p < 0 for p in poles) # All real parts must be negative`,
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
      starter: `import math\n\ndef step_response(k, tau, t):\n    # Return k * (1 - exp(-t / tau))\n    pass`
    }
  },
  {
    moduleTitle: "Power Electronics – Converters, Inverters & EV Drives",
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
      example: `# Python Buck & Boost Converter Output Voltage
def buck_converter(v_in, duty_cycle):
    return v_in * duty_cycle

def boost_converter(v_in, duty_cycle):
    return v_in / (1.0 - duty_cycle)

print("Buck (V_in=48V, D=0.25):", buck_converter(48, 0.25)) # Output: 12V
print("Boost (V_in=12V, D=0.75):", boost_converter(12, 0.75)) # Output: 48V`,
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
        buggy: `# BUG: Duty cycle D=1.0 causes zero division\ndef boost(v_in, d):\n    return v_in / (1 - d) # Crash when d=1.0!`,
        fixed: `def boost(v_in, d):\n    d = min(0.95, max(0.0, d)) # Clamp duty cycle < 0.95\n    return v_in / (1 - d)`,
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
      starter: `def buck_boost_voltage(v_in, d):\n    # Return v_in * (d / (1 - d))\n    pass`
    }
  }
];
