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
    <div className="bg-white py-4 md:py-8">
      <div className="container mx-auto px-2 md:px-8 max-w-7xl">
        <div className="flex justify-start md:justify-center items-end gap-2 md:gap-4 overflow-x-auto py-2 md:py-4 scrollbar-hide">
          {images.map((image, index) => {
            const isActive = currentSlide === index;
            
            return (
              <button
                key={image.id}
                onClick={() => onSlideSelect(index)}
                className={`relative flex-shrink-0 rounded-lg md:rounded-2xl overflow-hidden transition-all duration-500 ease-out ${
                  isActive
                    ? 'transform scale-110 md:scale-115 shadow-xl md:shadow-2xl shadow-black/10'
                    : 'transform scale-100 hover:scale-105'
                } ${
                  isActive 
                    ? 'w-20 h-16 md:w-32 md:h-24 lg:w-40 lg:h-28 xl:w-44 xl:h-32' 
                    : 'w-16 h-12 md:w-24 md:h-18 lg:w-32 lg:h-24 xl:w-36 xl:h-27'
                }`}
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
                  isActive 
                    ? 'bg-transparent' 
                    : 'bg-black/40 hover:bg-black/20'
                }`} />
                
                {/* Active border indicator */}
                {isActive && (
                  <div className="absolute inset-0 border-2 md:border-4 border-blue-500 rounded-lg md:rounded-2xl" />
                )}

                {/* Progress indicator for active thumbnail */}
                {isActive && isAutoplayEnabled && isPlaying && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 md:h-1.5 bg-gray-300 rounded-b-lg md:rounded-b-2xl overflow-hidden">
                    <div
                      className="bg-blue-500 h-full transition-all duration-100"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ThumbnailNavigation;