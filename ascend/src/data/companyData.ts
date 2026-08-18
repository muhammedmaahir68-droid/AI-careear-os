// src/data/companyData.ts
// Branch-specific target companies with interview details

export interface CompanyTrack {
  name: string;
  logo: string;
  color: string;
  difficulty: string;
  roles: string[];
  avgPackage: string;
  rounds: string[];
  codingQuestion: { title: string; desc: string; difficulty: string; starter: string };
  interviewQuestions: { round: string; question: string; tip: string }[];
}

// ─── CSE / IT ────────────────────────────────────────────────────────────────
const CSE_COMPANIES: CompanyTrack[] = [
  {
    name: "Google", logo: "🔵", color: "from-blue-600 to-green-500", difficulty: "Hard",
    roles: ["SDE-1", "SDE-2", "Cloud Engineer", "SRE"],
    avgPackage: "₹30-45 LPA", rounds: ["Online Assessment", "Phone Screen", "4x Onsite (DSA + System Design + Behavioral)"],
    codingQuestion: { title: "Longest Substring Without Repeating Characters", desc: "Given a string s, find the length of the longest substring without repeating characters.", difficulty: "Medium", starter: `def lengthOfLongestSubstring(s: str) -> int:\n    # Sliding window approach\n    pass` },
    interviewQuestions: [
      { round: "Technical", question: "Design a URL shortening service like bit.ly", tip: "Discuss hashing, base62 encoding, database sharding, and cache layer." },
      { round: "Technical", question: "Explain how Google Search ranks pages (PageRank basics)", tip: "Directed graph of web pages, random surfer model, damping factor." },
      { round: "Behavioral", question: "Tell me about a time you disagreed with your team's approach", tip: "Use STAR method. Focus on data-driven decision making." }
    ]
  },
  {
    name: "Amazon", logo: "📦", color: "from-orange-500 to-yellow-600", difficulty: "Hard",
    roles: ["SDE-1", "SDE-2", "Data Engineer", "DevOps"],
    avgPackage: "₹25-40 LPA", rounds: ["Online Assessment (2 coding)", "Phone Screen", "4x Onsite (LP + Coding)"],
    codingQuestion: { title: "LRU Cache Implementation", desc: "Design a data structure that follows Least Recently Used (LRU) cache constraints.", difficulty: "Medium", starter: `class LRUCache:\n    def __init__(self, capacity: int):\n        pass\n    def get(self, key: int) -> int:\n        pass\n    def put(self, key: int, value: int) -> None:\n        pass` },
    interviewQuestions: [
      { round: "Technical", question: "Design an e-commerce order processing system", tip: "Cover microservices, message queues (SQS), DynamoDB, and idempotency." },
      { round: "Leadership Principles", question: "Give an example of Customer Obsession", tip: "Amazon evaluates LP heavily. Use concrete metrics and outcomes." },
      { round: "Technical", question: "Explain eventual consistency in distributed systems", tip: "CAP theorem, DynamoDB's quorum reads/writes, conflict resolution." }
    ]
  },
  {
    name: "Microsoft", logo: "🪟", color: "from-blue-500 to-orange-400", difficulty: "Hard",
    roles: ["SDE", "Program Manager", "Cloud Solutions Architect"],
    avgPackage: "₹22-38 LPA", rounds: ["Online Coding Round", "3-4 Technical Interviews", "Hiring Manager Round"],
    codingQuestion: { title: "Binary Tree Level Order Traversal", desc: "Return level order traversal of a binary tree (BFS).", difficulty: "Medium", starter: `from collections import deque\ndef levelOrder(root):\n    # BFS using queue\n    pass` },
    interviewQuestions: [
      { round: "Technical", question: "Design a real-time collaborative document editor", tip: "Discuss OT (Operational Transform) or CRDT, WebSocket, conflict resolution." },
      { round: "Technical", question: "What is the difference between process and thread?", tip: "Process has own address space; threads share address space within a process." },
      { round: "Behavioral", question: "How do you handle ambiguous requirements?", tip: "Show structured approach: ask clarifying questions, prototype, iterate." }
    ]
  },
  {
    name: "Zoho", logo: "🟢", color: "from-green-500 to-amber-600", difficulty: "Medium",
    roles: ["Member Technical Staff", "Project Trainee"],
    avgPackage: "₹6-12 LPA", rounds: ["Written C/C++ Round", "Advanced Programming Round", "Technical + HR"],
    codingQuestion: { title: "Matrix Rotation 90 Degrees", desc: "Rotate an N×N matrix 90 degrees clockwise in-place.", difficulty: "Medium", starter: `def rotate_matrix(matrix):\n    n = len(matrix)\n    # Transpose then reverse each row\n    pass` },
    interviewQuestions: [
      { round: "Technical", question: "Implement a doubly linked list with insert, delete, and reverse", tip: "Zoho tests raw C/C++ pointer manipulation. Practice memory management." },
      { round: "Technical", question: "Write a custom string library (strlen, strcpy, strcat, strcmp)", tip: "Avoid using standard library functions. Handle null terminators correctly." },
      { round: "HR", question: "Why Zoho over other product companies?", tip: "Mention Zoho's product-first culture, no-VC independence, and full-stack development." }
    ]
  },
  {
    name: "TCS (NQT)", logo: "🔷", color: "from-blue-700 to-indigo-600", difficulty: "Easy",
    roles: ["Systems Engineer", "Digital Cadre", "Ninja", "Prime"],
    avgPackage: "₹3.5-9 LPA", rounds: ["NQT (Aptitude + Programming)", "Technical Interview", "HR"],
    codingQuestion: { title: "Check if String is Palindrome", desc: "Given a string, check whether it reads the same backward as forward.", difficulty: "Easy", starter: `def is_palindrome(s):\n    # Compare string with its reverse\n    pass` },
    interviewQuestions: [
      { round: "Aptitude", question: "A train 150m long passes a pole in 15 sec. Find its speed in km/h.", tip: "Speed = Distance/Time = 150/15 = 10 m/s = 36 km/h." },
      { round: "Technical", question: "What is normalization in DBMS? Explain 1NF, 2NF, 3NF.", tip: "1NF: atomic values; 2NF: no partial dependency; 3NF: no transitive dependency." },
      { round: "HR", question: "Are you willing to relocate?", tip: "TCS expects flexibility. Show willingness for any location." }
    ]
  },
  {
    name: "Infosys", logo: "🔶", color: "from-indigo-500 to-purple-600", difficulty: "Easy",
    roles: ["Systems Engineer", "Power Programmer", "Specialist Programmer"],
    avgPackage: "₹3.6-9.5 LPA", rounds: ["InfyTQ / HackWithInfy", "Technical Interview", "HR"],
    codingQuestion: { title: "Find Second Largest Element", desc: "Find the second largest element in an unsorted array without sorting.", difficulty: "Easy", starter: `def second_largest(arr):\n    # Track first and second largest in one pass\n    pass` },
    interviewQuestions: [
      { round: "Technical", question: "Explain OOP pillars with real-world examples", tip: "Encapsulation (ATM machine), Inheritance (Vehicle→Car), Polymorphism (draw() shape), Abstraction (TV remote)." },
      { round: "Technical", question: "Difference between Stack and Queue with applications", tip: "Stack: LIFO (undo, recursion); Queue: FIFO (print spooler, BFS)." },
      { round: "HR", question: "Where do you see yourself in 5 years?", tip: "Align growth with company's vision. Mention learning and leadership." }
    ]
  },
  {
    name: "Wipro", logo: "🌸", color: "from-rose-500 to-pink-500", difficulty: "Easy",
    roles: ["Project Engineer", "Elite NLTH"],
    avgPackage: "₹3.5-6.5 LPA", rounds: ["Online Test (Aptitude + Coding)", "Technical", "HR"],
    codingQuestion: { title: "Fibonacci Series", desc: "Print the first N Fibonacci numbers.", difficulty: "Easy", starter: `def fibonacci(n):\n    # Generate first n fibonacci numbers\n    pass` },
    interviewQuestions: [
      { round: "Technical", question: "What is the difference between Abstract Class and Interface?", tip: "Abstract class can have implemented methods; Interface (pre-Java 8) has only abstract methods." },
      { round: "Aptitude", question: "If the ratio of ages of A and B is 3:5 and sum is 40, find their ages.", tip: "A = 3x, B = 5x, 8x = 40, x = 5. A=15, B=25." },
      { round: "HR", question: "Tell me about yourself.", tip: "2-minute structured intro: Education → Skills → Projects → Why this role." }
    ]
  },
  {
    name: "Flipkart", logo: "🛒", color: "from-yellow-500 to-blue-600", difficulty: "Hard",
    roles: ["SDE-1", "SDE-2", "Backend Engineer"],
    avgPackage: "₹18-35 LPA", rounds: ["Online Coding", "Machine Coding Round", "2x DSA + System Design"],
    codingQuestion: { title: "Merge K Sorted Lists", desc: "Merge k sorted linked lists and return it as one sorted list.", difficulty: "Hard", starter: `import heapq\ndef mergeKLists(lists):\n    # Use min-heap\n    pass` },
    interviewQuestions: [
      { round: "Machine Coding", question: "Design a parking lot system with entry/exit, fee calculation", tip: "Use OOP design patterns. Strategy pattern for pricing, Observer for notifications." },
      { round: "System Design", question: "Design Flipkart's product search with filters and sorting", tip: "Elasticsearch for full-text search, Redis for caching, microservices." },
      { round: "Technical", question: "Explain consistent hashing for distributed caching", tip: "Virtual nodes on hash ring, minimizes key redistribution when nodes join/leave." }
    ]
  }
];

