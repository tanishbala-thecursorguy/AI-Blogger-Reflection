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

2. Create a `.env.local` file in the root directory:
```env
VITE_OPENAI_API_KEY=your_openai_api_key_here
```

3. Run the development server:
```bash
npm run dev
```

4. Build for production:
```bash
npm run build
```

## Environment Variables

- `VITE_OPENAI_API_KEY`: Your OpenAI API key (required for AI features)

## Deployment

The app is configured for Vercel deployment. The build output directory is `dist`.

## Tech Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Radix UI
- OpenAI API
