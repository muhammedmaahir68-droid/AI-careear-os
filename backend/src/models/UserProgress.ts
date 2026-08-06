import mongoose, { Document, Schema } from 'mongoose';

export interface IUserProgress extends Document {
  userId: mongoose.Types.ObjectId;
  lessonId?: mongoose.Types.ObjectId;
  questionId?: mongoose.Types.ObjectId;
  completed: boolean;
  score: number;
  xpEarned: number;
  streakCount: number;
  diamondLevel: number;
  completedAt: Date;
  badges: string[];
}

const UserProgressSchema: Schema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    lessonId: { type: Schema.Types.ObjectId, ref: 'Lesson' },
    questionId: { type: Schema.Types.ObjectId, ref: 'Question' },
    completed: { type: Boolean, default: false },
    score: { type: Number, default: 0 },
    xpEarned: { type: Number, default: 0 },
    streakCount: { type: Number, default: 0 },
    diamondLevel: { type: Number, default: 0 },
    completedAt: { type: Date },
    badges: [{ type: String }]
  },
  { timestamps: true }
);

export const UserProgress = mongoose.model<IUserProgress>('UserProgress', UserProgressSchema);
export default UserProgress;
