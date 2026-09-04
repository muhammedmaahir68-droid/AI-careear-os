import React, { useState } from "react";
import { X, Building2, Award, CheckCircle2, Code2, Play, ExternalLink, HelpCircle, Briefcase, ChevronDown, ChevronUp } from "lucide-react";
import type { CompanyTrack } from "../data/companyData";

interface Props {
  company: CompanyTrack | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function CompanyQuestionsModal({ company, isOpen, onClose }: Props) {
  const [activeTab, setActiveTab] = useState<"coding" | "technical" | "rounds">("coding");
  const [showSolution, setShowSolution] = useState(false);
  const [activeQuestion, setActiveQuestion] = useState<number | null>(null);

  if (!isOpen || !company) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-card border border-border rounded-3xl max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden animate-fade-rise">
        {/* Header */}
        <div className={`p-6 border-b border-border bg-gradient-to-r ${company.color} bg-opacity-20 flex justify-between items-start shrink-0`}>
          <div className="flex items-center gap-3.5">
            <span className="text-3xl p-2.5 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-md shadow-md">
              {company.logo}
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-extrabold text-foreground">{company.name}</h2>
                <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/30 uppercase">
                  {company.difficulty} OA
                </span>
                <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">
                  {company.avgPackage}
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-1">
                Roles hiring: <span className="font-semibold text-white">{company.roles.join(", ")}</span>
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-white/10 text-muted-foreground hover:text-foreground">
            <X size={20} />
          </button>
        </div>

        {/* Tab Selector */}
        <div className="px-6 py-3 border-b border-border bg-muted/30 flex gap-2 shrink-0 overflow-x-auto custom-scrollbar">
          <button
            onClick={() => setActiveTab("coding")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === "coding" ? "bg-cyan-600 text-white shadow-md" : "bg-muted text-muted-foreground hover:text-foreground"
            }`}
          >
            <Code2 size={13} /> Online Coding OA Question
          </button>
          <button
            onClick={() => setActiveTab("technical")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === "technical" ? "bg-cyan-600 text-white shadow-md" : "bg-muted text-muted-foreground hover:text-foreground"
            }`}
          >
            <HelpCircle size={13} /> Interview Questions ({company.interviewQuestions?.length || 0})
          </button>
          <button
            onClick={() => setActiveTab("rounds")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === "rounds" ? "bg-cyan-600 text-white shadow-md" : "bg-muted text-muted-foreground hover:text-foreground"
            }`}
          >
            <Briefcase size={13} /> Hiring Process & Rounds ({company.rounds?.length || 0})
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
          {/* ── TAB 1: CODING OA QUESTION ── */}
          {activeTab === "coding" && company.codingQuestion && (
            <div className="space-y-4">
              <div className="p-5 rounded-2xl bg-cyan-950/20 border border-cyan-500/30 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-bold uppercase">
                    {company.codingQuestion.difficulty} Difficulty
                  </span>
                  <span className="text-xs text-muted-foreground">Most Reported Interview Problem</span>
                </div>
                <h3 className="text-base font-bold text-foreground">{company.codingQuestion.title}</h3>
                <p className="text-xs text-slate-300 leading-relaxed">{company.codingQuestion.desc}</p>
              </div>

              {/* Starter Code */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Starter Code Blueprint</h4>
                  <button
                    onClick={() => setShowSolution(!showSolution)}
                    className="text-xs font-bold text-cyan-400 hover:text-cyan-300 underline"
                  >
                    {showSolution ? "Hide Approach" : "View Approach"}
                  </button>
                </div>
                <pre className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs font-mono text-cyan-300 overflow-x-auto leading-relaxed">
                  <code>{company.codingQuestion.starter}</code>
                </pre>
              </div>

              {showSolution && (
                <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 space-y-2">
                  <h4 className="text-xs font-bold text-emerald-400">💡 Winning Interview Strategy:</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Always state the time and space complexity before coding. For {company.name}, write clean modular code, handle empty/null inputs, and optimize from O(N²) to O(N) or O(N log N).
                  </p>
                </div>
              )}
            </div>
          )}

          {/* ── TAB 2: TECHNICAL & BEHAVIORAL INTERVIEW QUESTIONS ── */}
          {activeTab === "technical" && (
            <div className="space-y-3">
              <p className="text-xs text-muted-foreground">
                Actual questions asked in technical, system design, and HR rounds at {company.name}:
              </p>
              {company.interviewQuestions?.map((iq, idx) => {
                const isOpen = activeQuestion === idx;
                return (
                  <div key={idx} className="rounded-2xl border border-border bg-card overflow-hidden">
                    <button
                      onClick={() => setActiveQuestion(isOpen ? null : idx)}
                      className="w-full flex items-center justify-between p-4 text-left hover:bg-muted/40 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-[10px] px-2.5 py-1 rounded-lg bg-purple-500/20 text-purple-300 font-bold uppercase">
                          {iq.round}
                        </span>
                        <span className="text-xs font-semibold text-foreground">{iq.question}</span>
                      </div>
                      {isOpen ? <ChevronUp size={16} className="text-muted-foreground shrink-0" /> : <ChevronDown size={16} className="text-muted-foreground shrink-0" />}
                    </button>
                    {isOpen && (
                      <div className="p-4 bg-muted/20 border-t border-border space-y-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 block">Expert Solution Tip:</span>
                        <p className="text-xs text-slate-300 leading-relaxed">{iq.tip}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* ── TAB 3: HIRING PROCESS & ROUNDS ── */}
          {activeTab === "rounds" && (
            <div className="space-y-4">
              <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Hiring Pipeline for {company.name}</h4>
              <div className="space-y-3">
                {company.rounds?.map((round, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-card border border-border flex items-center gap-3.5">
                    <span className="w-7 h-7 rounded-xl bg-cyan-500/20 text-cyan-300 font-bold text-xs flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <div>
                      <h5 className="text-xs font-bold text-foreground">Round {idx + 1}</h5>
                      <p className="text-xs text-slate-300 mt-0.5">{round}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
