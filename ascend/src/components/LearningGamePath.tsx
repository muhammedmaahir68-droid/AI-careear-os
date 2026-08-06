import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Trophy, Flame, Gem, Star, Lock, CheckCircle2, Play, Sparkles,
  BookOpen, Code2, Award, ChevronRight, Gift, HelpCircle, ArrowRight,
  Shield, RefreshCw, Zap, X, BrainCircuit
} from "lucide-react";
import GamificationModal, { LEAGUES } from "./GamificationModal";
import { recordUserProgress } from "../services/api";

export interface PathNode {
  id: string;
  unitId: number;
  title: string;
  subtitle: string;
  type: "lesson" | "quiz" | "chest" | "boss";
  xpReward: number;
  diamondReward: number;
  department: string;
  theoryNotes?: {
    summary: string;
    keyPoints: string[];
    codeSnippet?: string;
    formula?: string;
  };
  questions?: Array<{
    prompt: string;
    options: string[];
    correctAnswer: number;
    explanation: string;
  }>;
}

interface LearningGamePathProps {
  branchId?: string | null;
  onNodeComplete?: (xp: number, diamonds: number) => void;
}

const GAME_UNITS = [
  { id: 1, title: "Unit 1: Core Foundations", desc: "Build solid fundamentals, mathematics & core department theory", color: "from-cyan-500 to-blue-600" },
  { id: 2, title: "Unit 2: Specialized Architecture & Systems", desc: "Master specialized domain modules & system design", color: "from-purple-500 to-indigo-600" },
  { id: 3, title: "Unit 3: Advanced Optimization & Algorithms", desc: "High-level domain optimization, algorithms & placement prep", color: "from-amber-500 to-orange-600" },
  { id: 4, title: "Unit 4: MNC Tier-1 Placement Boss Challenge", desc: "Real company interview questions & product engineering test", color: "from-emerald-500 to-teal-600" },
];

