import { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { Separator } from './ui/separator';
import {
  ArrowLeft,
  User,
  Edit,
  Palette,
  FileText,
  BookOpen,
  Moon,
  Sun,
  HelpCircle,
  LogOut,
  ChevronRight,
} from 'lucide-react';

interface SettingsPageProps {
  onBack: () => void;
  onLogout: () => void;
}

export function SettingsPage({ onBack, onLogout }: SettingsPageProps) {
  const [darkMode, setDarkMode] = useState(true);
  const [name, setName] = useState('Sarah Johnson');
  const [email, setEmail] = useState('sarah@example.com');
  const [defaultTone, setDefaultTone] = useState('Professional');

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
          
          <button className="w-full flex items-center justify-between p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-colors">
            <div className="flex items-center gap-3">
              <div className="bg-white/10 w-10 h-10 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <div className="text-left">
                <div className="text-white text-sm">Manage Templates</div>
                <div className="text-white/60 text-xs">5 saved templates</div>
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

        {/* Appearance */}
        <Card className="bg-white/5 border-white/10 p-5 rounded-2xl space-y-3">
          <div className="flex items-center gap-2">
            <Palette className="w-5 h-5 text-white" />
            <h2 className="text-white">Appearance</h2>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl">
            <div className="flex items-center gap-3">
              {darkMode ? (
                <Moon className="w-5 h-5 text-white" />
              ) : (
                <Sun className="w-5 h-5 text-white" />
              )}
              <div>
                <div className="text-white text-sm">Dark Mode</div>
                <div className="text-white/60 text-xs">Pure black & white theme</div>
              </div>
            </div>
            <Switch
              checked={darkMode}
              onCheckedChange={setDarkMode}
              className="data-[state=checked]:bg-white"
            />
          </div>
        </Card>

        {/* Support */}
        <Card className="bg-white/5 border-white/10 p-5 rounded-2xl">
          <button className="w-full flex items-center justify-between p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-colors">
            <div className="flex items-center gap-3">
              <HelpCircle className="w-5 h-5 text-white" />
              <div className="text-left">
                <div className="text-white text-sm">Help & Support</div>
                <div className="text-white/60 text-xs">FAQs and contact</div>
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
