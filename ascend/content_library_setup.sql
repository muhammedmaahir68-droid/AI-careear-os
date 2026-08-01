-- ============================================================
-- AI Career OS — Content Library Setup
-- Run this in Supabase → SQL Editor, after supabase_setup.sql
-- Covers: branches, roles, syllabus, study materials, questions, companies
-- ============================================================

-- 1. Branches (CSE, IT, ECE, EEE, MECH, AIML, AIDS ...)
CREATE TABLE IF NOT EXISTS branches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code TEXT UNIQUE NOT NULL,          -- 'cse', 'it', 'ece' ...
  name TEXT NOT NULL,                 -- 'Computer Science Engineering'
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Roles within a branch (SDE, Backend, Frontend, Core, Data Engineer ...)
CREATE TABLE IF NOT EXISTS roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  branch_id UUID REFERENCES branches(id) ON DELETE CASCADE,
  code TEXT NOT NULL,                 -- 'sde', 'backend', 'core-electronics'
  name TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(branch_id, code)
);

-- 3. Syllabus topics — hierarchical, self-referencing for sub-topics
CREATE TABLE IF NOT EXISTS syllabus_topics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  role_id UUID REFERENCES roles(id) ON DELETE CASCADE,
  parent_id UUID REFERENCES syllabus_topics(id) ON DELETE CASCADE,
  level INTEGER NOT NULL DEFAULT 1,   -- roadmap level: 1=foundations ... N=advanced
  title TEXT NOT NULL,
  description TEXT DEFAULT '',
  source TEXT DEFAULT '',             -- e.g. 'MIT OCW 6.006', 'Wikipedia', 'Original'
  source_url TEXT DEFAULT '',
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Study materials attached to a topic
CREATE TABLE IF NOT EXISTS study_materials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  topic_id UUID REFERENCES syllabus_topics(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  format TEXT NOT NULL DEFAULT 'markdown',  -- 'markdown' | 'video' | 'link'
  source TEXT DEFAULT '',
  source_url TEXT DEFAULT '',
  license TEXT DEFAULT '',            -- 'CC-BY-SA', 'CC-BY-NC-SA', 'original'
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Companies (per branch)
CREATE TABLE IF NOT EXISTS companies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  branch_id UUID REFERENCES branches(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  logo TEXT DEFAULT '',
  difficulty TEXT DEFAULT 'Medium',
  avg_package TEXT DEFAULT '',
  rounds TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Questions — can belong to a topic OR a company (not both required)
CREATE TABLE IF NOT EXISTS questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  topic_id UUID REFERENCES syllabus_topics(id) ON DELETE CASCADE,
  company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
  question TEXT NOT NULL,
  answer TEXT DEFAULT '',
  difficulty TEXT DEFAULT 'Medium',
  source TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- RLS: content library is read-only public content.
-- Everyone can read. Only service role (backend) can write.
-- ============================================================

ALTER TABLE branches ENABLE ROW LEVEL SECURITY;
ALTER TABLE roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE syllabus_topics ENABLE ROW LEVEL SECURITY;
ALTER TABLE study_materials ENABLE ROW LEVEL SECURITY;
ALTER TABLE companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE questions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read branches" ON branches FOR SELECT USING (true);
CREATE POLICY "Public read roles" ON roles FOR SELECT USING (true);
CREATE POLICY "Public read syllabus_topics" ON syllabus_topics FOR SELECT USING (true);
CREATE POLICY "Public read study_materials" ON study_materials FOR SELECT USING (true);
CREATE POLICY "Public read companies" ON companies FOR SELECT USING (true);
CREATE POLICY "Public read questions" ON questions FOR SELECT USING (true);

-- No INSERT/UPDATE/DELETE policies for anon/authenticated — writes only
-- happen through the Node/Express backend using the service role key,
-- which bypasses RLS by design.

-- ============================================================
-- Indexes for the lookups the API actually does
-- ============================================================
CREATE INDEX IF NOT EXISTS idx_roles_branch ON roles(branch_id);
CREATE INDEX IF NOT EXISTS idx_topics_role ON syllabus_topics(role_id);
CREATE INDEX IF NOT EXISTS idx_topics_parent ON syllabus_topics(parent_id);
CREATE INDEX IF NOT EXISTS idx_materials_topic ON study_materials(topic_id);
CREATE INDEX IF NOT EXISTS idx_questions_topic ON questions(topic_id);
CREATE INDEX IF NOT EXISTS idx_questions_company ON questions(company_id);
CREATE INDEX IF NOT EXISTS idx_companies_branch ON companies(branch_id);
