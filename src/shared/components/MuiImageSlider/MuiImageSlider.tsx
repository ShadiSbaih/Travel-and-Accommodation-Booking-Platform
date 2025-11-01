import { useMemo } from 'react';
import { Box } from '@mui/material';
import type { MuiImageSliderProps } from './types';
import { useSliderState } from './hooks/useSliderState';
import { useSwipeGesture } from './hooks/useSwipeGesture';
import { SlideImage } from './components/SlideImage';
import { NavigationButtons } from './components/NavigationButtons';
import { AutoplayButton } from './components/AutoplayButton';
import { ProgressBar } from './components/ProgressBar';
import { MobileIndicators } from './components/MobileIndicators';
import { ThumbnailStrip } from './components/ThumbnailStrip';
import { MOBILE_HEIGHT, TABLET_HEIGHT } from './constants/sliderStyles';

export function MuiImageSlider({
  images,
  className = '',
  height = 600,
  autoPlay = true,
  autoPlayInterval = 5000,
  showThumbnails = true,
}: MuiImageSliderProps) {
  // Memoize display images to avoid recalculation
  const displayImages = useMemo(() => images.slice(0, 5), [images]);
  const maxSlides = displayImages.length;

  // Custom hooks for state and gestures
  const sliderState = useSliderState({
    maxSlides,
    autoPlay,
    autoPlayInterval,
  });

  const swipeHandlers = useSwipeGesture({
    onSwipeLeft: sliderState.nextSlide,
    onSwipeRight: sliderState.prevSlide,
  });

  // Memoize height value
  const heightValue = useMemo(() => (typeof height === 'number' ? `${height}px` : height), [height]);

  if (!images || images.length === 0) return null;

  return (
    <Box className={className} sx={{ position: 'relative', bgcolor: 'black', width: '100%' }}>
      {/* Main Slider */}
      <Box
        onTouchStart={swipeHandlers.handleTouchStart}
        onTouchMove={swipeHandlers.handleTouchMove}
        onTouchEnd={swipeHandlers.handleTouchEnd}
        sx={{
          position: 'relative',
          width: '100%',
          height: { xs: MOBILE_HEIGHT, sm: TABLET_HEIGHT, md: heightValue },
          overflow: 'hidden',
          touchAction: 'pan-x',
        }}
      >
        {/* Images */}
        {displayImages.map((image, index) => (
          <SlideImage key={image.id} image={image} isActive={index === sliderState.currentSlide} index={index} />
        ))}

        {/* Navigation Buttons */}
        <NavigationButtons onPrevious={sliderState.prevSlide} onNext={sliderState.nextSlide} showButtons={maxSlides > 1} />

        {/* Autoplay Toggle */}
        <AutoplayButton isPlaying={sliderState.isPlaying} onToggle={sliderState.toggleAutoplay} autoPlay={autoPlay} />

        {/* Progress Bar */}
        <ProgressBar progress={sliderState.progress} isVisible={autoPlay && sliderState.isPlaying} />

        {/* Mobile Slide Indicators */}
        <MobileIndicators totalSlides={maxSlides} currentSlide={sliderState.currentSlide} onSlideClick={sliderState.goToSlide} />
      </Box>

      {/* Thumbnails */}
      <ThumbnailStrip
        images={displayImages}
        currentSlide={sliderState.currentSlide}
        onSlideClick={sliderState.goToSlide}
        showThumbnails={showThumbnails}
        autoPlay={autoPlay}
        isPlaying={sliderState.isPlaying}
        progress={sliderState.progress}
      />
    </Box>
  );
}

export default MuiImageSlider;
