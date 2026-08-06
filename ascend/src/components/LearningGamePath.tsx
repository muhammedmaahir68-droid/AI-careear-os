import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Trophy, Gem, Lock, CheckCircle2, Sparkles, BookOpen,
  ArrowRight, Gift, X, Zap, Target, ChevronDown, ChevronRight,
  Code2, Brain, Cpu, Bolt, Wrench, Building, Database, Shield
} from "lucide-react";
import GamificationModal, { LEAGUES } from "./GamificationModal";
import { recordUserProgress } from "../services/api";

// ─────────────────────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────────────────────
export interface LessonNode {
  id: string;
  step: number;         // sequential step number (1, 2, 3 …)
  category: string;     // "Phase 1: Foundations", "Phase 2: Core" etc
  title: string;
  type: "lesson" | "quiz" | "code" | "chest" | "boss";
  xpReward: number;
  diamondReward: number;
  theory?: {
    summary: string;
    keyPoints: string[];
    formula?: string;
    code?: string;
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
// MASSIVE SYLLABUS DATA — Branch × Role
// ─────────────────────────────────────────────────────────────────────────────
export function getCoursePath(branchId: string, roleId?: string | null): LessonNode[] {
  const b = (branchId || "cse").toLowerCase();
  const r = (roleId || "").toLowerCase();

  // ── CSE ──────────────────────────────────────────────────────────────────
  if (b === "cse") {
    const base: LessonNode[] = [
      // Phase 1 — Math & Aptitude Foundations
      { id:"cse-1",  step:1,  category:"Phase 1 – Aptitude Foundations", title:"Number Systems & HCF/LCM", type:"lesson", xpReward:40, diamondReward:10,
        theory:{ summary:"Prime factorization, divisibility rules, HCF/LCM shortcuts for placement aptitude.", keyPoints:["HCF × LCM = Product of two numbers","Unit digit of n^k cycles with period 4 for odd digits","Remainder theorem tricks for large powers"], formula:"HCF(a,b) × LCM(a,b) = a × b" },
        questions:[{prompt:"HCF of 36 and 48?", options:["6","12","18","24"], correct:1, explanation:"36=2²×3², 48=2⁴×3 → HCF=12"}]},
      { id:"cse-2",  step:2,  category:"Phase 1 – Aptitude Foundations", title:"Percentages, Profit & Loss", type:"quiz", xpReward:40, diamondReward:10,
        theory:{ summary:"Percentage change, successive discounts, and profit/loss formulas for TCS/Wipro aptitude rounds.", keyPoints:["Successive discount d1,d2 → 100-(100-d1)(100-d2)/100","Profit% = (SP-CP)/CP × 100","If CP×(1+p/100)=SP then p = profit%"] },
        questions:[{prompt:"A 20% increase then 20% decrease gives net change of:", options:["0%","-4%","+4%","-2%"], correct:1, explanation:"Net = 100×1.2×0.8 = 96. Net change = -4%."}]},
      { id:"cse-3",  step:3,  category:"Phase 1 – Aptitude Foundations", title:"Time, Speed & Work", type:"quiz", xpReward:40, diamondReward:10,
        theory:{ summary:"Pipes & cisterns, relative speed, and work-efficiency problems.", keyPoints:["If A does work in n days, rate = 1/n per day","Relative speed = sum (opposite) or difference (same direction)","Pipe fill: combined rate = 1/a + 1/b"] },
        questions:[{prompt:"A completes work in 6 days, B in 12 days. Together?", options:["4 days","3 days","9 days","5 days"], correct:0, explanation:"Rate = 1/6+1/12 = 3/12 = 1/4. So 4 days."}]},
      { id:"cse-4",  step:4,  category:"Phase 1 – Aptitude Foundations", title:"Permutation, Combination & Probability", type:"quiz", xpReward:50, diamondReward:12,
        theory:{ summary:"nPr, nCr formulas and basic probability for placement written rounds.", keyPoints:["nPr = n!/(n-r)!","nCr = n!/(r!(n-r)!)","P(A∪B) = P(A)+P(B)-P(A∩B)"], formula:"P(Event) = Favourable / Total" },
        questions:[{prompt:"5 people in a line. How many arrangements?", options:["25","60","120","720"], correct:2, explanation:"5! = 120."}]},
      { id:"cse-chest-1", step:5, category:"Phase 1 – Aptitude Foundations", title:"🎁 Aptitude Champion Chest", type:"chest", xpReward:100, diamondReward:40 },

      // Phase 2 — Core Programming & DSA
      { id:"cse-5",  step:6,  category:"Phase 2 – Core DSA", title:"Arrays & Sliding Window", type:"lesson", xpReward:60, diamondReward:15,
        theory:{ summary:"Contiguous memory arrays, two-pointer and sliding window patterns used in 80% of placement coding rounds.", keyPoints:["Kadane's Algorithm: O(n) maximum subarray","Two-pointer shrinks/expands window in O(1) per step","Prefix sum enables range queries in O(1)"], formula:"Address(A[i]) = Base + i × sizeof(T)",
          code:"// Max subarray (Kadane's)\nfunction maxSub(a){\n  let [max,cur]=[a[0],a[0]];\n  for(let i=1;i<a.length;i++){\n    cur=Math.max(a[i],cur+a[i]);\n    max=Math.max(max,cur);\n  }\n  return max;\n}" },
        questions:[{prompt:"Time complexity of Kadane's max-subarray algorithm?", options:["O(n²)","O(n log n)","O(n)","O(1)"], correct:2, explanation:"Single pass → O(n)."}]},
      { id:"cse-6",  step:7,  category:"Phase 2 – Core DSA", title:"Linked Lists & Floyd's Cycle", type:"lesson", xpReward:60, diamondReward:15,
        theory:{ summary:"Singly/doubly linked lists, reversal, cycle detection with Floyd's two-pointer.", keyPoints:["Reversal: prev=null, iterate re-linking next","Floyd slow(×1)/fast(×2) pointers meet at cycle","Merge sorted lists in O(n+m) with dummy head"],
          code:"function hasCycle(h){\n  let s=h,f=h;\n  while(f&&f.next){\n    s=s.next;f=f.next.next;\n    if(s===f)return true;\n  }\n  return false;\n}" },
        questions:[{prompt:"Floyd's cycle detection uses how many pointers?", options:["1","2","3","4"], correct:1, explanation:"Slow and fast pointer."}]},
      { id:"cse-7",  step:8,  category:"Phase 2 – Core DSA", title:"Stacks, Queues & Monotonic Stack", type:"lesson", xpReward:60, diamondReward:15,
        theory:{ summary:"LIFO/FIFO structures, next greater element, and balanced parentheses.", keyPoints:["Stack: push/pop O(1)","Monotonic stack: next greater element in O(n)","Deque implements sliding window maximum O(n)"],
          code:"// Next Greater Element\nfunction nge(arr){\n  const res=Array(arr.length).fill(-1),st=[];\n  for(let i=0;i<arr.length;i++){\n    while(st.length&&arr[st.at(-1)]<arr[i]){\n      res[st.pop()]=arr[i];\n    }\n    st.push(i);\n  }\n  return res;\n}" },
        questions:[{prompt:"Which structure is LIFO?", options:["Queue","Stack","Heap","Deque"], correct:1, explanation:"Stack = Last In First Out."}]},
      { id:"cse-8",  step:9,  category:"Phase 2 – Core DSA", title:"Binary Search & Search Space", type:"lesson", xpReward:70, diamondReward:18,
        theory:{ summary:"Classic binary search and search-on-answer pattern for optimizing over a range.", keyPoints:["Classic BS: O(log n)","Search-on-answer reduces complex problems to yes/no","Lower bound: first element ≥ target"], formula:"mid = low + (high-low)/2" ,
          code:"function bs(a,t){\n  let lo=0,hi=a.length-1;\n  while(lo<=hi){\n    const mid=(lo+hi)>>1;\n    if(a[mid]===t)return mid;\n    a[mid]<t?lo=mid+1:hi=mid-1;\n  }\n  return -1;\n}" },
        questions:[{prompt:"Binary search time complexity?", options:["O(n)","O(log n)","O(n log n)","O(1)"], correct:1, explanation:"Halves the search space each step."}]},
      { id:"cse-9",  step:10, category:"Phase 2 – Core DSA", title:"Trees: BFS, DFS & BST", type:"lesson", xpReward:80, diamondReward:20,
        theory:{ summary:"Binary trees, traversal patterns, and Binary Search Tree properties.", keyPoints:["Inorder (L-Root-R) of BST gives sorted output","BFS uses queue, DFS uses stack/recursion","Height of balanced BST = O(log n)"],
          code:"function inorder(root){\n  if(!root)return[];\n  return [...inorder(root.left),root.val,...inorder(root.right)];\n}" },
        questions:[{prompt:"Inorder traversal of BST gives?", options:["Random order","Descending order","Ascending sorted order","Pre-order"], correct:2, explanation:"BST inorder always yields sorted ascending sequence."}]},
      { id:"cse-10", step:11, category:"Phase 2 – Core DSA", title:"Dynamic Programming Patterns", type:"lesson", xpReward:100, diamondReward:25,
        theory:{ summary:"Top-down memoization and bottom-up tabulation. Classic DP: Knapsack, LCS, Coin Change.", keyPoints:["DP: overlapping subproblems + optimal substructure","0/1 Knapsack: dp[i][w] = max(dp[i-1][w], val[i]+dp[i-1][w-wt[i]])","LCS length in O(m×n)"], formula:"dp[i] = max(dp[i], val[j] + dp[i-wt[j]])" },
        questions:[{prompt:"Coin change minimum coins for amount 11, coins=[1,5,6,9]?", options:["2","3","4","5"], correct:0, explanation:"9+? No. 6+5=11 → 2 coins."}]},
      { id:"cse-chest-2", step:12, category:"Phase 2 – Core DSA", title:"🎁 DSA Master Diamond Chest", type:"chest", xpReward:200, diamondReward:80 },

      // Phase 3 — Systems & CS Core
      { id:"cse-11", step:13, category:"Phase 3 – CS Core Theory", title:"Operating Systems: Scheduling & Deadlock", type:"lesson", xpReward:70, diamondReward:18,
        theory:{ summary:"CPU scheduling algorithms and the 4 necessary conditions for deadlock.", keyPoints:["4 Deadlock conditions: Mutual Exclusion, Hold & Wait, No Preemption, Circular Wait","Round Robin: time quantum ensures fairness","Turnaround = Completion - Arrival; Waiting = Turnaround - Burst"], formula:"Turnaround Time = Completion − Arrival Time" },
        questions:[{prompt:"Which condition is NOT required for deadlock?", options:["Mutual Exclusion","Preemption","Hold & Wait","Circular Wait"], correct:1, explanation:"Preemption breaks deadlock; its absence (No Preemption) IS required."}]},
      { id:"cse-12", step:14, category:"Phase 3 – CS Core Theory", title:"DBMS: Normalization & SQL Joins", type:"lesson", xpReward:70, diamondReward:18,
        theory:{ summary:"1NF through BCNF, SQL join types, and index structures for placement rounds.", keyPoints:["3NF removes transitive dependencies","ACID: Atomicity, Consistency, Isolation, Durability","INNER JOIN returns matching rows; LEFT JOIN keeps all left rows"],
          code:"-- Second highest salary\nSELECT MAX(salary) FROM employees\nWHERE salary < (SELECT MAX(salary) FROM employees);" },
        questions:[{prompt:"Which normal form eliminates transitive dependencies?", options:["1NF","2NF","3NF","BCNF"], correct:2, explanation:"3NF removes non-key→non-key attribute dependencies."}]},
      { id:"cse-13", step:15, category:"Phase 3 – CS Core Theory", title:"Computer Networks: TCP/IP & HTTP", type:"lesson", xpReward:70, diamondReward:18,
        theory:{ summary:"OSI model, TCP 3-way handshake, HTTP/HTTPS, DNS, and subnetting.", keyPoints:["TCP 3-way: SYN → SYN-ACK → ACK","DNS resolves domain names to IPs on port 53","Subnetting /24 gives 254 usable host addresses"], formula:"Physical Address = (Segment×16) + Offset" },
        questions:[{prompt:"TCP 3-way handshake second step is?", options:["SYN","SYN-ACK","ACK","FIN"], correct:1, explanation:"Server replies to SYN with SYN-ACK."}]},
      { id:"cse-chest-3", step:16, category:"Phase 3 – CS Core Theory", title:"🎁 CS Core Champion Chest", type:"chest", xpReward:200, diamondReward:80 },

      // Phase 4 — System Design & Coding
      { id:"cse-14", step:17, category:"Phase 4 – System Design", title:"System Design: Scalability Fundamentals", type:"lesson", xpReward:100, diamondReward:28,
        theory:{ summary:"Horizontal vs vertical scaling, load balancing, caching, and CAP theorem.", keyPoints:["CAP: Consistency, Availability, Partition Tolerance — pick 2","CDN caches static assets at edge nodes globally","Consistent hashing distributes load evenly across shards"] },
        questions:[{prompt:"CAP theorem says a distributed system can guarantee at most how many of the 3 properties?", options:["1","2","3","All 3"], correct:1, explanation:"CAP theorem: Only 2 out of 3 guarantees are achievable simultaneously."}]},
      { id:"cse-15", step:18, category:"Phase 4 – System Design", title:"System Design: URL Shortener & LRU Cache", type:"code", xpReward:120, diamondReward:35,
        theory:{ summary:"Classic system design interview problems: URL shortener and LRU Cache implementation.", keyPoints:["URL shortener: hash(longUrl) → base62 encode → 7 char short code","LRU Cache: HashMap + Doubly Linked List → O(1) get & put","Cache eviction: LRU removes least recently used entry"],
          code:"class LRUCache{\n  constructor(cap){\n    this.cap=cap;\n    this.map=new Map();\n  }\n  get(key){\n    if(!this.map.has(key))return-1;\n    const v=this.map.get(key);\n    this.map.delete(key);\n    this.map.set(key,v);\n    return v;\n  }\n  put(key,val){\n    this.map.delete(key);\n    this.map.set(key,val);\n    if(this.map.size>this.cap)\n      this.map.delete(this.map.keys().next().value);\n  }\n}" },
        questions:[{prompt:"Data structures used in LRU Cache?", options:["Array + Stack","HashMap + Doubly Linked List","BST + Queue","Trie + Heap"], correct:1, explanation:"HashMap gives O(1) lookup; DLL gives O(1) insertion/removal."}]},

      // Phase 5 — MNC Placement Boss Round
      { id:"cse-boss-1", step:19, category:"Phase 5 – MNC Placement Boss 🏆", title:"BOSS: Google/Amazon SDE Final Round", type:"boss", xpReward:500, diamondReward:200,
        questions:[
          {prompt:"Two Sum: Find indices of two numbers that add up to target. Best approach?", options:["O(n²) brute force","O(n log n) sort + binary search","O(n) HashMap one-pass","O(n log n) merge sort"], correct:2, explanation:"HashMap stores complement. One pass → O(n) time, O(n) space."},
          {prompt:"Which data structure would you use to implement a priority queue?", options:["Linked List","Array","Binary Heap","Hash Table"], correct:2, explanation:"Binary Heap enables O(log n) insert/extract-min or max."},
          {prompt:"Longest palindromic substring — optimal approach?", options:["O(n³) brute force","O(n²) expand-around-center","O(n) Manacher's algorithm","O(n log n) suffix array"], correct:2, explanation:"Manacher's algorithm finds all palindromes in O(n)."}
        ]},
    ];

    // Role-specific extension nodes
    if (r.includes("backend")) {
      base.push(
        { id:"cse-be-1", step:20, category:"Role Track – Backend Engineer", title:"REST API Design & HTTP Methods", type:"lesson", xpReward:80, diamondReward:20,
          theory:{ summary:"RESTful API design principles, HTTP status codes, and API versioning strategies.", keyPoints:["Idempotent methods: GET, PUT, DELETE","POST creates resources; PATCH partially updates","Status: 200 OK, 201 Created, 400 Bad Request, 401 Unauthorized, 404 Not Found, 500 Server Error"],
            code:"// Express REST API example\napp.get('/api/users/:id', authenticate, async (req,res)=>{\n  const user = await User.findById(req.params.id);\n  if(!user) return res.status(404).json({error:'Not found'});\n  res.json(user);\n});" },
          questions:[{prompt:"Which HTTP method is idempotent AND safe?", options:["POST","PUT","GET","PATCH"], correct:2, explanation:"GET is both safe (no side effects) and idempotent (same result every time)."}]},
        { id:"cse-be-2", step:21, category:"Role Track – Backend Engineer", title:"Database Indexing, Transactions & ACID", type:"lesson", xpReward:80, diamondReward:20,
          theory:{ summary:"B-Tree indexes, composite indexes, transaction isolation levels.", keyPoints:["Composite index (a,b) covers queries on a or (a,b) but NOT b alone","ACID Isolation levels: Read Uncommitted < Read Committed < Repeatable Read < Serializable","N+1 query problem: solved with JOIN or eager loading"] },
          questions:[{prompt:"Which ACID property ensures partial transactions are rolled back?", options:["Consistency","Isolation","Atomicity","Durability"], correct:2, explanation:"Atomicity: all-or-nothing. Partial failures trigger full rollback."}]}
      );
    }

    if (r.includes("sde") || r.includes("fullstack")) {
      base.push(
        { id:"cse-sde-1", step:20, category:"Role Track – SDE Product Round", title:"Graph Algorithms: BFS Shortest Path & Dijkstra", type:"lesson", xpReward:100, diamondReward:30,
          theory:{ summary:"Graph traversal for shortest path problems — classic Tier-1 SDE interviews.", keyPoints:["BFS gives shortest path in unweighted graphs","Dijkstra uses min-heap for weighted shortest path: O((V+E) log V)","Detect cycle in directed graph: DFS with visited + rec-stack"],
            code:"function dijkstra(graph, src){\n  const dist={};\n  const pq=[[0,src]]; // [dist, node]\n  for(const n of Object.keys(graph)) dist[n]=Infinity;\n  dist[src]=0;\n  while(pq.length){\n    pq.sort((a,b)=>a[0]-b[0]);\n    const [d,u]=pq.shift();\n    for(const [v,w] of (graph[u]||[])){\n      if(dist[u]+w<dist[v]){\n        dist[v]=dist[u]+w;\n        pq.push([dist[v],v]);\n      }\n    }\n  }\n  return dist;\n}" },
          questions:[{prompt:"Dijkstra's algorithm fails when graph has?", options:["Many nodes","Negative weight edges","Cycles","Disconnected components"], correct:1, explanation:"Dijkstra cannot handle negative weights; use Bellman-Ford instead."}]}
      );
    }

    return base;
  }

  // ── AIML / AIDS ──────────────────────────────────────────────────────────
  if (b === "aiml" || b === "aids") {
    return [
      { id:"ai-1",  step:1, category:"Phase 1 – Math Foundations for AI", title:"Linear Algebra: Vectors, Matrices & Eigenvalues", type:"lesson", xpReward:50, diamondReward:12,
        theory:{ summary:"Matrix operations, determinants, eigenvalues/eigenvectors — the mathematical backbone of all ML algorithms.", keyPoints:["Eigendecomposition: Av = λv","PCA uses eigenvectors of covariance matrix to reduce dimensions","Dot product: a·b = |a||b|cosθ"], formula:"det(A - λI) = 0 gives eigenvalues" },
        questions:[{prompt:"PCA is based on finding the eigenvectors of which matrix?", options:["Identity matrix","Covariance matrix","Correlation matrix","Hessian matrix"], correct:1, explanation:"PCA decomposes the covariance matrix of data to find principal components."}]},
      { id:"ai-2",  step:2, category:"Phase 1 – Math Foundations for AI", title:"Probability & Bayesian Inference", type:"quiz", xpReward:50, diamondReward:12,
        theory:{ summary:"Probability distributions, Bayes theorem, and maximum likelihood estimation.", keyPoints:["Bayes: P(A|B) = P(B|A)×P(A)/P(B)","MLE maximizes likelihood P(data|parameters)","Normal distribution: 68-95-99.7 rule"], formula:"P(A|B) = P(B|A) × P(A) / P(B)" },
        questions:[{prompt:"Which theorem updates beliefs given new evidence?", options:["Central Limit Theorem","Law of Large Numbers","Bayes Theorem","Markov Theorem"], correct:2, explanation:"Bayes theorem: P(H|E) = P(E|H)×P(H)/P(E)"}]},
      { id:"ai-3",  step:3, category:"Phase 1 – Math Foundations for AI", title:"Calculus: Gradients & Chain Rule", type:"lesson", xpReward:50, diamondReward:12,
        theory:{ summary:"Partial derivatives, gradient vectors, and the chain rule — essential for understanding backpropagation.", keyPoints:["Gradient ∇f points in direction of steepest ascent","Chain rule: d(f∘g)/dx = f'(g(x))×g'(x)","Second derivative (Hessian) determines convexity"], formula:"∂L/∂w = ∂L/∂ŷ × ∂ŷ/∂w" },
        questions:[{prompt:"The gradient of a function always points in which direction?", options:["Steepest descent","Steepest ascent","Horizontal direction","Zero direction"], correct:1, explanation:"∇f points in the direction of steepest increase of f."}]},
      { id:"ai-chest-1", step:4, category:"Phase 1 – Math Foundations for AI", title:"🎁 Math Foundation Chest", type:"chest", xpReward:100, diamondReward:40 },

      { id:"ai-4",  step:5, category:"Phase 2 – Classical Machine Learning", title:"Linear & Logistic Regression", type:"lesson", xpReward:70, diamondReward:18,
        theory:{ summary:"Supervised learning — regression for continuous outputs, classification using sigmoid.", keyPoints:["MSE Loss: (1/2m)Σ(ŷ-y)²","Sigmoid σ(z)=1/(1+e^-z) squashes to (0,1)","Gradient Descent: w ← w - α∇L"], formula:"σ(z) = 1 / (1 + e^{-z})",
          code:"# Logistic Regression from scratch\nimport numpy as np\ndef sigmoid(z): return 1/(1+np.exp(-z))\ndef predict(X,w,b): return sigmoid(X@w+b)\ndef loss(X,y,w,b):\n    yhat=predict(X,w,b)\n    return -np.mean(y*np.log(yhat)+(1-y)*np.log(1-yhat))" },
        questions:[{prompt:"What loss function is used for logistic regression?", options:["MSE","MAE","Cross-Entropy Loss","Hinge Loss"], correct:2, explanation:"Binary cross-entropy: -Σ[y log ŷ + (1-y) log(1-ŷ)]"}]},
      { id:"ai-5",  step:6, category:"Phase 2 – Classical Machine Learning", title:"Decision Trees, Random Forest & Boosting", type:"lesson", xpReward:70, diamondReward:18,
        theory:{ summary:"Tree-based models, ensemble methods (bagging vs boosting), and feature importance.", keyPoints:["Decision tree splits minimize Gini impurity or entropy","Random Forest = Bagging + random feature subsets","XGBoost = Gradient Boosting with regularization: wins Kaggle consistently"], formula:"Gini = 1 − Σ pᵢ²" },
        questions:[{prompt:"Random Forest reduces overfitting through:", options:["Deeper trees","Feature engineering","Bagging + random feature subsets","Higher learning rate"], correct:2, explanation:"Bagging trains many trees on random data subsets; random features decorrelate the trees."}]},
      { id:"ai-6",  step:7, category:"Phase 2 – Classical Machine Learning", title:"SVM, KNN & Naive Bayes", type:"quiz", xpReward:70, diamondReward:18,
        theory:{ summary:"Kernel SVM for non-linear boundaries, KNN distance metrics, and Naive Bayes independence assumption.", keyPoints:["SVM maximizes margin between classes via support vectors","KNN: k=1 overfits, k=N underfits; odd k avoids ties","Naive Bayes assumes conditional independence of features"], formula:"SVM: maximize 2/||w|| subject to yᵢ(w·xᵢ+b)≥1" },
        questions:[{prompt:"SVM decision boundary is determined by?", options:["All training points","Only support vectors","Mean of classes","Centroids"], correct:1, explanation:"Only the support vectors (closest points to boundary) define the hyperplane."}]},
      { id:"ai-chest-2", step:8, category:"Phase 2 – Classical Machine Learning", title:"🎁 ML Champion Chest", type:"chest", xpReward:200, diamondReward:80 },

      { id:"ai-7",  step:9, category:"Phase 3 – Deep Learning", title:"Neural Networks & Backpropagation", type:"lesson", xpReward:100, diamondReward:28,
        theory:{ summary:"Multi-layer perceptrons, activation functions, and weight update via backprop.", keyPoints:["ReLU: max(0,x) — avoids vanishing gradient","Adam optimizer: adaptive moment estimation","Dropout p=0.2 randomly drops 20% neurons during training"], formula:"∂L/∂w = ∂L/∂a · ∂a/∂z · ∂z/∂w",
          code:"import torch.nn as nn\nmodel = nn.Sequential(\n    nn.Linear(784, 256),\n    nn.ReLU(),\n    nn.Dropout(0.2),\n    nn.Linear(256, 128),\n    nn.ReLU(),\n    nn.Linear(128, 10)\n)" },
        questions:[{prompt:"Which activation function is defined as max(0,x)?", options:["Sigmoid","Tanh","ReLU","Softmax"], correct:2, explanation:"ReLU = Rectified Linear Unit: max(0,x). Fixes vanishing gradients."}]},
      { id:"ai-8",  step:10, category:"Phase 3 – Deep Learning", title:"CNNs: Convolution, Pooling & Feature Maps", type:"lesson", xpReward:100, diamondReward:28,
        theory:{ summary:"Convolutional neural networks for image classification — used in ResNet, VGG, YOLO.", keyPoints:["Conv layer: kernel slides over input extracting spatial features","MaxPool reduces spatial size by taking max in receptive field","ResNet skip connections solve vanishing gradients in deep networks"], formula:"Output size = (W − F + 2P) / S + 1" },
        questions:[{prompt:"What does a MaxPooling layer do?", options:["Increases feature map size","Applies convolution","Reduces spatial dimensions by taking max","Normalizes activations"], correct:2, explanation:"MaxPool downsamples by selecting max value in each pooling window."}]},
      { id:"ai-9",  step:11, category:"Phase 3 – Deep Learning", title:"Transformers & Attention Mechanism", type:"lesson", xpReward:120, diamondReward:35,
        theory:{ summary:"Self-attention, multi-head attention, positional encoding — the foundation of GPT, BERT, LLaMA.", keyPoints:["Attention: Softmax(QKᵀ/√dk)V","√dk scaling prevents softmax saturation","Positional encoding adds order information to token embeddings"], formula:"Attention(Q,K,V) = Softmax(QKᵀ/√dₖ)V",
          code:"import torch, torch.nn as nn\nclass SelfAttention(nn.Module):\n    def __init__(self,d): super().__init__(); self.W=nn.Linear(d,3*d)\n    def forward(self,x):\n        Q,K,V=self.W(x).chunk(3,dim=-1)\n        scores=(Q@K.transpose(-2,-1))/(Q.size(-1)**0.5)\n        return scores.softmax(-1)@V" },
        questions:[{prompt:"Why is QKᵀ scaled by √dk in attention?", options:["To reduce memory usage","To prevent softmax saturation for large dk","To increase speed","To normalize the queries"], correct:1, explanation:"Large dk causes QKᵀ dot products to grow, pushing softmax into saturation zones."}]},
      { id:"ai-chest-3", step:12, category:"Phase 3 – Deep Learning", title:"🎁 Deep Learning Legend Chest", type:"chest", xpReward:200, diamondReward:80 },

      { id:"ai-10", step:13, category:"Phase 4 – NLP, CV & MLOps", title:"NLP: Tokenization, Embeddings & BERT", type:"lesson", xpReward:100, diamondReward:28,
        theory:{ summary:"Text preprocessing, word2vec/GloVe embeddings, BERT fine-tuning for downstream tasks.", keyPoints:["Word2Vec: CBOW predicts center word; Skip-gram predicts context","BERT: bidirectional transformer pre-trained on masked language modeling","Fine-tuning: add task-specific head and train on labeled data"] },
        questions:[{prompt:"BERT uses which pre-training objective?", options:["Next word prediction","Masked Language Modeling","Sentiment classification","Translation"], correct:1, explanation:"BERT masks 15% of tokens and predicts them — enabling bidirectional context."}]},
      { id:"ai-11", step:14, category:"Phase 4 – NLP, CV & MLOps", title:"Model Evaluation: Metrics & Bias-Variance", type:"quiz", xpReward:80, diamondReward:22,
        theory:{ summary:"Classification metrics, regression metrics, bias-variance tradeoff, and cross-validation.", keyPoints:["F1 = 2×(Precision×Recall)/(Precision+Recall)","High bias = underfitting; High variance = overfitting","k-Fold cross-validation: split into k folds, rotate test set"], formula:"F1 = 2PR/(P+R)" },
        questions:[{prompt:"A model with 100% train accuracy but 60% test accuracy suffers from?", options:["High bias","High variance (overfitting)","Underfitting","Perfect fit"], correct:1, explanation:"Huge gap between train and test accuracy indicates overfitting (high variance)."}]},
      { id:"ai-boss-1", step:15, category:"Phase 5 – Placement Boss 🏆", title:"BOSS: Data Scientist / ML Engineer Final Round", type:"boss", xpReward:500, diamondReward:200,
        questions:[
          {prompt:"Describe how you would handle class imbalance (1000 fraud vs 1M normal transactions)?", options:["Delete majority class","SMOTE oversampling or class weights; optimize recall not accuracy","Train on all data equally","Use only majority class"], correct:1, explanation:"SMOTE oversamples minority; class_weight='balanced' penalizes misclassification; use AUC-ROC not accuracy."},
          {prompt:"Which algorithm is NOT gradient-boosting based?", options:["XGBoost","LightGBM","CatBoost","Random Forest"], correct:3, explanation:"Random Forest is bagging (parallel). XGBoost, LightGBM, CatBoost are all gradient boosting (sequential)."}
        ]},
    ];
  }

  // ── ECE ──────────────────────────────────────────────────────────────────
  if (b === "ece") {
    return [
      { id:"ece-1",  step:1, category:"Phase 1 – Digital Electronics", title:"Logic Gates, Boolean Algebra & K-Maps", type:"lesson", xpReward:50, diamondReward:12,
        theory:{ summary:"Combinational logic design using De Morgan's laws and Karnaugh map minimization.", keyPoints:["NAND and NOR are universal gates","De Morgan: (AB)' = A'+B'","K-map groups: 1s in powers of 2 (1,2,4,8)"], formula:"De Morgan: (A·B)' = A' + B'" },
        questions:[{prompt:"Which is a universal gate?", options:["AND","OR","NAND","XOR"], correct:2, explanation:"NAND alone can implement any Boolean function."}]},
      { id:"ece-2",  step:2, category:"Phase 1 – Digital Electronics", title:"Flip-Flops, Counters & Registers", type:"quiz", xpReward:50, diamondReward:12,
        theory:{ summary:"Sequential logic: D, JK, SR flip-flops, ripple vs synchronous counters.", keyPoints:["D flip-flop: Q(t+1) = D","JK flip-flop: J=K=1 toggles output","Mod-N counter requires ⌈log₂N⌉ flip-flops"] },
        questions:[{prompt:"How many flip-flops are needed for a mod-8 counter?", options:["2","3","4","8"], correct:1, explanation:"2³=8 → 3 flip-flops."}]},
      { id:"ece-3",  step:3, category:"Phase 1 – Digital Electronics", title:"ADC/DAC Converters & Number Systems", type:"lesson", xpReward:50, diamondReward:12,
        theory:{ summary:"Analog-to-Digital and Digital-to-Analog conversion, binary, hex, BCD, Gray code.", keyPoints:["Flash ADC: fastest, 2^n-1 comparators","R-2R ladder DAC: uses resistor network","Gray code: only 1 bit changes between consecutive values"] },
        questions:[{prompt:"Flash ADC is preferred for applications requiring?", options:["Low power","High resolution","Very high speed conversion","Low cost"], correct:2, explanation:"Flash ADC converts in single clock cycle — fastest possible conversion."}]},
      { id:"ece-chest-1", step:4, category:"Phase 1 – Digital Electronics", title:"🎁 Digital Electronics Chest", type:"chest", xpReward:100, diamondReward:40 },

      { id:"ece-4",  step:5, category:"Phase 2 – Signals & Systems", title:"Fourier Transform & LTI Systems", type:"lesson", xpReward:70, diamondReward:18,
        theory:{ summary:"Continuous and discrete Fourier transforms, convolution theorem, and system frequency response.", keyPoints:["Convolution in time = multiplication in frequency domain","Nyquist sampling: fs ≥ 2×fmax prevents aliasing","LTI system output y(t)=x(t)*h(t)"], formula:"fs ≥ 2 × f_max (Nyquist Rate)" },
        questions:[{prompt:"Minimum sampling rate to avoid aliasing for a 4kHz signal?", options:["4kHz","6kHz","8kHz","16kHz"], correct:2, explanation:"Nyquist: fs ≥ 2×4kHz = 8kHz."}]},
      { id:"ece-5",  step:6, category:"Phase 2 – Signals & Systems", title:"Laplace Transform & Transfer Functions", type:"lesson", xpReward:70, diamondReward:18,
        theory:{ summary:"Laplace analysis for circuit analysis, pole-zero diagrams, and stability.", keyPoints:["Poles in left half plane → stable system","Transfer function H(s) = Y(s)/X(s)","Final Value Theorem: lim(t→∞)f(t) = lim(s→0)sF(s)"], formula:"H(s) = Y(s) / X(s)" },
        questions:[{prompt:"System stability using Laplace requires poles in?", options:["Right half plane","Left half plane","Imaginary axis","Origin"], correct:1, explanation:"LHP poles → negative real part → decaying exponential → stable."}]},
      { id:"ece-6",  step:7, category:"Phase 2 – Signals & Systems", title:"Amplitude & Frequency Modulation (AM/FM)", type:"lesson", xpReward:70, diamondReward:18,
        theory:{ summary:"Modulation techniques — AM bandwidth, FM noise immunity, and Shannon channel capacity.", keyPoints:["AM bandwidth = 2×fm","FM has better noise immunity than AM","Shannon: C = B·log₂(1+SNR)"], formula:"C = B × log₂(1 + SNR)" },
        questions:[{prompt:"Shannon's channel capacity formula is C = ?", options:["B × SNR","B × log₂(1+SNR)","2B × log₂(M)","B / SNR"], correct:1, explanation:"C = B·log₂(1+SNR) gives theoretical maximum data rate."}]},
      { id:"ece-chest-2", step:8, category:"Phase 2 – Signals & Systems", title:"🎁 Signals & Systems Chest", type:"chest", xpReward:200, diamondReward:80 },

      { id:"ece-7",  step:9, category:"Phase 3 – Microprocessors & VLSI", title:"8085/8086 Architecture & Instruction Set", type:"lesson", xpReward:80, diamondReward:22,
        theory:{ summary:"8085 registers, bus structure, interrupt handling, and 8086 segmented memory model.", keyPoints:["8085: 8-bit data bus, 16-bit address bus (64KB)","8086: 16-bit, 20-bit address bus (1MB memory)","Physical Address = Segment×16 + Offset"], formula:"Physical Addr = (Segment × 10h) + Offset" },
        questions:[{prompt:"8086 address bus size?", options:["8-bit","16-bit","20-bit","32-bit"], correct:2, explanation:"8086 has 20-bit address bus → can address 1MB."}]},
      { id:"ece-8",  step:10, category:"Phase 3 – Microprocessors & VLSI", title:"VLSI Design: CMOS & Logic Families", type:"lesson", xpReward:80, diamondReward:22,
        theory:{ summary:"CMOS transistor operation, propagation delay, power dissipation, and logic family comparison.", keyPoints:["CMOS uses complementary PMOS+NMOS pairs","Dynamic power ∝ C×VDD²×f","CMOS: near-zero static power — only switches consume power"], formula:"P_dynamic = α × C × V²_DD × f" },
        questions:[{prompt:"CMOS logic has lowest power consumption because?", options:["Uses resistors","One transistor always off during steady state","Both transistors on","High supply voltage"], correct:1, explanation:"In steady state one transistor is OFF, blocking current flow → near-zero static power."}]},
      { id:"ece-boss-1", step:11, category:"Phase 4 – Placement Boss 🏆", title:"BOSS: ECE Core Placement Final Round", type:"boss", xpReward:500, diamondReward:200,
        questions:[
          {prompt:"In a Butterworth filter, the roll-off rate is?", options:["6dB/octave","20dB/decade per order","Both A and B","10dB/octave"], correct:2, explanation:"-20dB/decade per pole = -6dB/octave per pole. Both expressions are equivalent."},
          {prompt:"Which multiplexer selects 1 of 4 inputs?", options:["1×2 MUX","2×1 MUX","4×1 MUX","8×1 MUX"], correct:2, explanation:"4:1 MUX has 2 select lines and selects 1 of 4 inputs."}
        ]},
    ];
  }

  // ── EEE ──────────────────────────────────────────────────────────────────
  if (b === "eee") {
    return [
      { id:"eee-1",  step:1, category:"Phase 1 – Circuit Theory", title:"KVL, KCL, Thevenin & Norton", type:"lesson", xpReward:50, diamondReward:12,
        theory:{ summary:"Fundamental circuit analysis laws and equivalent circuit theorems.", keyPoints:["KCL: Σi_in = Σi_out at any node","KVL: Σv = 0 around any closed loop","Max power transfer when R_L = R_th"], formula:"P_max = V_th² / (4 × R_th)" },
        questions:[{prompt:"Thevenin resistance is found by?", options:["Short-circuiting all sources","Opening all current sources, shorting voltage sources, finding resistance at terminals","Only opening voltage sources","Measuring output current"], correct:1, explanation:"Deactivate all sources (V→short, I→open) then measure resistance at open terminals."}]},
      { id:"eee-2",  step:2, category:"Phase 1 – Circuit Theory", title:"AC Circuits: Phasors, Impedance & Resonance", type:"lesson", xpReward:50, diamondReward:12,
        theory:{ summary:"Phasor representation, impedance of R, L, C elements, and resonance frequency.", keyPoints:["Z_R=R, Z_L=jωL, Z_C=1/jωC","At resonance: Z=R (minimum impedance)","Power factor = cos(φ)"], formula:"ω₀ = 1/√(LC)" },
        questions:[{prompt:"At series resonance frequency, circuit impedance is?", options:["Maximum","Zero","Equal to R only","jωL"], correct:2, explanation:"At resonance XL=XC cancel; only resistance R remains."}]},
      { id:"eee-3",  step:3, category:"Phase 1 – Circuit Theory", title:"3-Phase Systems: Star & Delta Connections", type:"lesson", xpReward:50, diamondReward:12,
        theory:{ summary:"Three-phase power systems, relationship between line and phase quantities in Y and Δ.", keyPoints:["Star: VL=√3×VP, IL=IP","Delta: VL=VP, IL=√3×IP","3-phase power P=√3×VL×IL×cosφ"], formula:"V_Line = √3 × V_Phase (Star)" },
        questions:[{prompt:"In a star-connected system, line voltage relates to phase voltage by?", options:["VL=VP","VL=√3×VP","VL=VP/√3","VL=3×VP"], correct:1, explanation:"Star: VL=√3×VP. This is a fundamental 3-phase relationship."}]},
      { id:"eee-chest-1", step:4, category:"Phase 1 – Circuit Theory", title:"🎁 Circuit Theory Chest", type:"chest", xpReward:100, diamondReward:40 },

      { id:"eee-4",  step:5, category:"Phase 2 – Electrical Machines", title:"DC Motors & Generators: EMF & Torque", type:"lesson", xpReward:70, diamondReward:18,
        theory:{ summary:"DC machine construction, EMF equation, speed-torque characteristics, and speed control.", keyPoints:["EMF E = (PΦNz)/(60A)","Torque T = (PΦZ×Ia)/(2πA)","Speed control: field weakening, armature voltage control"], formula:"E = (P × Φ × N × Z) / (60 × A)" },
        questions:[{prompt:"In DC generator EMF equation, A represents?", options:["Ampere","Number of parallel armature paths","Angular velocity","Armature resistance"], correct:1, explanation:"A = number of parallel armature paths. A=2 for wave winding, A=P for lap winding."}]},
      { id:"eee-5",  step:6, category:"Phase 2 – Electrical Machines", title:"Transformers: EMF Equation, Losses & Efficiency", type:"lesson", xpReward:70, diamondReward:18,
        theory:{ summary:"Single-phase transformer, EMF equation, core losses (hysteresis + eddy current), and efficiency.", keyPoints:["EMF E = 4.44×f×Φm×N","Turns ratio: V1/V2 = N1/N2 = I2/I1","η_max when copper loss = iron loss"], formula:"E = 4.44 × f × Φ_m × N" },
        questions:[{prompt:"Transformer efficiency is maximum when?", options:["Load is zero","Iron loss = Copper loss","No-load","Full load"], correct:1, explanation:"η_max at load where variable copper loss equals constant iron loss."}]},
      { id:"eee-6",  step:7, category:"Phase 2 – Electrical Machines", title:"Induction Motors: Slip, Torque & Speed Control", type:"lesson", xpReward:80, diamondReward:22,
        theory:{ summary:"Squirrel cage vs wound rotor, slip, torque-speed curve, and speed control methods.", keyPoints:["Slip s = (Ns-N)/Ns","At starting s=1, at no-load s≈0","Rotor copper loss = s × Air gap power"], formula:"s = (N_s - N) / N_s" },
        questions:[{prompt:"At starting, the slip of an induction motor is?", options:["0","0.5","1","∞"], correct:2, explanation:"At start, rotor is stationary (N=0), so s=(Ns-0)/Ns=1."}]},
      { id:"eee-chest-2", step:8, category:"Phase 2 – Electrical Machines", title:"🎁 Machines Champion Chest", type:"chest", xpReward:200, diamondReward:80 },

      { id:"eee-7",  step:9, category:"Phase 3 – Power Systems & Control", title:"Power System: Load Flow, Fault Analysis & Protection", type:"lesson", xpReward:80, diamondReward:22,
        theory:{ summary:"Power flow equations, symmetrical fault MVA, relay coordination, and circuit breaker ratings.", keyPoints:["Fault current If = V/Zf","Per-unit system normalizes voltage and impedance","Differential relay protects transformers by comparing currents"], formula:"I_fault = V / Z_fault" },
        questions:[{prompt:"Per-unit system in power systems is used to?", options:["Increase voltages","Normalize and simplify multi-voltage level calculations","Measure reactive power","Control motor speed"], correct:1, explanation:"Per-unit normalization removes the need for transformer ratios in calculations."}]},
      { id:"eee-boss-1", step:10, category:"Phase 4 – Placement Boss 🏆", title:"BOSS: EEE Core Placement Final Round", type:"boss", xpReward:500, diamondReward:200,
        questions:[
          {prompt:"Skin effect in AC conductors causes current to concentrate at?", options:["Core of conductor","Outer surface","Uniform distribution","Insulation layer"], correct:1, explanation:"At high frequency, electromagnetic field pushes current to conductor surface (skin depth δ = √(2ρ/ωμ))."},
          {prompt:"Insulation resistance of cables should be?", options:["As low as possible","As high as possible","Exactly 1 MΩ","Zero"], correct:1, explanation:"High insulation resistance prevents leakage current and ensures safety."}
        ]},
    ];
  }

  // ── MECH ─────────────────────────────────────────────────────────────────
  if (b === "mech") {
    return [
      { id:"me-1",  step:1, category:"Phase 1 – Engineering Mechanics", title:"Statics: Equilibrium, Trusses & Friction", type:"lesson", xpReward:50, diamondReward:12,
        theory:{ summary:"Free body diagrams, equilibrium conditions, and truss analysis by method of joints.", keyPoints:["Equilibrium: ΣFx=0, ΣFy=0, ΣM=0","Friction force F=μN (static μ > kinetic μ)","Method of sections cuts truss to find member forces"], formula:"ΣF = 0 and ΣM = 0" },
        questions:[{prompt:"Condition for static equilibrium?", options:["ΣF=0 only","ΣM=0 only","ΣF=0 AND ΣM=0","ΣF>0"], correct:2, explanation:"Both force and moment balance required for complete equilibrium."}]},
      { id:"me-2",  step:2, category:"Phase 1 – Engineering Mechanics", title:"Dynamics: Kinematics & Newton's Laws", type:"quiz", xpReward:50, diamondReward:12,
        theory:{ summary:"Particle kinematics, work-energy theorem, impulse-momentum, and rotation dynamics.", keyPoints:["v²=u²+2as (constant acceleration)","Work-Energy: ΔKE = W_net","Angular momentum L = Iω is conserved when no external torque"], formula:"v² = u² + 2as" },
        questions:[{prompt:"A body moves from rest with acceleration 2 m/s². Speed after 10m?", options:["4 m/s","6.3 m/s","20 m/s","2 m/s"], correct:1, explanation:"v²=0+2×2×10=40 → v=√40≈6.32 m/s."}]},
      { id:"me-3",  step:3, category:"Phase 1 – Engineering Mechanics", title:"Strength of Materials: Stress, Strain & Beam Bending", type:"lesson", xpReward:60, diamondReward:15,
        theory:{ summary:"Direct/shear stress, Poisson's ratio, bending stress formula, and beam deflection.", keyPoints:["σ = F/A (direct stress), τ = F/A (shear stress)","Flexure formula: σ = My/I","Euler column buckling: P_cr = π²EI/(KL)²"], formula:"σ = M × y / I" },
        questions:[{prompt:"Bending stress in a beam is maximum at?", options:["Neutral axis","Centroid","Outer fibers (maximum distance from neutral axis)","Mid-span"], correct:2, explanation:"σ=My/I is maximum at maximum y = distance from neutral axis (outer fibers)."}]},
      { id:"me-chest-1", step:4, category:"Phase 1 – Engineering Mechanics", title:"🎁 Mechanics Foundation Chest", type:"chest", xpReward:100, diamondReward:40 },

      { id:"me-4",  step:5, category:"Phase 2 – Thermodynamics & Fluid Mechanics", title:"Laws of Thermodynamics & Carnot Cycle", type:"lesson", xpReward:70, diamondReward:18,
        theory:{ summary:"Four laws, Carnot efficiency, and entropy for placement thermal engineering questions.", keyPoints:["First Law: ΔU = Q - W (energy conservation)","Second Law: Entropy of universe never decreases","Carnot efficiency η = 1 - Tc/Th"], formula:"η_Carnot = 1 − T_cold/T_hot" },
        questions:[{prompt:"Carnot efficiency between 300K and 600K?", options:["25%","50%","75%","100%"], correct:1, explanation:"η=1-300/600=0.5=50%."}]},
      { id:"me-5",  step:6, category:"Phase 2 – Thermodynamics & Fluid Mechanics", title:"IC Engines: Otto, Diesel & Brayton Cycles", type:"quiz", xpReward:70, diamondReward:18,
        theory:{ summary:"Air-standard cycle analysis for petrol (Otto), diesel, and gas turbine (Brayton) engines.", keyPoints:["Otto η = 1 - 1/r^(γ-1) where r=compression ratio","Diesel has higher compression ratio than Otto → higher efficiency","Brayton cycle: 2 isentropic + 2 isobaric processes"], formula:"η_Otto = 1 − 1/r^{γ−1}" },
        questions:[{prompt:"Diesel cycle has higher compression ratio than Otto because?", options:["Spark ignition","Fuel injection → auto-ignition at high temp/pressure requires high CR","Lower cost","Better cooling"], correct:1, explanation:"Diesel fuel self-ignites at high compression; no spark plug needed. Higher CR → higher efficiency."}]},
      { id:"me-6",  step:7, category:"Phase 2 – Thermodynamics & Fluid Mechanics", title:"Fluid Mechanics: Bernoulli, Reynolds & Flow Regimes", type:"lesson", xpReward:70, diamondReward:18,
        theory:{ summary:"Hydrostatics, continuity equation, Bernoulli's equation, and turbulent vs laminar flow.", keyPoints:["Bernoulli: P + ½ρv² + ρgh = constant","Continuity: A₁v₁ = A₂v₂","Re = ρvD/μ: <2000 laminar, >4000 turbulent"], formula:"Re = ρ × v × D / μ" },
        questions:[{prompt:"Reynolds number Re < 2000 indicates?", options:["Turbulent flow","Laminar flow","Transition flow","Supersonic flow"], correct:1, explanation:"Re < 2000 → viscous forces dominate → smooth laminar flow."}]},
      { id:"me-chest-2", step:8, category:"Phase 2 – Thermodynamics & Fluid Mechanics", title:"🎁 Thermo & Fluid Chest", type:"chest", xpReward:200, diamondReward:80 },

      { id:"me-7",  step:9, category:"Phase 3 – Manufacturing & Design", title:"Manufacturing Processes: Casting, Welding & Machining", type:"lesson", xpReward:80, diamondReward:22,
        theory:{ summary:"Metal casting processes, weld defects, CNC machining parameters, and material removal rate.", keyPoints:["MRR = π×D×N×f×d/1000 (mm³/min)","Welding defects: porosity (trapped gas), undercutting, cracks","Sand casting uses green sand (silica + clay + water)"] },
        questions:[{prompt:"Material removal rate in turning is proportional to?", options:["Only spindle speed","Feed rate only","Cutting speed × feed × depth of cut","Tool angle only"], correct:2, explanation:"MRR = cutting speed × feed × depth of cut."}]},
      { id:"me-boss-1", step:10, category:"Phase 4 – Placement Boss 🏆", title:"BOSS: MECH Core Placement Final Round", type:"boss", xpReward:500, diamondReward:200,
        questions:[
          {prompt:"In a spring-mass system, natural frequency ωn is?", options:["√(m/k)","√(k/m)","k/m","m/k"], correct:1, explanation:"ωn = √(k/m) — stiffer spring (higher k) → higher natural frequency."},
          {prompt:"Fouling in heat exchangers causes?", options:["Higher heat transfer","Lower heat transfer due to additional resistance","No change","Higher flow rate"], correct:1, explanation:"Fouling deposits add thermal resistance, reducing heat transfer coefficient U."}
        ]},
    ];
  }

  // ── IT / Data Science / Civil ─────────────────────────────────────────────
  if (b === "datascience") {
    return [
      { id:"ds-1",  step:1, category:"Phase 1 – Statistics Foundation", title:"Descriptive Statistics & Probability", type:"lesson", xpReward:50, diamondReward:12,
        theory:{ summary:"Mean, median, mode, variance, standard deviation, and probability distributions.", keyPoints:["Population variance σ² = Σ(x-μ)²/N","Normal distribution: 68-95-99.7 rule","Skewness: positive = right tail, negative = left tail"], formula:"σ² = Σ(xᵢ - μ)² / N" },
        questions:[{prompt:"In a positively skewed distribution, which is greatest?", options:["Mean","Median","Mode","Standard deviation"], correct:0, explanation:"Positive skew: Mode < Median < Mean (tail pulls mean rightward)."}]},
      { id:"ds-2",  step:2, category:"Phase 1 – Statistics Foundation", title:"Hypothesis Testing, p-values & A/B Testing", type:"quiz", xpReward:60, diamondReward:15,
        theory:{ summary:"Null hypothesis, Type I/II errors, t-tests, chi-square test, and A/B experiment design.", keyPoints:["p-value < α (0.05) → reject null hypothesis","Type I error (α): false positive — reject true null","Type II error (β): false negative — accept false null"], formula:"t = (x̄ - μ) / (s / √n)" },
        questions:[{prompt:"p-value of 0.02 with significance level 0.05 means?", options:["Fail to reject null","Reject the null hypothesis","No conclusion","More data needed"], correct:1, explanation:"0.02 < 0.05 → statistically significant → reject null."}]},
      { id:"ds-chest-1", step:3, category:"Phase 1 – Statistics Foundation", title:"🎁 Statistics Champion Chest", type:"chest", xpReward:100, diamondReward:40 },
      { id:"ds-3",  step:4, category:"Phase 2 – Python for Data Science", title:"Pandas, NumPy & Data Wrangling", type:"lesson", xpReward:70, diamondReward:18,
        theory:{ summary:"Data manipulation using Pandas DataFrames — cleaning, merging, groupby, and pivot tables.", keyPoints:["df.dropna() removes null rows; df.fillna() fills them","groupby().agg() for aggregation","merge() performs SQL-style joins"],
          code:"import pandas as pd\ndf = pd.read_csv('data.csv')\n# Fill nulls with column median\ndf['age'].fillna(df['age'].median(), inplace=True)\n# Group by category\nsummary = df.groupby('dept')['salary'].agg(['mean','max','count'])" },
        questions:[{prompt:"Which Pandas method performs SQL-style joins?", options:["concat","append","merge","pivot"], correct:2, explanation:"pd.merge() or df.merge() joins DataFrames on key columns like SQL JOIN."}]},
      { id:"ds-boss-1", step:5, category:"Phase 3 – Placement Boss 🏆", title:"BOSS: Data Analyst/Scientist Final Round", type:"boss", xpReward:500, diamondReward:200,
        questions:[
          {prompt:"SQL: Find duplicate email addresses in a users table.", options:["SELECT email WHERE count>1","SELECT email, COUNT(*) as cnt FROM users GROUP BY email HAVING cnt > 1","SELECT DISTINCT email FROM users","SELECT email FROM users ORDER BY email"], correct:1, explanation:"GROUP BY + HAVING COUNT(*) > 1 finds duplicates."},
          {prompt:"Central Limit Theorem states that for large n:", options:["Population must be normal","Sample mean distribution approaches normal","Median equals mean","Variance equals 1"], correct:1, explanation:"CLT: regardless of population distribution, sample means are normally distributed for large n."}
        ]},
    ];
  }

  // ── CIVIL ─────────────────────────────────────────────────────────────────
  if (b === "civil") {
    return [
      { id:"cv-1",  step:1, category:"Phase 1 – Structural Analysis", title:"SFD, BMD & Truss Analysis", type:"lesson", xpReward:50, diamondReward:12,
        theory:{ summary:"Shear Force Diagram, Bending Moment Diagram, and method of joints for trusses.", keyPoints:["SFD slope = distributed load intensity","BMD slope = shear force","Simply supported beam: max BM at centre under UDL = wL²/8"], formula:"M_max = wL² / 8 (UDL on simply supported beam)" },
        questions:[{prompt:"Maximum bending moment for UDL on a simply supported beam?", options:["wL/2","wL²/4","wL²/8","wL²/12"], correct:2, explanation:"For UDL w on span L: M_max = wL²/8 at mid-span."}]},
      { id:"cv-2",  step:2, category:"Phase 1 – Structural Analysis", title:"RCC Design: Beam, Column & Slab", type:"lesson", xpReward:60, diamondReward:15,
        theory:{ summary:"Reinforced concrete design principles, IS 456-2000, limit state method, and steel detailing.", keyPoints:["Clear cover: 40mm for footing, 25mm for slab","Minimum steel in beam: 0.85bd/fy","Effective depth d = Total depth - cover - bar radius"] },
        questions:[{prompt:"Minimum clear cover for reinforcement in a footing?", options:["15mm","25mm","40mm","50mm"], correct:2, explanation:"IS 456-2000: minimum clear cover for footings is 40mm (exposure to soil)."}]},
      { id:"cv-chest-1", step:3, category:"Phase 1 – Structural Analysis", title:"🎁 Structural Analysis Chest", type:"chest", xpReward:100, diamondReward:40 },
      { id:"cv-3",  step:4, category:"Phase 2 – Geotechnical & Transportation", title:"Soil Mechanics: Shear Strength & Bearing Capacity", type:"lesson", xpReward:70, diamondReward:18,
        theory:{ summary:"Mohr-Coulomb failure criterion, Terzaghi's bearing capacity, and consolidation theory.", keyPoints:["Shear strength τ = c + σ tanφ","Terzaghi's ultimate BC: qu = cNc + qNq + 0.5γBNγ","Primary consolidation: Cc/(1+e₀) × log(σ₂/σ₁)"], formula:"τ = c + σ tan(φ)" },
        questions:[{prompt:"Mohr-Coulomb failure criterion relates shear strength to?", options:["Only cohesion","Only friction angle","Cohesion + normal stress × tan(φ)","Only normal stress"], correct:2, explanation:"τ = c + σ·tanφ — both cohesion c and friction angle φ contribute."}]},
      { id:"cv-boss-1", step:5, category:"Phase 3 – Placement Boss 🏆", title:"BOSS: Civil Engineering Final Placement Round", type:"boss", xpReward:500, diamondReward:200,
        questions:[
          {prompt:"Water-cement ratio increase causes concrete strength to?", options:["Increase","Decrease","Remain same","First increase then decrease"], correct:1, explanation:"Higher w/c ratio increases workability but reduces strength and durability."},
          {prompt:"The softening point test for bitumen determines?", options:["Flash point","Viscosity","Temperature at which bitumen softens under load","Ductility"], correct:2, explanation:"Ring and Ball test measures the temperature at which bitumen softens under standardized conditions."}
        ]},
    ];
  }

  // ── IT ────────────────────────────────────────────────────────────────────
  return [
    { id:"it-1",  step:1, category:"Phase 1 – Networking & OS", title:"OSI Model, TCP/IP & Network Protocols", type:"lesson", xpReward:50, diamondReward:12,
      theory:{ summary:"7-layer OSI model, TCP/IP stack, DNS resolution, HTTP/HTTPS, and subnet calculations.", keyPoints:["Layer 4 (Transport): TCP provides reliability via ACK","DNS: UDP port 53, resolves domain→IP","CIDR /24 → 254 usable hosts"], formula:"Usable hosts = 2^(32-prefix) - 2" },
      questions:[{prompt:"Which OSI layer is responsible for end-to-end reliability?", options:["Layer 2 (Data Link)","Layer 3 (Network)","Layer 4 (Transport)","Layer 7 (Application)"], correct:2, explanation:"Transport layer (Layer 4) provides end-to-end error detection, flow control, and reliability via TCP."}]},
    { id:"it-2",  step:2, category:"Phase 1 – Networking & OS", title:"Linux OS: Commands, Permissions & Shell Scripting", type:"lesson", xpReward:50, diamondReward:12,
      theory:{ summary:"Essential Linux commands, file permissions (chmod), process management, and bash scripting.", keyPoints:["chmod 755: owner rwx, group r-x, others r-x","ps aux | grep process — find running processes","crontab -e schedules recurring jobs"],
        code:"#!/bin/bash\n# Backup script\nDATE=$(date +%Y%m%d)\ntar -czf /backup/backup_$DATE.tar.gz /var/www\necho 'Backup complete: backup_'$DATE'.tar.gz'" },
      questions:[{prompt:"chmod 755 sets permissions to?", options:["rwxrwxrwx","rwxr-xr-x","rw-r--r--","rwxrwxr-x"], correct:1, explanation:"7=rwx, 5=r-x, 5=r-x → owner full, group/others read+execute."}]},
    { id:"it-chest-1", step:3, category:"Phase 1 – Networking & OS", title:"🎁 Networking Champion Chest", type:"chest", xpReward:100, diamondReward:40 },
    { id:"it-3",  step:4, category:"Phase 2 – Cloud & DevOps", title:"Cloud Computing: AWS Core Services", type:"lesson", xpReward:70, diamondReward:18,
      theory:{ summary:"AWS EC2, S3, RDS, Lambda, CloudFront, and IAM — the core services for cloud engineer interviews.", keyPoints:["EC2: virtual machines; Auto Scaling Groups manage load","S3: object storage with 11 9s durability; versioning + lifecycle policies","Lambda: serverless functions, triggered by events, max 15 min timeout"],
        code:"# AWS CLI deploy\naws s3 cp dist/ s3://my-bucket/ --recursive\naws cloudfront create-invalidation \\\n  --distribution-id E123 \\\n  --paths '/*'" },
      questions:[{prompt:"AWS service providing serverless compute with event triggers?", options:["EC2","ECS","Lambda","Elastic Beanstalk"], correct:2, explanation:"AWS Lambda runs code without provisioning servers, triggered by S3, API Gateway, DynamoDB events."}]},
    { id:"it-4",  step:5, category:"Phase 2 – Cloud & DevOps", title:"Docker, Kubernetes & CI/CD Pipelines", type:"lesson", xpReward:80, diamondReward:22,
      theory:{ summary:"Containerization with Docker, orchestration with Kubernetes, and CI/CD with GitHub Actions.", keyPoints:["Docker image = read-only template; container = running instance","K8s Pod = smallest deployable unit; Deployment manages replica sets","GitHub Actions: .github/workflows/*.yml defines pipelines"],
        code:"# Dockerfile best practices\nFROM node:20-alpine\nWORKDIR /app\nCOPY package*.json ./\nRUN npm ci --only=production\nCOPY . .\nEXPOSE 3000\nCMD [\"node\",\"server.js\"]" },
      questions:[{prompt:"In Kubernetes, which resource ensures a desired number of pod replicas?", options:["Pod","Service","Deployment","ConfigMap"], correct:2, explanation:"Deployment manages a ReplicaSet which maintains the desired number of running pods."}]},
    { id:"it-boss-1", step:6, category:"Phase 3 – Placement Boss 🏆", title:"BOSS: IT / Cloud Engineer Final Round", type:"boss", xpReward:500, diamondReward:200,
      questions:[
        {prompt:"Which SQL command retrieves only unique values?", options:["UNIQUE","DISTINCT","GROUP","FILTER"], correct:1, explanation:"SELECT DISTINCT column removes duplicate values in result set."},
        {prompt:"REST vs GraphQL: key difference?", options:["REST is faster","GraphQL allows clients to request exact data fields needed","REST supports real-time","GraphQL only works with MongoDB"], correct:1, explanation:"GraphQL lets clients specify exact fields, preventing over/under-fetching unlike REST's fixed endpoints."}
      ]},
  ];
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
export default function LearningGamePath({ branchId = "cse", roleId, onNodeComplete }: LearningGamePathProps) {
  const [userXp, setUserXp] = useState(() => parseInt(localStorage.getItem("user_xp") || "0", 10));
  const [userDiamonds, setUserDiamonds] = useState(() => parseInt(localStorage.getItem("user_diamonds") || "0", 10));
  const [completedIds, setCompletedIds] = useState<Set<string>>(() => {
    try { return new Set(JSON.parse(localStorage.getItem("completed_ids") || "[]")); }
    catch { return new Set(); }
  });

  const [activeNode, setActiveNode] = useState<LessonNode | null>(null);
  const [step, setStep] = useState<"theory" | "quiz">("theory");
  const [qIdx, setQIdx] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [showReward, setShowReward] = useState(false);
  const [lastCompleted, setLastCompleted] = useState<LessonNode | null>(null);

  const nodes = useMemo(() => getCoursePath(branchId || "cse", roleId), [branchId, roleId]);

  // Group into phases
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

  const handleNext = () => {
    if (!activeNode?.questions) return;
    const q = activeNode.questions[qIdx];
    if (selected === q.correct) {/* score */ }
    if (qIdx + 1 < activeNode.questions.length) {
      setQIdx(q => q + 1); setSelected(null); setSubmitted(false);
    } else {
      completeNode(activeNode);
    }
  };

  // Node icon
  const nodeIcon = (n: LessonNode, done: boolean, unlocked: boolean) => {
    if (done) return <CheckCircle2 size={30} className="text-slate-950 stroke-[2.5]" />;
    if (!unlocked) return <Lock size={24} className="text-slate-600" />;
    if (n.type === "chest") return <Gift size={28} className="text-yellow-300 animate-bounce" />;
    if (n.type === "boss") return <Trophy size={28} className="text-amber-400" />;
    if (n.type === "code") return <Code2 size={26} className="text-cyan-300" />;
    return <BookOpen size={26} className="text-white" />;
  };

  // Next unlocked node
  const nextNode = nodes.find(n => !completedIds.has(n.id));

  return (
    <div className="w-full space-y-8 pb-20 text-slate-100">

      {/* ── HERO HEADER ── */}
      <div className="relative overflow-hidden rounded-3xl p-6 bg-gradient-to-br from-slate-900 via-purple-950/60 to-slate-950 border border-purple-500/30 shadow-2xl">
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <div className="flex flex-wrap gap-2 mb-2">
              <span className="text-[11px] font-bold uppercase tracking-widest text-purple-400 bg-purple-500/10 px-3 py-1 rounded-full border border-purple-500/20">
                {branchId?.toUpperCase() || "CSE"} — Step-by-Step Learning Path
              </span>
              {nextNode && (
                <span className="text-[11px] font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20 animate-pulse">
                  ▶ Continue: Step {nextNode.step}
                </span>
              )}
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-2">
              Your Placement Journey <Sparkles size={22} className="text-amber-400" />
            </h2>
            <p className="text-sm text-slate-400 mt-1">Complete every step in order — Theory → Practice → Earn Rewards → Unlock Next</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-sm font-bold">
              <Zap size={15} /> {userXp} XP
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-sm font-bold">
              <Gem size={15} /> {userDiamonds} 💎
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-300 text-sm font-bold">
              {currentLeague.icon} {currentLeague.name}
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-4">
          <div className="flex justify-between text-xs text-slate-500 mb-1">
            <span>{completedIds.size} / {nodes.length} steps complete</span>
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

      {/* ── ONE-CLICK START BUTTON (for new users) ── */}
      {completedIds.size === 0 && nextNode && (
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={() => openNode(nextNode)}
          className="w-full py-5 rounded-3xl bg-gradient-to-r from-purple-600 via-cyan-500 to-emerald-500 text-white font-extrabold text-lg shadow-2xl shadow-purple-500/30 flex items-center justify-center gap-3 hover:scale-[1.01] transition-transform"
        >
          <Sparkles size={24} />
          Start Your {branchId?.toUpperCase()} Placement Journey — Step 1
          <ArrowRight size={24} />
        </motion.button>
      )}

      {/* ── PHASE-BY-PHASE LEARNING PATH ── */}
      <div className="space-y-10">
        {phases.map(([category, phaseNodes]) => (
          <div key={category} className="space-y-4">
            {/* Phase header */}
            <div className="flex items-center gap-3">
              <div className="h-px flex-1 bg-slate-800" />
              <span className="text-xs font-bold uppercase tracking-widest text-slate-400 px-4 py-1.5 rounded-full border border-slate-800 bg-slate-900 whitespace-nowrap">
                {category}
              </span>
              <div className="h-px flex-1 bg-slate-800" />
            </div>

            {/* Zig-zag node path */}
            <div className="flex flex-col items-center gap-10 relative">
              {phaseNodes.map((node, idx) => {
                const done = completedIds.has(node.id);
                const unlocked = isUnlocked(node);
                const offsets = [0, -100, 100, -60, 60, 0, -80, 80];
                const xOffset = offsets[idx % offsets.length];

                return (
                  <div key={node.id} className="flex flex-col items-center relative" style={{ transform: `translateX(${xOffset}px)` }}>
                    {/* Connector line */}
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
                      {unlocked && !done && (
                        <div className="absolute -inset-1.5 rounded-full border-2 border-cyan-400/40 animate-ping pointer-events-none" />
                      )}
                      {/* Step badge */}
                      <span className="absolute -top-1 -left-1 w-5 h-5 rounded-full bg-slate-900 border border-slate-700 text-[9px] font-bold text-slate-400 flex items-center justify-center">
                        {node.step}
                      </span>
                    </motion.button>

                    <div className="mt-2 text-center max-w-[180px]">
                      <p className="text-xs font-bold text-white line-clamp-2">{node.title}</p>
                      <div className="flex items-center justify-center gap-2 mt-0.5">
                        <span className="text-[10px] text-amber-400 font-mono">+{node.xpReward} XP</span>
                        <span className="text-[10px] text-cyan-400 font-mono">+{node.diamondReward}💎</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* ── NODE LESSON MODAL ── */}
      <AnimatePresence>
        {activeNode && activeNode.type !== "chest" && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-lg">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-slate-900 border border-purple-500/30 shadow-2xl p-6 md:p-8 space-y-5"
            >
              <button onClick={() => setActiveNode(null)} className="absolute top-5 right-5 p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors">
                <X size={18} />
              </button>

              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-purple-400">Step {activeNode.step} • {activeNode.category}</span>
                <h3 className="text-xl font-extrabold text-white mt-1">{activeNode.title}</h3>
                <div className="flex gap-2 mt-1">
                  <span className="text-xs text-amber-400 font-mono">+{activeNode.xpReward} XP</span>
                  <span className="text-xs text-cyan-400 font-mono">+{activeNode.diamondReward} 💎</span>
                </div>
              </div>

              {/* THEORY PANEL */}
              {step === "theory" && activeNode.theory && (
                <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-purple-950/40 border border-purple-500/20 text-slate-200 text-sm leading-relaxed">
                    {activeNode.theory.summary}
                  </div>

                  <div className="space-y-1.5">
                    {activeNode.theory.keyPoints.map((kp, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
                        <CheckCircle2 size={14} className="text-emerald-400 shrink-0 mt-0.5" />
                        <span>{kp}</span>
                      </div>
                    ))}
                  </div>

                  {activeNode.theory.formula && (
                    <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 font-mono text-xs">
                      ⚡ {activeNode.theory.formula}
                    </div>
                  )}

                  {activeNode.theory.code && (
                    <pre className="p-4 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-xs text-cyan-300 overflow-x-auto">
                      <code>{activeNode.theory.code}</code>
                    </pre>
                  )}

                  {activeNode.questions?.length ? (
                    <button onClick={() => setStep("quiz")}
                      className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-bold text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
                      Start Practice <ArrowRight size={16} />
                    </button>
                  ) : (
                    <button onClick={() => completeNode(activeNode)}
                      className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-bold text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
                      Mark Complete & Earn Rewards <Gift size={16} />
                    </button>
                  )}
                </div>
              )}

              {/* QUIZ PANEL */}
              {step === "quiz" && activeNode.questions && activeNode.questions[qIdx] && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center text-xs text-slate-500">
                    <span>Question {qIdx + 1} / {activeNode.questions.length}</span>
                    <span className="text-amber-400 font-mono">+{activeNode.xpReward} XP on completion</span>
                  </div>

                  <p className="text-base font-bold text-white">{activeNode.questions[qIdx].prompt}</p>

                  <div className="space-y-2">
                    {activeNode.questions[qIdx].options.map((opt, i) => {
                      const correct = i === activeNode.questions![qIdx].correct;
                      const picked = selected === i;
                      let cls = "bg-slate-950 border-slate-800 text-slate-300 hover:border-purple-500/50";
                      if (submitted) {
                        if (correct) cls = "bg-emerald-950/60 border-emerald-500 text-emerald-200";
                        else if (picked) cls = "bg-rose-950/60 border-rose-500 text-rose-300";
                      } else if (picked) cls = "bg-purple-950/60 border-purple-400 text-white";
                      return (
                        <button key={i} onClick={() => !submitted && setSelected(i)}
                          className={`w-full p-3.5 rounded-2xl border text-left text-sm font-medium transition-all ${cls}`}>
                          {opt}
                        </button>
                      );
                    })}
                  </div>

                  {submitted && (
                    <div className={`p-3.5 rounded-xl border text-xs leading-relaxed ${
                      selected === activeNode.questions[qIdx].correct
                        ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-300"
                        : "bg-rose-500/10 border-rose-500/30 text-rose-300"}`}>
                      <p className="font-bold mb-1">{selected === activeNode.questions[qIdx].correct ? "🎉 Correct!" : "❌ Not quite"}</p>
                      <p>{activeNode.questions[qIdx].explanation}</p>
                    </div>
                  )}

                  {!submitted
                    ? <button disabled={selected === null} onClick={() => setSubmitted(true)}
                        className="w-full py-3.5 rounded-2xl bg-purple-600 disabled:opacity-40 text-white font-bold text-sm hover:bg-purple-500 transition-colors">
                        Check Answer
                      </button>
                    : <button onClick={handleNext}
                        className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-bold text-sm flex items-center justify-center gap-2 hover:opacity-90">
                        Continue <ArrowRight size={16} />
                      </button>
                  }
                </div>
              )}
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