// ─── IT ──────────────────────────────────────────────────────────────────────
const IT_COMPANIES: CompanyTrack[] = [
  {
    name: "TCS", logo: "🔷", color: "from-blue-500 to-indigo-600", difficulty: "Medium",
    roles: ["System Engineer", "QA Engineer", "IT Analyst"],
    avgPackage: "₹3.5-7 LPA", rounds: ["NQT (Aptitude + Coding)", "Technical Interview", "HR Interview"],
    codingQuestion: { title: "Reverse a Linked List", desc: "Reverse a singly linked list iteratively.", difficulty: "Easy", starter: `def reverse_list(head):\n    prev = None\n    # iterate and relink\n    return prev` },
    interviewQuestions: [
      { round: "Technical", question: "Explain the difference between SDLC models: Waterfall vs Agile", tip: "Waterfall is sequential and rigid; Agile is iterative with sprints and continuous feedback." },
      { round: "Technical", question: "What is normalization in databases? Explain up to 3NF", tip: "1NF: atomic values. 2NF: no partial dependency. 3NF: no transitive dependency." },
      { round: "HR", question: "Why do you want to join TCS as a System Engineer?", tip: "Focus on learning opportunities, project diversity, and long-term growth." }
    ]
  },
  {
    name: "Infosys", logo: "🔵", color: "from-blue-600 to-orange-500", difficulty: "Medium",
    roles: ["System Engineer", "Power Programmer", "Test Engineer"],
    avgPackage: "₹4-9.5 LPA", rounds: ["Online Test (Aptitude + Coding)", "Technical", "HR"],
    codingQuestion: { title: "Check for Palindrome", desc: "Write a function to check if a string is a palindrome, ignoring case and non-alphanumeric characters.", difficulty: "Easy", starter: `def is_palindrome(s: str) -> bool:\n    # clean, compare with reverse\n    pass` },
    interviewQuestions: [
      { round: "Technical", question: "What is REST API? Explain its key principles", tip: "Stateless, resource-based URLs, standard HTTP verbs, representations (usually JSON)." },
      { round: "Technical", question: "Explain the OSI model layers", tip: "7 layers: Physical, Data Link, Network, Transport, Session, Presentation, Application." },
      { round: "HR", question: "Are you comfortable relocating for this role?", tip: "Answer honestly, tie it to career growth reasoning." }
    ]
  },
  {
    name: "Zoho", logo: "🟠", color: "from-red-500 to-orange-500", difficulty: "Hard",
    roles: ["Member of Technical Staff", "QA Engineer", "Support Engineer"],
    avgPackage: "₹6-12 LPA", rounds: ["Written Test (Aptitude + Coding + Puzzles)", "2-3 Technical Rounds", "HR"],
    codingQuestion: { title: "Find Duplicate in Array", desc: "Given an array of n+1 integers where each integer is between 1 and n, find the duplicate.", difficulty: "Medium", starter: `def find_duplicate(nums):\n    # Floyd's cycle detection or hashing\n    pass` },
    interviewQuestions: [
      { round: "Technical", question: "Explain how a hash table handles collisions", tip: "Chaining (linked list per bucket) or open addressing (linear/quadratic probing, double hashing)." },
      { round: "Puzzle", question: "You have 8 identical-looking balls, one heavier. Find it in 2 weighings", tip: "Split into groups of 3-3-2, weigh 3 vs 3 first to narrow down." },
      { round: "Technical", question: "What happens when you type a URL into a browser and hit Enter?", tip: "DNS resolution, TCP handshake, TLS, HTTP request, server processing, response render." }
    ]
  }
];

