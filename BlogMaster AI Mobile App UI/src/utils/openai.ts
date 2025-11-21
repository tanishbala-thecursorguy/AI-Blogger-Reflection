// Using Hugging Face Inference API (free, no API key required)
// Optional: Set VITE_HUGGINGFACE_API_KEY for higher rate limits
const HUGGINGFACE_API_KEY = import.meta.env.VITE_HUGGINGFACE_API_KEY || '';

// Model to use - using Meta's Llama 3.1 8B (free and fast)
const MODEL_NAME = 'meta-llama/Meta-Llama-3.1-8B-Instruct';

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

Requirements:
- Word count: Approximately ${wordCount} words
${keywordsText}${seoText}
- Follow the exact format provided below
- Use clear, professional language
- Include practical examples and actionable advice
- Make it beginner-friendly yet expert-level
- Ensure all sections from the template are included

${BLOG_FORMAT_INSTRUCTIONS}

Now write the blog post following this exact format:`;

  try {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };
    
    // Add API key if available for higher rate limits
    if (HUGGINGFACE_API_KEY) {
      headers['Authorization'] = `Bearer ${HUGGINGFACE_API_KEY}`;
    }

    const response = await fetch(`https://api-inference.huggingface.co/models/${MODEL_NAME}`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        inputs: `<|system|>\nYou are an expert blog writer who creates clear, educational, SEO-optimized content that follows exact formatting instructions.\n<|user|>\n${prompt}\n<|assistant|>`,
        parameters: {
          temperature: 0.7,
          max_new_tokens: 4000,
          return_full_text: false,
        },
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      let errorMessage = 'Failed to generate blog';
      
      try {
        const error = JSON.parse(errorText);
        errorMessage = error.error || error.message || errorMessage;
      } catch (e) {
        errorMessage = errorText || errorMessage;
      }
      
      throw new Error(errorMessage);
    }

    const data = await response.json();
    
    // Handle Hugging Face response format
    if (Array.isArray(data) && data[0]?.generated_text) {
      return data[0].generated_text.trim();
    } else if (data.generated_text) {
      return data.generated_text.trim();
    } else if (data[0]?.text) {
      return data[0].text.trim();
    }
    
    throw new Error('Unexpected response format from API');
  } catch (error: any) {
    console.error('Error generating blog:', error);
    
    // If rate limited or model loading, wait and retry once
    if (error.message?.includes('loading') || error.message?.includes('rate')) {
      await new Promise(resolve => setTimeout(resolve, 10000)); // Wait 10 seconds
      
      try {
        const headers: Record<string, string> = {
          'Content-Type': 'application/json',
        };
        
        if (HUGGINGFACE_API_KEY) {
          headers['Authorization'] = `Bearer ${HUGGINGFACE_API_KEY}`;
        }

        const retryResponse = await fetch(`https://api-inference.huggingface.co/models/${MODEL_NAME}`, {
          method: 'POST',
          headers,
          body: JSON.stringify({
            inputs: `<|system|>\nYou are an expert blog writer who creates clear, educational, SEO-optimized content that follows exact formatting instructions.\n<|user|>\n${prompt}\n<|assistant|>`,
            parameters: {
              temperature: 0.7,
              max_new_tokens: 4000,
              return_full_text: false,
            },
          }),
        });

        if (retryResponse.ok) {
          const retryData = await retryResponse.json();
          if (Array.isArray(retryData) && retryData[0]?.generated_text) {
            return retryData[0].generated_text.trim();
          } else if (retryData.generated_text) {
            return retryData.generated_text.trim();
          }
        }
      } catch (retryError) {
        // Fall through to throw original error
      }
    }
    
    throw new Error(error.message || 'Failed to generate blog. Please try again.');
  }
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

  try {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };
    
    if (HUGGINGFACE_API_KEY) {
      headers['Authorization'] = `Bearer ${HUGGINGFACE_API_KEY}`;
    }

    const response = await fetch(`https://api-inference.huggingface.co/models/${MODEL_NAME}`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        inputs: `<|system|>\nYou are an expert blog editor who rewrites content to be clearer, more engaging, and better structured while maintaining the original information.\n<|user|>\n${prompt}\n<|assistant|>`,
        parameters: {
          temperature: 0.7,
          max_new_tokens: 4000,
          return_full_text: false,
        },
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      let errorMessage = 'Failed to rewrite blog';
      
      try {
        const error = JSON.parse(errorText);
        errorMessage = error.error || error.message || errorMessage;
      } catch (e) {
        errorMessage = errorText || errorMessage;
      }
      
      throw new Error(errorMessage);
    }

    const data = await response.json();
    
    if (Array.isArray(data) && data[0]?.generated_text) {
      return data[0].generated_text.trim();
    } else if (data.generated_text) {
      return data.generated_text.trim();
    } else if (data[0]?.text) {
      return data[0].text.trim();
    }
    
    throw new Error('Unexpected response format from API');
  } catch (error: any) {
    console.error('Error rewriting blog:', error);
    throw new Error(error.message || 'Failed to rewrite blog. Please try again.');
  }
}

