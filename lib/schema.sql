-- Create a table for storing threads
create table threads (
  id uuid default gen_random_uuid() primary key,
  user_id text not null,
  title text,
  content jsonb not null, -- Store tweet content and image URLs as JSON
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security (RLS)
alter table threads enable row level security;

-- Create RLS policy for threads table
create policy "Users can manage their own threads"
  on threads
  for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);



-- Function to automatically set updated_at on row update
create or replace function set_updated_at()
  returns trigger as $$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$$ language plpgsql;

-- Trigger to call set_updated_at() on row update
create trigger threads_set_updated_at
  before update on threads
  for each row
  execute function set_updated_at();