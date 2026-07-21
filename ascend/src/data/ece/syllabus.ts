// ECE branch — full syllabus for all role tracks.
export type SyllabusItem = { id: string; title: string; type: "concept" | "checklist" | "resource" };
export type SyllabusLevel = { id: string; level: number; title: string; description: string; items: SyllabusItem[] };

export const ECE_SYLLABUS: Record<string, SyllabusLevel[]> = {
  "ece-vlsi": [
    { id: "l1", level: 1, title: "Digital Design Foundations", description: "Core RTL skills",
      items: [
        { id: "i1", title: "Verilog/VHDL fundamentals", type: "concept" },
        { id: "i2", title: "Combinational vs sequential logic design", type: "concept" },
      ] },
    { id: "l2", level: 2, title: "Verification & Physical Design", description: "Chip design flow",
      items: [
        { id: "i1", title: "Testbenches, simulation basics", type: "checklist" },
        { id: "i2", title: "Synthesis and timing analysis basics", type: "concept" },
      ] },
    { id: "l3", level: 3, title: "Placement Ready", description: "Interview prep",
      items: [
        { id: "i1", title: "Mock interview: design a simple FSM on the whiteboard", type: "checklist" },
        { id: "i2", title: "Get your Placement Readiness Score from AI", type: "checklist" },
      ] },
  ],
  "ece-embedded": [
    { id: "l1", level: 1, title: "Embedded Foundations", description: "Core firmware skills",
      items: [
        { id: "i1", title: "C programming for embedded systems", type: "concept" },
        { id: "i2", title: "Microcontroller architecture (ARM/AVR)", type: "concept" },
      ] },
    { id: "l2", level: 2, title: "Real-Time Systems", description: "Building responsive firmware",
      items: [
        { id: "i1", title: "RTOS basics, interrupts", type: "concept" },
        { id: "i2", title: "Build 1 embedded project (sensor + actuator)", type: "checklist" },
      ] },
    { id: "l3", level: 3, title: "Placement Ready", description: "Interview prep",
      items: [
        { id: "i1", title: "Mock interview: debug a firmware issue scenario", type: "checklist" },
        { id: "i2", title: "Get your Placement Readiness Score from AI", type: "checklist" },
      ] },
  ],
  "ece-signal": [
    { id: "l1", level: 1, title: "DSP Foundations", description: "Core signal processing",
      items: [
        { id: "i1", title: "Sampling theorem, Fourier transforms", type: "concept" },
        { id: "i2", title: "Filter design basics (FIR/IIR)", type: "concept" },
      ] },
    { id: "l2", level: 2, title: "Applied Signal Processing", description: "Real systems",
      items: [
        { id: "i1", title: "MATLAB/Python for signal analysis", type: "checklist" },
        { id: "i2", title: "Build 1 signal processing project", type: "checklist" },
      ] },
    { id: "l3", level: 3, title: "Placement Ready", description: "Interview prep",
      items: [
        { id: "i1", title: "Mock interview: explain the Nyquist theorem and aliasing", type: "checklist" },
        { id: "i2", title: "Get your Placement Readiness Score from AI", type: "checklist" },
      ] },
  ],
  "ece-iot": [
    { id: "l1", level: 1, title: "IoT Foundations", description: "Connected device basics",
      items: [
        { id: "i1", title: "Sensor interfacing, communication protocols (I2C/SPI/UART)", type: "concept" },
        { id: "i2", title: "Wireless protocols: WiFi, BLE, LoRa, MQTT", type: "concept" },
      ] },
    { id: "l2", level: 2, title: "IoT Systems", description: "Building connected products",
      items: [
        { id: "i1", title: "Cloud integration for IoT (AWS IoT/Azure IoT)", type: "checklist" },
        { id: "i2", title: "Build 1 end-to-end IoT project", type: "checklist" },
      ] },
    { id: "l3", level: 3, title: "Placement Ready", description: "Interview prep",
      items: [
        { id: "i1", title: "Mock interview: design an IoT system for smart agriculture", type: "checklist" },
        { id: "i2", title: "Get your Placement Readiness Score from AI", type: "checklist" },
      ] },
  ],
  "ece-rf": [
    { id: "l1", level: 1, title: "RF Foundations", description: "Core RF concepts",
      items: [
        { id: "i1", title: "Transmission lines, impedance matching", type: "concept" },
        { id: "i2", title: "Antenna basics", type: "concept" },
      ] },
    { id: "l2", level: 2, title: "RF Circuit Design", description: "Practical RF systems",
      items: [
        { id: "i1", title: "Amplifiers, mixers, filters at RF", type: "concept" },
        { id: "i2", title: "Simulate 1 RF circuit (ADS/AWR)", type: "checklist" },
      ] },
    { id: "l3", level: 3, title: "Placement Ready", description: "Interview prep",
      items: [
        { id: "i1", title: "Mock interview: explain impedance matching and its importance", type: "checklist" },
        { id: "i2", title: "Get your Placement Readiness Score from AI", type: "checklist" },
      ] },
  ],
};
