ALTER TABLE study_groups ALTER COLUMN topic DROP NOT NULL;
ALTER TABLE study_groups ALTER COLUMN icon DROP NOT NULL;
ALTER TABLE study_groups ALTER COLUMN color DROP NOT NULL;
ALTER TABLE community_events ALTER COLUMN type DROP NOT NULL;
ALTER TABLE community_events ALTER COLUMN speaker DROP NOT NULL;
-- ============================================================
-- BRANCH-WISE SYLLABUS SYSTEM — additive migration
-- Safe to re-run (IF NOT EXISTS everywhere). Run AFTER the base
-- supabase_setup.sql that already has: profiles, modules,
-- quizzes, user_progress, xp_log, resumes, study_groups,
-- study_group_members, community_events, event_rsvps.
-- ============================================================

-- 1. BRANCHES ---------------------------------------------------
create table if not exists branches (
  id text primary key,             -- 'cse' | 'it' | 'aiml' | 'aids' | 'ece' | 'eee' | 'mech'
  name text not null,
  description text,
  icon text,                       -- lucide icon name for UI
  created_at timestamptz default now()
);

insert into branches (id, name, description, icon) values
  ('cse',  'Computer Science Engineering',        'Software development, systems, and core CS fundamentals', 'Code2'),
  ('it',   'Information Technology',               'Applied software, infra, QA, and IT systems', 'Server'),
  ('aiml', 'AI & Machine Learning',                 'ML systems, deep learning, NLP, computer vision', 'BrainCircuit'),
  ('aids', 'AI & Data Science',                     'Data analytics, data engineering, applied AI for business', 'Database'),
  ('ece',  'Electronics & Communication Engineering','Embedded systems, VLSI, signal processing, IoT, RF', 'CircuitBoard'),
  ('eee',  'Electrical & Electronics Engineering',  'Power systems, control systems, electrical design', 'Zap'),
  ('mech', 'Mechatronics Engineering',               'Robotics, automation, controls, industrial systems', 'Cog')
on conflict (id) do nothing;

-- 2. ROLES (job-role tracks within a branch) --------------------
create table if not exists roles (
  id text primary key,              -- e.g. 'aiml-ml-engineer'
  branch_id text not null references branches(id) on delete cascade,
  name text not null,
  description text,
  created_at timestamptz default now()
);
create index if not exists idx_roles_branch on roles(branch_id);

-- 3. SYLLABUS LEVELS + ITEMS (per role) --------------------------
create table if not exists syllabus_levels (
  id text primary key,              -- e.g. 'aiml-ml-engineer-l1'
  role_id text not null references roles(id) on delete cascade,
  level_number int not null,
  title text not null,
  description text,
  created_at timestamptz default now()
);
create index if not exists idx_levels_role on syllabus_levels(role_id);

create table if not exists syllabus_items (
  id text primary key,
  level_id text not null references syllabus_levels(id) on delete cascade,
  title text not null,
  item_type text not null default 'concept', -- 'concept' | 'checklist' | 'resource'
  order_index int default 0
);
create index if not exists idx_items_level on syllabus_items(level_id);

-- 4. CONCEPT CONTENT (lesson text per syllabus item) -------------
create table if not exists concept_contents (
  id uuid primary key default gen_random_uuid(),
  item_id text not null references syllabus_items(id) on delete cascade,
  content text not null,             -- markdown
  created_at timestamptz default now()
);

-- 5. HR / COMPANY-ORIENTED QUESTION BANK --------------------------
create table if not exists hr_questions (
  id uuid primary key default gen_random_uuid(),
  role_id text not null references roles(id) on delete cascade,
  category text not null,            -- 'technical' | 'hr_behavioral' | 'case_study' | 'coding'
  company_type text,                 -- 'product_based' | 'service_based' | 'startup' | 'core_company'
  question text not null,
  guidance text,                     -- how to structure the answer
  created_at timestamptz default now()
);
create index if not exists idx_hrq_role on hr_questions(role_id);

-- 6. MOCK INTERVIEW QUESTION BANK ---------------------------------
create table if not exists mock_interview_questions (
  id uuid primary key default gen_random_uuid(),
  role_id text not null references roles(id) on delete cascade,
  question text not null,
  ideal_answer_points text,          -- bullet points used by grading AI as rubric
  difficulty text default 'medium',  -- 'easy' | 'medium' | 'hard'
  created_at timestamptz default now()
);
create index if not exists idx_mock_role on mock_interview_questions(role_id);

-- 7. USER'S BRANCH/ROLE SELECTION ---------------------------------
create table if not exists user_role_selection (
  user_id uuid primary key references profiles(id) on delete cascade,
  branch_id text not null references branches(id),
  role_id text not null references roles(id),
  selected_at timestamptz default now()
);

-- 8. TAG existing groups/events by branch (nullable = open to all) -
alter table study_groups add column if not exists branch_id text references branches(id);
alter table community_events add column if not exists branch_id text references branches(id);
create index if not exists idx_groups_branch on study_groups(branch_id);
create index if not exists idx_events_branch on community_events(branch_id);

-- 9. RLS ------------------------------------------------------------
alter table branches enable row level security;
alter table roles enable row level security;
alter table syllabus_levels enable row level security;
alter table syllabus_items enable row level security;
alter table concept_contents enable row level security;
alter table hr_questions enable row level security;
alter table mock_interview_questions enable row level security;
alter table user_role_selection enable row level security;

-- reference/content tables: readable by any authenticated user
create policy "read branches" on branches for select using (true);
create policy "read roles" on roles for select using (true);
create policy "read levels" on syllabus_levels for select using (true);
create policy "read items" on syllabus_items for select using (true);
create policy "read content" on concept_contents for select using (true);
create policy "read hr_questions" on hr_questions for select using (true);
create policy "read mock_questions" on mock_interview_questions for select using (true);

-- user's own role selection
create policy "user manages own role selection"
  on user_role_selection for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);


-- NOTE: adjust `event_time` below to match whatever timestamp column
-- community_events already uses in your repo (e.g. `starts_at`) if different.

-- ============================================================
-- SEED DATA: branches + roles (all 7 branches) + full AIML content
-- Run AFTER supabase_branches_schema.sql
-- ============================================================

-- Roles for every branch
insert into roles (id, branch_id, name, description) values
  ('cse-sde', 'cse', 'Software Development Engineer (Product-based)', 'DSA-heavy, system design, product companies'),
  ('cse-backend', 'cse', 'Backend Engineer', 'APIs, databases, distributed systems'),
  ('cse-frontend', 'cse', 'Frontend Engineer', 'React/UI systems, performance, accessibility'),
  ('cse-fullstack', 'cse', 'Full Stack Developer', 'End-to-end app development'),
  ('cse-data-engineer', 'cse', 'Data Engineer', 'Pipelines, warehousing, big data tooling'),
  ('cse-devops', 'cse', 'DevOps / Cloud Engineer', 'CI/CD, infra-as-code, cloud platforms'),
  ('it-qa', 'it', 'Software Tester / QA Engineer', 'Manual + automation testing'),
  ('it-sysadmin', 'it', 'System Administrator', 'Networks, servers, IT infra'),
  ('it-cloud', 'it', 'Cloud Support Engineer', 'AWS/Azure/GCP operations'),
  ('it-fullstack', 'it', 'Full Stack Developer', 'IT-service-company style app dev'),
  ('it-dba', 'it', 'Database Administrator', 'SQL tuning, backups, database ops'),
  ('aiml-ml-engineer', 'aiml', 'Machine Learning Engineer', 'Model building + productionizing ML'),
  ('aiml-data-scientist', 'aiml', 'Data Scientist', 'Statistics, experimentation, insights'),
  ('aiml-dl-engineer', 'aiml', 'Deep Learning Engineer', 'Neural networks, CNNs/RNNs/transformers'),
  ('aiml-nlp-engineer', 'aiml', 'NLP Engineer', 'Text/LLM systems'),
  ('aiml-cv-engineer', 'aiml', 'Computer Vision Engineer', 'Image/video models'),
  ('aiml-mlops', 'aiml', 'MLOps Engineer', 'Model deployment, monitoring, pipelines'),
  ('aids-data-analyst', 'aids', 'Data Analyst', 'SQL, dashboards, business metrics'),
  ('aids-data-scientist', 'aids', 'Data Scientist', 'Predictive modeling for business'),
  ('aids-data-engineer', 'aids', 'Data Engineer', 'ETL pipelines, data platforms'),
  ('aids-bi-analyst', 'aids', 'Business Intelligence Analyst', 'Reporting, visualization'),
  ('aids-ai-product', 'aids', 'AI Product Analyst', 'AI feature scoping and evaluation'),
  ('ece-vlsi', 'ece', 'VLSI Design Engineer', 'Chip design, RTL, verification'),
  ('ece-embedded', 'ece', 'Embedded Systems Engineer', 'Firmware, microcontrollers, RTOS'),
  ('ece-signal', 'ece', 'Signal Processing Engineer', 'DSP, communications systems'),
  ('ece-iot', 'ece', 'IoT Engineer', 'Connected devices, sensor networks'),
  ('ece-rf', 'ece', 'RF Engineer', 'Antenna/RF circuit design'),
  ('eee-power', 'eee', 'Power Systems Engineer', 'Generation, transmission, distribution'),
  ('eee-control', 'eee', 'Control Systems Engineer', 'Feedback systems, PLC, automation'),
  ('eee-design', 'eee', 'Electrical Design Engineer', 'Circuit/panel design'),
  ('eee-renewable', 'eee', 'Renewable Energy Engineer', 'Solar/wind systems'),
  ('eee-automation', 'eee', 'Embedded/Automation Engineer', 'Industrial automation'),
  ('mech-robotics', 'mech', 'Robotics Engineer', 'Robot design, kinematics, control'),
  ('mech-automation', 'mech', 'Automation Engineer', 'Industrial automation, PLC/SCADA'),
  ('mech-control', 'mech', 'Control Systems Engineer', 'Sensors, actuators, feedback loops'),
  ('mech-cad', 'mech', 'CAD / Design Engineer', 'Mechanical design, simulation'),
  ('mech-iiot', 'mech', 'Industrial IoT Engineer', 'Smart factory, sensor integration')
on conflict (id) do nothing;
-- ============================================================
-- SEED DATA: AIML branch — full syllabus, HR questions, mock
-- interview bank, groups & events. Run AFTER seed_roles.sql
-- ============================================================

insert into syllabus_levels (id, role_id, level_number, title, description) values ('aiml-ml-engineer-l1', 'aiml-ml-engineer', 1, 'Python & Math Foundations', 'Core language + linear algebra/statistics for ML') on conflict (id) do nothing;
insert into syllabus_items (id, level_id, title, item_type, order_index) values ('aiml-ml-engineer-l1-i1', 'aiml-ml-engineer-l1', 'NumPy, Pandas, Matplotlib fluency', 'checklist', 0) on conflict (id) do nothing;
insert into syllabus_items (id, level_id, title, item_type, order_index) values ('aiml-ml-engineer-l1-i2', 'aiml-ml-engineer-l1', 'Linear algebra: vectors, matrices, eigenvalues', 'concept', 1) on conflict (id) do nothing;
insert into syllabus_items (id, level_id, title, item_type, order_index) values ('aiml-ml-engineer-l1-i3', 'aiml-ml-engineer-l1', 'Probability & statistics for ML', 'concept', 2) on conflict (id) do nothing;
insert into syllabus_items (id, level_id, title, item_type, order_index) values ('aiml-ml-engineer-l1-i4', 'aiml-ml-engineer-l1', 'Calculus: gradients, partial derivatives', 'concept', 3) on conflict (id) do nothing;
insert into syllabus_levels (id, role_id, level_number, title, description) values ('aiml-ml-engineer-l2', 'aiml-ml-engineer', 2, 'Classical Machine Learning', 'Supervised and unsupervised algorithms') on conflict (id) do nothing;
insert into syllabus_items (id, level_id, title, item_type, order_index) values ('aiml-ml-engineer-l2-i1', 'aiml-ml-engineer-l2', 'Regression: linear, logistic, regularization', 'concept', 0) on conflict (id) do nothing;
insert into syllabus_items (id, level_id, title, item_type, order_index) values ('aiml-ml-engineer-l2-i2', 'aiml-ml-engineer-l2', 'Tree-based models: decision trees, random forest, XGBoost', 'concept', 1) on conflict (id) do nothing;
insert into syllabus_items (id, level_id, title, item_type, order_index) values ('aiml-ml-engineer-l2-i3', 'aiml-ml-engineer-l2', 'Clustering: k-means, DBSCAN, hierarchical', 'concept', 2) on conflict (id) do nothing;
insert into syllabus_items (id, level_id, title, item_type, order_index) values ('aiml-ml-engineer-l2-i4', 'aiml-ml-engineer-l2', 'Bias-variance tradeoff, cross-validation', 'concept', 3) on conflict (id) do nothing;
insert into syllabus_items (id, level_id, title, item_type, order_index) values ('aiml-ml-engineer-l2-i5', 'aiml-ml-engineer-l2', 'Build 3 end-to-end ML projects (Kaggle-style)', 'checklist', 4) on conflict (id) do nothing;
insert into syllabus_levels (id, role_id, level_number, title, description) values ('aiml-ml-engineer-l3', 'aiml-ml-engineer', 3, 'Deep Learning Basics', 'Neural network fundamentals') on conflict (id) do nothing;
insert into syllabus_items (id, level_id, title, item_type, order_index) values ('aiml-ml-engineer-l3-i1', 'aiml-ml-engineer-l3', 'Feedforward networks, backpropagation', 'concept', 0) on conflict (id) do nothing;
insert into syllabus_items (id, level_id, title, item_type, order_index) values ('aiml-ml-engineer-l3-i2', 'aiml-ml-engineer-l3', 'Activation functions, optimizers (Adam, SGD)', 'concept', 1) on conflict (id) do nothing;
insert into syllabus_items (id, level_id, title, item_type, order_index) values ('aiml-ml-engineer-l3-i3', 'aiml-ml-engineer-l3', 'PyTorch or TensorFlow fluency', 'checklist', 2) on conflict (id) do nothing;
insert into syllabus_items (id, level_id, title, item_type, order_index) values ('aiml-ml-engineer-l3-i4', 'aiml-ml-engineer-l3', 'CNNs for vision, RNNs/LSTMs for sequences', 'concept', 3) on conflict (id) do nothing;
insert into syllabus_levels (id, role_id, level_number, title, description) values ('aiml-ml-engineer-l4', 'aiml-ml-engineer', 4, 'MLOps & Deployment', 'Taking models to production') on conflict (id) do nothing;
insert into syllabus_items (id, level_id, title, item_type, order_index) values ('aiml-ml-engineer-l4-i1', 'aiml-ml-engineer-l4', 'Model serving: Flask/FastAPI, Docker', 'checklist', 0) on conflict (id) do nothing;
insert into syllabus_items (id, level_id, title, item_type, order_index) values ('aiml-ml-engineer-l4-i2', 'aiml-ml-engineer-l4', 'Experiment tracking (MLflow/W&B)', 'concept', 1) on conflict (id) do nothing;
insert into syllabus_items (id, level_id, title, item_type, order_index) values ('aiml-ml-engineer-l4-i3', 'aiml-ml-engineer-l4', 'Model monitoring & drift detection', 'concept', 2) on conflict (id) do nothing;
insert into syllabus_items (id, level_id, title, item_type, order_index) values ('aiml-ml-engineer-l4-i4', 'aiml-ml-engineer-l4', 'CI/CD for ML pipelines', 'concept', 3) on conflict (id) do nothing;
insert into syllabus_levels (id, role_id, level_number, title, description) values ('aiml-ml-engineer-l5', 'aiml-ml-engineer', 5, 'Placement Ready', 'Interview prep and readiness') on conflict (id) do nothing;
insert into syllabus_items (id, level_id, title, item_type, order_index) values ('aiml-ml-engineer-l5-i1', 'aiml-ml-engineer-l5', 'Solve 50 DSA problems (arrays, trees, graphs)', 'checklist', 0) on conflict (id) do nothing;
insert into syllabus_items (id, level_id, title, item_type, order_index) values ('aiml-ml-engineer-l5-i2', 'aiml-ml-engineer-l5', '2 ML system design case studies', 'checklist', 1) on conflict (id) do nothing;
insert into syllabus_items (id, level_id, title, item_type, order_index) values ('aiml-ml-engineer-l5-i3', 'aiml-ml-engineer-l5', 'Mock interview: 3 technical + 1 HR round', 'checklist', 2) on conflict (id) do nothing;
insert into syllabus_items (id, level_id, title, item_type, order_index) values ('aiml-ml-engineer-l5-i4', 'aiml-ml-engineer-l5', 'Portfolio: 2 deployed ML projects with README', 'checklist', 3) on conflict (id) do nothing;
insert into syllabus_items (id, level_id, title, item_type, order_index) values ('aiml-ml-engineer-l5-i5', 'aiml-ml-engineer-l5', 'Get your Placement Readiness Score from AI', 'checklist', 4) on conflict (id) do nothing;
insert into syllabus_levels (id, role_id, level_number, title, description) values ('aiml-data-scientist-l1', 'aiml-data-scientist', 1, 'Statistics & Python', 'Foundations for data science') on conflict (id) do nothing;
insert into syllabus_items (id, level_id, title, item_type, order_index) values ('aiml-data-scientist-l1-i1', 'aiml-data-scientist-l1', 'Descriptive & inferential statistics', 'concept', 0) on conflict (id) do nothing;
insert into syllabus_items (id, level_id, title, item_type, order_index) values ('aiml-data-scientist-l1-i2', 'aiml-data-scientist-l1', 'Hypothesis testing, A/B testing', 'concept', 1) on conflict (id) do nothing;
insert into syllabus_items (id, level_id, title, item_type, order_index) values ('aiml-data-scientist-l1-i3', 'aiml-data-scientist-l1', 'Pandas/SQL for data wrangling', 'checklist', 2) on conflict (id) do nothing;
insert into syllabus_levels (id, role_id, level_number, title, description) values ('aiml-data-scientist-l2', 'aiml-data-scientist', 2, 'Modeling & Experimentation', 'Building predictive models') on conflict (id) do nothing;
insert into syllabus_items (id, level_id, title, item_type, order_index) values ('aiml-data-scientist-l2-i1', 'aiml-data-scientist-l2', 'Regression & classification modeling', 'concept', 0) on conflict (id) do nothing;
insert into syllabus_items (id, level_id, title, item_type, order_index) values ('aiml-data-scientist-l2-i2', 'aiml-data-scientist-l2', 'Feature engineering & selection', 'concept', 1) on conflict (id) do nothing;
insert into syllabus_items (id, level_id, title, item_type, order_index) values ('aiml-data-scientist-l2-i3', 'aiml-data-scientist-l2', 'Experiment design and causal inference basics', 'concept', 2) on conflict (id) do nothing;
insert into syllabus_levels (id, role_id, level_number, title, description) values ('aiml-data-scientist-l3', 'aiml-data-scientist', 3, 'Visualization & Storytelling', 'Communicating insights') on conflict (id) do nothing;
insert into syllabus_items (id, level_id, title, item_type, order_index) values ('aiml-data-scientist-l3-i1', 'aiml-data-scientist-l3', 'Matplotlib/Seaborn/Tableau/PowerBI', 'checklist', 0) on conflict (id) do nothing;
insert into syllabus_items (id, level_id, title, item_type, order_index) values ('aiml-data-scientist-l3-i2', 'aiml-data-scientist-l3', 'Build a stakeholder-facing dashboard', 'checklist', 1) on conflict (id) do nothing;
insert into syllabus_levels (id, role_id, level_number, title, description) values ('aiml-data-scientist-l4', 'aiml-data-scientist', 4, 'Advanced Topics', 'Scaling data science work') on conflict (id) do nothing;
insert into syllabus_items (id, level_id, title, item_type, order_index) values ('aiml-data-scientist-l4-i1', 'aiml-data-scientist-l4', 'Time series forecasting', 'concept', 0) on conflict (id) do nothing;
insert into syllabus_items (id, level_id, title, item_type, order_index) values ('aiml-data-scientist-l4-i2', 'aiml-data-scientist-l4', 'Recommendation systems basics', 'concept', 1) on conflict (id) do nothing;
insert into syllabus_levels (id, role_id, level_number, title, description) values ('aiml-data-scientist-l5', 'aiml-data-scientist', 5, 'Placement Ready', 'Interview prep and readiness') on conflict (id) do nothing;
insert into syllabus_items (id, level_id, title, item_type, order_index) values ('aiml-data-scientist-l5-i1', 'aiml-data-scientist-l5', 'SQL interview problem set (30 queries)', 'checklist', 0) on conflict (id) do nothing;
insert into syllabus_items (id, level_id, title, item_type, order_index) values ('aiml-data-scientist-l5-i2', 'aiml-data-scientist-l5', '2 case-study style mock interviews', 'checklist', 1) on conflict (id) do nothing;
insert into syllabus_items (id, level_id, title, item_type, order_index) values ('aiml-data-scientist-l5-i3', 'aiml-data-scientist-l5', 'Portfolio: 2 end-to-end DS case studies', 'checklist', 2) on conflict (id) do nothing;
insert into syllabus_items (id, level_id, title, item_type, order_index) values ('aiml-data-scientist-l5-i4', 'aiml-data-scientist-l5', 'Get your Placement Readiness Score from AI', 'checklist', 3) on conflict (id) do nothing;
insert into syllabus_levels (id, role_id, level_number, title, description) values ('aiml-dl-engineer-l1', 'aiml-dl-engineer', 1, 'Neural Network Foundations', 'Core deep learning theory') on conflict (id) do nothing;
insert into syllabus_items (id, level_id, title, item_type, order_index) values ('aiml-dl-engineer-l1-i1', 'aiml-dl-engineer-l1', 'Backpropagation math from scratch', 'concept', 0) on conflict (id) do nothing;
insert into syllabus_items (id, level_id, title, item_type, order_index) values ('aiml-dl-engineer-l1-i2', 'aiml-dl-engineer-l1', 'Loss functions & optimization landscape', 'concept', 1) on conflict (id) do nothing;
insert into syllabus_levels (id, role_id, level_number, title, description) values ('aiml-dl-engineer-l2', 'aiml-dl-engineer', 2, 'Architectures', 'Modern deep learning architectures') on conflict (id) do nothing;
insert into syllabus_items (id, level_id, title, item_type, order_index) values ('aiml-dl-engineer-l2-i1', 'aiml-dl-engineer-l2', 'CNNs (ResNet, EfficientNet)', 'concept', 0) on conflict (id) do nothing;
insert into syllabus_items (id, level_id, title, item_type, order_index) values ('aiml-dl-engineer-l2-i2', 'aiml-dl-engineer-l2', 'RNN/LSTM/GRU sequence models', 'concept', 1) on conflict (id) do nothing;
insert into syllabus_items (id, level_id, title, item_type, order_index) values ('aiml-dl-engineer-l2-i3', 'aiml-dl-engineer-l2', 'Transformers & attention mechanism', 'concept', 2) on conflict (id) do nothing;
insert into syllabus_levels (id, role_id, level_number, title, description) values ('aiml-dl-engineer-l3', 'aiml-dl-engineer', 3, 'Training at Scale', 'Practical deep learning engineering') on conflict (id) do nothing;
insert into syllabus_items (id, level_id, title, item_type, order_index) values ('aiml-dl-engineer-l3-i1', 'aiml-dl-engineer-l3', 'GPU training, mixed precision', 'checklist', 0) on conflict (id) do nothing;
insert into syllabus_items (id, level_id, title, item_type, order_index) values ('aiml-dl-engineer-l3-i2', 'aiml-dl-engineer-l3', 'Regularization: dropout, batch norm, augmentation', 'concept', 1) on conflict (id) do nothing;
insert into syllabus_levels (id, role_id, level_number, title, description) values ('aiml-dl-engineer-l4', 'aiml-dl-engineer', 4, 'Placement Ready', 'Interview prep and readiness') on conflict (id) do nothing;
insert into syllabus_items (id, level_id, title, item_type, order_index) values ('aiml-dl-engineer-l4-i1', 'aiml-dl-engineer-l4', 'Reproduce 2 papers from scratch', 'checklist', 0) on conflict (id) do nothing;
insert into syllabus_items (id, level_id, title, item_type, order_index) values ('aiml-dl-engineer-l4-i2', 'aiml-dl-engineer-l4', 'Mock interview: architecture design round', 'checklist', 1) on conflict (id) do nothing;
insert into syllabus_items (id, level_id, title, item_type, order_index) values ('aiml-dl-engineer-l4-i3', 'aiml-dl-engineer-l4', 'Get your Placement Readiness Score from AI', 'checklist', 2) on conflict (id) do nothing;
insert into syllabus_levels (id, role_id, level_number, title, description) values ('aiml-nlp-engineer-l1', 'aiml-nlp-engineer', 1, 'NLP Foundations', 'Text processing fundamentals') on conflict (id) do nothing;
insert into syllabus_items (id, level_id, title, item_type, order_index) values ('aiml-nlp-engineer-l1-i1', 'aiml-nlp-engineer-l1', 'Tokenization, embeddings (Word2Vec, GloVe)', 'concept', 0) on conflict (id) do nothing;
insert into syllabus_items (id, level_id, title, item_type, order_index) values ('aiml-nlp-engineer-l1-i2', 'aiml-nlp-engineer-l1', 'Classical NLP: TF-IDF, n-grams, POS tagging', 'concept', 1) on conflict (id) do nothing;
insert into syllabus_levels (id, role_id, level_number, title, description) values ('aiml-nlp-engineer-l2', 'aiml-nlp-engineer', 2, 'Modern NLP & LLMs', 'Transformer-based systems') on conflict (id) do nothing;
insert into syllabus_items (id, level_id, title, item_type, order_index) values ('aiml-nlp-engineer-l2-i1', 'aiml-nlp-engineer-l2', 'Transformer architecture deep dive', 'concept', 0) on conflict (id) do nothing;
insert into syllabus_items (id, level_id, title, item_type, order_index) values ('aiml-nlp-engineer-l2-i2', 'aiml-nlp-engineer-l2', 'Fine-tuning pretrained models (BERT/GPT-style)', 'checklist', 1) on conflict (id) do nothing;
insert into syllabus_items (id, level_id, title, item_type, order_index) values ('aiml-nlp-engineer-l2-i3', 'aiml-nlp-engineer-l2', 'RAG (retrieval-augmented generation) basics', 'concept', 2) on conflict (id) do nothing;
insert into syllabus_items (id, level_id, title, item_type, order_index) values ('aiml-nlp-engineer-l2-i4', 'aiml-nlp-engineer-l2', 'Prompt engineering fundamentals', 'concept', 3) on conflict (id) do nothing;
insert into syllabus_levels (id, role_id, level_number, title, description) values ('aiml-nlp-engineer-l3', 'aiml-nlp-engineer', 3, 'Placement Ready', 'Interview prep and readiness') on conflict (id) do nothing;
insert into syllabus_items (id, level_id, title, item_type, order_index) values ('aiml-nlp-engineer-l3-i1', 'aiml-nlp-engineer-l3', 'Build 1 RAG/chatbot project end-to-end', 'checklist', 0) on conflict (id) do nothing;
insert into syllabus_items (id, level_id, title, item_type, order_index) values ('aiml-nlp-engineer-l3-i2', 'aiml-nlp-engineer-l3', 'Mock interview: NLP system design', 'checklist', 1) on conflict (id) do nothing;
insert into syllabus_items (id, level_id, title, item_type, order_index) values ('aiml-nlp-engineer-l3-i3', 'aiml-nlp-engineer-l3', 'Get your Placement Readiness Score from AI', 'checklist', 2) on conflict (id) do nothing;
insert into syllabus_levels (id, role_id, level_number, title, description) values ('aiml-cv-engineer-l1', 'aiml-cv-engineer', 1, 'Vision Foundations', 'Image processing basics') on conflict (id) do nothing;
insert into syllabus_items (id, level_id, title, item_type, order_index) values ('aiml-cv-engineer-l1-i1', 'aiml-cv-engineer-l1', 'OpenCV: filtering, edge detection, transforms', 'checklist', 0) on conflict (id) do nothing;
insert into syllabus_items (id, level_id, title, item_type, order_index) values ('aiml-cv-engineer-l1-i2', 'aiml-cv-engineer-l1', 'Image classification with CNNs', 'concept', 1) on conflict (id) do nothing;
insert into syllabus_levels (id, role_id, level_number, title, description) values ('aiml-cv-engineer-l2', 'aiml-cv-engineer', 2, 'Advanced CV', 'Detection and segmentation') on conflict (id) do nothing;
insert into syllabus_items (id, level_id, title, item_type, order_index) values ('aiml-cv-engineer-l2-i1', 'aiml-cv-engineer-l2', 'Object detection (YOLO, Faster R-CNN)', 'concept', 0) on conflict (id) do nothing;
insert into syllabus_items (id, level_id, title, item_type, order_index) values ('aiml-cv-engineer-l2-i2', 'aiml-cv-engineer-l2', 'Semantic/instance segmentation', 'concept', 1) on conflict (id) do nothing;
insert into syllabus_levels (id, role_id, level_number, title, description) values ('aiml-cv-engineer-l3', 'aiml-cv-engineer', 3, 'Placement Ready', 'Interview prep and readiness') on conflict (id) do nothing;
insert into syllabus_items (id, level_id, title, item_type, order_index) values ('aiml-cv-engineer-l3-i1', 'aiml-cv-engineer-l3', 'Build 1 real-time detection app', 'checklist', 0) on conflict (id) do nothing;
insert into syllabus_items (id, level_id, title, item_type, order_index) values ('aiml-cv-engineer-l3-i2', 'aiml-cv-engineer-l3', 'Get your Placement Readiness Score from AI', 'checklist', 1) on conflict (id) do nothing;
insert into syllabus_levels (id, role_id, level_number, title, description) values ('aiml-mlops-l1', 'aiml-mlops', 1, 'Infra Foundations', 'Cloud and containers') on conflict (id) do nothing;
insert into syllabus_items (id, level_id, title, item_type, order_index) values ('aiml-mlops-l1-i1', 'aiml-mlops-l1', 'Docker & Kubernetes basics', 'checklist', 0) on conflict (id) do nothing;
insert into syllabus_items (id, level_id, title, item_type, order_index) values ('aiml-mlops-l1-i2', 'aiml-mlops-l1', 'Cloud ML platforms (SageMaker/Vertex AI)', 'concept', 1) on conflict (id) do nothing;
insert into syllabus_levels (id, role_id, level_number, title, description) values ('aiml-mlops-l2', 'aiml-mlops', 2, 'ML Pipelines', 'Automating the ML lifecycle') on conflict (id) do nothing;
insert into syllabus_items (id, level_id, title, item_type, order_index) values ('aiml-mlops-l2-i1', 'aiml-mlops-l2', 'CI/CD for models, feature stores', 'concept', 0) on conflict (id) do nothing;
insert into syllabus_items (id, level_id, title, item_type, order_index) values ('aiml-mlops-l2-i2', 'aiml-mlops-l2', 'Monitoring, drift detection, retraining triggers', 'concept', 1) on conflict (id) do nothing;
insert into syllabus_levels (id, role_id, level_number, title, description) values ('aiml-mlops-l3', 'aiml-mlops', 3, 'Placement Ready', 'Interview prep and readiness') on conflict (id) do nothing;
insert into syllabus_items (id, level_id, title, item_type, order_index) values ('aiml-mlops-l3-i1', 'aiml-mlops-l3', 'Deploy 1 full ML pipeline end-to-end', 'checklist', 0) on conflict (id) do nothing;
insert into syllabus_items (id, level_id, title, item_type, order_index) values ('aiml-mlops-l3-i2', 'aiml-mlops-l3', 'Get your Placement Readiness Score from AI', 'checklist', 1) on conflict (id) do nothing;

