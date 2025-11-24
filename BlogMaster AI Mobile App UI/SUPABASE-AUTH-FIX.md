# Fix Supabase Authentication - Email Confirmation

## Quick Fix: Disable Email Confirmation in Supabase

The login error is likely because Supabase requires email confirmation by default. Here's how to disable it:

### Steps:

1. **Go to Supabase Dashboard**
   - Visit: https://supabase.com/dashboard/project/lpwfrelttlzicyecceao/auth/providers

2. **Disable Email Confirmation**
   - Click on "Authentication" in left sidebar
   - Go to "Providers" tab
   - Find "Email" provider
   - **UNCHECK** "Confirm email"
   - Click "Save"

3. **Alternative: Enable Email Confirmation Bypass**
   - Go to Authentication → Settings
   - Find "Enable email confirmations"
   - Toggle it OFF
   - Save changes

### Why This Fixes It:

- By default, Supabase requires users to click a confirmation link in their email before they can sign in
- Disabling this allows users to sign in immediately after signup
- The "Invalid login credentials" error appears when trying to sign in before email confirmation

### After Making This Change:

1. Users can sign up and sign in immediately
2. No email confirmation needed
3. App will work smoothly

