import { useState, useEffect } from 'react';
import { Box, IconButton } from '@mui/material';
import { ChevronLeft, ChevronRight, PlayArrow, Pause } from '@mui/icons-material';
import type { SliderImage } from './types';

interface MuiImageSliderProps {
  images: SliderImage[];
  className?: string;
  height?: string | number;
  autoPlay?: boolean;
  autoPlayInterval?: number;
  showThumbnails?: boolean;
}

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

  // Auto-advance slides
  useEffect(() => {
    if (!autoPlay || !isPlaying || images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % Math.min(images.length, 3));
      setProgress(0);
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [isPlaying, autoPlay, autoPlayInterval, images.length]);

  // Progress bar animation
  useEffect(() => {
    if (!autoPlay || !isPlaying) return;

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 0;
        return prev + 100 / (autoPlayInterval / 100);
      });
    }, 100);

    return () => clearInterval(progressInterval);
  }, [currentSlide, isPlaying, autoPlay, autoPlayInterval]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setProgress(0);
  };

  const nextSlide = () => goToSlide((currentSlide + 1) % Math.min(images.length, 3));
  const prevSlide = () => goToSlide((currentSlide - 1 + Math.min(images.length, 3)) % Math.min(images.length, 3));
  const toggleAutoplay = () => setIsPlaying(!isPlaying);

  if (!images || images.length === 0) return null;

  const heightValue = typeof height === 'number' ? `${height}px` : height;
  
  // Use only first 3 images for both slider and thumbnails
  const displayImages = images.slice(0, 3);

  return (
    <Box className={className} sx={{ position: 'relative', bgcolor: 'black', width: '100%' }}>
      {/* Main Hero Section */}
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          height: heightValue,
          overflow: 'hidden',
        }}
      >
        {/* Background Images */}
        {displayImages.map((image, index) => (
          <Box
            key={image.id}
            sx={{
              position: 'absolute',
              inset: 0,
              transition: 'all 1s ease-in-out',
              opacity: index === currentSlide ? 1 : 0,
              transform: index === currentSlide ? 'scale(1)' : 'scale(1.05)',
            }}
          >
            <Box
              component="img"
              src={image.src}
              alt={image.alt}
              loading={index === 0 ? 'eager' : 'lazy'}
              sx={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          </Box>
        ))}

        {/* Navigation Controls */}
        {displayImages.length > 1 && (
          <>
            <IconButton
              onClick={prevSlide}
              aria-label="Previous slide"
              sx={{
                position: 'absolute',
                left: { xs: 8, md: 24 },
                top: '50%',
                transform: 'translateY(-50%)',
                zIndex: 20,
                width: { xs: 32, md: 48 },
                height: { xs: 32, md: 48 },
                bgcolor: 'rgba(0, 0, 0, 0.5)',
                backdropFilter: 'blur(4px)',
                color: 'white',
                transition: 'all 0.2s',
                '&:hover': {
                  bgcolor: 'rgba(0, 0, 0, 0.7)',
                },
              }}
            >
              <ChevronLeft sx={{ fontSize: { xs: 20, md: 24 } }} />
            </IconButton>

            <IconButton
              onClick={nextSlide}
              aria-label="Next slide"
              sx={{
                position: 'absolute',
                right: { xs: 8, md: 24 },
                top: '50%',
                transform: 'translateY(-50%)',
                zIndex: 20,
                width: { xs: 32, md: 48 },
                height: { xs: 32, md: 48 },
                bgcolor: 'rgba(0, 0, 0, 0.5)',
                backdropFilter: 'blur(4px)',
                color: 'white',
                transition: 'all 0.2s',
                '&:hover': {
                  bgcolor: 'rgba(0, 0, 0, 0.7)',
                },
              }}
            >
              <ChevronRight sx={{ fontSize: { xs: 20, md: 24 } }} />
            </IconButton>
          </>
        )}

        {/* Autoplay Control */}
        {autoPlay && (
          <IconButton
            onClick={toggleAutoplay}
            aria-label={isPlaying ? 'Pause autoplay' : 'Play autoplay'}
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
              transition: 'all 0.2s',
              '&:hover': {
                bgcolor: 'rgba(0, 0, 0, 0.7)',
              },
            }}
          >
            {isPlaying ? (
              <Pause sx={{ fontSize: { xs: 16, md: 20 } }} />
            ) : (
              <PlayArrow sx={{ fontSize: { xs: 16, md: 20 } }} />
            )}
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

      {/* Thumbnail Navigation */}
      {showThumbnails && displayImages.length > 1 && (
        <Box sx={{ bgcolor: 'background.paper', py: { xs: 2, md: 4 } }}>
          <Box
            sx={{
              maxWidth: '1280px',
              mx: 'auto',
              px: { xs: 1, md: 4 },
            }}
          >
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
                    aria-label={`Go to slide ${index + 1}: ${image.alt}`}
                    sx={{
                      position: 'relative',
                      flexShrink: 0,
                      borderRadius: { xs: 1, md: 2 },
                      overflow: 'hidden',
                      transition: 'all 0.5s ease-out',
                      transform: isActive
                        ? { xs: 'scale(1.1)', md: 'scale(1.15)' }
                        : 'scale(1)',
                      width: isActive
                        ? { xs: 80, md: 128, lg: 160, xl: 176 }
                        : { xs: 64, md: 96, lg: 128, xl: 144 },
                      height: isActive
                        ? { xs: 64, md: 96, lg: 112, xl: 128 }
                        : { xs: 48, md: 72, lg: 96, xl: 108 },
                      boxShadow: isActive ? 10 : 1,
                      border: 'none',
                      cursor: 'pointer',
                      '&:hover': {
                        transform: isActive
                          ? { xs: 'scale(1.1)', md: 'scale(1.15)' }
                          : 'scale(1.05)',
                      },
                    }}
                  >
                    {/* Thumbnail Image */}
                    <Box
                      component="img"
                      src={image.src}
                      alt={image.alt}
                      sx={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      }}
                    />

                    {/* Shadow Overlay for inactive thumbnails */}
                    <Box
                      sx={{
                        position: 'absolute',
                        inset: 0,
                        bgcolor: isActive ? 'transparent' : 'rgba(0, 0, 0, 0.4)',
                        transition: 'all 0.5s',
                        '&:hover': {
                          bgcolor: isActive ? 'transparent' : 'rgba(0, 0, 0, 0.2)',
                        },
                      }}
                    />

                    {/* Active border indicator */}
                    {isActive && (
                      <Box
                        sx={{
                          position: 'absolute',
                          inset: 0,
                          border: { xs: 2, md: 4 },
                          borderColor: 'primary.main',
                          borderRadius: { xs: 1, md: 2 },
                          pointerEvents: 'none',
                        }}
                      />
                    )}

                    {/* Progress indicator on active thumbnail */}
                    {isActive && autoPlay && isPlaying && (
                      <Box
                        sx={{
                          position: 'absolute',
                          bottom: 0,
                          left: 0,
                          right: 0,
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