insert into hr_questions (role_id, category, company_type, question, guidance) values
  ('aiml-ml-engineer', 'technical', 'product_based', 'Explain the bias-variance tradeoff and how you''d diagnose which one is hurting your model.', 'Define both terms, tie to learning curves, mention fixes (more data/regularization vs more complex model).'),
  ('aiml-ml-engineer', 'case_study', 'product_based', 'Walk me through how you''d build a recommendation system for an e-commerce app.', 'Cover data collection, collaborative vs content-based filtering, cold-start problem, evaluation metrics.'),
  ('aiml-ml-engineer', 'technical', 'product_based', 'How does gradient descent differ from stochastic gradient descent and Adam?', 'Explain batch size tradeoffs, momentum, adaptive learning rates.'),
  ('aiml-ml-engineer', 'case_study', 'startup', 'A model performs well in training but poorly in production — how do you debug it?', 'Check data drift, train/serve skew, feature leakage, distribution shift.'),
  ('aiml-ml-engineer', 'hr_behavioral', 'product_based', 'Tell me about a time you had to explain a technical ML result to a non-technical stakeholder.', 'Use STAR format; emphasize simplifying without losing accuracy.'),
  ('aiml-ml-engineer', 'hr_behavioral', 'service_based', 'Why do you want to work in machine learning specifically, not general software engineering?', 'Connect to genuine interest and a specific project/experience, not generic enthusiasm.'),
  ('aiml-ml-engineer', 'technical', 'service_based', 'Explain overfitting and three concrete techniques to reduce it.', 'Regularization, dropout, early stopping, more data, cross-validation.'),
  ('aiml-ml-engineer', 'case_study', 'product_based', 'Design an ML system to detect fraudulent transactions in real time.', 'Discuss class imbalance, latency constraints, feature engineering, precision/recall tradeoff.'),
  ('aiml-ml-engineer', 'technical', 'service_based', 'What''s the difference between bagging and boosting?', 'Parallel vs sequential ensemble, variance vs bias reduction, examples (Random Forest vs XGBoost).'),
  ('aiml-ml-engineer', 'hr_behavioral', 'startup', 'Describe a project where your model didn''t work as expected — what did you do?', 'Show debugging process and what you learned, not just the fix.'),
  ('aiml-data-scientist', 'case_study', 'product_based', 'How would you design an A/B test to measure the impact of a new feature?', 'Cover hypothesis, sample size, randomization, guardrail metrics, statistical significance.'),
  ('aiml-data-scientist', 'coding', 'product_based', 'Write a SQL query to find the second-highest salary in each department.', 'Use window functions (DENSE_RANK) or correlated subquery; discuss edge cases.'),
  ('aiml-data-scientist', 'technical', 'product_based', 'Explain p-value and common misinterpretations of it.', 'P-value is not probability the null is true; tie to significance threshold and Type I error.'),
  ('aiml-data-scientist', 'technical', 'service_based', 'How do you handle missing data in a dataset?', 'Discuss MCAR/MAR/MNAR, imputation strategies, and when to drop vs impute.'),
  ('aiml-data-scientist', 'hr_behavioral', 'startup', 'Tell me about a data project where your analysis changed a business decision.', 'Quantify the impact; show the chain from insight to decision.'),
  ('aiml-data-scientist', 'case_study', 'product_based', 'How would you detect if a metric''s drop is due to seasonality vs a real issue?', 'Compare year-over-year trends, decompose time series, check for confounders.'),
  ('aiml-data-scientist', 'technical', 'service_based', 'What''s the difference between correlation and causation, with an example?', 'Use a concrete example and mention confounders.'),
  ('aiml-data-scientist', 'hr_behavioral', 'startup', 'How do you prioritize which analysis to work on when everything seems urgent?', 'Discuss impact vs effort framework and stakeholder alignment.'),
  ('aiml-dl-engineer', 'technical', 'product_based', 'Explain the vanishing gradient problem and how architectures like LSTM or ResNet address it.', 'Gate mechanisms for LSTM, skip connections for ResNet.'),
  ('aiml-dl-engineer', 'case_study', 'core_company', 'Design a system to classify manufacturing defects from images with limited labeled data.', 'Discuss transfer learning, data augmentation, active learning.'),
  ('aiml-dl-engineer', 'technical', 'product_based', 'Why does batch normalization help training?', 'Reduces internal covariate shift, allows higher learning rates, has a regularizing effect.'),
  ('aiml-dl-engineer', 'hr_behavioral', 'startup', 'Walk me through a research paper you implemented from scratch.', 'Explain the problem, your implementation choices, and results vs the paper.'),
  ('aiml-nlp-engineer', 'technical', 'product_based', 'Explain how attention mechanisms work in transformers.', 'Query/key/value intuition, why it beats fixed-length RNN context.'),
  ('aiml-nlp-engineer', 'case_study', 'startup', 'How would you build a customer-support chatbot grounded in company documents?', 'Cover RAG pipeline: embedding, vector store, retrieval, prompt construction, evaluation.'),
  ('aiml-nlp-engineer', 'technical', 'product_based', 'What''s the difference between fine-tuning and prompt engineering — when would you use each?', 'Cost, data requirements, latency, and use-case fit.'),
  ('aiml-nlp-engineer', 'technical', 'product_based', 'How do you evaluate a generative model''s output quality?', 'BLEU/ROUGE limitations, human eval, task-specific metrics, hallucination checks.'),
  ('aiml-cv-engineer', 'technical', 'core_company', 'Explain the difference between object detection, segmentation, and classification.', 'Define each task and give a use case for each.'),
  ('aiml-cv-engineer', 'case_study', 'core_company', 'Design a defect-detection system for a production line camera feed.', 'Cover real-time constraints, model choice, false-positive cost.'),
  ('aiml-cv-engineer', 'technical', 'product_based', 'How does non-max suppression work in object detection?', 'Explain IoU thresholding and why it''s needed to remove duplicate boxes.'),
  ('aiml-mlops', 'case_study', 'product_based', 'How would you design a CI/CD pipeline for ML models?', 'Cover versioning (data + model), automated testing, staged rollout, rollback.'),
  ('aiml-mlops', 'technical', 'product_based', 'What is model drift, and how do you detect it in production?', 'Distinguish data drift vs concept drift; mention monitoring tools and statistical tests.'),
  ('aiml-mlops', 'hr_behavioral', 'startup', 'Tell me about a time a production model failed — what was your response process?', 'Focus on incident response and prevention, not just the fix.');

insert into mock_interview_questions (role_id, question, ideal_answer_points, difficulty) values
  ('aiml-ml-engineer', 'What is regularization and why do we need it?', 'Penalizes large weights; reduces overfitting; mentions L1 (sparsity) vs L2 (shrinkage).', 'easy'),
  ('aiml-ml-engineer', 'Explain the difference between precision and recall, and when you''d optimize for each.', 'Precision = TP/(TP+FP); recall = TP/(TP+FN); precision matters when false positives are costly, recall when false negatives are costly.', 'medium'),
  ('aiml-ml-engineer', 'How would you handle a severely imbalanced dataset (99% vs 1%)?', 'Resampling (SMOTE/undersampling), class weights, appropriate metrics (F1/AUC not accuracy).', 'medium'),
  ('aiml-ml-engineer', 'Design a scalable pipeline to serve an ML model to 1 million users.', 'Batch vs real-time serving, caching, model versioning, load balancing, latency budget, monitoring.', 'hard'),
  ('aiml-ml-engineer', 'What happens if you don''t scale your features before training a KNN or SVM model?', 'Distance-based algorithms get dominated by large-magnitude features; mentions StandardScaler/MinMaxScaler.', 'easy'),
  ('aiml-data-scientist', 'How do you determine if a difference between two groups is statistically significant?', 'Hypothesis test, p-value vs significance threshold, effect size, sample size considerations.', 'medium'),
  ('aiml-data-scientist', 'Explain what a confidence interval means in plain language.', 'Range of plausible values for a parameter at a given confidence level.', 'easy'),
  ('aiml-data-scientist', 'Walk through how you''d approach a churn-prediction problem end to end.', 'Problem framing, data collection, feature engineering, model choice, evaluation, deployment/monitoring.', 'hard'),
  ('aiml-dl-engineer', 'Why do transformers scale better than RNNs for long sequences?', 'Parallelizable attention vs sequential RNN processing; handles long-range dependencies better.', 'medium'),
  ('aiml-dl-engineer', 'What''s the purpose of dropout, and where would you place it in a network?', 'Randomly zeroes activations during training to prevent co-adaptation/overfitting.', 'easy'),
  ('aiml-nlp-engineer', 'What is the difference between extractive and abstractive summarization?', 'Extractive selects existing sentences; abstractive generates new text.', 'easy'),
  ('aiml-nlp-engineer', 'How would you reduce hallucinations in a RAG-based chatbot?', 'Better retrieval quality, grounding prompts, citation requirements, confidence thresholds.', 'hard'),
  ('aiml-cv-engineer', 'What''s the difference between IoU and mAP as evaluation metrics?', 'IoU measures overlap for a single box; mAP aggregates precision-recall across classes/thresholds.', 'medium'),
  ('aiml-mlops', 'What''s the difference between data drift and concept drift?', 'Data drift = input distribution changes; concept drift = relationship between input and output changes.', 'medium');

insert into study_groups (name, description, branch_id) values
  ('ML Interview Prep Circle', 'Weekly mock ML interviews + DSA problem solving', 'aiml'),
  ('Kaggle Study Group', 'Team up on Kaggle competitions, share notebooks', 'aiml'),
  ('Papers We Love — AIML', 'Read and discuss one ML paper every week', 'aiml'),
  ('LLM Builders Club', 'Building RAG apps, fine-tuning, prompt engineering', 'aiml');

insert into community_events (title, type, branch_id, event_time) values
  ('Mock Interview Night — ML Engineer Track', 'Live peer mock interviews with feedback', 'aiml', now() + interval '7 days'),
  ('System Design for ML: Recommendation Engines', 'Workshop on designing ML systems at scale', 'aiml', now() + interval '7 days'),
  ('Resume + Portfolio Review — AIML', 'Get your ML portfolio reviewed before placement season', 'aiml', now() + interval '7 days');


-- Seed data for CSE, IT, AI&DS, ECE, EEE, Mechatronics (remaining branches)
-- Run AFTER supabase_branches_schema.sql and the roles seed.
-- NOTE: adjust `event_time` column name if different in your repo.

-- ============ CSE ============

insert into syllabus_levels (id, role_id, level_number, title, description) values ('cse-sde-l1', 'cse-sde', 1, 'DSA Foundations', 'Core data structures and algorithms') on conflict (id) do nothing;
insert into syllabus_items (id, level_id, title, item_type, order_index) values ('cse-sde-l1-i1', 'cse-sde-l1', 'Arrays, strings, hashing', 'concept', 0) on conflict (id) do nothing;
insert into syllabus_items (id, level_id, title, item_type, order_index) values ('cse-sde-l1-i2', 'cse-sde-l1', 'Trees, graphs, recursion', 'concept', 1) on conflict (id) do nothing;
insert into syllabus_items (id, level_id, title, item_type, order_index) values ('cse-sde-l1-i3', 'cse-sde-l1', 'Solve 100 DSA problems', 'checklist', 2) on conflict (id) do nothing;
insert into syllabus_levels (id, role_id, level_number, title, description) values ('cse-sde-l2', 'cse-sde', 2, 'System Design', 'Designing scalable systems') on conflict (id) do nothing;
insert into syllabus_items (id, level_id, title, item_type, order_index) values ('cse-sde-l2-i1', 'cse-sde-l2', 'Load balancing, caching, sharding', 'concept', 0) on conflict (id) do nothing;
insert into syllabus_items (id, level_id, title, item_type, order_index) values ('cse-sde-l2-i2', 'cse-sde-l2', 'Design 3 systems (URL shortener, chat app, feed)', 'checklist', 1) on conflict (id) do nothing;
insert into syllabus_levels (id, role_id, level_number, title, description) values ('cse-sde-l3', 'cse-sde', 3, 'Placement Ready', 'Interview prep') on conflict (id) do nothing;
insert into syllabus_items (id, level_id, title, item_type, order_index) values ('cse-sde-l3-i1', 'cse-sde-l3', '2 mock technical rounds + 1 HR round', 'checklist', 0) on conflict (id) do nothing;
insert into syllabus_items (id, level_id, title, item_type, order_index) values ('cse-sde-l3-i2', 'cse-sde-l3', 'Get your Placement Readiness Score from AI', 'checklist', 1) on conflict (id) do nothing;
insert into syllabus_levels (id, role_id, level_number, title, description) values ('cse-backend-l1', 'cse-backend', 1, 'Backend Fundamentals', 'APIs and data') on conflict (id) do nothing;
insert into syllabus_items (id, level_id, title, item_type, order_index) values ('cse-backend-l1-i1', 'cse-backend-l1', 'REST API design, HTTP semantics', 'concept', 0) on conflict (id) do nothing;
insert into syllabus_items (id, level_id, title, item_type, order_index) values ('cse-backend-l1-i2', 'cse-backend-l1', 'SQL vs NoSQL databases', 'concept', 1) on conflict (id) do nothing;
insert into syllabus_levels (id, role_id, level_number, title, description) values ('cse-backend-l2', 'cse-backend', 2, 'Scalability', 'Building for scale') on conflict (id) do nothing;
insert into syllabus_items (id, level_id, title, item_type, order_index) values ('cse-backend-l2-i1', 'cse-backend-l2', 'Caching (Redis), message queues', 'concept', 0) on conflict (id) do nothing;
insert into syllabus_items (id, level_id, title, item_type, order_index) values ('cse-backend-l2-i2', 'cse-backend-l2', 'Build 1 production-style backend service', 'checklist', 1) on conflict (id) do nothing;
insert into syllabus_levels (id, role_id, level_number, title, description) values ('cse-backend-l3', 'cse-backend', 3, 'Placement Ready', 'Interview prep') on conflict (id) do nothing;
insert into syllabus_items (id, level_id, title, item_type, order_index) values ('cse-backend-l3-i1', 'cse-backend-l3', 'System design mock: design a backend for a food delivery app', 'checklist', 0) on conflict (id) do nothing;
insert into syllabus_items (id, level_id, title, item_type, order_index) values ('cse-backend-l3-i2', 'cse-backend-l3', 'Get your Placement Readiness Score from AI', 'checklist', 1) on conflict (id) do nothing;
insert into syllabus_levels (id, role_id, level_number, title, description) values ('cse-frontend-l1', 'cse-frontend', 1, 'Frontend Fundamentals', 'Core web technologies') on conflict (id) do nothing;
insert into syllabus_items (id, level_id, title, item_type, order_index) values ('cse-frontend-l1-i1', 'cse-frontend-l1', 'HTML/CSS/JS fundamentals, DOM', 'concept', 0) on conflict (id) do nothing;
insert into syllabus_items (id, level_id, title, item_type, order_index) values ('cse-frontend-l1-i2', 'cse-frontend-l1', 'React fundamentals: components, hooks, state', 'concept', 1) on conflict (id) do nothing;
insert into syllabus_levels (id, role_id, level_number, title, description) values ('cse-frontend-l2', 'cse-frontend', 2, 'Performance & Architecture', 'Building at scale') on conflict (id) do nothing;
insert into syllabus_items (id, level_id, title, item_type, order_index) values ('cse-frontend-l2-i1', 'cse-frontend-l2', 'Rendering performance, code splitting', 'concept', 0) on conflict (id) do nothing;
insert into syllabus_items (id, level_id, title, item_type, order_index) values ('cse-frontend-l2-i2', 'cse-frontend-l2', 'Build 2 production-quality UI projects', 'checklist', 1) on conflict (id) do nothing;
insert into syllabus_levels (id, role_id, level_number, title, description) values ('cse-frontend-l3', 'cse-frontend', 3, 'Placement Ready', 'Interview prep') on conflict (id) do nothing;
insert into syllabus_items (id, level_id, title, item_type, order_index) values ('cse-frontend-l3-i1', 'cse-frontend-l3', 'Live coding round: build a component under time pressure', 'checklist', 0) on conflict (id) do nothing;
insert into syllabus_items (id, level_id, title, item_type, order_index) values ('cse-frontend-l3-i2', 'cse-frontend-l3', 'Get your Placement Readiness Score from AI', 'checklist', 1) on conflict (id) do nothing;
insert into syllabus_levels (id, role_id, level_number, title, description) values ('cse-fullstack-l1', 'cse-fullstack', 1, 'Full Stack Foundations', 'End to end app basics') on conflict (id) do nothing;
insert into syllabus_items (id, level_id, title, item_type, order_index) values ('cse-fullstack-l1-i1', 'cse-fullstack-l1', 'Frontend + backend integration, REST/GraphQL', 'concept', 0) on conflict (id) do nothing;
insert into syllabus_items (id, level_id, title, item_type, order_index) values ('cse-fullstack-l1-i2', 'cse-fullstack-l1', 'Auth flows: JWT, sessions, OAuth', 'concept', 1) on conflict (id) do nothing;
insert into syllabus_levels (id, role_id, level_number, title, description) values ('cse-fullstack-l2', 'cse-fullstack', 2, 'Deployment & DevOps Basics', 'Shipping a full app') on conflict (id) do nothing;
insert into syllabus_items (id, level_id, title, item_type, order_index) values ('cse-fullstack-l2-i1', 'cse-fullstack-l2', 'CI/CD basics, Docker', 'checklist', 0) on conflict (id) do nothing;
insert into syllabus_items (id, level_id, title, item_type, order_index) values ('cse-fullstack-l2-i2', 'cse-fullstack-l2', 'Build 1 full-stack app with auth + DB + deployment', 'checklist', 1) on conflict (id) do nothing;
insert into syllabus_levels (id, role_id, level_number, title, description) values ('cse-fullstack-l3', 'cse-fullstack', 3, 'Placement Ready', 'Interview prep') on conflict (id) do nothing;
insert into syllabus_items (id, level_id, title, item_type, order_index) values ('cse-fullstack-l3-i1', 'cse-fullstack-l3', 'Mock interview: explain your full-stack project end to end', 'checklist', 0) on conflict (id) do nothing;
insert into syllabus_items (id, level_id, title, item_type, order_index) values ('cse-fullstack-l3-i2', 'cse-fullstack-l3', 'Get your Placement Readiness Score from AI', 'checklist', 1) on conflict (id) do nothing;
insert into syllabus_levels (id, role_id, level_number, title, description) values ('cse-data-engineer-l1', 'cse-data-engineer', 1, 'Data Engineering Foundations', 'Pipelines and storage') on conflict (id) do nothing;
insert into syllabus_items (id, level_id, title, item_type, order_index) values ('cse-data-engineer-l1-i1', 'cse-data-engineer-l1', 'SQL mastery, data modeling', 'concept', 0) on conflict (id) do nothing;
insert into syllabus_items (id, level_id, title, item_type, order_index) values ('cse-data-engineer-l1-i2', 'cse-data-engineer-l1', 'ETL vs ELT concepts', 'concept', 1) on conflict (id) do nothing;
insert into syllabus_levels (id, role_id, level_number, title, description) values ('cse-data-engineer-l2', 'cse-data-engineer', 2, 'Big Data Tooling', 'Scaling data pipelines') on conflict (id) do nothing;
insert into syllabus_items (id, level_id, title, item_type, order_index) values ('cse-data-engineer-l2-i1', 'cse-data-engineer-l2', 'Spark/Airflow basics', 'concept', 0) on conflict (id) do nothing;
insert into syllabus_items (id, level_id, title, item_type, order_index) values ('cse-data-engineer-l2-i2', 'cse-data-engineer-l2', 'Build 1 end-to-end data pipeline', 'checklist', 1) on conflict (id) do nothing;
insert into syllabus_levels (id, role_id, level_number, title, description) values ('cse-data-engineer-l3', 'cse-data-engineer', 3, 'Placement Ready', 'Interview prep') on conflict (id) do nothing;
insert into syllabus_items (id, level_id, title, item_type, order_index) values ('cse-data-engineer-l3-i1', 'cse-data-engineer-l3', 'Mock interview: design a data pipeline for clickstream data', 'checklist', 0) on conflict (id) do nothing;
insert into syllabus_items (id, level_id, title, item_type, order_index) values ('cse-data-engineer-l3-i2', 'cse-data-engineer-l3', 'Get your Placement Readiness Score from AI', 'checklist', 1) on conflict (id) do nothing;
insert into syllabus_levels (id, role_id, level_number, title, description) values ('cse-devops-l1', 'cse-devops', 1, 'DevOps Foundations', 'Core practices') on conflict (id) do nothing;
insert into syllabus_items (id, level_id, title, item_type, order_index) values ('cse-devops-l1-i1', 'cse-devops-l1', 'Linux, shell scripting, networking basics', 'concept', 0) on conflict (id) do nothing;
insert into syllabus_items (id, level_id, title, item_type, order_index) values ('cse-devops-l1-i2', 'cse-devops-l1', 'Git workflows, CI/CD concepts', 'concept', 1) on conflict (id) do nothing;
insert into syllabus_levels (id, role_id, level_number, title, description) values ('cse-devops-l2', 'cse-devops', 2, 'Cloud & Containers', 'Infra at scale') on conflict (id) do nothing;
insert into syllabus_items (id, level_id, title, item_type, order_index) values ('cse-devops-l2-i1', 'cse-devops-l2', 'Docker, Kubernetes fundamentals', 'checklist', 0) on conflict (id) do nothing;
insert into syllabus_items (id, level_id, title, item_type, order_index) values ('cse-devops-l2-i2', 'cse-devops-l2', 'Infra-as-code (Terraform)', 'concept', 1) on conflict (id) do nothing;
insert into syllabus_levels (id, role_id, level_number, title, description) values ('cse-devops-l3', 'cse-devops', 3, 'Placement Ready', 'Interview prep') on conflict (id) do nothing;
insert into syllabus_items (id, level_id, title, item_type, order_index) values ('cse-devops-l3-i1', 'cse-devops-l3', 'Mock interview: design a CI/CD pipeline for a microservices app', 'checklist', 0) on conflict (id) do nothing;
insert into syllabus_items (id, level_id, title, item_type, order_index) values ('cse-devops-l3-i2', 'cse-devops-l3', 'Get your Placement Readiness Score from AI', 'checklist', 1) on conflict (id) do nothing;
insert into hr_questions (role_id, category, company_type, question, guidance) values
  ('cse-sde', 'case_study', 'product_based', 'How would you design a URL shortening service like bit.ly?', 'Cover hashing scheme, DB choice, redirect latency, scaling.'),
  ('cse-sde', 'technical', 'service_based', 'Explain the difference between process and thread.', 'Memory sharing, context switch cost, use cases.'),
  ('cse-sde', 'technical', 'product_based', 'What is the time complexity of quicksort in the worst case, and how do you avoid it?', 'O(n^2) worst case on sorted input; randomized pivot selection avoids it.'),
  ('cse-sde', 'hr_behavioral', 'product_based', 'Tell me about a bug you struggled to fix — what was your process?', 'STAR format; emphasize systematic debugging.'),
  ('cse-backend', 'technical', 'product_based', 'Explain the difference between SQL and NoSQL databases and when you''d choose each.', 'Schema flexibility, consistency vs availability, scaling model.'),
  ('cse-backend', 'case_study', 'product_based', 'How would you design an idempotent payment API?', 'Idempotency keys, retries, avoiding duplicate charges.'),
  ('cse-backend', 'technical', 'service_based', 'What''s the difference between authentication and authorization?', 'AuthN verifies identity, AuthZ verifies permissions.'),
  ('cse-backend', 'hr_behavioral', 'service_based', 'Describe a time you optimized a slow database query.', 'Explain indexing/query plan analysis and measured improvement.'),
  ('cse-frontend', 'technical', 'product_based', 'Explain the virtual DOM and why React uses it.', 'Diffing algorithm, batched updates, performance benefit over direct DOM manipulation.'),
  ('cse-frontend', 'case_study', 'product_based', 'How would you improve the load time of a slow React app?', 'Code splitting, lazy loading, memoization, image optimization.'),
  ('cse-frontend', 'technical', 'service_based', 'What''s the difference between controlled and uncontrolled components?', 'State managed by React vs by the DOM itself.'),
  ('cse-frontend', 'hr_behavioral', 'startup', 'Tell me about a UI bug that was hard to reproduce.', 'Emphasize systematic isolation and cross-browser testing.'),
  ('cse-fullstack', 'case_study', 'service_based', 'Walk me through the architecture of a full-stack project you built.', 'Cover frontend, backend, DB, deployment, and key design decisions.'),
  ('cse-fullstack', 'technical', 'product_based', 'How does JWT-based authentication work?', 'Token structure, signing, statelessness, refresh token pattern.'),
  ('cse-fullstack', 'technical', 'product_based', 'What''s the difference between REST and GraphQL?', 'Over/under-fetching, single endpoint vs multiple, schema typing.'),
  ('cse-fullstack', 'hr_behavioral', 'startup', 'Tell me about a time you had to learn a new technology quickly for a project.', 'Show learning process and outcome.'),
  ('cse-data-engineer', 'technical', 'product_based', 'What''s the difference between ETL and ELT?', 'Where transformation happens relative to loading; modern warehouses favor ELT.'),
  ('cse-data-engineer', 'case_study', 'product_based', 'How would you design a pipeline to process 10 million events per day?', 'Batch vs streaming, partitioning, fault tolerance, backpressure.'),
  ('cse-data-engineer', 'technical', 'service_based', 'Explain the CAP theorem.', 'Consistency, Availability, Partition tolerance — pick two during a partition.'),
  ('cse-data-engineer', 'hr_behavioral', 'startup', 'Tell me about a data pipeline that failed in production — how did you handle it?', 'Focus on detection, root cause, and prevention.'),
  ('cse-devops', 'technical', 'product_based', 'Explain the difference between a container and a virtual machine.', 'Shared kernel vs full OS virtualization; startup time and resource overhead.'),
  ('cse-devops', 'case_study', 'product_based', 'How would you design a zero-downtime deployment strategy?', 'Blue-green or canary deployments, health checks, rollback plan.'),
  ('cse-devops', 'technical', 'service_based', 'What is Infrastructure as Code and why does it matter?', 'Reproducibility, version control for infra, drift prevention.'),
  ('cse-devops', 'hr_behavioral', 'startup', 'Describe an incident you handled — what was your response?', 'Detection, mitigation, postmortem, prevention.');
