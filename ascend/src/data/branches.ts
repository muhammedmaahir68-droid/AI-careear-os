// Master list of branches and the job-role tracks each one prepares
// students for. This drives the branch/role picker on onboarding
// and determines which syllabus/HR-question/mock-interview data
// set gets loaded.
//
// Only AIML has full content wired up right now (see ./aiml/).
// The other branches are listed here with their role tracks so the
// picker UI and Supabase seed rows are correct end-to-end; their
// content files follow the exact same shape as ./aiml/ and can be
// filled in the same way, branch by branch.

export type Branch = {
  id: string;
  name: string;
  description: string;
  icon: string;
  roles: { id: string; name: string; description: string }[];
};

export const BRANCHES: Branch[] = [
  {
    id: "cse",
    name: "Computer Science Engineering",
    description: "Software development, systems, and core CS fundamentals",
    icon: "Code2",
    roles: [
      { id: "cse-sde", name: "Software Development Engineer (Product-based)", description: "DSA-heavy, system design, product companies" },
      { id: "cse-backend", name: "Backend Engineer", description: "APIs, databases, distributed systems" },
      { id: "cse-frontend", name: "Frontend Engineer", description: "React/UI systems, performance, accessibility" },
      { id: "cse-fullstack", name: "Full Stack Developer", description: "End-to-end app development" },
      { id: "cse-data-engineer", name: "Data Engineer", description: "Pipelines, warehousing, big data tooling" },
      { id: "cse-devops", name: "DevOps / Cloud Engineer", description: "CI/CD, infra-as-code, cloud platforms" },
    ],
  },
  {
    id: "it",
    name: "Information Technology",
    description: "Applied software, infrastructure, QA, and IT systems",
    icon: "Server",
    roles: [
      { id: "it-qa", name: "Software Tester / QA Engineer", description: "Manual + automation testing" },
      { id: "it-sysadmin", name: "System Administrator", description: "Networks, servers, IT infra" },
      { id: "it-cloud", name: "Cloud Support Engineer", description: "AWS/Azure/GCP operations" },
      { id: "it-fullstack", name: "Full Stack Developer", description: "IT-service-company style app dev" },
      { id: "it-dba", name: "Database Administrator", description: "SQL tuning, backups, database ops" },
    ],
  },
  {
    id: "aiml",
    name: "AI & Machine Learning",
    description: "ML systems, deep learning, NLP, computer vision",
    icon: "BrainCircuit",
    roles: [
      { id: "aiml-ml-engineer", name: "Machine Learning Engineer", description: "Model building + productionizing ML" },
      { id: "aiml-data-scientist", name: "Data Scientist", description: "Statistics, experimentation, insights" },
      { id: "aiml-dl-engineer", name: "Deep Learning Engineer", description: "Neural networks, CNNs/RNNs/transformers" },
      { id: "aiml-nlp-engineer", name: "NLP Engineer", description: "Text/LLM systems" },
      { id: "aiml-cv-engineer", name: "Computer Vision Engineer", description: "Image/video models" },
      { id: "aiml-mlops", name: "MLOps Engineer", description: "Model deployment, monitoring, pipelines" },
    ],
  },
  {
    id: "aids",
    name: "AI & Data Science",
    description: "Data analytics, data engineering, applied AI for business",
    icon: "Database",
    roles: [
      { id: "aids-data-analyst", name: "Data Analyst", description: "SQL, dashboards, business metrics" },
      { id: "aids-data-scientist", name: "Data Scientist", description: "Predictive modeling for business" },
      { id: "aids-data-engineer", name: "Data Engineer", description: "ETL pipelines, data platforms" },
      { id: "aids-bi-analyst", name: "Business Intelligence Analyst", description: "Reporting, visualization" },
      { id: "aids-ai-product", name: "AI Product Analyst", description: "AI feature scoping and evaluation" },
    ],
  },
  {
    id: "ece",
    name: "Electronics & Communication Engineering",
    description: "Embedded systems, VLSI, signal processing, IoT, RF",
    icon: "CircuitBoard",
    roles: [
      { id: "ece-vlsi", name: "VLSI Design Engineer", description: "Chip design, RTL, verification" },
      { id: "ece-embedded", name: "Embedded Systems Engineer", description: "Firmware, microcontrollers, RTOS" },
      { id: "ece-signal", name: "Signal Processing Engineer", description: "DSP, communications systems" },
      { id: "ece-iot", name: "IoT Engineer", description: "Connected devices, sensor networks" },
      { id: "ece-rf", name: "RF Engineer", description: "Antenna/RF circuit design" },
    ],
  },
  {
    id: "eee",
    name: "Electrical & Electronics Engineering",
    description: "Power systems, control systems, electrical design",
    icon: "Zap",
    roles: [
      { id: "eee-power", name: "Power Systems Engineer", description: "Generation, transmission, distribution" },
      { id: "eee-control", name: "Control Systems Engineer", description: "Feedback systems, PLC, automation" },
      { id: "eee-design", name: "Electrical Design Engineer", description: "Circuit/panel design" },
      { id: "eee-renewable", name: "Renewable Energy Engineer", description: "Solar/wind systems" },
      { id: "eee-automation", name: "Embedded/Automation Engineer", description: "Industrial automation" },
    ],
  },
  {
    id: "mech",
    name: "Mechatronics Engineering",
    description: "Robotics, automation, controls, industrial systems",
    icon: "Cog",
    roles: [
      { id: "mech-robotics", name: "Robotics Engineer", description: "Robot design, kinematics, control" },
      { id: "mech-automation", name: "Automation Engineer", description: "Industrial automation, PLC/SCADA" },
      { id: "mech-control", name: "Control Systems Engineer", description: "Sensors, actuators, feedback loops" },
      { id: "mech-cad", name: "CAD / Design Engineer", description: "Mechanical design, simulation" },
      { id: "mech-iiot", name: "Industrial IoT Engineer", description: "Smart factory, sensor integration" },
    ],
  },
];

export const getBranch = (branchId: string) => BRANCHES.find((b) => b.id === branchId);
export const getRole = (roleId: string) =>
  BRANCHES.flatMap((b) => b.roles).find((r) => r.id === roleId);
