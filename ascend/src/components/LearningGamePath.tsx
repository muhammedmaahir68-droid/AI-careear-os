import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Trophy, Flame, Gem, Star, Lock, CheckCircle2, Play, Sparkles,
  BookOpen, Code2, Award, ChevronRight, Gift, HelpCircle, ArrowRight,
  Shield, RefreshCw, Zap, X, BrainCircuit
} from "lucide-react";
import GamificationModal, { LEAGUES } from "./GamificationModal";
import { recordUserProgress } from "../services/api";

interface PathNode {
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
  { id: 1, title: "Unit 1: Fundamentals & Aptitude", desc: "Build solid foundations in problem solving, math & core theory", color: "from-cyan-500 to-blue-600" },
  { id: 2, title: "Unit 2: Core Engineering & Systems", desc: "Master department-specific core modules & architecture", color: "from-purple-500 to-indigo-600" },
  { id: 3, title: "Unit 3: Advanced Algorithms & System Design", desc: "High-level data structures, system scalability & optimization", color: "from-amber-500 to-orange-600" },
  { id: 4, title: "Unit 4: MNC Placement & Product Boss Round", desc: "Real interview challenges from Google, Amazon, Microsoft & TCS", color: "from-emerald-500 to-teal-600" },
];

export const DEFAULT_NODES: PathNode[] = [
  // Unit 1
  {
    id: "node-1", unitId: 1, title: "Number Systems & Math Basics", subtitle: "Unit 1 • Step 1", type: "lesson", xpReward: 50, diamondReward: 15, department: "cse",
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
    id: "node-2", unitId: 1, title: "Arrays & Memory Allocation", subtitle: "Unit 1 • Step 2", type: "quiz", xpReward: 75, diamondReward: 20, department: "cse",
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
  {
    id: "node-3", unitId: 1, title: "Diamond Chest Milestone 1", subtitle: "Bonus Loot", type: "chest", xpReward: 150, diamondReward: 50, department: "cse"
  },
  {
    id: "node-4", unitId: 1, title: "Linked Lists & Cycle Detection", subtitle: "Unit 1 • Step 3", type: "lesson", xpReward: 100, diamondReward: 25, department: "cse",
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
    id: "node-5", unitId: 1, title: "Unit 1 Boss Exam", subtitle: "Placement Foundation Test", type: "boss", xpReward: 250, diamondReward: 100, department: "cse",
    questions: [
      { prompt: "Which data structure operates on Last-In-First-Out (LIFO)?", options: ["Queue", "Stack", "Heap", "Tree"], correctAnswer: 1, explanation: "Stacks strictly follow LIFO principles." },
      { prompt: "What is the average search time complexity in a Hash Table?", options: ["O(1)", "O(n)", "O(log n)", "O(n²)"], correctAnswer: 0, explanation: "Hash tables offer average O(1) time complexity with a good hash function." }
    ]
  },
  // Unit 2
  {
    id: "node-6", unitId: 2, title: "Operating Systems & Process Control", subtitle: "Unit 2 • Step 1", type: "lesson", xpReward: 100, diamondReward: 30, department: "cse",
    theoryNotes: {
      summary: "Process scheduling, context switching, deadlock conditions, and synchronization primitives.",
      keyPoints: ["4 Deadlock Conditions: Mutual exclusion, Hold & Wait, No Preemption, Circular Wait", "Round Robin uses fixed time quantum", "Semaphores prevent race conditions"],
      formula: "Turnaround Time = Completion Time - Arrival Time",
    },
    questions: [
      { prompt: "Which condition is NOT required for a deadlock to occur?", options: ["Mutual Exclusion", "Preemption", "Hold and Wait", "Circular Wait"], correctAnswer: 1, explanation: "Deadlock requires NO preemption. Preemption breaks deadlock." }
    ]
  },
  {
    id: "node-7", unitId: 2, title: "Database Systems & SQL Normalization", subtitle: "Unit 2 • Step 2", type: "quiz", xpReward: 120, diamondReward: 35, department: "cse",
    theoryNotes: {
      summary: "Relational database design, 1NF to BCNF normalization, and ACID properties.",
      keyPoints: ["3NF removes transitive dependencies", "ACID: Atomicity, Consistency, Isolation, Durability", "B+ Tree index speeds up range queries"],
    },
    questions: [
      { prompt: "Which normal form removes transitive dependencies?", options: ["1NF", "2NF", "3NF", "BCNF"], correctAnswer: 2, explanation: "3NF eliminates dependencies where non-key attributes depend on other non-key attributes." }
    ]
  },
  {
    id: "node-8", unitId: 2, title: "Diamond Chest Milestone 2", subtitle: "Bonus Loot", type: "chest", xpReward: 200, diamondReward: 75, department: "cse"
  },
  {
    id: "node-9", unitId: 2, title: "Computer Networks & TCP/IP Handshake", subtitle: "Unit 2 • Step 3", type: "lesson", xpReward: 130, diamondReward: 40, department: "cse",
    theoryNotes: {
      summary: "Network protocol stack, 3-way TCP handshake, and CIDR subnetting.",
      keyPoints: ["TCP 3-way handshake: SYN → SYN-ACK → ACK", "Subnetting /24 provides 254 usable host addresses", "HTTP (80), HTTPS (443), DNS (53)"],
    },
    questions: [
      { prompt: "What is the second step of the TCP 3-way handshake?", options: ["SYN", "SYN-ACK", "ACK", "FIN"], correctAnswer: 1, explanation: "The server responds to SYN with SYN-ACK." }
    ]
  },
];

export default function LearningGamePath({ branchId = "cse", onNodeComplete }: LearningGamePathProps) {
  const [userXp, setUserXp] = useState<number>(() => parseInt(localStorage.getItem("user_xp") || "350", 10));
  const [userDiamonds, setUserDiamonds] = useState<number>(() => parseInt(localStorage.getItem("user_diamonds") || "120", 10));
  const [completedNodeIds, setCompletedNodeIds] = useState<string[]>(() => {
    const saved = localStorage.getItem("completed_nodes");
    return saved ? JSON.parse(saved) : ["node-1"];
  });
  const [activeUnitId, setActiveUnitId] = useState<number>(1);
  const [selectedNode, setSelectedNode] = useState<PathNode | null>(null);

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
      // Direct reward claim for chest node
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

  const unitNodes = DEFAULT_NODES.filter(n => n.unitId === activeUnitId);

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
            // First node or node after completed node is unlocked
            const prevCompleted = index === 0 || completedNodeIds.includes(unitNodes[index - 1].id);
            const isUnlocked = isCompleted || prevCompleted;

            // Horizontal Zig-Zag offset: left (-70px), center (0), right (70px)
            const offsets = [0, -75, 75, -50, 50, 0];
            const xOffset = offsets[index % offsets.length];

            return (
              <div
                key={node.id}
                className="flex flex-col items-center relative"
                style={{ transform: `translateX(${xOffset}px)` }}
              >
                {/* Connecting Line to next node */}
                {index < unitNodes.length - 1 && (
                  <div className="absolute top-16 left-1/2 -translate-x-1/2 w-1 h-16 bg-gradient-to-b from-purple-500/40 to-slate-700/40 border-dashed border-l-2 border-purple-500/40 z-0" />
                )}

                {/* NODE ICON BUTTON */}
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

                  {/* Active Ring FX */}
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

      {/* ─── INTERACTIVE STEP-BY-STEP NODE MODAL ─── */}
      <AnimatePresence>
        {selectedNode && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 md:p-8 rounded-3xl bg-slate-900 border border-purple-500/30 shadow-2xl shadow-purple-950/80 text-left space-y-6"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedNode(null)}
                className="absolute top-6 right-6 p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>

              {/* Modal Header */}
              <div className="space-y-1 pr-10">
                <span className="text-xs font-bold tracking-wider text-purple-400 uppercase bg-purple-500/10 px-3 py-1 rounded-full border border-purple-500/20">
                  {selectedNode.subtitle}
                </span>
                <h3 className="text-2xl font-bold text-white">{selectedNode.title}</h3>
              </div>

              {/* STEP 1: THEORY & NOTES */}
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
                    className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white font-bold text-sm shadow-lg shadow-purple-500/25 flex items-center justify-center gap-2 transition-all"
                  >
                    <span>Start Practice Challenge</span>
                    <ArrowRight size={18} />
                  </button>
                </div>
              )}

              {/* STEP 2: INTERACTIVE PRACTICE QUIZ */}
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

                  {/* Feedback Banner */}
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

      {/* Gamification Loot Chest Reward Modal */}
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
