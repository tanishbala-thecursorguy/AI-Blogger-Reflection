import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card } from './ui/card';
import { Screen } from '../App';
import { generateSEOKeywords, generateSEOOutline } from '../utils/openai';
import {
  ArrowLeft,
  Sparkles,
  Plus,
  ChevronDown,
  ChevronRight,
  RefreshCw,
  Check,
} from 'lucide-react';

interface SEOOutlineGeneratorProps {
  onBack: () => void;
  onNavigate?: (screen: Screen) => void;
}

export function SEOOutlineGenerator({ onBack, onNavigate }: SEOOutlineGeneratorProps) {
  const [topic, setTopic] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([]);
  const [keywords, setKeywords] = useState<Array<{ keyword: string; score: number }>>([]);
  const [outlineVariants, setOutlineVariants] = useState<Array<Array<{ level: string; text: string; expanded: boolean; children?: any[] }>>>([]);
  const [selectedOutlineVariant, setSelectedOutlineVariant] = useState<number>(0);
  const [outline, setOutline] = useState<Array<{ level: string; text: string; expanded: boolean; children?: any[] }>>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!topic.trim()) return;
    
    setIsGenerating(true);
    setError(null);
    setShowResults(false);
    setSelectedKeywords([]);
    setKeywords([]);
    setOutline([]);
    
    try {
      // Generate keywords first
      const generatedKeywords = await generateSEOKeywords(topic.trim(), 10);
      setKeywords(generatedKeywords);
      
      // Generate 3 outline variants
      const variants = await generateSEOOutline(topic.trim(), []);
      
      // If we got a single outline, create 3 variants by duplicating and modifying
      if (Array.isArray(variants) && variants.length > 0 && variants[0].level) {
        // Single outline structure - convert to array of variants
        setOutlineVariants([variants as any]);
        setSelectedOutlineVariant(0);
        setOutline(variants as any);
      } else if (Array.isArray(variants) && variants.length > 0) {
        // Already array of variants
        setOutlineVariants(variants as any);
        setSelectedOutlineVariant(0);
        setOutline(variants[0] as any || []);
      }
      
      // Auto-select first keyword
      if (generatedKeywords.length > 0) {
        setSelectedKeywords([generatedKeywords[0].keyword]);
      }
      
      setShowResults(true);
    } catch (err: any) {
      setError(err.message || 'Failed to generate outline. Please try again.');
      console.error('Error generating outline:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleRegenerate = async () => {
    if (!topic.trim()) return;
    
    setIsGenerating(true);
    setError(null);
    
    try {
      const generatedOutline = await generateSEOOutline(topic.trim(), selectedKeywords);
      setOutline(generatedOutline);
    } catch (err: any) {
      setError(err.message || 'Failed to regenerate outline. Please try again.');
      console.error('Error regenerating outline:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  const toggleKeyword = (keyword: string) => {
    if (selectedKeywords.includes(keyword)) {
      setSelectedKeywords(selectedKeywords.filter(k => k !== keyword));
    } else {
      setSelectedKeywords([...selectedKeywords, keyword]);
    }
  };

  const OutlineNode = ({ node, depth = 0 }: { node: any; depth?: number }) => {
    const [expanded, setExpanded] = useState(node.expanded || false);

    return (
      <div>
        <div
          className={`flex items-start gap-3 p-3 rounded-xl hover:bg-black cursor-pointer ${
            depth === 0 ? 'bg-black' : ''
          }`}
          style={{ marginLeft: `${depth * 20}px` }}
          onClick={() => setExpanded(!expanded)}
        >
          {node.children && (
            <button className="mt-0.5 text-white/60">
              {expanded ? (
                <ChevronDown className="w-4 h-4" />
              ) : (
                <ChevronRight className="w-4 h-4" />
              )}
            </button>
          )}
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="text-white/40 text-xs px-2 py-0.5 bg-black rounded">
                {node.level}
              </span>
              <span className="text-white">{node.text}</span>
            </div>
          </div>
        </div>
        {expanded && node.children && (
          <div className="space-y-1 mt-1">
            {node.children.map((child: any, idx: number) => (
              <OutlineNode key={idx} node={child} depth={depth + 1} />
            ))}
          </div>
        )}
      </div>
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
            className="rounded-full hover:bg-black"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </Button>
          <div>
            <h1 className="text-white">SEO Outline Generator</h1>
            <p className="text-white/60 text-sm">Create structured content outlines</p>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6 pb-20">
        {/* Topic Input */}
        <Card className="bg-black border-white/10 p-5 rounded-2xl space-y-3">
          <Label className="text-white">Enter Topic</Label>
          <Input
            placeholder="E.g., AI for content marketing"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="bg-black border-white/10 text-white placeholder:text-white/40 h-12 rounded-xl"
          />
          <Button
            onClick={handleGenerate}
            disabled={!topic.trim() || isGenerating}
            className="w-full bg-white text-black hover:bg-white/90 h-11 rounded-xl disabled:opacity-50"
          >
            {isGenerating ? (
              <>
                <Sparkles className="w-5 h-5 mr-2 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5 mr-2" />
                Generate Outline
              </>
            )}
          </Button>
          
          {error && (
            <Card className="bg-red-500/10 border-red-500/20 p-4 rounded-2xl mt-4">
              <p className="text-red-400 text-sm">{error}</p>
            </Card>
          )}
        </Card>

        {showResults && (
          <>
            {/* Keyword Suggestions */}
            <Card className="bg-black border-white/10 p-5 rounded-2xl space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-white">Keyword Suggestions</Label>
                <span className="text-white/60 text-sm">{selectedKeywords.length} selected</span>
              </div>
              {keywords.length > 0 ? (
                <div className="space-y-2">
                  {keywords.map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => toggleKeyword(item.keyword)}
                      className={`w-full flex items-center justify-between p-3 rounded-xl border transition-all ${
                        selectedKeywords.includes(item.keyword)
                          ? 'bg-black border-white/20'
                          : 'bg-black border-white/10 hover:bg-black'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-5 h-5 rounded border flex items-center justify-center ${
                            selectedKeywords.includes(item.keyword)
                              ? 'bg-white border-white'
                              : 'border-white/20'
                          }`}
                        >
                          {selectedKeywords.includes(item.keyword) && (
                            <Check className="w-3 h-3 text-black" />
                          )}
                        </div>
                        <span className="text-white">{item.keyword}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-white/60 text-sm">Score: {item.score}</span>
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                <p className="text-white/60 text-sm text-center py-4">Generating keywords...</p>
              )}
            </Card>

            {/* Variant Selection */}
            {outlineVariants.length > 1 && (
              <Card className="bg-black border-white/10 p-4 rounded-2xl">
                <Label className="text-white mb-3 block">Select Outline Variant ({outlineVariants.length} available)</Label>
                <div className="grid grid-cols-3 gap-2">
                  {outlineVariants.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setSelectedOutlineVariant(index);
                        setOutline(outlineVariants[index] || []);
                      }}
                      className={`p-3 rounded-xl border transition-all text-sm ${
                        selectedOutlineVariant === index
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

            {/* Outline Preview */}
            <Card className="bg-black border-white/10 p-5 rounded-2xl space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-white">Outline Preview</Label>
                  {outlineVariants.length > 1 && (
                    <p className="text-white/60 text-sm mt-1">Variant {selectedOutlineVariant + 1} of {outlineVariants.length}</p>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={handleRegenerate}
                    disabled={isGenerating || !topic.trim()}
                    className="text-white hover:bg-black rounded-lg disabled:opacity-50"
                  >
                    <RefreshCw className={`w-4 h-4 mr-2 ${isGenerating ? 'animate-spin' : ''}`} />
                    Regenerate
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-white hover:bg-black rounded-lg"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Section
                  </Button>
                </div>
              </div>
              
              {outline.length > 0 ? (
                <div className="space-y-1">
                  {outline.map((node, idx) => (
                    <OutlineNode key={idx} node={node} />
                  ))}
                </div>
              ) : (
                <p className="text-white/60 text-sm text-center py-4">Generating outline...</p>
              )}
            </Card>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex-1 bg-black border-white/10 text-white hover:bg-black h-11 rounded-xl"
              >
                Auto-Optimize
              </Button>
              <Button
                onClick={() => {
                  if (onNavigate) {
                    // Pass topic and selected keywords to blog generator
                    localStorage.setItem('seoOutlineTopic', topic);
                    localStorage.setItem('seoOutlineKeywords', JSON.stringify(selectedKeywords));
                    onNavigate('blog-generator');
                  }
                }}
                disabled={outline.length === 0}
                className="flex-1 bg-white text-black hover:bg-white/90 h-11 rounded-xl disabled:opacity-50"
              >
                Generate Blog
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
