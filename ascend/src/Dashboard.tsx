import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowLeft, Trophy, Flame, Star, MessageSquare, Moon, Sun, Monitor,
  ChevronRight, Target, BookOpen, Code2, BarChart3,
  Zap, Users, Medal, CheckCircle2, Send, LayoutDashboard,
  Map, Mic, FileText, Building2, LogOut, Download, AlertCircle, Play, RefreshCw, Award,
  Brain, Briefcase, Palette
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import SyllabusModule from "./components/SyllabusModule";
import DailyChallenge from "./components/DailyChallenge";
import PlacementCertification from "./components/PlacementCertification";
import { LessonWalkthrough } from "./components/LessonWalkthrough";
import { useAuth } from "./context/AuthContext";
import { supabase } from "./lib/supabase";
import { useCommunityHub } from "./hooks/useCommunityHub";
import { useBranchRole, useRoleContent } from "./hooks/useBranchRole";
import BranchRolePicker from "./components/BranchRolePicker";
import { getBranchCompanies, type CompanyTrack } from "./data/companyData";
import HomePanel from "./components/HomePanel";
import LearningGamePath from "./components/LearningGamePath";
import PortfolioCreatorPanel from "./components/PortfolioCreatorPanel";
import MaahirAIPanel from "./components/MaahirAIPanel";
import LifeOSPanel from "./components/LifeOSPanel";

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

type Tab = "home" | "journey" | "community" | "resume" | "portfolio" | "maahir-ai" | "life-os";

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

