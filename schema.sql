-- Run this in Supabase SQL Editor (Project > SQL Editor > New query)

create table students (
  id bigint generated always as identity primary key,
  student_id text not null unique,
  full_name text not null,
  program text not null,
  year_level text not null,
  email text not null,
  created_at timestamp with time zone default now()
);

-- Enable Row Level Security, then allow public access for this lab exercise.
-- (Fine for a class lab; a real system would use proper auth policies.)
alter table students enable row level security;

create policy "Allow all access for lab"
on students
for all
using (true)
with check (true);
