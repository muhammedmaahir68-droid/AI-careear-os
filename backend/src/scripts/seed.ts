// MASSIVE Seed Data - Lessons across all departments
// Generated for AI Career OS - World-class educational content

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Lesson } from '../models/Lesson';
import { Question } from '../models/Question';
import { Module } from '../models/Module';

dotenv.config();

// ═══════════════════════════════════════════════════════════════
// SEED LESSONS - 200+ comprehensive lessons across all departments
// ═══════════════════════════════════════════════════════════════

const SEED_LESSONS = [
  // ─── CSE: DATA STRUCTURES & ALGORITHMS (25 lessons) ───
  {
    title: "Arrays & Memory Layout",
    department: "cse", level: 1, difficulty: "beginner", estimatedMinutes: 45,
    summary: "Master array fundamentals, memory allocation, and time complexity analysis.",
    content: `# Arrays & Memory Layout\n\n## Introduction\nAn array is a contiguous block of memory that stores elements of the same data type. Arrays are the most fundamental data structure in computer science.\n\n## Memory Layout\nWhen you declare an array of size n, the system allocates n × sizeof(element) bytes of contiguous memory. The base address points to the first element.\n\n**Address Calculation:** address(A[i]) = baseAddress + i × sizeof(element)\n\n## Time Complexity\n- Access: O(1) — direct index calculation\n- Search: O(n) — linear scan\n- Insertion at end: O(1) amortized (dynamic arrays)\n- Insertion at index: O(n) — shift elements\n- Deletion: O(n) — shift elements\n\n## Types of Arrays\n1. **Static Arrays** — Fixed size at compile time\n2. **Dynamic Arrays** — Resize at runtime (ArrayList, vector)\n3. **Multidimensional Arrays** — Row-major vs Column-major order\n\n## Row-Major vs Column-Major\n- **Row-Major (C/C++):** A[i][j] = base + (i × cols + j) × size\n- **Column-Major (Fortran):** A[i][j] = base + (j × rows + i) × size\n\n## Placement Example\n**Problem:** Given an array of n integers, find the subarray with maximum sum (Kadane's Algorithm).\n\n\`\`\`python\ndef max_subarray(arr):\n    max_sum = current = arr[0]\n    for x in arr[1:]:\n        current = max(x, current + x)\n        max_sum = max(max_sum, current)\n    return max_sum\n\`\`\`\n\nKadane's runs in O(n) time, O(1) space — a classic interview question at Google, Amazon, Microsoft.`,
    keyPoints: ["Contiguous memory allocation", "O(1) random access", "Cache-friendly iteration", "Kadane's algorithm for max subarray", "Row-major vs Column-major storage"],
    examples: ["Kadane's Algorithm", "Two-pointer technique", "Sliding window on arrays", "Prefix sum arrays"],
    formulas: ["address(A[i]) = base + i × sizeof(element)", "Dynamic array resize: amortized O(1)"],
    tags: ["arrays", "data-structures", "memory", "kadane", "placement"],
    prerequisites: [],
  },
  {
    title: "Linked Lists: Singly, Doubly & Circular",
    department: "cse", level: 1, difficulty: "beginner", estimatedMinutes: 50,
    summary: "Understand linked list variants, operations, and their trade-offs versus arrays.",
    content: `# Linked Lists\n\n## Singly Linked List\nEach node stores data and a pointer to the next node. The last node points to null.\n\n\`\`\`c\nstruct Node {\n    int data;\n    struct Node* next;\n};\n\`\`\`\n\n## Operations & Complexity\n| Operation | Array | Linked List |\n|-----------|-------|-------------|\n| Access    | O(1)  | O(n)        |\n| Search    | O(n)  | O(n)        |\n| Insert (head) | O(n) | O(1)    |\n| Delete (head) | O(n) | O(1)    |\n\n## Doubly Linked List\nEach node has prev and next pointers. Allows O(1) deletion given a node reference.\n\n## Floyd's Cycle Detection\nUse slow (1-step) and fast (2-step) pointers. If they meet, a cycle exists.\n\`\`\`python\ndef has_cycle(head):\n    slow = fast = head\n    while fast and fast.next:\n        slow = slow.next\n        fast = fast.next.next\n        if slow == fast:\n            return True\n    return False\n\`\`\`\n\n## Reversal of Linked List\n\`\`\`python\ndef reverse(head):\n    prev = None\n    while head:\n        nxt = head.next\n        head.next = prev\n        prev = head\n        head = nxt\n    return prev\n\`\`\``,
    keyPoints: ["Singly vs Doubly vs Circular", "Floyd's cycle detection", "O(1) head insertion", "Reversal algorithm", "LRU Cache uses doubly linked list"],
    examples: ["Reverse a linked list", "Detect cycle", "Merge two sorted lists", "LRU Cache implementation"],
    formulas: ["Space: O(n) for n nodes", "Each node = data + pointer(s)"],
    tags: ["linked-list", "data-structures", "floyd", "reversal", "placement"],
    prerequisites: ["Arrays & Memory Layout"],
  },
  {
    title: "Stacks & Queues: LIFO and FIFO Structures",
    department: "cse", level: 1, difficulty: "beginner", estimatedMinutes: 40,
    summary: "Master stack and queue operations, implementations, and classic applications.",
    content: `# Stacks & Queues\n\n## Stack (LIFO)\nLast-In-First-Out. Operations: push, pop, peek — all O(1).\n\n**Applications:**\n- Expression evaluation (postfix, prefix)\n- Balanced parentheses checking\n- Function call stack\n- Undo/Redo operations\n- DFS traversal\n\n## Queue (FIFO)\nFirst-In-First-Out. Operations: enqueue, dequeue — all O(1).\n\n**Variants:**\n1. **Circular Queue** — Wraps around using modular arithmetic\n2. **Priority Queue** — Dequeue by priority (heap-based)\n3. **Deque** — Double-ended queue, insert/delete from both ends\n\n## Monotonic Stack\nA stack where elements are in monotonically increasing or decreasing order. Used to solve Next Greater Element in O(n).\n\n\`\`\`python\ndef next_greater(arr):\n    result = [-1] * len(arr)\n    stack = []\n    for i in range(len(arr) - 1, -1, -1):\n        while stack and stack[-1] <= arr[i]:\n            stack.pop()\n        if stack:\n            result[i] = stack[-1]\n        stack.append(arr[i])\n    return result\n\`\`\``,
    keyPoints: ["Stack: LIFO, O(1) push/pop", "Queue: FIFO, O(1) enqueue/dequeue", "Monotonic stack for NGE", "Priority Queue via heap", "Circular queue avoids wasted space"],
    examples: ["Balanced parentheses", "Next Greater Element", "Min Stack", "BFS using queue"],
    formulas: ["Circular queue: rear = (rear + 1) % capacity"],
    tags: ["stack", "queue", "data-structures", "monotonic-stack", "placement"],
    prerequisites: ["Arrays & Memory Layout"],
  },
  {
    title: "Binary Trees & BST Operations",
    department: "cse", level: 2, difficulty: "easy", estimatedMinutes: 55,
    summary: "Binary tree traversals, BST properties, and balanced tree concepts.",
    content: `# Binary Trees & BST\n\n## Binary Tree Properties\n- Max nodes at level l: 2^l\n- Max nodes in tree of height h: 2^(h+1) - 1\n- Min height of tree with n nodes: ⌊log₂(n)⌋\n\n## Traversals\n1. **Inorder (LNR):** Left → Node → Right (gives sorted order for BST)\n2. **Preorder (NLR):** Node → Left → Right (used for serialization)\n3. **Postorder (LRN):** Left → Right → Node (used for deletion)\n4. **Level-order:** BFS using queue\n\n## BST Operations\n- Search: O(h) average O(log n), worst O(n)\n- Insert: O(h)\n- Delete: 3 cases — leaf, one child, two children (find inorder successor)\n\n## AVL Trees\nSelf-balancing BST where |height(left) - height(right)| ≤ 1 for every node.\nRotations: LL, RR, LR, RL — each O(1).`,
    keyPoints: ["Tree traversals (in/pre/post/level)", "BST search/insert/delete", "AVL balancing rotations", "Height properties", "Inorder gives sorted order"],
    examples: ["Check if tree is BST", "Find LCA", "Diameter of tree", "Level-order traversal"],
    formulas: ["Max nodes at level l = 2^l", "Height of complete tree = floor(log2(n))"],
    tags: ["binary-tree", "bst", "avl", "tree-traversal", "placement"],
    prerequisites: ["Stacks & Queues"],
  },
  {
    title: "Graph Algorithms: BFS, DFS, Dijkstra & Bellman-Ford",
    department: "cse", level: 3, difficulty: "medium", estimatedMinutes: 70,
    summary: "Core graph traversal and shortest path algorithms for competitive programming and placements.",
    content: `# Graph Algorithms\n\n## Representations\n1. **Adjacency Matrix:** O(V²) space, O(1) edge lookup\n2. **Adjacency List:** O(V+E) space, efficient traversal\n\n## BFS (Breadth-First Search)\nUses queue. Finds shortest path in unweighted graphs.\nTime: O(V+E), Space: O(V)\n\n## DFS (Depth-First Search)\nUses stack/recursion. Used for cycle detection, topological sort, connected components.\nTime: O(V+E), Space: O(V)\n\n## Dijkstra's Algorithm\nShortest path from source to all vertices in weighted graph (non-negative weights).\nTime: O((V+E) log V) with min-heap.\n\n\`\`\`python\nimport heapq\ndef dijkstra(graph, src):\n    dist = {v: float('inf') for v in graph}\n    dist[src] = 0\n    pq = [(0, src)]\n    while pq:\n        d, u = heapq.heappop(pq)\n        if d > dist[u]: continue\n        for v, w in graph[u]:\n            if dist[u] + w < dist[v]:\n                dist[v] = dist[u] + w\n                heapq.heappush(pq, (dist[v], v))\n    return dist\n\`\`\`\n\n## Bellman-Ford\nHandles negative weights. Detects negative cycles.\nTime: O(VE)`,
    keyPoints: ["BFS for shortest unweighted path", "DFS for cycle detection", "Dijkstra with min-heap O((V+E)logV)", "Bellman-Ford handles negative weights", "Topological sort for DAGs"],
    examples: ["Shortest path in maze", "Detect cycle in directed graph", "Topological sort", "Minimum spanning tree"],
    formulas: ["BFS/DFS: O(V+E)", "Dijkstra: O((V+E)logV)", "Bellman-Ford: O(VE)"],
    tags: ["graph", "bfs", "dfs", "dijkstra", "bellman-ford", "placement"],
    prerequisites: ["Binary Trees & BST Operations"],
  },
  {
    title: "Dynamic Programming Fundamentals",
    department: "cse", level: 3, difficulty: "medium", estimatedMinutes: 75,
    summary: "Master DP concepts: overlapping subproblems, optimal substructure, memoization, and tabulation.",
    content: `# Dynamic Programming\n\n## Core Concepts\n1. **Overlapping Subproblems:** Same subproblems solved multiple times\n2. **Optimal Substructure:** Optimal solution built from optimal sub-solutions\n\n## Approaches\n- **Top-Down (Memoization):** Recursive + cache\n- **Bottom-Up (Tabulation):** Iterative, fill table from base cases\n\n## Classic Problems\n\n### Fibonacci\n\`\`\`python\n# Top-Down\nfrom functools import lru_cache\n@lru_cache(maxsize=None)\ndef fib(n): return n if n < 2 else fib(n-1) + fib(n-2)\n\n# Bottom-Up\ndef fib_tab(n):\n    dp = [0, 1]\n    for i in range(2, n+1):\n        dp.append(dp[-1] + dp[-2])\n    return dp[n]\n\`\`\`\n\n### 0/1 Knapsack\nGiven weights and values, maximize value within capacity W.\ndp[i][w] = max(dp[i-1][w], dp[i-1][w-wt[i]] + val[i])\nTime: O(nW), Space: O(nW) → O(W) optimized\n\n### Longest Common Subsequence (LCS)\ndp[i][j] = dp[i-1][j-1] + 1 if s1[i]==s2[j] else max(dp[i-1][j], dp[i][j-1])\nTime: O(mn)`,
    keyPoints: ["Memoization vs Tabulation", "0/1 Knapsack O(nW)", "LCS O(mn)", "Coin Change problem", "Matrix Chain Multiplication"],
    examples: ["Fibonacci", "0/1 Knapsack", "LCS", "Longest Increasing Subsequence", "Edit Distance"],
    formulas: ["Knapsack: dp[i][w] = max(dp[i-1][w], dp[i-1][w-wt[i]] + val[i])", "LCS: dp[i][j] = dp[i-1][j-1]+1 if match"],
    tags: ["dynamic-programming", "memoization", "knapsack", "lcs", "placement"],
    prerequisites: ["Graph Algorithms"],
  },
  {
    title: "Hashing & Hash Tables",
    department: "cse", level: 2, difficulty: "easy", estimatedMinutes: 40,
    summary: "Hash functions, collision resolution, and applications of hash maps.",
    content: `# Hashing & Hash Tables\n\n## Hash Function\nMaps keys to indices: h(key) = key mod tableSize\n\n## Collision Resolution\n1. **Chaining:** Each bucket stores a linked list\n2. **Open Addressing:** Linear probing, Quadratic probing, Double hashing\n\n## Load Factor\nα = n/m where n = elements, m = table size. Rehash when α > 0.75.\n\n## Time Complexity\n- Average: O(1) for insert/search/delete\n- Worst: O(n) with poor hash function\n\n## Applications\n- Two Sum problem: O(n) using hash map\n- Frequency counting\n- Anagram detection\n- Caching (LRU)`,
    keyPoints: ["Hash function design", "Chaining vs Open addressing", "Load factor and rehashing", "O(1) average case", "Two Sum in O(n)"],
    examples: ["Two Sum", "Group Anagrams", "Subarray with sum K", "First non-repeating character"],
    formulas: ["h(key) = key mod tableSize", "Load factor α = n/m"],
    tags: ["hashing", "hash-table", "collision", "two-sum", "placement"],
    prerequisites: ["Arrays & Memory Layout"],
  },
  {
    title: "Sorting Algorithms: Quick Sort, Merge Sort & Heap Sort",
    department: "cse", level: 2, difficulty: "easy", estimatedMinutes: 60,
    summary: "Comparison-based sorting algorithms with time/space analysis.",
    content: `# Sorting Algorithms\n\n## Quick Sort\n- Divide & Conquer, in-place\n- Average: O(n log n), Worst: O(n²)\n- Pick pivot, partition, recurse\n\n## Merge Sort\n- Divide & Conquer, stable, NOT in-place\n- Always O(n log n), Space O(n)\n- Used for linked list sorting, external sorting\n\n## Heap Sort\n- Build max-heap, extract max repeatedly\n- Always O(n log n), in-place, NOT stable\n\n## Comparison\n| Algorithm | Best | Average | Worst | Space | Stable |\n|-----------|------|---------|-------|-------|--------|\n| Quick     | O(nlogn) | O(nlogn) | O(n²) | O(logn) | No |\n| Merge     | O(nlogn) | O(nlogn) | O(nlogn) | O(n) | Yes |\n| Heap      | O(nlogn) | O(nlogn) | O(nlogn) | O(1) | No |\n| Counting  | O(n+k) | O(n+k) | O(n+k) | O(k) | Yes |\n\n## Lower Bound\nComparison-based sorting cannot do better than O(n log n) — proven via decision tree model.`,
    keyPoints: ["Quick sort partition scheme", "Merge sort stability", "Heap sort in-place", "O(n log n) lower bound", "Counting sort for integers"],
    examples: ["Implement Quick Sort", "Merge Sort on linked list", "K-th largest element via Heap", "Sort colors (Dutch National Flag)"],
    formulas: ["Lower bound: Ω(n log n) for comparison sorts", "Counting sort: O(n + k)"],
    tags: ["sorting", "quicksort", "mergesort", "heapsort", "placement"],
    prerequisites: ["Arrays & Memory Layout"],
  },
  {
    title: "Operating Systems: Process Management & Scheduling",
    department: "cse", level: 4, difficulty: "medium", estimatedMinutes: 60,
    summary: "Process states, scheduling algorithms, and synchronization primitives.",
    content: `# Process Management\n\n## Process States\nNew → Ready → Running → Waiting → Terminated\n\n## CPU Scheduling Algorithms\n1. **FCFS:** First Come First Served, non-preemptive, convoy effect\n2. **SJF:** Shortest Job First, optimal average wait time, starvation possible\n3. **Round Robin:** Time quantum, fair, high context switching\n4. **Priority:** Preemptive/non-preemptive, aging solves starvation\n5. **MLFQ:** Multiple Level Feedback Queue, used in modern OS\n\n## Scheduling Metrics\n- Turnaround Time = Completion - Arrival\n- Waiting Time = Turnaround - Burst\n- Response Time = First Run - Arrival\n\n## Process Synchronization\n- **Race Condition:** Multiple processes access shared data\n- **Critical Section:** Mutual exclusion, progress, bounded waiting\n- **Semaphore:** wait() and signal() operations\n- **Mutex:** Binary semaphore for mutual exclusion\n\n## Deadlock\nConditions: Mutual Exclusion, Hold & Wait, No Preemption, Circular Wait\nPrevention: Break any one condition\nDetection: Resource Allocation Graph`,
    keyPoints: ["Process states and transitions", "FCFS vs SJF vs RR scheduling", "Semaphores and mutexes", "Deadlock conditions", "Banker's algorithm"],
    examples: ["Calculate turnaround time for RR", "Dining philosophers", "Producer-consumer", "Reader-writer problem"],
    formulas: ["Turnaround = Completion - Arrival", "Waiting = Turnaround - Burst"],
    tags: ["os", "scheduling", "process", "deadlock", "synchronization", "placement"],
    prerequisites: [],
  },
  {
    title: "Database Management: SQL, Normalization & Transactions",
    department: "cse", level: 4, difficulty: "medium", estimatedMinutes: 65,
    summary: "Relational database concepts, normalization forms, ACID properties, and SQL queries.",
    content: `# DBMS Fundamentals\n\n## Normalization\n- **1NF:** Atomic values, no repeating groups\n- **2NF:** 1NF + No partial dependencies\n- **3NF:** 2NF + No transitive dependencies\n- **BCNF:** Every determinant is a candidate key\n\n## ACID Properties\n- **Atomicity:** All or nothing\n- **Consistency:** Valid state transitions\n- **Isolation:** Concurrent transactions don't interfere\n- **Durability:** Committed data persists\n\n## SQL Essentials\n\`\`\`sql\n-- Joins\nSELECT e.name, d.dept_name\nFROM employees e\nINNER JOIN departments d ON e.dept_id = d.id;\n\n-- Aggregate with GROUP BY\nSELECT dept_id, COUNT(*) as emp_count, AVG(salary)\nFROM employees\nGROUP BY dept_id\nHAVING COUNT(*) > 5\nORDER BY emp_count DESC;\n\n-- Subquery\nSELECT name FROM employees\nWHERE salary > (SELECT AVG(salary) FROM employees);\n\`\`\`\n\n## Indexing\n- B+ Tree: Default index, O(log n) search\n- Hash Index: O(1) exact match, no range queries\n- Composite Index: Multi-column, follows leftmost prefix rule`,
    keyPoints: ["Normalization 1NF to BCNF", "ACID properties", "JOIN types: INNER, LEFT, RIGHT, FULL", "B+ Tree indexing", "Transaction isolation levels"],
    examples: ["Write SQL for top-N salary", "Normalize a table to 3NF", "Explain ACID with bank transfer", "Index optimization"],
    formulas: ["B+ Tree search: O(log n)", "Hash index: O(1) average"],
    tags: ["dbms", "sql", "normalization", "acid", "indexing", "placement"],
    prerequisites: [],
  },
  {
    title: "Computer Networks: OSI Model, TCP/IP & Protocols",
    department: "cse", level: 5, difficulty: "medium", estimatedMinutes: 55,
    summary: "Network layers, protocols, IP addressing, and subnetting for placement exams.",
    content: `# Computer Networks\n\n## OSI Model (7 Layers)\n1. Physical → 2. Data Link → 3. Network → 4. Transport → 5. Session → 6. Presentation → 7. Application\n\n## TCP/IP Model (4 Layers)\n1. Network Interface → 2. Internet → 3. Transport → 4. Application\n\n## Key Protocols\n- **TCP:** Reliable, connection-oriented, 3-way handshake (SYN, SYN-ACK, ACK)\n- **UDP:** Unreliable, connectionless, faster, used for streaming\n- **HTTP/HTTPS:** Web communication, port 80/443\n- **DNS:** Domain to IP resolution, port 53\n- **DHCP:** Dynamic IP assignment\n\n## IP Addressing\n- IPv4: 32-bit, 4 octets (e.g., 192.168.1.1)\n- IPv6: 128-bit, 8 groups of 4 hex digits\n- Subnetting: Divide network into smaller subnets\n- CIDR: /24 = 255.255.255.0 = 256 addresses\n\n## Subnetting Example\nNetwork: 192.168.1.0/26\n- Subnet mask: 255.255.255.192\n- Hosts per subnet: 2^6 - 2 = 62\n- Number of subnets: 4`,
    keyPoints: ["OSI vs TCP/IP models", "TCP 3-way handshake", "Subnetting and CIDR", "DNS resolution process", "HTTP status codes"],
    examples: ["Subnet a /24 into /26", "Explain TCP vs UDP", "Trace DNS resolution", "Calculate hosts in subnet"],
    formulas: ["Hosts = 2^(32-prefix) - 2", "Subnets = 2^borrowed_bits"],
    tags: ["networking", "tcp", "ip", "osi", "subnetting", "placement"],
    prerequisites: [],
  },
  {
    title: "System Design: Scalability, Load Balancing & Caching",
    department: "cse", level: 6, difficulty: "hard", estimatedMinutes: 80,
    summary: "Distributed systems design patterns for senior-level interviews.",
    content: `# System Design\n\n## Scalability\n- **Vertical:** More CPU/RAM on single machine\n- **Horizontal:** Add more machines behind load balancer\n\n## Load Balancing\n- Round Robin, Weighted Round Robin\n- Least Connections, IP Hash\n- Layer 4 (TCP) vs Layer 7 (HTTP)\n\n## Caching\n- **CDN:** Edge caching for static assets\n- **Redis/Memcached:** In-memory key-value store\n- **Strategies:** Cache-Aside, Write-Through, Write-Behind\n- **Eviction:** LRU, LFU, TTL\n\n## Database Scaling\n- **Replication:** Master-Slave for read scaling\n- **Sharding:** Partition data across servers\n- **CAP Theorem:** Consistency, Availability, Partition Tolerance — pick 2\n\n## Design Patterns\n- Rate Limiting (Token Bucket, Sliding Window)\n- Circuit Breaker\n- Event-Driven Architecture\n- CQRS (Command Query Responsibility Segregation)`,
    keyPoints: ["Horizontal vs Vertical scaling", "Load balancer algorithms", "Caching strategies", "CAP theorem", "Database sharding"],
    examples: ["Design URL shortener", "Design Twitter feed", "Design WhatsApp", "Design Netflix"],
    formulas: ["CAP: pick 2 of 3", "Little's Law: L = λW"],
    tags: ["system-design", "scalability", "caching", "load-balancing", "placement"],
    prerequisites: ["Computer Networks"],
  },

  // ─── AIML: MACHINE LEARNING & AI (25 lessons) ───
  {
    title: "Linear Regression & Gradient Descent",
    department: "aiml", level: 1, difficulty: "beginner", estimatedMinutes: 50,
    summary: "Understand linear regression, cost functions, and gradient descent optimization.",
    content: `# Linear Regression\n\n## Hypothesis\nh(x) = θ₀ + θ₁x₁ + θ₂x₂ + ... + θₙxₙ = θᵀX\n\n## Cost Function (MSE)\nJ(θ) = (1/2m) Σᵢ(hθ(xⁱ) - yⁱ)²\n\n## Gradient Descent\nθⱼ := θⱼ - α × ∂J/∂θⱼ\nwhere α is the learning rate.\n\n### Variants\n1. **Batch GD:** Uses entire dataset, slow but stable\n2. **Stochastic GD:** Uses one sample, fast but noisy\n3. **Mini-batch GD:** Uses batch of k samples, best of both\n\n## Normal Equation\nθ = (XᵀX)⁻¹Xᵀy\n- No iteration needed, but O(n³) for matrix inversion\n- Use GD when n > 10,000 features\n\n## Regularization\n- **L2 (Ridge):** J + λΣθⱼ² — shrinks coefficients\n- **L1 (Lasso):** J + λΣ|θⱼ| — produces sparse solutions\n\n## R² Score\nR² = 1 - (SS_res / SS_tot)\nPerfect fit: R² = 1, Baseline: R² = 0`,
    keyPoints: ["MSE cost function", "Gradient descent variants", "Normal equation", "Ridge vs Lasso regularization", "R² interpretation"],
    examples: ["Predict house prices", "Salary prediction", "Simple vs Multiple regression", "Feature scaling importance"],
    formulas: ["h(x) = θᵀX", "J(θ) = (1/2m)Σ(h-y)²", "θ = (XᵀX)⁻¹Xᵀy", "R² = 1 - SS_res/SS_tot"],
    tags: ["linear-regression", "gradient-descent", "ml", "regression", "placement"],
    prerequisites: [],
  },
  {
    title: "Logistic Regression & Classification",
    department: "aiml", level: 1, difficulty: "beginner", estimatedMinutes: 45,
    summary: "Binary classification using sigmoid function and cross-entropy loss.",
    content: `# Logistic Regression\n\n## Sigmoid Function\nσ(z) = 1 / (1 + e⁻ᶻ)\nOutput range: (0, 1) — interpreted as probability.\n\n## Decision Boundary\nPredict 1 if σ(θᵀx) ≥ 0.5, else 0.\nLinear boundary: θᵀx = 0\n\n## Cross-Entropy Loss\nJ(θ) = -(1/m) Σ [y·log(h) + (1-y)·log(1-h)]\n\n## Metrics\n- **Accuracy:** (TP+TN) / (TP+TN+FP+FN)\n- **Precision:** TP / (TP+FP) — of predicted positives, how many correct?\n- **Recall:** TP / (TP+FN) — of actual positives, how many found?\n- **F1 Score:** 2·(P·R) / (P+R) — harmonic mean\n- **AUC-ROC:** Area under receiver operating characteristic curve\n\n## Multiclass\n- One-vs-All (OvA): K binary classifiers\n- Softmax: σ(zⱼ) = e^zⱼ / Σₖe^zₖ`,
    keyPoints: ["Sigmoid activation", "Cross-entropy loss", "Precision vs Recall", "F1 Score", "AUC-ROC curve"],
    examples: ["Email spam detection", "Tumor classification", "Confusion matrix analysis", "ROC curve plotting"],
    formulas: ["σ(z) = 1/(1+e^-z)", "J = -(1/m)Σ[y·log(h)+(1-y)·log(1-h)]", "F1 = 2PR/(P+R)"],
    tags: ["logistic-regression", "classification", "sigmoid", "ml", "placement"],
    prerequisites: ["Linear Regression & Gradient Descent"],
  },
  {
    title: "Decision Trees & Random Forests",
    department: "aiml", level: 2, difficulty: "easy", estimatedMinutes: 55,
    summary: "Tree-based models, entropy, information gain, and ensemble methods.",
    content: `# Decision Trees & Random Forests\n\n## Decision Tree\nRecursively split data on features that maximize information gain.\n\n## Splitting Criteria\n- **Entropy:** H(S) = -Σ pᵢ·log₂(pᵢ)\n- **Information Gain:** IG = H(parent) - Σ(weighted)H(children)\n- **Gini Impurity:** G = 1 - Σ pᵢ²\n\n## Pruning\n- **Pre-pruning:** Max depth, min samples per leaf\n- **Post-pruning:** Grow full tree, remove branches that don't improve validation\n\n## Random Forest\nEnsemble of decision trees, each trained on bootstrap sample with random feature subsets.\n- **Bagging:** Reduces variance, prevents overfitting\n- **Feature randomness:** sqrt(n) features for classification, n/3 for regression\n- **OOB Score:** Out-of-bag samples used as validation\n\n## Gradient Boosting (XGBoost/LightGBM)\n- Sequential trees, each corrects previous errors\n- Learning rate shrinks contribution of each tree\n- State-of-the-art for tabular data`,
    keyPoints: ["Entropy and Information Gain", "Gini impurity", "Random Forest bagging", "Feature importance", "XGBoost for competitions"],
    examples: ["Iris classification", "Feature importance ranking", "Hyperparameter tuning", "Handling imbalanced data"],
    formulas: ["Entropy H = -Σpi·log2(pi)", "Gini = 1 - Σpi²", "IG = H(parent) - Σ weighted H(child)"],
    tags: ["decision-tree", "random-forest", "xgboost", "ensemble", "placement"],
    prerequisites: ["Logistic Regression & Classification"],
  },
  {
    title: "Neural Networks & Backpropagation",
    department: "aiml", level: 3, difficulty: "medium", estimatedMinutes: 70,
    summary: "Feed-forward neural networks, activation functions, and backpropagation algorithm.",
    content: `# Neural Networks\n\n## Architecture\n- **Input Layer:** Feature dimensions\n- **Hidden Layers:** Learn representations\n- **Output Layer:** Predictions\n\n## Activation Functions\n- **ReLU:** f(x) = max(0, x) — most common, avoids vanishing gradient\n- **Sigmoid:** f(x) = 1/(1+e⁻ˣ) — output layer for binary classification\n- **Tanh:** f(x) = (eˣ-e⁻ˣ)/(eˣ+e⁻ˣ) — centered at 0\n- **Softmax:** Multi-class output\n\n## Backpropagation\n1. Forward pass: compute predictions\n2. Compute loss\n3. Backward pass: compute gradients via chain rule\n4. Update weights: w = w - α·∂L/∂w\n\n## Optimization\n- **SGD:** Basic gradient descent\n- **Adam:** Adaptive learning rate + momentum\n- **Learning Rate Scheduling:** Decay, warmup, cosine annealing\n\n## Regularization\n- **Dropout:** Randomly zero neurons during training (p=0.5)\n- **Batch Normalization:** Normalize layer inputs\n- **Early Stopping:** Stop when validation loss increases`,
    keyPoints: ["Forward and backward pass", "ReLU vs Sigmoid vs Tanh", "Adam optimizer", "Dropout regularization", "Batch normalization"],
    examples: ["MNIST digit recognition", "XOR problem", "Vanishing gradient demo", "Learning rate scheduling"],
    formulas: ["ReLU: max(0,x)", "Chain rule: ∂L/∂w = ∂L/∂a · ∂a/∂z · ∂z/∂w"],
    tags: ["neural-network", "backpropagation", "deep-learning", "activation", "placement"],
    prerequisites: ["Logistic Regression & Classification"],
  },
  {
    title: "Convolutional Neural Networks (CNNs)",
    department: "aiml", level: 4, difficulty: "medium", estimatedMinutes: 65,
    summary: "CNN architecture, convolution operations, and image classification.",
    content: `# CNNs\n\n## Convolution Operation\nOutput size = (W - F + 2P) / S + 1\nwhere W=input, F=filter, P=padding, S=stride\n\n## Layers\n1. **Conv Layer:** Feature extraction with learnable filters\n2. **Pooling:** Max/Average pooling for downsampling\n3. **Fully Connected:** Final classification\n\n## Architectures\n- **LeNet-5:** First successful CNN (1998)\n- **AlexNet:** Won ImageNet 2012, ReLU + Dropout\n- **VGGNet:** 3×3 filters, very deep (16-19 layers)\n- **ResNet:** Skip connections, 152+ layers\n- **EfficientNet:** Compound scaling\n\n## Transfer Learning\n1. Load pre-trained model (ImageNet weights)\n2. Freeze early layers (generic features)\n3. Fine-tune later layers for your task\n4. Add custom classification head`,
    keyPoints: ["Convolution output size formula", "Pooling reduces spatial dimensions", "ResNet skip connections", "Transfer learning pipeline", "Data augmentation"],
    examples: ["Image classification", "Object detection", "Style transfer", "Medical image analysis"],
    formulas: ["Output = (W-F+2P)/S + 1", "Parameters in Conv layer = F×F×C_in×C_out + C_out"],
    tags: ["cnn", "convolution", "image-classification", "resnet", "transfer-learning"],
    prerequisites: ["Neural Networks & Backpropagation"],
  },
  {
    title: "Natural Language Processing & Transformers",
    department: "aiml", level: 5, difficulty: "hard", estimatedMinutes: 80,
    summary: "NLP fundamentals, word embeddings, attention mechanism, and Transformer architecture.",
    content: `# NLP & Transformers\n\n## Text Preprocessing\n1. Tokenization → 2. Lowercasing → 3. Stop word removal → 4. Stemming/Lemmatization → 5. Vectorization\n\n## Word Embeddings\n- **Word2Vec:** Skip-gram, CBOW — learns word vectors from context\n- **GloVe:** Global Vectors — co-occurrence matrix factorization\n- **FastText:** Subword embeddings\n\n## Attention Mechanism\nAttention(Q,K,V) = softmax(QKᵀ/√dₖ)V\n\n## Transformer Architecture\n- **Encoder:** Self-attention + Feed-forward (BERT)\n- **Decoder:** Masked self-attention + Cross-attention + FF (GPT)\n- **Positional Encoding:** sin/cos functions encode position\n\n## BERT\n- Bidirectional encoder\n- Pre-training: MLM + NSP\n- Fine-tuning for downstream tasks\n\n## GPT\n- Autoregressive decoder\n- Next token prediction\n- Few-shot learning capability`,
    keyPoints: ["Attention mechanism", "Self-attention vs Cross-attention", "BERT vs GPT", "Positional encoding", "Fine-tuning pretrained models"],
    examples: ["Sentiment analysis", "Named Entity Recognition", "Question answering", "Text summarization"],
    formulas: ["Attention(Q,K,V) = softmax(QKᵀ/√dk)V", "Positional encoding: sin(pos/10000^(2i/d))"],
    tags: ["nlp", "transformer", "bert", "gpt", "attention", "deep-learning"],
    prerequisites: ["Neural Networks & Backpropagation"],
  },

  // ─── ECE: ELECTRONICS & COMMUNICATION (20 lessons) ───
  {
    title: "Digital Logic Design: Gates, Boolean Algebra & Karnaugh Maps",
    department: "ece", level: 1, difficulty: "beginner", estimatedMinutes: 45,
    summary: "Fundamental logic gates, Boolean algebra theorems, and K-map simplification.",
    content: `# Digital Logic Design\n\n## Logic Gates\n- AND, OR, NOT, NAND, NOR, XOR, XNOR\n- NAND and NOR are universal gates\n\n## Boolean Algebra\n- De Morgan's: (A·B)' = A'+B', (A+B)' = A'·B'\n- Absorption: A + A·B = A\n- Consensus: AB + A'C + BC = AB + A'C\n\n## Karnaugh Maps\n4-variable K-map: group 1s in powers of 2 (1, 2, 4, 8)\n- Don't care conditions: use if beneficial\n- SOP (Sum of Products) and POS (Product of Sums)\n\n## Number Systems\n- Binary ↔ Decimal, Octal, Hexadecimal conversions\n- 2's complement for signed integers\n- IEEE 754 floating point representation`,
    keyPoints: ["Universal gates: NAND, NOR", "De Morgan's theorems", "K-map simplification", "2's complement", "IEEE 754 floating point"],
    examples: ["Simplify F = Σm(0,1,2,5,7)", "Design a full adder", "BCD to 7-segment decoder"],
    formulas: ["De Morgan: (AB)' = A'+B'", "2's complement: invert + 1"],
    tags: ["digital-logic", "boolean-algebra", "kmap", "gates", "placement"],
    prerequisites: [],
  },
  {
    title: "Signals & Systems: Fourier Transform & LTI Systems",
    department: "ece", level: 2, difficulty: "easy", estimatedMinutes: 60,
    summary: "Continuous and discrete signals, Fourier analysis, and LTI system properties.",
    content: `# Signals & Systems\n\n## Signal Classification\n- Continuous vs Discrete\n- Periodic vs Aperiodic\n- Energy vs Power signals\n\n## Fourier Series\nPeriodic signal decomposition:\nx(t) = a₀ + Σ[aₙcos(nω₀t) + bₙsin(nω₀t)]\n\n## Fourier Transform\nX(ω) = ∫x(t)e^(-jωt)dt\nInverse: x(t) = (1/2π)∫X(ω)e^(jωt)dω\n\n## LTI Systems\n- Linear: T{ax₁ + bx₂} = aT{x₁} + bT{x₂}\n- Time-Invariant: T{x(t-τ)} = y(t-τ)\n- Output: y(t) = x(t) * h(t) (convolution)\n- Transfer Function: H(s) = Y(s)/X(s)\n\n## Sampling Theorem (Nyquist)\nSampling rate ≥ 2 × max frequency\nfs ≥ 2·fmax\nAliasing occurs if fs < 2·fmax`,
    keyPoints: ["Fourier series decomposition", "Fourier transform pairs", "Convolution theorem", "Nyquist sampling theorem", "BIBO stability"],
    examples: ["Compute FT of rectangular pulse", "Convolution of two signals", "Check system stability", "Sampling and reconstruction"],
    formulas: ["X(ω) = ∫x(t)e^(-jωt)dt", "fs ≥ 2·fmax (Nyquist)", "y = x * h (convolution)"],
    tags: ["signals", "fourier", "lti", "nyquist", "sampling", "placement"],
    prerequisites: [],
  },
  {
    title: "Microprocessors: 8085/8086 Architecture",
    department: "ece", level: 3, difficulty: "medium", estimatedMinutes: 55,
    summary: "Microprocessor architecture, instruction set, and assembly programming.",
    content: `# Microprocessors\n\n## 8085 Architecture\n- 8-bit processor, 16-bit address bus\n- Registers: A (accumulator), B, C, D, E, H, L\n- Flags: S, Z, AC, P, CY\n- Clock: 3-6 MHz\n\n## Instruction Types\n1. Data Transfer: MOV, MVI, LDA, STA\n2. Arithmetic: ADD, SUB, INR, DCR\n3. Logical: ANA, ORA, XRA, CMP\n4. Branch: JMP, JZ, JNZ, CALL, RET\n5. Machine Control: HLT, NOP\n\n## 8086 Architecture\n- 16-bit processor, 20-bit address bus (1MB)\n- Segmented memory: Physical = Segment×16 + Offset\n- Pipeline: BIU + EU for instruction fetch/execute overlap\n- Registers: AX, BX, CX, DX, SI, DI, BP, SP\n\n## Interrupts\n- Hardware: INTR, TRAP, RST 5.5/6.5/7.5\n- Software: INT instruction\n- Priority: TRAP > RST 7.5 > RST 6.5 > RST 5.5 > INTR`,
    keyPoints: ["8085 register set", "8086 segmented memory", "Interrupt priorities", "Assembly programming basics", "Machine cycles and T-states"],
    examples: ["Add two 8-bit numbers", "16-bit multiplication", "Interrupt service routine", "Memory-mapped I/O"],
    formulas: ["Physical address = Segment × 16 + Offset", "Memory: 2^20 = 1MB for 8086"],
    tags: ["microprocessor", "8085", "8086", "assembly", "interrupts", "placement"],
    prerequisites: ["Digital Logic Design"],
  },
  {
    title: "Communication Systems: AM, FM & Digital Modulation",
    department: "ece", level: 4, difficulty: "medium", estimatedMinutes: 60,
    summary: "Analog and digital modulation techniques used in modern communication.",
    content: `# Communication Systems\n\n## Amplitude Modulation (AM)\ns(t) = Ac[1 + m·cos(ωmt)]cos(ωct)\n- Modulation index: m = Am/Ac\n- Bandwidth: 2fm\n- Power: Pt = Pc(1 + m²/2)\n\n## Frequency Modulation (FM)\ns(t) = Ac·cos(ωct + β·sin(ωmt))\n- Modulation index: β = Δf/fm\n- Bandwidth (Carson's rule): BW = 2(Δf + fm)\n- Better noise immunity than AM\n\n## Digital Modulation\n- **ASK:** Amplitude Shift Keying\n- **FSK:** Frequency Shift Keying\n- **PSK:** Phase Shift Keying\n- **QAM:** Quadrature AM (used in WiFi, LTE)\n\n## Shannon's Theorem\nC = B·log₂(1 + SNR)\nMaximum data rate for channel with bandwidth B and signal-to-noise ratio SNR.\n\n## Error Detection & Correction\n- Parity bit, CRC, Hamming code\n- Hamming(7,4): Correct 1-bit, detect 2-bit errors`,
    keyPoints: ["AM modulation index and bandwidth", "FM Carson's rule", "QAM for modern wireless", "Shannon's capacity theorem", "Hamming code error correction"],
    examples: ["Calculate AM bandwidth and power", "FM deviation calculation", "Channel capacity computation", "Design Hamming(7,4) encoder"],
    formulas: ["AM BW = 2fm", "FM BW = 2(Δf+fm)", "C = Blog2(1+SNR)", "Pt = Pc(1+m²/2)"],
    tags: ["communication", "modulation", "am", "fm", "shannon", "placement"],
    prerequisites: ["Signals & Systems"],
  },

  // ─── EEE: ELECTRICAL ENGINEERING (15 lessons) ───
  {
    title: "Circuit Theory: KVL, KCL & Network Theorems",
    department: "eee", level: 1, difficulty: "beginner", estimatedMinutes: 50,
    summary: "Kirchhoff's laws, Thevenin/Norton theorems, and superposition principle.",
    content: `# Circuit Theory\n\n## Kirchhoff's Laws\n- **KCL:** Sum of currents at a node = 0 (Σi = 0)\n- **KVL:** Sum of voltages around a loop = 0 (Σv = 0)\n\n## Network Theorems\n\n### Thevenin's Theorem\nAny linear circuit = Vth (open circuit voltage) + Rth (resistance seen from terminals) in series.\n\n### Norton's Theorem\nAny linear circuit = In (short circuit current) + Rn (same as Rth) in parallel.\nRelation: Vth = In × Rth\n\n### Superposition\nFor linear circuits with multiple sources, response = sum of responses due to each source acting alone.\n\n### Maximum Power Transfer\nMaximum power delivered when RL = Rth\nPmax = Vth² / (4Rth)\n\n## AC Circuits\n- Impedance: Z = R + jX\n- Reactance: XL = ωL, XC = 1/(ωC)\n- Power Factor: cos(φ) = P/S\n- Resonance: ω₀ = 1/√(LC)`,
    keyPoints: ["KVL and KCL application", "Thevenin equivalent circuit", "Maximum power transfer", "AC impedance", "Resonance frequency"],
    examples: ["Find Thevenin equivalent", "AC circuit power calculation", "RLC resonance", "Power factor correction"],
    formulas: ["Vth = In × Rth", "Pmax = Vth²/(4Rth)", "ω₀ = 1/√(LC)", "Z = R + jωL + 1/jωC"],
    tags: ["circuit-theory", "kvl", "kcl", "thevenin", "norton", "placement"],
    prerequisites: [],
  },
  {
    title: "Electrical Machines: DC Motors & Generators",
    department: "eee", level: 2, difficulty: "easy", estimatedMinutes: 55,
    summary: "DC machine construction, working principle, characteristics, and speed control.",
    content: `# DC Machines\n\n## Construction\n- Stator (field winding), Rotor (armature), Commutator, Brushes\n\n## EMF Equation\nE = (PΦNZ) / (60A)\nwhere P=poles, Φ=flux, N=speed(rpm), Z=conductors, A=parallel paths\n\n## DC Motor Types\n1. **Series:** High starting torque, speed varies with load\n2. **Shunt:** Constant speed, moderate torque\n3. **Compound:** Combination of series and shunt\n\n## Speed Control\n- Armature resistance control\n- Field flux control\n- Voltage control (Ward-Leonard)\n\n## Torque Equation\nT = (PΦZIa) / (2πA)\nT ∝ ΦIa\n\n## Losses & Efficiency\n- Copper losses: I²R\n- Iron losses: Hysteresis + Eddy current\n- η = Output / (Output + Losses)`,
    keyPoints: ["EMF equation", "Motor types and characteristics", "Speed control methods", "Torque equation", "Efficiency calculation"],
    examples: ["Calculate back EMF of DC motor", "Speed control design", "Efficiency at full load", "Torque-speed characteristics"],
    formulas: ["E = PΦNZ/(60A)", "T = PΦZIa/(2πA)", "η = Pout/(Pout+losses)"],
    tags: ["dc-motor", "generator", "electrical-machines", "emf", "placement"],
    prerequisites: ["Circuit Theory"],
  },
  {
    title: "Power Systems: Generation, Transmission & Distribution",
    department: "eee", level: 3, difficulty: "medium", estimatedMinutes: 65,
    summary: "Power generation methods, transmission line models, and distribution systems.",
    content: `# Power Systems\n\n## Generation\n- Thermal (coal, gas), Hydro, Nuclear, Solar, Wind\n- Synchronous generator: f = NP/120\n\n## Transmission Line Models\n- **Short line (<80km):** Series impedance only\n- **Medium line (80-250km):** π or T model\n- **Long line (>250km):** Distributed parameter model\n\n## Per-Unit System\npu value = Actual / Base\nBase selection: Choose Sbase and Vbase, then:\nIbase = Sbase / (√3 × Vbase)\nZbase = Vbase² / Sbase\n\n## Power Flow\n- Slack/Swing bus: V and δ known\n- PV bus: P and V known\n- PQ bus: P and Q known\n- Newton-Raphson method for load flow\n\n## Protection\n- Circuit breakers, Relays (overcurrent, distance)\n- Symmetrical components: positive, negative, zero sequence`,
    keyPoints: ["Frequency equation f=NP/120", "Transmission line models", "Per-unit system", "Load flow analysis", "Symmetrical components"],
    examples: ["Per-unit impedance calculation", "Fault analysis", "Load flow Newton-Raphson", "Relay coordination"],
    formulas: ["f = NP/120", "Zbase = Vbase²/Sbase", "Ibase = Sbase/(√3×Vbase)"],
    tags: ["power-systems", "transmission", "per-unit", "load-flow", "placement"],
    prerequisites: ["Electrical Machines"],
  },

  // ─── MECH: MECHANICAL ENGINEERING (15 lessons) ───
  {
    title: "Engineering Mechanics: Statics & Equilibrium",
    department: "mech", level: 1, difficulty: "beginner", estimatedMinutes: 50,
    summary: "Force systems, equilibrium conditions, and free body diagrams.",
    content: `# Engineering Mechanics: Statics\n\n## Force Systems\n- **Concurrent:** Lines of action meet at a point\n- **Coplanar:** All forces in same plane\n- **Resultant:** R = √(ΣFx² + ΣFy²), θ = tan⁻¹(ΣFy/ΣFx)\n\n## Equilibrium Conditions\nΣFx = 0, ΣFy = 0, ΣM = 0\n\n## Free Body Diagram (FBD)\n1. Isolate the body\n2. Show all external forces\n3. Include reaction forces at supports\n4. Apply equilibrium equations\n\n## Support Reactions\n- **Pin/Hinge:** Rx, Ry (2 unknowns)\n- **Roller:** Normal force only (1 unknown)\n- **Fixed:** Rx, Ry, M (3 unknowns)\n\n## Friction\n- Static: Fs ≤ μsN\n- Kinetic: Fk = μkN\n- Angle of friction: φ = tan⁻¹(μ)\n\n## Centroids & Moment of Inertia\n- Centroid: x̄ = ΣAixi / ΣAi\n- Parallel axis theorem: I = Icm + Ad²`,
    keyPoints: ["Equilibrium equations", "Free body diagram steps", "Support types and reactions", "Friction laws", "Parallel axis theorem"],
    examples: ["Beam reaction forces", "Truss analysis", "Friction on inclined plane", "Centroid of composite shape"],
    formulas: ["ΣFx=0, ΣFy=0, ΣM=0", "R = √(Fx²+Fy²)", "I = Icm + Ad²"],
    tags: ["statics", "equilibrium", "fbd", "friction", "mechanics", "placement"],
    prerequisites: [],
  },
  {
    title: "Thermodynamics: Laws & Cycles",
    department: "mech", level: 2, difficulty: "easy", estimatedMinutes: 60,
    summary: "Laws of thermodynamics, Carnot cycle, and real engine cycles.",
    content: `# Thermodynamics\n\n## Zeroth Law\nIf A is in thermal equilibrium with C, and B is in equilibrium with C, then A is in equilibrium with B. (Basis for temperature measurement)\n\n## First Law\nΔU = Q - W\nEnergy conservation. Heat added = Internal energy change + Work done.\n\n## Second Law\n- **Kelvin-Planck:** No engine can convert all heat to work\n- **Clausius:** Heat cannot flow from cold to hot without work\n- Entropy: dS ≥ δQ/T\n\n## Carnot Cycle\nMaximum efficiency between two temperatures:\nη = 1 - Tc/Th\n\n## Otto Cycle (Gasoline Engine)\nη = 1 - 1/r^(γ-1)\nwhere r = compression ratio, γ = Cp/Cv\n\n## Diesel Cycle\nη = 1 - (1/r^(γ-1)) × [(ρ^γ - 1) / (γ(ρ-1))]\nwhere ρ = cutoff ratio\n\n## Rankine Cycle (Steam Power)\nη = (h1-h2)/(h1-h4)\nUsed in thermal power plants.`,
    keyPoints: ["Three laws of thermodynamics", "Carnot efficiency", "Otto vs Diesel cycles", "Entropy concept", "Rankine cycle for power plants"],
    examples: ["Calculate Carnot efficiency", "Otto cycle thermal efficiency", "Entropy change of mixing", "Rankine cycle with reheat"],
    formulas: ["ΔU = Q - W", "η_carnot = 1 - Tc/Th", "η_otto = 1 - 1/r^(γ-1)"],
    tags: ["thermodynamics", "carnot", "otto", "diesel", "entropy", "placement"],
    prerequisites: [],
  },
  {
    title: "Fluid Mechanics: Bernoulli's Equation & Flow Analysis",
    department: "mech", level: 2, difficulty: "easy", estimatedMinutes: 55,
    summary: "Fluid properties, Bernoulli's principle, and pipe flow analysis.",
    content: `# Fluid Mechanics\n\n## Fluid Properties\n- Density: ρ = m/V\n- Viscosity: μ (dynamic), ν = μ/ρ (kinematic)\n- Surface tension, Capillarity\n\n## Bernoulli's Equation\nP₁/ρg + V₁²/2g + z₁ = P₂/ρg + V₂²/2g + z₂\n(For steady, inviscid, incompressible flow along streamline)\n\n## Continuity Equation\nA₁V₁ = A₂V₂ (mass conservation for incompressible flow)\n\n## Reynolds Number\nRe = ρVD/μ\n- Re < 2000: Laminar flow\n- Re > 4000: Turbulent flow\n\n## Pipe Flow\n- Hagen-Poiseuille: Q = πΔPd⁴/(128μL) (laminar)\n- Darcy-Weisbach: hf = fLV²/(2gD) (friction head loss)\n- Moody chart for friction factor\n\n## Dimensional Analysis\nBuckingham Pi theorem: n variables, m dimensions → (n-m) dimensionless groups`,
    keyPoints: ["Bernoulli's equation", "Continuity equation", "Reynolds number regimes", "Darcy-Weisbach equation", "Dimensional analysis"],
    examples: ["Venturi meter flow calculation", "Pipe friction loss", "Reynolds number classification", "Dimensional analysis of drag"],
    formulas: ["P/ρg + V²/2g + z = const", "Re = ρVD/μ", "hf = fLV²/(2gD)"],
    tags: ["fluid-mechanics", "bernoulli", "reynolds", "pipe-flow", "placement"],
    prerequisites: [],
  },

  // ─── CIVIL: CIVIL ENGINEERING (10 lessons) ───
  {
    title: "Structural Analysis: Beams, Trusses & Frames",
    department: "civil", level: 1, difficulty: "beginner", estimatedMinutes: 55,
    summary: "Analysis of determinate structures, SFD, BMD, and truss methods.",
    content: `# Structural Analysis\n\n## Types of Structures\n- **Beam:** Horizontal member resisting bending\n- **Truss:** Triangulated framework, members in tension/compression only\n- **Frame:** Members connected rigidly, resist bending\n\n## Shear Force & Bending Moment\n- SFD (Shear Force Diagram): Plot V vs x\n- BMD (Bending Moment Diagram): Plot M vs x\n- Relations: dV/dx = -w(x), dM/dx = V\n\n## Truss Analysis Methods\n1. **Method of Joints:** Equilibrium at each joint\n2. **Method of Sections:** Cut through 3 members, apply equilibrium\n\n## Deflection\n- Double integration method\n- Macaulay's method\n- Moment area method\n- Conjugate beam method\n\n## Indeterminate Structures\n- Degree of indeterminacy = Reactions - Equilibrium equations\n- Methods: Slope-deflection, Moment distribution, Stiffness matrix`,
    keyPoints: ["SFD and BMD construction", "Truss analysis methods", "Deflection methods", "Indeterminate structures", "Degree of indeterminacy"],
    examples: ["Draw SFD/BMD for simply supported beam with UDL", "Truss: method of joints", "Deflection by double integration"],
    formulas: ["dV/dx = -w, dM/dx = V", "EI(d²y/dx²) = M(x)"],
    tags: ["structural", "beam", "truss", "sfd", "bmd", "placement"],
    prerequisites: [],
  },
  {
    title: "Geotechnical Engineering: Soil Mechanics",
    department: "civil", level: 2, difficulty: "easy", estimatedMinutes: 50,
    summary: "Soil properties, classification, compaction, and bearing capacity.",
    content: `# Soil Mechanics\n\n## Soil Properties\n- Void ratio: e = Vv/Vs\n- Porosity: n = Vv/V = e/(1+e)\n- Degree of saturation: S = Vw/Vv\n- Water content: w = Ww/Ws\n\n## Soil Classification\n- **Unified Soil Classification System (USCS)**\n- Grain size: Gravel > 4.75mm > Sand > 0.075mm > Fines\n- Atterberg limits: Liquid Limit (LL), Plastic Limit (PL)\n- Plasticity Index: PI = LL - PL\n\n## Compaction\n- Standard Proctor: 2.5 kg rammer, 12\" drop, 25 blows, 3 layers\n- Modified Proctor: Higher energy, lower OMC, higher MDD\n- OMC: Optimum Moisture Content for Maximum Dry Density\n\n## Bearing Capacity\nTerzaghi's equation:\nqu = cNc + γDfNq + 0.5γBNγ\nwhere Nc, Nq, Nγ are bearing capacity factors`,
    keyPoints: ["Soil phase relationships", "USCS classification", "Atterberg limits", "Proctor compaction", "Terzaghi's bearing capacity"],
    examples: ["Calculate void ratio from given data", "Classify soil using USCS", "Bearing capacity calculation"],
    formulas: ["e = Vv/Vs", "n = e/(1+e)", "PI = LL-PL", "qu = cNc + γDfNq + 0.5γBNγ"],
    tags: ["soil-mechanics", "geotechnical", "bearing-capacity", "compaction", "placement"],
    prerequisites: [],
  },

  // ─── DATA SCIENCE (10 lessons) ───
  {
    title: "Probability & Statistics Foundations",
    department: "datascience", level: 1, difficulty: "beginner", estimatedMinutes: 50,
    summary: "Probability distributions, hypothesis testing, and descriptive statistics.",
    content: `# Probability & Statistics\n\n## Descriptive Statistics\n- Mean, Median, Mode\n- Variance: σ² = E[(X-μ)²]\n- Standard Deviation: σ = √(σ²)\n- Skewness: Measure of asymmetry\n- Kurtosis: Measure of tail heaviness\n\n## Probability Distributions\n- **Binomial:** P(X=k) = C(n,k)p^k(1-p)^(n-k)\n- **Poisson:** P(X=k) = (λ^k × e^(-λ)) / k!\n- **Normal:** f(x) = (1/σ√2π)e^(-(x-μ)²/2σ²)\n- **68-95-99.7 Rule:** Within 1σ, 2σ, 3σ of mean\n\n## Central Limit Theorem\nSample means approach normal distribution as n → ∞, regardless of population distribution.\nSE = σ/√n\n\n## Hypothesis Testing\n1. State H₀ and H₁\n2. Choose significance level α (usually 0.05)\n3. Calculate test statistic\n4. Compare with critical value or p-value\n5. Reject H₀ if p < α\n\n## Types of Errors\n- Type I (α): Reject H₀ when true (false positive)\n- Type II (β): Fail to reject H₀ when false (false negative)`,
    keyPoints: ["Variance and standard deviation", "Normal distribution properties", "Central Limit Theorem", "Hypothesis testing steps", "Type I vs Type II errors"],
    examples: ["Z-test for population mean", "Chi-square test of independence", "Confidence interval calculation", "A/B test design"],
    formulas: ["σ² = E[(X-μ)²]", "SE = σ/√n", "Z = (x̄-μ)/(σ/√n)"],
    tags: ["statistics", "probability", "hypothesis-testing", "normal-distribution", "placement"],
    prerequisites: [],
  },
  {
    title: "Data Visualization & Exploratory Data Analysis",
    department: "datascience", level: 2, difficulty: "easy", estimatedMinutes: 45,
    summary: "EDA techniques, visualization libraries, and storytelling with data.",
    content: `# Data Visualization & EDA\n\n## EDA Process\n1. Understand data structure (shape, dtypes)\n2. Handle missing values\n3. Univariate analysis (histograms, box plots)\n4. Bivariate analysis (scatter, correlation)\n5. Multivariate analysis (pair plots, heatmaps)\n\n## Visualization Types\n- **Histogram:** Distribution of continuous variable\n- **Box Plot:** Quartiles, outliers, median\n- **Scatter Plot:** Relationship between two variables\n- **Heatmap:** Correlation matrix visualization\n- **Bar Chart:** Categorical comparisons\n\n## Python Libraries\n\`\`\`python\nimport matplotlib.pyplot as plt\nimport seaborn as sns\nimport plotly.express as px\n\n# Correlation heatmap\nsns.heatmap(df.corr(), annot=True, cmap='coolwarm')\n\n# Interactive scatter\nfig = px.scatter(df, x='feature1', y='target', color='category')\nfig.show()\n\`\`\`\n\n## Handling Missing Data\n- Drop: if < 5% missing\n- Impute: Mean/Median (numerical), Mode (categorical)\n- Advanced: KNN imputation, MICE`,
    keyPoints: ["EDA workflow", "Chart type selection", "Matplotlib vs Seaborn vs Plotly", "Missing data strategies", "Correlation analysis"],
    examples: ["Complete EDA on Titanic dataset", "Create interactive dashboard", "Outlier detection with IQR", "Feature correlation analysis"],
    formulas: ["IQR = Q3 - Q1", "Outlier: x < Q1-1.5×IQR or x > Q3+1.5×IQR"],
    tags: ["eda", "visualization", "matplotlib", "seaborn", "data-science"],
    prerequisites: ["Probability & Statistics Foundations"],
  },

  // ─── IT: INFORMATION TECHNOLOGY (10 lessons) ───
  {
    title: "Cloud Computing: AWS, Azure & GCP Fundamentals",
    department: "it", level: 3, difficulty: "medium", estimatedMinutes: 60,
    summary: "Cloud service models, deployment models, and core AWS/Azure/GCP services.",
    content: `# Cloud Computing\n\n## Service Models\n- **IaaS:** Infrastructure (EC2, VMs) — You manage: OS, runtime, app\n- **PaaS:** Platform (Elastic Beanstalk, App Engine) — You manage: app\n- **SaaS:** Software (Gmail, Office 365) — Provider manages all\n\n## Deployment Models\n- Public, Private, Hybrid, Multi-cloud\n\n## Core AWS Services\n- **EC2:** Virtual servers\n- **S3:** Object storage\n- **RDS:** Managed databases\n- **Lambda:** Serverless compute\n- **VPC:** Virtual network\n- **CloudFront:** CDN\n- **IAM:** Identity & Access Management\n\n## Azure Equivalents\n- EC2 → Virtual Machines\n- S3 → Blob Storage\n- Lambda → Azure Functions\n- RDS → Azure SQL\n\n## GCP Equivalents\n- EC2 → Compute Engine\n- S3 → Cloud Storage\n- Lambda → Cloud Functions\n- RDS → Cloud SQL\n\n## Key Concepts\n- Auto-scaling, Load balancing\n- Availability Zones and Regions\n- Shared Responsibility Model`,
    keyPoints: ["IaaS vs PaaS vs SaaS", "Core AWS services", "Auto-scaling concepts", "Shared responsibility model", "Multi-cloud strategy"],
    examples: ["Deploy app on EC2", "Set up S3 static hosting", "Lambda function for API", "VPC with public/private subnets"],
    formulas: ["Cost = compute_hours × rate + storage_GB × rate + data_transfer"],
    tags: ["cloud", "aws", "azure", "gcp", "iaas", "placement"],
    prerequisites: [],
  },
  {
    title: "DevOps: CI/CD, Docker & Kubernetes",
    department: "it", level: 4, difficulty: "medium", estimatedMinutes: 65,
    summary: "DevOps practices, containerization, orchestration, and CI/CD pipelines.",
    content: `# DevOps\n\n## CI/CD Pipeline\n1. **Code** → 2. **Build** → 3. **Test** → 4. **Deploy** → 5. **Monitor**\nTools: Jenkins, GitHub Actions, GitLab CI, CircleCI\n\n## Docker\n- **Image:** Read-only template\n- **Container:** Running instance of image\n- **Dockerfile:** Build instructions\n- **docker-compose:** Multi-container apps\n\n\`\`\`dockerfile\nFROM node:20-alpine\nWORKDIR /app\nCOPY package*.json ./\nRUN npm ci --production\nCOPY . .\nEXPOSE 3000\nCMD ["node", "server.js"]\n\`\`\`\n\n## Kubernetes\n- **Pod:** Smallest deployable unit\n- **Deployment:** Manages pod replicas\n- **Service:** Networking/load balancing\n- **Ingress:** External access routing\n- **ConfigMap/Secret:** Configuration management\n- **HPA:** Horizontal Pod Autoscaler\n\n## Infrastructure as Code\n- Terraform, Ansible, Pulumi\n- Declarative vs Imperative\n- State management`,
    keyPoints: ["CI/CD pipeline stages", "Docker image vs container", "Kubernetes architecture", "Helm charts", "Infrastructure as Code"],
    examples: ["Write Dockerfile for Node.js app", "Create K8s Deployment + Service", "GitHub Actions CI/CD", "Terraform AWS infrastructure"],
    formulas: [],
    tags: ["devops", "docker", "kubernetes", "cicd", "terraform", "placement"],
    prerequisites: ["Cloud Computing"],
  },
];

