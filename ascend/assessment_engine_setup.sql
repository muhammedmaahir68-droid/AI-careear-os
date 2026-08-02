-- ============================================================
-- Assessment engine: timed, self-graded tests built on the
-- existing questions table. Run after content_library_setup.sql.
-- ============================================================

CREATE TABLE IF NOT EXISTS test_attempts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  role_id UUID REFERENCES roles(id) ON DELETE SET NULL,
  topic_id UUID REFERENCES syllabus_topics(id) ON DELETE SET NULL,
  company_id UUID REFERENCES companies(id) ON DELETE SET NULL,
  question_count INTEGER NOT NULL,
  time_limit_seconds INTEGER NOT NULL DEFAULT 1800,
  started_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ,
  score INTEGER,
  status TEXT NOT NULL DEFAULT 'in_progress' -- 'in_progress' | 'completed' | 'abandoned'
);

CREATE TABLE IF NOT EXISTS test_answers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  attempt_id UUID REFERENCES test_attempts(id) ON DELETE CASCADE,
  question_id UUID REFERENCES questions(id) ON DELETE CASCADE,
  self_marked_correct BOOLEAN,   -- user reveals model answer, self-grades honestly
  time_spent_seconds INTEGER,
  answered_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE test_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE test_answers ENABLE ROW LEVEL SECURITY;

-- Users can only see and manage their own attempts/answers.
CREATE POLICY "Users manage own attempts" ON test_attempts
  FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users manage own answers" ON test_answers
  FOR ALL USING (
    EXISTS (SELECT 1 FROM test_attempts a WHERE a.id = attempt_id AND a.user_id = auth.uid())
  ) WITH CHECK (
    EXISTS (SELECT 1 FROM test_attempts a WHERE a.id = attempt_id AND a.user_id = auth.uid())
  );

CREATE INDEX IF NOT EXISTS idx_attempts_user ON test_attempts(user_id);
CREATE INDEX IF NOT EXISTS idx_answers_attempt ON test_answers(attempt_id);
