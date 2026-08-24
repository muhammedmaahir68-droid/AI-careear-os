// Independent User Course Progress & My Course Plan Store
// Completely separate from personalized Career Learning Path

export interface CourseProgressRecord {
  courseId: string;
  completedLessons: string[];
  completedModules: string[];
  progressPercentage: number;
  addedToPlan: boolean;
  certificateEarned: boolean;
  completedAt?: string;
}

const STORAGE_KEY = "carvex_user_course_progress_v1";

export function loadUserCourseProgress(): Record<string, CourseProgressRecord> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    console.error("Error loading user course progress:", e);
    return {};
  }
}

export function saveUserCourseProgress(data: Record<string, CourseProgressRecord>): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.error("Error saving user course progress:", e);
  }
}

export function toggleCoursePlan(courseId: string): boolean {
  const current = loadUserCourseProgress();
  const existing = current[courseId] || {
    courseId,
    completedLessons: [],
    completedModules: [],
    progressPercentage: 0,
    addedToPlan: false,
    certificateEarned: false
  };

  existing.addedToPlan = !existing.addedToPlan;
  current[courseId] = existing;
  saveUserCourseProgress(current);
  return existing.addedToPlan;
}

export function updateLessonProgress(courseId: string, lessonId: string, totalLessonsCount: number): CourseProgressRecord {
  const current = loadUserCourseProgress();
  const existing = current[courseId] || {
    courseId,
    completedLessons: [],
    completedModules: [],
    progressPercentage: 0,
    addedToPlan: false,
    certificateEarned: false
  };

  if (!existing.completedLessons.includes(lessonId)) {
    existing.completedLessons.push(lessonId);
  }

  existing.progressPercentage = Math.round((existing.completedLessons.length / totalLessonsCount) * 100);

  if (existing.progressPercentage >= 100) {
    existing.certificateEarned = true;
    existing.completedAt = new Date().toISOString();
  }

  current[courseId] = existing;
  saveUserCourseProgress(current);
  return existing;
}
