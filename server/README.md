# AI Career OS — API Server

Node/Express layer that sits next to Supabase. Supabase still handles auth, the
database, and storage — this server owns the content library (syllabus, study
materials, questions, companies) and any future custom logic (AI calls, etc.)
that shouldn't run with a public anon key.

## Setup

1. Run `ascend/content_library_setup.sql` in Supabase → SQL Editor (after the
   existing `supabase_setup.sql`).
2. `cd server && npm install`
3. Copy `.env.example` to `.env` and fill in your Supabase project URL and
   **service role key** (Project Settings → API → service_role — keep this
   secret, never put it in the frontend).
4. `npm run dev` — starts on port 4000.

## Seeding content

`src/seed/seed_cse_sde.js` seeds one full role (CSE / SDE) with real,
originally-written topic notes and questions, sourced and attributed to
MIT OpenCourseWare where relevant. This is the pattern to copy for every
other branch/role — duplicate the file, swap the branch/role codes and
content, run it.

```
node src/seed/seed_cse_sde.js
```

## API

- `GET /api/syllabus/:branchCode/:roleCode` — full topic tree for a role
- `GET /api/syllabus/topic/:topicId/materials` — notes for a topic
- `GET /api/syllabus/topic/:topicId/questions` — practice questions for a topic
- `GET /api/companies/:branchCode` — companies for a branch
- `GET /api/companies/detail/:companyId` — company detail + its questions

## Next steps to keep expanding

- Duplicate `seed_cse_sde.js` for every branch (IT, ECE, EEE, MECH, AIML,
  AIDS) and every role within each branch. Each seed file should credit its
  real sources (MIT OCW, Wikipedia, official docs) in the `source` /
  `source_url` / `license` columns — never leave content unattributed.
- Point the frontend's `SyllabusModule.tsx` and `Dashboard.tsx` at these API
  routes instead of the static `.ts` files in `src/data/`, once there's
  enough seeded content to replace them branch by branch.
