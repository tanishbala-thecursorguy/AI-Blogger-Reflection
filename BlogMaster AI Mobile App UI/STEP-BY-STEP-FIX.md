# Step-by-Step Fix for RLS Policy Error

## The Problem
You're seeing: "RLS Policy Error: Please run the fix-rls-policies.sql script in Supabase SQL Editor."

This means the Row Level Security policies are blocking profile inserts/updates.

## The Solution (5 Steps)

### Step 1: Open Supabase Dashboard
1. Go to: https://supabase.com/dashboard
2. Select your project: `ai blogger` or project with URL `lpwfrelttlzicyecceao`

### Step 2: Open SQL Editor
1. Click **"SQL Editor"** in the left sidebar
2. Click **"New Query"** button (top right)

### Step 3: Copy the Fix Script
Copy this ENTIRE script:

```sql
-- Fix RLS Policies for Profiles Table
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can upsert own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can manage own profile" ON public.profiles;

CREATE POLICY "Users can view own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can manage own profile"
  ON public.profiles FOR ALL
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);
```

### Step 4: Paste and Run
1. Paste the script into the SQL Editor
2. Click the **"Run"** button (or press Cmd/Ctrl + Enter)
3. Wait for "Success" message

### Step 5: Test the App
1. Go back to your app at `localhost:3001`
2. **Refresh the page** (F5 or Cmd+R)
3. Fill out the survey again
4. Click "Continue"

## If It Still Doesn't Work

Try this alternative (temporarily disable RLS for testing):

```sql
-- TEMPORARY: Disable RLS for testing only
ALTER TABLE public.profiles DISABLE ROW LEVEL SECURITY;
```

**⚠️ Warning:** Only use this for testing. Re-enable RLS after testing!

