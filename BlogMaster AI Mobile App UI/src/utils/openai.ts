// Using free APIs - Groq (fast and free, but requires API key)
// Fallback to Hugging Face Inference API (free, no API key required)
// Optional: Set VITE_GROQ_API_KEY for faster Groq API (get free at https://console.groq.com/)
// Optional: Set VITE_HUGGINGFACE_API_KEY for higher HF rate limits

const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY || '';
const HUGGINGFACE_API_KEY = import.meta.env.VITE_HUGGINGFACE_API_KEY || '';

const GROQ_MODEL = 'llama-3.1-8b-instant'; // Fast and free
const HF_MODEL = 'mistralai/Mistral-7B-Instruct-v0.2'; // Fast and doesn't need loading

const BLOG_FORMAT_INSTRUCTIONS = `
# Title (H1)

Short hook introduction (3–5 sentences).

## Table of Contents

1. 
2. 
3. 
4. 

---

## H2 - Section Title

Short explanation paragraph.

### H3 - Subsection

Content

### H3 - Subsection

Content with bullets:

- Point 1
- Point 2

---

## H2 - Next Section

Include tips or examples.

> 💡 Pro Tip: Highlight your most important advice.

---

## H2 - Steps / Framework

1. Step 1
2. Step 2
3. Step 3

---

## H2 - FAQ

**Q: Question?**  

Answer.

---

## Conclusion / Final Thoughts

Summarize the blog and add a call-to-action.

THE "CLEAR EXPLANATION" BLOG FORMAT (Teach Like a Pro)

Every section explains the what, why, and how — so ANY reader can understand.

✅ 1. Title (Simple + Direct + Benefit)
✅ 2. Problem Statement (Why This Topic Matters)
✅ 3. Clear Definition (What It Is)
✅ 4. Simple Explanation (In 1–2 Lines)
✅ 5. Deep Explanation (Step-by-Step)
✅ 6. Clear Examples (Make It Understandable)
✅ 7. Use Analogies (Readers Love This)
✅ 8. Use Visual Blocks: Pro Tips, Mistakes, Key Takeaways
✅ 9. Break Down Complex Ideas Into "Why + How"
✅ 10. Actionable Steps (People LOVE practical guidance)
✅ 11. Add FAQs (Removes Confusion)
✅ 12. Conclusion (Simple Summary + Takeaway)

THE PERFECT CLEAR-EXPLANATION BLOG TEMPLATE:

# Title (H1)

## 1. Problem Statement
Explain why this topic matters.

## 2. Clear Definition (What It Is)
Simple, direct explanation.

## 3. Beginner Explanation (In Simple Words)
Explain like you're teaching a 14-year-old.

## 4. Deep Explanation (Step-by-Step)
Break the concept into steps, elements, or components.

## 5. Examples
Show clear examples to make it relatable.

## 6. Analogies
Add simple comparisons to make understanding easier.

## 7. Why It Matters
Explain the real benefit or importance.

## 8. How to Use / Apply It (Actionable Steps)
Give clear steps the reader can perform.

## 9. Common Mistakes
List mistakes with explanations.

## 10. Pro Tips
Help the reader gain expertise quickly.

## 11. FAQ
Answer the most common questions.

## 12. Conclusion
Summarize the explanation and give a takeaway.

OUTPUT MUST ALWAYS FOLLOW THIS EXACT FORMAT:
- Do NOT skip any section
- Do NOT merge sections
- Do NOT write in a robotic tone
- Always write professionally, clearly, and with helpful explanations
- Use strong headings (H1, H2, H3, bullet points)
- Include keywords naturally
- Maintain readability (short paragraphs)
- Avoid filler content
- Keep explanations clear and structured
`;

// Helper function to calculate max_tokens based on word count
// Rough estimate: 1 word ≈ 1.3 tokens, so for 3000 words ≈ 4000 tokens
function calculateMaxTokens(wordCount: number): number {
  // Use 1.5 tokens per word as a safe estimate, add buffer
  return Math.ceil(wordCount * 1.5) + 500; // Add 500 buffer
}

