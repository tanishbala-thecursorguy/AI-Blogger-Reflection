import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import {
  ArrowLeft,
  Video,
  Copy,
  Download,
  Loader2,
  Sparkles,
} from 'lucide-react';
import { generateVideoScript } from '../utils/openai';

interface ExportMenuProps {
  onBack: () => void;
}

export function ExportMenu({ onBack }: ExportMenuProps) {
  const [blogContent, setBlogContent] = useState('');
  const [videoScript, setVideoScript] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load blog content from localStorage if available
  useEffect(() => {
    const savedContent = localStorage.getItem('lastGeneratedBlog');
    if (savedContent) {
      setBlogContent(savedContent);
    }
  }, []);

  const handleGenerate = async () => {
    if (!blogContent.trim()) {
      alert('Please paste your blog content first!');
      return;
    }

    setIsGenerating(true);
    setError(null);
    setVideoScript('');
    
    try {
      const script = await generateVideoScript(blogContent);
      setVideoScript(script);
    } catch (err: any) {
      setError(err.message || 'Failed to generate video script. Please try again.');
      console.error('Error generating video script:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = () => {
    if (!videoScript) return;
    
    if (navigator.clipboard) {
      navigator.clipboard.writeText(videoScript);
      alert('Video script copied to clipboard!');
    }
  };

  const handleDownload = () => {
    if (!videoScript) return;
    
    const blob = new Blob([videoScript], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'video-script.txt';
    a.click();
    URL.revokeObjectURL(url);
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
            className="rounded-full hover:bg-black"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </Button>
          <div>
            <h1 className="text-white">Video Script Generator</h1>
            <p className="text-white/60 text-sm">Convert your blog into an engaging video script</p>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6 pb-20">
        {/* Blog Input */}
        <Card className="bg-black border-white/10 p-5 rounded-2xl space-y-3">
          <Label className="text-white">Paste Your Blog Content</Label>
          <Textarea
            value={blogContent}
            onChange={(e) => setBlogContent(e.target.value)}
            placeholder="Copy and paste your blog content here..."
            className="bg-black border-white/10 text-white placeholder:text-white/40 min-h-[300px] rounded-xl resize-none"
          />
          <div className="flex items-center justify-between text-white/60 text-sm">
            <span>{blogContent ? `${blogContent.split(/\s+/).length} words` : 'No content yet'}</span>
            {blogContent && (
              <Button
                onClick={() => setBlogContent('')}
                size="sm"
                variant="ghost"
                className="text-white/60 hover:text-white hover:bg-black h-8 rounded-lg"
              >
                Clear
              </Button>
            )}
          </div>
        </Card>

        {/* Generate Button */}
        <Button
          onClick={handleGenerate}
          disabled={!blogContent.trim() || isGenerating}
          className="w-full bg-white text-black hover:bg-black h-12 rounded-xl disabled:opacity-50"
        >
          {isGenerating ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Generating Video Script...
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5 mr-2" />
              Generate Video Script
            </>
          )}
        </Button>

        {/* Error Message */}
        {error && (
          <Card className="bg-red-500/10 border-red-500/20 p-4 rounded-2xl">
            <p className="text-red-400 text-sm">{error}</p>
          </Card>
        )}

        {/* Generated Video Script */}
        {videoScript && (
          <Card className="bg-black border-white/10 p-5 rounded-2xl space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Video className="w-5 h-5 text-white" />
                <h2 className="text-white">Generated Video Script</h2>
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={handleCopy}
                  size="sm"
                  variant="outline"
                  className="bg-black border-white/10 text-white hover:bg-black rounded-lg"
                >
                  <Copy className="w-4 h-4 mr-2" />
                  Copy
                </Button>
                <Button
                  onClick={handleDownload}
                  size="sm"
                  variant="outline"
                  className="bg-black border-white/10 text-white hover:bg-black rounded-lg"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
              </div>
            </div>
            <div className="bg-black/50 p-4 rounded-xl max-h-[600px] overflow-y-auto overflow-x-hidden w-full">
              <pre 
                className="text-white/80 text-sm whitespace-pre-wrap break-words font-mono leading-relaxed w-full"
                style={{ 
                  wordBreak: 'break-all', 
                  overflowWrap: 'break-word',
                  maxWidth: '100%',
                  whiteSpace: 'pre-wrap'
                }}
              >
                {videoScript}
              </pre>
            </div>
          </Card>
        )}

        {/* Empty State */}
        {!videoScript && !isGenerating && (
          <Card className="bg-black border-white/10 p-12 rounded-2xl text-center">
            <Video className="w-12 h-12 text-white/20 mx-auto mb-4" />
            <p className="text-white/60">
              Paste your blog content above and click "Generate Video Script" to create an engaging video script with hooks, content, topics, ending, and jokes!
            </p>
          </Card>
        )}
      </div>
    </div>
  );
}
