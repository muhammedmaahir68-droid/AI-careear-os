import mongoose, { Document, Schema } from 'mongoose';

export interface IModule extends Document {
  title: string;
  department: string;
  level: number;
  description: string;
  lessonIds: mongoose.Types.ObjectId[];
  questionIds: mongoose.Types.ObjectId[];
  prerequisites: string[];
  estimatedHours: number;
  isPublished: boolean;
}

const ModuleSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    department: { type: String, required: true, enum: ['cse', 'it', 'aiml', 'aids', 'ece', 'eee', 'mech', 'civil', 'datascience', 'biomedical', 'CSE', 'IT', 'AIML', 'AIDS', 'ECE', 'EEE', 'MECH', 'Civil', 'DataScience', 'Biomedical'] },
    level: { type: Number, required: true, min: 1, max: 10 },
    description: { type: String, required: true },
    lessonIds: [{ type: Schema.Types.ObjectId, ref: 'Lesson' }],
    questionIds: [{ type: Schema.Types.ObjectId, ref: 'Question' }],
    prerequisites: [{ type: String }],
    estimatedHours: { type: Number, required: true, default: 1 },
    isPublished: { type: Boolean, default: false }
  },
  { timestamps: true }
);

export const Module = mongoose.model<IModule>('Module', ModuleSchema);
export default Module;
