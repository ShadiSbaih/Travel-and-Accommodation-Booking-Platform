import React, { useState, useEffect } from 'react';
import type {  SliderConfig, ImageSliderProps } from './types';
import NavigationControls from './NavigationControls';
import AutoplayControl from './AutoplayControl';
import ProgressBar from './ProgressBar';
import ThumbnailNavigation from './ThumbnailNavigation';

const ImageSlider: React.FC<ImageSliderProps> = ({
  images,
  config = {},
  className = "",
  height = "600px",
  width = "100%",
  onSlideChange,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(config.autoplay?.enabled || false);
  const [progress, setProgress] = useState(0);

  // Merge default config with provided config
  const finalConfig: SliderConfig = {
    autoplay: { enabled: true, delay: 5000, pauseOnHover: true, ...config.autoplay },
    navigation: { enabled: true, ...config.navigation },
    pagination: { enabled: true, type: 'bullets', clickable: true, ...config.pagination },
    effect: 'slide',
    loop: true,
    speed: 800,
    ...config
  };

  // Auto-advance slides
  useEffect(() => {
    if (!finalConfig.autoplay?.enabled || !isPlaying || images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % images.length);
      setProgress(0);
    }, finalConfig.autoplay.delay);

    return () => clearInterval(interval);
  }, [isPlaying, finalConfig.autoplay?.enabled, finalConfig.autoplay?.delay, images.length]);

  // Progress bar animation
  useEffect(() => {
    if (!finalConfig.autoplay?.enabled || !isPlaying) return;

    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) return 0;
        return prev + (100 / (finalConfig.autoplay!.delay / 100));
      });
    }, 100);

    return () => clearInterval(progressInterval);
  }, [currentSlide, isPlaying, finalConfig.autoplay?.enabled, finalConfig.autoplay?.delay, finalConfig?.autoplay]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setProgress(0);
    onSlideChange?.(index);
  };

  const nextSlide = () => goToSlide((currentSlide + 1) % images.length);
  const prevSlide = () => goToSlide((currentSlide - 1 + images.length) % images.length);

  const toggleAutoplay = () => setIsPlaying(!isPlaying);

 


  return (
    <div className={`relative bg-black ${className}`} style={{ width }}>
      {/* Main Hero Section */}
      <div className="relative w-full overflow-hidden" style={{ height }}>
        {/* Background Images */}
        {images.map((image, index) => (
          <div
            key={image.id}
            className={`absolute inset-0 transition-all duration-1000 ${index === currentSlide
              ? 'opacity-100 scale-100'
              : 'opacity-0 scale-105'
              }`}
          >
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-full object-cover"
              loading={index === 0 ? "eager" : "lazy"}
            />
            {/* Dark overlay for better text readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />
          </div>
        ))}


        {/* Navigation Controls */}
        <NavigationControls
          onPrevious={prevSlide}
          onNext={nextSlide}
          isEnabled={!!(finalConfig.navigation?.enabled && images.length > 1)}
          customIcons={finalConfig.navigation?.customIcons}
        />

        {/* Autoplay Control */}
        <AutoplayControl
          isPlaying={isPlaying}
          onToggle={toggleAutoplay}
          isEnabled={finalConfig.autoplay?.enabled || false}
        />

        {/* Progress Bar */}
        <ProgressBar
          progress={progress}
          isVisible={!!(finalConfig.autoplay?.enabled && isPlaying)}
        />
      </div>

      {/* Thumbnail Navigation */}
      {finalConfig.pagination?.enabled && finalConfig.pagination.type === 'thumbnails' && (
        <ThumbnailNavigation
          images={images}
          currentSlide={currentSlide}
          onSlideSelect={goToSlide}
          progress={progress}
          isAutoplayEnabled={finalConfig.autoplay?.enabled || false}
          isPlaying={isPlaying}
        />
      )}
    </div>
  );
};

export default ImageSlider;