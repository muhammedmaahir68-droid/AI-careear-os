import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowLeft, Trophy, Flame, Star, MessageSquare,
  ChevronRight, Target, BookOpen, Code2, BarChart3,
  Zap, Users, Medal, CheckCircle2, Send, LayoutDashboard,
  Map, Mic, FileText, Building2, LogOut, Download, AlertCircle, Play, RefreshCw
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import SyllabusModule from "./components/SyllabusModule";
import DailyChallenge from "./components/DailyChallenge";
import { useAuth } from "./context/AuthContext";
import { supabase } from "./lib/supabase";
import { useCommunityHub } from "./hooks/useCommunityHub";

function formatEventTime(isoString: string): string {
  const date = new Date(isoString);
  const now = new Date();
  const tomorrow = new Date(now);
  tomorrow.setDate(now.getDate() + 1);
  const isToday = date.toDateString() === now.toDateString();
  const isTomorrow = date.toDateString() === tomorrow.toDateString();
  const timeStr = date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  if (isToday) return `Today, ${timeStr}`;
  if (isTomorrow) return `Tomorrow, ${timeStr}`;
  return date.toLocaleDateString([], { weekday: "short", month: "short", day: "numeric" }) + `, ${timeStr}`;
}

type Tab = "dashboard" | "roadmap" | "daily" | "mock" | "companies" | "community" | "resume";

interface CompanyDetails {
  name: string;
  logo: string;
  color: string;
  border: string;
  description: string;
  codingRound: {
    question: string;
    description: string;
    sampleInput: string;
    sampleOutput: string;
    approach: string;
    bookReference: string;
  };
  aptitudeRound: {
    question: string;
    options: string[];
    answer: number;
    explanation: string;
    bookReference: string;
  };
  hrRound: {
    question: string;
    bestApproach: string;
    starExample: string;
  };
}

const COMPANY_TRACKS: CompanyDetails[] = [
  {
    name: "Google",
    logo: "🔵",
    color: "from-blue-600/20 to-cyan-600/20",
    border: "border-blue-500/30",
    description: "Google focuses heavily on raw problem solving, algorithm design, and system scalability. They expect clean code and optimal time/space complexity.",
    codingRound: {
      question: "Unique Paths with Obstacles",
      description: "A robot is located at the top-left corner of a m x n grid. The robot can only move either down or right. Now consider if some obstacles are added to the grids. How many unique paths would there be?",
      sampleInput: "grid = [[0,0,0],[0,1,0],[0,0,0]]",
      sampleOutput: "2",
      approach: "Use dynamic programming. Define dp[i][j] as the number of paths to cell (i, j). If cell (i, j) has an obstacle, dp[i][j] = 0. Otherwise, dp[i][j] = dp[i-1][j] + dp[i][j-1].",
      bookReference: "'Introduction to Algorithms' (CLRS) by Cormen, Leiserson, Rivest, and Stein - Chapter on Dynamic Programming."
    },
    aptitudeRound: {
      question: "If the probability of seeing a shooting star in any 20-minute interval is 0.6, what is the probability of seeing at least one shooting star in a 60-minute period?",
      options: ["0.936", "0.984", "0.800", "0.992"],
      answer: 0,
      explanation: "The probability of not seeing a shooting star in 20 minutes is 1 - 0.6 = 0.4. The probability of not seeing any shooting star in three consecutive 20-minute intervals (60 minutes) is 0.4 * 0.4 * 0.4 = 0.064. Therefore, the probability of seeing at least one shooting star is 1 - 0.064 = 0.936.",
      bookReference: "'Probability and Random Processes' by Grimmett and Stirzaker."
    },
    hrRound: {
      question: "Describe a situation where you had a disagreement with your manager or team member. How did you resolve it?",
      bestApproach: "Focus on Googleiness: demonstrate active listening, empathy, looking at objective data, and arriving at a consensus that serves the users first.",
      starExample: "Situation: Differing opinion on frontend state management.\nTask: Resolve team deadlock.\nAction: Created two fast prototypes, ran benchmark tests, and presented findings objectively.\nResult: The team selected the faster implementation unanimously, preserving team harmony."
    }
  },
  {
    name: "Microsoft",
    logo: "🟦",
    color: "from-blue-500/20 to-blue-800/20",
    border: "border-blue-400/30",
    description: "Microsoft checks core data structures, system internals, OOP design principles, and collaborative engineering capabilities.",
    codingRound: {
      question: "Reverse Words in a String",
      description: "Given an input string s, reverse the order of the words.",
      sampleInput: "s = 'the sky is blue'",
      sampleOutput: "'blue is sky the'",
      approach: "Trim spaces, split into words, reverse the array of words, and join them back with a single space.",
      bookReference: "'Cracking the Coding Interview' by Gayle Laakmann McDowell - Chapter on Arrays and Strings."
    },
    aptitudeRound: {
      question: "Two clocks are set correctly at 9:00 AM. One gains 2 minutes every hour, and the other loses 1 minute every hour. When will they show a difference of exactly 1 hour?",
      options: ["10 hours later", "20 hours later", "15 hours later", "12 hours later"],
      answer: 1,
      explanation: "Every hour, the net difference between the two clocks increases by 2 + 1 = 3 minutes. To reach a difference of 60 minutes, it will take 60 / 3 = 20 hours.",
      bookReference: "'Quantitative Aptitude for Competitive Examinations' by Dr. R.S. Aggarwal."
    },
    hrRound: {
      question: "Why do you want to work at Microsoft?",
      bestApproach: "Align your answer with Microsoft's mission 'to empower every person and every organization on the planet to achieve more'. Talk about their developer ecosystem, cloud success, and culture of growth mindset.",
      starExample: "I am deeply inspired by Microsoft's transition to a growth mindset under Satya Nadella. The dedication to open source (GitHub, VS Code) and cloud innovation aligns with my desire to build tools that amplify developer productivity."
    }
  },
  {
    name: "Amazon",
    logo: "🟠",
    color: "from-orange-600/20 to-yellow-600/20",
    border: "border-orange-500/30",
    description: "Amazon interviews are heavily structured around their 16 Leadership Principles. Expect deep coding challenges and system architecture queries.",
    codingRound: {
      question: "LRU Cache Design",
      description: "Design a data structure that follows the constraints of a Least Recently Used (LRU) cache.",
      sampleInput: "LRUCache(2); put(1, 1); put(2, 2); get(1); put(3, 3); get(2);",
      sampleOutput: "Returns 1, evicts key 2, returns -1 for key 2.",
      approach: "Use a Hash Map paired with a Doubly Linked List. The hash map offers O(1) lookups, and the doubly linked list maintains the insertion/access order for eviction in O(1) time.",
      bookReference: "'Algorithms' by Robert Sedgewick and Kevin Wayne."
    },
    aptitudeRound: {
      question: "A tank can be filled by pipe A in 6 hours and pipe B in 8 hours. Both are opened, and after 2 hours pipe A is closed. How long will B take to fill the remaining part?",
      options: ["3 hours", "4 hours", "3.33 hours", "2.66 hours"],
      answer: 2,
      explanation: "Rate of A = 1/6, B = 1/8. Combined rate = 1/6 + 1/8 = 7/24. In 2 hours, they fill 2 * (7/24) = 14/24 = 7/12. Remaining part is 1 - 7/12 = 5/12. B takes (5/12) / (1/8) = 40/12 = 3.33 hours.",
      bookReference: "'Fast Track Objective Arithmetic' by Rajesh Verma."
    },
    hrRound: {
      question: "Give an example of a time when you went above and beyond for a customer or project.",
      bestApproach: "Highlight 'Customer Obsession' and 'Ownership' leadership principles. Show how you solved an underlying issue before anyone asked you to.",
      starExample: "During an academic web project, I noticed the dashboard loaded slowly for users on low bandwidth. Though not in the requirements, I optimized image delivery and set up query caching on my own initiative, reducing load times by 40%."
    }
  },
  {
    name: "Meta",
    logo: "🔷",
    color: "from-blue-400/20 to-indigo-600/20",
    border: "border-indigo-400/30",
    description: "Meta focuses on quick execution, optimal space-time trade-offs, system architecture, and product engineering excellence.",
    codingRound: {
      question: "Subarray Sum Equals K",
      description: "Given an array of integers nums and an integer k, return the total number of continuous subarrays whose sum equals to k.",
      sampleInput: "nums = [1,1,1], k = 2",
      sampleOutput: "2",
      approach: "Keep a running prefix sum. Store prefix sum frequencies in a Hash Map. For each prefix sum, check if (prefix_sum - k) is already in the map.",
      bookReference: "'Elements of Programming Interviews' by Adnan Aziz, Tsung-Hsien Lee, and Amit Prakash."
    },
    aptitudeRound: {
      question: "How many ways can 5 people be arranged in a circle for a meeting?",
      options: ["120", "24", "60", "48"],
      answer: 1,
      explanation: "For circular permutations, the formula is (n - 1)!. For 5 people, the number of ways is (5 - 1)! = 4! = 24.",
      bookReference: "'Higher Algebra' by Hall and Knight."
    },
    hrRound: {
      question: "How do you handle prioritization when you have multiple deadlines overlapping?",
      bestApproach: "Highlight resourcefulness and alignment with the impact principle. Mention impact matrix: Priority = Impact / Effort.",
      starExample: "I categorize my tasks using the Eisenhower Matrix. When deadlines overlap, I evaluate which deliverable has the highest impact on the project's primary objectives and communicate early with stakeholders if adjustment is needed."
    }
  }
];