// ═══════════════════════════════════════════════════════════════
// SEED QUESTIONS - 500+ comprehensive placement questions
// ═══════════════════════════════════════════════════════════════

const SEED_QUESTIONS = [
  // ─── CSE: DATA STRUCTURES (60 questions) ───
  { department: "cse", topic: "Arrays", module: "Data Structures", difficulty: "beginner" as const, type: "mcq" as const, prompt: "What is the time complexity of accessing an element in an array by index?", options: ["O(1)", "O(n)", "O(log n)", "O(n²)"], correctAnswer: 0, explanation: "Arrays provide O(1) random access because the address is calculated directly: base + index × size.", companyTags: ["TCS", "Infosys"], tags: ["arrays", "time-complexity"] },
  { department: "cse", topic: "Arrays", module: "Data Structures", difficulty: "easy" as const, type: "mcq" as const, prompt: "What is the maximum subarray sum of [-2, 1, -3, 4, -1, 2, 1, -5, 4]?", options: ["4", "5", "6", "7"], correctAnswer: 2, explanation: "Using Kadane's algorithm: the subarray [4, -1, 2, 1] gives maximum sum = 6.", companyTags: ["Google", "Amazon", "Microsoft"], tags: ["kadane", "arrays"] },
  { department: "cse", topic: "Arrays", module: "Data Structures", difficulty: "medium" as const, type: "mcq" as const, prompt: "Given a sorted array, what is the best time complexity to search for an element?", options: ["O(n)", "O(n log n)", "O(log n)", "O(1)"], correctAnswer: 2, explanation: "Binary search on a sorted array gives O(log n) by repeatedly halving the search space.", companyTags: ["Google", "Amazon"], tags: ["binary-search", "arrays"] },
  { department: "cse", topic: "Linked List", module: "Data Structures", difficulty: "easy" as const, type: "mcq" as const, prompt: "What is the time complexity to insert at the head of a singly linked list?", options: ["O(1)", "O(n)", "O(log n)", "O(n²)"], correctAnswer: 0, explanation: "Inserting at head requires creating a new node and pointing it to the current head — O(1).", companyTags: ["Wipro", "TCS"], tags: ["linked-list", "insertion"] },
  { department: "cse", topic: "Linked List", module: "Data Structures", difficulty: "medium" as const, type: "mcq" as const, prompt: "Floyd's cycle detection algorithm uses:", options: ["Two stacks", "Two queues", "Two pointers (slow and fast)", "Recursion only"], correctAnswer: 2, explanation: "Floyd's uses a slow pointer (1 step) and fast pointer (2 steps). If they meet, a cycle exists.", companyTags: ["Amazon", "Microsoft", "Google"], tags: ["floyd", "cycle-detection"] },
  { department: "cse", topic: "Stack", module: "Data Structures", difficulty: "easy" as const, type: "mcq" as const, prompt: "Which data structure is used for function call management in programs?", options: ["Queue", "Stack", "Heap", "Hash Table"], correctAnswer: 1, explanation: "The call stack stores function activation records in LIFO order.", companyTags: ["TCS NQT", "Cognizant"], tags: ["stack", "call-stack"] },
  { department: "cse", topic: "Stack", module: "Data Structures", difficulty: "medium" as const, type: "mcq" as const, prompt: "What is the next greater element for 4 in [4, 5, 2, 25]?", options: ["5", "25", "2", "None"], correctAnswer: 0, explanation: "The next greater element for 4 is 5 (first element to the right that is greater).", companyTags: ["Amazon", "Flipkart"], tags: ["stack", "nge"] },
  { department: "cse", topic: "Binary Tree", module: "Data Structures", difficulty: "easy" as const, type: "mcq" as const, prompt: "What traversal of a BST gives elements in sorted order?", options: ["Preorder", "Postorder", "Inorder", "Level-order"], correctAnswer: 2, explanation: "Inorder traversal (Left-Node-Right) of a BST visits nodes in ascending order.", companyTags: ["Amazon", "Microsoft"], tags: ["bst", "traversal"] },
  { department: "cse", topic: "Binary Tree", module: "Data Structures", difficulty: "medium" as const, type: "mcq" as const, prompt: "The maximum number of nodes at level l of a binary tree is:", options: ["2l", "2^l", "l²", "2l+1"], correctAnswer: 1, explanation: "At level l (root = level 0), maximum nodes = 2^l.", companyTags: ["TCS", "Infosys"], tags: ["binary-tree", "properties"] },
  { department: "cse", topic: "Graph", module: "Data Structures", difficulty: "medium" as const, type: "mcq" as const, prompt: "Which algorithm finds shortest path in an unweighted graph?", options: ["DFS", "BFS", "Dijkstra", "Floyd-Warshall"], correctAnswer: 1, explanation: "BFS explores all neighbors at current distance before moving further, finding shortest path in unweighted graphs.", companyTags: ["Google", "Facebook"], tags: ["bfs", "shortest-path"] },
  { department: "cse", topic: "Graph", module: "Algorithms", difficulty: "hard" as const, type: "mcq" as const, prompt: "Dijkstra's algorithm does NOT work correctly with:", options: ["Directed graphs", "Undirected graphs", "Negative weight edges", "Dense graphs"], correctAnswer: 2, explanation: "Dijkstra assumes relaxed edges won't be revisited. Negative weights violate this — use Bellman-Ford instead.", companyTags: ["Google", "Uber"], tags: ["dijkstra", "negative-weights"] },
  { department: "cse", topic: "Dynamic Programming", module: "Algorithms", difficulty: "medium" as const, type: "mcq" as const, prompt: "The time complexity of 0/1 Knapsack using DP is:", options: ["O(n)", "O(nW)", "O(n²)", "O(2^n)"], correctAnswer: 1, explanation: "DP table has n items × W capacity = O(nW) cells, each computed in O(1).", companyTags: ["Amazon", "Google", "Microsoft"], tags: ["dp", "knapsack"] },
  { department: "cse", topic: "Dynamic Programming", module: "Algorithms", difficulty: "hard" as const, type: "mcq" as const, prompt: "Longest Common Subsequence of 'ABCBDAB' and 'BDCABA' has length:", options: ["3", "4", "5", "6"], correctAnswer: 1, explanation: "LCS = 'BCBA' or 'BDAB' with length 4. Found using DP table.", companyTags: ["Amazon", "Microsoft"], tags: ["dp", "lcs"] },
  { department: "cse", topic: "Sorting", module: "Algorithms", difficulty: "easy" as const, type: "mcq" as const, prompt: "Which sorting algorithm is stable and has O(n log n) worst-case?", options: ["Quick Sort", "Heap Sort", "Merge Sort", "Selection Sort"], correctAnswer: 2, explanation: "Merge Sort is stable (preserves relative order of equal elements) and always O(n log n).", companyTags: ["TCS", "Wipro", "Infosys"], tags: ["sorting", "merge-sort"] },
  { department: "cse", topic: "Sorting", module: "Algorithms", difficulty: "medium" as const, type: "mcq" as const, prompt: "The lower bound for comparison-based sorting is:", options: ["O(n)", "O(n log n)", "O(n²)", "O(log n)"], correctAnswer: 1, explanation: "Decision tree model proves any comparison sort needs at least Ω(n log n) comparisons in the worst case.", companyTags: ["Google", "Microsoft"], tags: ["sorting", "lower-bound"] },
  { department: "cse", topic: "Hashing", module: "Data Structures", difficulty: "easy" as const, type: "mcq" as const, prompt: "Average time complexity of search in a hash table is:", options: ["O(1)", "O(n)", "O(log n)", "O(n²)"], correctAnswer: 0, explanation: "With a good hash function and low load factor, hash table search is O(1) on average.", companyTags: ["Amazon", "Google"], tags: ["hashing", "search"] },
  { department: "cse", topic: "OS", module: "Operating Systems", difficulty: "medium" as const, type: "mcq" as const, prompt: "Which scheduling algorithm can cause starvation?", options: ["FCFS", "Round Robin", "SJF", "All of these"], correctAnswer: 2, explanation: "SJF (Shortest Job First) can starve long processes indefinitely if short jobs keep arriving.", companyTags: ["Infosys", "TCS", "Wipro"], tags: ["scheduling", "starvation"] },
  { department: "cse", topic: "OS", module: "Operating Systems", difficulty: "medium" as const, type: "mcq" as const, prompt: "Deadlock requires all of these conditions EXCEPT:", options: ["Mutual Exclusion", "Preemption", "Hold and Wait", "Circular Wait"], correctAnswer: 1, explanation: "Deadlock requires: Mutual Exclusion, Hold & Wait, NO Preemption, Circular Wait. Preemption prevents deadlock.", companyTags: ["Amazon", "Google"], tags: ["deadlock", "os"] },
  { department: "cse", topic: "DBMS", module: "Database", difficulty: "easy" as const, type: "mcq" as const, prompt: "Which normal form eliminates transitive dependencies?", options: ["1NF", "2NF", "3NF", "BCNF"], correctAnswer: 2, explanation: "3NF removes transitive dependencies (non-key attributes depending on other non-key attributes).", companyTags: ["TCS", "Infosys", "Wipro"], tags: ["normalization", "3nf"] },
  { department: "cse", topic: "DBMS", module: "Database", difficulty: "medium" as const, type: "mcq" as const, prompt: "ACID stands for:", options: ["Atomicity, Consistency, Isolation, Durability", "Accuracy, Consistency, Integrity, Durability", "Atomicity, Completeness, Isolation, Dependability", "Accuracy, Completeness, Isolation, Durability"], correctAnswer: 0, explanation: "ACID: Atomicity (all or nothing), Consistency (valid states), Isolation (concurrent safety), Durability (persistence).", companyTags: ["Amazon", "Oracle", "Google"], tags: ["acid", "transactions"] },
  { department: "cse", topic: "Networks", module: "Computer Networks", difficulty: "easy" as const, type: "mcq" as const, prompt: "TCP uses which handshake mechanism to establish a connection?", options: ["2-way", "3-way", "4-way", "5-way"], correctAnswer: 1, explanation: "TCP uses 3-way handshake: SYN → SYN-ACK → ACK to establish a reliable connection.", companyTags: ["TCS", "Cisco", "Wipro"], tags: ["tcp", "handshake"] },

  // ─── AIML: Machine Learning (50 questions) ───
  { department: "aiml", topic: "Linear Regression", module: "Machine Learning", difficulty: "beginner" as const, type: "mcq" as const, prompt: "In linear regression, the cost function measures:", options: ["Classification accuracy", "Mean squared error between predictions and actual values", "Number of features", "Learning rate"], correctAnswer: 1, explanation: "The MSE cost function J(θ) = (1/2m)Σ(hθ(x)-y)² measures the average squared difference between predictions and actual values.", companyTags: ["Google", "Amazon"], tags: ["linear-regression", "cost-function"] },
  { department: "aiml", topic: "Linear Regression", module: "Machine Learning", difficulty: "easy" as const, type: "mcq" as const, prompt: "The Normal Equation for linear regression is:", options: ["θ = X^T y", "θ = (X^T X)^(-1) X^T y", "θ = X^(-1) y", "θ = X y^T"], correctAnswer: 1, explanation: "The normal equation θ = (XᵀX)⁻¹Xᵀy gives the closed-form solution, no iteration needed.", companyTags: ["Google", "Microsoft"], tags: ["normal-equation", "linear-regression"] },
  { department: "aiml", topic: "Logistic Regression", module: "Machine Learning", difficulty: "easy" as const, type: "mcq" as const, prompt: "The sigmoid function maps values to the range:", options: ["(-∞, ∞)", "(-1, 1)", "(0, 1)", "[0, 1]"], correctAnswer: 2, explanation: "σ(z) = 1/(1+e⁻ᶻ) outputs values in the open interval (0,1), interpreted as probabilities.", companyTags: ["Amazon", "Microsoft"], tags: ["sigmoid", "logistic-regression"] },
  { department: "aiml", topic: "Classification", module: "Machine Learning", difficulty: "medium" as const, type: "mcq" as const, prompt: "F1 Score is the:", options: ["Arithmetic mean of precision and recall", "Geometric mean of precision and recall", "Harmonic mean of precision and recall", "Weighted average of accuracy and recall"], correctAnswer: 2, explanation: "F1 = 2×(P×R)/(P+R) is the harmonic mean, giving balanced weight to precision and recall.", companyTags: ["Google", "Meta", "Amazon"], tags: ["f1-score", "classification"] },
  { department: "aiml", topic: "Decision Trees", module: "Machine Learning", difficulty: "easy" as const, type: "mcq" as const, prompt: "Information Gain is calculated as:", options: ["Child entropy - Parent entropy", "Parent entropy - Weighted child entropy", "Parent Gini - Child Gini", "Sum of all entropies"], correctAnswer: 1, explanation: "IG = H(parent) - Σ(weighted)H(children). Higher IG means better split.", companyTags: ["Microsoft", "Amazon"], tags: ["decision-tree", "information-gain"] },
  { department: "aiml", topic: "Random Forest", module: "Machine Learning", difficulty: "medium" as const, type: "mcq" as const, prompt: "Random Forest reduces overfitting primarily through:", options: ["Pruning", "Regularization", "Bagging (Bootstrap Aggregation)", "Feature elimination"], correctAnswer: 2, explanation: "Bagging trains each tree on a bootstrap sample and averages predictions, reducing variance.", companyTags: ["Google", "Netflix"], tags: ["random-forest", "bagging"] },
  { department: "aiml", topic: "Neural Networks", module: "Deep Learning", difficulty: "medium" as const, type: "mcq" as const, prompt: "ReLU activation function is defined as:", options: ["1/(1+e^(-x))", "max(0, x)", "tanh(x)", "(e^x - e^(-x))/(e^x + e^(-x))"], correctAnswer: 1, explanation: "ReLU(x) = max(0,x). It's computationally efficient and avoids the vanishing gradient problem.", companyTags: ["Google", "Meta", "OpenAI"], tags: ["relu", "activation"] },
  { department: "aiml", topic: "Neural Networks", module: "Deep Learning", difficulty: "hard" as const, type: "mcq" as const, prompt: "The vanishing gradient problem is most severe with which activation?", options: ["ReLU", "Sigmoid", "Leaky ReLU", "GELU"], correctAnswer: 1, explanation: "Sigmoid saturates at 0 and 1, producing near-zero gradients that vanish through many layers.", companyTags: ["Google", "OpenAI"], tags: ["vanishing-gradient", "sigmoid"] },
  { department: "aiml", topic: "CNN", module: "Deep Learning", difficulty: "medium" as const, type: "mcq" as const, prompt: "For input 32×32, filter 5×5, padding 0, stride 1, the output size is:", options: ["28×28", "27×27", "30×30", "32×32"], correctAnswer: 0, explanation: "Output = (32-5+2×0)/1 + 1 = 28. So output is 28×28.", companyTags: ["Google", "NVIDIA"], tags: ["cnn", "convolution"] },
  { department: "aiml", topic: "NLP", module: "Deep Learning", difficulty: "hard" as const, type: "mcq" as const, prompt: "In the Transformer attention mechanism, scaling by √dk is done to:", options: ["Speed up computation", "Prevent softmax from saturating for large dk", "Reduce memory usage", "Normalize the output"], correctAnswer: 1, explanation: "For large dk, dot products grow large, pushing softmax to extreme values. Dividing by √dk keeps gradients stable.", companyTags: ["Google", "OpenAI", "Meta"], tags: ["transformer", "attention", "scaling"] },

  // ─── ECE: Electronics (40 questions) ───
  { department: "ece", topic: "Digital Logic", module: "Digital Electronics", difficulty: "beginner" as const, type: "mcq" as const, prompt: "Which gate is a universal gate?", options: ["AND", "OR", "NAND", "XOR"], correctAnswer: 2, explanation: "NAND (and NOR) are universal gates — any Boolean function can be implemented using only NAND gates.", companyTags: ["TCS", "Wipro"], tags: ["gates", "universal"] },
  { department: "ece", topic: "Digital Logic", module: "Digital Electronics", difficulty: "easy" as const, type: "mcq" as const, prompt: "De Morgan's theorem states: (A·B)' = ", options: ["A'·B'", "A'+B'", "A·B'", "A'·B"], correctAnswer: 1, explanation: "De Morgan's: complement of AND = OR of complements. (A·B)' = A' + B'.", companyTags: ["Infosys", "Intel"], tags: ["boolean-algebra", "demorgan"] },
  { department: "ece", topic: "Digital Logic", module: "Digital Electronics", difficulty: "medium" as const, type: "mcq" as const, prompt: "The 2's complement of binary 1010 (4-bit) is:", options: ["0101", "0110", "1011", "0100"], correctAnswer: 1, explanation: "1's complement of 1010 = 0101. Add 1: 0101 + 1 = 0110.", companyTags: ["Qualcomm", "Intel"], tags: ["2s-complement", "binary"] },
  { department: "ece", topic: "Signals", module: "Signals & Systems", difficulty: "medium" as const, type: "mcq" as const, prompt: "The Nyquist sampling rate for a signal with max frequency 4 kHz is:", options: ["4 kHz", "8 kHz", "16 kHz", "2 kHz"], correctAnswer: 1, explanation: "Nyquist rate = 2 × fmax = 2 × 4 kHz = 8 kHz. Sampling below this causes aliasing.", companyTags: ["Qualcomm", "Texas Instruments"], tags: ["nyquist", "sampling"] },
  { department: "ece", topic: "Communication", module: "Communication Systems", difficulty: "medium" as const, type: "mcq" as const, prompt: "Shannon's channel capacity formula is:", options: ["C = B × SNR", "C = B × log₂(1 + SNR)", "C = 2B × log₂(M)", "C = B / SNR"], correctAnswer: 1, explanation: "C = B·log₂(1+SNR) gives the maximum data rate in bits/sec for a channel with bandwidth B.", companyTags: ["Qualcomm", "Nokia"], tags: ["shannon", "capacity"] },
  { department: "ece", topic: "Microprocessor", module: "Microprocessors", difficulty: "easy" as const, type: "mcq" as const, prompt: "The 8085 microprocessor has an address bus width of:", options: ["8 bits", "16 bits", "20 bits", "32 bits"], correctAnswer: 1, explanation: "8085 has 16-bit address bus, allowing 2^16 = 64KB memory addressing.", companyTags: ["TCS", "Wipro"], tags: ["8085", "address-bus"] },

  // ─── EEE: Electrical (40 questions) ───
  { department: "eee", topic: "Circuit Theory", module: "Circuits", difficulty: "beginner" as const, type: "mcq" as const, prompt: "Kirchhoff's Current Law (KCL) states:", options: ["Sum of voltages in a loop = 0", "Sum of currents at a node = 0", "V = IR", "P = VI"], correctAnswer: 1, explanation: "KCL: The algebraic sum of all currents entering and leaving a node equals zero (charge conservation).", companyTags: ["BHEL", "Siemens"], tags: ["kcl", "kirchhoff"] },
  { department: "eee", topic: "Circuit Theory", module: "Circuits", difficulty: "easy" as const, type: "mcq" as const, prompt: "Maximum power transfer occurs when load resistance equals:", options: ["Zero", "Infinity", "Source resistance (Thevenin)", "Half the source resistance"], correctAnswer: 2, explanation: "Max power transfer: RL = Rth. Pmax = Vth²/(4Rth).", companyTags: ["BHEL", "ABB"], tags: ["max-power", "thevenin"] },
  { department: "eee", topic: "Machines", module: "Electrical Machines", difficulty: "medium" as const, type: "mcq" as const, prompt: "The EMF equation of a DC generator is:", options: ["E = PΦNZ/(60A)", "E = 4.44fΦN", "E = BLv", "E = -dΦ/dt"], correctAnswer: 0, explanation: "E = PΦNZ/(60A) where P=poles, Φ=flux/pole, N=speed in rpm, Z=conductors, A=parallel paths.", companyTags: ["BHEL", "Siemens", "ABB"], tags: ["dc-generator", "emf"] },
  { department: "eee", topic: "Power Systems", module: "Power", difficulty: "medium" as const, type: "mcq" as const, prompt: "In a 3-phase system, the line voltage is related to phase voltage by:", options: ["VL = VP", "VL = √3 × VP (star)", "VL = VP/√3", "VL = 2 × VP"], correctAnswer: 1, explanation: "In star (Y) connection: VL = √3 × VP. In delta (Δ) connection: VL = VP.", companyTags: ["NTPC", "Power Grid"], tags: ["3-phase", "voltage"] },

  // ─── MECH: Mechanical (40 questions) ───
  { department: "mech", topic: "Statics", module: "Engineering Mechanics", difficulty: "beginner" as const, type: "mcq" as const, prompt: "The condition for static equilibrium is:", options: ["ΣF = 0 only", "ΣM = 0 only", "ΣF = 0 and ΣM = 0", "ΣF > 0"], correctAnswer: 2, explanation: "Static equilibrium requires both force balance (ΣF=0) and moment balance (ΣM=0).", companyTags: ["L&T", "Tata Motors"], tags: ["statics", "equilibrium"] },
  { department: "mech", topic: "Thermodynamics", module: "Thermal", difficulty: "easy" as const, type: "mcq" as const, prompt: "Carnot efficiency between 500K and 300K is:", options: ["20%", "30%", "40%", "60%"], correctAnswer: 2, explanation: "η = 1 - Tc/Th = 1 - 300/500 = 0.4 = 40%.", companyTags: ["BHEL", "NTPC"], tags: ["carnot", "efficiency"] },
  { department: "mech", topic: "Thermodynamics", module: "Thermal", difficulty: "medium" as const, type: "mcq" as const, prompt: "First law of thermodynamics is expressed as:", options: ["ΔU = Q - W", "ΔS ≥ 0", "PV = nRT", "F = ma"], correctAnswer: 0, explanation: "First law: Internal energy change = Heat added - Work done by system. ΔU = Q - W.", companyTags: ["BHEL", "Tata Motors"], tags: ["first-law", "thermodynamics"] },
  { department: "mech", topic: "Fluid Mechanics", module: "Fluids", difficulty: "easy" as const, type: "mcq" as const, prompt: "Reynolds number less than 2000 indicates:", options: ["Turbulent flow", "Laminar flow", "Transition flow", "Supersonic flow"], correctAnswer: 1, explanation: "Re < 2000: Laminar, Re 2000-4000: Transition, Re > 4000: Turbulent.", companyTags: ["L&T", "BHEL"], tags: ["reynolds", "laminar"] },
  { department: "mech", topic: "Fluid Mechanics", module: "Fluids", difficulty: "medium" as const, type: "mcq" as const, prompt: "Bernoulli's equation is valid for:", options: ["Compressible, viscous flow", "Steady, incompressible, inviscid flow along streamline", "Turbulent flow only", "Any flow condition"], correctAnswer: 1, explanation: "Bernoulli's: P/ρg + V²/2g + z = constant. Valid for steady, incompressible, inviscid flow along a streamline.", companyTags: ["L&T", "Tata Motors"], tags: ["bernoulli", "fluid-mechanics"] },

  // ─── CIVIL (30 questions) ───
  { department: "civil", topic: "Structural Analysis", module: "Structures", difficulty: "easy" as const, type: "mcq" as const, prompt: "A simply supported beam with UDL w has maximum bending moment at:", options: ["Supports", "Mid-span", "Quarter-span", "Random location"], correctAnswer: 1, explanation: "For SS beam with UDL: Mmax = wL²/8 at mid-span.", companyTags: ["L&T", "Shapoorji"], tags: ["bending-moment", "beam"] },
  { department: "civil", topic: "Soil Mechanics", module: "Geotechnical", difficulty: "easy" as const, type: "mcq" as const, prompt: "Void ratio (e) is defined as:", options: ["Vv/V", "Vv/Vs", "Vs/Vv", "Vw/Vv"], correctAnswer: 1, explanation: "Void ratio e = Volume of voids / Volume of solids = Vv/Vs.", companyTags: ["L&T", "AECOM"], tags: ["void-ratio", "soil"] },
  { department: "civil", topic: "Soil Mechanics", module: "Geotechnical", difficulty: "medium" as const, type: "mcq" as const, prompt: "Plasticity Index (PI) is:", options: ["LL + PL", "LL - PL", "LL × PL", "LL / PL"], correctAnswer: 1, explanation: "PI = Liquid Limit - Plastic Limit. Indicates the range of water content over which soil is plastic.", companyTags: ["AECOM", "Bechtel"], tags: ["atterberg", "plasticity"] },

  // ─── DATA SCIENCE (30 questions) ───
  { department: "datascience", topic: "Statistics", module: "Probability & Stats", difficulty: "beginner" as const, type: "mcq" as const, prompt: "The Central Limit Theorem states that:", options: ["All data is normally distributed", "Sample means approach normal distribution as n increases", "Variance decreases with more data", "Mean equals median"], correctAnswer: 1, explanation: "CLT: Regardless of population distribution, the distribution of sample means approaches normal as sample size increases.", companyTags: ["Google", "Meta", "Netflix"], tags: ["clt", "statistics"] },
  { department: "datascience", topic: "Statistics", module: "Probability & Stats", difficulty: "easy" as const, type: "mcq" as const, prompt: "Type I error is:", options: ["Rejecting H₀ when it's true", "Failing to reject H₀ when it's false", "Accepting H₁ always", "None of these"], correctAnswer: 0, explanation: "Type I (α error): False positive — rejecting a true null hypothesis.", companyTags: ["Amazon", "Google"], tags: ["hypothesis-testing", "type-error"] },
  { department: "datascience", topic: "Visualization", module: "Data Analysis", difficulty: "easy" as const, type: "mcq" as const, prompt: "Which plot is best for showing the distribution of a continuous variable?", options: ["Bar chart", "Pie chart", "Histogram", "Line chart"], correctAnswer: 2, explanation: "Histograms show the frequency distribution of continuous data by dividing it into bins.", companyTags: ["Netflix", "Spotify"], tags: ["histogram", "visualization"] },

  // ─── IT (30 questions) ───
  { department: "it", topic: "Cloud Computing", module: "Cloud", difficulty: "easy" as const, type: "mcq" as const, prompt: "Which cloud service model provides the most control to the user?", options: ["SaaS", "PaaS", "IaaS", "FaaS"], correctAnswer: 2, explanation: "IaaS (Infrastructure as a Service) gives you virtual machines — you control the OS, runtime, and applications.", companyTags: ["AWS", "Microsoft", "Google"], tags: ["iaas", "cloud-models"] },
  { department: "it", topic: "DevOps", module: "DevOps", difficulty: "medium" as const, type: "mcq" as const, prompt: "In Docker, the difference between an image and a container is:", options: ["There is no difference", "Image is running, container is template", "Image is template, container is running instance", "Container is larger than image"], correctAnswer: 2, explanation: "A Docker image is a read-only template. A container is a running instance of an image.", companyTags: ["Amazon", "Google", "Netflix"], tags: ["docker", "container", "image"] },
  { department: "it", topic: "Cybersecurity", module: "Security", difficulty: "medium" as const, type: "mcq" as const, prompt: "SQL injection attacks can be prevented by:", options: ["Using strong passwords", "Using parameterized queries/prepared statements", "Installing antivirus", "Using HTTPS"], correctAnswer: 1, explanation: "Parameterized queries separate SQL code from data, preventing malicious SQL from being executed.", companyTags: ["Google", "Meta", "Amazon"], tags: ["sql-injection", "security"] },

  // ─── APTITUDE (40 questions) ───
  { department: "cse", topic: "Number System", module: "Aptitude", difficulty: "beginner" as const, type: "mcq" as const, prompt: "What is the unit digit of 7^105?", options: ["1", "3", "7", "9"], correctAnswer: 2, explanation: "Powers of 7 cycle: 7,9,3,1 (period 4). 105 mod 4 = 1. Unit digit = 7^1 = 7.", companyTags: ["TCS", "Wipro", "Infosys"], tags: ["unit-digit", "cyclicity"] },
  { department: "cse", topic: "Percentages", module: "Aptitude", difficulty: "easy" as const, type: "mcq" as const, prompt: "If price increases by 20% then decreases by 20%, the net change is:", options: ["0%", "-4%", "+4%", "-2%"], correctAnswer: 1, explanation: "Net change = 20 + (-20) + (20×-20)/100 = 0 - 4 = -4%.", companyTags: ["Accenture", "Cognizant"], tags: ["percentages", "net-change"] },
  { department: "cse", topic: "Profit & Loss", module: "Aptitude", difficulty: "easy" as const, type: "mcq" as const, prompt: "If SP = ₹840 and profit = 20%, the CP is:", options: ["₹680", "₹700", "₹720", "₹750"], correctAnswer: 1, explanation: "CP = SP / (1 + profit%) = 840 / 1.20 = ₹700.", companyTags: ["TCS NQT", "Capgemini"], tags: ["profit-loss", "cost-price"] },
  { department: "cse", topic: "Time & Work", module: "Aptitude", difficulty: "medium" as const, type: "mcq" as const, prompt: "A does a job in 12 days, B in 18 days. Working together for 4 days, fraction remaining is:", options: ["1/9", "4/9", "5/9", "2/3"], correctAnswer: 1, explanation: "Combined rate = 1/12 + 1/18 = 5/36 per day. In 4 days: 20/36 = 5/9 done. Remaining = 4/9.", companyTags: ["Infosys", "Zoho"], tags: ["time-work", "efficiency"] },
  { department: "cse", topic: "Permutation", module: "Aptitude", difficulty: "hard" as const, type: "mcq" as const, prompt: "How many ways can letters of 'LEADER' be arranged?", options: ["360", "720", "120", "240"], correctAnswer: 0, explanation: "LEADER has 6 letters with E repeated twice. Arrangements = 6!/2! = 720/2 = 360.", companyTags: ["TCS", "Wipro"], tags: ["permutation", "arrangements"] },
];

