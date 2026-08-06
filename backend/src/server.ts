import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';

import { errorHandler } from './middleware/errorHandler';
import authRoutes from './routes/auth';
import lessonRoutes from './routes/lessons';
import questionRoutes from './routes/questions';
import moduleRoutes from './routes/modules';
import progressRoutes from './routes/progress';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/ai-career-os';

app.use(helmet());
app.use(cors());
app.use(compression());
app.use(morgan('dev'));
app.use(express.json());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Too many requests, please try again later.'
});
app.use('/api/', limiter);

app.use('/api/auth', authRoutes);
app.use('/api/lessons', lessonRoutes);
app.use('/api/questions', questionRoutes);
app.use('/api/modules', moduleRoutes);
app.use('/api/progress', progressRoutes);

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', time: new Date() });
});

app.use(errorHandler);

const connectDB = async () => {
  let retries = 5;
  while (retries) {
    try {
      await mongoose.connect(MONGODB_URI);
      console.log('MongoDB Connected');
      break;
    } catch (err) {
      console.error('MongoDB connection error:', err);
      retries -= 1;
      console.log(`Retries left: ${retries}`);
      await new Promise(res => setTimeout(res, 5000));
    }
  }
};

const startServer = async () => {
  await connectDB();
  const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT} in ${process.env.NODE_ENV} mode`);
  });

  const gracefulShutdown = () => {
    console.log('Gracefully shutting down...');
    server.close(async () => {
      await mongoose.connection.close();
      console.log('Closed out remaining connections.');
      process.exit(0);
    });
  };

  process.on('SIGTERM', gracefulShutdown);
  process.on('SIGINT', gracefulShutdown);
};

if (require.main === module) {
  startServer();
}

export default app;
