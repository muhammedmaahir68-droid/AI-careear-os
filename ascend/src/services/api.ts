// API base URL: uses VITE_API_URL env var on Vercel, falls back to local dev
const API_BASE_URL = (import.meta.env.VITE_API_URL as string) || '/api';

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

async function apiFetch(path: string, options?: RequestInit): Promise<any> {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    ...options,
  });
  if (!res.ok) throw new Error(`API ${path} failed: ${res.status}`);
  return res.json();
}

export async function fetchLessons(params?: {
  department?: string;
  level?: number;
  difficulty?: string;
  page?: number;
  limit?: number;
}) {
  try {
    const q = new URLSearchParams();
    if (params?.department) q.set('department', params.department);
    if (params?.level) q.set('level', String(params.level));
    if (params?.difficulty) q.set('difficulty', params.difficulty);
    if (params?.page) q.set('page', String(params.page));
    if (params?.limit) q.set('limit', String(params.limit));
    return await apiFetch(`/lessons?${q}`);
  } catch (err) {
    console.warn('Lessons API unavailable — using static data', err);
    return null;
  }
}

export async function searchLessons(q: string, department?: string) {
  try {
    const params = new URLSearchParams({ q });
    if (department) params.set('department', department);
    return await apiFetch(`/lessons/search?${params}`);
  } catch (err) {
    console.warn('Search API unavailable', err);
    return null;
  }
}

export async function fetchLesson(id: string) {
  try {
    return await apiFetch(`/lessons/${id}`);
  } catch (err) {
    console.warn('Lesson fetch failed', err);
    return null;
  }
}

export async function fetchRandomQuestions(params?: {
  department?: string;
  difficulty?: string;
  count?: number;
}) {
  try {
    const q = new URLSearchParams();
    if (params?.department) q.set('department', params.department);
    if (params?.difficulty) q.set('difficulty', params.difficulty);
    if (params?.count) q.set('count', String(params.count));
    return await apiFetch(`/questions/random?${q}`);
  } catch (err) {
    console.warn('Questions API unavailable — using static data', err);
    return null;
  }
}

export async function registerUser(data: {
  username: string;
  email: string;
  password: string;
  department?: string;
}) {
  try {
    const res = await apiFetch('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    if (res.data?.token) localStorage.setItem('auth_token', res.data.token);
    return res;
  } catch (err) {
    console.warn('Register failed', err);
    return null;
  }
}

export async function loginUser(email: string, password: string) {
  try {
    const res = await apiFetch('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    if (res.data?.token) localStorage.setItem('auth_token', res.data.token);
    return res;
  } catch (err) {
    console.warn('Login failed', err);
    return null;
  }
}

export async function recordUserProgress(data: {
  userId?: string;
  lessonId?: string;
  questionId?: string;
  type: 'lesson_complete' | 'quiz_complete' | 'daily_challenge';
  score?: number;
  xpEarned?: number;
  diamondsEarned?: number;
}) {
  try {
    const token = localStorage.getItem('auth_token');
    return await apiFetch('/progress', {
      method: 'POST',
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      body: JSON.stringify(data),
    });
  } catch (err) {
    console.warn('Progress sync failed — continuing offline', err);
    return null;
  }
}

export async function fetchUserStats(userId: string) {
  try {
    return await apiFetch(`/progress/${userId}/stats`);
  } catch (err) {
    console.warn('Stats fetch failed', err);
    return null;
  }
}

export async function checkApiHealth(): Promise<boolean> {
  try {
    const res = await fetch(`${API_BASE_URL}/health`);
    return res.ok;
  } catch {
    return false;
  }
}
