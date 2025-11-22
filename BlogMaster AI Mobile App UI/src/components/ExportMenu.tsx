import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import {
  ArrowLeft,
  FileText,
  Download,
  Mail,
  Twitter,
  Linkedin,
  Instagram,
  Video,
  Code,
  CheckCircle,
  Copy,
  Loader2,
} from 'lucide-react';
import { exportContent } from '../utils/export';

interface ExportMenuProps {
  onBack: () => void;
}

const exportOptions = [
  {
    icon: FileText,
    title: 'Google Docs',
    description: 'Export as editable Google Doc',
    format: 'gdoc',
    color: 'bg-white/10',
  },
  {
    icon: FileText,
    title: 'Word Document',
    description: 'Download as .docx file',
    format: 'docx',
    color: 'bg-white/10',
  },
  {
    icon: Download,
    title: 'PDF',
    description: 'Export as PDF document',
    format: 'pdf',
    color: 'bg-white/10',
  },
  {
    icon: Code,
    title: 'HTML',
    description: 'Get clean HTML code',
    format: 'html',
    color: 'bg-white/10',
  },
  {
    icon: Mail,
    title: 'Newsletter',
    description: 'Convert to email newsletter',
    format: 'newsletter',
    color: 'bg-white/10',
  },
  {
    icon: Twitter,
    title: 'Tweet Thread',
    description: 'Transform into Twitter thread',
    format: 'twitter',
    color: 'bg-white/10',
  },
  {
    icon: Instagram,
    title: 'Instagram Carousel',
    description: 'Create Instagram carousel posts',
    format: 'instagram',
    color: 'bg-white/10',
  },
  {
    icon: Linkedin,
    title: 'LinkedIn Post',
    description: 'Optimize for LinkedIn',
    format: 'linkedin',
    color: 'bg-white/10',
  },
  {
    icon: Video,
    title: 'Video Script',
    description: 'Convert to video script format',
    format: 'video',
    color: 'bg-white/10',
  },
];

