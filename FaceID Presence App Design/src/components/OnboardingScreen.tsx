import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Scan, MapPin, BarChart3, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';

interface OnboardingSlide {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const slides: OnboardingSlide[] = [
  {
    icon: <Scan className="w-20 h-20" />,
    title: 'AI Face Recognition for Seamless Check-In',
    description: 'Simply look at your device and let AI do the rest. Fast, secure, and contactless attendance marking.',
  },
  {
    icon: <MapPin className="w-20 h-20" />,
    title: 'GPS Verification to Stop Proxy Attendance',
    description: 'Location-based verification ensures students are physically present in the classroom.',
  },
  {
    icon: <BarChart3 className="w-20 h-20" />,
    title: 'Smart Analytics for Teachers & Admins',
    description: 'Real-time insights, detailed reports, and performance tracking at your fingertips.',
  },
];

interface OnboardingScreenProps {
  onGetStarted: () => void;
}

export default function OnboardingScreen({ onGetStarted }: OnboardingScreenProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      onGetStarted();
    }
  };

  const handleSkip = () => {
    onGetStarted();
  };

  return (
    <div className="h-full bg-gradient-to-br from-[#0F172A] to-[#1e293b] flex flex-col relative">
      {/* Skip button */}
      <div className="absolute top-6 right-6 z-10">
        <button
          onClick={handleSkip}
          className="text-[#94a3b8] hover:text-white transition-colors"
        >
          Skip
        </button>
      </div>

      {/* Slides */}
      <div className="flex-1 flex items-center justify-center px-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="text-center"
          >
            {/* Icon */}
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="flex justify-center mb-8"
            >
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[#06B6D4] to-[#0891b2] flex items-center justify-center text-white shadow-lg shadow-[#06B6D4]/30">
                {slides[currentSlide].icon}
              </div>
            </motion.div>

            {/* Title */}
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-white mb-4 px-4"
            >
              {slides[currentSlide].title}
            </motion.h2>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-[#94a3b8] px-4"
            >
              {slides[currentSlide].description}
            </motion.p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Pagination dots */}
      <div className="flex justify-center gap-2 mb-8">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-2 rounded-full transition-all ${
              index === currentSlide
                ? 'w-8 bg-[#06B6D4]'
                : 'w-2 bg-[#334155]'
            }`}
          />
        ))}
      </div>

      {/* Next/Get Started button */}
      <div className="px-6 pb-8">
        <Button
          onClick={handleNext}
          className="w-full bg-gradient-to-r from-[#06B6D4] to-[#0891b2] hover:from-[#0891b2] hover:to-[#06B6D4] text-white shadow-lg shadow-[#06B6D4]/30 h-14 rounded-2xl"
        >
          {currentSlide === slides.length - 1 ? 'Get Started' : 'Next'}
          <ChevronRight className="ml-2 w-5 h-5" />
        </Button>
      </div>
    </div>
  );
}
