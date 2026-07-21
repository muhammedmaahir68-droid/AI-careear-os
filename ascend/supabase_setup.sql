-- ============================================================
-- AI Career OS — Supabase Database Setup
-- Run this entire file in Supabase → SQL Editor
-- ============================================================

-- 1. Profiles table (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL DEFAULT '',
  email TEXT NOT NULL DEFAULT '',
  xp INTEGER NOT NULL DEFAULT 0,
  streak INTEGER NOT NULL DEFAULT 0,
  level INTEGER NOT NULL DEFAULT 1,
  dream_company TEXT DEFAULT '',
  avatar_url TEXT DEFAULT '',
  completed_modules INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Daily progress table
CREATE TABLE IF NOT EXISTS daily_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  day INTEGER NOT NULL DEFAULT 1,
  completed_steps INTEGER[] DEFAULT '{}',
  score INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, day)
);

-- 3. Leaderboard table (real users only)
CREATE TABLE IF NOT EXISTS leaderboard (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT NOT NULL DEFAULT '',
  avatar_url TEXT DEFAULT '',
  weekly_xp INTEGER DEFAULT 0,
  total_xp INTEGER DEFAULT 0,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Chat history table
CREATE TABLE IF NOT EXISTS chat_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('user', 'ai')),
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- Row Level Security (RLS) — users can only see their own data
-- ============================================================

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE leaderboard ENABLE ROW LEVEL SECURITY;

-- Profiles: users can read/write their own
CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- Daily progress: own only
CREATE POLICY "Users can manage own progress" ON daily_progress FOR ALL USING (auth.uid() = user_id);

-- Chat history: own only
CREATE POLICY "Users can manage own chat" ON chat_history FOR ALL USING (auth.uid() = user_id);

