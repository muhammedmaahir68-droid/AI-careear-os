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
  category: "Programming" | "Electronics" | "Robotics" | "VLSI" | "Biotechnology" | "Mechanical" | "Marine" | "Cloud" | "Cybersecurity" | "AI & Data" | "DSA";
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

// ─────────────────────────────────────────────────────────────────────────────
// COURSE LEARNING FLOW (Applied to Every Course Below)
// ─────────────────────────────────────────────────────────────────────────────
// Each course follows this strict independent internal progression:
//   Learn → Code → Run → Debug → Quiz → Interview Q → Real-World App → Challenge → Project → Assessment → Certificate
// This flow happens INSIDE the course only.
// It does NOT modify the student's main Career Learning Path.
// ─────────────────────────────────────────────────────────────────────────────

export const EXTENDED_COURSES: Course[] = [

  // ─────────────────── C PROGRAMMING ───────────────────
  {
    id: "course-c",
    title: "C Programming — From Fundamentals to Systems",
    category: "Programming",
    shortDescription: "Master procedural C: pointers, memory, structures, file I/O, and OS-level programming concepts.",
    overview: "Begin from basic syntax and build up to manual memory management, pointer arithmetic, data structures in C, file handling, and interfacing with OS-level APIs. The foundational language for embedded, OS, and firmware development.",
    difficulty: "Beginner",
    estimatedHours: 45,
    lessonsCount: 90,
    practiceCount: 130,
    projectsCount: 12,
    relatedRoles: ["ece-embedded", "cse-sde", "iot-embedded"],
    relatedDepartments: ["cse", "ece", "iot", "eee"],
    certificateName: "Certified C Systems Programmer",
    videos: generate12LanguageVideos("C Programming Language"),
    modules: [
      { id: "c1", title: "Syntax, Variables & Control Flow", summary: "Data types, printf, scanf, if/else, for/while loops, switch-case", topicsCount: 8, estimatedHours: 6 },
      { id: "c2", title: "Functions & Recursion", summary: "Function definitions, call stack, recursive algorithms, stack frames", topicsCount: 8, estimatedHours: 5 },
      { id: "c3", title: "Arrays & Strings", summary: "1D/2D arrays, string functions (strcpy, strcmp, strlen), char arrays", topicsCount: 8, estimatedHours: 5 },
      { id: "c4", title: "Pointers & Memory Management", summary: "Address operator, pointer arithmetic, malloc/free, memory leaks", topicsCount: 10, estimatedHours: 8 },
      { id: "c5", title: "Structures, Unions & Enums", summary: "struct definition, typedef, nested structs, union memory layout", topicsCount: 6, estimatedHours: 4 },
      { id: "c6", title: "File I/O & System Calls", summary: "fopen/fread/fwrite, binary files, stdin/stdout/stderr, errno", topicsCount: 6, estimatedHours: 4 },
      { id: "c7", title: "Linked Lists & Dynamic Data Structures", summary: "Singly/doubly linked lists, stacks, queues implemented in C", topicsCount: 8, estimatedHours: 6 },
      { id: "c8", title: "Preprocessor, Bitwise & Low-Level Tricks", summary: "#define, macros, bitwise operators, bit manipulation patterns", topicsCount: 6, estimatedHours: 4 },
      { id: "c9", title: "Debugging & Memory Debugging Tools", summary: "GDB, Valgrind memory checks, segfault analysis, AddressSanitizer", topicsCount: 6, estimatedHours: 4 },
      { id: "c10", title: "Projects & Capstone Assessment", summary: "Mini shell, student grade system, file compression, final exam", topicsCount: 4, estimatedHours: 5 }
    ]
  },

  // ─────────────────── JAVA PROGRAMMING ───────────────────
  {
    id: "course-java",
    title: "Java Programming — OOP to Enterprise",
    category: "Programming",
    shortDescription: "OOP fundamentals, generics, collections, concurrency, Spring Boot basics, and real-world backend development.",
    overview: "Master Java syntax, object-oriented design, JVM internals, collections framework, multithreading, streams, lambdas, and entry-level Spring Boot REST APIs. The dominant enterprise and Android language.",
    difficulty: "Beginner",
    estimatedHours: 55,
    lessonsCount: 100,
    practiceCount: 145,
    projectsCount: 14,
    relatedRoles: ["cse-backend", "cse-sde", "it-developer"],
    relatedDepartments: ["cse", "it"],
    certificateName: "Certified Java Enterprise Developer",
    videos: generate12LanguageVideos("Java Programming Full Course"),
    modules: [
      { id: "j1", title: "Java Basics & JVM Architecture", summary: "Data types, JVM, JRE, JDK, compile-run cycle, classpath", topicsCount: 8, estimatedHours: 5 },
      { id: "j2", title: "OOP: Classes, Inheritance & Polymorphism", summary: "Encapsulation, inheritance, method overriding, abstract classes, interfaces", topicsCount: 10, estimatedHours: 8 },
      { id: "j3", title: "Exception Handling & I/O Streams", summary: "try/catch/finally, custom exceptions, FileInputStream, Serialization", topicsCount: 6, estimatedHours: 5 },
      { id: "j4", title: "Collections Framework & Generics", summary: "ArrayList, HashMap, LinkedList, TreeMap, Comparable, Generics<T>", topicsCount: 10, estimatedHours: 8 },
      { id: "j5", title: "Java 8+ Features: Lambdas & Streams", summary: "Functional interfaces, Stream API, Optional, method references", topicsCount: 8, estimatedHours: 6 },
      { id: "j6", title: "Multithreading & Concurrency", summary: "Thread class, Runnable, synchronized, ExecutorService, CompletableFuture", topicsCount: 8, estimatedHours: 7 },
      { id: "j7", title: "Design Patterns in Java", summary: "Singleton, Factory, Observer, Strategy, Builder, Decorator", topicsCount: 8, estimatedHours: 6 },
      { id: "j8", title: "Spring Boot REST API Basics", summary: "@RestController, @GetMapping, @PostMapping, JPA, Spring Data", topicsCount: 8, estimatedHours: 6 },
      { id: "j9", title: "Unit Testing with JUnit & Mockito", summary: "@Test, assertions, mock objects, test coverage, TDD basics", topicsCount: 6, estimatedHours: 4 },
      { id: "j10", title: "Capstone Project & Assessment", summary: "Library system, banking app, REST API backend, certification exam", topicsCount: 4, estimatedHours: 6 }
    ]
  },

  // ─────────────────── AI & ML FUNDAMENTALS ───────────────────
  {
    id: "course-aiml",
    title: "AI & Machine Learning Fundamentals",
    category: "AI & Data",
    shortDescription: "Math foundations, supervised/unsupervised learning, model evaluation, and classical ML algorithms from scratch.",
    overview: "Build real understanding of machine learning. Start with linear algebra, probability and statistics, then implement linear regression, logistic regression, decision trees, random forests, SVMs, K-means, PCA, and neural networks using scikit-learn and NumPy.",
    difficulty: "Intermediate",
    estimatedHours: 60,
    lessonsCount: 110,
    practiceCount: 160,
    projectsCount: 15,
    relatedRoles: ["aiml-ml-engineer", "aids-data-analyst", "cse-sde"],
    relatedDepartments: ["aiml", "aids", "cse"],
    certificateName: "Certified AI & ML Practitioner",
    videos: generate12LanguageVideos("Artificial Intelligence Machine Learning"),
    modules: [
      { id: "aiml1", title: "Math for ML: Linear Algebra & Probability", summary: "Vectors, matrices, eigenvalues, probability distributions, Bayes theorem", topicsCount: 10, estimatedHours: 8 },
      { id: "aiml2", title: "Data Preprocessing & Exploratory Analysis", summary: "Pandas, NumPy, missing values, normalization, feature engineering, EDA", topicsCount: 10, estimatedHours: 7 },
      { id: "aiml3", title: "Supervised Learning — Regression", summary: "Linear regression, gradient descent, cost function, polynomial regression, Ridge/Lasso", topicsCount: 10, estimatedHours: 7 },
      { id: "aiml4", title: "Supervised Learning — Classification", summary: "Logistic regression, KNN, decision trees, random forests, SVM, confusion matrix", topicsCount: 10, estimatedHours: 8 },
      { id: "aiml5", title: "Unsupervised Learning & Clustering", summary: "K-means, hierarchical clustering, DBSCAN, PCA, t-SNE, anomaly detection", topicsCount: 8, estimatedHours: 6 },
      { id: "aiml6", title: "Model Evaluation & Validation", summary: "Cross-validation, ROC-AUC, precision/recall, hyperparameter tuning, GridSearchCV", topicsCount: 8, estimatedHours: 6 },
      { id: "aiml7", title: "Neural Networks from Scratch", summary: "Perceptron, forward/backward propagation, activation functions, weight init", topicsCount: 10, estimatedHours: 8 },
      { id: "aiml8", title: "Intro to Deep Learning (Keras/TF)", summary: "Sequential API, CNN basics, Dropout, BatchNorm, callbacks, model saving", topicsCount: 8, estimatedHours: 6 },
      { id: "aiml9", title: "ML Project Pipeline & MLflow", summary: "Data → preprocess → train → evaluate → deploy pipeline, experiment tracking", topicsCount: 6, estimatedHours: 5 },
      { id: "aiml10", title: "Capstone: End-to-End ML Project", summary: "Real dataset selection, full pipeline, model card, final certification exam", topicsCount: 4, estimatedHours: 5 }
    ]
  },

  // ─────────────────── TENSORFLOW ───────────────────
  {
    id: "course-tensorflow",
    title: "TensorFlow & Keras Deep Learning",
    category: "AI & Data",
    shortDescription: "Build CNNs, RNNs, transformers, and production ML pipelines with TensorFlow 2.x and Keras.",
    overview: "From Tensor operations and automatic differentiation to CNNs for image classification, LSTMs for sequences, transfer learning with pre-trained models, TensorFlow Serving for production deployment, and TensorFlow Lite for mobile.",
    difficulty: "Advanced",
    estimatedHours: 55,
    lessonsCount: 95,
    practiceCount: 130,
    projectsCount: 14,
    relatedRoles: ["aiml-deep-learning", "aiml-ml-engineer", "aids-data-analyst"],
    relatedDepartments: ["aiml", "aids", "cse"],
    certificateName: "Certified TensorFlow Deep Learning Engineer",
    videos: generate12LanguageVideos("TensorFlow Keras Deep Learning"),
    modules: [
      { id: "tf1", title: "TensorFlow Fundamentals & Tensors", summary: "tf.Tensor, dtypes, shapes, broadcasting, eager vs graph execution", topicsCount: 8, estimatedHours: 6 },
      { id: "tf2", title: "Automatic Differentiation & GradientTape", summary: "GradientTape, custom training loops, optimizers (Adam, SGD, RMSprop)", topicsCount: 6, estimatedHours: 5 },
      { id: "tf3", title: "Keras Sequential & Functional API", summary: "Layers, loss functions, metrics, compile/fit/evaluate, model summary", topicsCount: 8, estimatedHours: 6 },
      { id: "tf4", title: "Convolutional Neural Networks (CNNs)", summary: "Conv2D, MaxPooling, BatchNorm, Dropout, image augmentation, CIFAR-10", topicsCount: 10, estimatedHours: 8 },
      { id: "tf5", title: "Recurrent Networks & LSTMs", summary: "SimpleRNN, LSTM, GRU, sequence modelling, time series forecasting", topicsCount: 8, estimatedHours: 7 },
      { id: "tf6", title: "Transfer Learning & Pre-trained Models", summary: "MobileNetV2, ResNet50, EfficientNet, fine-tuning, feature extraction", topicsCount: 8, estimatedHours: 6 },
      { id: "tf7", title: "TensorFlow Data API & tf.data", summary: "tf.data.Dataset, map/batch/prefetch, performance profiling", topicsCount: 6, estimatedHours: 4 },
      { id: "tf8", title: "TensorFlow Serving & TFLite", summary: "Saved models, TF Serving REST API, TFLite conversion, mobile deployment", topicsCount: 6, estimatedHours: 5 },
      { id: "tf9", title: "Capstone: Image Classifier + Deployment", summary: "End-to-end image classification project with deployment, exam", topicsCount: 4, estimatedHours: 5 }
    ]
  },

  // ─────────────────── PYTORCH ───────────────────
  {
    id: "course-pytorch",
    title: "PyTorch Deep Learning & Research",
    category: "AI & Data",
    shortDescription: "Dynamic computation graphs, custom layers, vision transformers, NLP with HuggingFace, and research workflows.",
    overview: "Learn PyTorch from tensors and autograd through custom Dataset/DataLoader, nn.Module architecture, GANs, attention mechanisms, and fine-tuning LLMs using the HuggingFace Transformers library. The research-first framework.",
    difficulty: "Advanced",
    estimatedHours: 58,
    lessonsCount: 100,
    practiceCount: 135,
    projectsCount: 15,
    relatedRoles: ["aiml-deep-learning", "aiml-ml-engineer", "aiml-nlp"],
    relatedDepartments: ["aiml", "aids", "cse"],
    certificateName: "Certified PyTorch Research Engineer",
    videos: generate12LanguageVideos("PyTorch Deep Learning"),
    modules: [
      { id: "pt1", title: "Tensor Operations & Autograd", summary: "Tensor creation, indexing, autograd, .grad, detach(), requires_grad", topicsCount: 8, estimatedHours: 6 },
      { id: "pt2", title: "Building nn.Module from Scratch", summary: "Linear layers, activations, forward(), custom modules, parameter inspection", topicsCount: 8, estimatedHours: 6 },
      { id: "pt3", title: "Dataset, DataLoader & Transforms", summary: "Custom Dataset class, DataLoader, torchvision.transforms, augmentation", topicsCount: 8, estimatedHours: 5 },
      { id: "pt4", title: "CNN Architecture & Computer Vision", summary: "LeNet, VGG, ResNet from scratch, skip connections, feature maps", topicsCount: 10, estimatedHours: 8 },
      { id: "pt5", title: "Attention Mechanism & Transformers", summary: "Self-attention, multi-head attention, positional encoding, ViT", topicsCount: 10, estimatedHours: 8 },
      { id: "pt6", title: "NLP with HuggingFace & Tokenizers", summary: "BERT, GPT-2 fine-tuning, tokenizer pipeline, classification, QA tasks", topicsCount: 10, estimatedHours: 8 },
      { id: "pt7", title: "GANs & Generative Models", summary: "Generator/Discriminator, DCGAN, training stability, mode collapse", topicsCount: 8, estimatedHours: 6 },
      { id: "pt8", title: "Model Export & Production (ONNX, TorchScript)", summary: "TorchScript, ONNX export, inference optimization, torch.compile", topicsCount: 6, estimatedHours: 5 },
      { id: "pt9", title: "Research Capstone & Certification", summary: "Novel model experiment, paper reproduction, final certification exam", topicsCount: 4, estimatedHours: 5 }
    ]
  },

  // ─────────────────── AI AGENTS BUILDING ───────────────────
  {
    id: "course-ai-agents",
    title: "AI Agents Building — Tool Use, Planning & Multi-Agent Systems",
    category: "AI & Data",
    shortDescription: "Build autonomous AI agents with tool calling, memory, planning loops, ReAct, LangChain, and CrewAI.",
    overview: "Design and deploy AI agents that perceive, reason, plan, and act. Learn ReAct prompting, tool-calling APIs (OpenAI/Gemini), agent memory (short-term + long-term), multi-agent orchestration with CrewAI and LangChain Agents, and evaluation strategies.",
    difficulty: "Advanced",
    estimatedHours: 50,
    lessonsCount: 85,
    practiceCount: 110,
    projectsCount: 12,
    relatedRoles: ["aiml-ml-engineer", "aiml-deep-learning", "cse-backend"],
    relatedDepartments: ["aiml", "cse", "aids"],
    certificateName: "Certified AI Agents Architect",
    videos: generate12LanguageVideos("AI Agents Building LangChain"),
    modules: [
      { id: "agt1", title: "What Are AI Agents? Architecture & Concepts", summary: "Sense-Plan-Act loop, agent types (reactive, deliberative, hybrid), LLM-powered agents", topicsCount: 8, estimatedHours: 5 },
      { id: "agt2", title: "ReAct Prompting & Chain-of-Thought", summary: "Reason+Act framework, few-shot CoT, scratchpad reasoning, self-consistency", topicsCount: 8, estimatedHours: 5 },
      { id: "agt3", title: "Tool Use & Function Calling", summary: "OpenAI function calling, Gemini tools API, tool schema design, error handling", topicsCount: 8, estimatedHours: 6 },
      { id: "agt4", title: "Agent Memory: Short-Term & Long-Term", summary: "Conversation buffers, vector store memory, episodic vs semantic memory, ChromaDB", topicsCount: 8, estimatedHours: 6 },
      { id: "agt5", title: "Building Agents with LangChain", summary: "Agent executor, tool wrappers, AgentType, custom tools, LCEL chains", topicsCount: 10, estimatedHours: 8 },
      { id: "agt6", title: "Multi-Agent Orchestration with CrewAI", summary: "Crew, Agent, Task, Process (sequential/hierarchical), delegation", topicsCount: 8, estimatedHours: 7 },
      { id: "agt7", title: "Agent Planning & Goal Decomposition", summary: "PDDL basics, task decomposition, BabyAGI/AutoGPT patterns, goal hierarchies", topicsCount: 6, estimatedHours: 5 },
      { id: "agt8", title: "Agent Evaluation & Safety", summary: "LLM-as-judge, agent benchmarks, output validation, guardrails, hallucination handling", topicsCount: 6, estimatedHours: 5 },
      { id: "agt9", title: "Capstone: Build Your Own AI Agent System", summary: "Deploy a working multi-tool agent solving a real business problem, certification", topicsCount: 4, estimatedHours: 5 }
    ]
  },

  // ─────────────────── RAG BUILDING ───────────────────
  {
    id: "course-rag",
    title: "RAG Systems — Retrieval Augmented Generation",
    category: "AI & Data",
    shortDescription: "Build production RAG pipelines: chunking, embeddings, vector databases, retrieval strategies, and LLM generation.",
    overview: "Understand why RAG exists, implement document loaders, text splitters, embedding models, vector stores (ChromaDB, Pinecone, FAISS), retrieval strategies (dense, hybrid, re-ranking), and full RAG chains with LangChain and LlamaIndex.",
    difficulty: "Advanced",
    estimatedHours: 40,
    lessonsCount: 70,
    practiceCount: 90,
    projectsCount: 10,
    relatedRoles: ["aiml-ml-engineer", "aids-data-analyst", "cse-backend"],
    relatedDepartments: ["aiml", "cse", "aids"],
    certificateName: "Certified RAG Systems Engineer",
    videos: generate12LanguageVideos("RAG Retrieval Augmented Generation LangChain"),
    modules: [
      { id: "rag1", title: "Why RAG? Knowledge Grounding for LLMs", summary: "Hallucination problem, RAG vs fine-tuning, RAG architecture overview", topicsCount: 6, estimatedHours: 4 },
      { id: "rag2", title: "Document Loading & Text Chunking", summary: "PyMuPDF, UnstructuredLoader, chunk sizes, overlap strategies, metadata", topicsCount: 8, estimatedHours: 5 },
      { id: "rag3", title: "Embeddings & Semantic Similarity", summary: "OpenAI ada-002, sentence-transformers, cosine similarity, embedding dimensionality", topicsCount: 8, estimatedHours: 5 },
      { id: "rag4", title: "Vector Stores: ChromaDB, FAISS & Pinecone", summary: "Indexing documents, similarity search, hybrid search, metadata filtering", topicsCount: 8, estimatedHours: 6 },
      { id: "rag5", title: "Retrieval Strategies & Re-ranking", summary: "MMR retrieval, BM25, cross-encoder re-ranking, HyDE, contextual compression", topicsCount: 8, estimatedHours: 6 },
      { id: "rag6", title: "RAG Chains with LangChain & LlamaIndex", summary: "RetrievalQA chain, ConversationalRetrievalChain, LlamaIndex query engine", topicsCount: 8, estimatedHours: 6 },
      { id: "rag7", title: "Evaluation: RAGAS & Trulens", summary: "Faithfulness, answer relevancy, context recall, RAGAS metrics, LLM judges", topicsCount: 6, estimatedHours: 4 },
      { id: "rag8", title: "Capstone: Production RAG App", summary: "Full-stack RAG chatbot with document upload, streaming, evaluation, certification", topicsCount: 4, estimatedHours: 5 }
    ]
  },

  // ─────────────────── AGENTIC AI BUILDING ───────────────────
  {
    id: "course-agentic-ai",
    title: "Agentic AI Systems — Advanced Autonomous AI Engineering",
    category: "AI & Data",
    shortDescription: "Design production-grade agentic systems: LangGraph state machines, human-in-the-loop, persistent memory, and multi-agent communication protocols.",
    overview: "Go beyond simple agents. Learn LangGraph for stateful agent workflows, Autogen multi-agent conversations, human-in-the-loop patterns, agent observability with LangSmith, long-running background agents, and real-world deployment patterns.",
    difficulty: "Professional",
    estimatedHours: 48,
    lessonsCount: 82,
    practiceCount: 100,
    projectsCount: 12,
    relatedRoles: ["aiml-ml-engineer", "aiml-deep-learning"],
    relatedDepartments: ["aiml", "cse"],
    certificateName: "Certified Agentic AI Systems Architect",
    videos: generate12LanguageVideos("Agentic AI LangGraph Autonomous Systems"),
    modules: [
      { id: "aai1", title: "Agentic System Architecture Patterns", summary: "Single agent vs multi-agent, orchestrator-worker, supervisor patterns, DAG workflows", topicsCount: 8, estimatedHours: 6 },
      { id: "aai2", title: "LangGraph: State Machines for Agents", summary: "StateGraph, nodes, edges, conditional routing, checkpointers, streaming", topicsCount: 10, estimatedHours: 8 },
      { id: "aai3", title: "Human-in-the-Loop & Interrupt Patterns", summary: "Interrupt before/after node, approval workflows, user feedback loops", topicsCount: 6, estimatedHours: 5 },
      { id: "aai4", title: "Persistent Agent Memory & State", summary: "Thread-level persistence, cross-session memory, Postgres/Redis checkpointers", topicsCount: 8, estimatedHours: 6 },
      { id: "aai5", title: "Autogen Multi-Agent Conversations", summary: "AssistantAgent, UserProxyAgent, GroupChat, custom speaker selection", topicsCount: 8, estimatedHours: 7 },
      { id: "aai6", title: "Agent Observability with LangSmith", summary: "Tracing, logging, evaluation, debugging agent runs, dataset creation", topicsCount: 6, estimatedHours: 4 },
      { id: "aai7", title: "Production Deployment of Agentic APIs", summary: "FastAPI + LangGraph server, async execution, background tasks, rate limiting", topicsCount: 6, estimatedHours: 5 },
      { id: "aai8", title: "Capstone: Production Agentic App", summary: "Deploy a stateful multi-agent system solving a domain problem, certification", topicsCount: 4, estimatedHours: 5 }
    ]
  },

  // ─────────────────── DSA ───────────────────
  {
    id: "course-dsa",
    title: "Data Structures & Algorithms — Interview Mastery",
    category: "Programming",
    shortDescription: "Arrays to advanced graphs, dynamic programming, system design patterns, and MNC coding interview preparation.",
    overview: "Comprehensive DSA course covering all major data structures, algorithmic paradigms, complexity analysis, and problem-solving patterns. Mapped to Google, Microsoft, Amazon, Meta, and Flipkart interview standards with 500+ curated practice problems.",
    difficulty: "Intermediate",
    estimatedHours: 80,
    lessonsCount: 150,
    practiceCount: 500,
    projectsCount: 10,
    relatedRoles: ["cse-backend", "cse-sde", "aiml-ml-engineer"],
    relatedDepartments: ["cse", "it", "aiml"],
    certificateName: "Certified DSA Interview Master",
    videos: generate12LanguageVideos("Data Structures Algorithms Interview Preparation"),
    modules: [
      { id: "dsa1", title: "Complexity Analysis: Time & Space", summary: "Big-O, Big-Omega, amortized analysis, best/worst/average case, recursion trees", topicsCount: 8, estimatedHours: 5 },
      { id: "dsa2", title: "Arrays, Strings & Two Pointers", summary: "Sliding window, kadane's algorithm, prefix sums, two pointers, sorting tricks", topicsCount: 12, estimatedHours: 8 },
      { id: "dsa3", title: "Linked Lists", summary: "Singly/doubly/circular, fast-slow pointers, reversal, merge, cycle detection", topicsCount: 10, estimatedHours: 6 },
      { id: "dsa4", title: "Stacks, Queues & Monotonic Structures", summary: "Stack applications, monotonic stack, deque, BFS queue, priority queue patterns", topicsCount: 10, estimatedHours: 6 },
      { id: "dsa5", title: "Trees & Binary Search Trees", summary: "Traversals, height, diameter, LCA, BST operations, AVL/Red-Black intro", topicsCount: 12, estimatedHours: 8 },
      { id: "dsa6", title: "Heaps & Priority Queues", summary: "Min-heap, max-heap, heap sort, top-K problems, median maintenance", topicsCount: 8, estimatedHours: 5 },
      { id: "dsa7", title: "Hashing & Hash Maps", summary: "Collision handling, open addressing, hash functions, frequency counting patterns", topicsCount: 8, estimatedHours: 5 },
      { id: "dsa8", title: "Graphs: BFS, DFS, Shortest Paths", summary: "Adjacency list/matrix, BFS/DFS, Dijkstra, Bellman-Ford, Floyd-Warshall, Union-Find", topicsCount: 12, estimatedHours: 10 },
      { id: "dsa9", title: "Dynamic Programming Patterns", summary: "Memoization, tabulation, 0/1 knapsack, LCS, LIS, matrix DP, DP on trees", topicsCount: 14, estimatedHours: 12 },
      { id: "dsa10", title: "Greedy Algorithms & Backtracking", summary: "Activity selection, Huffman coding, N-Queens, permutations, subset generation", topicsCount: 10, estimatedHours: 7 },
      { id: "dsa11", title: "Tries, Segment Trees & Advanced Structures", summary: "Trie for prefix search, segment tree for range queries, Fenwick tree, sparse table", topicsCount: 10, estimatedHours: 7 },
      { id: "dsa12", title: "Mock Contests & Certification Exam", summary: "LeetCode-style timed contests, company-wise problem sets, final DSA certification", topicsCount: 4, estimatedHours: 5 }
    ]
  },

  // ─────────────────── HR MANAGEMENT ───────────────────
  {
    id: "course-hr-management",
    title: "HR Management & People Analytics",
    category: "AI & Data",
    shortDescription: "Talent acquisition, performance management, workforce analytics, HR tech, and organizational behavior fundamentals.",
    overview: "Learn modern human resources management: recruitment funnels, onboarding, performance appraisal frameworks, compensation structures, HR analytics using Excel and Python, employment law basics, and AI-powered HR tools.",
    difficulty: "Beginner",
    estimatedHours: 35,
    lessonsCount: 65,
    practiceCount: 80,
    projectsCount: 8,
    relatedRoles: ["aids-data-analyst"],
    relatedDepartments: ["aids", "it"],
    certificateName: "Certified HR Analytics Professional",
    videos: generate12LanguageVideos("HR Management People Analytics"),
    modules: [
      { id: "hr1", title: "HR Fundamentals & Organizational Structure", summary: "HR roles, org charts, culture, employee lifecycle, HR vs People Ops", topicsCount: 6, estimatedHours: 4 },
      { id: "hr2", title: "Talent Acquisition & Recruitment Funnels", summary: "JD writing, sourcing strategies, ATS, structured interviews, offer management", topicsCount: 8, estimatedHours: 5 },
      { id: "hr3", title: "Performance Management Frameworks", summary: "KRA/KPI, OKRs, 360 reviews, appraisal cycles, PIP design", topicsCount: 8, estimatedHours: 5 },
      { id: "hr4", title: "Compensation, Benefits & Grading", summary: "Pay bands, salary benchmarking, variable pay, ESOPs, benefits admin", topicsCount: 6, estimatedHours: 4 },
      { id: "hr5", title: "HR Analytics with Excel & Python", summary: "Attrition prediction, headcount planning, turnover analysis, HR dashboards", topicsCount: 8, estimatedHours: 6 },
      { id: "hr6", title: "Employment Law & Compliance Basics", summary: "Labour Act basics, POSH, PF/ESI, contract types, termination norms (India-focused)", topicsCount: 6, estimatedHours: 4 },
      { id: "hr7", title: "AI in HR: Tools, Bias & Ethics", summary: "Resume screening AI, bias in hiring algorithms, AI ethics in people decisions", topicsCount: 6, estimatedHours: 4 },
      { id: "hr8", title: "Capstone: HR Analytics Case Study", summary: "Full HR analytics project + report presentation + certification exam", topicsCount: 4, estimatedHours: 5 }
    ]
  },

  // ─────────────────── DATA ANALYTICS USING GEN AI ───────────────────
  {
    id: "course-data-analytics-genai",
    title: "Data Analytics Using Generative AI",
    category: "AI & Data",
    shortDescription: "Use LLMs, GenAI tools, and natural language to explore, analyze, visualize, and explain data — without writing traditional code.",
    overview: "Combine traditional data analytics (Pandas, SQL, Excel, Power BI) with generative AI tools (ChatGPT Code Interpreter, Gemini Advanced, Julius AI, Claude for analysis). Learn prompt engineering for data tasks, AI-generated dashboards, and automated insights reporting.",
    difficulty: "Intermediate",
    estimatedHours: 40,
    lessonsCount: 72,
    practiceCount: 90,
    projectsCount: 10,
    relatedRoles: ["aids-data-analyst", "aiml-ml-engineer"],
    relatedDepartments: ["aids", "aiml", "cse"],
    certificateName: "Certified GenAI Data Analyst",
    videos: generate12LanguageVideos("Data Analytics Generative AI Python"),
    modules: [
      { id: "dag1", title: "Data Analytics Foundations with Pandas & SQL", summary: "DataFrames, groupby, merge, SQL JOINs, aggregations, pivot tables", topicsCount: 8, estimatedHours: 6 },
      { id: "dag2", title: "Prompt Engineering for Data Tasks", summary: "Structuring data prompts, context injection, asking LLMs to analyze CSV/JSON", topicsCount: 8, estimatedHours: 5 },
      { id: "dag3", title: "ChatGPT & Gemini for Data Exploration", summary: "Code Interpreter for EDA, asking follow-up questions, iterative analysis", topicsCount: 8, estimatedHours: 5 },
      { id: "dag4", title: "Data Visualization with AI Assistance", summary: "Matplotlib, Seaborn, Plotly — generated by LLMs + explanation", topicsCount: 8, estimatedHours: 5 },
      { id: "dag5", title: "Building AI-Powered Analytics Pipelines", summary: "LangChain data agents, Pandas AI, natural language to SQL (NL2SQL)", topicsCount: 8, estimatedHours: 6 },
      { id: "dag6", title: "Automated Insights & Report Generation", summary: "LLM-generated executive summaries, PDF reports, Streamlit dashboards", topicsCount: 8, estimatedHours: 5 },
      { id: "dag7", title: "Ethics, Hallucination & Verification in AI Analytics", summary: "Validating AI-generated insights, bias in data, responsible analytics", topicsCount: 6, estimatedHours: 4 },
      { id: "dag8", title: "Capstone: Business Intelligence Project", summary: "Full dataset analysis using GenAI tools, automated dashboard, certification", topicsCount: 4, estimatedHours: 5 }
    ]
  },

  // ─────────────────── DATA SCIENCE ───────────────────
  {
    id: "course-data-science",
    title: "Data Science — End-to-End Mastery",
    category: "AI & Data",
    shortDescription: "Statistics, Python, machine learning, feature engineering, model deployment, and real-world data science project execution.",
    overview: "Become a data scientist. Master statistical inference, data wrangling with Pandas, visualization with Seaborn/Plotly, ML modeling with scikit-learn, experiment tracking with MLflow, and deploying models as REST APIs using FastAPI and Streamlit.",
    difficulty: "Intermediate",
    estimatedHours: 65,
    lessonsCount: 115,
    practiceCount: 160,
    projectsCount: 16,
    relatedRoles: ["aids-data-scientist", "aiml-ml-engineer", "aids-data-analyst"],
    relatedDepartments: ["aids", "aiml", "cse"],
    certificateName: "Certified Data Science Professional",
    videos: generate12LanguageVideos("Data Science Python Machine Learning"),
    modules: [
      { id: "ds1", title: "Statistics & Probability for Data Science", summary: "Descriptive stats, probability distributions, CLT, hypothesis testing, p-values", topicsCount: 10, estimatedHours: 7 },
      { id: "ds2", title: "Python for Data Science: NumPy & Pandas", summary: "Arrays, DataFrames, groupby, merge, time series, handling missing data", topicsCount: 10, estimatedHours: 7 },
      { id: "ds3", title: "Data Visualization Mastery", summary: "Matplotlib, Seaborn, Plotly Express, correlation heatmaps, dashboards", topicsCount: 8, estimatedHours: 6 },
      { id: "ds4", title: "Exploratory Data Analysis & Feature Engineering", summary: "Outlier detection, skewness, encoding categorical, feature scaling, selection", topicsCount: 10, estimatedHours: 7 },
      { id: "ds5", title: "Classical ML Models & Pipelines", summary: "Linear/logistic regression, trees, ensembles, cross-validation, pipelines", topicsCount: 10, estimatedHours: 7 },
      { id: "ds6", title: "Advanced Modeling: XGBoost, LightGBM, Stacking", summary: "Gradient boosting mechanics, hyperparameter tuning, blending and stacking", topicsCount: 8, estimatedHours: 6 },
      { id: "ds7", title: "Time Series Analysis & Forecasting", summary: "ARIMA, SARIMA, Prophet, feature-based forecasting, seasonality decomposition", topicsCount: 8, estimatedHours: 6 },
      { id: "ds8", title: "NLP Basics for Data Scientists", summary: "TF-IDF, word embeddings, text classification, sentiment analysis with sklearn", topicsCount: 8, estimatedHours: 6 },
      { id: "ds9", title: "Model Deployment: FastAPI + Streamlit", summary: "REST API wrapping a model, Streamlit web app, Dockerization, Render/HF Spaces", topicsCount: 8, estimatedHours: 6 },
      { id: "ds10", title: "Experiment Tracking & MLOps Basics", summary: "MLflow, model registry, data versioning (DVC), reproducibility best practices", topicsCount: 6, estimatedHours: 5 },
      { id: "ds11", title: "Capstone: Full Data Science Project", summary: "End-to-end project from problem definition to deployed API, certification exam", topicsCount: 4, estimatedHours: 5 }
    ]
  },

  // ─────────────────── CLOUD COMPUTING ───────────────────
  {
    id: "course-cloud-computing",
    title: "Cloud Computing — AWS, Azure & GCP Mastery",
    category: "Cloud",
    shortDescription: "Cloud fundamentals, compute/storage/network services, serverless, containers, IaC with Terraform, and multi-cloud architecture.",
    overview: "Build a strong cloud engineering foundation. Start with cloud concepts (IaaS/PaaS/SaaS), master AWS core services (EC2, S3, RDS, Lambda, VPC, IAM), explore Azure and GCP equivalents, deploy containerized applications on EKS, implement IaC with Terraform, and design highly available multi-tier architectures.",
    difficulty: "Intermediate",
    estimatedHours: 60,
    lessonsCount: 105,
    practiceCount: 140,
    projectsCount: 15,
    relatedRoles: ["cse-devops", "it-cloud", "cse-backend"],
    relatedDepartments: ["cse", "it"],
    certificateName: "Certified Multi-Cloud Architect",
    videos: generate12LanguageVideos("Cloud Computing AWS Azure GCP"),
    modules: [
      { id: "cc1", title: "Cloud Fundamentals: IaaS, PaaS, SaaS & Models", summary: "Cloud deployment models, shared responsibility model, cloud economics, CapEx vs OpEx", topicsCount: 8, estimatedHours: 5 },
      { id: "cc2", title: "AWS Core: EC2, S3, IAM & VPC", summary: "Instance types, S3 storage classes, IAM roles/policies, VPC subnets, security groups", topicsCount: 12, estimatedHours: 9 },
      { id: "cc3", title: "AWS Database Services: RDS, DynamoDB & Aurora", summary: "Managed relational DBs, NoSQL with DynamoDB, read replicas, Multi-AZ", topicsCount: 8, estimatedHours: 6 },
      { id: "cc4", title: "Serverless: Lambda, API Gateway & Event-Driven", summary: "Lambda triggers, API Gateway REST/HTTP, EventBridge, SQS, SNS patterns", topicsCount: 8, estimatedHours: 6 },
      { id: "cc5", title: "Containers on AWS: ECS, EKS & ECR", summary: "Docker on ECS Fargate, EKS cluster setup, ECR image registry, Helm charts", topicsCount: 8, estimatedHours: 7 },
      { id: "cc6", title: "Infrastructure as Code with Terraform", summary: "HCL syntax, providers, resources, modules, state management, remote backend", topicsCount: 10, estimatedHours: 8 },
      { id: "cc7", title: "Cloud Security & Compliance", summary: "IAM least privilege, GuardDuty, CloudTrail, KMS encryption, compliance frameworks", topicsCount: 8, estimatedHours: 6 },
      { id: "cc8", title: "Azure & GCP: Core Services Comparison", summary: "Azure VMs/AKS/Blob, GCP Compute Engine/GKE/BigQuery, multi-cloud strategy", topicsCount: 8, estimatedHours: 6 },
      { id: "cc9", title: "Cloud Monitoring: CloudWatch, Prometheus & Grafana", summary: "Metrics, logs, alarms, dashboards, distributed tracing with X-Ray", topicsCount: 6, estimatedHours: 4 },
      { id: "cc10", title: "Capstone: Deploy a 3-Tier Cloud App", summary: "Full multi-tier app on AWS with Terraform IaC, auto-scaling, monitoring, certification", topicsCount: 4, estimatedHours: 5 }
    ]
  }

];

// ─────────────────── FULL MERGED CATALOG EXPORT ───────────────────
export const ALL_COURSES: Course[] = [...COURSES_CATALOG, ...EXTENDED_COURSES];
