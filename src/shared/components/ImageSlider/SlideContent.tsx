import React from 'react';
import { Star, CalendarMonth, People } from '@mui/icons-material';
import type { SlideContentProps } from './types';

const SlideContent: React.FC<SlideContentProps> = ({ image, onImageClick, index }) => {
  return (
    <div className="absolute inset-0 flex items-center z-10">
      <div className="container mx-auto px-8 max-w-7xl">
        <div className="max-w-2xl">
          {/* Category Badge */}
          {image.category && (
            <div className="inline-block bg-orange-600 text-white px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wide mb-4">
              {image.category}
            </div>
          )}
          
          {/* Title */}
          <h1 className="text-6xl font-black text-white mb-6 leading-tight">
            {image.title}
          </h1>
          
          {/* Description */}
          <p className="text-xl text-gray-200 mb-8 leading-relaxed max-w-xl">
            {image.description}
          </p>

          {/* Meta Information */}
          <div className="flex items-center gap-6 mb-8">
            {image.rating && (
              <div className="flex items-center gap-2">
                <Star sx={{ color: '#facc15', fontSize: 20 }} />
                <span className="text-white font-semibold">{image.rating}/5</span>
              </div>
            )}
            {image.releaseDate && (
              <div className="flex items-center gap-2">
                <CalendarMonth sx={{ color: '#60a5fa', fontSize: 20 }} />
                <span className="text-gray-300">{image.releaseDate}</span>
              </div>
            )}
            {image.players && (
              <div className="flex items-center gap-2">
                <People sx={{ color: '#4ade80', fontSize: 20 }} />
                <span className="text-gray-300">{image.players}</span>
              </div>
            )}
          </div>
          
          {/* CTA Button */}
          <button
            onClick={() => onImageClick(image, index)}
            className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-4 px-8 rounded-lg text-lg transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            Find out more
          </button>
        </div>
      </div>
    </div>
  );
};

export default SlideContent;