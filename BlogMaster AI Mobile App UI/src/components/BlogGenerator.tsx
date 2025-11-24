import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Switch } from './ui/switch';
import { Card } from './ui/card';
import { Screen } from '../App';
import { generateBlog } from '../utils/openai';
import { supabase } from '../lib/supabase';
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
  const [seoMode, setSeoMode] = useState(true);
  const [keywords, setKeywords] = useState<string[]>([]);
  const [newKeyword, setNewKeyword] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [generatedVariants, setGeneratedVariants] = useState<string[]>([]);
  const [selectedVariant, setSelectedVariant] = useState<number>(0);
  const [generatedContent, setGeneratedContent] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  // Load selected topics or SEO outline data from localStorage if available
  useEffect(() => {
    try {
      // Check for SEO outline data first
      const seoTopic = localStorage.getItem('seoOutlineTopic');
      const seoKeywords = localStorage.getItem('seoOutlineKeywords');
      
      if (seoTopic) {
        setTopic(seoTopic);
        localStorage.removeItem('seoOutlineTopic');
        
        if (seoKeywords) {
          try {
            const keywordsArray = JSON.parse(seoKeywords);
            if (Array.isArray(keywordsArray)) {
              setKeywords(keywordsArray);
            }
            localStorage.removeItem('seoOutlineKeywords');
          } catch (e) {
            console.error('Error parsing SEO keywords:', e);
          }
        }
      } else {
        // Check for selected topics from topic generator
        const stored = localStorage.getItem('selectedTopics');
        if (stored) {
          const topics = JSON.parse(stored);
          localStorage.removeItem('selectedTopics');
          if (topics && topics.length > 0) {
            setTopic(topics[0]); // Use first topic as default
          }
        }
      }
    } catch (e) {
      console.error('Error loading topics:', e);
    }
  }, []);

  const handleGenerate = async () => {
    console.log('Generate button clicked!', { topic, topicTrimmed: topic.trim() });
    
    if (!topic.trim()) {
      console.warn('Topic is empty, not generating');
      setError('Please enter a blog topic first');
      return;
    }
    
    console.log('Starting blog generation...', {
      topic: topic.trim(),
      style: selectedStyle,
      keywords,
      seoMode,
    });
    
    setIsGenerating(true);
    setError(null);
    setShowPreview(false);
    
    try {
      console.log('Calling generateBlog API...');
      const variants = await generateBlog({
        topic: topic.trim(),
        style: selectedStyle,
        wordCount: 1500, // Default word count
        keywords: keywords,
        seoMode: seoMode,
      });
      
      console.log('Blog generation successful!', { variantCount: variants.length });
      
      setGeneratedVariants(variants);
      setSelectedVariant(0);
      const firstContent = variants[0] || '';
      setGeneratedContent(firstContent);
      setShowPreview(true);
      // Auto-save the first variant
      if (firstContent) {
        handleSaveBlog(firstContent, false);
      }
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to generate blog. Please try again.';
      setError(errorMessage);
      console.error('❌ Error generating blog:', err);
      console.error('Error details:', {
        message: err.message,
        stack: err.stack,
        name: err.name,
      });
      // Show detailed error in console for debugging
      if (errorMessage.includes('API key')) {
        console.error('💡 Tip: Make sure VITE_GROQ_API_KEY is set in .env.local and restart the dev server');
      }
    } finally {
      setIsGenerating(false);
      console.log('Generation finished');
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

  const extractTitle = (content: string): string => {
    // Try to extract H1 title from markdown
    const h1Match = content.match(/^#\s+(.+)$/m);
    if (h1Match) {
      return h1Match[1].trim();
    }
    // If no H1, use topic or first line
    return topic.trim() || 'Untitled Blog';
  };

  const countWords = (content: string): number => {
    return content.trim().split(/\s+/).filter(word => word.length > 0).length;
  };

  const handleSaveBlog = async (content: string, showNotification: boolean = true) => {
    try {
      setIsSaving(true);
      
      // Get current user
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        // If auto-saving (showNotification = false), fail silently
        if (!showNotification) {
          console.log('User not authenticated, skipping auto-save');
          return;
        }
        // If user explicitly clicked save, show error
        throw new Error('Please log in to save your blog');
      }

      // Create new blog entry in Supabase
      const { data, error } = await supabase
        .from('blogs')
        .insert({
          user_id: user.id,
          title: extractTitle(content),
          content: content,
          tone: selectedStyle,
          keywords: keywords,
          word_count: countWords(content),
          status: 'Draft' as const,
        })
        .select()
        .single();

      if (error) throw error;

      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
      
      if (showNotification) {
        alert('Blog saved successfully!');
      }
    } catch (err: any) {
      console.error('Error saving blog:', err);
      // Only show alert if user explicitly tried to save
      if (showNotification) {
        alert(err.message || 'Failed to save blog. Please try again.');
      }
    } finally {
      setIsSaving(false);
    }
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
              className="rounded-full hover:bg-black"
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
        <Card className="bg-black border-white/10 p-5 rounded-2xl space-y-3">
          <Label className="text-white">Blog Topic</Label>
          <Input
            type="text"
            placeholder="E.g., How to use AI for content marketing"
            value={topic}
            onChange={(e) => {
              const newValue = e.target.value;
              setTopic(newValue);
            }}
            onKeyPress={(e) => {
              if (e.key === 'Enter' && topic.trim() && !isGenerating) {
                handleGenerate();
              }
            }}
            className="bg-black border-white/10 text-white placeholder:text-white/40 h-12 rounded-xl"
          />
        </Card>

        {/* Style Selector */}
        <Card className="bg-black border-white/10 p-5 rounded-2xl space-y-3">
          <Label className="text-white">Writing Style</Label>
          <div className="grid grid-cols-2 gap-2">
            {writingStyles.map((style) => (
              <button
                key={style}
                onClick={() => setSelectedStyle(style)}
                className={`p-3 rounded-xl border transition-all ${
                  selectedStyle === style
                    ? 'bg-white text-black border-white'
                    : 'bg-black text-white border-white/10 hover:bg-black'
                }`}
              >
                {style}
              </button>
            ))}
          </div>
        </Card>

        {/* Keywords */}
        <Card className="bg-black border-white/10 p-5 rounded-2xl space-y-3">
          <Label className="text-white">Target Keywords</Label>
          <div className="flex gap-2">
            <Input
              placeholder="Add keyword..."
              value={newKeyword}
              onChange={(e) => setNewKeyword(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addKeyword()}
              className="bg-black border-white/10 text-white placeholder:text-white/40 h-10 rounded-xl"
            />
            <Button
              onClick={addKeyword}
              size="icon"
              className="bg-black hover:bg-black rounded-xl flex-shrink-0"
            >
              <Plus className="w-5 h-5 text-white" />
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {keywords.map((keyword) => (
              <div
                key={keyword}
                className="bg-black text-white px-3 py-1.5 rounded-lg flex items-center gap-2 text-sm"
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
        <Card className="bg-black border-white/10 p-5 rounded-2xl">
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
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log('Button onClick triggered', { topic, isGenerating });
            handleGenerate();
          }}
          disabled={!topic.trim() || isGenerating}
          className="w-full bg-white text-black hover:bg-white/90 h-12 rounded-xl disabled:opacity-50 cursor-pointer"
          type="button"
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

        {/* Variant Selection */}
        {showPreview && generatedVariants.length > 1 && (
          <Card className="bg-black border-white/10 p-4 rounded-2xl">
            <Label className="text-white mb-3 block">Select Variant ({generatedVariants.length} available)</Label>
            <div className="grid grid-cols-3 gap-2">
              {generatedVariants.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setSelectedVariant(index);
                    setGeneratedContent(generatedVariants[index]);
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

        {/* Live Preview */}
        {showPreview && generatedContent && (
          <Card className="bg-black border-white/10 p-6 rounded-2xl space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-white font-semibold">Generated Blog</h2>
                {generatedVariants.length > 1 && (
                  <p className="text-white/60 text-sm">Variant {selectedVariant + 1} of {generatedVariants.length}</p>
                )}
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={() => {
                    // Save to localStorage for export menu
                    localStorage.setItem('lastGeneratedBlog', generatedContent);
                    // Save blog automatically
                    handleSaveBlog(generatedContent, false);
                    localStorage.setItem('lastBlogTitle', topic);
                    
                    const blob = new Blob([generatedContent], { type: 'text/markdown' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = `${topic.replace(/\s+/g, '-')}-blog-v${selectedVariant + 1}.md`;
                    a.click();
                    URL.revokeObjectURL(url);
                  }}
                  size="sm"
                  variant="outline"
                  className="rounded-lg border-white/20 text-white hover:bg-white/10"
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
                  className="rounded-lg border-white/20 text-white hover:bg-white/10"
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Copy
                </Button>
                <Button
                  onClick={() => handleSaveBlog(generatedContent, true)}
                  disabled={isSaving || saved}
                  size="sm"
                  variant="outline"
                  className="rounded-lg border-white/20 text-white hover:bg-white/10 disabled:opacity-50"
                >
                  {isSaving ? (
                    <>
                      <Sparkles className="w-4 h-4 mr-2 animate-spin" />
                      Saving...
                    </>
                  ) : saved ? (
                    <>
                      <Save className="w-4 h-4 mr-2 text-green-400" />
                      Saved!
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      Save
                    </>
                  )}
                </Button>
              </div>
            </div>

            <Textarea
              value={generatedContent}
              onChange={(e) => {
                setGeneratedContent(e.target.value);
                // Update the variant in array
                const updated = [...generatedVariants];
                updated[selectedVariant] = e.target.value;
                setGeneratedVariants(updated);
              }}
              className="bg-black border-white/10 text-white placeholder:text-white/40 min-h-[500px] rounded-xl font-mono text-sm leading-relaxed"
              placeholder="Generated content will appear here..."
              readOnly={false}
            />
          </Card>
        )}
      </div>
    </div>
  );
}
