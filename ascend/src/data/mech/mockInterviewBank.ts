// MECH branch — mock interview question bank.
export type MockQuestion = { question: string; difficulty: "easy" | "medium" | "hard"; ideal_answer_points: string };

export const MECH_MOCK_INTERVIEW: Record<string, MockQuestion[]> = {
  "mech-robotics": [
    { question: "What sensors would you use for obstacle avoidance in a mobile robot?", difficulty: "easy",
      ideal_answer_points: "Ultrasonic, LiDAR, infrared — tradeoffs in range/precision/cost." },
    { question: "Explain the difference between a serial and parallel robot manipulator.", difficulty: "medium",
      ideal_answer_points: "Sequential joint chain vs multiple chains connecting to end effector; rigidity/workspace tradeoffs." },
    { question: "Design a path-planning approach for a warehouse delivery robot.", difficulty: "hard",
      ideal_answer_points: "Mapping (SLAM), obstacle avoidance, path optimization, dynamic replanning." },
  ],
  "mech-automation": [
    { question: "What's the difference between a proximity sensor and a photoelectric sensor?", difficulty: "easy",
      ideal_answer_points: "Detects nearby metal objects without contact vs detects objects via light beam interruption." },
    { question: "Explain the role of a PLC scan cycle in real-time control.", difficulty: "medium",
      ideal_answer_points: "Continuous input-read, logic-execute, output-write cycle determines response time." },
    { question: "Design an automated quality-inspection station using sensors and a PLC.", difficulty: "hard",
      ideal_answer_points: "Sensor selection, reject mechanism, PLC logic, throughput considerations." },
  ],
  "mech-control": [
    { question: "What is sensor fusion and why is it used?", difficulty: "easy",
      ideal_answer_points: "Combining multiple sensor inputs for more accurate/robust state estimation." },
    { question: "Explain the difference between position control and force control.", difficulty: "medium",
      ideal_answer_points: "Position control targets a location; force control targets applied force/torque, important in contact tasks." },
    { question: "Design a control system for a robotic gripper that avoids crushing fragile objects.", difficulty: "hard",
      ideal_answer_points: "Force sensing feedback, compliant control, threshold-based limits." },
  ],
  "mech-cad": [
    { question: "What's the difference between a first-angle and third-angle projection?", difficulty: "easy",
      ideal_answer_points: "Different conventions for placing orthographic views relative to the object; regional standard differences." },
    { question: "Explain the purpose of tolerance stack-up analysis.", difficulty: "medium",
      ideal_answer_points: "Ensures assembly of parts with individual tolerances still fits/functions correctly." },
    { question: "Design an assembly for a simple gear-driven mechanism, considering manufacturability.", difficulty: "hard",
      ideal_answer_points: "Material choice, gear ratio, tolerances, assembly sequence." },
  ],
  "mech-iiot": [
    { question: "What is OEE (Overall Equipment Effectiveness) and how is it measured?", difficulty: "easy",
      ideal_answer_points: "Availability x Performance x Quality — a key manufacturing KPI." },
    { question: "Explain how vibration analysis is used for predictive maintenance.", difficulty: "medium",
      ideal_answer_points: "Detects bearing wear/misalignment before failure via frequency signature changes." },
    { question: "Design a data pipeline connecting factory floor sensors to a cloud dashboard.", difficulty: "hard",
      ideal_answer_points: "Edge gateway, protocol translation, cloud ingestion, dashboarding, alerting." },
  ],
};
