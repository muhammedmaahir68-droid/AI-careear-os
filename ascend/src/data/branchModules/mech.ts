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
  }
];
