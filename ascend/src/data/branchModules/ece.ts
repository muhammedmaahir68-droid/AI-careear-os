import type { BranchModuleData } from "./types";
import { makeVideoLinks } from "./types";

export const ECE_MODULES: BranchModuleData[] = [
  {
    moduleTitle: "Embedded Systems & Communication Protocols",
    roles: ["ece-iot", "ece-vlsi", "ece-embedded"],
    industryUseCase: "Autonomous Vehicle Sensor Fusion Control Unit at Tesla/Bosch",
    harvardOxfordRef: "MIT 6.004 Computation Structures & Real-Time Embedded Microarchitectures",
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
      starter: `def get_i2c_control_byte(addr_7bit, is_read):\n    • Return 8-bit control byte\n    pass`
    }
  },
  {
    moduleTitle: "Basic Electronics – Diodes, Transistors, Op-Amps",
    roles: ["ece-iot", "ece-vlsi", "ece-embedded"],
    industryUseCase: "Autonomous Vehicle Sensor Fusion Control Unit at Tesla/Bosch",
    harvardOxfordRef: "MIT 6.004 Computation Structures & Real-Time Embedded Microarchitectures",
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
      example: `• Python Op-Amp Gain Calculator
def inverting_opamp_gain(r_in, r_feedback):
    return - (r_feedback / r_in)

print("Closed Loop Gain:", inverting_opamp_gain(1000, 10000)) • Output: -10.0`,
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
        buggy: `def gain(rf, rin):\n    return rf / rin • Bug: Inverting amplifier missing minus sign!`,
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
      starter: `def opamp_non_inverting(vin, r1, r2):\n    • Return vin * (1 + r2/r1)\n    pass`
    }
  },
  {
    moduleTitle: "Digital Logic – Boolean Algebra, Logic Gates, K-Map",
    roles: ["ece-iot", "ece-vlsi", "ece-embedded"],
    industryUseCase: "Autonomous Vehicle Sensor Fusion Control Unit at Tesla/Bosch",
    harvardOxfordRef: "MIT 6.004 Computation Structures & Real-Time Embedded Microarchitectures",
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
      example: `• De Morgan's Law Verification in Python
def de_morgan_1(A, B):
    • NOT (A AND B) == (NOT A) OR (NOT B)
    return not (A and B) == ((not A) or (not B))

print("Verified:", de_morgan_1(True, False)) • Output: True`,
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
        buggy: `• BUG: Using binary count instead of Gray Code\n• 00, 01, 10, 11  (Incorrect for K-Map neighbor grouping!)`,
        fixed: `• Correct K-Map Gray Code sequence (only 1 bit changes per step):\n• 00, 01, 11, 10`,
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
      starter: `def full_adder(a, b, cin):\n    • Return (sum_bit, carry_bit)\n    pass`
    }
  },
  {
    moduleTitle: "Signal Processing & Communication Systems",
    roles: ["ece-iot", "ece-vlsi", "ece-embedded"],
    industryUseCase: "Autonomous Vehicle Sensor Fusion Control Unit at Tesla/Bosch",
    harvardOxfordRef: "MIT 6.004 Computation Structures & Real-Time Embedded Microarchitectures",
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
      example: `• Python Sampling Theorem Verification
import numpy as np

f_signal = 100 • 100 Hz signal
f_sampling = 250 • 250 Hz > 200 Hz Nyquist rate -> NO Aliasing!
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
        buggy: `• BUG: Sampling 1000 Hz signal at 1500 Hz (Below 2000 Hz Nyquist rate)\n• Alias frequency formula mistake`,
        fixed: `f_signal = 1000\nf_s = 1500\n• Alias frequency appears at |f_signal - f_s| = 500 Hz\nf_alias = abs(f_signal - f_s)`,
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
      starter: `def check_nyquist(f_max, f_sample):\n    • Return (nyquist_rate, is_aliased)\n    pass`
    }
  },
  {
    moduleTitle: "VLSI Design & Hardware Description Languages (Verilog)",
    roles: ["ece-iot", "ece-vlsi", "ece-embedded"],
    industryUseCase: "Autonomous Vehicle Sensor Fusion Control Unit at Tesla/Bosch",
    harvardOxfordRef: "MIT 6.004 Computation Structures & Real-Time Embedded Microarchitectures",
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
      starter: `def min_clock_period(t_cq, t_comb, t_setup, skew):\n    • Return (min_period, max_freq_mhz)\n    pass`
    }
  }
,
  {
    moduleTitle: "Digital Logic – Boolean Algebra & K-Maps",
    roles: ["ece-iot", "ece-vlsi", "ece-embedded"],
    industryUseCase: "Autonomous Vehicle Sensor Fusion Control Unit at Tesla/Bosch",
    harvardOxfordRef: "MIT 6.004 Computation Structures & Real-Time Embedded Microarchitectures",
    level: "Level 1 – Foundations",
    branch: ["ece"],
    videos: makeVideoLinks("Boolean Algebra Karnaugh Map Digital Logic"),
    studyMaterial: {
      summary: "Boolean algebra provides the mathematical foundation for digital circuits. Karnaugh Maps (K-Maps) provide a graphical method to minimize Boolean expressions, reducing gate count in hardware implementations.",
      deepDiveTextbook: `BOOLEAN ALGEBRA & K-MAP MINIMIZATION\n\nBoolean Laws:\n- Identity: A+0=A, A·1=A\n- Complement: A+A'=1, A·A'=0\n- DeMorgan's Theorem: (AB)' = A'+B', (A+B)' = A'B'\n- Absorption: A+AB=A, A(A+B)=A\n\nMinimization Methods:\n1. Algebraic Simplification: Apply Boolean identities manually.\n2. K-Map: Arrange minterms in Gray code order. Group adjacent 1s in powers of 2 (1,2,4,8). Larger group = simpler expression.\n\nK-Map Rules:\n- Groups must be rectangular, powers of 2 size.\n- Wrap around allowed (top-bottom, left-right edges are adjacent).\n- Maximize group sizes, minimize number of groups.\n- Don't-care conditions (X) can be included in groups if beneficial.\n\nSum of Products (SOP): OR of AND gates. Implement with NAND-NAND.\nProduct of Sums (POS): AND of OR gates. Implement with NOR-NOR.\n\nUniversal Gates: NAND and NOR gates can implement any Boolean function, making them preferred in VLSI design for cost efficiency.`,
      keyPoints: ["DeMorgan's theorem: complement a function by swapping AND/OR and complementing all terms","K-Map groups must be rectangular powers of 2","NAND and NOR are universal gates","Larger K-Map groups yield simpler Boolean expressions"],
      example: `• K-Map minimization for F(A,B,C,D) = Σm(0,1,2,4,5,6,8,10)\n• 4-variable K-Map:\n• CD: 00  01  11  10\n• AB 00:  1   1   0   1\n• 01:  1   1   0   1\n• 11:  0   0   0   0\n• 10:  1   0   0   1\n• Groups: {0,1,4,5} = A'C', {0,2,8,10} = B'D'\n• Minimized: F = A'C' + B'D'`,
      comparisonTable: { headers: ["Method","Complexity","Suitable For","Handles Don't-Cares"], rows: [["Algebraic","High manual effort","Simple expressions","Yes"],["K-Map","Medium (visual)","Up to 6 variables","Yes (X = optional 1)"],["Quine-McCluskey","Algorithmic","Any number of variables","Yes"],["ESPRESSO","Software","Very large functions","Yes"]] },
      flowchartSteps: ["Write truth table for function","Identify minterms (where F=1)","Draw K-Map with Gray code ordering","Group adjacent 1s in powers of 2","Largest groups first, maximize group size","Read simplified expression from each group","Combine groups with OR"],
      concept3DSimulation: { title: "K-Map Grouping Visualization", description: "4-variable K-Map shows adjacent cells highlighted as groups are formed.", interactiveNodes: [{name:"Minterm Placer",type:"Truth Table Parser",details:"Maps truth table 1s onto K-Map grid"},{name:"Group Finder",type:"Adjacency Detector",details:"Identifies largest valid rectangular groupings"},{name:"Expression Generator",type:"Simplifier",details:"Reads Boolean terms from each group's fixed variables"}] },
      complexity: "K-Map: O(2^n) cells for n variables"
    },
    aiExplain: { steps: ["Place 1s on K-Map","Find largest adjacent groups","Each group covers variables that don't change","Combine groups with OR"], analogy: "Like finding the largest rectangular parking lots in a city grid — bigger lots = simpler address (fewer conditions to describe the area)" },
    debug: [{ title: "Non-power-of-2 grouping", buggy: "Group of 3 cells: invalid! K-Map only allows powers of 2", fixed: "Use groups of 1, 2, 4, or 8 cells only", hint: "K-Map groups must be exactly 1, 2, 4, or 8 cells in rectangular/wraparound shapes" }],
    quiz: [
      { q: "DeMorgan's theorem for (AB)':", options: ["A'B'","A'+B'","A+B","AB'"], answer: 1 },
      { q: "Largest K-Map group gives:", options: ["Most complex expression","Simplest expression","Most gates","No reduction"], answer: 1 },
      { q: "Universal gate means:", options: ["Works at all voltages","Can implement any Boolean function","Needs no power","Used in all CPUs"], answer: 1 },
      { q: "SOP stands for:", options: ["Sum of Primes","Sum of Products","System of Processes","Signal Output Port"], answer: 1 }
    ],
    mnc: [
      { company: "Qualcomm", year: "2023", question: "Minimize F = A'B'C' + A'B'C + A'BC' + AB'C'", answer: "K-Map: group {0,1,4} = A'B', group {0,2,4,6} = B'... F = A'B' + B'C'. Verify: list all minterms covered by each group." },
      { company: "Intel", year: "2022", question: "Why are NAND gates preferred in CMOS VLSI over AND gates?", answer: "CMOS NAND gates use 4 transistors (2 PMOS parallel, 2 NMOS series). AND gate requires NAND + NOT = 6 transistors. NAND is inherently faster and smaller. All standard cells are built from NAND/NOR primitives." }
    ],
    mock: [{ type: "Technical", question: "How would you implement a 4-to-1 MUX using logic gates?", tip: "4:1 MUX: F = S1'S0'I0 + S1'S0 I1 + S1 S0'I2 + S1 S0 I3. Need 4 AND gates (3-input), 1 OR gate (4-input). Or use 2:1 MUX tree: 2 MUXes select among pairs, 1 MUX selects between results." }],
    coding: { problem: "Boolean Expression Evaluator", desc: "Parse and evaluate Boolean expressions with AND, OR, NOT operators.", input: "'A AND (B OR NOT C)', {A:1, B:0, C:1}", output: "0", starter: "def evaluate(expr, vals):\n    • Tokenize and parse Boolean expression\n    • Handle precedence: NOT > AND > OR\n    pass" }
  },
  {
    moduleTitle: "Communication Systems – AM/FM & Digital Modulation",
    roles: ["ece-iot", "ece-vlsi", "ece-embedded"],
    industryUseCase: "Autonomous Vehicle Sensor Fusion Control Unit at Tesla/Bosch",
    harvardOxfordRef: "MIT 6.004 Computation Structures & Real-Time Embedded Microarchitectures",
    level: "Level 2 – Intermediate",
    branch: ["ece"],
    videos: makeVideoLinks("Amplitude Frequency Modulation digital communication"),
    studyMaterial: {
      summary: "Modulation impresses information onto a carrier signal for transmission. Analog: AM/FM. Digital: ASK, FSK, PSK, QAM. Higher-order modulation (64-QAM) carries more bits per symbol but requires better SNR.",
      deepDiveTextbook: `MODULATION TECHNIQUES\n\nAnalog Modulation:\nAM (Amplitude Modulation): s(t) = [Ac + m(t)] cos(2πfct)\nModulation index μ = Am/Ac. μ > 1 causes overmodulation and distortion.\nBandwidth = 2*W where W = message bandwidth.\n\nFM (Frequency Modulation): Instantaneous frequency fi = fc + kf*m(t)\nModulation index β = Δf/W = kf*Am/W\nBandwidth (Carson's Rule): B = 2(Δf + W) = 2W(β+1)\nFM superior noise performance (captures effect), more bandwidth but better SNR.\n\nDigital Modulation:\nASK: Amplitude varies with bit. Simple but noise-sensitive.\nFSK: Frequency varies with bit. More robust, used in Bluetooth.\nBPSK: Phase 0° = bit 0, 180° = bit 1. BER = Q(√(2Eb/N0)).\nQPSK: 4 phase states, 2 bits/symbol. Bandwidth efficient.\nQAM (Quadrature Amplitude Modulation): Varies both amplitude and phase.\n16-QAM: 4 bits/symbol. 64-QAM: 6 bits/symbol (used in LTE, WiFi).\n\nSNR vs BER: Higher QAM requires better SNR. 64-QAM needs ~5dB more SNR than QPSK for same BER.\n\nOFDM: Multiple subcarriers, each QPSK/QAM modulated. Used in LTE, WiFi (802.11), DVB.`,
      keyPoints: ["AM bandwidth = 2W; FM bandwidth = 2(Δf+W) via Carson's rule","Higher QAM order: more bits/symbol but needs better SNR","OFDM splits channel into many narrow subcarriers — robust to multipath","BPSK BER = Q(√(2Eb/N0)) — fundamental wireless metric"],
      example: `import numpy as np\nimport matplotlib.pyplot as plt\n\n• BPSK modulation\nbits = np.array([1, 0, 1, 1, 0])\nsymbols = 2*bits - 1  • 1→+1, 0→-1\nt = np.linspace(0, 5, 500)\nfc = 10  • carrier frequency\ncarrier = np.cos(2*np.pi*fc*np.repeat(t.reshape(5,-1),1,axis=0))\n• Each bit modulates carrier phase`,
      comparisonTable: { headers: ["Modulation","Bits/Symbol","SNR Required","Application"], rows: [["BPSK","1","Low","Deep space comms"],["QPSK","2","Medium","LTE uplink"],["16-QAM","4","Medium-High","LTE, WiFi"],["64-QAM","6","High","LTE Advanced, WiFi 6"],["256-QAM","8","Very High","WiFi 6, cable TV"]] },
      flowchartSteps: ["Source data bits → bit stream","Modulator: map bits to symbols","Upconvert to carrier frequency","Transmit through channel (add noise)","Receiver: downconvert, match filter","Demodulate: detect symbols","Decode bits → data"],
      concept3DSimulation: { title: "QAM Constellation Diagram", description: "I-Q plane shows symbol points. Higher SNR = tighter clustering. Noise rotates/moves points.", interactiveNodes: [{name:"Modulator",type:"Symbol Mapper",details:"Maps bit groups to constellation points (I,Q values)"},{name:"Channel",type:"AWGN Noise Adder",details:"Adds Gaussian noise to transmitted symbols"},{name:"Detector",type:"Maximum Likelihood",details:"Finds nearest constellation point to received signal"}] },
      complexity: "OFDM FFT: O(N log N) | QAM detection: O(constellation_size)"
    },
    aiExplain: { steps: ["Encode bits into symbols","Modulate onto carrier","Channel adds noise","Receiver detects closest symbol","Decode back to bits"], analogy: "Like Morse code on radio waves — different beep patterns (symbols) encode different messages, and the receiver decodes the pattern despite static (noise)" },
    debug: [{ title: "Overmodulation in AM", buggy: "μ = Am/Ac = 1.5  • > 1, causes distortion", fixed: "μ = Am/Ac ≤ 1  • keep within 0-1 range", hint: "AM modulation index must be ≤ 1. μ > 1 causes carrier phase reversal and envelope distortion." }],
    quiz: [
      { q: "AM bandwidth formula:", options: ["W","2W","2(Δf+W)","4W"], answer: 1 },
      { q: "64-QAM carries how many bits per symbol?", options: ["4","6","8","16"], answer: 1 },
      { q: "OFDM is robust against:", options: ["High power consumption","Multipath fading","Low bandwidth","Digital noise only"], answer: 1 },
      { q: "FM noise advantage over AM:", options: ["Narrower bandwidth","Lower power","Better SNR (capture effect)","Simpler hardware"], answer: 2 }
    ],
    mnc: [
      { company: "Qualcomm", year: "2023", question: "Why does LTE use OFDM instead of single-carrier?", answer: "OFDM splits wideband channel into many narrowband subcarriers. Each subcarrier experiences flat fading (easier equalization). Cyclic prefix eliminates inter-symbol interference from multipath. IFFT/FFT implementation is efficient. Flexible resource allocation per subcarrier." },
      { company: "Texas Instruments", year: "2022", question: "Calculate AM bandwidth for voice signal 0-4kHz", answer: "AM bandwidth = 2 × message bandwidth = 2 × 4kHz = 8kHz. DSB-AM: 8kHz. SSB-AM (single sideband): 4kHz (half bandwidth). SSB preferred for voice radio to conserve spectrum." }
    ],
    mock: [{ type: "Technical", question: "Explain how OFDM handles multipath interference.", tip: "Multipath causes ISI. OFDM adds cyclic prefix (copy of end of symbol) before each symbol. Guard interval longer than max multipath delay. Receiver discards cyclic prefix, does FFT. Each subcarrier sees flat (not frequency-selective) fading. No ISI if CP > delay spread." }],
    coding: { problem: "QAM Symbol Mapper", desc: "Implement 16-QAM modulator mapping 4-bit groups to constellation points.", input: "bits = [1,0,1,1,0,1,0,0]  • 2 symbols", output: "symbols = [(1+1j), (-1-3j)]", starter: "def qam16_modulate(bits):\n    • Gray coded 16-QAM: I,Q ∈ {-3,-1,+1,+3}\n    mapping = {}\n    • Build constellation mapping\n    symbols = []\n    for i in range(0, len(bits), 4):\n        group = bits[i:i+4]\n        • Map to I and Q values\n    return symbols" }
  },
  {
    moduleTitle: "VLSI Design – CMOS & Logic Families",
    roles: ["ece-iot", "ece-vlsi", "ece-embedded"],
    industryUseCase: "Autonomous Vehicle Sensor Fusion Control Unit at Tesla/Bosch",
    harvardOxfordRef: "MIT 6.004 Computation Structures & Real-Time Embedded Microarchitectures",
    level: "Level 3 – Advanced",
    branch: ["ece"],
    videos: makeVideoLinks("VLSI CMOS Design Logic Families Fabrication"),
    studyMaterial: {
      summary: "VLSI (Very Large Scale Integration) packs billions of transistors on a chip. CMOS (Complementary MOS) uses paired PMOS and NMOS transistors for low static power dissipation, making it the dominant technology for modern chips.",
      deepDiveTextbook: `CMOS VLSI FUNDAMENTALS\n\nMOSFET Operation:\nNMOS: On when Vgs > Vth (positive). Conducts current from drain to source.\nPMOS: On when Vgs < -Vth (negative). Conducts current from source to drain.\n\nCMOS Inverter:\nWhen Vin = LOW: PMOS ON, NMOS OFF → Vout = VDD\nWhen Vin = HIGH: PMOS OFF, NMOS ON → Vout = GND\nStatic power dissipation ≈ 0 (no direct path from VDD to GND in static state).\n\nCMOS NAND Gate: PMOS in parallel (pull-up), NMOS in series (pull-down).\nCMOS NOR Gate: PMOS in series (pull-up), NMOS in parallel (pull-down).\n\nDesign Rule: NMOS in series → PMOS in parallel. NMOS in parallel → PMOS in series.\n\nFabrication Process (Simplified 6-step):\n1. Silicon wafer oxidation (SiO₂ layer)\n2. Photolithography (UV exposure through mask)\n3. Etching (pattern transfer)\n4. Dopant implantation (P or N type)\n5. Metal deposition (interconnects)\n6. Chemical Mechanical Planarization (CMP)\n\nTechnology Nodes: 28nm, 7nm, 3nm — smaller = faster, lower power, higher density.\nMoore's Law: Transistor count doubles every ~2 years (slowing down beyond 5nm).`,
      keyPoints: ["CMOS: PMOS+NMOS pair, near-zero static power","NAND: PMOS parallel/NMOS series. NOR: PMOS series/NMOS parallel","Technology node = gate length (smaller = faster, denser)","Dynamic power P = αCV²f (dominant power in modern chips"],
      example: `• CMOS Propagation Delay Analysis\n• tpHL = 0.69 * Rn * CL  (discharge time, NMOS dominant)\n• tpLH = 0.69 * Rp * CL  (charge time, PMOS dominant)\n• tp = (tpHL + tpLH) / 2  (average propagation delay)\n\ndef propagation_delay(Rn, Rp, CL):\n    tpHL = 0.69 * Rn * CL\n    tpLH = 0.69 * Rp * CL\n    return (tpHL + tpLH) / 2\n\n• For 7nm node: Rn≈1kΩ, Rp≈2kΩ, CL=1fF\nprint(propagation_delay(1e3, 2e3, 1e-15))  • ~1.04 ps`,
      comparisonTable: { headers: ["Family","VDD","Power","Speed","Use Case"], rows: [["CMOS","1.8-5V","Very Low","Medium","Most digital ICs"],["TTL","5V","Medium","Fast","Legacy systems"],["ECL","5V","High","Very Fast","High-speed comms"],["BiCMOS","3.3-5V","Medium","Fast","Mixed signal ICs"]] },
      flowchartSteps: ["Define circuit specification","Draw transistor-level schematic","Size transistors for drive strength","Simulate with SPICE","Physical layout (place and route)","Design Rule Check (DRC)","Tape-out to fabrication"],
      concept3DSimulation: { title: "CMOS Gate Transistor Stack", description: "3D view of PMOS pull-up network above NMOS pull-down network with VDD/GND rails.", interactiveNodes: [{name:"PMOS Network",type:"Pull-Up",details:"Conducts when output needs to go HIGH (pulls to VDD)"},{name:"NMOS Network",type:"Pull-Down",details:"Conducts when output needs to go LOW (pulls to GND)"},{name:"Switching Node",type:"Output",details:"Voltage switches between VDD and GND with near-zero static power"}] },
      complexity: "Gate delay O(series transistors) | Area O(transistor count)"
    },
    aiExplain: { steps: ["PMOS pulls output HIGH when input is low","NMOS pulls output LOW when input is high","Never both ON simultaneously — no static current","Dynamic current only during switching"], analogy: "Like a see-saw with two teams — PMOS team pulls up, NMOS team pulls down. Only one team is active at a time, using almost no energy when still." },
    debug: [{ title: "Latch-up in CMOS", buggy: "ESD event triggers parasitic PNP-NPN structure → latch-up → circuit destruction", fixed: "Add guard rings around PMOS and NMOS blocks. Use latch-up protection in I/O pads.", hint: "Latch-up is a CMOS parasitic thyristor effect. Guard rings (well ties) prevent it by providing low-resistance paths to VDD/GND." }],
    quiz: [
      { q: "CMOS NAND gate: PMOS configuration is:", options: ["Series","Parallel","Single transistor","None"], answer: 1 },
      { q: "Static power in CMOS is approximately:", options: ["High","Medium","Near zero","Proportional to frequency"], answer: 2 },
      { q: "Dynamic power in CMOS ∝:", options: ["V","V²f","√f","1/C"], answer: 1 },
      { q: "Moore's Law states transistor count:", options: ["Stays constant","Halves every year","Doubles every ~2 years","Triples every 5 years"], answer: 2 }
    ],
    mnc: [
      { company: "Intel", year: "2023", question: "What challenges arise at 3nm technology node?", answer: "1) Gate leakage current due to quantum tunneling through ultra-thin oxide. 2) Process variation increases (difficult lithography). 3) Power density increases. 4) Short-channel effects (drain-induced barrier lowering). Solutions: FinFET, GAA (Gate-All-Around) transistors, High-k/metal gate, EUV lithography." },
      { company: "TSMC", year: "2022", question: "Explain the difference between FinFET and planar MOSFET", answer: "Planar: gate controls channel from one side. FinFET: 3D fin-shaped channel, gate wraps 3 sides → better electrostatic control, less leakage, lower threshold voltage variation. FinFET used from 16nm node onward. GAA (nanosheet) further wraps all 4 sides (3nm+)." }
    ],
    mock: [{ type: "Technical", question: "How would you reduce power consumption in a digital chip?", tip: "1) Clock gating: disable clock to idle blocks. 2) Power gating: power-off unused domains. 3) Dynamic voltage and frequency scaling (DVFS). 4) Multiple Vth: use high-Vth cells for non-critical paths (less leakage). 5) Reduce switching activity (fewer transitions). 6) Move to smaller technology node." }],
    coding: { problem: "Gate Sizing for Minimum Delay", desc: "Given a logic chain, find optimal transistor sizing to minimize propagation delay.", input: "Chain of 5 inverters, target load CL=100fF, Cin of min inverter=1fF", output: "Optimal sizing ratio h = (CL/Cin)^(1/5)", starter: "import math\n\ndef optimal_sizing(CL, Cin_min, n_stages):\n    • Optimal stage ratio = (CL/Cin)^(1/n)\n    h = (CL/Cin_min) ** (1/n_stages)\n    return h\n\nprint(optimal_sizing(100e-15, 1e-15, 5))  • ≈2.51" }
  },
  {
    moduleTitle: "Control Systems – PID & Transfer Functions",
    roles: ["ece-iot", "ece-vlsi", "ece-embedded"],
    industryUseCase: "Autonomous Vehicle Sensor Fusion Control Unit at Tesla/Bosch",
    harvardOxfordRef: "MIT 6.004 Computation Structures & Real-Time Embedded Microarchitectures",
    level: "Level 3 – Advanced",
    branch: ["ece"],
    videos: makeVideoLinks("PID Controller Transfer Function Control Systems"),
    studyMaterial: {
      summary: "Control systems regulate plant behavior using feedback. Transfer functions in Laplace domain simplify analysis. PID controllers are the most widely deployed control algorithm in industry, used in everything from thermostats to robotics.",
      deepDiveTextbook: `CONTROL SYSTEMS – FEEDBACK & PID\n\nOpen-Loop vs Closed-Loop:\nOpen-loop: No feedback, sensitive to disturbances.\nClosed-loop: Error = Setpoint - Output. Controller adjusts input based on error.\n\nTransfer Function: G(s) = Y(s)/U(s) in Laplace domain. Represents system in frequency domain.\n\nClosed-loop TF = G(s)/(1 + G(s)H(s)) where H(s) is sensor TF.\n\nPID Controller:\nU(t) = Kp*e(t) + Ki*∫e(t)dt + Kd*de/dt\nIn s-domain: C(s) = Kp + Ki/s + Kd*s\n\n- Kp (Proportional): Reduce steady-state error. Too high → oscillation.\n- Ki (Integral): Eliminate steady-state error. Too high → overshoot/wind-up.\n- Kd (Derivative): Dampen oscillations, predict error trend. Sensitive to noise.\n\nTuning Methods:\n1. Ziegler-Nichols: Increase Kp until oscillation (ultimate gain Ku). Use Ku and period Tu to set Kp, Ki, Kd.\n2. Manual Tuning: Start P-only, then add I to eliminate offset, add D to reduce overshoot.\n3. Auto-tuning: Built into modern PLCs.\n\nStability Analysis:\n- Routh-Hurwitz: Algebraic test for closed-loop pole locations.\n- Root Locus: Graphical pole locations as gain K varies.\n- Bode Plot: Gain and phase margins from frequency response.\n- Gain Margin > 6dB, Phase Margin > 45° for stable systems.`,
      keyPoints: ["PID: P reduces error, I eliminates steady-state offset, D dampens oscillations","Closed-loop TF = G/(1+GH) — denominator determines stability","Gain margin > 6dB, phase margin > 45° for robust stability","Ziegler-Nichols provides starting point for PID tuning"],
      example: `• Discrete PID Controller Implementation\nclass PID:\n    def __init__(self, Kp, Ki, Kd, dt):\n        self.Kp, self.Ki, self.Kd, self.dt = Kp, Ki, Kd, dt\n        self.integral = 0\n        self.prev_error = 0\n    \n    def compute(self, setpoint, measurement):\n        error = setpoint - measurement\n        self.integral += error * self.dt\n        derivative = (error - self.prev_error) / self.dt\n        output = self.Kp*error + self.Ki*self.integral + self.Kd*derivative\n        self.prev_error = error\n        return output`,
      comparisonTable: { headers: ["Controller","Steady-State Error","Transient Response","Noise Sensitivity"], rows: [["P only","Non-zero","Fast","Low"],["PI","Zero","Slower, possible overshoot","Low"],["PD","Non-zero","Fast, well-damped","High"],["PID","Zero","Good balance","Medium"]] },
      flowchartSteps: ["Define reference setpoint r(t)","Measure plant output y(t)","Compute error e(t) = r(t) - y(t)","PID: compute P+I+D terms","Apply control signal u(t) to plant","Plant produces new output","Repeat at each sample time"],
      concept3DSimulation: { title: "PID Control Loop", description: "Block diagram animates error → PID → plant → sensor → feedback path.", interactiveNodes: [{name:"Error Summator",type:"Difference Junction",details:"Computes e(t) = setpoint - measured output"},{name:"PID Controller",type:"3-Term Compensator",details:"Generates control signal from P, I, D terms"},{name:"Plant + Sensor",type:"Physical System",details:"Responds to control input, sensor measures output"}] },
      complexity: "PID computation: O(1) per sample | Bode analysis: O(N log N) via FFT"
    },
    aiExplain: { steps: ["Measure error between setpoint and output","P: apply correction proportional to error","I: accumulate error over time to eliminate offset","D: predict future error from rate of change"], analogy: "Like adjusting a shower temperature: P = how much you turn knob based on current temperature, I = accumulated frustration over time cold stays cold, D = how fast temperature is changing" },
    debug: [{ title: "Integral windup", buggy: "PID integrator keeps accumulating during actuator saturation → huge overshoot", fixed: "Add anti-windup: clamp integral when output is saturated\nif abs(output) > max_output: self.integral -= error * self.dt", hint: "Integral windup occurs when actuator is saturated but integrator keeps accumulating. Anti-windup prevents this." }],
    quiz: [
      { q: "Which PID term eliminates steady-state error?", options: ["Proportional (Kp)","Integral (Ki)","Derivative (Kd)","All three"], answer: 1 },
      { q: "Gain margin should be:", options: ["< 0 dB","0 dB","< 6 dB","> 6 dB"], answer: 3 },
      { q: "Root locus shows:", options: ["Frequency response","Pole locations as gain varies","Step response","Bode plot"], answer: 1 },
      { q: "Ziegler-Nichols method starts by:", options: ["Setting Ki first","Setting Kd first","Increasing Kp until oscillation","Measuring phase margin"], answer: 2 }
    ],
    mnc: [
      { company: "ABB", year: "2023", question: "How does a self-tuning PID work in industrial PLCs?", answer: "1) Relay feedback test: apply relay instead of PID, measure limit cycle oscillation. 2) Extract ultimate gain (Ku) and period (Tu) from limit cycle. 3) Apply Ziegler-Nichols formulas: Kp=0.6Ku, Ti=Tu/2, Td=Tu/8. 4) Fine-tune online. Modern PLCs use recursive least squares identification." },
      { company: "Siemens", year: "2022", question: "Design a speed controller for a DC motor.", answer: "Plant: G(s) = K/(s(Ts+1)) — integrating plant with time constant T. Use PI controller (no D needed — plant already has derivative action). Set Ki to cancel plant pole (pole-zero cancellation). Choose Kp for desired bandwidth. Simulate step response, verify settling time and overshoot." }
    ],
    mock: [{ type: "Technical", question: "What are the advantages of cascade control over single-loop PID?", tip: "Cascade: outer loop (primary) controls main variable, inner loop (secondary) controls intermediate. Inner loop is faster — rejects disturbances before they reach outer loop. Example: temperature control outer loop, heat output inner loop. Better disturbance rejection at cost of complexity." }],
    coding: { problem: "Simulate PID Step Response", desc: "Simulate a first-order plant with PID controller and plot step response.", input: "Kp=1.5, Ki=0.5, Kd=0.1, plant G=1/(s+1), setpoint=1.0", output: "Output reaches 1.0 with < 5% overshoot", starter: "def simulate_pid(Kp, Ki, Kd, dt=0.01, T=10):\n    pid = PID(Kp, Ki, Kd, dt)\n    • First-order plant: y' = -y + u\n    y, outputs = 0, []\n    for t in range(int(T/dt)):\n        u = pid.compute(1.0, y)  • setpoint=1.0\n        y += dt * (-y + u)  • Euler integration\n        outputs.append(y)\n    return outputs" }
  },
  {
    moduleTitle: "Embedded Systems – RTOS & Interrupts",
    roles: ["ece-iot", "ece-vlsi", "ece-embedded"],
    industryUseCase: "Autonomous Vehicle Sensor Fusion Control Unit at Tesla/Bosch",
    harvardOxfordRef: "MIT 6.004 Computation Structures & Real-Time Embedded Microarchitectures",
    level: "Level 2 – Intermediate",
    branch: ["ece"],
    videos: makeVideoLinks("Embedded Systems RTOS Interrupts Microcontroller"),
    studyMaterial: {
      summary: "Real-Time Operating Systems (RTOS) manage task scheduling in embedded systems with strict timing requirements. Interrupts allow immediate response to hardware events without polling, enabling efficient real-time control.",
      deepDiveTextbook: `RTOS & INTERRUPT-DRIVEN DESIGN\n\nRTOS vs General OS:\nGeneral OS: Optimize for throughput and fairness.\nRTOS: Deterministic response time (worst-case execution time matters). Hard real-time: missing deadline = system failure. Soft real-time: occasional misses acceptable.\n\nRTOS Tasks:\nEach task: function + stack + priority. States: Ready, Running, Blocked, Suspended.\nScheduling: Preemptive priority scheduling. Highest priority ready task always runs.\n\nFreeRTOS (Industry Standard):\n- xTaskCreate(): Create task with priority.\n- vTaskDelay(): Block for N ticks.\n- xQueueSend/Receive(): Inter-task communication.\n- xSemaphoreTake/Give(): Synchronization, mutual exclusion.\n- xEventGroupSetBits(): Signal multiple tasks.\n\nInterrupt Handling:\nISR (Interrupt Service Routine): Executes in interrupt context (not task context).\nRules: Keep ISR short (no blocking, no FreeRTOS API with blocking). Use xQueueSendFromISR(), xSemaphoreGiveFromISR().\n\nPriority Inversion: Low-priority task holds mutex, high-priority task waits. Solution: Priority Inheritance Protocol (raise mutex holder's priority temporarily).\n\nWatchdog Timer: Hardware timer that resets MCU if not kicked periodically. Prevents system lockups.`,
      keyPoints: ["Hard real-time: deadline miss = failure (automotive, avionics)","ISRs must be short — use queues to defer processing to tasks","Priority inversion solved by priority inheritance in RTOS","Watchdog timer detects software lockups and triggers reset"],
      example: `• include "FreeRTOS.h"\n• include "task.h"\n• include "queue.h"\n\nQueueHandle_t xQueue;\n\nvoid vSensorISR(void) {\n    uint16_t data = ADC_Read();\n    xQueueSendFromISR(xQueue, &data, NULL);  // defer processing\n}\n\nvoid vProcessingTask(void *pvParam) {\n    uint16_t received;\n    while(1) {\n        if(xQueueReceive(xQueue, &received, portMAX_DELAY)) {\n            process_sensor_data(received);  // heavy processing here\n        }\n    }\n}`,
      comparisonTable: { headers: ["RTOS","Latency","Priority","Footprint","Use Case"], rows: [["FreeRTOS","<10μs","Preemptive","4-16KB","IoT, MCUs"],["Zephyr","<5μs","Preemptive","8-512KB","Wearables, industrial"],["VxWorks","<1μs","Preemptive","1MB+","Avionics, defense"],["Linux+PREEMPT_RT","<100μs","Soft RT",">10MB","Gateways, HMI"]] },
      flowchartSteps: ["Hardware event triggers interrupt","CPU saves context, jumps to ISR","ISR reads data, signals task via queue/semaphore","ISR returns, CPU restores context","RTOS scheduler wakes signaled task","Task processes data, sleeps on next event","Watchdog kicked at end of main loop"],
      concept3DSimulation: { title: "RTOS Task State Machine", description: "Tasks cycle between Ready, Running, Blocked states as scheduler preempts and queues signal.", interactiveNodes: [{name:"Task Scheduler",type:"Priority Dispatcher",details:"Always runs highest priority ready task"},{name:"Queue Manager",type:"IPC Buffer",details:"Safely passes data between ISR and tasks"},{name:"Semaphore",type:"Synchronization Primitive",details:"Prevents race conditions on shared resources"}] },
      complexity: "Context switch: O(1) | Queue operations: O(1)"
    },
    aiExplain: { steps: ["Hardware event fires ISR","ISR quickly stores data in queue, returns","RTOS wakes processing task","Task handles data at task priority","System stays responsive to other interrupts"], analogy: "Like a hospital emergency room: a 911 call (interrupt) quickly registers the patient (ISR stores data), then hands off to ER doctors (task) for full treatment without blocking the receptionist" },
    debug: [{ title: "Stack overflow in RTOS task", buggy: "xTaskCreate(myTask, 'T', 128, NULL, 1, NULL)  // 128 words too small", fixed: "xTaskCreate(myTask, 'T', 512, NULL, 1, NULL)  // adequate stack", hint: "RTOS stack overflow corrupts adjacent memory. Use configCHECK_FOR_STACK_OVERFLOW and uxTaskGetStackHighWaterMark() to measure peak stack usage." }],
    quiz: [
      { q: "ISR should be:", options: ["Long and thorough","Short, defer work to tasks","Run at lowest priority","Use blocking APIs"], answer: 1 },
      { q: "Priority inversion is solved by:", options: ["Disabling interrupts","Priority inheritance","Reducing task count","Using polling instead"], answer: 1 },
      { q: "Watchdog timer purpose:", options: ["Measure temperature","Reset system if software hangs","Generate PWM","Control LCD"], answer: 1 },
      { q: "FreeRTOS xQueueReceive with portMAX_DELAY:", options: ["Returns immediately","Times out in 100ms","Blocks forever until data available","Crashes task"], answer: 2 }
    ],
    mnc: [
      { company: "Qualcomm", year: "2023", question: "How do you ensure deterministic latency in an RTOS system?", answer: "1) Use fixed-priority preemptive scheduling. 2) Avoid dynamic memory allocation (use static pools). 3) Keep ISRs short. 4) Avoid priority inversion (use mutexes with priority inheritance). 5) Measure and analyze WCET (worst-case execution time). 6) Use Rate Monotonic Analysis to verify schedulability." },
      { company: "STMicroelectronics", year: "2022", question: "Design a sensor reading system using interrupts instead of polling.", answer: "Configure ADC in DMA mode + interrupt on conversion complete. ISR: xQueueSendFromISR(). Processing task: xQueueReceive(portMAX_DELAY), process data, send to UART. Advantages: CPU free between conversions, deterministic response, no wasted CPU cycles polling." }
    ],
    mock: [{ type: "Technical", question: "Explain the difference between binary semaphore and mutex in FreeRTOS.", tip: "Binary semaphore: signaling mechanism (ISR gives, task takes). No ownership. Mutex: mutual exclusion, has ownership (same task must give). Mutex has priority inheritance to prevent priority inversion. Binary semaphore doesn't. Use mutex for shared resource protection, binary semaphore for ISR→task signaling." }],
    coding: { problem: "LED Blink with RTOS Tasks", desc: "Create 2 FreeRTOS tasks: LED1 blinks at 500ms, LED2 blinks at 200ms.", input: "FreeRTOS + STM32 GPIO", output: "Both LEDs blink at independent rates simultaneously", starter: "• include 'FreeRTOS.h'\n• include 'task.h'\n\nvoid vLED1Task(void *pv) {\n    while(1) {\n        // Toggle LED1\n        vTaskDelay(pdMS_TO_TICKS(500));\n    }\n}\nvoid vLED2Task(void *pv) {\n    while(1) {\n        // Toggle LED2\n        vTaskDelay(pdMS_TO_TICKS(200));\n    }\n}" }
  }
];
