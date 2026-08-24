import React, { useState } from "react";
import { motion } from "motion/react";
import {
  Play, Flame, Gem, Zap, Trophy, Award, ArrowRight,
  BookOpen, Mic, Building2, CheckCircle2, Shield, BrainCircuit, Code2, GitCompare
} from "lucide-react";
import RoleComparisonModal from "./RoleComparisonModal";

interface HomePanelProps {
  userName?: string;
  branchId?: string | null;
  roleId?: string | null;
  xp: number;
  streak: number;
  diamonds: number;
  level: number;
  placementScore: number;
  onStartJourney: (targetPhase?: number) => void;
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
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  return (
    <div className="w-full max-w-6xl mx-auto space-y-8 pb-16 text-slate-100">
      {/* ── HERO BANNER WITH SINGLE PRIMARY CTA ── */}
      <div className="relative overflow-hidden p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-purple-950/90 to-slate-950 border border-purple-500/40 shadow-2xl shadow-purple-950/50">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-purple-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-6">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-extrabold uppercase tracking-wider text-foreground bg-purple-500/10 px-3.5 py-1 rounded-full border border-purple-500/30">
              {branchId?.toUpperCase() || "CSE"} Track
            </span>
            {roleId && (
              <span className="text-xs font-bold text-foreground bg-cyan-500/10 px-3.5 py-1 rounded-full border border-cyan-500/30">
                Role: {roleId.replace(/^[a-z]+-/, "").toUpperCase()}
              </span>
            )}
            <span className="text-xs font-bold text-foreground bg-emerald-500/10 px-3.5 py-1 rounded-full border border-emerald-500/30 flex items-center gap-1">
               5-Phase Placement Curriculum
            </span>
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl md:text-5xl font-extrabold text-foreground tracking-tight leading-tight">
              Welcome Back, <span className="bg-gradient-to-r from-purple-400 via-cyan-300 to-amber-300 bg-clip-text text-transparent">{userName}</span>!
            </h1>
            <p className="text-base md:text-lg text-slate-300 max-w-2xl">
              Your comprehensive 5-phase placement roadmap is active. Master Aptitude, Department Core Theory, DSA, Projects, and AI Placement Mock Rounds.
            </p>
          </div>

          {/* GIANT ONE-CLICK CTAS */}
          <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onStartJourney(1)}
              className="px-8 py-5 rounded-2xl bg-gradient-to-r from-purple-600 via-cyan-500 to-emerald-500 hover:from-purple-500 hover:to-emerald-400 text-foreground font-extrabold text-lg shadow-2xl shadow-purple-500/40 flex items-center justify-center gap-3 transition-all cursor-pointer"
            >
              <Play size={24} className="fill-white" />
              <span>Continue Your Learning Journey — Step 1</span>
              <ArrowRight size={22} />
            </motion.button>

            <button
              onClick={() => setIsCompareOpen(true)}
              className="px-5 py-3.5 rounded-2xl border border-purple-500/30 hover:bg-purple-500/10 text-purple-300 text-sm font-bold transition-all flex items-center justify-center gap-2 shadow-lg backdrop-blur-md"
            >
              <GitCompare size={16} /> Compare Roles
            </button>

            <button
              onClick={onOpenCertification}
              className="px-5 py-3.5 rounded-2xl border border-purple-500/30 hover:bg-purple-500/10 text-purple-300 text-sm font-bold transition-all flex items-center justify-center gap-2 shadow-lg backdrop-blur-md"
            >
              <Award size={16} className="text-amber-400" /> View Certification Exit Exam
            </button>
          </div>
        </div>
      </div>

      <RoleComparisonModal isOpen={isCompareOpen} onClose={() => setIsCompareOpen(false)} />

      {/* ── STATS & PROGRESS CARDS ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-card border border-border flex items-center gap-4 shadow-lg">
          <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-foreground">
            <Flame size={24} />
          </div>
          <div>
            <div className="text-2xl font-bold text-foreground">{streak} Days</div>
            <div className="text-xs text-muted-foreground font-medium">Daily Streak</div>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-card border border-border flex items-center gap-4 shadow-lg">
          <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-foreground">
            <Gem size={24} />
          </div>
          <div>
            <div className="text-2xl font-bold text-foreground">{diamonds}</div>
            <div className="text-xs text-muted-foreground font-medium">Placement Diamonds</div>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-card border border-border flex items-center gap-4 shadow-lg">
          <div className="w-12 h-12 rounded-xl bg-yellow-500/10 border border-yellow-500/30 flex items-center justify-center text-foreground">
            <Zap size={24} />
          </div>
          <div>
            <div className="text-2xl font-bold text-foreground">{xp} XP</div>
            <div className="text-xs text-muted-foreground font-medium">Total Experience</div>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-card border border-border flex items-center gap-4 shadow-lg">
          <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-foreground">
            <Trophy size={24} />
          </div>
          <div>
            <div className="text-2xl font-bold text-foreground">Level {level}</div>
            <div className="text-xs text-muted-foreground font-medium">League Tier</div>
          </div>
        </div>
      </div>

      {/* ── PLACEMENT READINESS METRIC ── */}
      <div className="p-6 rounded-3xl bg-card border border-border shadow-xl space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
              Placement Readiness Score <Shield size={20} className="text-foreground" />
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5">Calculated across Aptitude, Coding, CS Theory & AI Mock Performance</p>
          </div>
          <div className="text-3xl font-extrabold text-foreground font-mono">{placementScore}%</div>
        </div>

