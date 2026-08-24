import React, { useState } from "react";
import { X, Play, BookOpen, CheckCircle2, Award, Globe, Video, Clock, Layers, Star, Plus, Check } from "lucide-react";
import type { Course } from "../data/coursesCatalog";
import { generate12LanguageVideos } from "../data/coursesCatalog";
import { loadUserCourseProgress, toggleCoursePlan, updateLessonProgress } from "../data/userCourseStore";

interface Props {
  course: Course | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function CourseDetailModal({ course, isOpen, onClose }: Props) {
  const [activeTab, setActiveTab] = useState<"overview" | "modules" | "videos" | "certificate">("overview");
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [inPlan, setInPlan] = useState<boolean>(() => {
    if (!course) return false;
    const prog = loadUserCourseProgress();
    return prog[course.id]?.addedToPlan || false;
  });

  if (!isOpen || !course) return null;

  const progressData = loadUserCourseProgress()[course.id] || {
    completedLessons: [],
    progressPercentage: 0,
    certificateEarned: false
  };

  const handlePlanToggle = () => {
    const newState = toggleCoursePlan(course.id);
    setInPlan(newState);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-card border border-border rounded-3xl max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden animate-fade-rise">
        {/* Header */}
        <div className="p-6 border-b border-border bg-gradient-to-r from-purple-950/40 via-background to-blue-950/40 flex justify-between items-start shrink-0">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 font-bold border border-purple-500/30 uppercase tracking-wider">
                {course.category}
              </span>
              <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 font-bold border border-blue-500/30 uppercase tracking-wider">
                {course.difficulty}
              </span>
            </div>
            <h2 className="text-xl font-bold text-foreground">{course.title}</h2>
            <p className="text-xs text-muted-foreground max-w-xl">{course.shortDescription}</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePlanToggle}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                inPlan 
                  ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" 
                  : "bg-purple-600 hover:bg-purple-500 text-white"
              }`}
            >
              {inPlan ? <Check size={14} /> : <Plus size={14} />}
              {inPlan ? "In My Plan" : "Add to My Plan"}
            </button>
            <button onClick={onClose} className="p-2 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground">
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Tab Selector */}
        <div className="px-6 py-3 border-b border-border bg-muted/30 flex gap-2 shrink-0 overflow-x-auto custom-scrollbar">
          <button
            onClick={() => setActiveTab("overview")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${activeTab === "overview" ? "bg-purple-600 text-white" : "bg-muted text-muted-foreground hover:text-foreground"}`}
          >
            Course Overview
          </button>
          <button
            onClick={() => setActiveTab("modules")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${activeTab === "modules" ? "bg-purple-600 text-white" : "bg-muted text-muted-foreground hover:text-foreground"}`}
          >
            Modules & Lessons ({course.modules.length})
          </button>
          <button
            onClick={() => setActiveTab("videos")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${activeTab === "videos" ? "bg-purple-600 text-white" : "bg-muted text-muted-foreground hover:text-foreground"}`}
          >
            <Video size={13} /> 12 Multi-Lang Videos
          </button>
          <button
            onClick={() => setActiveTab("certificate")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${activeTab === "certificate" ? "bg-purple-600 text-white" : "bg-muted text-muted-foreground hover:text-foreground"}`}
          >
            <Award size={13} className="text-amber-400" /> Certificate
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
          {activeTab === "overview" && (
            <div className="space-y-6">
              <div className="p-4 rounded-2xl bg-muted/40 border border-border space-y-2">
                <h4 className="text-xs font-bold text-purple-400">About this Course</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">{course.overview}</p>
              </div>

              {/* Stats Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3 rounded-xl bg-card border border-border text-center">
                  <Clock size={16} className="text-purple-400 mx-auto mb-1" />
                  <span className="text-xs font-bold text-foreground block">{course.estimatedHours} Hours</span>
                  <span className="text-[10px] text-muted-foreground">Estimated</span>
                </div>
                <div className="p-3 rounded-xl bg-card border border-border text-center">
                  <BookOpen size={16} className="text-cyan-400 mx-auto mb-1" />
                  <span className="text-xs font-bold text-foreground block">{course.lessonsCount} Lessons</span>
                  <span className="text-[10px] text-muted-foreground">Interactive</span>
                </div>
                <div className="p-3 rounded-xl bg-card border border-border text-center">
                  <Layers size={16} className="text-emerald-400 mx-auto mb-1" />
                  <span className="text-xs font-bold text-foreground block">{course.practiceCount} Problems</span>
                  <span className="text-[10px] text-muted-foreground">Practice</span>
                </div>
                <div className="p-3 rounded-xl bg-card border border-border text-center">
                  <Award size={16} className="text-amber-400 mx-auto mb-1" />
                  <span className="text-xs font-bold text-foreground block">{course.projectsCount} Projects</span>
                  <span className="text-[10px] text-muted-foreground">Portfolio</span>
                </div>
              </div>

              {/* Progress */}
              <div className="p-4 rounded-2xl bg-purple-950/20 border border-purple-500/20 space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-foreground">Your Independent Course Progress</span>
                  <span className="font-bold text-purple-400">{progressData.progressPercentage}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-muted overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-purple-500 to-cyan-400 transition-all duration-300" style={{ width: `${progressData.progressPercentage}%` }} />
                </div>
              </div>
            </div>
          )}

          {activeTab === "modules" && (
            <div className="space-y-4">
              <h4 className="text-xs font-bold text-muted-foreground">Course Modules ({course.modules.length})</h4>
              <div className="space-y-3">
                {course.modules.map((m, idx) => (
                  <div key={m.id} className="p-4 rounded-2xl bg-card border border-border flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-bold text-purple-400">Module #{idx + 1} • {m.estimatedHours} Hours</span>
                      <h4 className="text-sm font-bold text-foreground mt-0.5">{m.title}</h4>
                      <p className="text-xs text-muted-foreground mt-1">{m.summary}</p>
                    </div>
                    <span className="text-xs px-3 py-1 rounded-lg bg-purple-500/10 text-purple-300 font-bold border border-purple-500/20 shrink-0">
                      {m.topicsCount} Topics
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "videos" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-purple-400 flex items-center gap-1.5"><Globe size={14} /> 12 Multi-Language Video Tutorials</h4>
                  <p className="text-xs text-muted-foreground">Watch complete full-course tutorials in your native language.</p>
                </div>
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
                    <span className="text-xl">{vid.flag}</span>
                    <div className="truncate">
                      <span className="text-xs font-bold text-foreground group-hover:text-purple-300 transition-colors block truncate">{vid.language}</span>
                      <span className="text-[10px] text-muted-foreground truncate flex items-center gap-1"><Play size={10} className="text-purple-400" /> Watch Tutorial</span>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          )}

          {activeTab === "certificate" && (
            <div className="p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-purple-950/40 to-slate-950 border border-amber-500/30 text-center space-y-4">
              <Award size={48} className="text-amber-400 mx-auto animate-pulse" />
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-foreground">{course.certificateName}</h3>
                <p className="text-xs text-muted-foreground">Earn this certificate upon 100% completion of all lessons and projects in this course.</p>
              </div>
              <div className="pt-4">
                {progressData.certificateEarned ? (
                  <span className="px-4 py-2 rounded-xl bg-amber-500/20 text-amber-300 font-bold text-xs border border-amber-500/30">
                    🏆 Certificate Unlocked & Earned!
                  </span>
                ) : (
                  <span className="text-xs text-slate-400 bg-muted px-4 py-2 rounded-xl border border-border">
                    Lock Status: Complete {100 - progressData.progressPercentage}% more to unlock
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
