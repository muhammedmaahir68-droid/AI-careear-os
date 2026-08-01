# AI Career OS

AI Career OS is a Vite + React placement-preparation platform. It includes
branch-specific content, daily challenges, company preparation, mock
interviews, community features, resume tools, and a Supabase backend.

## Development

```bash
npm install
npm run dev
```

## Adaptive learning

Apply `supabase/migrations/20260801000000_adaptive_learning.sql` in the
Supabase SQL editor before enabling adaptive daily quizzes. It creates one
stable daily quiz per learner and stores per-topic mastery.

Run the structural question quality check with:

```bash
npm run validate-questions
```