// ─── ECE ─────────────────────────────────────────────────────────────────────
const ECE_COMPANIES: CompanyTrack[] = [
  {
    name: "Qualcomm", logo: "📡", color: "from-blue-600 to-red-500", difficulty: "Hard",
    roles: ["Embedded SW Engineer", "ASIC Design Engineer", "Modem Firmware"],
    avgPackage: "₹18-30 LPA", rounds: ["Online Test (C/C++ + Digital)", "Technical (2-3 rounds)", "HR"],
    codingQuestion: { title: "Bit Manipulation: Count Set Bits", desc: "Count the number of 1-bits in the binary representation of an integer.", difficulty: "Easy", starter: `int countSetBits(int n) {\n    int count = 0;\n    // Brian Kernighan's algorithm\n    return count;\n}` },
    interviewQuestions: [
      { round: "Technical", question: "Explain the difference between RISC and CISC architectures", tip: "RISC: fixed-length instructions, load-store, more registers. CISC: variable-length, complex addressing modes." },
      { round: "Technical", question: "What is cache coherence in multicore processors?", tip: "MESI protocol, snooping vs directory-based coherence." },
      { round: "Technical", question: "Design a FIFO buffer for UART data reception", tip: "Circular buffer with head/tail pointers, overflow detection." }
    ]
  },
  {
    name: "Texas Instruments", logo: "⚡", color: "from-red-600 to-gray-700", difficulty: "Hard",
    roles: ["Analog Design Engineer", "Embedded Systems Engineer", "Test Engineer"],
    avgPackage: "₹15-25 LPA", rounds: ["Aptitude + Technical MCQ", "2x Technical Interviews", "HR"],
    codingQuestion: { title: "ADC Voltage Conversion", desc: "Convert a 10-bit ADC raw reading to voltage given Vref=3.3V.", difficulty: "Easy", starter: `float adc_to_voltage(int raw_value, float vref, int resolution_bits) {\n    // voltage = raw_value * vref / (2^bits - 1)\n    return 0.0;\n}` },
    interviewQuestions: [
      { round: "Technical", question: "Explain Op-Amp virtual short concept and derive inverting amplifier gain", tip: "V+ ≈ V- due to infinite open-loop gain. Gain = -Rf/Rin." },
      { round: "Technical", question: "What is Nyquist sampling theorem?", tip: "Sampling frequency must be ≥ 2× highest signal frequency to avoid aliasing." },
      { round: "Technical", question: "Draw and explain a Schmitt Trigger circuit", tip: "Provides hysteresis for noise-immune switching. Two threshold voltages." }
    ]
  },
  {
    name: "Samsung R&D", logo: "📱", color: "from-blue-700 to-black", difficulty: "Hard",
    roles: ["SoC Design", "Camera ISP Engineer", "Android Framework"],
    avgPackage: "₹16-28 LPA", rounds: ["Samsung Coding Test (3hrs)", "2x Technical", "HR"],
    codingQuestion: { title: "Implement Circular Queue", desc: "Implement a fixed-size circular queue with enqueue, dequeue, isFull, isEmpty.", difficulty: "Medium", starter: `class CircularQueue:\n    def __init__(self, k):\n        pass\n    def enqueue(self, value):\n        pass\n    def dequeue(self):\n        pass` },
    interviewQuestions: [
      { round: "Technical", question: "Explain CMOS inverter switching characteristics", tip: "Discuss VTC curve, noise margins NMH/NML, propagation delay, power dissipation." },
      { round: "Technical", question: "What is the difference between volatile and non-volatile memory?", tip: "Volatile (SRAM, DRAM) loses data without power; Non-volatile (Flash, EEPROM) retains data." },
      { round: "Technical", question: "Explain DMA and why it's used over CPU-driven I/O", tip: "DMA controller transfers data directly between memory and peripherals without CPU intervention." }
    ]
  },
  {
    name: "Intel", logo: "💠", color: "from-blue-500 to-orange-500", difficulty: "Hard",
    roles: ["Validation Engineer", "Silicon Design", "Firmware Engineer"],
    avgPackage: "₹14-24 LPA", rounds: ["Online Test", "3x Technical Deep Dive", "HR"],
    codingQuestion: { title: "Detect Endianness", desc: "Write a C function to detect if the system is Little-Endian or Big-Endian.", difficulty: "Easy", starter: `int is_little_endian() {\n    unsigned int x = 1;\n    // Check first byte\n    return 0;\n}` },
    interviewQuestions: [
      { round: "Technical", question: "What is pipelining in processor architecture? What are hazards?", tip: "5-stage pipeline: IF, ID, EX, MEM, WB. Data/Control/Structural hazards." },
      { round: "Technical", question: "Explain static timing analysis in VLSI design", tip: "Compute worst-case propagation delay through combinational logic paths." },
      { round: "Technical", question: "How does branch prediction improve pipeline performance?", tip: "Speculative execution reduces stalls. Dynamic: history-based, 2-bit saturating counter." }
    ]
  },
  {
    name: "ISRO / DRDO", logo: "🚀", color: "from-orange-500 to-white", difficulty: "Medium",
    roles: ["Scientist/Engineer SC", "Technical Officer"],
    avgPackage: "₹8-15 LPA (+ benefits)", rounds: ["GATE Score / Written Exam", "Technical Interview", "Document Verification"],
    codingQuestion: { title: "Signal Sampling Rate Calculator", desc: "Given max signal frequency, calculate minimum sampling rate per Nyquist.", difficulty: "Easy", starter: `def min_sampling_rate(max_freq_hz):\n    # Nyquist: fs >= 2 * fmax\n    pass` },
    interviewQuestions: [
      { round: "Technical", question: "Explain satellite communication link budget analysis", tip: "EIRP, path loss, antenna gain, SNR margin, noise temperature." },
      { round: "Technical", question: "What is the difference between GEO, MEO, and LEO orbits?", tip: "GEO: 35786km fixed position; MEO: GPS ~20200km; LEO: 200-2000km low latency." },
      { round: "Technical", question: "Explain modulation techniques: AM, FM, PSK, QAM", tip: "AM varies amplitude; FM varies frequency; PSK varies phase; QAM combines amplitude+phase." }
    ]
  }
];

// ─── EEE ─────────────────────────────────────────────────────────────────────
const EEE_COMPANIES: CompanyTrack[] = [
  {
    name: "Siemens", logo: "⚙️", color: "from-teal-500 to-orange-600", difficulty: "Medium",
    roles: ["Power Systems Engineer", "Automation Engineer", "PLC Programmer"],
    avgPackage: "₹8-18 LPA", rounds: ["Aptitude + Technical MCQ", "Technical Interview", "HR"],
    codingQuestion: { title: "RLC Circuit Impedance Calculator", desc: "Calculate total impedance of series RLC circuit at given frequency.", difficulty: "Medium", starter: `import math\ndef rlc_impedance(R, L, C, freq):\n    # Z = sqrt(R^2 + (XL - XC)^2)\n    pass` },
    interviewQuestions: [
      { round: "Technical", question: "Explain the working of 3-phase transformer and its connections", tip: "Star-Delta, Delta-Star configurations. Discuss phase shift, line vs phase voltages." },
      { round: "Technical", question: "What is SCADA system in power grid monitoring?", tip: "Supervisory Control and Data Acquisition: RTUs collect field data, master station monitors/controls." },
      { round: "Technical", question: "Explain PLC ladder logic programming basics", tip: "Contacts (NO/NC), coils, timers, counters. Scan cycle: Input → Execute → Output." }
    ]
  },
  {
    name: "ABB", logo: "🔴", color: "from-red-600 to-gray-600", difficulty: "Medium",
    roles: ["Drives & Controls Engineer", "Relay Testing Engineer", "Substation Automation"],
    avgPackage: "₹7-15 LPA", rounds: ["Online Test", "Technical (2 rounds)", "HR"],
    codingQuestion: { title: "Power Factor Calculator", desc: "Calculate power factor from real power (kW) and apparent power (kVA).", difficulty: "Easy", starter: `def power_factor(real_kw, apparent_kva):\n    # PF = P / S\n    pass` },
    interviewQuestions: [
      { round: "Technical", question: "Explain different types of protective relays in power systems", tip: "Overcurrent, differential, distance (impedance), directional, Buchholz relay for transformers." },
      { round: "Technical", question: "What is the role of circuit breaker vs isolator?", tip: "CB interrupts fault current under load; Isolator provides visible gap for maintenance (no-load switching only)." },
      { round: "Technical", question: "Explain VFD (Variable Frequency Drive) operation principle", tip: "Rectifier → DC bus → Inverter. Controls motor speed by varying frequency: N = 120f/P." }
    ]
  },
  {
    name: "Schneider Electric", logo: "🟩", color: "from-green-600 to-lime-500", difficulty: "Medium",
    roles: ["Power Management Engineer", "IoT Solutions", "Field Application Engineer"],
    avgPackage: "₹6-14 LPA", rounds: ["Online Assessment", "Technical Interview", "Managerial + HR"],
    codingQuestion: { title: "Energy Consumption Calculator", desc: "Calculate monthly electricity bill from appliance wattage, hours/day, rate/unit.", difficulty: "Easy", starter: `def monthly_bill(watts, hours_per_day, rate_per_unit, days=30):\n    # units = (watts * hours * days) / 1000\n    pass` },
    interviewQuestions: [
      { round: "Technical", question: "Explain smart grid technology and its advantages", tip: "Two-way communication, demand response, distributed generation, self-healing networks." },
      { round: "Technical", question: "What are harmonics in power systems and how to mitigate them?", tip: "Non-linear loads create harmonics. Mitigation: passive/active harmonic filters, K-rated transformers." },
      { round: "Technical", question: "Explain earthing/grounding types: TN, TT, IT systems", tip: "TN: supply earth bonded to equipment; TT: separate earth electrodes; IT: isolated neutral." }
    ]
  },
  {
    name: "L&T Electrical", logo: "🏗️", color: "from-blue-800 to-gray-600", difficulty: "Medium",
    roles: ["GET (Graduate Engineer Trainee)", "Design Engineer", "Project Engineer"],
    avgPackage: "₹6-12 LPA", rounds: ["Written Test (GATE syllabus)", "Technical + HR"],
    codingQuestion: { title: "Transformer Turns Ratio", desc: "Calculate secondary voltage from primary voltage and turns ratio.", difficulty: "Easy", starter: `def secondary_voltage(v_primary, n_primary, n_secondary):\n    # V2 = V1 * (N2/N1)\n    pass` },
    interviewQuestions: [
      { round: "Technical", question: "What is the difference between synchronous and induction motors?", tip: "Synchronous runs at Ns (no slip), needs DC excitation; Induction has slip, self-starting." },
      { round: "Technical", question: "Explain per-unit system in power engineering", tip: "Normalized values: pu = actual / base. Simplifies calculations across different voltage levels." },
      { round: "Technical", question: "What causes ferroresonance in transformers?", tip: "Nonlinear interaction between transformer core inductance and system capacitance causing overvoltage." }
    ]
  }
];

// ─── MECH ────────────────────────────────────────────────────────────────────
const MECH_COMPANIES: CompanyTrack[] = [
  {
    name: "Tata Motors", logo: "🚗", color: "from-blue-700 to-blue-900", difficulty: "Medium",
    roles: ["GET - Production", "Design Engineer", "Quality Engineer"],
    avgPackage: "₹6-14 LPA", rounds: ["Written Test (Aptitude + Technical)", "Technical Interview", "HR"],
    codingQuestion: { title: "Gear Train Speed Calculator", desc: "Calculate output RPM of a compound gear train given input RPM and gear ratios.", difficulty: "Easy", starter: `def gear_output_rpm(input_rpm, gear_ratios):\n    # output = input * product of (driver/driven)\n    pass` },
    interviewQuestions: [
      { round: "Technical", question: "Explain the working of a 4-stroke diesel engine with PV diagram", tip: "Suction → Compression → Power → Exhaust. Diesel cycle: constant pressure heat addition." },
      { round: "Technical", question: "What is the difference between SI and CI engines?", tip: "SI: spark ignition, petrol, Otto cycle, lower compression ratio. CI: compression ignition, diesel, higher CR." },
      { round: "Technical", question: "Explain fatigue failure in mechanical components", tip: "Cyclic loading causes crack initiation → propagation → sudden fracture below ultimate strength. S-N curve." }
    ]
  },
  {
    name: "Bosch", logo: "🔧", color: "from-red-600 to-gray-700", difficulty: "Hard",
    roles: ["Application Engineer", "R&D Engineer", "Manufacturing Engineer"],
    avgPackage: "₹8-18 LPA", rounds: ["Online Assessment", "Technical (2 rounds)", "Managerial + HR"],
    codingQuestion: { title: "Thermal Expansion Calculator", desc: "Calculate change in length due to temperature change.", difficulty: "Easy", starter: `def thermal_expansion(original_length, alpha, delta_temp):\n    # delta_L = L * alpha * delta_T\n    pass` },
    interviewQuestions: [
      { round: "Technical", question: "Explain CNC G-codes and M-codes with examples", tip: "G00: rapid traverse, G01: linear interpolation, G02/03: circular. M03: spindle CW, M05: stop, M30: end program." },
      { round: "Technical", question: "What is GD&T and why is it important?", tip: "Geometric Dimensioning & Tolerancing: defines form, orientation, location, runout tolerances beyond ± dimensions." },
      { round: "Technical", question: "Explain the difference between forging and casting", tip: "Forging: mechanical deformation, grain flow alignment, superior strength. Casting: molten metal in mold, complex shapes." }
    ]
  },
  {
    name: "Caterpillar", logo: "🐛", color: "from-yellow-500 to-black", difficulty: "Medium",
    roles: ["Design Engineer", "Product Support", "Manufacturing"],
    avgPackage: "₹8-16 LPA", rounds: ["Written (Aptitude + Technical)", "Group Discussion", "Technical + HR"],
    codingQuestion: { title: "Stress-Strain Calculator", desc: "Calculate engineering stress and strain from force, area, and deformation.", difficulty: "Easy", starter: `def stress_strain(force_N, area_m2, original_length, deformation):\n    # stress = F/A, strain = dL/L\n    pass` },
    interviewQuestions: [
      { round: "Technical", question: "Explain types of fits: Clearance, Transition, Interference", tip: "Clearance: shaft < hole; Transition: may or may not have clearance; Interference: shaft > hole (press fit)." },
      { round: "Technical", question: "What is FEA (Finite Element Analysis) and where is it used?", tip: "Discretizes structure into elements, solves stress/thermal/vibration at nodes. Used in structural validation." },
      { round: "Technical", question: "Explain hydraulic system components and Pascal's Law", tip: "Pressure applied at one point transmitted equally. Components: pump, valve, cylinder, reservoir, filter." }
    ]
  },
  {
    name: "L&T (Construction & Heavy Eng)", logo: "🏗️", color: "from-blue-700 to-gray-500", difficulty: "Medium",
    roles: ["GET", "Design Engineer", "Planning Engineer"],
    avgPackage: "₹7-14 LPA", rounds: ["Written (GATE level)", "Technical + HR"],
    codingQuestion: { title: "Beam Deflection", desc: "Calculate max deflection of a simply supported beam with central point load.", difficulty: "Medium", starter: `def beam_deflection(load_N, length_m, E_Pa, I_m4):\n    # delta_max = P*L^3 / (48*E*I)\n    pass` },
    interviewQuestions: [
      { round: "Technical", question: "Explain different types of welding: Arc, MIG, TIG, Friction Stir", tip: "Arc: electrode melts; MIG: continuous wire + shielding gas; TIG: tungsten electrode + argon; FSW: solid-state joining." },
      { round: "Technical", question: "What is the difference between hot working and cold working?", tip: "Hot working: above recrystallization temp, lower force, no strain hardening. Cold working: below, strain hardened, better finish." },
      { round: "Technical", question: "Explain preventive vs predictive maintenance strategies", tip: "Preventive: scheduled intervals; Predictive: condition-based using vibration analysis, thermography, oil analysis." }
    ]
  }
];

// ─── AIML / AIDS ─────────────────────────────────────────────────────────────
const AIML_COMPANIES: CompanyTrack[] = [
  {
    name: "Fractal Analytics", logo: "📊", color: "from-rose-600 to-pink-500", difficulty: "Medium",
    roles: ["Data Scientist", "ML Engineer", "Analytics Consultant"],
    avgPackage: "₹12-22 LPA", rounds: ["Aptitude + Case Study", "Technical (ML + Stats)", "Managerial + HR"],
    codingQuestion: { title: "Implement K-Nearest Neighbors", desc: "Write a simple KNN classifier from scratch using Euclidean distance.", difficulty: "Medium", starter: `import numpy as np\ndef knn_predict(X_train, y_train, x_test, k=3):\n    # Calculate distances and vote\n    pass` },
    interviewQuestions: [
      { round: "Technical", question: "Explain the Bias-Variance tradeoff with examples", tip: "High bias: underfitting (linear model on nonlinear data). High variance: overfitting (deep tree on small data)." },
      { round: "Case Study", question: "A retail client wants to reduce customer churn by 15%. How would you approach this?", tip: "Define churn, EDA, feature engineering (RFM), model (XGBoost/LogReg), evaluate recall, deploy with A/B test." },
      { round: "Technical", question: "What is the curse of dimensionality?", tip: "High-dimensional data becomes sparse, distance metrics lose meaning, overfitting risk increases." }
    ]
  },
  {
    name: "Tiger Analytics", logo: "🐅", color: "from-orange-600 to-red-600", difficulty: "Medium",
    roles: ["Data Scientist", "Senior Analyst", "ML Engineer"],
    avgPackage: "₹10-20 LPA", rounds: ["SQL + Python Test", "Case Study Presentation", "Technical + HR"],
    codingQuestion: { title: "Feature Scaling: Min-Max Normalization", desc: "Normalize a feature array to [0, 1] range.", difficulty: "Easy", starter: `def min_max_normalize(arr):\n    # (x - min) / (max - min)\n    pass` },
    interviewQuestions: [
      { round: "Technical", question: "Explain Random Forest and how it reduces overfitting vs Decision Tree", tip: "Ensemble of decorrelated trees via bagging + random feature subset. Averaging reduces variance." },
      { round: "Technical", question: "What is the difference between L1 and L2 regularization?", tip: "L1 (Lasso): sparse weights, feature selection; L2 (Ridge): small weights, no zeroing." },
      { round: "Case Study", question: "Build a recommendation system for an e-commerce platform", tip: "Collaborative filtering (user-user/item-item), content-based, hybrid. Metrics: MAP, NDCG." }
    ]
  },
  {
    name: "Google AI / DeepMind", logo: "🧠", color: "from-blue-500 to-green-500", difficulty: "Expert",
    roles: ["Research Scientist", "ML Engineer", "AI Resident"],
    avgPackage: "₹35-60 LPA", rounds: ["Phone Screen (Coding)", "4x Onsite (ML + Coding + Research)", "Team Match"],
    codingQuestion: { title: "Implement Gradient Descent", desc: "Implement batch gradient descent for linear regression from scratch.", difficulty: "Hard", starter: `import numpy as np\ndef gradient_descent(X, y, lr=0.01, epochs=1000):\n    # Initialize weights, iterate, update\n    pass` },
    interviewQuestions: [
      { round: "ML Design", question: "Design a content moderation system for YouTube", tip: "Multi-modal: text (NLP), image (CNN), video (temporal). Human-in-loop, threshold tuning, bias considerations." },
      { round: "Technical", question: "Explain attention mechanism in Transformers", tip: "Q, K, V matrices. Attention(Q,K,V) = softmax(QK^T / √dk) * V. Self-attention captures long-range dependencies." },
      { round: "Research", question: "How would you handle distribution shift in production ML models?", tip: "Monitor feature/prediction drift, retrain triggers, domain adaptation, importance weighting." }
    ]
  },
  {
    name: "Amazon AI / AWS ML", logo: "☁️", color: "from-orange-500 to-yellow-500", difficulty: "Hard",
    roles: ["Applied Scientist", "Data Scientist", "ML Engineer"],
    avgPackage: "₹25-45 LPA", rounds: ["Online Assessment", "Phone Screen", "4x Onsite (ML + LP + Coding)"],
    codingQuestion: { title: "Implement TF-IDF from Scratch", desc: "Calculate TF-IDF scores for documents.", difficulty: "Medium", starter: `import math\ndef compute_tfidf(documents):\n    # TF = term_count / total_terms; IDF = log(N / doc_count)\n    pass` },
    interviewQuestions: [
      { round: "ML Design", question: "Design a fraud detection system for Amazon Pay", tip: "Feature engineering (velocity, device, IP), ensemble models, real-time scoring, threshold vs cost analysis." },
      { round: "Leadership Principles", question: "Tell me about a time you used data to influence a business decision", tip: "Amazon LP: Dive Deep + Bias for Action. Show metrics, A/B testing, business impact." },
      { round: "Technical", question: "How do you handle class imbalance in classification?", tip: "SMOTE, undersampling, class weights, focal loss, ensemble methods, evaluation with PR-AUC." }
    ]
  }
];

// ─── AIDS ────────────────────────────────────────────────────────────────────
const AIDS_COMPANIES: CompanyTrack[] = [
  {
    name: "Mu Sigma", logo: "📈", color: "from-teal-600 to-orange-600", difficulty: "Medium",
    roles: ["Decision Scientist", "Data Analyst", "Business Analyst"],
    avgPackage: "₹8-14 LPA", rounds: ["Aptitude + Puzzles", "Case Study + SQL", "Technical + HR"],
    codingQuestion: { title: "SQL: Second Highest Salary", desc: "Write a query to find the second highest salary from an Employee table.", difficulty: "Easy", starter: `SELECT MAX(salary) AS second_highest\nFROM employee\nWHERE salary < (SELECT MAX(salary) FROM employee);` },
    interviewQuestions: [
      { round: "Case Study", question: "How would you measure the success of a new feature launch?", tip: "Define north-star metric, guardrail metrics, A/B test design, statistical significance." },
      { round: "Technical", question: "Explain the difference between supervised and unsupervised learning with examples", tip: "Supervised: labeled data, classification/regression. Unsupervised: clustering, dimensionality reduction." },
      { round: "Technical", question: "What is A/B testing and how do you determine sample size?", tip: "Power analysis based on effect size, significance level, and desired statistical power." }
    ]
  },
  {
    name: "LatentView Analytics", logo: "🔍", color: "from-indigo-600 to-purple-600", difficulty: "Medium",
    roles: ["Data Analyst", "ML Engineer", "Business Intelligence Analyst"],
    avgPackage: "₹7-13 LPA", rounds: ["Aptitude + SQL Test", "Case Study", "Technical + HR"],
    codingQuestion: { title: "Pandas: Group and Aggregate", desc: "Given sales data, compute total revenue per region using pandas groupby.", difficulty: "Easy", starter: `import pandas as pd\ndef revenue_by_region(df):\n    # df.groupby(...).sum()\n    pass` },
    interviewQuestions: [
      { round: "Technical", question: "Explain precision, recall, and F1-score with a real example", tip: "Precision: of predicted positives, how many correct. Recall: of actual positives, how many caught. F1 balances both." },
      { round: "Case Study", question: "A dashboard shows declining daily active users. How do you investigate?", tip: "Segment by cohort, platform, geography; check for tracking bugs before assuming real decline." },
      { round: "Technical", question: "What is data leakage in machine learning and how do you prevent it?", tip: "Leakage happens when training data includes information unavailable at prediction time; prevent with proper train/test splits and time-aware validation." }
    ]
  },
  {
    name: "Karza Technologies", logo: "🛡️", color: "from-slate-600 to-blue-700", difficulty: "Medium",
    roles: ["Data Scientist", "NLP Engineer", "Computer Vision Engineer"],
    avgPackage: "₹9-16 LPA", rounds: ["Technical Test (ML + Python)", "Case Study", "Technical + HR"],
    codingQuestion: { title: "Text Preprocessing Pipeline", desc: "Write a function to lowercase, remove punctuation, and tokenize a sentence.", difficulty: "Easy", starter: `import re\ndef preprocess(text):\n    # lowercase, strip punctuation, split into tokens\n    pass` },
    interviewQuestions: [
      { round: "Technical", question: "Explain how a convolutional neural network processes an image", tip: "Filters slide over the image detecting local patterns (edges, textures), pooling reduces dimensionality, deeper layers capture higher-level features." },
      { round: "Technical", question: "What is named entity recognition and where is it used?", tip: "Identifying entities like names, dates, organizations in text; used in document parsing, KYC automation, search." },
      { round: "Case Study", question: "Design a system to verify identity documents automatically", tip: "OCR extraction, field validation, fraud pattern detection, human-in-the-loop for edge cases." }
    ]
  }
];

// ─── LOOKUP ──────────────────────────────────────────────────────────────────
export function getBranchCompanies(branchId: string | null): CompanyTrack[] {
  if (!branchId) return CSE_COMPANIES;
  const b = branchId.toLowerCase();
  if (b === "cse") return CSE_COMPANIES;
  if (b === "it") return IT_COMPANIES;
  if (b === "aiml") return AIML_COMPANIES;
  if (b === "aids") return AIDS_COMPANIES;
  if (b === "ece") return ECE_COMPANIES;
  if (b === "eee") return EEE_COMPANIES;
  if (b === "mech") return MECH_COMPANIES;
  return CSE_COMPANIES;
}
