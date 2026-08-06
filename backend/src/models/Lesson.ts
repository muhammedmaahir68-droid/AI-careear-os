import mongoose, { Document, Schema } from 'mongoose';

export interface ILesson extends Document {
  title: string;
  department: string;
  role?: string;
  level: number;
  content: string;
  summary: string;
  keyPoints: string[];
  examples: string[];
  formulas: string[];
  sourceUrl?: string;
  tags: string[];
  difficulty: 'beginner' | 'easy' | 'medium' | 'hard' | 'expert';
  estimatedMinutes: number;
  prerequisites: string[];
  createdAt: Date;
  updatedAt: Date;
}

const LessonSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    department: { type: String, required: true, enum: ['CSE', 'IT', 'AIML', 'AIDS', 'ECE', 'EEE', 'MECH', 'Civil', 'DataScience', 'Biomedical'] },
    role: { type: String },
    level: { type: Number, required: true, min: 1, max: 10 },
    content: { type: String, required: true },
    summary: { type: String, required: true },
    keyPoints: [{ type: String }],
    examples: [{ type: String }],
    formulas: [{ type: String }],
    sourceUrl: { type: String },
    tags: [{ type: String }],
    difficulty: { type: String, enum: ['beginner', 'easy', 'medium', 'hard', 'expert'], required: true },
    estimatedMinutes: { type: Number, required: true, default: 30 },
    prerequisites: [{ type: String }]
  },
  { timestamps: true }
);

LessonSchema.index({ title: 'text', content: 'text', summary: 'text' });

export const Lesson = mongoose.model<ILesson>('Lesson', LessonSchema);
export default Lesson;
