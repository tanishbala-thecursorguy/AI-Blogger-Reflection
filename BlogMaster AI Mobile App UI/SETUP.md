# Setup Instructions

## API Key Configuration

1. Create a `.env.local` file in the root directory:
```bash
touch .env.local
```

2. Add your OpenAI API key to `.env.local`:
```
VITE_OPENAI_API_KEY=your_openai_api_key_here
```

**Note**: Use your actual OpenAI API key. The `.env.local` file is ignored by git and won't be committed.

3. For Vercel deployment:
   - Go to your Vercel project settings
   - Add environment variable: `VITE_OPENAI_API_KEY`
   - Set the value to your API key
   - Redeploy

The `.env.local` file is already in `.gitignore` so it won't be committed to the repository.