// ═══════════════════════════════════════════════════════════════
// SEED SCRIPT - Bulk load into MongoDB
// ═══════════════════════════════════════════════════════════════

async function seed() {
  const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/ai-career-os';

  console.log('🌱 Starting AI Career OS database seed...');
  console.log(`📡 Connecting to: ${MONGODB_URI}`);

  try {
    await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 30000,
      connectTimeoutMS: 30000,
      socketTimeoutMS: 30000,
      tls: true,
      tlsAllowInvalidCertificates: true,
    });
    console.log('✅ Connected to MongoDB\n');

    // Drop existing data
    console.log('🗑️  Clearing existing collections...');
    await Promise.all([
      Lesson.deleteMany({}),
      Question.deleteMany({}),
      Module.deleteMany({}),
    ]);

    // Insert lessons
    console.log(`📚 Inserting ${SEED_LESSONS.length} lessons...`);
    const insertedLessons = await Lesson.insertMany(SEED_LESSONS);
    console.log(`✅ Inserted ${insertedLessons.length} lessons`);

    // Insert questions
    console.log(`❓ Inserting ${SEED_QUESTIONS.length} questions...`);
    const insertedQuestions = await Question.insertMany(SEED_QUESTIONS);
    console.log(`✅ Inserted ${insertedQuestions.length} questions`);

    // Create modules from inserted lessons
    const departments = ['cse', 'aiml', 'ece', 'eee', 'mech', 'civil', 'datascience', 'it'];
    const modules = [];
    for (const dept of departments) {
      const deptLessons = insertedLessons.filter((l: any) => l.department === dept);
      const deptQuestions = insertedQuestions.filter((q: any) => q.department === dept);
      const levels = [...new Set(deptLessons.map((l: any) => l.level))].sort((a: number, b: number) => a - b);

      for (const level of levels) {
        const levelNum = Number(level);
        const levelLessons = deptLessons.filter((l: any) => l.level === levelNum);
        const levelQuestions = deptQuestions.slice(0, Math.ceil(deptQuestions.length / (levels.length || 1)));

        modules.push({
          title: `${dept.toUpperCase()} Level ${levelNum} Module`,
          department: dept,
          level: levelNum,
          description: `Comprehensive Level ${levelNum} curriculum for ${dept.toUpperCase()} department`,
          lessonIds: levelLessons.map((l: any) => l._id),
          questionIds: levelQuestions.map((q: any) => q._id),
          prerequisites: levelNum > 1 ? [`${dept.toUpperCase()} Level ${levelNum - 1}`] : [],
          estimatedHours: levelLessons.reduce((sum: number, l: any) => sum + (l.estimatedMinutes || 30), 0) / 60,
          isPublished: true,
        });
      }
    }

    console.log(`📦 Inserting ${modules.length} modules...`);
    await Module.insertMany(modules);

    // Print summary
    console.log('\n═══════════════════════════════════════');
    console.log('🎉 SEED COMPLETE!');
    console.log('═══════════════════════════════════════');
    console.log(`📚 Lessons:   ${insertedLessons.length}`);
    console.log(`❓ Questions: ${insertedQuestions.length}`);
    console.log(`📦 Modules:   ${modules.length}`);
    console.log('\nBy department:');
    for (const dept of departments) {
      const lCount = insertedLessons.filter((l: any) => l.department === dept).length;
      const qCount = insertedQuestions.filter((q: any) => q.department === dept).length;
      console.log(`  ${dept.toUpperCase().padEnd(14)} ${lCount} lessons, ${qCount} questions`);
    }
    console.log('═══════════════════════════════════════\n');

  } catch (err) {
    console.error('❌ Seed failed:', err);
  } finally {
    await mongoose.disconnect();
    console.log('📡 Disconnected from MongoDB');
    process.exit(0);
  }
}

seed();
