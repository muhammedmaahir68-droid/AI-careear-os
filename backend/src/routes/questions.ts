import { Router, Request, Response } from 'express';
import Question from '../models/Question';
import { authenticate, requireAdmin } from '../middleware/auth';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const { department, topic, difficulty, page = 1, limit = 10 } = req.query;
    const query: any = {};
    if (department) query.department = department;
    if (topic) query.topic = topic;
    if (difficulty) query.difficulty = difficulty;

    const questions = await Question.find(query)
      .limit(Number(limit))
      .skip((Number(page) - 1) * Number(limit));
    const total = await Question.countDocuments(query);
    
    res.json({ data: questions, total, page: Number(page), limit: Number(limit) });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/random', async (req: Request, res: Response) => {
  try {
    const { dept, count = 10 } = req.query;
    const query: any = {};
    if (dept) query.department = dept;
    
    const limit = Math.min(Number(count), 50);
    const questions = await Question.aggregate([
      { $match: query },
      { $sample: { size: limit } }
    ]);
    
    res.json(questions);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:id', async (req: Request, res: Response) => {
  try {
    const question = await Question.findById(req.params.id);
    if (!question) return res.status(404).json({ error: 'Question not found' });
    res.json(question);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', authenticate, requireAdmin, async (req: Request, res: Response) => {
  try {
    const newQuestion = new Question(req.body);
    const saved = await newQuestion.save();
    res.status(201).json(saved);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
