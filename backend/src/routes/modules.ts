import { Router, Request, Response } from 'express';
import Module from '../models/Module';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const { department, level } = req.query;
    const query: any = { isPublished: true };
    if (department) query.department = department;
    if (level) query.level = Number(level);

    const modules = await Module.find(query).sort({ level: 1 });
    res.json(modules);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:id', async (req: Request, res: Response) => {
  try {
    const mod = await Module.findById(req.params.id)
      .populate('lessonIds')
      .populate('questionIds');
    if (!mod) return res.status(404).json({ error: 'Module not found' });
    res.json(mod);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
