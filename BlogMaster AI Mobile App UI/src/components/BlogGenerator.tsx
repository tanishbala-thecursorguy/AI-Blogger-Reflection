import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Slider } from './ui/slider';
import { Switch } from './ui/switch';
import { Card } from './ui/card';
import { Screen } from '../App';
import { generateBlog } from '../utils/openai';
import {
  ArrowLeft,
  Sparkles,
  Download,
  Save,
  X,
  Plus,
  Share2,
} from 'lucide-react';

interface BlogGeneratorProps {
  onBack: () => void;
  onNavigate: (screen: Screen) => void;
}

const writingStyles = [
  'Professional',
  'Human-like',
  'Storytelling',
  'Beginner-friendly',
  'Emotional',
  'Expert Blogger',
  'Custom Tone',
];

export function BlogGenerator({ onBack, onNavigate }: BlogGeneratorProps) {
  // Load selected topics from localStorage if available
  const loadSelectedTopics = () => {
    try {
      const stored = localStorage.getItem('selectedTopics');
      if (stored) {
        const topics = JSON.parse(stored);
        localStorage.removeItem('selectedTopics');
        return topics[0] || ''; // Use first topic as default
      }
    } catch (e) {
      console.error('Error loading selected topics:', e);
    }
    return '';
  };

  const [topic, setTopic] = useState(loadSelectedTopics());
  const [selectedStyle, setSelectedStyle] = useState('Professional');
  const [wordCount, setWordCount] = useState([1500]);
  const [seoMode, setSeoMode] = useState(true);
  const [keywords, setKeywords] = useState<string[]>([]);
  const [newKeyword, setNewKeyword] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [generatedContent, setGeneratedContent] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!topic.trim()) return;
    
    setIsGenerating(true);
    setError(null);
    setShowPreview(false);
    
    try {
      const content = await generateBlog({
        topic: topic.trim(),
        style: selectedStyle,
        wordCount: wordCount[0],
        keywords: keywords,
        seoMode: seoMode,
      });
      
      setGeneratedContent(content);
      setShowPreview(true);
    } catch (err: any) {
      setError(err.message || 'Failed to generate blog. Please try again.');
      console.error('Error generating blog:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  const addKeyword = () => {
    if (newKeyword.trim() && !keywords.includes(newKeyword.trim())) {
      setKeywords([...keywords, newKeyword.trim()]);
      setNewKeyword('');
    }
  };

  const removeKeyword = (keyword: string) => {
    setKeywords(keywords.filter(k => k !== keyword));
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <div className="sticky top-0 bg-black border-b border-white/10 p-4 z-10">
        <div className="flex items-center justify-between">
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
              <h1 className="text-white">Generate Blog</h1>
              <p className="text-white/60 text-sm">Create SEO-optimized content</p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6 pb-20">
        {/* Topic Input */}
        <Card className="bg-white/5 border-white/10 p-5 rounded-2xl space-y-3">
          <Label className="text-white">Blog Topic</Label>
          <Input
            placeholder="E.g., How to use AI for content marketing"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="bg-white/10 border-white/10 text-white placeholder:text-white/40 h-12 rounded-xl"
          />
        </Card>

        {/* Style Selector */}
        <Card className="bg-white/5 border-white/10 p-5 rounded-2xl space-y-3">
          <Label className="text-white">Writing Style</Label>
          <div className="grid grid-cols-2 gap-2">
            {writingStyles.map((style) => (
              <button
                key={style}
                onClick={() => setSelectedStyle(style)}
                className={`p-3 rounded-xl border transition-all ${
                  selectedStyle === style
                    ? 'bg-white text-black border-white'
                    : 'bg-white/5 text-white border-white/10 hover:bg-white/10'
                }`}
              >
                {style}
              </button>
            ))}
          </div>
        </Card>

        {/* Word Count Slider */}
        <Card className="bg-white/5 border-white/10 p-5 rounded-2xl space-y-4">
          <div className="flex items-center justify-between">
            <Label className="text-white">Blog Length</Label>
            <span className="text-white text-sm">{wordCount[0]} words</span>
          </div>
          <Slider
            value={wordCount}
            onValueChange={setWordCount}
            min={800}
            max={3000}
            step={100}
            className="[&_[role=slider]]:bg-white [&_[role=slider]]:border-white"
          />
          <div className="flex justify-between text-white/40 text-xs">
            <span>800</span>
            <span>3000</span>
          </div>
        </Card>

        {/* Keywords */}
        <Card className="bg-white/5 border-white/10 p-5 rounded-2xl space-y-3">
          <Label className="text-white">Target Keywords</Label>
          <div className="flex gap-2">
            <Input
              placeholder="Add keyword..."
              value={newKeyword}
              onChange={(e) => setNewKeyword(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addKeyword()}
              className="bg-white/10 border-white/10 text-white placeholder:text-white/40 h-10 rounded-xl"
            />
            <Button
              onClick={addKeyword}
              size="icon"
              className="bg-white/10 hover:bg-white/20 rounded-xl flex-shrink-0"
            >
              <Plus className="w-5 h-5 text-white" />
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {keywords.map((keyword) => (
              <div
                key={keyword}
                className="bg-white/10 text-white px-3 py-1.5 rounded-lg flex items-center gap-2 text-sm"
              >
                {keyword}
                <button
                  onClick={() => removeKeyword(keyword)}
                  className="hover:text-white/60"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        </Card>

        {/* SEO Mode Toggle */}
        <Card className="bg-white/5 border-white/10 p-5 rounded-2xl">
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-white">SEO Mode</Label>
              <p className="text-white/60 text-sm mt-1">
                Optimize for search engines
              </p>
            </div>
            <Switch
              checked={seoMode}
              onCheckedChange={setSeoMode}
              className="data-[state=checked]:bg-white"
            />
          </div>
        </Card>

        {/* Generate Button */}
        <Button
          onClick={handleGenerate}
          disabled={!topic || isGenerating}
          className="w-full bg-white text-black hover:bg-white/90 h-12 rounded-xl disabled:opacity-50"
        >
          {isGenerating ? (
            <>
              <Sparkles className="w-5 h-5 mr-2 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5 mr-2" />
              Generate Blog
            </>
          )}
        </Button>

        {/* Error Message */}
        {error && (
          <Card className="bg-red-500/10 border-red-500/20 p-4 rounded-2xl">
            <p className="text-red-400 text-sm">{error}</p>
          </Card>
        )}

        {/* Live Preview */}
        {showPreview && generatedContent && (
          <Card className="bg-white border-white/10 p-6 rounded-2xl space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-black font-semibold">Generated Blog</h2>
              <div className="flex gap-2">
                <Button
                  onClick={() => {
                    const blob = new Blob([generatedContent], { type: 'text/markdown' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = `${topic.replace(/\s+/g, '-')}-blog.md`;
                    a.click();
                    URL.revokeObjectURL(url);
                  }}
                  size="sm"
                  variant="outline"
                  className="rounded-lg border-black/20 text-black hover:bg-black/5"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
                <Button
                  onClick={() => {
                    if (navigator.clipboard) {
                      navigator.clipboard.writeText(generatedContent);
                    }
                  }}
                  size="sm"
                  variant="outline"
                  className="rounded-lg border-black/20 text-black hover:bg-black/5"
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Copy
                </Button>
                <Button
                  onClick={() => {
                    const templates = JSON.parse(localStorage.getItem('blogTemplates') || '[]');
                    templates.push({
                      id: Date.now(),
                      name: topic,
                      content: generatedContent,
                      tone: selectedStyle,
                      keywords: keywords,
                      createdAt: new Date().toISOString(),
                    });
                    localStorage.setItem('blogTemplates', JSON.stringify(templates));
                    alert('Blog saved successfully!');
                  }}
                  size="sm"
                  variant="outline"
                  className="rounded-lg border-black/20 text-black hover:bg-black/5"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save
                </Button>
              </div>
            </div>

            <Textarea
              value={generatedContent}
              onChange={(e) => setGeneratedContent(e.target.value)}
              className="bg-white/5 border-white/10 text-black min-h-[500px] rounded-xl font-mono text-sm leading-relaxed"
              placeholder="Generated content will appear here..."
              readOnly={false}
            />
          </Card>
        )}
      </div>
    </div>
  );
}
