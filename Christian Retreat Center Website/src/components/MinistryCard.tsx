import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { LucideIcon } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface MinistryCardProps {
  title: string;
  description: string;
  image: string;
  icon: LucideIcon;
  link: string;
}

export function MinistryCard({ title, description, image, icon: Icon, link }: MinistryCardProps) {
  return (
    <Link to={link}>
      <motion.div
        whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)' }}
        transition={{ duration: 0.3 }}
        className="group relative overflow-hidden rounded-2xl bg-white shadow-lg h-full"
      >
        <div className="relative h-56 overflow-hidden">
          <ImageWithFallback
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          
          <div className="absolute bottom-4 left-4 w-14 h-14 rounded-full bg-[#D4A937] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
            <Icon className="w-7 h-7 text-white" />
          </div>
        </div>

        <div className="p-6">
          <h3 className="mb-3 text-gray-900 group-hover:text-[#D4A937] transition-colors">
            {title}
          </h3>
          <p className="text-gray-600 line-clamp-3">
            {description}
          </p>
        </div>

        <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-[#D4A937]/0 to-[#D4A937]/20 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity" />
      </motion.div>
    </Link>
  );
}
