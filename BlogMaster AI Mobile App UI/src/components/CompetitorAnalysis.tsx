import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card } from './ui/card';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { Textarea } from './ui/textarea';
import ReactMarkdown from 'react-markdown';
import {
  ArrowLeft,
  Search,
  Target,
  AlertCircle,
  TrendingUp,
  FileText,
  CheckCircle,
  Loader2,
  Copy,
  Download,
  RefreshCw,
} from 'lucide-react';
import { analyzeCompetitor, rewriteBlog } from '../utils/openai';

interface CompetitorAnalysisProps {
  onBack: () => void;
}

export function CompetitorAnalysis({ onBack }: CompetitorAnalysisProps) {
  const [url, setUrl] = useState('');
  const [content, setContent] = useState('');
  const [originalContent, setOriginalContent] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<{
    wordCount: number;
    keywords: string[];
    structure: { h1: number; h2: number; h3: number; images: number };
    mainTopic: string;
    summary: string;
    contentGaps: string[];
    weakSections: Array<{ section: string; score: number }>;
    overallScore: number;
  } | null>(null);
  const [isRewriting, setIsRewriting] = useState(false);
  const [rewrittenVariants, setRewrittenVariants] = useState<string[]>([]);
  const [selectedVariant, setSelectedVariant] = useState<number>(0);
  const [showRewritten, setShowRewritten] = useState(false);

  const handleAnalyze = async () => {
    if (!url.trim() && !content.trim()) {
      setError('Please enter a URL or paste the content');
      return;
    }

    setIsAnalyzing(true);
    setError(null);
    setShowResults(false);

    try {
      let contentToAnalyze = content.trim();

      // If URL is provided, try to fetch content (with CORS proxy)
      if (url.trim() && !contentToAnalyze) {
        try {
          // Try using a CORS proxy to fetch the content
          const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`;
          const response = await fetch(proxyUrl);
          
          if (response.ok) {
            const html = await response.text();
            // Simple HTML to text extraction
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            
            // Remove script and style elements
            const scripts = doc.querySelectorAll('script, style, nav, header, footer');
            scripts.forEach(el => el.remove());
            
            // Get text content
            contentToAnalyze = doc.body.innerText || doc.body.textContent || '';
            
            if (!contentToAnalyze || contentToAnalyze.trim().length < 100) {
              throw new Error('Could not extract sufficient content from URL. Please paste the content directly.');
            }
          } else {
            throw new Error('Could not fetch content from URL. Please paste the content directly.');
          }
        } catch (fetchError: any) {
          setError(fetchError.message || 'Could not fetch content from URL. Please paste the content directly.');
          setIsAnalyzing(false);
          return;
        }
      }

      if (!contentToAnalyze || contentToAnalyze.trim().length < 100) {
        setError('Please provide at least 100 characters of content to analyze');
        setIsAnalyzing(false);
        return;
      }

      // Store original content for rewriting
      setOriginalContent(contentToAnalyze);
      
      // Analyze the content
      const result = await analyzeCompetitor(contentToAnalyze);
      setAnalysis(result);
      setShowResults(true);
    } catch (err: any) {
      setError(err.message || 'Failed to analyze content. Please try again.');
      console.error('Error analyzing competitor:', err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleRewrite = async () => {
    if (!originalContent.trim()) {
      setError('No content available to rewrite. Please analyze content first.');
      return;
    }

    setIsRewriting(true);
    setError(null);
    setShowRewritten(false);
    setRewrittenVariants([]);

    try {
      // Use content gaps to inform improvements
      const improvements = analysis?.contentGaps || [];
      const improvementText = improvements.length > 0 
        ? `Focus on these improvements: ${improvements.slice(0, 3).join(', ')}. `
        : '';

      const variants = await rewriteBlog(originalContent, {
        style: 'Professional',
        tone: 'Authoritative',
        improvements: ['Improve SEO', 'Improve Readability', 'Expand', ...improvements.slice(0, 2)],
      });

      if (variants && variants.length > 0) {
        setRewrittenVariants(variants);
        setSelectedVariant(0);
        setShowRewritten(true);
      } else {
        setError('Failed to generate rewritten content. Please try again.');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to rewrite content. Please try again.');
      console.error('Error rewriting content:', err);
    } finally {
      setIsRewriting(false);
    }
  };

  const handleCopyRewritten = () => {
    if (rewrittenVariants[selectedVariant]) {
      navigator.clipboard.writeText(rewrittenVariants[selectedVariant]);
    }
  };

  const handleDownloadRewritten = () => {
    if (rewrittenVariants[selectedVariant]) {
      const blob = new Blob([rewrittenVariants[selectedVariant]], { type: 'text/markdown' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `improved-competitor-content-${Date.now()}.md`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
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
        <Card className="bg-white/5 border-white/10 p-5 rounded-2xl space-y-4">
          <div className="space-y-3">
            <Label className="text-white">Competitor Blog URL (Optional)</Label>
            <Input
              placeholder="https://example.com/blog-post"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && !isAnalyzing && handleAnalyze()}
              disabled={isAnalyzing}
              className="bg-white/10 border-white/10 text-white placeholder:text-white/40 h-12 rounded-xl"
            />
          </div>

          <div className="space-y-3">
            <Label className="text-white">Or Paste Content Directly</Label>
            <Textarea
              placeholder="Paste the competitor's blog content here..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              disabled={isAnalyzing}
              className="bg-white/10 border-white/10 text-white placeholder:text-white/40 min-h-[200px] rounded-xl resize-none"
            />
          </div>

          {error && (
            <div className="text-red-400 text-sm bg-red-400/10 border border-red-400/20 rounded-xl p-3">
              {error}
            </div>
          )}

          <Button
            onClick={handleAnalyze}
            disabled={(!url.trim() && !content.trim()) || isAnalyzing}
            className="w-full bg-white text-black hover:bg-white/90 rounded-xl h-12 disabled:opacity-50"
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <Search className="w-5 h-5 mr-2" />
                Analyze Competitor Content
              </>
            )}
          </Button>
        </Card>

        {showResults && analysis && (
          <>
            {/* Main Topic & Summary */}
            <Card className="bg-white/5 border-white/10 p-5 rounded-2xl space-y-3">
              <Label className="text-white">Main Topic</Label>
              <p className="text-white text-lg font-medium">{analysis.mainTopic}</p>
              <Label className="text-white">Summary</Label>
              <p className="text-white/80 text-sm leading-relaxed">{analysis.summary}</p>
            </Card>

            {/* Competitor Score */}
            <Card className="bg-white/5 border-white/10 p-6 rounded-2xl space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-white">Overall Competitor Score</Label>
                <span className="text-white text-2xl">{analysis.overallScore}/100</span>
              </div>
              <Progress value={analysis.overallScore} className="h-2 bg-white/10" />
              <p className="text-white/60 text-sm">
                {analysis.overallScore >= 80 
                  ? 'This article has strong SEO optimization but has content gaps you can exploit.'
                  : analysis.overallScore >= 60
                  ? 'This article has moderate SEO optimization. There are significant opportunities to create better content.'
                  : 'This article has weak SEO optimization. Great opportunity to create superior content.'}
              </p>
            </Card>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-3">
              <Card className="bg-white/5 border-white/10 p-4 rounded-2xl">
                <div className="flex items-center gap-2 mb-2">
                  <FileText className="w-4 h-4 text-white/60" />
                  <span className="text-white/60 text-sm">Word Count</span>
                </div>
                <div className="text-white text-xl">{analysis.wordCount.toLocaleString()}</div>
              </Card>
              <Card className="bg-white/5 border-white/10 p-4 rounded-2xl">
                <div className="flex items-center gap-2 mb-2">
                  <Target className="w-4 h-4 text-white/60" />
                  <span className="text-white/60 text-sm">Keywords Used</span>
                </div>
                <div className="text-white text-xl">{analysis.keywords.length}</div>
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
                    {analysis.structure.h1}
                  </Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl">
                  <span className="text-white text-sm">H2 Tags</span>
                  <Badge variant="outline" className="bg-white/10 border-white/20 text-white">
                    {analysis.structure.h2}
                  </Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl">
                  <span className="text-white text-sm">H3 Tags</span>
                  <Badge variant="outline" className="bg-white/10 border-white/20 text-white">
                    {analysis.structure.h3}
                  </Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl">
                  <span className="text-white text-sm">Images</span>
                  <Badge variant="outline" className="bg-white/10 border-white/20 text-white">
                    {analysis.structure.images}
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
                {analysis.contentGaps.map((gap, idx) => (
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
                {analysis.weakSections.map((item, idx) => (
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
                {analysis.keywords.length > 0 ? (
                  analysis.keywords.map((keyword, idx) => (
                    <Badge
                      key={idx}
                      variant="outline"
                      className="bg-white/10 border-white/20 text-white"
                    >
                      {keyword}
                    </Badge>
                  ))
                ) : (
                  <span className="text-white/60 text-sm">No keywords detected</span>
                )}
              </div>
            </Card>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button className="w-full bg-white text-black hover:bg-white/90 h-12 rounded-xl">
                <Target className="w-5 h-5 mr-2" />
                Generate Outranking Strategy
              </Button>
              <Button
                onClick={handleRewrite}
                disabled={isRewriting || !originalContent.trim()}
                variant="outline"
                className="w-full bg-white/5 border-white/10 text-white hover:bg-white/10 h-12 rounded-xl disabled:opacity-50"
              >
                {isRewriting ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Rewriting...
                  </>
                ) : (
                  <>
                    <FileText className="w-5 h-5 mr-2" />
                    Rewrite Better Version
                  </>
                )}
              </Button>
            </div>

            {/* Rewritten Content */}
            {showRewritten && rewrittenVariants.length > 0 && (
              <Card className="bg-white/5 border-white/10 p-5 rounded-2xl space-y-4">
                <div className="flex items-center justify-between">
                  <Label className="text-white text-lg">Improved Version</Label>
                  <div className="flex items-center gap-2">
                    {rewrittenVariants.length > 1 && (
                      <div className="flex items-center gap-2">
                        {rewrittenVariants.map((_, idx) => (
                          <button
                            key={idx}
                            onClick={() => setSelectedVariant(idx)}
                            className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${
                              selectedVariant === idx
                                ? 'bg-white text-black'
                                : 'bg-white/10 text-white hover:bg-white/20'
                            }`}
                          >
                            {idx + 1}
                          </button>
                        ))}
                      </div>
                    )}
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={handleCopyRewritten}
                      className="rounded-xl hover:bg-white/10"
                    >
                      <Copy className="w-5 h-5 text-white" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={handleDownloadRewritten}
                      className="rounded-xl hover:bg-white/10"
                    >
                      <Download className="w-5 h-5 text-white" />
                    </Button>
                  </div>
                </div>

                <div className="bg-black/50 border border-white/10 rounded-xl p-4 max-h-[600px] overflow-y-auto">
                  <div className="text-white whitespace-pre-wrap break-words prose prose-invert max-w-none [&>*]:text-white [&_h1]:text-white [&_h2]:text-white [&_h3]:text-white [&_h4]:text-white [&_h5]:text-white [&_h6]:text-white [&_p]:text-white [&_li]:text-white [&_strong]:text-white [&_em]:text-white [&_code]:text-white [&_pre]:text-white [&_blockquote]:text-white [&_a]:text-white">
                    <ReactMarkdown>
                      {rewrittenVariants[selectedVariant]}
                    </ReactMarkdown>
                  </div>
                </div>

                {rewrittenVariants.length > 1 && (
                  <Button
                    variant="outline"
                    onClick={handleRewrite}
                    disabled={isRewriting}
                    className="w-full bg-white/5 border-white/10 text-white hover:bg-white/10 h-12 rounded-xl"
                  >
                    <RefreshCw className="w-5 h-5 mr-2" />
                    Generate New Variants
                  </Button>
                )}
              </Card>
            )}
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
