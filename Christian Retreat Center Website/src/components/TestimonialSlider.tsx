import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Quote } from 'lucide-react';

interface Testimony {
  name: string;
  location: string;
  text: string;
  retreat?: string;
}

interface TestimonialSliderProps {
  testimonials: Testimony[];
  autoPlayInterval?: number;
}

export function TestimonialSlider({ testimonials, autoPlayInterval = 6000 }: TestimonialSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, autoPlayInterval);

    return () => clearInterval(timer);
  }, [testimonials.length, autoPlayInterval]);

  return (
    <div className="relative max-w-4xl mx-auto">
      <div className="relative min-h-[300px] flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="text-center px-6 py-8"
          >
            <Quote className="w-12 h-12 text-[#D4A937] mx-auto mb-6 opacity-50" />
            
            <p className="text-lg md:text-xl text-gray-700 italic mb-6 leading-relaxed">
              "{testimonials[currentIndex].text}"
            </p>

            <div className="space-y-1">
              <p className="text-gray-900">
                {testimonials[currentIndex].name}
              </p>
              <p className="text-sm text-gray-500">
                {testimonials[currentIndex].location}
              </p>
              {testimonials[currentIndex].retreat && (
                <p className="text-xs text-[#D4A937]">
                  {testimonials[currentIndex].retreat}
                </p>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Indicators */}
      <div className="flex justify-center gap-2 mt-6">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentIndex
                ? 'bg-[#D4A937] w-8'
                : 'bg-gray-300 hover:bg-gray-400'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
