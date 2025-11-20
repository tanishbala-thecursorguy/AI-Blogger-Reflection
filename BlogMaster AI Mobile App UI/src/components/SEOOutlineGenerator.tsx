import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card } from './ui/card';
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
}

const sampleKeywords = [
  { keyword: 'AI content marketing', score: 95 },
  { keyword: 'content marketing tools', score: 88 },
  { keyword: 'AI blog writing', score: 82 },
  { keyword: 'marketing automation', score: 76 },
  { keyword: 'content strategy', score: 71 },
];

const sampleOutline = [
  {
    level: 'H1',
    text: 'How to Use AI for Content Marketing: The Complete 2025 Guide',
    expanded: true,
    children: [
      {
        level: 'H2',
        text: 'Understanding AI in Content Marketing',
        expanded: true,
        children: [
          { level: 'H3', text: 'What is AI Content Marketing?', expanded: false },
          { level: 'H3', text: 'Evolution of AI in Marketing', expanded: false },
        ],
      },
      {
        level: 'H2',
        text: 'Benefits of AI Content Marketing',
        expanded: true,
        children: [
          { level: 'H3', text: 'Time Efficiency and Automation', expanded: false },
          { level: 'H3', text: 'Data-Driven Insights', expanded: false },
          { level: 'H3', text: 'Personalization at Scale', expanded: false },
        ],
      },
      {
        level: 'H2',
        text: 'Top AI Tools for Content Marketers',
        expanded: false,
      },
      {
        level: 'H2',
        text: 'Best Practices for AI Content Creation',
        expanded: false,
      },
      {
        level: 'H2',
        text: 'Common Challenges and Solutions',
        expanded: false,
      },
      {
        level: 'H2',
        text: 'Conclusion',
        expanded: false,
      },
    ],
  },
];

export function SEOOutlineGenerator({ onBack }: SEOOutlineGeneratorProps) {
  const [topic, setTopic] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([]);

  const handleGenerate = () => {
    setShowResults(true);
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
          className={`flex items-start gap-3 p-3 rounded-xl hover:bg-white/5 cursor-pointer ${
            depth === 0 ? 'bg-white/5' : ''
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
              <span className="text-white/40 text-xs px-2 py-0.5 bg-white/5 rounded">
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
            className="rounded-full hover:bg-white/10"
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
        <Card className="bg-white/5 border-white/10 p-5 rounded-2xl space-y-3">
          <Label className="text-white">Enter Topic</Label>
          <Input
            placeholder="E.g., AI for content marketing"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="bg-white/10 border-white/10 text-white placeholder:text-white/40 h-12 rounded-xl"
          />
          <Button
            onClick={handleGenerate}
            disabled={!topic}
            className="w-full bg-white text-black hover:bg-white/90 h-11 rounded-xl disabled:opacity-50"
          >
            <Sparkles className="w-5 h-5 mr-2" />
            Generate Outline
          </Button>
        </Card>

        {showResults && (
          <>
            {/* Keyword Suggestions */}
            <Card className="bg-white/5 border-white/10 p-5 rounded-2xl space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-white">Keyword Suggestions</Label>
                <span className="text-white/60 text-sm">{selectedKeywords.length} selected</span>
              </div>
              <div className="space-y-2">
                {sampleKeywords.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => toggleKeyword(item.keyword)}
                    className={`w-full flex items-center justify-between p-3 rounded-xl border transition-all ${
                      selectedKeywords.includes(item.keyword)
                        ? 'bg-white/10 border-white/20'
                        : 'bg-white/5 border-white/10 hover:bg-white/10'
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
            </Card>

            {/* Outline Preview */}
            <Card className="bg-white/5 border-white/10 p-5 rounded-2xl space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-white">Outline Preview</Label>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-white hover:bg-white/10 rounded-lg"
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Regenerate
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-white hover:bg-white/10 rounded-lg"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Section
                  </Button>
                </div>
              </div>
              
              <div className="space-y-1">
                {sampleOutline.map((node, idx) => (
                  <OutlineNode key={idx} node={node} />
                ))}
              </div>
            </Card>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex-1 bg-white/5 border-white/10 text-white hover:bg-white/10 h-11 rounded-xl"
              >
                Auto-Optimize
              </Button>
              <Button className="flex-1 bg-white text-black hover:bg-white/90 h-11 rounded-xl">
                Generate Blog
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
