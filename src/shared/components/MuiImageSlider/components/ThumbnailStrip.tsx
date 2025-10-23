import { Box } from '@mui/material';

interface ThumbnailStripProps {
  images: Array<{ id: number; src: string; alt: string }>;
  currentSlide: number;
  onSlideClick: (index: number) => void;
  showThumbnails: boolean;
  autoPlay: boolean;
  isPlaying: boolean;
  progress: number;
}

export function ThumbnailStrip({
  images,
  currentSlide,
  onSlideClick,
  showThumbnails,
  autoPlay,
  isPlaying,
  progress,
}: ThumbnailStripProps) {
  if (!showThumbnails || images.length <= 1) return null;

  return (
    <Box sx={{ bgcolor: 'background.paper', py: { xs: 1.5, sm: 2, md: 4 }, display: { xs: 'none', sm: 'block' } }}>
      <Box sx={{ maxWidth: 1280, mx: 'auto', px: { xs: 1, sm: 2, md: 4 } }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-end',
            gap: { xs: 1, sm: 1.5, md: 2 },
            overflowX: 'auto',
            py: { xs: 1, sm: 1.5, md: 2 },
            '&::-webkit-scrollbar': { display: 'none' },
            scrollbarWidth: 'none',
          }}
        >
          {images.map((image, index) => {
            const isActive = currentSlide === index;
            return (
              <Box
                key={image.id}
                component="button"
                onClick={() => onSlideClick(index)}
                aria-label={`Go to slide ${index + 1}`}
                sx={{
                  position: 'relative',
                  flexShrink: 0,
                  borderRadius: { sm: 1, md: 2 },
                  overflow: 'hidden',
                  transition: 'all 0.5s ease-out',
                  transform: isActive ? { sm: 'scale(1.1)', md: 'scale(1.15)' } : 'scale(1)',
                  width: isActive ? { sm: 96, md: 128, lg: 160, xl: 176 } : { sm: 80, md: 96, lg: 128, xl: 144 },
                  height: isActive ? { sm: 72, md: 96, lg: 112, xl: 128 } : { sm: 60, md: 72, lg: 96, xl: 108 },
                  boxShadow: isActive ? 10 : 1,
                  border: 'none',
                  cursor: 'pointer',
                  '&:hover': { transform: isActive ? { sm: 'scale(1.1)', md: 'scale(1.15)' } : 'scale(1.05)' },
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
                      border: { sm: '3px solid #2196F3', md: '4px solid #2196F3' },
                      borderRadius: { sm: 1, md: 2 },
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
                      height: { sm: 2, md: 3 },
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
  );
}
