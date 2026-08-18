import React, { useState, useEffect } from "react";
import { Download, CheckCircle, Clock, Award, ListTodo, AlertCircle, Code2 } from "lucide-react";
import { supabase } from "../lib/supabase";

interface Habit { id: string; label: string; done: boolean; xpReward: number; }

export default function LifeOSPanel({ branchId, roleId }: { branchId?: string | null; roleId?: string | null }) {
  const branch = branchId || "CSE";
  const role = roleId || "Software Engineer";

  // Habit Tracker State — persisted in localStorage with daily reset
  const defaultHabits: Habit[] = [
    { id: "dsa", label: "Solve 1 DSA coding question", done: false, xpReward: 15 },
    { id: "quant", label: "Solve 5 Quantitative Aptitude sums", done: false, xpReward: 10 },
    { id: "mock", label: "Review 10 mock placement questions", done: false, xpReward: 10 },
    { id: "english", label: "Spend 10 mins practicing verbal mock interviews", done: false, xpReward: 10 },
    { id: "resume", label: "Revise keywords for target MNC requirements", done: false, xpReward: 10 },
  ];
  const [habits, setHabits] = useState<Habit[]>(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("lifeos_habits") || "{}");
      const today = new Date().toDateString();
      if (saved.date === today && Array.isArray(saved.habits)) return saved.habits;
    } catch {}
    return defaultHabits;
  });

  // Auto-save habits to localStorage on change
  useEffect(() => {
    localStorage.setItem("lifeos_habits", JSON.stringify({ date: new Date().toDateString(), habits }));
  }, [habits]);

  // Planner Inputs
  const [dailyHours, setDailyHours] = useState("4");
  const [timeline, setTimeline] = useState("3"); // months
  const [generatedPlan, setGeneratedPlan] = useState<string | null>(null);
  const [generating, setGenerating] = useState(false);

  // GitHub Realtime Profile & Analyzer states
  const [githubUsername, setGithubUsername] = useState("");
  const [githubProfile, setGithubProfile] = useState<any>(null);
  const [githubRepos, setGithubRepos] = useState<any[]>([]);
  const [analyzingGithub, setAnalyzingGithub] = useState(false);
  const [githubError, setGithubError] = useState("");
  const [projectRecommendations, setProjectRecommendations] = useState<string[]>([]);

  const handleConnectGithub = async () => {
    setGithubError("");
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "github",
        options: {
          redirectTo: window.location.origin + window.location.pathname
        }
      });
      if (error) throw error;
    } catch (err: any) {
      setGithubError(err.message || "Failed to initiate GitHub authentication.");
    }
  };

  const handleGithubAnalyze = async (targetUsername?: string) => {
    const username = (targetUsername || githubUsername).trim();
    if (!username) {
      setGithubError("Please enter a valid GitHub username.");
      return;
    }

    setAnalyzingGithub(true);
    setGithubError("");
    setGithubProfile(null);
    setGithubRepos([]);
    setProjectRecommendations([]);

    try {
      // 1. Fetch public profile
      const userRes = await fetch(`https://api.github.com/users/${username}`);
      if (!userRes.ok) {
        throw new Error(userRes.status === 404 ? "GitHub user not found." : "Failed to fetch GitHub profile.");
      }
      const userData = await userRes.json();
      setGithubProfile(userData);

      // 2. Fetch public repositories
      const reposRes = await fetch(`https://api.github.com/users/${username}/repos?per_page=50&sort=updated`);
      if (!reposRes.ok) {
        throw new Error("Failed to fetch user repositories.");
      }
      const reposData = await reposRes.json();
      setGithubRepos(reposData);

      // 3. AI Profile Analysis & Project Recommendations
      const langCounts: Record<string, number> = {};
      reposData.forEach((repo: any) => {
        if (repo.language) {
          langCounts[repo.language] = (langCounts[repo.language] || 0) + 1;
        }
      });

      // Find top languages
      const topLanguages = Object.keys(langCounts).sort((a, b) => langCounts[b] - langCounts[a]);
      const recs: string[] = [];

      if (reposData.length === 0) {
        recs.push("🚀 Portfolio Starter Project: Build a fully responsive personal landing page containing clean semantic HTML & TailwindCSS.");
        recs.push("📦 Basic CRUD API: Design a task manager REST API using Node.js/Express or Python/FastAPI with local file-based storage.");
      } else {
        const primaryLang = topLanguages[0] || "JavaScript";
        recs.push(`🌟 Core Upgrade: Build a complex system in your primary language (${primaryLang}). Implement thread safety, memory models, and custom caching layers.`);
        
        if (topLanguages.includes("JavaScript") || topLanguages.includes("TypeScript")) {
          recs.push("💬 WebRTC Chat Room: Build a secure, multiplayer collaborative canvas and chat space using Node.js, WebSockets, and React.");
          recs.push("💾 Local Redis Simulator: Implement a custom, high-speed key-value database storage using Node.js Buffer and heap allocation.");
        }
        if (topLanguages.includes("Python")) {
          recs.push("🧠 Vector Database Engine: Implement local cosine similarity search for unstructured text vectors using NumPy and FastAPI.");
          recs.push("🤖 RAG Inference Pipeline: Create a PDF document query system combining local LLM endpoints with custom text chunking heuristics.");
        }
        if (topLanguages.includes("Java") || topLanguages.includes("C++")) {
          recs.push("⚙️ High-Throughput HTTP Server: Build a TCP socket connection pooler managing multiple concurrent client connections with custom thread pools.");
          recs.push("🗄️ B-Tree File System: Code an on-disk indexing structure supporting fast range queries and binary search properties.");
        }
      }

      // Add a general system design project
      recs.push("🌐 System Design Case: Design a distributed URL Shortener (like TinyURL) supporting rate-limiting, geo-sharding, and analytics write queues.");

      setProjectRecommendations(recs);
    } catch (err: any) {
      setGithubError(err.message || "An error occurred during analysis.");
    } finally {
      setAnalyzingGithub(false);
    }
  };

  // Check if redirect has returned GitHub session tokens
  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user?.user_metadata?.preferred_username) {
        const githubUser = session.user.user_metadata.preferred_username;
        setGithubUsername(githubUser);
        handleGithubAnalyze(githubUser);
      }
    };
    checkSession();
  }, []);

  const toggleHabit = (id: string) => {
    setHabits(prev => prev.map(h => h.id === id ? { ...h, done: !h.done } : h));
  };

  const completedCount = habits.filter(h => h.done).length;
  const disciplineScore = Math.round((completedCount / habits.length) * 100);

  const handleGeneratePlan = () => {
    setGenerating(true);
    setTimeout(() => {
      const hours = parseInt(dailyHours, 10);
      const m = parseInt(timeline, 10);
      const totalDays = m * 30;

      // Allocate hours dynamically based on user input
      const dsaHrs = Math.round(hours * 0.45 * 10) / 10;
      const quantHrs = Math.round(hours * 0.25 * 10) / 10;
      const coreHrs = Math.round(hours * 0.20 * 10) / 10;
      const verbalHrs = Math.round(hours * 0.10 * 10) / 10;

      const planText = `
# 📅 LIFE OS: PERSONALIZED PLACEMENT PREPARATION SCHEDULE
**Target Branch:** ${branch.toUpperCase()} | **Target Role:** ${role}
**Daily Preparation Capacity:** ${hours} Hours/day | **Timeline Goal:** ${m} Months (${totalDays} Days)

---

## 🕒 DAILY STUDY TIME ALLOCATION
Here is your optimized daily hour breakdown generated by Life OS AI:

1. 💻 **Data Structures & Algorithms (DSA):** ${dsaHrs} Hours
   - Focus areas: Arrays, sliding window, recursion, dynamic programming, and binary search.
2. 📖 **Quantitative & Logical Aptitude:** ${quantHrs} Hours
   - Focus areas: Number systems, percentages, ratios, time & work, and seating arrangements.
3. ⚙️ **Department Core & Memory Models:** ${coreHrs} Hours
   - Focus areas: Operating system CPU scheduling, database indexes/SQL joins, and OOP memory patterns.
4. 🗣️ **Verbal Ability & ATS Optimization:** ${verbalHrs} Hours
   - Focus areas: Mock HR answers, STAR technique responses, grammar error spotting, and resume tailoring.

---

## 🎯 TIMELINE STRATEGY (${m}-Month Road Checkpoints)

### 🏁 Month 1: Fundamentals & Foundation
- Complete Phase 1 (Aptitude Foundation) lessons.
- Solve 30 easy coding questions.
- Draft your master resume template in the **Resume & ATS** workspace.

### 📈 Month 2: Core Engineering & DSA Depth
- Complete Phase 2 & 3 modules.
- Practice intermediate coding questions on arrays, trees, and linked lists.
- Set up your GitHub portfolio page using the **Portfolio Creator**.

### 🏆 Month 3: Placement Certification & Mock Rounds
- Clear the Grand Boss exam in Phase 5.
- Generate mock tests inside the **Maahir AI** workspace.
- Tailor individual resumes for target companies (Google, Amazon, TCS).
      `.trim();

      setGeneratedPlan(planText);
      setGenerating(false);
    }, 800);
  };

  const downloadPlan = () => {
    if (!generatedPlan) return;
    const blob = new Blob([generatedPlan], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Life_OS_Study_Plan_${branch}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Left: AI Habit Tracker & Discipline Score */}
      <div className="space-y-6">
        <div className="p-6 rounded-3xl border border-border bg-white/5 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-display flex items-center gap-2">
              <ListTodo className="text-cyan-400" size={22} /> Daily Placement Habits
            </h3>
            <span className="text-xs font-bold text-muted-foreground font-mono">Discipline: {disciplineScore}%</span>
          </div>

          <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
            <div className="bg-gradient-to-r from-cyan-500 to-blue-500 h-full transition-all duration-300" style={{ width: `${disciplineScore}%` }} />
          </div>

          <div className="space-y-2.5">
            {habits.map(h => (
              <button
                key={h.id}
                onClick={() => toggleHabit(h.id)}
                className={`w-full p-4 rounded-2xl border text-left text-xs font-semibold transition-all flex items-center justify-between ${
                  h.done
                    ? "bg-cyan-500/10 border-cyan-500/40 text-cyan-300"
                    : "bg-card border-border text-muted-foreground hover:border-border hover:text-slate-300"
                }`}
              >
                <span className="flex items-center gap-2.5">
                  <CheckCircle size={16} className={h.done ? "text-cyan-400" : "text-slate-600"} />
                  {h.label}
                </span>
                <span className="text-[10px] text-amber-400 font-mono">+{h.xpReward} XP</span>
              </button>
            ))}
          </div>
        </div>

        {/* Milestone Targets */}
        <div className="p-6 rounded-3xl border border-border bg-white/5 space-y-4">
          <h3 className="text-sm font-bold text-purple-400 flex items-center gap-1.5">
            <Award size={16} /> Key Placement Checkpoints
          </h3>
          <div className="space-y-3 font-mono text-xs">
            <div className="flex items-center justify-between p-3 rounded-xl bg-card border border-border">
              <span>1. Resume Completed & Keyword Analyzed</span>
              <span className="text-cyan-400 font-bold">READY</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-xl bg-card border border-border">
              <span>2. Portfolio Created & Host-Ready</span>
              <span className="text-cyan-400 font-bold">READY</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-xl bg-card border border-border">
              <span>3. All 5 Syllabus Phases Cleared</span>
              <span className="text-purple-400 font-bold">PROGRESS</span>
            </div>
          </div>
        </div>

        {/* GitHub Real-time Profile & Project Recommendations Panel */}
        <div className="p-6 rounded-3xl border border-border bg-white/5 space-y-4">
          <h3 className="text-lg font-display flex items-center gap-2">
            <svg className="text-fuchsia-400 fill-current" width="22" height="22" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg> GitHub Profile Analyzer
          </h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Connect your GitHub account or input a username to fetch your active repositories in real-time, analyze your tech stack, and generate project upgrade targets.
          </p>

          <div className="flex gap-2">
            <input
              type="text"
              value={githubUsername}
              onChange={e => setGithubUsername(e.target.value)}
              placeholder="Enter GitHub username"
              className="flex-1 bg-card border border-border rounded-xl px-4 py-2.5 text-xs text-foreground focus:outline-none focus:border-fuchsia-400"
            />
            <button
              onClick={() => handleGithubAnalyze()}
              disabled={analyzingGithub}
              className="px-4 py-2.5 rounded-xl bg-fuchsia-600 hover:bg-fuchsia-500 text-foreground font-bold text-xs transition-all disabled:opacity-50"
            >
              {analyzingGithub ? "Analyzing..." : "Analyze"}
            </button>
          </div>

          <div className="flex justify-between items-center text-xs pt-1">
            <span className="text-slate-500 font-medium">Or authorize securely:</span>
            <button
              onClick={handleConnectGithub}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-white/5 hover:bg-white/10 text-foreground font-bold text-[11px] transition-all"
            >
              <svg className="fill-current" width="12" height="12" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg> Connect GitHub
            </button>
          </div>

          {githubError && (
            <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-xs text-rose-300 flex items-start gap-2">
              <AlertCircle size={14} className="shrink-0 mt-0.5" />
              <span>{githubError}</span>
            </div>
          )}

          {githubProfile && (
            <div className="p-4 rounded-2xl bg-card border border-border space-y-3">
              <div className="flex items-center gap-3">
                <img
                  src={githubProfile.avatar_url}
                  alt={githubProfile.login}
                  className="w-12 h-12 rounded-full border-2 border-fuchsia-500/30"
                />
                <div>
                  <h4 className="text-sm font-bold text-foreground">{githubProfile.name || githubProfile.login}</h4>
                  <a
                    href={githubProfile.html_url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[11px] text-fuchsia-400 hover:underline"
                  >
                    @{githubProfile.login}
                  </a>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 text-center text-xs py-1.5 border-t border-b border-border">
                <div>
                  <div className="font-bold text-foreground">{githubProfile.public_repos}</div>
                  <div className="text-[10px] text-slate-500">Repositories</div>
                </div>
                <div>
                  <div className="font-bold text-foreground">{githubProfile.followers}</div>
                  <div className="text-[10px] text-slate-500">Followers</div>
                </div>
                <div>
                  <div className="font-bold text-foreground">{githubProfile.following}</div>
                  <div className="text-[10px] text-slate-500">Following</div>
                </div>
              </div>

              {projectRecommendations.length > 0 && (
                <div className="space-y-2 pt-1">
                  <span className="text-[11px] font-bold text-cyan-400 uppercase tracking-wider block">AI Project Recommendations to upgrade your profile:</span>
                  <div className="space-y-2">
                    {projectRecommendations.map((rec, i) => (
                      <div key={i} className="p-2.5 rounded-xl bg-fuchsia-500/5 border border-fuchsia-500/20 text-[11px] text-slate-300 leading-relaxed">
                        {rec}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Right: AI Study Planner Generator */}
      <div className="space-y-6">
        <div className="p-6 rounded-3xl border border-border bg-white/5 space-y-4">
          <h3 className="text-lg font-display flex items-center gap-2">
            <Clock className="text-purple-400" size={22} /> AI Routine & Schedule Generator
          </h3>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">Study Capacity / Day</label>
              <select
                value={dailyHours}
                onChange={e => setDailyHours(e.target.value)}
                className="w-full bg-card border border-border rounded-xl px-3 py-2.5 text-xs text-foreground focus:outline-none focus:border-purple-400"
              >
                <option value="2">2 Hours</option>
                <option value="4">4 Hours</option>
                <option value="6">6 Hours</option>
                <option value="8">8 Hours</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">Months to Placement</label>
              <select
                value={timeline}
                onChange={e => setTimeline(e.target.value)}
                className="w-full bg-card border border-border rounded-xl px-3 py-2.5 text-xs text-foreground focus:outline-none focus:border-purple-400"
              >
                <option value="1">1 Month</option>
                <option value="3">3 Months</option>
                <option value="6">6 Months</option>
              </select>
            </div>
          </div>

          <button
            onClick={handleGeneratePlan}
            disabled={generating}
            className="w-full py-3 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 font-bold text-sm transition-all text-foreground flex items-center justify-center gap-1.5"
          >
            
            {generating ? "Calculating Schedules..." : "Generate AI Study Plan"}
          </button>
        </div>

        {generatedPlan && (
          <div className="p-6 rounded-3xl border border-border bg-white/5 space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Generated Timetable</h4>
              <button
                onClick={downloadPlan}
                className="text-xs px-3 py-1.5 rounded-lg border border-emerald-500/30 hover:bg-emerald-500/10 text-emerald-400 font-bold flex items-center gap-1.5"
              >
                <Download size={12} /> Download Plan
              </button>
            </div>
            <pre className="text-xs text-slate-300 leading-relaxed font-mono whitespace-pre-wrap max-h-[300px] overflow-y-auto p-4 rounded-xl bg-card border border-border custom-scrollbar">
              {generatedPlan}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
