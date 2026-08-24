import React, { useState } from "react";
import { Search, BookOpen, Layers, Award, Star, Video, Filter, Check, Plus, Globe, ArrowRight, Shield, Zap, Sparkles } from "lucide-react";
import type { Course } from "../data/coursesCatalog";
import { ALL_COURSES, generate12LanguageVideos } from "../data/coursesCatalog";
import { loadUserCourseProgress, toggleCoursePlan } from "../data/userCourseStore";
import CourseDetailModal from "./CourseDetailModal";

interface Props {
  userRole?: string | null;
  userBranch?: string | null;
}

const CATEGORIES = [
  "All", "Programming", "AI & Data", "Cloud", "Electronics", "Robotics",
  "VLSI", "Biotechnology", "Mechanical", "Marine", "Cybersecurity"
];

export default function CoursesHub({ userRole = "cse-backend", userBranch = "cse" }: Props) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedDifficulty, setSelectedDifficulty] = useState("All");
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  const [userProgress, setUserProgress] = useState(() => loadUserCourseProgress());

  const handlePlanToggle = (courseId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    toggleCoursePlan(courseId);
    setUserProgress(loadUserCourseProgress());
  };

  // Filter courses
  const filteredCourses = ALL_COURSES.filter(c => {
    const matchesSearch = c.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          c.shortDescription.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = selectedCategory === "All" || c.category === selectedCategory;
    const matchesDiff = selectedDifficulty === "All" || c.difficulty === selectedDifficulty;
    return matchesSearch && matchesCat && matchesDiff;
  });

  // Recommended courses for role
  const recommendedCourses = ALL_COURSES.filter(c => 
    userRole && c.relatedRoles.includes(userRole.toLowerCase())
  );

  return (
    <div className="w-full max-w-6xl mx-auto space-y-8 pb-16 text-slate-100 animate-fade-rise">
      {/* Hero Header */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-blue-950/80 to-purple-950/80 border border-blue-500/30 shadow-2xl space-y-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-[10px] px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 font-bold border border-blue-500/30 uppercase tracking-wider">
                COURSES HUB — GLOBAL CATALOG
              </span>
              <span className="text-[10px] px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">
                INDEPENDENT SKILL BUILDING
              </span>
            </div>
            <h1 className="text-3xl font-extrabold text-foreground">Explore Engineering & Tech Courses</h1>
            <p className="text-xs text-muted-foreground max-w-2xl leading-relaxed">
              Learn additional programming languages, electronics, robotics, VLSI, biotechnology, marine engineering, and cloud skills. These independent courses do not alter your primary career path automatically.
            </p>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="pt-2 grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="relative md:col-span-2">
            <Search size={16} className="absolute left-3.5 top-3 text-muted-foreground" />
            <input
              type="text"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="Search courses by title, tech, or topic (e.g. Python, Robotics, VLSI, Marine)..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-card border border-border text-foreground text-xs focus:outline-none focus:border-blue-500"
            />
          </div>
          <select
            value={selectedDifficulty}
            onChange={e => setSelectedDifficulty(e.target.value)}
            className="px-4 py-2.5 rounded-xl bg-card border border-border text-foreground text-xs font-medium focus:outline-none focus:border-blue-500"
          >
            <option value="All">All Difficulty Levels</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
            <option value="Professional">Professional</option>
          </select>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex gap-2 overflow-x-auto pb-2 custom-scrollbar">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              selectedCategory === cat
                ? "bg-blue-600 text-white shadow-md shadow-blue-900/40"
                : "bg-card hover:bg-muted border border-border text-muted-foreground hover:text-foreground"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Recommended for Your Role Section (Non-Intrusive) */}
      {recommendedCourses.length > 0 && selectedCategory === "All" && !searchTerm && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Sparkles size={18} className="text-amber-400" />
            <h3 className="text-base font-bold text-foreground">Recommended Courses for Your Role</h3>
            <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-300 font-bold border border-amber-500/20">
              Optional Enhancement
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {recommendedCourses.map(course => {
              const prog = userProgress[course.id] || {};
              return (
                <div
                  key={course.id}
                  onClick={() => setSelectedCourse(course)}
                  className="p-5 rounded-2xl bg-card hover:bg-muted/50 border border-amber-500/30 hover:border-amber-500/60 transition-all cursor-pointer space-y-3 group shadow-lg"
                >
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30">
                      {course.category}
                    </span>
                    <button
                      onClick={e => handlePlanToggle(course.id, e)}
                      className={`p-1.5 rounded-lg border text-xs font-bold ${
                        prog.addedToPlan
                          ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
                          : "bg-muted text-muted-foreground hover:text-foreground border-border"
                      }`}
                    >
                      {prog.addedToPlan ? <Check size={14} /> : <Plus size={14} />}
                    </button>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-foreground group-hover:text-amber-300 transition-colors">{course.title}</h4>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{course.shortDescription}</p>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-border">
                    <span>{course.estimatedHours} Hours</span>
                    <span>{course.lessonsCount} Lessons</span>
                    <span className="text-amber-400 font-bold flex items-center gap-1"><Video size={12} /> 12 Videos</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Main Global Course Grid */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-base font-bold text-foreground">All Courses ({filteredCourses.length})</h3>
          <span className="text-xs text-muted-foreground">Click any course to view 12 multi-lang video tutorials</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCourses.map(course => {
            const prog = userProgress[course.id] || {};
            return (
              <div
                key={course.id}
                onClick={() => setSelectedCourse(course)}
                className="p-5 rounded-2xl bg-card hover:bg-muted/60 border border-border hover:border-blue-500/40 transition-all cursor-pointer space-y-4 flex flex-col justify-between group shadow-md"
              >
                <div className="space-y-3">
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 font-bold border border-blue-500/30">
                      {course.category}
                    </span>
                    <button
                      onClick={e => handlePlanToggle(course.id, e)}
                      title={prog.addedToPlan ? "Remove from My Plan" : "Add to My Plan"}
                      className={`p-1.5 rounded-lg border text-xs font-bold transition-all ${
                        prog.addedToPlan
                          ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
                          : "bg-muted text-muted-foreground hover:text-foreground border-border"
                      }`}
                    >
                      {prog.addedToPlan ? <Check size={14} /> : <Plus size={14} />}
                    </button>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-foreground group-hover:text-blue-300 transition-colors">{course.title}</h4>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{course.shortDescription}</p>
                  </div>
                </div>

                <div className="space-y-3 pt-2 border-t border-border">
                  <div className="flex items-center justify-between text-[11px] text-muted-foreground">
                    <span>⏱️ {course.estimatedHours} Hours</span>
                    <span>📚 {course.lessonsCount} Lessons</span>
                    <span className="text-purple-400 font-bold flex items-center gap-1"><Video size={11} /> 12 Videos</span>
                  </div>

                  {prog.progressPercentage > 0 && (
                    <div className="space-y-1">
                      <div className="flex justify-between text-[10px] font-bold">
                        <span className="text-muted-foreground">Course Progress</span>
                        <span className="text-blue-400">{prog.progressPercentage}%</span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-muted overflow-hidden">
                        <div className="h-full bg-blue-500" style={{ width: `${prog.progressPercentage}%` }} />
                      </div>
                    </div>
                  )}

                  <button className="w-full py-2 rounded-xl bg-blue-600/10 group-hover:bg-blue-600 text-blue-300 group-hover:text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5">
                    Explore Course <ArrowRight size={13} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Course Detail Modal */}
      <CourseDetailModal
        course={selectedCourse}
        isOpen={!!selectedCourse}
        onClose={() => setSelectedCourse(null)}
      />
    </div>
  );
}
