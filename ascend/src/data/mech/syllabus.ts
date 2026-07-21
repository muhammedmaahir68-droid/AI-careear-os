// MECH branch — full syllabus for all role tracks.
export type SyllabusItem = { id: string; title: string; type: "concept" | "checklist" | "resource" };
export type SyllabusLevel = { id: string; level: number; title: string; description: string; items: SyllabusItem[] };

export const MECH_SYLLABUS: Record<string, SyllabusLevel[]> = {
  "mech-robotics": [
    { id: "l1", level: 1, title: "Robotics Foundations", description: "Core concepts",
      items: [
        { id: "i1", title: "Kinematics, dynamics basics", type: "concept" },
        { id: "i2", title: "Sensors and actuators for robotics", type: "concept" },
      ] },
    { id: "l2", level: 2, title: "Robot Control & Programming", description: "Building robots",
      items: [
        { id: "i1", title: "ROS basics", type: "checklist" },
        { id: "i2", title: "Build 1 robotics project end to end", type: "checklist" },
      ] },
    { id: "l3", level: 3, title: "Placement Ready", description: "Interview prep",
      items: [
        { id: "i1", title: "Mock interview: explain forward vs inverse kinematics", type: "checklist" },
        { id: "i2", title: "Get your Placement Readiness Score from AI", type: "checklist" },
      ] },
  ],
  "mech-automation": [
    { id: "l1", level: 1, title: "Automation Foundations", description: "Core concepts",
      items: [
        { id: "i1", title: "PLC/SCADA fundamentals", type: "concept" },
        { id: "i2", title: "Pneumatics/hydraulics basics", type: "concept" },
      ] },
    { id: "l2", level: 2, title: "Industrial Automation Systems", description: "Applied automation",
      items: [
        { id: "i1", title: "Sensor/actuator integration", type: "checklist" },
        { id: "i2", title: "Build 1 automated system simulation", type: "checklist" },
      ] },
    { id: "l3", level: 3, title: "Placement Ready", description: "Interview prep",
      items: [
        { id: "i1", title: "Mock interview: design an automated packaging line", type: "checklist" },
        { id: "i2", title: "Get your Placement Readiness Score from AI", type: "checklist" },
      ] },
  ],
  "mech-control": [
    { id: "l1", level: 1, title: "Control Foundations", description: "Core theory",
      items: [
        { id: "i1", title: "Transfer functions, PID basics", type: "concept" },
      ] },
    { id: "l2", level: 2, title: "Applied Mechatronic Control", description: "Sensors and actuators",
      items: [
        { id: "i1", title: "Sensor fusion basics, actuator control", type: "checklist" },
        { id: "i2", title: "Build 1 control loop project", type: "checklist" },
      ] },
    { id: "l3", level: 3, title: "Placement Ready", description: "Interview prep",
      items: [
        { id: "i1", title: "Mock interview: explain a feedback control loop for a motor", type: "checklist" },
        { id: "i2", title: "Get your Placement Readiness Score from AI", type: "checklist" },
      ] },
  ],
  "mech-cad": [
    { id: "l1", level: 1, title: "CAD Foundations", description: "Core design skills",
      items: [
        { id: "i1", title: "SolidWorks/AutoCAD fundamentals", type: "concept" },
        { id: "i2", title: "GD&T basics", type: "concept" },
      ] },
    { id: "l2", level: 2, title: "Design & Simulation", description: "Practical design work",
      items: [
        { id: "i1", title: "FEA/simulation basics", type: "checklist" },
        { id: "i2", title: "Design 1 mechanical assembly end to end", type: "checklist" },
      ] },
    { id: "l3", level: 3, title: "Placement Ready", description: "Interview prep",
      items: [
        { id: "i1", title: "Mock interview: walk through a design decision in your CAD project", type: "checklist" },
        { id: "i2", title: "Get your Placement Readiness Score from AI", type: "checklist" },
      ] },
  ],
  "mech-iiot": [
    { id: "l1", level: 1, title: "Industrial IoT Foundations", description: "Core concepts",
      items: [
        { id: "i1", title: "Sensor networks, industrial protocols (Modbus/OPC-UA)", type: "concept" },
      ] },
    { id: "l2", level: 2, title: "Smart Factory Systems", description: "Applied IIoT",
      items: [
        { id: "i1", title: "Edge computing basics for factories", type: "checklist" },
        { id: "i2", title: "Build 1 IIoT monitoring project", type: "checklist" },
      ] },
    { id: "l3", level: 3, title: "Placement Ready", description: "Interview prep",
      items: [
        { id: "i1", title: "Mock interview: design a predictive maintenance system", type: "checklist" },
        { id: "i2", title: "Get your Placement Readiness Score from AI", type: "checklist" },
      ] },
  ],
};
