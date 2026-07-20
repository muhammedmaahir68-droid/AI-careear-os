import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CheckCircle2, Circle, Lock, ChevronDown, ChevronUp } from "lucide-react";

interface SyllabusModuleProps {
  completedModules: number;
}

export default function SyllabusModule({ completedModules }: SyllabusModuleProps) {
  const [expandedPhase, setExpandedPhase] = useState<number | null>(0);

  const syllabus = [
    { 
      title: "Phase 0 – AI Assessment", 
      desc: "Skill check, dream company, personalized roadmap.",
      items: ["Current knowledge level", "Coding experience", "Aptitude level", "Target placement date"]
    },
    { 
      title: "Level 1 – Foundation", 
      desc: "Aptitude Basics (Number System, Percentages, Probability...)",
      items: ["Number System", "Percentages & Averages", "Profit & Loss", "Time, Speed & Distance", "Logical Reasoning", "Verbal Ability"]
    },
    { 
      title: "Level 2 – Programming", 
      desc: "Choose Python, Java, C++, or JavaScript.",
      items: ["Variables & Loops", "Functions & Arrays", "Strings & OOP", "Exception & File Handling"]
    },
    { 
      title: "Level 3 – Data Structures", 
      desc: "Arrays to Tries with Daily Solve & Debug.",
      items: ["Arrays & Linked List", "Stack & Queue", "Hash Table & Trees", "BST, Heap, Graph, Trie"]
    },
    { 
      title: "Level 4 – Algorithms", 
      desc: "Sorting, Recursion, DP, and Graph Algorithms.",
      items: ["Searching & Sorting", "Recursion & Backtracking", "Divide & Conquer", "Dynamic Programming", "Graph & Shortest Path"]
    },
    { 
      title: "Level 5 – SQL", 
      desc: "Database Basics to Window Functions & Transactions.",
      items: ["ER Diagram & Normalization", "CRUD Operations", "Joins & Subqueries", "Window Functions & Indexes"]
    },
    { 
      title: "Level 6 – Core CS", 
      desc: "DBMS, OS, Computer Networks, and OOP.",
      items: ["DBMS", "Operating System", "Computer Networks", "Software Engineering"]
    },
    { 
      title: "Level 7 – Web Development", 
      desc: "Frontend, Backend, DB, Cloud, and Deployment.",
      items: ["HTML, CSS, JS, React, Next.js", "Django, REST, JWT", "PostgreSQL", "AWS & Docker CI/CD"]
    },
    { 
      title: "Level 8 – AI & Cloud", 
      desc: "Machine Learning, Gen AI, AWS, Kubernetes.",
      items: ["Python for AI, Pandas", "ML & Deep Learning", "Generative AI", "Azure & Kubernetes"]
    },
    { 
      title: "Level 9 – Projects", 
      desc: "Beginner to Advanced (Netflix Clone, AI Career OS).",
      items: ["Beginner: Calculator, Todo", "Intermediate: Chat, Ecommerce", "Advanced: AI SaaS, Uber Clone"]
    },
    { 
      title: "Level 10 – Resume Builder", 
      desc: "ATS Resume, Portfolio, GitHub, LinkedIn.",
      items: ["ATS Resume", "Portfolio Generator", "GitHub Optimization", "LinkedIn Branding"]
    },
    { 
      title: "Level 11 – Coding Practice", 
      desc: "Daily Easy/Med/Hard, Weekly/Monthly Contests.",
      items: ["Daily Challenges", "Weekly Contests", "AI Solution Explanations"]
    },
    { 
      title: "Level 12 – Communication Skills", 
      desc: "English Speaking, HR, GD, Emails.",
      items: ["English Speaking Feedback", "HR Communication", "Group Discussions", "Email Writing"]
    },
    { 
      title: "Level 13 – Mock Interview", 
      desc: "HR, Technical, Coding, and System Design.",
      items: ["HR Round", "Technical (Core CS)", "Live Coding Round", "System Design (HLD/LLD)"]
    },
    { 
      title: "Level 14 – Company Preparation", 
      desc: "Google, Microsoft, Amazon, Meta, Zoho, TCS...",
      items: ["Google, Microsoft, Amazon", "Zoho, TCS, Infosys", "Previous Questions & Mock Tests"]
    },
    { 
      title: "Level 15 – Placement Ready", 
      desc: "Final AI Evaluation & Readiness Score (0-100%).",
      items: ["Final Scores (Aptitude, DSA, CS)", "Placement Probability", "Company Recommendations"]
    }
  ];

  return (
    <div className="p-6 rounded-3xl border border-border bg-white/5 backdrop-blur-sm max-h-[85vh] overflow-y-auto custom-scrollbar">
      <div className="sticky top-0 bg-background/95 backdrop-blur-md pt-2 pb-6 z-20 border-b border-white/5 mb-6">
        <h2 className="text-2xl font-display mb-1">Career Roadmap</h2>
        <p className="text-sm text-muted-foreground">The AI Career OS: Day 1 to Placement.</p>
      </div>

      <div className="space-y-2 relative">
        <div className="absolute left-[23px] top-4 bottom-4 w-0.5 bg-white/10" />

        {syllabus.map((mod, i) => {
          const isCompleted = i < completedModules;
          const isActive = i === completedModules;
          const isLocked = i > completedModules;
          const isExpanded = expandedPhase === i;

          return (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className={`relative flex gap-4 items-start p-2 rounded-2xl transition-colors ${
                isLocked ? 'opacity-60' : isActive ? 'bg-blue-500/5' : 'hover:bg-white/5'
              }`}
            >
              <div className="bg-background relative z-10 pt-1">
                {isCompleted ? (
                  <CheckCircle2 className="text-green-500 bg-background" size={28} />
                ) : isActive ? (
                  <Circle className="text-blue-400 fill-blue-400/20 bg-background" size={28} />
                ) : (
                  <Lock className="text-muted-foreground p-1.5 border border-white/20 rounded-full bg-background" size={28} />
                )}
              </div>
              
              <div className="flex-1 pb-2 cursor-pointer select-none" onClick={() => setExpandedPhase(isExpanded ? null : i)}>
                <div className="flex justify-between items-center">
                  <h3 className={`text-base font-semibold ${isActive ? 'text-blue-400' : 'text-foreground'}`}>
                    {mod.title}
                  </h3>
                  {isExpanded ? <ChevronUp size={16} className="text-muted-foreground" /> : <ChevronDown size={16} className="text-muted-foreground" />}
                </div>
                
                <p className="text-sm text-muted-foreground mt-1 leading-relaxed pr-4">
                  {mod.desc}
                </p>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden mt-3"
                    >
                      <ul className="space-y-2 border-l-2 border-white/10 pl-4 py-1">
                        {mod.items.map((item, idx) => (
                          <li key={idx} className="text-xs text-gray-300 flex items-center gap-2 before:content-['•'] before:text-white/20">
                            {item}
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