// Helper function to generate multiple variants (3 variations)
async function generateMultipleVariants(
  basePrompt: string,
  systemPrompt: string,
  wordCount?: number,
  variantCount: number = 3
): Promise<string[]> {
  const variants: string[] = [];
  
  // Generate variants with slight variations in instructions
  const variantInstructions = [
    'Create a unique, creative version with different examples and fresh perspectives.',
    'Generate an alternative approach with varied structure and different key points.',
    'Write a variation with a distinct style and unique insights.',
  ];
  
  // Generate variants sequentially to avoid rate limits
  for (let i = 0; i < variantCount; i++) {
    try {
      const variantPrompt = `${basePrompt}\n\nVARIANT ${i + 1} INSTRUCTION: ${variantInstructions[i] || 'Generate a unique variant.'}`;
      
      // Try Groq first
      let result = await callGroqAPI(variantPrompt, systemPrompt, wordCount);
      
      if (!result) {
        // Fallback to Hugging Face
        result = await callHuggingFaceAPI(variantPrompt, systemPrompt, wordCount);
      }
      
      if (result) {
        variants.push(result);
      }
      
      // Small delay between requests to avoid rate limits
      if (i < variantCount - 1 && variants.length < variantCount) {
        await new Promise(resolve => setTimeout(resolve, 1500));
      }
    } catch (error) {
      console.error(`Error generating variant ${i + 1}:`, error);
      // Continue with other variants even if one fails
    }
  }
  
  // If we got less than requested, generate at least one
  if (variants.length === 0) {
    // Try once more without variant instructions
    try {
      let result = await callGroqAPI(basePrompt, systemPrompt, wordCount);
      if (!result) {
        result = await callHuggingFaceAPI(basePrompt, systemPrompt, wordCount);
      }
      if (result) {
        variants.push(result);
        // Duplicate to have at least 2 variants
        if (variants.length === 1) {
          variants.push(result + '\n\n[Note: This is a duplicate. Please regenerate for more variety.]');
        }
      }
    } catch (error) {
      console.error('Error generating fallback variant:', error);
    }
  }
  
  // Ensure we have at least one variant
  if (variants.length === 0) {
    throw new Error('Failed to generate any variants. Please try again.');
  }
  
  return variants;
}

// Helper function to call Groq API
async function callGroqAPI(prompt: string, systemPrompt: string, wordCount?: number): Promise<string | null> {
  if (!GROQ_API_KEY) {
    console.log('Groq API key not found, skipping Groq API call');
    return null;
  }
  
  const maxTokens = wordCount ? calculateMaxTokens(wordCount) : 4000;
  
  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: GROQ_MODEL,
        messages: [
          {
            role: 'system',
            content: systemPrompt,
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.7,
        max_tokens: Math.min(maxTokens, 16384), // Groq has a max limit
      }),
    });

    if (response.ok) {
      const data = await response.json();
      const content = data.choices[0]?.message?.content?.trim();
      if (content) {
        console.log('Groq API: Successfully generated content');
        return content;
      }
    } else {
      const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
      console.error('Groq API error:', response.status, errorData);
      // If rate limited or unauthorized, don't retry
      if (response.status === 401 || response.status === 429) {
        throw new Error(`Groq API error: ${errorData.error?.message || errorData.error || 'Authentication or rate limit error'}`);
      }
    }
  } catch (error: any) {
    console.error('Groq API error:', error);
    // Re-throw if it's an auth/rate limit error
    if (error.message?.includes('Groq API error')) {
      throw error;
    }
  }
  return null;
}

