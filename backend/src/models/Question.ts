import mongoose, { Document, Schema } from 'mongoose';

export interface IQuestion extends Document {
  department: string;
  topic: string;
  module: string;
  difficulty: 'beginner' | 'easy' | 'medium' | 'hard' | 'expert';
  type: 'mcq' | 'coding' | 'debug' | 'fill_blank';
  prompt: string;
  codeSnippet?: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  companyTags: string[];
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

const QuestionSchema: Schema = new Schema(
  {
    department: { type: String, required: true, enum: ['cse', 'it', 'aiml', 'aids', 'ece', 'eee', 'mech', 'civil', 'datascience', 'biomedical', 'CSE', 'IT', 'AIML', 'AIDS', 'ECE', 'EEE', 'MECH', 'Civil', 'DataScience', 'Biomedical'] },
    topic: { type: String, required: true },
    module: { type: String, required: true },
    difficulty: { type: String, enum: ['beginner', 'easy', 'medium', 'hard', 'expert'], required: true },
    type: { type: String, enum: ['mcq', 'coding', 'debug', 'fill_blank'], required: true },
    prompt: { type: String, required: true },
    codeSnippet: { type: String },
    options: [{ type: String }],
    correctAnswer: { type: Number, required: true },
    explanation: { type: String, required: true },
    companyTags: [{ type: String }],
    tags: [{ type: String }]
  },
  { timestamps: true }
);

export const Question = mongoose.model<IQuestion>('Question', QuestionSchema);
export default Question;
