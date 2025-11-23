import { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Switch } from './ui/switch';
import { Badge } from './ui/badge';
import {
  ArrowLeft,
  Upload,
  Link2,
  TrendingUp,
  CheckCircle,
} from 'lucide-react';

interface InternalLinkingProps {
  onBack: () => void;
}

const existingBlogs = [
  {
    id: 1,
    title: '10 AI Tools That Will Transform Your Content Marketing Strategy',
    url: '/blog/ai-tools-content-marketing',
    relevance: 95,
  },
  {
    id: 2,
    title: 'The Ultimate Guide to SEO Optimization in 2025',
    url: '/blog/seo-optimization-guide-2025',
    relevance: 88,
  },
  {
    id: 3,
    title: 'How to Create Engaging Social Media Content Using AI',
    url: '/blog/ai-social-media-content',
    relevance: 82,
  },
  {
    id: 4,
    title: 'Understanding Google\'s Latest Algorithm Updates',
    url: '/blog/google-algorithm-updates',
    relevance: 76,
  },
  {
    id: 5,
    title: 'Content Marketing ROI: How to Measure Success',
    url: '/blog/content-marketing-roi',
    relevance: 71,
  },
];

const suggestedLinks = [
  {
    blogId: 1,
    anchorText: 'AI content marketing tools',
    position: 'Section 2, Paragraph 3',
    relevance: 95,
    enabled: true,
  },
  {
    blogId: 2,
    anchorText: 'SEO optimization strategies',
    position: 'Section 4, Paragraph 1',
    relevance: 88,
    enabled: true,
  },
  {
    blogId: 3,
    anchorText: 'social media content creation',
    position: 'Section 3, Paragraph 2',
    relevance: 82,
    enabled: false,
  },
  {
    blogId: 4,
    anchorText: 'latest Google updates',
    position: 'Section 5, Paragraph 4',
    relevance: 76,
    enabled: true,
  },
];

export function InternalLinking({ onBack }: InternalLinkingProps) {
  const [links, setLinks] = useState(suggestedLinks);
  const [uploaded, setUploaded] = useState(false);

  const toggleLink = (index: number) => {
    setLinks(links.map((link, i) => 
      i === index ? { ...link, enabled: !link.enabled } : link
    ));
  };

  const getRelevanceColor = (relevance: number) => {
    if (relevance >= 80) return 'text-green-400';
    if (relevance >= 60) return 'text-yellow-400';
    return 'text-white/60';
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
            <h1 className="text-white">Internal Linking</h1>
            <p className="text-white/60 text-sm">Optimize internal link structure</p>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6 pb-20">
        {/* Upload Section */}
        {!uploaded ? (
          <Card className="bg-black border-white/10 p-8 rounded-2xl text-center space-y-4">
            <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto">
              <Upload className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-white mb-2">Upload Your Blog List</h2>
              <p className="text-white/60 text-sm">
                Upload a list of your existing blog posts to generate intelligent internal linking suggestions
              </p>
            </div>
            <Button
              onClick={() => setUploaded(true)}
              className="bg-white text-black hover:bg-white/90 h-11 rounded-xl px-8"
            >
              Upload Blog List
            </Button>
          </Card>
        ) : (
          <>
            {/* Stats */}
            <div className="grid grid-cols-3 gap-3">
              <Card className="bg-black border-white/10 p-4 rounded-2xl text-center">
                <div className="text-white text-2xl mb-1">{existingBlogs.length}</div>
                <div className="text-white/60 text-xs">Total Blogs</div>
              </Card>
              <Card className="bg-black border-white/10 p-4 rounded-2xl text-center">
                <div className="text-white text-2xl mb-1">{links.filter(l => l.enabled).length}</div>
                <div className="text-white/60 text-xs">Active Links</div>
              </Card>
              <Card className="bg-black border-white/10 p-4 rounded-2xl text-center">
                <div className="text-white text-2xl mb-1">{links.length}</div>
                <div className="text-white/60 text-xs">Suggestions</div>
              </Card>
            </div>

            {/* Existing Blogs */}
            <Card className="bg-black border-white/10 p-5 rounded-2xl space-y-4">
              <div className="flex items-center gap-2">
                <Link2 className="w-5 h-5 text-white" />
                <h2 className="text-white">Your Blog Library</h2>
              </div>
              <div className="space-y-2">
                {existingBlogs.map((blog) => (
                  <div
                    key={blog.id}
                    className="p-3 bg-black rounded-xl hover:bg-black transition-colors"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <h3 className="text-white text-sm mb-1">{blog.title}</h3>
                        <p className="text-white/40 text-xs">{blog.url}</p>
                      </div>
                      <Badge
                        variant="outline"
                        className={`${getRelevanceColor(blog.relevance)} bg-black border-white/20 flex-shrink-0`}
                      >
                        {blog.relevance}%
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Suggested Links */}
            <Card className="bg-black border-white/10 p-5 rounded-2xl space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-white" />
                  <h2 className="text-white">Suggested Links</h2>
                </div>
                <span className="text-white/60 text-sm">
                  {links.filter(l => l.enabled).length} of {links.length} enabled
                </span>
              </div>

              <div className="space-y-3">
                {links.map((link, index) => {
                  const blog = existingBlogs.find(b => b.id === link.blogId);
                  if (!blog) return null;

                  return (
                    <Card
                      key={index}
                      className="bg-black border-white/10 p-4 rounded-2xl"
                    >
                      <div className="space-y-3">
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <Badge
                                variant="outline"
                                className={`${getRelevanceColor(link.relevance)} bg-black border-white/20 text-xs`}
                              >
                                {link.relevance}% match
                              </Badge>
                              {link.enabled && (
                                <CheckCircle className="w-4 h-4 text-green-400" />
                              )}
                            </div>
                            <h3 className="text-white text-sm mb-1">
                              Link to: {blog.title}
                            </h3>
                            <div className="space-y-1">
                              <p className="text-white/60 text-xs">
                                Anchor: "{link.anchorText}"
                              </p>
                              <p className="text-white/40 text-xs">
                                Position: {link.position}
                              </p>
                            </div>
                          </div>
                          <Switch
                            checked={link.enabled}
                            onCheckedChange={() => toggleLink(index)}
                            className="data-[state=checked]:bg-white flex-shrink-0"
                          />
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>
            </Card>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button className="w-full bg-white text-black hover:bg-white/90 h-12 rounded-xl">
                Apply {links.filter(l => l.enabled).length} Internal Links
              </Button>
              <Button
                variant="outline"
                className="w-full bg-black border-white/10 text-white hover:bg-black h-11 rounded-xl"
              >
                Generate More Suggestions
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
