# Disable Email Confirmation - Quick Fix

## Steps (30 seconds):

1. **Open Supabase Dashboard**
   - Go to: https://supabase.com/dashboard/project/lpwfrelttlzicyecceao

2. **Navigate to Auth Settings**
   - Click **"Authentication"** in left sidebar
   - Click **"Providers"** tab

3. **Disable Email Confirmation**
   - Scroll to **"Email"** provider section
   - **UNCHECK** the **"Confirm email"** checkbox
   - Click **"Save"** at the bottom

4. **Done!**
   - Refresh your app
   - Sign up now works without email confirmation
   - Users can login immediately after signup

## Why?

By default, Supabase requires email confirmation for security. Disabling it allows immediate login after signup (good for development/testing).

