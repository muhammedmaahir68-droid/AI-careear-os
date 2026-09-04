import React, { useState } from "react";
import { CheckCircle2, ArrowRight, Layers, Lightbulb, Volume2, Sparkles, BookOpen, Code2 } from "lucide-react";
import { aiVoiceTutor } from "../services/aiVoiceTutor";

interface Section {
  title: string;
  paragraphs: string[];
  bulletPoints: string[];
  steps: string[];
  codeSnippet?: string;
  isImportant?: boolean;
}

interface Props {
  content?: string;
  summary?: string;
  flowchartSteps?: string[];
  keyPoints?: string[];
  placementTips?: string[];
  className?: string;
}

// Parses raw markdown text, removes ##/### hashtags, extracts semantic structure
function parseTextbookContent(raw: string): Section[] {
  if (!raw) return [];
  
  // Normalize newlines
  const lines = raw.split("\n");
  const sections: Section[] = [];
  let currentSection: Section = { title: "Overview & Fundamentals", paragraphs: [], bulletPoints: [], steps: [] };

  for (let i = 0; i < lines.length; i++) {
    let line = lines[i].trim();
    if (!line) continue;

    // Detect section header: e.g. "### 1. FUNDAMENTAL PROPERTIES" or "## 2. DIVISIBILITY"
    const headerMatch = line.match(/^#{1,6}\s*(.*)$/);
    if (headerMatch) {
      if (currentSection.paragraphs.length > 0 || currentSection.bulletPoints.length > 0 || currentSection.steps.length > 0) {
        sections.push(currentSection);
      }
      currentSection = {
        title: headerMatch[1].replace(/^\d+\.\s*/, "").trim(), // Strip leading numbering
        paragraphs: [],
        bulletPoints: [],
        steps: [],
        isImportant: headerMatch[1].toLowerCase().includes("critical") || headerMatch[1].toLowerCase().includes("placement") || headerMatch[1].toLowerCase().includes("master")
      };
      continue;
    }

    // Step detection: e.g. "1. Find the unit digit" or "Step 1:"
    const stepMatch = line.match(/^(\d+\.|Step\s*\d+:?)\s*(.*)$/i);
    if (stepMatch && stepMatch[2].length > 3) {
      currentSection.steps.push(stepMatch[2].trim());
      continue;
    }

    // Bullet point detection: "- Natural Numbers: ..." or "• ..."
    const bulletMatch = line.match(/^[-*•]\s*(.*)$/);
    if (bulletMatch) {
      currentSection.bulletPoints.push(bulletMatch[1].trim());
      continue;
    }

    // Regular paragraph
    currentSection.paragraphs.push(line);
  }

  if (currentSection.paragraphs.length > 0 || currentSection.bulletPoints.length > 0 || currentSection.steps.length > 0) {
    sections.push(currentSection);
  }

  return sections;
}

export default function CleanStudyContent({ content = "", summary = "", flowchartSteps = [], keyPoints = [], placementTips = [], className = "" }: Props) {
  const sections = parseTextbookContent(content);
  const [activeVoiceSection, setActiveVoiceSection] = useState<string | null>(null);

  const readSectionAloud = (title: string, text: string) => {
    setActiveVoiceSection(title);
    aiVoiceTutor.speak(text, () => setActiveVoiceSection(null));
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* ── HIGH-LEVEL SUMMARY ── */}
      {summary && (
        <div className="p-5 rounded-3xl bg-gradient-to-br from-purple-950/40 via-background to-blue-950/30 border border-purple-500/30 shadow-lg relative overflow-hidden space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-purple-400 animate-ping" />
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-purple-300">Executive Concept Summary</h4>
            </div>
            <button
              onClick={() => readSectionAloud("Summary", summary)}
              className="text-xs px-3 py-1.5 rounded-xl bg-purple-600/30 hover:bg-purple-600 border border-purple-500/40 text-purple-200 flex items-center gap-1.5 transition-all font-bold cursor-pointer"
            >
              <Volume2 size={13} /> {activeVoiceSection === "Summary" ? "Speaking..." : "Read Aloud"}
            </button>
          </div>
          <p className="text-sm text-slate-200 leading-relaxed font-sans">{summary}</p>
        </div>
      )}

      {/* ── VISUAL FLOWCHART WORKFLOW (If present) ── */}
      {flowchartSteps.length > 0 && (
        <div className="p-6 rounded-3xl bg-slate-950/90 border border-cyan-500/30 shadow-xl space-y-4">
          <div className="flex items-center gap-2">
            <Layers size={18} className="text-cyan-400" />
            <h4 className="text-sm font-bold text-foreground">Visual Concept Workflow Diagram</h4>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-semibold border border-cyan-500/30">Step-by-Step Flow</span>
          </div>

          <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3 overflow-x-auto pb-2">
            {flowchartSteps.map((step, idx) => (
              <React.Fragment key={idx}>
                <div className="flex-1 min-w-[170px] p-4 rounded-2xl bg-card border border-border hover:border-cyan-500/50 transition-all space-y-1 shadow-md group">
                  <div className="flex items-center justify-between">
                    <span className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 font-bold text-xs flex items-center justify-center">
                      {idx + 1}
                    </span>
                    <span className="text-[9px] text-muted-foreground uppercase tracking-wider">Step {idx + 1}</span>
                  </div>
                  <p className="text-xs font-semibold text-foreground group-hover:text-cyan-300 transition-colors pt-1 leading-snug">
                    {step}
                  </p>
                </div>
                {idx < flowchartSteps.length - 1 && (
                  <div className="hidden md:flex items-center justify-center text-cyan-400/60">
                    <ArrowRight size={20} />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      )}

      {/* ── CLEANED PARAGRAPHS & SECTIONS (NO HASHTAGS) ── */}
      {sections.map((sec, sIdx) => {
        const fullTextForSpeech = `${sec.title}. ${sec.paragraphs.join(". ")}. ${sec.bulletPoints.join(". ")}. ${sec.steps.join(". ")}`;
        return (
          <div
            key={sIdx}
            className={`p-6 rounded-3xl border transition-all space-y-4 ${
              sec.isImportant
                ? "bg-gradient-to-br from-amber-950/20 via-slate-900 to-slate-950 border-amber-500/40 shadow-xl"
                : "bg-card border-border hover:border-border/80 shadow-md"
            }`}
          >
            {/* Section Header */}
            <div className="flex items-center justify-between gap-3 border-b border-border/60 pb-3">
              <div className="flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-xl bg-purple-500/20 text-purple-300 font-bold text-xs flex items-center justify-center border border-purple-500/30">
                  {sIdx + 1}
                </span>
                <h3 className="text-base font-bold text-foreground">{sec.title}</h3>
                {sec.isImportant && (
                  <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30">
                    High Placement Frequency
                  </span>
                )}
              </div>
              <button
                onClick={() => readSectionAloud(sec.title, fullTextForSpeech)}
                className="text-xs px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-muted-foreground hover:text-foreground border border-border flex items-center gap-1.5 transition-all font-medium cursor-pointer"
                title="Read section with AI Voice Tutor"
              >
                <Volume2 size={13} className="text-purple-400" />
                <span>{activeVoiceSection === sec.title ? "Speaking..." : "Read Aloud"}</span>
              </button>
            </div>

            {/* Paragraphs */}
            {sec.paragraphs.map((p, pIdx) => (
              <p key={pIdx} className="text-sm text-slate-300 leading-relaxed font-sans">
                {p}
              </p>
            ))}

            {/* Step-by-Step Workflow List */}
            {sec.steps.length > 0 && (
              <div className="space-y-2 pt-1">
                <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400">Step-by-Step Procedure</h4>
                <div className="space-y-2">
                  {sec.steps.map((step, stIdx) => (
                    <div key={stIdx} className="flex items-start gap-3 p-3 rounded-2xl bg-white/5 border border-border/50 text-xs text-slate-200">
                      <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-300 font-bold text-[11px] flex items-center justify-center shrink-0 mt-0.5">
                        {stIdx + 1}
                      </span>
                      <span className="leading-relaxed">{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Key Bullets Card Grid */}
            {sec.bulletPoints.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 pt-1">
                {sec.bulletPoints.map((bp, bIdx) => (
                  <div key={bIdx} className="p-3.5 rounded-2xl bg-slate-950/70 border border-border flex items-start gap-2.5 text-xs text-slate-300 leading-relaxed">
                    <CheckCircle2 size={14} className="text-emerald-400 shrink-0 mt-0.5" />
                    <span>{bp}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}

      {/* ── KEY TAKEAWAYS ── */}
      {keyPoints.length > 0 && (
        <div className="p-6 rounded-3xl bg-slate-950 border border-purple-500/30 shadow-xl space-y-3">
          <div className="flex items-center gap-2">
            <Sparkles size={16} className="text-purple-400" />
            <h4 className="text-sm font-bold text-foreground">Core Takeaways for Quick Revision</h4>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {keyPoints.map((kp, i) => (
              <div key={i} className="p-3 rounded-2xl bg-white/5 border border-border flex items-start gap-2 text-xs text-slate-300">
                <CheckCircle2 size={14} className="text-emerald-400 shrink-0 mt-0.5" />
                <span>{kp}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