// ─── BRANCH-SPECIFIC PATH NODE GENERATOR ───
export function getBranchNodes(branchId: string = "cse"): PathNode[] {
  const b = branchId.toLowerCase();

  if (b === "aiml" || b === "aids") {
    return [
      {
        id: "aiml-1", unitId: 1, title: "Linear Regression & Gradient Descent", subtitle: "Unit 1 • Step 1", type: "lesson", xpReward: 60, diamondReward: 20, department: "aiml",
        theoryNotes: {
          summary: "Linear regression predicts continuous targets by minimizing Mean Squared Error (MSE) via Gradient Descent.",
          keyPoints: ["Hypothesis: h(x) = θᵀX", "MSE Cost Function J(θ) = (1/2m)Σ(h-y)²", "Batch vs Stochastic vs Mini-Batch GD"],
          formula: "J(θ) = (1/2m) Σ (h_θ(x^(i)) - y^(i))^2",
          codeSnippet: "import numpy as np\ndef gradient_descent(X, y, lr=0.01, epochs=1000):\n    m, n = X.shape\n    w = np.zeros(n)\n    for _ in range(epochs):\n        grad = (1/m) * X.T @ (X @ w - y)\n        w -= lr * grad\n    return w",
        },
        questions: [
          { prompt: "What does the cost function J(θ) measure in Linear Regression?", options: ["Classification Accuracy", "Mean Squared Error between prediction & target", "Number of iterations", "Learning rate"], correctAnswer: 1, explanation: "MSE measures average squared difference between predictions and ground truth." }
        ]
      },
      {
        id: "aiml-2", unitId: 1, title: "Logistic Regression & Classification", subtitle: "Unit 1 • Step 2", type: "quiz", xpReward: 80, diamondReward: 25, department: "aiml",
        theoryNotes: {
          summary: "Binary classification using Sigmoid function σ(z) = 1/(1+e^-z) and Cross-Entropy Loss.",
          keyPoints: ["Sigmoid outputs probabilities in range (0, 1)", "F1-Score is harmonic mean of Precision & Recall", "Decision boundary: θᵀX = 0"],
          formula: "σ(z) = 1 / (1 + e^-z)",
        },
        questions: [
          { prompt: "What is the output range of the Sigmoid activation function?", options: ["(-∞, ∞)", "(-1, 1)", "(0, 1)", "[0, 1]"], correctAnswer: 2, explanation: "Sigmoid maps any real number to the open interval (0, 1)." }
        ]
      },
      { id: "aiml-chest-1", unitId: 1, title: "Diamond Chest Milestone 1", subtitle: "Bonus Loot", type: "chest", xpReward: 150, diamondReward: 50, department: "aiml" },
      {
        id: "aiml-3", unitId: 1, title: "Neural Networks & Backpropagation", subtitle: "Unit 1 • Step 3", type: "lesson", xpReward: 120, diamondReward: 35, department: "aiml",
        theoryNotes: {
          summary: "Feed-forward neural networks compute layer outputs in forward pass and update weights using chain rule in backpropagation.",
          keyPoints: ["ReLU avoids vanishing gradients: max(0, x)", "Adam optimizer combines momentum and RMSprop", "Dropout randomly zeroes neurons to prevent overfitting"],
          formula: "Chain Rule: ∂L/∂w = ∂L/∂a · ∂a/∂z · ∂z/∂w",
          codeSnippet: "import torch.nn as nn\nmodel = nn.Sequential(\n    nn.Linear(784, 128),\n    nn.ReLU(),\n    nn.Dropout(0.2),\n    nn.Linear(128, 10)\n)",
        },
        questions: [
          { prompt: "Which activation function is defined as max(0, x)?", options: ["Sigmoid", "Tanh", "ReLU", "Softmax"], correctAnswer: 2, explanation: "ReLU (Rectified Linear Unit) is max(0, x)." }
        ]
      },
      {
        id: "aiml-boss-1", unitId: 1, title: "AIML Unit 1 Boss Challenge", subtitle: "ML Placement Test", type: "boss", xpReward: 250, diamondReward: 100, department: "aiml",
        questions: [
          { prompt: "In Attention Mechanism (Transformers), why is QKᵀ divided by √dk?", options: ["To reduce memory", "To prevent softmax saturation for large dk", "To double speed", "To normalize vectors"], correctAnswer: 1, explanation: "Scaling by √dk keeps dot products from growing too large and saturating softmax gradients." }
        ]
      }
    ];
  }

  if (b === "ece") {
    return [
      {
        id: "ece-1", unitId: 1, title: "Digital Logic Design & K-Maps", subtitle: "Unit 1 • Step 1", type: "lesson", xpReward: 60, diamondReward: 20, department: "ece",
        theoryNotes: {
          summary: "Logic gates, De Morgan's theorems, and Karnaugh maps for Boolean simplification.",
          keyPoints: ["NAND and NOR are universal gates", "De Morgan: (A·B)' = A' + B'", "K-map groups 1s in powers of 2 (1, 2, 4, 8)"],
          formula: "De Morgan: (A · B)' = A' + B'",
        },
        questions: [
          { prompt: "Which gate is known as a universal gate?", options: ["AND", "OR", "NAND", "XOR"], correctAnswer: 2, explanation: "NAND and NOR gates can implement any Boolean function." }
        ]
      },
      {
        id: "ece-2", unitId: 1, title: "Signals & LTI Systems", subtitle: "Unit 1 • Step 2", type: "quiz", xpReward: 80, diamondReward: 25, department: "ece",
        theoryNotes: {
          summary: "Continuous and discrete signals, Fourier Transform, convolution, and Nyquist sampling theorem.",
          keyPoints: ["Nyquist Rate fs ≥ 2·fmax", "LTI system output y(t) = x(t) * h(t)", "Aliasing occurs if sampling rate < 2·fmax"],
          formula: "fs ≥ 2 × f_max",
        },
        questions: [
          { prompt: "If max signal frequency is 4 kHz, what is the minimum Nyquist sampling rate?", options: ["4 kHz", "8 kHz", "16 kHz", "2 kHz"], correctAnswer: 1, explanation: "Nyquist rate = 2 × fmax = 2 × 4 kHz = 8 kHz." }
        ]
      },
      { id: "ece-chest-1", unitId: 1, title: "Diamond Chest Milestone 1", subtitle: "Bonus Loot", type: "chest", xpReward: 150, diamondReward: 50, department: "ece" },
      {
        id: "ece-3", unitId: 1, title: "8085 / 8086 Microprocessors", subtitle: "Unit 1 • Step 3", type: "lesson", xpReward: 110, diamondReward: 35, department: "ece",
        theoryNotes: {
          summary: "8085 (8-bit) and 8086 (16-bit) architecture, segmented memory, flags, and interrupts.",
          keyPoints: ["8086 has 20-bit address bus (1MB memory)", "Physical Address = Segment × 16 + Offset", "TRAP is highest priority non-maskable interrupt"],
          formula: "Physical Address = (Segment × 10h) + Offset",
        },
        questions: [
          { prompt: "How wide is the address bus of the 8085 microprocessor?", options: ["8 bits", "16 bits", "20 bits", "32 bits"], correctAnswer: 1, explanation: "8085 has a 16-bit address bus allowing 64KB memory addressing." }
        ]
      },
      {
        id: "ece-boss-1", unitId: 1, title: "ECE Unit 1 Boss Exam", subtitle: "Core ECE Placement Test", type: "boss", xpReward: 250, diamondReward: 100, department: "ece",
        questions: [
          { prompt: "Shannon's channel capacity formula is:", options: ["C = B × SNR", "C = B × log2(1 + SNR)", "C = 2B × log2(M)", "C = B / SNR"], correctAnswer: 1, explanation: "C = B·log2(1+SNR) gives max data rate in bits/sec." }
        ]
      }
    ];
  }

  if (b === "eee") {
    return [
      {
        id: "eee-1", unitId: 1, title: "Circuit Theory: KVL, KCL & Thevenin", subtitle: "Unit 1 • Step 1", type: "lesson", xpReward: 60, diamondReward: 20, department: "eee",
        theoryNotes: {
          summary: "Kirchhoff's laws, Thevenin/Norton equivalent circuits, and maximum power transfer.",
          keyPoints: ["KCL: Σi = 0 at node", "KVL: Σv = 0 around loop", "Max power when RL = Rth: Pmax = Vth² / 4Rth"],
          formula: "P_max = V_th^2 / (4 · R_th)",
        },
        questions: [
          { prompt: "Kirchhoff's Current Law (KCL) is based on conservation of:", options: ["Energy", "Charge", "Momentum", "Mass"], correctAnswer: 1, explanation: "KCL states total charge entering a node equals charge leaving it." }
        ]
      },
      {
        id: "eee-2", unitId: 1, title: "DC Machines & Transformers", subtitle: "Unit 1 • Step 2", type: "quiz", xpReward: 80, diamondReward: 25, department: "eee",
        theoryNotes: {
          summary: "EMF equation, speed control of DC motors, and transformer EMF equation E = 4.44fΦN.",
          keyPoints: ["EMF E = (PΦNZ)/(60A)", "Torque T ∝ Φ·Ia", "Transformer turns ratio V1/V2 = N1/N2"],
          formula: "E = (P · Φ · N · Z) / (60 · A)",
        },
        questions: [
          { prompt: "In a DC generator, EMF equation is E = ", options: ["PΦNZ/(60A)", "4.44fΦN", "BLv", "-dΦ/dt"], correctAnswer: 0, explanation: "E = PΦNZ/(60A) where P=poles, Φ=flux, N=rpm, Z=conductors, A=paths." }
        ]
      },
      { id: "eee-chest-1", unitId: 1, title: "Diamond Chest Milestone 1", subtitle: "Bonus Loot", type: "chest", xpReward: 150, diamondReward: 50, department: "eee" },
      {
        id: "eee-boss-1", unitId: 1, title: "EEE Unit 1 Boss Exam", subtitle: "Core EEE Placement Test", type: "boss", xpReward: 250, diamondReward: 100, department: "eee",
        questions: [
          { prompt: "In a 3-phase star (Y) system, Line Voltage VL is:", options: ["VL = VP", "VL = √3 × VP", "VL = VP / √3", "VL = 3 × VP"], correctAnswer: 1, explanation: "In star connection, Line Voltage = √3 × Phase Voltage." }
        ]
      }
    ];
  }

  if (b === "mech") {
    return [
      {
        id: "mech-1", unitId: 1, title: "Engineering Mechanics & Statics", subtitle: "Unit 1 • Step 1", type: "lesson", xpReward: 60, diamondReward: 20, department: "mech",
        theoryNotes: {
          summary: "Free body diagrams, force equilibrium ΣFx=0, ΣFy=0, ΣM=0, and friction laws.",
          keyPoints: ["Equilibrium requires force & moment balance", "Friction force F = μN", "Parallel axis theorem: I = Icm + Ad²"],
          formula: "I = I_cm + A · d^2",
        },
        questions: [
          { prompt: "Which condition is required for static equilibrium?", options: ["ΣF = 0 only", "ΣM = 0 only", "ΣF = 0 and ΣM = 0", "ΣF > 0"], correctAnswer: 2, explanation: "Static equilibrium requires both force balance and moment balance." }
        ]
      },
      {
        id: "mech-2", unitId: 1, title: "Thermodynamics & Engine Cycles", subtitle: "Unit 1 • Step 2", type: "quiz", xpReward: 80, diamondReward: 25, department: "mech",
        theoryNotes: {
          summary: "Laws of thermodynamics, Carnot cycle efficiency η = 1 - Tc/Th, and Otto/Diesel cycles.",
          keyPoints: ["First Law: ΔU = Q - W", "Second Law: Entropy increases (dS ≥ δQ/T)", "Otto efficiency η = 1 - 1/r^(γ-1)"],
          formula: "η_carnot = 1 - T_cold / T_hot",
        },
        questions: [
          { prompt: "Carnot efficiency between 500K and 300K is:", options: ["20%", "30%", "40%", "60%"], correctAnswer: 2, explanation: "η = 1 - 300/500 = 0.4 = 40%." }
        ]
      },
      { id: "mech-chest-1", unitId: 1, title: "Diamond Chest Milestone 1", subtitle: "Bonus Loot", type: "chest", xpReward: 150, diamondReward: 50, department: "mech" },
      {
        id: "mech-boss-1", unitId: 1, title: "MECH Unit 1 Boss Exam", subtitle: "Core Mechanical Placement Test", type: "boss", xpReward: 250, diamondReward: 100, department: "mech",
        questions: [
          { prompt: "Reynolds number Re < 2000 indicates which flow regime?", options: ["Turbulent", "Laminar", "Transition", "Supersonic"], correctAnswer: 1, explanation: "Re < 2000 corresponds to laminar flow." }
        ]
      }
    ];
  }

  // Default to CSE
  return [
    {
      id: "cse-1", unitId: 1, title: "Number Systems & Math Basics", subtitle: "Unit 1 • Step 1", type: "lesson", xpReward: 50, diamondReward: 15, department: "cse",
      theoryNotes: {
        summary: "Understand number representation, divisibility rules, HCF/LCM, and unit digit calculation.",
        keyPoints: [
          "HCF × LCM = Product of two numbers",
          "Unit digit of 7^n follows a 4-step cycle: 7, 9, 3, 1",
          "Sum of first n natural numbers = n(n+1)/2",
        ],
        formula: "HCF(a, b) × LCM(a, b) = a × b",
        codeSnippet: "def find_lcm(a, b):\n    import math\n    return (a * b) // math.gcd(a, b)",
      },
      questions: [
        { prompt: "What is the HCF of 36 and 48?", options: ["6", "12", "18", "24"], correctAnswer: 1, explanation: "36 = 2² × 3², 48 = 2⁴ × 3. HCF = 2² × 3 = 12." },
        { prompt: "What is the unit digit of 7^105?", options: ["1", "3", "7", "9"], correctAnswer: 2, explanation: "7^n cycle is 7, 9, 3, 1 (period 4). 105 mod 4 = 1. So 7^1 = 7." },
      ]
    },
    {
      id: "cse-2", unitId: 1, title: "Arrays & Memory Allocation", subtitle: "Unit 1 • Step 2", type: "quiz", xpReward: 75, diamondReward: 20, department: "cse",
      theoryNotes: {
        summary: "Arrays provide contiguous memory storage with O(1) random access by index.",
        keyPoints: ["Address = Base + Index × Size", "Kadane's algorithm finds max subarray sum in O(n)", "Row-major vs Column-major memory layout"],
        formula: "Address(A[i]) = BaseAddress + i × sizeof(element)",
        codeSnippet: "function maxSubArray(nums) {\n  let max = nums[0], curr = nums[0];\n  for (let i = 1; i < nums.length; i++) {\n    curr = Math.max(nums[i], curr + nums[i]);\n    max = Math.max(max, curr);\n  }\n  return max;\n}",
      },
      questions: [
        { prompt: "What is the time complexity to access an element by index in an array?", options: ["O(1)", "O(n)", "O(log n)", "O(n²)"], correctAnswer: 0, explanation: "Array memory is contiguous, enabling direct pointer calculation in O(1) time." },
        { prompt: "What is the max subarray sum for [-2, 1, -3, 4, -1, 2, 1, -5, 4]?", options: ["4", "5", "6", "7"], correctAnswer: 2, explanation: "Using Kadane's algorithm, [4, -1, 2, 1] yields maximum sum = 6." }
      ]
    },
    { id: "cse-chest-1", unitId: 1, title: "Diamond Chest Milestone 1", subtitle: "Bonus Loot", type: "chest", xpReward: 150, diamondReward: 50, department: "cse" },
    {
      id: "cse-3", unitId: 1, title: "Linked Lists & Cycle Detection", subtitle: "Unit 1 • Step 3", type: "lesson", xpReward: 100, diamondReward: 25, department: "cse",
      theoryNotes: {
        summary: "Dynamic node allocations connected via pointers. Floyd's tortoise and hare detects cycles.",
        keyPoints: ["O(1) insertion/deletion at head", "Floyd's algorithm uses 2 pointers: slow (1x) and fast (2x)", "Doubly linked list allows bidirectional traversal"],
        codeSnippet: "function hasCycle(head) {\n  let slow = head, fast = head;\n  while (fast && fast.next) {\n    slow = slow.next;\n    fast = fast.next.next;\n    if (slow === fast) return true;\n  }\n  return false;\n}",
      },
      questions: [
        { prompt: "Floyd's cycle detection algorithm uses how many pointers?", options: ["One", "Two (Slow & Fast)", "Three", "Stack memory"], correctAnswer: 1, explanation: "Floyd's algorithm uses a slow pointer (1 step) and fast pointer (2 steps)." }
      ]
    },
    {
      id: "cse-boss-1", unitId: 1, title: "CSE Unit 1 Boss Exam", subtitle: "Placement Foundation Test", type: "boss", xpReward: 250, diamondReward: 100, department: "cse",
      questions: [
        { prompt: "Which data structure operates on Last-In-First-Out (LIFO)?", options: ["Queue", "Stack", "Heap", "Tree"], correctAnswer: 1, explanation: "Stacks strictly follow LIFO principles." },
        { prompt: "What is the average search time complexity in a Hash Table?", options: ["O(1)", "O(n)", "O(log n)", "O(n²)"], correctAnswer: 0, explanation: "Hash tables offer average O(1) time complexity with a good hash function." }
      ]
    }
  ];
}

