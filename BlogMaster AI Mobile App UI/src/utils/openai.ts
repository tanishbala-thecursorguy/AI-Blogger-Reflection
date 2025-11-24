// AI Content Generation using Groq API (Free)
// OpenAI API is only used for image generation

// Access Vite environment variables
const env = (import.meta as any).env || {};
const GROQ_API_KEY = env.VITE_GROQ_API_KEY || '';
const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';
const GROQ_MODEL = 'llama-3.1-8b-instant';

const OPENAI_API_KEY = env.VITE_OPENAI_API_KEY || '';

// Blog format instructions
const BLOG_FORMAT_INSTRUCTIONS = `
You must generate content in this EXACT format:

# Title

## Introduction
[2-3 sentences introducing the topic]

## Main Content

### Subheading 1
[Content here]

### Subheading 2
[Content here]

## Conclusion
[2-3 sentences wrapping up]

---

**Keywords:** [comma-separated keywords]
**Word Count:** [exact count]
`;

// Helper function to call Groq API
async function callGroqAPI(prompt: string, systemPrompt: string = '', maxTokens: number = 4000) {
  console.log('🔵 callGroqAPI called', { 
    hasApiKey: !!GROQ_API_KEY, 
    apiKeyLength: GROQ_API_KEY?.length || 0,
    promptLength: prompt.length,
    maxTokens,
  });
  
  if (!GROQ_API_KEY) {
    console.error('❌ No Groq API key found!');
    throw new Error('Groq API key is required. Please set VITE_GROQ_API_KEY in your .env.local file and restart the dev server.');
  }

  try {
    console.log('📡 Sending request to Groq API...', { url: GROQ_API_URL, model: GROQ_MODEL });
    
    const response = await fetch(GROQ_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: GROQ_MODEL,
        messages: [
          ...(systemPrompt ? [{ role: 'system', content: systemPrompt }] : []),
          { role: 'user', content: prompt },
        ],
        max_tokens: maxTokens,
        temperature: 0.7,
      }),
    });
    
    console.log('📥 Response received', { status: response.status, statusText: response.statusText });

    if (!response.ok) {
      const errorText = await response.text();
      let errorData;
      try {
        errorData = JSON.parse(errorText);
      } catch {
        errorData = { error: { message: errorText || 'Unknown error' } };
      }
      
      const errorMessage = errorData.error?.message || errorData.message || `HTTP ${response.status}: ${response.statusText}`;
      console.error('Groq API Error:', {
        status: response.status,
        statusText: response.statusText,
        error: errorData,
      });
      throw new Error(`Groq API error: ${errorMessage}`);
    }

    const data = await response.json();
    
    if (!data.choices || !data.choices[0]?.message?.content) {
      console.error('Invalid API response:', data);
      throw new Error('Invalid response from API. No content generated.');
    }
    
    return data.choices[0].message.content;
  } catch (error: any) {
    if (error.message?.includes('Groq API')) {
      throw error;
    }
    console.error('API call error:', error);
    throw new Error(`Failed to generate content: ${error.message || 'Network error'}`);
  }
}

// Generate multiple variants (default 3)
async function generateMultipleVariants(
  prompt: string,
  systemPrompt: string = '',
  count: number = 3,
  maxTokens: number = 4000
): Promise<string[]> {
  const promises = Array.from({ length: count }, () =>
    callGroqAPI(prompt, systemPrompt, maxTokens).catch((err) => {
      console.error('Variant generation error:', err);
      return '';
    })
  );
  
  const results = await Promise.all(promises);
  return results.filter(v => v.length > 0);
}

// Generate blog post
export async function generateBlog(options: {
  topic: string;
  style: string;
  wordCount: number;
  keywords: string[];
  seoMode: boolean;
}): Promise<string[]> {
  const { topic, style, wordCount, keywords, seoMode } = options;
  
  const systemPrompt = `You are an expert blog writer. Generate high-quality, engaging blog content. Strictly adhere to the requested word count of ${wordCount} words. Use the writing style: ${style}.`;
  
  const keywordText = keywords.length > 0 ? ` Focus on these keywords: ${keywords.join(', ')}.` : '';
  const seoText = seoMode ? ' Optimize for SEO with proper headings, meta descriptions, and keyword placement.' : '';
  
  const prompt = `Write a comprehensive blog post about "${topic}".${keywordText}${seoText}

${BLOG_FORMAT_INSTRUCTIONS}

Word count must be exactly ${wordCount} words (±50 words tolerance).`;

  return generateMultipleVariants(prompt, systemPrompt, 3, Math.min(wordCount * 2, 4000));
}

