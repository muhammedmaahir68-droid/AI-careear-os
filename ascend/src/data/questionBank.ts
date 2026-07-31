// Question Bank Dataset for AI Career OS
// Categorized by difficulty, module, topic, branch, and company tags.

export type QuestionDifficulty = "beginner" | "easy" | "medium" | "hard" | "expert";
export type QuestionType = "mcq" | "coding" | "debug" | "fill_blank";

export interface QuestionItem {
  id: string;
  module: string;
  topic: string;
  branch?: string[]; // e.g. ["cse", "it", "aiml"] or undefined for universal
  difficulty: QuestionDifficulty;
  type: QuestionType;
  prompt: string;
  codeSnippet?: string;
  options: string[];
  correctAnswer: number; // 0-based index of correct option
  explanation: string;
  companyTags?: string[]; // e.g. ["TCS", "Infosys", "Google", "Amazon"]
}

export const QUESTION_BANK: QuestionItem[] = [
  // ─── APTITUDE & QUANTITATIVE REASONING (Universal) ───
  {
    id: "apt-01",
    module: "Aptitude",
    topic: "Number System",
    difficulty: "beginner",
    type: "mcq",
    prompt: "What is the unit digit of 7^105?",
    options: ["1", "3", "7", "9"],
    correctAnswer: 2,
    explanation: "The unit digits of powers of 7 follow a cycle of 4: 7, 9, 3, 1. Since 105 mod 4 = 1, the unit digit is 7^1 = 7.",
    companyTags: ["TCS", "Wipro", "Infosys"]
  },
  {
    id: "apt-02",
    module: "Aptitude",
    topic: "Percentages & Averages",
    difficulty: "easy",
    type: "mcq",
    prompt: "A student scores 60% in an exam of 500 marks and another student scores 75% in an exam of 400 marks. What is their combined average percentage?",
    options: ["65%", "66.67%", "67.5%", "70%"],
    correctAnswer: 1,
    explanation: "Student 1 score = 300/500. Student 2 score = 300/400. Total marks scored = 600 out of 900. Percentage = (600/900)*100 = 66.67%.",
    companyTags: ["Accenture", "Cognizant"]
  },
  {
    id: "apt-03",
    module: "Aptitude",
    topic: "Profit & Loss",
    difficulty: "medium",
    type: "mcq",
    prompt: "If selling an item for ₹840 yields a profit of 20%, what is the cost price?",
    options: ["₹680", "₹700", "₹720", "₹750"],
    correctAnswer: 1,
    explanation: "Cost Price = Selling Price / (1 + Profit%). CP = 840 / 1.20 = ₹700.",
    companyTags: ["TCS NQT", "Capgemini"]
  },
  {
    id: "apt-04",
    module: "Aptitude",
    topic: "Time & Work",
    difficulty: "medium",
    type: "mcq",
    prompt: "A can complete a job in 12 days and B in 18 days. If they work together for 4 days, what fraction of the work remains?",
    options: ["1/9", "4/9", "5/9", "2/3"],
    correctAnswer: 1,
    explanation: "A's 1-day work = 1/12, B's 1-day work = 1/18. Combined 1-day = 5/36. In 4 days, work done = 20/36 = 5/9. Remaining = 1 - 5/9 = 4/9.",
    companyTags: ["Infosys", "Zoho"]
  },
  {
    id: "apt-05",
    module: "Aptitude",
    topic: "Permutation & Combination",
    difficulty: "hard",
    type: "mcq",
    prompt: "In how many ways can the letters of the word 'PLACEMENT' be arranged so that vowels always come together?",
    options: ["15,120", "30,240", "7,560", "60,480"],
    correctAnswer: 0,
    explanation: "Vowels in PLACEMENT are A, E, E (3 vowels). Consonants are P, L, C, M, N, T (6 consonants). Treat (A,E,E) as 1 unit. Total 7 items with 2 Es. 7! / 2! * (3! / 2!) = 2520 * 3 = 7,560... Wait, letters: P, L, A, C, E, M, E, N, T. Consonants: P, L, C, M, N, T (6). Vowels: A, E, E (3). Group vowels: 7 items (P,L,C,M,N,T, [AEE]). 7! * (3! / 2!) = 5040 * 3 = 15,120.",
    companyTags: ["Amazon", "Goldman Sachs"]
  },

  // ─── DATA STRUCTURES & ALGORITHMS (CSE, IT, AIML, AIDS) ───
  {
    id: "dsa-01",
    module: "Data Structures",
    topic: "Arrays",
    difficulty: "beginner",
    type: "mcq",
    prompt: "What is the time complexity to access an element at index i in an array of size N?",
    options: ["O(1)", "O(log N)", "O(N)", "O(N log N)"],
    correctAnswer: 0,
    explanation: "Arrays store elements in contiguous memory locations, allowing direct calculation of the memory address in O(1) constant time.",
    companyTags: ["TCS", "Infosys", "Wipro", "Amazon"]
  },
  {
    id: "dsa-02",
    module: "Data Structures",
    topic: "Two Sum",
    difficulty: "easy",
    type: "mcq",
    prompt: "Which data structure reduces the Two Sum problem from O(N^2) brute force to O(N) time complexity?",
    options: ["Binary Search Tree", "Hash Table / Map", "Queue", "Stack"],
    correctAnswer: 1,
    explanation: "A Hash Table provides O(1) average lookup time. By storing seen numbers, we check if target - current exists in O(1) time.",
    companyTags: ["Amazon", "Microsoft", "Google"]
  },
  {
    id: "dsa-03",
    module: "Data Structures",
    topic: "Linked List",
    difficulty: "easy",
    type: "mcq",
    prompt: "Floyd's Cycle-Finding Algorithm (Tortoise and Hare) uses two pointers moving at speeds:",
    options: ["1 step and 2 steps", "1 step and 3 steps", "2 steps and 4 steps", "Logarithmic steps"],
    correctAnswer: 0,
    explanation: "The slow pointer advances 1 node per step while the fast pointer advances 2 nodes. If a cycle exists, they will meet inside the loop.",
    companyTags: ["Adobe", "Samsung", "Zoho"]
  },
  {
    id: "dsa-04",
    module: "Data Structures",
    topic: "Trees",
    difficulty: "medium",
    type: "mcq",
    prompt: "In a Binary Search Tree (BST), which traversal produces elements in sorted ascending order?",
    options: ["Pre-order", "In-order", "Post-order", "Level-order"],
    correctAnswer: 1,
    explanation: "In-order traversal visits (Left, Root, Right). In a BST, all left node values are smaller than root and right node values are greater, yielding sorted output.",
    companyTags: ["Microsoft", "Oracle", "Cisco"]
  },
  {
    id: "dsa-05",
    module: "Algorithms",
    topic: "Sorting",
    difficulty: "medium",
    type: "mcq",
    prompt: "What is the worst-case time complexity of QuickSort?",
    options: ["O(N log N)", "O(N)", "O(N^2)", "O(2^N)"],
    correctAnswer: 2,
    explanation: "When the pivot chosen is consistently the smallest or largest element (e.g. already sorted array with last element as pivot), QuickSort degrades to O(N^2).",
    companyTags: ["Amazon", "Flipkart", "PayPal"]
  },
  {
    id: "dsa-06",
    module: "Algorithms",
    topic: "Dynamic Programming",
    difficulty: "hard",
    type: "mcq",
    prompt: "What is the main difference between Memoization (Top-Down) and Tabulation (Bottom-Up)?",
    options: [
      "Memoization uses recursion while Tabulation uses iteration",
      "Memoization is O(N^2) while Tabulation is O(N)",
      "Tabulation causes call stack overflow for large inputs",
      "Memoization uses no extra space"
    ],
    correctAnswer: 0,
    explanation: "Memoization evaluates subproblems lazily using recursive call stacks and caching. Tabulation fills an array iteratively from base cases upwards.",
    companyTags: ["Google", "Atlassian", "Uber"]
  },
  {
    id: "dsa-07",
    module: "Algorithms",
    topic: "Graphs",
    difficulty: "expert",
    type: "mcq",
    prompt: "Dijkstra's Algorithm fails or produces incorrect results when graph edges contain:",
    options: ["Cycles", "Negative weight edges", "Multiple components", "Directed edges"],
    correctAnswer: 1,
    explanation: "Dijkstra assumes adding an edge only increases path distance. Negative edge weights violate this greedy choice property. Bellman-Ford must be used instead.",
    companyTags: ["Google", "Meta", "Directi"]
  },

  // ─── OPERATING SYSTEMS & COMPUTER NETWORKS (Core Engineering) ───
  {
    id: "os-01",
    module: "Operating Systems",
    topic: "Processes & Threads",
    difficulty: "beginner",
    type: "mcq",
    prompt: "Which of the following is shared between threads of the same process?",
    options: ["Program Counter", "Stack", "Register values", "Heap memory"],
    correctAnswer: 3,
    explanation: "Threads of a process share address space, global variables, and heap memory, but each thread has its own stack, registers, and program counter.",
    companyTags: ["Infosys", "TCS", "Cognizant"]
  },
  {
    id: "os-02",
    module: "Operating Systems",
    topic: "Deadlocks",
    difficulty: "medium",
    type: "mcq",
    prompt: "Which of the following is NOT one of Coffman's four necessary conditions for deadlock?",
    options: ["Mutual Exclusion", "Hold and Wait", "Preemption allowed", "Circular Wait"],
    correctAnswer: 2,
    explanation: "The four deadlock conditions are Mutual Exclusion, Hold & Wait, NO Preemption, and Circular Wait. If preemption is allowed, deadlocks cannot occur.",
    companyTags: ["Cisco", "Qualcomm", "Intel"]
  },
  {
    id: "net-01",
    module: "Computer Networks",
    topic: "OSI Model",
    difficulty: "beginner",
    type: "mcq",
    prompt: "At which layer of the OSI model does the IP protocol operate?",
    options: ["Data Link Layer", "Network Layer", "Transport Layer", "Application Layer"],
    correctAnswer: 1,
    explanation: "The Internet Protocol (IP) works at Layer 3 (Network Layer) to handle packet addressing and routing across networks.",
    companyTags: ["TCS", "Wipro", "HCL"]
  },
  {
    id: "net-02",
    module: "Computer Networks",
    topic: "TCP/IP",
    difficulty: "easy",
    type: "mcq",
    prompt: "What is the three-way handshake sequence used to establish a TCP connection?",
    options: ["ACK, SYN, SYN-ACK", "SYN, SYN-ACK, ACK", "SYN, ACK, FIN", "CONNECT, ACCEPT, ACK"],
    correctAnswer: 1,
    explanation: "Client sends SYN -> Server responds with SYN-ACK -> Client acknowledges with ACK. Connection is now established.",
    companyTags: ["Amazon", "Akamai", "Network Systems"]
  },

  // ─── DATABASE MANAGEMENT SYSTEMS (SQL & NoSQL) ───
  {
    id: "dbms-01",
    module: "DBMS",
    topic: "SQL Queries",
    difficulty: "beginner",
    type: "mcq",
    prompt: "Which SQL clause is used to filter aggregated group results after a GROUP BY statement?",
    options: ["WHERE", "HAVING", "ORDER BY", "FILTER"],
    correctAnswer: 1,
    explanation: "WHERE filters rows before aggregation. HAVING filters grouped rows after aggregation functions (e.g. SUM, COUNT) are calculated.",
    companyTags: ["TCS", "Accenture", "Oracle"]
  },
  {
    id: "dbms-02",
    module: "DBMS",
    topic: "ACID Properties",
    difficulty: "medium",
    type: "mcq",
    prompt: "The 'I' in ACID properties stands for Isolation. What does it guarantee?",
    options: [
      "Data is saved permanently even during system crashes",
      "Transactions execute independently without interfering with each other",
      "Database moves from one valid state to another",
      "All operations in a transaction complete or none do"
    ],
    correctAnswer: 1,
    explanation: "Isolation ensures concurrent transactions execute independently as if they were running serially.",
    companyTags: ["Amazon", "Morgan Stanley", "JPMorgan"]
  },

  // ─── ARTIFICIAL INTELLIGENCE & MACHINE LEARNING (AIML & AIDS) ───
  {
    id: "aiml-01",
    module: "AI & ML",
    topic: "Supervised Learning",
    difficulty: "beginner",
    type: "mcq",
    prompt: "Which metric is commonly used to evaluate regression models?",
    options: ["Confusion Matrix", "Mean Squared Error (MSE)", "F1 Score", "ROC-AUC"],
    correctAnswer: 1,
    explanation: "MSE measures the average squared difference between estimated values and actual outcomes, ideal for continuous target variables.",
    companyTags: ["Fractal", "Tiger Analytics", "Mu Sigma"]
  },
  {
    id: "aiml-02",
    module: "AI & ML",
    topic: "Deep Learning",
    difficulty: "medium",
    type: "mcq",
    prompt: "What problem does the Vanishing Gradient problem cause during backpropagation in deep neural networks?",
    options: [
      "Model weights become infinity",
      "Early layers train extremely slowly or stop learning",
      "Overfitting on training data",
      "Loss function jumps randomly"
    ],
    correctAnswer: 1,
    explanation: "Gradients get multiplied by small numbers (<1) layer by layer backwards. In deep nets, gradients approach zero near early layers.",
    companyTags: ["Google", "NVIDIA", "Microsoft AI"]
  },

  // ─── ELECTRONICS, EEE & MECHATRONICS (ECE, EEE, MECH) ───
  {
    id: "ece-01",
    module: "Embedded & Hardware",
    topic: "Microcontrollers",
    difficulty: "easy",
    type: "mcq",
    prompt: "Which communication protocol uses two wires: SDA (Serial Data) and SCL (Serial Clock)?",
    options: ["UART", "SPI", "I2C", "CAN"],
    correctAnswer: 2,
    explanation: "I2C (Inter-Integrated Circuit) uses SDA for data transfer and SCL for clock synchronization between master and slave devices.",
    companyTags: ["Texas Instruments", "Qualcomm", "Bosch"]
  },
  {
    id: "mech-01",
    module: "Robotics & Controls",
    topic: "PID Controllers",
    difficulty: "medium",
    type: "mcq",
    prompt: "In a PID controller, what is the role of the Derivative (D) term?",
    options: [
      "Eliminates steady-state error",
      "Responds to the rate of error change to reduce overshoot and settling time",
      "Provides main driving force proportional to error",
      "Acts as a low-pass filter"
    ],
    correctAnswer: 1,
    explanation: "The Derivative term predicts future error by measuring rate of change, adding damping to prevent overshooting.",
    companyTags: ["ABB", "Siemens", "Fanuc", "Tesla"]
  },

  // ─── MNC EXAM QUESTIONS (TCS NQT, Infosys, Amazon, Wipro) ───
  {
    id: "mnc-tcs-01",
    module: "MNC Placement",
    topic: "TCS NQT Coding",
    difficulty: "medium",
    type: "mcq",
    prompt: "What is the output of the C expression `5 + 3 * 2 % 4`?",
    options: ["7", "9", "5", "11"],
    correctAnswer: 0,
    explanation: "Operator precedence: * and % have equal precedence (left to right). 3 * 2 = 6. 6 % 4 = 2. Then 5 + 2 = 7.",
    companyTags: ["TCS NQT", "Infosys PseudoCode"]
  },
  {
    id: "mnc-infy-01",
    module: "MNC Placement",
    topic: "Infosys HackWithInfy",
    difficulty: "hard",
    type: "mcq",
    prompt: "Given an integer array nums, find the contiguous subarray with the largest sum (Kadane's Algorithm). What is its time complexity?",
    options: ["O(N log N)", "O(N^2)", "O(N)", "O(2^N)"],
    correctAnswer: 2,
    explanation: "Kadane's algorithm keeps track of current_max and global_max in a single pass over the array, achieving O(N) time.",
    companyTags: ["Infosys", "Amazon", "Cognizant GenC Next"]
  }
];

// Helper to filter questions by level, branch, topic, or count
export function getDaily40Questions(userLevel: number, userBranch?: string): QuestionItem[] {
  let available = QUESTION_BANK;
  if (userBranch) {
    const branchSpecific = available.filter(q => !q.branch || q.branch.includes(userBranch));
    if (branchSpecific.length >= 10) available = branchSpecific;
  }

  const selected: QuestionItem[] = [];
  let pool = [...available];

  while (selected.length < 40) {
    if (pool.length === 0) pool = [...available];
    const randomIndex = Math.floor(Math.random() * pool.length);
    const item = pool.splice(randomIndex, 1)[0];
    selected.push({
      ...item,
      id: `${item.id}-${selected.length + 1}`
    });
  }

  return selected;
}
