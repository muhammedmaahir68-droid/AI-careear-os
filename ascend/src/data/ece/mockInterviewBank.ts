// ECE branch — mock interview question bank.
export type MockQuestion = { question: string; difficulty: "easy" | "medium" | "hard"; ideal_answer_points: string };

export const ECE_MOCK_INTERVIEW: Record<string, MockQuestion[]> = {
  "ece-vlsi": [
    { question: "What is the difference between Verilog blocking and non-blocking assignments?", difficulty: "easy",
      ideal_answer_points: "Blocking executes sequentially; non-blocking schedules updates concurrently — used for sequential logic." },
    { question: "Explain metastability and how it's mitigated in digital design.", difficulty: "medium",
      ideal_answer_points: "Occurs at clock domain crossings; mitigated with synchronizer flip-flop chains." },
    { question: "Design the RTL for a simple traffic light controller FSM.", difficulty: "hard",
      ideal_answer_points: "States, transitions, timing, and reset behavior." },
  ],
  "ece-embedded": [
    { question: "What is a watchdog timer and why is it used?", difficulty: "easy",
      ideal_answer_points: "Resets the system if firmware hangs; improves reliability." },
    { question: "Explain the difference between a semaphore and a mutex in an RTOS.", difficulty: "medium",
      ideal_answer_points: "Mutex has ownership for mutual exclusion; semaphore signals/counts resources." },
    { question: "Design the firmware architecture for a battery-powered IoT sensor node.", difficulty: "hard",
      ideal_answer_points: "Low-power modes, sleep/wake cycles, communication protocol choice." },
  ],
  "ece-signal": [
    { question: "What is aliasing and how is it prevented?", difficulty: "easy",
      ideal_answer_points: "High-frequency signal misrepresented as lower frequency; prevented via anti-aliasing filter + adequate sampling rate." },
    { question: "Explain the difference between time-domain and frequency-domain analysis.", difficulty: "medium",
      ideal_answer_points: "Signal amplitude over time vs frequency content via FFT." },
    { question: "Design a filter to remove 50/60Hz power line noise from an ECG signal.", difficulty: "hard",
      ideal_answer_points: "Notch filter design, order selection, phase distortion considerations." },
  ],
  "ece-iot": [
    { question: "What is the difference between I2C and SPI?", difficulty: "easy",
      ideal_answer_points: "I2C = 2-wire multi-master/multi-slave; SPI = faster, more wires, single master typically." },
    { question: "Explain edge computing in the context of IoT.", difficulty: "medium",
      ideal_answer_points: "Processing data near the source to reduce latency/bandwidth vs cloud-only processing." },
    { question: "Design an IoT architecture for a smart home security system.", difficulty: "hard",
      ideal_answer_points: "Sensors, local hub, cloud sync, alerting, offline fallback." },
  ],
  "ece-rf": [
    { question: "What is VSWR and what does a high value indicate?", difficulty: "easy",
      ideal_answer_points: "Voltage Standing Wave Ratio; high value indicates impedance mismatch and reflected power." },
    { question: "Explain the Smith chart and its use in RF design.", difficulty: "medium",
      ideal_answer_points: "Graphical tool for impedance matching and transmission line analysis." },
    { question: "Design an impedance matching network for a 50-ohm system connecting to a non-50-ohm antenna.", difficulty: "hard",
      ideal_answer_points: "L-network/pi-network design, component selection, simulation validation." },
  ],
};
