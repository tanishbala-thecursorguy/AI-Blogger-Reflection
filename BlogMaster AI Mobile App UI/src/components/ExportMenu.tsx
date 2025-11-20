import { Button } from './ui/button';
import { Card } from './ui/card';
import {
  ArrowLeft,
  FileText,
  Download,
  Mail,
  Twitter,
  Linkedin,
  Instagram,
  Video,
  Code,
  CheckCircle,
} from 'lucide-react';

interface ExportMenuProps {
  onBack: () => void;
}

const exportOptions = [
  {
    icon: FileText,
    title: 'Google Docs',
    description: 'Export as editable Google Doc',
    format: 'gdoc',
    color: 'bg-white/10',
  },
  {
    icon: FileText,
    title: 'Word Document',
    description: 'Download as .docx file',
    format: 'docx',
    color: 'bg-white/10',
  },
  {
    icon: Download,
    title: 'PDF',
    description: 'Export as PDF document',
    format: 'pdf',
    color: 'bg-white/10',
  },
  {
    icon: Code,
    title: 'HTML',
    description: 'Get clean HTML code',
    format: 'html',
    color: 'bg-white/10',
  },
  {
    icon: Mail,
    title: 'Newsletter',
    description: 'Convert to email newsletter',
    format: 'newsletter',
    color: 'bg-white/10',
  },
  {
    icon: Twitter,
    title: 'Tweet Thread',
    description: 'Transform into Twitter thread',
    format: 'twitter',
    color: 'bg-white/10',
  },
  {
    icon: Instagram,
    title: 'Instagram Carousel',
    description: 'Create Instagram carousel posts',
    format: 'instagram',
    color: 'bg-white/10',
  },
  {
    icon: Linkedin,
    title: 'LinkedIn Post',
    description: 'Optimize for LinkedIn',
    format: 'linkedin',
    color: 'bg-white/10',
  },
  {
    icon: Video,
    title: 'Video Script',
    description: 'Convert to video script format',
    format: 'video',
    color: 'bg-white/10',
  },
];

export function ExportMenu({ onBack }: ExportMenuProps) {
  const handleExport = (format: string) => {
    // Simulate export
    console.log(`Exporting as ${format}`);
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
            <h1 className="text-white">Export & Share</h1>
            <p className="text-white/60 text-sm">Export your content in multiple formats</p>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6 pb-20">
        {/* Blog Preview Card */}
        <Card className="bg-white/5 border-white/10 p-5 rounded-2xl">
          <div className="flex items-start gap-3">
            <div className="bg-white/10 w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h2 className="text-white mb-1">
                How to Use AI for Content Marketing: The Complete 2025 Guide
              </h2>
              <div className="flex items-center gap-3 text-white/60 text-sm">
                <span>2,450 words</span>
                <span>•</span>
                <span>Nov 18, 2025</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Document Formats */}
        <div className="space-y-3">
          <h2 className="text-white">Document Formats</h2>
          <div className="grid grid-cols-2 gap-3">
            {exportOptions.slice(0, 4).map((option) => {
              const Icon = option.icon;
              return (
                <Card
                  key={option.format}
                  onClick={() => handleExport(option.format)}
                  className="bg-white/5 border-white/10 p-5 rounded-2xl hover:bg-white/10 transition-colors cursor-pointer"
                >
                  <div className={`${option.color} w-12 h-12 rounded-xl flex items-center justify-center mb-3`}>
                    <Icon className="w-6 h-6 text-white" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-white text-sm mb-1">{option.title}</h3>
                  <p className="text-white/60 text-xs">{option.description}</p>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Social Media Formats */}
        <div className="space-y-3">
          <h2 className="text-white">Social Media</h2>
          <div className="space-y-3">
            {exportOptions.slice(4, 8).map((option) => {
              const Icon = option.icon;
              return (
                <Card
                  key={option.format}
                  onClick={() => handleExport(option.format)}
                  className="bg-white/5 border-white/10 p-4 rounded-2xl hover:bg-white/10 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-4">
                    <div className={`${option.color} w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0`}>
                      <Icon className="w-6 h-6 text-white" strokeWidth={1.5} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white text-sm mb-0.5">{option.title}</h3>
                      <p className="text-white/60 text-xs">{option.description}</p>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-white hover:bg-white/10 rounded-lg"
                    >
                      Export
                    </Button>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Video Format */}
        <div className="space-y-3">
          <h2 className="text-white">Video Content</h2>
          {exportOptions.slice(8).map((option) => {
            const Icon = option.icon;
            return (
              <Card
                key={option.format}
                onClick={() => handleExport(option.format)}
                className="bg-white/5 border-white/10 p-4 rounded-2xl hover:bg-white/10 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div className={`${option.color} w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0`}>
                    <Icon className="w-6 h-6 text-white" strokeWidth={1.5} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white text-sm mb-0.5">{option.title}</h3>
                    <p className="text-white/60 text-xs">{option.description}</p>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-white hover:bg-white/10 rounded-lg"
                  >
                    Convert
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Bulk Export */}
        <Card className="bg-white/5 border-white/10 p-5 rounded-2xl">
          <h3 className="text-white mb-3">Bulk Export</h3>
          <p className="text-white/60 text-sm mb-4">
            Export this blog in all formats at once for maximum reach
          </p>
          <Button className="w-full bg-white text-black hover:bg-white/90 h-11 rounded-xl">
            <Download className="w-5 h-5 mr-2" />
            Export All Formats
          </Button>
        </Card>
      </div>
    </div>
  );
}
