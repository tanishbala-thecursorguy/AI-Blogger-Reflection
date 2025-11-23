import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card } from './ui/card';
import { Screen } from '../App';
import { generateTopics } from '../utils/openai';
import {
  ArrowLeft,
  Sparkles,
  Lightbulb,
  Copy,
  Download,
  Plus,
  X,
  Check,
} from 'lucide-react';

interface TopicGeneratorProps {
  onBack: () => void;
  onNavigate: (screen: Screen) => void;
}

export function TopicGenerator({ onBack, onNavigate }: TopicGeneratorProps) {
  const [niche, setNiche] = useState('');
  const [topicCount, setTopicCount] = useState(10);
  const [topicSets, setTopicSets] = useState<string[][]>([]);
  const [selectedTopicSet, setSelectedTopicSet] = useState<number>(0);
  const [topics, setTopics] = useState<string[]>([]);
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!niche.trim()) return;
    
    setIsGenerating(true);
    setError(null);
    setTopics([]);
    setSelectedTopics([]);
    
    try {
      // Generate multiple topic sets (3 variants with topicCount topics each)
      const allTopics = await generateTopics(niche.trim(), topicCount);
      
      // Split into 3 sets
      const topicsPerSet = Math.ceil(allTopics.length / 3);
      const sets: string[][] = [];
      for (let i = 0; i < 3; i++) {
        const start = i * topicsPerSet;
        const end = start + topicsPerSet;
        sets.push(allTopics.slice(start, end));
      }
      
      setTopicSets(sets.filter(set => set.length > 0));
      setSelectedTopicSet(0);
      setTopics(sets[0] || []);
    } catch (err: any) {
      setError(err.message || 'Failed to generate topics. Please try again.');
      console.error('Error generating topics:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  const toggleTopicSelection = (topic: string) => {
    if (selectedTopics.includes(topic)) {
      setSelectedTopics(selectedTopics.filter(t => t !== topic));
    } else {
      setSelectedTopics([...selectedTopics, topic]);
    }
  };

  const handleUseTopics = () => {
    if (selectedTopics.length > 0) {
      // Navigate to blog generator with selected topics
      onNavigate('blog-generator');
      // Store selected topics in localStorage for blog generator to use
      localStorage.setItem('selectedTopics', JSON.stringify(selectedTopics));
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
            <h1 className="text-white">Topic Generator</h1>
            <p className="text-white/60 text-sm">Get trending topic ideas based on your niche</p>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6 pb-20">
        {/* Niche Input */}
        <Card className="bg-black border-white/10 p-5 rounded-2xl space-y-3">
          <Label className="text-white">Your Niche</Label>
          <Input
            placeholder="E.g., AI content marketing, fitness, finance, etc."
            value={niche}
            onChange={(e) => setNiche(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleGenerate()}
            className="bg-black border-white/10 text-white placeholder:text-white/40 h-12 rounded-xl"
          />
          <div className="flex items-center gap-3">
            <Label className="text-white text-sm">Number of topics:</Label>
            <select
              value={topicCount}
              onChange={(e) => setTopicCount(Number(e.target.value))}
              className="bg-black border-white/10 text-white rounded-xl px-3 py-2 text-sm"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={15}>15</option>
              <option value={20}>20</option>
            </select>
          </div>
        </Card>

        {/* Generate Button */}
        <Button
          onClick={handleGenerate}
          disabled={!niche.trim() || isGenerating}
          className="w-full bg-white text-black hover:bg-black h-12 rounded-xl disabled:opacity-50"
        >
          {isGenerating ? (
            <>
              <Sparkles className="w-5 h-5 mr-2 animate-spin" />
              Generating Topics...
            </>
          ) : (
            <>
              <Lightbulb className="w-5 h-5 mr-2" />
              Generate Topics
            </>
          )}
        </Button>

        {/* Error Message */}
        {error && (
          <Card className="bg-red-500/10 border-red-500/20 p-4 rounded-2xl">
            <p className="text-red-400 text-sm">{error}</p>
          </Card>
        )}

        {/* Generated Topics */}
        {topics.length > 0 && (
          <Card className="bg-black border-white/10 p-5 rounded-2xl space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-white">Generated Topics</Label>
                <p className="text-white/60 text-sm mt-1">
                  Select topics to use for blog generation
                </p>
              </div>
              {selectedTopics.length > 0 && (
                <span className="text-white text-sm">
                  {selectedTopics.length} selected
                </span>
              )}
            </div>

            <div className="space-y-2">
              {topics.map((topic, index) => {
                const isSelected = selectedTopics.includes(topic);
                return (
                  <Card
                    key={index}
                    onClick={() => toggleTopicSelection(topic)}
                    className={`p-4 rounded-xl cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-white text-black border-white'
                        : 'bg-black border-white/10 hover:bg-black text-white'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 ${
                          isSelected ? 'bg-black/10' : 'bg-black'
                        }`}>
                          {isSelected ? (
                            <Check className={`w-4 h-4 ${isSelected ? 'text-black' : 'text-white'}`} />
                          ) : (
                            <Plus className={`w-4 h-4 ${isSelected ? 'text-black' : 'text-white'}`} />
                          )}
                        </div>
                        <span className={`text-sm font-medium ${isSelected ? 'text-black' : 'text-white'}`}>
                          {topic}
                        </span>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>

            {selectedTopics.length > 0 && (
              <Button
                onClick={handleUseTopics}
                className="w-full bg-white text-black hover:bg-black h-12 rounded-xl"
              >
                <Sparkles className="w-5 h-5 mr-2" />
                Generate Blogs from Selected Topics
              </Button>
            )}

            <div className="flex gap-2 pt-2 border-t border-white/10">
              <Button
                onClick={() => {
                  const text = topics.join('\n');
                  if (navigator.clipboard) {
                    navigator.clipboard.writeText(text);
                  }
                }}
                variant="outline"
                size="sm"
                className="flex-1 bg-black border-white/10 text-white hover:bg-black rounded-xl"
              >
                <Copy className="w-4 h-4 mr-2" />
                Copy All
              </Button>
              <Button
                onClick={() => {
                  const text = selectedTopics.length > 0 
                    ? selectedTopics.join('\n')
                    : topics.join('\n');
                  const blob = new Blob([text], { type: 'text/plain' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = `${niche.replace(/\s+/g, '-')}-topics.txt`;
                  a.click();
                  URL.revokeObjectURL(url);
                }}
                variant="outline"
                size="sm"
                className="flex-1 bg-black border-white/10 text-white hover:bg-black rounded-xl"
              >
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
            </div>
          </Card>
        )}

        {/* Empty State */}
        {!topics.length && !isGenerating && !error && (
          <Card className="bg-black border-white/10 p-12 rounded-2xl text-center">
            <Lightbulb className="w-12 h-12 text-white/20 mx-auto mb-4" />
            <p className="text-white/60">
              Enter your niche above to generate trending blog topic ideas
            </p>
          </Card>
        )}
      </div>
    </div>
  );
}

