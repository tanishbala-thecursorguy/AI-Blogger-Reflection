import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { Separator } from './ui/separator';
import { Screen } from '../App';
import {
  ArrowLeft,
  User,
  Edit,
  FileText,
  BookOpen,
  GraduationCap,
  LogOut,
  ChevronRight,
} from 'lucide-react';

interface SettingsPageProps {
  onBack: () => void;
  onLogout: () => void;
  onNavigate: (screen: Screen) => void;
}

export function SettingsPage({ onBack, onLogout, onNavigate }: SettingsPageProps) {
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
            className="rounded-full hover:bg-black"
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
        <Card className="bg-black border-white/10 p-5 rounded-2xl space-y-4">
          <div className="flex items-center gap-2">
            <User className="w-5 h-5 text-white" />
            <h2 className="text-white">Profile</h2>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-black flex items-center justify-center text-white text-xl">
              {name.split(' ').map(n => n[0]).join('')}
            </div>
            <div className="flex-1">
              <h3 className="text-white">{name}</h3>
              <p className="text-white/60 text-sm">{email}</p>
            </div>
            <Button
              size="icon"
              variant="ghost"
              className="rounded-full hover:bg-black"
            >
              <Edit className="w-5 h-5 text-white" />
            </Button>
          </div>

          <Separator className="bg-black" />

          <div className="space-y-3">
            <div>
              <Label className="text-white text-sm mb-2">Full Name</Label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-black border-white/10 text-white h-11 rounded-xl"
              />
            </div>
            <div>
              <Label className="text-white text-sm mb-2">Email</Label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-black border-white/10 text-white h-11 rounded-xl"
              />
            </div>
          </div>
        </Card>

        {/* Writing Preferences */}
        <Card className="bg-black border-white/10 p-5 rounded-2xl space-y-4">
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
                      : 'bg-black text-white border-white/10 hover:bg-black'
                  }`}
                >
                  {tone}
                </button>
              ))}
            </div>
          </div>
        </Card>

        {/* Blog Templates */}
        <Card className="bg-black border-white/10 p-5 rounded-2xl space-y-3">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-white" />
            <h2 className="text-white">Blog Templates</h2>
          </div>
          
          <button 
            onClick={() => onNavigate('templates-history')}
            className="w-full flex items-center justify-between p-3 bg-black rounded-xl hover:bg-black transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="bg-black w-10 h-10 rounded-lg flex items-center justify-center">
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
        <Card className="bg-black border-white/10 p-5 rounded-2xl space-y-3">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-white" />
            <h2 className="text-white">Save Tone/Style Memory</h2>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-black rounded-xl">
              <div>
                <div className="text-white text-sm">Remember my writing style</div>
                <div className="text-white/60 text-xs">AI learns from your edits</div>
              </div>
              <Switch
                defaultChecked
                className="data-[state=checked]:bg-white"
              />
            </div>
            <div className="flex items-center justify-between p-3 bg-black rounded-xl">
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

        {/* Tutorials */}
        <Card className="bg-black border-white/10 p-5 rounded-2xl">
          <button className="w-full flex items-center justify-between p-3 bg-black rounded-xl hover:bg-black transition-colors">
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
            className="w-full bg-black border-white/10 text-white hover:bg-black h-12 rounded-xl"
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
