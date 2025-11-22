import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Textarea } from './ui/textarea';
import { Switch } from './ui/switch';
import { Label } from './ui/label';
import { enhanceContent } from '../utils/openai';
import {
  ArrowLeft,
  Heart,
  GraduationCap,
  Briefcase,
  Lightbulb,
  BarChart,
  BookOpen,
  Sparkles,
  CheckCircle,
  Copy,
  Download,
} from 'lucide-react';

interface AIEditorProps {
  onBack: () => void;
}

const editorModes = [
  {
    icon: Heart,
    label: 'Make Emotional',
    description: 'Add emotional appeal and storytelling',
  },
  {
    icon: GraduationCap,
    label: 'Make Beginner-Friendly',
    description: 'Simplify language and add explanations',
  },
  {
    icon: Briefcase,
    label: 'Make More Professional',
    description: 'Enhance formal tone and credibility',
  },
  {
    icon: Lightbulb,
    label: 'Add Examples',
    description: 'Include practical examples and scenarios',
  },
  {
    icon: BarChart,
    label: 'Add Case Studies',
    description: 'Insert relevant case studies and data',
  },
  {
    icon: BarChart,
    label: 'Add Statistics',
    description: 'Include supporting statistics and research',
  },
  {
    icon: BookOpen,
    label: 'Add Storytelling Tone',
    description: 'Transform into engaging narrative',
  },
  {
    icon: CheckCircle,
    label: 'Grammar Fix Mode',
    description: 'Correct grammar and spelling errors',
  },
  {
    icon: Sparkles,
    label: 'Anti-Plagiarism Rewrite',
    description: 'Rewrite to ensure uniqueness',
  },
];

