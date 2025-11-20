import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Slider } from './ui/slider';
import { Switch } from './ui/switch';
import { Card } from './ui/card';
import { Screen } from '../App';
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
  const [topic, setTopic] = useState('');
  const [selectedStyle, setSelectedStyle] = useState('Professional');
  const [wordCount, setWordCount] = useState([1500]);
  const [seoMode, setSeoMode] = useState(true);
  const [keywords, setKeywords] = useState<string[]>(['AI blogging', 'content marketing']);
  const [newKeyword, setNewKeyword] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setShowPreview(true);
    }, 2000);
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

        {/* Live Preview */}
        {showPreview && (
          <Card className="bg-white border-white/10 p-6 rounded-2xl space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-black">Live Preview</h2>
              <div className="flex gap-2">
                <Button
                  onClick={() => onNavigate('export')}
                  size="sm"
                  variant="outline"
                  className="rounded-lg border-black/20 text-black hover:bg-black/5"
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Export
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="rounded-lg border-black/20 text-black hover:bg-black/5"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save
                </Button>
              </div>
            </div>

            <div className="prose prose-sm max-w-none text-black">
              <h1 className="text-black">How to Use AI for Content Marketing: The Complete 2025 Guide</h1>
              
              <p className="text-black/80">
                Artificial intelligence is revolutionizing the way businesses approach content 
                marketing. From generating ideas to optimizing for SEO, AI tools are becoming 
                indispensable for modern marketers.
              </p>

              <h2 className="text-black">Understanding AI in Content Marketing</h2>
              
              <p className="text-black/80">
                AI-powered content marketing tools use machine learning algorithms to analyze 
                data, predict trends, and generate human-like content. These tools can help you 
                create blog posts, social media content, and email campaigns in a fraction of 
                the time it would take manually.
              </p>

              <h3 className="text-black">Benefits of AI Content Marketing</h3>
              
              <ul className="text-black/80">
                <li>Save time on content creation</li>
                <li>Improve SEO performance</li>
                <li>Generate data-driven insights</li>
                <li>Scale content production</li>
              </ul>

              <p className="text-black/60 text-sm border-t border-black/10 pt-4 mt-6">
                This is a preview of your generated content. You can edit, export, or continue generating more sections.
              </p>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
