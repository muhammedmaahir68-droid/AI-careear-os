import type { BranchModuleData } from "./types";
import { makeVideoLinks } from "./types";

export const CSE_IT_MODULES: BranchModuleData[] = [
  {
    moduleTitle: "Arrays & Two Sum Pattern",
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
    seen = {} # Value -> Index mapping
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
        buggy: `def two_sum(nums, target):\n    seen = {}\n    for i, num in enumerate(nums):\n        if target - num in seen:\n            return [seen[num], i] # Bug: storing num instead of complement index\n        seen[num] = i`,
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
      starter: `def two_sum(nums, target):\n    seen = {}\n    for i, num in enumerate(nums):\n        # Fill complement logic here\n        pass\n    return []`
    }
  },
  {
    moduleTitle: "Linked Lists & Cycle Detection",
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
        buggy: `def has_cycle(head):\n    slow = head\n    fast = head\n    while fast.next: # Bug: fast itself could be None\n        slow = slow.next\n        fast = fast.next.next\n        if slow == fast: return True\n    return False`,
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
      starter: `def has_cycle(head):\n    # Return True if cycle exists, else False\n    pass`
    }
  },
  {
    moduleTitle: "Binary Trees & BST Traversals",
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
        buggy: `def inorder(root):\n    # Missing base case if root is None!\n    return inorder(root.left) + [root.val] + inorder(root.right)`,
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
      { company: "Microsoft", year: "2022", question: "Serialize and Deserialize Binary Tree", answer: "Use Preorder traversal with marker '#' for null pointers." }
    ],
    mock: [
      { type: "Technical", question: "Explain AVL Tree rotations during insertion.", tip: "Left-Left (Single Right), Right-Right (Single Left), Left-Right (Double), Right-Left (Double) rotations balance height." }
    ],
    coding: {
      problem: "Inorder BST Traversal",
      desc: "Return inorder traversal array for a given binary tree root.",
      input: "root = [1, null, 2, 3]",
      output: "[1, 3, 2]",
      starter: `def inorderTraversal(root):\n    # Return list of values in inorder\n    pass`
    }
  },
  {
    moduleTitle: "Graphs – BFS, DFS & Shortest Path",
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
        buggy: `while pq:\n    d, u = heapq.heappop(pq)\n    # Missing check: if d > dist[u]: continue\n    for v, w in graph[u]:...`,
        fixed: `while pq:\n    d, u = heapq.heappop(pq)\n    if d > dist[u]: continue # Skip stale entries\n    for v, w in graph[u]:...`,
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
      starter: `def shortest_path(graph, start):\n    # Return dictionary of shortest distance from start\n    pass`
    }
  },
  {
    moduleTitle: "Dynamic Programming – Memoization & Tabulation",
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
        buggy: `for w in range(wt, W + 1): # Bug: forward loop allows SAME item to be picked multiple times! (Unbounded knapsack)`,
        fixed: `for w in range(W, wt - 1, -1): # Fixed: reverse loop ensures each item used AT MOST ONCE`,
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
      starter: `def solve_knapsack(weights, values, W):\n    # Return maximum achievable value\n    pass`
    }
  },
  {
    moduleTitle: "System Design – Load Balancing, Caching & Scaling",
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
      example: `# Consistent Hashing Ring Node Selector
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
        buggy: `# Bug: Unprotected cache lookup causes 1000 DB queries simultaneously on cache expiration\nval = redis.get(key)\nif not val:\n    val = db.query(key)\n    redis.set(key, val)`,
        fixed: `# Fixed: Use Distributed Lock (Redlock) or Mutex so only ONE thread queries DB on cache miss\nval = redis.get(key)\nif not val:\n    if acquire_lock(key):\n        val = db.query(key)\n        redis.set(key, val)\n        release_lock(key)\n    else:\n        sleep_and_retry()`,
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
      starter: `def lookup_node(nodes, key):\n    # Return server name assigned to key\n    pass`
    }
  },

  // ═══════════════════════════════════════════════════════════════
  // MODULE 7: DBMS & SQL – Joins, Normalization, ACID
  // ═══════════════════════════════════════════════════════════════
  {
    moduleTitle: "DBMS & SQL – Joins, Normalization, ACID",
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
      example: `# Round Robin Scheduling Simulation
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

# Example: processes P1(10), P2(5), P3(8) with quantum=3
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
        buggy: `# Thread 1: lock_A -> lock_B\n# Thread 2: lock_B -> lock_A  (DEADLOCK!)\nimport threading\nlock_a = threading.Lock()\nlock_b = threading.Lock()\ndef thread1():\n    lock_a.acquire()\n    lock_b.acquire()  # Waits for lock_b held by thread2\ndef thread2():\n    lock_b.acquire()\n    lock_a.acquire()  # Waits for lock_a held by thread1`,
        fixed: `# Fix: Always acquire locks in the SAME order\nimport threading\nlock_a = threading.Lock()\nlock_b = threading.Lock()\ndef thread1():\n    lock_a.acquire()\n    lock_b.acquire()\n    lock_b.release()\n    lock_a.release()\ndef thread2():\n    lock_a.acquire()  # Same order as thread1\n    lock_b.acquire()\n    lock_b.release()\n    lock_a.release()`,
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
      starter: `def lru_page_faults(pages, num_frames):\n    # Return total number of page faults\n    pass`
    }
  },

  // ═══════════════════════════════════════════════════════════════
  // MODULE 9: Computer Networks – OSI, TCP/IP, HTTP
  // ═══════════════════════════════════════════════════════════════
  {
    moduleTitle: "Computer Networks – OSI, TCP/IP, HTTP",
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
      example: `# Python: Simple TCP Server and Client
import socket

# SERVER
server = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
server.bind(('localhost', 8080))
server.listen(1)
conn, addr = server.accept()
data = conn.recv(1024)
conn.send(b"Hello from server!")
conn.close()

# CLIENT
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
        buggy: `# Client connects before server starts listening\nclient = socket.socket(socket.AF_INET, socket.SOCK_STREAM)\nclient.connect(('localhost', 9999))  # ConnectionRefusedError!\nclient.send(b"data")`,
        fixed: `# Ensure server is listening BEFORE client connects\n# Add retry logic with exponential backoff\nimport time\nclient = socket.socket(socket.AF_INET, socket.SOCK_STREAM)\nfor attempt in range(5):\n    try:\n        client.connect(('localhost', 9999))\n        break\n    except ConnectionRefusedError:\n        time.sleep(2 ** attempt)  # Exponential backoff`,
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
      starter: `def subnet_calc(ip, prefix):\n    # Return dict with network, broadcast, num_hosts\n    pass`
    }
  },

  // ═══════════════════════════════════════════════════════════════
  // MODULE 10: OOP Concepts – Inheritance, Polymorphism, SOLID
  // ═══════════════════════════════════════════════════════════════
  {
    moduleTitle: "OOP Concepts – Inheritance, Polymorphism, SOLID",
    level: "Level 3 – Software Engineering",
    branch: ["cse", "it"],
    videos: makeVideoLinks("OOP Inheritance Polymorphism SOLID Principles Design Patterns"),
    studyMaterial: {
      summary: `Object-Oriented Programming (OOP) models software as interacting objects that encapsulate data (attributes) and behavior (methods). The four pillars of OOP are:

1. Abstraction: Hiding complex implementation details, exposing only essential features. Example: a Car class exposes drive() and brake() but hides engine internals.

2. Encapsulation: Bundling data and methods together, controlling access via access modifiers (public, private, protected). Getters/setters provide controlled access to private fields.

3. Inheritance: A child class inherits properties and methods from a parent class, enabling code reuse. Types: Single, Multiple (via interfaces in Java/C#), Multilevel, Hierarchical, Hybrid.

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
      example: `# Python: OOP with SOLID principles
from abc import ABC, abstractmethod

# Interface Segregation: Small, focused interfaces
class Drawable(ABC):
    @abstractmethod
    def draw(self): pass

class Resizable(ABC):
    @abstractmethod
    def resize(self, factor): pass

# Open/Closed: Extend via new classes, don't modify existing
class Shape(Drawable):
    @abstractmethod
    def area(self) -> float: pass

class Circle(Shape, Resizable):
    def __init__(self, radius):
        self._radius = radius  # Encapsulation
    
    def area(self) -> float:  # Runtime Polymorphism
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

# Liskov Substitution: Any Shape works here
def print_area(shape: Shape):
    print(f"Area: {shape.area()}")

print_area(Circle(5))       # Area: 78.53975
print_area(Rectangle(4, 6)) # Area: 24`,
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
        buggy: `class Bird:\n    def fly(self):\n        return "Flying!"\n\nclass Penguin(Bird):  # LSP Violation!\n    def fly(self):\n        raise Exception("Penguins can't fly!")  # Breaks substitutability`,
        fixed: `from abc import ABC, abstractmethod\n\nclass Bird(ABC):\n    @abstractmethod\n    def move(self): pass\n\nclass FlyingBird(Bird):\n    def move(self):\n        return "Flying!"\n\nclass Penguin(Bird):  # LSP Compliant\n    def move(self):\n        return "Swimming!"`,
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
      { company: "Google", year: "2023", question: "Explain the difference between abstract class and interface", answer: "Abstract class can have implemented methods and state (fields); Interface (in Java/C#) only declares method signatures (Java 8+ allows default methods). A class can implement multiple interfaces but extend only one abstract class." },
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
      starter: `from abc import ABC, abstractmethod\n\nclass PaymentStrategy(ABC):\n    @abstractmethod\n    def pay(self, amount): pass\n\n# Implement CreditCard, PayPal, UPI strategies\n# Implement PaymentContext class`
    }
  }
];
