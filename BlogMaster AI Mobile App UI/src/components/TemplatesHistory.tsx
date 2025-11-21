import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { ArrowLeft, FileText, Clock, Trash2 } from 'lucide-react';

interface Template {
  id: string;
  name: string;
  tone: string;
  createdAt: string;
}

interface TemplatesHistoryProps {
  onBack: () => void;
}

export function TemplatesHistory({ onBack }: TemplatesHistoryProps) {
  const [templates, setTemplates] = useState<Template[]>([]);

  useEffect(() => {
    const savedTemplates = localStorage.getItem('blogTemplates');
    if (savedTemplates) {
      setTemplates(JSON.parse(savedTemplates));
    }
  }, []);

  const deleteTemplate = (id: string) => {
    const updated = templates.filter(t => t.id !== id);
    setTemplates(updated);
    localStorage.setItem('blogTemplates', JSON.stringify(updated));
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) return 'Today';
    if (diffInDays === 1) return 'Yesterday';
    if (diffInDays < 7) return `${diffInDays} days ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="min-h-screen bg-black text-white">
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
            <h1 className="text-white">Templates History</h1>
            <p className="text-white/60 text-sm">{templates.length} saved templates</p>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-4 pb-20">
        {templates.length === 0 ? (
          <Card className="bg-white/5 border-white/10 p-12 rounded-2xl text-center">
            <FileText className="w-16 h-16 text-white/40 mx-auto mb-4" />
            <h3 className="text-white mb-2">No templates yet</h3>
            <p className="text-white/60 text-sm">
              Your saved templates will appear here
            </p>
          </Card>
        ) : (
          templates.map((template) => (
            <Card
              key={template.id}
              className="bg-white/5 border-white/10 p-4 rounded-2xl"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3 flex-1">
                  <div className="bg-white/10 w-10 h-10 rounded-lg flex items-center justify-center mt-1">
                    <FileText className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-white font-medium mb-1 truncate">
                      {template.name}
                    </h3>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="text-white/60">
                        Tone: <span className="text-white font-medium">{template.tone}</span>
                      </span>
                      <span className="flex items-center gap-1 text-white/40">
                        <Clock className="w-3 h-3" />
                        {formatDate(template.createdAt)}
                      </span>
                    </div>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => deleteTemplate(template.id)}
                  className="rounded-full hover:bg-white/10 text-white/60 hover:text-red-400"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}

