import React from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Screen } from '../App';
import {
  FileText,
  Lightbulb,
  ListTree,
  RefreshCw,
  Target,
  Search,
  Settings,
  Plus,
  Clock,
  Edit,
  MoreVertical,
} from 'lucide-react';

interface HomeDashboardProps {
  userName: string;
  onNavigate: (screen: Screen) => void;
}

const quickActions = [
  { icon: FileText, label: 'Generate Blog', screen: 'blog-generator' as Screen },
  { icon: Lightbulb, label: 'Topic Ideas', screen: 'tasks' as Screen },
  { icon: ListTree, label: 'SEO Outline', screen: 'seo-outline' as Screen },
  { icon: RefreshCw, label: 'Rewrite Blog', screen: 'blog-rewriter' as Screen },
  { icon: Target, label: 'Competitor Analysis', screen: 'competitor-analysis' as Screen },
  { icon: Search, label: 'Keyword Research', screen: 'keyword-research' as Screen },
];

const recentBlogs: Array<{
  id: number;
  title: string;
  date: string;
  status: string;
  words: number;
}> = [];

export function HomeDashboard({ userName, onNavigate }: HomeDashboardProps) {
  return (
    <div className="min-h-screen bg-black pb-20">
      {/* Header */}
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-white">Welcome, {userName}</h1>
            <p className="text-white/60 text-sm mt-1">Let's create something amazing today</p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onNavigate('settings')}
            className="rounded-full hover:bg-white/10"
          >
            <Settings className="w-6 h-6 text-white" />
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-3">
          <Card className="bg-white/5 border-white/10 p-4 rounded-2xl">
            <div className="text-white/60 text-xs mb-1">Total Blogs</div>
            <div className="text-white text-2xl">47</div>
          </Card>
          <Card className="bg-white/5 border-white/10 p-4 rounded-2xl">
            <div className="text-white/60 text-xs mb-1">Published</div>
            <div className="text-white text-2xl">32</div>
          </Card>
          <Card className="bg-white/5 border-white/10 p-4 rounded-2xl">
            <div className="text-white/60 text-xs mb-1">This Week</div>
            <div className="text-white text-2xl">8</div>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-white">Quick Actions</h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onNavigate('tasks')}
              className="text-white/60 hover:text-white hover:bg-white/5 rounded-xl"
            >
              View All
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <Card
                  key={index}
                  onClick={() => onNavigate(action.screen)}
                  className="bg-white/5 border-white/10 p-5 rounded-2xl hover:bg-white/10 transition-colors cursor-pointer"
                >
                  <div className="bg-white/10 w-12 h-12 rounded-xl flex items-center justify-center mb-3">
                    <Icon className="w-6 h-6 text-white" strokeWidth={1.5} />
                  </div>
                  <div className="text-white text-sm">{action.label}</div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Recent Blogs */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-white">Recent Blogs</h2>
            <Button
              variant="ghost"
              size="icon"
              className="text-white/60 hover:text-white hover:bg-white/5 rounded-full"
            >
              <MoreVertical className="w-5 h-5" />
            </Button>
          </div>

          <div className="space-y-3">
            {recentBlogs.map((blog) => (
              <Card
                key={blog.id}
                className="bg-white/5 border-white/10 p-4 rounded-2xl hover:bg-white/10 transition-colors cursor-pointer"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <h3 className="text-white text-sm mb-2">{blog.title}</h3>
                      <div className="flex items-center gap-3 text-white/60 text-xs">
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {blog.date}
                        </div>
                        <div>•</div>
                        <div>{blog.words} words</div>
                      </div>
                    </div>
                    <div
                      className={`px-2 py-1 rounded-lg text-xs ${
                        blog.status === 'Published'
                          ? 'bg-white/10 text-white'
                          : blog.status === 'Draft'
                          ? 'bg-white/5 text-white/60'
                          : 'bg-white/10 text-white/80'
                      }`}
                    >
                      {blog.status}
                    </div>
                  </div>

                  <Button
                    onClick={() => onNavigate('ai-editor')}
                    variant="ghost"
                    className="w-full h-9 bg-white/5 hover:bg-white/10 text-white rounded-xl"
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Continue Editing
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6">
        <Button
          onClick={() => onNavigate('tasks')}
          size="lg"
          className="w-14 h-14 rounded-full bg-white text-black hover:bg-white/90 shadow-2xl"
        >
          <Plus className="w-6 h-6" />
        </Button>
      </div>
    </div>
  );
}
