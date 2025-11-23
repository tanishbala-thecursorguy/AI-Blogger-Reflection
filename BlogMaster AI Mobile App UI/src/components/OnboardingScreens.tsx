import { useState } from 'react';
import { Button } from './ui/button';
import { ChevronRight, Sparkles, Target, LineChart, FileText } from 'lucide-react';

interface OnboardingScreensProps {
  onComplete: () => void;
}

const screens = [
  {
    title: 'Welcome to BlogMaster AI',
    subtitle: 'Your personal AI built for blogging.',
    description: 'Create professional, SEO-optimized content in seconds with the power of artificial intelligence.',
    icon: Sparkles,
  },
  {
    title: 'Write SEO Blogs Instantly',
    subtitle: 'Generate high-ranking content effortlessly.',
    description: 'Our AI analyzes top-performing articles and creates optimized content that ranks on Google.',
    icon: Target,
  },
  {
    title: 'Keyword & Competitor Analysis',
    subtitle: 'Stay ahead of the competition.',
    description: 'Get real-time keyword insights, competitor analysis, and content gap identification.',
    icon: LineChart,
  },
  {
    title: 'Create Blogs, Newsletters & Social Posts',
    subtitle: 'One tool for all your content needs.',
    description: 'Transform your blogs into newsletters, tweets, LinkedIn posts, and more with a single click.',
    icon: FileText,
  },
];

export function OnboardingScreens({ onComplete }: OnboardingScreensProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (currentIndex < screens.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      onComplete();
    }
  };

  const handleSkip = () => {
    onComplete();
  };

  const currentScreen = screens[currentIndex];
  const Icon = currentScreen.icon;

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-between p-6 relative">
      {/* Skip Button */}
      {currentIndex < screens.length - 1 && (
        <button
          onClick={handleSkip}
          className="absolute top-6 right-6 text-white/60 hover:text-white transition-colors"
        >
          Skip
        </button>
      )}

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center max-w-sm w-full">
        {/* Icon/Illustration */}
        <div className="mb-12 relative">
          <div className="w-32 h-32 rounded-full bg-black flex items-center justify-center border border-white/10">
            <Icon className="w-16 h-16 text-white" strokeWidth={1.5} />
          </div>
          {/* Decorative circles */}
          <div className="absolute -top-4 -right-4 w-12 h-12 rounded-full bg-black border border-white/10" />
          <div className="absolute -bottom-4 -left-4 w-16 h-16 rounded-full bg-black border border-white/10" />
        </div>

        {/* Text Content */}
        <div className="text-center space-y-4">
          <h1 className="text-white">{currentScreen.title}</h1>
          <p className="text-white/80">{currentScreen.subtitle}</p>
          <p className="text-white/60 text-sm px-4">{currentScreen.description}</p>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="w-full max-w-sm space-y-6">
        {/* Pagination Dots */}
        <div className="flex justify-center gap-2">
          {screens.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-1.5 rounded-full transition-all ${
                index === currentIndex
                  ? 'w-8 bg-white'
                  : 'w-1.5 bg-black hover:bg-white/40'
              }`}
            />
          ))}
        </div>

        {/* Action Button */}
        <Button
          onClick={handleNext}
          className="w-full bg-white text-black hover:bg-white/90 h-12 rounded-full"
        >
          {currentIndex === screens.length - 1 ? 'Get Started' : 'Continue'}
          <ChevronRight className="w-5 h-5 ml-2" />
        </Button>
      </div>
    </div>
  );
}
