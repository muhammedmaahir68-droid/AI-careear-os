import { Router, Request, Response } from 'express';
import UserProgress from '../models/UserProgress';
import User from '../models/User';
import { authenticate, AuthRequest } from '../middleware/auth';

const router = Router();

router.get('/:userId', authenticate, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (req.user?.id !== req.params.userId && req.user?.role !== 'admin') {
      res.status(403).json({ error: 'Forbidden' });
      return;
    }
    const progress = await UserProgress.find({ userId: req.params.userId })
      .populate('lessonId', 'title department')
      .populate('questionId', 'topic');
    res.json(progress);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', authenticate, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { lessonId, questionId, completed, score, xpEarned } = req.body;
    const userId = req.user?.id;
    
    let progress = await UserProgress.findOne({ userId, lessonId, questionId });
    if (!progress) {
      progress = new UserProgress({ userId, lessonId, questionId });
    }
    
    progress.completed = completed ?? progress.completed;
    if (score !== undefined) progress.score = Math.max(progress.score, score);
    
    if (xpEarned && !progress.completed) {
      progress.xpEarned += xpEarned;
      await User.findByIdAndUpdate(userId, { $inc: { xp: xpEarned } });
    }
    
    if (completed && !progress.completedAt) {
      progress.completedAt = new Date();
    }
    
    await progress.save();
    res.json(progress);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:userId/stats', authenticate, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (req.user?.id !== req.params.userId && req.user?.role !== 'admin') {
      res.status(403).json({ error: 'Forbidden' });
      return;
    }
    const user = await User.findById(req.params.userId).select('xp level streak diamonds badges');
    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }
    res.json(user);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
