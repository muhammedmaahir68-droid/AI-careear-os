// Independent Courses Catalog for CARVEX AI Career OS
// Completely separate from personalized Learning Career Paths

export interface MultiLangVideo {
  language: string;
  languageCode: string;
  flag: string;
  title: string;
  url: string;
}

export interface CourseModule {
  id: string;
  title: string;
  summary: string;
  topicsCount: number;
  estimatedHours: number;
}

export interface Course {
  id: string;
  title: string;
  category: "Programming" | "Electronics" | "Robotics" | "VLSI" | "Biotechnology" | "Mechanical" | "Marine" | "Cloud" | "Cybersecurity" | "AI & Data";
  shortDescription: string;
  overview: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced" | "Professional" | "World Class";
  estimatedHours: number;
  lessonsCount: number;
  practiceCount: number;
  projectsCount: number;
  relatedRoles: string[];
  relatedDepartments: string[];
  videos: MultiLangVideo[];
  modules: CourseModule[];
  certificateName: string;
}

export function generate12LanguageVideos(courseName: string): MultiLangVideo[] {
  const base = "https://www.youtube.com/results?search_query=";
  const enc = (q: string) => encodeURIComponent(q + " full course tutorial");
  return [
    { language: "English", languageCode: "en", flag: "🇬🇧", title: `${courseName} Full Course in English`, url: base + enc(`${courseName} in English`) },
    { language: "Hindi", languageCode: "hi", flag: "🇮🇳", title: `${courseName} Full Course in Hindi`, url: base + enc(`${courseName} in Hindi`) },
    { language: "Tamil", languageCode: "ta", flag: "🌟", title: `${courseName} Full Course in Tamil`, url: base + enc(`${courseName} in Tamil`) },
    { language: "Telugu", languageCode: "te", flag: "🌟", title: `${courseName} Full Course in Telugu`, url: base + enc(`${courseName} in Telugu`) },
    { language: "Kannada", languageCode: "kn", flag: "🌟", title: `${courseName} Full Course in Kannada`, url: base + enc(`${courseName} in Kannada`) },
    { language: "Malayalam", languageCode: "ml", flag: "🌟", title: `${courseName} Full Course in Malayalam`, url: base + enc(`${courseName} in Malayalam`) },
    { language: "Bengali", languageCode: "bn", flag: "🌟", title: `${courseName} Full Course in Bengali`, url: base + enc(`${courseName} in Bengali`) },
    { language: "Marathi", languageCode: "mr", flag: "🌟", title: `${courseName} Full Course in Marathi`, url: base + enc(`${courseName} in Marathi`) },
    { language: "Gujarati", languageCode: "gu", flag: "🌟", title: `${courseName} Full Course in Gujarati`, url: base + enc(`${courseName} in Gujarati`) },
    { language: "Punjabi", languageCode: "pa", flag: "🌟", title: `${courseName} Full Course in Punjabi`, url: base + enc(`${courseName} in Punjabi`) },
    { language: "Odia", languageCode: "or", flag: "🌟", title: `${courseName} Full Course in Odia`, url: base + enc(`${courseName} in Odia`) },
    { language: "Spanish", languageCode: "es", flag: "🇪🇸", title: `${courseName} Full Course in Spanish`, url: base + enc(`${courseName} in Spanish`) },
  ];
}

