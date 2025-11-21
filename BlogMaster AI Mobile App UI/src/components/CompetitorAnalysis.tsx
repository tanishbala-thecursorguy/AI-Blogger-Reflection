import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card } from './ui/card';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import {
  ArrowLeft,
  Search,
  Target,
  AlertCircle,
  TrendingUp,
  FileText,
  CheckCircle,
} from 'lucide-react';

interface CompetitorAnalysisProps {
  onBack: () => void;
}

export function CompetitorAnalysis({ onBack }: CompetitorAnalysisProps) {
  const [url, setUrl] = useState('');
  const [showResults, setShowResults] = useState(false);

  const handleAnalyze = () => {
    setShowResults(true);
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
            <h1 className="text-white">Competitor Analysis</h1>
            <p className="text-white/60 text-sm">Analyze and outrank competitors</p>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6 pb-20">
        {/* URL Input */}
        <Card className="bg-white/5 border-white/10 p-5 rounded-2xl space-y-3">
          <Label className="text-white">Competitor Blog URL</Label>
          <div className="flex gap-2">
            <Input
              placeholder="https://example.com/blog-post"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAnalyze()}
              className="bg-white/10 border-white/10 text-white placeholder:text-white/40 h-12 rounded-xl"
            />
            <Button
              onClick={handleAnalyze}
              disabled={!url}
              size="icon"
              className="bg-white text-black hover:bg-white/90 rounded-xl w-12 h-12 flex-shrink-0 disabled:opacity-50"
            >
              <Search className="w-5 h-5" />
            </Button>
          </div>
        </Card>

        {showResults && (
          <>
            {/* Competitor Score */}
            <Card className="bg-white/5 border-white/10 p-6 rounded-2xl space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-white">Overall Competitor Score</Label>
                <span className="text-white text-2xl">78/100</span>
              </div>
              <Progress value={78} className="h-2 bg-white/10" />
              <p className="text-white/60 text-sm">
                This article has strong SEO optimization but has content gaps you can exploit.
              </p>
            </Card>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-3">
              <Card className="bg-white/5 border-white/10 p-4 rounded-2xl">
                <div className="flex items-center gap-2 mb-2">
                  <FileText className="w-4 h-4 text-white/60" />
                  <span className="text-white/60 text-sm">Word Count</span>
                </div>
                <div className="text-white text-xl">2,450</div>
              </Card>
              <Card className="bg-white/5 border-white/10 p-4 rounded-2xl">
                <div className="flex items-center gap-2 mb-2">
                  <Target className="w-4 h-4 text-white/60" />
                  <span className="text-white/60 text-sm">Keywords Used</span>
                </div>
                <div className="text-white text-xl">18</div>
              </Card>
            </div>

            {/* Structure Map */}
            <Card className="bg-white/5 border-white/10 p-5 rounded-2xl space-y-4">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-white" />
                <Label className="text-white">Content Structure</Label>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl">
                  <span className="text-white text-sm">H1 Tags</span>
                  <Badge variant="outline" className="bg-white/10 border-white/20 text-white">
                    1
                  </Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl">
                  <span className="text-white text-sm">H2 Tags</span>
                  <Badge variant="outline" className="bg-white/10 border-white/20 text-white">
                    8
                  </Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl">
                  <span className="text-white text-sm">H3 Tags</span>
                  <Badge variant="outline" className="bg-white/10 border-white/20 text-white">
                    15
                  </Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl">
                  <span className="text-white text-sm">Images</span>
                  <Badge variant="outline" className="bg-white/10 border-white/20 text-white">
                    12
                  </Badge>
                </div>
              </div>
            </Card>

            {/* Missing Points */}
            <Card className="bg-white/5 border-white/10 p-5 rounded-2xl space-y-4">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-green-400" />
                <Label className="text-white">Content Gaps & Opportunities</Label>
              </div>
              <div className="space-y-2">
                {[
                  'No coverage of AI automation tools',
                  'Missing practical implementation examples',
                  'Limited discussion on ROI metrics',
                  'No case studies or success stories',
                  'Weak coverage of future trends',
                ].map((gap, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 p-3 bg-white/5 rounded-xl"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-green-400 mt-2 flex-shrink-0" />
                    <span className="text-white/80 text-sm">{gap}</span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Weak Sections */}
            <Card className="bg-white/5 border-white/10 p-5 rounded-2xl space-y-4">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-yellow-400" />
                <Label className="text-white">Weak Sections to Target</Label>
              </div>
              <div className="space-y-2">
                {[
                  { section: 'Introduction', score: 62 },
                  { section: 'Tool Comparisons', score: 58 },
                  { section: 'Pricing Analysis', score: 54 },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-white/5 rounded-xl space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-white text-sm">{item.section}</span>
                      <span className="text-white/60 text-sm">{item.score}%</span>
                    </div>
                    <Progress value={item.score} className="h-1.5 bg-white/10" />
                  </div>
                ))}
              </div>
            </Card>

            {/* Keywords Used */}
            <Card className="bg-white/5 border-white/10 p-5 rounded-2xl space-y-3">
              <Label className="text-white">Keywords Detected</Label>
              <div className="flex flex-wrap gap-2">
                {[
                  'AI content marketing',
                  'marketing automation',
                  'content strategy',
                  'SEO optimization',
                  'digital marketing',
                  'content creation',
                  'AI tools',
                  'marketing trends',
                ].map((keyword, idx) => (
                  <Badge
                    key={idx}
                    variant="outline"
                    className="bg-white/10 border-white/20 text-white"
                  >
                    {keyword}
                  </Badge>
                ))}
              </div>
            </Card>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button className="w-full bg-white text-black hover:bg-white/90 h-12 rounded-xl">
                <Target className="w-5 h-5 mr-2" />
                Generate Outranking Strategy
              </Button>
              <Button
                variant="outline"
                className="w-full bg-white/5 border-white/10 text-white hover:bg-white/10 h-12 rounded-xl"
              >
                <FileText className="w-5 h-5 mr-2" />
                Rewrite Better Version
              </Button>
            </div>
          </>
        )}

        {/* Empty State */}
        {!showResults && (
          <Card className="bg-white/5 border-white/10 p-12 rounded-2xl text-center">
            <Target className="w-12 h-12 text-white/20 mx-auto mb-4" />
            <p className="text-white/60">
              Paste a competitor's blog URL to analyze their content strategy and find opportunities to outrank them
            </p>
          </Card>
        )}
      </div>
    </div>
  );
}
