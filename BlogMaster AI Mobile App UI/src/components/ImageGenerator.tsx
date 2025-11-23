import React, { useState } from 'react';
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
  Loader2,
  Copy,
} from 'lucide-react';
import { generateImage } from '../utils/openai';

interface ImageGeneratorProps {
  onBack: () => void;
}

export function ImageGenerator({ onBack }: ImageGeneratorProps) {
  const [prompt, setPrompt] = useState('');
  const [selectedStyle, setSelectedStyle] = useState('photographic');
  const [selectedSize, setSelectedSize] = useState<'1024x1024' | '1792x1024' | '1024x1792'>('1024x1024');
  const [selectedQuality, setSelectedQuality] = useState<'standard' | 'hd'>('hd'); // Default to HD for better quality
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState('');
  const [revisedPrompt, setRevisedPrompt] = useState('');
  const [altText, setAltText] = useState('');
  const [caption, setCaption] = useState('');
  const [filename, setFilename] = useState('');
  const [error, setError] = useState<string | null>(null);

  const styles = [
    { id: 'photographic', label: 'Photographic', description: 'Ultra-realistic photos' },
    { id: 'stock-photo', label: 'Stock Photo', description: 'Professional stock photos' },
    { id: 'minimal', label: 'Minimal', description: 'Clean realistic photos' },
    { id: 'illustration', label: 'Illustration', description: 'Artistic drawings' },
    { id: 'abstract', label: 'Abstract', description: 'Modern geometric shapes' },
  ];

  const sizes = [
    { id: '1024x1024' as const, label: 'Square (1024×1024)', description: 'Perfect for social media' },
    { id: '1792x1024' as const, label: 'Landscape (1792×1024)', description: 'Wide format, great for headers' },
    { id: '1024x1792' as const, label: 'Portrait (1024×1792)', description: 'Tall format, mobile-friendly' },
  ];

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setError('Please enter an image prompt');
      return;
    }

    setIsGenerating(true);
    setError(null);
    setGeneratedImage('');
    setRevisedPrompt('');
    setAltText('');
    setCaption('');
    setFilename('');

    try {
      const result = await generateImage(prompt.trim(), {
        style: selectedStyle,
        size: selectedSize,
        quality: selectedQuality,
      });

      setGeneratedImage(result.url);
      if (result.revisedPrompt) {
        setRevisedPrompt(result.revisedPrompt);
        // Auto-generate alt text and caption from revised prompt
        setAltText(result.revisedPrompt.substring(0, 125));
        setCaption(result.revisedPrompt.substring(0, 100));
        // Generate SEO-friendly filename
        const filenameBase = prompt
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-+|-+$/g, '')
          .substring(0, 50);
        setFilename(`${filenameBase}.jpg`);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to generate image. Please try again.');
      console.error('Error generating image:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = async () => {
    if (!generatedImage) return;

    try {
      const response = await fetch(generatedImage);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename || 'generated-image.png';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Error downloading image:', err);
      setError('Failed to download image');
    }
  };

  const handleCopyImage = async () => {
    if (!generatedImage) return;

    try {
      const response = await fetch(generatedImage);
      const blob = await response.blob();
      await navigator.clipboard.write([
        new ClipboardItem({ [blob.type]: blob })
      ]);
    } catch (err) {
      console.error('Error copying image:', err);
      // Fallback: copy URL
      navigator.clipboard.writeText(generatedImage);
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
            className="rounded-full hover:bg-black"
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
        <Card className="bg-black border-white/10 p-5 rounded-2xl space-y-3">
          <Label className="text-white">Image Prompt</Label>
          <Textarea
            placeholder="E.g., A futuristic AI robot writing on a laptop, minimalist black and white design"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="bg-black border-white/10 text-white placeholder:text-white/40 min-h-[100px] rounded-xl resize-none"
          />
          <p className="text-white/60 text-xs">
            Describe the image you want to generate for your blog post
          </p>
        </Card>

        {/* Style Selection */}
        <Card className="bg-black border-white/10 p-5 rounded-2xl space-y-3">
          <Label className="text-white">Image Style</Label>
          <div className="grid grid-cols-2 gap-3">
            {styles.map((style) => (
              <button
                key={style.id}
                onClick={() => setSelectedStyle(style.id)}
                disabled={isGenerating}
                className={`p-4 rounded-xl border text-left transition-all ${
                  selectedStyle === style.id
                    ? 'bg-white text-black border-white'
                    : 'bg-black text-white border-white/10 hover:bg-black'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
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

        {/* Size Selection */}
        <Card className="bg-black border-white/10 p-5 rounded-2xl space-y-3">
          <Label className="text-white">Image Size</Label>
          <div className="grid grid-cols-1 gap-3">
            {sizes.map((size) => (
              <button
                key={size.id}
                onClick={() => setSelectedSize(size.id)}
                disabled={isGenerating}
                className={`p-4 rounded-xl border text-left transition-all ${
                  selectedSize === size.id
                    ? 'bg-white text-black border-white'
                    : 'bg-black text-white border-white/10 hover:bg-black'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                <div className={selectedSize === size.id ? 'text-black font-medium' : 'text-white font-medium'}>
                  {size.label}
                </div>
                <div className={`text-xs mt-1 ${selectedSize === size.id ? 'text-black/60' : 'text-white/60'}`}>
                  {size.description}
                </div>
              </button>
            ))}
          </div>
        </Card>

        {/* Quality Selection */}
        <Card className="bg-black border-white/10 p-5 rounded-2xl space-y-3">
          <Label className="text-white">Image Quality</Label>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setSelectedQuality('standard')}
              disabled={isGenerating}
              className={`p-4 rounded-xl border text-left transition-all ${
                selectedQuality === 'standard'
                  ? 'bg-white text-black border-white'
                  : 'bg-black text-white border-white/10 hover:bg-black'
              } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              <div className={selectedQuality === 'standard' ? 'text-black font-medium' : 'text-white font-medium'}>
                Standard
              </div>
              <div className={`text-xs mt-1 ${selectedQuality === 'standard' ? 'text-black/60' : 'text-white/60'}`}>
                Faster generation
              </div>
            </button>
            <button
              onClick={() => setSelectedQuality('hd')}
              disabled={isGenerating}
              className={`p-4 rounded-xl border text-left transition-all ${
                selectedQuality === 'hd'
                  ? 'bg-white text-black border-white'
                  : 'bg-black text-white border-white/10 hover:bg-black'
              } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              <div className={selectedQuality === 'hd' ? 'text-black font-medium' : 'text-white font-medium'}>
                HD
              </div>
              <div className={`text-xs mt-1 ${selectedQuality === 'hd' ? 'text-black/60' : 'text-white/60'}`}>
                Higher quality
              </div>
            </button>
          </div>
        </Card>

        {error && (
          <Card className="bg-red-500/10 border-red-500/20 p-4 rounded-xl">
            <p className="text-red-400 text-sm">{error}</p>
          </Card>
        )}

        {/* Generate Button */}
        <Button
          onClick={handleGenerate}
          disabled={!prompt.trim() || isGenerating}
          className="w-full bg-white text-black hover:bg-white/90 h-12 rounded-xl disabled:opacity-50"
        >
          {isGenerating ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Generating Image...
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
            <Card className="bg-black border-white/10 p-5 rounded-2xl space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-white">Generated Image</Label>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={handleCopyImage}
                    className="text-white hover:bg-black rounded-lg"
                    title="Copy image"
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={handleGenerate}
                    disabled={isGenerating}
                    className="text-white hover:bg-black rounded-lg"
                  >
                    <RefreshCw className={`w-4 h-4 mr-2 ${isGenerating ? 'animate-spin' : ''}`} />
                    Regenerate
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={handleDownload}
                    className="text-white hover:bg-black rounded-lg"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                </div>
              </div>

              {revisedPrompt && (
                <div className="bg-black rounded-lg p-3">
                  <p className="text-white/60 text-xs mb-1">Revised Prompt:</p>
                  <p className="text-white/80 text-sm">{revisedPrompt}</p>
                </div>
              )}
              
              <div className="aspect-video rounded-xl overflow-hidden bg-black">
                <img
                  src={generatedImage}
                  alt={altText}
                  className="w-full h-full object-cover"
                />
              </div>
            </Card>

            {/* Auto ALT Text */}
            <Card className="bg-black border-white/10 p-5 rounded-2xl space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-white">Auto ALT Text</Label>
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-white/60 hover:text-white hover:bg-black rounded-lg text-xs"
                >
                  Edit
                </Button>
              </div>
              <Input
                value={altText}
                onChange={(e) => setAltText(e.target.value)}
                className="bg-black border-white/10 text-white placeholder:text-white/40 h-10 rounded-xl"
              />
              <p className="text-white/60 text-xs">
                Optimized for accessibility and SEO
              </p>
            </Card>

            {/* Auto Caption */}
            <Card className="bg-black border-white/10 p-5 rounded-2xl space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-white">Auto Caption</Label>
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-white/60 hover:text-white hover:bg-black rounded-lg text-xs"
                >
                  Edit
                </Button>
              </div>
              <Input
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                className="bg-black border-white/10 text-white placeholder:text-white/40 h-10 rounded-xl"
              />
            </Card>

            {/* Auto SEO Filename */}
            <Card className="bg-black border-white/10 p-5 rounded-2xl space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-white">Auto SEO Filename</Label>
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-white/60 hover:text-white hover:bg-black rounded-lg text-xs"
                >
                  Edit
                </Button>
              </div>
              <Input
                value={filename}
                onChange={(e) => setFilename(e.target.value)}
                className="bg-black border-white/10 text-white placeholder:text-white/40 h-10 rounded-xl"
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
          <Card className="bg-black border-white/10 p-12 rounded-2xl text-center">
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
