# Supabase User Profiles

This directory contains SQL migrations for user profile data backed by Supabase Auth.

## Migration added

- `migrations/20260407195000_create_user_profiles.sql`

## What it does

- Creates `public.profiles` keyed by `auth.users.id`
- Auto-creates/updates profile rows when a new Auth user is created
- Syncs email changes from `auth.users` to `public.profiles`
- Backfills profile rows for existing Auth users
- Enables Row Level Security (RLS) so users can only read/write their own profile
- Pulls common Google OAuth metadata fields (`full_name`/`name`, `avatar_url`/`picture`)

## Google Auth setup in Supabase

1. In Supabase dashboard, open `Authentication -> Providers -> Google`.
2. Enable Google provider and add your Google OAuth Client ID/Secret.
3. Set authorized redirect URL to your Supabase auth callback URL.
4. Save provider configuration.

After Google sign-in succeeds via Supabase Auth, the trigger on `auth.users` creates the `public.profiles` row automatically.

## Running migrations

If you use Supabase CLI:

```bash
supabase db push
```

Or run the SQL file directly in the Supabase SQL Editor.
