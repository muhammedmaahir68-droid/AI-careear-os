import React from "react";
import { motion } from "motion/react";
import {
  Play, Sparkles, Flame, Gem, Zap, Trophy, Award, ArrowRight,
  BookOpen, Mic, Building2, CheckCircle2, Shield, BrainCircuit, Code2
} from "lucide-react";

interface HomePanelProps {
  userName?: string;
  branchId?: string | null;
  roleId?: string | null;
  xp: number;
  streak: number;
  diamonds: number;
  level: number;
  placementScore: number;
  onStartJourney: () => void;
  onOpenCertification: () => void;
}

export default function HomePanel({
  userName = "Student",
  branchId = "CSE",
  roleId = "Software Engineer",
  xp = 0,
  streak = 0,
  diamonds = 0,
  level = 1,
  placementScore = 78,
  onStartJourney,
  onOpenCertification,
}: HomePanelProps) {
  return (
    <div className="w-full max-w-6xl mx-auto space-y-8 pb-16 text-slate-100">
      {/* ── HERO BANNER WITH SINGLE PRIMARY CTA ── */}
      <div className="relative overflow-hidden p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-purple-950/90 to-slate-950 border border-purple-500/40 shadow-2xl shadow-purple-950/50">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-purple-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-6">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-extrabold uppercase tracking-wider text-purple-400 bg-purple-500/10 px-3.5 py-1 rounded-full border border-purple-500/30">
              {branchId?.toUpperCase() || "CSE"} Track
            </span>
            {roleId && (
              <span className="text-xs font-bold text-cyan-300 bg-cyan-500/10 px-3.5 py-1 rounded-full border border-cyan-500/30">
                🎯 Role: {roleId.replace(/^[a-z]+-/, "").toUpperCase()}
              </span>
            )}
            <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-3.5 py-1 rounded-full border border-emerald-500/30 flex items-center gap-1">
              <Sparkles size={12} /> Single Linear Learning Path
            </span>
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Welcome Back, <span className="bg-gradient-to-r from-purple-400 via-cyan-300 to-amber-300 bg-clip-text text-transparent">{userName}</span>! 🚀
            </h1>
            <p className="text-base md:text-lg text-slate-300 max-w-2xl">
              Your customized step-by-step placement path is ready. One click takes you to your active step — learn theory, solve practice MCQs, and unlock placement rewards.
            </p>
          </div>

          {/* GIANT ONE-CLICK CTAS */}
          <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onStartJourney}
              className="px-8 py-5 rounded-2xl bg-gradient-to-r from-purple-600 via-cyan-500 to-emerald-500 hover:from-purple-500 hover:to-emerald-400 text-white font-extrabold text-lg shadow-2xl shadow-purple-500/40 flex items-center justify-center gap-3 transition-all cursor-pointer"
            >
              <Play size={24} className="fill-white" />
              <span>Continue Your Learning Journey — Step 1</span>
              <ArrowRight size={22} />
            </motion.button>

            <button
              onClick={onOpenCertification}
              className="px-6 py-5 rounded-2xl bg-slate-900/80 hover:bg-slate-800 border border-slate-700 text-slate-200 font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <Award size={18} className="text-amber-400" />
              <span>View Certification Exit Exam</span>
            </button>
          </div>
        </div>
      </div>

      {/* ── STATS & PROGRESS CARDS ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center gap-4 shadow-lg">
          <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-400">
            <Flame size={24} />
          </div>
          <div>
            <div className="text-2xl font-bold text-white">{streak} Days</div>
            <div className="text-xs text-slate-400 font-medium">Daily Streak</div>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center gap-4 shadow-lg">
          <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
            <Gem size={24} />
          </div>
          <div>
            <div className="text-2xl font-bold text-white">{diamonds} 💎</div>
            <div className="text-xs text-slate-400 font-medium">Placement Diamonds</div>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center gap-4 shadow-lg">
          <div className="w-12 h-12 rounded-xl bg-yellow-500/10 border border-yellow-500/30 flex items-center justify-center text-yellow-400">
            <Zap size={24} />
          </div>
          <div>
            <div className="text-2xl font-bold text-white">{xp} XP</div>
            <div className="text-xs text-slate-400 font-medium">Total Experience</div>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center gap-4 shadow-lg">
          <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
            <Trophy size={24} />
          </div>
          <div>
            <div className="text-2xl font-bold text-white">Level {level}</div>
            <div className="text-xs text-slate-400 font-medium">League Tier</div>
          </div>
        </div>
      </div>

      {/* ── PLACEMENT READINESS METRIC ── */}
      <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              Placement Readiness Score <Shield size={20} className="text-cyan-400" />
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">Calculated across Aptitude, Coding, CS Theory & AI Mock Performance</p>
          </div>
          <div className="text-3xl font-extrabold text-cyan-400 font-mono">{placementScore}%</div>
        </div>

        <div className="w-full h-3 bg-slate-950 rounded-full overflow-hidden p-0.5 border border-slate-800">
          <motion.div
            className="h-full bg-gradient-to-r from-purple-500 via-cyan-400 to-emerald-400 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${placementScore}%` }}
            transition={{ duration: 1 }}
          />
        </div>
      </div>

      {/* ── STEP-BY-STEP LANDMARK PREVIEW CARDS ── */}
      <div className="space-y-4">
        <h4 className="text-sm font-extrabold uppercase tracking-wider text-slate-400">Integrated Path Landmarks</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div
            onClick={onStartJourney}
            className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-purple-500/50 hover:bg-slate-900 transition-all cursor-pointer space-y-3"
          >
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
              <BookOpen size={20} />
            </div>
            <h5 className="text-base font-bold text-white">Phase 1: Aptitude & Theory</h5>
            <p className="text-xs text-slate-400">Master number systems, speed math, percentage tricks & core department fundamentals.</p>
            <span className="text-xs font-bold text-purple-400 flex items-center gap-1">Jump to Phase 1 <ArrowRight size={14} /></span>
          </div>

          <div
            onClick={onStartJourney}
            className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-cyan-500/50 hover:bg-slate-900 transition-all cursor-pointer space-y-3"
          >
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <Code2 size={20} />
            </div>
            <h5 className="text-base font-bold text-white">Phase 2: Core Coding & Systems</h5>
            <p className="text-xs text-slate-400">Data structures, sliding window algorithms, SQL joins, and operating system scheduling.</p>
            <span className="text-xs font-bold text-cyan-400 flex items-center gap-1">Jump to Phase 2 <ArrowRight size={14} /></span>
          </div>

          <div
            onClick={onStartJourney}
            className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-emerald-500/50 hover:bg-slate-900 transition-all cursor-pointer space-y-3"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Trophy size={20} />
            </div>
            <h5 className="text-base font-bold text-white">Phase 3: Placement Boss Exam</h5>
            <p className="text-xs text-slate-400">Simulate real MNC rounds from TCS, Infosys, Amazon & Google with AI evaluations.</p>
            <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">Jump to Phase 3 <ArrowRight size={14} /></span>
          </div>
        </div>
      </div>
    </div>
  );
}
