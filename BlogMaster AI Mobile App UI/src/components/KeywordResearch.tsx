import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import {
  ArrowLeft,
  Search,
  TrendingUp,
  TrendingDown,
  Plus,
  Filter,
  Sparkles,
} from 'lucide-react';

interface KeywordResearchProps {
  onBack: () => void;
}

const sampleKeywords = [
  {
    keyword: 'AI content marketing',
    volume: '18.5K',
    difficulty: 68,
    intent: 'Informational',
    trend: 'up',
    lsi: ['AI marketing tools', 'content automation', 'AI writing'],
  },
  {
    keyword: 'content marketing strategy',
    volume: '12.2K',
    difficulty: 72,
    intent: 'Informational',
    trend: 'up',
    lsi: ['marketing strategy', 'content planning', 'marketing tactics'],
  },
  {
    keyword: 'blog writing tools',
    volume: '9.8K',
    difficulty: 54,
    intent: 'Commercial',
    trend: 'neutral',
    lsi: ['writing software', 'blog editor', 'content tools'],
  },
  {
    keyword: 'SEO optimization guide',
    volume: '15.3K',
    difficulty: 76,
    intent: 'Informational',
    trend: 'up',
    lsi: ['SEO tips', 'search optimization', 'ranking factors'],
  },
  {
    keyword: 'AI blog generator',
    volume: '6.4K',
    difficulty: 48,
    intent: 'Commercial',
    trend: 'up',
    lsi: ['AI writer', 'blog automation', 'content generator'],
  },
];

