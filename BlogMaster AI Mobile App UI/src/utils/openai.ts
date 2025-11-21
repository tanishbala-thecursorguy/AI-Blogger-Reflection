const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY || '';

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
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: 'You are an expert blog writer who creates clear, educational, SEO-optimized content that follows exact formatting instructions.',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.7,
        max_tokens: 4000,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error?.message || 'Failed to generate blog');
    }

    const data = await response.json();
    return data.choices[0]?.message?.content || 'Failed to generate content';
  } catch (error) {
    console.error('Error generating blog:', error);
    throw error;
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
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: 'You are an expert blog editor who rewrites content to be clearer, more engaging, and better structured while maintaining the original information.',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.7,
        max_tokens: 4000,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error?.message || 'Failed to rewrite blog');
    }

    const data = await response.json();
    return data.choices[0]?.message?.content || 'Failed to rewrite content';
  } catch (error) {
    console.error('Error rewriting blog:', error);
    throw error;
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
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: 'You are an expert content strategist who generates engaging blog topic ideas.',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.8,
        max_tokens: 1000,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error?.message || 'Failed to generate topics');
    }

    const data = await response.json();
    const content = data.choices[0]?.message?.content || '[]';
    
    try {
      return JSON.parse(content);
    } catch {
      // If not JSON, try to extract topics from text
      const lines = content.split('\n').filter(line => line.trim() && /^[\d\-•]/.test(line.trim()));
      return lines.map(line => line.replace(/^[\d\-•\s]+/, '').trim()).filter(Boolean);
    }
  } catch (error) {
    console.error('Error generating topics:', error);
    throw error;
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
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: 'You are an expert content editor who enhances blog content while maintaining its core message and structure.',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.7,
        max_tokens: 4000,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error?.message || 'Failed to enhance content');
    }

    const data = await response.json();
    return data.choices[0]?.message?.content || 'Failed to enhance content';
  } catch (error) {
    console.error('Error enhancing content:', error);
    throw error;
  }
}

