import React, { useState } from "react";
import { motion } from "motion/react";
import { Play, CheckCircle2, Code2, BookOpen, BrainCircuit, PenTool, Bug, HelpCircle, Trophy, BarChart3, ChevronRight, Target } from "lucide-react";

interface DailyChallengeProps {
  onComplete: () => void;
  isCompleted: boolean;
}

export default function DailyChallenge({ onComplete, isCompleted }: DailyChallengeProps) {
  const [activeStep, setActiveStep] = useState(0);
  const [code, setCode] = useState("def two_sum(nums, target):\n    # Write your code here\n    pass");
  const [running, setRunning] = useState(false);

  const handleRunCode = () => {
    setRunning(true);
    setTimeout(() => {
      setRunning(false);
      onComplete();
      setActiveStep(8); // Move to progress report
    }, 1500);
  };

  const steps = [
    { icon: <Target className="text-blue-400" size={18} />, title: "Daily Goal", desc: "Master Arrays & The Two Sum Pattern" },
    { icon: <BookOpen className="text-purple-400" size={18} />, title: "Learn (15 min)", desc: "Read theory on Hash Maps vs Nested Loops." },
    { icon: <BrainCircuit className="text-green-400" size={18} />, title: "AI Explanation", desc: "Watch the visual AI animation of Two Sum." },
    { icon: <PenTool className="text-yellow-400" size={18} />, title: "Notes", desc: "Jot down key takeaways for revision." },
    { icon: <Bug className="text-red-400" size={18} />, title: "Debug Challenge", desc: "Fix the syntax error in the Python snippet." },
    { icon: <HelpCircle className="text-orange-400" size={18} />, title: "Quiz", desc: "Answer 3 MCQs on Time Complexity." },
    { icon: <Code2 className="text-blue-400" size={18} />, title: "Coding Challenge", desc: "Solve Two Sum.", isCode: true },
    { icon: <Trophy className="text-yellow-500" size={18} />, title: "Daily Reward", desc: "Earn 50 XP and a 'Day 1' Badge!" },
    { icon: <BarChart3 className="text-teal-400" size={18} />, title: "Progress Report", desc: "View your stats for today." },
  ];

  return (
    <div className="p-6 rounded-3xl border border-border bg-white/5 backdrop-blur-sm flex flex-col h-[700px] overflow-hidden">
      
      <div className="mb-6 flex justify-between items-center shrink-0">
        <div>
          <h2 className="text-2xl font-display mb-1">Today's Flow</h2>
          <p className="text-sm text-muted-foreground">Follow the AI steps to complete Day 1.</p>
        </div>
        <div className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-medium border border-blue-500/30">
          Level 1: Foundation
        </div>
      </div>

      <div className="flex-1 flex gap-6 overflow-hidden">
        
        {/* Step Tracker (Left Sidebar) */}
        <div className="w-1/3 border-r border-white/10 pr-4 overflow-y-auto custom-scrollbar space-y-3">
          {steps.map((step, idx) => (
            <button 
              key={idx}
              onClick={() => setActiveStep(idx)}
              className={`w-full text-left p-3 rounded-2xl flex gap-3 transition-colors ${
                activeStep === idx ? 'bg-white/10 border border-white/20' : 'hover:bg-white/5 border border-transparent'
              }`}
            >
              <div className="mt-0.5">{step.icon}</div>
              <div>
                <h4 className={`text-sm font-semibold ${activeStep === idx ? 'text-white' : 'text-gray-300'}`}>{step.title}</h4>
                <p className="text-xs text-muted-foreground mt-1 line-clamp-1">{step.desc}</p>
              </div>
            </button>
          ))}
        </div>

        {/* Content Area (Right) */}
        <div className="w-2/3 flex flex-col overflow-y-auto custom-scrollbar pr-2">
          {steps[activeStep].isCode ? (
            <div className="flex flex-col h-full animate-fade-rise">
              <div className="bg-black/40 rounded-xl p-4 mb-4 text-sm border border-white/5 shrink-0">
                <p className="font-semibold mb-2">Problem: Two Sum</p>
                <p className="text-muted-foreground text-xs leading-relaxed mb-3">
                  Given an array of integers <code>nums</code> and an integer <code>target</code>, return indices of the two numbers such that they add up to <code>target</code>.
                </p>
                <div className="bg-white/5 p-2 rounded text-xs font-mono text-gray-300">
                  Input: nums = [2,7,11,15], target = 9<br/>
                  Output: [0,1]
                </div>
              </div>

              <div className="flex-1 flex flex-col mb-4 min-h-[200px]">
                <div className="bg-black/60 rounded-t-xl px-4 py-2 border border-white/10 border-b-0 flex items-center">
                  <span className="text-xs text-muted-foreground font-mono">solution.py</span>
                </div>
                <textarea
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  disabled={isCompleted}
                  className="flex-1 w-full bg-[#0d1117] text-green-300 font-mono text-sm p-4 border border-white/10 rounded-b-xl focus:outline-none focus:border-blue-500/50 resize-none"
                  spellCheck={false}
                />
              </div>

              <div className="flex items-center justify-between mt-auto shrink-0 pb-4">
                {isCompleted ? (
                  <div className="flex items-center gap-2 text-green-500">
                    <CheckCircle2 size={20} />
                    <span className="text-sm font-medium">Tests passed! +50 XP</span>
                  </div>
                ) : (
                  <div className="text-xs text-muted-foreground">
                    Write your solution to proceed.
                  </div>
                )}

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleRunCode}
                  disabled={isCompleted || running}
                  className={`flex items-center gap-2 px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                    isCompleted 
                      ? 'bg-green-500/20 text-green-400 cursor-not-allowed' 
                      : 'bg-white text-black hover:bg-white/90'
                  }`}
                >
                  {running ? (
                    <span className="animate-pulse">Running...</span>
                  ) : isCompleted ? (
                    <>Solved <CheckCircle2 size={16} /></>
                  ) : (
                    <>Run Code <Play size={14} className="fill-black" /></>
                  )}
                </motion.button>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-8 border border-white/5 rounded-2xl bg-black/20 animate-fade-rise min-h-[400px]">
              <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-6">
                {React.cloneElement(steps[activeStep].icon as React.ReactElement<any>, { size: 32 })}
              </div>
              <h3 className="text-2xl font-display mb-3">{steps[activeStep].title}</h3>
              <p className="text-muted-foreground text-sm max-w-sm mb-8 leading-relaxed">
                This is a placeholder for the "{steps[activeStep].title}" interactive module. In the real app, this section will host the video, quiz, or AI explanation tool!
              </p>
              
              <button 
                onClick={() => setActiveStep(prev => Math.min(prev + 1, steps.length - 1))}
                className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-sm font-medium"
              >
                Continue Next Step <ChevronRight size={16} />
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
