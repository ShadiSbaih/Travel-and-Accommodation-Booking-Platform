import { Box } from '@mui/material';
import { MOBILE_INDICATORS_CONTAINER_STYLE } from '../constants/sliderStyles';

interface MobileIndicatorsProps {
  totalSlides: number;
  currentSlide: number;
  onSlideClick: (index: number) => void;
}

export function MobileIndicators({ totalSlides, currentSlide, onSlideClick }: MobileIndicatorsProps) {
  return (
    <Box sx={MOBILE_INDICATORS_CONTAINER_STYLE}>
      {Array.from({ length: totalSlides }).map((_, index) => (
        <Box
          key={index}
          onClick={() => onSlideClick(index)}
          sx={{
            width: currentSlide === index ? 24 : 8,
            height: 8,
            borderRadius: 1,
            bgcolor: currentSlide === index ? 'primary.main' : 'rgba(255, 255, 255, 0.5)',
            transition: 'all 0.3s ease',
            cursor: 'pointer',
          }}
        />
      ))}
    </Box>
  );
}
