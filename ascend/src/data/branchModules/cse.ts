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
    moduleTitle: "DBMS & SQL Query Mastery",
    level: "Level 3 – Core CS",
    branch: ["cse", "it"],
    videos: makeVideoLinks("DBMS SQL Joins Normalization ACID Properties"),
    studyMaterial: {
      summary: `DBMS manages structured relational data using SQL.
ACID Properties:
- Atomicity: All or nothing transaction execution.
- Consistency: Valid state before and after transaction.
- Isolation: Concurrent transactions do not interfere.
- Durability: Committed data survives system crashes.
Joins: INNER JOIN, LEFT JOIN, RIGHT JOIN, FULL OUTER JOIN.`,
      keyPoints: [
        "HAVING clause filters aggregated groups; WHERE filters raw rows before aggregation.",
        "Primary Key uniquely identifies rows; Foreign Key enforces Referential Integrity.",
        "Normalization (1NF, 2NF, 3NF, BCNF) eliminates redundant data anomalies.",
        "Indexing uses B-Trees to speed up SELECT queries from O(n) to O(log n)."
      ],
      example: `-- Find top 3 departments with highest average salary
SELECT dept_name, AVG(salary) as avg_sal
FROM employees
GROUP BY dept_name
HAVING AVG(salary) > 50000
ORDER BY avg_sal DESC
LIMIT 3;`,
      complexity: "Index lookup: O(log n) | Full Table Scan: O(n)"
    },
    aiExplain: {
      steps: [
        "1. FROM clause identifies target table(s).",
        "2. WHERE filters individual rows.",
        "3. GROUP BY aggregates rows into summary groups.",
        "4. HAVING filters aggregated group results.",
        "5. SELECT projects output columns.",
        "6. ORDER BY and LIMIT sort and slice final output."
      ],
      analogy: "WHERE is like sorting applicants at the door before entering an event; HAVING is evaluating group test averages after teams have formed inside."
    },
    debug: [
      {
        title: "Fix SQL Aggregate Filter Syntax",
        buggy: `SELECT dept_id, COUNT(*) FROM employees WHERE COUNT(*) > 5 GROUP BY dept_id;`,
        fixed: `SELECT dept_id, COUNT(*) FROM employees GROUP BY dept_id HAVING COUNT(*) > 5;`,
        hint: "Aggregate function filters like COUNT(*) > 5 belong in HAVING clause, not WHERE."
      }
    ],
    quiz: [
      { q: "Which SQL clause filters grouped results after GROUP BY?", options: ["WHERE", "HAVING", "FILTER", "ORDER BY"], answer: 1 },
      { q: "What does 'Atomicity' in ACID guarantee?", options: ["All or nothing execution", "Consistent backups", "Encrypted storage", "Fast queries"], answer: 0 },
      { q: "Which join returns all rows from left table and matching rows from right?", options: ["INNER JOIN", "LEFT JOIN", "RIGHT JOIN", "CROSS JOIN"], answer: 1 },
      { q: "What data structure is standard for SQL indexes?", options: ["B-Tree", "Linked List", "Stack", "Binary Heap"], answer: 0 },
      { q: "Which normal form removes transitive dependencies?", options: ["1NF", "2NF", "3NF", "BCNF"], answer: 2 }
    ],
    mnc: [
      { company: "Oracle", year: "2023", question: "Find Nth highest salary in SQL", answer: "SELECT DISTINCT salary FROM emp ORDER BY salary DESC LIMIT 1 OFFSET N-1;" },
      { company: "Infosys", year: "2022", question: "Difference between DELETE, TRUNCATE, DROP", answer: "DELETE removes selected rows (DML, rollbackable); TRUNCATE empties table (DDL, fast); DROP deletes schema & table completely." },
      { company: "TCS", year: "2023", question: "Explain ACID properties", answer: "Atomicity, Consistency, Isolation, Durability — pillars of transaction reliability." }
    ],
    mock: [
      { type: "Technical", question: "Explain the difference between Primary Key and Unique Key.", tip: "Primary key cannot contain NULL values and only one per table; Unique key allows one NULL value and a table can have multiple unique keys." }
    ],
    coding: {
      problem: "Nth Highest Salary Query",
      desc: "Write a SQL query to select the 2nd highest salary from Employee table.",
      input: "Employee table with id, salary",
      output: "Second highest salary value",
      starter: `-- Write your SQL query here\nSELECT salary FROM Employee...`
    }
  }
];