insert into mock_interview_questions (role_id, question, ideal_answer_points, difficulty) values
  ('cse-sde', 'What''s the difference between an array and a linked list?', 'Contiguous memory vs nodes with pointers; access time O(1) vs O(n).', 'easy'),
  ('cse-sde', 'Explain how a hash map handles collisions.', 'Chaining vs open addressing; mentions load factor.', 'medium'),
  ('cse-sde', 'Design a rate limiter for an API.', 'Token bucket/sliding window algorithms, distributed considerations.', 'hard'),
  ('cse-backend', 'What is database indexing and how does it speed up queries?', 'B-tree structure, tradeoff of write speed vs read speed.', 'easy'),
  ('cse-backend', 'Explain ACID properties in databases.', 'Atomicity, Consistency, Isolation, Durability with examples.', 'medium'),
  ('cse-backend', 'How would you design a message queue-based order processing system?', 'Producer/consumer, retries, dead-letter queues, idempotency.', 'hard'),
  ('cse-frontend', 'What are React hooks and why were they introduced?', 'Reuse stateful logic without classes; useState/useEffect basics.', 'easy'),
  ('cse-frontend', 'Explain event delegation in JavaScript.', 'Single listener on parent using bubbling instead of many listeners.', 'medium'),
  ('cse-frontend', 'How would you design a design system/component library for a large team?', 'Reusability, theming, accessibility, documentation, versioning.', 'hard'),
  ('cse-fullstack', 'What is CORS and why does it exist?', 'Browser security policy restricting cross-origin requests; how to configure it.', 'easy'),
  ('cse-fullstack', 'How would you structure environment variables and secrets across dev/staging/prod?', 'Env files, secret managers, never committing secrets.', 'medium'),
  ('cse-fullstack', 'Design the schema for a multi-tenant SaaS application.', 'Tenant isolation strategies, shared vs separate DB, row-level security.', 'hard'),
  ('cse-data-engineer', 'What is data partitioning and why does it matter?', 'Splitting data for parallelism and query performance.', 'easy'),
  ('cse-data-engineer', 'Explain the difference between batch and stream processing.', 'Latency, throughput, use cases (daily reports vs real-time fraud detection).', 'medium'),
  ('cse-data-engineer', 'Design a data warehouse schema for an e-commerce company.', 'Star schema, fact/dimension tables, slowly changing dimensions.', 'hard'),
  ('cse-devops', 'What''s the difference between horizontal and vertical scaling?', 'Adding more machines vs adding more resources to one machine.', 'easy'),
  ('cse-devops', 'Explain how a Kubernetes pod differs from a container.', 'Pod as the smallest deployable unit, can contain multiple containers.', 'medium'),
  ('cse-devops', 'Design a monitoring and alerting strategy for a production system.', 'Metrics, logs, traces, SLOs, alert fatigue prevention.', 'hard');
insert into study_groups (name, description, branch_id) values
  ('DSA Grinders', 'Daily DSA problem solving, contest prep', 'cse'),
  ('System Design Circle', 'Weekly HLD/LLD discussions', 'cse'),
  ('Mock Interview Exchange', 'Peer-to-peer technical mock interviews', 'cse');
insert into community_events (title, type, branch_id, event_time) values
  ('Mock Interview Night — SDE Track', 'Live peer mock interviews with feedback', 'cse', now() + interval '7 days'),
  ('System Design Workshop', 'Designing scalable backend systems', 'cse', now() + interval '7 days'),
  ('Resume Review — CSE', 'Get your resume reviewed before placement season', 'cse', now() + interval '7 days');

-- ============ IT ============

insert into syllabus_levels (id, role_id, level_number, title, description) values ('it-qa-l1', 'it-qa', 1, 'Testing Foundations', 'Manual testing basics') on conflict (id) do nothing;
insert into syllabus_items (id, level_id, title, item_type, order_index) values ('it-qa-l1-i1', 'it-qa-l1', 'SDLC/STLC, test case design', 'concept', 0) on conflict (id) do nothing;
insert into syllabus_items (id, level_id, title, item_type, order_index) values ('it-qa-l1-i2', 'it-qa-l1', 'Bug lifecycle, severity vs priority', 'concept', 1) on conflict (id) do nothing;
insert into syllabus_levels (id, role_id, level_number, title, description) values ('it-qa-l2', 'it-qa', 2, 'Automation Testing', 'Scripted testing') on conflict (id) do nothing;
insert into syllabus_items (id, level_id, title, item_type, order_index) values ('it-qa-l2-i1', 'it-qa-l2', 'Selenium/Playwright fundamentals', 'checklist', 0) on conflict (id) do nothing;
insert into syllabus_items (id, level_id, title, item_type, order_index) values ('it-qa-l2-i2', 'it-qa-l2', 'Build 1 automated test suite', 'checklist', 1) on conflict (id) do nothing;
insert into syllabus_levels (id, role_id, level_number, title, description) values ('it-qa-l3', 'it-qa', 3, 'Placement Ready', 'Interview prep') on conflict (id) do nothing;
insert into syllabus_items (id, level_id, title, item_type, order_index) values ('it-qa-l3-i1', 'it-qa-l3', 'Mock interview: test case design for a login feature', 'checklist', 0) on conflict (id) do nothing;
insert into syllabus_items (id, level_id, title, item_type, order_index) values ('it-qa-l3-i2', 'it-qa-l3', 'Get your Placement Readiness Score from AI', 'checklist', 1) on conflict (id) do nothing;
insert into syllabus_levels (id, role_id, level_number, title, description) values ('it-sysadmin-l1', 'it-sysadmin', 1, 'Networking & OS Basics', 'Core infra knowledge') on conflict (id) do nothing;
insert into syllabus_items (id, level_id, title, item_type, order_index) values ('it-sysadmin-l1-i1', 'it-sysadmin-l1', 'TCP/IP, DNS, subnetting', 'concept', 0) on conflict (id) do nothing;
insert into syllabus_items (id, level_id, title, item_type, order_index) values ('it-sysadmin-l1-i2', 'it-sysadmin-l1', 'Linux administration basics', 'concept', 1) on conflict (id) do nothing;
insert into syllabus_levels (id, role_id, level_number, title, description) values ('it-sysadmin-l2', 'it-sysadmin', 2, 'Systems Management', 'Keeping systems running') on conflict (id) do nothing;
insert into syllabus_items (id, level_id, title, item_type, order_index) values ('it-sysadmin-l2-i1', 'it-sysadmin-l2', 'User/permission management, backups', 'concept', 0) on conflict (id) do nothing;
insert into syllabus_items (id, level_id, title, item_type, order_index) values ('it-sysadmin-l2-i2', 'it-sysadmin-l2', 'Monitoring and troubleshooting', 'checklist', 1) on conflict (id) do nothing;
insert into syllabus_levels (id, role_id, level_number, title, description) values ('it-sysadmin-l3', 'it-sysadmin', 3, 'Placement Ready', 'Interview prep') on conflict (id) do nothing;
insert into syllabus_items (id, level_id, title, item_type, order_index) values ('it-sysadmin-l3-i1', 'it-sysadmin-l3', 'Mock interview: troubleshoot a server down scenario', 'checklist', 0) on conflict (id) do nothing;
insert into syllabus_items (id, level_id, title, item_type, order_index) values ('it-sysadmin-l3-i2', 'it-sysadmin-l3', 'Get your Placement Readiness Score from AI', 'checklist', 1) on conflict (id) do nothing;
insert into syllabus_levels (id, role_id, level_number, title, description) values ('it-cloud-l1', 'it-cloud', 1, 'Cloud Foundations', 'Core cloud concepts') on conflict (id) do nothing;
insert into syllabus_items (id, level_id, title, item_type, order_index) values ('it-cloud-l1-i1', 'it-cloud-l1', 'IaaS/PaaS/SaaS, core AWS/Azure services', 'concept', 0) on conflict (id) do nothing;
insert into syllabus_items (id, level_id, title, item_type, order_index) values ('it-cloud-l1-i2', 'it-cloud-l1', 'Cloud networking basics (VPC, security groups)', 'concept', 1) on conflict (id) do nothing;
insert into syllabus_levels (id, role_id, level_number, title, description) values ('it-cloud-l2', 'it-cloud', 2, 'Cloud Operations', 'Running workloads') on conflict (id) do nothing;
insert into syllabus_items (id, level_id, title, item_type, order_index) values ('it-cloud-l2-i1', 'it-cloud-l2', 'Monitoring, cost optimization', 'concept', 0) on conflict (id) do nothing;
insert into syllabus_items (id, level_id, title, item_type, order_index) values ('it-cloud-l2-i2', 'it-cloud-l2', 'Get 1 cloud certification (AWS/Azure fundamentals)', 'checklist', 1) on conflict (id) do nothing;
insert into syllabus_levels (id, role_id, level_number, title, description) values ('it-cloud-l3', 'it-cloud', 3, 'Placement Ready', 'Interview prep') on conflict (id) do nothing;
insert into syllabus_items (id, level_id, title, item_type, order_index) values ('it-cloud-l3-i1', 'it-cloud-l3', 'Mock interview: troubleshoot a cloud VM connectivity issue', 'checklist', 0) on conflict (id) do nothing;
insert into syllabus_items (id, level_id, title, item_type, order_index) values ('it-cloud-l3-i2', 'it-cloud-l3', 'Get your Placement Readiness Score from AI', 'checklist', 1) on conflict (id) do nothing;
insert into syllabus_levels (id, role_id, level_number, title, description) values ('it-fullstack-l1', 'it-fullstack', 1, 'Web Dev Foundations', 'Core stack basics') on conflict (id) do nothing;
insert into syllabus_items (id, level_id, title, item_type, order_index) values ('it-fullstack-l1-i1', 'it-fullstack-l1', 'HTML/CSS/JS, a backend framework', 'concept', 0) on conflict (id) do nothing;
insert into syllabus_items (id, level_id, title, item_type, order_index) values ('it-fullstack-l1-i2', 'it-fullstack-l1', 'Databases: SQL basics', 'concept', 1) on conflict (id) do nothing;
insert into syllabus_levels (id, role_id, level_number, title, description) values ('it-fullstack-l2', 'it-fullstack', 2, 'Building Applications', 'End to end apps') on conflict (id) do nothing;
insert into syllabus_items (id, level_id, title, item_type, order_index) values ('it-fullstack-l2-i1', 'it-fullstack-l2', 'Build 1 CRUD application with auth', 'checklist', 0) on conflict (id) do nothing;
insert into syllabus_levels (id, role_id, level_number, title, description) values ('it-fullstack-l3', 'it-fullstack', 3, 'Placement Ready', 'Interview prep') on conflict (id) do nothing;
insert into syllabus_items (id, level_id, title, item_type, order_index) values ('it-fullstack-l3-i1', 'it-fullstack-l3', 'Mock interview: explain your project architecture', 'checklist', 0) on conflict (id) do nothing;
insert into syllabus_items (id, level_id, title, item_type, order_index) values ('it-fullstack-l3-i2', 'it-fullstack-l3', 'Get your Placement Readiness Score from AI', 'checklist', 1) on conflict (id) do nothing;
insert into syllabus_levels (id, role_id, level_number, title, description) values ('it-dba-l1', 'it-dba', 1, 'Database Foundations', 'Core DB concepts') on conflict (id) do nothing;
insert into syllabus_items (id, level_id, title, item_type, order_index) values ('it-dba-l1-i1', 'it-dba-l1', 'SQL fundamentals, normalization', 'concept', 0) on conflict (id) do nothing;
insert into syllabus_items (id, level_id, title, item_type, order_index) values ('it-dba-l1-i2', 'it-dba-l1', 'Indexes and query optimization', 'concept', 1) on conflict (id) do nothing;
insert into syllabus_levels (id, role_id, level_number, title, description) values ('it-dba-l2', 'it-dba', 2, 'Database Operations', 'Running production DBs') on conflict (id) do nothing;
insert into syllabus_items (id, level_id, title, item_type, order_index) values ('it-dba-l2-i1', 'it-dba-l2', 'Backup/recovery, replication', 'concept', 0) on conflict (id) do nothing;
insert into syllabus_items (id, level_id, title, item_type, order_index) values ('it-dba-l2-i2', 'it-dba-l2', 'Performance tuning practice', 'checklist', 1) on conflict (id) do nothing;
insert into syllabus_levels (id, role_id, level_number, title, description) values ('it-dba-l3', 'it-dba', 3, 'Placement Ready', 'Interview prep') on conflict (id) do nothing;
insert into syllabus_items (id, level_id, title, item_type, order_index) values ('it-dba-l3-i1', 'it-dba-l3', 'Mock interview: diagnose a slow query', 'checklist', 0) on conflict (id) do nothing;
insert into syllabus_items (id, level_id, title, item_type, order_index) values ('it-dba-l3-i2', 'it-dba-l3', 'Get your Placement Readiness Score from AI', 'checklist', 1) on conflict (id) do nothing;
insert into hr_questions (role_id, category, company_type, question, guidance) values
  ('it-qa', 'technical', 'service_based', 'Explain the difference between smoke testing and regression testing.', 'Smoke = quick sanity check; regression = ensure existing features still work after changes.'),
  ('it-qa', 'case_study', 'service_based', 'How would you design test cases for a login page?', 'Valid/invalid credentials, boundary values, security (SQLi/XSS), UI states.'),
  ('it-qa', 'technical', 'service_based', 'What''s the difference between severity and priority of a bug?', 'Severity = impact on system; priority = urgency to fix.'),
  ('it-qa', 'hr_behavioral', 'service_based', 'Tell me about a critical bug you found before release.', 'STAR format; emphasize impact and how you communicated it.'),
  ('it-sysadmin', 'technical', 'core_company', 'Explain the difference between TCP and UDP.', 'Connection-oriented reliable vs connectionless fast; use cases.'),
  ('it-sysadmin', 'case_study', 'core_company', 'How would you troubleshoot a server that suddenly became unreachable?', 'Check network, ping/traceroute, service status, logs, escalation.'),
  ('it-sysadmin', 'technical', 'service_based', 'What is DNS and how does resolution work?', 'Recursive resolver, root/TLD/authoritative servers.'),
  ('it-sysadmin', 'hr_behavioral', 'service_based', 'Describe a time you had to work under pressure to fix a system outage.', 'Focus on calm, structured troubleshooting.'),
  ('it-cloud', 'technical', 'product_based', 'Explain the difference between IaaS, PaaS, and SaaS.', 'Level of managed abstraction, examples of each.'),
  ('it-cloud', 'case_study', 'product_based', 'How would you reduce cloud costs for an over-provisioned environment?', 'Right-sizing, reserved instances, auto-scaling, unused resource cleanup.'),
  ('it-cloud', 'technical', 'product_based', 'What is a VPC and why is it important?', 'Isolated network environment, subnetting, security groups.'),
  ('it-cloud', 'hr_behavioral', 'startup', 'Tell me about a time you resolved a cloud infrastructure issue.', 'Structured troubleshooting narrative.'),
  ('it-fullstack', 'case_study', 'service_based', 'Walk me through a project you built end to end.', 'Architecture, tech choices, challenges faced.'),
  ('it-fullstack', 'technical', 'service_based', 'What''s the difference between GET and POST requests?', 'Idempotency, data in URL vs body, caching behavior.'),
  ('it-fullstack', 'technical', 'service_based', 'How do you ensure your application is secure against common vulnerabilities?', 'Input validation, parameterized queries, HTTPS, auth best practices.'),
  ('it-fullstack', 'hr_behavioral', 'service_based', 'Tell me about a time you worked in a team on a coding project.', 'Collaboration, version control workflow, conflict resolution.'),
  ('it-dba', 'technical', 'core_company', 'What is database normalization and why is it important?', 'Reduces redundancy, defines normal forms (1NF-3NF) with tradeoffs vs denormalization.'),
  ('it-dba', 'case_study', 'core_company', 'How would you diagnose and fix a slow-running query?', 'EXPLAIN plan, missing indexes, query rewrite.'),
  ('it-dba', 'technical', 'service_based', 'Explain the difference between a clustered and non-clustered index.', 'Clustered defines physical row order; non-clustered is a separate lookup structure.'),
  ('it-dba', 'hr_behavioral', 'core_company', 'Tell me about a time you had to restore a database from backup under pressure.', 'Emphasize calm process and validation after restore.');