// Helper function to call Hugging Face API
async function callHuggingFaceAPI(prompt: string, systemPrompt: string, wordCount?: number): Promise<string | null> {
  try {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };
    
    if (HUGGINGFACE_API_KEY) {
      headers['Authorization'] = `Bearer ${HUGGINGFACE_API_KEY}`;
    }

    const maxTokens = wordCount ? calculateMaxTokens(wordCount) : 4000;

    const response = await fetch(`https://api-inference.huggingface.co/models/${HF_MODEL}`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        inputs: `<s>[INST] ${systemPrompt}\n\n${prompt} [/INST]`,
        parameters: {
          temperature: 0.7,
          max_new_tokens: Math.min(maxTokens, 4096), // HF model limit
          return_full_text: false,
        },
      }),
    });

    if (!response.ok) {
      // If model is loading, wait and retry once
      if (response.status === 503) {
        await new Promise(resolve => setTimeout(resolve, 15000));
        const retryResponse = await fetch(`https://api-inference.huggingface.co/models/${HF_MODEL}`, {
          method: 'POST',
          headers,
          body: JSON.stringify({
            inputs: `<s>[INST] ${systemPrompt}\n\n${prompt} [/INST]`,
            parameters: {
              temperature: 0.7,
              max_new_tokens: Math.min(wordCount ? calculateMaxTokens(wordCount) : 4000, 4096),
              return_full_text: false,
            },
          }),
        });
        
        if (retryResponse.ok) {
          const retryData = await retryResponse.json();
          if (Array.isArray(retryData) && retryData[0]?.generated_text) {
            return retryData[0].generated_text.trim();
          }
        }
      }
      return null;
    }

    const data = await response.json();
    
    if (Array.isArray(data) && data[0]?.generated_text) {
      // Clean up the response
      let text = data[0].generated_text.trim();
      // Remove the instruction tags if present
      text = text.replace(/\[INST\].*?\[\/INST\]\s*/s, '');
      return text;
    }
    
    return null;
  } catch (error) {
    console.error('Hugging Face API error:', error);
    return null;
  }
}

// Helper function to get tone/style instructions based on writing style
function getStyleInstructions(style: string): string {
  const styleMap: Record<string, string> = {
    'Professional': `TONE & STYLE REQUIREMENTS:
- Use formal, authoritative language
- Write in third person or professional second person
- Maintain a serious, business-focused tone
- Use technical terminology appropriately
- Structure sentences clearly and concisely
- Avoid casual language, slang, or contractions
- Present facts and data objectively
- Use professional transitions and connectors`,

    'Human-like': `TONE & STYLE REQUIREMENTS:
- Write in a natural, conversational tone
- Use first or second person (I, you, we)
- Include casual language and everyday expressions
- Make it feel like a friendly expert is talking to you
- Use contractions naturally (don't, can't, it's)
- Add personal touches and relatable examples
- Break down complex ideas simply
- Use friendly, approachable language`,

    'Storytelling': `TONE & STYLE REQUIREMENTS:
- Use narrative techniques and storytelling elements
- Begin with engaging hooks or anecdotes
- Create a narrative arc (beginning, middle, end)
- Use descriptive language and vivid imagery
- Include examples told as short stories
- Build emotional connections with readers
- Use transitions that flow like a story
- End with memorable conclusions or takeaways`,

    'Emotional': `TONE & STYLE REQUIREMENTS:
- Appeal to readers' emotions throughout
- Use powerful, evocative language
- Include emotional triggers and relatable feelings
- Connect content to personal experiences
- Use strong descriptive words that evoke emotion
- Include empathetic language and understanding
- Build emotional engagement in each section
- Use passionate, heartfelt expressions`,

    'Beginner-friendly': `TONE & STYLE REQUIREMENTS:
- Use simple, clear language (avoid jargon)
- Explain technical terms when introduced
- Break down complex concepts into easy steps
- Use analogies and simple comparisons
- Write in second person (you) to guide readers
- Include "why" explanations, not just "how"
- Use short sentences and clear paragraphs
- Provide encouragement and reassurance`,

    'Expert Blogger': `TONE & STYLE REQUIREMENTS:
- Write with deep expertise and authority
- Use advanced terminology and industry insights
- Share insider knowledge and pro tips
- Include data, statistics, and research references
- Provide detailed, technical explanations
- Use sophisticated language while remaining clear
- Demonstrate mastery of the subject
- Include advanced strategies and nuanced perspectives`,

    'Custom Tone': `TONE & STYLE REQUIREMENTS:
- Use a balanced, versatile tone
- Adapt style to the content's needs
- Mix professional and approachable elements
- Maintain consistency throughout
- Use varied sentence structures
- Include both formal and informal elements appropriately`
  };

  return styleMap[style] || styleMap['Professional'];
}

export async function generateBlog(options: {
  topic: string;
  style: string;
  wordCount: number;
  keywords: string[];
  seoMode: boolean;
}): Promise<string[]> {
  const { topic, style, wordCount, keywords, seoMode } = options;

  const keywordsText = keywords.length > 0 ? `Target keywords: ${keywords.join(', ')}. ` : '';
  const seoText = seoMode ? 'Optimize for SEO and include target keywords naturally. ' : '';
  const styleInstructions = getStyleInstructions(style);

  const prompt = `Write a comprehensive blog post about "${topic}" in a ${style} writing style.

CRITICAL REQUIREMENTS:
- EXACT word count: ${wordCount} words (NO MORE, NO LESS - this is essential)
- You MUST write exactly ${wordCount} words, not ${wordCount + 100}, not ${wordCount - 100}, but EXACTLY ${wordCount} words
- Count your words carefully and ensure the final output is exactly ${wordCount} words

${styleInstructions}

CONTENT REQUIREMENTS:
${keywordsText}${seoText}
- Follow the EXACT format provided below - every section must be included
- Use the ${style} tone consistently throughout ALL sections
- Include practical examples and actionable advice
- Maintain the ${style} style in every paragraph, heading, and section
- Ensure all sections from the template are included
- Adjust the length of each section to meet the ${wordCount} word requirement
- The tone must match the ${style} style in introduction, body, examples, FAQs, and conclusion

${BLOG_FORMAT_INSTRUCTIONS}

IMPORTANT: Apply the ${style} writing style to EVERY part of the blog post - introduction, headings, examples, tips, FAQs, and conclusion. The entire content must reflect the ${style} tone consistently.

Now write the blog post following this exact format. Remember: The total word count MUST be exactly ${wordCount} words, and the ${style} tone must be consistent throughout.`;

  const systemPrompt = `You are an expert blog writer who creates clear, educational, SEO-optimized content that follows exact formatting instructions and maintains consistent tone throughout. 

KEY RULES:
1. You ALWAYS write the EXACT number of words requested - never more, never less. If asked for ${wordCount} words, you write exactly ${wordCount} words.
2. You MUST maintain the ${style} writing style consistently throughout the ENTIRE blog post - every section, paragraph, heading, example, and FAQ must reflect the ${style} tone.
3. You MUST follow the exact format template provided - include all required sections in the specified order.
4. The tone and style must be uniform across all sections - introduction, body content, examples, tips, FAQs, and conclusion all must use the ${style} style.`;

  // Generate 3 variants
  try {
    const variants = await generateMultipleVariants(prompt, systemPrompt, wordCount, 3);
    if (variants.length > 0) {
      return variants;
    }
  } catch (error: any) {
    console.error('Error generating multiple variants:', error);
  }
  
  // Fallback: try single generation
  let result: string | null = null;
  try {
    result = await callGroqAPI(prompt, systemPrompt, wordCount);
  } catch (error: any) {
    console.log('Groq API failed, trying Hugging Face fallback...');
  }
  
  if (!result) {
    result = await callHuggingFaceAPI(prompt, systemPrompt, wordCount);
  }

  if (!result) {
    throw new Error('Failed to generate blog. Please try again.');
  }

  return [result]; // Return as array for consistency
}

export async function rewriteBlog(content: string, options: {
  style?: string;
  tone?: string;
  improvements?: string[];
}): Promise<string[]> {
  const { style, tone, improvements = [] } = options;

  // Estimate word count from original content
  const originalWordCount = content.split(/\s+/).length;

  const improvementsText = improvements.length > 0 
    ? `\nApply these improvements: ${improvements.join(', ')}.`
    : '';

  const prompt = `Rewrite and improve the following blog post content:

${content.substring(0, 10000)}${content.length > 10000 ? '...' : ''}

Requirements:
- Write approximately ${originalWordCount} words (maintain similar length to the original)
- You should aim for ${originalWordCount} words but it's okay if it's slightly different
${style ? `- Writing style: ${style}` : ''}
${tone ? `- Tone: ${tone}` : ''}
${improvementsText}
- Maintain all key information while improving clarity and structure
- Make it more engaging and professional
- Ensure SEO optimization if applicable
- Keep the word count similar to the original (around ${originalWordCount} words)

Now rewrite the blog post with these improvements.`;

  const systemPrompt = `You are an expert blog editor who rewrites content to be clearer, more engaging, and better structured while maintaining the original information. You ALWAYS maintain approximately the same word count as the original content (${originalWordCount} words).`;

  // Generate 3 variants
  try {
    const variants = await generateMultipleVariants(prompt, systemPrompt, originalWordCount, 3);
    if (variants.length > 0) {
      return variants;
    }
  } catch (error: any) {
    console.error('Error generating rewrite variants:', error);
  }
  
  // Fallback: single generation
  let result = await callGroqAPI(prompt, systemPrompt, originalWordCount);
  
  if (!result) {
    result = await callHuggingFaceAPI(prompt, systemPrompt, originalWordCount);
  }

  if (!result) {
    throw new Error('Failed to rewrite blog. Please try again.');
  }

  return [result];
}

export async function generateTopics(niche: string, count: number = 10): Promise<string[]> {
  const prompt = `Generate exactly ${count} engaging, SEO-friendly blog topic ideas for the niche: "${niche}"

CRITICAL REQUIREMENTS:
- Generate EXACTLY ${count} topics - no more, no less
- Each topic should be SEO-friendly and keyword-rich
- Topics should be actionable, valuable, and specific
- Include variety: how-to guides, listicles, comparisons, tutorials, case studies, trends
- Make topics specific, interesting, and searchable
- Each topic should be 5-15 words long
- Return topics as a numbered list (1., 2., 3., etc.), one per line
- Do NOT include any additional text, explanations, or formatting - just the numbered list

Format example:
1. How to Start [Topic] in 2024: Complete Beginner Guide
2. Top 10 [Topic] Tools and Platforms for Success
3. [Topic] vs [Related Topic]: Which is Better for You?

Now generate exactly ${count} topics for "${niche}":`;

  const systemPrompt = `You are an expert content strategist and SEO specialist who generates highly engaging, searchable blog topic ideas. 

KEY RULES:
1. Always generate the EXACT number of topics requested (${count} topics)
2. Return only a numbered list, nothing else
3. Each topic should be specific, actionable, and SEO-optimized
4. Topics should vary in format (how-to, lists, comparisons, guides, etc.)
5. Make topics compelling and valuable to readers`;

  let result = await callGroqAPI(prompt, systemPrompt);
  
  if (!result) {
    result = await callHuggingFaceAPI(prompt, systemPrompt);
  }

  if (!result) {
    // Fallback: Generate simple topic ideas
    console.log('API failed, using fallback topics');
    return Array.from({ length: count }, (_, i) => 
      `How to Master ${niche}: Complete Guide for ${i + 1 === 1 ? 'Beginners' : i + 1 === 2 ? 'Professionals' : 'Experts'}`
    );
  }

  // Extract topics from the response
  const lines = result.split('\n').filter(line => {
    const trimmed = line.trim();
    // Match numbered lists (1., 2., 1) 2) etc.) or bullet points
    return trimmed && (
      /^\d+[\.\)]\s/.test(trimmed) || 
      /^[-•*]\s/.test(trimmed) || 
      (trimmed.length > 10 && trimmed.length < 200 && !trimmed.toLowerCase().includes('example'))
    );
  });
  
  let topics = lines.map(line => {
    // Remove numbering, bullets, quotes, and extra formatting
    let cleaned = line
      .replace(/^\d+[\.\)]\s*/, '') // Remove "1. " or "1) "
      .replace(/^[-•*]\s*/, '') // Remove bullets
      .replace(/^["'`]|["'`]$/g, '') // Remove quotes
      .replace(/^[\(\[]|[\)\]]$/g, '') // Remove parentheses/brackets
      .trim();
    
    // Clean up any remaining formatting
    cleaned = cleaned.replace(/^[:\-]\s*/, '').trim();
    
    return cleaned;
  }).filter(topic => {
    // Filter valid topics
    const isTooShort = topic.length < 5;
    const isTooLong = topic.length > 200;
    const isInvalid = /^(example|note|tip|format|requirements)/i.test(topic);
    const hasNumbers = /^\d+$/.test(topic); // Pure numbers
    
    return !isTooShort && !isTooLong && !isInvalid && !hasNumbers && topic.length > 0;
  });

  // Ensure we have at least some topics
  if (topics.length === 0) {
    console.log('No topics extracted, trying alternative parsing');
    // Try alternative extraction
    const altLines = result.split(/[\n\r]+/).filter(line => line.trim().length > 10);
    topics = altLines.slice(0, count).map((line, idx) => {
      const cleaned = line.trim().replace(/^[\d\-•*\)\.\(\[\]:]+\s*/, '');
      return cleaned || `${niche} Topic ${idx + 1}`;
    });
  }
  
  // If we got good topics, return them (up to requested count)
  if (topics.length > 0) {
    const uniqueTopics = Array.from(new Set(topics)); // Remove duplicates
    return uniqueTopics.slice(0, count);
  }
  
  // Final fallback
  console.log('Using final fallback topics');
  const fallbackTypes = [
    'Complete Guide', 'Best Practices', 'Step-by-Step Tutorial', 'Ultimate Checklist',
    'Beginner\'s Guide', 'Advanced Strategies', 'Case Studies', 'Comparison Guide',
    'Top Tools Review', 'Trending Topics', 'Expert Tips', 'Common Mistakes',
  ];
  
  return Array.from({ length: count }, (_, i) => 
    `${niche}: ${fallbackTypes[i % fallbackTypes.length]}`
  );
}

