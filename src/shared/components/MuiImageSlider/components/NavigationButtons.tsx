import { IconButton } from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
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
        <ChevronLeft sx={{ fontSize: { xs: 20, md: 24 } }} />
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
        <ChevronRight sx={{ fontSize: { xs: 20, md: 24 } }} />
      </IconButton>
    </>
  );
}
