import { IconButton } from '@mui/material';
// Optimized icon imports
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { NAVIGATION_BUTTON_STYLE } from '../constants/sliderStyles';

interface NavigationButtonsProps {
  onPrevious: () => void;
  onNext: () => void;
  showButtons: boolean;
}

export function NavigationButtons({ onPrevious, onNext, showButtons }: NavigationButtonsProps) {
  if (!showButtons) return null;

  return (
    <>
      <IconButton
        onClick={onPrevious}
        aria-label="Previous"
        sx={{
          ...NAVIGATION_BUTTON_STYLE,
          left: { xs: 4, sm: 8, md: 24 },
          display: { xs: 'none', sm: 'flex' },
        }}
      >
        <ChevronLeftIcon sx={{ fontSize: { xs: 20, md: 24 } }} />
      </IconButton>
      <IconButton
        onClick={onNext}
        aria-label="Next"
        sx={{
          ...NAVIGATION_BUTTON_STYLE,
          right: { xs: 4, sm: 8, md: 24 },
          display: { xs: 'none', sm: 'flex' },
        }}
      >
        <ChevronRightIcon sx={{ fontSize: { xs: 20, md: 24 } }} />
      </IconButton>
    </>
  );
}
