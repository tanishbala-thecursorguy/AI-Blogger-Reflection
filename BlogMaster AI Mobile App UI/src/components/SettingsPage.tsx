import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { Separator } from './ui/separator';
import { Screen } from '../App';
import { useTheme, type Theme } from '../contexts/ThemeContext';
import {
  ArrowLeft,
  User,
  Edit,
  FileText,
  BookOpen,
  GraduationCap,
  LogOut,
  ChevronRight,
  Palette,
  Moon,
  Sun,
  Droplet,
  Heart,
  Sparkles,
} from 'lucide-react';

interface SettingsPageProps {
  onBack: () => void;
  onLogout: () => void;
  onNavigate: (screen: Screen) => void;
}

interface ThemeOptionProps {
  theme: Theme;
  label: string;
  icon: React.ReactNode;
  currentTheme: Theme;
  onSelect: () => void;
  className?: string;
}

function ThemeOption({ theme, label, icon, currentTheme, onSelect, className = '' }: ThemeOptionProps) {
  const isActive = currentTheme === theme;
  
  const themeColors: Record<Theme, { bg: string; border: string; text: string }> = {
    dark: { bg: 'bg-black', border: 'border-gray-700', text: 'text-white' },
    bright: { bg: 'bg-white', border: 'border-gray-300', text: 'text-black' },
    blue: { bg: 'bg-blue-900', border: 'border-blue-500', text: 'text-blue-100' },
    pink: { bg: 'bg-pink-900', border: 'border-pink-400', text: 'text-pink-100' },
    stars: { bg: 'bg-purple-950', border: 'border-yellow-400', text: 'text-yellow-200' },
  };
  
  const colors = themeColors[theme];
  
  return (
    <button
      onClick={onSelect}
      className={`p-4 rounded-xl border-2 transition-all text-left ${className} ${
        isActive
          ? `${colors.bg} ${colors.border} ${colors.text} ring-2 ring-offset-2 ring-offset-background ring-primary`
          : 'bg-white/5 border-white/10 text-white hover:bg-white/10'
      }`}
    >
      <div className="flex items-center gap-2 mb-1">
        {icon}
        <div className={`text-sm font-medium ${isActive ? colors.text : 'text-white'}`}>
          {label}
        </div>
      </div>
    </button>
  );
}