export default function LearningGamePath({ branchId = "cse", onNodeComplete }: LearningGamePathProps) {
  const [userXp, setUserXp] = useState<number>(() => parseInt(localStorage.getItem("user_xp") || "350", 10));
  const [userDiamonds, setUserDiamonds] = useState<number>(() => parseInt(localStorage.getItem("user_diamonds") || "120", 10));
  const [completedNodeIds, setCompletedNodeIds] = useState<string[]>(() => {
    const saved = localStorage.getItem("completed_nodes");
    return saved ? JSON.parse(saved) : ["cse-1", "aiml-1", "ece-1", "eee-1", "mech-1"];
  });
  const [activeUnitId, setActiveUnitId] = useState<number>(1);
  const [selectedNode, setSelectedNode] = useState<PathNode | null>(null);

  // Dynamic Nodes based on active Branch ID
  const currentBranchNodes = getBranchNodes(branchId || "cse");

  // Modal State
  const [currentStep, setCurrentStep] = useState<"theory" | "quiz" | "complete">("theory");
  const [quizIndex, setQuizIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [showGamificationModal, setShowGamificationModal] = useState<boolean>(false);

  // Current user league
  const currentLeague = LEAGUES.slice().reverse().find(l => userXp >= l.minXp) || LEAGUES[0];

  const handleNodeClick = (node: PathNode, isUnlocked: boolean) => {
    if (!isUnlocked) return;

    setSelectedNode(node);
    setQuizIndex(0);
    setSelectedOption(null);
    setIsSubmitted(false);
    setScore(0);

    if (node.type === "chest") {
      completeNode(node);
    } else if (node.theoryNotes) {
      setCurrentStep("theory");
    } else {
      setCurrentStep("quiz");
    }
  };

  const completeNode = (node: PathNode) => {
    const newXp = userXp + node.xpReward;
    const newDiamonds = userDiamonds + node.diamondReward;

    setUserXp(newXp);
    setUserDiamonds(newDiamonds);
    localStorage.setItem("user_xp", newXp.toString());
    localStorage.setItem("user_diamonds", newDiamonds.toString());

    if (!completedNodeIds.includes(node.id)) {
      const nextCompleted = [...completedNodeIds, node.id];
      setCompletedNodeIds(nextCompleted);
      localStorage.setItem("completed_nodes", JSON.stringify(nextCompleted));
    }

    recordUserProgress({
      type: "lesson_complete",
      score: 100,
      xpEarned: node.xpReward,
      diamondsEarned: node.diamondReward
    });

    if (onNodeComplete) onNodeComplete(node.xpReward, node.diamondReward);
    setShowGamificationModal(true);
  };

  const handleNextQuizQuestion = () => {
    if (!selectedNode || !selectedNode.questions) return;

    if (selectedOption === selectedNode.questions[quizIndex].correctAnswer) {
      setScore(s => s + 1);
    }

    if (quizIndex + 1 < selectedNode.questions.length) {
      setQuizIndex(i => i + 1);
      setSelectedOption(null);
      setIsSubmitted(false);
    } else {
      setCurrentStep("complete");
      completeNode(selectedNode);
    }
  };

  const unitNodes = currentBranchNodes.filter(n => n.unitId === activeUnitId);

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8 pb-16 text-slate-100">
      {/* ─── GAMIFIED TOP HEADER ─── */}
      <div className="relative overflow-hidden p-6 rounded-3xl bg-gradient-to-r from-slate-900 via-purple-950/80 to-slate-900 border border-purple-500/30 shadow-2xl shadow-purple-950/50">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl -z-10" />

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-purple-400 bg-purple-500/10 px-3 py-1 rounded-full border border-purple-500/20">
                Duolingo Placement Path
              </span>
              <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                Branch: {branchId?.toUpperCase() || "CSE"}
              </span>
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight text-white flex items-center gap-3">
              Learning Path Roadmap <Sparkles size={24} className="text-amber-400 animate-spin" />
            </h2>
            <p className="text-sm text-slate-300">
              Clear stepping-stone nodes, unlock diamond chests, & advance to Placement Legend League!
            </p>
          </div>

          {/* Gamification Counters */}
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 font-bold text-sm shadow-md">
              <Gem size={18} className="text-cyan-400" />
              <span>{userDiamonds} 💎</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-300 font-bold text-sm shadow-md">
              <Zap size={18} className="text-amber-400" />
              <span>{userXp} XP</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-purple-500/10 border border-purple-500/30 text-purple-300 font-bold text-sm shadow-md">
              <span className="text-lg">{currentLeague.icon}</span>
              <span>{currentLeague.name}</span>
            </div>
          </div>
        </div>
      </div>

      {/* ─── UNIT SELECTOR TABS ─── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
        {GAME_UNITS.map(unit => {
          const isSelected = activeUnitId === unit.id;
          return (
            <button
              key={unit.id}
              onClick={() => setActiveUnitId(unit.id)}
              className={`p-4 rounded-2xl text-left border transition-all duration-300 relative overflow-hidden ${
                isSelected
                  ? "bg-gradient-to-b from-purple-900/60 to-slate-900 border-purple-400/60 shadow-lg shadow-purple-500/20 scale-[1.02]"
                  : "bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900"
              }`}
            >
              <span className="text-xs font-bold tracking-wider text-purple-400 uppercase block mb-1">
                Unit {unit.id}
              </span>
              <h4 className="text-sm font-bold text-white line-clamp-1">{unit.title}</h4>
              <p className="text-xs text-slate-400 line-clamp-2 mt-1">{unit.desc}</p>
              {isSelected && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-cyan-400" />
              )}
            </button>
          );
        })}
      </div>

      {/* ─── DUOLINGO ZIG-ZAG PATH CANVAS ─── */}
      <div className="relative py-12 px-4 rounded-3xl bg-slate-950/80 border border-slate-800 shadow-2xl flex flex-col items-center">
        {/* Background Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293715_1px,transparent_1px),linear-gradient(to_bottom,#1f293715_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

        <div className="w-full max-w-lg space-y-12 relative z-10">
          {unitNodes.map((node, index) => {
            const isCompleted = completedNodeIds.includes(node.id);
            const prevCompleted = index === 0 || completedNodeIds.includes(unitNodes[index - 1].id);
            const isUnlocked = isCompleted || prevCompleted;

            const offsets = [0, -75, 75, -50, 50, 0];
            const xOffset = offsets[index % offsets.length];

            return (
              <div
                key={node.id}
                className="flex flex-col items-center relative"
                style={{ transform: `translateX(${xOffset}px)` }}
              >
                {/* Connecting Line */}
                {index < unitNodes.length - 1 && (
                  <div className="absolute top-16 left-1/2 -translate-x-1/2 w-1 h-16 bg-gradient-to-b from-purple-500/40 to-slate-700/40 border-dashed border-l-2 border-purple-500/40 z-0" />
                )}

                {/* NODE BUTTON */}
                <motion.button
                  whileHover={{ scale: isUnlocked ? 1.1 : 1 }}
                  whileTap={{ scale: isUnlocked ? 0.95 : 1 }}
                  onClick={() => handleNodeClick(node, isUnlocked)}
                  disabled={!isUnlocked}
                  className={`relative w-20 h-20 rounded-full flex items-center justify-center font-bold shadow-2xl transition-all z-10 border-4 ${
                    isCompleted
                      ? "bg-gradient-to-tr from-amber-500 to-yellow-400 border-amber-300 shadow-amber-500/30 text-slate-950"
                      : isUnlocked
                      ? "bg-gradient-to-tr from-purple-600 to-cyan-500 border-cyan-300 shadow-purple-500/40 text-white animate-pulse"
                      : "bg-slate-900 border-slate-800 text-slate-600 cursor-not-allowed"
                  }`}
                >
                  {isCompleted ? (
                    <CheckCircle2 size={36} className="text-slate-950 stroke-[2.5]" />
                  ) : !isUnlocked ? (
                    <Lock size={28} className="text-slate-600" />
                  ) : node.type === "chest" ? (
                    <Gift size={32} className="text-yellow-300 animate-bounce" />
                  ) : node.type === "boss" ? (
                    <Trophy size={32} className="text-amber-400" />
                  ) : (
                    <BookOpen size={30} className="text-white" />
                  )}

                  {isUnlocked && !isCompleted && (
                    <div className="absolute -inset-2 rounded-full border-2 border-cyan-400/50 animate-ping pointer-events-none" />
                  )}
                </motion.button>

                {/* Node Label & Rewards */}
                <div className="mt-3 text-center max-w-xs">
                  <span className="text-[10px] font-bold tracking-wider uppercase px-2.5 py-0.5 rounded-full bg-slate-900 border border-slate-800 text-slate-400 inline-block mb-1">
                    {node.subtitle}
                  </span>
                  <h5 className="text-sm font-bold text-white line-clamp-1">{node.title}</h5>
                  <div className="flex items-center justify-center gap-2 mt-1">
                    <span className="text-[11px] font-mono text-amber-400">+{node.xpReward} XP</span>
                    <span className="text-[11px] font-mono text-cyan-400">+{node.diamondReward} 💎</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ─── INTERACTIVE NODE MODAL ─── */}
      <AnimatePresence>
        {selectedNode && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 md:p-8 rounded-3xl bg-slate-900 border border-purple-500/30 shadow-2xl shadow-purple-950/80 text-left space-y-6"
            >
              <button
                onClick={() => setSelectedNode(null)}
                className="absolute top-6 right-6 p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>

              <div className="space-y-1 pr-10">
                <span className="text-xs font-bold tracking-wider text-purple-400 uppercase bg-purple-500/10 px-3 py-1 rounded-full border border-purple-500/20">
                  {selectedNode.subtitle}
                </span>
                <h3 className="text-2xl font-bold text-white">{selectedNode.title}</h3>
              </div>

              {currentStep === "theory" && selectedNode.theoryNotes && (
                <div className="space-y-6">
                  <div className="p-4 rounded-2xl bg-purple-950/40 border border-purple-500/20 text-slate-200 text-sm leading-relaxed">
                    <p className="font-medium">{selectedNode.theoryNotes.summary}</p>
                  </div>

                  {selectedNode.theoryNotes.keyPoints && (
                    <div className="space-y-2">
                      <h5 className="text-xs font-bold text-purple-400 uppercase tracking-wider">Key Takeaways</h5>
                      <ul className="space-y-2">
                        {selectedNode.theoryNotes.keyPoints.map((pt, i) => (
                          <li key={i} className="flex items-start gap-2 text-xs text-slate-300">
                            <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                            <span>{pt}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {selectedNode.theoryNotes.formula && (
                    <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 font-mono text-xs">
                      ⚡ Formula: {selectedNode.theoryNotes.formula}
                    </div>
                  )}

                  {selectedNode.theoryNotes.codeSnippet && (
                    <div className="space-y-2">
                      <h5 className="text-xs font-bold text-cyan-400 uppercase tracking-wider">Code Snippet</h5>
                      <pre className="p-4 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-xs text-cyan-300 overflow-x-auto">
                        <code>{selectedNode.theoryNotes.codeSnippet}</code>
                      </pre>
                    </div>
                  )}

                  <button
                    onClick={() => setCurrentStep("quiz")}
                    className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white font-bold text-sm shadow-lg flex items-center justify-center gap-2 transition-all"
                  >
                    <span>Start Practice Challenge</span>
                    <ArrowRight size={18} />
                  </button>
                </div>
              )}

              {currentStep === "quiz" && selectedNode.questions && selectedNode.questions[quizIndex] && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center text-xs font-mono text-slate-400">
                    <span>Question {quizIndex + 1} of {selectedNode.questions.length}</span>
                    <span>+{selectedNode.xpReward} XP Reward</span>
                  </div>

                  <h4 className="text-lg font-bold text-white">
                    {selectedNode.questions[quizIndex].prompt}
                  </h4>

                  <div className="space-y-3">
                    {selectedNode.questions[quizIndex].options.map((opt, idx) => {
                      const isCorrect = idx === selectedNode.questions![quizIndex].correctAnswer;
                      const isSelectedOpt = selectedOption === idx;

                      let btnStyle = "bg-slate-950 border-slate-800 text-slate-300 hover:border-purple-500/50";
                      if (isSubmitted) {
                        if (isCorrect) btnStyle = "bg-emerald-950/60 border-emerald-500 text-emerald-300";
                        else if (isSelectedOpt) btnStyle = "bg-rose-950/60 border-rose-500 text-rose-300";
                      } else if (isSelectedOpt) {
                        btnStyle = "bg-purple-950/60 border-purple-500 text-white";
                      }

                      return (
                        <button
                          key={idx}
                          onClick={() => !isSubmitted && setSelectedOption(idx)}
                          className={`w-full p-4 rounded-2xl border text-left text-sm font-medium transition-all ${btnStyle}`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>

                  {isSubmitted && (
                    <div className={`p-4 rounded-2xl border text-xs leading-relaxed ${
                      selectedOption === selectedNode.questions[quizIndex].correctAnswer
                        ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-300"
                        : "bg-rose-500/10 border-rose-500/30 text-rose-300"
                    }`}>
                      <p className="font-bold mb-1">
                        {selectedOption === selectedNode.questions[quizIndex].correctAnswer ? "🎉 Correct!" : "❌ Not quite right"}
                      </p>
                      <p>{selectedNode.questions[quizIndex].explanation}</p>
                    </div>
                  )}

                  {!isSubmitted ? (
                    <button
                      onClick={() => setIsSubmitted(true)}
                      disabled={selectedOption === null}
                      className="w-full py-3.5 rounded-2xl bg-purple-600 hover:bg-purple-500 disabled:opacity-50 text-white font-bold text-sm transition-all"
                    >
                      Check Answer
                    </button>
                  ) : (
                    <button
                      onClick={handleNextQuizQuestion}
                      className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-bold text-sm shadow-lg flex items-center justify-center gap-2"
                    >
                      <span>Continue</span>
                      <ArrowRight size={18} />
                    </button>
                  )}
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <GamificationModal
        isOpen={showGamificationModal}
        onClose={() => {
          setShowGamificationModal(false);
          setSelectedNode(null);
        }}
        xpEarned={selectedNode?.xpReward || 100}
        diamondsEarned={selectedNode?.diamondReward || 30}
      />
    </div>
  );
}
