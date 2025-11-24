# FIX: Email Confirmation Issue

## The Problem
You're seeing: "Please check your email to confirm your account before signing in"

## Solution: Disable Email Confirmation in Supabase (30 seconds)

### Steps:

1. **Open Supabase Dashboard**
   - Go to: https://supabase.com/dashboard/project/lpwfrelttlzicyecceao

2. **Navigate to Auth Settings**
   - Click **"Authentication"** in left sidebar
   - Click **"Providers"** tab

3. **Disable Email Confirmation**
   - Find **"Email"** provider section
   - Look for **"Confirm email"** checkbox
   - **UNCHECK** it
   - Scroll down and click **"Save"**

4. **Test**
   - Go back to your app
   - Try signing up with a new account
   - You should be able to login immediately

## Alternative: Manual SQL Fix

If the UI doesn't work, run this SQL in Supabase SQL Editor:

```sql
-- Disable email confirmation
UPDATE auth.config 
SET raw_app_meta_data = jsonb_set(
  COALESCE(raw_app_meta_data, '{}'::jsonb),
  '{email_confirm_enabled}',
  'false'::jsonb
)
WHERE id = 'default';
```

## Why This Happens

Supabase requires email confirmation by default for security. For development/testing, you can disable it to allow immediate login after signup.

