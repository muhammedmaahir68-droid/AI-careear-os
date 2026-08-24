import React, { useState, useMemo } from "react";
import { X, Play, BookOpen, CheckCircle2, Award, Globe, Video, Clock, Layers, Plus, Check, ChevronRight, ChevronDown } from "lucide-react";
import type { Course } from "../data/coursesCatalog";
import { generate12LanguageVideos } from "../data/coursesCatalog";
import { loadUserCourseProgress, toggleCoursePlan, updateLessonProgress } from "../data/userCourseStore";
import { generateModuleTopics } from "../data/courseLessonContent";
import type { LessonTopic } from "../data/courseLessonContent";
import CourseLessonViewer from "./CourseLessonViewer";

interface Props {
  course: Course | null;
  isOpen: boolean;
  onClose: () => void;
}

type MainView = "overview" | "learn" | "videos" | "certificate";

export default function CourseDetailModal({ course, isOpen, onClose }: Props) {
  const [mainView, setMainView] = useState<MainView>("overview");
  const [expandedModule, setExpandedModule] = useState<string | null>(null);
  const [activeTopic, setActiveTopic] = useState<LessonTopic | null>(null);
  const [activeModuleTitle, setActiveModuleTitle] = useState<string>("");
  const [inPlan, setInPlan] = useState<boolean>(() => {
    if (!course) return false;
    return loadUserCourseProgress()[course.id]?.addedToPlan || false;
  });
  const [completedTopics, setCompletedTopics] = useState<Set<string>>(() => {
    if (!course) return new Set();
    const prog = loadUserCourseProgress()[course.id];
    return new Set(prog?.completedLessons || []);
  });

  // Pre-generate topics for all modules (memoized so they don't change on re-render)
  const moduleTopicsMap = useMemo(() => {
    if (!course) return {};
    const map: Record<string, LessonTopic[]> = {};
    course.modules.forEach(m => {
      map[m.id] = generateModuleTopics(course.title, m.title, m.topicsCount);
    });
    return map;
  }, [course?.id]);

  if (!isOpen || !course) return null;

  const totalTopics = course.modules.reduce((s, m) => s + m.topicsCount, 0);
  const progressPct = totalTopics > 0 ? Math.round((completedTopics.size / totalTopics) * 100) : 0;

  const handlePlanToggle = () => {
    const newState = toggleCoursePlan(course.id);
    setInPlan(newState);
  };

  const handleTopicComplete = (topicId: string) => {
    const newSet = new Set(completedTopics);
    newSet.add(topicId);
    setCompletedTopics(newSet);
    updateLessonProgress(course.id, topicId, totalTopics);
  };

  const MAIN_TABS: { id: MainView; label: string }[] = [
    { id: "overview", label: "Overview" },
    { id: "learn", label: `Learn (${course.modules.length} Modules)` },
    { id: "videos", label: "12 Videos" },
    { id: "certificate", label: "Certificate" },
  ];

  // If a topic is open, show the lesson viewer full-screen
  if (activeTopic && mainView === "learn") {
    return (
      <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
        <div className="bg-card border border-border rounded-3xl max-w-3xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
          <CourseLessonViewer
            topic={activeTopic}
            courseTitle={course.title}
            onBack={() => setActiveTopic(null)}
            onComplete={handleTopicComplete}
            isCompleted={completedTopics.has(activeTopic.id)}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-card border border-border rounded-3xl max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">

        {/* Header */}
        <div className="p-5 border-b border-border bg-gradient-to-r from-purple-950/40 via-background to-blue-950/40 flex justify-between items-start shrink-0">
          <div className="space-y-1 flex-1 mr-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 font-bold border border-purple-500/30 uppercase tracking-wider">{course.category}</span>
              <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 font-bold border border-blue-500/30 uppercase tracking-wider">{course.difficulty}</span>
            </div>
            <h2 className="text-lg font-bold text-foreground">{course.title}</h2>
            <p className="text-xs text-muted-foreground">{course.shortDescription}</p>
            {/* Progress bar */}
            <div className="flex items-center gap-2 pt-1">
              <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden">
                <div className="h-full bg-gradient-to-r from-purple-500 to-cyan-400 transition-all duration-500" style={{ width: `${progressPct}%` }} />
              </div>
              <span className="text-[10px] font-bold text-purple-400 shrink-0">{progressPct}% Complete</span>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handlePlanToggle}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${inPlan ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" : "bg-purple-600 hover:bg-purple-500 text-white"}`}
            >
              {inPlan ? <Check size={13} /> : <Plus size={13} />}
              {inPlan ? "In My Plan" : "Add to Plan"}
            </button>
            <button onClick={onClose} className="p-1.5 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground">
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Main Tab Bar */}
        <div className="px-5 py-2 border-b border-border bg-muted/20 flex gap-1 overflow-x-auto shrink-0 custom-scrollbar">
          {MAIN_TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => setMainView(tab.id)}
              className={`px-4 py-2 rounded-xl text-[11px] font-bold whitespace-nowrap transition-all ${mainView === tab.id ? "bg-purple-600 text-white" : "bg-muted text-muted-foreground hover:text-foreground"}`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5 custom-scrollbar">

          {/* ── OVERVIEW ── */}
          {mainView === "overview" && (
            <div className="space-y-5">
              <div className="p-4 rounded-2xl bg-muted/30 border border-border space-y-2">
                <h4 className="text-xs font-bold text-purple-400">About this Course</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">{course.overview}</p>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { icon: <Clock size={16} className="text-purple-400" />, val: `${course.estimatedHours}h`, label: "Duration" },
                  { icon: <BookOpen size={16} className="text-cyan-400" />, val: course.lessonsCount, label: "Lessons" },
                  { icon: <Layers size={16} className="text-emerald-400" />, val: course.practiceCount, label: "Practice" },
                  { icon: <Award size={16} className="text-amber-400" />, val: course.projectsCount, label: "Projects" },
                ].map((s, i) => (
                  <div key={i} className="p-3 rounded-xl bg-card border border-border text-center space-y-1">
                    <div className="flex justify-center">{s.icon}</div>
                    <span className="text-sm font-bold text-foreground block">{s.val}</span>
                    <span className="text-[10px] text-muted-foreground">{s.label}</span>
                  </div>
                ))}
              </div>
              <div className="p-4 rounded-2xl bg-blue-950/20 border border-blue-500/20 space-y-2">
                <h4 className="text-xs font-bold text-blue-400">Course Learning Flow</h4>
                <div className="flex flex-wrap gap-2">
                  {["Learn", "Code", "Debug", "Quiz", "Practice", "Interview Q", "Project", "Assessment", "Certificate"].map((step, i, arr) => (
                    <React.Fragment key={step}>
                      <span className="text-[10px] px-2.5 py-1 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-300 font-bold">{step}</span>
                      {i < arr.length - 1 && <span className="text-muted-foreground text-xs self-center">→</span>}
                    </React.Fragment>
                  ))}
                </div>
                <p className="text-[10px] text-muted-foreground">Each lesson follows this complete learning flow independently from your main career path.</p>
              </div>
            </div>
          )}

          {/* ── LEARN (MODULE BROWSER) ── */}
          {mainView === "learn" && (
            <div className="space-y-3">
              <p className="text-xs text-muted-foreground">Click on any module to expand topics, then tap a topic to open the full lesson with study material, code, debug challenge, quiz and interview questions.</p>
              {course.modules.map((mod, idx) => {
                const topics = moduleTopicsMap[mod.id] || [];
                const completedInModule = topics.filter(t => completedTopics.has(t.id)).length;
                const isOpen = expandedModule === mod.id;
                return (
                  <div key={mod.id} className="rounded-2xl border border-border bg-card overflow-hidden">
                    {/* Module Header — clickable */}
                    <button
                      className="w-full flex items-center justify-between px-4 py-3.5 hover:bg-muted/40 transition-colors text-left"
                      onClick={() => setExpandedModule(isOpen ? null : mod.id)}
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-7 h-7 rounded-lg bg-purple-600/20 border border-purple-500/30 text-purple-300 text-[10px] font-bold flex items-center justify-center shrink-0">
                          {idx + 1}
                        </span>
                        <div className="text-left">
                          <span className="text-sm font-bold text-foreground block">{mod.title}</span>
                          <span className="text-[10px] text-muted-foreground">{mod.summary}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 shrink-0 ml-3">
                        <div className="text-right hidden sm:block">
                          <span className="text-[10px] text-muted-foreground block">{completedInModule}/{topics.length} done</span>
                          <span className="text-[10px] text-blue-400 font-bold">{mod.estimatedHours}h</span>
                        </div>
                        {completedInModule === topics.length && topics.length > 0
                          ? <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
                          : isOpen ? <ChevronDown size={16} className="text-muted-foreground shrink-0" /> : <ChevronRight size={16} className="text-muted-foreground shrink-0" />
                        }
                      </div>
                    </button>

                    {/* Topics List */}
                    {isOpen && (
                      <div className="border-t border-border bg-muted/10">
                        {topics.length === 0 ? (
                          <p className="p-4 text-xs text-muted-foreground">Loading topics...</p>
                        ) : (
                          topics.map((topic, ti) => {
                            const done = completedTopics.has(topic.id);
                            return (
                              <button
                                key={topic.id}
                                onClick={() => {
                                  setActiveModuleTitle(mod.title);
                                  setActiveTopic(topic);
                                }}
                                className="w-full flex items-center gap-3 px-5 py-3 hover:bg-muted/40 transition-colors border-t border-border/50 first:border-t-0 text-left group"
                              >
                                <span className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 transition-colors ${done ? "bg-emerald-500 border-emerald-500" : "border-border group-hover:border-blue-500"}`}>
                                  {done
                                    ? <CheckCircle2 size={11} className="text-white" />
                                    : <Play size={9} className="text-muted-foreground group-hover:text-blue-400 ml-0.5" />
                                  }
                                </span>
                                <div className="flex-1 min-w-0">
                                  <span className="text-xs font-medium text-foreground group-hover:text-blue-300 transition-colors block truncate">{topic.title}</span>
                                  <span className="text-[10px] text-muted-foreground">~{topic.estimatedMinutes} min · Learn · Code · Debug · Quiz · Interview</span>
                                </div>
                                <ChevronRight size={13} className="text-muted-foreground group-hover:text-blue-400 shrink-0 transition-colors" />
                              </button>
                            );
                          })
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* ── VIDEOS ── */}
          {mainView === "videos" && (
            <div className="space-y-4">
              <div>
                <h4 className="text-xs font-bold text-purple-400 flex items-center gap-1.5 mb-1"><Globe size={14} /> 12 Multi-Language Video Tutorials</h4>
                <p className="text-xs text-muted-foreground">Watch complete full-course tutorials in your native language on YouTube.</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {course.videos.map((vid, idx) => (
                  <a
                    key={idx}
                    href={vid.url}
                    target="_blank"
                    rel="noreferrer"
                    className="p-3.5 rounded-xl bg-card hover:bg-muted border border-border hover:border-purple-500/40 transition-all flex items-center gap-3 group"
                  >
                    <span className="text-xl shrink-0">{vid.flag}</span>
                    <div className="truncate">
                      <span className="text-xs font-bold text-foreground group-hover:text-purple-300 transition-colors block">{vid.language}</span>
                      <span className="text-[10px] text-muted-foreground flex items-center gap-1"><Play size={10} className="text-purple-400" /> Watch on YouTube</span>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* ── CERTIFICATE ── */}
          {mainView === "certificate" && (
            <div className="p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-purple-950/40 to-slate-950 border border-amber-500/30 text-center space-y-4">
              <Award size={48} className="text-amber-400 mx-auto" />
              <h3 className="text-lg font-bold text-foreground">{course.certificateName}</h3>
              <p className="text-xs text-muted-foreground max-w-sm mx-auto">Complete all {totalTopics} lessons and pass all quizzes to earn this certificate.</p>
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold px-2">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="text-amber-400">{progressPct}%</span>
                </div>
                <div className="w-full h-2.5 rounded-full bg-muted overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-amber-500 to-yellow-400 transition-all duration-500" style={{ width: `${progressPct}%` }} />
                </div>
              </div>
              {progressPct >= 100 ? (
                <span className="inline-block px-5 py-2 rounded-xl bg-amber-500/20 text-amber-300 font-bold text-sm border border-amber-500/30">🏆 Certificate Earned!</span>
              ) : (
                <button
                  onClick={() => setMainView("learn")}
                  className="px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-sm font-bold transition-all"
                >
                  Continue Learning
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
