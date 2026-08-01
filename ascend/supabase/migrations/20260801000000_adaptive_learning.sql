-- Adaptive learning extension for the existing AI Career OS schema.
-- Apply this after supabase_setup.sql and combined_setup.sql in Supabase.
-- It intentionally uses public.profiles (the app's existing profile table).

alter table public.questions
  add column if not exists status text not null default 'approved'
    check (status in ('pending', 'approved', 'rejected')),
  add column if not exists tags text[] not null default '{}',
  add column if not exists quality_score numeric(3,2) not null default 1
    check (quality_score >= 0 and quality_score <= 1);

create index if not exists idx_questions_adaptive_selection
  on public.questions (topic_id, difficulty, status);

create table if not exists public.user_topic_mastery (
  user_id uuid not null references public.profiles(id) on delete cascade,
  topic_id uuid not null references public.topics(id) on delete cascade,
  mastery numeric(4,3) not null default 0 check (mastery >= 0 and mastery <= 1),
  current_difficulty text not null default 'easy'
    check (current_difficulty in ('easy', 'medium', 'hard')),
  correct_streak integer not null default 0 check (correct_streak >= 0),
  wrong_streak integer not null default 0 check (wrong_streak >= 0),
  last_practiced_at timestamptz,
  updated_at timestamptz not null default now(),
  primary key (user_id, topic_id)
);

create table if not exists public.daily_quiz_sets (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  quiz_date date not null,
  question_ids uuid[] not null default '{}',
  submitted boolean not null default false,
  score integer check (score >= 0),
  generated_at timestamptz not null default now(),
  unique (user_id, quiz_date)
);

create table if not exists public.daily_quiz_attempts (
  id uuid primary key default gen_random_uuid(),
  daily_quiz_id uuid not null references public.daily_quiz_sets(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  question_id uuid not null references public.questions(id) on delete cascade,
  topic_id uuid references public.topics(id) on delete set null,
  given_answer text,
  is_correct boolean not null,
  time_taken_seconds integer check (time_taken_seconds >= 0),
  attempted_at timestamptz not null default now(),
  unique (daily_quiz_id, question_id)
);

create index if not exists idx_daily_quiz_sets_user_date
  on public.daily_quiz_sets (user_id, quiz_date desc);
create index if not exists idx_daily_quiz_attempts_user_topic
  on public.daily_quiz_attempts (user_id, topic_id);

alter table public.user_topic_mastery enable row level security;
alter table public.daily_quiz_sets enable row level security;
alter table public.daily_quiz_attempts enable row level security;

do $$
begin
  if not exists (select 1 from pg_policies where schemaname = 'public' and tablename = 'user_topic_mastery' and policyname = 'Users manage their own topic mastery') then
    create policy "Users manage their own topic mastery" on public.user_topic_mastery for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
  end if;
  if not exists (select 1 from pg_policies where schemaname = 'public' and tablename = 'daily_quiz_sets' and policyname = 'Users manage their own daily quizzes') then
    create policy "Users manage their own daily quizzes" on public.daily_quiz_sets for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
  end if;
  if not exists (select 1 from pg_policies where schemaname = 'public' and tablename = 'daily_quiz_attempts' and policyname = 'Users manage their own daily quiz attempts') then
    create policy "Users manage their own daily quiz attempts" on public.daily_quiz_attempts for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
  end if;
end $$;