        <div className="w-full h-3 bg-slate-950 rounded-full overflow-hidden p-0.5 border border-border">
          <motion.div
            className="h-full bg-gradient-to-r from-purple-500 via-cyan-400 to-emerald-400 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${placementScore}%` }}
            transition={{ duration: 1 }}
          />
        </div>
      </div>

      {/* ── 5-PHASE INTEGRATED PATH LANDMARKS ── */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h4 className="text-sm font-extrabold uppercase tracking-wider text-muted-foreground">5-Phase Master Curriculum Roadmap</h4>
          <span className="text-xs text-foreground font-bold">100% Department & Role Customized</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {/* Phase 1 */}
          <div
            onClick={() => onStartJourney(1)}
            className="p-5 rounded-2xl bg-card border border-border hover:border-purple-500/50 hover:bg-slate-900 transition-all cursor-pointer space-y-3 group"
          >
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-foreground group-hover:scale-110 transition-transform">
              <BookOpen size={20} />
            </div>
            <div>
              <span className="text-[10px] font-extrabold uppercase text-foreground tracking-wider">Phase 1</span>
              <h5 className="text-sm font-bold text-foreground">Aptitude Foundation</h5>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">Quantitative Aptitude, Logical Reasoning & Verbal Ability for TCS, Wipro, Infosys.</p>
            <span className="text-xs font-bold text-foreground flex items-center gap-1 pt-1">Jump to Phase 1 <ArrowRight size={14} /></span>
          </div>

          {/* Phase 2 */}
          <div
            onClick={() => onStartJourney(2)}
            className="p-5 rounded-2xl bg-card border border-border hover:border-cyan-500/50 hover:bg-slate-900 transition-all cursor-pointer space-y-3 group"
          >
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-foreground group-hover:scale-110 transition-transform">
              <Code2 size={20} />
            </div>
            <div>
              <span className="text-[10px] font-extrabold uppercase text-foreground tracking-wider">Phase 2</span>
              <h5 className="text-sm font-bold text-foreground">Technical Foundation</h5>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">Department Core Subjects, Programming Languages (C++, Java, Python) & Coding Logic.</p>
            <span className="text-xs font-bold text-foreground flex items-center gap-1 pt-1">Jump to Phase 2 <ArrowRight size={14} /></span>
          </div>

          {/* Phase 3 */}
          <div
            onClick={() => onStartJourney(3)}
            className="p-5 rounded-2xl bg-card border border-border hover:border-amber-500/50 hover:bg-slate-900 transition-all cursor-pointer space-y-3 group"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
              <BrainCircuit size={20} />
            </div>
            <div>
              <span className="text-[10px] font-extrabold uppercase text-amber-400 tracking-wider">Phase 3</span>
              <h5 className="text-sm font-bold text-foreground">Advanced Preparation</h5>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">Data Structures & Algorithms, SQL Databases, System Design & Scaling Patterns.</p>
            <span className="text-xs font-bold text-amber-400 flex items-center gap-1 pt-1">Jump to Phase 3 <ArrowRight size={14} /></span>
          </div>

          {/* Phase 4 */}
          <div
            onClick={() => onStartJourney(4)}
            className="p-5 rounded-2xl bg-card border border-border hover:border-emerald-500/50 hover:bg-slate-900 transition-all cursor-pointer space-y-3 group"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-foreground group-hover:scale-110 transition-transform">
              <Building2 size={20} />
            </div>
            <div>
              <span className="text-[10px] font-extrabold uppercase text-foreground tracking-wider">Phase 4</span>
              <h5 className="text-sm font-bold text-foreground">Placement Readiness</h5>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">ATS Resume & Portfolio, Capstone Industry Projects, Company-wise Prep (Amazon/TCS).</p>
            <span className="text-xs font-bold text-foreground flex items-center gap-1 pt-1">Jump to Phase 4 <ArrowRight size={14} /></span>
          </div>

          {/* Phase 5 */}
          <div
            onClick={() => onStartJourney(5)}
            className="p-5 rounded-2xl bg-card border border-border hover:border-rose-500/50 hover:bg-slate-900 transition-all cursor-pointer space-y-3 group"
          >
            <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400 group-hover:scale-110 transition-transform">
              <Trophy size={20} />
            </div>
            <div>
              <span className="text-[10px] font-extrabold uppercase text-rose-400 tracking-wider">Phase 5</span>
              <h5 className="text-sm font-bold text-foreground">Placement Rounds</h5>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">Aptitude, Coding, Technical, HR, Managerial & Full AI Mock Placement Exams.</p>
            <span className="text-xs font-bold text-rose-400 flex items-center gap-1 pt-1">Jump to Phase 5 <ArrowRight size={14} /></span>
          </div>
        </div>
      </div>
    </div>
  );
}