-- Leaderboard: everyone can READ (it's public), users can write own row only
CREATE POLICY "Leaderboard is publicly readable" ON leaderboard FOR SELECT USING (true);
CREATE POLICY "Users can upsert own leaderboard" ON leaderboard FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own leaderboard" ON leaderboard FOR UPDATE USING (auth.uid() = user_id);

-- ============================================================
-- Realtime: Enable for leaderboard so UI updates live
-- ============================================================
ALTER PUBLICATION supabase_realtime ADD TABLE leaderboard;

-- ============================================================
-- Automatic User Profile & Leaderboard Entry Trigger
-- Runs automatically when a user signs up (Email or Google OAuth)
-- ============================================================

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  -- Insert into profiles
  INSERT INTO public.profiles (id, name, email, xp, streak, level, completed_modules)
  VALUES (
    new.id,
    COALESCE(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name', split_part(new.email, '@', 1)),
    new.email,
    0,
    0,
    1,
    0
  ) ON CONFLICT (id) DO NOTHING;

  -- Insert into leaderboard
  INSERT INTO public.leaderboard (user_id, display_name, total_xp)
  VALUES (
    new.id,
    COALESCE(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name', split_part(new.email, '@', 1)),
    0
  ) ON CONFLICT (user_id) DO NOTHING;

  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Bind the trigger
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
-- ============================================================
-- Core Learning Tables (Modules, Topics, Lessons, Content)
-- ============================================================

CREATE TABLE IF NOT EXISTS modules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  order_index INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS topics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  module_id UUID REFERENCES modules(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  order_index INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS lessons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  topic_id UUID REFERENCES topics(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content TEXT NOT NULL, -- markdown or HTML
  order_index INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS content_blocks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lesson_id UUID REFERENCES lessons(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('note','example','formula','animation','video')),
  payload JSONB NOT NULL,
  order_index INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- Question & Quiz Tables
-- ============================================================

CREATE TABLE IF NOT EXISTS questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  module_id UUID REFERENCES modules(id) ON DELETE SET NULL,
  topic_id UUID REFERENCES topics(id) ON DELETE SET NULL,
  difficulty TEXT CHECK (difficulty IN ('easy','medium','hard')),
  type TEXT CHECK (type IN ('multiple_choice','short_answer','coding')),
  content TEXT NOT NULL,
  answer TEXT NOT NULL,
  explanation TEXT,
  ai_explanation TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS quizzes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  module_id UUID REFERENCES modules(id) ON DELETE SET NULL,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS quiz_questions (
  quiz_id UUID REFERENCES quizzes(id) ON DELETE CASCADE,
  question_id UUID REFERENCES questions(id) ON DELETE CASCADE,
  "order" INTEGER NOT NULL,
  PRIMARY KEY (quiz_id, question_id)
);

CREATE TABLE IF NOT EXISTS quiz_attempts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  quiz_id UUID REFERENCES quizzes(id) ON DELETE CASCADE,
  score INTEGER NOT NULL,
  attempt_date TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- Progress & Daily Planner Tables
-- ============================================================

CREATE TABLE IF NOT EXISTS user_progress (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  xp INTEGER DEFAULT 0,
  streak INTEGER DEFAULT 0,
  last_active DATE,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS xp_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  amount INTEGER NOT NULL,
  reason TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS badges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  icon_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS user_badges (
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  badge_id UUID REFERENCES badges(id) ON DELETE CASCADE,
  earned_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (user_id, badge_id)
);

CREATE TABLE IF NOT EXISTS daily_tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  task_type TEXT CHECK (task_type IN ('learn','practice','quiz','coding','revision','interview')),
  title TEXT NOT NULL,
  completed BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- Resume Builder Table
-- ============================================================

CREATE TABLE IF NOT EXISTS resumes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  data JSONB NOT NULL, -- stores all sections as JSON
  ats_score INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS for the new tables (users can only access their own data)

ALTER TABLE modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE topics ENABLE ROW LEVEL SECURITY;
ALTER TABLE lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_blocks ENABLE ROW LEVEL SECURITY;
ALTER TABLE questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE quizzes ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE xp_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE resumes ENABLE ROW LEVEL SECURITY;

-- Policies – users can read/write their own records; public read for modules/topics/lessons

CREATE POLICY "Public read modules" ON modules FOR SELECT USING (true);
CREATE POLICY "Public read topics" ON topics FOR SELECT USING (true);
CREATE POLICY "Public read lessons" ON lessons FOR SELECT USING (true);
CREATE POLICY "Public read questions" ON questions FOR SELECT USING (true);
CREATE POLICY "Public read quizzes" ON quizzes FOR SELECT USING (true);

CREATE POLICY "User owns own progress" ON user_progress USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "User owns own xp_log" ON xp_log USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "User owns own badges" ON user_badges USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "User owns own daily_tasks" ON daily_tasks USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "User owns own resumes" ON resumes USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- End of core tables

-- ============================================================
-- Placement Readiness Tables
-- ============================================================

CREATE TABLE IF NOT EXISTS placement_checklist (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  item_id TEXT NOT NULL,
  completed BOOLEAN DEFAULT false,
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, item_id)
);

CREATE TABLE IF NOT EXISTS placement_readiness_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  score INTEGER NOT NULL,
  recommendation TEXT NOT NULL,
  calculated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE placement_checklist ENABLE ROW LEVEL SECURITY;
ALTER TABLE placement_readiness_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY "User owns own placement_checklist" ON placement_checklist USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "User owns own placement_readiness_history" ON placement_readiness_history USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- ============================================================
-- Community Hub Tables
-- ============================================================

CREATE TABLE IF NOT EXISTS study_groups (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  topic TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT NOT NULL,
  color TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS study_group_members (
  group_id UUID REFERENCES study_groups(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  joined_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (group_id, user_id)
);

CREATE TABLE IF NOT EXISTS community_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  speaker TEXT NOT NULL,
  type TEXT NOT NULL,
  event_time TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS event_rsvps (
  event_id UUID REFERENCES community_events(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  rsvp_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (event_id, user_id)
);

ALTER TABLE study_groups ENABLE ROW LEVEL SECURITY;
ALTER TABLE study_group_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE community_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_rsvps ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read study_groups" ON study_groups FOR SELECT USING (true);
CREATE POLICY "Public read community_events" ON community_events FOR SELECT USING (true);
CREATE POLICY "Public read study_group_members" ON study_group_members FOR SELECT USING (true);
CREATE POLICY "Public read event_rsvps" ON event_rsvps FOR SELECT USING (true);

CREATE POLICY "Users can join groups" ON study_group_members FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can RSVP to events" ON event_rsvps FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- Insert starter groups
INSERT INTO study_groups (name, topic, description, icon, color) VALUES
('FAANG Prep 2024', 'Data Structures & Algorithms', 'Daily LeetCode discussions and weekend mock interviews.', 'target', 'blue'),
('SQL Masters', 'Database Design', 'Mastering complex queries and system design concepts.', 'database', 'green'),
('Frontend Geniuses', 'React & Next.js', 'Building UI clones and discussing the latest React patterns.', 'layout', 'purple'),
('Aptitude Crackers', 'Quantitative', 'Solving speed math and logical reasoning puzzles.', 'calculator', 'orange')
ON CONFLICT DO NOTHING;

-- Insert starter events (set for upcoming days)
INSERT INTO community_events (title, speaker, type, event_time) VALUES
('Cracking the System Design Round', 'Sarah Jenkins (Ex-Meta)', 'Masterclass', NOW() + INTERVAL '1 day'),
('Resume Review Workshop', 'David Chen (Recruiter)', 'Workshop', NOW() + INTERVAL '3 days'),
('Mock Interview: React & JS', 'Peer to Peer', 'Practice Session', NOW() + INTERVAL '5 days')
ON CONFLICT DO NOTHING;
