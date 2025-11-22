import React from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Screen } from '../App';
import {
  FileText,
  Lightbulb,
  ListTree,
  RefreshCw,
  Edit3,
  Video,
  Image as ImageIcon,
  ArrowLeft,
  Target,
  Search,
  Link2,
  BarChart3,
} from 'lucide-react';

interface TaskCreationProps {
  onNavigate: (screen: Screen) => void;
  onBack: () => void;
}

const tasks = [
  {
    icon: FileText,
    title: 'Generate Full Blog',
    description: 'Create a complete SEO-optimized blog post from scratch',
    screen: 'blog-generator' as Screen,
  },
  {
    icon: Lightbulb,
    title: 'Topic Generator',
    description: 'Get trending topic ideas based on your niche',
    screen: 'topic-generator' as Screen,
  },
  {
    icon: ListTree,
    title: 'SEO Outline Builder',
    description: 'Generate comprehensive outlines with H1, H2, H3 structure',
    screen: 'seo-outline' as Screen,
  },
  {
    icon: RefreshCw,
    title: 'Rewrite Existing Blog',
    description: 'Improve and optimize your existing content',
    screen: 'blog-rewriter' as Screen,
  },
  {
    icon: Edit3,
    title: 'AI Editor Mode',
    description: 'Fine-tune your content with AI-powered suggestions',
    screen: 'ai-editor' as Screen,
  },
  {
    icon: Video,
    title: 'Blog → Video Script',
    description: 'Convert your blog posts into video scripts',
    screen: 'export' as Screen,
  },
  {
    icon: Target,
    title: 'Competitor Analysis',
    description: 'Analyze competitor content and find opportunities',
    screen: 'competitor-analysis' as Screen,
  },
  {
    icon: Search,
    title: 'Keyword Research',
    description: 'Discover high-traffic keywords for your niche',
    screen: 'keyword-research' as Screen,
  },
  {
    icon: Link2,
    title: 'Internal Linking',
    description: 'Optimize internal links across your content',
    screen: 'internal-linking' as Screen,
  },
  {
    icon: BarChart3,
    title: 'SEO Optimization',
    description: 'Analyze and improve your content\'s SEO score',
    screen: 'seo-optimization' as Screen,
  },
  {
    icon: ImageIcon,
    title: 'Image Generator',
    description: 'Create AI-generated featured images for your posts',
    screen: 'image-generator' as Screen,
  },
];

export function TaskCreation({ onNavigate, onBack }: TaskCreationProps) {
  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <div className="sticky top-0 bg-black border-b border-white/10 p-4">
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
            <h1 className="text-white">Create New Task</h1>
            <p className="text-white/60 text-sm">Choose what you'd like to create</p>
          </div>
        </div>
      </div>

      {/* Task Cards */}
      <div className="p-6 space-y-3 pb-20">
        {tasks.map((task, index) => {
          const Icon = task.icon;
          return (
            <Card
              key={index}
              onClick={() => onNavigate(task.screen)}
              className="bg-white/5 border-white/10 p-5 rounded-2xl hover:bg-white/10 transition-colors cursor-pointer"
            >
              <div className="flex items-start gap-4">
                <div className="bg-white/10 w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Icon className="w-6 h-6 text-white" strokeWidth={1.5} />
                </div>
                <div className="flex-1">
                  <h3 className="text-white text-base mb-1 font-medium">{task.title}</h3>
                  <p className="text-white/60 text-sm leading-relaxed">{task.description}</p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