export const COURSES_CATALOG: Course[] = [
  // --- PROGRAMMING ---
  {
    id: "course-python",
    title: "Python Programming Masterclass",
    category: "Programming",
    shortDescription: "From variables and OOP to async programming, memory management, and package building.",
    overview: "Master Python programming from zero to advanced. Learn syntax, data structures, functional paradigms, OOP, generators, decorators, and building CLI tools.",
    difficulty: "Beginner",
    estimatedHours: 40,
    lessonsCount: 85,
    practiceCount: 120,
    projectsCount: 15,
    relatedRoles: ["aiml-ml-engineer", "aiml-data-scientist", "cse-backend", "aids-data-analyst"],
    relatedDepartments: ["cse", "it", "aiml", "aids", "ece", "mech", "biotech"],
    videos: generate12LanguageVideos("Python Programming"),
    certificateName: "Certified Python Master Developer",
    modules: [
      { id: "p1", title: "Python Basics & Control Flow", summary: "Variables, types, conditionals, loops, functions", topicsCount: 8, estimatedHours: 5 },
      { id: "p2", title: "Data Structures & Collections", summary: "Lists, tuples, dicts, sets, list comprehensions", topicsCount: 10, estimatedHours: 6 },
      { id: "p3", title: "Object Oriented Python", summary: "Classes, inheritance, dunder methods, polymorphism", topicsCount: 8, estimatedHours: 8 },
      { id: "p4", title: "Advanced Features & Async", summary: "Decorators, generators, context managers, asyncio", topicsCount: 10, estimatedHours: 10 }
    ]
  },
  {
    id: "course-cpp",
    title: "C++ High-Performance Systems Programming",
    category: "Programming",
    shortDescription: "Modern C++ (C++17/20), pointers, memory management, STL, and low-latency systems.",
    overview: "Deep dive into C++ syntax, memory layout, pointers, references, RAII, STL containers, move semantics, and template metaprogramming.",
    difficulty: "Intermediate",
    estimatedHours: 50,
    lessonsCount: 95,
    practiceCount: 140,
    projectsCount: 12,
    relatedRoles: ["cse-sde", "ece-embedded", "mech-robotics"],
    relatedDepartments: ["cse", "ece", "mech"],
    videos: generate12LanguageVideos("Modern C++ Programming"),
    certificateName: "Certified C++ Systems Engineer",
    modules: [
      { id: "cpp1", title: "Pointers & Memory Architecture", summary: "Stack vs heap, raw pointers, smart pointers, RAII", topicsCount: 8, estimatedHours: 10 },
      { id: "cpp2", title: "STL Containers & Iterators", summary: "Vector, map, unordered_map, priority_queue", topicsCount: 10, estimatedHours: 10 },
      { id: "cpp3", title: "Modern C++ Features & Templates", summary: "Move semantics, rvalue references, variadic templates", topicsCount: 12, estimatedHours: 15 }
    ]
  },
  {
    id: "course-rust",
    title: "Rust Systems & Memory Safety",
    category: "Programming",
    shortDescription: "Learn ownership, borrowing, lifetimes, and build lightning-fast memory-safe applications.",
    overview: "Master Rust's unique memory management without a garbage collector. Learn ownership rules, traits, cargo, async tokio, and WebAssembly.",
    difficulty: "Advanced",
    estimatedHours: 45,
    lessonsCount: 70,
    practiceCount: 90,
    projectsCount: 10,
    relatedRoles: ["cse-backend", "cse-sde", "cse-devops"],
    relatedDepartments: ["cse", "it"],
    videos: generate12LanguageVideos("Rust Programming Language"),
    certificateName: "Certified Rust Systems Specialist",
    modules: [
      { id: "r1", title: "Ownership & Borrowing", summary: "Borrow checker, references, lifetimes, slice types", topicsCount: 8, estimatedHours: 12 },
      { id: "r2", title: "Traits & Generics", summary: "Trait bounds, pattern matching, error handling", topicsCount: 10, estimatedHours: 12 }
    ]
  },

  // --- ELECTRONICS ---
  {
    id: "course-embedded-c",
    title: "Embedded C & Firmware Development",
    category: "Electronics",
    shortDescription: "Program ARM Cortex microcontrollers, GPIOs, interrupts, ADC, and communication protocols.",
    overview: "Learn bare-metal C programming for embedded systems. Master register manipulation, bitwise operations, memory-mapped I/O, UART, SPI, and I2C.",
    difficulty: "Intermediate",
    estimatedHours: 45,
    lessonsCount: 80,
    practiceCount: 110,
    projectsCount: 14,
    relatedRoles: ["ece-embedded", "ece-iot", "iot-embedded"],
    relatedDepartments: ["ece", "eee", "iot"],
    videos: generate12LanguageVideos("Embedded C Programming"),
    certificateName: "Certified Embedded Firmware Engineer",
    modules: [
      { id: "ec1", title: "Bitwise Manipulation & Registers", summary: "Bitmasks, register shift operations, volatile keyword", topicsCount: 8, estimatedHours: 8 },
      { id: "ec2", title: "Peripherals & Communication Protocols", summary: "GPIO, UART, SPI, I2C driver writing", topicsCount: 12, estimatedHours: 15 }
    ]
  },
  {
    id: "course-pcb-design",
    title: "PCB Design with KiCad Masterclass",
    category: "Electronics",
    shortDescription: "Schematic capture, PCB layout, component footprints, routing, and Gerber generation.",
    overview: "Design professional double-layer and multi-layer printed circuit boards using KiCad. Learn design rules, ground planes, decoupling, and manufacturing export.",
    difficulty: "Beginner",
    estimatedHours: 30,
    lessonsCount: 50,
    practiceCount: 60,
    projectsCount: 8,
    relatedRoles: ["ece-embedded", "ece-hardware", "eee-design"],
    relatedDepartments: ["ece", "eee"],
    videos: generate12LanguageVideos("KiCad PCB Design"),
    certificateName: "Certified PCB Design Engineer",
    modules: [
      { id: "pcb1", title: "Schematic Entry & Symbol Creation", summary: "Drawing component schematics and netlists", topicsCount: 6, estimatedHours: 8 },
      { id: "pcb2", title: "PCB Layout & Routing", summary: "Placing footprints, copper fills, routing signals", topicsCount: 10, estimatedHours: 12 }
    ]
  },

  // --- ROBOTICS ---
  {
    id: "course-ros2",
    title: "ROS 2 & Autonomous Robotics",
    category: "Robotics",
    shortDescription: "Robot Operating System 2 (ROS 2), nodes, topics, services, actions, and Gazebo simulation.",
    overview: "Build autonomous robot software using ROS 2 in Python and C++. Learn publisher/subscriber nodes, TF2 transforms, URDF modeling, SLAM navigation, and MoveIt 2.",
    difficulty: "Advanced",
    estimatedHours: 55,
    lessonsCount: 90,
    practiceCount: 100,
    projectsCount: 10,
    relatedRoles: ["mech-robotics", "mech-automation"],
    relatedDepartments: ["mech", "ece"],
    videos: generate12LanguageVideos("ROS2 Robot Operating System"),
    certificateName: "Certified ROS 2 Robotics Developer",
    modules: [
      { id: "ros1", title: "ROS 2 Nodes & Communication", summary: "Publishers, subscribers, services, parameters", topicsCount: 10, estimatedHours: 12 },
      { id: "ros2", title: "Navigation & SLAM", summary: "Nav2 stack, NavSat, costmaps, adaptive Monte Carlo", topicsCount: 12, estimatedHours: 18 }
    ]
  },

  // --- VLSI ---
  {
    id: "course-verilog-rtl",
    title: "Verilog & SystemVerilog RTL Design",
    category: "VLSI",
    shortDescription: "Design digital hardware, finite state machines, synthesizable RTL, and SystemVerilog testbenches.",
    overview: "Master Verilog HDL for ASIC and FPGA design. Learn combinational and sequential logic, FSM design, SystemVerilog assertions, and ModelSim simulation.",
    difficulty: "Intermediate",
    estimatedHours: 50,
    lessonsCount: 85,
    practiceCount: 105,
    projectsCount: 12,
    relatedRoles: ["ece-vlsi"],
    relatedDepartments: ["ece"],
    videos: generate12LanguageVideos("Verilog HDL RTL Design"),
    certificateName: "Certified VLSI RTL Design Specialist",
    modules: [
      { id: "v1", title: "Combinational & Sequential Verilog", summary: "Always blocks, assign statements, flip-flops, registers", topicsCount: 10, estimatedHours: 12 },
      { id: "v2", title: "SystemVerilog Verification", summary: "Testbench architecture, tasks, functions, coverage", topicsCount: 12, estimatedHours: 15 }
    ]
  },

  // --- BIOTECHNOLOGY ---
  {
    id: "course-bioinformatics",
    title: "Bioinformatics & Genomic Data Pipeline",
    category: "Biotechnology",
    shortDescription: "DNA sequence alignment, BLAST, Biopython, NGS data processing, and protein structure modeling.",
    overview: "Apply computational algorithms to biological sequence data. Learn BLAST searching, Needleman-Wunsch alignment, FASTQ processing, and AlphaFold structure visualization.",
    difficulty: "Intermediate",
    estimatedHours: 40,
    lessonsCount: 65,
    practiceCount: 80,
    projectsCount: 8,
    relatedRoles: ["biotech-bioinformatics", "biotech-research"],
    relatedDepartments: ["biotech", "aiml"],
    videos: generate12LanguageVideos("Bioinformatics Genomics Biopython"),
    certificateName: "Certified Bioinformatician",
    modules: [
      { id: "bio1", title: "Biopython & Sequence Analysis", summary: "FASTA parsing, GC content, motif discovery", topicsCount: 8, estimatedHours: 10 },
      { id: "bio2", title: "NGS Pipelines & Alignment", summary: "BWA alignment, SAM/BAM tools, variant calling", topicsCount: 10, estimatedHours: 12 }
    ]
  },

  // --- MECHANICAL ---
  {
    id: "course-cad-solidworks",
    title: "3D CAD Modeling with SolidWorks",
    category: "Mechanical",
    shortDescription: "Parametric 3D part modeling, assemblies, engineering drawings, and GD&T standards.",
    overview: "Master mechanical product design using SolidWorks. Learn sketch entities, extruded boss/base, revolves, complex assemblies, motion simulation, and drafting.",
    difficulty: "Beginner",
    estimatedHours: 35,
    lessonsCount: 60,
    practiceCount: 75,
    projectsCount: 10,
    relatedRoles: ["mech-cad", "mech-automation"],
    relatedDepartments: ["mech"],
    videos: generate12LanguageVideos("SolidWorks 3D CAD Design"),
    certificateName: "Certified CAD Design Specialist",
    modules: [
      { id: "cad1", title: "Part Modeling & Sketching", summary: "2D sketches, dimensions, extrusions, fillets", topicsCount: 8, estimatedHours: 8 },
      { id: "cad2", title: "Assembly & Drawings", summary: "Mates, exploded views, BOM generation, GD&T", topicsCount: 10, estimatedHours: 12 }
    ]
  },

  // --- MARINE ---
  {
    id: "course-marine-eng",
    title: "Marine Engineering & Ship Propulsion",
    category: "Marine",
    shortDescription: "Ship main engines, marine auxiliary machinery, boiler systems, and smart ship automation.",
    overview: "Learn the fundamentals of marine power plants, 2-stroke diesel marine engines, steering gear, separators, ballast systems, and maritime IoT monitoring.",
    difficulty: "Intermediate",
    estimatedHours: 45,
    lessonsCount: 70,
    practiceCount: 85,
    projectsCount: 6,
    relatedRoles: ["eee-power", "mech-control"],
    relatedDepartments: ["mech", "eee"],
    videos: generate12LanguageVideos("Marine Engineering Ship Machinery"),
    certificateName: "Certified Marine Systems Specialist",
    modules: [
      { id: "mar1", title: "Marine Diesel Engine Principles", summary: "2-stroke vs 4-stroke marine engines, fuel injection", topicsCount: 8, estimatedHours: 10 },
      { id: "mar2", title: "Ship Automation & Auxiliary Systems", summary: "Purifiers, pumps, boilers, Maritime IoT", topicsCount: 10, estimatedHours: 15 }
    ]
  },

  // --- CLOUD ---
  {
    id: "course-docker-k8s",
    title: "Docker & Kubernetes Cloud Operations",
    category: "Cloud",
    shortDescription: "Containerize applications, create Helm charts, deploy Kubernetes clusters, and scale services.",
    overview: "Master container orchestration for enterprise microservices. Learn Dockerfiles, image optimization, K8s Pods, Deployments, Services, Ingress, and HPA.",
    difficulty: "Intermediate",
    estimatedHours: 40,
    lessonsCount: 75,
    practiceCount: 95,
    projectsCount: 12,
    relatedRoles: ["cse-devops", "cse-backend", "it-cloud"],
    relatedDepartments: ["cse", "it"],
    videos: generate12LanguageVideos("Docker Kubernetes DevOps"),
    certificateName: "Certified Cloud Container Architect",
    modules: [
      { id: "dk1", title: "Docker Containerization", summary: "Images, containers, multi-stage builds, compose", topicsCount: 8, estimatedHours: 8 },
      { id: "dk2", title: "Kubernetes Orchestration", summary: "Pods, Deployments, Services, Ingress, Helm", topicsCount: 12, estimatedHours: 15 }
    ]
  },

  // --- CYBERSECURITY ---
  {
    id: "course-cybersecurity",
    title: "Web Security & Ethical Hacking",
    category: "Cybersecurity",
    shortDescription: "OWASP Top 10 vulnerabilities, web app penetration testing, Wireshark, and defensive coding.",
    overview: "Learn offensive and defensive security practices. Master SQL injection, XSS, CSRF, JWT exploitation, network packet analysis with Wireshark, and secure coding.",
    difficulty: "Intermediate",
    estimatedHours: 45,
    lessonsCount: 80,
    practiceCount: 100,
    projectsCount: 10,
    relatedRoles: ["cse-devops", "it-sysadmin", "iot-security"],
    relatedDepartments: ["cse", "it", "iot"],
    videos: generate12LanguageVideos("Ethical Hacking Web Security OWASP"),
    certificateName: "Certified Web Security Practitioner",
    modules: [
      { id: "sec1", title: "OWASP Top 10 Exploitation", summary: "SQLi, XSS, CSRF, Broken Auth, SSRF", topicsCount: 10, estimatedHours: 12 },
      { id: "sec2", title: "Network Analysis & Defense", summary: "Wireshark, Nmap, Firewalls, Hardening", topicsCount: 10, estimatedHours: 12 }
    ]
  }
];
