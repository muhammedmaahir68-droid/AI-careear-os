export interface ApiLesson {
  _id: string;
  title: string;
  department: string;
  level: number;
  content: string;
  summary: string;
  keyPoints: string[];
  examples: string[];
  formulas: string[];
  difficulty: string;
  estimatedMinutes: number;
  prerequisites: string[];
}

export interface ApiQuestion {
  _id: string;
  department: string;
  topic: string;
  module: string;
  difficulty: string;
  type: string;
  prompt: string;
  codeSnippet?: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  companyTags: string[];
  tags: string[];
}

const API_BASE_URL = 'http://localhost:5000/api';

export async function fetchLessons(params?: { department?: string; level?: number; difficulty?: string; page?: number; limit?: number }) {
  try {
    const query = new URLSearchParams();
    if (params?.department) query.append('department', params.department);
    if (params?.level) query.append('level', params.level.toString());
    if (params?.difficulty) query.append('difficulty', params.difficulty);
    if (params?.page) query.append('page', params.page.toString());
    if (params?.limit) query.append('limit', params.limit.toString());

    const res = await fetch(`${API_BASE_URL}/lessons?${query.toString()}`);
    if (!res.ok) throw new Error('Failed to fetch lessons');
    return await res.json();
  } catch (err) {
    console.warn('Backend API unavailable, falling back to static data:', err);
    return null;
  }
}

export async function fetchRandomQuestions(params?: { department?: string; difficulty?: string; count?: number }) {
  try {
    const query = new URLSearchParams();
    if (params?.department) query.append('department', params.department);
    if (params?.difficulty) query.append('difficulty', params.difficulty);
    if (params?.count) query.append('count', params.count.toString());

    const res = await fetch(`${API_BASE_URL}/questions/random?${query.toString()}`);
    if (!res.ok) throw new Error('Failed to fetch questions');
    return await res.json();
  } catch (err) {
    console.warn('Backend API unavailable, falling back to static data:', err);
    return null;
  }
}

export async function recordUserProgress(data: {
  userId: string;
  lessonId?: string;
  questionId?: string;
  type: 'lesson_complete' | 'quiz_complete' | 'daily_challenge';
  score?: number;
  xpEarned?: number;
  diamondsEarned?: number;
}) {
  try {
    const token = localStorage.getItem('auth_token');
    const res = await fetch(`${API_BASE_URL}/progress`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to record progress');
    return await res.json();
  } catch (err) {
    console.warn('Could not sync progress with backend:', err);
    return null;
  }
}