export function SettingsPage({ onBack, onLogout, onNavigate }: SettingsPageProps) {
  const { theme, setTheme } = useTheme();
  
  // Load user profile from localStorage
  const [name, setName] = useState(() => {
    try {
      const profile = localStorage.getItem('userProfile');
      const userAuth = localStorage.getItem('userAuth');
      if (profile) {
        const profileData = JSON.parse(profile);
        if (profileData.name) return profileData.name;
      }
      if (userAuth) {
        const authData = JSON.parse(userAuth);
        if (authData.name) return authData.name;
      }
    } catch (error) {
      console.error('Error loading profile:', error);
    }
    return 'User';
  });

  const [email, setEmail] = useState(() => {
    try {
      const profile = localStorage.getItem('userProfile');
      const userAuth = localStorage.getItem('userAuth');
      if (profile) {
        const profileData = JSON.parse(profile);
        if (profileData.email) return profileData.email;
      }
      if (userAuth) {
        const authData = JSON.parse(userAuth);
        if (authData.email) return authData.email;
      }
    } catch (error) {
      console.error('Error loading email:', error);
    }
    return '';
  });

  const [defaultTone, setDefaultTone] = useState(() => {
    const saved = localStorage.getItem('defaultTone') || 'Professional';
    return saved;
  });
  
  // Auto-save name, email, and tone to localStorage
  useEffect(() => {
    if (name) {
      // Update both userProfile and userAuth
      const profile = JSON.parse(localStorage.getItem('userProfile') || '{}');
      const userAuth = JSON.parse(localStorage.getItem('userAuth') || '{}');
      
      localStorage.setItem('userProfile', JSON.stringify({ ...profile, name }));
      localStorage.setItem('userAuth', JSON.stringify({ ...userAuth, name }));
    }
  }, [name]);

  useEffect(() => {
    if (email) {
      // Update both userProfile and userAuth
      const profile = JSON.parse(localStorage.getItem('userProfile') || '{}');
      const userAuth = JSON.parse(localStorage.getItem('userAuth') || '{}');
      
      localStorage.setItem('userProfile', JSON.stringify({ ...profile, email }));
      localStorage.setItem('userAuth', JSON.stringify({ ...userAuth, email }));
    }
  }, [email]);

  useEffect(() => {
    if (defaultTone) {
      localStorage.setItem('defaultTone', defaultTone);
    }
  }, [defaultTone]);

  // Get template count
  const [templateCount, setTemplateCount] = useState(0);
  useEffect(() => {
    const templates = localStorage.getItem('blogTemplates');
    if (templates) {
      setTemplateCount(JSON.parse(templates).length);
    }
  }, []);

  const toneOptions = ['Professional', 'Casual', 'Friendly', 'Authoritative', 'Conversational'];

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
            <h1 className="text-white">Settings</h1>
            <p className="text-white/60 text-sm">Manage your preferences</p>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6 pb-20">
        {/* Profile Section */}
        <Card className="bg-white/5 border-white/10 p-5 rounded-2xl space-y-4">
          <div className="flex items-center gap-2">
            <User className="w-5 h-5 text-white" />
            <h2 className="text-white">Profile</h2>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center text-white text-xl">
              {name.split(' ').map(n => n[0]).join('')}
            </div>
            <div className="flex-1">
              <h3 className="text-white">{name}</h3>
              <p className="text-white/60 text-sm">{email}</p>
            </div>
            <Button
              size="icon"
              variant="ghost"
              className="rounded-full hover:bg-white/10"
            >
              <Edit className="w-5 h-5 text-white" />
            </Button>
          </div>

          <Separator className="bg-white/10" />

          <div className="space-y-3">
            <div>
              <Label className="text-white text-sm mb-2">Full Name</Label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-white/10 border-white/10 text-white h-11 rounded-xl"
              />
            </div>
            <div>
              <Label className="text-white text-sm mb-2">Email</Label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white/10 border-white/10 text-white h-11 rounded-xl"
              />
            </div>
          </div>
        </Card>

        {/* Writing Preferences */}
        <Card className="bg-white/5 border-white/10 p-5 rounded-2xl space-y-4">
          <div className="flex items-center gap-2">
            <Edit className="w-5 h-5 text-white" />
            <h2 className="text-white">Writing Style Preferences</h2>
          </div>
          
          <div className="space-y-3">
            <Label className="text-white text-sm">Default Writing Tone</Label>
            <div className="grid grid-cols-2 gap-2">
              {toneOptions.map((tone) => (
                <button
                  key={tone}
                  onClick={() => setDefaultTone(tone)}
                  className={`p-3 rounded-xl border transition-all text-sm ${
                    defaultTone === tone
                      ? 'bg-white text-black border-white'
                      : 'bg-white/5 text-white border-white/10 hover:bg-white/10'
                  }`}
                >
                  {tone}
                </button>
              ))}
            </div>
          </div>
        </Card>

        {/* Blog Templates */}
        <Card className="bg-white/5 border-white/10 p-5 rounded-2xl space-y-3">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-white" />
            <h2 className="text-white">Blog Templates</h2>
          </div>
          
          <button 
            onClick={() => onNavigate('templates-history')}
            className="w-full flex items-center justify-between p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="bg-white/10 w-10 h-10 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <div className="text-left">
                <div className="text-white text-sm">Manage Templates</div>
                <div className="text-white/60 text-xs">{templateCount} saved templates</div>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-white/40" />
          </button>
        </Card>

        {/* Save Tone/Style Memory */}
        <Card className="bg-white/5 border-white/10 p-5 rounded-2xl space-y-3">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-white" />
            <h2 className="text-white">Save Tone/Style Memory</h2>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl">
              <div>
                <div className="text-white text-sm">Remember my writing style</div>
                <div className="text-white/60 text-xs">AI learns from your edits</div>
              </div>
              <Switch
                defaultChecked
                className="data-[state=checked]:bg-white"
              />
            </div>
            <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl">
              <div>
                <div className="text-white text-sm">Auto-apply preferences</div>
                <div className="text-white/60 text-xs">Use saved settings by default</div>
              </div>
              <Switch
                defaultChecked
                className="data-[state=checked]:bg-white"
              />
            </div>
          </div>
        </Card>

        {/* App Theme */}
        <Card className="bg-white/5 border-white/10 p-5 rounded-2xl space-y-4">
          <div className="flex items-center gap-2">
            <Palette className="w-5 h-5 text-white" />
            <h2 className="text-white">App Theme</h2>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <ThemeOption
              theme="dark"
              label="Dark"
              icon={<Moon className="w-5 h-5" />}
              currentTheme={theme}
              onSelect={() => setTheme('dark')}
            />
            <ThemeOption
              theme="bright"
              label="Bright"
              icon={<Sun className="w-5 h-5" />}
              currentTheme={theme}
              onSelect={() => setTheme('bright')}
            />
            <ThemeOption
              theme="blue"
              label="Blue"
              icon={<Droplet className="w-5 h-5" />}
              currentTheme={theme}
              onSelect={() => setTheme('blue')}
            />
            <ThemeOption
              theme="pink"
              label="Baby Pink"
              icon={<Heart className="w-5 h-5" />}
              currentTheme={theme}
              onSelect={() => setTheme('pink')}
            />
            <ThemeOption
              theme="stars"
              label="Stars"
              icon={<Sparkles className="w-5 h-5" />}
              currentTheme={theme}
              onSelect={() => setTheme('stars')}
              className="col-span-2"
            />
          </div>
        </Card>

        {/* Tutorials */}
        <Card className="bg-white/5 border-white/10 p-5 rounded-2xl">
          <button className="w-full flex items-center justify-between p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-colors">
            <div className="flex items-center gap-3">
              <GraduationCap className="w-5 h-5 text-white" />
              <div className="text-left">
                <div className="text-white text-sm">Tutorials</div>
                <div className="text-white/60 text-xs">Learn how to use BlogMaster AI</div>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-white/40" />
          </button>
        </Card>

        {/* Account Actions */}
        <div className="space-y-3">
          <Button
            variant="outline"
            className="w-full bg-white/5 border-white/10 text-white hover:bg-white/10 h-12 rounded-xl"
          >
            Reset All Settings
          </Button>
          
          <Button
            onClick={onLogout}
            variant="outline"
            className="w-full bg-red-500/10 border-red-500/20 text-red-400 hover:bg-red-500/20 h-12 rounded-xl"
          >
            <LogOut className="w-5 h-5 mr-2" />
            Logout
          </Button>
        </div>

        {/* Version Info */}
        <div className="text-center text-white/40 text-xs pt-4">
          BlogMaster AI v1.0.0
        </div>
      </div>
    </div>
  );
}
