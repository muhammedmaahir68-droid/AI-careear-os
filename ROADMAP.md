# AI Career OS — Platform Vision & Roadmap

This is the long-term direction for the platform: an AI-first learning and
career operating system covering school through PhD, research, and lifelong
professional growth.

## Guiding principle

Build toward this vision in real, working increments — not placeholder
scaffolding. Every piece added should function end to end before the next
one starts.

## Copyright & content policy (non-negotiable)

- Never copy copyrighted books, lecture notes, or proprietary course content
  into the platform.
- Write original explanations, notes, quizzes, and summaries.
- Reference and link to official docs, open-licensed material (MIT OCW,
  Wikipedia), and research papers instead of reproducing them.
- Every content row carries `source`, `source_url`, and `license` — nothing
  goes in unattributed.
- Organize publicly available curriculum *structure* (semester plans, credit
  systems, topic sequencing) as inspiration — never copy an actual
  university's proprietary materials.

## Current state (as of this doc)

- Supabase: auth, profiles, leaderboard, daily progress
- Node/Express API layer (`server/`) alongside Supabase
- Content library schema: branches, roles, syllabus_topics (leveled,
  hierarchical), study_materials, questions, companies
- Seeded pilot content, real depth, attributed sources: CSE/SDE,
  ECE/Embedded, IT/QA, AIML/ML Engineer
- Company interview prep: CSE, IT, ECE, EEE, MECH, AIML, AIDS — each branch
  has its own company tracks (Google, Amazon, TCS, Zoho, Qualcomm, etc.)
- Global ErrorBoundary so runtime errors show a recoverable screen

## Build order (each phase is real, deployable work — not a checklist stub)

**Phase 1 — Content depth across all branches (in progress)**
Seed every branch × role with the same real-depth pattern used in the
pilot files. EEE, MECH, AIDS still need their first roles seeded; CSE/IT/
ECE/AIML need additional roles beyond the first one each.

**Phase 2 — Search**
Postgres full-text search (`tsvector`/`tsquery`) across syllabus_topics and
study_materials is the right starting point — it's already in Supabase,
handles tens of thousands of rows well, and needs no new infrastructure.
Elasticsearch/vector search only becomes justified once content volume and
query complexity actually require it — premature infra is a maintenance
cost, not a feature.

**Phase 3 — Assessment engine**
Timed tests, adaptive difficulty, and performance analytics built on the
`questions` table already in place.

**Phase 4 — AI features**
AI tutor, quiz generator, resume reviewer, syllabus planner — all route
through the Anthropic API. Needs a funded API key before this phase starts.

**Phase 5 — Scale infrastructure**
Redis caching, background workers, CDN, microservice boundaries — added
when real usage numbers justify them, not speculatively.

## What's deliberately not being attempted

- Reproducing copyrighted material at any scale, from any source
- Fabricated "millions of records" that aren't real, usable content
- Infrastructure (Elasticsearch, vector DBs, microservices) before there's
  enough real content and traffic to need it
