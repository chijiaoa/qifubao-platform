-- Run this SQL in your Supabase SQL Editor to create the necessary tables

-- Profiles table (extends auth.users)
create table if not exists public.profiles (
  id uuid references auth.users not null primary key,
  email text,
  role text check (role in ('user', 'agent', 'admin')) default 'user',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security (RLS)
alter table public.profiles enable row level security;

-- Policies for profiles
create policy "Public profiles are viewable by everyone." on profiles for select using (true);
create policy "Users can insert their own profile." on profiles for insert with check (auth.uid() = id);
create policy "Users can update own profile." on profiles for update using (auth.uid() = id);

-- Orders table
create table if not exists public.orders (
  id uuid default gen_random_uuid() primary key,
  company_name text not null,
  type text not null,
  status text check (status in ('pending', 'processing', 'completed', 'error')) default 'pending',
  amount numeric not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  agent_id uuid references public.profiles(id),
  applicant_id uuid references public.profiles(id) not null
);

-- Enable RLS for orders
alter table public.orders enable row level security;

-- Policies for orders (users see their own, agents see all pending/processing, admins see all)
create policy "Users can view their own orders." on orders for select using (auth.uid() = applicant_id);
create policy "Agents can view pending orders." on orders for select using (status = 'pending' or agent_id = auth.uid());
create policy "Users can create orders." on orders for insert with check (auth.uid() = applicant_id);
create policy "Agents can update assigned orders." on orders for update using (agent_id = auth.uid());
create policy "Admins can do anything on orders." on orders for all using (
  exists (select 1 from profiles where id = auth.uid() and role = 'admin')
);

-- Messages table
create table if not exists public.messages (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  content text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  type text check (type in ('info', 'warning', 'success')) default 'info',
  unread boolean default true,
  user_id uuid references public.profiles(id) -- The recipient
);

-- Enable RLS for messages
alter table public.messages enable row level security;

-- Policies for messages
create policy "Users can view their own messages." on messages for select using (auth.uid() = user_id);
create policy "Users can update their own messages (mark as read)." on messages for update using (auth.uid() = user_id);

-- Audit Logs table
create table if not exists public.audit_logs (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id),
  action text not null,
  module text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  ip text,
  priority text check (priority in ('low', 'medium', 'high')) default 'low'
);

-- Enable RLS for audit_logs
alter table public.audit_logs enable row level security;

-- Policies for audit_logs (only admins can view)
create policy "Admins can view audit logs." on audit_logs for select using (
  exists (select 1 from profiles where id = auth.uid() and role = 'admin')
);
create policy "System can insert audit logs." on audit_logs for insert with check (true);

-- Trigger to automatically create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, role)
  values (new.id, new.email, 'user');
  return new;
end;
$$ language plpgsql security definer;

-- Create trigger (drop first if exists to avoid duplicates)
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
