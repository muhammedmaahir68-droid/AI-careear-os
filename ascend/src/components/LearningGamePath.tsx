import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Trophy, Gem, Lock, CheckCircle2, Sparkles, BookOpen,
  ArrowRight, Gift, X, Zap, Target, ChevronDown, ChevronRight,
  Code2, Brain, Cpu, Bolt, Wrench, Building, Database, Shield,
  Lightbulb, HelpCircle, FileText, Check, Award
} from "lucide-react";
import GamificationModal, { LEAGUES } from "./GamificationModal";
import { recordUserProgress } from "../services/api";

// ─────────────────────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────────────────────
export interface LessonNode {
  id: string;
  step: number;
  category: string;
  title: string;
  type: "lesson" | "quiz" | "code" | "chest" | "boss";
  xpReward: number;
  diamondReward: number;
  theory?: {
    summary: string;
    detailedContent?: string;      // Multi-paragraph textbook-grade study material
    keyPoints: string[];
    formula?: string;
    code?: string;
    examples?: string[];           // Real worked examples
    placementTips?: string[];       // Secret tips for TCS / Amazon / Google placement exams
  };
  questions?: Array<{
    prompt: string;
    options: string[];
    correct: number;
    explanation: string;
  }>;
}

interface LearningGamePathProps {
  branchId?: string | null;
  roleId?: string | null;
  onNodeComplete?: (xp: number, diamonds: number) => void;
}

