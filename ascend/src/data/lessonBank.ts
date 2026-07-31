// Comprehensive Lesson Syllabus Bank for AI Career OS
// Organized by Branch (CSE, IT, AIML, AIDS, ECE, EEE, MECH, Universal) and Level (1 to 10)
// Each level lesson contains theory, key formulas/syntax, worked examples, placement tips, and linked questions.

export interface TopicLesson {
  id: string;
  topicName: string;
  theory: string[];
  keyFormulasOrSyntax: string;
  exampleProblem: {
    problem: string;
    solution: string;
  };
  placementTip: string;
  linkedQuestionIds: string[];
}

export interface LevelSyllabusLesson {
  id: string;
  branch: "universal" | "cse" | "it" | "aiml" | "aids" | "ece" | "eee" | "mech";
  level: number; // Level 1 to 10
  title: string;
  description: string;
  topics: TopicLesson[];
}

export const LESSON_BANK: LevelSyllabusLesson[] = [
  // ─── UNIVERSAL LEVEL 1: QUANTITATIVE & APTITUDE MASTERCLASS ───
  {
    id: "univ-l1-aptitude",
    branch: "universal",
    level: 1,
    title: "Level 1: Quantitative Aptitude & Number Systems",
    description: "Core numerical ability, divisibility rules, percentages, and basic algebra required by all top MNC recruitment tests.",
    topics: [
      {
        id: "apt-l1-numsys",
        topicName: "Number System & Cyclicity",
        theory: [
          "Every number raised to increasing powers repeats its unit digit in cycles (cyclicity).",
          "Cyclicity of 2: 2, 4, 8, 6 (Period 4)",
          "Cyclicity of 3: 3, 9, 7, 1 (Period 4)",
          "Cyclicity of 7: 7, 9, 3, 1 (Period 4)",
          "To find the unit digit of N^P, compute exponent mod period: rem = P % 4 (if rem == 0, power is 4)."
        ],
        keyFormulasOrSyntax: "UnitDigit(N^P) = N^(P mod 4)   [Note: P % 4 == 0 => use 4]",
        exampleProblem: {
          problem: "Find the unit digit of 7^105.",
          solution: "Exponent = 105. 105 mod 4 = 1. Therefore, unit digit of 7^105 is 7^1 = 7."
        },
        placementTip: "Asked in TCS NQT, Wipro NTH, and Accenture First Round online tests.",
        linkedQuestionIds: ["apt-01", "apt-02"]
      },
      {
        id: "apt-l1-percentages",
        topicName: "Percentages, Averages & Ratios",
        theory: [
          "Percentage = (Part / Whole) × 100.",
          "Net change after successive % changes of x% and y% is: Net % = x + y + (x * y)/100.",
          "Weighted Average = (w1*x1 + w2*x2 + ... + wn*xn) / (w1 + w2 + ... + wn)."
        ],
        keyFormulasOrSyntax: "CP = SP / (1 + Profit%),   Net Change % = A + B + (AB / 100)",
        exampleProblem: {
          problem: "If price increases by 20% then decreases by 20%, what is the net change?",
          solution: "Net % = +20 - 20 + (20 * -20)/100 = 0 - 4 = -4% (a 4% decrease)."
        },
        placementTip: "Master successive percentage formulas to solve 30-second quant questions without long calculations.",
        linkedQuestionIds: ["apt-02", "apt-03"]
      }
    ]
  },

  // ─── CSE & IT LEVEL 1-3: DATA STRUCTURES & ALGORITHMS MASTERCLASS ───
  {
    id: "cse-l1-dsa",
    branch: "cse",
    level: 1,
    title: "Level 1: Arrays, Strings & Hashing Foundations",
    description: "Fundamental data structures, memory layout, indexing, and time-complexity optimization.",
    topics: [
      {
        id: "dsa-l1-arrays",
        topicName: "Arrays & Contiguous Memory Allocation",
        theory: [
          "Arrays store elements in contiguous memory slots.",
          "Random access by index takes O(1) time because target address = BaseAddress + index * ElementSize.",
          "Linear search takes O(N) time. Binary search on sorted arrays takes O(log N) time."
        ],
        keyFormulasOrSyntax: "Address(arr[i]) = Base_Addr + i * sizeof(type)\nComplexity: Search O(N), Indexing O(1)",
        exampleProblem: {
          problem: "Why is accessing arr[500] in a 10,000 element array O(1)?",
          solution: "The CPU calculates memory offset directly: base + 500 * sizeof(element), skipping traversal."
        },
        placementTip: "Interviewers frequently ask why array insertion at middle is O(N) (requires element shifting).",
        linkedQuestionIds: ["dsa-01", "dsa-02"]
      },
      {
        id: "dsa-l1-hashing",
        topicName: "Hash Tables & Two Pointer Technique",
        theory: [
          "Hash Tables map keys to values using a hash function, providing O(1) average lookup time.",
          "Two Sum problem: Given array and target, check if (target - num) exists in hash set while iterating.",
          "Sliding Window technique optimizes substring and subarray problems from O(N^2) to O(N)."
        ],
        keyFormulasOrSyntax: "target - current_element = required_complement\nHashMap lookup: O(1) average",
        exampleProblem: {
          problem: "Given nums = [2, 7, 11, 15], target = 9. Find indices.",
          solution: "At i=0 (val 2), look for 9 - 2 = 7 (not in hash map yet, insert {2: 0}). At i=1 (val 7), complement 2 exists at index 0. Return [0, 1]."
        },
        placementTip: "Always mention space-time trade-off: Hash maps trade O(N) memory to lower time from O(N^2) to O(N).",
        linkedQuestionIds: ["dsa-02", "dsa-03"]
      }
    ]
  },

  {
    id: "cse-l2-trees-graphs",
    branch: "cse",
    level: 2,
    title: "Level 2: Trees, Graphs & Dynamic Programming",
    description: "Advanced non-linear data structures, binary trees, graph traversals, and memoization techniques.",
    topics: [
      {
        id: "dsa-l2-trees",
        topicName: "Binary Trees & BST Traversals",
        theory: [
          "Binary Search Tree (BST) property: Left child < Node < Right child.",
          "In-order traversal (Left, Root, Right) of a BST ALWAYS yields sorted ascending output.",
          "Pre-order traversal (Root, Left, Right) is used for tree serialization.",
          "Post-order traversal (Left, Right, Root) is used for tree deletion."
        ],
        keyFormulasOrSyntax: "InOrder(BST) => Sorted List\nTime: O(H) search where H is tree height (O(log N) balanced, O(N) skewed)",
        exampleProblem: {
          problem: "Which traversal of BST [4, 2, 6, 1, 3] gives [1, 2, 3, 4, 6]?",
          solution: "In-order traversal."
        },
        placementTip: "Be ready to implement tree height and mirror binary tree recursively in online coding tests.",
        linkedQuestionIds: ["dsa-04", "dsa-05"]
      },
      {
        id: "dsa-l2-graphs",
        topicName: "Graph Algorithms & Shortest Paths",
        theory: [
          "BFS (Breadth-First Search) uses a Queue (FIFO) to find shortest path in unweighted graphs.",
          "DFS (Depth-First Search) uses a Stack (LIFO) or recursion for pathfinding and cycle detection.",
          "Dijkstra's Algorithm finds shortest path with non-negative edge weights using a Priority Queue in O((V + E) log V).",
          "Bellman-Ford handles negative weight edges and detects negative cycles in O(V * E)."
        ],
        keyFormulasOrSyntax: "Dijkstra: O((V + E) log V) with Min-Heap\nBellman-Ford: O(V * E)",
        exampleProblem: {
          problem: "Why does Dijkstra's algorithm fail on negative edge weights?",
          solution: "Dijkstra assumes adding an edge only increases total distance (greedy choice property). A negative edge invalidates already finalized shortest distances."
        },
        placementTip: "Crucial for MAANG system design and algorithmic rounds (Google, Amazon, Meta).",
        linkedQuestionIds: ["dsa-06", "dsa-07"]
      }
    ]
  },

  // ─── AIML & AIDS LEVEL 1-3: MACHINE LEARNING & AI MASTERCLASS ───
  {
    id: "aiml-l1-foundations",
    branch: "aiml",
    level: 1,
    title: "Level 1: AI & Machine Learning Core Principles",
    description: "Supervised vs unsupervised learning, regression metrics, and bias-variance tradeoff.",
    topics: [
      {
        id: "aiml-l1-regression",
        topicName: "Supervised Learning & Regression Metrics",
        theory: [
          "Supervised learning trains models on labeled datasets (X, y).",
          "Linear Regression models relationship: y = W^T * X + b.",
          "Mean Squared Error (MSE) = (1/N) * sum((y_actual - y_pred)^2).",
          "R2 Score (Coefficient of Determination) measures percentage of variance explained by model (1.0 is perfect)."
        ],
        keyFormulasOrSyntax: "MSE = (1/N) * Σ(y - ŷ)^2,   R² = 1 - (SS_res / SS_tot)",
        exampleProblem: {
          problem: "Calculate MSE for actual = [3, -0.5, 2, 7] and predicted = [2.5, 0.0, 2, 8].",
          solution: "Errors: [0.5, -0.5, 0, -1.0]. Squared errors: [0.25, 0.25, 0, 1.0]. Sum = 1.5. MSE = 1.5 / 4 = 0.375."
        },
        placementTip: "Expect questions on how to prevent overfitting (L1 Lasso, L2 Ridge regularization).",
        linkedQuestionIds: ["aiml-01", "aiml-02"]
      },
      {
        id: "aiml-l1-deeplearning",
        topicName: "Neural Networks & Backpropagation",
        theory: [
          "Artificial Neural Networks pass activations through layered weight matrices.",
          "Activation functions (ReLU, Sigmoid, Softmax) introduce non-linearity.",
          "Vanishing Gradient Problem occurs when small derivative values (<1) degrade gradients in deep networks during backprop, causing early layers to freeze."
        ],
        keyFormulasOrSyntax: "ReLU(x) = max(0, x)\nSoftmax(z_i) = exp(z_i) / Σ exp(z_k)",
        exampleProblem: {
          problem: "How does ReLU solve the Vanishing Gradient problem compared to Sigmoid?",
          solution: "The derivative of ReLU for x > 0 is constant 1.0, preventing gradient decay during backpropagation."
        },
        placementTip: "Popular interview topic for ML Engineer roles at NVIDIA, Microsoft, and Google.",
        linkedQuestionIds: ["aiml-02", "aiml-03"]
      }
    ]
  },

  // ─── ECE LEVEL 1-2: HARDWARE & EMBEDDED MASTERCLASS ───
  {
    id: "ece-l1-embedded",
    branch: "ece",
    level: 1,
    title: "Level 1: Embedded Systems & Communication Protocols",
    description: "Serial communication, microcontrollers, digital logic, and hardware interfacing.",
    topics: [
      {
        id: "ece-l1-i2c-spi",
        topicName: "Serial Protocols: I2C, SPI & UART",
        theory: [
          "I2C (Inter-Integrated Circuit) uses 2 wires: SDA (Serial Data) and SCL (Serial Clock). Multi-master support with 7-bit/10-bit addressing.",
          "SPI (Serial Peripheral Interface) uses 4 wires: MOSI, MISO, SCK, CS/SS. Full-duplex synchronous communication.",
          "UART (Universal Asynchronous Receiver-Transmitter) uses 2 wires (Tx, Rx) with start/stop bits and configurable baud rate."
        ],
        keyFormulasOrSyntax: "I2C: SDA + SCL (Pull-up resistors required)\nSPI: Full Duplex, Higher Speed than I2C",
        exampleProblem: {
          problem: "Which protocol is ideal when connecting multiple sensor chips with minimum pin count?",
          solution: "I2C, because it uses only 2 bus wires (SDA and SCL) regardless of the number of slave sensors."
        },
        placementTip: "Standard written round question for Texas Instruments, Qualcomm, and Bosch Embedded roles.",
        linkedQuestionIds: ["ece-01", "ece-02"]
      }
    ]
  },

  // ─── EEE LEVEL 1-2: ELECTRICAL CIRCUITS & CONTROL SYSTEMS ───
  {
    id: "eee-l1-circuits",
    branch: "eee",
    level: 1,
    title: "Level 1: Electric Circuit Theory & Power Systems",
    description: "Kirchhoff's laws, AC circuits, transformers, and power factor correction.",
    topics: [
      {
        id: "eee-l1-kcl-kvl",
        topicName: "Kirchhoff's Laws & Network Theorems",
        theory: [
          "KCL (Kirchhoff's Current Law): Sum of currents entering a node equals sum of currents leaving (Conservation of Charge).",
          "KVL (Kirchhoff's Voltage Law): Algebraic sum of potential differences around any closed loop is zero (Conservation of Energy).",
          "Thevenin's Theorem reduces linear network to single voltage source Vth in series with resistance Rth."
        ],
        keyFormulasOrSyntax: "Σ I_in = Σ I_out,   Σ V = 0,   P = V * I * cos(φ)",
        exampleProblem: {
          problem: "Two resistors 6Ω and 3Ω are in parallel connected across a 12V battery. Find total current.",
          solution: "R_eq = (6 * 3) / (6 + 3) = 18 / 9 = 2Ω. Total Current I = V / R = 12 / 2 = 6A."
        },
        placementTip: "Essential for core electrical engineering roles at L&T, Schneider, Siemens, and PowerGrid.",
        linkedQuestionIds: ["eee-01", "eee-02"]
      }
    ]
  },

  // ─── MECH LEVEL 1-2: MECHATRONICS & CONTROL SYSTEMS ───
  {
    id: "mech-l1-robotics",
    branch: "mech",
    level: 1,
    title: "Level 1: Mechatronics, PID Controllers & Robotics",
    description: "Thermodynamics fundamentals, PID feedback loops, actuators, and mechanical automation.",
    topics: [
      {
        id: "mech-l1-pid",
        topicName: "PID Controller Dynamics & Tuning",
        theory: [
          "Proportional (P): Output is proportional to current error. Higher gain reduces steady-state error but increases overshoot.",
          "Integral (I): Integrates past error over time, completely eliminating steady-state error.",
          "Derivative (D): Predicts future error rate of change (de/dt), providing damping to stabilize system and reduce overshoot."
        ],
        keyFormulasOrSyntax: "u(t) = Kp*e(t) + Ki * ∫e(t)dt + Kd * (de/dt)",
        exampleProblem: {
          problem: "What happens if Derivative gain (Kd) is set too high?",
          solution: "It amplifies high-frequency measurement noise, causing actuator chatter and instability."
        },
        placementTip: "Core topic for automation roles at Tesla, Fanuc, ABB, and Tata Motors.",
        linkedQuestionIds: ["mech-01", "mech-02"]
      }
    ]
  }
];

// Helper to retrieve lesson syllabus by branch and level
export function getLessonSyllabus(branch: string, level: number): LevelSyllabusLesson | undefined {
  return LESSON_BANK.find(
    l => (l.branch === branch || l.branch === "universal") && l.level === level
  ) || LESSON_BANK.find(l => l.level === level) || LESSON_BANK[0];
}
