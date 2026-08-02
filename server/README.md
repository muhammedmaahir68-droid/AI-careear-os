# AI Career OS — API Server

Node/Express layer that sits next to Supabase. Supabase still handles auth, the
database, and storage — this server owns the content library (syllabus, study
materials, questions, companies) and any future custom logic (AI calls, etc.)
that shouldn't run with a public anon key.

## Setup

1. Run these in Supabase → SQL Editor, in order:
   - `ascend/content_library_setup.sql`
   - `ascend/search_setup.sql`
   - `ascend/assessment_engine_setup.sql`
2. `cd server && npm install`
3. Copy `.env.example` to `.env` and fill in your Supabase project URL and
   **service role key** (Project Settings → API → service_role — keep this
   secret, never put it in the frontend).
4. `npm run dev` — starts on port 4000.

## Seeding content

Each `seed_*.js` file seeds one branch/role with real, originally-written
topic notes and questions, sourced and attributed to MIT OpenCourseWare or
Wikipedia where relevant. Run them all at once:

```
node src/seed/run_all.js
```

Currently seeded: CSE (SDE, DevOps), ECE (Embedded, VLSI), IT (QA, Cloud
Support), AIML (ML Engineer, Data Scientist), EEE (Power Systems), MECH
(Design), AIDS (Data Engineer).

## API

- `GET /api/syllabus/:branchCode/:roleCode` — full topic tree for a role
- `GET /api/syllabus/topic/:topicId/materials` — notes for a topic
- `GET /api/syllabus/topic/:topicId/questions` — practice questions for a topic
- `GET /api/companies/:branchCode` — companies for a branch
- `GET /api/companies/detail/:companyId` — company detail + its questions
- `GET /api/search?q=recursion&type=all|topics|materials|questions` — full-text search
- `POST /api/tests/start` — start a timed test from a role/topic/company scope
- `POST /api/tests/:attemptId/answer` — record a self-graded answer
- `POST /api/tests/:attemptId/complete` — finalize and score an attempt
- `GET /api/tests/history/:userId` — a user's past test attempts

## Next steps to keep expanding

- Duplicate `seed_cse_sde.js` for every branch (IT, ECE, EEE, MECH, AIML,
  AIDS) and every role within each branch. Each seed file should credit its
  real sources (MIT OCW, Wikipedia, official docs) in the `source` /
  `source_url` / `license` columns — never leave content unattributed.
- Point the frontend's `SyllabusModule.tsx` and `Dashboard.tsx` at these API
  routes instead of the static `.ts` files in `src/data/`, once there's
  enough seeded content to replace them branch by branch.
