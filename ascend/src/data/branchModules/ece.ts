import type { BranchModuleData } from "./types";
import { makeVideoLinks } from "./types";

type EceExpansionSeed = {
  title: string; level: string; topic: string; summary: string; points: string[];
  example: string; formula: string; interview: string; task: string;
};

const makeEceExpansion = (seed: EceExpansionSeed): BranchModuleData => ({
  moduleTitle: seed.title,
  level: seed.level,
  branch: ["ece"],
  videos: makeVideoLinks(seed.topic),
  studyMaterial: {
    summary: seed.summary,
    keyPoints: seed.points,
    example: seed.example,
    complexity: seed.formula,
  },
  aiExplain: {
    steps: ["Define the signal, supply, and operating constraints.", "Select a model and state every assumption.", "Calculate the important design margin.", "Validate the result with measurement or simulation.", "Document limits, safety concerns, and test evidence."],
    analogy: `${seed.topic} is best understood as a system of small, measurable decisions: each block has one job, and a mistake at one interface can affect the whole product.`,
  },
  debug: [{ title: `Validate ${seed.title}`, buggy: "result = measured_value / reference\n# reference may be zero or use the wrong unit", fixed: "if reference == 0: raise ValueError('reference must be non-zero')\nresult = measured_value / reference", hint: "Check units, reference direction, and boundary conditions before trusting a calculated result." }],
  quiz: [
    { q: `What is the first engineering step when working with ${seed.title}?`, options: ["Tune values randomly", "Define constraints and assumptions", "Ignore measurement", "Choose the most expensive part"], answer: 1 },
    { q: "Why should units be checked before a calculation?", options: ["They only affect formatting", "They catch scale and conversion errors", "They remove all noise", "They replace testing"], answer: 1 },
    { q: "What improves confidence in a design result?", options: ["One unverified calculation", "Independent measurement or simulation", "Higher supply voltage", "Removing margins"], answer: 1 },
    { q: "What should a design margin cover?", options: ["Only ideal conditions", "Tolerance, temperature, and load variation", "Just component color", "No real-world effects"], answer: 1 },
    { q: "Which practice makes an engineering design easier to review?", options: ["Hidden assumptions", "Documented constraints and test evidence", "Changing units mid-way", "Skipping edge cases"], answer: 1 },
  ],
  mnc: [{ company: "Qualcomm", year: "2024", question: seed.interview, answer: `Start with requirements and interfaces, explain the governing principle (${seed.formula}), then describe verification, failure modes, and the trade-off made.` }],
  mock: [{ type: "Technical", question: `How would you validate a production implementation of ${seed.title}?`, tip: "State the stimulus, instruments, acceptance limits, corner cases, and how you would record repeatable evidence." }],
  coding: { problem: seed.task, desc: `Write a small function that calculates or validates a core ${seed.topic} parameter, including input checks.`, input: "measurement = 10, reference = 2", output: "5.0", starter: "def calculate(measurement, reference):\n    # Validate inputs and return the required engineering value\n    pass" },
});