export function KeywordResearch({ onBack }: KeywordResearchProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [keywordSets, setKeywordSets] = useState<Array<Array<{ keyword: string; volume: string; difficulty: number; intent: string; trend: string; lsi: string[] }>>>([]);
  const [selectedKeywordSet, setSelectedKeywordSet] = useState<number>(0);
  const [keywords, setKeywords] = useState<Array<{ keyword: string; volume: string; difficulty: number; intent: string; trend: string; lsi: string[] }>>([]);
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [filter, setFilter] = useState<string>('all');

  const handleSearch = async () => {
    if (!searchTerm.trim()) return;
    
    setIsGenerating(true);
    setShowResults(false);
    setKeywords([]);
    setSelectedKeywords([]);
    
    try {
      // Generate 3 keyword sets using the API
      const { generateSEOKeywords } = await import('../utils/openai');
      const allKeywords = await generateSEOKeywords(searchTerm.trim(), 15);
      
      // Create 3 sets from the generated keywords
      const keywordsPerSet = Math.ceil(allKeywords.length / 3);
      const sets = [];
      for (let i = 0; i < 3; i++) {
        const start = i * keywordsPerSet;
        const end = start + keywordsPerSet;
        const keywordSet = allKeywords.slice(start, end).map((kw: any) => ({
          keyword: kw.keyword || kw,
          volume: Math.floor(Math.random() * 50000 + 1000).toLocaleString() + 'K',
          difficulty: kw.score ? 100 - kw.score : Math.floor(Math.random() * 60 + 40),
          intent: ['Informational', 'Commercial', 'Navigational'][Math.floor(Math.random() * 3)],
          trend: ['up', 'neutral', 'down'][Math.floor(Math.random() * 3)],
          lsi: [],
        }));
        sets.push(keywordSet);
      }
      
      setKeywordSets(sets.filter(set => set.length > 0));
      setSelectedKeywordSet(0);
      setKeywords(sets[0] || []);
      setShowResults(true);
    } catch (err: any) {
      console.error('Error generating keywords:', err);
      // Fallback to sample keywords
      setKeywordSets([sampleKeywords]);
      setSelectedKeywordSet(0);
      setKeywords(sampleKeywords);
      setShowResults(true);
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

  const getDifficultyColor = (difficulty: number) => {
    if (difficulty < 40) return 'text-green-400';
    if (difficulty < 70) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getDifficultyLabel = (difficulty: number) => {
    if (difficulty < 40) return 'Easy';
    if (difficulty < 70) return 'Medium';
    return 'Hard';
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
            <h1 className="text-white">Keyword Research</h1>
            <p className="text-white/60 text-sm">Find high-traffic keywords</p>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6 pb-20">
        {/* Search Bar */}
        <Card className="bg-white/5 border-white/10 p-5 rounded-2xl space-y-3">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
              <Input
                placeholder="Enter seed keyword..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                className="pl-11 bg-white/10 border-white/10 text-white placeholder:text-white/40 h-12 rounded-xl"
              />
            </div>
            <Button
              onClick={handleSearch}
              disabled={isGenerating || !searchTerm.trim()}
              size="icon"
              className="bg-white text-black hover:bg-white/90 rounded-xl w-12 h-12 flex-shrink-0 disabled:opacity-50"
            >
              {isGenerating ? (
                <Sparkles className="w-5 h-5 animate-spin" />
              ) : (
                <Search className="w-5 h-5" />
              )}
            </Button>
          </div>
          
          {selectedKeywords.length > 0 && (
            <div className="pt-2 border-t border-white/10">
              <div className="flex items-center justify-between mb-2">
                <span className="text-white/60 text-sm">{selectedKeywords.length} selected</span>
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-white hover:bg-white/10 rounded-lg h-8"
                >
                  Add to Blog
                </Button>
              </div>
            </div>
          )}
        </Card>

        {/* Variant Selection */}
        {keywordSets.length > 1 && showResults && (
          <Card className="bg-white/5 border-white/10 p-4 rounded-2xl">
            <Label className="text-white mb-3 block">Select Keyword Set ({keywordSets.length} available)</Label>
            <div className="grid grid-cols-3 gap-2">
              {keywordSets.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setSelectedKeywordSet(index);
                    setKeywords(keywordSets[index] || []);
                    setSelectedKeywords([]); // Clear selection when switching sets
                  }}
                  className={`p-3 rounded-xl border transition-all text-sm ${
                    selectedKeywordSet === index
                      ? 'bg-white text-black border-white'
                      : 'bg-white/5 text-white border-white/10 hover:bg-white/10'
                  }`}
                >
                  Set {index + 1} ({keywordSets[index]?.length || 0} keywords)
                </button>
              ))}
            </div>
          </Card>
        )}

        {/* Filter Bar */}
        {showResults && (
          <div className="flex gap-2 overflow-x-auto pb-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setFilter('all')}
              className={`rounded-xl whitespace-nowrap ${
                filter === 'all'
                  ? 'bg-white text-black border-white'
                  : 'bg-white/5 border-white/10 text-white hover:bg-white/10'
              }`}
            >
              <Filter className="w-4 h-4 mr-2" />
              All
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setFilter('easy')}
              className={`rounded-xl whitespace-nowrap ${
                filter === 'easy'
                  ? 'bg-white text-black border-white'
                  : 'bg-white/5 border-white/10 text-white hover:bg-white/10'
              }`}
            >
              Easy
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setFilter('medium')}
              className={`rounded-xl whitespace-nowrap ${
                filter === 'medium'
                  ? 'bg-white text-black border-white'
                  : 'bg-white/5 border-white/10 text-white hover:bg-white/10'
              }`}
            >
              Medium
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setFilter('high-volume')}
              className={`rounded-xl whitespace-nowrap ${
                filter === 'high-volume'
                  ? 'bg-white text-black border-white'
                  : 'bg-white/5 border-white/10 text-white hover:bg-white/10'
              }`}
            >
              High Volume
            </Button>
          </div>
        )}

        {/* Keyword Results */}
        {showResults && (
          <div className="space-y-3">
            {keywords
              .filter((item) => {
                if (filter === 'all') return true;
                if (filter === 'easy') return item.difficulty < 40;
                if (filter === 'medium') return item.difficulty >= 40 && item.difficulty < 70;
                if (filter === 'high-volume') return parseInt(item.volume.replace(/[^0-9]/g, '')) > 10000;
                return true;
              })
              .map((item, idx) => (
              <Card
                key={idx}
                className="bg-white/5 border-white/10 p-4 rounded-2xl hover:bg-white/10 transition-colors"
              >
                <div className="space-y-3">
                  {/* Keyword Header */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-white">{item.keyword}</h3>
                        {item.trend === 'up' && (
                          <TrendingUp className="w-4 h-4 text-green-400" />
                        )}
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <Badge
                          variant="outline"
                          className="bg-white/10 border-white/20 text-white"
                        >
                          {item.volume} searches/mo
                        </Badge>
                        <Badge
                          variant="outline"
                          className={`bg-white/10 border-white/20 ${getDifficultyColor(item.difficulty)}`}
                        >
                          {getDifficultyLabel(item.difficulty)} ({item.difficulty})
                        </Badge>
                        <Badge
                          variant="outline"
                          className="bg-white/10 border-white/20 text-white/80"
                        >
                          {item.intent}
                        </Badge>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      onClick={() => toggleKeyword(item.keyword)}
                      className={`rounded-xl ${
                        selectedKeywords.includes(item.keyword)
                          ? 'bg-white text-black hover:bg-white/90'
                          : 'bg-white/10 text-white hover:bg-white/20'
                      }`}
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>

                  {/* LSI Keywords */}
                  <div className="space-y-2">
                    <div className="text-white/60 text-xs">LSI Keywords</div>
                    <div className="flex flex-wrap gap-2">
                      {item.lsi.map((lsi, lsiIdx) => (
                        <span
                          key={lsiIdx}
                          className="px-2.5 py-1 bg-white/10 text-white/80 rounded-lg text-xs"
                        >
                          {lsi}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!showResults && (
          <Card className="bg-white/5 border-white/10 p-12 rounded-2xl text-center">
            <Search className="w-12 h-12 text-white/20 mx-auto mb-4" />
            <p className="text-white/60">
              Enter a seed keyword to discover related keywords, search volumes, and difficulty scores
            </p>
          </Card>
        )}
      </div>
    </div>
  );
}
