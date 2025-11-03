import { Box, Typography, IconButton } from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import type { Review } from './types';
import { useReviewsSlider } from './hooks/useReviewsSlider';
import { useSwipeGesture } from './hooks/useSwipeGesture';
import { CompactReviewCard } from './components/CompactReviewCard';
import { ReviewsEmptyState } from './components/ReviewsEmptyState';
import { DEFAULT_AUTOPLAY_INTERVAL } from './constants';

interface CompactReviewsSliderProps {
  reviews: Review[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
  reviewsPerSlide?: number;
}

export function CompactReviewsSlider({
  reviews,
  autoPlay = true,
  autoPlayInterval = DEFAULT_AUTOPLAY_INTERVAL,
  reviewsPerSlide = 2,
}: CompactReviewsSliderProps) {
  // Group reviews into slides
  const slides: Review[][] = [];
  for (let i = 0; i < reviews.length; i += reviewsPerSlide) {
    slides.push(reviews.slice(i, i + reviewsPerSlide));
  }

  const sliderState = useReviewsSlider({
    totalReviews: slides.length,
    autoPlay,
    autoPlayInterval,
  });

  const swipeHandlers = useSwipeGesture({
    onSwipeLeft: sliderState.nextReview,
    onSwipeRight: sliderState.prevReview,
  });

  if (!reviews || reviews.length === 0) {
    return (
      <Box sx={{ position: 'relative', width: '100%' }}>
        <Typography
          variant="h6"
          component="h3"
          sx={{
            fontWeight: 700,
            fontSize: '1.05rem',
            color: 'text.primary',
            mb: 2.5,
          }}
        >
          Guest Reviews
        </Typography>
        <ReviewsEmptyState compact />
      </Box>
    );
  }

  return (
    <Box sx={{ position: 'relative', width: '100%' }}>
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2.5 }}>
        <Typography
          variant="h6"
          component="h3"
          sx={{
            fontWeight: 700,
            fontSize: '1.05rem',
            color: 'text.primary',
          }}
        >
          Guest Reviews
        </Typography>

        {/* Navigation Buttons */}
        {slides.length > 1 && (
          <Box sx={{ display: 'flex', gap: 0.5 }}>
            <IconButton
              onClick={sliderState.prevReview}
              size="small"
              sx={{
                bgcolor: 'background.paper',
                border: 1,
                borderColor: 'divider',
                width: 32,
                height: 32,
                '&:hover': {
                  bgcolor: 'primary.main',
                  color: 'white',
                  borderColor: 'primary.main',
                },
              }}
            >
              <ChevronLeft fontSize="small" />
            </IconButton>
            <IconButton
              onClick={sliderState.nextReview}
              size="small"
              sx={{
                bgcolor: 'background.paper',
                border: 1,
                borderColor: 'divider',
                width: 32,
                height: 32,
                '&:hover': {
                  bgcolor: 'primary.main',
                  color: 'white',
                  borderColor: 'primary.main',
                },
              }}
            >
              <ChevronRight fontSize="small" />
            </IconButton>
          </Box>
        )}
      </Box>

      {/* Slider Container */}
      <Box
        onTouchStart={swipeHandlers.handleTouchStart}
        onTouchMove={swipeHandlers.handleTouchMove}
        onTouchEnd={swipeHandlers.handleTouchEnd}
        sx={{
          position: 'relative',
          width: '100%',
          overflow: 'hidden',
          touchAction: 'pan-x',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            transition: 'transform 0.5s ease',
            transform: `translateX(-${sliderState.currentIndex * 100}%)`,
          }}
        >
          {slides.map((slideReviews, slideIndex) => (
            <Box
              key={slideIndex}
              sx={{
                minWidth: '100%',
                display: 'grid',
                gridTemplateColumns: reviewsPerSlide === 2 ? { xs: '1fr', sm: '1fr 1fr' } : '1fr',
                gap: 2,
              }}
            >
              {slideReviews.map((review) => (
                <CompactReviewCard key={review.reviewId} review={review} />
              ))}
            </Box>
          ))}
        </Box>
      </Box>

      {/* Indicators */}
      {slides.length > 1 && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            gap: 0.75,
            mt: 2.5,
          }}
        >
          {slides.map((_, index) => (
            <Box
              key={index}
              onClick={() => sliderState.goToReview(index)}
              sx={{
                width: sliderState.currentIndex === index ? 24 : 8,
                height: 8,
                borderRadius: 4,
                bgcolor: sliderState.currentIndex === index ? 'primary.main' : 'rgba(0, 0, 0, 0.15)',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                '&:hover': {
                  bgcolor: sliderState.currentIndex === index ? 'primary.dark' : 'rgba(0, 0, 0, 0.25)',
                },
              }}
            />
          ))}
        </Box>
      )}
    </Box>
  );
}

export default CompactReviewsSlider;