export function ExportMenu({ onBack }: ExportMenuProps) {
  const [blogContent, setBlogContent] = useState('');
  const [blogTitle, setBlogTitle] = useState('');
  const [isExporting, setIsExporting] = useState(false);
  const [exportedContent, setExportedContent] = useState<string | string[] | null>(null);
  const [currentFormat, setCurrentFormat] = useState<string | null>(null);

  // Load blog content from localStorage or generate sample
  useEffect(() => {
    // Try to get from localStorage (from blog generator or other sources)
    const savedContent = localStorage.getItem('lastGeneratedBlog');
    const savedTitle = localStorage.getItem('lastBlogTitle');
    
    if (savedContent) {
      setBlogContent(savedContent);
      setBlogTitle(savedTitle || 'Untitled Blog Post');
    } else {
      // Default sample content
      setBlogContent(`# How to Use AI for Content Marketing: The Complete 2025 Guide

Content marketing has evolved significantly with the rise of artificial intelligence. In this comprehensive guide, we'll explore everything you need to know about leveraging AI for your content marketing strategy.

## Introduction to AI Content Marketing

AI-powered tools are transforming how we create, distribute, and optimize content. From automated writing assistants to intelligent analytics platforms, AI is making content marketing more efficient and effective.

### Key Benefits

- Increased productivity
- Better content quality
- Data-driven insights
- Cost efficiency

## Best Practices for AI Content Marketing

Here are some essential tips to get started with AI content marketing...

## Conclusion

AI is revolutionizing content marketing. By adopting these strategies, you can stay ahead of the competition.`);
      setBlogTitle('How to Use AI for Content Marketing: The Complete 2025 Guide');
    }
  }, []);

  const handleExport = async (format: string) => {
    if (!blogContent) {
      alert('No content available to export. Please generate a blog first.');
      return;
    }

    setIsExporting(true);
    setCurrentFormat(format);
    
    try {
      const result = await exportContent({
        content: blogContent,
        title: blogTitle,
        format: format,
      });
      
      setExportedContent(result);
      
      // Download or copy based on format
      if (format === 'docx' || format === 'pdf' || format === 'gdoc') {
        // For document formats, create a downloadable file
        const blob = new Blob([typeof result === 'string' ? result : result.join('\n\n---\n\n')], { 
          type: format === 'html' ? 'text/html' : 'text/plain' 
        });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${blogTitle.replace(/[^a-z0-9]/gi, '-').toLowerCase()}.${format === 'html' ? 'html' : 'txt'}`;
        a.click();
        URL.revokeObjectURL(url);
      } else if (format === 'instagram' && Array.isArray(result)) {
        // For Instagram carousel, create multiple files or show in modal
        const carouselText = result.map((post, idx) => `Slide ${idx + 1}:\n\n${post}\n\n---\n\n`).join('');
        const blob = new Blob([carouselText], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${blogTitle.replace(/[^a-z0-9]/gi, '-').toLowerCase()}-instagram-carousel.txt`;
        a.click();
        URL.revokeObjectURL(url);
      }
    } catch (error: any) {
      console.error('Export error:', error);
      alert(`Failed to export: ${error.message || 'Unknown error'}`);
    } finally {
      setIsExporting(false);
    }
  };

  const handleCopy = () => {
    if (!exportedContent) return;
    
    const text = typeof exportedContent === 'string' 
      ? exportedContent 
      : exportedContent.join('\n\n---\n\n');
    
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      alert('Copied to clipboard!');
    }
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <div className="sticky top-0 bg-black border-b border-white/10 p-4 z-10">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            className="rounded-full hover:bg-white/10"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </Button>
          <div>
            <h1 className="text-white">Export & Share</h1>
            <p className="text-white/60 text-sm">Export your content in multiple formats</p>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6 pb-20">
        {/* Blog Preview Card */}
        <Card className="bg-white/5 border-white/10 p-5 rounded-2xl">
          <div className="flex items-start gap-3">
            <div className="bg-white/10 w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h2 className="text-white mb-1">
                {blogTitle || 'How to Use AI for Content Marketing: The Complete 2025 Guide'}
              </h2>
              <div className="flex items-center gap-3 text-white/60 text-sm">
                <span>{blogContent ? `${blogContent.split(/\s+/).length} words` : '0 words'}</span>
                <span>•</span>
                <span>{new Date().toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Exported Content Preview */}
        {exportedContent && (
          <Card className="bg-white/5 border-white/10 p-5 rounded-2xl space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-white">Exported Content ({currentFormat})</h3>
              <div className="flex gap-2">
                <Button
                  onClick={handleCopy}
                  size="sm"
                  variant="outline"
                  className="bg-white/5 border-white/10 text-white hover:bg-white/10 rounded-lg"
                >
                  <Copy className="w-4 h-4 mr-2" />
                  Copy
                </Button>
                <Button
                  onClick={() => {
                    setExportedContent(null);
                    setCurrentFormat(null);
                  }}
                  size="sm"
                  variant="outline"
                  className="bg-white/5 border-white/10 text-white hover:bg-white/10 rounded-lg"
                >
                  Close
                </Button>
              </div>
            </div>
            <div className="bg-black/50 p-4 rounded-xl max-h-96 overflow-y-auto">
              <pre className="text-white/80 text-sm whitespace-pre-wrap font-mono">
                {typeof exportedContent === 'string' 
                  ? exportedContent 
                  : exportedContent.map((post, idx) => `Slide ${idx + 1}:\n\n${post}\n\n---\n\n`).join('')}
              </pre>
            </div>
          </Card>
        )}

        {/* Document Formats */}
        <div className="space-y-3">
          <h2 className="text-white">Document Formats</h2>
          <div className="grid grid-cols-2 gap-3">
            {exportOptions.slice(0, 4).map((option) => {
              const Icon = option.icon;
              return (
                <Card
                  key={option.format}
                  onClick={() => handleExport(option.format)}
                  className="bg-white/5 border-white/10 p-5 rounded-2xl hover:bg-white/10 transition-colors cursor-pointer"
                >
                  <div className={`${option.color} w-12 h-12 rounded-xl flex items-center justify-center mb-3`}>
                    <Icon className="w-6 h-6 text-white" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-white text-sm mb-1">{option.title}</h3>
                  <p className="text-white/60 text-xs">{option.description}</p>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Social Media Formats */}
        <div className="space-y-3">
          <h2 className="text-white">Social Media</h2>
          <div className="space-y-3">
            {exportOptions.slice(4, 8).map((option) => {
              const Icon = option.icon;
              return (
                <Card
                  key={option.format}
                  onClick={() => handleExport(option.format)}
                  className="bg-white/5 border-white/10 p-4 rounded-2xl hover:bg-white/10 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-4">
                    <div className={`${option.color} w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0`}>
                      <Icon className="w-6 h-6 text-white" strokeWidth={1.5} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white text-sm mb-0.5">{option.title}</h3>
                      <p className="text-white/60 text-xs">{option.description}</p>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleExport(option.format);
                      }}
                      disabled={isExporting || !blogContent}
                      className="text-white hover:bg-white/10 rounded-lg disabled:opacity-50"
                    >
                      {isExporting && currentFormat === option.format ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        'Export'
                      )}
                    </Button>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Video Format */}
        <div className="space-y-3">
          <h2 className="text-white">Video Content</h2>
          {exportOptions.slice(8).map((option) => {
            const Icon = option.icon;
            return (
              <Card
                key={option.format}
                onClick={() => handleExport(option.format)}
                className="bg-white/5 border-white/10 p-4 rounded-2xl hover:bg-white/10 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div className={`${option.color} w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0`}>
                    <Icon className="w-6 h-6 text-white" strokeWidth={1.5} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white text-sm mb-0.5">{option.title}</h3>
                    <p className="text-white/60 text-xs">{option.description}</p>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleExport(option.format);
                    }}
                    disabled={isExporting || !blogContent}
                    className="text-white hover:bg-white/10 rounded-lg disabled:opacity-50"
                  >
                    {isExporting && currentFormat === option.format ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      'Convert'
                    )}
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Bulk Export */}
        <Card className="bg-white/5 border-white/10 p-5 rounded-2xl">
          <h3 className="text-white mb-3">Bulk Export</h3>
          <p className="text-white/60 text-sm mb-4">
            Export this blog in all formats at once for maximum reach
          </p>
          <Button 
            onClick={async () => {
              const formats = ['docx', 'pdf', 'html', 'newsletter', 'twitter', 'instagram', 'linkedin', 'video'];
              setIsExporting(true);
              try {
                for (const format of formats) {
                  await handleExport(format);
                  await new Promise(resolve => setTimeout(resolve, 500)); // Small delay between exports
                }
                alert('All formats exported successfully!');
              } catch (error) {
                console.error('Bulk export error:', error);
              } finally {
                setIsExporting(false);
              }
            }}
            disabled={isExporting || !blogContent}
            className="w-full bg-white text-black hover:bg-white/90 h-11 rounded-xl disabled:opacity-50"
          >
            {isExporting ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Exporting All Formats...
              </>
            ) : (
              <>
                <Download className="w-5 h-5 mr-2" />
                Export All Formats
              </>
            )}
          </Button>
        </Card>
      </div>
    </div>
  );
}
