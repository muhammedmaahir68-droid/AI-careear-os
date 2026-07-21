// src/types.ts

/** Core data models coming from Supabase */
export interface Module {
  id: string;
  title: string;
  description?: string;
  order_index: number;
  created_at?: string;
}

export interface Topic {
  id: string;
  module_id: string;
  title: string;
  description?: string;
  order_index: number;
  created_at?: string;
}

export interface Lesson {
  id: string;
  topic_id: string;
  title: string;
  content: string; // markdown or HTML
  order_index: number;
  created_at?: string;
}

export interface Question {
  id: string;
  module_id?: string;
  topic_id?: string;
  difficulty: "easy" | "medium" | "hard";
  type: "multiple_choice" | "short_answer" | "coding";
  content: string;
  answer: string;
  explanation?: string;
  ai_explanation?: string;
  created_at?: string;
}

export interface Quiz {
  id: string;
  title: string;
  module_id?: string;
  description?: string;
  created_at?: string;
}

export interface Resume {
  id: string;
  user_id: string;
  data: any; // flexible JSON structure for sections
  ats_score?: number;
  created_at?: string;
  updated_at?: string;
}