insert into mock_interview_questions (role_id, question, ideal_answer_points, difficulty) values
  ('it-qa', 'What is the difference between black-box and white-box testing?', 'Black-box tests functionality without code knowledge; white-box tests internal logic.', 'easy'),
  ('it-qa', 'How do you decide what to automate vs test manually?', 'Repetitive/stable/high-risk cases automated; exploratory/UX testing stays manual.', 'medium'),
  ('it-qa', 'Design a test strategy for an e-commerce checkout flow.', 'Functional, edge cases, payment failure scenarios, load testing considerations.', 'hard'),
  ('it-sysadmin', 'What is the difference between a firewall and a proxy?', 'Firewall filters traffic by rules; proxy relays/intermediates requests.', 'easy'),
  ('it-sysadmin', 'Explain the boot process of a Linux system.', 'BIOS/UEFI, bootloader, kernel init, systemd/init services.', 'medium'),
  ('it-sysadmin', 'Design a backup and disaster recovery plan for a small company''s servers.', 'RPO/RTO, backup frequency, offsite storage, recovery testing.', 'hard'),
  ('it-cloud', 'What''s the difference between a security group and a network ACL in AWS?', 'Stateful instance-level vs stateless subnet-level rules.', 'easy'),
  ('it-cloud', 'Explain auto-scaling and when you''d use it.', 'Scales resources based on demand metrics; cost and availability benefit.', 'medium'),
  ('it-cloud', 'Design a highly available architecture for a web app on AWS.', 'Multi-AZ, load balancer, auto-scaling group, managed DB with failover.', 'hard'),
  ('it-fullstack', 'What is SQL injection and how do you prevent it?', 'Untrusted input executed as SQL; prevent with parameterized queries.', 'easy'),
  ('it-fullstack', 'Explain the MVC architecture pattern.', 'Model-View-Controller separation of concerns.', 'medium'),
  ('it-fullstack', 'How would you design a simple URL-based file upload service?', 'Storage choice, validation, size limits, security scanning.', 'hard'),
  ('it-dba', 'What is database replication and why is it used?', 'Copies data across servers for availability and read scaling.', 'easy'),
  ('it-dba', 'Explain deadlocks and how to prevent them.', 'Two transactions waiting on each other''s locks; prevention via consistent lock ordering, timeouts.', 'medium'),
  ('it-dba', 'Design a backup strategy for a database with strict uptime requirements.', 'Full/incremental backups, point-in-time recovery, replication for failover.', 'hard');
insert into study_groups (name, description, branch_id) values
  ('QA Automation Study Group', 'Selenium/Playwright practice sessions', 'it'),
  ('IT Infra Circle', 'Networking and sysadmin discussions', 'it');
insert into community_events (title, type, branch_id, event_time) values
  ('Mock Interview Night — IT Track', 'Live peer mock interviews with feedback', 'it', now() + interval '7 days'),
  ('Cloud Fundamentals Workshop', 'AWS/Azure basics for IT roles', 'it', now() + interval '7 days');

-- ============ AIDS ============

insert into syllabus_levels (id, role_id, level_number, title, description) values ('aids-data-analyst-l1', 'aids-data-analyst', 1, 'Analytics Foundations', 'SQL and spreadsheets') on conflict (id) do nothing;
insert into syllabus_items (id, level_id, title, item_type, order_index) values ('aids-data-analyst-l1-i1', 'aids-data-analyst-l1', 'Advanced SQL: joins, window functions', 'concept', 0) on conflict (id) do nothing;
insert into syllabus_items (id, level_id, title, item_type, order_index) values ('aids-data-analyst-l1-i2', 'aids-data-analyst-l1', 'Excel/Google Sheets for analysis', 'checklist', 1) on conflict (id) do nothing;
insert into syllabus_levels (id, role_id, level_number, title, description) values ('aids-data-analyst-l2', 'aids-data-analyst', 2, 'Visualization & Reporting', 'Communicating data') on conflict (id) do nothing;
insert into syllabus_items (id, level_id, title, item_type, order_index) values ('aids-data-analyst-l2-i1', 'aids-data-analyst-l2', 'Power BI/Tableau dashboards', 'checklist', 0) on conflict (id) do nothing;
insert into syllabus_items (id, level_id, title, item_type, order_index) values ('aids-data-analyst-l2-i2', 'aids-data-analyst-l2', 'Build 1 end-to-end analysis report', 'checklist', 1) on conflict (id) do nothing;
insert into syllabus_levels (id, role_id, level_number, title, description) values ('aids-data-analyst-l3', 'aids-data-analyst', 3, 'Placement Ready', 'Interview prep') on conflict (id) do nothing;
insert into syllabus_items (id, level_id, title, item_type, order_index) values ('aids-data-analyst-l3-i1', 'aids-data-analyst-l3', 'Mock interview: SQL live coding round', 'checklist', 0) on conflict (id) do nothing;
insert into syllabus_items (id, level_id, title, item_type, order_index) values ('aids-data-analyst-l3-i2', 'aids-data-analyst-l3', 'Get your Placement Readiness Score from AI', 'checklist', 1) on conflict (id) do nothing;
insert into syllabus_levels (id, role_id, level_number, title, description) values ('aids-data-scientist-l1', 'aids-data-scientist', 1, 'Statistics for Business', 'Applied stats') on conflict (id) do nothing;
insert into syllabus_items (id, level_id, title, item_type, order_index) values ('aids-data-scientist-l1-i1', 'aids-data-scientist-l1', 'A/B testing, regression basics', 'concept', 0) on conflict (id) do nothing;
insert into syllabus_levels (id, role_id, level_number, title, description) values ('aids-data-scientist-l2', 'aids-data-scientist', 2, 'Predictive Modeling', 'Business-facing ML') on conflict (id) do nothing;
insert into syllabus_items (id, level_id, title, item_type, order_index) values ('aids-data-scientist-l2-i1', 'aids-data-scientist-l2', 'Build 1 predictive model tied to a business metric', 'checklist', 0) on conflict (id) do nothing;
insert into syllabus_levels (id, role_id, level_number, title, description) values ('aids-data-scientist-l3', 'aids-data-scientist', 3, 'Placement Ready', 'Interview prep') on conflict (id) do nothing;
insert into syllabus_items (id, level_id, title, item_type, order_index) values ('aids-data-scientist-l3-i1', 'aids-data-scientist-l3', 'Mock interview: case study round', 'checklist', 0) on conflict (id) do nothing;
insert into syllabus_items (id, level_id, title, item_type, order_index) values ('aids-data-scientist-l3-i2', 'aids-data-scientist-l3', 'Get your Placement Readiness Score from AI', 'checklist', 1) on conflict (id) do nothing;
insert into syllabus_levels (id, role_id, level_number, title, description) values ('aids-data-engineer-l1', 'aids-data-engineer', 1, 'Data Platform Foundations', 'Core pipeline skills') on conflict (id) do nothing;
insert into syllabus_items (id, level_id, title, item_type, order_index) values ('aids-data-engineer-l1-i1', 'aids-data-engineer-l1', 'SQL, Python for ETL', 'concept', 0) on conflict (id) do nothing;
insert into syllabus_levels (id, role_id, level_number, title, description) values ('aids-data-engineer-l2', 'aids-data-engineer', 2, 'Pipeline Building', 'Production data flows') on conflict (id) do nothing;
insert into syllabus_items (id, level_id, title, item_type, order_index) values ('aids-data-engineer-l2-i1', 'aids-data-engineer-l2', 'Build 1 automated ETL pipeline', 'checklist', 0) on conflict (id) do nothing;
insert into syllabus_levels (id, role_id, level_number, title, description) values ('aids-data-engineer-l3', 'aids-data-engineer', 3, 'Placement Ready', 'Interview prep') on conflict (id) do nothing;
insert into syllabus_items (id, level_id, title, item_type, order_index) values ('aids-data-engineer-l3-i1', 'aids-data-engineer-l3', 'Mock interview: design a data pipeline for daily sales reports', 'checklist', 0) on conflict (id) do nothing;
insert into syllabus_items (id, level_id, title, item_type, order_index) values ('aids-data-engineer-l3-i2', 'aids-data-engineer-l3', 'Get your Placement Readiness Score from AI', 'checklist', 1) on conflict (id) do nothing;
insert into syllabus_levels (id, role_id, level_number, title, description) values ('aids-bi-analyst-l1', 'aids-bi-analyst', 1, 'BI Foundations', 'Reporting basics') on conflict (id) do nothing;
insert into syllabus_items (id, level_id, title, item_type, order_index) values ('aids-bi-analyst-l1-i1', 'aids-bi-analyst-l1', 'KPI design, dashboard fundamentals', 'concept', 0) on conflict (id) do nothing;
insert into syllabus_levels (id, role_id, level_number, title, description) values ('aids-bi-analyst-l2', 'aids-bi-analyst', 2, 'Advanced Reporting', 'Scaling BI work') on conflict (id) do nothing;
insert into syllabus_items (id, level_id, title, item_type, order_index) values ('aids-bi-analyst-l2-i1', 'aids-bi-analyst-l2', 'Build 2 dashboards for different stakeholder groups', 'checklist', 0) on conflict (id) do nothing;
insert into syllabus_levels (id, role_id, level_number, title, description) values ('aids-bi-analyst-l3', 'aids-bi-analyst', 3, 'Placement Ready', 'Interview prep') on conflict (id) do nothing;
insert into syllabus_items (id, level_id, title, item_type, order_index) values ('aids-bi-analyst-l3-i1', 'aids-bi-analyst-l3', 'Mock interview: present a dashboard to a stakeholder', 'checklist', 0) on conflict (id) do nothing;
insert into syllabus_items (id, level_id, title, item_type, order_index) values ('aids-bi-analyst-l3-i2', 'aids-bi-analyst-l3', 'Get your Placement Readiness Score from AI', 'checklist', 1) on conflict (id) do nothing;
insert into syllabus_levels (id, role_id, level_number, title, description) values ('aids-ai-product-l1', 'aids-ai-product', 1, 'AI Product Foundations', 'Bridging AI and product') on conflict (id) do nothing;
insert into syllabus_items (id, level_id, title, item_type, order_index) values ('aids-ai-product-l1-i1', 'aids-ai-product-l1', 'ML capabilities/limitations for PMs, evaluation basics', 'concept', 0) on conflict (id) do nothing;
insert into syllabus_levels (id, role_id, level_number, title, description) values ('aids-ai-product-l2', 'aids-ai-product', 2, 'Feature Scoping', 'Shipping AI features') on conflict (id) do nothing;
insert into syllabus_items (id, level_id, title, item_type, order_index) values ('aids-ai-product-l2-i1', 'aids-ai-product-l2', 'Write 1 AI feature spec end to end', 'checklist', 0) on conflict (id) do nothing;
insert into syllabus_levels (id, role_id, level_number, title, description) values ('aids-ai-product-l3', 'aids-ai-product', 3, 'Placement Ready', 'Interview prep') on conflict (id) do nothing;
insert into syllabus_items (id, level_id, title, item_type, order_index) values ('aids-ai-product-l3-i1', 'aids-ai-product-l3', 'Mock interview: scope an AI feature under ambiguity', 'checklist', 0) on conflict (id) do nothing;
insert into syllabus_items (id, level_id, title, item_type, order_index) values ('aids-ai-product-l3-i2', 'aids-ai-product-l3', 'Get your Placement Readiness Score from AI', 'checklist', 1) on conflict (id) do nothing;
insert into hr_questions (role_id, category, company_type, question, guidance) values
  ('aids-data-analyst', 'coding', 'product_based', 'Write a SQL query to find customers who made purchases in every month of the last year.', 'Use GROUP BY with HAVING COUNT(DISTINCT month) = 12, or self-joins.'),
  ('aids-data-analyst', 'case_study', 'product_based', 'How would you investigate a sudden drop in weekly active users?', 'Segment by platform/geography, check for bugs/releases, funnel analysis.'),
  ('aids-data-analyst', 'technical', 'service_based', 'What''s the difference between a bar chart and a histogram?', 'Bar chart compares categories; histogram shows distribution of continuous data.'),
  ('aids-data-analyst', 'hr_behavioral', 'startup', 'Tell me about an analysis that led to a concrete business change.', 'Quantify impact and describe the decision chain.'),
  ('aids-data-scientist', 'case_study', 'product_based', 'How would you build a churn prediction model for a subscription business?', 'Feature engineering from usage data, model choice, business-relevant metrics.'),
  ('aids-data-scientist', 'technical', 'product_based', 'Explain the difference between Type I and Type II errors.', 'False positive vs false negative; tradeoffs via threshold selection.'),
  ('aids-data-scientist', 'technical', 'service_based', 'What''s the difference between supervised and unsupervised learning?', 'Labeled vs unlabeled data, example algorithms for each.'),
  ('aids-data-scientist', 'hr_behavioral', 'startup', 'Tell me about a time your model''s prediction was wrong — what did you learn?', 'Focus on diagnosis and iteration, not just being right.'),
  ('aids-data-engineer', 'case_study', 'product_based', 'How would you design a pipeline to load daily sales data into a warehouse?', 'Extraction schedule, transformation logic, incremental loads, failure handling.'),
  ('aids-data-engineer', 'technical', 'product_based', 'What''s the difference between a data warehouse and a data lake?', 'Structured/schema-on-write vs raw/schema-on-read storage.'),
  ('aids-data-engineer', 'technical', 'service_based', 'Explain idempotency in the context of data pipelines.', 'Re-running a pipeline shouldn''t duplicate or corrupt data.'),
  ('aids-data-engineer', 'hr_behavioral', 'startup', 'Tell me about a pipeline failure you diagnosed and fixed.', 'Root cause analysis and monitoring improvement afterward.'),
  ('aids-bi-analyst', 'case_study', 'service_based', 'How do you decide which KPIs matter for a given business function?', 'Align metrics to business goals, avoid vanity metrics.'),
  ('aids-bi-analyst', 'technical', 'service_based', 'What''s the difference between a fact table and a dimension table?', 'Fact = measurable events; dimension = descriptive context.'),
  ('aids-bi-analyst', 'case_study', 'product_based', 'How would you design a dashboard for a sales team vs an executive team?', 'Sales wants granular/actionable; execs want high-level trends.'),
  ('aids-bi-analyst', 'hr_behavioral', 'startup', 'Tell me about a time a dashboard you built changed how a team worked.', 'Concrete before/after behavior change.'),
  ('aids-ai-product', 'case_study', 'product_based', 'How would you evaluate whether an AI feature is ready to ship?', 'Accuracy thresholds, failure mode review, user testing, guardrails.'),
  ('aids-ai-product', 'technical', 'product_based', 'What tradeoffs would you consider between a rule-based system and an ML model for a new feature?', 'Explainability, maintenance cost, data availability, accuracy needs.'),
  ('aids-ai-product', 'hr_behavioral', 'startup', 'How do you communicate AI model limitations to non-technical stakeholders?', 'Simplify without overpromising; use concrete failure examples.'),
  ('aids-ai-product', 'hr_behavioral', 'startup', 'Tell me about a time you had to say no to a feature request due to technical constraints.', 'Show reasoning and stakeholder management.');
