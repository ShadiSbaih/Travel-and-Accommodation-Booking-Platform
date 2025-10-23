import { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { Box, IconButton } from '@mui/material';
import { ChevronLeft, ChevronRight, PlayArrow, Pause } from '@mui/icons-material';
import type { MuiImageSliderProps } from './types';

export function MuiImageSlider({
  images,
  className = '',
  height = 600,
  autoPlay = true,
  autoPlayInterval = 5000,
  showThumbnails = true,
}: MuiImageSliderProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [progress, setProgress] = useState(0);
  const slideTimerRef = useRef<number | null>(null);
  const progressTimerRef = useRef<number | null>(null);

  // Memoize display images to avoid recalculation
  const displayImages = useMemo(() => images.slice(0, 3), [images]);
  const maxSlides = displayImages.length;

  // Clear timers helper
  const clearTimers = useCallback(() => {
    if (slideTimerRef.current) clearInterval(slideTimerRef.current);
    if (progressTimerRef.current) clearInterval(progressTimerRef.current);
  }, []);

  // Combined effect for auto-advance and progress
  useEffect(() => {
    if (!autoPlay || !isPlaying || maxSlides <= 1) {
      clearTimers();
      setProgress(0);
      return;
    }

    setProgress(0);
    const startTime = Date.now();

    // Progress animation
    progressTimerRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min((elapsed / autoPlayInterval) * 100, 100);
      setProgress(newProgress);
    }, 100);

    // Auto-advance slide
    slideTimerRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % maxSlides);
    }, autoPlayInterval);

    return clearTimers;
  }, [currentSlide, isPlaying, autoPlay, autoPlayInterval, maxSlides, clearTimers]);

  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(index);
  }, []);

  const nextSlide = useCallback(() => goToSlide((currentSlide + 1) % maxSlides), [currentSlide, maxSlides, goToSlide]);
  const prevSlide = useCallback(() => goToSlide((currentSlide - 1 + maxSlides) % maxSlides), [currentSlide, maxSlides, goToSlide]);
  const toggleAutoplay = useCallback(() => setIsPlaying((prev) => !prev), []);

  // Memoize computed values
  const heightValue = useMemo(() => (typeof height === 'number' ? `${height}px` : height), [height]);

  const navigationButtonStyle = useMemo(
    () => ({
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)',
      zIndex: 20,
      width: { xs: 32, md: 48 },
      height: { xs: 32, md: 48 },
      bgcolor: 'rgba(0, 0, 0, 0.5)',
      backdropFilter: 'blur(4px)',
      color: 'white',
      transition: 'all 0.2s',
      '&:hover': { bgcolor: 'rgba(0, 0, 0, 0.7)' },
    }),
    []
  );

  if (!images || images.length === 0) return null;

  return (
    <Box className={className} sx={{ position: 'relative', bgcolor: 'black', width: '100%' }}>
      {/* Main Slider */}
      <Box sx={{ position: 'relative', width: '100%', height: heightValue, overflow: 'hidden' }}>
        {/* Images */}
        {displayImages.map((image, index) => (
          <Box
            key={image.id}
            component="img"
            src={image.src}
            alt={image.alt}
            loading={index === 0 ? 'eager' : 'lazy'}
            sx={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              opacity: index === currentSlide ? 1 : 0,
              transform: index === currentSlide ? 'scale(1)' : 'scale(1.05)',
              transition: 'all 1s ease-in-out',
            }}
          />
        ))}

        {/* Navigation Buttons */}
        {maxSlides > 1 && (
          <>
            <IconButton onClick={prevSlide} aria-label="Previous" sx={{ ...navigationButtonStyle, left: { xs: 8, md: 24 } }}>
              <ChevronLeft sx={{ fontSize: { xs: 20, md: 24 } }} />
            </IconButton>
            <IconButton onClick={nextSlide} aria-label="Next" sx={{ ...navigationButtonStyle, right: { xs: 8, md: 24 } }}>
              <ChevronRight sx={{ fontSize: { xs: 20, md: 24 } }} />
            </IconButton>
          </>
        )}

        {/* Autoplay Toggle */}
        {autoPlay && (
          <IconButton
            onClick={toggleAutoplay}
            aria-label={isPlaying ? 'Pause' : 'Play'}
            sx={{
              position: 'absolute',
              bottom: { xs: 8, md: 16 },
              right: { xs: 8, md: 16 },
              zIndex: 20,
              width: { xs: 32, md: 40 },
              height: { xs: 32, md: 40 },
              bgcolor: 'rgba(0, 0, 0, 0.5)',
              backdropFilter: 'blur(4px)',
              color: 'white',
              '&:hover': { bgcolor: 'rgba(0, 0, 0, 0.7)' },
            }}
          >
            {isPlaying ? <Pause sx={{ fontSize: { xs: 16, md: 20 } }} /> : <PlayArrow sx={{ fontSize: { xs: 16, md: 20 } }} />}
          </IconButton>
        )}

        {/* Progress Bar */}
        {autoPlay && isPlaying && (
          <Box
            sx={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              height: { xs: 2, md: 3 },
              bgcolor: 'primary.main',
              width: `${progress}%`,
              transition: 'width 0.1s linear',
              zIndex: 20,
            }}
          />
        )}
      </Box>

      {/* Thumbnails */}
      {showThumbnails && maxSlides > 1 && (
        <Box sx={{ bgcolor: 'background.paper', py: { xs: 2, md: 4 } }}>
          <Box sx={{ maxWidth: 1280, mx: 'auto', px: { xs: 1, md: 4 } }}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'flex-end',
                gap: { xs: 1, md: 2 },
                overflowX: 'auto',
                py: { xs: 1, md: 2 },
                '&::-webkit-scrollbar': { display: 'none' },
                scrollbarWidth: 'none',
              }}
            >
              {displayImages.map((image, index) => {
                const isActive = currentSlide === index;
                return (
                  <Box
                    key={image.id}
                    component="button"
                    onClick={() => goToSlide(index)}
                    aria-label={`Go to slide ${index + 1}`}
                    sx={{
                      position: 'relative',
                      flexShrink: 0,
                      borderRadius: { xs: 1, md: 2 },
                      overflow: 'hidden',
                      transition: 'all 0.5s ease-out',
                      transform: isActive ? { xs: 'scale(1.1)', md: 'scale(1.15)' } : 'scale(1)',
                      width: isActive ? { xs: 80, md: 128, lg: 160, xl: 176 } : { xs: 64, md: 96, lg: 128, xl: 144 },
                      height: isActive ? { xs: 64, md: 96, lg: 112, xl: 128 } : { xs: 48, md: 72, lg: 96, xl: 108 },
                      boxShadow: isActive ? 10 : 1,
                      border: 'none',
                      cursor: 'pointer',
                      '&:hover': { transform: isActive ? { xs: 'scale(1.1)', md: 'scale(1.15)' } : 'scale(1.05)' },
                    }}
                  >
                    <Box component="img" src={image.src} alt={image.alt} sx={{ width: '100%', height: '100%', objectFit: 'cover' }} />

                    {/* Overlay */}
                    <Box
                      sx={{
                        position: 'absolute',
                        inset: 0,
                        bgcolor: isActive ? 'transparent' : 'rgba(0, 0, 0, 0.4)',
                        transition: 'all 0.5s',
                        '&:hover': { bgcolor: isActive ? 'transparent' : 'rgba(0, 0, 0, 0.2)' },
                      }}
                    />

                    {/* Active Border */}
                    {isActive && (
                      <Box
                        sx={{
                          position: 'absolute',
                          inset: 0,
                          border: { xs: '2px solid #2196F3', md: '4px solid #2196F3' },
                          borderRadius: { xs: 1, md: 2 },
                          pointerEvents: 'none',
                        }}
                      />
                    )}

                    {/* Progress */}
                    {isActive && autoPlay && isPlaying && (
                      <Box
                        sx={{
                          position: 'absolute',
                          bottom: 0,
                          left: 0,
                          height: { xs: 2, md: 3 },
                          bgcolor: 'primary.main',
                          width: `${progress}%`,
                          transition: 'width 0.1s linear',
                        }}
                      />
                    )}
                  </Box>
                );
              })}
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
}

export default MuiImageSlider;
