import React from 'react';
import { motion } from 'motion/react';
import { Play } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface Video {
  id: string;
  title: string;
  thumbnail: string;
  duration?: string;
  category?: string;
}

interface VideoGridProps {
  videos: Video[];
  onVideoClick?: (video: Video) => void;
}

export function VideoGrid({ videos, onVideoClick }: VideoGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {videos.map((video) => (
        <motion.div
          key={video.id}
          whileHover={{ y: -4 }}
          className="group cursor-pointer"
          onClick={() => onVideoClick?.(video)}
        >
          <div className="relative rounded-xl overflow-hidden shadow-md mb-3 bg-gray-900">
            <ImageWithFallback
              src={video.thumbnail}
              alt={video.title}
              className="w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-300"
            />
            
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors flex items-center justify-center">
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="w-16 h-16 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg"
              >
                <Play className="w-7 h-7 text-[#D4A937] ml-1" fill="currentColor" />
              </motion.div>
            </div>

            {video.duration && (
              <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/80 rounded text-xs text-white">
                {video.duration}
              </div>
            )}

            {video.category && (
              <div className="absolute top-2 left-2 px-2 py-1 bg-[#D4A937] rounded text-xs text-white">
                {video.category}
              </div>
            )}
          </div>

          <h4 className="text-gray-900 group-hover:text-[#D4A937] transition-colors line-clamp-2">
            {video.title}
          </h4>
        </motion.div>
      ))}
    </div>
  );
}
