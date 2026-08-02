-- ============================================================
-- Full-text search for the content library.
-- Run after content_library_setup.sql.
-- Uses Postgres built-in tsvector search - no external search
-- infra needed at current content scale. See ROADMAP.md phase 2.
-- ============================================================

ALTER TABLE syllabus_topics ADD COLUMN IF NOT EXISTS search_vector tsvector
  GENERATED ALWAYS AS (
    setweight(to_tsvector('english', coalesce(title, '')), 'A') ||
    setweight(to_tsvector('english', coalesce(description, '')), 'B')
  ) STORED;

ALTER TABLE study_materials ADD COLUMN IF NOT EXISTS search_vector tsvector
  GENERATED ALWAYS AS (
    setweight(to_tsvector('english', coalesce(title, '')), 'A') ||
    setweight(to_tsvector('english', coalesce(content, '')), 'B')
  ) STORED;

ALTER TABLE questions ADD COLUMN IF NOT EXISTS search_vector tsvector
  GENERATED ALWAYS AS (
    to_tsvector('english', coalesce(question, ''))
  ) STORED;

CREATE INDEX IF NOT EXISTS idx_topics_search ON syllabus_topics USING GIN (search_vector);
CREATE INDEX IF NOT EXISTS idx_materials_search ON study_materials USING GIN (search_vector);
CREATE INDEX IF NOT EXISTS idx_questions_search ON questions USING GIN (search_vector);
