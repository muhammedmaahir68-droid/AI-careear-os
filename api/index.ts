import mongoose from 'mongoose';
import app from '../backend/src/server';

let isConnected = false;

async function ensureDbConnected() {
  if (isConnected && mongoose.connection.readyState === 1) {
    return;
  }
  const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/ai-career-os';
  try {
    await mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
    });
    isConnected = true;
    console.log('✅ Vercel Serverless MongoDB Connected');
  } catch (err) {
    console.error('❌ Vercel Serverless MongoDB Connection Error:', err);
  }
}

export default async function handler(req: any, res: any) {
  await ensureDbConnected();
  return app(req, res);
}