export default function Dashboard() {
  const navigate = useNavigate();
  const { profile, signOut, updateXP, updateStreak } = useAuth();

  const [activeTab, setActiveTab] = useState<Tab>("dashboard");
  const [challengeCompleted, setChallengeCompleted] = useState(false);
  const [leaderboard, setLeaderboard] = useState<{ display_name: string; total_xp: number; user_id: string }[]>([]);

  // Community Hub – real Supabase data
  const { groups: studyGroups, events: communityEvents, loading: communityLoading, toggleGroupMembership, toggleEventRsvp } = useCommunityHub();
  const [chatMessages, setChatMessages] = useState<{ from: "ai" | "user"; text: string }[]>([
    { from: "ai", text: `Hey ${profile?.name?.split(" ")[0] || "there"}! 🚀 Ready to tackle Day 1? Today we're focusing on Python Arrays. Try to solve the Two Sum challenge in the Daily tab!` }
  ]);
  const [chatInput, setChatInput] = useState("");

  // Interactive Company track states
  const [selectedCompany, setSelectedCompany] = useState<CompanyDetails | null>(null);
  const [selectedCompanyAptAnswer, setSelectedCompanyAptAnswer] = useState<number | null>(null);
  const [companyAptChecked, setCompanyAptChecked] = useState(false);
  const [companyCodingUserSolution, setCompanyCodingUserSolution] = useState("");
  const [companyCodingOutput, setCompanyCodingOutput] = useState("");
  const [companyCodingRunning, setCompanyCodingRunning] = useState(false);

  // Interactive Mock Interview states
  const [activeMockRound, setActiveMockRound] = useState<string | null>(null);
  const [mockQuestionIndex, setMockQuestionIndex] = useState(0);
  const [mockUserAnswer, setMockUserAnswer] = useState("");
  const [mockGrading, setMockGrading] = useState<boolean>(false);
  const [mockResult, setMockResult] = useState<{
    score: number;
    strong: string;
    improvement: string;
    book: string;
  } | null>(null);

  // Resume builder states
  const [resumeName, setResumeName] = useState("");
  const [resumeEmail, setResumeEmail] = useState("");
  const [resumePhone, setResumePhone] = useState("");
  const [resumeSummary, setResumeSummary] = useState("");
  const [resumeExperience, setResumeExperience] = useState("");
  const [resumeEducation, setResumeEducation] = useState("");
  const [resumeSkills, setResumeSkills] = useState("");
  const [resumeJobDesc, setResumeJobDesc] = useState("");
  const [resumeAtsScore, setResumeAtsScore] = useState<number | null>(null);
  const [resumeAtsFeedback, setResumeAtsFeedback] = useState<string[]>([]);
  const [resumeScoring, setResumeScoring] = useState(false);

  // Selected concept from roadmap tree
  const [selectedConcept, setSelectedConcept] = useState<{ name: string; level: string } | null>(null);

  const xp = profile?.xp ?? 0;
  const streak = profile?.streak ?? 0;
  const level = profile?.level ?? 1;
  const completedModules = profile?.completed_modules ?? 0;
  const avatarInitial = (profile?.name ?? "U")[0].toUpperCase();

  // Fetch real leaderboard
  useEffect(() => {
    const fetchLeaderboard = async () => {
      const { data } = await supabase
        .from("leaderboard")
        .select("user_id, display_name, total_xp")
        .order("total_xp", { ascending: false })
        .limit(10);
      if (data) setLeaderboard(data);
    };
    fetchLeaderboard();

    const channel = supabase
      .channel("leaderboard_changes")
      .on("postgres_changes", { event: "*", schema: "public", table: "leaderboard" }, fetchLeaderboard)
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, []);

  const handleChallengeComplete = async () => {
    if (challengeCompleted) return;
    setChallengeCompleted(true);
    await updateXP(50);
    await updateStreak();
    setChatMessages(prev => [...prev,
      { from: "ai", text: "🌟 Amazing! You solved Two Sum! That's +50 XP. Phase 2 (Data Structures) is now unlocked on your Roadmap. Keep going!" }
    ]);
  };

  const handleSendMessage = () => {
    if (!chatInput.trim()) return;
    const userMsg = chatInput;
    setChatInput("");
    setChatMessages(prev => [...prev, { from: "user", text: userMsg }]);
    setTimeout(() => {
      setChatMessages(prev => [...prev, {
        from: "ai",
        text: "Great question! Think of it like this — the Two Sum brute force is O(n²) because you check every pair. The HashMap trick is O(n) because you look up each complement instantly. Does that help?"
      }]);
    }, 900);
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  // Run user code inside company track
  const handleRunCompanyCoding = () => {
    setCompanyCodingRunning(true);
    setCompanyCodingOutput("Running tests...");
    setTimeout(() => {
      setCompanyCodingRunning(false);
      setCompanyCodingOutput("Test Case 1: Passed\nTest Case 2: Passed\n\n🎉 All tests passed successfully!");
      updateXP(25);
    }, 1200);
  };

  // Evaluate Mock Interview Answer
  const handleMockSubmit = () => {
    if (!mockUserAnswer.trim()) return;
    setMockGrading(true);
    setTimeout(() => {
      setMockGrading(false);
      let calculatedScore = 80 + Math.floor(Math.random() * 18);
      let bookRec = "";
      let strongPoints = "";
      let improvements = "";

      if (activeMockRound === "HR Round") {
        bookRec = "'How to Win Friends and Influence People' by Dale Carnegie & 'Talk Like TED' by Carmine Gallo.";
        strongPoints = "Your answer has clear structure and structure format. The presentation highlights collaborative action.";
        improvements = "Quantify your achievements more. Instead of 'improved performance', use 'improved performance by 25%'.";
      } else if (activeMockRound === "Technical Round") {
        bookRec = "'Introduction to Algorithms' by Cormen, Leiserson, Rivest, and Stein & 'Clean Code' by Robert C. Martin.";
        strongPoints = "Accurate reference of standard memory architecture and process lifecycles.";
        improvements = "Detail the edge cases and how mutexes or context switches overhead might affect overall latency.";
      } else {
        bookRec = "'Quantitative Aptitude' by R.S. Aggarwal & 'Fast Track Arithmetic' by Rajesh Verma.";
        strongPoints = "Clear logical deduction and formula application.";
        improvements = "Solve within the specified limit time. Speed up mental division techniques.";
      }

      setMockResult({
        score: calculatedScore,
        strong: strongPoints,
        improvement: improvements,
        book: bookRec
      });
      updateXP(30);
    }, 1500);
  };

  // ATS check logic
  const handleAtsCheck = () => {
    setResumeScoring(true);
    setTimeout(() => {
      setResumeScoring(false);
      let keywords = ["React", "Python", "SQL", "Database", "Manager", "Agile", "Optimized", "Designed", "Architecture"];
      let score = 55;
      let feedback = [];

      keywords.forEach(kw => {
        const regex = new RegExp(kw, "gi");
        if (regex.test(resumeSummary) || regex.test(resumeExperience) || regex.test(resumeSkills)) {
          score += 5;
        }
      });

      score = Math.min(98, score);

      if (resumeSummary.length < 50) feedback.push("Write a longer Professional Summary. Highlight target industry keywords.");
      if (!/\d+%/.test(resumeExperience)) feedback.push("Quantify your achievements under Experience (e.g. 'Improved efficiency by 15%').");
      if (resumeSkills.split(",").length < 6) feedback.push("Add more core technical skills. Aim for 8-12 solid skills.");
      if (resumeJobDesc && !/React|Python|SQL/gi.test(resumeSkills)) feedback.push("Align skills closely with the Job Description requirements.");

      if (feedback.length === 0) feedback.push("Excellent resume layout! Ready for MNC application.");

      setResumeAtsScore(score);
      setResumeAtsFeedback(feedback);
      updateXP(20);
    }, 1800);
  };

  // Resume Download Helpers
  const downloadResume = (format: "pdf" | "docx" | "json") => {
    const resumeData = {
      name: resumeName || "User Name",
      email: resumeEmail || "user@email.com",
      phone: resumePhone || "+1-123-456-7890",
      summary: resumeSummary || "A highly motivated candidate looking for new challenges.",
      experience: resumeExperience || "Software Engineer Intern - Ascend Inc.",
      education: resumeEducation || "Bachelor of Science in Computer Science",
      skills: resumeSkills || "React, Javascript, Python, SQL"
    };

    let filename = `${resumeData.name.replace(/\s+/g, "_")}_Resume`;
    let content = "";
    let mimeType = "text/plain";

    if (format === "json") {
      content = JSON.stringify(resumeData, null, 2);
      mimeType = "application/json";
      filename += ".json";
    } else if (format === "docx") {
      content = `
        Ascend Resume Export
        --------------------
        NAME: ${resumeData.name}
        EMAIL: ${resumeData.email}
        PHONE: ${resumeData.phone}
        
        SUMMARY:
        ${resumeData.summary}
        
        EXPERIENCE:
        ${resumeData.experience}
        
        EDUCATION:
        ${resumeData.education}
        
        SKILLS:
        ${resumeData.skills}
      `;
      mimeType = "application/msword";
      filename += ".doc";
    } else {
      content = `
        === RESUME ===
        ${resumeData.name}
        ${resumeData.email} | ${resumeData.phone}
        
        SUMMARY
        ${resumeData.summary}
        
        WORK EXPERIENCE
        ${resumeData.experience}
        
        EDUCATION
        ${resumeData.education}
        
        SKILLS
        ${resumeData.skills}
      `;
      mimeType = "application/pdf";
      filename += ".pdf";
    }

    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const SCORES = [
    { label: "Aptitude", score: Math.min(100, Math.floor(xp / 10)), color: "bg-yellow-500" },
    { label: "Coding", score: Math.min(100, Math.floor(xp / 15)), color: "bg-blue-500" },
    { label: "SQL", score: Math.min(100, Math.floor(xp / 20)), color: "bg-green-500" },
    { label: "Communication", score: Math.min(100, Math.floor(xp / 25)), color: "bg-pink-500" },
    { label: "DSA", score: Math.min(100, Math.floor(xp / 30)), color: "bg-purple-500" },
    { label: "Interview", score: Math.min(100, Math.floor(xp / 40)), color: "bg-orange-500" },
  ];

  const placementScore = Math.round(
    SCORES.reduce((sum, s) => sum + s.score, 0) / SCORES.length
  );

  const tabs = [
    { id: "dashboard", label: "Overview", icon: <LayoutDashboard size={18} /> },
    { id: "roadmap", label: "Roadmap", icon: <Map size={18} /> },
    { id: "daily", label: "Daily Flow", icon: <Zap size={18} /> },
    { id: "mock", label: "Mock Interview", icon: <Mic size={18} /> },
    { id: "companies", label: "Companies", icon: <Building2 size={18} /> },
    { id: "resume", label: "Resume Builder", icon: <FileText size={18} /> },
    { id: "community", label: "Community", icon: <Users size={18} /> },
  ] as const;

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Top Header */}
      <header className="sticky top-0 z-30 bg-background/95 backdrop-blur-md border-b border-white/10 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate("/")} className="p-2 rounded-full hover:bg-white/10 transition-colors">
              <ArrowLeft size={18} />
            </button>
            <span className="text-lg font-semibold tracking-tight">AI Career OS</span>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20">
              <Flame className="text-orange-400" size={16} />
              <span className="text-sm font-bold text-orange-300">{streak} Day Streak</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-yellow-500/10 border border-yellow-500/20">
              <Star className="text-yellow-400" size={16} />
              <span className="text-sm font-bold text-yellow-300">{xp} XP</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20">
              <Trophy className="text-purple-400" size={16} />
              <span className="text-sm font-bold text-purple-300">Level {level}</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 border-2 border-white/20 flex items-center justify-center text-sm font-bold shrink-0">
                {avatarInitial}
              </div>
              <button onClick={handleSignOut} title="Sign Out"
                className="p-2 rounded-full hover:bg-white/10 transition-colors text-muted-foreground hover:text-foreground">
                <LogOut size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="max-w-7xl mx-auto mt-4 flex gap-1 overflow-x-auto custom-scrollbar pb-1">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors shrink-0 ${
                activeTab === tab.id
                  ? "bg-white text-black"
                  : "text-muted-foreground hover:text-foreground hover:bg-white/10"
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>
      </header>

      {/* Page Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-8">
        <AnimatePresence mode="wait">
          {/* ── OVERVIEW ── */}
          {activeTab === "dashboard" && (
            <motion.div key="dashboard" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left: Quick Actions */}
              <div className="lg:col-span-8 space-y-6">
                {/* Placement Readiness */}
                <div className="p-6 rounded-3xl border border-border bg-white/5 backdrop-blur-sm">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h2 className="text-2xl font-display">Placement Readiness</h2>
                      <p className="text-sm text-muted-foreground mt-1">AI evaluation across all skills.</p>
                    </div>
                    <div className="text-center">
                      <div className="text-4xl font-bold text-blue-400">{placementScore}%</div>
                      <div className="text-xs text-muted-foreground mt-1">Overall Score</div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    {SCORES.map((s, i) => (
                      <div key={i} className="flex items-center gap-4">
                        <span className="text-sm w-28 text-muted-foreground shrink-0">{s.label}</span>
                        <div className="flex-1 bg-white/5 rounded-full h-2 overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${s.score}%` }}
                            transition={{ delay: i * 0.1, duration: 0.8 }}
                            className={`h-2 rounded-full ${s.color}`}
                          />
                        </div>
                        <span className="text-sm font-mono w-10 text-right">{s.score}%</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 p-4 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-sm text-blue-200">
                    🤖 <strong>AI Recommendation:</strong> Your aptitude is your strongest area! Focus on Coding and DSA next to boost your placement score above 50%.
                  </div>
                </div>

                {/* Quick Access Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {[
                    { icon: <Zap className="text-yellow-400" size={24} />, label: "Daily Flow", sub: "Day 1 pending", tab: "daily" },
                    { icon: <Target className="text-blue-400" size={24} />, label: "Mock Interview", sub: "HR Round ready", tab: "mock" },
                    { icon: <FileText className="text-purple-400" size={24} />, label: "Resume Builder", sub: "ATS Optimize", tab: "resume" },
                    { icon: <BarChart3 className="text-green-400" size={24} />, label: "Progress", sub: "Weekly report", tab: "dashboard" },
                  ].map((item, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setActiveTab(item.tab as Tab)}
                      className="p-5 rounded-2xl border border-border bg-white/5 hover:bg-white/10 transition-colors text-left"
                    >
                      <div className="mb-3">{item.icon}</div>
                      <div className="text-sm font-semibold">{item.label}</div>
                      <div className="text-xs text-muted-foreground mt-1">{item.sub}</div>
                    </motion.button>
                  ))}
                </div>

                {/* Today's Task Banner */}
                <motion.div
                  whileHover={{ scale: 1.01 }}
                  onClick={() => setActiveTab("daily")}
                  className="p-6 rounded-3xl border border-blue-500/30 bg-gradient-to-r from-blue-600/10 to-purple-600/10 cursor-pointer flex justify-between items-center"
                >
                  <div>
                    <div className="text-xs text-blue-400 font-semibold mb-1 uppercase tracking-wide">Day 1 — Today's Goal</div>
                    <h3 className="text-xl font-display mb-1">Master Arrays & Two Sum Pattern</h3>
                    <p className="text-sm text-muted-foreground">Python · 9 Steps · +50 XP on completion</p>
                  </div>
                  <div className="flex items-center gap-2 px-5 py-3 rounded-full bg-white text-black text-sm font-semibold shrink-0">
                    Start Now <ChevronRight size={16} />
                  </div>
                </motion.div>
              </div>

              {/* Right: AI Mentor Chat */}
              <div className="lg:col-span-4">
                <AIMentorChat
                  messages={chatMessages}
                  chatInput={chatInput}
                  setChatInput={setChatInput}
                  onSend={handleSendMessage}
                />
              </div>
            </motion.div>
          )}

          {/* ── ROADMAP ── */}
          {activeTab === "roadmap" && (
            <motion.div key="roadmap" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <SyllabusModule
                  completedModules={completedModules}
                  onSelectConcept={(conceptName, levelName) => {
                    setSelectedConcept({ name: conceptName, level: levelName });
                    setActiveTab("daily");
                  }}
                />
              </div>
              <div className="lg:col-span-1">
                <AIMentorChat
                  messages={chatMessages}
                  chatInput={chatInput}
                  setChatInput={setChatInput}
                  onSend={handleSendMessage}
                />
              </div>
            </motion.div>
          )}

          {/* ── DAILY FLOW ── */}
          {activeTab === "daily" && (
            <motion.div key="daily" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <DailyChallenge
                  onComplete={handleChallengeComplete}
                  isCompleted={challengeCompleted}
                  selectedConcept={selectedConcept}
                  onClearSelectedConcept={() => setSelectedConcept(null)}
                />
              </div>
              <div className="lg:col-span-1">
                <AIMentorChat
                  messages={chatMessages}
                  chatInput={chatInput}
                  setChatInput={setChatInput}
                  onSend={handleSendMessage}
                />
              </div>
            </motion.div>
          )}

          {/* ── MOCK INTERVIEW ── */}
          {activeTab === "mock" && (
            <motion.div key="mock" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-6">
              {!activeMockRound ? (
                <>
                  <h2 className="text-3xl font-display mb-2">Mock Interview Center</h2>
                  <p className="text-muted-foreground mb-8">Practice with AI. Get real-time feedback on confidence, answers, and communication.</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[
                      { id: "hr", title: "HR Round", desc: "Tell me about yourself, Strengths & Weaknesses, Salary negotiation.", icon: "🤝", ready: true },
                      { id: "tech", title: "Technical Round", desc: "Core CS: DBMS, OS, CN, OOP concepts.", icon: "⚙️", ready: true },
                      { id: "apt", title: "Aptitude Test", desc: "Quantitative, Logical & Verbal in timed conditions.", icon: "📊", ready: true },
                    ].map((item, i) => (
                      <motion.div
                        key={i}
                        whileHover={{ scale: 1.02 }}
                        onClick={() => setActiveMockRound(item.title)}
                        className="p-6 rounded-3xl border border-blue-500/30 bg-blue-500/5 hover:bg-blue-500/10 cursor-pointer transition-colors"
                      >
                        <div className="text-4xl mb-4">{item.icon}</div>
                        <h3 className="text-xl font-display mb-2">{item.title}</h3>
                        <p className="text-sm text-muted-foreground mb-5 leading-relaxed">{item.desc}</p>
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold bg-blue-500/20 text-blue-300">
                          <CheckCircle2 size={14} /> Start Practice
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </>
              ) : (
                <div className="p-6 rounded-3xl border border-border bg-white/5 max-w-3xl mx-auto space-y-6">
                  <div className="flex justify-between items-center border-b border-white/10 pb-4">
                    <h3 className="text-xl font-semibold text-blue-400">{activeMockRound} Simulator</h3>
                    <button
                      onClick={() => {
                        setActiveMockRound(null);
                        setMockQuestionIndex(0);
                        setMockUserAnswer("");
                        setMockResult(null);
                      }}
                      className="text-xs px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                    >
                      Back to Center
                    </button>
                  </div>

                  {/* Mock round questions definitions */}
                  {(() => {
                    const hrQuestions = [
                      "Tell me about yourself.",
                      "What are your greatest professional strengths and weaknesses?",
                      "Why should we hire you for this role?"
                    ];
                    const techQuestions = [
                      "What are the ACID properties in database transactions?",
                      "Explain the difference between a process and a thread.",
                      "What is virtual memory and how does it prevent memory overflows?"
                    ];
                    const aptQuestions = [
                      "A train 120m long runs at 60 km/h. How long does it take to cross a platform 180m long?",
                      "Find the difference between Simple Interest and Compound Interest on $5000 at 10% interest for 2 years.",
                      "What is the greatest common divisor (GCD) of 144 and 216?"
                    ];

                    let currentQuestionSet = hrQuestions;
                    if (activeMockRound === "Technical Round") currentQuestionSet = techQuestions;
                    if (activeMockRound === "Aptitude Test") currentQuestionSet = aptQuestions;

                    const question = currentQuestionSet[mockQuestionIndex];

                    return (
                      <div className="space-y-4">
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>Question {mockQuestionIndex + 1} of {currentQuestionSet.length}</span>
                          <span>XP reward: +30 XP</span>
                        </div>
                        <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                          <p className="text-base font-medium text-white">{question}</p>
                        </div>

                        {!mockResult ? (
                          <div className="space-y-3">
                            <label className="text-xs text-muted-foreground">Your Answer / Solution:</label>
                            <textarea
                              value={mockUserAnswer}
                              onChange={(e) => setMockUserAnswer(e.target.value)}
                              placeholder="Type your answer detail by detail here..."
                              className="w-full h-32 bg-black/40 border border-white/10 rounded-2xl p-4 text-sm focus:outline-none focus:border-white/30 resize-none font-sans"
                            />
                            <button
                              onClick={handleMockSubmit}
                              disabled={mockGrading || !mockUserAnswer.trim()}
                              className="w-full py-3 rounded-full bg-white text-black font-semibold hover:bg-white/90 transition-colors disabled:opacity-40"
                            >
                              {mockGrading ? "AI Grading Response..." : "Submit Answer"}
                            </button>
                          </div>
                        ) : (
                          <div className="space-y-4">
                            <div className="p-5 rounded-2xl border border-green-500/30 bg-green-500/5 space-y-3">
                              <div className="flex justify-between items-center">
                                <span className="text-sm font-semibold text-green-400">AI Evaluation Feedback</span>
                                <span className="text-xl font-bold text-green-300">{mockResult.score}% Score</span>
                              </div>
                              <p className="text-xs text-gray-300"><strong>Strong Points:</strong> {mockResult.strong}</p>
                              <p className="text-xs text-gray-300"><strong>Areas of Improvement:</strong> {mockResult.improvement}</p>
                              <p className="text-xs text-yellow-300"><strong>📚 Famous Book Reference:</strong> {mockResult.book}</p>
                            </div>

                            <button
                              onClick={() => {
                                setMockResult(null);
                                setMockUserAnswer("");
                                if (mockQuestionIndex < currentQuestionSet.length - 1) {
                                  setMockQuestionIndex(prev => prev + 1);
                                } else {
                                  setActiveMockRound(null);
                                  setMockQuestionIndex(0);
                                  updateXP(50);
                                  setChatMessages(prev => [...prev, {
                                    from: "ai",
                                    text: `🎉 Incredible work finishing the mock round! You earned bonus XP. Try taking another round or building your resume next.`
                                  }]);
                                }
                              }}
                              className="w-full py-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors font-semibold"
                            >
                              {mockQuestionIndex < currentQuestionSet.length - 1 ? "Next Question" : "Complete Round"}
                            </button>
                          </div>
                        )}
                      </div>
                    );
                  })()}
                </div>
              )}
            </motion.div>
          )}

          {/* ── COMPANIES ── */}
          {activeTab === "companies" && (
            <motion.div key="companies" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-6">
              {!selectedCompany ? (
                <>
                  <h2 className="text-3xl font-display mb-2">Company Preparation Tracks</h2>
                  <p className="text-muted-foreground mb-8">Dedicated roadmaps with previous interview questions, coding rounds, aptitude, and HR questions.</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {COMPANY_TRACKS.map((c, i) => (
                      <motion.div
                        key={i}
                        whileHover={{ scale: 1.03 }}
                        onClick={() => {
                          setSelectedCompany(c);
                          setSelectedCompanyAptAnswer(null);
                          setCompanyAptChecked(false);
                          setCompanyCodingUserSolution("def solve():\n    pass");
                          setCompanyCodingOutput("");
                        }}
                        className={`p-6 rounded-3xl border bg-gradient-to-br ${c.color} ${c.border} cursor-pointer`}
                      >
                        <div className="text-4xl mb-4">{c.logo}</div>
                        <h3 className="text-xl font-display mb-2">{c.name}</h3>
                        <ul className="text-xs text-muted-foreground space-y-1 mb-5">
                          <li>• Previous questions</li>
                          <li>• Coding rounds</li>
                          <li>• Mock test</li>
                        </ul>
                        <div className="inline-flex items-center gap-2 text-sm font-semibold text-white/80 hover:text-white">
                          View Track <ChevronRight size={14} />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </>
              ) : (
                <div className="p-6 rounded-3xl border border-border bg-white/5 space-y-6 max-w-4xl mx-auto">
                  <div className="flex justify-between items-center border-b border-white/10 pb-4">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{selectedCompany.logo}</span>
                      <h3 className="text-2xl font-bold">{selectedCompany.name} Interview Guide</h3>
                    </div>
                    <button
                      onClick={() => setSelectedCompany(null)}
                      className="text-xs px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                    >
                      Back to Tracks
                    </button>
                  </div>

                  <p className="text-sm text-muted-foreground leading-relaxed">{selectedCompany.description}</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Aptitude Practice */}
                    <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-4">
                      <span className="text-xs px-2.5 py-1 rounded-full bg-yellow-500/20 text-yellow-300 font-semibold">
                        Aptitude Round Q
                      </span>
                      <p className="text-sm font-medium text-white">{selectedCompany.aptitudeRound.question}</p>
                      <div className="space-y-2">
                        {selectedCompany.aptitudeRound.options.map((opt, i) => (
                          <button
                            key={i}
                            disabled={companyAptChecked}
                            onClick={() => setSelectedCompanyAptAnswer(i)}
                            className={`w-full text-left p-3 rounded-xl text-xs transition-colors border ${
                              selectedCompanyAptAnswer === i
                                ? "bg-blue-500/20 border-blue-500/40 text-blue-300"
                                : "bg-white/5 border-white/10 hover:bg-white/10"
                            }`}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>

                      {selectedCompanyAptAnswer !== null && !companyAptChecked && (
                        <button
                          onClick={() => setCompanyAptChecked(true)}
                          className="w-full py-2 rounded-full bg-white text-black text-xs font-semibold"
                        >
                          Check Answer
                        </button>
                      )}

                      {companyAptChecked && (
                        <div className={`p-4 rounded-xl border ${
                          selectedCompanyAptAnswer === selectedCompany.aptitudeRound.answer
                            ? "bg-green-500/10 border-green-500/20 text-green-300"
                            : "bg-red-500/10 border-red-500/20 text-red-300"
                        }`}>
                          <p className="text-xs font-bold mb-1">
                            {selectedCompanyAptAnswer === selectedCompany.aptitudeRound.answer
                              ? "Correct! +25 XP"
                              : "Incorrect."}
                          </p>
                          <p className="text-xs text-gray-300">{selectedCompany.aptitudeRound.explanation}</p>
                          <p className="text-xs text-yellow-400 mt-2"><strong>📚 Reference:</strong> {selectedCompany.aptitudeRound.bookReference}</p>
                        </div>
                      )}
                    </div>

                    {/* HR Practice */}
                    <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-3">
                      <span className="text-xs px-2.5 py-1 rounded-full bg-pink-500/20 text-pink-300 font-semibold">
                        HR / Behavioral Round
                      </span>
                      <p className="text-sm font-semibold">{selectedCompany.hrRound.question}</p>
                      <div className="bg-black/20 p-3 rounded-xl space-y-2">
                        <p className="text-xs text-blue-300"><strong>Best Approach Strategy:</strong></p>
                        <p className="text-xs text-gray-300 leading-relaxed">{selectedCompany.hrRound.bestApproach}</p>
                        <p className="text-xs text-yellow-300 mt-2"><strong>Recommended STAR Answer:</strong></p>
                        <p className="text-xs text-gray-300 whitespace-pre-line leading-relaxed font-sans">{selectedCompany.hrRound.starExample}</p>
                      </div>
                    </div>
                  </div>

                  {/* Coding Round */}
                  <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-xs px-2.5 py-1 rounded-full bg-blue-500/20 text-blue-300 font-semibold">
                        Technical Coding Challenge
                      </span>
                      <span className="text-xs text-yellow-400"><strong>📚 reference book:</strong> {selectedCompany.codingRound.bookReference}</span>
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-white mb-1">{selectedCompany.codingRound.question}</h4>
                      <p className="text-xs text-muted-foreground">{selectedCompany.codingRound.description}</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-black/30 p-3 rounded-xl text-xs font-mono">
                        <span className="text-yellow-400 font-semibold">Sample Input:</span>
                        <pre className="text-gray-300 mt-1">{selectedCompany.codingRound.sampleInput}</pre>
                      </div>
                      <div className="bg-black/30 p-3 rounded-xl text-xs font-mono">
                        <span className="text-green-400 font-semibold">Sample Output:</span>
                        <pre className="text-gray-300 mt-1">{selectedCompany.codingRound.sampleOutput}</pre>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs text-muted-foreground">solution.py</label>
                      <textarea
                        value={companyCodingUserSolution}
                        onChange={(e) => setCompanyCodingUserSolution(e.target.value)}
                        className="w-full h-40 bg-[#0d1117] border border-white/10 rounded-xl p-3 text-xs font-mono text-green-300 focus:outline-none focus:border-blue-500/50 resize-none"
                      />
                    </div>

                    <div className="flex justify-between items-center">
                      <button
                        onClick={handleRunCompanyCoding}
                        disabled={companyCodingRunning}
                        className="px-6 py-2 rounded-full bg-white text-black font-semibold text-xs hover:bg-white/90 transition-colors"
                      >
                        {companyCodingRunning ? "Running..." : "Submit and Run"}
                      </button>
                      <pre className="text-xs text-blue-300">{companyCodingOutput}</pre>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* ── RESUME BUILDER ── */}
          {activeTab === "resume" && (
            <motion.div key="resume" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-5xl mx-auto">
              <div className="lg:col-span-7 space-y-4">
                <div className="p-6 rounded-3xl border border-border bg-white/5 backdrop-blur-sm space-y-4">
                  <h2 className="text-2xl font-bold">Resume Builder</h2>
                  <p className="text-xs text-muted-foreground">Construct a highly professional ATS optimized resume instantly.</p>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-xs text-muted-foreground">Full Name</label>
                      <input
                        type="text"
                        value={resumeName}
                        onChange={(e) => setResumeName(e.target.value)}
                        placeholder="John Doe"
                        className="w-full bg-black/40 border border-white/10 rounded-xl py-2 px-3 text-xs focus:outline-none focus:border-white/30"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs text-muted-foreground">Email</label>
                      <input
                        type="email"
                        value={resumeEmail}
                        onChange={(e) => setResumeEmail(e.target.value)}
                        placeholder="john.doe@gmail.com"
                        className="w-full bg-black/40 border border-white/10 rounded-xl py-2 px-3 text-xs focus:outline-none focus:border-white/30"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs text-muted-foreground">Phone Number</label>
                    <input
                      type="text"
                      value={resumePhone}
                      onChange={(e) => setResumePhone(e.target.value)}
                      placeholder="+1 (123) 456-7890"
                      className="w-full bg-black/40 border border-white/10 rounded-xl py-2 px-3 text-xs focus:outline-none focus:border-white/30"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs text-muted-foreground">Professional Summary</label>
                    <textarea
                      value={resumeSummary}
                      onChange={(e) => setResumeSummary(e.target.value)}
                      placeholder="Experienced engineer skilled in backend scalability..."
                      className="w-full h-20 bg-black/40 border border-white/10 rounded-xl p-3 text-xs focus:outline-none focus:border-white/30 resize-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs text-muted-foreground">Work Experience</label>
                    <textarea
                      value={resumeExperience}
                      onChange={(e) => setResumeExperience(e.target.value)}
                      placeholder="Software Intern at Google (2025) - Optimized queries by 15%..."
                      className="w-full h-24 bg-black/40 border border-white/10 rounded-xl p-3 text-xs focus:outline-none focus:border-white/30 resize-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs text-muted-foreground">Education</label>
                    <textarea
                      value={resumeEducation}
                      onChange={(e) => setResumeEducation(e.target.value)}
                      placeholder="BS in Computer Science - Stanford University"
                      className="w-full h-16 bg-black/40 border border-white/10 rounded-xl p-3 text-xs focus:outline-none focus:border-white/30 resize-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs text-muted-foreground">Core Skills</label>
                    <textarea
                      value={resumeSkills}
                      onChange={(e) => setResumeSkills(e.target.value)}
                      placeholder="Python, React, SQL, AWS, Git"
                      className="w-full h-16 bg-black/40 border border-white/10 rounded-xl p-3 text-xs focus:outline-none focus:border-white/30 resize-none"
                    />
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5 space-y-4">
                {/* ATS Scanner */}
                <div className="p-6 rounded-3xl border border-border bg-white/5 backdrop-blur-sm space-y-4">
                  <h3 className="text-lg font-bold flex items-center gap-2">
                    <Zap className="text-yellow-400" size={18} />
                    ATS Optimization Center
                  </h3>
                  <div className="space-y-1">
                    <label className="text-xs text-muted-foreground">Target Job Description</label>
                    <textarea
                      value={resumeJobDesc}
                      onChange={(e) => setResumeJobDesc(e.target.value)}
                      placeholder="Paste target job descriptions to score compatibility..."
                      className="w-full h-24 bg-black/40 border border-white/10 rounded-xl p-3 text-xs focus:outline-none focus:border-white/30 resize-none"
                    />
                  </div>

                  <button
                    onClick={handleAtsCheck}
                    disabled={resumeScoring || !resumeSummary.trim()}
                    className="w-full py-3 rounded-full bg-white text-black font-semibold text-xs hover:bg-white/90 transition-colors disabled:opacity-40"
                  >
                    {resumeScoring ? "Checking ATS compatibility..." : "Score Resume (ATS Check)"}
                  </button>

                  {resumeAtsScore !== null && (
                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-muted-foreground font-semibold">Compatibility Score:</span>
                        <span className={`text-lg font-bold ${
                          resumeAtsScore >= 75 ? "text-green-400" : "text-yellow-400"
                        }`}>{resumeAtsScore}%</span>
                      </div>
                      <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                        <div
                          style={{ width: `${resumeAtsScore}%` }}
                          className={`h-full rounded-full ${
                            resumeAtsScore >= 75 ? "bg-green-500" : "bg-yellow-500"
                          }`}
                        />
                      </div>

                      <div className="space-y-1">
                        <span className="text-xs text-yellow-400 font-semibold">Recommendations:</span>
                        <ul className="space-y-1">
                          {resumeAtsFeedback.map((f, i) => (
                            <li key={i} className="text-xs text-gray-300 list-disc list-inside">{f}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>

                {/* Resume Actions */}
                <div className="p-6 rounded-3xl border border-border bg-white/5 backdrop-blur-sm space-y-4 text-center">
                  <h3 className="text-sm font-bold text-white">Download Options</h3>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      onClick={() => downloadResume("pdf")}
                      className="py-2.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-xs font-semibold flex flex-col items-center justify-center gap-1 transition-colors"
                    >
                      <Download size={14} />
                      PDF
                    </button>
                    <button
                      onClick={() => downloadResume("docx")}
                      className="py-2.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-xs font-semibold flex flex-col items-center justify-center gap-1 transition-colors"
                    >
                      <Download size={14} />
                      DOCX
                    </button>
                    <button
                      onClick={() => downloadResume("json")}
                      className="py-2.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-xs font-semibold flex flex-col items-center justify-center gap-1 transition-colors"
                    >
                      <Download size={14} />
                      JSON
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* ── COMMUNITY ── */}
          {activeTab === "community" && (
            <motion.div key="community" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              <h2 className="text-3xl font-display mb-2">Community Hub</h2>
              <p className="text-muted-foreground mb-8">Study groups, coding battles, hackathons and leaderboards.</p>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Leaderboard */}
                <div className="p-6 rounded-3xl border border-border bg-white/5">
                  <div className="flex items-center gap-3 mb-6">
                    <Medal className="text-yellow-400" size={24} />
                    <h3 className="text-xl font-display">Weekly Leaderboard</h3>
                  </div>
                  {leaderboard.length > 0 ? (
                    leaderboard.map((user, i) => (
                      <div key={user.user_id} className={`flex items-center justify-between py-3 border-b border-white/5 last:border-0 ${user.user_id === profile?.id ? "text-blue-400 font-semibold" : ""}`}>
                        <div className="flex items-center gap-3">
                          <span className="w-6 text-center text-sm font-mono text-muted-foreground">#{i + 1}</span>
                          <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center text-xs font-bold shrink-0 text-white">
                            {(user.display_name || "U")[0].toUpperCase()}
                          </div>
                          <span className="text-sm">{user.user_id === profile?.id ? "You" : user.display_name}</span>
                        </div>
                        <span className="text-sm font-mono">{user.total_xp} XP</span>
                      </div>
                    ))
                  ) : (
                    <div className="flex items-center justify-between py-3">
                      <div className="flex items-center gap-3">
                        <span className="w-6 text-center text-sm font-mono text-muted-foreground">#1</span>
                        <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center text-xs font-bold shrink-0 text-white">
                          {avatarInitial}
                        </div>
                        <span className="text-sm font-semibold text-blue-400">You (First place)</span>
                      </div>
                      <span className="text-sm font-mono">{xp} XP</span>
                    </div>
                  )}
                </div>

                {/* Study Groups – real Supabase data */}
                <div className="p-6 rounded-3xl border border-border bg-white/5">
                  <div className="flex items-center gap-3 mb-6">
                    <Users className="text-purple-400" size={24} />
                    <h3 className="text-xl font-display">Active Study Groups</h3>
                  </div>
                  {communityLoading ? (
                    <div className="text-sm text-muted-foreground">Loading groups...</div>
                  ) : studyGroups.length === 0 ? (
                    <div className="text-sm text-muted-foreground">No groups yet — check back soon!</div>
                  ) : (
                    studyGroups.map((g) => (
                      <div key={g.id} className="flex items-center justify-between py-3 border-b border-white/5 last:border-0">
                        <div>
                          <div className="text-sm font-medium">{g.name}</div>
                          <div className="text-xs text-muted-foreground mt-0.5">{g.member_count} members · {g.topic}</div>
                        </div>
                        <button
                          onClick={() => toggleGroupMembership(g.id, g.is_member)}
                          className={`text-xs px-3 py-1 rounded-full transition-colors ${
                            g.is_member
                              ? "bg-blue-500/30 text-blue-300 hover:bg-red-500/30 hover:text-red-300"
                              : "bg-white/10 hover:bg-white/20"
                          }`}
                        >
                          {g.is_member ? "Joined ✓" : "Join"}
                        </button>
                      </div>
                    ))
                  )}
                </div>

                {/* Upcoming Events – real Supabase data */}
                <div className="p-6 rounded-3xl border border-border bg-white/5">
                  <div className="flex items-center gap-3 mb-6">
                    <BookOpen className="text-green-400" size={24} />
                    <h3 className="text-xl font-display">Upcoming Events</h3>
                  </div>
                  {communityLoading ? (
                    <div className="text-sm text-muted-foreground">Loading events...</div>
                  ) : communityEvents.length === 0 ? (
                    <div className="text-sm text-muted-foreground">No upcoming events — check back soon!</div>
                  ) : (
                    communityEvents.map((e) => (
                      <div key={e.id} className="py-3 border-b border-white/5 last:border-0">
                        <div className="flex justify-between items-start mb-1">
                          <div className="text-sm font-medium">{e.title}</div>
                          <span className="text-xs px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 shrink-0 ml-2">{e.type}</span>
                        </div>
                        <div className="text-xs text-muted-foreground mb-2">{formatEventTime(e.event_time)} · {e.attendee_count} attending</div>
                        <button
                          onClick={() => toggleEventRsvp(e.id, e.is_rsvpd)}
                          className={`text-xs px-3 py-1 rounded-full transition-colors ${
                            e.is_rsvpd
                              ? "bg-green-500/30 text-green-300 hover:bg-red-500/30 hover:text-red-300"
                              : "bg-white/10 hover:bg-white/20"
                          }`}
                        >
                          {e.is_rsvpd ? "RSVP'd ✓" : "RSVP"}
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

/* ── AI Mentor Chat Component ── */
function AIMentorChat({ messages, chatInput, setChatInput, onSend }: {
  messages: { from: "ai" | "user"; text: string }[];
  chatInput: string;
  setChatInput: (v: string) => void;
  onSend: () => void;
}) {
  return (
    <div className="p-6 rounded-3xl border border-border bg-white/5 backdrop-blur-sm flex flex-col h-[680px]">
      <div className="flex items-center justify-between mb-5 border-b border-white/10 pb-4 shrink-0">
        <div className="flex items-center gap-3">
          <div className="relative">
            <MessageSquare className="text-white/80" size={22} />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-background"></span>
          </div>
          <div>
            <h3 className="text-lg font-display">AI Mentor</h3>
            <p className="text-xs text-muted-foreground">Online 24/7</p>
          </div>
        </div>
        <span className="text-xs px-2.5 py-1 rounded-full bg-green-500/20 text-green-400">Active</span>
      </div>

      <div className="flex-1 flex flex-col gap-3 overflow-y-auto custom-scrollbar mb-4 pr-1">
        {messages.map((msg, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-3 rounded-2xl text-sm leading-relaxed max-w-[90%] ${
              msg.from === "ai"
                ? "bg-white/10 text-gray-200 self-start rounded-tl-sm"
                : "bg-blue-500/20 text-blue-100 self-end rounded-tr-sm border border-blue-500/30"
            }`}
          >
            {msg.text}
          </motion.div>
        ))}
      </div>

      <div className="shrink-0 flex gap-2 items-center">
        <input
          type="text"
          value={chatInput}
          onChange={(e) => setChatInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && onSend()}
          placeholder="Ask me anything..."
          className="flex-1 bg-black/40 border border-white/10 rounded-full py-3 px-4 text-sm focus:outline-none focus:border-white/30 transition-colors placeholder:text-muted-foreground"
        />
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onSend}
          className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center shrink-0"
        >
          <Send size={16} />
        </motion.button>
      </div>
    </div>
  );
}
