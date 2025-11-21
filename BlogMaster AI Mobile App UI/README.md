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

2. (Optional) Create a `.env.local` file for higher rate limits:
```env
VITE_HUGGINGFACE_API_KEY=your_huggingface_api_key_here
```

**Note**: The app works without any API key! Hugging Face provides a free tier. Adding an API key just gives you higher rate limits.

3. Run the development server:
```bash
npm run dev
```

4. Build for production:
```bash
npm run build
```

## Environment Variables (Optional)

- `VITE_HUGGINGFACE_API_KEY`: Your Hugging Face API key (optional - for higher rate limits)
  - Without API key: Free tier with rate limits
  - With API key: Higher rate limits and better performance
  - Get free API key at: https://huggingface.co/settings/tokens

## Deployment

The app is configured for Vercel deployment. The build output directory is `dist`.

## Tech Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Radix UI
- Hugging Face Inference API (Free, no API key required)
