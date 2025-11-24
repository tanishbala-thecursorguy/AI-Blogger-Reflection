# Supabase Integration Setup

## Database Schema

Run the SQL script in `supabase-schema.sql` in your Supabase SQL Editor to create the necessary tables:

1. **profiles** - User profile information
2. **blogs** - User-generated blog posts
3. **templates** - Saved blog templates

## Features Integrated

✅ **Authentication**
- Sign up / Sign in with email and password
- Persistent sessions (users stay logged in after refresh)
- Automatic profile creation on signup

✅ **Blog Storage**
- All generated blogs are saved to Supabase
- Blogs are user-specific (Row Level Security enabled)
- Recent blogs displayed in dashboard

✅ **Profile Management**
- User name and purpose stored in Supabase
- Auto-save profile changes
- Survey data saved to profiles table

## Environment Variables

The Supabase configuration is already set in `src/lib/supabase.ts`:
- Project URL: `https://lpwfrelttlzicyecceao.supabase.co`
- Anon Key: Already configured

## Next Steps

1. Run the SQL schema in Supabase Dashboard → SQL Editor
2. Test authentication flow
3. Generate and save a blog to verify storage
4. Check Supabase dashboard to see saved data

## Security

- Row Level Security (RLS) is enabled on all tables
- Users can only access their own data
- All policies are configured in the schema

