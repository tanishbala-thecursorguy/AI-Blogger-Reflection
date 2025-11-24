# Quick Fix: Login Not Working

## The Problem
"Invalid login credentials" error - This happens because Supabase requires email confirmation by default.

## Quick Solution (2 minutes)

### Step 1: Disable Email Confirmation in Supabase

1. Go to: https://supabase.com/dashboard/project/lpwfrelttlzicyecceao/auth/providers
2. Click "Authentication" in left sidebar
3. Click "Providers" tab  
4. Find "Email" provider
5. **UNCHECK** "Confirm email" checkbox
6. Click "Save" at bottom

### Step 2: Try Again

1. Refresh your app
2. Try signing up with a NEW email
3. You should be able to login immediately after signup

## Alternative: Reset Password

If you already signed up:
1. Click "Forgot password?" on login page
2. Check your email
3. Reset password
4. Login with new password

## Why This Happens

Supabase requires email confirmation by default for security. Disabling it allows immediate login without email verification (good for development/testing).

