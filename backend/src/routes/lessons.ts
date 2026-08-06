import { Router, Request, Response } from 'express';
import Lesson from '../models/Lesson';
import { authenticate, requireAdmin } from '../middleware/auth';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const { department, level, topic, difficulty, page = 1, limit = 10 } = req.query;
    const query: any = {};
    if (department) query.department = department;
    if (level) query.level = Number(level);
    if (topic) query.tags = { $in: [topic] };
    if (difficulty) query.difficulty = difficulty;

    const lessons = await Lesson.find(query)
      .limit(Number(limit))
      .skip((Number(page) - 1) * Number(limit));
    const total = await Lesson.countDocuments(query);
    
    res.json({ data: lessons, total, page: Number(page), limit: Number(limit) });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/search', async (req: Request, res: Response) => {
  try {
    const { q, page = 1, limit = 10 } = req.query;
    if (!q) {
      return res.status(400).json({ error: 'Search query required' });
    }
    const lessons = await Lesson.find({ $text: { $search: String(q) } })
      .limit(Number(limit))
      .skip((Number(page) - 1) * Number(limit));
    res.json({ data: lessons });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:id', async (req: Request, res: Response) => {
  try {
    const lesson = await Lesson.findById(req.params.id);
    if (!lesson) return res.status(404).json({ error: 'Lesson not found' });
    res.json(lesson);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', authenticate, requireAdmin, async (req: Request, res: Response) => {
  try {
    const newLesson = new Lesson(req.body);
    const saved = await newLesson.save();
    res.status(201).json(saved);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
