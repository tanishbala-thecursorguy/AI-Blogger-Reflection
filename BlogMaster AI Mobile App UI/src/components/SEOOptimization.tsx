import React from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { Label } from './ui/label';
import {
  ArrowLeft,
  CheckCircle,
  AlertCircle,
  XCircle,
  TrendingUp,
  Sparkles,
} from 'lucide-react';

interface SEOOptimizationProps {
  onBack: () => void;
}

const seoChecks = [
  {
    category: 'Keywords',
    items: [
      { label: 'Primary keyword in title', status: 'pass', score: 100 },
      { label: 'Keyword density (1-2%)', status: 'pass', score: 100 },
      { label: 'LSI keywords present', status: 'warning', score: 75 },
      { label: 'Keywords in meta description', status: 'pass', score: 100 },
    ],
  },
  {
    category: 'Content Structure',
    items: [
      { label: 'Proper H1 tag', status: 'pass', score: 100 },
      { label: 'H2-H6 hierarchy', status: 'pass', score: 100 },
      { label: 'Paragraph length', status: 'warning', score: 70 },
      { label: 'Bullet points used', status: 'pass', score: 100 },
    ],
  },
  {
    category: 'Readability',
    items: [
      { label: 'Flesch reading ease', status: 'pass', score: 85 },
      { label: 'Sentence length', status: 'warning', score: 75 },
      { label: 'Passive voice (<10%)', status: 'fail', score: 45 },
      { label: 'Transition words', status: 'pass', score: 90 },
    ],
  },
  {
    category: 'Technical SEO',
    items: [
      { label: 'Meta description length', status: 'pass', score: 100 },
      { label: 'Internal links', status: 'warning', score: 60 },
      { label: 'External links', status: 'pass', score: 100 },
      { label: 'Image alt text', status: 'fail', score: 40 },
    ],
  },
];

const contentGaps = [
  'Add more examples and case studies',
  'Include recent statistics (2025 data)',
  'Expand on implementation steps',
  'Add FAQ section',
  'Include expert quotes or testimonials',
];

export function SEOOptimization({ onBack }: SEOOptimizationProps) {
  const overallScore = 78;

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pass':
        return <CheckCircle className="w-4 h-4 text-green-400" />;
      case 'warning':
        return <AlertCircle className="w-4 h-4 text-yellow-400" />;
      case 'fail':
        return <XCircle className="w-4 h-4 text-red-400" />;
      default:
        return null;
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-400';
    if (score >= 60) return 'text-yellow-400';
    return 'text-red-400';
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
            <h1 className="text-white">SEO Optimization</h1>
            <p className="text-white/60 text-sm">Analyze and improve SEO score</p>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6 pb-20">
        {/* Overall SEO Score */}
        <Card className="bg-black border-white/10 p-6 rounded-2xl">
          <div className="flex items-center justify-between mb-4">
            <Label className="text-white">SEO Score</Label>
            <div className={`text-4xl ${getScoreColor(overallScore)}`}>
              {overallScore}
            </div>
          </div>
          <div className="relative">
            <Progress value={overallScore} className="h-3 bg-black" />
          </div>
          <p className="text-white/60 text-sm mt-4">
            Good score! Fix the issues below to reach 90+
          </p>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-3">
          <Card className="bg-black border-white/10 p-4 rounded-2xl text-center">
            <CheckCircle className="w-6 h-6 text-green-400 mx-auto mb-2" />
            <div className="text-white text-xl mb-1">12</div>
            <div className="text-white/60 text-xs">Passed</div>
          </Card>
          <Card className="bg-black border-white/10 p-4 rounded-2xl text-center">
            <AlertCircle className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
            <div className="text-white text-xl mb-1">4</div>
            <div className="text-white/60 text-xs">Warnings</div>
          </Card>
          <Card className="bg-black border-white/10 p-4 rounded-2xl text-center">
            <XCircle className="w-6 h-6 text-red-400 mx-auto mb-2" />
            <div className="text-white text-xl mb-1">2</div>
            <div className="text-white/60 text-xs">Failed</div>
          </Card>
        </div>

        {/* SEO Checks by Category */}
        <div className="space-y-4">
          {seoChecks.map((category, idx) => (
            <Card key={idx} className="bg-black border-white/10 p-5 rounded-2xl space-y-3">
              <h2 className="text-white">{category.category}</h2>
              <div className="space-y-2">
                {category.items.map((item, itemIdx) => (
                  <div
                    key={itemIdx}
                    className="flex items-center justify-between p-3 bg-black rounded-xl"
                  >
                    <div className="flex items-center gap-3 flex-1">
                      {getStatusIcon(item.status)}
                      <span className="text-white text-sm">{item.label}</span>
                    </div>
                    <span className={`text-sm ${getScoreColor(item.score)}`}>
                      {item.score}%
                    </span>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>

        {/* Keyword Density */}
        <Card className="bg-black border-white/10 p-5 rounded-2xl space-y-4">
          <h2 className="text-white">Keyword Density</h2>
          <div className="space-y-3">
            {[
              { keyword: 'AI content marketing', density: 1.8, optimal: true },
              { keyword: 'content strategy', density: 1.2, optimal: true },
              { keyword: 'marketing automation', density: 0.8, optimal: true },
              { keyword: 'SEO optimization', density: 2.4, optimal: false },
            ].map((item, idx) => (
              <div key={idx} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-white text-sm">{item.keyword}</span>
                  <div className="flex items-center gap-2">
                    <span className={`text-sm ${item.optimal ? 'text-green-400' : 'text-yellow-400'}`}>
                      {item.density}%
                    </span>
                    {item.optimal && <CheckCircle className="w-4 h-4 text-green-400" />}
                  </div>
                </div>
                <Progress 
                  value={item.density * 50} 
                  className={`h-1.5 ${item.optimal ? 'bg-black' : 'bg-yellow-400/20'}`}
                />
              </div>
            ))}
          </div>
        </Card>

        {/* Content Gap Suggestions */}
        <Card className="bg-black border-white/10 p-5 rounded-2xl space-y-4">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-white" />
            <h2 className="text-white">Content Gap Suggestions</h2>
          </div>
          <div className="space-y-2">
            {contentGaps.map((gap, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 p-3 bg-black rounded-xl"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-green-400 mt-2 flex-shrink-0" />
                <span className="text-white/80 text-sm">{gap}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Passive Voice Indicator */}
        <Card className="bg-black border-white/10 p-5 rounded-2xl space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-white">Passive Voice Usage</h2>
            <Badge variant="outline" className="bg-red-400/10 border-red-400/20 text-red-400">
              High
            </Badge>
          </div>
          <Progress value={65} className="h-2 bg-black" />
          <p className="text-white/60 text-sm">
            15% of sentences use passive voice. Aim for less than 10% for better readability.
          </p>
        </Card>

        {/* Fix All Button */}
        <Button className="w-full bg-white text-black hover:bg-white/90 h-12 rounded-xl">
          <Sparkles className="w-5 h-5 mr-2" />
          Fix All Issues Automatically
        </Button>
      </div>
    </div>
  );
}
