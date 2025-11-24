import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { rewriteBlog } from '../utils/openai';
import {
  ArrowLeft,
  Search,
  BookOpen,
  User,
  Expand,
  Minimize,
  Eraser,
  RefreshCw,
  Download,
  Copy,
} from 'lucide-react';

interface BlogRewriterProps {
  onBack: () => void;
}

const rewriteOptions = [
  {
    icon: Search,
    label: 'Improve SEO',
    description: 'Optimize for search engines',
  },
  {
    icon: BookOpen,
    label: 'Improve Readability',
    description: 'Make easier to understand',
  },
  {
    icon: User,
    label: 'Humanize',
    description: 'Add natural, human touch',
  },
  {
    icon: Expand,
    label: 'Expand',
    description: 'Add more details and depth',
  },
  {
    icon: Minimize,
    label: 'Shorten',
    description: 'Make more concise',
  },
  {
    icon: Eraser,
    label: 'Remove Fluff',
    description: 'Keep only essential content',
  },
];

export function BlogRewriter({ onBack }: BlogRewriterProps) {
  const [originalText, setOriginalText] = useState('');
  const [rewrittenVariants, setRewrittenVariants] = useState<string[]>([]);
  const [selectedVariant, setSelectedVariant] = useState<number>(0);
  const [rewrittenText, setRewrittenText] = useState('');
  const [selectedTone, setSelectedTone] = useState('Professional');
  const [selectedActions, setSelectedActions] = useState<string[]>([]);
  const [isRewriting, setIsRewriting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const toneOptions = [
    'Professional',
    'Casual',
    'Friendly',
    'Authoritative',
    'Conversational',
    'Academic',
  ];

  const handleActionClick = (action: string) => {
    if (selectedActions.includes(action)) {
      setSelectedActions(selectedActions.filter(a => a !== action));
    } else {
      setSelectedActions([...selectedActions, action]);
    }
  };

  const handleRewrite = async (action?: string) => {
    if (!originalText.trim()) return;
    
    const improvements = action ? [action] : selectedActions;
    if (improvements.length === 0 && !action) {
      // Default to tone rewrite
      improvements.push('Improve readability');
    }
    
    setIsRewriting(true);
    setError(null);
    setRewrittenText('');
    
    try {
      const variants = await rewriteBlog(originalText, {
        style: action === 'tone' ? selectedTone : undefined,
        tone: action === 'tone' ? selectedTone : selectedTone,
        improvements: improvements,
      });
      
      setRewrittenVariants(variants);
      setSelectedVariant(0);
      setRewrittenText(variants[0] || '');
    } catch (err: any) {
      setError(err.message || 'Failed to rewrite blog. Please try again.');
      console.error('Error rewriting blog:', err);
    } finally {
      setIsRewriting(false);
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
            className="rounded-full hover:bg-black"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </Button>
          <div>
            <h1 className="text-white">Blog Rewriter</h1>
            <p className="text-white/60 text-sm">Transform your existing content</p>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6 pb-20">
        {/* Original Text Input */}
        <Card className="bg-black border-white/10 p-5 rounded-2xl space-y-3">
          <Label className="text-white">Original Text</Label>
          <Textarea
            value={originalText}
            onChange={(e) => setOriginalText(e.target.value)}
            className="bg-black border-white/10 text-white placeholder:text-white/40 min-h-[150px] rounded-xl resize-none"
            placeholder="Paste your text here to rewrite..."
          />
          <div className="text-white/60 text-sm">
            {originalText ? `${originalText.split(' ').length} words` : 'No content yet'}
          </div>
        </Card>

        {/* Rewrite Actions */}
        <div className="space-y-3">
          <Label className="text-white">Quick Actions (Select one or more)</Label>
          <div className="grid grid-cols-2 gap-3">
            {rewriteOptions.map((option) => {
              const Icon = option.icon;
              const isSelected = selectedActions.includes(option.label);
              return (
                <Card
                  key={option.label}
                  onClick={() => handleActionClick(option.label)}
                  className={`p-4 rounded-2xl transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-white text-black border-white'
                      : 'bg-black border-white/10 hover:bg-black'
                  }`}
                >
                  <div className="space-y-2">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      isSelected ? 'bg-black/10' : 'bg-black'
                    }`}>
                      <Icon className={`w-5 h-5 ${isSelected ? 'text-black' : 'text-white'}`} strokeWidth={1.5} />
                    </div>
                    <div>
                      <h3 className={`text-sm mb-0.5 ${isSelected ? 'text-black' : 'text-white'}`}>{option.label}</h3>
                      <p className={`text-xs ${isSelected ? 'text-black/60' : 'text-white/60'}`}>{option.description}</p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
          {selectedActions.length > 0 && (
            <Button
              onClick={() => handleRewrite()}
              disabled={!originalText || isRewriting}
              className="w-full bg-white text-black hover:bg-black h-11 rounded-xl disabled:opacity-50"
            >
              {isRewriting ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  Rewriting...
                </>
              ) : (
                <>
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Apply Selected Improvements
                </>
              )}
            </Button>
          )}
        </div>

        {/* Tone Selector */}
        <Card className="bg-black border-white/10 p-5 rounded-2xl space-y-3">
          <Label className="text-white">Rewrite in Chosen Tone</Label>
          <div className="grid grid-cols-2 gap-2">
            {toneOptions.map((tone) => (
              <button
                key={tone}
                onClick={() => setSelectedTone(tone)}
                className={`p-3 rounded-xl border transition-all ${
                  selectedTone === tone
                    ? 'bg-white text-black border-white'
                    : 'bg-black text-white border-white/10 hover:bg-black'
                }`}
              >
                {tone}
              </button>
            ))}
          </div>
          <Button
            onClick={() => handleRewrite('tone')}
            disabled={!originalText || isRewriting}
            className="w-full bg-white text-black hover:bg-black h-11 rounded-xl disabled:opacity-50"
          >
            {isRewriting ? (
              <>
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                Rewriting...
              </>
            ) : (
              <>
                <RefreshCw className="w-4 h-4 mr-2" />
                Rewrite in {selectedTone} Tone
              </>
            )}
          </Button>
        </Card>

        {/* Error Message */}
        {error && (
          <Card className="bg-red-500/10 border-red-500/20 p-4 rounded-2xl">
            <p className="text-red-400 text-sm">{error}</p>
          </Card>
        )}

        {/* Variant Selection */}
        {rewrittenVariants.length > 1 && (
          <Card className="bg-black border-white/10 p-4 rounded-2xl">
            <Label className="text-white mb-3 block">Select Rewritten Variant ({rewrittenVariants.length} available)</Label>
            <div className="grid grid-cols-3 gap-2">
              {rewrittenVariants.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setSelectedVariant(index);
                    setRewrittenText(rewrittenVariants[index]);
                  }}
                  className={`p-3 rounded-xl border transition-all text-sm ${
                    selectedVariant === index
                      ? 'bg-white text-black border-white'
                      : 'bg-black text-white border-white/10 hover:bg-black'
                  }`}
                >
                  Variant {index + 1}
                </button>
              ))}
            </div>
          </Card>
        )}

        {/* Before/After Comparison */}
        {rewrittenText && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-white">Rewritten Content</Label>
                {rewrittenVariants.length > 1 && (
                  <p className="text-white/60 text-sm mt-1">Variant {selectedVariant + 1} of {rewrittenVariants.length}</p>
                )}
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={() => {
                    const blob = new Blob([rewrittenText], { type: 'text/markdown' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = `rewritten-blog-v${selectedVariant + 1}.md`;
                    a.click();
                    URL.revokeObjectURL(url);
                  }}
                  size="sm"
                  variant="outline"
                  className="bg-black border-white/10 text-white hover:bg-black h-9 rounded-xl"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
                <Button
                  onClick={() => {
                    if (navigator.clipboard) {
                      navigator.clipboard.writeText(rewrittenText);
                    }
                  }}
                  size="sm"
                  variant="outline"
                  className="bg-black border-white/10 text-white hover:bg-black h-9 rounded-xl"
                >
                  <Copy className="w-4 h-4 mr-2" />
                  Copy
                </Button>
              </div>
            </div>
            
            {/* Before */}
            <Card className="bg-black border-white/10 p-5 rounded-2xl space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-white/60 text-sm">Original</span>
                <span className="text-white/60 text-sm">
                  {originalText.split(' ').length} words
                </span>
              </div>
              <Textarea
                value={originalText}
                onChange={(e) => setOriginalText(e.target.value)}
                className="bg-black border-white/10 text-white min-h-[150px] rounded-xl text-sm"
                readOnly
              />
            </Card>

            {/* After */}
            <Card className="bg-black border-white/10 p-5 rounded-2xl space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-white/60 text-sm">Rewritten</span>
                <span className="text-white/60 text-sm">
                  {rewrittenText.split(' ').length} words
                </span>
              </div>
              <Textarea
                value={rewrittenText}
                onChange={(e) => setRewrittenText(e.target.value)}
                className="bg-black border-white/10 text-white placeholder:text-white/40 min-h-[400px] rounded-xl font-mono text-sm"
                placeholder="Rewritten content will appear here..."
              />
            </Card>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button
                onClick={() => {
                  setRewrittenText('');
                  setSelectedActions([]);
                }}
                variant="outline"
                className="flex-1 bg-black border-white/10 text-white hover:bg-black h-11 rounded-xl"
              >
                Clear
              </Button>
              <Button
                onClick={() => {
                  setOriginalText(rewrittenText);
                  setRewrittenText('');
                  setSelectedActions([]);
                }}
                className="flex-1 bg-white text-black hover:bg-black h-11 rounded-xl"
              >
                Use This Version
              </Button>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!originalText && (
          <Card className="bg-black border-white/10 p-12 rounded-2xl text-center">
            <RefreshCw className="w-12 h-12 text-white/20 mx-auto mb-4" />
            <p className="text-white/60">
              Paste your existing content above to rewrite it with different styles and optimizations
            </p>
          </Card>
        )}
      </div>
    </div>
  );
}
