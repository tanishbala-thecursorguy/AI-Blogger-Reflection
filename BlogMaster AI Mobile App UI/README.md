# BlogMaster AI Mobile App UI

A powerful blog generation and content creation tool built with React, TypeScript, and Vite.

## Features

- **Blog Generator**: Generate SEO-optimized blog posts with AI
- **Blog Rewriter**: Transform existing content with different tones and improvements
- **Topic Generator**: Get trending topic ideas for your niche
- **AI Editor Mode**: Enhance content with various AI-powered modes
- **SEO Optimization**: Analyze and improve SEO scores
- **Keyword Research**: Discover high-traffic keywords
- **Competitor Analysis**: Analyze competitor content strategies

## Setup

1. Install dependencies:
```bash
npm install
```

2. (Optional but Recommended) Create a `.env.local` file for faster responses:
```env
# Get free Groq API key at https://console.groq.com/
VITE_GROQ_API_KEY=your_groq_api_key_here

# Or use Hugging Face (slower but free, no key needed)
VITE_HUGGINGFACE_API_KEY=your_huggingface_api_key_here
```

**Note**: The app works without any API keys! It will use Hugging Face's free Inference API. However, adding a Groq API key (free to get) provides much faster responses.

3. Run the development server:
```bash
npm run dev
```

4. Build for production:
```bash
npm run build
```

## Environment Variables (Optional)

**Option 1: Groq API (Recommended - Fast & Free)**
- `VITE_GROQ_API_KEY`: Your Groq API key (optional but recommended for faster responses)
  - Get free API key at: https://console.groq.com/
  - Free tier includes generous rate limits
  - Much faster than Hugging Face

**Option 2: Hugging Face API (Fallback)**
- `VITE_HUGGINGFACE_API_KEY`: Your Hugging Face API key (optional - for higher rate limits)
  - Without API key: Free tier with rate limits (models may need time to load)
  - With API key: Higher rate limits and better performance
  - Get free API key at: https://huggingface.co/settings/tokens

**Note**: The app works without any API keys! It will use Hugging Face's free Inference API. Adding a Groq API key provides much faster responses.

## Deployment

The app is configured for Vercel deployment. The build output directory is `dist`.

## Tech Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Radix UI
- Groq API (Free, fast, recommended - get API key at https://console.groq.com/)
- Hugging Face Inference API (Free fallback, no API key required)
