import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Screen } from '../App';
import { supabase } from '../lib/supabase';
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

interface Blog {
  id: string;
  title: string;
  content: string;
  date: string;
  status: string;
  words: number;
  topic?: string;
  style?: string;
}

export function HomeDashboard({ userName, onNavigate }: HomeDashboardProps) {
  const [recentBlogs, setRecentBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    loadSavedBlogs();
  }, []);

  const loadSavedBlogs = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: blogs, error } = await supabase
        .from('blogs')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(5);

      if (error) throw error;

      if (blogs) {
        const formattedBlogs: Blog[] = blogs.map(blog => ({
          id: parseInt(blog.id) || Date.now(),
          title: blog.title,
          date: new Date(blog.created_at).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
          }),
          status: blog.status as 'Published' | 'Draft' | 'In Progress',
          words: blog.word_count,
          content: blog.content,
          tone: blog.tone,
          keywords: blog.keywords || [],
        }));
        setRecentBlogs(formattedBlogs);
      }
    } catch (err) {
      console.error('Error loading saved blogs:', err);
    }
  };

  // Calculate stats
  const totalBlogs = recentBlogs.length;
  const publishedBlogs = recentBlogs.filter(b => b.status === 'Published').length;
  const thisWeekBlogs = recentBlogs.filter(blog => {
    const blogDate = new Date(blog.date);
    const today = new Date();
    const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
    return blogDate >= weekAgo;
  }).length;

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
            className="rounded-full hover:bg-black"
          >
            <Settings className="w-6 h-6 text-white" />
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-3">
          <Card className="bg-black border-white/10 p-4 rounded-2xl">
            <div className="text-white/60 text-xs mb-1">Total Blogs</div>
            <div className="text-white text-2xl">{totalBlogs}</div>
          </Card>
          <Card className="bg-black border-white/10 p-4 rounded-2xl">
            <div className="text-white/60 text-xs mb-1">Published</div>
            <div className="text-white text-2xl">{publishedBlogs}</div>
          </Card>
          <Card className="bg-black border-white/10 p-4 rounded-2xl">
            <div className="text-white/60 text-xs mb-1">This Week</div>
            <div className="text-white text-2xl">{thisWeekBlogs}</div>
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
              className="text-white/60 hover:text-white hover:bg-black rounded-xl"
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
                  className="bg-black border-white/10 p-5 rounded-2xl hover:bg-black transition-colors cursor-pointer"
                >
                  <div className="bg-black w-12 h-12 rounded-xl flex items-center justify-center mb-3">
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
              className="text-white/60 hover:text-white hover:bg-black rounded-full"
            >
              <MoreVertical className="w-5 h-5" />
            </Button>
          </div>

          {recentBlogs.length > 0 ? (
            <div className="space-y-3">
              {recentBlogs.map((blog) => (
                <Card
                  key={blog.id}
                  className="bg-black border-white/10 p-4 rounded-2xl hover:bg-black transition-colors cursor-pointer"
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
                            ? 'bg-black text-white'
                            : blog.status === 'Draft'
                            ? 'bg-black text-white/60'
                            : 'bg-black text-white/80'
                        }`}
                      >
                        {blog.status}
                      </div>
                    </div>

                    <Button
                      onClick={() => {
                        // Store blog content for editing
                        localStorage.setItem('editingBlog', JSON.stringify(blog));
                        onNavigate('blog-generator');
                      }}
                      variant="ghost"
                      className="w-full h-9 bg-black hover:bg-black text-white rounded-xl"
                    >
                      <Edit className="w-4 h-4 mr-2" />
                      Continue Editing
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="bg-black border-white/10 p-8 rounded-2xl text-center">
              <FileText className="w-12 h-12 text-white/20 mx-auto mb-3" />
              <p className="text-white/60 text-sm mb-4">No blogs yet. Start creating your first blog!</p>
              <Button
                onClick={() => onNavigate('blog-generator')}
                className="bg-white text-black hover:bg-black rounded-xl"
              >
                Create Your First Blog
              </Button>
            </Card>
          )}
        </div>
      </div>

      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6">
        <Button
          onClick={() => onNavigate('tasks')}
          size="lg"
          className="w-14 h-14 rounded-full bg-white text-black hover:bg-black shadow-2xl"
        >
          <Plus className="w-6 h-6" />
        </Button>
      </div>
    </div>
  );
}