const ECE_EXPANDED_MODULES: BranchModuleData[] = [
  { title: "Analog IC Design & CMOS Amplifiers", level: "Level 4 - VLSI Analog", topic: "CMOS Analog IC Design Differential Amplifier Current Mirror", summary: "Analog IC design converts device physics into robust gain, bias, and bandwidth. Differential pairs reject common-mode noise; current mirrors establish repeatable bias currents; compensation protects feedback amplifiers from oscillation.", points: ["Bias all MOSFETs in the intended region across PVT corners.", "Gain is improved with active loads but bandwidth and stability must be checked.", "Layout symmetry and matching matter as much as the schematic."], example: "For a differential pair, match devices and route both inputs symmetrically to reduce offset.", formula: "gm ≈ 2ID/VOV; check gain, phase margin, and output swing.", interview: "How would you trade gain, bandwidth, noise, and power in a CMOS op-amp?", task: "Differential Pair Transconductance" },
  { title: "RF & Microwave Engineering", level: "Level 4 - RF Systems", topic: "RF Microwave Engineering S Parameters Smith Chart", summary: "RF circuits must treat interconnects as transmission lines. Impedance matching reduces reflections, S-parameters characterize multiport networks, and the Smith chart makes matching networks practical.", points: ["Use 50-ohm reference impedance consistently.", "Return loss and VSWR quantify mismatch.", "At RF, layout parasitics are circuit elements."], example: "A quarter-wave transformer matches a real load to a line at its design frequency.", formula: "Γ = (ZL - Z0)/(ZL + Z0); VSWR = (1+|Γ|)/(1-|Γ|).", interview: "How do you use S11 and S21 to judge an RF front-end?", task: "Reflection Coefficient Calculator" },
  { title: "Antenna Theory & Wireless Propagation", level: "Level 4 - Wireless", topic: "Antenna Theory Link Budget Wireless Propagation", summary: "Antennas transform guided energy into electromagnetic waves. Link budgets combine transmit power, gains, path loss, and receiver sensitivity to decide whether a wireless connection is feasible.", points: ["Polarization mismatch reduces received power.", "Gain is directional; it does not create power.", "Multipath and shadowing require fade margin."], example: "A 2.4 GHz link budget must include cable loss, antenna gains, free-space path loss, and fade margin.", formula: "Pr(dBm) = Pt + Gt + Gr - path loss - implementation losses.", interview: "Build a link budget for a sensor 500 m from its gateway.", task: "Free Space Path Loss" },
  { title: "Microcontrollers, Timers & Interrupts", level: "Level 3 - Embedded", topic: "Microcontroller Timers PWM Interrupts", summary: "Timers provide deterministic time bases for PWM, capture/compare, scheduling, and measurement. Interrupt design determines whether an embedded product responds reliably under load.", points: ["Keep ISRs short and defer slow work to the main loop or RTOS task.", "Use volatile for memory shared with an ISR.", "Choose prescaler and counter width to avoid overflow."], example: "Use timer capture to measure a pulse width without polling.", formula: "timer tick = prescaler / peripheral clock.", interview: "How would you diagnose missed interrupts in a motor controller?", task: "Timer Prescaler Selector" },
  { title: "Real-Time Operating Systems", level: "Level 4 - Embedded Software", topic: "RTOS Scheduling Mutex Semaphore Priority Inversion", summary: "An RTOS coordinates concurrent tasks with predictable deadlines. Correct task priorities, bounded execution, and safe synchronization are essential in devices that sense, communicate, and control simultaneously.", points: ["A semaphore signals events; a mutex protects ownership of a resource.", "Priority inversion needs priority inheritance or a redesigned critical section.", "Measure worst-case execution time, not just average time."], example: "A high-priority control task should not block on a long logging operation.", formula: "schedulability depends on utilization, deadlines, and worst-case execution time.", interview: "Explain priority inversion and a safe mitigation.", task: "Task Deadline Checker" },
  { title: "PCB Design, EMC & Signal Integrity", level: "Level 3 - Hardware Design", topic: "PCB Design EMC Signal Integrity Grounding", summary: "A schematic becomes a reliable product only through disciplined layout. Return-current paths, decoupling placement, stack-up choice, and controlled impedance determine emissions, susceptibility, and signal quality.", points: ["Place decoupling capacitors at IC power pins with a short return path.", "Avoid splitting the return plane beneath high-speed signals.", "Terminate fast traces when reflection timing requires it."], example: "Route a differential pair with consistent spacing, length matching, and an uninterrupted reference plane.", formula: "Trace behavior becomes transmission-line behavior when edge rise time is short relative to flight time.", interview: "What layout changes would you make after an EMC radiated-emissions failure?", task: "Trace Flight Time Estimate" },
  { title: "VLSI Physical Design & Static Timing", level: "Level 5 - Semiconductor", topic: "VLSI Physical Design Static Timing Analysis", summary: "Physical design converts RTL into placed and routed silicon. Static timing analysis checks every launch-capture path across process, voltage, and temperature corners before tape-out.", points: ["Setup checks constrain the maximum clock rate.", "Hold checks constrain minimum data-path delay.", "Clock uncertainty and skew belong in timing budgets."], example: "Fix a hold violation by adding controlled delay, not by reducing the clock period.", formula: "Tclock ≥ Tcq + Tcomb + Tsetup + uncertainty.", interview: "Compare setup and hold fixes and their side effects.", task: "Setup Slack Calculator" },
  { title: "Computer Networks for IoT", level: "Level 3 - Connected Devices", topic: "IoT Networks MQTT CoAP TCP UDP", summary: "IoT systems connect constrained devices through layered networks. Protocol choice balances reliability, latency, bandwidth, power, security, and fleet management needs.", points: ["MQTT uses brokered publish/subscribe communication.", "CoAP is lightweight and maps naturally to constrained REST-style devices.", "TLS, identity, and secure updates are product requirements, not add-ons."], example: "A battery sensor can publish a retained MQTT status message and sleep between samples.", formula: "Choose payload size and publish rate to fit energy and airtime budgets.", interview: "When would you choose UDP/CoAP instead of TCP/MQTT?", task: "IoT Payload Rate" },
  { title: "Image Processing & Computer Vision", level: "Level 4 - Intelligent Systems", topic: "Digital Image Processing Computer Vision", summary: "Image processing transforms sampled pixels into usable features and decisions. A robust pipeline considers illumination, calibration, noise, latency, and false-positive cost.", points: ["Convolution extracts local structure such as edges and texture.", "Thresholds must be validated across real lighting conditions.", "Camera calibration relates pixels to physical geometry."], example: "Apply blur before edge detection to reduce noise-driven edges.", formula: "Image size = width × height × channels; budget memory and throughput.", interview: "How would you measure whether a vision inspection algorithm is production-ready?", task: "Image Buffer Size" },
  { title: "Biomedical Instrumentation", level: "Level 4 - Instrumentation", topic: "Biomedical Instrumentation ECG Sensors Patient Safety", summary: "Biomedical electronics acquires weak physiological signals safely. The design must protect patients, reject interference, preserve clinically useful bandwidth, and satisfy traceable validation requirements.", points: ["Instrumentation amplifiers provide high CMRR for biopotentials.", "Isolation and leakage-current limits are safety-critical.", "Motion artifacts and 50/60 Hz interference need filtering without hiding clinical signals."], example: "An ECG front end uses high input impedance, driven reference, protection, and a notch/filter strategy.", formula: "CMRR determines rejection of common-mode mains interference.", interview: "How do patient isolation and signal fidelity shape an ECG front-end?", task: "ECG Sampling Rate Check" },
  { title: "Robotics Sensors & Actuators", level: "Level 4 - Robotics", topic: "Robotics Sensors Actuators Encoders Kinematics", summary: "Robots combine sensing, estimation, planning, and actuation in feedback loops. Encoder resolution, actuator limits, and latency determine achievable accuracy and stability.", points: ["Encoders measure position; derivatives must be filtered carefully.", "Actuator saturation can cause integral windup.", "Coordinate frames must be explicit in kinematic calculations."], example: "Use encoder counts and wheel radius to estimate differential-drive distance.", formula: "distance = wheel circumference × encoder counts / counts per revolution.", interview: "How would you choose sensors for an indoor mobile robot?", task: "Encoder Distance Calculator" },
  { title: "Electronics Product Testing & Reliability", level: "Level 5 - Product Engineering", topic: "Electronics Reliability Testing FMEA HALT", summary: "Reliable electronics are designed and verified against the environment, manufacturing variation, and misuse. FMEA, derating, environmental testing, and traceable test plans turn field risk into engineering actions.", points: ["FMEA ranks severity, occurrence, and detection to focus mitigation.", "Derating improves lifetime by avoiding operation at component limits.", "A test plan needs measurable acceptance criteria and coverage."], example: "Thermal-cycle testing can expose solder-joint and connector weaknesses before release.", formula: "Reliability evidence comes from representative stress, sample rationale, and failure analysis.", interview: "How would you turn a recurring field failure into a corrective-action plan?", task: "FMEA Risk Priority" },
].map(makeEceExpansion);

