import React from 'react';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import type { NavigationControlsProps } from './types';

const NavigationControls: React.FC<NavigationControlsProps> = ({
  onPrevious,
  onNext,
  isEnabled,
  customIcons
}) => {
  if (!isEnabled) return null;

  return (
    <>
      <button
        className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 z-20 w-8 h-8 md:w-12 md:h-12 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-all duration-200 backdrop-blur-sm"
        onClick={onPrevious}
        aria-label="Previous slide"
      >
        {customIcons?.prev || <ChevronLeft sx={{ fontSize: { xs: 20, md: 24 } }} />}
      </button>
      <button
        className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 z-20 w-8 h-8 md:w-12 md:h-12 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-all duration-200 backdrop-blur-sm"
        onClick={onNext}
        aria-label="Next slide"
      >
        {customIcons?.next || <ChevronRight sx={{ fontSize: { xs: 20, md: 24 } }} />}
      </button>
    </>
  );
};

export default NavigationControls;