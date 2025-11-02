import { Dialog, IconButton, Box } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import type { SliderImage } from '../types';
import { OptimizedImage } from '../../OptimizedImage';

interface FullscreenModalProps {
  open: boolean;
  onClose: () => void;
  images: SliderImage[];
  currentIndex: number;
  onPrevious: () => void;
  onNext: () => void;
}

export function FullscreenModal({
  open,
  onClose,
  images,
  currentIndex,
  onPrevious,
  onNext,
}: FullscreenModalProps) {
  const currentImage = images[currentIndex];

  if (!currentImage) return null;

  const showNavigation = images.length > 1;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={false}
      fullScreen
      PaperProps={{
        sx: {
          bgcolor: 'rgba(0, 0, 0, 0.95)',
          margin: 0,
          borderRadius: 0,
        },
      }}
    >
      {/* Close Button */}
      <IconButton
        onClick={onClose}
        aria-label="Close fullscreen"
        sx={{
          position: 'absolute',
          top: { xs: 8, md: 16 },
          right: { xs: 8, md: 16 },
          zIndex: 30,
          bgcolor: 'rgba(0, 0, 0, 0.7)',
          color: 'white',
          width: { xs: 40, md: 48 },
          height: { xs: 40, md: 48 },
          backdropFilter: 'blur(8px)',
          border: '2px solid rgba(255, 255, 255, 0.3)',
          '&:hover': {
            bgcolor: 'rgba(0, 0, 0, 0.85)',
            borderColor: 'rgba(255, 255, 255, 0.5)',
            transform: 'scale(1.05)',
          },
          transition: 'all 0.2s ease',
        }}
      >
        <CloseIcon sx={{ fontSize: { xs: 24, md: 28 } }} />
      </IconButton>

      {/* Image Container */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
          position: 'relative',
        }}
      >
        <OptimizedImage
          src={currentImage.src}
          alt={currentImage.alt}
          width={1920}
          height={1080}
          objectFit="contain"
          sx={{
            maxWidth: '95%',
            maxHeight: '95%',
            objectFit: 'contain',
            userSelect: 'none',
          }}
        />

        {/* Navigation Buttons */}
        {showNavigation && (
          <>
            {/* Previous Button */}
            <IconButton
              onClick={onPrevious}
              aria-label="Previous image"
              sx={{
                position: 'absolute',
                left: { xs: 8, md: 24 },
                top: '50%',
                transform: 'translateY(-50%)',
                zIndex: 30,
                bgcolor: 'rgba(0, 0, 0, 0.7)',
                color: 'white',
                width: { xs: 44, md: 56 },
                height: { xs: 44, md: 56 },
                backdropFilter: 'blur(8px)',
                border: '2px solid rgba(255, 255, 255, 0.3)',
                '&:hover': {
                  bgcolor: 'rgba(0, 0, 0, 0.85)',
                  borderColor: 'rgba(255, 255, 255, 0.5)',
                  transform: 'translateY(-50%) scale(1.05)',
                },
                transition: 'all 0.2s ease',
              }}
            >
              <ChevronLeftIcon sx={{ fontSize: { xs: 28, md: 36 } }} />
            </IconButton>

            {/* Next Button */}
            <IconButton
              onClick={onNext}
              aria-label="Next image"
              sx={{
                position: 'absolute',
                right: { xs: 8, md: 24 },
                top: '50%',
                transform: 'translateY(-50%)',
                zIndex: 30,
                bgcolor: 'rgba(0, 0, 0, 0.7)',
                color: 'white',
                width: { xs: 44, md: 56 },
                height: { xs: 44, md: 56 },
                backdropFilter: 'blur(8px)',
                border: '2px solid rgba(255, 255, 255, 0.3)',
                '&:hover': {
                  bgcolor: 'rgba(0, 0, 0, 0.85)',
                  borderColor: 'rgba(255, 255, 255, 0.5)',
                  transform: 'translateY(-50%) scale(1.05)',
                },
                transition: 'all 0.2s ease',
              }}
            >
              <ChevronRightIcon sx={{ fontSize: { xs: 28, md: 36 } }} />
            </IconButton>
          </>
        )}

        {/* Image Counter */}
        {showNavigation && (
          <Box
            sx={{
              position: 'absolute',
              bottom: { xs: 16, md: 24 },
              left: '50%',
              transform: 'translateX(-50%)',
              bgcolor: 'rgba(0, 0, 0, 0.7)',
              color: 'white',
              px: { xs: 2, md: 3 },
              py: { xs: 1, md: 1.5 },
              borderRadius: 2,
              fontSize: { xs: '0.875rem', md: '1rem' },
              fontWeight: 500,
              backdropFilter: 'blur(8px)',
              border: '2px solid rgba(255, 255, 255, 0.3)',
            }}
          >
            {currentIndex + 1} / {images.length}
          </Box>
        )}
      </Box>
    </Dialog>
  );
}
