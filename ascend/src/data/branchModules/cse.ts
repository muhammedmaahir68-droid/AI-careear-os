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
  }
];
