import { IconButton, Box } from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';

interface NavigationButtonsProps {
  onPrevious: () => void;
  onNext: () => void;
  showButtons: boolean;
}

export function NavigationButtons({ onPrevious, onNext, showButtons }: NavigationButtonsProps) {
  if (!showButtons) return null;

  const buttonStyles = {
    bgcolor: 'background.paper',
    color: 'primary.main',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
    border: 1,
    borderColor: 'divider',
    width: { xs: 44, sm: 48 },
    height: { xs: 44, sm: 48 },
    transition: 'all 0.25s ease',
    '&:hover': {
      bgcolor: 'background.paper',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.12)',
      borderColor: 'primary.main',
    },
  };

  return (
    <>
      {/* Previous Button */}
      <Box
        sx={{
          position: 'absolute',
          left: { xs: 8, sm: 16 },
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 2,
        }}
      >
        <IconButton
          onClick={onPrevious}
          aria-label="Previous review"
          sx={buttonStyles}
        >
          <ChevronLeft sx={{ fontSize: { xs: 24, sm: 28 } }} />
        </IconButton>
      </Box>

      {/* Next Button */}
      <Box
        sx={{
          position: 'absolute',
          right: { xs: 8, sm: 16 },
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 2,
        }}
      >
        <IconButton
          onClick={onNext}
          aria-label="Next review"
          sx={buttonStyles}
        >
          <ChevronRight sx={{ fontSize: { xs: 24, sm: 28 } }} />
        </IconButton>
      </Box>
    </>
  );
}
