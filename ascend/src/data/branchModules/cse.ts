import type { BranchModuleData } from "./types";
import { makeVideoLinks } from "./types";

export const CSE_IT_MODULES: BranchModuleData[] = [
  {
    moduleTitle: "Arrays & Two Sum Pattern",
    roles: ["cse-data-engineer", "cse-devops", "cse-sde", "cse-backend", "cse-fullstack", "cse-frontend"],
    industryUseCase: "Zero-Downtime Multi-Region Kubernetes Deployment at Spotify",
    harvardOxfordRef: "Harvard CS109 Cloud Infrastructure & Site Reliability Engineering",
    level: "Level 1 – Foundations",
    branch: ["cse", "it"],
    videos: makeVideoLinks("Arrays and Two Sum Pattern"),
    studyMaterial: {
      summary: `An array is a linear data structure storing elements in contiguous memory blocks. 
In competitive placement tests and MNC technical interviews, Array Manipulation and Hash Map Complements form the absolute bedrock of algorithmic problem solving.

The Two Sum problem evaluates an engineer's ability to optimize space-time complexity from quadratic brute force down to linear time using auxiliary memory structures.`,
      deepDiveTextbook: `CHAPTER 1: ADVANCED MEMORY LAYOUT & COMPLEMENT INDEXING

1.1 Physical Memory & Array Offsets
When an array A of type T is declared, the operating system allocates a contiguous block of size N * sizeof(T). 
Memory Address Formula: Address(A[i]) = BaseAddress + i * sizeof(T).
Because offset multiplication is an O(1) arithmetic calculation, array index access is strictly O(1) time complexity.

1.2 The Complement Theorem in Two Sum
To satisfy A[i] + A[j] = Target (where i != j), we rearrange the equation to find a missing component:
Target - A[i] = A[j]
Rather than scanning the entire array for A[j] (which takes O(N) per element leading to O(N²) overall), we insert every visited element into a Hash Table.
The Hash Table maps Value -> Index. When examining element A[i], we perform an O(1) expected lookup for (Target - A[i]).

1.3 Edge Cases to Master for FAANG Interviews
1. Duplicate Values: Handles cases like nums = [3, 3], target = 6 correctly by checking complement BEFORE inserting current element.
2. Unsorted vs Sorted Inputs: If input is unsorted, Hash Map is required for O(N) time and O(N) space. If input is sorted, Two Pointers (Left, Right) achieves O(N) time and O(1) auxiliary space.`,
      authorReferences: [
        {
          author: "Thomas H. Cormen, Charles E. Leiserson, Ronald L. Rivest, Clifford Stein",
          bookTitle: "Introduction to Algorithms (CLRS 4th Edition)",
          coreInsight: "Hash tables resolve collisions via Chaining or Open Addressing. Average case dictionary lookup is O(1), ensuring optimal linear search reduction."
        },
        {
          author: "Gayle Laakmann McDowell",
          bookTitle: "Cracking the Coding Interview (6th Edition)",
          coreInsight: "Always ask interviewers if the array is sorted before coding. Space-time trade-off is the primary rubric used to rate candidate seniority."
        }
      ],
      flowchartSteps: [
        "Initialize Empty Hash Map",
        "Iterate i from 0 to N-1",
        "Calculate Complement = Target - Nums[i]",
        "Check: Is Complement in Hash Map?",
        "IF YES -> Return [Map[Complement], i]",
        "IF NO -> Insert Map[Nums[i]] = i & Continue"
      ],
      comparisonTable: {
        headers: ["Approach", "Time Complexity", "Space Complexity", "Requires Sorted Array?", "Best Used For"],
        rows: [
          ["Brute Force Nested Loops", "O(N²)", "O(1)", "No", "Tiny arrays (N < 20)"],
          ["Hash Map Complement Lookup", "O(N)", "O(N)", "No", "General unsorted arrays"],
          ["Two Pointers (Left & Right)", "O(N log N) or O(N)", "O(1)", "Yes", "Memory-constrained systems"],
          ["Binary Search Per Element", "O(N log N)", "O(1)", "Yes", "When extra memory is forbidden"]
        ]
      },
      concept3DSimulation: {
        title: "3D Hash Map Complement Lookup Architecture",
        description: "Visual representation of how incoming array numbers are mapped to hash buckets while checking for target complement matches.",
        interactiveNodes: [
          { name: "Input Stream Node", type: "Array Pointer", details: "Feeds nums[i] into execution pipeline sequentially." },
          { name: "Hash Function Unit", type: "Arithmetic Transformer", details: "Hashes key = target - nums[i] into memory bucket offset." },
          { name: "Complement Evaluator", type: "Comparator Node", details: "Triggers instant match signal when bucket contains active complement index." }
        ]
      },
      keyPoints: [
        "Arrays provide O(1) random access by memory offset arithmetic.",
        "Hash Map lookup is O(1) average time complexity, enabling single pass solutions.",
        "Complement formula: required_value = target - current_element.",
        "Space-Time trade-off: Trade O(n) memory to drop execution time from O(n²) to O(n)."
      ],
      example: `def two_sum(nums, target):
    seen = {} • Value -> Index mapping
    for i, num in enumerate(nums):
        diff = target - num
        if diff in seen:
            return [seen[diff], i]
        seen[num] = i
    return []`,
      complexity: "Time: O(n) | Space: O(n)"
    },
    aiExplain: {
      steps: [
        "1. Understand input array and target integer.",
        "2. Store seen elements in a HashMap key=value, val=index.",
        "3. For each element, check if target-element exists in map.",
        "4. If found, return [map[target-element], current_index].",
        "5. Otherwise insert current element into map and continue."
      ],
      analogy: "Finding a pair of shoes: instead of trying every shoe against every other, you put each shoe in a labeled cubby as you see it. The moment you hold a right shoe, you check if its matching left shoe is already in the cubby!"
    },
    debug: [
      {
        title: "Fix Two Sum HashMap Key Error",
        buggy: `def two_sum(nums, target):\n    seen = {}\n    for i, num in enumerate(nums):\n        if target - num in seen:\n            return [seen[num], i] • Bug: storing num instead of complement index\n        seen[num] = i`,
        fixed: `def two_sum(nums, target):\n    seen = {}\n    for i, num in enumerate(nums):\n        diff = target - num\n        if diff in seen:\n            return [seen[diff], i]\n        seen[num] = i`,
        hint: "Return seen[diff] (the complement's index), not seen[num]."
      }
    ],
    quiz: [
      { q: "What is the time complexity of two_sum using a HashMap?", options: ["O(n²)", "O(n)", "O(log n)", "O(1)"], answer: 1 },
      { q: "What is the space complexity of the HashMap solution?", options: ["O(1)", "O(n)", "O(n²)", "O(log n)"], answer: 1 },
      { q: "Given nums=[2,7,11,15] and target=9, what does two_sum return?", options: ["[0,1]", "[1,2]", "[0,2]", "[]"], answer: 0 },
      { q: "Why is array index access O(1)?", options: ["Contiguous memory calculation", "Binary search", "Dynamic allocation", "Pointer traversal"], answer: 0 },
      { q: "If no pair sums to target, what should two_sum return?", options: ["[-1,-1]", "[]", "None", "Error"], answer: 1 }
    ],
    mnc: [
      { company: "Amazon", year: "2023", question: "Two Sum II (Sorted Array input)", answer: "Use Two-Pointer approach from start and end → O(n) time, O(1) space." },
      { company: "Google", year: "2023", question: "3Sum Problem", answer: "Sort array, fix first number, use Two Pointers for remaining two → O(n²) time." },
      { company: "Microsoft", year: "2022", question: "Subarray Sum Equals K", answer: "Use Prefix Sum + HashMap to track frequency of cumulative sums → O(n) time." }
    ],
    mock: [
      { type: "Technical", question: "When would you prefer Two Pointers over HashMap for Two Sum?", tip: "When input array is already sorted, Two Pointers takes O(1) extra space vs O(n) for HashMap." }
    ],
    coding: {
      problem: "Two Sum",
      desc: "Find indices of the two numbers such that they add up to target.",
      input: "nums = [2, 7, 11, 15], target = 9",
      output: "[0, 1]",
      starter: `def two_sum(nums, target):\n    seen = {}\n    for i, num in enumerate(nums):\n        • Fill complement logic here\n        pass\n    return []`
    }
  },
  {
    moduleTitle: "Linked Lists & Cycle Detection",
    roles: ["cse-data-engineer", "cse-devops", "cse-sde", "cse-backend", "cse-fullstack", "cse-frontend"],
    industryUseCase: "Zero-Downtime Multi-Region Kubernetes Deployment at Spotify",
    harvardOxfordRef: "Harvard CS109 Cloud Infrastructure & Site Reliability Engineering",
    level: "Level 2 – Data Structures",
    branch: ["cse", "it"],
    videos: makeVideoLinks("Linked List and Floyd Cycle Detection Algorithm"),
    studyMaterial: {
      summary: `A Linked List consists of nodes where each node contains data and a pointer to the next node.
Floyd's Cycle-Finding Algorithm (Tortoise and Hare) detects loops using two pointers:
Slow pointer advances 1 step, Fast pointer advances 2 steps.
If a cycle exists, Fast and Slow pointers will eventually meet.`,
      keyPoints: [
        "Dynamic sizing without pre-allocating contiguous memory block.",
        "O(1) insertion/deletion at head, O(n) access by index.",
        "Floyd's Algorithm runs in O(n) time and O(1) auxiliary space.",
        "Intersection of two lists can be found using length difference or two-pointer loop."
      ],
      example: `def has_cycle(head):
    slow, fast = head, head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
        if slow == fast:
            return True
    return False`,
      complexity: "Time: O(n) | Space: O(1)"
    },
    aiExplain: {
      steps: [
        "1. Initialize slow and fast pointers to head.",
        "2. Loop while fast and fast.next are not None.",
        "3. Advance slow by 1 node, fast by 2 nodes.",
        "4. If slow equals fast, loop detected -> return True.",
        "5. If loop terminates, return False."
      ],
      analogy: "Two runners on a circular track: if one runs twice as fast as the other, they are guaranteed to lap each other inside the loop!"
    },
    debug: [
      {
        title: "Fix Null Pointer Exception in Cycle Check",
        buggy: `def has_cycle(head):\n    slow = head\n    fast = head\n    while fast.next: • Bug: fast itself could be None\n        slow = slow.next\n        fast = fast.next.next\n        if slow == fast: return True\n    return False`,
        fixed: `def has_cycle(head):\n    slow = head\n    fast = head\n    while fast and fast.next:\n        slow = slow.next\n        fast = fast.next.next\n        if slow == fast: return True\n    return False`,
        hint: "Always check `while fast and fast.next:` to avoid reading `.next` on a `None` object."
      }
    ],
    quiz: [
      { q: "What is the time complexity of Floyd's Cycle Detection?", options: ["O(n²)", "O(n)", "O(log n)", "O(1)"], answer: 1 },
      { q: "What space complexity does Floyd's algorithm achieve?", options: ["O(n)", "O(1)", "O(log n)", "O(n²)"], answer: 1 },
      { q: "What is the head insertion time complexity in Singly Linked List?", options: ["O(1)", "O(n)", "O(log n)", "O(n²)"], answer: 0 },
      { q: "How fast does the fast pointer move relative to slow pointer?", options: ["3x", "2x", "1.5x", "Logarithmic"], answer: 1 },
      { q: "Which pointer traversal reverses a Linked List in place?", options: ["Three pointers (prev, curr, next)", "Two pointers", "Queue", "Recursion only"], answer: 0 }
    ],
    mnc: [
      { company: "Microsoft", year: "2023", question: "Reverse a Linked List", answer: "Iterative reversal using prev, curr, next pointers in O(n) time and O(1) space." },
      { company: "Amazon", year: "2023", question: "Find Middle of Linked List", answer: "Slow pointer moves 1 step, fast pointer 2 steps. When fast reaches end, slow is at middle." },
      { company: "TCS (NQT)", year: "2022", question: "Merge Two Sorted Linked Lists", answer: "Use dummy node and compare heads of both lists in O(n+m) time." }
    ],
    mock: [
      { type: "Technical", question: "Explain the difference between Array and Linked List in memory layout.", tip: "Arrays store elements in contiguous memory slots allowing O(1) indexing; Linked List nodes are scattered across heap connected via pointers." }
    ],
    coding: {
      problem: "Detect Loop in Linked List",
      desc: "Implement Floyd's Tortoise and Hare algorithm.",
      input: "head = [3, 2, 0, -4], pos = 1 (tail connects to node index 1)",
      output: "True",
      starter: `def has_cycle(head):\n    • Return True if cycle exists, else False\n    pass`
    }
  },
  {
    moduleTitle: "Binary Trees & BST Traversals",
    roles: ["cse-data-engineer", "cse-devops", "cse-sde", "cse-backend", "cse-fullstack", "cse-frontend"],
    industryUseCase: "Zero-Downtime Multi-Region Kubernetes Deployment at Spotify",
    harvardOxfordRef: "Harvard CS109 Cloud Infrastructure & Site Reliability Engineering",
    level: "Level 4 – Advanced Data Structures",
    branch: ["cse", "it"],
    videos: makeVideoLinks("Binary Tree BST Traversal Inorder Preorder Postorder Levelorder"),
    studyMaterial: {
      summary: "Hierarchical non-linear structure where nodes have at most two children. BST guarantees left < root < right.",
      deepDiveTextbook: `CHAPTER 4: TREE STRUCTURES & BALANCED SEARCH TREES (HARVARD CS50 / CLRS SPEC)

4.1 Tree Terminology & Properties
A Tree is a set of nodes connected by directed edges starting from a root node.
- Depth: Number of edges from root to target node.
- Height: Number of edges on longest path from node to a leaf.
- Binary Search Tree (BST) Invariant: For any node N, key(left_child) < key(N) < key(right_child).

4.2 Tree Traversals
1. Pre-Order (Root -> Left -> Right): Used for serializing tree structures.
2. In-Order (Left -> Root -> Right): Returns elements in strictly sorted order for a BST!
3. Post-Order (Left -> Right -> Root): Used for deleting tree nodes bottom-up.
4. Level-Order (BFS using Queue): Traverses node levels from top to bottom, left to right.`,
      authorReferences: [
        {
          author: "Donald Knuth",
          bookTitle: "The Art of Computer Programming (Vol 1: Fundamental Algorithms)",
          coreInsight: "Trees are fundamental to computer architecture, dynamic memory allocation, and compiler parsing syntax trees."
        }
      ],
      flowchartSteps: [
        "Check Node == Null -> Return",
        "Process Left Subtree Recursively",
        "Visit & Process Current Node",
        "Process Right Subtree Recursively"
      ],
      comparisonTable: {
        headers: ["Traversal Type", "Order Pattern", "Time Complexity", "Auxiliary Space", "Primary Application"],
        rows: [
          ["In-Order", "Left -> Root -> Right", "O(N)", "O(H) recursion stack", "BST Sorted Output"],
          ["Pre-Order", "Root -> Left -> Right", "O(N)", "O(H) recursion stack", "Tree Expression Copying"],
          ["Post-Order", "Left -> Right -> Root", "O(N)", "O(H) recursion stack", "Bottom-up Subtree Deletion"],
          ["Level-Order", "Queue BFS Level-by-Level", "O(N)", "O(W) queue width", "Shortest path in unweighted tree"]
        ]
      },
      concept3DSimulation: {
        title: "3D BST Traversal Node Graph",
        description: "Visual animation of recursive stack frames traversing binary search nodes in 3D space.",
        interactiveNodes: [
          { name: "Root Node", type: "Pivot Pointer", details: "Top-level ancestor directing binary balance." },
          { name: "Left Subtree Cluster", type: "L-Child Pointer", details: "Contains values strictly smaller than root." },
          { name: "Right Subtree Cluster", type: "R-Child Pointer", details: "Contains values strictly larger than root." }
        ]
      },
      keyPoints: [
        "Inorder traversal of a BST yields sorted order array.",
        "Balanced BST search time is O(log n); skewed BST degrades to O(n).",
        "Self-balancing trees (AVL, Red-Black) maintain height log(n) automatically."
      ],
      example: `def inorder(root):
    return inorder(root.left) + [root.val] + inorder(root.right) if root else []`,
      complexity: "Time: O(n) | Space: O(h)"
    },
    aiExplain: {
      steps: [
        "1. Check if current root node is None.",
        "2. Recursively traverse left child.",
        "3. Append/print root value.",
        "4. Recursively traverse right child."
      ],
      analogy: "Exploring an organizational chart: check the branch manager, visit all subordinates in team A, then move to team B!"
    },
    debug: [
      {
        title: "Fix BST Inorder Traversal Recursion Base Case",
        buggy: `def inorder(root):\n    • Missing base case if root is None!\n    return inorder(root.left) + [root.val] + inorder(root.right)`,
        fixed: `def inorder(root):\n    if not root:\n        return []\n    return inorder(root.left) + [root.val] + inorder(root.right)`,
        hint: "Add `if not root: return []` base case to stop infinite recursion."
      }
    ],
    quiz: [
      { q: "Which traversal of a BST yields sorted output?", options: ["Pre-order", "In-order", "Post-order", "Level-order"], answer: 1 },
      { q: "What is worst-case search time in an unbalanced BST?", options: ["O(1)", "O(log n)", "O(n)", "O(n²)"], answer: 2 },
      { q: "Which data structure implements BFS level-order traversal?", options: ["Stack", "Queue", "Priority Queue", "Graph"], answer: 1 },
      { q: "What is maximum number of nodes at depth d in binary tree?", options: ["2^d", "d²", "2d", "d!"], answer: 0 },
      { q: "Which self-balancing tree guarantees strict height balance factor <= 1?", options: ["B-Tree", "AVL Tree", "Splay Tree", "Trie"], answer: 1 }
    ],
    mnc: [
      { company: "Amazon", year: "2023", question: "Validate Binary Search Tree", answer: "Perform inorder traversal and verify strictly increasing values or pass lower/upper bounds." },
      { company: "Google", year: "2023", question: "Lowest Common Ancestor in BST", answer: "If both p and q < root, go left; if both > root, go right; else root is LCA." },
      { company: "Microsoft", year: "2022", question: "Serialize and Deserialize Binary Tree", answer: "Use Preorder traversal with marker '• ' for null pointers." }
    ],
    mock: [
      { type: "Technical", question: "Explain AVL Tree rotations during insertion.", tip: "Left-Left (Single Right), Right-Right (Single Left), Left-Right (Double), Right-Left (Double) rotations balance height." }
    ],
    coding: {
      problem: "Inorder BST Traversal",
      desc: "Return inorder traversal array for a given binary tree root.",
      input: "root = [1, null, 2, 3]",
      output: "[1, 3, 2]",
      starter: `def inorderTraversal(root):\n    • Return list of values in inorder\n    pass`
    }
  },
  {
    moduleTitle: "Graphs – BFS, DFS & Shortest Path",
    roles: ["cse-data-engineer", "cse-devops", "cse-sde", "cse-backend", "cse-fullstack", "cse-frontend"],
    industryUseCase: "Zero-Downtime Multi-Region Kubernetes Deployment at Spotify",
    harvardOxfordRef: "Harvard CS109 Cloud Infrastructure & Site Reliability Engineering",
    level: "Level 4 – Advanced Algorithms",
    branch: ["cse", "it"],
    videos: makeVideoLinks("Graph Algorithms BFS DFS Dijkstra Shortest Path"),
    studyMaterial: {
      summary: "Graphs represent networks of vertices connected by edges. Dijkstra's Algorithm finds shortest path in weighted graphs.",
      deepDiveTextbook: `CHAPTER 5: GRAPH THEORY & NETWORK OPTIMIZATION (OXFORD / HARVARD CURRICULUM)

5.1 Representation: Adjacency List vs Adjacency Matrix
- Adjacency Matrix: N x N grid. Space O(V²). Lookup edge O(1).
- Adjacency List: Array of linked lists/vectors. Space O(V + E). Traversal O(V + E).

5.2 Graph Traversal Paradigms
- Breadth-First Search (BFS): Uses Queue (FIFO). Explores uniform distance concentric rings. Optimal for unweighted shortest paths.
- Depth-First Search (DFS): Uses Stack/Recursion (LIFO). Explores deep branches until dead end. Used for Topological Sort and Cycle Detection.

5.3 Dijkstra's Shortest Path Algorithm
Finds single-source shortest path for non-negative edge weights using a Min-Heap Priority Queue in O((V + E) log V) time.`,
      authorReferences: [
        {
          author: "Edsger W. Dijkstra",
          bookTitle: "A Note on Two Problems in Connexion with Graphs (1959)",
          coreInsight: "Greedy choice principle guarantees optimal shortest path when all edge weights are non-negative."
        }
      ],
      flowchartSteps: [
        "Initialize Distance Array to Infinity & Dist[Source] = 0",
        "Push (0, Source) into Min-Heap Priority Queue",
        "Pop Smallest (Dist, Node) from Min-Heap",
        "For each Neighbor: If Dist + Weight < NeighborDist -> Update & Push Heap",
        "Repeat until Priority Queue is Empty"
      ],
      comparisonTable: {
        headers: ["Algorithm", "Time Complexity", "Space Complexity", "Handles Negative Weights?", "Best Use Case"],
        rows: [
          ["BFS", "O(V + E)", "O(V)", "No", "Unweighted Shortest Path"],
          ["DFS", "O(V + E)", "O(V)", "No", "Cycle Detection & Topological Sort"],
          ["Dijkstra", "O((V + E) log V)", "O(V)", "No", "Weighted Single-Source Shortest Path"],
          ["Bellman-Ford", "O(V * E)", "O(V)", "Yes", "Detecting Negative Weight Cycles"]
        ]
      },
      concept3DSimulation: {
        title: "3D Graph Node & Shortest Path Network",
        description: "3D node graph mesh animating wave propagation in BFS and relaxation in Dijkstra.",
        interactiveNodes: [
          { name: "Source Node", type: "Origin", details: "Distance = 0 starting location." },
          { name: "Priority Queue", type: "Min-Heap Evaluator", details: "Selects lowest tentative distance edge next." },
          { name: "Target Node", type: "Destination", details: "Accumulates minimum path cost." }
        ]
      },
      keyPoints: [
        "BFS guarantees shortest path in unweighted graphs.",
        "Dijkstra fails with negative edge weights — use Bellman-Ford instead.",
        "Topological Sort requires Directed Acyclic Graph (DAG)."
      ],
      example: `import heapq
def dijkstra(graph, start):
    dist = {node: float('inf') for node in graph}
    dist[start] = 0
    pq = [(0, start)]
    while pq:
        d, u = heapq.heappop(pq)
        if d > dist[u]: continue
        for v, w in graph[u]:
            if dist[u] + w < dist[v]:
                dist[v] = dist[u] + w
                heapq.heappush(pq, (dist[v], v))
    return dist`,
      complexity: "Time: O((V+E) log V) | Space: O(V)"
    },
    aiExplain: {
      steps: [
        "1. Set all node distances to infinity except start node (0).",
        "2. Add start node to priority queue min-heap.",
        "3. Extract smallest distance node and relax all neighboring edges.",
        "4. Repeat until priority queue is empty."
      ],
      analogy: "GPS Navigation: calculating shortest driving route through traffic intersections!"
    },
    debug: [
      {
        title: "Fix Dijkstra Infinite Loop on Stale Heap Pop",
        buggy: `while pq:\n    d, u = heapq.heappop(pq)\n    • Missing check: if d > dist[u]: continue\n    for v, w in graph[u]:...`,
        fixed: `while pq:\n    d, u = heapq.heappop(pq)\n    if d > dist[u]: continue • Skip stale entries\n    for v, w in graph[u]:...`,
        hint: "Skip outdated node entries popped from heap using `if d > dist[u]: continue`."
      }
    ],
    quiz: [
      { q: "Which algorithm finds single source shortest path with non-negative weights?", options: ["DFS", "Dijkstra", "Kruskal", "Floyd-Warshall"], answer: 1 },
      { q: "What data structure optimizes Dijkstra's algorithm to O((V+E) log V)?", options: ["Array", "Linked List", "Min-Heap Priority Queue", "Stack"], answer: 2 },
      { q: "Which condition must be met to perform Topological Sorting?", options: ["Undirected Graph", "Directed Acyclic Graph (DAG)", "Complete Graph", "Tree only"], answer: 1 },
      { q: "What is time complexity of Bellman-Ford algorithm?", options: ["O(V+E)", "O(V log V)", "O(V * E)", "O(V³)"], answer: 2 },
      { q: "Which algorithm finds all-pairs shortest paths in O(V³)?", options: ["Dijkstra", "Floyd-Warshall", "Prim", "BFS"], answer: 1 }
    ],
    mnc: [
      { company: "Google", year: "2023", question: "Word Ladder (BFS Shortest Path)", answer: "Transform start word to end word modifying 1 char at a time using BFS queue." },
      { company: "Amazon", year: "2023", question: "Course Schedule (Cycle Detection)", answer: "Use Kahn's Algorithm (in-degree BFS) or DFS colors (White/Gray/Black) to detect cycles in DAG." },
      { company: "Uber", year: "2022", question: "Shortest Path in Grid with Obstacles", answer: "Use 0-1 BFS or Dijkstra with state (row, col, remaining_k_removals)." }
    ],
    mock: [
      { type: "Technical", question: "Explain the difference between Prim's and Kruskal's Minimum Spanning Tree algorithms.", tip: "Prim grows a single tree using priority queue of edges (good for dense graphs); Kruskal sorts all edges and uses Union-Find Disjoint Set (good for sparse graphs)." }
    ],
    coding: {
      problem: "Dijkstra Shortest Path",
      desc: "Compute shortest distances from start node to all nodes.",
      input: "graph = {0: [(1, 4), (2, 1)], 1: [(3, 1)], 2: [(1, 2), (3, 5)], 3: []}, start = 0",
      output: "{0: 0, 1: 3, 2: 1, 3: 4}",
      starter: `def shortest_path(graph, start):\n    • Return dictionary of shortest distance from start\n    pass`
    }
  },
  {
    moduleTitle: "Dynamic Programming – Memoization & Tabulation",
    roles: ["cse-data-engineer", "cse-devops", "cse-sde", "cse-backend", "cse-fullstack", "cse-frontend"],
    industryUseCase: "Zero-Downtime Multi-Region Kubernetes Deployment at Spotify",
    harvardOxfordRef: "Harvard CS109 Cloud Infrastructure & Site Reliability Engineering",
    level: "Level 5 – Master Algorithms",
    branch: ["cse", "it"],
    videos: makeVideoLinks("Dynamic Programming Memoization Tabulation 01 Knapsack LCS"),
    studyMaterial: {
      summary: "Dynamic Programming breaks complex problems into overlapping subproblems with optimal substructure. Memoization (Top-Down) vs Tabulation (Bottom-Up).",
      deepDiveTextbook: `CHAPTER 6: DYNAMIC PROGRAMMING & RECURSION (MIT / HARVARD ALGORITHMIC SPEC)

6.1 Requirements for Dynamic Programming
1. Optimal Substructure: Optimal solution to problem contains optimal solutions to subproblems.
2. Overlapping Subproblems: Recursion tree visits identical subproblems multiple times.

6.2 Memoization vs Tabulation
- Top-Down Memoization: Uses recursion + cache dictionary/array. Easy to implement from brute force.
- Bottom-Up Tabulation: Uses iterative table filling. Avoids recursion stack overhead and enables space optimization.`,
      authorReferences: [
        {
          author: "Richard Bellman",
          bookTitle: "Dynamic Programming (1957)",
          coreInsight: "Principle of Optimality: An optimal policy has the property that whatever initial state and decision are, remaining decisions must constitute optimal policy with regard to state resulting from first decision."
        }
      ],
      flowchartSteps: [
        "Identify Subproblem & State Parameters (dp[i][j])",
        "Formulate Recurrence Relation (Transitions)",
        "Define Base Cases (dp[0] = 0)",
        "Choose Evaluation Order (Iterative Bottom-Up or Top-Down Memo)",
        "Extract Final Answer from Array"
      ],
      comparisonTable: {
        headers: ["Pattern", "Recurrence Formula", "Time Complexity", "Space Complexity", "Classic Problem"],
        rows: [
          ["0/1 Knapsack", "dp[i][w] = max(val + dp[i-1][w-wt], dp[i-1][w])", "O(N * W)", "O(N * W) -> O(W)", "Resource Allocation"],
          ["Longest Common Subsequence", "dp[i][j] = 1 + dp[i-1][j-1] if match else max", "O(M * N)", "O(M * N)", "DNA / Diff Comparison"],
          ["Coin Change", "dp[i] = min(dp[i], 1 + dp[i - coin])", "O(Amount * Coins)", "O(Amount)", "Minimum Currency Swap"],
          ["Edit Distance", "dp[i][j] = 1 + min(Insert, Delete, Replace)", "O(M * N)", "O(M * N)", "Spelling Autocorrect"]
        ]
      },
      concept3DSimulation: {
        title: "3D DP State Matrix & Grid Fill",
        description: "3D visual matrix showing cached values propagating across dynamic subproblem grid.",
        interactiveNodes: [
          { name: "Base State", type: "Ground Truth", details: "dp[0] initialized values." },
          { name: "Transition Engine", type: "State Evaluator", details: "Computes current cell from previously computed sub-cells." },
          { name: "Optimal Solution Node", type: "Destination Cell", details: "dp[N][W] final calculated answer." }
        ]
      },
      keyPoints: [
        "Identify overlapping subproblems before jumping to DP.",
        "Space can often be optimized from O(N*W) down to O(W) using 1D rolling array.",
        "Subproblem state must be free of side effects."
      ],
      example: `def knapsack(weights, values, W):
    dp = [0] * (W + 1)
    for wt, val in zip(weights, values):
        for w in range(W, wt - 1, -1):
            dp[w] = max(dp[w], val + dp[w - wt])
    return dp[W]`,
      complexity: "Time: O(n*W) | Space: O(W)"
    },
    aiExplain: {
      steps: [
        "1. Define DP array of size (Capacity + 1) initialized to 0.",
        "2. For each item (weight, value), iterate backwards from Capacity down to item weight.",
        "3. Update dp[w] = max(dp[w], value + dp[w - weight]).",
        "4. Return dp[Capacity]."
      ],
      analogy: "Packing a travel backpack: calculating the most valuable combination of items without exceeding weight limit!"
    },
    debug: [
      {
        title: "Fix 0/1 Knapsack 1D Array Forward Iteration Bug",
        buggy: `for w in range(wt, W + 1): • Bug: forward loop allows SAME item to be picked multiple times! (Unbounded knapsack)`,
        fixed: `for w in range(W, wt - 1, -1): • Fixed: reverse loop ensures each item used AT MOST ONCE`,
        hint: "Iterate backwards `range(W, wt - 1, -1)` when using 1D array for 0/1 Knapsack to prevent re-using same item."
      }
    ],
    quiz: [
      { q: "What two properties must a problem have to be solved via Dynamic Programming?", options: ["Greedy Choice & Recursion", "Optimal Substructure & Overlapping Subproblems", "Sorting & Binary Search", "Stack & Queue"], answer: 1 },
      { q: "What is time complexity of 0/1 Knapsack with N items and Capacity W?", options: ["O(2^N)", "O(N log N)", "O(N * W)", "O(N + W)"], answer: 2 },
      { q: "Why iterate backwards in 1D array 0/1 Knapsack tabulation?", options: ["Faster CPU execution", "Prevents picking same item multiple times", "Required by Python", "To reverse array"], answer: 1 },
      { q: "What is time complexity to find Longest Common Subsequence of strings length M and N?", options: ["O(M+N)", "O(M * N)", "O(2^(M+N))", "O(log(M*N))"], answer: 1 },
      { q: "Which DP technique builds solution iteratively from smallest base cases?", options: ["Memoization", "Tabulation", "Backtracking", "Divide and Conquer"], answer: 1 }
    ],
    mnc: [
      { company: "Google", year: "2023", question: "Edit Distance (Levenshtein Distance)", answer: "DP matrix dp[i][j] storing minimum operations (Insert, Delete, Replace) to convert str1[0..i] to str2[0..j]." },
      { company: "Amazon", year: "2023", question: "Coin Change Problem", answer: "1D DP array initialized to infinity. dp[i] = min(dp[i], 1 + dp[i - coin])." },
      { company: "Microsoft", year: "2022", question: "Maximum Subarray (Kadane's Algorithm)", answer: "DP tracking current sum: current_sum = max(num, current_sum + num) in O(N) time and O(1) space." }
    ],
    mock: [
      { type: "Technical", question: "When would you prefer Memoization (Top-Down) over Tabulation (Bottom-Up)?", tip: "Memoization only evaluates required subproblems (useful when state space is sparse); Tabulation evaluates all table entries (avoids recursion overhead)." }
    ],
    coding: {
      problem: "0/1 Knapsack Problem",
      desc: "Find maximum total value in knapsack of capacity W.",
      input: "weights = [2, 3, 4, 5], values = [3, 4, 5, 6], W = 5",
      output: "7",
      starter: `def solve_knapsack(weights, values, W):\n    • Return maximum achievable value\n    pass`
    }
  },
  {
    moduleTitle: "System Design – Load Balancing, Caching & Scaling",
    roles: ["cse-data-engineer", "cse-devops", "cse-sde", "cse-backend", "cse-fullstack", "cse-frontend"],
    industryUseCase: "Zero-Downtime Multi-Region Kubernetes Deployment at Spotify",
    harvardOxfordRef: "Harvard CS109 Cloud Infrastructure & Site Reliability Engineering",
    level: "Level 6 – Enterprise Architecture",
    branch: ["cse", "it"],
    videos: makeVideoLinks("System Design Load Balancing Caching Microservices Sharding"),
    studyMaterial: {
      summary: "Architecting high-availability scalable web applications capable of handling millions of requests per second.",
      deepDiveTextbook: `CHAPTER 7: DISTRIBUTED SYSTEM DESIGN & HIGH AVAILABILITY (FAANG L5/L6 SPEC)

7.1 Key System Design Pillars
1. Scalability: Vertical (Scale-Up: bigger CPU/RAM) vs Horizontal (Scale-Out: more servers).
2. Availability: Measured in 9s (99.999% uptime = 5.26 mins downtime/year).
3. Consistency: CAP Theorem (Consistency, Availability, Partition Tolerance — pick 2).

7.2 Load Balancing Algorithms
- Round Robin / Weighted Round Robin
- Least Connections / Least Response Time
- Consistent Hashing (Minimizes key remapping when nodes join/leave hash ring).

7.3 Caching Strategies
- Cache-Aside (Lazy Loading): Application queries cache; on miss, queries DB and populates cache.
- Write-Through: App writes to cache, cache writes synchronously to DB.
- Write-Back (Write-Behind): App writes to cache; cache asynchronously flushes to DB in background.`,
      authorReferences: [
        {
          author: "Alex Xu",
          bookTitle: "System Design Interview – An Insider's Guide (Vol 1 & 2)",
          coreInsight: "System design requires step-by-step framework: Scope Requirements -> Back-of-envelope Estimate -> High-level Design -> Deep Dive Bottlenecks."
        },
        {
          author: "Martin Kleppmann",
          bookTitle: "Designing Data-Intensive Applications",
          coreInsight: "Reliability, Scalability, and Maintainability are the three fundamental pillars of modern distributed data software."
        }
      ],
      flowchartSteps: [
        "DNS Resolution -> Route 53 / Cloudflare",
        "Load Balancer -> Nginx / AWS ALB",
        "API Gateway -> Authentication & Rate Limiting",
        "Cache Layer -> Redis Cluster (Cache-Aside)",
        "Database Layer -> Primary DB (Writes) + Replicas (Reads)"
      ],
      comparisonTable: {
        headers: ["Cache Strategy", "Read Speed", "Write Speed", "Data Consistency", "Risk Factor"],
        rows: [
          ["Cache-Aside", "Fast on hit, Slow on miss", "Normal", "Eventually Consistent", "Stale cache if DB updated outside app"],
          ["Write-Through", "Fast", "Slower (2 writes)", "Strong Consistency", "High write latency"],
          ["Write-Back", "Ultra Fast", "Ultra Fast", "Weak / Eventual", "Data loss risk if cache crashes before flush"]
        ]
      },
      concept3DSimulation: {
        title: "3D Distributed Microservices Architecture",
        description: "Visual topology of distributed load balancers, API gateways, Redis cache nodes, and sharded database clusters.",
        interactiveNodes: [
          { name: "Consistent Hash Ring", type: "Load Balancer", details: "Distributes incoming HTTP traffic evenly." },
          { name: "Redis In-Memory Cluster", type: "Sub-millisecond Cache", details: "Caches hot database queries in RAM." },
          { name: "Sharded DB Cluster", type: "Distributed Database", details: "Partitioned by User_ID hash range." }
        ]
      },
      keyPoints: [
        "Consistent Hashing prevents cache stampedes during auto-scaling.",
        "Database Sharding partitions table rows across multiple DB instances.",
        "Message Queues (Kafka, RabbitMQ) decouple synchronous API bottlenecks."
      ],
      example: `• Consistent Hashing Ring Node Selector
import hashlib

class ConsistentHashRing:
    def __init__(self, nodes=None, replicas=3):
        self.replicas = replicas
        self.ring = {}
        self._sorted_keys = []
        if nodes:
            for node in nodes:
                self.add_node(node)

    def add_node(self, node):
        for i in range(self.replicas):
            key = self._hash(f"{node}:{i}")
            self.ring[key] = node
            self._sorted_keys.append(key)
        self._sorted_keys.sort()

    def _hash(self, key):
        return int(hashlib.md5(key.encode()).hexdigest(), 16)

    def get_node(self, key):
        if not self.ring: return None
        h = self._hash(key)
        for node_hash in self._sorted_keys:
            if h <= node_hash:
                return self.ring[node_hash]
        return self.ring[self._sorted_keys[0]]`,
      complexity: "Node Lookup: O(log N) | Ring Size: Replicas * Nodes"
    },
    aiExplain: {
      steps: [
        "1. Client makes request -> DNS resolves to Load Balancer IP.",
        "2. Load Balancer picks web server based on Consistent Hashing.",
        "3. Web server queries Redis Cache.",
        "4. On Cache Miss, query Read-Replica DB and update Redis."
      ],
      analogy: "Airport Traffic Control: directing incoming flights to open runways smoothly so no single runway gets overloaded!"
    },
    debug: [
      {
        title: "Fix Cache Stampede (Thundering Herd Problem)",
        buggy: `• Bug: Unprotected cache lookup causes 1000 DB queries simultaneously on cache expiration\nval = redis.get(key)\nif not val:\n    val = db.query(key)\n    redis.set(key, val)`,
        fixed: `• Fixed: Use Distributed Lock (Redlock) or Mutex so only ONE thread queries DB on cache miss\nval = redis.get(key)\nif not val:\n    if acquire_lock(key):\n        val = db.query(key)\n        redis.set(key, val)\n        release_lock(key)\n    else:\n        sleep_and_retry()`,
        hint: "Use Distributed Locks (Redlock) to ensure only ONE worker recomputes cached values during expiration."
      }
    ],
    quiz: [
      { q: "What does CAP Theorem state you must trade off during network partitions?", options: ["Speed vs Cost", "Consistency vs Availability", "Security vs Privacy", "RAM vs Disk"], answer: 1 },
      { q: "Which algorithm minimizes key redistribution when servers auto-scale?", options: ["Round Robin", "Random Selection", "Consistent Hashing", "Least Connections"], answer: 2 },
      { q: "In Cache-Aside strategy, what happens on a cache miss?", options: ["Return error", "Query DB, return data, and populate cache", "Crash server", "Delete DB row"], answer: 1 },
      { q: "What is Database Sharding?", options: ["Horizontal partitioning of database rows across multiple servers", "Making backups", "Encrypting database", "Deleting old rows"], answer: 0 },
      { q: "Which component decouples synchronous HTTP requests in high-volume architectures?", options: ["Load Balancer", "Message Queue (Kafka/RabbitMQ)", "DNS Server", "CSS Minifier"], answer: 1 }
    ],
    mnc: [
      { company: "Amazon", year: "2023", question: "Design Amazon Shopping Cart", answer: "Use DynamoDB with consistent hashing. Cart stored in memory cache + distributed DB with vector clocks for conflict resolution." },
      { company: "Uber", year: "2023", question: "Design Uber Driver Location Tracking System", answer: "Geohash / QuadTree spatial indexing. Drivers push GPS updates via WebSockets every 4 seconds into Redis geospatial ring." },
      { company: "Netflix", year: "2022", question: "Design Netflix Video Streaming System", answer: "CDN edge caching (Open Connect), adaptive bitrate streaming (HLS/DASH), S3 video storage." }
    ],
    mock: [
      { type: "Technical", question: "Explain the difference between SQL and NoSQL databases.", tip: "SQL (PostgreSQL/MySQL): structured schema, ACID, vertical scale, ideal for transactions. NoSQL (MongoDB/DynamoDB): schema-less, BASE, horizontal scale, ideal for high throughput unstructured data." }
    ],
    coding: {
      problem: "Consistent Hashing Ring Lookup",
      desc: "Implement node lookup in a consistent hash ring.",
      input: "nodes = ['NodeA', 'NodeB'], key = 'user_12345'",
      output: "Assigned node name",
      starter: `def lookup_node(nodes, key):\n    • Return server name assigned to key\n    pass`
    }
  },

  // ═══════════════════════════════════════════════════════════════
  // MODULE 7: DBMS & SQL – Joins, Normalization, ACID
  // ═══════════════════════════════════════════════════════════════
  {
    moduleTitle: "DBMS & SQL – Joins, Normalization, ACID",
    roles: ["cse-data-engineer", "cse-devops", "cse-sde", "cse-backend", "cse-fullstack", "cse-frontend"],
    industryUseCase: "Zero-Downtime Multi-Region Kubernetes Deployment at Spotify",
    harvardOxfordRef: "Harvard CS109 Cloud Infrastructure & Site Reliability Engineering",
    level: "Level 4 – Database Systems",
    branch: ["cse", "it"],
    videos: makeVideoLinks("DBMS SQL Joins Normalization ACID Transactions"),
    studyMaterial: {
      summary: `A Database Management System (DBMS) is software that manages the storage, retrieval, and manipulation of structured data. Relational DBMS (RDBMS) organizes data into tables (relations) with rows (tuples) and columns (attributes).

SQL (Structured Query Language) is the standard language for interacting with RDBMS. It includes DDL (CREATE, ALTER, DROP), DML (SELECT, INSERT, UPDATE, DELETE), DCL (GRANT, REVOKE), and TCL (COMMIT, ROLLBACK, SAVEPOINT).

Normalization is the process of organizing data to reduce redundancy and improve data integrity. The normal forms progress from 1NF (atomic values, no repeating groups) through 2NF (no partial dependencies on composite keys), 3NF (no transitive dependencies), to BCNF (every determinant is a candidate key).

JOINs combine rows from two or more tables based on related columns. INNER JOIN returns matching rows from both tables. LEFT JOIN returns all rows from the left table plus matching rows from the right. RIGHT JOIN is the reverse. FULL OUTER JOIN returns all rows when there is a match in either table. CROSS JOIN produces the Cartesian product.

ACID properties guarantee reliable database transactions: Atomicity (all-or-nothing), Consistency (valid state transitions), Isolation (concurrent transactions don't interfere), Durability (committed data survives crashes). Isolation levels include Read Uncommitted, Read Committed, Repeatable Read, and Serializable.`,
      deepDiveTextbook: `CHAPTER: INDEXING & QUERY OPTIMIZATION

B-Tree indexes store sorted data in a balanced tree structure allowing O(log N) search, insert, and delete operations. They are the default index type in most RDBMS (MySQL InnoDB, PostgreSQL).

Hash indexes use a hash function for O(1) exact-match lookups but cannot support range queries. Composite indexes cover multiple columns and follow the leftmost prefix rule.

The Query Optimizer analyzes SQL queries and generates an execution plan. It uses statistics about table sizes, index selectivity, and join cardinality to choose between Nested Loop Join (small tables), Hash Join (equi-joins on large tables), and Merge Join (pre-sorted data).

EXPLAIN ANALYZE reveals the actual execution plan including sequential scans, index scans, bitmap scans, and their estimated vs actual costs.`,
      authorReferences: [
        {
          author: "Abraham Silberschatz, Henry F. Korth, S. Sudarshan",
          bookTitle: "Database System Concepts (7th Edition)",
          coreInsight: "Transaction isolation levels trade off between concurrency performance and data consistency guarantees."
        },
        {
          author: "Ramez Elmasri, Shamkant B. Navathe",
          bookTitle: "Fundamentals of Database Systems (7th Edition)",
          coreInsight: "Normalization to BCNF eliminates all redundancy from functional dependencies but may sacrifice some query performance requiring strategic denormalization."
        }
      ],
      comparisonTable: {
        headers: ["Normal Form", "Requirement", "Eliminates"],
        rows: [
          ["1NF", "Atomic values, no repeating groups", "Multi-valued attributes"],
          ["2NF", "1NF + No partial dependencies", "Partial key dependencies"],
          ["3NF", "2NF + No transitive dependencies", "Transitive dependencies"],
          ["BCNF", "Every determinant is a candidate key", "All FD anomalies"]
        ]
      },
      flowchartSteps: [
        "Identify all Functional Dependencies (FDs)",
        "Check 1NF: Are all attributes atomic?",
        "Check 2NF: Any partial dependencies on composite key?",
        "Check 3NF: Any transitive dependencies (A→B→C)?",
        "Check BCNF: Is every determinant a candidate key?",
        "Decompose violating relations losslessly"
      ],
      keyPoints: [
        "INNER JOIN returns only rows with matching keys in both tables.",
        "LEFT JOIN preserves all rows from the left table, filling NULLs for non-matching right rows.",
        "ACID: Atomicity (undo on failure), Consistency (constraints hold), Isolation (concurrent safety), Durability (WAL/redo logs).",
        "B-Tree index supports range queries O(log N); Hash index supports only equality O(1).",
        "Normalization reduces redundancy; Denormalization improves read performance for analytics."
      ],
      example: `-- INNER JOIN: Get employees with their department names
SELECT e.name, d.dept_name
FROM employees e
INNER JOIN departments d ON e.dept_id = d.id;

-- LEFT JOIN: All employees, even those without a department
SELECT e.name, COALESCE(d.dept_name, 'Unassigned') AS dept
FROM employees e
LEFT JOIN departments d ON e.dept_id = d.id;

-- Subquery: Find employees earning above average
SELECT name, salary
FROM employees
WHERE salary > (SELECT AVG(salary) FROM employees);

-- Window Function: Rank employees by salary within each department
SELECT name, dept_id, salary,
       RANK() OVER (PARTITION BY dept_id ORDER BY salary DESC) as rank
FROM employees;`,
      complexity: "B-Tree Lookup: O(log N) | Hash Lookup: O(1) avg | Full Scan: O(N)"
    },
    aiExplain: {
      steps: [
        "1. Define tables with PRIMARY KEY and FOREIGN KEY constraints.",
        "2. Normalize to 3NF/BCNF to eliminate data anomalies.",
        "3. Write SELECT queries with appropriate JOINs to combine related data.",
        "4. Create indexes on frequently queried columns for performance.",
        "5. Wrap multi-statement operations in TRANSACTIONS for ACID guarantees."
      ],
      analogy: "A database is like a well-organized library: tables are bookshelves, rows are books, indexes are the card catalog that helps you find books in O(log N) time instead of scanning every shelf!"
    },
    debug: [
      {
        title: "Fix SQL JOIN returning duplicate rows",
        buggy: `SELECT e.name, d.dept_name\nFROM employees e, departments d\nWHERE e.dept_id = d.id; -- Implicit join, easily causes Cartesian product if WHERE is forgotten`,
        fixed: `SELECT DISTINCT e.name, d.dept_name\nFROM employees e\nINNER JOIN departments d ON e.dept_id = d.id;`,
        hint: "Always use explicit JOIN syntax with ON clause instead of comma-separated tables in FROM. Use DISTINCT if duplicates persist due to one-to-many relationships."
      }
    ],
    quiz: [
      { q: "Which normal form eliminates transitive dependencies?", options: ["1NF", "2NF", "3NF", "BCNF"], answer: 2 },
      { q: "What does the 'I' in ACID stand for?", options: ["Integrity", "Isolation", "Indexing", "Insertion"], answer: 1 },
      { q: "Which JOIN returns all rows from both tables, matching where possible?", options: ["INNER JOIN", "LEFT JOIN", "CROSS JOIN", "FULL OUTER JOIN"], answer: 3 },
      { q: "What data structure does a B-Tree index use?", options: ["Hash table", "Balanced search tree", "Linked list", "Stack"], answer: 1 },
      { q: "Which SQL clause is used to filter groups created by GROUP BY?", options: ["WHERE", "HAVING", "FILTER", "GROUP FILTER"], answer: 1 }
    ],
    mnc: [
      { company: "Oracle", year: "2023", question: "Explain the difference between DELETE, TRUNCATE, and DROP", answer: "DELETE removes specific rows (DML, can rollback, fires triggers). TRUNCATE removes all rows (DDL, faster, resets identity). DROP removes the entire table structure." },
      { company: "Amazon (RDS)", year: "2023", question: "How would you optimize a slow SQL query?", answer: "1. EXPLAIN ANALYZE the query plan. 2. Add indexes on WHERE/JOIN columns. 3. Avoid SELECT *. 4. Use query caching. 5. Partition large tables. 6. Denormalize for read-heavy workloads." },
      { company: "Microsoft", year: "2022", question: "What are database isolation levels and their trade-offs?", answer: "Read Uncommitted (fastest, dirty reads), Read Committed (no dirty reads), Repeatable Read (no phantom reads within transaction), Serializable (strictest, full isolation but lowest concurrency)." }
    ],
    mock: [
      { type: "Technical", question: "What is the difference between clustered and non-clustered index?", tip: "Clustered index physically reorders the table data (only one per table, usually on PK). Non-clustered index creates a separate lookup structure pointing to data rows (multiple allowed)." }
    ],
    coding: {
      problem: "SQL: Find Second Highest Salary",
      desc: "Write a SQL query to find the second highest salary from an employees table.",
      input: "employees table with columns: id, name, salary",
      output: "Second highest salary value or NULL if not exists",
      starter: `-- Write your SQL query here\nSELECT ??? AS second_highest_salary\nFROM employees;`
    }
  },

  // ═══════════════════════════════════════════════════════════════
  // MODULE 8: Operating Systems – Processes, Deadlocks, Scheduling
  // ═══════════════════════════════════════════════════════════════
  {
    moduleTitle: "Operating Systems – Processes, Deadlocks, Scheduling",
    roles: ["cse-data-engineer", "cse-devops", "cse-sde", "cse-backend", "cse-fullstack", "cse-frontend"],
    industryUseCase: "Zero-Downtime Multi-Region Kubernetes Deployment at Spotify",
    harvardOxfordRef: "Harvard CS109 Cloud Infrastructure & Site Reliability Engineering",
    level: "Level 4 – Systems",
    branch: ["cse", "it"],
    videos: makeVideoLinks("Operating Systems Process Scheduling Deadlock Memory Management"),
    studyMaterial: {
      summary: `An Operating System (OS) is system software that manages hardware resources and provides services for application software. It handles Process Management, Memory Management, File Systems, I/O Management, and Security.

A Process is a program in execution with its own address space, program counter, registers, and stack. A Thread is a lightweight sub-unit of a process sharing the same address space. Process states: New → Ready → Running → Waiting → Terminated.

CPU Scheduling determines which process runs on the CPU. Algorithms include:
• FCFS (First Come First Served): Non-preemptive, simple but suffers from convoy effect.
• SJF (Shortest Job First): Optimal average waiting time but requires knowing burst times.
• Round Robin: Preemptive with time quantum; good for time-sharing systems.
• Priority Scheduling: Each process gets a priority; can cause starvation (solved by aging).
• Multilevel Queue/Feedback Queue: Multiple queues with different scheduling policies.

Deadlock occurs when four conditions hold simultaneously: Mutual Exclusion, Hold and Wait, No Preemption, Circular Wait. Banker's Algorithm prevents deadlock by checking if a safe sequence exists before granting resource requests.

Memory Management includes Contiguous Allocation, Paging (fixed-size pages mapped to frames via Page Table), Segmentation (variable-size logical segments), and Virtual Memory (demand paging with page replacement algorithms: FIFO, LRU, Optimal).`,
      comparisonTable: {
        headers: ["Algorithm", "Type", "Advantage", "Disadvantage"],
        rows: [
          ["FCFS", "Non-preemptive", "Simple implementation", "Convoy effect, high avg wait"],
          ["SJF", "Non-preemptive", "Optimal avg waiting time", "Requires burst time prediction"],
          ["Round Robin", "Preemptive", "Fair, good response time", "High context switch overhead"],
          ["Priority", "Both", "Important tasks run first", "Starvation of low priority"],
          ["MLFQ", "Preemptive", "Adaptive, balances all needs", "Complex to configure"]
        ]
      },
      keyPoints: [
        "Process vs Thread: Process has separate memory space; threads share memory within a process.",
        "Deadlock requires ALL four conditions: Mutual Exclusion, Hold & Wait, No Preemption, Circular Wait.",
        "Banker's Algorithm checks for Safe State before allocating resources to prevent deadlock.",
        "Page Fault: When accessed page is not in RAM, OS loads it from disk (demand paging).",
        "Belady's Anomaly: FIFO page replacement can have MORE faults with MORE frames. LRU does not suffer from this."
      ],
      example: `• Round Robin Scheduling Simulation
def round_robin(processes, burst_times, quantum):
    n = len(processes)
    remaining = list(burst_times)
    waiting_time = [0] * n
    time = 0
    
    while any(r > 0 for r in remaining):
        for i in range(n):
            if remaining[i] > 0:
                execute = min(quantum, remaining[i])
                time += execute
                remaining[i] -= execute
                if remaining[i] == 0:
                    waiting_time[i] = time - burst_times[i]
    
    avg_wait = sum(waiting_time) / n
    return waiting_time, avg_wait

• Example: processes P1(10), P2(5), P3(8) with quantum=3
wt, avg = round_robin(['P1','P2','P3'], [10,5,8], 3)
print(f"Waiting times: {wt}, Average: {avg}")`,
      complexity: "Context Switch: ~1-10μs | Page Table Lookup: O(1) with TLB | Banker's Algorithm: O(n*m²)"
    },
    aiExplain: {
      steps: [
        "1. Process is created (New) and placed in Ready Queue.",
        "2. CPU Scheduler picks a process based on the scheduling algorithm.",
        "3. Process runs on CPU (Running state) until it completes, gets preempted, or waits for I/O.",
        "4. If process requests a resource held by another, potential Deadlock is checked.",
        "5. Virtual Memory maps logical addresses to physical frames using Page Table + TLB cache."
      ],
      analogy: "An OS is like a restaurant manager: scheduling CPU time is like assigning tables to waiting customers, deadlock is when two waiters each hold a dish the other needs, and virtual memory is like having a small dining room but a large parking lot — you bring in customers as tables free up!"
    },
    debug: [
      {
        title: "Fix Deadlock in Thread Synchronization",
        buggy: `• Thread 1: lock_A -> lock_B\n• Thread 2: lock_B -> lock_A  (DEADLOCK!)\nimport threading\nlock_a = threading.Lock()\nlock_b = threading.Lock()\ndef thread1():\n    lock_a.acquire()\n    lock_b.acquire()  • Waits for lock_b held by thread2\ndef thread2():\n    lock_b.acquire()\n    lock_a.acquire()  • Waits for lock_a held by thread1`,
        fixed: `• Fix: Always acquire locks in the SAME order\nimport threading\nlock_a = threading.Lock()\nlock_b = threading.Lock()\ndef thread1():\n    lock_a.acquire()\n    lock_b.acquire()\n    lock_b.release()\n    lock_a.release()\ndef thread2():\n    lock_a.acquire()  • Same order as thread1\n    lock_b.acquire()\n    lock_b.release()\n    lock_a.release()`,
        hint: "Deadlock prevention: enforce a global ordering on lock acquisition. All threads must acquire locks in the same order to break circular wait."
      }
    ],
    quiz: [
      { q: "Which scheduling algorithm is optimal for average waiting time?", options: ["FCFS", "SJF (Shortest Job First)", "Round Robin", "Priority"], answer: 1 },
      { q: "Which condition is NOT required for deadlock?", options: ["Mutual Exclusion", "Hold and Wait", "Preemption", "Circular Wait"], answer: 2 },
      { q: "What does TLB stand for in memory management?", options: ["Table Lookup Buffer", "Translation Lookaside Buffer", "Transfer Load Balance", "Thread Level Block"], answer: 1 },
      { q: "Belady's Anomaly occurs with which page replacement algorithm?", options: ["LRU", "Optimal", "FIFO", "LFU"], answer: 2 },
      { q: "What is a semaphore used for?", options: ["Memory allocation", "Process synchronization", "Disk scheduling", "Network routing"], answer: 1 }
    ],
    mnc: [
      { company: "Microsoft", year: "2023", question: "Explain the difference between process and thread", answer: "Process: independent execution unit with own memory space, heavier context switch. Thread: lightweight, shares process memory/resources, faster context switch. Threads within a process can communicate via shared memory." },
      { company: "Google", year: "2023", question: "How does virtual memory work?", answer: "OS uses page tables to map virtual addresses to physical frames. Pages not in RAM are stored on disk. On page fault, OS loads the page from disk, potentially evicting another page using LRU/FIFO replacement." },
      { company: "VMware", year: "2022", question: "Explain different types of process scheduling", answer: "Long-term (job scheduler, controls degree of multiprogramming), Short-term (CPU scheduler, picks next process from ready queue), Medium-term (swapper, moves processes between RAM and disk)." }
    ],
    mock: [
      { type: "Technical", question: "What happens when you type a URL in the browser from an OS perspective?", tip: "OS creates a process for the browser, allocates virtual memory, the process creates threads for rendering/networking, system calls are made for socket creation (network I/O), DNS resolution uses the OS resolver cache, and file I/O reads the disk cache for cached pages." }
    ],
    coding: {
      problem: "Implement LRU Page Replacement",
      desc: "Given a sequence of page references and number of frames, simulate LRU page replacement and count page faults.",
      input: "pages = [7, 0, 1, 2, 0, 3, 0, 4, 2, 3], frames = 3",
      output: "Page faults: 8",
      starter: `def lru_page_faults(pages, num_frames):\n    • Return total number of page faults\n    pass`
    }
  },

  // ═══════════════════════════════════════════════════════════════
  // MODULE 9: Computer Networks – OSI, TCP/IP, HTTP
  // ═══════════════════════════════════════════════════════════════
  {
    moduleTitle: "Computer Networks – OSI, TCP/IP, HTTP",
    roles: ["cse-data-engineer", "cse-devops", "cse-sde", "cse-backend", "cse-fullstack", "cse-frontend"],
    industryUseCase: "Zero-Downtime Multi-Region Kubernetes Deployment at Spotify",
    harvardOxfordRef: "Harvard CS109 Cloud Infrastructure & Site Reliability Engineering",
    level: "Level 3 – Networking",
    branch: ["cse", "it"],
    videos: makeVideoLinks("Computer Networks OSI Model TCP IP HTTP DNS"),
    studyMaterial: {
      summary: `Computer Networks enable communication between devices. The OSI (Open Systems Interconnection) model has 7 layers:
Layer 7 (Application): HTTP, FTP, SMTP, DNS — user-facing protocols.
Layer 6 (Presentation): Data formatting, encryption (SSL/TLS), compression.
Layer 5 (Session): Session management, authentication, checkpointing.
Layer 4 (Transport): TCP (reliable, connection-oriented) and UDP (fast, connectionless). Port numbers.
Layer 3 (Network): IP addressing, routing (RIP, OSPF, BGP). Subnetting, NAT.
Layer 2 (Data Link): MAC addressing, Ethernet, switches, ARP, error detection (CRC).
Layer 1 (Physical): Cables, signals, hubs, bit transmission.

TCP uses a 3-way handshake (SYN → SYN-ACK → ACK) for connection establishment and provides reliable delivery via sequence numbers, acknowledgments, retransmission, and flow control (sliding window). UDP provides no guarantees but has lower latency — ideal for video streaming, gaming, DNS queries.

HTTP (Hypertext Transfer Protocol) operates on port 80 (HTTPS on 443). Methods: GET (retrieve), POST (create), PUT (update), DELETE (remove). Status codes: 2xx (success), 3xx (redirect), 4xx (client error), 5xx (server error).

DNS (Domain Name System) resolves domain names to IP addresses through recursive queries: Browser cache → OS cache → Recursive resolver → Root server → TLD server → Authoritative server.`,
      comparisonTable: {
        headers: ["Feature", "TCP", "UDP"],
        rows: [
          ["Connection", "Connection-oriented (3-way handshake)", "Connectionless"],
          ["Reliability", "Guaranteed delivery, ordering, retransmission", "Best-effort, no guarantees"],
          ["Speed", "Slower due to overhead", "Faster, lower latency"],
          ["Use Cases", "HTTP, FTP, Email, SSH", "DNS, Video streaming, Gaming, VoIP"],
          ["Header Size", "20-60 bytes", "8 bytes"],
          ["Flow Control", "Sliding window", "None"]
        ]
      },
      keyPoints: [
        "OSI has 7 layers (Please Do Not Throw Sausage Pizza Away); TCP/IP has 4 layers (Network Access, Internet, Transport, Application).",
        "TCP 3-way handshake: SYN → SYN-ACK → ACK. Termination: FIN → ACK → FIN → ACK (4-way).",
        "Subnetting divides a network into smaller segments. CIDR notation: 192.168.1.0/24 means 256 addresses.",
        "ARP resolves IP addresses to MAC addresses within a local network.",
        "HTTPS = HTTP + TLS/SSL encryption. TLS handshake establishes symmetric session keys using asymmetric key exchange."
      ],
      example: `• Python: Simple TCP Server and Client
import socket

• SERVER
server = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
server.bind(('localhost', 8080))
server.listen(1)
conn, addr = server.accept()
data = conn.recv(1024)
conn.send(b"Hello from server!")
conn.close()

• CLIENT
client = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
client.connect(('localhost', 8080))
client.send(b"Hello from client!")
response = client.recv(1024)
print(response.decode())
client.close()`,
      complexity: "DNS Lookup: ~50-200ms | TCP Handshake: 1.5 RTT | HTTP Request: Variable"
    },
    aiExplain: {
      steps: [
        "1. Application layer generates an HTTP request (GET /index.html).",
        "2. Transport layer wraps it in a TCP segment with source/destination ports.",
        "3. Network layer adds IP header with source/destination IP addresses.",
        "4. Data Link layer adds MAC addresses and creates an Ethernet frame.",
        "5. Physical layer transmits bits over the wire/wireless medium to the next hop."
      ],
      analogy: "Sending data across a network is like mailing a package: the Application layer writes the letter (HTTP), Transport adds tracking and insurance (TCP), Network writes the city/zip code (IP), Data Link writes the street address (MAC), and Physical is the actual postal truck driving on roads!"
    },
    debug: [
      {
        title: "Fix TCP Socket Connection Refused Error",
        buggy: `• Client connects before server starts listening\nclient = socket.socket(socket.AF_INET, socket.SOCK_STREAM)\nclient.connect(('localhost', 9999))  • ConnectionRefusedError!\nclient.send(b"data")`,
        fixed: `• Ensure server is listening BEFORE client connects\n• Add retry logic with exponential backoff\nimport time\nclient = socket.socket(socket.AF_INET, socket.SOCK_STREAM)\nfor attempt in range(5):\n    try:\n        client.connect(('localhost', 9999))\n        break\n    except ConnectionRefusedError:\n        time.sleep(2 ** attempt)  • Exponential backoff`,
        hint: "Always ensure the server socket is bound and listening before clients attempt to connect. Implement retry with exponential backoff for resilience."
      }
    ],
    quiz: [
      { q: "How many layers does the OSI model have?", options: ["4", "5", "6", "7"], answer: 3 },
      { q: "Which protocol uses a 3-way handshake?", options: ["UDP", "TCP", "ICMP", "ARP"], answer: 1 },
      { q: "What port does HTTPS use by default?", options: ["80", "443", "8080", "3000"], answer: 1 },
      { q: "Which layer of the OSI model handles routing?", options: ["Transport", "Network", "Data Link", "Session"], answer: 1 },
      { q: "What does DNS resolve?", options: ["MAC to IP", "Domain name to IP", "IP to port", "URL to MAC"], answer: 1 }
    ],
    mnc: [
      { company: "Cisco", year: "2023", question: "Explain the difference between a router and a switch", answer: "Router operates at Layer 3 (Network), routes packets between different networks using IP addresses. Switch operates at Layer 2 (Data Link), forwards frames within the same network using MAC addresses." },
      { company: "Cloudflare", year: "2023", question: "How does a CDN improve web performance?", answer: "CDN caches content at edge servers geographically close to users, reducing latency. Uses DNS-based load balancing, anycast routing, and cache invalidation strategies." },
      { company: "Juniper", year: "2022", question: "Explain the TCP sliding window protocol", answer: "Sender can transmit multiple packets without waiting for individual ACKs. Window size controls flow. Receiver advertises available buffer space. Enables pipelining and congestion control." }
    ],
    mock: [
      { type: "Technical", question: "What happens step-by-step when you type google.com in the browser?", tip: "1. Browser checks cache for DNS record. 2. DNS query resolves google.com to IP. 3. TCP 3-way handshake with server. 4. TLS handshake (if HTTPS). 5. HTTP GET request sent. 6. Server responds with HTML. 7. Browser parses HTML, requests CSS/JS/images. 8. DOM is built and page renders." }
    ],
    coding: {
      problem: "Subnet Calculator",
      desc: "Given an IP address and CIDR prefix length, calculate the network address, broadcast address, and number of usable hosts.",
      input: "ip = '192.168.1.100', prefix = 24",
      output: "Network: 192.168.1.0, Broadcast: 192.168.1.255, Hosts: 254",
      starter: `def subnet_calc(ip, prefix):\n    • Return dict with network, broadcast, num_hosts\n    pass`
    }
  },

  // ═══════════════════════════════════════════════════════════════
  // MODULE 10: OOP Concepts – Inheritance, Polymorphism, SOLID
  // ═══════════════════════════════════════════════════════════════
  {
    moduleTitle: "OOP Concepts – Inheritance, Polymorphism, SOLID",
    roles: ["cse-data-engineer", "cse-devops", "cse-sde", "cse-backend", "cse-fullstack", "cse-frontend"],
    industryUseCase: "Zero-Downtime Multi-Region Kubernetes Deployment at Spotify",
    harvardOxfordRef: "Harvard CS109 Cloud Infrastructure & Site Reliability Engineering",
    level: "Level 3 – Software Engineering",
    branch: ["cse", "it"],
    videos: makeVideoLinks("OOP Inheritance Polymorphism SOLID Principles Design Patterns"),
    studyMaterial: {
      summary: `Object-Oriented Programming (OOP) models software as interacting objects that encapsulate data (attributes) and behavior (methods). The four pillars of OOP are:

1. Abstraction: Hiding complex implementation details, exposing only essential features. Example: a Car class exposes drive() and brake() but hides engine internals.

2. Encapsulation: Bundling data and methods together, controlling access via access modifiers (public, private, protected). Getters/setters provide controlled access to private fields.

3. Inheritance: A child class inherits properties and methods from a parent class, enabling code reuse. Types: Single, Multiple (via interfaces in Java/C• ), Multilevel, Hierarchical, Hybrid.

4. Polymorphism: Same interface, different implementations.
   - Compile-time (Static): Method overloading — same method name, different parameter types/counts.
   - Runtime (Dynamic): Method overriding — child class provides specific implementation of parent's method. Achieved via virtual functions and vtable in C++.

SOLID Principles for clean, maintainable OOP design:
S – Single Responsibility: A class should have only one reason to change.
O – Open/Closed: Open for extension, closed for modification.
L – Liskov Substitution: Subtypes must be substitutable for their base types.
I – Interface Segregation: Many specific interfaces are better than one general-purpose interface.
D – Dependency Inversion: Depend on abstractions, not concrete implementations.`,
      comparisonTable: {
        headers: ["Concept", "Compile-time", "Runtime"],
        rows: [
          ["Polymorphism", "Method Overloading", "Method Overriding"],
          ["Binding", "Early (static) binding", "Late (dynamic) binding"],
          ["Resolution", "Resolved by compiler", "Resolved at runtime via vtable"],
          ["Example", "add(int) vs add(float)", "Shape.area() → Circle.area()"]
        ]
      },
      keyPoints: [
        "Encapsulation: Private fields + public getters/setters. Protects invariants.",
        "Polymorphism: Method overloading (compile-time) vs overriding (runtime via virtual dispatch).",
        "SOLID: SRP (one reason to change), OCP (extend don't modify), LSP (subtypes replaceable), ISP (small interfaces), DIP (depend on abstractions).",
        "Design Patterns: Singleton (one instance), Factory (create without specifying class), Observer (pub-sub), Strategy (interchangeable algorithms).",
        "Composition over Inheritance: Prefer 'has-a' relationships over deep inheritance hierarchies to reduce coupling."
      ],
      example: `• Python: OOP with SOLID principles
from abc import ABC, abstractmethod

• Interface Segregation: Small, focused interfaces
class Drawable(ABC):
    @abstractmethod
    def draw(self): pass

class Resizable(ABC):
    @abstractmethod
    def resize(self, factor): pass

• Open/Closed: Extend via new classes, don't modify existing
class Shape(Drawable):
    @abstractmethod
    def area(self) -> float: pass

class Circle(Shape, Resizable):
    def __init__(self, radius):
        self._radius = radius  • Encapsulation
    
    def area(self) -> float:  • Runtime Polymorphism
        return 3.14159 * self._radius ** 2
    
    def draw(self):
        print(f"Drawing circle with radius {self._radius}")
    
    def resize(self, factor):
        self._radius *= factor

class Rectangle(Shape, Resizable):
    def __init__(self, width, height):
        self._width = width
        self._height = height
    
    def area(self) -> float:
        return self._width * self._height
    
    def draw(self):
        print(f"Drawing rectangle {self._width}x{self._height}")
    
    def resize(self, factor):
        self._width *= factor
        self._height *= factor

• Liskov Substitution: Any Shape works here
def print_area(shape: Shape):
    print(f"Area: {shape.area()}")

print_area(Circle(5))       • Area: 78.53975
print_area(Rectangle(4, 6)) • Area: 24`,
      complexity: "Virtual dispatch (vtable): O(1) | Interface lookup: O(1)"
    },
    aiExplain: {
      steps: [
        "1. Define abstract base classes (interfaces) that specify WHAT, not HOW.",
        "2. Encapsulate data with private fields and expose through public methods.",
        "3. Extend functionality through Inheritance without modifying existing classes.",
        "4. Override methods in child classes for runtime Polymorphism.",
        "5. Apply SOLID principles to keep code maintainable, testable, and loosely coupled."
      ],
      analogy: "OOP is like a vehicle factory: Abstraction is the blueprint showing only what matters. Encapsulation is the locked engine compartment (private parts). Inheritance is making a SportsCar from a Car template. Polymorphism is the 'start()' button working differently on electric vs diesel cars!"
    },
    debug: [
      {
        title: "Fix Liskov Substitution Principle Violation",
        buggy: `class Bird:\n    def fly(self):\n        return "Flying!"\n\nclass Penguin(Bird):  • LSP Violation!\n    def fly(self):\n        raise Exception("Penguins can't fly!")  • Breaks substitutability`,
        fixed: `from abc import ABC, abstractmethod\n\nclass Bird(ABC):\n    @abstractmethod\n    def move(self): pass\n\nclass FlyingBird(Bird):\n    def move(self):\n        return "Flying!"\n\nclass Penguin(Bird):  • LSP Compliant\n    def move(self):\n        return "Swimming!"`,
        hint: "If a subclass can't honor the parent's contract (Penguin can't fly), refactor the hierarchy. Use more specific base classes that correctly model the domain."
      }
    ],
    quiz: [
      { q: "Which OOP pillar hides internal implementation details?", options: ["Inheritance", "Polymorphism", "Abstraction", "Encapsulation"], answer: 2 },
      { q: "What does the 'L' in SOLID stand for?", options: ["Loose Coupling", "Liskov Substitution", "Lazy Loading", "Linear Dependency"], answer: 1 },
      { q: "Method overloading is an example of which type of polymorphism?", options: ["Runtime", "Compile-time", "Dynamic", "Virtual"], answer: 1 },
      { q: "Which design pattern ensures only one instance of a class exists?", options: ["Factory", "Observer", "Singleton", "Strategy"], answer: 2 },
      { q: "What is the principle 'Depend on abstractions, not concretions'?", options: ["SRP", "OCP", "ISP", "DIP"], answer: 3 }
    ],
    mnc: [
      { company: "Google", year: "2023", question: "Explain the difference between abstract class and interface", answer: "Abstract class can have implemented methods and state (fields); Interface (in Java/C• ) only declares method signatures (Java 8+ allows default methods). A class can implement multiple interfaces but extend only one abstract class." },
      { company: "Microsoft", year: "2023", question: "What is the Dependency Inversion Principle and why is it important?", answer: "High-level modules should not depend on low-level modules; both should depend on abstractions. This enables unit testing with mocks, loose coupling, and easy swapping of implementations." },
      { company: "Infosys", year: "2022", question: "Explain the Factory Design Pattern with a real-world example", answer: "Factory creates objects without exposing instantiation logic. Example: a NotificationFactory.create('email') returns EmailNotification, while create('sms') returns SMSNotification. Client code depends on the Notification interface, not concrete classes." }
    ],
    mock: [
      { type: "Technical", question: "When would you prefer composition over inheritance?", tip: "Prefer composition when: classes don't have a clear 'is-a' relationship, you need multiple behaviors (no multiple inheritance in Java), you want to change behavior at runtime, or the inheritance hierarchy would become too deep. Composition ('has-a') is more flexible and avoids fragile base class problem." }
    ],
    coding: {
      problem: "Implement Strategy Pattern",
      desc: "Create a payment system using the Strategy pattern where different payment methods (CreditCard, PayPal, UPI) implement the same PaymentStrategy interface.",
      input: "amount = 100, method = 'upi'",
      output: "Paid ₹100 via UPI",
      starter: `from abc import ABC, abstractmethod\n\nclass PaymentStrategy(ABC):\n    @abstractmethod\n    def pay(self, amount): pass\n\n• Implement CreditCard, PayPal, UPI strategies\n• Implement PaymentContext class`
    }
  }
,
  {
    moduleTitle: "Linked Lists & Reversal",
    roles: ["cse-data-engineer", "cse-devops", "cse-sde", "cse-backend", "cse-fullstack", "cse-frontend"],
    industryUseCase: "Zero-Downtime Multi-Region Kubernetes Deployment at Spotify",
    harvardOxfordRef: "Harvard CS109 Cloud Infrastructure & Site Reliability Engineering",
    level: "Level 1 – Foundations",
    branch: ["cse", "it"],
    videos: makeVideoLinks("Linked List Reversal"),
    studyMaterial: {
      summary: "A linked list is a dynamic data structure of nodes each containing data and a pointer to the next node. Reversal is a classic interview problem testing pointer manipulation skills.",
      deepDiveTextbook: `LINKED LISTS – POINTER MECHANICS\n\nA singly linked list node holds two fields: data and next pointer. Unlike arrays, memory is non-contiguous, making insertion/deletion O(1) at head but O(N) for random access.\n\nReversal Algorithm:\nMaintain three pointers – prev (None), curr (head), next_node.\nIn each iteration: store curr.next in next_node, point curr.next to prev, advance prev to curr, advance curr to next_node.\nAt termination curr is None and prev is the new head.\n\nTime: O(N), Space: O(1).\n\nDouble Linked List adds a prev pointer enabling O(1) bidirectional traversal, used in LRU Cache implementations.\n\nFloyd's Cycle Detection: Slow pointer advances 1 step, fast pointer 2 steps. If they meet, a cycle exists. Meeting point math: distance from head to cycle start equals distance from meeting point to cycle start.`,
      keyPoints: ["Reversal uses prev/curr/next three-pointer technique","Cycle detection uses slow/fast pointer (Floyd's algorithm)","Doubly linked list allows O(1) both-direction traversal","Random access is O(N) unlike array's O(1)"],
      example: `def reverse(head):\n    prev, curr = None, head\n    while curr:\n        nxt = curr.next\n        curr.next = prev\n        prev, curr = curr, nxt\n    return prev`,
      comparisonTable: { headers: ["Operation","Array","Singly LL","Doubly LL"], rows: [["Access","O(1)","O(N)","O(N)"],["Insert Head","O(N)","O(1)","O(1)"],["Delete Middle","O(N)","O(N)","O(N)"],["Reverse","O(N)","O(N)","O(N)"]] },
      flowchartSteps: ["Set prev=None, curr=head","Store curr.next in nxt","Set curr.next = prev","Advance prev = curr","Advance curr = nxt","Repeat until curr is None","Return prev as new head"],
      concept3DSimulation: { title: "Three-Pointer Reversal Visualization", description: "Watch prev/curr/next pointers shift as arrows flip direction node by node.", interactiveNodes: [{name:"Prev Pointer",type:"Trailing Anchor",details:"Holds newly reversed chain tail"},{name:"Curr Pointer",type:"Active Node",details:"Node currently being redirected"},{name:"Next Pointer",type:"Look-ahead",details:"Saves reference before link is broken"}] },
      complexity: "Time O(N) | Space O(1)"
    },
    aiExplain: { steps: ["Initialize prev=None","Loop: save next, flip pointer, advance both","Return prev"], analogy: "Like reversing a chain of paper clips — detach one at a time from front, attach to new chain" },
    debug: [{ title: "Missing next save", buggy: "curr.next = prev\nnxt = curr.next  • bug: already overwritten", fixed: "nxt = curr.next\ncurr.next = prev", hint: "Always save next BEFORE overwriting curr.next" }],
    quiz: [
      { q: "What is time complexity of linked list reversal?", options: ["O(1)","O(log N)","O(N)","O(N²)"], answer: 2 },
      { q: "Floyd's cycle detection uses:", options: ["Two stacks","Slow and fast pointers","Hash set","Recursion"], answer: 1 },
      { q: "Which structure uses linked lists internally for LRU Cache?", options: ["Array","Doubly Linked List + HashMap","Binary Tree","Stack"], answer: 1 },
      { q: "Random access complexity in linked list?", options: ["O(1)","O(log N)","O(N)","O(N²)"], answer: 2 }
    ],
    mnc: [
      { company: "Amazon", year: "2023", question: "Reverse a linked list in groups of K", answer: "Recursively reverse each group of K nodes, connect groups. Time O(N), Space O(N/K) recursion stack." },
      { company: "Microsoft", year: "2022", question: "Detect and remove cycle in linked list", answer: "Use Floyd's algorithm to detect. Then reset slow to head, advance both at same speed — they meet at cycle start. Set that node's next to None." }
    ],
    mock: [{ type: "Technical", question: "Design an LRU Cache using O(1) get and put.", tip: "Use HashMap for O(1) lookup + Doubly Linked List for O(1) insertion/deletion. Tail = most recent, head = least recent." }],
    coding: { problem: "Reverse Linked List", desc: "Reverse a singly linked list iteratively.", input: "1->2->3->4->5", output: "5->4->3->2->1", starter: "def reverse(head):\n    prev, curr = None, head\n    • complete the loop\n    return prev" }
  },
  {
    moduleTitle: "Stack & Monotonic Stack",
    roles: ["cse-data-engineer", "cse-devops", "cse-sde", "cse-backend", "cse-fullstack", "cse-frontend"],
    industryUseCase: "Zero-Downtime Multi-Region Kubernetes Deployment at Spotify",
    harvardOxfordRef: "Harvard CS109 Cloud Infrastructure & Site Reliability Engineering",
    level: "Level 2 – Intermediate",
    branch: ["cse", "it"],
    videos: makeVideoLinks("Monotonic Stack Pattern"),
    studyMaterial: {
      summary: "A stack is a LIFO data structure. Monotonic stacks maintain elements in sorted order and solve Next Greater/Smaller Element problems in O(N).",
      deepDiveTextbook: `MONOTONIC STACK – INTERVIEW WEAPON\n\nA stack supports push, pop, peek in O(1). It is implemented using arrays or linked lists.\n\nMonotonic Decreasing Stack: Pop elements smaller than current before pushing. Result: stack always has elements in decreasing order from bottom to top.\n\nNext Greater Element Pattern:\nFor each element, pop all stack elements smaller than it — those elements found their next greater.\nPush current index onto stack.\nRemaining elements in stack have no next greater (assign -1).\n\nApplications:\n- Stock Span Problem: Days since price was higher\n- Largest Rectangle in Histogram: Use stack to find left/right boundaries\n- Daily Temperatures: Days until warmer temperature\n- Trapping Rain Water: Use stack for boundary tracking\n\nTime: O(N) — each element pushed and popped at most once. Space: O(N) worst case.`,
      keyPoints: ["Monotonic stack finds next greater/smaller in O(N)","Each element is pushed/popped exactly once","Used for histogram, stock span, rain water problems","Decreasing stack for next greater; increasing for next smaller"],
      example: `def next_greater(nums):\n    result = [-1] * len(nums)\n    stack = []\n    for i, n in enumerate(nums):\n        while stack and nums[stack[-1]] < n:\n            result[stack.pop()] = n\n        stack.append(i)\n    return result`,
      comparisonTable: { headers: ["Problem","Approach","Time","Space"], rows: [["Next Greater Element","Monotonic Decreasing Stack","O(N)","O(N)"],["Largest Rectangle","Monotonic Increasing Stack","O(N)","O(N)"],["Brute Force NGE","Nested Loop","O(N²)","O(1)"],["Stock Span","Monotonic Stack","O(N)","O(N)"]] },
      flowchartSteps: ["Initialize empty stack, result=-1 array","For each index i","While stack not empty AND nums[stack.top] < nums[i]","Pop index j, set result[j] = nums[i]","Push i onto stack","After loop, remaining in stack have no NGE"],
      concept3DSimulation: { title: "Monotonic Stack NGE Pipeline", description: "Elements stream in; smaller elements are popped when a greater value arrives.", interactiveNodes: [{name:"Input Stream",type:"Array Iterator",details:"Feeds one element at a time"},{name:"Stack Gate",type:"Monotonic Filter",details:"Pops elements when a greater value arrives"},{name:"Result Array",type:"Output Buffer",details:"Records the next greater for each popped index"}] },
      complexity: "Time O(N) | Space O(N)"
    },
    aiExplain: { steps: ["Push indices onto stack","When current > stack top, pop and record answer","Continue until stack empty or current is smaller","Push current index"], analogy: "Like a queue of people waiting to be taller than the next person — shorter ones get eliminated when a taller person arrives" },
    debug: [{ title: "Wrong condition", buggy: "while stack and nums[stack[-1]] > n:  • decreasing instead of increasing", fixed: "while stack and nums[stack[-1]] < n:", hint: "For next GREATER element, pop when current is GREATER than top" }],
    quiz: [
      { q: "Monotonic stack solves Next Greater Element in:", options: ["O(N²)","O(N log N)","O(N)","O(log N)"], answer: 2 },
      { q: "Largest Rectangle in Histogram uses:", options: ["Queue","Monotonic Increasing Stack","Min-Heap","Segment Tree"], answer: 1 },
      { q: "Stack is which type of data structure?", options: ["FIFO","LILO","LIFO","Random Access"], answer: 2 },
      { q: "Stack push/pop time complexity:", options: ["O(N)","O(log N)","O(1)","O(N²)"], answer: 2 }
    ],
    mnc: [
      { company: "Google", year: "2023", question: "Find the largest rectangle in a histogram", answer: "Use monotonic increasing stack. For each bar, pop when current height < stack top, compute area using popped height and width = i - stack[-1] - 1." },
      { company: "Amazon", year: "2022", question: "Trapping Rain Water", answer: "Use two-pointer or stack approach. Stack stores indices; when taller bar found, pop and calculate trapped water between left boundary and current bar." }
    ],
    mock: [{ type: "Technical", question: "Design a stack with getMin() in O(1).", tip: "Use auxiliary min-stack. On push, also push to min-stack if value <= current min. On pop, if popped value == min-stack top, pop from min-stack too." }],
    coding: { problem: "Daily Temperatures", desc: "Given temperatures array, return days until warmer temperature for each day.", input: "[73,74,75,71,69,72,76,73]", output: "[1,1,4,2,1,1,0,0]", starter: "def dailyTemperatures(temps):\n    result = [0]*len(temps)\n    stack = []\n    • use monotonic decreasing stack" }
  },
  {
    moduleTitle: "Binary Trees – DFS & BFS",
    roles: ["cse-data-engineer", "cse-devops", "cse-sde", "cse-backend", "cse-fullstack", "cse-frontend"],
    industryUseCase: "Zero-Downtime Multi-Region Kubernetes Deployment at Spotify",
    harvardOxfordRef: "Harvard CS109 Cloud Infrastructure & Site Reliability Engineering",
    level: "Level 2 – Intermediate",
    branch: ["cse", "it"],
    videos: makeVideoLinks("Binary Tree DFS BFS traversal"),
    studyMaterial: {
      summary: "Binary trees have at most two children per node. DFS (Inorder/Preorder/Postorder) uses recursion or stack. BFS uses a queue for level-order traversal.",
      deepDiveTextbook: `BINARY TREE TRAVERSALS\n\nDFS Traversals:\n- Inorder (L, Root, R): Gives sorted output for BST. Used for BST validation.\n- Preorder (Root, L, R): Used for tree serialization/cloning.\n- Postorder (L, R, Root): Used for deletion and computing subtree properties.\n\nBFS (Level Order):\nUse a deque. Add root. While queue not empty: pop node, process, add left and right children.\nUsed for finding shortest path in unweighted trees, zigzag traversal, level averages.\n\nKey Tree Problems:\n- Maximum Depth: max(left, right) + 1\n- Diameter: Longest path = max left_height + right_height for each node\n- Path Sum: DFS with remaining target, return True when leaf node reached\n- Lowest Common Ancestor: If both targets in different subtrees, current node is LCA\n\nBST Property: left < root < right at every node. Inorder of BST = sorted array.`,
      keyPoints: ["Inorder of BST yields sorted sequence","BFS uses queue for level-order traversal","Diameter = max(left_height + right_height) at any node","LCA found when targets split across left and right subtrees"],
      example: `from collections import deque\ndef level_order(root):\n    if not root: return []\n    q, result = deque([root]), []\n    while q:\n        level = []\n        for _ in range(len(q)):\n            node = q.popleft()\n            level.append(node.val)\n            if node.left: q.append(node.left)\n            if node.right: q.append(node.right)\n        result.append(level)\n    return result`,
      comparisonTable: { headers: ["Traversal","Order","Use Case","Space"], rows: [["Inorder","L Root R","BST sorted output","O(H)"],["Preorder","Root L R","Serialization","O(H)"],["Postorder","L R Root","Deletion","O(H)"],["BFS","Level by Level","Shortest path","O(W)"]] },
      flowchartSteps: ["Check if root is None → return","Add root to queue","While queue not empty","Dequeue node, record value","Enqueue left and right children","Append level results"],
      concept3DSimulation: { title: "BFS Level Order Visualization", description: "Nodes glow level by level as queue processes each row.", interactiveNodes: [{name:"Queue Buffer",type:"FIFO Storage",details:"Holds nodes pending processing"},{name:"Level Counter",type:"Width Tracker",details:"Tracks nodes at current depth"},{name:"Result Builder",type:"Output Array",details:"Appends each level's values"}] },
      complexity: "Time O(N) | Space O(W) BFS, O(H) DFS"
    },
    aiExplain: { steps: ["For DFS: recurse left, process node, recurse right","For BFS: add root to queue, process level by level","Track depth with queue size at each level"], analogy: "DFS is like exploring a maze going as deep as possible; BFS is like expanding outward in ripples from a stone dropped in water" },
    debug: [{ title: "Missing base case", buggy: "def inorder(node):\n    inorder(node.left)  • crashes if node is None", fixed: "def inorder(node):\n    if not node: return\n    inorder(node.left)", hint: "Always check if node is None before recursing" }],
    quiz: [
      { q: "Inorder traversal of BST gives:", options: ["Random order","Reverse sorted","Sorted ascending","Level order"], answer: 2 },
      { q: "BFS uses which data structure?", options: ["Stack","Queue","Heap","Deque"], answer: 1 },
      { q: "Tree diameter is:", options: ["Height of tree","Max nodes at any level","Longest path between any two nodes","Root to leaf distance"], answer: 2 },
      { q: "Preorder traversal visits:", options: ["L Root R","Root L R","L R Root","R Root L"], answer: 1 }
    ],
    mnc: [
      { company: "Facebook/Meta", year: "2023", question: "Binary Tree Zigzag Level Order Traversal", answer: "BFS with a flag. Odd levels: left to right. Even levels: right to left (deque appendleft). Toggle flag each level." },
      { company: "Google", year: "2022", question: "Serialize and deserialize binary tree", answer: "Preorder DFS serialization with 'null' markers. Deserialization uses a queue of tokens, reconstructing left then right subtrees recursively." }
    ],
    mock: [{ type: "Technical", question: "Find the lowest common ancestor of two nodes in a BST.", tip: "In BST: if both nodes < root, LCA is in left. If both > root, LCA is in right. Else root is LCA. O(H) time." }],
    coding: { problem: "Maximum Depth of Binary Tree", desc: "Return the maximum depth (height) of a binary tree.", input: "root = [3,9,20,null,null,15,7]", output: "3", starter: "def maxDepth(root):\n    if not root: return 0\n    • return max of left and right depths + 1" }
  },
  {
    moduleTitle: "Binary Search – Templates & Variants",
    roles: ["cse-data-engineer", "cse-devops", "cse-sde", "cse-backend", "cse-fullstack", "cse-frontend"],
    industryUseCase: "Zero-Downtime Multi-Region Kubernetes Deployment at Spotify",
    harvardOxfordRef: "Harvard CS109 Cloud Infrastructure & Site Reliability Engineering",
    level: "Level 2 – Intermediate",
    branch: ["cse", "it"],
    videos: makeVideoLinks("Binary Search template variants"),
    studyMaterial: {
      summary: "Binary Search finds a target in a sorted array in O(log N) by repeatedly halving the search space. Variants apply to rotated arrays, answer-space problems, and 2D matrices.",
      deepDiveTextbook: `BINARY SEARCH MASTERY\n\nClassic Binary Search: left=0, right=n-1. mid = left + (right-left)//2. If arr[mid]==target return mid. If arr[mid]<target, left=mid+1. Else right=mid-1.\n\nWhy mid = left + (right-left)//2? Prevents integer overflow in languages like C++/Java where (left+right) can exceed INT_MAX.\n\nTemplate Variants:\n1. Find First/Last Occurrence: Don't return on match; shrink boundary and record answer.\n2. Rotated Sorted Array: Determine which half is sorted, check if target falls in it.\n3. Search in 2D Matrix: Treat matrix as flattened 1D array. mid_row = mid//cols, mid_col = mid%cols.\n4. Answer Space Binary Search: When answer is monotone (feasible/not), binary search on the answer value. E.g., Koko Eating Bananas, Minimum Days to Complete Jobs.\n\nKey insight: Any problem where you can define a monotone predicate can be solved with binary search.`,
      keyPoints: ["Use mid = left+(right-left)//2 to prevent overflow","Find first/last occurrence by continuing after match","Rotated array: check which half is sorted first","Answer-space BS: search on answer value when predicate is monotone"],
      example: `def binary_search(arr, target):\n    left, right = 0, len(arr)-1\n    while left <= right:\n        mid = left + (right-left)//2\n        if arr[mid] == target: return mid\n        elif arr[mid] < target: left = mid+1\n        else: right = mid-1\n    return -1`,
      comparisonTable: { headers: ["Variant","Condition","Time","Space"], rows: [["Classic Search","Sorted Array","O(log N)","O(1)"],["First Occurrence","Don't stop on match","O(log N)","O(1)"],["Rotated Array","Identify sorted half","O(log N)","O(1)"],["2D Matrix","Flatten to 1D index","O(log M*N)","O(1)"]] },
      flowchartSteps: ["Set left=0, right=n-1","Calculate mid = left+(right-left)//2","Compare arr[mid] with target","If equal: return mid","If target > arr[mid]: left=mid+1","If target < arr[mid]: right=mid-1","Return -1 if not found"],
      concept3DSimulation: { title: "Binary Search Space Halving", description: "Search space shrinks by half each step, shown as collapsing array segments.", interactiveNodes: [{name:"Left Pointer",type:"Lower Bound",details:"Advances when target is in upper half"},{name:"Right Pointer",type:"Upper Bound",details:"Retreats when target is in lower half"},{name:"Mid Calculator",type:"Pivot",details:"Computes safe midpoint to compare"}] },
      complexity: "Time O(log N) | Space O(1)"
    },
    aiExplain: { steps: ["Define search space with left/right","Compute mid","Compare and eliminate half","Repeat until found or space exhausted"], analogy: "Like guessing a number 1-100: always guess the middle, told higher/lower, halving possibilities each time" },
    debug: [{ title: "Infinite loop bug", buggy: "while left < right:\n    mid = (left+right)//2\n    if arr[mid] < target: left = mid  • never advances", fixed: "left = mid + 1", hint: "Always advance by mid+1 or mid-1 to avoid infinite loops" }],
    quiz: [
      { q: "Binary search time complexity:", options: ["O(N)","O(log N)","O(N log N)","O(1)"], answer: 1 },
      { q: "Safe midpoint formula is:", options: ["(left+right)/2","left+(right-left)/2","right-(right-left)/2","left*right/2"], answer: 1 },
      { q: "Binary search requires the array to be:", options: ["Sorted","Unique elements","Non-negative","Fixed size"], answer: 0 },
      { q: "Search in rotated sorted array time complexity:", options: ["O(N)","O(N²)","O(log N)","O(N log N)"], answer: 2 }
    ],
    mnc: [
      { company: "Google", year: "2023", question: "Find minimum in rotated sorted array", answer: "Binary search: if arr[mid] > arr[right], minimum is in right half. Else in left half including mid. Continue until left==right." },
      { company: "Amazon", year: "2022", question: "Koko Eating Bananas — find minimum eating speed", answer: "Binary search on speed from 1 to max(piles). For each speed, check if all bananas can be eaten in H hours. Return minimum valid speed." }
    ],
    mock: [{ type: "Technical", question: "How would you find the square root of N without using sqrt()?", tip: "Binary search on answer space 1..N. Find largest integer mid where mid*mid <= N. Use long to avoid overflow." }],
    coding: { problem: "Search in Rotated Sorted Array", desc: "Find target in a rotated sorted array with no duplicates.", input: "nums=[4,5,6,7,0,1,2], target=0", output: "4 (index)", starter: "def search(nums, target):\n    left, right = 0, len(nums)-1\n    while left <= right:\n        mid = (left+right)//2\n        • determine which half is sorted" }
  },
  {
    moduleTitle: "Dynamic Programming – Knapsack",
    roles: ["cse-data-engineer", "cse-devops", "cse-sde", "cse-backend", "cse-fullstack", "cse-frontend"],
    industryUseCase: "Zero-Downtime Multi-Region Kubernetes Deployment at Spotify",
    harvardOxfordRef: "Harvard CS109 Cloud Infrastructure & Site Reliability Engineering",
    level: "Level 3 – Advanced",
    branch: ["cse", "it"],
    videos: makeVideoLinks("0/1 Knapsack Dynamic Programming"),
    studyMaterial: {
      summary: "Dynamic Programming solves optimization problems by breaking them into overlapping subproblems and storing results. 0/1 Knapsack is the canonical DP problem for capacity-constrained selection.",
      deepDiveTextbook: `0/1 KNAPSACK – FOUNDATION OF DP\n\nProblem: N items each with weight w[i] and value v[i]. Knapsack capacity W. Maximize total value without exceeding W. Each item can be included (1) or excluded (0).\n\nRecurrence: dp[i][w] = max(dp[i-1][w], v[i] + dp[i-1][w-w[i]]) if w[i] <= w.\n\n2D Table: dp[i][w] = best value using first i items with capacity w.\nBase: dp[0][w] = 0 for all w.\n\nSpace Optimization: Use 1D array dp[w]. Iterate w from W down to w[i] to avoid using item twice.\n\nVariants:\n- Unbounded Knapsack: Each item usable unlimited times. Iterate w forward.\n- Subset Sum: Can we reach exactly sum S? dp[s] = True/False.\n- Partition Equal Subset: Special case of Subset Sum with target = totalSum/2.\n- Coin Change: Minimum coins for amount. dp[i] = min(dp[i], dp[i-coin]+1).\n\nTime: O(N*W), Space: O(W) with optimization.`,
      keyPoints: ["Recurrence: include item or exclude it","Space optimize with 1D array iterating W down to w[i]","Unbounded knapsack iterates W upward (reuse allowed)","Coin change is unbounded knapsack variant"],
      example: `def knapsack(weights, values, W):\n    n = len(weights)\n    dp = [0] * (W+1)\n    for i in range(n):\n        for w in range(W, weights[i]-1, -1):\n            dp[w] = max(dp[w], values[i] + dp[w-weights[i]])\n    return dp[W]`,
      comparisonTable: { headers: ["Variant","Reuse","Recurrence Direction","Use Case"], rows: [["0/1 Knapsack","No","W down to w[i]","Budget selection"],["Unbounded","Yes","W up from w[i]","Coin denomination"],["Subset Sum","No","W down","Partition check"],["Coin Change","Yes","W up","Min coins"]] },
      flowchartSteps: ["Initialize dp[0..W] = 0","For each item i","For w from W down to weight[i]","dp[w] = max(dp[w], value[i]+dp[w-weight[i]])","Repeat for all items","Return dp[W]"],
      concept3DSimulation: { title: "Knapsack DP Table Fill", description: "2D grid fills row by row, each cell choosing max of skip or include decisions.", interactiveNodes: [{name:"Item Iterator",type:"Row Scanner",details:"Processes each item in sequence"},{name:"Capacity Slider",type:"Column Walker",details:"Decrements from W to item weight"},{name:"Decision Node",type:"Max Selector",details:"Picks max(exclude, include) for each cell"}] },
      complexity: "Time O(N*W) | Space O(W)"
    },
    aiExplain: { steps: ["For each item decide: include or exclude","If included: add value, reduce remaining capacity","Take max of both choices","Store in dp table to avoid recomputation"], analogy: "Like packing a travel bag: for each item you decide take it or leave it, choosing what maximizes value within weight limit" },
    debug: [{ title: "Wrong iteration order", buggy: "for w in range(weights[i], W+1):  • allows reuse", fixed: "for w in range(W, weights[i]-1, -1):", hint: "0/1 knapsack requires reverse iteration to prevent reusing same item" }],
    quiz: [
      { q: "0/1 Knapsack time complexity:", options: ["O(N)","O(N²)","O(N*W)","O(2^N)"], answer: 2 },
      { q: "To prevent item reuse in 0/1 knapsack, iterate:", options: ["Forward","Backward","Randomly","Level order"], answer: 1 },
      { q: "Coin change is which knapsack variant?", options: ["0/1 Knapsack","Fractional","Unbounded","Multi-Knapsack"], answer: 2 },
      { q: "Subset Sum target for equal partition:", options: ["totalSum","totalSum/2","totalSum*2","totalSum-1"], answer: 1 }
    ],
    mnc: [
      { company: "Amazon", year: "2023", question: "Given items with weights and values, find max value in knapsack of capacity W", answer: "Use 1D DP array of size W+1. For each item iterate W down to item weight. dp[w] = max(dp[w], val+dp[w-wt]). Return dp[W]." },
      { company: "Goldman Sachs", year: "2022", question: "Can you partition array into two equal sum subsets?", answer: "If total sum is odd, return False. Target = sum/2. Use Subset Sum DP. dp[0]=True, for each num iterate target down to num, dp[j] |= dp[j-num]." }
    ],
    mock: [{ type: "Technical", question: "What is the difference between memoization and tabulation?", tip: "Memoization (top-down): recursive with cache, only computes needed states. Tabulation (bottom-up): iterative, fills entire table. Tabulation is usually faster due to no recursion overhead." }],
    coding: { problem: "Coin Change", desc: "Find minimum coins to make target amount. Coins can be reused.", input: "coins=[1,5,11], amount=15", output: "3 (five 5s → wrong; optimal: 11+1+1+1+1=5 coins? No: 5+5+5=3)", starter: "def coinChange(coins, amount):\n    dp = [float('inf')] * (amount+1)\n    dp[0] = 0\n    for coin in coins:\n        for i in range(coin, amount+1):\n            dp[i] = min(dp[i], dp[i-coin]+1)\n    return dp[amount] if dp[amount] != float('inf') else -1" }
  },
  {
    moduleTitle: "Graph BFS – Shortest Path",
    roles: ["cse-data-engineer", "cse-devops", "cse-sde", "cse-backend", "cse-fullstack", "cse-frontend"],
    industryUseCase: "Zero-Downtime Multi-Region Kubernetes Deployment at Spotify",
    harvardOxfordRef: "Harvard CS109 Cloud Infrastructure & Site Reliability Engineering",
    level: "Level 3 – Advanced",
    branch: ["cse", "it"],
    videos: makeVideoLinks("Graph BFS Shortest Path"),
    studyMaterial: {
      summary: "Graph BFS finds shortest paths in unweighted graphs. Starting from source, it explores all neighbors level by level, guaranteeing minimum hops to each reachable node.",
      deepDiveTextbook: `GRAPH BFS – SHORTEST PATH GUARANTEE\n\nGraph Representations:\n1. Adjacency List: dict of {node: [neighbors]}. Space O(V+E). Preferred for sparse graphs.\n2. Adjacency Matrix: V×V grid. Space O(V²). Fast edge lookup O(1).\n\nBFS Algorithm:\nUse queue and visited set. Enqueue source with distance 0. While queue not empty: dequeue node, for each neighbor if not visited enqueue with distance+1.\n\nGuarantee: BFS explores by levels. First time a node is reached is via shortest path because all paths of length d are explored before any path of length d+1.\n\nMulti-Source BFS: Start with multiple sources in queue simultaneously. Used for: 0-1 Matrix (distance to nearest 0), Rotting Oranges (minimum minutes for all oranges to rot).\n\nBFS on Grid: Treat each cell as a node, 4 or 8 neighbors. Track visited with a 2D array.\n\nBipartite Check: BFS coloring — alternate colors for each level. If same-color neighbors found, graph is not bipartite (has odd cycle).`,
      keyPoints: ["BFS guarantees shortest path in unweighted graphs","Use adjacency list for sparse, matrix for dense graphs","Multi-source BFS: add all sources to queue at start","Grid BFS: 4-directional movement with visited 2D array"],
      example: `from collections import deque\ndef bfs_shortest(graph, src, dst):\n    queue = deque([(src, 0)])\n    visited = {src}\n    while queue:\n        node, dist = queue.popleft()\n        if node == dst: return dist\n        for neighbor in graph[node]:\n            if neighbor not in visited:\n                visited.add(neighbor)\n                queue.append((neighbor, dist+1))\n    return -1`,
      comparisonTable: { headers: ["Algorithm","Graph Type","Time","Guarantee"], rows: [["BFS","Unweighted","O(V+E)","Shortest hops"],["Dijkstra","Weighted non-neg","O((V+E)logV)","Shortest weight"],["Bellman-Ford","Negative weights","O(V*E)","Shortest weight"],["DFS","Any","O(V+E)","No shortest guarantee"]] },
      flowchartSteps: ["Add source to queue with distance 0","Mark source as visited","While queue not empty","Dequeue node+distance","For each unvisited neighbor","Enqueue neighbor with distance+1","Return distance when destination reached"],
      concept3DSimulation: { title: "BFS Wave Expansion", description: "Queue processes nodes in expanding rings from source — each ring one hop farther.", interactiveNodes: [{name:"Queue Manager",type:"FIFO Buffer",details:"Processes nodes level by level"},{name:"Visited Tracker",type:"Set Structure",details:"Prevents revisiting processed nodes"},{name:"Distance Recorder",type:"Map Structure",details:"Records minimum hops to each node"}] },
      complexity: "Time O(V+E) | Space O(V)"
    },
    aiExplain: { steps: ["Add source to queue","Process each node's neighbors","Track visited to avoid cycles","First arrival = shortest path"], analogy: "Like ripples on water — spreading outward equally in all directions from where you drop a stone" },
    debug: [{ title: "Missing visited check", buggy: "for neighbor in graph[node]:\n    queue.append((neighbor, dist+1))  • infinite loop", fixed: "if neighbor not in visited:\n    visited.add(neighbor)\n    queue.append((neighbor, dist+1))", hint: "Without visited tracking, BFS revisits nodes infinitely in cyclic graphs" }],
    quiz: [
      { q: "BFS guarantees shortest path in:", options: ["Weighted graphs","Unweighted graphs","Negative weight graphs","Directed acyclic graphs"], answer: 1 },
      { q: "BFS time complexity:", options: ["O(V)","O(E)","O(V+E)","O(V²)"], answer: 2 },
      { q: "Multi-source BFS is used for:", options: ["Single shortest path","Minimum spanning tree","Distance to nearest source","Topological sort"], answer: 2 },
      { q: "Bipartite graph check uses:", options: ["DFS only","BFS coloring","Dijkstra","Union-Find"], answer: 1 }
    ],
    mnc: [
      { company: "Facebook/Meta", year: "2023", question: "Find shortest path between two users in a social network", answer: "Model as undirected graph. BFS from source user. First time destination user is dequeued, return distance. This is classic BFS 6-degrees-of-separation problem." },
      { company: "Uber", year: "2022", question: "Rotting Oranges — minimum time for all oranges to rot", answer: "Multi-source BFS starting from all rotten oranges simultaneously. Each minute = one BFS level. Count fresh oranges remaining after BFS completes." }
    ],
    mock: [{ type: "Technical", question: "When would you use Dijkstra over BFS?", tip: "Use BFS when all edge weights are equal (unweighted). Use Dijkstra when edges have different positive weights. Dijkstra uses priority queue for minimum distance selection." }],
    coding: { problem: "Word Ladder", desc: "Find shortest transformation sequence from beginWord to endWord changing one letter at a time.", input: "begin='hit', end='cog', wordList=['hot','dot','dog','lot','log','cog']", output: "5", starter: "from collections import deque\ndef ladderLength(begin, end, wordList):\n    word_set = set(wordList)\n    queue = deque([(begin, 1)])\n    • BFS: try changing each character a-z" }
  },
  {
    moduleTitle: "Dijkstra's Algorithm",
    roles: ["cse-data-engineer", "cse-devops", "cse-sde", "cse-backend", "cse-fullstack", "cse-frontend"],
    industryUseCase: "Zero-Downtime Multi-Region Kubernetes Deployment at Spotify",
    harvardOxfordRef: "Harvard CS109 Cloud Infrastructure & Site Reliability Engineering",
    level: "Level 3 – Advanced",
    branch: ["cse", "it"],
    videos: makeVideoLinks("Dijkstra Algorithm shortest path"),
    studyMaterial: {
      summary: "Dijkstra's algorithm finds shortest paths from a single source in weighted graphs with non-negative edges. It uses a min-heap priority queue to greedily select the closest unvisited node.",
      deepDiveTextbook: `DIJKSTRA'S ALGORITHM – WEIGHTED SHORTEST PATH\n\nAlgorithm Steps:\n1. Initialize dist[src]=0, dist[all others]=infinity.\n2. Use min-heap: push (0, src).\n3. Pop minimum distance node.\n4. For each neighbor: if dist[node]+edge_weight < dist[neighbor], update and push to heap.\n5. Continue until heap empty.\n\nGreedy Proof: Once a node is popped from the heap (finalized), its shortest distance is confirmed because all future paths through unprocessed nodes can only be longer (non-negative edges).\n\nTime Complexity: O((V+E) log V) with binary heap. O(V²) with simple array (better for dense graphs).\n\nLimitations:\n- Fails with negative edge weights (use Bellman-Ford instead).\n- Fails for negative cycles.\n\nVariant – Bidirectional Dijkstra: Run from source and destination simultaneously. Stops when searches meet. Used in Google Maps for faster routing.\n\nA* Algorithm: Dijkstra + heuristic (estimated distance to goal). More efficient for single target shortest path problems.`,
      keyPoints: ["Uses min-heap to greedily pick minimum distance node","Non-negative edges only — fails with negative weights","Time O((V+E)logV) with priority queue","A* extends Dijkstra with a heuristic for faster single-target search"],
      example: `import heapq\ndef dijkstra(graph, src):\n    dist = {node: float('inf') for node in graph}\n    dist[src] = 0\n    heap = [(0, src)]\n    while heap:\n        d, u = heapq.heappop(heap)\n        if d > dist[u]: continue\n        for v, w in graph[u]:\n            if dist[u]+w < dist[v]:\n                dist[v] = dist[u]+w\n                heapq.heappush(heap, (dist[v], v))\n    return dist`,
      comparisonTable: { headers: ["Algorithm","Negative Edges","Time","Use Case"], rows: [["Dijkstra","No","O((V+E)logV)","Maps, routing"],["Bellman-Ford","Yes","O(V*E)","Negative weights"],["Floyd-Warshall","Yes","O(V³)","All pairs shortest path"],["A*","No","O(E)","Game pathfinding"]] },
      flowchartSteps: ["Set dist[src]=0, others=infinity","Push (0,src) to min-heap","Pop minimum (dist, node)","Skip if dist > recorded","Relax neighbors if shorter path found","Push updated neighbors to heap","Repeat until heap empty"],
      concept3DSimulation: { title: "Dijkstra Greedy Expansion", description: "Priority queue drives expanding shortest-distance frontier outward from source.", interactiveNodes: [{name:"Min-Heap",type:"Priority Queue",details:"Always extracts globally minimum distance node"},{name:"Distance Table",type:"Array",details:"Stores best known distance to each node"},{name:"Relaxation Engine",type:"Edge Processor",details:"Updates neighbor distances when shorter path found"}] },
      complexity: "Time O((V+E)logV) | Space O(V)"
    },
    aiExplain: { steps: ["Start at source with distance 0","Always process the nearest unvisited node","Relax (update) all its neighbors","Repeat — nearest unvisited node is always correct"], analogy: "Like spreading water on a tilted surface — water always flows to the lowest point first, covering shortest paths naturally" },
    debug: [{ title: "Missing stale entry check", buggy: "d, u = heapq.heappop(heap)\nfor v, w in graph[u]:  • processes outdated entries", fixed: "d, u = heapq.heappop(heap)\nif d > dist[u]: continue  • skip stale", hint: "Heap may contain outdated entries. Always skip if popped distance > recorded shortest." }],
    quiz: [
      { q: "Dijkstra fails with:", options: ["Large graphs","Disconnected graphs","Negative edge weights","Directed graphs"], answer: 2 },
      { q: "Dijkstra time complexity with min-heap:", options: ["O(V²)","O(E log V)","O((V+E)log V)","O(V log E)"], answer: 2 },
      { q: "A* extends Dijkstra with:", options: ["Negative weight support","Heuristic function","Multiple sources","Bidirectional BFS"], answer: 1 },
      { q: "Dijkstra's data structure:", options: ["Queue","Stack","Priority Queue","Deque"], answer: 2 }
    ],
    mnc: [
      { company: "Google", year: "2023", question: "How does Google Maps find the fastest route?", answer: "A* algorithm (Dijkstra + heuristic). Edge weights are travel times. Heuristic is estimated time to destination (Euclidean distance / max speed). Bidirectional A* for long distances." },
      { company: "Microsoft", year: "2022", question: "Network Delay Time — find time for all nodes to receive signal", answer: "Dijkstra from source node. Return max(dist.values()). If any node unreachable (dist = infinity), return -1." }
    ],
    mock: [{ type: "Technical", question: "Explain when to use Bellman-Ford over Dijkstra.", tip: "Bellman-Ford handles negative edge weights and can detect negative cycles (if distance still decreases after V-1 iterations). Dijkstra is faster but only works for non-negative weights." }],
    coding: { problem: "Cheapest Flights Within K Stops", desc: "Find cheapest price from src to dst with at most k stops.", input: "n=3, flights=[[0,1,100],[1,2,100],[0,2,500]], src=0, dst=2, k=1", output: "200", starter: "import heapq\ndef findCheapestPrice(n, flights, src, dst, k):\n    graph = {i:[] for i in range(n)}\n    for u,v,w in flights:\n        graph[u].append((v,w))\n    • Dijkstra with stops constraint" }
  },
  {
    moduleTitle: "SQL – Joins & Query Optimization",
    roles: ["cse-data-engineer", "cse-devops", "cse-sde", "cse-backend", "cse-fullstack", "cse-frontend"],
    industryUseCase: "Zero-Downtime Multi-Region Kubernetes Deployment at Spotify",
    harvardOxfordRef: "Harvard CS109 Cloud Infrastructure & Site Reliability Engineering",
    level: "Level 2 – Intermediate",
    branch: ["cse", "it"],
    videos: makeVideoLinks("SQL Joins Query Optimization"),
    studyMaterial: {
      summary: "SQL joins combine rows from multiple tables based on related columns. Query optimization uses indexes, execution plans, and rewriting to minimize database engine work.",
      deepDiveTextbook: `SQL JOINS & OPTIMIZATION\n\nJoin Types:\n- INNER JOIN: Only matching rows in both tables.\n- LEFT JOIN: All rows from left + matching from right (NULL if no match).\n- RIGHT JOIN: All rows from right + matching from left.\n- FULL OUTER JOIN: All rows from both, NULL where no match.\n- CROSS JOIN: Cartesian product (all combinations).\n- SELF JOIN: Table joined with itself (manager-employee hierarchy).\n\nQuery Optimization Techniques:\n1. Use Indexes: B-tree indexes on WHERE, JOIN, ORDER BY columns. Avoid full table scans.\n2. Avoid SELECT *: Fetch only required columns to reduce I/O.\n3. Use EXPLAIN/EXPLAIN ANALYZE: View execution plan, identify sequential scans.\n4. Avoid functions on indexed columns in WHERE: WHERE YEAR(date)=2023 prevents index use. Use WHERE date BETWEEN '2023-01-01' AND '2023-12-31'.\n5. Use JOINs over subqueries: JOINs are generally faster than correlated subqueries.\n6. Indexing foreign keys: Always index FK columns used in JOIN conditions.\n\nNormalization: 1NF (atomic values), 2NF (no partial dependency), 3NF (no transitive dependency), BCNF (every determinant is a candidate key).`,
      keyPoints: ["INNER JOIN returns only matching rows","Use EXPLAIN to identify slow queries and missing indexes","Avoid WHERE on function-wrapped columns — breaks index usage","3NF removes transitive dependencies for data integrity"],
      example: `-- Find employees with their department name\nSELECT e.name, d.dept_name, e.salary\nFROM employees e\nINNER JOIN departments d ON e.dept_id = d.id\nWHERE e.salary > 50000\nORDER BY e.salary DESC;\n\n-- Index creation\nCREATE INDEX idx_salary ON employees(salary);\nCREATE INDEX idx_dept ON employees(dept_id);`,
      comparisonTable: { headers: ["Join Type","Returns","NULL Rows","Use Case"], rows: [["INNER JOIN","Matching only","No","Most common lookups"],["LEFT JOIN","All left + matches","Right side","Optional relationships"],["FULL OUTER JOIN","All rows both","Both sides","Data reconciliation"],["SELF JOIN","Same table","No","Hierarchy queries"]] },
      flowchartSteps: ["Identify tables to join","Define join condition (ON clause)","Select join type based on requirement","Add WHERE filters","Add ORDER BY if needed","Use EXPLAIN to check execution plan","Add missing indexes if sequential scan found"],
      concept3DSimulation: { title: "JOIN Operation Visual", description: "Two tables shown as overlapping sets — different join types highlight different regions.", interactiveNodes: [{name:"Left Table Scanner",type:"Row Iterator",details:"Scans all rows in left relation"},{name:"Hash Join Probe",type:"Match Engine",details:"Probes hash table built from right relation"},{name:"Result Projector",type:"Column Filter",details:"Projects only requested columns to output"}] },
      complexity: "JOIN Time O(M*N) naive, O(M+N) with hash join"
    },
    aiExplain: { steps: ["Write SELECT with needed columns","FROM left table","JOIN right table ON matching column","Filter with WHERE","Optimize with EXPLAIN and indexes"], analogy: "Like matching two Excel sheets by a common ID column — INNER JOIN keeps only rows that match in both sheets" },
    debug: [{ title: "Cartesian product bug", buggy: "SELECT * FROM orders, customers  -- missing JOIN condition", fixed: "SELECT * FROM orders o INNER JOIN customers c ON o.customer_id = c.id", hint: "Always specify ON condition in joins, or you get a cartesian product of all rows" }],
    quiz: [
      { q: "LEFT JOIN returns:", options: ["Only matching rows","All left rows + matches from right","All right rows + matches from left","All rows from both tables"], answer: 1 },
      { q: "EXPLAIN command shows:", options: ["Table schema","Query execution plan","Index definitions","Data statistics"], answer: 1 },
      { q: "Which avoids full table scan?", options: ["SELECT *","Functions on columns","Proper indexes","Subqueries"], answer: 2 },
      { q: "3NF removes:", options: ["Duplicate rows","Partial dependencies","Transitive dependencies","NULL values"], answer: 2 }
    ],
    mnc: [
      { company: "Microsoft", year: "2023", question: "Find the second highest salary from employee table", answer: "SELECT MAX(salary) FROM employees WHERE salary < (SELECT MAX(salary) FROM employees). Or use: SELECT salary FROM employees ORDER BY salary DESC LIMIT 1 OFFSET 1." },
      { company: "Oracle", year: "2022", question: "How would you optimize a slow JOIN query on 10M rows?", answer: "1) Add indexes on JOIN columns. 2) Use EXPLAIN to find full table scans. 3) Filter early with WHERE before JOIN. 4) Consider partitioning large table. 5) Use INNER JOIN instead of subquery." }
    ],
    mock: [{ type: "Technical", question: "Explain the difference between WHERE and HAVING clauses.", tip: "WHERE filters individual rows before aggregation. HAVING filters groups after GROUP BY. WHERE cannot use aggregate functions; HAVING can. Example: WHERE salary > 50000 vs HAVING AVG(salary) > 50000." }],
    coding: { problem: "Rank Scores", desc: "Write SQL to rank scores without gaps (DENSE_RANK). Highest score gets rank 1.", input: "Scores table: id, score", output: "score | rank", starter: "SELECT score,\n  DENSE_RANK() OVER (ORDER BY score DESC) as rank\nFROM Scores\nORDER BY score DESC;" }
  },
  {
    moduleTitle: "Operating Systems – Process Scheduling",
    roles: ["cse-data-engineer", "cse-devops", "cse-sde", "cse-backend", "cse-fullstack", "cse-frontend"],
    industryUseCase: "Zero-Downtime Multi-Region Kubernetes Deployment at Spotify",
    harvardOxfordRef: "Harvard CS109 Cloud Infrastructure & Site Reliability Engineering",
    level: "Level 2 – Intermediate",
    branch: ["cse", "it"],
    videos: makeVideoLinks("Process Scheduling OS algorithms"),
    studyMaterial: {
      summary: "CPU scheduling algorithms determine which process runs next. Key metrics: CPU utilization, throughput, turnaround time, waiting time, and response time. Understanding scheduling is critical for OS interviews.",
      deepDiveTextbook: `CPU SCHEDULING ALGORITHMS\n\nScheduling Criteria:\n- CPU Utilization: Keep CPU busy (maximize).\n- Throughput: Processes completed per unit time.\n- Turnaround Time: Total time from submission to completion.\n- Waiting Time: Time spent in ready queue.\n- Response Time: Time from submission to first response.\n\nAlgorithms:\n1. FCFS (First Come First Served): Simple, non-preemptive. Convoy effect — long process blocks all short ones.\n2. SJF (Shortest Job First): Optimal for minimum average waiting time. Requires knowing burst time in advance.\n3. SRTF (Shortest Remaining Time First): Preemptive SJF. Best average waiting time but starvation risk.\n4. Round Robin: Preemptive, time quantum Q. Good response time. Context switch overhead increases with small Q.\n5. Priority Scheduling: Each process has priority. Risk of starvation; solved by Aging (gradually increase priority over time).\n6. Multilevel Queue: Different queues for foreground/background with different algorithms.\n\nContext Switch: Saving and restoring process state (PCB). Pure overhead — no useful work done during switch.\n\nProcess vs Thread: Process has independent memory space. Threads share process memory, lighter to create/switch.`,
      keyPoints: ["SJF gives minimum average waiting time but needs burst time upfront","Round Robin ensures fairness with time quantum","Priority scheduling risks starvation — solved by aging","Context switch is overhead: saves/restores PCB"],
      example: `• Round Robin Simulation\ndef round_robin(processes, quantum):\n    queue = processes.copy()\n    time, waiting = 0, {p['name']:0 for p in processes}\n    remaining = {p['name']:p['burst'] for p in processes}\n    while queue:\n        p = queue.pop(0)\n        run = min(quantum, remaining[p['name']])\n        time += run\n        remaining[p['name']] -= run\n        if remaining[p['name']] > 0:\n            queue.append(p)  • back in queue\n    return time`,
      comparisonTable: { headers: ["Algorithm","Preemptive","Avg Wait","Starvation"], rows: [["FCFS","No","High (convoy)","No"],["SJF","No","Optimal","Yes"],["SRTF","Yes","Optimal","Yes"],["Round Robin","Yes","Medium","No"],["Priority","Both","Varies","Yes"]] },
      flowchartSteps: ["Process arrives → enters ready queue","Scheduler selects process based on algorithm","Dispatcher loads process (context switch)","Process runs until preemption, I/O wait, or completion","If preempted → back to ready queue","If I/O → moves to waiting queue","If complete → terminates"],
      concept3DSimulation: { title: "CPU Scheduler Gantt Chart", description: "Timeline shows which process runs each time unit with preemption events marked.", interactiveNodes: [{name:"Ready Queue",type:"Priority Queue",details:"Holds processes waiting for CPU"},{name:"CPU Core",type:"Execution Unit",details:"Runs one process at a time"},{name:"Context Switcher",type:"PCB Manager",details:"Saves/restores registers and memory maps"}] },
      complexity: "Context Switch: O(1) | Scheduling overhead depends on algorithm"
    },
    aiExplain: { steps: ["Processes compete for CPU in ready queue","Scheduler picks next process per algorithm","CPU runs it; preemption or I/O causes switch","Dispatcher handles actual context switch"], analogy: "Like a bank with multiple tellers — different scheduling = different customer queuing strategies (FIFO, priority, time slots)" },
    debug: [{ title: "Starvation in priority scheduling", buggy: "Always schedule highest priority — low priority processes never run", fixed: "Implement aging: increase priority of waiting processes every N seconds", hint: "Pure priority scheduling causes starvation. Aging prevents it by boosting long-waiting process priorities." }],
    quiz: [
      { q: "Which algorithm gives minimum average waiting time?", options: ["FCFS","Round Robin","SJF","Priority"], answer: 2 },
      { q: "Convoy effect occurs in:", options: ["SJF","FCFS","Round Robin","SRTF"], answer: 1 },
      { q: "Aging solves:", options: ["Deadlock","Starvation","Memory leak","Thrashing"], answer: 1 },
      { q: "Context switch is:", options: ["Useful computation","Pure overhead","I/O operation","Disk access"], answer: 1 }
    ],
    mnc: [
      { company: "Microsoft", year: "2023", question: "How does Windows handle CPU scheduling?", answer: "Windows uses Multilevel Feedback Queue with 32 priority levels. Real-time threads (16-31) are always preferred. Interactive threads get priority boosts after I/O. Background threads use lower priorities." },
      { company: "Infosys", year: "2022", question: "Calculate average waiting time for FCFS: P1(6ms), P2(4ms), P3(2ms)", answer: "P1 waits 0, P2 waits 6, P3 waits 10. Average = (0+6+10)/3 = 5.33ms. With SJF (P3,P2,P1): P3 waits 0, P2 waits 2, P1 waits 6. Average = 2.67ms." }
    ],
    mock: [{ type: "Technical", question: "What is the difference between a process and a thread?", tip: "Process: independent memory space, expensive creation, isolated crash. Thread: shared memory space, lightweight, faster context switch, crash can affect all threads. Use threads for I/O concurrency, processes for isolation." }],
    coding: { problem: "Task Scheduler", desc: "Given tasks with cooldown n between same tasks, find minimum intervals to finish all tasks.", input: "tasks=['A','A','A','B','B','B'], n=2", output: "8", starter: "from collections import Counter\nimport heapq\ndef leastInterval(tasks, n):\n    freq = Counter(tasks)\n    heap = [-f for f in freq.values()]\n    heapq.heapify(heap)\n    • simulate scheduling with cooldown" }
  },
  {
    moduleTitle: "Computer Networks – TCP/IP & HTTP",
    roles: ["cse-data-engineer", "cse-devops", "cse-sde", "cse-backend", "cse-fullstack", "cse-frontend"],
    industryUseCase: "Zero-Downtime Multi-Region Kubernetes Deployment at Spotify",
    harvardOxfordRef: "Harvard CS109 Cloud Infrastructure & Site Reliability Engineering",
    level: "Level 2 – Intermediate",
    branch: ["cse", "it"],
    videos: makeVideoLinks("TCP IP HTTP Computer Networks"),
    studyMaterial: {
      summary: "TCP/IP is the foundational protocol suite of the internet. TCP provides reliable, ordered delivery. HTTP/HTTPS operates on top of TCP for web communication. Understanding these is essential for backend and system design roles.",
      deepDiveTextbook: `TCP/IP & HTTP FUNDAMENTALS\n\nOSI vs TCP/IP Model:\nOSI: 7 layers (Physical, Data Link, Network, Transport, Session, Presentation, Application).\nTCP/IP: 4 layers (Network Access, Internet, Transport, Application).\n\nTCP (Transmission Control Protocol):\n- Connection-oriented: 3-way handshake (SYN → SYN-ACK → ACK).\n- Reliable: Acknowledgments + retransmission on timeout.\n- Ordered: Sequence numbers ensure in-order delivery.\n- Flow Control: Sliding window prevents receiver buffer overflow.\n- Congestion Control: Slow start, congestion avoidance (AIMD).\n\nUDP (User Datagram Protocol):\n- Connectionless, no reliability, lower latency.\n- Used for: DNS queries, video streaming, gaming, VoIP.\n\nHTTP/HTTPS:\n- HTTP is stateless. Each request is independent.\n- HTTP Methods: GET (retrieve), POST (create), PUT (replace), PATCH (partial update), DELETE.\n- Status Codes: 2xx (success), 3xx (redirect), 4xx (client error), 5xx (server error).\n- HTTPS adds TLS/SSL encryption: prevents eavesdropping and tampering.\n- HTTP/2: Multiplexing (multiple requests over single connection), header compression, server push.\n- HTTP/3: Uses QUIC (UDP-based), faster handshake, eliminates head-of-line blocking.`,
      keyPoints: ["TCP: reliable, ordered via 3-way handshake + ACKs","UDP: fast, unreliable — good for streaming/gaming","HTTP is stateless; HTTPS adds TLS encryption","HTTP/2 multiplexing eliminates one-request-per-connection bottleneck"],
      example: `• HTTP Request anatomy (Python requests library)\nimport requests\n\n• GET request\nresponse = requests.get('https://api.example.com/users', \n                        headers={'Authorization': 'Bearer token123'},\n                        params={'page': 1, 'limit': 10})\nprint(response.status_code)  • 200\nprint(response.json())       • parsed JSON body\n\n• POST request\nresponse = requests.post('https://api.example.com/users',\n                         json={'name': 'Alice', 'email': 'alice@example.com'})\nprint(response.status_code)  • 201 Created`,
      comparisonTable: { headers: ["Feature","TCP","UDP"], rows: [["Connection","Connection-oriented","Connectionless"],["Reliability","Guaranteed ACK","Best-effort"],["Order","In-order delivery","No ordering"],["Use Case","Web, email, file transfer","Video, DNS, gaming"],["Overhead","High (headers, ACK)","Low"]] },
      flowchartSteps: ["Client sends SYN (TCP handshake)","Server responds SYN-ACK","Client sends ACK — connection established","Client sends HTTP Request","Server processes and sends HTTP Response","Connection closed with FIN-ACK-FIN-ACK"],
      concept3DSimulation: { title: "TCP/HTTP Request Lifecycle", description: "3D pipeline shows SYN/ACK handshake, data segments flowing, and HTTP response returning.", interactiveNodes: [{name:"TCP Handshaker",type:"Connection Manager",details:"Establishes reliable channel via 3-way handshake"},{name:"HTTP Encoder",type:"Application Layer",details:"Formats request with method, headers, and body"},{name:"TLS Engine",type:"Encryption Layer",details:"Encrypts payload for HTTPS connections"}] },
      complexity: "TCP connection: O(1) packets | HTTP request: depends on payload size"
    },
    aiExplain: { steps: ["TCP establishes connection with 3-way handshake","HTTP request sent (GET/POST/etc)","Server processes and returns response","Connection closed or kept alive for reuse"], analogy: "TCP is like a phone call (establish connection first, then talk reliably). UDP is like sending postcards (just send, no confirmation of receipt)." },
    debug: [{ title: "CORS error on API call", buggy: "fetch('http://api.example.com/data')  // blocked by browser", fixed: "Server must include header: Access-Control-Allow-Origin: https://yoursite.com", hint: "CORS is enforced by browsers for cross-origin requests. Server must explicitly allow origins in response headers." }],
    quiz: [
      { q: "TCP 3-way handshake sequence:", options: ["SYN→ACK→SYN-ACK","SYN→SYN-ACK→ACK","ACK→SYN→SYN-ACK","SYN-ACK→SYN→ACK"], answer: 1 },
      { q: "HTTP status code for 'Not Found':", options: ["200","301","404","500"], answer: 2 },
      { q: "UDP is preferred for:", options: ["File downloads","Emails","Video streaming","Database queries"], answer: 2 },
      { q: "HTTPS provides:", options: ["Faster speeds","TLS encryption","No-handshake connection","UDP reliability"], answer: 1 }
    ],
    mnc: [
      { company: "Amazon", year: "2023", question: "What happens when you type google.com in a browser?", answer: "1)DNS lookup (browser cache→OS cache→DNS resolver→root/TLD/authoritative). 2)TCP handshake to IP:443. 3)TLS negotiation. 4)HTTP GET request. 5)Server returns HTML. 6)Browser parses, fetches CSS/JS/images, renders page." },
      { company: "Infosys", year: "2022", question: "Difference between HTTP/1.1 and HTTP/2?", answer: "HTTP/1.1: one request per connection, head-of-line blocking. HTTP/2: multiplexing (multiple parallel streams on one connection), binary framing, header compression (HPACK), server push. HTTP/2 significantly faster for modern web pages." }
    ],
    mock: [{ type: "Technical", question: "How does HTTPS protect against a man-in-the-middle attack?", tip: "TLS: server presents digital certificate (signed by trusted CA). Client verifies signature. Then Diffie-Hellman key exchange establishes encrypted session key. All data encrypted — MITM can't read or modify without detection." }],
    coding: { problem: "Implement a simple HTTP server", desc: "Create a basic HTTP server in Python responding to GET requests.", input: "GET / HTTP/1.1", output: "HTTP/1.1 200 OK\\nContent-Type: text/plain\\n\\nHello, World!", starter: "import socket\nserver = socket.socket(socket.AF_INET, socket.SOCK_STREAM)\nserver.bind(('localhost', 8080))\nserver.listen(5)\n• Accept connections and return HTTP response" }
  },
  {
    moduleTitle: "System Design – Scalable Architecture",
    roles: ["cse-data-engineer", "cse-devops", "cse-sde", "cse-backend", "cse-fullstack", "cse-frontend"],
    industryUseCase: "Zero-Downtime Multi-Region Kubernetes Deployment at Spotify",
    harvardOxfordRef: "Harvard CS109 Cloud Infrastructure & Site Reliability Engineering",
    level: "Level 3 – Advanced",
    branch: ["cse", "it"],
    videos: makeVideoLinks("System Design scalable architecture microservices"),
    studyMaterial: {
      summary: "System design interviews test ability to design large-scale distributed systems. Core concepts: load balancing, caching, database sharding, CAP theorem, and microservices architecture.",
      deepDiveTextbook: `SCALABLE SYSTEM DESIGN\n\nDesign Steps (RESHADED):\n1. Requirements: Functional (what it does) + Non-functional (scale, latency, availability).\n2. Estimation: DAU, QPS, storage needs.\n3. API Design: REST endpoints, request/response schema.\n4. Data Model: SQL vs NoSQL choice.\n5. High-Level Design: Major components (Load Balancer, API Gateway, Services, DB, Cache).\n6. Deep Dive: Specific bottleneck components.\n\nKey Components:\n- Load Balancer: Distributes traffic across servers. Round-robin, least connections, or IP-hash strategies.\n- CDN: Serves static assets from edge locations close to users. Reduces latency globally.\n- Cache (Redis): Store hot data in memory. LRU eviction. Cache-aside pattern.\n- Database Sharding: Horizontal partitioning by user_id % N. Avoids single DB bottleneck.\n- Message Queue (Kafka/RabbitMQ): Async communication between services. Decouples producers and consumers.\n\nCAP Theorem: A distributed system can guarantee only 2 of 3: Consistency, Availability, Partition Tolerance.\n\nMicroservices vs Monolith: Monolith easier to develop/debug. Microservices enable independent scaling, deployment, and tech stack per service.`,
      keyPoints: ["Load balancer + CDN handle traffic distribution","Redis caching reduces DB load by 10-100x","CAP theorem: choose CP or AP during network partition","Message queues decouple services and handle traffic spikes"],
      example: `• System Design: URL Shortener\n• Components:\n• 1. API: POST /shorten → returns short_code\n• 2. DB: urls table (short_code, long_url, clicks, created_at)\n• 3. Cache: Redis short_code → long_url (TTL 24h)\n• 4. Algorithm: base62 encoding of auto-increment ID\n\nimport string, random\nBASE62 = string.ascii_letters + string.digits\n\ndef encode(num):\n    chars = []\n    while num > 0:\n        chars.append(BASE62[num % 62])\n        num //= 62\n    return ''.join(reversed(chars)) or '0'`,
      comparisonTable: { headers: ["Concern","Solution","Trade-off"], rows: [["High traffic","Load Balancer + Horizontal Scaling","Added complexity"],["Slow DB reads","Redis Cache","Cache invalidation problem"],["Large data","DB Sharding","Cross-shard queries harder"],["Service coupling","Message Queue","Eventual consistency"],["Global latency","CDN","Stale content risk"]] },
      flowchartSteps: ["Clarify functional + non-functional requirements","Estimate QPS, storage, bandwidth","Design API endpoints","Choose SQL or NoSQL","Draw high-level architecture","Identify bottlenecks","Deep dive into critical components"],
      concept3DSimulation: { title: "Distributed System Architecture", description: "3D cluster shows client → CDN → Load Balancer → API Servers → Cache → DB tiers.", interactiveNodes: [{name:"Load Balancer",type:"Traffic Distributor",details:"Routes requests using round-robin or least-connections"},{name:"Cache Layer",type:"Redis Cluster",details:"Returns hot data in <1ms, bypassing database"},{name:"Message Queue",type:"Kafka Broker",details:"Buffers async events between producer and consumer services"}] },
      complexity: "Horizontal scaling: O(1) per node | Cache hit: O(1) | Shard lookup: O(1)"
    },
    aiExplain: { steps: ["Gather requirements and estimate scale","Design API and data model","Add caching layer for hot data","Use load balancer + horizontal scaling","Async queues for non-critical operations"], analogy: "Like designing a highway system for a city — you need multiple lanes (horizontal scaling), toll booths (load balancers), and rest stops (caches) to handle peak traffic" },
    debug: [{ title: "Cache thundering herd", buggy: "Cache expires simultaneously for 10000 users → DB overwhelmed", fixed: "Add jitter: TTL = base_ttl + random(0, base_ttl*0.1). Or use cache warming before expiry.", hint: "Staggered TTLs prevent synchronized cache expiry causing database avalanche" }],
    quiz: [
      { q: "CAP theorem states a distributed system can guarantee:", options: ["All three C,A,P","Only 2 of 3","Only Consistency","Only Availability"], answer: 1 },
      { q: "Redis is primarily used for:", options: ["Persistent storage","In-memory caching","Message queuing","Load balancing"], answer: 1 },
      { q: "Database sharding is:", options: ["Vertical scaling","Horizontal partitioning","Replication","Indexing"], answer: 1 },
      { q: "CDN reduces:", options: ["Database load","Latency for global users","Code complexity","Server count"], answer: 1 }
    ],
    mnc: [
      { company: "Google", year: "2023", question: "Design YouTube — handle 500 hours of video uploaded per minute", answer: "Upload service → Message queue → Video processing workers (transcoding to multiple resolutions) → Blob storage (GCS). CDN serves videos. Metadata in distributed DB. Recommendation engine reads from event stream. Read-heavy: cache popular videos at edge." },
      { company: "Amazon", year: "2022", question: "Design Amazon's shopping cart service", answer: "High availability (AP system). Use DynamoDB (key-value: userId→cartItems). Local session cache. Async sync to DB every N seconds. Handle concurrent updates with conditional writes. Cart abandoned → event queue → recommendation engine." }
    ],
    mock: [{ type: "System Design", question: "Design a rate limiter for an API that allows 100 requests per user per minute.", tip: "Algorithms: Token Bucket (smooth bursts), Fixed Window (simple but boundary spike), Sliding Window Log (accurate but memory heavy), Sliding Window Counter (efficient). Redis INCR + TTL for distributed rate limiting. Return 429 Too Many Requests when limit exceeded." }],
    coding: { problem: "LRU Cache", desc: "Implement an LRU cache with O(1) get and put operations.", input: "capacity=2, operations: put(1,1),put(2,2),get(1),put(3,3),get(2)", output: "get(1)=1, get(2)=-1 (evicted)", starter: "from collections import OrderedDict\nclass LRUCache:\n    def __init__(self, capacity):\n        self.cap = capacity\n        self.cache = OrderedDict()\n    def get(self, key):\n        if key not in self.cache: return -1\n        self.cache.move_to_end(key)\n        return self.cache[key]\n    def put(self, key, value):\n        if key in self.cache: self.cache.move_to_end(key)\n        self.cache[key] = value\n        if len(self.cache) > self.cap:\n            self.cache.popitem(last=False)" }
  }
];