// Rewrite blog
export async function rewriteBlog(
  content: string,
  options: {
    improvements?: string[];
    tone?: string;
  }
): Promise<string[]> {
  const { improvements = [], tone = 'Professional' } = options;
  
  const systemPrompt = `You are an expert content editor. Rewrite and improve the provided content while maintaining its core message.`;
  
  const improvementsText = improvements.length > 0 
    ? `\n\nFocus on these improvements:\n${improvements.map(i => `- ${i}`).join('\n')}`
    : '';
  
  const prompt = `Rewrite and improve the following blog content. Use a ${tone} tone.${improvementsText}

Original content:
${content.substring(0, 3000)}`;

  const wordCount = content.split(/\s+/).length;
  return generateMultipleVariants(prompt, systemPrompt, 3, Math.min(wordCount * 2, 4000));
}

// Generate topics
export async function generateTopics(niche: string, topicCount: number = 10): Promise<string[][]> {
  const systemPrompt = `You are a content strategist. Generate engaging blog topic ideas.`;
  
  const prompt = `Generate ${topicCount} trending blog topic ideas for the niche: "${niche}". 
Return the topics as a simple list, one per line. Make them specific, actionable, and diverse.
Each topic should be a complete, engaging title that would work well for a blog post.
Format: Just list the topics, one per line, numbered (1., 2., 3., etc.).`;

  // Generate 3 variants using generateMultipleVariants
  const variants = await generateMultipleVariants(prompt, systemPrompt, 3, 1500);
  
  // Parse each variant into an array of topics
  const topicSets: string[][] = [];
  
  for (const variant of variants) {
    // Extract topics from the response
    const lines = variant.split('\n').filter(line => line.trim());
    const topics: string[] = [];
    
    for (const line of lines) {
      // Remove numbering (1., 2., etc.) and quotes
      const cleaned = line
        .replace(/^\d+[\.\)]\s*/, '') // Remove "1. " or "1) "
        .replace(/^[-•*]\s*/, '') // Remove bullet points
        .replace(/^["']|["']$/g, '') // Remove quotes
        .trim();
      
      if (cleaned && cleaned.length > 10) { // Only add if it's a substantial topic
        topics.push(cleaned);
      }
    }
    
    // Limit to requested count
    if (topics.length > 0) {
      topicSets.push(topics.slice(0, topicCount));
    }
  }
  
  // If we got less than 3 variants, duplicate the first one
  while (topicSets.length < 3 && topicSets.length > 0) {
    topicSets.push([...topicSets[0]]);
  }
  
  // If no topics were parsed, create a fallback
  if (topicSets.length === 0) {
    topicSets.push([
      `Top ${topicCount} ${niche} Trends for 2024`,
      `How to Master ${niche}: A Complete Guide`,
      `${niche} Best Practices: What You Need to Know`,
    ]);
  }
  
  return topicSets;
}

// Enhance content
export async function enhanceContent(
  content: string,
  enhancements: string[]
): Promise<string[]> {
  const systemPrompt = `You are an expert content editor. Enhance content while maintaining its original length and core message.`;
  
  const enhancementsText = enhancements.join(', ');
  const prompt = `Enhance the following content by: ${enhancementsText}

Original content:
${content.substring(0, 3000)}`;

  const wordCount = content.split(/\s+/).length;
  return generateMultipleVariants(prompt, systemPrompt, 3, Math.min(wordCount * 2, 4000));
}

// Generate SEO keywords
export async function generateSEOKeywords(topic: string): Promise<Array<{ keyword: string; score: number; lsi: string[] }>> {
  const systemPrompt = `You are an SEO expert. Generate relevant, topic-specific keywords.`;
  
  const prompt = `Generate 15 highly relevant SEO keywords for the topic: "${topic}".

For each keyword, provide:
- The main keyword (must be highly relevant to the topic)
- A relevance score (1-100)
- 3 LSI (related) keywords

Return as JSON array format:
[
  {"keyword": "keyword1", "score": 85, "lsi": ["related1", "related2", "related3"]},
  ...
]`;

  const result = await callGroqAPI(prompt, systemPrompt, 2000);
  
  try {
    const jsonMatch = result.match(/\[[\s\S]*\]/);
    if (jsonMatch) {
      const keywords = JSON.parse(jsonMatch[0]);
      // Filter out irrelevant keywords
      return keywords.filter((k: any) => 
        k.keyword && 
        typeof k.keyword === 'string' &&
        k.keyword.toLowerCase().includes(topic.toLowerCase().split(' ')[0].toLowerCase()) &&
        !['json', 'word', 'score', 'example', 'data'].includes(k.keyword.toLowerCase())
      ).slice(0, 15);
    }
  } catch (e) {
    console.error('JSON parse error:', e);
  }
  
  // Fallback: extract keywords from text
  const lines = result.split('\n').filter(l => l.trim());
  return lines.slice(0, 15).map((line, idx) => ({
    keyword: line.replace(/^\d+\.\s*/, '').split(':')[0].trim() || `keyword-${idx + 1}`,
    score: 75 + (idx % 10),
    lsi: [`related-${idx + 1}-1`, `related-${idx + 1}-2`, `related-${idx + 1}-3`],
  }));
}

// Generate SEO outline
export async function generateSEOOutline(
  topic: string,
  keywords: string[]
): Promise<Array<Array<{ level: string; text: string; children?: any[] }>>> {
  const systemPrompt = `You are an SEO content strategist. Create detailed blog outlines optimized for search engines. Return structured JSON format.`;
  
  const keywordText = keywords.length > 0 ? `\nFocus on these keywords: ${keywords.join(', ')}` : '';
  
  const prompt = `Create a comprehensive SEO-optimized blog outline for: "${topic}".${keywordText}

Include:
- H1 title
- Introduction section
- 3-5 H2 main sections with sub-points
- H3 subheadings under each H2
- Conclusion

Return as JSON array format where each item has:
- level: "H1", "H2", or "H3"
- text: the heading text
- children: optional array of nested items (for H2 sections with H3 subsections)

Example format:
[
  {"level": "H1", "text": "Main Title"},
  {"level": "H2", "text": "Introduction", "children": []},
  {"level": "H2", "text": "Section 1", "children": [
    {"level": "H3", "text": "Subsection 1.1"},
    {"level": "H3", "text": "Subsection 1.2"}
  ]},
  {"level": "H2", "text": "Section 2", "children": []},
  {"level": "H2", "text": "Conclusion", "children": []}
]`;

  // Generate 3 variants
  const variants = await generateMultipleVariants(prompt, systemPrompt, 3, 2500);
  
  // Parse each variant into structured format
  const parsedVariants: Array<Array<{ level: string; text: string; children?: any[] }>> = [];
  
  for (const variant of variants) {
    try {
      // Try to extract JSON from the response
      const jsonMatch = variant.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        if (Array.isArray(parsed)) {
          parsedVariants.push(parsed);
          continue;
        }
      }
      
      // Fallback: Parse markdown-style outline
      const lines = variant.split('\n').filter(line => line.trim());
      const outline: Array<{ level: string; text: string; children?: any[] }> = [];
      let currentH2: any = null;
      
      for (const line of lines) {
        const trimmed = line.trim();
        if (trimmed.startsWith('# ')) {
          outline.push({ level: 'H1', text: trimmed.replace(/^#+\s*/, '') });
        } else if (trimmed.startsWith('## ')) {
          if (currentH2) outline.push(currentH2);
          currentH2 = { level: 'H2', text: trimmed.replace(/^#+\s*/, ''), children: [] };
        } else if (trimmed.startsWith('### ')) {
          if (currentH2) {
            if (!currentH2.children) currentH2.children = [];
            currentH2.children.push({ level: 'H3', text: trimmed.replace(/^#+\s*/, '') });
          } else {
            outline.push({ level: 'H3', text: trimmed.replace(/^#+\s*/, '') });
          }
        } else if (trimmed && currentH2) {
          // If line starts with bullet or dash, add as H3
          if (trimmed.match(/^[-•*]\s+/)) {
            if (!currentH2.children) currentH2.children = [];
            currentH2.children.push({ level: 'H3', text: trimmed.replace(/^[-•*]\s+/, '') });
          }
        }
      }
      
      if (currentH2) outline.push(currentH2);
      
      if (outline.length > 0) {
        parsedVariants.push(outline);
      } else {
        // Last resort: single item with full text
        parsedVariants.push([{ level: 'H1', text: topic, children: [] }]);
      }
    } catch (parseError) {
      console.error('Error parsing outline variant:', parseError);
      // Fallback: create basic outline
      parsedVariants.push([
        { level: 'H1', text: topic },
        { level: 'H2', text: 'Introduction', children: [] },
        { level: 'H2', text: 'Main Content', children: [] },
        { level: 'H2', text: 'Conclusion', children: [] }
      ]);
    }
  }
  
  return parsedVariants.length > 0 ? parsedVariants : [
    [
      { level: 'H1', text: topic },
      { level: 'H2', text: 'Introduction', children: [] },
      { level: 'H2', text: 'Main Content', children: [] },
      { level: 'H2', text: 'Conclusion', children: [] }
    ]
  ];
}

// Generate video script
export async function generateVideoScript(blogContent: string): Promise<string[]> {
  const systemPrompt = `You are a video scriptwriter. Create engaging video scripts from blog content.`;
  
  const prompt = `Convert the following blog content into a video script.

The script should include:
1. Hook (attention-grabbing opening)
2. Introduction
3. Main content (broken into topics/sections)
4. Jokes and engaging moments (2-3 jokes)
5. Ending/CTA

Make it conversational and engaging. Blog content:
${blogContent.substring(0, 3000)}`;

  return generateMultipleVariants(prompt, systemPrompt, 3, 3000);
}

// Analyze competitor content
export async function analyzeCompetitor(content: string): Promise<{
  wordCount: number;
  keywords: string[];
  structure: { h1: number; h2: number; h3: number; images: number };
  mainTopic: string;
  summary: string;
  contentGaps: string[];
  weakSections: Array<{ section: string; score: number }>;
  overallScore: number;
}> {
  const systemPrompt = `You are an SEO and content analysis expert. Analyze content comprehensively.`;
  
  const prompt = `Analyze the following content and provide a detailed analysis:

Content:
${content.substring(0, 4000)}

Provide analysis in JSON format:
{
  "wordCount": [number],
  "keywords": [array of keywords],
  "structure": {"h1": [number], "h2": [number], "h3": [number], "images": [number]},
  "mainTopic": "[topic]",
  "summary": "[brief summary]",
  "contentGaps": [array of gaps/missing points],
  "weakSections": [array of {"section": "[name]", "score": [1-100]}],
  "overallScore": [1-100]
}`;

  const result = await callGroqAPI(prompt, systemPrompt, 2000);
  
  try {
    const jsonMatch = result.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
  } catch (e) {
    console.error('JSON parse error:', e);
  }
  
  // Fallback analysis
  const wordCount = content.split(/\s+/).length;
  const h1Count = (content.match(/^#\s/gm) || []).length;
  const h2Count = (content.match(/^##\s/gm) || []).length;
  const h3Count = (content.match(/^###\s/gm) || []).length;
  
  return {
    wordCount,
    keywords: [],
    structure: { h1: h1Count, h2: h2Count, h3: h3Count, images: 0 },
    mainTopic: 'Analysis',
    summary: content.substring(0, 200),
    contentGaps: ['Need more examples', 'Add more statistics'],
    weakSections: [{ section: 'Content', score: 70 }],
    overallScore: 75,
  };
}

// Generate image using OpenAI DALL-E
export async function generateImage(prompt: string, options: {
  style?: 'minimal' | 'stock-photo' | 'photographic' | 'illustration' | 'abstract';
  size?: '1024x1024' | '1792x1024' | '1024x1792';
  quality?: 'standard' | 'hd';
}): Promise<{ url: string; revisedPrompt?: string }> {
  const { style = 'photographic', size = '1024x1024', quality = 'hd' } = options;

  if (!OPENAI_API_KEY) {
    throw new Error('OpenAI API key is required for image generation. Please set VITE_OPENAI_API_KEY in your environment variables.');
  }

  const stylePrompts: { [key: string]: string } = {
    minimal: 'minimalist, clean, simple design, black and white, modern, ultra-realistic, photorealistic, professional photography, natural lighting, sharp focus, real photo quality',
    'stock-photo': 'professional photography, realistic, high quality, natural lighting, ultra-realistic, photorealistic, sharp focus, real photo quality',
    photographic: 'professional photography, realistic, high quality, natural lighting, ultra-realistic, photorealistic, sharp focus, real photo quality',
    illustration: 'artistic illustration, hand-drawn style, creative, colorful, highly detailed',
    abstract: 'abstract art, geometric shapes, modern, contemporary, vibrant colors, highly detailed',
  };

  const selectedStylePrompt = stylePrompts[style] || stylePrompts.photographic;
  const enhancedPrompt = `${prompt}, ${selectedStylePrompt}`;

  try {
    const response = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'dall-e-3',
        prompt: enhancedPrompt,
        n: 1,
        size: size,
        quality: quality,
        style: 'natural',
      }),
    });

    if (response.ok) {
      const data = await response.json();
      if (data.data && data.data.length > 0) {
        return {
          url: data.data[0].url,
          revisedPrompt: data.data[0].revised_prompt,
        };
      }
    } else {
      const errorData = await response.json().catch(() => ({ error: { message: 'Unknown error' } }));
      throw new Error(`OpenAI Image API error: ${errorData.error?.message || 'Failed to generate image.'}`);
    }
  } catch (error: any) {
    throw new Error(`Failed to generate image: ${error.message || 'Network error'}`);
  }
  
  throw new Error('Failed to generate image. No URL returned.');
}