insert into mock_interview_questions (role_id, question, ideal_answer_points, difficulty) values
  ('aids-data-analyst', 'What is a JOIN in SQL and what are the different types?', 'INNER, LEFT, RIGHT, FULL OUTER — explain what rows each returns.', 'easy'),
  ('aids-data-analyst', 'How do you handle outliers in a dataset before analysis?', 'Detect via IQR/z-score, decide to cap/remove/investigate based on context.', 'medium'),
  ('aids-data-analyst', 'Design a dashboard to track key business metrics for an e-commerce company.', 'Revenue, conversion rate, retention, cohort views, refresh cadence.', 'hard'),
  ('aids-data-scientist', 'What is multicollinearity and why is it a problem in regression?', 'Correlated predictors inflate coefficient variance, make interpretation unreliable.', 'easy'),
  ('aids-data-scientist', 'How would you validate that your model generalizes well?', 'Train/val/test split, cross-validation, out-of-time validation for business data.', 'medium'),
  ('aids-data-scientist', 'Design an experiment to test a new pricing strategy.', 'A/B test design, guardrail metrics, statistical power, rollout plan.', 'hard'),
  ('aids-data-engineer', 'What is a slowly changing dimension?', 'Dimension table values change over time; Type 1/2/3 handling strategies.', 'easy'),
  ('aids-data-engineer', 'How do you handle schema changes in an upstream data source?', 'Schema validation, versioning, backward-compatible transformations.', 'medium'),
  ('aids-data-engineer', 'Design a data pipeline architecture for a company with 5 different data sources.', 'Ingestion layer, staging, transformation, orchestration, monitoring.', 'hard'),
  ('aids-bi-analyst', 'What is the difference between a snowflake schema and a star schema?', 'Star = denormalized dimensions; snowflake = normalized, more joins.', 'easy'),
  ('aids-bi-analyst', 'How do you ensure a dashboard stays performant with large datasets?', 'Pre-aggregation, incremental refresh, query optimization.', 'medium'),
  ('aids-bi-analyst', 'Design a reporting suite for tracking a company''s quarterly OKRs.', 'Metric definitions, drill-downs, update cadence, ownership.', 'hard'),
  ('aids-ai-product', 'What''s the difference between precision and recall from a product perspective?', 'Ties false positives/negatives to real user-facing consequences.', 'easy'),
  ('aids-ai-product', 'How would you prioritize an AI feature roadmap with limited ML engineering resources?', 'Impact vs effort, data readiness, quick wins vs strategic bets.', 'medium'),
  ('aids-ai-product', 'Design the success metrics for an AI-powered recommendation feature.', 'Engagement, relevance, business KPIs, guardrails against bias/harm.', 'hard');
insert into study_groups (name, description, branch_id) values
  ('Data Analytics Study Circle', 'SQL/Excel/Power BI practice', 'aids'),
  ('Case Study Club — AI&DS', 'Business case interview practice', 'aids');
insert into community_events (title, type, branch_id, event_time) values
  ('Mock Interview Night — AI&DS Track', 'Live peer mock interviews with feedback', 'aids', now() + interval '7 days'),
  ('SQL Bootcamp Weekend', 'Intensive SQL problem-solving session', 'aids', now() + interval '7 days');

-- ============ ECE ============

insert into syllabus_levels (id, role_id, level_number, title, description) values ('ece-vlsi-l1', 'ece-vlsi', 1, 'Digital Design Foundations', 'Core RTL skills') on conflict (id) do nothing;
insert into syllabus_items (id, level_id, title, item_type, order_index) values ('ece-vlsi-l1-i1', 'ece-vlsi-l1', 'Verilog/VHDL fundamentals', 'concept', 0) on conflict (id) do nothing;
insert into syllabus_items (id, level_id, title, item_type, order_index) values ('ece-vlsi-l1-i2', 'ece-vlsi-l1', 'Combinational vs sequential logic design', 'concept', 1) on conflict (id) do nothing;
insert into syllabus_levels (id, role_id, level_number, title, description) values ('ece-vlsi-l2', 'ece-vlsi', 2, 'Verification & Physical Design', 'Chip design flow') on conflict (id) do nothing;
insert into syllabus_items (id, level_id, title, item_type, order_index) values ('ece-vlsi-l2-i1', 'ece-vlsi-l2', 'Testbenches, simulation basics', 'checklist', 0) on conflict (id) do nothing;
insert into syllabus_items (id, level_id, title, item_type, order_index) values ('ece-vlsi-l2-i2', 'ece-vlsi-l2', 'Synthesis and timing analysis basics', 'concept', 1) on conflict (id) do nothing;
insert into syllabus_levels (id, role_id, level_number, title, description) values ('ece-vlsi-l3', 'ece-vlsi', 3, 'Placement Ready', 'Interview prep') on conflict (id) do nothing;
insert into syllabus_items (id, level_id, title, item_type, order_index) values ('ece-vlsi-l3-i1', 'ece-vlsi-l3', 'Mock interview: design a simple FSM on the whiteboard', 'checklist', 0) on conflict (id) do nothing;
insert into syllabus_items (id, level_id, title, item_type, order_index) values ('ece-vlsi-l3-i2', 'ece-vlsi-l3', 'Get your Placement Readiness Score from AI', 'checklist', 1) on conflict (id) do nothing;
insert into syllabus_levels (id, role_id, level_number, title, description) values ('ece-embedded-l1', 'ece-embedded', 1, 'Embedded Foundations', 'Core firmware skills') on conflict (id) do nothing;
insert into syllabus_items (id, level_id, title, item_type, order_index) values ('ece-embedded-l1-i1', 'ece-embedded-l1', 'C programming for embedded systems', 'concept', 0) on conflict (id) do nothing;
insert into syllabus_items (id, level_id, title, item_type, order_index) values ('ece-embedded-l1-i2', 'ece-embedded-l1', 'Microcontroller architecture (ARM/AVR)', 'concept', 1) on conflict (id) do nothing;
insert into syllabus_levels (id, role_id, level_number, title, description) values ('ece-embedded-l2', 'ece-embedded', 2, 'Real-Time Systems', 'Building responsive firmware') on conflict (id) do nothing;
insert into syllabus_items (id, level_id, title, item_type, order_index) values ('ece-embedded-l2-i1', 'ece-embedded-l2', 'RTOS basics, interrupts', 'concept', 0) on conflict (id) do nothing;
insert into syllabus_items (id, level_id, title, item_type, order_index) values ('ece-embedded-l2-i2', 'ece-embedded-l2', 'Build 1 embedded project (sensor + actuator)', 'checklist', 1) on conflict (id) do nothing;
insert into syllabus_levels (id, role_id, level_number, title, description) values ('ece-embedded-l3', 'ece-embedded', 3, 'Placement Ready', 'Interview prep') on conflict (id) do nothing;
insert into syllabus_items (id, level_id, title, item_type, order_index) values ('ece-embedded-l3-i1', 'ece-embedded-l3', 'Mock interview: debug a firmware issue scenario', 'checklist', 0) on conflict (id) do nothing;
insert into syllabus_items (id, level_id, title, item_type, order_index) values ('ece-embedded-l3-i2', 'ece-embedded-l3', 'Get your Placement Readiness Score from AI', 'checklist', 1) on conflict (id) do nothing;
insert into syllabus_levels (id, role_id, level_number, title, description) values ('ece-signal-l1', 'ece-signal', 1, 'DSP Foundations', 'Core signal processing') on conflict (id) do nothing;
insert into syllabus_items (id, level_id, title, item_type, order_index) values ('ece-signal-l1-i1', 'ece-signal-l1', 'Sampling theorem, Fourier transforms', 'concept', 0) on conflict (id) do nothing;
insert into syllabus_items (id, level_id, title, item_type, order_index) values ('ece-signal-l1-i2', 'ece-signal-l1', 'Filter design basics (FIR/IIR)', 'concept', 1) on conflict (id) do nothing;
insert into syllabus_levels (id, role_id, level_number, title, description) values ('ece-signal-l2', 'ece-signal', 2, 'Applied Signal Processing', 'Real systems') on conflict (id) do nothing;
insert into syllabus_items (id, level_id, title, item_type, order_index) values ('ece-signal-l2-i1', 'ece-signal-l2', 'MATLAB/Python for signal analysis', 'checklist', 0) on conflict (id) do nothing;
insert into syllabus_items (id, level_id, title, item_type, order_index) values ('ece-signal-l2-i2', 'ece-signal-l2', 'Build 1 signal processing project', 'checklist', 1) on conflict (id) do nothing;
insert into syllabus_levels (id, role_id, level_number, title, description) values ('ece-signal-l3', 'ece-signal', 3, 'Placement Ready', 'Interview prep') on conflict (id) do nothing;
insert into syllabus_items (id, level_id, title, item_type, order_index) values ('ece-signal-l3-i1', 'ece-signal-l3', 'Mock interview: explain the Nyquist theorem and aliasing', 'checklist', 0) on conflict (id) do nothing;
insert into syllabus_items (id, level_id, title, item_type, order_index) values ('ece-signal-l3-i2', 'ece-signal-l3', 'Get your Placement Readiness Score from AI', 'checklist', 1) on conflict (id) do nothing;
insert into syllabus_levels (id, role_id, level_number, title, description) values ('ece-iot-l1', 'ece-iot', 1, 'IoT Foundations', 'Connected device basics') on conflict (id) do nothing;
insert into syllabus_items (id, level_id, title, item_type, order_index) values ('ece-iot-l1-i1', 'ece-iot-l1', 'Sensor interfacing, communication protocols (I2C/SPI/UART)', 'concept', 0) on conflict (id) do nothing;
insert into syllabus_items (id, level_id, title, item_type, order_index) values ('ece-iot-l1-i2', 'ece-iot-l1', 'Wireless protocols: WiFi, BLE, LoRa, MQTT', 'concept', 1) on conflict (id) do nothing;
insert into syllabus_levels (id, role_id, level_number, title, description) values ('ece-iot-l2', 'ece-iot', 2, 'IoT Systems', 'Building connected products') on conflict (id) do nothing;
insert into syllabus_items (id, level_id, title, item_type, order_index) values ('ece-iot-l2-i1', 'ece-iot-l2', 'Cloud integration for IoT (AWS IoT/Azure IoT)', 'checklist', 0) on conflict (id) do nothing;
insert into syllabus_items (id, level_id, title, item_type, order_index) values ('ece-iot-l2-i2', 'ece-iot-l2', 'Build 1 end-to-end IoT project', 'checklist', 1) on conflict (id) do nothing;
insert into syllabus_levels (id, role_id, level_number, title, description) values ('ece-iot-l3', 'ece-iot', 3, 'Placement Ready', 'Interview prep') on conflict (id) do nothing;
insert into syllabus_items (id, level_id, title, item_type, order_index) values ('ece-iot-l3-i1', 'ece-iot-l3', 'Mock interview: design an IoT system for smart agriculture', 'checklist', 0) on conflict (id) do nothing;
insert into syllabus_items (id, level_id, title, item_type, order_index) values ('ece-iot-l3-i2', 'ece-iot-l3', 'Get your Placement Readiness Score from AI', 'checklist', 1) on conflict (id) do nothing;
insert into syllabus_levels (id, role_id, level_number, title, description) values ('ece-rf-l1', 'ece-rf', 1, 'RF Foundations', 'Core RF concepts') on conflict (id) do nothing;
insert into syllabus_items (id, level_id, title, item_type, order_index) values ('ece-rf-l1-i1', 'ece-rf-l1', 'Transmission lines, impedance matching', 'concept', 0) on conflict (id) do nothing;
insert into syllabus_items (id, level_id, title, item_type, order_index) values ('ece-rf-l1-i2', 'ece-rf-l1', 'Antenna basics', 'concept', 1) on conflict (id) do nothing;
insert into syllabus_levels (id, role_id, level_number, title, description) values ('ece-rf-l2', 'ece-rf', 2, 'RF Circuit Design', 'Practical RF systems') on conflict (id) do nothing;
insert into syllabus_items (id, level_id, title, item_type, order_index) values ('ece-rf-l2-i1', 'ece-rf-l2', 'Amplifiers, mixers, filters at RF', 'concept', 0) on conflict (id) do nothing;
insert into syllabus_items (id, level_id, title, item_type, order_index) values ('ece-rf-l2-i2', 'ece-rf-l2', 'Simulate 1 RF circuit (ADS/AWR)', 'checklist', 1) on conflict (id) do nothing;
insert into syllabus_levels (id, role_id, level_number, title, description) values ('ece-rf-l3', 'ece-rf', 3, 'Placement Ready', 'Interview prep') on conflict (id) do nothing;
insert into syllabus_items (id, level_id, title, item_type, order_index) values ('ece-rf-l3-i1', 'ece-rf-l3', 'Mock interview: explain impedance matching and its importance', 'checklist', 0) on conflict (id) do nothing;
insert into syllabus_items (id, level_id, title, item_type, order_index) values ('ece-rf-l3-i2', 'ece-rf-l3', 'Get your Placement Readiness Score from AI', 'checklist', 1) on conflict (id) do nothing;
insert into hr_questions (role_id, category, company_type, question, guidance) values
  ('ece-vlsi', 'technical', 'core_company', 'Explain the difference between combinational and sequential circuits.', 'No memory/state vs clocked memory elements; examples of each.'),
  ('ece-vlsi', 'case_study', 'core_company', 'Design a Mealy vs Moore state machine for a simple sequence detector.', 'Output depends on state+input (Mealy) vs state only (Moore).'),
  ('ece-vlsi', 'technical', 'core_company', 'What is setup and hold time in digital circuits?', 'Timing constraints around the clock edge for reliable data capture.'),
  ('ece-vlsi', 'hr_behavioral', 'core_company', 'Tell me about a project where you debugged a timing violation.', 'Root cause and how you resolved it via design changes.'),
  ('ece-embedded', 'technical', 'core_company', 'Explain the difference between polling and interrupt-driven I/O.', 'CPU cycles wasted vs event-driven efficiency; use case tradeoffs.'),
  ('ece-embedded', 'case_study', 'core_company', 'How would you debug a system that randomly resets in the field?', 'Watchdog timers, brown-out detection, stack overflow, ESD issues.'),
  ('ece-embedded', 'technical', 'core_company', 'What is the difference between RAM and flash memory usage in embedded systems?', 'Volatile working memory vs non-volatile program/data storage.'),
  ('ece-embedded', 'hr_behavioral', 'core_company', 'Tell me about a hardware-software integration issue you solved.', 'Cross-layer debugging narrative.'),
  ('ece-signal', 'technical', 'core_company', 'Explain the Nyquist-Shannon sampling theorem.', 'Sample at least 2x the highest frequency to avoid aliasing.'),
  ('ece-signal', 'technical', 'core_company', 'What''s the difference between FIR and IIR filters?', 'Finite vs infinite impulse response; stability and phase tradeoffs.'),
  ('ece-signal', 'case_study', 'core_company', 'How would you remove noise from a sensor signal in real time?', 'Filter choice based on noise characteristics, latency constraints.'),
  ('ece-signal', 'hr_behavioral', 'core_company', 'Tell me about a signal processing project you worked on.', 'Problem, approach, and results.'),
  ('ece-iot', 'technical', 'core_company', 'Explain the difference between MQTT and HTTP for IoT communication.', 'Lightweight pub/sub vs request/response; power and bandwidth tradeoffs.'),
  ('ece-iot', 'case_study', 'core_company', 'How would you design a low-power IoT sensor network for agriculture?', 'Sleep cycles, LoRa/Zigbee choice, battery life, data aggregation.'),
  ('ece-iot', 'technical', 'core_company', 'What security considerations matter most for IoT devices?', 'Firmware updates, encrypted comms, device authentication.'),
  ('ece-iot', 'hr_behavioral', 'startup', 'Tell me about an IoT project where connectivity was unreliable — how did you handle it?', 'Buffering, retry logic, offline-first design.'),
  ('ece-rf', 'technical', 'core_company', 'Why is impedance matching important in RF circuits?', 'Maximizes power transfer, minimizes reflections (VSWR).'),
  ('ece-rf', 'technical', 'core_company', 'Explain the difference between near-field and far-field antenna regions.', 'Reactive vs radiating field behavior, distance boundaries.'),
  ('ece-rf', 'case_study', 'core_company', 'How would you troubleshoot a poor VSWR reading in an RF system?', 'Check connectors, cable damage, antenna tuning, matching network.'),
  ('ece-rf', 'hr_behavioral', 'core_company', 'Tell me about an RF project you''ve worked on.', 'Problem, design choices, testing/validation.');