export async function generateTopics(niche: string, count: number = 10): Promise<string[]> {
  const prompt = `Generate ${count} engaging blog topic ideas for the niche: "${niche}"

Requirements:
- Topics should be SEO-friendly and keyword-rich
- They should be actionable and valuable to readers
- Include variety (how-to guides, listicles, comparisons, etc.)
- Make topics specific and interesting

Return only a JSON array of topic strings, no other text.`;

  try {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };
    
    if (HUGGINGFACE_API_KEY) {
      headers['Authorization'] = `Bearer ${HUGGINGFACE_API_KEY}`;
    }

    const response = await fetch(`https://api-inference.huggingface.co/models/${MODEL_NAME}`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        inputs: `<|system|>\nYou are an expert content strategist who generates engaging blog topic ideas. Always return topics as a numbered list, one per line.\n<|user|>\n${prompt}\n<|assistant|>`,
        parameters: {
          temperature: 0.8,
          max_new_tokens: 1000,
          return_full_text: false,
        },
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      let errorMessage = 'Failed to generate topics';
      
      try {
        const error = JSON.parse(errorText);
        errorMessage = error.error || error.message || errorMessage;
      } catch (e) {
        errorMessage = errorText || errorMessage;
      }
      
      throw new Error(errorMessage);
    }

    const data = await response.json();
    let content = '';
    
    if (Array.isArray(data) && data[0]?.generated_text) {
      content = data[0].generated_text.trim();
    } else if (data.generated_text) {
      content = data.generated_text.trim();
    } else if (data[0]?.text) {
      content = data[0].text.trim();
    }
    
    // Extract topics from the response
    const lines = content.split('\n').filter(line => {
      const trimmed = line.trim();
      return trimmed && (/^\d+[\.\)]\s/.test(trimmed) || /^[-•]\s/.test(trimmed) || trimmed.length > 10);
    });
    
    const topics = lines.map(line => {
      // Remove numbering/bullets
      return line.replace(/^\d+[\.\)]\s*/, '').replace(/^[-•]\s*/, '').replace(/^"|"$/g, '').trim();
    }).filter(topic => topic.length > 5 && topic.length < 200);
    
    // If we got good topics, return them; otherwise return a default list
    if (topics.length >= 3) {
      return topics.slice(0, count);
    }
    
    // Fallback: Generate simple topic ideas
    return Array.from({ length: count }, (_, i) => 
      `${niche} - Topic ${i + 1}: Advanced strategies and best practices`
    );
  } catch (error: any) {
    console.error('Error generating topics:', error);
    
    // Return fallback topics
    return Array.from({ length: count }, (_, i) => 
      `${niche} - Topic ${i + 1}: Essential guide and tips`
    );
  }
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

  try {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };
    
    if (HUGGINGFACE_API_KEY) {
      headers['Authorization'] = `Bearer ${HUGGINGFACE_API_KEY}`;
    }

    const response = await fetch(`https://api-inference.huggingface.co/models/${MODEL_NAME}`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        inputs: `<|system|>\nYou are an expert content editor who enhances blog content while maintaining its core message and structure.\n<|user|>\n${prompt}\n<|assistant|>`,
        parameters: {
          temperature: 0.7,
          max_new_tokens: 4000,
          return_full_text: false,
        },
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      let errorMessage = 'Failed to enhance content';
      
      try {
        const error = JSON.parse(errorText);
        errorMessage = error.error || error.message || errorMessage;
      } catch (e) {
        errorMessage = errorText || errorMessage;
      }
      
      throw new Error(errorMessage);
    }

    const data = await response.json();
    
    if (Array.isArray(data) && data[0]?.generated_text) {
      return data[0].generated_text.trim();
    } else if (data.generated_text) {
      return data.generated_text.trim();
    } else if (data[0]?.text) {
      return data[0].text.trim();
    }
    
    throw new Error('Unexpected response format from API');
  } catch (error: any) {
    console.error('Error enhancing content:', error);
    throw new Error(error.message || 'Failed to enhance content. Please try again.');
  }
}

