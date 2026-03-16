-- 002_rls.sql
-- Row Level Security policies

alter table poses enable row level security;
alter table pose_variants enable row level security;
alter table pose_media enable row level security;
alter table user_profiles enable row level security;
alter table workout_sessions enable row level security;

-- Poses: public read (everyone can see pose list)
create policy "poses_public_read"
  on poses for select using (true);

-- Pose variants: public read
create policy "variants_public_read"
  on pose_variants for select using (true);

-- Pose media: authenticated users only
-- Audio gating is enforced in the API route (subscription check)
-- RLS prevents direct DB access by unauthenticated users
create policy "media_authenticated_read"
  on pose_media for select
  using (auth.uid() is not null);

-- User profiles: owner only
create policy "profiles_select_own"
  on user_profiles for select
  using (auth.uid() = id);

create policy "profiles_update_own"
  on user_profiles for update
  using (auth.uid() = id);

-- Workout sessions: owner only
create policy "sessions_select_own"
  on workout_sessions for select
  using (auth.uid() = user_id);

create policy "sessions_insert_own"
  on workout_sessions for insert
  with check (auth.uid() = user_id);