export async function generateSEOKeywords(topic: string, count: number = 10): Promise<Array<{ keyword: string; score: number }>> {
  const prompt = `Generate ${count} SEO-friendly keyword suggestions for the topic: "${topic}"

Requirements:
- Keywords should be highly relevant to the topic
- Include a mix of short-tail and long-tail keywords
- Keywords should be searchable and have SEO potential
- Return keywords with SEO relevance scores (0-100)

Return the response as a JSON array of objects with "keyword" and "score" fields. Example format:
[
  {"keyword": "example keyword", "score": 95},
  {"keyword": "another keyword", "score": 88}
]`;

  const systemPrompt = 'You are an SEO expert who generates highly relevant, searchable keywords for content topics. Return only valid JSON array.';

  let result = await callGroqAPI(prompt, systemPrompt);
  
  if (!result) {
    result = await callHuggingFaceAPI(prompt, systemPrompt);
  }

  if (!result) {
    // Fallback keywords
    return Array.from({ length: count }, (_, i) => ({
      keyword: `${topic} ${i + 1}`,
      score: 85 - (i * 5),
    }));
  }

  // Try to parse JSON
  try {
    // Clean up the response - remove markdown code blocks if present
    let cleaned = result.trim();
    cleaned = cleaned.replace(/^```json\s*/i, '').replace(/^```\s*/i, '').replace(/```\s*$/i, '');
    
    const keywords = JSON.parse(cleaned);
    if (Array.isArray(keywords) && keywords.length > 0) {
      return keywords.slice(0, count).map((item: any) => ({
        keyword: item.keyword || item.key || String(item),
        score: typeof item.score === 'number' ? item.score : Math.floor(95 - Math.random() * 20),
      }));
    }
  } catch (e) {
    console.error('Error parsing keywords JSON:', e);
  }

  // Fallback: Extract keywords from text
  const lines = result.split('\n').filter(line => {
    const trimmed = line.trim();
    return trimmed && (trimmed.includes('keyword') || trimmed.length > 5 && trimmed.length < 100);
  });

  return lines.slice(0, count).map((line, idx) => {
    // Try to extract keyword and score
    const match = line.match(/(?:keyword|key|word)[:"]?\s*["']?([^"',:]+)["']?/i);
    const keyword = match ? match[1].trim() : line.replace(/[^\w\s-]/g, '').trim();
    const scoreMatch = line.match(/score[:]?\s*(\d+)/i);
    const score = scoreMatch ? parseInt(scoreMatch[1]) : (95 - idx * 5);
    
    return {
      keyword: keyword || `${topic} keyword ${idx + 1}`,
      score: Math.max(50, Math.min(100, score)),
    };
  });
}

export async function generateSEOOutline(
  topic: string,
  keywords: string[] = []
): Promise<Array<{ level: string; text: string; expanded: boolean; children?: any[] }>> {
  const keywordsText = keywords.length > 0 
    ? `\n\nIMPORTANT: Include these target keywords naturally in the outline headings: ${keywords.join(', ')}. Ensure the outline is optimized for these keywords while maintaining relevance to the topic.` 
    : '';

  const prompt = `Generate a comprehensive SEO-optimized blog outline for the topic: "${topic}"
${keywordsText}

Requirements:
- Create a hierarchical outline with H1, H2, and H3 headings
- Include 1 main H1 title
- Include 6-8 H2 sections
- Include 2-3 H3 subsections under each H2
- All headings should be SEO-friendly and keyword-rich
- Follow best practices for content structure
- Include sections like Introduction, Benefits, Tools, Best Practices, Challenges, Conclusion

Return the outline in this exact JSON format:
{
  "h1": "Main Title",
  "sections": [
    {
      "h2": "Section Title",
      "h3": ["Subsection 1", "Subsection 2", "Subsection 3"]
    }
  ]
}`;

  const systemPrompt = 'You are an SEO content strategist who creates well-structured, SEO-optimized blog outlines. Return only valid JSON.';

  // Generate 3 outline variants
  const outlineVariants: Array<{ level: string; text: string; expanded: boolean; children?: any[] }> = [];
  
  for (let i = 0; i < 3; i++) {
    const variantPrompt = `${prompt}\n\nVARIANT ${i + 1}: Create ${i === 0 ? 'a comprehensive, detailed outline' : i === 1 ? 'an alternative structure with different sections' : 'a unique approach with varied headings'}.`;
    
    let result = await callGroqAPI(variantPrompt, systemPrompt);
    
    if (!result) {
      result = await callHuggingFaceAPI(variantPrompt, systemPrompt);
    }

    if (result) {
      try {
        let cleaned = result.trim();
        cleaned = cleaned.replace(/^```json\s*/i, '').replace(/^```\s*/i, '').replace(/```\s*$/i, '');
        
        const data = JSON.parse(cleaned);
        
        const outline: any = {
          level: 'H1',
          text: data.h1 || data.title || `${topic}: Complete Guide ${i + 1}`,
          expanded: true,
          children: (data.sections || []).map((section: any) => ({
            level: 'H2',
            text: section.h2 || section.title || section.text || 'Section',
            expanded: true,
            children: (section.h3 || []).map((h3: string | any) => ({
              level: 'H3',
              text: typeof h3 === 'string' ? h3 : (h3.text || h3.title || 'Subsection'),
              expanded: false,
            })),
          })),
        };
        
        outlineVariants.push(outline);
      } catch (e) {
        // Try text parsing
        const lines = result.split('\n').filter(line => line.trim());
        const outline: any = { level: 'H1', text: `${topic}: Variant ${i + 1}`, expanded: true, children: [] };
        
        let currentH2: any = null;
        for (const line of lines) {
          if (line.match(/^#\s+/)) {
            outline.text = line.replace(/^#+\s+/, '').trim();
          } else if (line.match(/^##\s+/)) {
            if (currentH2) outline.children.push(currentH2);
            currentH2 = { level: 'H2', text: line.replace(/^##+\s+/, '').trim(), expanded: true, children: [] };
          } else if (line.match(/^###\s+/) && currentH2) {
            currentH2.children.push({ level: 'H3', text: line.replace(/^###+\s+/, '').trim(), expanded: false });
          }
        }
        if (currentH2) outline.children.push(currentH2);
        
        if (outline.children.length > 0) {
          outlineVariants.push(outline);
        }
      }
    }
    
    // Delay between requests
    if (i < 2) {
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }

  if (outlineVariants.length > 0) {
    return outlineVariants;
  }
  
  // Fallback outline
  return [{
    level: 'H1',
    text: `${topic}: Complete Guide`,
    expanded: true,
    children: [
      { level: 'H2', text: `Understanding ${topic}`, expanded: true, children: [] },
      { level: 'H2', text: `Benefits of ${topic}`, expanded: false },
      { level: 'H2', text: `Best Practices`, expanded: false },
      { level: 'H2', text: `Conclusion`, expanded: false },
    ],
  }];

  // Try to parse JSON
  try {
    let cleaned = result.trim();
    cleaned = cleaned.replace(/^```json\s*/i, '').replace(/^```\s*/i, '').replace(/```\s*$/i, '');
    
    const data = JSON.parse(cleaned);
    
    // Convert to outline format
    const outline: any[] = [{
      level: 'H1',
      text: data.h1 || data.title || `${topic}: Complete Guide`,
      expanded: true,
      children: (data.sections || []).map((section: any) => ({
        level: 'H2',
        text: section.h2 || section.title || section.text || 'Section',
        expanded: true,
        children: (section.h3 || []).map((h3: string | any) => ({
          level: 'H3',
          text: typeof h3 === 'string' ? h3 : (h3.text || h3.title || 'Subsection'),
          expanded: false,
        })),
      })),
    }];

    return outline;
  } catch (e) {
    console.error('Error parsing outline JSON:', e);
    
    // Fallback: Try to extract headings from text
    const lines = result.split('\n').filter(line => line.trim());
    const outline: any[] = [{ level: 'H1', text: topic, expanded: true, children: [] }];
    
    let currentH2: any = null;
    for (const line of lines) {
      if (line.match(/^#\s+/)) { // H1
        outline[0].text = line.replace(/^#+\s+/, '').trim();
      } else if (line.match(/^##\s+/)) { // H2
        if (currentH2) outline[0].children.push(currentH2);
        currentH2 = { level: 'H2', text: line.replace(/^##+\s+/, '').trim(), expanded: true, children: [] };
      } else if (line.match(/^###\s+/) && currentH2) { // H3
        currentH2.children.push({ level: 'H3', text: line.replace(/^###+\s+/, '').trim(), expanded: false });
      }
    }
    if (currentH2) outline[0].children.push(currentH2);
    
    return outline.length > 0 && outline[0].children.length > 0 ? outline : [{
      level: 'H1',
      text: `${topic}: Complete Guide`,
      expanded: true,
      children: [
        { level: 'H2', text: `Introduction to ${topic}`, expanded: true, children: [] },
        { level: 'H2', text: `Benefits`, expanded: true, children: [] },
        { level: 'H2', text: `Best Practices`, expanded: true, children: [] },
        { level: 'H2', text: `Conclusion`, expanded: true, children: [] },
      ],
    }];
  }
}

export async function enhanceContent(content: string, enhancements: string[]): Promise<string[]> {
  const enhancementsText = enhancements.join(', ');

  const prompt = `Enhance and improve the following content by applying these enhancements: ${enhancementsText}

Content:
${content}

Requirements:
- Follow the exact format provided below
- Maintain the original structure and key points
- Apply all requested enhancements naturally
- Improve clarity, engagement, and readability

${BLOG_FORMAT_INSTRUCTIONS}

Now enhance the content following this exact format:`;

  const systemPrompt = 'You are an expert content editor who enhances blog content while maintaining its core message and structure. Maintain a similar length to the original content.';

  // Estimate word count from original content
  const originalWordCount = content.split(/\s+/).length;
  
  let result = await callGroqAPI(prompt, systemPrompt, originalWordCount);
  
  if (!result) {
    result = await callHuggingFaceAPI(prompt, systemPrompt, originalWordCount);
  }

  if (!result) {
    throw new Error('Failed to enhance content. Please try again.');
  }

  return result;
}
