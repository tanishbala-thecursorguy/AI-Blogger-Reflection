import { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Textarea } from './ui/textarea';
import { Switch } from './ui/switch';
import { Label } from './ui/label';
import {
  ArrowLeft,
  Heart,
  GraduationCap,
  Briefcase,
  Lightbulb,
  BarChart,
  BookOpen,
  Sparkles,
  CheckCircle,
} from 'lucide-react';

interface AIEditorProps {
  onBack: () => void;
}

const editorModes = [
  {
    icon: Heart,
    label: 'Make Emotional',
    description: 'Add emotional appeal and storytelling',
  },
  {
    icon: GraduationCap,
    label: 'Make Beginner-Friendly',
    description: 'Simplify language and add explanations',
  },
  {
    icon: Briefcase,
    label: 'Make More Professional',
    description: 'Enhance formal tone and credibility',
  },
  {
    icon: Lightbulb,
    label: 'Add Examples',
    description: 'Include practical examples and scenarios',
  },
  {
    icon: BarChart,
    label: 'Add Case Studies',
    description: 'Insert relevant case studies and data',
  },
  {
    icon: BarChart,
    label: 'Add Statistics',
    description: 'Include supporting statistics and research',
  },
  {
    icon: BookOpen,
    label: 'Add Storytelling Tone',
    description: 'Transform into engaging narrative',
  },
  {
    icon: CheckCircle,
    label: 'Grammar Fix Mode',
    description: 'Correct grammar and spelling errors',
  },
  {
    icon: Sparkles,
    label: 'Anti-Plagiarism Rewrite',
    description: 'Rewrite to ensure uniqueness',
  },
];

export function AIEditor({ onBack }: AIEditorProps) {
  const [content, setContent] = useState(
    'Artificial intelligence is transforming the way businesses approach content marketing. AI tools can help create, optimize, and distribute content more efficiently than ever before.\n\nBy leveraging machine learning algorithms, marketers can analyze vast amounts of data to understand what content resonates with their audience. This enables them to create more targeted and effective campaigns.'
  );
  const [selectedModes, setSelectedModes] = useState<string[]>([]);

  const toggleMode = (mode: string) => {
    if (selectedModes.includes(mode)) {
      setSelectedModes(selectedModes.filter(m => m !== mode));
    } else {
      setSelectedModes([...selectedModes, mode]);
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
            <h1 className="text-white">AI Editor Mode</h1>
            <p className="text-white/60 text-sm">Fine-tune your content with AI</p>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6 pb-20">
        {/* Content Editor */}
        <Card className="bg-white/5 border-white/10 p-5 rounded-2xl space-y-3">
          <Label className="text-white">Your Content</Label>
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="bg-white/10 border-white/10 text-white placeholder:text-white/40 min-h-[200px] rounded-xl resize-none"
            placeholder="Paste your content here..."
          />
          <div className="flex items-center justify-between text-white/60 text-sm">
            <span>{content.split(' ').length} words</span>
            <span>{content.length} characters</span>
          </div>
        </Card>

        {/* AI Editor Modes */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-white">Editor Modes</Label>
            {selectedModes.length > 0 && (
              <span className="text-white/60 text-sm">{selectedModes.length} selected</span>
            )}
          </div>

          <div className="space-y-2">
            {editorModes.map((mode) => {
              const Icon = mode.icon;
              const isSelected = selectedModes.includes(mode.label);
              
              return (
                <Card
                  key={mode.label}
                  className="bg-white/5 border-white/10 p-4 rounded-2xl"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-start gap-3 flex-1">
                      <div className="bg-white/10 w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-white" strokeWidth={1.5} />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-white text-sm mb-1">{mode.label}</h3>
                        <p className="text-white/60 text-xs">{mode.description}</p>
                      </div>
                    </div>
                    <Switch
                      checked={isSelected}
                      onCheckedChange={() => toggleMode(mode.label)}
                      className="data-[state=checked]:bg-white flex-shrink-0"
                    />
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Apply Changes */}
        {selectedModes.length > 0 && (
          <Button
            className="w-full bg-white text-black hover:bg-white/90 h-12 rounded-xl"
          >
            <Sparkles className="w-5 h-5 mr-2" />
            Apply {selectedModes.length} Enhancement{selectedModes.length > 1 ? 's' : ''}
          </Button>
        )}

        {/* Real-time Preview */}
        <Card className="bg-white border-white/10 p-5 rounded-2xl space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-black">Preview</Label>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <span className="text-black/60 text-sm">Live editing</span>
            </div>
          </div>
          <div className="prose prose-sm max-w-none">
            <p className="text-black/80 leading-relaxed">
              {content}
            </p>
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button
            variant="outline"
            className="flex-1 bg-white/5 border-white/10 text-white hover:bg-white/10 h-11 rounded-xl"
          >
            Reset
          </Button>
          <Button className="flex-1 bg-white text-black hover:bg-white/90 h-11 rounded-xl">
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
}
