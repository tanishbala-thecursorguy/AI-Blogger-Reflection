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

export async function generateBlog(options: {
  topic: string;
  style: string;
  wordCount: number;
  keywords: string[];
  seoMode: boolean;
}): Promise<string> {
  const { topic, style, wordCount, keywords, seoMode } = options;

  const keywordsText = keywords.length > 0 ? `Target keywords: ${keywords.join(', ')}. ` : '';
  const seoText = seoMode ? 'Optimize for SEO and include target keywords naturally. ' : '';

  const prompt = `Write a comprehensive blog post about "${topic}" in a ${style} writing style.

CRITICAL REQUIREMENTS:
- EXACT word count: ${wordCount} words (NO MORE, NO LESS - this is essential)
- You MUST write exactly ${wordCount} words, not ${wordCount + 100}, not ${wordCount - 100}, but EXACTLY ${wordCount} words
- Count your words carefully and ensure the final output is exactly ${wordCount} words
${keywordsText}${seoText}
- Follow the exact format provided below
- Use clear, professional language
- Include practical examples and actionable advice
- Make it beginner-friendly yet expert-level
- Ensure all sections from the template are included
- Adjust the length of each section to meet the ${wordCount} word requirement

${BLOG_FORMAT_INSTRUCTIONS}

Now write the blog post following this exact format. Remember: The total word count MUST be exactly ${wordCount} words.`;

  const systemPrompt = `You are an expert blog writer who creates clear, educational, SEO-optimized content that follows exact formatting instructions. You ALWAYS write the EXACT number of words requested - never more, never less. If asked for ${wordCount} words, you write exactly ${wordCount} words.`;

  // Try Groq first (faster), then Hugging Face
  let result: string | null = null;
  let groqError: Error | null = null;
  
  try {
    result = await callGroqAPI(prompt, systemPrompt, wordCount);
  } catch (error: any) {
    groqError = error;
    console.log('Groq API failed, trying Hugging Face fallback...');
  }
  
  if (!result && !groqError) {
    console.log('Groq API returned no result, trying Hugging Face fallback...');
    result = await callHuggingFaceAPI(prompt, systemPrompt, wordCount);
  }
  
  // Verify word count if result is close
  if (result) {
    const actualWordCount = result.split(/\s+/).length;
    const difference = Math.abs(actualWordCount - wordCount);
    const tolerance = Math.ceil(wordCount * 0.1); // 10% tolerance
    
    if (difference > tolerance) {
      console.log(`Word count: requested ${wordCount}, got ${actualWordCount}, difference: ${difference}`);
      // Try to adjust if way off (but don't fail if close)
      if (difference > wordCount * 0.2) { // More than 20% off
        console.warn(`Warning: Generated content has ${actualWordCount} words, requested ${wordCount}`);
      }
    }
  }

  if (!result) {
    if (groqError) {
      throw groqError;
    }
    throw new Error('Failed to generate blog. Please try again. If using Hugging Face, the model may need a moment to load.');
  }

  return result;
}

export async function rewriteBlog(content: string, options: {
  style?: string;
  tone?: string;
  improvements?: string[];
}): Promise<string> {
  const { style, tone, improvements = [] } = options;

  const improvementsText = improvements.length > 0 
    ? `\nApply these improvements: ${improvements.join(', ')}.`
    : '';

  const prompt = `Rewrite and improve the following blog post content:

${content}

Requirements:
${style ? `- Writing style: ${style}` : ''}
${tone ? `- Tone: ${tone}` : ''}
${improvementsText}
- Follow the exact format provided below
- Maintain all key information while improving clarity and structure
- Make it more engaging and professional
- Ensure SEO optimization

${BLOG_FORMAT_INSTRUCTIONS}

Now rewrite the blog post following this exact format:`;

  const systemPrompt = 'You are an expert blog editor who rewrites content to be clearer, more engaging, and better structured while maintaining the original information.';

  let result = await callGroqAPI(prompt, systemPrompt);
  
  if (!result) {
    result = await callHuggingFaceAPI(prompt, systemPrompt);
  }

  if (!result) {
    throw new Error('Failed to rewrite blog. Please try again.');
  }

  return result;
}

export async function generateTopics(niche: string, count: number = 10): Promise<string[]> {
  const prompt = `Generate ${count} engaging blog topic ideas for the niche: "${niche}"

Requirements:
- Topics should be SEO-friendly and keyword-rich
- They should be actionable and valuable to readers
- Include variety (how-to guides, listicles, comparisons, etc.)
- Make topics specific and interesting
- Return topics as a numbered list, one per line`;

  const systemPrompt = 'You are an expert content strategist who generates engaging blog topic ideas.';

  let result = await callGroqAPI(prompt, systemPrompt);
  
  if (!result) {
    result = await callHuggingFaceAPI(prompt, systemPrompt);
  }

  if (!result) {
    // Fallback: Generate simple topic ideas
    return Array.from({ length: count }, (_, i) => 
      `${niche} - Topic ${i + 1}: Essential guide and best practices`
    );
  }

  // Extract topics from the response
  const lines = result.split('\n').filter(line => {
    const trimmed = line.trim();
    return trimmed && (/^\d+[\.\)]\s/.test(trimmed) || /^[-•]\s/.test(trimmed) || (trimmed.length > 10 && trimmed.length < 200));
  });
  
  const topics = lines.map(line => {
    // Remove numbering/bullets and quotes
    return line.replace(/^\d+[\.\)]\s*/, '').replace(/^[-•]\s*/, '').replace(/^"|"$/g, '').trim();
  }).filter(topic => topic.length > 5 && topic.length < 200);
  
  // If we got good topics, return them
  if (topics.length >= 3) {
    return topics.slice(0, count);
  }
  
  // Fallback
  return Array.from({ length: count }, (_, i) => 
    `${niche} - Topic ${i + 1}: Essential guide and tips`
  );
}

export async function enhanceContent(content: string, enhancements: string[]): Promise<string> {
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
