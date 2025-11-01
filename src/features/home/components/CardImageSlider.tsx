import React, { useState, useCallback } from 'react';
import { Box, IconButton } from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';

interface CardImageSliderProps {
  images: string[];
  alt: string;
  height?: number;
  onImageError?: (e: React.SyntheticEvent<HTMLImageElement>) => void;
}

const CardImageSlider = React.memo(({ 
  images, 
  alt, 
  height = 220,
  onImageError 
}: CardImageSliderProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const handlePrev = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  }, [images.length]);

  const handleNext = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  }, [images.length]);

  if (!images || images.length === 0) {
    return null;
  }

  const showControls = images.length > 1 && isHovered;

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height,
        overflow: 'hidden',
        bgcolor: 'grey.200',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image */}
      <Box
        component="img"
        src={images[currentIndex]}
        alt={alt}
        onError={onImageError}
        loading="lazy"
        sx={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          display: 'block',
          transition: 'transform 0.3s ease-in-out',
          transform: isHovered ? 'scale(1.05)' : 'scale(1)',
        }}
      />

      {/* Navigation Buttons */}
      {showControls && (
        <>
          <IconButton
            onClick={handlePrev}
            sx={{
              position: 'absolute',
              left: 8,
              top: '50%',
              transform: 'translateY(-50%)',
              bgcolor: 'rgba(255, 255, 255, 0.9)',
              '&:hover': {
                bgcolor: 'rgba(255, 255, 255, 1)',
              },
              width: 32,
              height: 32,
            }}
            size="small"
          >
            <ChevronLeft />
          </IconButton>
          <IconButton
            onClick={handleNext}
            sx={{
              position: 'absolute',
              right: 8,
              top: '50%',
              transform: 'translateY(-50%)',
              bgcolor: 'rgba(255, 255, 255, 0.9)',
              '&:hover': {
                bgcolor: 'rgba(255, 255, 255, 1)',
              },
              width: 32,
              height: 32,
            }}
            size="small"
          >
            <ChevronRight />
          </IconButton>
        </>
      )}

      {/* Dots Indicator */}
      {images.length > 1 && (
        <Box
          sx={{
            position: 'absolute',
            bottom: 8,
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            gap: 0.5,
            bgcolor: 'rgba(0, 0, 0, 0.4)',
            borderRadius: 2,
            px: 1,
            py: 0.5,
          }}
        >
          {images.map((_, index) => (
            <Box
              key={index}
              sx={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                bgcolor: currentIndex === index ? 'white' : 'rgba(255, 255, 255, 0.5)',
                transition: 'background-color 0.3s ease',
              }}
            />
          ))}
        </Box>
      )}
    </Box>
  );
});

CardImageSlider.displayName = 'CardImageSlider';

export default CardImageSlider;