// ─────────────────────────────────────────────────────────────────────────────
// MASSIVE DETAILED SYLLABUS DATA — TEXTBOOK GRADE CONTENT
// ─────────────────────────────────────────────────────────────────────────────
export function getCoursePath(branchId: string, roleId?: string | null): LessonNode[] {
  const b = (branchId || "cse").toLowerCase();
  const r = (roleId || "").toLowerCase();

  // ── CSE ──────────────────────────────────────────────────────────────────
  if (b === "cse") {
    const base: LessonNode[] = [
      // Phase 1 — Math & Aptitude Foundations
      {
        id: "cse-1",
        step: 1,
        category: "Phase 1 – Aptitude Foundations",
        title: "Number Systems, Divisibility & HCF/LCM Mastery",
        type: "lesson",
        xpReward: 40,
        diamondReward: 10,
        theory: {
          summary: "Master fundamental arithmetic principles, prime factorizations, remainder theorems, and rapid HCF/LCM shortcuts essential for TCS NQT, Wipro, Infosys, and Amazon written assessment rounds.",
          detailedContent: `
### 1. Fundamental Properties of Number Systems
Numbers form the backbone of quantitative aptitude and computer algorithms. Understanding their classification allows fast pattern recognition in competitive exams:
- Natural Numbers: {1, 2, 3, ...}
- Prime Numbers: Numbers greater than 1 with exactly two distinct positive divisors (1 and itself). Note that 2 is the only even prime number.
- Co-Prime Numbers: Two numbers a and b are co-prime if GCD(a, b) = 1.

### 2. Divisibility Rules Shortcut Table
- Divisibility by 3: Sum of digits must be divisible by 3.
- Divisibility by 4: Last two digits formed must be divisible by 4.
- Divisibility by 7: Double the last digit and subtract it from the remaining number. If the result is divisible by 7, the original number is too.
- Divisibility by 11: Difference between sum of digits at odd places and sum of digits at even places must be 0 or a multiple of 11.

### 3. Highest Common Factor (HCF) & Least Common Multiple (LCM)
The HCF (or GCD) is the largest positive integer that divides each of the integers without a remainder. The LCM is the smallest positive integer divisible by each of the integers.

Key Theorem:
HCF(a, b) * LCM(a, b) = a * b

Fraction Formulae:
HCF of Fractions = HCF of Numerators / LCM of Denominators
LCM of Fractions = LCM of Numerators / HCF of Denominators

### 4. Cyclicity of Unit Digits
To find the unit digit of x^n, look at the base's last digit:
- 0, 1, 5, 6: Always repeat as the last digit (6^k always ends in 6).
- 4, 9: Cyclicity of 2 (4^1=4, 4^2=6, 4^3=4...).
- 2, 3, 7, 8: Cyclicity of 4 (7^1=7, 7^2=9, 7^3=3, 7^4=1). Divide exponent by 4 and use remainder as exponent.
          `,
          keyPoints: [
            "HCF × LCM = Product of two numbers (valid ONLY for 2 numbers)",
            "HCF of fractions = HCF(Numerators) / LCM(Denominators)",
            "Unit digit of numbers ending in 2, 3, 7, 8 repeats every 4 powers",
            "Sum of first N natural numbers = N(N + 1) / 2",
            "Sum of squares of first N natural numbers = N(N + 1)(2N + 1) / 6"
          ],
          formula: "HCF(a, b) × LCM(a, b) = a × b",
          examples: [
            "Example 1: Find the HCF and LCM of 36 and 48.\nFactorization: 36 = 2² × 3², 48 = 2⁴ × 3¹.\nHCF = 2² × 3¹ = 12.\nLCM = 2⁴ × 3² = 144.\nVerification: 12 × 144 = 1728 = 36 × 48.",
            "Example 2: Find the unit digit of 7^{95} - 3^{58}.\n7 has cyclicity 4. 95 mod 4 = 3 → 7³ ends in 3.\n3 has cyclicity 4. 58 mod 4 = 2 → 3² ends in 9.\nUnit digit = 13 - 9 = 4."
          ],
          placementTips: [
            "TCS NQT loves questions asking for the smallest number which leaves a specific remainder when divided by a set of numbers. Use LCM(a, b, c) + Remainder.",
            "Infosys frequently asks questions involving unit digits of huge exponents like 23^{4567}."
          ]
        },
        questions: [
          { prompt: "Find the HCF of 36 and 48.", options: ["6", "12", "18", "24"], correct: 1, explanation: "Prime factorizations: 36 = 2²×3², 48 = 2⁴×3¹. Lowest power of common factors: 2²×3¹ = 12." },
          { prompt: "What is the unit digit of 7^105?", options: ["1", "3", "7", "9"], correct: 2, explanation: "7 has cyclicity of 4. 105 mod 4 = 1. So 7^1 = 7." },
          { prompt: "The product of two numbers is 2028 and their HCF is 13. How many such pairs exist?", options: ["1", "2", "3", "4"], correct: 1, explanation: "Let numbers be 13a & 13b. 13a × 13b = 2028 → a × b = 12. Co-prime pairs for (a,b) are (1,12) and (3,4). So 2 pairs." }
        ]
      },
      {
        id: "cse-2",
        step: 2,
        category: "Phase 1 – Aptitude Foundations",
        title: "Percentages, Profit, Loss & Discount Formulas",
        type: "quiz",
        xpReward: 40,
        diamondReward: 10,
        theory: {
          summary: "Complete mastery of percentage increases/decreases, markups, successive discounts, and margin calculations required for campus recruitment screening tests.",
          detailedContent: `
### 1. Understanding Percentages as Multipliers
Percentage means "per hundred". Converting percentages into decimal multipliers simplifies complex multi-step problems:
- A 20% increase => multiply by 1.20
- A 15% decrease => multiply by 0.85
- Successive changes of +a% and +b% result in a net change of: Net Change % = a + b + (a * b) / 100

### 2. Profit and Loss Essentials
- Cost Price (CP): Price at which an article is bought.
- Selling Price (SP): Price at which an article is sold.
- Profit % = (SP - CP) / CP * 100
- Loss % = (CP - SP) / CP * 100

### 3. Marked Price (MP) and Discount
Discounts are ALWAYS calculated on the Marked Price (List Price):
- Discount = MP - SP
- Discount % = Discount / MP * 100
- Two successive discounts of d1% and d2% are equivalent to a single discount of: Single Discount % = d1 + d2 - (d1 * d2) / 100
          `,
          keyPoints: [
            "Net percentage change for +x% followed by -x% is ALWAYS a loss of (x/100)² %",
            "Discounts are calculated on Marked Price (MP), while Profit/Loss is on Cost Price (CP)",
            "If CP of X articles = SP of Y articles, Profit/Loss % = (X - Y) / Y × 100"
          ],
          formula: "Net % Change = a + b + (a × b) / 100",
          examples: [
            "Example: A trader marks goods 30% above CP and offers a 10% discount. Find profit %.\nLet CP = 100. MP = 130.\nDiscount = 10% of 130 = 13.\nSP = 130 - 13 = 117.\nProfit = SP - CP = 17%."
          ],
          placementTips: [
            "When given 'Buy 3 Get 1 Free', discount % = Free Quantity / Total Quantity × 100 = 1/4 × 100 = 25%."
          ]
        },
        questions: [
          { prompt: "A 20% increase in price followed by a 20% decrease yields a net change of:", options: ["0%", "-4%", "+4%", "-2%"], correct: 1, explanation: "Net change = 20 - 20 + (20×(-20))/100 = -4% (a 4% decrease)." },
          { prompt: "If cost price of 15 articles equals selling price of 12 articles, profit percentage is:", options: ["20%", "25%", "30%", "33.3%"], correct: 1, explanation: "Profit % = (15 - 12) / 12 × 100 = 3/12 × 100 = 25%." }
        ]
      },
      {
        id: "cse-3",
        step: 3,
        category: "Phase 1 – Aptitude Foundations",
        title: "Time, Speed, Distance & Work Efficiency",
        type: "quiz",
        xpReward: 40,
        diamondReward: 10,
        theory: {
          summary: "Comprehensive breakdown of relative velocity, train crossing problems, pipes & cisterns, and collaborative work efficiency rates.",
          detailedContent: `
### 1. Time, Speed and Distance
Speed = Distance / Time
- Unit Conversions: 1 km/h = 5/18 m/s, 1 m/s = 18/5 km/h

### 2. Relative Speed
- Objects moving in opposite directions: Relative Speed = v1 + v2
- Objects moving in same direction: Relative Speed = |v1 - v2|

### 3. Work & Time (Unitary Method)
If a person completes a job in N days, their 1-day work rate is 1/N.
If Person A takes A days and Person B takes B days, together they complete the work in:
Combined Time = (A * B) / (A + B) days
          `,
          keyPoints: [
            "Speed is inversely proportional to Time when Distance is constant",
            "Average Speed for equal distances at speeds u and v = 2uv / (u + v)",
            "Pipes filling a tank add to rate; inlet (+) and outlet (-) pipe rates combine linearly"
          ],
          formula: "Combined Work Time = (A × B) / (A + B)",
          examples: [
            "Example: A train 150m long crosses a pole in 9 seconds. Find speed in km/h.\nSpeed = 150m / 9s = 50/3 m/s.\nIn km/h = (50/3) × (18/5) = 60 km/h."
          ]
        },
        questions: [
          { prompt: "Person A finishes a task in 6 days, Person B in 12 days. Working together, they finish in:", options: ["4 days", "3 days", "8 days", "5 days"], correct: 0, explanation: "Combined time = (6 × 12) / (6 + 12) = 72 / 18 = 4 days." },
          { prompt: "Two trains 100m and 120m long move towards each other at 54 km/h and 36 km/h. Time to cross each other completely?", options: ["6.2s", "8.8s", "12s", "15s"], correct: 1, explanation: "Total Distance = 100+120=220m. Relative Speed = 54+36 = 90 km/h = 90×(5/18) = 25 m/s. Time = 220/25 = 8.8s." }
        ]
      },
      { id: "cse-chest-1", step: 4, category: "Phase 1 – Aptitude Foundations", title: "🎁 Aptitude Champion Chest", type: "chest", xpReward: 100, diamondReward: 40 },

      // Phase 2 — Core Programming & DSA
      {
        id: "cse-5",
        step: 5,
        category: "Phase 2 – Core DSA", title: "Arrays, Memory Allocation & Sliding Window", type: "lesson", xpReward: 60, diamondReward: 15,
        theory: {
          summary: "Deep dive into memory layout of multi-dimensional arrays, Kadane's algorithm, two-pointer techniques, and sliding window patterns that appear in 80% of Tier-1 software engineer interviews.",
          detailedContent: `
### 1. Array Memory Layout & Pointer Arithmetic
An array is a contiguous block of memory storing elements of the same data type.
- Row-Major Order (C, C++, Java): Address(A[i][j]) = Base + (i * N + j) * sizeof(type)
- Column-Major Order (FORTRAN, MATLAB): Address(A[i][j]) = Base + (j * M + i) * sizeof(type)

### 2. Kadane's Algorithm for Maximum Subarray Sum
Kadane's algorithm solves the Maximum Subarray Sum problem in O(N) time instead of O(N^2) brute-force.

Intuition: At each index i, we decide whether to add the current element to the existing contiguous subarray sum or start a new subarray beginning at index i.
current_sum = max(arr[i], current_sum + arr[i])
max_sum = max(max_sum, current_sum)

### 3. Two-Pointer & Sliding Window Techniques
- Fixed Sliding Window: Used when subarray size K is given (e.g., max sum of K consecutive elements). Maintain sum by adding incoming element and subtracting outgoing element in O(1).
- Variable Sliding Window: Expand right pointer to satisfy condition, shrink left pointer to optimize window size (e.g., shortest subarray with sum >= S).
          `,
          keyPoints: [
            "Kadane's algorithm runs in O(N) time and O(1) auxiliary space",
            "Sliding window reduces sub-array search from O(N²) down to linear O(N)",
            "Prefix Sum array enables O(1) range sum queries between indices L and R: Sum(L..R) = Prefix[R] - Prefix[L-1]"
          ],
          formula: "Address(A[i]) = Base + i × sizeof(Type)",
          code: `// Fixed Sliding Window: Max sum of subarray of size K
function maxSubarraySumK(arr, k) {
  let maxSum = 0, windowSum = 0;
  for (let i = 0; i < k; i++) windowSum += arr[i];
  maxSum = windowSum;
  for (let i = k; i < arr.length; i++) {
    windowSum += arr[i] - arr[i - k];
    maxSum = Math.max(maxSum, windowSum);
  }
  return maxSum;
}`,
          placementTips: [
            "In LeetCode / Product-company interviews, if a problem asks for contiguous subarrays, immediately evaluate Sliding Window or Kadane's algorithm before considering dynamic programming."
          ]
        },
        questions: [
          { prompt: "What is the time complexity of Kadane's algorithm for max subarray sum?", options: ["O(N²)", "O(N log N)", "O(N)", "O(1)"], correct: 2, explanation: "Kadane's algorithm performs a single linear scan over the array, making it O(N) time." },
          { prompt: "Which technique is best suited for finding the longest substring without repeating characters?", options: ["Binary Search", "Variable Sliding Window + Hash Set", "Kadane's Algorithm", "Divide and Conquer"], correct: 1, explanation: "Variable sliding window with 2 pointers (left & right) tracking unique characters in a HashSet achieves optimal O(N) time." }
        ]
      },
      {
        id: "cse-6",
        step: 6,
        category: "Phase 2 – Core DSA", title: "Linked Lists & Floyd's Cycle Detection Algorithm", type: "lesson", xpReward: 60, diamondReward: 15,
        theory: {
          summary: "Master singly and doubly linked lists, memory pointer overheads, list reversal algorithms, and Floyd's Tortoise and Hare cycle detection mechanism.",
          detailedContent: `
### 1. Linked List Structure vs Array
Unlike arrays, linked list elements are non-contiguous in memory. Each node consists of:
- Data Field: Stores the payload.
- Next Pointer: Stores the memory address of the next node.

Trade-offs:
- Arrays: O(1) random access, but resizing requires contiguous allocation (O(N) copy).
- Linked Lists: Dynamic allocation, O(1) head insertion/deletion, but O(N) lookup time and additional pointer memory overhead (8 bytes per pointer on 64-bit systems).

### 2. Floyd's Cycle Detection (Tortoise and Hare)
To detect if a linked list contains a cycle without extra memory (O(1) space):
- Maintain two pointers: Slow (moves 1 step at a time) and Fast (moves 2 steps at a time).
- If there is a cycle, the fast pointer will eventually overlap with the slow pointer inside the loop.
- Proof of Convergence: Every step, the gap between Fast and Slow decreases by 1 node inside the cycle.
          `,
          keyPoints: [
            "Floyd's Tortoise and Hare algorithm detects cycle in O(N) time and O(1) space",
            "Reversing a Linked List in-place requires 3 pointers: prev, current, next",
            "To find the middle of a linked list in 1 pass, move slow by 1 step and fast by 2 steps"
          ],
          code: `// In-Place Linked List Reversal
function reverseList(head) {
  let prev = null, curr = head;
  while (curr !== null) {
    let nextTemp = curr.next;
    curr.next = prev;
    prev = curr;
    curr = nextTemp;
  }
  return prev;
}`,
          placementTips: [
            "Amazon and Microsoft frequently ask candidates to find the starting node of the cycle. Once fast and slow meet, reset slow to head; move both 1 step at a time until they meet again at the entry node."
          ]
        },
        questions: [
          { prompt: "What are the space and time complexities of Floyd's Cycle Detection algorithm?", options: ["Time O(N), Space O(N)", "Time O(N²), Space O(1)", "Time O(N), Space O(1)", "Time O(1), Space O(1)"], correct: 2, explanation: "Floyd's algorithm uses 2 pointers giving O(1) extra space and traverses the list in O(N) time." },
          { prompt: "To reverse a singly linked list in-place, how many pointer variables are minimally required?", options: ["1", "2", "3", "4"], correct: 2, explanation: "3 pointers are required: 'prev' (previous node), 'curr' (current node being re-linked), and 'nextTemp' (to save pointer to remaining list)." }
        ]
      },
      { id: "cse-chest-2", step: 7, category: "Phase 2 – Core DSA", title: "🎁 DSA Master Diamond Chest", type: "chest", xpReward: 200, diamondReward: 80 },

      // Phase 3 — Systems & CS Core
      {
        id: "cse-11",
        step: 8,
        category: "Phase 3 – CS Core Theory", title: "Operating Systems: CPU Scheduling & Deadlocks", type: "lesson", xpReward: 70, diamondReward: 18,
        theory: {
          summary: "In-depth study of process lifecycle, CPU scheduling algorithms (FCFS, SJF, Round Robin, SRTF), and Coffman's 4 necessary conditions for OS deadlocks.",
          detailedContent: `
### 1. Process States & CPU Scheduling Metrics
A process transitions through states: New -> Ready -> Running -> Waiting -> Terminated.

Key Metrics:
- Turnaround Time (TAT) = Completion Time - Arrival Time
- Waiting Time (WT) = Turnaround Time - Burst Time
- Response Time (RT) = First CPU Allocation Time - Arrival Time

### 2. Scheduling Algorithms
- First-Come First-Served (FCFS): Non-preemptive. Suffers from Convoy Effect (short processes wait behind long ones).
- Shortest Job First (SJF): Optimal minimum average waiting time, but susceptible to starvation of long processes.
- Round Robin (RR): Preemptive with Time Quantum (Q). Gives fast response time for interactive systems.

### 3. Deadlocks & Coffman's 4 Necessary Conditions
A deadlock occurs when processes are unable to proceed because each is waiting for a resource held by another. All 4 conditions MUST hold simultaneously:
1. Mutual Exclusion: At least one resource must be held in a non-shareable mode.
2. Hold and Wait: Process holding resources can request additional resources currently held by others.
3. No Preemption: Resources cannot be forcibly taken from a process; only voluntarily released.
4. Circular Wait: A closed chain of processes exists where each process holds resources needed by the next.

Banker's Algorithm: Used for deadlock avoidance by verifying whether allocating a resource leaves the system in a Safe State.
          `,
          keyPoints: [
            "Convoy effect happens in non-preemptive FCFS when long CPU-bound process blocks short I/O-bound processes",
            "The 4 Coffman conditions for deadlock: Mutual Exclusion, Hold & Wait, No Preemption, Circular Wait",
            "Banker's Algorithm guarantees deadlock avoidance by checking safe sequences using Work and Need matrices"
          ],
          formula: "Turnaround Time = Completion Time − Arrival Time",
          placementTips: [
            "GATE CS and MNC technical interviews constantly ask numerical problems to compute average Waiting Time under Round Robin scheduling."
          ]
        },
        questions: [
          { prompt: "Which CPU scheduling algorithm can cause the Convoy Effect?", options: ["Round Robin", "Shortest Job First", "First-Come First-Served (FCFS)", "Priority Preemptive"], correct: 2, explanation: "FCFS suffers from the Convoy Effect when a heavy process delays all subsequent shorter processes." },
          { prompt: "Which of the following is NOT one of Coffman's 4 necessary conditions for deadlock?", options: ["Mutual Exclusion", "Preemption allowed", "Hold & Wait", "Circular Wait"], correct: 1, explanation: "The condition is 'No Preemption'. If preemption IS allowed, deadlock cannot occur." }
        ]
      },
      {
        id: "cse-boss-1",
        step: 9,
        category: "Phase 4 – MNC Placement Boss 🏆", title: "BOSS: Tier-1 Product Company Final Placement Round", type: "boss", xpReward: 500, diamondReward: 200,
        questions: [
          { prompt: "Given an array nums = [2,7,11,15] and target = 9, what is the most optimal algorithm to return indices of the two numbers that add up to target?", options: ["O(N²) brute force nested loops", "O(N log N) sort array then binary search", "O(N) single-pass HashMap storing target - num complement", "O(N log N) Heap allocation"], correct: 2, explanation: "A single-pass HashMap maps value to index. For each element x, check if (target - x) exists in map. Time O(N), Space O(N)." },
          { prompt: "Which data structure is naturally used to implement a Min-Heap and Priority Queue with O(log N) insertion and extraction?", options: ["Doubly Linked List", "Binary Heap Array", "B-Tree", "Red-Black Tree"], correct: 1, explanation: "A Binary Heap stored as an array provides parent i at floor((i-1)/2) and children at 2i+1, 2i+2. Provides O(log N) push/pop." }
        ]
      }
    ];

    if (r.includes("backend")) {
      base.push({
        id: "cse-be-1", step: 10, category: "Role Track – Backend Engineer", title: "REST API Principles, HTTP Status Codes & DB Indexing", type: "lesson", xpReward: 80, diamondReward: 20,
        theory: {
          summary: "Architecting scalable RESTful web APIs, understanding idempotency, B-Tree index structures, and ACID database isolation levels.",
          detailedContent: `
### 1. REST Architecture & HTTP Verbs
REST (Representational State Transfer) uses standard HTTP methods:
- GET: Retrieve resource. Safe & Idempotent.
- POST: Create resource. Non-idempotent.
- PUT: Replace entire resource or create if missing. Idempotent.
- PATCH: Partial modification of resource.
- DELETE: Remove resource. Idempotent.

### 2. HTTP Status Code Hierarchy
- 2xx Success: 200 OK, 201 Created, 204 No Content
- 3xx Redirection: 301 Moved Permanently, 304 Not Modified
- 4xx Client Errors: 400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found
- 5xx Server Errors: 500 Internal Server Error, 502 Bad Gateway, 503 Service Unavailable

### 3. Database B-Tree Indexing
Indexes speed up read queries at the cost of slower writes (O(log N) search vs O(N) full table scan).
- B-Tree stores data in balanced leaves, minimizing disk I/O seek operations.
- Composite Index (A, B) covers queries filtering on A OR (A, B), but CANNOT optimize queries filtering on B alone due to Leftmost Prefix Rule.
          `,
          keyPoints: [
            "GET, PUT, DELETE are idempotent HTTP methods; POST is non-idempotent",
            "B-Tree indexes reduce database search time from O(N) to O(log N)",
            "Composite index (A, B) requires Leftmost Prefix Rule: queries on B alone bypass index"
          ],
          code: `// Express REST API Endpoint with Error Handling
app.get('/api/users/:id', async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.status(200).json(user);
  } catch (err) {
    next(err); // Pass to global error handler
  }
});`
        },
        questions: [
          { prompt: "Which of the following HTTP methods is NOT idempotent?", options: ["GET", "PUT", "POST", "DELETE"], correct: 2, explanation: "POST is non-idempotent because making multiple identical POST requests creates multiple duplicate resources." }
        ]
      });
    }
    return base;
  }

  // Fallback for other branches with deep detailed content
  return [
    {
      id: "ai-1", step: 1, category: "Phase 1 – AI Foundations", title: "Linear Algebra: Matrices, Vectors & PCA", type: "lesson", xpReward: 50, diamondReward: 12,
      theory: {
        summary: "Comprehensive study of vector spaces, matrix multiplication, determinants, eigenvalues, eigenvectors, and Principal Component Analysis (PCA).",
        detailedContent: `
### 1. Vectors and Matrix Transformation
Matrices act as linear transformations mapping vectors from one space to another.
A * v = λ * v
Where v is an eigenvector and λ is the corresponding scalar eigenvalue.

### 2. Principal Component Analysis (PCA)
PCA is an unsupervised dimensionality reduction technique that finds orthogonal directions (principal components) of maximum variance in high-dimensional data.
1. Center data by subtracting mean vector.
2. Compute Covariance Matrix Σ = (1/N) * X^T * X.
3. Calculate eigenvalues and eigenvectors of Σ.
4. Sort eigenvectors by decreasing eigenvalue; project data onto top K eigenvectors.
        `,
        keyPoints: [
          "Eigenvectors represent axes of maximum variance in dataset covariance matrix",
          "PCA minimizes reconstruction MSE while maximizing projected variance",
          "Matrix dot product measures directional similarity: a · b = ||a|| ||b|| cos(θ)"
        ],
        formula: "det(A - λI) = 0"
      },
      questions: [
        { prompt: "Principal Component Analysis (PCA) computes eigenvectors of which matrix?", options: ["Identity Matrix", "Covariance Matrix", "Hessian Matrix", "Transition Matrix"], correct: 1, explanation: "PCA decomposes the Covariance Matrix of features to find orthogonal axes of maximum variance." }
      ]
    }
  ];
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN GAME PATH COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
export default function LearningGamePath({ branchId = "cse", roleId, onNodeComplete }: LearningGamePathProps) {
  const [userXp, setUserXp] = useState(() => parseInt(localStorage.getItem("user_xp") || "0", 10));
  const [userDiamonds, setUserDiamonds] = useState(() => parseInt(localStorage.getItem("user_diamonds") || "0", 10));
  const [completedIds, setCompletedIds] = useState<Set<string>>(() => {
    try { return new Set(JSON.parse(localStorage.getItem("completed_ids") || "[]")); }
    catch { return new Set(); }
  });

  const [activeNode, setActiveNode] = useState<LessonNode | null>(null);
  const [modalTab, setModalTab] = useState<"textbook" | "formulas" | "placement">("textbook");
  const [step, setStep] = useState<"theory" | "quiz">("theory");
  const [qIdx, setQIdx] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [showReward, setShowReward] = useState(false);
  const [lastCompleted, setLastCompleted] = useState<LessonNode | null>(null);

  const nodes = useMemo(() => getCoursePath(branchId || "cse", roleId), [branchId, roleId]);

  const phases = useMemo(() => {
    const map = new Map<string, LessonNode[]>();
    for (const n of nodes) {
      if (!map.has(n.category)) map.set(n.category, []);
      map.get(n.category)!.push(n);
    }
    return Array.from(map.entries());
  }, [nodes]);

  const currentLeague = LEAGUES.slice().reverse().find(l => userXp >= l.minXp) || LEAGUES[0];

  const isUnlocked = (node: LessonNode): boolean => {
    if (completedIds.has(node.id)) return true;
    const prev = nodes.find(n => n.step === node.step - 1);
    return !prev || completedIds.has(prev.id);
  };

  const openNode = (node: LessonNode) => {
    if (!isUnlocked(node)) return;
    setActiveNode(node);
    setModalTab("textbook");
    setStep(node.theory ? "theory" : "quiz");
    setQIdx(0);
    setSelected(null);
    setSubmitted(false);

    if (node.type === "chest") {
      completeNode(node);
    }
  };

  const completeNode = (node: LessonNode) => {
    const newXp = userXp + node.xpReward;
    const newD = userDiamonds + node.diamondReward;
    setUserXp(newXp);
    setUserDiamonds(newD);
    localStorage.setItem("user_xp", String(newXp));
    localStorage.setItem("user_diamonds", String(newD));

    const next = new Set(completedIds);
    next.add(node.id);
    setCompletedIds(next);
    localStorage.setItem("completed_ids", JSON.stringify([...next]));

    recordUserProgress({ type: "lesson_complete", score: 100, xpEarned: node.xpReward, diamondsEarned: node.diamondReward });
    if (onNodeComplete) onNodeComplete(node.xpReward, node.diamondReward);

    setLastCompleted(node);
    setShowReward(true);
  };

  const handleNextQuestion = () => {
    if (!activeNode?.questions) return;
    if (qIdx + 1 < activeNode.questions.length) {
      setQIdx(q => q + 1);
      setSelected(null);
      setSubmitted(false);
    } else {
      completeNode(activeNode);
    }
  };

  const nodeIcon = (n: LessonNode, done: boolean, unlocked: boolean) => {
    if (done) return <CheckCircle2 size={30} className="text-slate-950 stroke-[2.5]" />;
    if (!unlocked) return <Lock size={24} className="text-slate-600" />;
    if (n.type === "chest") return <Gift size={28} className="text-yellow-300 animate-bounce" />;
    if (n.type === "boss") return <Trophy size={28} className="text-amber-400" />;
    if (n.type === "code") return <Code2 size={26} className="text-cyan-300" />;
    return <BookOpen size={26} className="text-white" />;
  };

  const nextNode = nodes.find(n => !completedIds.has(n.id));

  return (
    <div className="w-full space-y-8 pb-20 text-slate-100">
      {/* ── HEADER STATS ── */}
      <div className="relative overflow-hidden rounded-3xl p-6 bg-gradient-to-br from-slate-900 via-purple-950/60 to-slate-950 border border-purple-500/30 shadow-2xl">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <div className="flex flex-wrap gap-2 mb-2">
              <span className="text-[11px] font-extrabold uppercase tracking-widest text-purple-400 bg-purple-500/10 px-3 py-1 rounded-full border border-purple-500/20">
                {branchId?.toUpperCase() || "CSE"} — Comprehensive Study Path
              </span>
              {nextNode && (
                <span className="text-[11px] font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20 animate-pulse">
                  ▶ Active: Step {nextNode.step}
                </span>
              )}
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-2">
              Deep Technical Curriculum <Sparkles size={22} className="text-amber-400" />
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">Read textbook-grade theory notes, review interview formulas, solve practice exams, and get placement certified.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-sm font-bold">
              <Zap size={15} /> {userXp} XP
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-sm font-bold">
              <Gem size={15} /> {userDiamonds} 💎
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-4">
          <div className="flex justify-between text-xs text-slate-500 mb-1">
            <span>{completedIds.size} of {nodes.length} syllabus modules complete</span>
            <span>{Math.round((completedIds.size / nodes.length) * 100)}%</span>
          </div>
          <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-purple-500 to-cyan-400 rounded-full"
              animate={{ width: `${(completedIds.size / nodes.length) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>
      </div>

      {/* ── PATH NODES ── */}
      <div className="space-y-10">
        {phases.map(([category, phaseNodes]) => (
          <div key={category} className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-px flex-1 bg-slate-800" />
              <span className="text-xs font-bold uppercase tracking-widest text-slate-400 px-4 py-1.5 rounded-full border border-slate-800 bg-slate-900 whitespace-nowrap">
                {category}
              </span>
              <div className="h-px flex-1 bg-slate-800" />
            </div>

            <div className="flex flex-col items-center gap-10 relative">
              {phaseNodes.map((node, idx) => {
                const done = completedIds.has(node.id);
                const unlocked = isUnlocked(node);
                const offsets = [0, -100, 100, -60, 60, 0, -80, 80];
                const xOffset = offsets[idx % offsets.length];

                return (
                  <div key={node.id} className="flex flex-col items-center relative" style={{ transform: `translateX(${xOffset}px)` }}>
                    {idx < phaseNodes.length - 1 && (
                      <div className="absolute top-[72px] left-1/2 -translate-x-1/2 w-0.5 h-12 bg-gradient-to-b from-purple-500/40 to-transparent" />
                    )}

                    <motion.button
                      whileHover={{ scale: unlocked ? 1.08 : 1 }}
                      whileTap={{ scale: unlocked ? 0.95 : 1 }}
                      onClick={() => openNode(node)}
                      disabled={!unlocked}
                      className={`relative w-[72px] h-[72px] rounded-full border-4 flex items-center justify-center shadow-xl transition-all ${
                        done
                          ? "bg-gradient-to-tr from-amber-400 to-yellow-300 border-amber-200 shadow-amber-400/40"
                          : unlocked
                          ? node.type === "boss"
                            ? "bg-gradient-to-tr from-rose-600 to-orange-500 border-orange-300 shadow-rose-500/40 animate-pulse"
                            : node.type === "chest"
                            ? "bg-gradient-to-tr from-amber-500 to-yellow-400 border-yellow-200 shadow-amber-400/40"
                            : "bg-gradient-to-tr from-purple-600 to-cyan-500 border-cyan-300 shadow-purple-500/40 animate-pulse"
                          : "bg-slate-900 border-slate-700 cursor-not-allowed"
                      }`}
                    >
                      {nodeIcon(node, done, unlocked)}
                      <span className="absolute -top-1 -left-1 w-5 h-5 rounded-full bg-slate-900 border border-slate-700 text-[9px] font-bold text-slate-400 flex items-center justify-center">
                        {node.step}
                      </span>
                    </motion.button>

                    <div className="mt-2 text-center max-w-[180px]">
                      <p className="text-xs font-bold text-white line-clamp-2">{node.title}</p>
                      <div className="flex items-center justify-center gap-2 mt-0.5">
                        <span className="text-[10px] text-amber-400 font-mono">+{node.xpReward} XP</span>
                        <span className="text-[10px] text-cyan-400 font-mono">+{node.diamondReward} 💎</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* ── EXPANDED DETAILED STUDY MODAL ── */}
      <AnimatePresence>
        {activeNode && activeNode.type !== "chest" && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-4xl max-h-[92vh] flex flex-col rounded-3xl bg-slate-900 border border-purple-500/30 shadow-2xl overflow-hidden"
            >
              {/* Modal Header */}
              <div className="p-6 border-b border-slate-800 flex justify-between items-start bg-slate-950/60">
                <div>
                  <span className="text-[11px] font-extrabold uppercase tracking-widest text-purple-400">
                    Step {activeNode.step} • {activeNode.category}
                  </span>
                  <h3 className="text-2xl font-extrabold text-white mt-1">{activeNode.title}</h3>
                </div>
                <button
                  onClick={() => setActiveNode(null)}
                  className="p-2.5 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Sub-Navigation Tabs inside Lesson Modal */}
              {step === "theory" && (
                <div className="flex border-b border-slate-800 bg-slate-950/40 px-6 gap-2 pt-2">
                  <button
                    onClick={() => setModalTab("textbook")}
                    className={`pb-3 px-4 text-xs font-bold transition-all border-b-2 flex items-center gap-1.5 ${
                      modalTab === "textbook"
                        ? "border-purple-500 text-purple-400"
                        : "border-transparent text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    <BookOpen size={15} /> 📖 Detailed Study Guide
                  </button>
                  <button
                    onClick={() => setModalTab("formulas")}
                    className={`pb-3 px-4 text-xs font-bold transition-all border-b-2 flex items-center gap-1.5 ${
                      modalTab === "formulas"
                        ? "border-cyan-500 text-cyan-400"
                        : "border-transparent text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    <Code2 size={15} /> ⚡ Key Formulas & Code
                  </button>
                  <button
                    onClick={() => setModalTab("placement")}
                    className={`pb-3 px-4 text-xs font-bold transition-all border-b-2 flex items-center gap-1.5 ${
                      modalTab === "placement"
                        ? "border-amber-500 text-amber-400"
                        : "border-transparent text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    <Lightbulb size={15} /> 💡 Interview Secrets
                  </button>
                </div>
              )}

              {/* Modal Body */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
                {step === "theory" && activeNode.theory && (
                  <>
                    {/* TAB 1: TEXTBOOK DETAILED CONTENT */}
                    {modalTab === "textbook" && (
                      <div className="space-y-6">
                        <div className="p-4 rounded-2xl bg-purple-950/40 border border-purple-500/20 text-slate-200 text-sm leading-relaxed">
                          <strong>Summary:</strong> {activeNode.theory.summary}
                        </div>

                        {activeNode.theory.detailedContent && (
                          <div className="prose prose-invert max-w-none text-slate-300 text-sm leading-relaxed whitespace-pre-line font-sans space-y-4">
                            {activeNode.theory.detailedContent}
                          </div>
                        )}

                        <div className="space-y-3 pt-2">
                          <h4 className="text-xs font-extrabold uppercase tracking-wider text-purple-400">Core Takeaways</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {activeNode.theory.keyPoints.map((kp, i) => (
                              <div key={i} className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-2 text-xs text-slate-300">
                                <CheckCircle2 size={15} className="text-emerald-400 shrink-0 mt-0.5" />
                                <span>{kp}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* TAB 2: FORMULAS & WORKED EXAMPLES */}
                    {modalTab === "formulas" && (
                      <div className="space-y-6">
                        {activeNode.theory.formula && (
                          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-300 font-mono text-sm">
                            <span className="font-bold text-amber-400 block mb-1">⚡ Core Mathematical Formula:</span>
                            {activeNode.theory.formula}
                          </div>
                        )}

                        {activeNode.theory.code && (
                          <div className="space-y-2">
                            <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">Implementation Blueprint</span>
                            <pre className="p-4 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-xs text-cyan-300 overflow-x-auto">
                              <code>{activeNode.theory.code}</code>
                            </pre>
                          </div>
                        )}

                        {activeNode.theory.examples?.length && (
                          <div className="space-y-3">
                            <span className="text-xs font-bold text-purple-400 uppercase tracking-wider">Worked Step-by-Step Examples</span>
                            {activeNode.theory.examples.map((ex, i) => (
                              <div key={i} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-slate-300 whitespace-pre-line leading-relaxed font-mono">
                                {ex}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}

                    {/* TAB 3: PLACEMENT & INTERVIEW TIPS */}
                    {modalTab === "placement" && (
                      <div className="space-y-4">
                        <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs leading-relaxed space-y-2">
                          <h4 className="font-extrabold text-amber-400 text-sm flex items-center gap-1.5">
                            <Award size={18} /> TCS / Amazon / Google Placement Insights
                          </h4>
                          <p>These specialized interview secrets help candidates clear technical rounds on their first attempt:</p>
                        </div>

                        {activeNode.theory.placementTips?.map((tip, i) => (
                          <div key={i} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-start gap-3 text-xs text-slate-300">
                            <Lightbulb size={18} className="text-amber-400 shrink-0 mt-0.5" />
                            <span className="leading-relaxed">{tip}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                )}

                {/* QUIZ STEP */}
                {step === "quiz" && activeNode.questions && activeNode.questions[qIdx] && (
                  <div className="space-y-5">
                    <div className="flex justify-between items-center text-xs text-slate-400">
                      <span>Question {qIdx + 1} of {activeNode.questions.length}</span>
                      <span className="text-amber-400 font-mono">+{activeNode.xpReward} XP on completion</span>
                    </div>

                    <p className="text-lg font-bold text-white">{activeNode.questions[qIdx].prompt}</p>

                    <div className="space-y-2.5">
                      {activeNode.questions[qIdx].options.map((opt, i) => {
                        const correct = i === activeNode.questions![qIdx].correct;
                        const picked = selected === i;
                        let cls = "bg-slate-950 border-slate-800 text-slate-300 hover:border-purple-500/50";
                        if (submitted) {
                          if (correct) cls = "bg-emerald-950/60 border-emerald-500 text-emerald-200";
                          else if (picked) cls = "bg-rose-950/60 border-rose-500 text-rose-300";
                        } else if (picked) cls = "bg-purple-950/60 border-purple-400 text-white";

                        return (
                          <button
                            key={i}
                            onClick={() => !submitted && setSelected(i)}
                            className={`w-full p-4 rounded-2xl border text-left text-sm font-medium transition-all ${cls}`}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>

                    {submitted && (
                      <div className={`p-4 rounded-2xl border text-xs leading-relaxed ${
                        selected === activeNode.questions[qIdx].correct
                          ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-300"
                          : "bg-rose-500/10 border-rose-500/30 text-rose-300"
                      }`}>
                        <p className="font-bold mb-1">{selected === activeNode.questions[qIdx].correct ? "🎉 Correct!" : "❌ Incorrect"}</p>
                        <p>{activeNode.questions[qIdx].explanation}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="p-6 border-t border-slate-800 bg-slate-950/60 flex items-center justify-between">
                {step === "theory" ? (
                  activeNode.questions?.length ? (
                    <button
                      onClick={() => setStep("quiz")}
                      className="w-full py-4 rounded-2xl bg-gradient-to-r from-purple-600 via-cyan-500 to-emerald-500 text-white font-extrabold text-sm flex items-center justify-center gap-2 hover:opacity-95 transition-opacity"
                    >
                      Start Practice Assessment <ArrowRight size={18} />
                    </button>
                  ) : (
                    <button
                      onClick={() => completeNode(activeNode)}
                      className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-extrabold text-sm flex items-center justify-center gap-2 hover:opacity-95 transition-opacity"
                    >
                      Mark Complete & Claim Rewards <Gift size={18} />
                    </button>
                  )
                ) : (
                  !submitted ? (
                    <button
                      disabled={selected === null}
                      onClick={() => setSubmitted(true)}
                      className="w-full py-4 rounded-2xl bg-purple-600 disabled:opacity-40 text-white font-bold text-sm hover:bg-purple-500 transition-colors"
                    >
                      Verify Answer
                    </button>
                  ) : (
                    <button
                      onClick={handleNextQuestion}
                      className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-bold text-sm flex items-center justify-center gap-2 hover:opacity-95"
                    >
                      Continue <ArrowRight size={18} />
                    </button>
                  )
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ── REWARD MODAL ── */}
      <GamificationModal
        isOpen={showReward}
        onClose={() => { setShowReward(false); setActiveNode(null); }}
        xpEarned={lastCompleted?.xpReward || 0}
        diamondsEarned={lastCompleted?.diamondReward || 0}
      />
    </div>
  );
}
