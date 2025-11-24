// API Configuration:
// - OpenAI API: Used for all text generation (blogs, rewriting, SEO, etc.) and image generation (DALL-E)
//   Set VITE_OPENAI_API_KEY in .env.local

const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY || '';
const OPENAI_MODEL = 'gpt-4o-mini'; // Fast and efficient model

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
      
      // Use OpenAI API
      let result = await callOpenAI(variantPrompt, systemPrompt, wordCount);
      
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
      let result = await callOpenAI(basePrompt, systemPrompt, wordCount);
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
    throw new Error('Failed to generate any variants. Please check your OpenAI API key and try again.');
  }
  
  return variants;
}

// Helper function to call OpenAI API
async function callOpenAI(prompt: string, systemPrompt: string, wordCount?: number): Promise<string | null> {
  if (!OPENAI_API_KEY) {
    throw new Error('OpenAI API key is required. Please set VITE_OPENAI_API_KEY in your .env.local file.');
  }
  
  const maxTokens = wordCount ? calculateMaxTokens(wordCount) : 4000;
  
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: OPENAI_MODEL,
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
        max_tokens: Math.min(maxTokens, 16384),
      }),
    });

    if (response.ok) {
      const data = await response.json();
      const content = data.choices[0]?.message?.content?.trim();
      if (content) {
        console.log('OpenAI API: Successfully generated content');
        return content;
      }
    } else {
      const errorData = await response.json().catch(() => ({ error: { message: 'Unknown error' } }));
      console.error('OpenAI API error:', response.status, errorData);
      // If rate limited or unauthorized, don't retry
      if (response.status === 401 || response.status === 429) {
        throw new Error(`OpenAI API error: ${errorData.error?.message || errorData.error || 'Authentication or rate limit error'}`);
      }
    }
  } catch (error: any) {
    console.error('OpenAI API error:', error);
    // Re-throw if it's an auth/rate limit error
    if (error.message?.includes('OpenAI API error')) {
      throw error;
    }
  }
  return null;
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
  
  // Fallback: try single generation with OpenAI
  let result: string | null = null;
  
  try {
    result = await callOpenAI(prompt, systemPrompt, wordCount);
  } catch (error: any) {
    console.error('OpenAI API failed:', error?.message || error);
    throw new Error(`Failed to generate blog: ${error?.message || 'OpenAI API error'}. Please check your OpenAI API key.`);
  }

  if (!result) {
    throw new Error('Failed to generate blog. Please check your OpenAI API key and try again.');
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
  let result = await callOpenAI(prompt, systemPrompt, originalWordCount);
  
  if (!result) {
    throw new Error('Failed to rewrite blog. Please check your OpenAI API key and try again.');
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

  let result = await callOpenAI(prompt, systemPrompt);
  
  if (!result) {
    // Fallback: Generate simple topic ideas
    console.log('OpenAI API failed, using fallback topics');
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

export async function generateSEOKeywords(topic: string, count: number = 10): Promise<Array<{ keyword: string; score: number; lsi?: string[] }>> {
  const prompt = `You are an SEO keyword research expert. Generate EXACTLY ${count} highly relevant, searchable keywords for the topic: "${topic}"

CRITICAL REQUIREMENTS:
1. ALL keywords MUST be directly related to "${topic}" - no generic words like "json", "word", "score", etc.
2. Generate EXACTLY ${count} keywords that people would actually search for about "${topic}"
3. Include a mix of:
   - Short-tail keywords (1-2 words): broad, high-volume terms
   - Long-tail keywords (3-5 words): specific, targeted phrases
4. Each keyword should be something a real person would type into Google when searching about "${topic}"
5. For each keyword, provide 3-5 LSI (semantically related) keywords

IMPORTANT: Focus ONLY on keywords that are specifically about "${topic}". Do NOT include generic technical terms or unrelated words.

Return ONLY valid JSON array in this exact format (no additional text, no explanations):
[
  {
    "keyword": "specific keyword about ${topic}",
    "score": 95,
    "lsi": ["related term 1", "related term 2", "related term 3"]
  },
  {
    "keyword": "another specific keyword about ${topic}",
    "score": 88,
    "lsi": ["related term 1", "related term 2", "related term 3"]
  }
]

Now generate exactly ${count} relevant keywords specifically about "${topic}":`;

  const systemPrompt = `You are a professional SEO keyword research specialist. Your task is to generate highly relevant, searchable keywords that are SPECIFICALLY related to the given topic.

RULES:
1. Only generate keywords that are directly related to the topic
2. Think about what real users would search for on Google
3. Include both broad and specific keywords
4. Provide LSI (semantically related) terms for each keyword
5. Return ONLY valid JSON array - no markdown, no explanations, just the JSON array

CRITICAL: Never include generic words or unrelated terms. Every keyword must be about the given topic.`;

  // Use OpenAI API
  let result = await callOpenAI(prompt, systemPrompt);
  
  if (!result) {
    throw new Error('Failed to generate keywords. Please check your OpenAI API key and try again.');
  }
  
  // If result is empty, use fallback
  if (!result || result.trim().length === 0) {
    // Fallback keywords with basic LSI
    return Array.from({ length: count }, (_, i) => ({
      keyword: `${topic} ${i + 1 === 1 ? 'guide' : i + 1 === 2 ? 'tips' : i + 1 === 3 ? 'strategy' : 'best practices'}`,
      score: 85 - (i * 5),
      lsi: [`${topic} techniques`, `${topic} methods`, `${topic} examples`],
    }));
  }

  // Helper function to check if keyword is relevant
  const isKeywordRelevant = (keyword: string): boolean => {
    const kw = keyword.toLowerCase().trim();
    const topicLower = topic.toLowerCase();
    const topicWords = topicLower.split(' ').filter(w => w.length > 2);
    
    // Generic words to exclude
    const genericWords = ['json', 'word', 'score', 'keyword', 'example', 'format', 'array', 'object', 'string', 'number', 'value', 'field', 'data', 'item', 's for', 'for the', 'the topic'];
    const isGeneric = genericWords.some(gw => kw === gw || kw.includes(` ${gw} `) || kw.startsWith(`${gw} `) || kw.endsWith(` ${gw}`));
    
    // Must be related to topic
    const isRelated = topicWords.some(tw => kw.includes(tw)) || kw.includes(topicLower) || topicLower.includes(kw);
    
    // Valid length
    const isValidLength = kw.length > 3 && kw.length < 60;
    
    // Should not be just numbers or single letters
    const isNotGeneric = !/^(s|json|word|score|\d+)$/i.test(kw);
    
    return !isGeneric && isValidLength && isNotGeneric && (isRelated || kw.length > 15);
  };

  // Try to parse JSON
  try {
    let cleaned = result.trim();
    // Remove markdown code blocks
    cleaned = cleaned.replace(/^```json\s*/i, '').replace(/^```\s*/i, '').replace(/```\s*$/i, '');
    // Extract JSON array from text
    const jsonMatch = cleaned.match(/\[[\s\S]*\]/);
    if (jsonMatch) {
      cleaned = jsonMatch[0];
    }
    
    const keywords = JSON.parse(cleaned);
    if (Array.isArray(keywords) && keywords.length > 0) {
      // Filter and map valid keywords
      const validKeywords = keywords
        .map((item: any) => {
          const keyword = String(item.keyword || item.key || item || '').trim();
          if (!keyword || !isKeywordRelevant(keyword)) return null;
          
          return {
            keyword: keyword,
            score: typeof item.score === 'number' ? item.score : Math.floor(95 - Math.random() * 20),
            lsi: Array.isArray(item.lsi) 
              ? item.lsi.slice(0, 5).filter((l: string) => l && typeof l === 'string' && l.trim().length > 2)
              : (Array.isArray(item.related) ? item.related.slice(0, 5) : []) || [],
          };
        })
        .filter((kw): kw is { keyword: string; score: number; lsi: string[] } => kw !== null);
      
      if (validKeywords.length > 0) {
        return validKeywords.slice(0, count);
      }
    }
  } catch (e) {
    console.error('Error parsing keywords JSON:', e);
    console.log('Raw API response:', result);
  }

  // Fallback: Extract keywords from text more carefully
  const topicLower = topic.toLowerCase();
  const topicWords = topicLower.split(' ').filter(w => w.length > 2);
  const genericWords = ['json', 'word', 'score', 'keyword', 'example', 'format', 'array', 'object', 's for', 'for the'];
  
  const lines = result.split('\n').filter(line => {
    const trimmed = line.trim().toLowerCase();
    if (trimmed.length < 5 || trimmed.length > 80) return false;
    if (trimmed.includes('example') || trimmed.includes('format') || trimmed.includes('critical') || trimmed.includes('requirements')) return false;
    
    // Check if line contains topic-related words
    const hasTopicWord = topicWords.some(tw => trimmed.includes(tw)) || trimmed.includes(topicLower);
    const hasGeneric = genericWords.some(gw => trimmed === gw || trimmed.includes(` ${gw} `));
    
    return hasTopicWord && !hasGeneric;
  });

  // Extract keywords from lines
  const extractedKeywords: string[] = [];
  for (const line of lines) {
    // Try JSON format extraction
    const jsonMatch = line.match(/"keyword"\s*:\s*"([^"]+)"/i);
    if (jsonMatch) {
      const kw = jsonMatch[1].trim();
      if (isKeywordRelevant(kw)) extractedKeywords.push(kw);
      continue;
    }
    
    // Try quoted string
    const quoteMatch = line.match(/"([^"]{4,50})"/);
    if (quoteMatch) {
      const kw = quoteMatch[1].trim();
      if (isKeywordRelevant(kw)) extractedKeywords.push(kw);
      continue;
    }
    
    // Extract from line content
    let keyword = line.replace(/[^\w\s-]/g, ' ').trim();
    keyword = keyword.split(/\s+/).slice(0, 5).join(' ');
    if (isKeywordRelevant(keyword)) extractedKeywords.push(keyword);
    
    if (extractedKeywords.length >= count) break;
  }

  // Generate LSI terms for extracted keywords
  return extractedKeywords.slice(0, count).map((keyword, idx) => {
    const words = keyword.split(' ');
    const topicWordsArray = topic.split(' ').slice(0, 2);
    const lsiTerms = [
      `${keyword} guide`,
      `${keyword} tips`,
      ...topicWordsArray.map(tw => `${keyword} ${tw}`),
      `${keyword} examples`,
    ].filter(t => t.length < 50 && isKeywordRelevant(t.split(' ')[0] || t)).slice(0, 5);
    
    return {
      keyword: keyword,
      score: Math.max(50, Math.min(100, 95 - idx * 5)),
      lsi: lsiTerms.length > 0 ? lsiTerms : [`${keyword} guide`, `${keyword} tips`, `${keyword} strategies`],
    };
  });
}

export async function generateVideoScript(blogContent: string): Promise<string> {
  const prompt = `Convert the following blog content into an engaging video script. The script must include:

1. **HOOK (15-30 seconds)**: A captivating opening that grabs attention immediately
2. **INTRODUCTION**: Brief intro of what the video is about
3. **MAIN CONTENT**: Break down the blog into engaging video segments with clear topics
4. **TRANSITIONS**: Smooth transitions between topics
5. **JOKES/HUMOR**: Add 2-3 appropriate jokes or light-hearted moments throughout
6. **ENDING/CALL-TO-ACTION**: Strong conclusion with clear call-to-action
7. **VISUAL CUES**: Suggestions for visuals, on-screen text, or graphics

Format the script with timestamps and clear sections. Make it conversational, engaging, and suitable for YouTube/TikTok/Instagram Reels.

Blog Content:
${blogContent.substring(0, 8000)}${blogContent.length > 8000 ? '...' : ''}

Now create a complete video script following this format:
[HOOK - 0:00-0:30]
[Text to say]

[INTRO - 0:30-0:45]
[Text to say]

[TOPIC 1 - 0:45-X:XX]
[Text to say]
[Visual: description]

[TOPIC 2 - X:XX-X:XX]
[Text to say]
[Visual: description]

...continue for all topics...

[ENDING - X:XX-X:XX]
[Text to say]
[Call to action]

Remember to:
- Keep each segment concise and punchy
- Add natural humor and jokes
- Include engaging questions or hooks
- Make it feel conversational, not robotic
- Add visual suggestions where helpful`;

  const systemPrompt = `You are an expert video script writer who creates engaging, conversational scripts for social media platforms. You excel at creating hooks, adding humor naturally, and structuring content for maximum engagement. Always include timestamps, visual cues, and make the script feel natural and fun.`;

  // Use OpenAI API only
  let result = await callOpenAI(prompt, systemPrompt);
  
  if (!result) {
    throw new Error('Failed to generate video script. Please check your OpenAI API key and try again.');
  }

  return result;
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
    
    let result = await callOpenAI(variantPrompt, systemPrompt);
    
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
  
  let result = await callOpenAI(prompt, systemPrompt, originalWordCount);
  
  if (!result) {
    throw new Error('Failed to enhance content. Please check your OpenAI API key and try again.');
  }

  // Generate multiple variants
  try {
    const variants = await generateMultipleVariants(prompt, systemPrompt, originalWordCount, 3);
    if (variants.length > 0) {
      return variants;
    }
  } catch (error: any) {
    console.error('Error generating enhance variants:', error);
  }

  return [result];
}

export async function analyzeCompetitor(content: string): Promise<{
  wordCount: number;
  keywords: string[];
  structure: {
    h1: number;
    h2: number;
    h3: number;
    images: number;
  };
  mainTopic: string;
  summary: string;
  contentGaps: string[];
  weakSections: Array<{ section: string; score: number }>;
  overallScore: number;
}> {
  const prompt = `Analyze the following competitor blog content and provide a detailed analysis in JSON format.

Content:
${content.substring(0, 8000)}${content.length > 8000 ? '...' : ''}

Provide a comprehensive analysis in this exact JSON format:
{
  "wordCount": <number of words>,
  "keywords": [<array of main keywords used, at least 10>],
  "structure": {
    "h1": <number of H1 tags>,
    "h2": <number of H2 tags>,
    "h3": <number of H3 tags>,
    "images": <estimated number of images based on content>
  },
  "mainTopic": "<one sentence describing what the content is about>",
  "summary": "<2-3 sentence summary of the content>",
  "contentGaps": [
    "<specific gap or missing topic 1>",
    "<specific gap or missing topic 2>",
    "<specific gap or missing topic 3>",
    "<specific gap or missing topic 4>",
    "<specific gap or missing topic 5>"
  ],
  "weakSections": [
    {"section": "<section name>", "score": <0-100>},
    {"section": "<section name>", "score": <0-100>},
    {"section": "<section name>", "score": <0-100>}
  ],
  "overallScore": <0-100 based on SEO, content quality, structure, etc.>
}

Important:
- Count actual words in the content
- Extract relevant, topic-specific keywords only (not generic words)
- Identify real content gaps that can be exploited
- Analyze structure from markdown/HTML patterns
- Provide realistic scores based on content quality
- Be specific and actionable`;

  const systemPrompt = 'You are an expert SEO and content analyst who analyzes competitor content to find opportunities. Provide detailed, actionable insights.';

  const wordCount = Math.ceil(content.split(/\s+/).length * 1.2); // Estimate for API call
  
  let result = await callOpenAI(prompt, systemPrompt, wordCount);
  
  if (!result) {
    throw new Error('Failed to analyze content. Please check your OpenAI API key and try again.');
  }

  // Try to parse JSON response
  try {
    let cleaned = result.trim();
    cleaned = cleaned.replace(/^```json\s*/i, '').replace(/^```\s*/i, '').replace(/```\s*$/i, '');
    
    const analysis = JSON.parse(cleaned);
    
    // Validate and set defaults
    return {
      wordCount: typeof analysis.wordCount === 'number' ? analysis.wordCount : content.split(/\s+/).length,
      keywords: Array.isArray(analysis.keywords) && analysis.keywords.length > 0 
        ? analysis.keywords.slice(0, 20).filter((k: any) => k && typeof k === 'string' && k.trim().length > 2)
        : [],
      structure: {
        h1: typeof analysis.structure?.h1 === 'number' ? analysis.structure.h1 : Math.max(1, (content.match(/^#\s+/gm) || []).length),
        h2: typeof analysis.structure?.h2 === 'number' ? analysis.structure.h2 : (content.match(/^##\s+/gm) || []).length,
        h3: typeof analysis.structure?.h3 === 'number' ? analysis.structure.h3 : (content.match(/^###\s+/gm) || []).length,
        images: typeof analysis.structure?.images === 'number' ? analysis.structure.images : (content.match(/!\[.*?\]/g) || []).length,
      },
      mainTopic: typeof analysis.mainTopic === 'string' ? analysis.mainTopic.trim() : 'Content analysis',
      summary: typeof analysis.summary === 'string' ? analysis.summary.trim() : 'Content analysis completed.',
      contentGaps: Array.isArray(analysis.contentGaps) && analysis.contentGaps.length > 0
        ? analysis.contentGaps.slice(0, 5).filter((g: any) => g && typeof g === 'string' && g.trim().length > 5)
        : [
            'Missing practical implementation examples',
            'Limited discussion on ROI metrics',
            'No case studies or success stories',
            'Weak coverage of future trends',
            'Missing detailed step-by-step guides'
          ],
      weakSections: Array.isArray(analysis.weakSections) && analysis.weakSections.length > 0
        ? analysis.weakSections.slice(0, 3).filter((s: any) => s && s.section && typeof s.section === 'string')
        : [
            { section: 'Introduction', score: 65 },
            { section: 'Main Content', score: 72 },
            { section: 'Conclusion', score: 68 }
          ],
      overallScore: typeof analysis.overallScore === 'number' && analysis.overallScore >= 0 && analysis.overallScore <= 100
        ? analysis.overallScore
        : 75,
    };
  } catch (e) {
    console.error('Error parsing analysis JSON:', e);
    console.log('Raw API response:', result);
    
    // Fallback: Basic analysis from content
    const words = content.split(/\s+/).filter(w => w.length > 0);
    const h1Matches = content.match(/^#\s+/gm) || [];
    const h2Matches = content.match(/^##\s+/gm) || [];
    const h3Matches = content.match(/^###\s+/gm) || [];
    const imageMatches = content.match(/!\[.*?\]/g) || [];
    
    // Extract keywords from content (simple word frequency)
    const wordFreq: { [key: string]: number } = {};
    words.forEach(word => {
      const clean = word.toLowerCase().replace(/[^\w]/g, '');
      if (clean.length > 4) {
        wordFreq[clean] = (wordFreq[clean] || 0) + 1;
      }
    });
    const topKeywords = Object.entries(wordFreq)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 15)
      .map(([word]) => word);
    
    return {
      wordCount: words.length,
      keywords: topKeywords,
      structure: {
        h1: Math.max(1, h1Matches.length),
        h2: h2Matches.length,
        h3: h3Matches.length,
        images: imageMatches.length,
      },
      mainTopic: 'Content analysis - topic extraction from API failed',
      summary: 'Content analysis completed. Detailed insights could not be extracted from API response.',
      contentGaps: [
        'Missing practical implementation examples',
        'Limited discussion on ROI metrics',
        'No case studies or success stories',
        'Weak coverage of future trends',
        'Missing detailed step-by-step guides'
      ],
      weakSections: [
        { section: 'Introduction', score: 65 },
        { section: 'Main Content', score: 72 },
        { section: 'Conclusion', score: 68 }
      ],
      overallScore: 75,
    };
  }
}

export async function generateImage(prompt: string, options: {
  style?: string;
  size?: '1024x1024' | '1792x1024' | '1024x1792';
  quality?: 'standard' | 'hd';
}): Promise<{
  url: string;
  revisedPrompt?: string;
}> {
  const { style = 'photographic', size = '1024x1024', quality = 'standard' } = options;

  if (!OPENAI_API_KEY) {
    throw new Error('OpenAI API key is required for image generation. Please set VITE_OPENAI_API_KEY in your environment variables.');
  }

  // Enhance prompt with style - prioritize realistic photography
  const stylePrompts: { [key: string]: string } = {
    minimal: 'professional photography, realistic, natural lighting, minimal composition, high detail, 8k resolution',
    'stock-photo': 'professional stock photography, ultra-realistic, natural lighting, high detail, 8k resolution, photorealistic, DSLR camera quality',
    illustration: 'artistic illustration, hand-drawn style, creative, colorful',
    abstract: 'abstract art, geometric shapes, modern, contemporary, vibrant colors',
    photographic: 'professional photography, ultra-realistic, photorealistic, natural lighting, high detail, 8k resolution, DSLR camera quality, sharp focus, professional composition',
  };

  const stylePrompt = stylePrompts[style] || stylePrompts.photographic;
  // Always add realistic photography keywords for better results
  const enhancedPrompt = `${prompt}, ${stylePrompt}, ultra-realistic, photorealistic, high resolution, professional photography, natural lighting, sharp focus, no illustration, no cartoon, no digital art, real photo quality`;

  try {
    const response = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'dall-e-3',
        prompt: enhancedPrompt,
        n: 1,
        size: size,
        quality: 'hd', // Always use HD for best quality
        style: 'natural', // Use natural style for realistic photos
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error?.message || 'Failed to generate image');
    }

    const data = await response.json();
    
    return {
      url: data.data[0].url,
      revisedPrompt: data.data[0].revised_prompt,
    };
  } catch (error: any) {
    console.error('Error generating image:', error);
    throw new Error(error.message || 'Failed to generate image. Please try again.');
  }
}