export function AIEditor({ onBack }: AIEditorProps) {
  const [content, setContent] = useState('');
  const [enhancedVariants, setEnhancedVariants] = useState<string[]>([]);
  const [selectedVariant, setSelectedVariant] = useState<number>(0);
  const [enhancedContent, setEnhancedContent] = useState('');
  const [selectedModes, setSelectedModes] = useState<string[]>([]);
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const toggleMode = (mode: string) => {
    if (selectedModes.includes(mode)) {
      setSelectedModes(selectedModes.filter(m => m !== mode));
    } else {
      setSelectedModes([...selectedModes, mode]);
    }
  };

  const handleApplyEnhancements = async () => {
    if (!content.trim() || selectedModes.length === 0) return;
    
    setIsEnhancing(true);
    setError(null);
    setEnhancedContent('');
    
    try {
      const variants = await enhanceContent(content, selectedModes);
      setEnhancedVariants(variants);
      setSelectedVariant(0);
      setEnhancedContent(variants[0] || '');
      setSelectedModes([]);
    } catch (err: any) {
      setError(err.message || 'Failed to enhance content. Please try again.');
      console.error('Error enhancing content:', err);
    } finally {
      setIsEnhancing(false);
    }
  };

  const handleReset = () => {
    setEnhancedContent('');
    setSelectedModes([]);
    setError(null);
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
            <h1 className="text-white">AI Editor Mode</h1>
            <p className="text-white/60 text-sm">Fine-tune your content with AI</p>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6 pb-20">
        {/* Content Editor */}
        <Card className="bg-white/5 border-white/10 p-5 rounded-2xl space-y-3">
          <Label className="text-white">Your Content</Label>
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="bg-white/10 border-white/10 text-white placeholder:text-white/40 min-h-[200px] rounded-xl"
            placeholder="Paste your content here..."
          />
          <div className="flex items-center justify-between text-white/60 text-sm">
            <span>{content.split(' ').length} words</span>
            <span>{content.length} characters</span>
          </div>
        </Card>

        {/* AI Editor Modes */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-white">Editor Modes</Label>
            {selectedModes.length > 0 && (
              <span className="text-white/60 text-sm">{selectedModes.length} selected</span>
            )}
          </div>

          <div className="space-y-2">
            {editorModes.map((mode) => {
              const Icon = mode.icon;
              const isSelected = selectedModes.includes(mode.label);
              
              return (
                <Card
                  key={mode.label}
                  className="bg-white/5 border-white/10 p-4 rounded-2xl"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-start gap-3 flex-1">
                      <div className="bg-white/10 w-10 h-10 rounded-lg flex items-center justify-center">
                        <Icon className="w-5 h-5 text-white" strokeWidth={1.5} />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-white text-sm mb-1">{mode.label}</h3>
                        <p className="text-white/60 text-xs">{mode.description}</p>
                      </div>
                    </div>
                    <Switch
                      checked={isSelected}
                      onCheckedChange={() => toggleMode(mode.label)}
                      className="data-[state=checked]:bg-white"
                    />
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <Card className="bg-red-500/10 border-red-500/20 p-4 rounded-2xl">
            <p className="text-red-400 text-sm">{error}</p>
          </Card>
        )}

        {/* Apply Changes */}
        {selectedModes.length > 0 && (
          <Button
            onClick={handleApplyEnhancements}
            disabled={!content.trim() || isEnhancing}
            className="w-full bg-white text-black hover:bg-white/90 h-12 rounded-xl disabled:opacity-50"
          >
            {isEnhancing ? (
              <>
                <Sparkles className="w-5 h-5 mr-2 animate-spin" />
                Enhancing...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5 mr-2" />
                Apply {selectedModes.length} Enhancement{selectedModes.length > 1 ? 's' : ''}
              </>
            )}
          </Button>
        )}

        {/* Enhanced Content Preview */}
        {enhancedContent && enhancedContent !== content && (
          <Card className="bg-white border-white/10 p-5 rounded-2xl space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-black">Enhanced Content</Label>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span className="text-black/60 text-sm">Enhanced</span>
              </div>
            </div>
            <Textarea
              value={enhancedContent}
              onChange={(e) => {
                setEnhancedContent(e.target.value);
                setContent(e.target.value);
              }}
              className="bg-white/5 border-white/10 text-black min-h-[300px] rounded-xl font-mono text-sm"
            />
            <div className="flex gap-2">
              <Button
                onClick={() => {
                  const blob = new Blob([enhancedContent], { type: 'text/markdown' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = 'enhanced-content.md';
                  a.click();
                  URL.revokeObjectURL(url);
                }}
                size="sm"
                variant="outline"
                className="bg-white/5 border-black/20 text-black hover:bg-black/5 rounded-lg"
              >
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
              <Button
                onClick={() => {
                  if (navigator.clipboard) {
                    navigator.clipboard.writeText(enhancedContent);
                  }
                }}
                size="sm"
                variant="outline"
                className="bg-white/5 border-black/20 text-black hover:bg-black/5 rounded-lg"
              >
                <Copy className="w-4 h-4 mr-2" />
                Copy
              </Button>
            </div>
          </Card>
        )}

        {/* Real-time Preview */}
        <Card className="bg-white/5 border-white/10 p-5 rounded-2xl space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-white">Current Content</Label>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-400" />
              <span className="text-white/60 text-sm">Live editing</span>
            </div>
          </div>
          <div className="prose prose-sm max-w-none">
            <p className="text-white/80 whitespace-pre-wrap">
              {content || 'Paste your content above to start editing...'}
            </p>
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button
            onClick={handleReset}
            variant="outline"
            className="flex-1 bg-white/5 border-white/10 text-white hover:bg-white/10 h-12 rounded-xl"
          >
            Reset
          </Button>
          <Button
            onClick={() => {
              const templates = JSON.parse(localStorage.getItem('blogTemplates') || '[]');
              templates.push({
                id: Date.now(),
                name: `Content - ${new Date().toLocaleDateString()}`,
                content: content,
                tone: 'Custom',
                keywords: [],
                createdAt: new Date().toISOString(),
              });
              localStorage.setItem('blogTemplates', JSON.stringify(templates));
              alert('Content saved successfully!');
            }}
            disabled={!content.trim()}
            className="flex-1 bg-white text-black hover:bg-white/90 h-12 rounded-xl disabled:opacity-50"
          >
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
}