insert into mock_interview_questions (role_id, question, ideal_answer_points, difficulty) values
  ('ece-vlsi', 'What is the difference between Verilog blocking and non-blocking assignments?', 'Blocking executes sequentially; non-blocking schedules updates concurrently — used for sequential logic.', 'easy'),
  ('ece-vlsi', 'Explain metastability and how it''s mitigated in digital design.', 'Occurs at clock domain crossings; mitigated with synchronizer flip-flop chains.', 'medium'),
  ('ece-vlsi', 'Design the RTL for a simple traffic light controller FSM.', 'States, transitions, timing, and reset behavior.', 'hard'),
  ('ece-embedded', 'What is a watchdog timer and why is it used?', 'Resets the system if firmware hangs; improves reliability.', 'easy'),
  ('ece-embedded', 'Explain the difference between a semaphore and a mutex in an RTOS.', 'Mutex has ownership for mutual exclusion; semaphore signals/counts resources.', 'medium'),
  ('ece-embedded', 'Design the firmware architecture for a battery-powered IoT sensor node.', 'Low-power modes, sleep/wake cycles, communication protocol choice.', 'hard'),
  ('ece-signal', 'What is aliasing and how is it prevented?', 'High-frequency signal misrepresented as lower frequency; prevented via anti-aliasing filter + adequate sampling rate.', 'easy'),
  ('ece-signal', 'Explain the difference between time-domain and frequency-domain analysis.', 'Signal amplitude over time vs frequency content via FFT.', 'medium'),
  ('ece-signal', 'Design a filter to remove 50/60Hz power line noise from an ECG signal.', 'Notch filter design, order selection, phase distortion considerations.', 'hard'),
  ('ece-iot', 'What is the difference between I2C and SPI?', 'I2C = 2-wire multi-master/multi-slave; SPI = faster, more wires, single master typically.', 'easy'),
  ('ece-iot', 'Explain edge computing in the context of IoT.', 'Processing data near the source to reduce latency/bandwidth vs cloud-only processing.', 'medium'),
  ('ece-iot', 'Design an IoT architecture for a smart home security system.', 'Sensors, local hub, cloud sync, alerting, offline fallback.', 'hard'),
  ('ece-rf', 'What is VSWR and what does a high value indicate?', 'Voltage Standing Wave Ratio; high value indicates impedance mismatch and reflected power.', 'easy'),
  ('ece-rf', 'Explain the Smith chart and its use in RF design.', 'Graphical tool for impedance matching and transmission line analysis.', 'medium'),
  ('ece-rf', 'Design an impedance matching network for a 50-ohm system connecting to a non-50-ohm antenna.', 'L-network/pi-network design, component selection, simulation validation.', 'hard');
insert into study_groups (name, description, branch_id) values
  ('VLSI Design Circle', 'RTL/verification study group', 'ece'),
  ('Embedded Systems Makers', 'Firmware and hardware project sharing', 'ece');
insert into community_events (title, type, branch_id, event_time) values
  ('Mock Interview Night — ECE Track', 'Live peer mock interviews with feedback', 'ece', now() + interval '7 days'),
  ('Signal Processing Workshop', 'DSP fundamentals and applications', 'ece', now() + interval '7 days');

-- ============ EEE ============

insert into syllabus_levels (id, role_id, level_number, title, description) values ('eee-power-l1', 'eee-power', 1, 'Power Systems Foundations', 'Core power concepts') on conflict (id) do nothing;
insert into syllabus_items (id, level_id, title, item_type, order_index) values ('eee-power-l1-i1', 'eee-power-l1', 'Generation, transmission, distribution basics', 'concept', 0) on conflict (id) do nothing;
insert into syllabus_items (id, level_id, title, item_type, order_index) values ('eee-power-l1-i2', 'eee-power-l1', 'Three-phase systems, per-unit calculations', 'concept', 1) on conflict (id) do nothing;
insert into syllabus_levels (id, role_id, level_number, title, description) values ('eee-power-l2', 'eee-power', 2, 'Protection & Stability', 'Keeping the grid safe') on conflict (id) do nothing;
insert into syllabus_items (id, level_id, title, item_type, order_index) values ('eee-power-l2-i1', 'eee-power-l2', 'Relays, circuit breakers, protection schemes', 'concept', 0) on conflict (id) do nothing;
insert into syllabus_items (id, level_id, title, item_type, order_index) values ('eee-power-l2-i2', 'eee-power-l2', 'Load flow analysis basics', 'checklist', 1) on conflict (id) do nothing;
insert into syllabus_levels (id, role_id, level_number, title, description) values ('eee-power-l3', 'eee-power', 3, 'Placement Ready', 'Interview prep') on conflict (id) do nothing;
insert into syllabus_items (id, level_id, title, item_type, order_index) values ('eee-power-l3-i1', 'eee-power-l3', 'Mock interview: explain grounding and protection systems', 'checklist', 0) on conflict (id) do nothing;
insert into syllabus_items (id, level_id, title, item_type, order_index) values ('eee-power-l3-i2', 'eee-power-l3', 'Get your Placement Readiness Score from AI', 'checklist', 1) on conflict (id) do nothing;
insert into syllabus_levels (id, role_id, level_number, title, description) values ('eee-control-l1', 'eee-control', 1, 'Control Theory Foundations', 'Core concepts') on conflict (id) do nothing;
insert into syllabus_items (id, level_id, title, item_type, order_index) values ('eee-control-l1-i1', 'eee-control-l1', 'Transfer functions, block diagrams', 'concept', 0) on conflict (id) do nothing;
insert into syllabus_items (id, level_id, title, item_type, order_index) values ('eee-control-l1-i2', 'eee-control-l1', 'PID control fundamentals', 'concept', 1) on conflict (id) do nothing;
insert into syllabus_levels (id, role_id, level_number, title, description) values ('eee-control-l2', 'eee-control', 2, 'Applied Control Systems', 'Real-world control') on conflict (id) do nothing;
insert into syllabus_items (id, level_id, title, item_type, order_index) values ('eee-control-l2-i1', 'eee-control-l2', 'PLC programming basics', 'checklist', 0) on conflict (id) do nothing;
insert into syllabus_items (id, level_id, title, item_type, order_index) values ('eee-control-l2-i2', 'eee-control-l2', 'Build 1 control system project (e.g., temperature control)', 'checklist', 1) on conflict (id) do nothing;
insert into syllabus_levels (id, role_id, level_number, title, description) values ('eee-control-l3', 'eee-control', 3, 'Placement Ready', 'Interview prep') on conflict (id) do nothing;
insert into syllabus_items (id, level_id, title, item_type, order_index) values ('eee-control-l3-i1', 'eee-control-l3', 'Mock interview: tune a PID controller scenario', 'checklist', 0) on conflict (id) do nothing;
insert into syllabus_items (id, level_id, title, item_type, order_index) values ('eee-control-l3-i2', 'eee-control-l3', 'Get your Placement Readiness Score from AI', 'checklist', 1) on conflict (id) do nothing;
insert into syllabus_levels (id, role_id, level_number, title, description) values ('eee-design-l1', 'eee-design', 1, 'Circuit Design Foundations', 'Core electrical design') on conflict (id) do nothing;
insert into syllabus_items (id, level_id, title, item_type, order_index) values ('eee-design-l1-i1', 'eee-design-l1', 'Circuit analysis, component selection', 'concept', 0) on conflict (id) do nothing;
insert into syllabus_items (id, level_id, title, item_type, order_index) values ('eee-design-l1-i2', 'eee-design-l1', 'PCB design basics', 'concept', 1) on conflict (id) do nothing;
insert into syllabus_levels (id, role_id, level_number, title, description) values ('eee-design-l2', 'eee-design', 2, 'Design Tools & Practice', 'Practical design skills') on conflict (id) do nothing;
insert into syllabus_items (id, level_id, title, item_type, order_index) values ('eee-design-l2-i1', 'eee-design-l2', 'CAD tools (AutoCAD Electrical/EPLAN)', 'checklist', 0) on conflict (id) do nothing;
insert into syllabus_items (id, level_id, title, item_type, order_index) values ('eee-design-l2-i2', 'eee-design-l2', 'Design 1 electrical panel/circuit end to end', 'checklist', 1) on conflict (id) do nothing;
insert into syllabus_levels (id, role_id, level_number, title, description) values ('eee-design-l3', 'eee-design', 3, 'Placement Ready', 'Interview prep') on conflict (id) do nothing;
insert into syllabus_items (id, level_id, title, item_type, order_index) values ('eee-design-l3-i1', 'eee-design-l3', 'Mock interview: walk through a circuit design decision', 'checklist', 0) on conflict (id) do nothing;
insert into syllabus_items (id, level_id, title, item_type, order_index) values ('eee-design-l3-i2', 'eee-design-l3', 'Get your Placement Readiness Score from AI', 'checklist', 1) on conflict (id) do nothing;
insert into syllabus_levels (id, role_id, level_number, title, description) values ('eee-renewable-l1', 'eee-renewable', 1, 'Renewable Energy Foundations', 'Core concepts') on conflict (id) do nothing;
insert into syllabus_items (id, level_id, title, item_type, order_index) values ('eee-renewable-l1-i1', 'eee-renewable-l1', 'Solar PV fundamentals, wind energy basics', 'concept', 0) on conflict (id) do nothing;
insert into syllabus_levels (id, role_id, level_number, title, description) values ('eee-renewable-l2', 'eee-renewable', 2, 'System Design', 'Practical renewable systems') on conflict (id) do nothing;
insert into syllabus_items (id, level_id, title, item_type, order_index) values ('eee-renewable-l2-i1', 'eee-renewable-l2', 'Inverter/charge controller sizing', 'checklist', 0) on conflict (id) do nothing;
insert into syllabus_items (id, level_id, title, item_type, order_index) values ('eee-renewable-l2-i2', 'eee-renewable-l2', 'Design 1 solar system for a given load', 'checklist', 1) on conflict (id) do nothing;
insert into syllabus_levels (id, role_id, level_number, title, description) values ('eee-renewable-l3', 'eee-renewable', 3, 'Placement Ready', 'Interview prep') on conflict (id) do nothing;
insert into syllabus_items (id, level_id, title, item_type, order_index) values ('eee-renewable-l3-i1', 'eee-renewable-l3', 'Mock interview: size a solar system for a household', 'checklist', 0) on conflict (id) do nothing;
insert into syllabus_items (id, level_id, title, item_type, order_index) values ('eee-renewable-l3-i2', 'eee-renewable-l3', 'Get your Placement Readiness Score from AI', 'checklist', 1) on conflict (id) do nothing;
insert into syllabus_levels (id, role_id, level_number, title, description) values ('eee-automation-l1', 'eee-automation', 1, 'Automation Foundations', 'Core concepts') on conflict (id) do nothing;
insert into syllabus_items (id, level_id, title, item_type, order_index) values ('eee-automation-l1-i1', 'eee-automation-l1', 'PLC/SCADA basics, ladder logic', 'concept', 0) on conflict (id) do nothing;
insert into syllabus_levels (id, role_id, level_number, title, description) values ('eee-automation-l2', 'eee-automation', 2, 'Industrial Automation', 'Applied automation') on conflict (id) do nothing;
insert into syllabus_items (id, level_id, title, item_type, order_index) values ('eee-automation-l2-i1', 'eee-automation-l2', 'Sensors, actuators, HMI basics', 'checklist', 0) on conflict (id) do nothing;
insert into syllabus_items (id, level_id, title, item_type, order_index) values ('eee-automation-l2-i2', 'eee-automation-l2', 'Build 1 automation project (ladder logic simulation)', 'checklist', 1) on conflict (id) do nothing;
insert into syllabus_levels (id, role_id, level_number, title, description) values ('eee-automation-l3', 'eee-automation', 3, 'Placement Ready', 'Interview prep') on conflict (id) do nothing;
insert into syllabus_items (id, level_id, title, item_type, order_index) values ('eee-automation-l3-i1', 'eee-automation-l3', 'Mock interview: design a ladder logic for a conveyor system', 'checklist', 0) on conflict (id) do nothing;
insert into syllabus_items (id, level_id, title, item_type, order_index) values ('eee-automation-l3-i2', 'eee-automation-l3', 'Get your Placement Readiness Score from AI', 'checklist', 1) on conflict (id) do nothing;
insert into hr_questions (role_id, category, company_type, question, guidance) values
  ('eee-power', 'technical', 'core_company', 'Explain the difference between star and delta connections.', 'Line vs phase voltage/current relationships, use cases.'),
  ('eee-power', 'technical', 'core_company', 'How does a circuit breaker differ from a fuse?', 'Breaker is resettable and can be remotely operated; fuse is one-time sacrificial.'),
  ('eee-power', 'case_study', 'core_company', 'How would you diagnose a transformer overheating issue?', 'Load analysis, cooling system check, insulation testing.'),
  ('eee-power', 'hr_behavioral', 'core_company', 'Tell me about a time you worked on a power systems project or internship.', 'Concrete technical contribution and outcome.'),
  ('eee-control', 'technical', 'core_company', 'Explain how a PID controller works.', 'Proportional, Integral, Derivative terms and what each corrects for.'),
  ('eee-control', 'case_study', 'core_company', 'How would you tune a PID controller that''s oscillating?', 'Reduce proportional/derivative gain, use Ziegler-Nichols method.'),
  ('eee-control', 'technical', 'core_company', 'What''s the difference between open-loop and closed-loop control?', 'Feedback presence; closed-loop corrects for disturbances.'),
  ('eee-control', 'hr_behavioral', 'core_company', 'Tell me about a PLC or control systems project you''ve built.', 'Design decisions and testing process.'),
  ('eee-design', 'technical', 'core_company', 'How do you select the right wire gauge for a given load current?', 'Ampacity tables, derating factors, voltage drop considerations.'),
  ('eee-design', 'technical', 'core_company', 'Explain the purpose of a single-line diagram in electrical design.', 'Simplified representation of the electrical system for planning/protection design.'),
  ('eee-design', 'case_study', 'core_company', 'How would you approach designing a control panel for an industrial machine?', 'Load calculation, component sizing, safety standards compliance.'),
  ('eee-design', 'hr_behavioral', 'core_company', 'Tell me about a design project where you had to balance cost and safety.', 'Tradeoff reasoning and final decision.'),
  ('eee-renewable', 'case_study', 'core_company', 'How would you size a solar PV system for a given household load?', 'Load calculation, panel wattage, battery backup sizing, inverter rating.'),
  ('eee-renewable', 'technical', 'core_company', 'Explain the difference between on-grid and off-grid solar systems.', 'Grid-tied with net metering vs standalone with battery storage.'),
  ('eee-renewable', 'technical', 'core_company', 'What factors affect solar panel efficiency?', 'Temperature, shading, tilt angle, dust/soiling.'),
  ('eee-renewable', 'hr_behavioral', 'core_company', 'Tell me about a renewable energy project you''ve worked on.', 'Design process and measured outcomes.'),
  ('eee-automation', 'technical', 'core_company', 'Explain ladder logic and how a PLC scans it.', 'Rungs represent logic; PLC scans input-logic-output cyclically.'),
  ('eee-automation', 'case_study', 'core_company', 'How would you design an automated system for a conveyor belt with safety interlocks?', 'Sensors for jam detection, emergency stop, interlocked start conditions.'),
  ('eee-automation', 'technical', 'core_company', 'What''s the difference between SCADA and a PLC?', 'SCADA is supervisory/monitoring across systems; PLC executes local control logic.'),
  ('eee-automation', 'hr_behavioral', 'core_company', 'Tell me about an automation project you''ve built or worked on.', 'Design decisions and results.');
