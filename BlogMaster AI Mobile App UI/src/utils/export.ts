// Export utilities for converting blog content to various formats

export interface ExportOptions {
  title?: string;
  content: string;
  format: string;
}

// Convert blog to newsletter format
export function convertToNewsletter(content: string, title?: string): string {
  // Extract main sections and format for email
  const sections = content.split(/\n##\s+/);
  let newsletter = '';
  
  if (title) {
    newsletter += `Subject: ${title}\n\n`;
  }
  
  newsletter += `Hi there!\n\n`;
  newsletter += `I hope this email finds you well. I wanted to share something important with you today...\n\n`;
  newsletter += `---\n\n`;
  
  sections.forEach((section, idx) => {
    if (idx === 0) {
      // Introduction
      newsletter += section.replace(/^#+\s+/, '').replace(/\n/g, '\n') + '\n\n';
    } else {
      const lines = section.split('\n');
      const heading = lines[0];
      const body = lines.slice(1).join('\n').trim();
      
      newsletter += `**${heading}**\n\n`;
      newsletter += body.substring(0, 300) + (body.length > 300 ? '...' : '') + '\n\n';
    }
  });
  
  newsletter += `---\n\n`;
  newsletter += `Want to read the full article? [Click here](link)\n\n`;
  newsletter += `Best regards,\nYour Name`;
  
  return newsletter;
}

// Convert blog to tweet thread
export function convertToTweetThread(content: string, title?: string): string {
  const maxTweetLength = 280;
  const tweets: string[] = [];
  
  if (title) {
    tweets.push(`🧵 ${title}\n\nA thread on what you need to know...\n\n1/`);
  }
  
  // Extract key points
  const bulletPoints = content.match(/- (.+)/g) || [];
  const headings = content.match(/^##\s+(.+)$/gm) || [];
  
  let tweetNumber = title ? 2 : 1;
  
  headings.forEach((heading, idx) => {
    const cleanHeading = heading.replace(/^##\s+/, '').trim();
    tweets.push(`${tweetNumber}/${tweetNumber + headings.length}\n\n${cleanHeading}`);
    tweetNumber++;
  });
  
  // Add key points as separate tweets
  bulletPoints.slice(0, 5).forEach((point, idx) => {
    const cleanPoint = point.replace(/^-\s+/, '').trim();
    if (cleanPoint.length <= maxTweetLength - 10) {
      tweets.push(`${tweetNumber}/${tweetNumber + Math.min(bulletPoints.length, 5)}\n\n💡 ${cleanPoint}`);
      tweetNumber++;
    }
  });
  
  tweets.push(`${tweetNumber}/ END 🧵\n\nThanks for reading! 🙏`);
  
  return tweets.join('\n\n---\n\n');
}

// Convert blog to Instagram carousel posts
export function convertToInstagramCarousel(content: string, title?: string): string[] {
  const posts: string[] = [];
  
  const headings = content.match(/^##\s+(.+)$/gm) || [];
  const sections = content.split(/\n##\s+/);
  
  // Cover slide
  if (title) {
    posts.push(`${title}\n\nSwipe for more 👉`);
  }
  
  // Section slides
  sections.slice(0, 8).forEach((section, idx) => {
    const lines = section.split('\n');
    const heading = lines[0].replace(/^#+\s+/, '').trim();
    const body = lines.slice(1).join(' ').substring(0, 200).trim();
    
    let post = '';
    if (heading) post += `${heading}\n\n`;
    post += body + (body.length >= 200 ? '...' : '');
    
    // Add relevant hashtags
    const words = heading.split(' ').slice(0, 3);
    post += `\n\n#${words.map(w => w.toLowerCase().replace(/[^a-z0-9]/g, '')).join(' #')} #contentmarketing #tips`;
    
    posts.push(post);
  });
  
  // CTA slide
  posts.push(`Want more? 📖\n\nLink in bio! 👆`);
  
  return posts;
}

// Convert blog to LinkedIn post
export function convertToLinkedInPost(content: string, title?: string): string {
  let post = '';
  
  if (title) {
    post += `${title}\n\n`;
  }
  
  // Extract introduction
  const intro = content.split(/\n##/)[0].replace(/^#+\s+/, '').trim();
  post += intro.substring(0, 300) + (intro.length > 300 ? '...' : '') + '\n\n';
  
  // Add key points
  const bulletPoints = content.match(/- (.+)/g) || [];
  post += `Here are the key takeaways:\n\n`;
  
  bulletPoints.slice(0, 5).forEach(point => {
    const cleanPoint = point.replace(/^-\s+/, '').trim();
    post += `✓ ${cleanPoint}\n`;
  });
  
  post += `\n---\n\n`;
  post += `What do you think? Share your thoughts in the comments below! 👇\n\n`;
  post += `#contentmarketing #professionalgrowth #linkedin`;
  
  return post;
}

// Convert blog to video script
export function convertToVideoScript(content: string, title?: string): string {
  let script = '';
  
  if (title) {
    script += `VIDEO SCRIPT: ${title}\n\n`;
  }
  
  script += `[HOOK - 0:00-0:15]\n`;
  script += `"Hey there! Today I'm going to show you..."\n\n`;
  
  script += `[INTRO - 0:15-0:30]\n`;
  const intro = content.split(/\n##/)[0].replace(/^#+\s+/, '').trim();
  script += intro.substring(0, 100) + '...\n\n';
  
  const headings = content.match(/^##\s+(.+)$/gm) || [];
  let timeStamp = 30;
  
  headings.forEach((heading, idx) => {
    const cleanHeading = heading.replace(/^##\s+/, '').trim();
    script += `[SECTION ${idx + 1} - ${Math.floor(timeStamp / 60)}:${String(timeStamp % 60).padStart(2, '0')}-${Math.floor((timeStamp + 30) / 60)}:${String((timeStamp + 30) % 60).padStart(2, '0')}]\n`;
    script += `"${cleanHeading}"\n\n`;
    script += `[Visual: Show on-screen text]\n`;
    script += `[Narration: Explain the concept...]\n\n`;
    timeStamp += 60;
  });
  
  script += `[OUTRO - ${Math.floor(timeStamp / 60)}:${String(timeStamp % 60).padStart(2, '0')}-${Math.floor((timeStamp + 15) / 60)}:${String((timeStamp + 15) % 60).padStart(2, '0')}]\n`;
  script += `"That's a wrap! If you found this helpful, make sure to..."\n\n`;
  script += `[Call to Action]\n`;
  script += `- Subscribe button\n`;
  script += `- Like and share\n`;
  script += `- Comment below`;
  
  return script;
}

// Export to HTML
export function convertToHTML(content: string, title?: string): string {
  let html = '<!DOCTYPE html>\n<html lang="en">\n<head>\n';
  html += '<meta charset="UTF-8">\n';
  html += '<meta name="viewport" content="width=device-width, initial-scale=1.0">\n';
  if (title) {
    html += `<title>${title}</title>\n`;
  }
  html += '<style>\nbody { font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; line-height: 1.6; }\n';
  html += 'h1 { color: #333; border-bottom: 2px solid #333; padding-bottom: 10px; }\n';
  html += 'h2 { color: #555; margin-top: 30px; }\n';
  html += 'h3 { color: #777; }\n';
  html += 'code { background: #f4f4f4; padding: 2px 5px; border-radius: 3px; }\n';
  html += 'pre { background: #f4f4f4; padding: 15px; border-radius: 5px; overflow-x: auto; }\n';
  html += '</style>\n</head>\n<body>\n';
  
  // Convert markdown to HTML (simple conversion)
  let htmlContent = content
    .replace(/^# (.+)$/gm, '<h1>$1</h1>')
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/^- (.+)$/gm, '<li>$1</li>')
    .replace(/^\d+\. (.+)$/gm, '<li>$1</li>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/`(.+?)`/g, '<code>$1</code>')
    .replace(/\n\n/g, '</p><p>')
    .replace(/^(.+)$/gm, '<p>$1</p>');
  
  html += htmlContent;
  html += '\n</body>\n</html>';
  
  return html;
}

// Main export function
export async function exportContent(options: ExportOptions): Promise<string | string[]> {
  const { content, format, title } = options;
  
  switch (format) {
    case 'newsletter':
      return convertToNewsletter(content, title);
    case 'twitter':
      return convertToTweetThread(content, title);
    case 'instagram':
      return convertToInstagramCarousel(content, title);
    case 'linkedin':
      return convertToLinkedInPost(content, title);
    case 'video':
      return convertToVideoScript(content, title);
    case 'html':
      return convertToHTML(content, title);
    default:
      return content;
  }
}

