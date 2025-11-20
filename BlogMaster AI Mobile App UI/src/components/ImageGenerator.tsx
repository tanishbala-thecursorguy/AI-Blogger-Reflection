import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card } from './ui/card';
import { Textarea } from './ui/textarea';
import {
  ArrowLeft,
  Sparkles,
  Download,
  RefreshCw,
  Image as ImageIcon,
} from 'lucide-react';

interface ImageGeneratorProps {
  onBack: () => void;
}

export function ImageGenerator({ onBack }: ImageGeneratorProps) {
  const [prompt, setPrompt] = useState('');
  const [selectedStyle, setSelectedStyle] = useState('minimal');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState('');
  const [altText, setAltText] = useState('');
  const [caption, setCaption] = useState('');
  const [filename, setFilename] = useState('');

  const styles = [
    { id: 'minimal', label: 'Minimal', description: 'Clean, simple design' },
    { id: 'stock-photo', label: 'Stock Photo', description: 'Realistic photography' },
    { id: 'illustration', label: 'Illustration', description: 'Artistic drawings' },
    { id: 'abstract', label: 'Abstract', description: 'Modern geometric shapes' },
  ];

  const handleGenerate = async () => {
    setIsGenerating(true);
    
    // Simulate generation
    setTimeout(() => {
      setGeneratedImage('https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80');
      setAltText('AI-powered content marketing strategy visualization');
      setCaption('Modern AI tools transforming content marketing workflows');
      setFilename('ai-content-marketing-featured-image.jpg');
      setIsGenerating(false);
    }, 2000);
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
            <h1 className="text-white">Image Generator</h1>
            <p className="text-white/60 text-sm">Create AI-generated images</p>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6 pb-20">
        {/* Prompt Input */}
        <Card className="bg-white/5 border-white/10 p-5 rounded-2xl space-y-3">
          <Label className="text-white">Image Prompt</Label>
          <Textarea
            placeholder="E.g., A futuristic AI robot writing on a laptop, minimalist black and white design"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="bg-white/10 border-white/10 text-white placeholder:text-white/40 min-h-[100px] rounded-xl resize-none"
          />
          <p className="text-white/60 text-xs">
            Describe the image you want to generate for your blog post
          </p>
        </Card>

        {/* Style Selection */}
        <Card className="bg-white/5 border-white/10 p-5 rounded-2xl space-y-3">
          <Label className="text-white">Image Style</Label>
          <div className="grid grid-cols-2 gap-3">
            {styles.map((style) => (
              <button
                key={style.id}
                onClick={() => setSelectedStyle(style.id)}
                className={`p-4 rounded-xl border text-left transition-all ${
                  selectedStyle === style.id
                    ? 'bg-white text-black border-white'
                    : 'bg-white/5 text-white border-white/10 hover:bg-white/10'
                }`}
              >
                <div className={selectedStyle === style.id ? 'text-black' : 'text-white'}>
                  {style.label}
                </div>
                <div className={`text-xs mt-1 ${selectedStyle === style.id ? 'text-black/60' : 'text-white/60'}`}>
                  {style.description}
                </div>
              </button>
            ))}
          </div>
        </Card>

        {/* Generate Button */}
        <Button
          onClick={handleGenerate}
          disabled={!prompt || isGenerating}
          className="w-full bg-white text-black hover:bg-white/90 h-12 rounded-xl disabled:opacity-50"
        >
          {isGenerating ? (
            <>
              <Sparkles className="w-5 h-5 mr-2 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5 mr-2" />
              Generate Featured Image
            </>
          )}
        </Button>

        {/* Generated Image Output */}
        {generatedImage && (
          <>
            <Card className="bg-white/5 border-white/10 p-5 rounded-2xl space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-white">Generated Image</Label>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={handleGenerate}
                    className="text-white hover:bg-white/10 rounded-lg"
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Regenerate
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-white hover:bg-white/10 rounded-lg"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                </div>
              </div>
              
              <div className="aspect-video rounded-xl overflow-hidden bg-white/10">
                <img
                  src={generatedImage}
                  alt={altText}
                  className="w-full h-full object-cover"
                />
              </div>
            </Card>

            {/* Auto ALT Text */}
            <Card className="bg-white/5 border-white/10 p-5 rounded-2xl space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-white">Auto ALT Text</Label>
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-white/60 hover:text-white hover:bg-white/10 rounded-lg text-xs"
                >
                  Edit
                </Button>
              </div>
              <Input
                value={altText}
                onChange={(e) => setAltText(e.target.value)}
                className="bg-white/10 border-white/10 text-white placeholder:text-white/40 h-10 rounded-xl"
              />
              <p className="text-white/60 text-xs">
                Optimized for accessibility and SEO
              </p>
            </Card>

            {/* Auto Caption */}
            <Card className="bg-white/5 border-white/10 p-5 rounded-2xl space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-white">Auto Caption</Label>
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-white/60 hover:text-white hover:bg-white/10 rounded-lg text-xs"
                >
                  Edit
                </Button>
              </div>
              <Input
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                className="bg-white/10 border-white/10 text-white placeholder:text-white/40 h-10 rounded-xl"
              />
            </Card>

            {/* Auto SEO Filename */}
            <Card className="bg-white/5 border-white/10 p-5 rounded-2xl space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-white">Auto SEO Filename</Label>
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-white/60 hover:text-white hover:bg-white/10 rounded-lg text-xs"
                >
                  Edit
                </Button>
              </div>
              <Input
                value={filename}
                onChange={(e) => setFilename(e.target.value)}
                className="bg-white/10 border-white/10 text-white placeholder:text-white/40 h-10 rounded-xl"
              />
              <p className="text-white/60 text-xs">
                SEO-friendly filename with keywords
              </p>
            </Card>

            {/* Save Button */}
            <Button className="w-full bg-white text-black hover:bg-white/90 h-12 rounded-xl">
              Add to Blog Post
            </Button>
          </>
        )}

        {/* Empty State */}
        {!generatedImage && !isGenerating && (
          <Card className="bg-white/5 border-white/10 p-12 rounded-2xl text-center">
            <ImageIcon className="w-12 h-12 text-white/20 mx-auto mb-4" />
            <p className="text-white/60">
              Describe the image you want to create and we'll generate it with AI
            </p>
          </Card>
        )}
      </div>
    </div>
  );
}
