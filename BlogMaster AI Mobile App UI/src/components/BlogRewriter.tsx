import { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import {
  ArrowLeft,
  Search,
  BookOpen,
  User,
  Expand,
  Minimize,
  Eraser,
  RefreshCw,
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
  const [rewrittenText, setRewrittenText] = useState('');
  const [selectedTone, setSelectedTone] = useState('Professional');

  const toneOptions = [
    'Professional',
    'Casual',
    'Friendly',
    'Authoritative',
    'Conversational',
    'Academic',
  ];

  const handleRewrite = (action: string) => {
    // Simulate rewriting
    setRewrittenText(
      'Artificial intelligence has revolutionized content marketing strategies across industries. Modern AI tools enable businesses to create, optimize, and distribute content with unprecedented efficiency and precision.\n\nThrough advanced machine learning algorithms, marketers can now analyze massive datasets to identify content that truly resonates with their target audience. This data-driven approach allows for the creation of highly targeted, effective marketing campaigns that deliver measurable results.'
    );
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
            <h1 className="text-white">Blog Rewriter</h1>
            <p className="text-white/60 text-sm">Transform your existing content</p>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6 pb-20">
        {/* Original Text Input */}
        <Card className="bg-white/5 border-white/10 p-5 rounded-2xl space-y-3">
          <Label className="text-white">Original Text</Label>
          <Textarea
            value={originalText}
            onChange={(e) => setOriginalText(e.target.value)}
            className="bg-white/10 border-white/10 text-white placeholder:text-white/40 min-h-[150px] rounded-xl resize-none"
            placeholder="Paste your text here to rewrite..."
          />
          <div className="text-white/60 text-sm">
            {originalText ? `${originalText.split(' ').length} words` : 'No content yet'}
          </div>
        </Card>

        {/* Rewrite Actions */}
        <div className="space-y-3">
          <Label className="text-white">Quick Actions</Label>
          <div className="grid grid-cols-2 gap-3">
            {rewriteOptions.map((option) => {
              const Icon = option.icon;
              return (
                <Card
                  key={option.label}
                  onClick={() => handleRewrite(option.label)}
                  className="bg-white/5 border-white/10 p-4 rounded-2xl hover:bg-white/10 transition-colors cursor-pointer"
                >
                  <div className="space-y-2">
                    <div className="bg-white/10 w-10 h-10 rounded-xl flex items-center justify-center">
                      <Icon className="w-5 h-5 text-white" strokeWidth={1.5} />
                    </div>
                    <div>
                      <h3 className="text-white text-sm mb-0.5">{option.label}</h3>
                      <p className="text-white/60 text-xs">{option.description}</p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Tone Selector */}
        <Card className="bg-white/5 border-white/10 p-5 rounded-2xl space-y-3">
          <Label className="text-white">Rewrite in Chosen Tone</Label>
          <div className="grid grid-cols-2 gap-2">
            {toneOptions.map((tone) => (
              <button
                key={tone}
                onClick={() => setSelectedTone(tone)}
                className={`p-3 rounded-xl border transition-all ${
                  selectedTone === tone
                    ? 'bg-white text-black border-white'
                    : 'bg-white/5 text-white border-white/10 hover:bg-white/10'
                }`}
              >
                {tone}
              </button>
            ))}
          </div>
          <Button
            onClick={() => handleRewrite('tone')}
            disabled={!originalText}
            className="w-full bg-white text-black hover:bg-white/90 h-11 rounded-xl disabled:opacity-50"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Rewrite in {selectedTone} Tone
          </Button>
        </Card>

        {/* Before/After Comparison */}
        {rewrittenText && (
          <div className="space-y-3">
            <Label className="text-white">Before / After</Label>
            
            {/* Before */}
            <Card className="bg-white/5 border-white/10 p-5 rounded-2xl space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-white/60 text-sm">Before</span>
                <span className="text-white/60 text-sm">
                  {originalText.split(' ').length} words
                </span>
              </div>
              <p className="text-white/80 text-sm leading-relaxed">
                {originalText || 'No original text'}
              </p>
            </Card>

            {/* After */}
            <Card className="bg-white border-white/10 p-5 rounded-2xl space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-black/60 text-sm">After</span>
                <span className="text-black/60 text-sm">
                  {rewrittenText.split(' ').length} words
                </span>
              </div>
              <p className="text-black/80 text-sm leading-relaxed">
                {rewrittenText}
              </p>
            </Card>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex-1 bg-white/5 border-white/10 text-white hover:bg-white/10 h-11 rounded-xl"
              >
                Try Again
              </Button>
              <Button className="flex-1 bg-white text-black hover:bg-white/90 h-11 rounded-xl">
                Use This Version
              </Button>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!originalText && (
          <Card className="bg-white/5 border-white/10 p-12 rounded-2xl text-center">
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
