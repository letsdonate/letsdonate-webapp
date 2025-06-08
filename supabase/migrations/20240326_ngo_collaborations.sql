-- Create the ngo_collaborations table
create table if not exists public.ngo_collaborations (
    id uuid default gen_random_uuid() primary key,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    name text not null,
    email text not null,
    phone text not null,
    organization text not null,
    role text,
    website text,
    message text,
    status text default 'pending' not null,
    reviewed_at timestamp with time zone,
    reviewed_by uuid references auth.users(id)
);

-- Set up Row Level Security (RLS)
alter table public.ngo_collaborations enable row level security;

-- Create policies
create policy "Enable read access for authenticated users" on public.ngo_collaborations
    for select using (auth.role() = 'authenticated');

create policy "Enable insert access for all users" on public.ngo_collaborations
    for insert with check (true);

-- Create indexes
create index ngo_collaborations_email_idx on public.ngo_collaborations (email);
create index ngo_collaborations_status_idx on public.ngo_collaborations (status);

-- Add table comments
comment on table public.ngo_collaborations is 'Table storing NGO collaboration requests and registrations';
comment on column public.ngo_collaborations.status is 'Status of the collaboration request (pending, approved, rejected)'; 