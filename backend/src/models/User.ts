import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  username: string;
  email: string;
  passwordHash: string;
  department: string;
  role: 'student' | 'admin';
  xp: number;
  level: number;
  streak: number;
  diamonds: number;
  badges: string[];
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    department: { type: String, required: true, enum: ['CSE', 'IT', 'AIML', 'AIDS', 'ECE', 'EEE', 'MECH', 'Civil', 'DataScience', 'Biomedical'] },
    role: { type: String, enum: ['student', 'admin'], default: 'student' },
    xp: { type: Number, default: 0 },
    level: { type: Number, default: 1 },
    streak: { type: Number, default: 0 },
    diamonds: { type: Number, default: 0 },
    badges: [{ type: String }]
  },
  { timestamps: true }
);

export const User = mongoose.model<IUser>('User', UserSchema);
export default User;
