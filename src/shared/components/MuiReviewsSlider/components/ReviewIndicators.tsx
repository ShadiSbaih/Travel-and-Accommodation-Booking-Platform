import { Box } from '@mui/material';

interface ReviewIndicatorsProps {
  totalReviews: number;
  currentIndex: number;
  onIndicatorClick: (index: number) => void;
}

export function ReviewIndicators({ totalReviews, currentIndex, onIndicatorClick }: ReviewIndicatorsProps) {
  if (totalReviews <= 1) return null;

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 1,
        mt: 4,
        mb: 1,
      }}
    >
      {Array.from({ length: totalReviews }).map((_, index) => (
        <Box
          key={index}
          onClick={() => onIndicatorClick(index)}
          role="button"
          aria-label={`Go to review ${index + 1}`}
          tabIndex={0}
          sx={{
            width: currentIndex === index ? 28 : 8,
            height: 8,
            borderRadius: 4,
            bgcolor: currentIndex === index ? 'primary.main' : 'rgba(0, 0, 0, 0.15)',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            '&:hover': {
              bgcolor: currentIndex === index ? 'primary.dark' : 'rgba(0, 0, 0, 0.25)',
            },
          }}
        />
      ))}
    </Box>
  );
}
