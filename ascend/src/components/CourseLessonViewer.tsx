import React, { useState } from "react";
import { ArrowLeft, BookOpen, Code2, Bug, HelpCircle, Briefcase, CheckCircle2, ChevronDown, ChevronUp, Copy, Check } from "lucide-react";
import type { LessonTopic, QuizQuestion } from "../data/courseLessonContent";

interface Props {
  topic: LessonTopic;
  courseTitle: string;
  onBack: () => void;
  onComplete: (topicId: string) => void;
  isCompleted: boolean;
}

type LessonTab = "learn" | "code" | "debug" | "quiz" | "practice" | "interview";

export default function CourseLessonViewer({ topic, courseTitle, onBack, onComplete, isCompleted }: Props) {
  const [activeTab, setActiveTab] = useState<LessonTab>("learn");
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showExplanations, setShowExplanations] = useState<Record<number, boolean>>({});
  const [copied, setCopied] = useState(false);
  const [debugRevealed, setDebugRevealed] = useState(false);
  const [debugFixRevealed, setDebugFixRevealed] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(topic.codeExample.code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleAnswerSelect = (qi: number, ai: number) => {
    if (selectedAnswers[qi] !== undefined) return; // locked
    setSelectedAnswers(prev => ({ ...prev, [qi]: ai }));
    setShowExplanations(prev => ({ ...prev, [qi]: true }));
  };

  const quizScore = Object.entries(selectedAnswers).filter(([qi, ai]) =>
    topic.quiz[Number(qi)]?.correctIndex === ai
  ).length;

  const allAnswered = topic.quiz.length > 0 && Object.keys(selectedAnswers).length === topic.quiz.length;

  const TABS: { id: LessonTab; label: string; icon: React.ReactNode }[] = [
    { id: "learn", label: "Learn", icon: <BookOpen size={13} /> },
    { id: "code", label: "Code", icon: <Code2 size={13} /> },
    { id: "debug", label: "Debug", icon: <Bug size={13} /> },
    { id: "quiz", label: "Quiz", icon: <HelpCircle size={13} /> },
    { id: "practice", label: "Practice", icon: <Briefcase size={13} /> },
    { id: "interview", label: "Interview", icon: <CheckCircle2 size={13} /> },
  ];

  return (
    <div className="flex flex-col h-full">
      {/* Lesson Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-border bg-gradient-to-r from-blue-950/40 to-purple-950/30 shrink-0">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft size={16} />
          </button>
          <div>
            <p className="text-[10px] text-blue-400 font-bold uppercase tracking-wider">{courseTitle}</p>
            <h3 className="text-sm font-bold text-foreground">{topic.title}</h3>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-muted-foreground">~{topic.estimatedMinutes} min</span>
          {isCompleted ? (
            <span className="flex items-center gap-1 text-[10px] px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-bold">
              <CheckCircle2 size={11} /> Completed
            </span>
          ) : (
            <button
              onClick={() => onComplete(topic.id)}
              className="text-[10px] px-3 py-1.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold transition-all"
            >
              Mark Complete
            </button>
          )}
        </div>
      </div>

      {/* Tab Bar */}
      <div className="flex gap-1 px-4 py-2 border-b border-border bg-muted/20 overflow-x-auto shrink-0 custom-scrollbar">
        {TABS.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-bold whitespace-nowrap transition-all ${
              activeTab === tab.id
                ? "bg-blue-600 text-white shadow-md"
                : "text-muted-foreground hover:text-foreground hover:bg-muted"
            }`}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto p-5 space-y-5 custom-scrollbar">

        {/* ── LEARN TAB ── */}
        {activeTab === "learn" && (
          <div className="space-y-5">
            <div className="p-4 rounded-2xl bg-blue-950/20 border border-blue-500/20 space-y-2">
              <h4 className="text-xs font-bold text-blue-400 flex items-center gap-1.5">● Concept</h4>
              <p className="text-sm text-foreground leading-relaxed">{topic.concept}</p>
            </div>

            <div className="p-4 rounded-2xl bg-amber-950/20 border border-amber-500/20 space-y-2">
              <h4 className="text-xs font-bold text-amber-400 flex items-center gap-1.5">● Why It Matters</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">{topic.whyItMatters}</p>
            </div>

            <div className="p-4 rounded-2xl bg-card border border-border space-y-3">
              <h4 className="text-xs font-bold text-purple-400">● How It Works — Step by Step</h4>
              <ol className="space-y-2">
                {topic.howItWorks.map((step, i) => (
                  <li key={i} className="text-sm text-muted-foreground leading-relaxed flex gap-2">
                    <span className="text-purple-400 font-mono shrink-0 mt-0.5"></span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-500/20 space-y-2">
              <h4 className="text-xs font-bold text-emerald-400">● Real-World Industry Example</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">{topic.realWorldExample}</p>
            </div>

            <div className="p-4 rounded-2xl bg-red-950/20 border border-red-500/20 space-y-2">
              <h4 className="text-xs font-bold text-red-400">● Common Mistake</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">{topic.commonMistake}</p>
            </div>

            <div className="p-4 rounded-2xl bg-cyan-950/20 border border-cyan-500/20 space-y-2">
              <h4 className="text-xs font-bold text-cyan-400">● Advanced Extension</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">{topic.advancedExtension}</p>
            </div>
          </div>
        )}

        {/* ── CODE TAB ── */}
        {activeTab === "code" && (
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-foreground flex items-center gap-1.5"><Code2 size={14} className="text-blue-400" /> Code Example — {topic.codeExample.language.toUpperCase()}</h4>
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1.5 text-[10px] px-3 py-1.5 rounded-lg bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground transition-all font-bold border border-border"
                >
                  {copied ? <><Check size={12} className="text-emerald-400" /> Copied!</> : <><Copy size={12} /> Copy Code</>}
                </button>
              </div>
              <div className="rounded-2xl bg-slate-950 border border-slate-700/50 overflow-hidden">
                <div className="flex items-center gap-2 px-4 py-2 bg-slate-900 border-b border-slate-700/50">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
                  <span className="text-[10px] text-slate-400 ml-2 font-mono">{topic.title.toLowerCase().replace(/\s+/g, '_')}.{topic.codeExample.language}</span>
                </div>
                <pre className="p-4 text-[12px] text-green-300 font-mono leading-relaxed overflow-x-auto custom-scrollbar whitespace-pre">
                  {topic.codeExample.code}
                </pre>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-blue-950/20 border border-blue-500/20 space-y-2">
              <h4 className="text-xs font-bold text-blue-400">● Hands-On Task</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">Run this code, modify it, and experiment:</p>
              <ul className="space-y-1 text-sm text-muted-foreground list-disc list-inside">
                <li>Change the input values and observe how output changes.</li>
                <li>Break something intentionally — what error do you get? Why?</li>
                <li>Extend the code to add one more feature using the same concept.</li>
              </ul>
            </div>
          </div>
        )}

        {/* ── DEBUG TAB ── */}
        {activeTab === "debug" && (
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-red-950/30 border border-red-500/30 space-y-3">
              <h4 className="text-xs font-bold text-red-400 flex items-center gap-1.5"><Bug size={14} /> Debug Challenge — Find the Bug</h4>
              <p className="text-xs text-muted-foreground">The following code has a bug. Identify it before revealing the answer.</p>
              <div className="rounded-xl bg-slate-950 border border-slate-700/50 overflow-hidden">
                <div className="flex items-center gap-2 px-4 py-2 bg-slate-900 border-b border-slate-700/50">
                  <span className="w-2 h-2 rounded-full bg-red-500"></span>
                  <span className="text-[10px] text-red-400 font-mono">buggy_code.py</span>
                </div>
                <pre className="p-4 text-[12px] text-red-300 font-mono leading-relaxed overflow-x-auto custom-scrollbar whitespace-pre">
                  {topic.debugChallenge.buggyCode}
                </pre>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setDebugRevealed(v => !v)}
                className="flex-1 py-2.5 rounded-xl text-xs font-bold bg-amber-600/20 hover:bg-amber-600/30 text-amber-400 border border-amber-500/30 transition-all"
              >
                {debugRevealed ? "Hide" : "Reveal"} Bug Explanation
              </button>
              <button
                onClick={() => setDebugFixRevealed(v => !v)}
                className="flex-1 py-2.5 rounded-xl text-xs font-bold bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 border border-emerald-500/30 transition-all"
              >
                {debugFixRevealed ? "Hide" : "Show"} Fix
              </button>
            </div>

            {debugRevealed && (
              <div className="p-4 rounded-2xl bg-amber-950/20 border border-amber-500/30 space-y-2">
                <h4 className="text-xs font-bold text-amber-400">Bug Explanation</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{topic.debugChallenge.bug}</p>
              </div>
            )}
            {debugFixRevealed && (
              <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 space-y-2">
                <h4 className="text-xs font-bold text-emerald-400">Correct Fix</h4>
                <p className="text-sm text-muted-foreground leading-relaxed font-mono">{topic.debugChallenge.fix}</p>
              </div>
            )}
          </div>
        )}

        {/* ── QUIZ TAB ── */}
        {activeTab === "quiz" && (
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-foreground">Quiz — {topic.quiz.length} Questions</h4>
              {allAnswered && (
                <span className={`text-xs font-bold px-3 py-1 rounded-full border ${quizScore >= topic.quiz.length * 0.8 ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30" : "bg-amber-500/20 text-amber-400 border-amber-500/30"}`}>
                  Score: {quizScore}/{topic.quiz.length}
                </span>
              )}
            </div>

            {topic.quiz.map((q, qi) => {
              const selected = selectedAnswers[qi];
              const isAnswered = selected !== undefined;
              return (
                <div key={qi} className="space-y-3 p-4 rounded-2xl bg-card border border-border">
                  <p className="text-sm font-medium text-foreground">Q{qi + 1}. {q.question}</p>
                  <div className="space-y-2">
                    {q.options.map((opt, ai) => {
                      let style = "border-border text-muted-foreground hover:border-blue-500/50 hover:bg-blue-500/5";
                      if (isAnswered) {
                        if (ai === q.correctIndex) style = "border-emerald-500 bg-emerald-500/10 text-emerald-300";
                        else if (ai === selected) style = "border-red-500 bg-red-500/10 text-red-300";
                        else style = "border-border text-muted-foreground opacity-50";
                      }
                      return (
                        <button
                          key={ai}
                          onClick={() => handleAnswerSelect(qi, ai)}
                          className={`w-full text-left px-4 py-2.5 rounded-xl border text-xs font-medium transition-all ${style}`}
                        >
                          <span className="font-bold mr-2">{String.fromCharCode(65 + ai)}.</span>{opt}
                        </button>
                      );
                    })}
                  </div>
                  {showExplanations[qi] && (
                    <div className="mt-2 p-3 rounded-xl bg-blue-950/30 border border-blue-500/20">
                      <p className="text-[11px] text-blue-300 leading-relaxed"><span className="font-bold">Explanation: </span>{q.explanation}</p>
                    </div>
                  )}
                </div>
              );
            })}

            {allAnswered && (
              <div className={`p-4 rounded-2xl border text-center space-y-1 ${quizScore >= topic.quiz.length * 0.8 ? "bg-emerald-950/20 border-emerald-500/30" : "bg-amber-950/20 border-amber-500/30"}`}>
                <p className="text-sm font-bold text-foreground">{quizScore >= topic.quiz.length * 0.8 ? "🎉 Excellent! Ready to move on." : "📖 Review the Learn tab and try again."}</p>
                <p className="text-xs text-muted-foreground">You scored {quizScore} out of {topic.quiz.length}</p>
              </div>
            )}
          </div>
        )}

        {/* ── PRACTICE TAB ── */}
        {activeTab === "practice" && (
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-foreground">Practice Problems</h4>
            {topic.practiceProblems.map((prob, i) => (
              <div key={i} className="p-4 rounded-2xl bg-card border border-border space-y-2">
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-purple-600/20 border border-purple-500/30 text-purple-300 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <p className="text-sm text-foreground leading-relaxed">{prob}</p>
                </div>
                <div className="ml-9">
                  <textarea
                    placeholder="Write your solution or notes here..."
                    className="w-full min-h-[100px] p-3 rounded-xl bg-muted border border-border text-xs text-foreground font-mono resize-y focus:outline-none focus:border-purple-500/50 placeholder:text-muted-foreground/50"
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── INTERVIEW TAB ── */}
        {activeTab === "interview" && (
          <div className="space-y-4">
            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-300">
              These questions are asked in FAANG, MNC, and startup technical interviews. Practice answering out loud using the STAR method.
            </div>
            {topic.interviewQuestions.map((iq, i) => (
              <div key={i} className="p-4 rounded-2xl bg-card border border-border space-y-3">
                <p className="text-sm font-medium text-foreground">Q{i + 1}. {iq.q}</p>
                <div className="p-3 rounded-xl bg-blue-950/20 border border-blue-500/20">
                  <p className="text-[11px] text-blue-300 leading-relaxed"><span className="font-bold">Hint: </span>{iq.hint}</p>
                </div>
                <textarea
                  placeholder="Draft your answer here before the real interview..."
                  className="w-full min-h-[90px] p-3 rounded-xl bg-muted border border-border text-xs text-foreground resize-y focus:outline-none focus:border-blue-500/50 placeholder:text-muted-foreground/50"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
