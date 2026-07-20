import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowLeft, Trophy, Flame, Star, MessageSquare,
  ChevronRight, Target, BookOpen, Code2, BarChart3,
  Zap, Users, Medal, CheckCircle2, Send, LayoutDashboard,
  Map, Mic, FileText, Building2, LogOut
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import SyllabusModule from "./components/SyllabusModule";
import DailyChallenge from "./components/DailyChallenge";
import { useAuth } from "./context/AuthContext";
import { supabase } from "./lib/supabase";

type Tab = "dashboard" | "roadmap" | "daily" | "mock" | "community" | "companies";

const COMPANY_TRACKS = [
  { name: "Google", logo: "🔵", color: "from-blue-600/20 to-cyan-600/20", border: "border-blue-500/30" },
  { name: "Microsoft", logo: "🟦", color: "from-blue-500/20 to-blue-800/20", border: "border-blue-400/30" },
  { name: "Amazon", logo: "🟠", color: "from-orange-600/20 to-yellow-600/20", border: "border-orange-500/30" },
  { name: "Meta", logo: "🔷", color: "from-blue-400/20 to-indigo-600/20", border: "border-indigo-400/30" },
  { name: "Apple", logo: "⬛", color: "from-gray-600/20 to-gray-800/20", border: "border-gray-400/30" },
  { name: "Zoho", logo: "🟢", color: "from-green-600/20 to-emerald-600/20", border: "border-green-500/30" },
  { name: "TCS", logo: "🔴", color: "from-red-600/20 to-rose-600/20", border: "border-red-500/30" },
  { name: "Infosys", logo: "🟣", color: "from-purple-600/20 to-violet-600/20", border: "border-purple-500/30" },
];

// Dynamic scores will be defined inside Dashboard using user's real XP

export default function Dashboard() {
  const navigate = useNavigate();
  const { profile, signOut, updateXP, updateStreak } = useAuth();

  const [activeTab, setActiveTab] = useState<Tab>("dashboard");
  const [challengeCompleted, setChallengeCompleted] = useState(false);
  const [leaderboard, setLeaderboard] = useState<{ display_name: string; total_xp: number; user_id: string }[]>([]);
  const [chatMessages, setChatMessages] = useState<{ from: "ai" | "user"; text: string }[]>([
    { from: "ai", text: `Hey ${profile?.name?.split(" ")[0] || "there"}! 🚀 Ready to tackle Day 1? Today we're focusing on Python Arrays. Try to solve the Two Sum challenge in the Daily tab!` }
  ]);
  const [chatInput, setChatInput] = useState("");

  const xp = profile?.xp ?? 0;
  const streak = profile?.streak ?? 0;
  const level = profile?.level ?? 1;
  const completedModules = profile?.completed_modules ?? 0;
  const avatarInitial = (profile?.name ?? "U")[0].toUpperCase();

  // Fetch real leaderboard (only real users from Supabase)
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

    // Real-time leaderboard subscription
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
                    { icon: <FileText className="text-purple-400" size={24} />, label: "Resume Builder", sub: "ATS Optimize", tab: "dashboard" },
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
                <SyllabusModule completedModules={completedModules} />
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
            <motion.div key="mock" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              <h2 className="text-3xl font-display mb-2">Mock Interview Center</h2>
              <p className="text-muted-foreground mb-8">Practice with AI. Get real-time feedback on confidence, answers, and communication.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { title: "HR Round", desc: "Tell me about yourself, Strengths & Weaknesses, Salary negotiation.", icon: "🤝", ready: true },
                  { title: "Technical Round", desc: "Core CS: DBMS, OS, CN, OOP concepts.", icon: "⚙️", ready: true },
                  { title: "Coding Round", desc: "Live coding with AI watching your approach and giving hints.", icon: "💻", ready: false },
                  { title: "System Design", desc: "LLD & HLD: Design scalable architectures.", icon: "🏗️", ready: false },
                  { title: "Behavioral Round", desc: "STAR method, leadership, teamwork scenarios.", icon: "🧠", ready: false },
                  { title: "Aptitude Test", desc: "Quantitative, Logical & Verbal in timed conditions.", icon: "📊", ready: true },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.02 }}
                    className={`p-6 rounded-3xl border cursor-pointer transition-colors ${
                      item.ready
                        ? "border-blue-500/30 bg-blue-500/5 hover:bg-blue-500/10"
                        : "border-border bg-white/5 hover:bg-white/10 opacity-60"
                    }`}
                  >
                    <div className="text-4xl mb-4">{item.icon}</div>
                    <h3 className="text-xl font-display mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground mb-5 leading-relaxed">{item.desc}</p>
                    <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold ${
                      item.ready ? "bg-blue-500/20 text-blue-300" : "bg-white/10 text-muted-foreground"
                    }`}>
                      {item.ready ? <><CheckCircle2 size={14} /> Start Practice</> : <>🔒 Unlock Later</>}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* ── COMPANIES ── */}
          {activeTab === "companies" && (
            <motion.div key="companies" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              <h2 className="text-3xl font-display mb-2">Company Preparation Tracks</h2>
              <p className="text-muted-foreground mb-8">Dedicated roadmaps with previous interview questions, coding rounds, aptitude, and HR questions.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {COMPANY_TRACKS.map((c, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.03 }}
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

                {/* Study Groups */}
                <div className="p-6 rounded-3xl border border-border bg-white/5">
                  <div className="flex items-center gap-3 mb-6">
                    <Users className="text-purple-400" size={24} />
                    <h3 className="text-xl font-display">Active Study Groups</h3>
                  </div>
                  {["DSA Grind 30 Days", "System Design Masters", "Python Beginners", "Aptitude Warriors"].map((g, i) => (
                    <div key={i} className="flex items-center justify-between py-3 border-b border-white/5 last:border-0">
                      <div>
                        <div className="text-sm font-medium">{g}</div>
                        <div className="text-xs text-muted-foreground mt-0.5">{[24, 18, 42, 31][i]} members</div>
                      </div>
                      <button className="text-xs px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 transition-colors">Join</button>
                    </div>
                  ))}
                </div>

                {/* Upcoming Events */}
                <div className="p-6 rounded-3xl border border-border bg-white/5">
                  <div className="flex items-center gap-3 mb-6">
                    <BookOpen className="text-green-400" size={24} />
                    <h3 className="text-xl font-display">Upcoming Events</h3>
                  </div>
                  {[
                    { title: "Weekly Coding Battle", date: "Tomorrow, 8 PM", tag: "Contest" },
                    { title: "System Design Hackathon", date: "Sat, Jul 26", tag: "Hackathon" },
                    { title: "Mock Interview Marathon", date: "Sun, Jul 27", tag: "Interview" },
                  ].map((e, i) => (
                    <div key={i} className="py-3 border-b border-white/5 last:border-0">
                      <div className="flex justify-between items-start">
                        <div className="text-sm font-medium">{e.title}</div>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300">{e.tag}</span>
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">{e.date}</div>
                    </div>
                  ))}
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