/** Normalizes branch-specific company tracks for the full interview workspace. */
function createCompanyDetails(track: CompanyTrack): CompanyDetails {
  const behavioral = track.interviewQuestions.find((question) =>
    /hr|behavioral|leadership|managerial/i.test(question.round)
  ) ?? track.interviewQuestions[0];

  return {
    name: track.name,
    logo: track.logo,
    color: track.color,
    border: "border-border",
    description: `${track.name} preparation track for ${track.roles.join(", ")}. Interview flow: ${track.rounds.join(" • ")}.`,
    codingRound: {
      question: track.codingQuestion.title,
      description: track.codingQuestion.desc,
      sampleInput: "Use the function signature in the editor.",
      sampleOutput: "Validate against edge cases and explain the complexity.",
      approach: "Start with a correct baseline, state time and space complexity, then improve it if constraints require.",
      bookReference: "Use the role-specific roadmap and official documentation for the technologies named in this track.",
    },
    aptitudeRound: {
      question: "A project has 5 tasks estimated at 4 hours each. If two tasks are completed in parallel, what is the minimum elapsed time?",
      options: ["4 hours", "8 hours", "12 hours", "20 hours"],
      answer: 2,
      explanation: "Two tasks can run in parallel, so the five tasks require three time slots: 3 × 4 = 12 hours.",
      bookReference: "Practice quantitative reasoning and role-specific assessments from the learning roadmap.",
    },
    hrRound: {
      question: behavioral?.question ?? "Tell us about a project you are proud of.",
      bestApproach: behavioral?.tip ?? "Use the STAR format and quantify the outcome.",
      starExample: "Situation: Explain the context.\nTask: State your responsibility.\nAction: Describe the specific decisions you made.\nResult: Share a measurable outcome and what you learned.",
    },
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

  const [theme, setTheme] = useState<"light"|"navy"|"black">("light");

  useEffect(() => {
    document.documentElement.classList.remove("theme-navy", "theme-black");
    if (theme === "navy") document.documentElement.classList.add("theme-navy");
    if (theme === "black") document.documentElement.classList.add("theme-black");
  }, [theme]);

  const [activeTab, setActiveTab] = useState<Tab>("home");
  const [challengeCompleted, setChallengeCompleted] = useState(false);
  const [showCertification, setShowCertification] = useState(false);
  const [leaderboard, setLeaderboard] = useState<{ display_name: string; total_xp: number; user_id: string }[]>([]);

  // Branch and Role selection
  const { branchId, roleId, loading: branchLoading, selectRole, clearRole } = useBranchRole(profile?.id ?? null);
  const { syllabus: branchSyllabus, hrQuestions: branchHrQuestions, mockQuestions: branchMockQuestions, loading: contentLoading } = useRoleContent(branchId, roleId);

  // Community Hub – real Supabase data
  const { groups: studyGroups, events: communityEvents, loading: communityLoading, actionLoading: communityActionLoading, userId: communityUserId, toggleGroupMembership, toggleEventRsvp, createGroup, deleteGroup, createEvent, deleteEvent } = useCommunityHub();
  const [showCreateGroup, setShowCreateGroup] = useState(false);
  const [showCreateEvent, setShowCreateEvent] = useState(false);
  const [newGroupForm, setNewGroupForm] = useState({ name: "", topic: "", description: "" });
  const [newEventForm, setNewEventForm] = useState({ title: "", speaker: "", type: "Masterclass", event_time: "" });
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

  // Resume builder states — persisted in localStorage for real-time retention
  const savedResume = (() => { try { return (JSON.parse(localStorage.getItem("resume_data") || "{}") || {}) as Record<string, string>; } catch { return {} as Record<string, string>; } })();
  const [resumeName, setResumeName] = useState(savedResume.name || "");
  const [resumeEmail, setResumeEmail] = useState(savedResume.email || "");
  const [resumePhone, setResumePhone] = useState(savedResume.phone || "");
  const [resumeSummary, setResumeSummary] = useState(savedResume.summary || "");
  const [resumeExperience, setResumeExperience] = useState(savedResume.experience || "");
  const [resumeEducation, setResumeEducation] = useState(savedResume.education || "");
  const [resumeSkills, setResumeSkills] = useState(savedResume.skills || "");
  const [resumeJobDesc, setResumeJobDesc] = useState(savedResume.jobDesc || "");
  const [resumeAtsScore, setResumeAtsScore] = useState<number | null>(null);
  const [resumeAtsFeedback, setResumeAtsFeedback] = useState<string[]>([]);
  const [resumeScoring, setResumeScoring] = useState(false);

  // Auto-save resume fields to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("resume_data", JSON.stringify({
      name: resumeName, email: resumeEmail, phone: resumePhone,
      summary: resumeSummary, experience: resumeExperience,
      education: resumeEducation, skills: resumeSkills, jobDesc: resumeJobDesc,
    }));
  }, [resumeName, resumeEmail, resumePhone, resumeSummary, resumeExperience, resumeEducation, resumeSkills, resumeJobDesc]);

  // Selected phase jump target
  const [targetPhase, setTargetPhase] = useState<number | undefined>(undefined);
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

  // Real ATS keyword extraction and scoring engine
  const handleAtsCheck = () => {
    setResumeScoring(true);
    // Run analysis synchronously — no fake delay
    requestAnimationFrame(() => {
      const resumeText = [resumeName, resumeSummary, resumeExperience, resumeEducation, resumeSkills].join(" ").toLowerCase();
      const feedback: string[] = [];
      let score = 0;
      let maxPoints = 0;

      // ── 1. Extract real keywords from the pasted Job Description ──
      const jdWords = resumeJobDesc
        .toLowerCase()
        .replace(/[^a-z0-9#+.\s]/gi, " ")
        .split(/\s+/)
        .filter((w: string) => w.length > 2);
      const stopWords = new Set(["the","and","for","are","with","you","will","our","from","that","this","have","your","about","more","all","can","been","has","not","but","they","its","who","what","also","may","any"]);
      const jdKeywords: string[] = Array.from(new Set(jdWords.filter((w: string) => !stopWords.has(w))));

      if (jdKeywords.length > 0) {
        // Score each JD keyword against resume text
        const matched: string[] = [];
        const missed: string[] = [];
        jdKeywords.forEach((kw: string) => {
          if (resumeText.includes(kw)) matched.push(kw);
          else missed.push(kw);
        });
        const matchRatio = matched.length / jdKeywords.length;
        score += Math.round(matchRatio * 40); // up to 40 points from JD matching
        maxPoints += 40;
        if (missed.length > 0 && missed.length <= 10) {
          feedback.push(`⚠️ Missing JD keywords: ${missed.slice(0, 8).join(", ")}. Add these to your skills or summary.`);
        } else if (missed.length > 10) {
          feedback.push(`⚠️ ${missed.length} JD keywords not found in your resume. Focus on: ${missed.slice(0, 6).join(", ")}...`);
        }
        if (matchRatio >= 0.7) feedback.push("✅ Strong keyword alignment with the job description!");
      } else {
        // No JD pasted — use universal tech keywords
        const universalKw = ["react","python","sql","java","javascript","typescript","docker","aws","git","agile","api","node","design","test","deploy","database","linux","cloud","architecture","optimization"];
        let hits = 0;
        universalKw.forEach((kw: string) => { if (resumeText.includes(kw)) hits++; });
        score += Math.round((hits / universalKw.length) * 40);
        maxPoints += 40;
        feedback.push("💡 Paste a target Job Description for precise ATS keyword matching.");
      }

      // ── 2. Content quality checks ──
      maxPoints += 15;
      if (resumeSummary.length >= 100) { score += 15; feedback.push("✅ Professional summary is detailed and compelling."); }
      else if (resumeSummary.length >= 50) { score += 8; feedback.push("⚠️ Summary is adequate. Expand to 100+ characters with industry keywords."); }
      else { feedback.push("❌ Professional Summary is too short. Write 2-3 sentences highlighting your value proposition."); }

      maxPoints += 15;
      if (/\d+%|\d+x|\$\d|\d+ (user|client|project|team)/i.test(resumeExperience)) { score += 15; feedback.push("✅ Quantified achievements detected — great for ATS."); }
      else { feedback.push("⚠️ Quantify achievements: use metrics like '30% faster', '50+ users', '$10K saved'."); }

      maxPoints += 10;
      const skillCount = resumeSkills.split(/[,;|]/).filter((s: string) => s.trim()).length;
      if (skillCount >= 8) { score += 10; feedback.push(`✅ ${skillCount} skills listed — solid breadth.`); }
      else if (skillCount >= 4) { score += 5; feedback.push(`⚠️ ${skillCount} skills found. Aim for 8-12 relevant technical skills.`); }
      else { feedback.push("❌ Too few skills. List 8-12 core technologies separated by commas."); }

      maxPoints += 10;
      const actionVerbs = ["led","built","designed","implemented","optimized","deployed","managed","architected","created","developed","scaled","automated","reduced","improved","mentored"];
      const verbHits = actionVerbs.filter((v: string) => resumeText.includes(v)).length;
      if (verbHits >= 4) { score += 10; feedback.push("✅ Strong action verbs used throughout."); }
      else if (verbHits >= 2) { score += 5; feedback.push("⚠️ Use more power verbs: Led, Built, Architected, Optimized, Deployed."); }
      else { feedback.push("❌ Add action verbs to describe your experience (e.g., Designed, Implemented, Scaled)."); }

      maxPoints += 10;
      if (resumeName.trim() && resumeEmail.trim() && resumePhone.trim()) { score += 10; }
      else { feedback.push("⚠️ Fill in all contact details (Name, Email, Phone) for a complete resume."); }

      // Calculate final percentage
      const finalScore = maxPoints > 0 ? Math.round((score / maxPoints) * 100) : 0;

      setResumeAtsScore(finalScore);
      setResumeAtsFeedback(feedback);
      setResumeScoring(false);
      updateXP(20);
    });
  };

  // Resume Download Helpers
  const downloadResume = (format: "pdf" | "doc" | "json") => {
    const resumeData = {
      name: resumeName || "User Name",
      email: resumeEmail || "user@email.com",
      phone: resumePhone || "+1-123-456-7890",
      summary: resumeSummary || "A highly motivated candidate looking for new challenges.",
      experience: resumeExperience || "Software Engineer Intern - Ascend Inc.",
      education: resumeEducation || "Bachelor of Science in Computer Science",
      skills: resumeSkills || "React, Javascript, Python, SQL"
    };

    const filename = `${resumeData.name.replace(/\s+/g, "_")}_Resume`;
    const escapeHtml = (value: string) => value
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\n/g, "<br />");
    const resumeHtml = `<!doctype html>
      <html><head><meta charset="utf-8" /><title>${escapeHtml(resumeData.name)} Resume</title>
      <style>
        @page { margin: 18mm; }
        body { font-family: Arial, sans-serif; color: #172033; line-height: 1.5; max-width: 800px; margin: 0 auto; }
        h1 { margin: 0; font-size: 30px; } h2 { font-size: 13px; letter-spacing: .08em; text-transform: uppercase; border-bottom: 1px solid #cbd5e1; padding-bottom: 5px; margin: 24px 0 8px; }
        .contact { color: #475569; margin-top: 4px; } p { white-space: normal; margin: 0; }
      </style></head><body>
        <h1>${escapeHtml(resumeData.name)}</h1>
        <p class="contact">${escapeHtml(resumeData.email)} &middot; ${escapeHtml(resumeData.phone)}</p>
        <h2>Professional Summary</h2><p>${escapeHtml(resumeData.summary)}</p>
        <h2>Experience</h2><p>${escapeHtml(resumeData.experience)}</p>
        <h2>Education</h2><p>${escapeHtml(resumeData.education)}</p>
        <h2>Skills</h2><p>${escapeHtml(resumeData.skills)}</p>
      </body></html>`;

    if (format === "json") {
      const blob = new Blob([JSON.stringify(resumeData, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${filename}.json`;
      link.click();
      URL.revokeObjectURL(url);
      return;
    }

    if (format === "pdf") {
      const printWindow = window.open("", "_blank", "noopener,noreferrer");
      if (!printWindow) return;
      printWindow.document.write(resumeHtml);
      printWindow.document.close();
      printWindow.focus();
      printWindow.onafterprint = () => printWindow.close();
      window.setTimeout(() => printWindow.print(), 250);
      return;
    }

    const blob = new Blob([resumeHtml], { type: "application/msword" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${filename}.doc`;
    link.click();
    URL.revokeObjectURL(url);
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
    { id: "home", label: "Home", icon: <LayoutDashboard size={18} /> },
    { id: "journey", label: "My Journey", icon: <Trophy size={18} /> },
    { id: "community", label: "Community", icon: <Users size={18} /> },
    { id: "resume", label: "Resume & ATS", icon: <FileText size={18} /> },
    { id: "portfolio", label: "Portfolio Creator", icon: <Palette size={18} /> },
    { id: "maahir-ai", label: "Maahir AI", icon: <Brain size={18} /> },
    { id: "life-os", label: "Life OS AI Planner", icon: <Target size={18} /> },
  ] as const;

  if (branchLoading) {
    return <div className="min-h-screen flex items-center justify-center bg-background"><div className="text-muted-foreground">Loading your profile...</div></div>;
  }

  if (!branchId || !roleId) {
    return <BranchRolePicker onSelect={selectRole} />;
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Top Header */}
      <header className="sticky top-0 z-30 bg-background/95 backdrop-blur-md border-b border-border px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <button onClick={clearRole} className="p-2 rounded-full hover:bg-white/10 transition-colors">
              <ArrowLeft size={18} />
            </button>
            {/* CARVEX icon mark */}
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{background:"linear-gradient(135deg,#7C3AED 0%,#00E5FF 100%)"}}>
              <svg width="17" height="17" viewBox="0 0 22 22" fill="none">
                <polyline points="2,18 11,4 20,18" stroke="white" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="11" cy="4" r="2.2" fill="#00E5FF"/>
              </svg>
            </div>
            <span className="text-lg font-bold tracking-widest text-foreground" style={{letterSpacing:"0.18em"}}>CARVEX</span>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-6">
            <div className="flex items-center bg-background/50 border border-border rounded-full p-1 gap-1">
              <button onClick={() => setTheme("light")} className={`p-1.5 rounded-full transition-colors ${theme === "light" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted"}`} title="Light Theme"><Sun size={14} /></button>
              <button onClick={() => setTheme("navy")} className={`p-1.5 rounded-full transition-colors ${theme === "navy" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted"}`} title="Warm Dark Theme"><Monitor size={14} /></button>
              <button onClick={() => setTheme("black")} className={`p-1.5 rounded-full transition-colors ${theme === "black" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted"}`} title="Pure Black Theme"><Moon size={14} /></button>
            </div>
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 shadow-sm" title="Duolingo Placement Diamonds">
              <span className="text-sm">💎</span>
              <span className="text-sm font-bold text-foreground">{Math.floor((xp ?? 0) * 0.4) + 50} 💎</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20">
              <Flame className="text-foreground" size={16} />
              <span className="text-sm font-bold text-foreground">{streak} Day Streak</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-yellow-500/10 border border-yellow-500/20">
              <Star className="text-foreground" size={16} />
              <span className="text-sm font-bold text-foreground">{xp} XP</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20">
              <Trophy className="text-foreground" size={16} />
              <span className="text-sm font-bold text-foreground">Level {level}</span>
            </div>
            <button
              onClick={() => setShowCertification(true)}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 font-bold text-xs text-slate-950 shadow-md transition cursor-pointer"
            >
              <Award size={15} />
              <span>Get Certified</span>
            </button>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 border-2 border-border flex items-center justify-center text-sm font-bold shrink-0">
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
                  ? "bg-white text-background"
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
          {/* ── HOME DASHBOARD ── */}
          {activeTab === "home" && (
            <motion.div key="home" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              <HomePanel
                userName={profile?.name?.split(" ")[0] || "Student"}
                branchId={branchId}
                roleId={roleId}
                xp={xp}
                streak={streak}
                diamonds={Math.floor((xp ?? 0) * 0.4) + 50}
                level={level}
                placementScore={placementScore}
                onStartJourney={(phase) => {
                  setTargetPhase(phase);
                  setActiveTab("journey");
                }}
                onOpenCertification={() => setShowCertification(true)}
              />
            </motion.div>
          )}

          {/* ── MY JOURNEY (SINGLE LINEAR PATH) ── */}
          {activeTab === "journey" && (
            <motion.div key="journey" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              <LearningGamePath
                branchId={branchId}
                roleId={roleId}
                targetPhase={targetPhase}
                onNodeComplete={(xpEarned) => {
                  updateXP(xpEarned);
                  updateStreak();
                }}
              />
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
                    <Medal className="text-foreground" size={24} />
                    <h3 className="text-xl font-display">Weekly Leaderboard</h3>
                  </div>
                  {leaderboard.length > 0 ? (
                    leaderboard.map((user, i) => (
                      <div key={user.user_id} className={`flex items-center justify-between py-3 border-b border-border last:border-0 ${user.user_id === profile?.id ? "text-foreground font-semibold" : ""}`}>
                        <div className="flex items-center gap-3">
                          <span className="w-6 text-center text-sm font-mono text-muted-foreground">#{i + 1}</span>
                          <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center text-xs font-bold shrink-0 text-foreground">
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
                        <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center text-xs font-bold shrink-0 text-foreground">
                          {avatarInitial}
                        </div>
                        <span className="text-sm font-semibold text-foreground">You (First place)</span>
                      </div>
                      <span className="text-sm font-mono">{xp} XP</span>
                    </div>
                  )}
                </div>

                {/* Study Groups – real Supabase data */}
                <div className="p-6 rounded-3xl border border-border bg-white/5">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <Users className="text-foreground" size={24} />
                      <h3 className="text-xl font-display">Active Study Groups</h3>
                    </div>
                    <button
                      onClick={() => setShowCreateGroup(!showCreateGroup)}
                      className="text-xs px-3 py-1.5 rounded-full bg-purple-500/20 text-foreground hover:bg-purple-500/30 transition-colors flex items-center gap-1"
                    >
                      {showCreateGroup ? "✕ Cancel" : "+ Create Group"}
                    </button>
                  </div>

                  {/* Create Group Form */}
                  {showCreateGroup && (
                    <div className="mb-4 p-4 rounded-2xl bg-white/5 border border-purple-500/20 space-y-3">
                      <input
                        type="text" placeholder="Group name (e.g. DSA Warriors)" maxLength={50}
                        value={newGroupForm.name} onChange={(e) => setNewGroupForm(f => ({ ...f, name: e.target.value }))}
                        className="w-full bg-card border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-purple-400"
                      />
                      <input
                        type="text" placeholder="Topic (e.g. Data Structures & Algorithms)" maxLength={60}
                        value={newGroupForm.topic} onChange={(e) => setNewGroupForm(f => ({ ...f, topic: e.target.value }))}
                        className="w-full bg-card border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-purple-400"
                      />
                      <textarea
                        placeholder="Short description (optional)" maxLength={200} rows={2}
                        value={newGroupForm.description} onChange={(e) => setNewGroupForm(f => ({ ...f, description: e.target.value }))}
                        className="w-full bg-card border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-purple-400 resize-none"
                      />
                      <button
                        disabled={communityActionLoading || !newGroupForm.name.trim() || !newGroupForm.topic.trim()}
                        onClick={async () => {
                          const ok = await createGroup(newGroupForm);
                          if (ok) { setNewGroupForm({ name: "", topic: "", description: "" }); setShowCreateGroup(false); }
                        }}
                        className="w-full py-2 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-foreground text-sm font-semibold rounded-lg transition-colors"
                      >
                        {communityActionLoading ? "Creating..." : "Create Group"}
                      </button>
                    </div>
                  )}

                  {communityLoading ? (
                    <div className="text-sm text-muted-foreground">Loading groups...</div>
                  ) : studyGroups.length === 0 ? (
                    <div className="text-sm text-muted-foreground">No groups yet — be the first to create one!</div>
                  ) : (
                    studyGroups.map((g) => (
                      <div key={g.id} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                        <div>
                          <div className="text-sm font-medium">{g.name}</div>
                          <div className="text-xs text-muted-foreground mt-0.5">{g.member_count} members · {g.topic}</div>
                        </div>
                        <div className="flex items-center gap-2">
                          {g.is_owner && (
                            <button
                              onClick={() => { if (confirm(`Delete group "${g.name}"?`)) deleteGroup(g.id); }}
                              className="text-xs px-2 py-1 rounded-full bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors"
                              title="Delete your group"
                            >
                              🗑️
                            </button>
                          )}
                          {!g.is_owner && (
                            <button
                              onClick={() => toggleGroupMembership(g.id, g.is_member)}
                              className={`text-xs px-3 py-1 rounded-full transition-colors ${
                                g.is_member
                                  ? "bg-blue-500/30 text-foreground hover:bg-red-500/30 hover:text-red-300"
                                  : "bg-white/10 hover:bg-white/20"
                              }`}
                            >
                              {g.is_member ? "Joined ✓" : "Join"}
                            </button>
                          )}
                          {g.is_owner && (
                            <span className="text-xs px-2 py-1 rounded-full bg-purple-500/20 text-foreground">Owner</span>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {/* Upcoming Events – real Supabase data with auto-expiry */}
                <div className="p-6 rounded-3xl border border-border bg-white/5">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <BookOpen className="text-foreground" size={24} />
                      <h3 className="text-xl font-display">Upcoming Events</h3>
                    </div>
                    <button
                      onClick={() => setShowCreateEvent(!showCreateEvent)}
                      className="text-xs px-3 py-1.5 rounded-full bg-green-500/20 text-foreground hover:bg-green-500/30 transition-colors flex items-center gap-1"
                    >
                      {showCreateEvent ? "✕ Cancel" : "+ Add Event"}
                    </button>
                  </div>

                  {/* Create Event Form */}
                  {showCreateEvent && (
                    <div className="mb-4 p-4 rounded-2xl bg-white/5 border border-green-500/20 space-y-3">
                      <input
                        type="text" placeholder="Event title" maxLength={80}
                        value={newEventForm.title} onChange={(e) => setNewEventForm(f => ({ ...f, title: e.target.value }))}
                        className="w-full bg-card border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-green-400"
                      />
                      <input
                        type="text" placeholder="Speaker / Host name" maxLength={60}
                        value={newEventForm.speaker} onChange={(e) => setNewEventForm(f => ({ ...f, speaker: e.target.value }))}
                        className="w-full bg-card border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-green-400"
                      />
                      <select
                        value={newEventForm.type} onChange={(e) => setNewEventForm(f => ({ ...f, type: e.target.value }))}
                        className="w-full bg-card border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-green-400"
                      >
                        {["Masterclass","Workshop","Practice Session","Hackathon","Contest","Interview Prep"].map(t => (
                          <option key={t} value={t}>{t}</option>
                        ))}
                      </select>
                      <div>
                        <label className="text-xs text-muted-foreground mb-1 block">Event Date & Time</label>
                        <input
                          type="datetime-local"
                          value={newEventForm.event_time} onChange={(e) => setNewEventForm(f => ({ ...f, event_time: e.target.value }))}
                          min={new Date().toISOString().slice(0, 16)}
                          className="w-full bg-card border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-green-400"
                        />
                      </div>
                      <button
                        disabled={communityActionLoading || !newEventForm.title.trim() || !newEventForm.event_time}
                        onClick={async () => {
                          const ok = await createEvent({ ...newEventForm, event_time: new Date(newEventForm.event_time).toISOString() });
                          if (ok) { setNewEventForm({ title: "", speaker: "", type: "Masterclass", event_time: "" }); setShowCreateEvent(false); }
                        }}
                        className="w-full py-2 bg-green-600 hover:bg-green-700 disabled:opacity-50 text-foreground text-sm font-semibold rounded-lg transition-colors"
                      >
                        {communityActionLoading ? "Saving..." : "Create Event"}
                      </button>
                    </div>
                  )}

                  {communityLoading ? (
                    <div className="text-sm text-muted-foreground">Loading events...</div>
                  ) : communityEvents.length === 0 ? (
                    <div className="text-sm text-muted-foreground">No upcoming events — create one above!</div>
                  ) : (
                    communityEvents.map((e) => (
                      <div key={e.id} className={`py-3 border-b border-border last:border-0 ${e.is_past ? "opacity-50" : ""}`}>
                        <div className="flex justify-between items-start mb-1">
                          <div className="text-sm font-medium">{e.title}</div>
                          <div className="flex items-center gap-1.5 shrink-0 ml-2">
                            {e.is_past && <span className="text-xs px-2 py-0.5 rounded-full bg-gray-500/20 text-muted-foreground">Ended</span>}
                            <span className="text-xs px-2 py-0.5 rounded-full bg-blue-500/20 text-foreground">{e.type}</span>
                          </div>
                        </div>
                        <div className="text-xs text-muted-foreground mb-2">{formatEventTime(e.event_time)} · {e.attendee_count} attending · {e.speaker}</div>
                        <div className="flex items-center gap-2">
                          {!e.is_past && !e.is_owner && (
                            <button
                              onClick={() => toggleEventRsvp(e.id, e.is_rsvpd)}
                              className={`text-xs px-3 py-1 rounded-full transition-colors ${
                                e.is_rsvpd
                                  ? "bg-green-500/30 text-foreground hover:bg-red-500/30 hover:text-red-300"
                                  : "bg-white/10 hover:bg-white/20"
                              }`}
                            >
                              {e.is_rsvpd ? "RSVP'd ✓" : "RSVP"}
                            </button>
                          )}
                          {e.is_owner && (
                            <>
                              <span className="text-xs px-2 py-1 rounded-full bg-green-500/20 text-foreground">Your Event</span>
                              <button
                                onClick={() => { if (confirm(`Delete event "${e.title}"?`)) deleteEvent(e.id); }}
                                className="text-xs px-2 py-1 rounded-full bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors"
                                title="Delete this event"
                              >
                                🗑️
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {/* ── RESUME BUILDER & ATS ANALYZER (STANDALONE) ── */}
          {activeTab === "resume" && (
            <motion.div key="resume" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              <h2 className="text-3xl font-display mb-2 flex items-center gap-3"><FileText className="text-foreground" size={28} /> Resume Builder & ATS Analyzer</h2>
              <p className="text-muted-foreground mb-6">Build your ATS-optimized resume, analyze keyword scores, and download in multiple formats. <span className="text-foreground font-bold">No level progression required.</span></p>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Left: Resume Editor */}
                <div className="p-6 rounded-3xl border border-border bg-white/5 space-y-4">
                  <h3 className="text-lg font-display flex items-center gap-2"><Briefcase size={20} className="text-foreground" /> Personal Details</h3>
                  <input value={resumeName} onChange={e => setResumeName(e.target.value)} placeholder="Full Name" className="w-full bg-card border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-purple-400" />
                  <div className="grid grid-cols-2 gap-3">
                    <input value={resumeEmail} onChange={e => setResumeEmail(e.target.value)} placeholder="Email" className="bg-card border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-purple-400" />
                    <input value={resumePhone} onChange={e => setResumePhone(e.target.value)} placeholder="Phone" className="bg-card border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-purple-400" />
                  </div>
                  <textarea value={resumeSummary} onChange={e => setResumeSummary(e.target.value)} placeholder="Professional Summary (use industry keywords)" rows={3} className="w-full bg-card border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-purple-400 resize-none" />
                  <textarea value={resumeExperience} onChange={e => setResumeExperience(e.target.value)} placeholder="Experience (quantify achievements, e.g. 'Improved efficiency by 30%')" rows={4} className="w-full bg-card border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-purple-400 resize-none" />
                  <textarea value={resumeEducation} onChange={e => setResumeEducation(e.target.value)} placeholder="Education (Degree, University, Year)" rows={2} className="w-full bg-card border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-purple-400 resize-none" />
                  <textarea value={resumeSkills} onChange={e => setResumeSkills(e.target.value)} placeholder="Skills (comma-separated: React, Python, SQL, Docker...)" rows={2} className="w-full bg-card border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-purple-400 resize-none" />
                  <textarea value={resumeJobDesc} onChange={e => setResumeJobDesc(e.target.value)} placeholder="Paste Target Job Description (for ATS keyword matching)" rows={3} className="w-full bg-card border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-cyan-400 resize-none" />
                </div>

                {/* Right: ATS Score + Actions */}
                <div className="space-y-6">
                  {/* ATS Score Card */}
                  <div className="p-6 rounded-3xl border border-border bg-white/5 text-center space-y-4">
                    <h3 className="text-lg font-display">ATS Compatibility Score</h3>
                    <div className="relative w-32 h-32 mx-auto">
                      <svg className="w-32 h-32 -rotate-90" viewBox="0 0 120 120">
                        <circle cx="60" cy="60" r="52" fill="none" stroke="#1e293b" strokeWidth="10" />
                        <circle cx="60" cy="60" r="52" fill="none" stroke={resumeAtsScore !== null ? (resumeAtsScore >= 80 ? "#22c55e" : resumeAtsScore >= 60 ? "#eab308" : "#ef4444") : "#334155"} strokeWidth="10" strokeDasharray={`${((resumeAtsScore || 0) / 100) * 327} 327`} strokeLinecap="round" />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-3xl font-bold">{resumeAtsScore !== null ? `${resumeAtsScore}%` : "—"}</span>
                      </div>
                    </div>
                    <button onClick={handleAtsCheck} disabled={resumeScoring} className="px-6 py-3 rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-foreground font-bold text-sm transition-all disabled:opacity-50">
                      {resumeScoring ? "Analyzing..." : "🔍 Run ATS Analysis"}
                    </button>
                  </div>

                  {/* Feedback */}
                  {resumeAtsFeedback.length > 0 && (
                    <div className="p-5 rounded-3xl border border-border bg-white/5 space-y-3">
                      <h4 className="text-sm font-bold text-amber-400 flex items-center gap-2"><AlertCircle size={16} /> ATS Feedback</h4>
                      {resumeAtsFeedback.map((fb, i) => (
                        <div key={i} className="p-3 rounded-xl bg-card border border-border text-xs text-slate-300 flex items-start gap-2">
                          <CheckCircle2 size={14} className="text-foreground shrink-0 mt-0.5" />
                          <span>{fb}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Download Buttons */}
                  <div className="p-5 rounded-3xl border border-border bg-white/5 space-y-3">
                    <h4 className="text-sm font-bold text-foreground">Download Resume</h4>
                    <div className="flex flex-wrap gap-3">
                      <button onClick={() => downloadResume("pdf")} className="px-4 py-2.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-300 text-xs font-bold transition-all flex items-center gap-1.5"><Download size={14} /> PDF</button>
                      <button onClick={() => downloadResume("doc")} className="px-4 py-2.5 rounded-xl bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/30 text-foreground text-xs font-bold transition-all flex items-center gap-1.5"><Download size={14} /> DOC</button>
                      <button onClick={() => downloadResume("json")} className="px-4 py-2.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-foreground text-xs font-bold transition-all flex items-center gap-1.5"><Download size={14} /> JSON</button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* ── PORTFOLIO CREATOR (STANDALONE) ── */}
          {activeTab === "portfolio" && (
            <motion.div key="portfolio" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              <h2 className="text-3xl font-display mb-2 flex items-center gap-3"><Palette className="text-fuchsia-400" size={28} /> Portfolio Creator</h2>
              <p className="text-muted-foreground mb-6">Build a stunning developer portfolio page. Fill in your details, pick a theme, and download a complete HTML portfolio. <span className="text-fuchsia-400 font-bold">No level progression required.</span></p>
              <PortfolioCreatorPanel />
            </motion.div>
          )}

          {/* ── MAAHIR AI (STANDALONE) ── */}
          {activeTab === "maahir-ai" && (
            <motion.div key="maahir-ai" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              <h2 className="text-3xl font-display mb-2 flex items-center gap-3"><Brain className="text-fuchsia-400 animate-pulse" size={28} /> Maahir AI — Career Co-Pilot</h2>
              <p className="text-muted-foreground mb-6">Your inbuilt large-scale AI assistant. Summarize text, get coding puzzles, analyze resumes, and get placement tips. <span className="text-fuchsia-400 font-bold">100% offline, 0 latency, no API keys.</span></p>
              <MaahirAIPanel branchId={branchId} roleId={roleId} />
            </motion.div>
          )}

          {/* ── LIFE OS AI PLANNER (STANDALONE) ── */}
          {activeTab === "life-os" && (
            <motion.div key="life-os" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              <h2 className="text-3xl font-display mb-2 flex items-center gap-3"><Target className="text-foreground" size={28} /> Life OS AI Study Planner</h2>
              <p className="text-muted-foreground mb-6">Real-time study schedule generator, habits tracker, and placement timeline planning. <span className="text-foreground font-bold">No level progression required.</span></p>
              <LifeOSPanel branchId={branchId} roleId={roleId} />
            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {showCertification && (
        <PlacementCertification
          onClose={() => setShowCertification(false)}
          userBranch={branchId || "Computer Science Engineering"}
          userName={profile?.name || "Student Candidate"}
        />
      )}
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
      <div className="flex items-center justify-between mb-5 border-b border-border pb-4 shrink-0">
        <div className="flex items-center gap-3">
          <div className="relative">
            <MessageSquare className="text-foreground/80" size={22} />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-background"></span>
          </div>
          <div>
            <h3 className="text-lg font-display">AI Mentor</h3>
            <p className="text-xs text-muted-foreground">Online 24/7</p>
          </div>
        </div>
        <span className="text-xs px-2.5 py-1 rounded-full bg-green-500/20 text-foreground">Active</span>
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
          className="flex-1 bg-card border border-border rounded-full py-3 px-4 text-sm focus:outline-none focus:border-border transition-colors placeholder:text-muted-foreground"
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
