-- 001_schema.sql
-- Core schema for PustYoga app

create extension if not exists "uuid-ossp";

-- Core poses table
create table poses (
  id                uuid primary key default gen_random_uuid(),
  slug              text not null unique,
  name_no           text not null,
  name_en           text not null,
  category          text not null check (category in ('SEAT','SPINE','WINGS','REBOUND')),
  archetype         text not null,
  function_desc     text,
  muscle_groups     text[] not null default '{}',
  meridian_tension  text[] default '{}',
  meridian_compress text[] default '{}',
  intensity_label   text not null,
  intensity_level   smallint not null check (intensity_level between 1 and 6),
  duration_min_sec  integer not null,
  duration_max_sec  integer not null,
  notes             text,
  is_active         boolean not null default true,
  sort_order        integer,
  created_at        timestamptz default now()
);

create index on poses using gin(muscle_groups);
create index on poses (category);
create index on poses (intensity_level);

-- Pose variants (detailed instructions per variant/pose)
create table pose_variants (
  id                uuid primary key default gen_random_uuid(),
  pose_id           uuid not null references poses(id) on delete cascade,
  slug              text not null unique,
  name_no           text not null,
  name_en           text not null,
  is_canonical      boolean not null default false,
  instruksjon       text[] not null default '{}',
  tilpasning        text,
  kontraindikasjon  text,
  myofascial        text,
  sort_order        integer,
  created_at        timestamptz default now()
);

create index on pose_variants (pose_id);
create index on pose_variants (is_canonical);

-- Media assets (images, audio, future video)
create table pose_media (
  id            uuid primary key default gen_random_uuid(),
  variant_id    uuid references pose_variants(id) on delete cascade,
  pose_id       uuid references poses(id) on delete cascade,
  media_type    text not null check (media_type in ('image','audio','video')),
  storage_path  text not null,
  public_url    text,
  language      text default 'no',
  duration_sec  integer,
  mime_type     text,
  sort_order    integer default 0,
  created_at    timestamptz default now(),
  constraint media_has_target check (variant_id is not null or pose_id is not null)
);

create index on pose_media (pose_id, media_type);
create index on pose_media (variant_id, media_type);

-- User profiles (extends auth.users)
create table user_profiles (
  id                      uuid primary key references auth.users(id) on delete cascade,
  display_name            text,
  subscription_status     text not null default 'free'
    check (subscription_status in ('free','active','past_due','canceled','trialing')),
  stripe_customer_id      text unique,
  stripe_payment_intent_id text unique,
  subscription_period_end timestamptz,
  created_at              timestamptz default now(),
  updated_at              timestamptz default now()
);

-- Workout sessions (history + analytics)
create table workout_sessions (
  id                uuid primary key default gen_random_uuid(),
  user_id           uuid references auth.users(id) on delete set null,
  total_minutes     integer not null,
  warmup_minutes    integer not null,
  main_minutes      integer not null,
  cooldown_minutes  integer not null,
  muscle_focus      text,
  workout_data      jsonb,
  generated_at      timestamptz default now()
);

create index on workout_sessions (user_id);

-- Trigger: auto-create user_profiles on signup
create or replace function handle_new_user()
returns trigger as $$
begin
  insert into public.user_profiles (id, display_name)
  values (new.id, new.raw_user_meta_data->>'full_name');
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure handle_new_user();