export const ECE_MODULES: BranchModuleData[] = [
  {
    moduleTitle: "Embedded Systems & Communication Protocols",
    level: "Level 1 – Hardware Core",
    branch: ["ece"],
    videos: makeVideoLinks("I2C SPI UART Protocols Embedded Systems"),
    studyMaterial: {
      summary: `Microcontrollers communicate with external sensors and peripherals using serial protocols:
- I2C (Inter-Integrated Circuit): 2 wires (SDA data, SCL clock). Multi-master, 7-bit/10-bit addressing.
- SPI (Serial Peripheral Interface): 4 wires (MOSI, MISO, SCK, CS). Synchronous full-duplex, high speed.
- UART (Universal Asynchronous Receiver-Transmitter): 2 wires (Tx, Rx). Asynchronous with start/stop bits & baud rate.`,
      keyPoints: [
        "I2C requires open-drain pull-up resistors on SDA and SCL bus lines.",
        "SPI supports faster clock speeds than I2C but requires dedicated Chip Select (CS) per slave device.",
        "UART requires both sender and receiver to agree on exact Baud Rate (e.g. 9600, 115200 bps).",
        "Interrupt Service Routines (ISR) must be ultra-fast and avoid blocking delays."
      ],
      example: `// C Pseudo-code for I2C Master Write
void I2C_Write(uint8_t dev_addr, uint8_t reg, uint8_t data) {
    I2C_Start();
    I2C_SendByte(dev_addr << 1); // Write mode
    I2C_WaitAck();
    I2C_SendByte(reg);
    I2C_WaitAck();
    I2C_SendByte(data);
    I2C_WaitAck();
    I2C_Stop();
}`,
      complexity: "I2C: 100kbps - 3.4Mbps | SPI: Up to 50+ Mbps"
    },
    aiExplain: {
      steps: [
        "1. Select communication protocol based on distance, speed, and pin constraints.",
        "2. Configure clock speed (SCL/SCK) and baud rate.",
        "3. Master sends Start Condition -> Address byte + R/W bit.",
        "4. Slave responds with ACK (Acknowledge).",
        "5. Transfer data bytes -> Master sends Stop Condition."
      ],
      analogy: "I2C is like a party walkie-talkie channel with call signs (addresses); SPI is a direct private 4-wire telephone link; UART is sending text messages at an agreed typing speed!"
    },
    debug: [
      {
        title: "Fix I2C Address Shift Bug",
        buggy: `// Bug: Sending raw 7-bit address without left shifting for Write bit\nvoid send_addr(uint8_t addr) {\n    I2C_Transmit(addr); // Forgot (addr << 1)\n}`,
        fixed: `void send_addr(uint8_t addr, uint8_t read_write) {\n    I2C_Transmit((addr << 1) | (read_write & 0x01));\n}`,
        hint: "I2C 7-bit device addresses must be left-shifted by 1 bit, placing the Read/Write flag in bit 0."
      }
    ],
    quiz: [
      { q: "Which serial protocol uses SDA and SCL wires?", options: ["UART", "SPI", "I2C", "CAN"], answer: 2 },
      { q: "How many wires does standard SPI require?", options: ["2", "3", "4", "5"], answer: 2 },
      { q: "What is required on I2C bus lines SDA and SCL?", options: ["Capacitors", "Pull-up resistors", "Zener diodes", "Inductors"], answer: 1 },
      { q: "Which protocol is asynchronous?", options: ["I2C", "SPI", "UART", "JTAG"], answer: 2 },
      { q: "What does MOSI stand for in SPI?", options: ["Master Out Slave In", "Master Option Serial Input", "Main Output Signal Isolation", "Memory Offset Storage Index"], answer: 0 }
    ],
    mnc: [
      { company: "Texas Instruments", year: "2023", question: "Compare I2C vs SPI for onboard sensor communication", answer: "I2C uses only 2 wires saving microcontroller pins; SPI offers higher bandwidth and lower power for display/flash memories." },
      { company: "Qualcomm", year: "2023", question: "What is the purpose of an Interrupt Service Routine (ISR)?", answer: "Executes immediately when hardware trigger occurs, pausing main loop; must not call blocking functions." },
      { company: "Bosch", year: "2022", question: "What is CAN bus protocol used for in Automotive ECE?", answer: "Controller Area Network (CAN) is a robust differential 2-wire serial bus for automotive ECU communication." }
    ],
    mock: [
      { type: "Technical", question: "What causes I2C bus lockup and how do you recover?", tip: "Occurs when a slave holds SDA LOW expecting clock pulses. Fix by toggling SCL 9 times manually from master." }
    ],
    coding: {
      problem: "I2C Address Converter",
      desc: "Convert a 7-bit I2C address and read/write bit into an 8-bit control byte.",
      input: "address = 0x3C, is_read = True",
      output: "0x79",
      starter: `def get_i2c_control_byte(addr_7bit, is_read):\n    # Return 8-bit control byte\n    pass`
    }
  },
  {
    moduleTitle: "Basic Electronics – Diodes, Transistors, Op-Amps",
    level: "Level 1 – Fundamentals",
    branch: ["ece"],
    videos: makeVideoLinks("Basic Electronics Diodes BJT MOSFET Op-Amps"),
    studyMaterial: {
      summary: `Semiconductor devices form the foundation of electronic circuits:

PN Junction Diodes:
- Allow current in forward bias (barrier voltage ~0.7V for Silicon), block in reverse bias.
- Zener Diode: Operates in reverse breakdown mode for precise voltage regulation.

Bipolar Junction Transistors (BJT):
- Current-controlled device (NPN, PNP). Base current I_B controls collector current I_C = β * I_B.
- Operating regions: Cutoff (switch OFF), Saturation (switch ON), Active (amplifier).

MOSFET (Metal-Oxide-Semiconductor Field-Effect Transistor):
- Voltage-controlled device (NMOS, PMOS). Gate voltage V_GS controls drain current I_D.
- Foundation of modern digital CMOS ICs due to near-zero static gate current.

Operational Amplifiers (Op-Amps):
- High-gain differential amplifier. Ideal properties: Infinite input impedance, zero output impedance, infinite open-loop gain.
- Applications: Inverting/Non-inverting amplifiers, Summing amps, Comparators, Active Filters.`,
      keyPoints: [
        "Diode knee voltage is ~0.7V for Silicon, ~0.3V for Germanium.",
        "BJTs are current-controlled; MOSFETs are voltage-controlled.",
        "Virtual Short Concept in Op-Amps: V+ = V- under negative feedback.",
        "Op-Amp Closed-Loop Gain (Inverting): A_v = -R_f / R_in."
      ],
      example: `# Python Op-Amp Gain Calculator
def inverting_opamp_gain(r_in, r_feedback):
    return - (r_feedback / r_in)

print("Closed Loop Gain:", inverting_opamp_gain(1000, 10000)) # Output: -10.0`,
      complexity: "Op-Amp GBWP (Gain-Bandwidth Product) = Constant"
    },
    aiExplain: {
      steps: [
        "1. Identify input signals and biasing voltages V_CC / V_EE.",
        "2. Apply Virtual Short concept (V+ = V-) for Op-Amps with negative feedback.",
        "3. Apply KCL at the inverting node to find output voltage formula.",
        "4. For transistors, determine operating point (Q-point) using load line analysis.",
        "5. Verify output stays within saturation rails."
      ],
      analogy: "A BJT is like a water valve turned by hand pressure (current); a MOSFET is a valve controlled by a static magnetic field (voltage); an Op-Amp is a super-sensitive balance scale adjusting its output to match input equilibrium!"
    },
    debug: [
      {
        title: "Fix Op-Amp Gain Formula Sign Bug",
        buggy: `def gain(rf, rin):\n    return rf / rin # Bug: Inverting amplifier missing minus sign!`,
        fixed: `def gain(rf, rin):\n    return - (rf / rin)`,
        hint: "Inverting Op-Amp configuration produces a 180° phase inversion (negative sign)."
      }
    ],
    quiz: [
      { q: "What is the typical forward voltage drop of a Silicon PN junction diode?", options: ["0.2V", "0.7V", "1.5V", "5.0V"], answer: 1 },
      { q: "Which device is voltage-controlled?", options: ["BJT", "MOSFET", "PN Diode", "Zener Diode"], answer: 1 },
      { q: "What is the closed-loop voltage gain of a Non-Inverting Op-Amp?", options: ["-R_f / R_in", "1 + (R_f / R_in)", "R_in / R_f", "1 - (R_f / R_in)"], answer: 1 },
      { q: "In an ideal Op-Amp with negative feedback, what is the differential voltage (V+ - V-)?", options: ["Infinite", "0 Volts", "Supply Voltage", "1 Volt"], answer: 1 },
      { q: "Which diode is specifically designed to operate in reverse breakdown region?", options: ["Schottky Diode", "Varactor Diode", "Zener Diode", "Tunnel Diode"], answer: 2 }
    ],
    mnc: [
      { company: "Texas Instruments", year: "2023", question: "Explain Slew Rate in Op-Amps and its impact on high frequency signals", answer: "Slew Rate (V/μs) is max rate of change of output voltage. If input frequency requires dV/dt > Slew Rate, output signal distorts into a triangle wave." },
      { company: "Analog Devices", year: "2023", question: "Compare NMOS vs PMOS transistors", answer: "NMOS uses electrons (higher mobility µ_n); PMOS uses holes (lower mobility µ_p). NMOS is smaller and faster for same current drive." },
      { company: "ON Semiconductor", year: "2022", question: "What is CMRR in Op-Amps?", answer: "Common-Mode Rejection Ratio CMRR = 20 log10(A_d / A_cm). Measures ability to reject noise common to both input terminals." }
    ],
    mock: [
      { type: "Technical", question: "Why is negative feedback used in Op-Amp amplifier circuits?", tip: "Negative feedback sacrifices raw open-loop gain to gain precise gain stability, wider bandwidth, linear response, and reduced distortion independent of temperature." }
    ],
    coding: {
      problem: "Non-Inverting Op-Amp Gain",
      desc: "Calculate output voltage for a non-inverting op-amp given Vin, R1, and R2.",
      input: "vin = 0.5, r1 = 1000, r2 = 4000",
      output: "2.5",
      starter: `def opamp_non_inverting(vin, r1, r2):\n    # Return vin * (1 + r2/r1)\n    pass`
    }
  },
  {
    moduleTitle: "Digital Logic – Boolean Algebra, Logic Gates, K-Map",
    level: "Level 2 – Digital Design",
    branch: ["ece"],
    videos: makeVideoLinks("Digital Logic Boolean Algebra K Map Flip Flops Multiplexer"),
    studyMaterial: {
      summary: `Digital systems represent data using binary logic (0 and 1):

Combinational Logic:
- Basic Gates: AND, OR, NOT, NAND, NOR, XOR, XNOR. NAND and NOR are Universal Gates.
- Boolean Minimization: De Morgan's Laws, Karnaugh Maps (K-Maps) simplify Boolean expressions to Sum of Products (SOP) or Product of Sums (POS).
- Components: Multiplexer (MUX 2:1, 4:1), Demultiplexer, Decoders, Adders (Half/Full Adder).

Sequential Logic:
- Memory elements driven by clock signals.
- Flip-Flops: SR, JK (Toggle mode), D (Data delay), T (Toggle).
- Counters (Synchronous/Asynchronous) and Shift Registers (SISO, SIPO, PISO, PIPO).`,
      keyPoints: [
        "NAND and NOR gates can implement ANY Boolean function (Universal Gates).",
        "K-Map grouping must be powers of 2 (1, 2, 4, 8, 16 cells) with Gray Code ordering.",
        "JK Flip-Flop race-around condition occurs when J=1, K=1 and clock pulse width > propagation delay; fixed using Master-Slave or Edge-Triggering.",
        "Multiplexers act as universal combinational logic selectors (N select lines select 2^N inputs)."
      ],
      example: `# De Morgan's Law Verification in Python
def de_morgan_1(A, B):
    # NOT (A AND B) == (NOT A) OR (NOT B)
    return not (A and B) == ((not A) or (not B))

print("Verified:", de_morgan_1(True, False)) # Output: True`,
      complexity: "K-Map Reduction: O(2^N) space table"
    },
    aiExplain: {
      steps: [
        "1. Write Truth Table for given logic specifications.",
        "2. Extract Minterms (where output = 1) for SOP form.",
        "3. Plot minterms on K-Map matrix arranged in Gray Code sequence (00, 01, 11, 10).",
        "4. Form largest possible rectangular groups of 1s (octets, quads, pairs).",
        "5. Read simplified Boolean expression and draw logic gate diagram."
      ],
      analogy: "A Multiplexer is like a railroad switch operator selecting which track (input line) connects to the main destination line (output) based on control levers (select lines)!"
    },
    debug: [
      {
        title: "Fix Gray Code Order in K-Map Indexing",
        buggy: `# BUG: Using binary count instead of Gray Code\n# 00, 01, 10, 11  (Incorrect for K-Map neighbor grouping!)`,
        fixed: `# Correct K-Map Gray Code sequence (only 1 bit changes per step):\n# 00, 01, 11, 10`,
        hint: "K-Map columns/rows MUST use Gray Code (00, 01, 11, 10) so adjacent cells differ by exactly 1 bit."
      }
    ],
    quiz: [
      { q: "Which gates are known as Universal Gates?", options: ["AND & OR", "NAND & NOR", "XOR & XNOR", "NOT & AND"], answer: 1 },
      { q: "According to De Morgan's Law, what is NOT(A OR B) equal to?", options: ["(NOT A) AND (NOT B)", "(NOT A) OR (NOT B)", "A AND B", "A XOR B"], answer: 0 },
      { q: "How many select lines does an 8-to-1 Multiplexer require?", options: ["2", "3", "4", "8"], answer: 1 },
      { q: "What condition occurs in JK Flip-Flop when J=1 and K=1?", options: ["Reset to 0", "Set to 1", "Toggle output", "Invalid state"], answer: 2 },
      { q: "How many flip-flops are required to design a MOD-16 counter?", options: ["2", "3", "4", "16"], answer: 2 }
    ],
    mnc: [
      { company: "Intel", year: "2023", question: "Explain Setup Time and Hold Time in Flip-Flops", answer: "Setup Time: min time input data must be stable BEFORE active clock edge. Hold Time: min time data must remain stable AFTER clock edge. Violations cause Metastability." },
      { company: "Qualcomm", year: "2023", question: "Implement Full Adder using two Half Adders", answer: "HA1 computes Sum1 = A XOR B, Carry1 = A AND B. HA2 computes Final Sum = Sum1 XOR Cin. Final Carry = Carry1 OR (Sum1 AND Cin)." },
      { company: "AMD / Xilinx", year: "2022", question: "What is a Look-Up Table (LUT) in FPGA?", answer: "LUT is a small SRAM block storing truth table outputs for N inputs, implementing arbitrary combinational logic in FPGAs." }
    ],
    mock: [
      { type: "Technical", question: "What is Metastability in digital systems and how is it prevented?", tip: "Occurs when setup/hold time is violated, leaving flip-flop output in an indeterminate state. Prevented using multi-stage synchronizers (2-flop synchronizer chain)." }
    ],
    coding: {
      problem: "Full Adder Logic",
      desc: "Implement Full Adder logic returning (sum, carry_out) given inputs A, B, and Cin.",
      input: "a = 1, b = 1, cin = 1",
      output: "(1, 1)",
      starter: `def full_adder(a, b, cin):\n    # Return (sum_bit, carry_bit)\n    pass`
    }
  },
  {
    moduleTitle: "Signal Processing & Communication Systems",
    level: "Level 3 – DSP & Telecom",
    branch: ["ece"],
    videos: makeVideoLinks("Digital Signal Processing Fourier Transform Sampling Theorem Nyquist AM FM"),
    studyMaterial: {
      summary: `Signals and Communication Systems process information in time and frequency domains:

Analog Communication:
- Amplitude Modulation (AM): Carrier amplitude varies with message signal. Bandwidth = 2 * f_m.
- Frequency Modulation (FM): Carrier frequency varies with message signal. Wider bandwidth, far higher noise immunity than AM.

Digital Communication:
- Modulation: ASK (Amplitude Shift Keying), FSK (Frequency), PSK (Phase Shift Keying), QAM (Quadrature Amplitude Modulation).
- Shannon-Hartley Capacity Theorem: C = B * log2(1 + SNR).

Digital Signal Processing (DSP):
- Continuous-to-Digital: Nyquist-Shannon Sampling Theorem requires Sampling Frequency f_s ≥ 2 * f_max to avoid Aliasing.
- Fourier Transform: Converts time-domain signals x(t) to frequency spectrum X(f). FFT (Fast Fourier Transform) optimizes DFT complexity from O(N²) to O(N log N).`,
      keyPoints: [
        "Nyquist Rate: f_s must be at least twice the highest frequency component to prevent aliasing.",
        "Anti-aliasing low-pass filter must precede ADC sampler.",
        "FFT reduces Discrete Fourier Transform computation from O(N²) to O(N log N) via Cooley-Tukey divide-and-conquer.",
        "FIR filters are inherently stable (all zeros in z-plane); IIR filters have feedback (poles can cause instability)."
      ],
      example: `# Python Sampling Theorem Verification
import numpy as np

f_signal = 100 # 100 Hz signal
f_sampling = 250 # 250 Hz > 200 Hz Nyquist rate -> NO Aliasing!
is_valid_sampling = f_sampling >= 2 * f_signal
print("Sampling Valid:", is_valid_sampling)`,
      complexity: "FFT Time Complexity: O(N log N)"
    },
    aiExplain: {
      steps: [
        "1. Pass continuous analog signal through Anti-Aliasing Low-Pass Filter.",
        "2. Sample signal at rate f_s ≥ 2 * f_max (Nyquist Criterion).",
        "3. Quantize sample amplitudes and convert to binary bits via ADC.",
        "4. Compute FFT to analyze frequency spectrum X(f).",
        "5. Apply FIR/IIR digital filter to eliminate out-of-band noise."
      ],
      analogy: "Sampling is like taking strobe-light photos of a fast helicopter blade: if the flash fires too slowly, the blade looks like it's spinning backwards (aliasing); fire fast enough, and the motion is accurately captured!"
    },
    debug: [
      {
        title: "Fix Aliasing Frequency Calculation",
        buggy: `# BUG: Sampling 1000 Hz signal at 1500 Hz (Below 2000 Hz Nyquist rate)\n# Alias frequency formula mistake`,
        fixed: `f_signal = 1000\nf_s = 1500\n# Alias frequency appears at |f_signal - f_s| = 500 Hz\nf_alias = abs(f_signal - f_s)`,
        hint: "Sampling below Nyquist rate causes high frequency f to fold back as alias at |f - f_s|."
      }
    ],
    quiz: [
      { q: "What is the minimum sampling frequency required for a signal with maximum frequency 4 kHz?", options: ["4 kHz", "8 kHz", "16 kHz", "2 kHz"], answer: 1 },
      { q: "What distortion occurs when sampling below the Nyquist rate?", options: ["Jitter", "Aliasing", "Attenuation", "Phase Shift"], answer: 1 },
      { q: "What is the computational complexity of Fast Fourier Transform (FFT)?", options: ["O(N²)", "O(N log N)", "O(N)", "O(2^N)"], answer: 1 },
      { q: "Which modulation technique varies carrier wave phase based on digital data?", options: ["ASK", "FSK", "PSK", "AM"], answer: 2 },
      { q: "According to Shannon's Theorem, what increases channel capacity C?", options: ["Increasing bandwidth and SNR", "Decreasing bandwidth", "Increasing noise", "Reducing transmit power"], answer: 0 }
    ],
    mnc: [
      { company: "Qualcomm", year: "2023", question: "Explain OFDM (Orthogonal Frequency Division Multiplexing) used in 4G/5G/Wi-Fi", answer: "Splits high-speed data stream into multiple overlapping orthogonal subcarriers, overcoming multipath fading and inter-symbol interference." },
      { company: "ISRO", year: "2023", question: "Difference between FIR and IIR digital filters", answer: "FIR has finite impulse response, no feedback, always stable, linear phase. IIR has infinite response, feedback (poles), requires fewer coefficients but can become unstable." },
      { company: "DRDO", year: "2022", question: "What is the purpose of Matched Filter in Radar Communication?", answer: "Maximizes output Signal-to-Noise Ratio (SNR) in presence of additive white Gaussian noise by correlating received signal with known pulse shape." }
    ],
    mock: [
      { type: "Technical", question: "Why is QAM (Quadrature Amplitude Modulation) preferred in modern wireless broadband?", tip: "QAM modulates BOTH amplitude and phase simultaneously (e.g. 64-QAM transmits 6 bits per symbol, 256-QAM transmits 8 bits per symbol), yielding much higher spectral efficiency." }
    ],
    coding: {
      problem: "Nyquist Rate Calculator",
      desc: "Given max signal frequency in Hz, return minimum required sampling rate and whether a given sampling rate causes aliasing.",
      input: "f_max = 5000, f_sample = 12000",
      output: "(10000, False)",
      starter: `def check_nyquist(f_max, f_sample):\n    # Return (nyquist_rate, is_aliased)\n    pass`
    }
  },
  {
    moduleTitle: "VLSI Design & Hardware Description Languages (Verilog)",
    level: "Level 4 – Chip Design",
    branch: ["ece"],
    videos: makeVideoLinks("VLSI Design CMOS Verilog FPGA Setup Hold Time Static Timing Analysis"),
    studyMaterial: {
      summary: `Very Large Scale Integration (VLSI) combines millions of CMOS transistors onto a single silicon chip:

CMOS Technology:
- Complementary MOS: NMOS pull-down network + PMOS pull-up network.
- Static power dissipation is virtually zero (current flows only during switching transitions).

Static Timing Analysis (STA):
- Setup Time Constraint: T_clk ≥ T_cq + T_comb + T_setup.
- Hold Time Constraint: T_cq + T_comb ≥ T_hold.
- Clock Skew & Jitter: Difference in clock arrival times at different flip-flops.

Verilog HDL & ASIC/FPGA Flow:
- Behavioral (always @(posedge clk)), RTL, and Gate Level abstractions.
- ASIC Flow: Specification → RTL Code → Logic Synthesis → Floorplanning → Place & Route → Tapeout.`,
      keyPoints: [
        "CMOS Inverter: PMOS connected to VDD (pull-up), NMOS connected to GND (pull-down).",
        "Setup Time violation fixed by decreasing clock frequency or reducing combinational delay.",
        "Hold Time violation fixed by inserting buffer delays in data path (CANNOT be fixed by slowing clock!).",
        "Non-blocking assignment (<=) used for sequential logic; Blocking assignment (=) used for combinational logic."
      ],
      example: `// Verilog D Flip-Flop with Asynchronous Reset
module d_flip_flop (
    input wire clk,
    input wire rst_n,
    input wire d,
    output reg q
);
    always @(posedge clk or negedge rst_n) begin
        if (!rst_n)
            q <= 1'b0;
        else
            q <= d;
    end
endmodule`,
      complexity: "STA Path Delay: Sum of cell + net delays O(V+E)"
    },
    aiExplain: {
      steps: [
        "1. Write RTL description in Verilog/VHDL.",
        "2. Run Functional Simulation (ModelSim/Vedas) with Testbench.",
        "3. Synthesize RTL into Gate-Level Netlist using Design Compiler.",
        "4. Perform Static Timing Analysis (STA) checking setup/hold slack.",
        "5. Place & Route (P&R) layout generation → DRC/LVS physical verification."
      ],
      analogy: "Verilog is like writing a architectural blueprint; Synthesis turns the blueprint into a 3D brick building model; STA checks if structural beams (timing paths) can handle earthquake stresses before actual construction!"
    },
    debug: [
      {
        title: "Fix Blocking vs Non-Blocking Assignment Bug in Verilog",
        buggy: `// BUG: Using blocking '=' in sequential clock block causes race conditions\nalways @(posedge clk) begin\n    q1 = d;\n    q2 = q1; // q2 gets updated value of q1 in same cycle instead of pipeline delay!\nend`,
        fixed: `always @(posedge clk) begin\n    q1 <= d;   // Use non-blocking '<=' for sequential registers\n    q2 <= q1;  // q2 correctly gets previous cycle q1 value\nend`,
        hint: "Always use non-blocking assignments (<=) inside sequential always blocks (posedge clk)."
      }
    ],
    quiz: [
      { q: "How is a Hold Time violation fixed in digital chips?", options: ["Slowing down the clock", "Inserting buffer delays in data path", "Increasing supply voltage", "Decreasing temperature"], answer: 1 },
      { q: "Which assignment operator should be used for sequential logic in Verilog?", options: ["=", "<=", "==", ":="], answer: 1 },
      { q: "Why is static power dissipation near zero in ideal CMOS logic?", options: ["No transistors used", "PMOS and NMOS are never ON simultaneously in steady state", "High resistance", "Low supply voltage"], answer: 1 },
      { q: "What does STA stand for in chip design?", options: ["Synchronous Timing Architecture", "Static Timing Analysis", "System Test Automation", "Silicon Tapeout Approval"], answer: 1 },
      { q: "What does DRC stand for in VLSI physical verification?", options: ["Design Rule Check", "Digital Router Compiler", "Dynamic Register Control", "Data Rate Constraint"], answer: 0 }
    ],
    mnc: [
      { company: "Intel", year: "2023", question: "What is Clock Skew vs Clock Jitter?", answer: "Clock Skew: spatial difference in clock arrival time at different flip-flops. Clock Jitter: temporal variation of clock edge timing at the same point over time." },
      { company: "Synopsys", year: "2023", question: "Explain Slack in Static Timing Analysis", answer: "Slack = Required Time - Arrival Time. Positive slack means timing is met; Negative slack means timing violation." },
      { company: "TSMC", year: "2022", question: "Why is dynamic power density a critical challenge in 3nm FinFET chips?", answer: "Dynamic Power P = α * C * V² * f. High clock frequencies and billions of switching nodes generate extreme heat density needing advanced cooling." }
    ],
    mock: [
      { type: "Technical", question: "What causes a latch to be accidentally inferred in Verilog synthesis?", tip: "Incomplete if-else statements or missing default cases in a combinational 'always @(*)' block cause the synthesizer to infer a memory latch to preserve unassigned outputs." }
    ],
    coding: {
      problem: "Clock Period Calculation",
      desc: "Given T_cq, T_comb, T_setup, and clock_skew, calculate minimum valid clock period and maximum frequency.",
      input: "t_cq = 1.0, t_comb = 4.0, t_setup = 1.5, skew = 0.5",
      output: "(6.0, 166.67)",
      starter: `def min_clock_period(t_cq, t_comb, t_setup, skew):\n    # Return (min_period, max_freq_mhz)\n    pass`
    }
  },
  ...ECE_EXPANDED_MODULES,
];