insert into mock_interview_questions (role_id, question, ideal_answer_points, difficulty) values
  ('eee-power', 'What is per-unit system and why is it used in power system analysis?', 'Normalizes quantities relative to a base, simplifies calculations across transformers.', 'easy'),
  ('eee-power', 'Explain the difference between real power, reactive power, and apparent power.', 'P (working), Q (non-working, reactive), S (vector sum); power factor relationship.', 'medium'),
  ('eee-power', 'Design a protection scheme for a distribution feeder against overcurrent faults.', 'Relay coordination, breaker selection, time-current curves.', 'hard'),
  ('eee-control', 'What is system stability, and how do poles determine it?', 'Poles in the left half-plane (continuous) mean a stable system.', 'easy'),
  ('eee-control', 'Explain the difference between feedback and feedforward control.', 'Feedback reacts to error; feedforward anticipates disturbances proactively.', 'medium'),
  ('eee-control', 'Design a control system for maintaining constant temperature in an industrial oven.', 'Sensor choice, actuator, PID tuning, safety interlocks.', 'hard'),
  ('eee-design', 'What is the difference between AC and DC circuit analysis?', 'Phasor/frequency-domain analysis vs steady-state resistive analysis.', 'easy'),
  ('eee-design', 'Explain grounding and its importance in electrical design.', 'Safety, fault current path, equipment protection.', 'medium'),
  ('eee-design', 'Design the electrical layout for a small manufacturing unit''s power distribution.', 'Load calculation, panel sizing, cable routing, protection devices.', 'hard'),
  ('eee-renewable', 'What is the difference between a string inverter and a microinverter?', 'Central conversion for a panel string vs per-panel conversion; shading tolerance differs.', 'easy'),
  ('eee-renewable', 'Explain Maximum Power Point Tracking (MPPT).', 'Algorithm to extract maximum available power from a solar panel under varying conditions.', 'medium'),
  ('eee-renewable', 'Design a hybrid solar-grid system for a facility needing backup power.', 'Sizing, transfer switch logic, battery backup, grid interconnection compliance.', 'hard'),
  ('eee-automation', 'What is the difference between analog and digital I/O in PLCs?', 'Continuous signal range vs on/off states.', 'easy'),
  ('eee-automation', 'Explain the purpose of an HMI in an automated system.', 'Human-machine interface for monitoring/control by operators.', 'medium'),
  ('eee-automation', 'Design a PLC-based control system for a bottle-filling production line.', 'Sensor placement, sequencing logic, fault handling, safety stops.', 'hard');
insert into study_groups (name, description, branch_id) values
  ('Power Systems Study Group', 'Grid, generation, protection topics', 'eee'),
  ('Control Systems Circle', 'PID, PLC, automation discussions', 'eee');
insert into community_events (title, type, branch_id, event_time) values
  ('Mock Interview Night — EEE Track', 'Live peer mock interviews with feedback', 'eee', now() + interval '7 days'),
  ('PLC & Automation Workshop', 'Hands-on industrial automation basics', 'eee', now() + interval '7 days');

-- ============ MECH ============

insert into syllabus_levels (id, role_id, level_number, title, description) values ('mech-robotics-l1', 'mech-robotics', 1, 'Robotics Foundations', 'Core concepts') on conflict (id) do nothing;
insert into syllabus_items (id, level_id, title, item_type, order_index) values ('mech-robotics-l1-i1', 'mech-robotics-l1', 'Kinematics, dynamics basics', 'concept', 0) on conflict (id) do nothing;
insert into syllabus_items (id, level_id, title, item_type, order_index) values ('mech-robotics-l1-i2', 'mech-robotics-l1', 'Sensors and actuators for robotics', 'concept', 1) on conflict (id) do nothing;
insert into syllabus_levels (id, role_id, level_number, title, description) values ('mech-robotics-l2', 'mech-robotics', 2, 'Robot Control & Programming', 'Building robots') on conflict (id) do nothing;
insert into syllabus_items (id, level_id, title, item_type, order_index) values ('mech-robotics-l2-i1', 'mech-robotics-l2', 'ROS basics', 'checklist', 0) on conflict (id) do nothing;
insert into syllabus_items (id, level_id, title, item_type, order_index) values ('mech-robotics-l2-i2', 'mech-robotics-l2', 'Build 1 robotics project end to end', 'checklist', 1) on conflict (id) do nothing;
insert into syllabus_levels (id, role_id, level_number, title, description) values ('mech-robotics-l3', 'mech-robotics', 3, 'Placement Ready', 'Interview prep') on conflict (id) do nothing;
insert into syllabus_items (id, level_id, title, item_type, order_index) values ('mech-robotics-l3-i1', 'mech-robotics-l3', 'Mock interview: explain forward vs inverse kinematics', 'checklist', 0) on conflict (id) do nothing;
insert into syllabus_items (id, level_id, title, item_type, order_index) values ('mech-robotics-l3-i2', 'mech-robotics-l3', 'Get your Placement Readiness Score from AI', 'checklist', 1) on conflict (id) do nothing;
insert into syllabus_levels (id, role_id, level_number, title, description) values ('mech-automation-l1', 'mech-automation', 1, 'Automation Foundations', 'Core concepts') on conflict (id) do nothing;
insert into syllabus_items (id, level_id, title, item_type, order_index) values ('mech-automation-l1-i1', 'mech-automation-l1', 'PLC/SCADA fundamentals', 'concept', 0) on conflict (id) do nothing;
insert into syllabus_items (id, level_id, title, item_type, order_index) values ('mech-automation-l1-i2', 'mech-automation-l1', 'Pneumatics/hydraulics basics', 'concept', 1) on conflict (id) do nothing;
insert into syllabus_levels (id, role_id, level_number, title, description) values ('mech-automation-l2', 'mech-automation', 2, 'Industrial Automation Systems', 'Applied automation') on conflict (id) do nothing;
insert into syllabus_items (id, level_id, title, item_type, order_index) values ('mech-automation-l2-i1', 'mech-automation-l2', 'Sensor/actuator integration', 'checklist', 0) on conflict (id) do nothing;
insert into syllabus_items (id, level_id, title, item_type, order_index) values ('mech-automation-l2-i2', 'mech-automation-l2', 'Build 1 automated system simulation', 'checklist', 1) on conflict (id) do nothing;
insert into syllabus_levels (id, role_id, level_number, title, description) values ('mech-automation-l3', 'mech-automation', 3, 'Placement Ready', 'Interview prep') on conflict (id) do nothing;
insert into syllabus_items (id, level_id, title, item_type, order_index) values ('mech-automation-l3-i1', 'mech-automation-l3', 'Mock interview: design an automated packaging line', 'checklist', 0) on conflict (id) do nothing;
insert into syllabus_items (id, level_id, title, item_type, order_index) values ('mech-automation-l3-i2', 'mech-automation-l3', 'Get your Placement Readiness Score from AI', 'checklist', 1) on conflict (id) do nothing;
insert into syllabus_levels (id, role_id, level_number, title, description) values ('mech-control-l1', 'mech-control', 1, 'Control Foundations', 'Core theory') on conflict (id) do nothing;
insert into syllabus_items (id, level_id, title, item_type, order_index) values ('mech-control-l1-i1', 'mech-control-l1', 'Transfer functions, PID basics', 'concept', 0) on conflict (id) do nothing;
insert into syllabus_levels (id, role_id, level_number, title, description) values ('mech-control-l2', 'mech-control', 2, 'Applied Mechatronic Control', 'Sensors and actuators') on conflict (id) do nothing;
insert into syllabus_items (id, level_id, title, item_type, order_index) values ('mech-control-l2-i1', 'mech-control-l2', 'Sensor fusion basics, actuator control', 'checklist', 0) on conflict (id) do nothing;
insert into syllabus_items (id, level_id, title, item_type, order_index) values ('mech-control-l2-i2', 'mech-control-l2', 'Build 1 control loop project', 'checklist', 1) on conflict (id) do nothing;
insert into syllabus_levels (id, role_id, level_number, title, description) values ('mech-control-l3', 'mech-control', 3, 'Placement Ready', 'Interview prep') on conflict (id) do nothing;
insert into syllabus_items (id, level_id, title, item_type, order_index) values ('mech-control-l3-i1', 'mech-control-l3', 'Mock interview: explain a feedback control loop for a motor', 'checklist', 0) on conflict (id) do nothing;
insert into syllabus_items (id, level_id, title, item_type, order_index) values ('mech-control-l3-i2', 'mech-control-l3', 'Get your Placement Readiness Score from AI', 'checklist', 1) on conflict (id) do nothing;
insert into syllabus_levels (id, role_id, level_number, title, description) values ('mech-cad-l1', 'mech-cad', 1, 'CAD Foundations', 'Core design skills') on conflict (id) do nothing;
insert into syllabus_items (id, level_id, title, item_type, order_index) values ('mech-cad-l1-i1', 'mech-cad-l1', 'SolidWorks/AutoCAD fundamentals', 'concept', 0) on conflict (id) do nothing;
insert into syllabus_items (id, level_id, title, item_type, order_index) values ('mech-cad-l1-i2', 'mech-cad-l1', 'GD&T basics', 'concept', 1) on conflict (id) do nothing;
insert into syllabus_levels (id, role_id, level_number, title, description) values ('mech-cad-l2', 'mech-cad', 2, 'Design & Simulation', 'Practical design work') on conflict (id) do nothing;
insert into syllabus_items (id, level_id, title, item_type, order_index) values ('mech-cad-l2-i1', 'mech-cad-l2', 'FEA/simulation basics', 'checklist', 0) on conflict (id) do nothing;
insert into syllabus_items (id, level_id, title, item_type, order_index) values ('mech-cad-l2-i2', 'mech-cad-l2', 'Design 1 mechanical assembly end to end', 'checklist', 1) on conflict (id) do nothing;
insert into syllabus_levels (id, role_id, level_number, title, description) values ('mech-cad-l3', 'mech-cad', 3, 'Placement Ready', 'Interview prep') on conflict (id) do nothing;
insert into syllabus_items (id, level_id, title, item_type, order_index) values ('mech-cad-l3-i1', 'mech-cad-l3', 'Mock interview: walk through a design decision in your CAD project', 'checklist', 0) on conflict (id) do nothing;
insert into syllabus_items (id, level_id, title, item_type, order_index) values ('mech-cad-l3-i2', 'mech-cad-l3', 'Get your Placement Readiness Score from AI', 'checklist', 1) on conflict (id) do nothing;
insert into syllabus_levels (id, role_id, level_number, title, description) values ('mech-iiot-l1', 'mech-iiot', 1, 'Industrial IoT Foundations', 'Core concepts') on conflict (id) do nothing;
insert into syllabus_items (id, level_id, title, item_type, order_index) values ('mech-iiot-l1-i1', 'mech-iiot-l1', 'Sensor networks, industrial protocols (Modbus/OPC-UA)', 'concept', 0) on conflict (id) do nothing;
insert into syllabus_levels (id, role_id, level_number, title, description) values ('mech-iiot-l2', 'mech-iiot', 2, 'Smart Factory Systems', 'Applied IIoT') on conflict (id) do nothing;
insert into syllabus_items (id, level_id, title, item_type, order_index) values ('mech-iiot-l2-i1', 'mech-iiot-l2', 'Edge computing basics for factories', 'checklist', 0) on conflict (id) do nothing;
insert into syllabus_items (id, level_id, title, item_type, order_index) values ('mech-iiot-l2-i2', 'mech-iiot-l2', 'Build 1 IIoT monitoring project', 'checklist', 1) on conflict (id) do nothing;
insert into syllabus_levels (id, role_id, level_number, title, description) values ('mech-iiot-l3', 'mech-iiot', 3, 'Placement Ready', 'Interview prep') on conflict (id) do nothing;
insert into syllabus_items (id, level_id, title, item_type, order_index) values ('mech-iiot-l3-i1', 'mech-iiot-l3', 'Mock interview: design a predictive maintenance system', 'checklist', 0) on conflict (id) do nothing;
insert into syllabus_items (id, level_id, title, item_type, order_index) values ('mech-iiot-l3-i2', 'mech-iiot-l3', 'Get your Placement Readiness Score from AI', 'checklist', 1) on conflict (id) do nothing;
insert into hr_questions (role_id, category, company_type, question, guidance) values
  ('mech-robotics', 'technical', 'core_company', 'Explain the difference between forward and inverse kinematics.', 'Forward: joint angles to end position; inverse: desired position to required joint angles.'),
  ('mech-robotics', 'case_study', 'core_company', 'How would you design a robotic arm to pick and place objects of varying sizes?', 'Gripper design, sensor feedback, path planning.'),
  ('mech-robotics', 'technical', 'core_company', 'What''s the difference between open-loop and closed-loop robotic control?', 'Feedback usage for correcting position/force errors.'),
  ('mech-robotics', 'hr_behavioral', 'core_company', 'Tell me about a robotics project you''ve built.', 'Design process, challenges, and results.'),
  ('mech-automation', 'case_study', 'core_company', 'How would you design an automated packaging line for varying product sizes?', 'Adjustable fixtures, sensor detection, PLC sequencing.'),
  ('mech-automation', 'technical', 'core_company', 'Explain the difference between pneumatic and hydraulic actuation.', 'Compressed air vs fluid pressure; force, speed, and precision tradeoffs.'),
  ('mech-automation', 'technical', 'core_company', 'What safety systems would you include in an automated production line?', 'E-stops, light curtains, interlocked guards.'),
  ('mech-automation', 'hr_behavioral', 'core_company', 'Tell me about an automation project you''ve worked on.', 'Design decisions and measurable results.'),
  ('mech-control', 'technical', 'core_company', 'Explain how a feedback control loop works for controlling motor speed.', 'Encoder feedback, error calculation, PID correction to actuator.'),
  ('mech-control', 'case_study', 'core_company', 'How would you diagnose oscillation in a mechatronic control system?', 'Check gain tuning, sensor noise, mechanical backlash.'),
  ('mech-control', 'technical', 'core_company', 'What''s the difference between a stepper motor and a servo motor?', 'Open-loop discrete steps vs closed-loop continuous feedback control.'),
  ('mech-control', 'hr_behavioral', 'core_company', 'Tell me about a control systems project you''ve built.', 'Design and testing narrative.'),
  ('mech-cad', 'case_study', 'core_company', 'Walk me through your design process for a mechanical component.', 'Requirements, material selection, tolerancing, simulation validation.'),
  ('mech-cad', 'technical', 'core_company', 'What is GD&T and why is it important in manufacturing?', 'Geometric Dimensioning & Tolerancing communicates allowable variation precisely.'),
  ('mech-cad', 'technical', 'core_company', 'How would you use FEA to validate a part design?', 'Load application, mesh quality, stress/deflection interpretation.'),
  ('mech-cad', 'hr_behavioral', 'core_company', 'Tell me about a design that failed testing and how you fixed it.', 'Root cause and redesign process.'),
  ('mech-iiot', 'case_study', 'core_company', 'How would you design a predictive maintenance system for factory equipment?', 'Vibration/temperature sensors, threshold/ML-based anomaly detection, alerting.'),
  ('mech-iiot', 'technical', 'core_company', 'Explain the difference between Modbus and OPC-UA.', 'Simple legacy protocol vs modern, secure, semantic industrial protocol.'),
  ('mech-iiot', 'technical', 'core_company', 'What''s the benefit of edge computing in an industrial IoT setup?', 'Reduces latency and bandwidth by processing data near the sensor.'),
  ('mech-iiot', 'hr_behavioral', 'core_company', 'Tell me about an IIoT or smart-factory project you''ve worked on.', 'Design process and measurable impact.');
insert into mock_interview_questions (role_id, question, ideal_answer_points, difficulty) values
  ('mech-robotics', 'What sensors would you use for obstacle avoidance in a mobile robot?', 'Ultrasonic, LiDAR, infrared — tradeoffs in range/precision/cost.', 'easy'),
  ('mech-robotics', 'Explain the difference between a serial and parallel robot manipulator.', 'Sequential joint chain vs multiple chains connecting to end effector; rigidity/workspace tradeoffs.', 'medium'),
  ('mech-robotics', 'Design a path-planning approach for a warehouse delivery robot.', 'Mapping (SLAM), obstacle avoidance, path optimization, dynamic replanning.', 'hard'),
  ('mech-automation', 'What''s the difference between a proximity sensor and a photoelectric sensor?', 'Detects nearby metal objects without contact vs detects objects via light beam interruption.', 'easy'),
  ('mech-automation', 'Explain the role of a PLC scan cycle in real-time control.', 'Continuous input-read, logic-execute, output-write cycle determines response time.', 'medium'),
  ('mech-automation', 'Design an automated quality-inspection station using sensors and a PLC.', 'Sensor selection, reject mechanism, PLC logic, throughput considerations.', 'hard'),
  ('mech-control', 'What is sensor fusion and why is it used?', 'Combining multiple sensor inputs for more accurate/robust state estimation.', 'easy'),
  ('mech-control', 'Explain the difference between position control and force control.', 'Position control targets a location; force control targets applied force/torque, important in contact tasks.', 'medium'),
  ('mech-control', 'Design a control system for a robotic gripper that avoids crushing fragile objects.', 'Force sensing feedback, compliant control, threshold-based limits.', 'hard'),
  ('mech-cad', 'What''s the difference between a first-angle and third-angle projection?', 'Different conventions for placing orthographic views relative to the object; regional standard differences.', 'easy'),
  ('mech-cad', 'Explain the purpose of tolerance stack-up analysis.', 'Ensures assembly of parts with individual tolerances still fits/functions correctly.', 'medium'),
  ('mech-cad', 'Design an assembly for a simple gear-driven mechanism, considering manufacturability.', 'Material choice, gear ratio, tolerances, assembly sequence.', 'hard'),
  ('mech-iiot', 'What is OEE (Overall Equipment Effectiveness) and how is it measured?', 'Availability x Performance x Quality — a key manufacturing KPI.', 'easy'),
  ('mech-iiot', 'Explain how vibration analysis is used for predictive maintenance.', 'Detects bearing wear/misalignment before failure via frequency signature changes.', 'medium'),
  ('mech-iiot', 'Design a data pipeline connecting factory floor sensors to a cloud dashboard.', 'Edge gateway, protocol translation, cloud ingestion, dashboarding, alerting.', 'hard');
insert into study_groups (name, description, branch_id) values
  ('Robotics Builders Circle', 'Robot design and kinematics discussion', 'mech'),
  ('Automation & PLC Study Group', 'Industrial automation practice', 'mech');
insert into community_events (title, type, branch_id, event_time) values
  ('Mock Interview Night — Mechatronics Track', 'Live peer mock interviews with feedback', 'mech', now() + interval '7 days'),
  ('Robotics Design Workshop', 'Hands-on robot design fundamentals', 'mech', now() + interval '7 days');

