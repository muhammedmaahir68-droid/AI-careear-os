import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  BookOpen, Code2, Sparkles, CheckCircle2, ChevronRight,
  ChevronLeft, Award, HelpCircle, Lightbulb, Play, ArrowRight, Zap, Target
} from "lucide-react";
import { LESSON_BANK, getLessonSyllabus, type LevelSyllabusLesson, type TopicLesson } from "../data/lessonBank";

interface LessonWalkthroughProps {
  branchId?: string | null;
  initialLevel?: number;
  onStartQuiz?: (level: number) => void;
  onClose?: () => void;
}

export function LessonWalkthrough({
  branchId = "cse",
  initialLevel = 1,
  onStartQuiz,
  onClose
}: LessonWalkthroughProps) {
  const [selectedLevel, setSelectedLevel] = useState<number>(initialLevel);
  const [activeStep, setActiveStep] = useState<number>(0); // 0: Theory, 1: Formulas/Code, 2: Worked Example, 3: Placement Tip, 4: Ready for Quiz
  const [activeTopicIndex, setActiveTopicIndex] = useState<number>(0);

  const lessonSyllabus: LevelSyllabusLesson =
    getLessonSyllabus(branchId || "cse", selectedLevel) || LESSON_BANK[0];

  const currentTopic: TopicLesson =
    lessonSyllabus.topics[activeTopicIndex] || lessonSyllabus.topics[0];

  const totalSteps = 5;

  return (
    <div className="rounded-3xl border border-blue-500/30 bg-slate-950/90 backdrop-blur-xl p-6 sm:p-8 shadow-2xl space-y-6 text-foreground">
      {/* ── HEADER ── */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 font-mono text-xs font-semibold uppercase tracking-wider">
              {branchId?.toUpperCase() || "ENGINEERING"} · LEVEL {selectedLevel}
            </span>
            <span className="text-xs text-muted-foreground">• Step {activeStep + 1} of {totalSteps}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-white">
            {lessonSyllabus.title}
          </h2>
          <p className="text-sm text-muted-foreground mt-1 max-w-2xl">
            {lessonSyllabus.description}
          </p>
        </div>

        {/* Level Switcher */}
        <div className="flex items-center gap-2 bg-white/5 p-1.5 rounded-2xl border border-white/10 shrink-0">
          <span className="text-xs text-muted-foreground px-2 font-medium">Level:</span>
          {[1, 2, 3, 4, 5].map((lvl) => (
            <button
              key={lvl}
              onClick={() => {
                setSelectedLevel(lvl);
                setActiveStep(0);
                setActiveTopicIndex(0);
              }}
              className={`w-8 h-8 rounded-xl text-xs font-bold transition-all ${
                selectedLevel === lvl
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30"
                  : "text-gray-400 hover:text-white hover:bg-white/10"
              }`}
            >
              L{lvl}
            </button>
          ))}
        </div>
      </div>

      {/* ── TOPIC TABS & STEP PROGRESS ── */}
      <div className="space-y-4">
        {/* Topic Selector */}
        <div className="flex gap-2 overflow-x-auto custom-scrollbar pb-2">
          {lessonSyllabus.topics.map((t, idx) => (
            <button
              key={t.id}
              onClick={() => {
                setActiveTopicIndex(idx);
                setActiveStep(0);
              }}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-2 border ${
                activeTopicIndex === idx
                  ? "bg-blue-500/20 border-blue-400 text-blue-300"
                  : "bg-white/5 border-white/10 text-muted-foreground hover:text-white hover:bg-white/10"
              }`}
            >
              <BookOpen size={14} />
              <span>{t.topicName}</span>
            </button>
          ))}
        </div>

        {/* Walkthrough Progress Stepper */}
        <div className="grid grid-cols-5 gap-2">
          {[
            { label: "1. Core Theory", icon: BookOpen },
            { label: "2. Formulas & Code", icon: Code2 },
            { label: "3. Worked Problem", icon: Target },
            { label: "4. MNC Placement Tip", icon: Lightbulb },
            { label: "5. Take Level Quiz", icon: Zap },
          ].map((step, sIdx) => {
            const Icon = step.icon;
            const isCurrent = activeStep === sIdx;
            const isCompleted = activeStep > sIdx;
            return (
              <button
                key={sIdx}
                onClick={() => setActiveStep(sIdx)}
                className={`p-3 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                  isCurrent
                    ? "bg-blue-600/20 border-blue-400 text-white ring-1 ring-blue-400/50"
                    : isCompleted
                    ? "bg-green-500/10 border-green-500/30 text-green-300"
                    : "bg-white/5 border-white/10 text-muted-foreground hover:text-white"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <Icon size={16} className={isCurrent ? "text-blue-400" : isCompleted ? "text-green-400" : "text-gray-500"} />
                  {isCompleted && <CheckCircle2 size={14} className="text-green-400" />}
                </div>
                <span className="text-xs font-semibold tracking-tight">{step.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── STEP CONTENT AREA ── */}
      <div className="p-6 rounded-3xl border border-white/10 bg-white/5 min-h-[320px] flex flex-col justify-between">
        <AnimatePresence mode="wait">
          {/* STEP 0: THEORY */}
          {activeStep === 0 && (
            <motion.div
              key="step-0"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="space-y-4"
            >
              <div className="flex items-center gap-2 text-blue-400 font-semibold text-sm">
                <BookOpen size={18} />
                <span>Topic: {currentTopic.topicName}</span>
              </div>
              <h3 className="text-xl font-bold text-white">Theoretical Foundation & Core Principles</h3>
              <ul className="space-y-3 pt-2">
                {currentTopic.theory.map((point, pIdx) => (
                  <li key={pIdx} className="flex items-start gap-3 text-sm text-gray-300 leading-relaxed">
                    <span className="w-6 h-6 rounded-full bg-blue-500/20 border border-blue-500/40 text-blue-400 font-mono text-xs flex items-center justify-center shrink-0 mt-0.5">
                      {pIdx + 1}
                    </span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}

          {/* STEP 1: FORMULAS & CODE */}
          {activeStep === 1 && (
            <motion.div
              key="step-1"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="space-y-4"
            >
              <div className="flex items-center gap-2 text-purple-400 font-semibold text-sm">
                <Code2 size={18} />
                <span>Key Formula / Syntax Breakdown</span>
              </div>
              <h3 className="text-xl font-bold text-white">Mathematical Model & Code Representation</h3>
              <div className="p-5 rounded-2xl bg-black/70 border border-purple-500/30 font-mono text-sm text-purple-200 overflow-x-auto leading-relaxed shadow-inner">
                <pre>{currentTopic.keyFormulasOrSyntax}</pre>
              </div>
              <div className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/20 text-xs text-purple-300">
                💡 <strong>Remember:</strong> Memorize this syntax and time-complexity bound for rapid execution in online assessment coding environments.
              </div>
            </motion.div>
          )}

          {/* STEP 2: WORKED EXAMPLE */}
          {activeStep === 2 && (
            <motion.div
              key="step-2"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="space-y-4"
            >
              <div className="flex items-center gap-2 text-emerald-400 font-semibold text-sm">
                <Target size={18} />
                <span>Step-by-Step Problem Walkthrough</span>
              </div>
              <h3 className="text-xl font-bold text-white">Example Problem</h3>
              <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-sm text-emerald-200 font-medium">
                ❓ <strong>Problem:</strong> {currentTopic.exampleProblem.problem}
              </div>
              <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Solution Walkthrough:</div>
                <p className="text-sm text-gray-200 leading-relaxed">
                  {currentTopic.exampleProblem.solution}
                </p>
              </div>
            </motion.div>
          )}

          {/* STEP 3: MNC PLACEMENT TIP */}
          {activeStep === 3 && (
            <motion.div
              key="step-3"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="space-y-4"
            >
              <div className="flex items-center gap-2 text-amber-400 font-semibold text-sm">
                <Lightbulb size={18} />
                <span>Recruiter & Technical Interview Insight</span>
              </div>
              <h3 className="text-xl font-bold text-white">MNC Placement Interview Strategy</h3>
              <div className="p-6 rounded-2xl bg-gradient-to-r from-amber-500/10 to-yellow-500/10 border border-amber-500/30 text-amber-100 text-sm leading-relaxed space-y-3">
                <div className="flex items-center gap-2 text-amber-400 font-bold text-base">
                  <Sparkles size={20} />
                  <span>High-Yield Interview Tip</span>
                </div>
                <p>{currentTopic.placementTip}</p>
                <div className="text-xs text-amber-300/80 pt-2 border-t border-amber-500/20">
                  Targeted Companies: TCS NQT, Infosys, Amazon, Wipro NTH, Cognizant GenC, Accenture
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 4: READY FOR QUIZ */}
          {activeStep === 4 && (
            <motion.div
              key="step-4"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-6 text-center py-4"
            >
              <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-blue-600 to-purple-600 border border-white/20 flex items-center justify-center mx-auto text-white shadow-xl">
                <Zap size={32} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">Syllabus Lesson Completed!</h3>
                <p className="text-sm text-muted-foreground max-w-md mx-auto mt-2">
                  You have studied the theory, syntax, worked example, and MNC tips for Level {selectedLevel}. Now validate your knowledge with the adaptive test!
                </p>
              </div>
              <button
                onClick={() => onStartQuiz?.(selectedLevel)}
                className="px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-base shadow-xl shadow-blue-500/30 flex items-center gap-3 mx-auto transition-all hover:scale-105 cursor-pointer"
              >
                <Play size={20} />
                <span>Start Adaptive Level {selectedLevel} Test (40 Questions)</span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* STEP CONTROLS */}
        <div className="flex justify-between items-center border-t border-white/10 pt-4 mt-6">
          <button
            onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
            disabled={activeStep === 0}
            className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 disabled:opacity-30 text-xs font-semibold flex items-center gap-1 transition-all"
          >
            <ChevronLeft size={16} /> Previous Step
          </button>

          {activeStep < totalSteps - 1 ? (
            <button
              onClick={() => setActiveStep(activeStep + 1)}
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-md shadow-blue-600/30"
            >
              Next Step <ChevronRight size={16} />
            </button>
          ) : (
            <button
              onClick={() => onStartQuiz?.(selectedLevel)}
              className="px-5 py-2.5 rounded-xl bg-green-600 hover:bg-green-500 text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-md shadow-green-600/30"
            >
              Start Quiz <ArrowRight size={16} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
