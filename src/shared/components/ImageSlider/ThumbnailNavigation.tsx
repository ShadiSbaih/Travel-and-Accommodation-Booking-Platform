import React from 'react';
import type { ThumbnailNavigationProps } from './types';

const ThumbnailNavigation: React.FC<ThumbnailNavigationProps> = ({
  images,
  currentSlide,
  onSlideSelect,
  progress,
  isAutoplayEnabled,
  isPlaying
}) => {
  return (
    <div className="bg-white py-8">
      <div className="container mx-auto px-8 max-w-7xl">
        <div className="flex justify-center items-end gap-4 overflow-x-auto py-4">
          {images.map((image, index) => (
            <button
              key={image.id}
              onClick={() => onSlideSelect(index)}
              className={`relative flex-shrink-0 rounded-2xl overflow-hidden transition-all duration-500 ease-out ${
                currentSlide === index
                  ? 'transform scale-115 shadow-2xl shadow-black/10'
                  : 'transform scale-100 hover:scale-105'
              }`}
              style={{
                width: currentSlide === index ? '140px' : '100px',
                height: currentSlide === index ? '100px' : '70px',
              }}
              aria-label={`Go to slide ${index + 1}: ${image.alt}`}
            >
              {/* Thumbnail Image */}
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover"
              />
              
              {/* Shadow Overlay for inactive thumbnails */}
              <div className={`absolute inset-0 transition-all duration-500 ${
                currentSlide === index 
                  ? 'bg-transparent' 
                  : 'bg-black/40 hover:bg-black/20'
              }`} />
              
              {/* Active border indicator */}
              {currentSlide === index && (
                <div className="absolute inset-0 border-4 border-blue-500 rounded-2xl" />
              )}

              {/* Progress indicator for active thumbnail */}
              {currentSlide === index && isAutoplayEnabled && isPlaying && (
                <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gray-300 rounded-b-2xl overflow-hidden">
                  <div
                    className="bg-blue-500 h-full transition-all duration-100"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ThumbnailNavigation;