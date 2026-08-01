# AI Career OS architecture

The application is a React/Vite client backed by Supabase authentication,
Postgres, and Realtime. Learning content is organised as modules, topics, and
questions, with branch and role selection tailoring the curriculum.

## Content and assessment flow

1. Curated branch data provides the current learning experience.
2. Questions are stored in Supabase and marked `pending`, `approved`, or
   `rejected` before they can be selected for assessment.
3. The adaptive quiz service creates one 40-question set per learner per day.
   Weak topics receive more questions and difficulty follows saved mastery.
4. Each recorded answer updates the topic mastery and streak counters.

## Database additions

`supabase/migrations/20260801000000_adaptive_learning.sql` extends the
existing schema with `user_topic_mastery`, `daily_quiz_sets`, and
`daily_quiz_attempts`. These tables use row-level security so learners can only
access their own learning records.

## Question operations

Question generation and validation are offline operations; they should never
run in the browser or on a student request. `scripts/validate-questions.ts`
performs the structural quality gate using a server-only Supabase service key.
