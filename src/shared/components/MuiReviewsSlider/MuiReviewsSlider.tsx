import { Box, Typography, Container } from '@mui/material';
import type { MuiReviewsSliderProps } from './types';
import { useReviewsSlider } from './hooks/useReviewsSlider';
import { useSwipeGesture } from './hooks/useSwipeGesture';
import { ReviewCard } from './components/ReviewCard';
import { NavigationButtons } from './components/NavigationButtons';
import { ReviewIndicators } from './components/ReviewIndicators';
import { AutoplayButton } from './components/AutoplayButton';
import { ReviewsEmptyState } from './components/ReviewsEmptyState';
import { DEFAULT_AUTOPLAY_INTERVAL } from './constants';

export function MuiReviewsSlider({
  reviews,
  autoPlay = true,
  autoPlayInterval = DEFAULT_AUTOPLAY_INTERVAL,
  className = '',
}: MuiReviewsSliderProps) {
  const sliderState = useReviewsSlider({
    totalReviews: reviews.length,
    autoPlay,
    autoPlayInterval,
  });

  const swipeHandlers = useSwipeGesture({
    onSwipeLeft: sliderState.nextReview,
    onSwipeRight: sliderState.prevReview,
  });

  if (!reviews || reviews.length === 0) {
    return (
      <Box sx={{ py: { xs: 6, md: 8 } }}>
        <Container maxWidth="lg">
          <Typography
            variant="h4"
            component="h2"
            sx={{
              textAlign: 'center',
              mb: { xs: 5, md: 6 },
              fontWeight: 800,
              color: 'text.primary',
              fontSize: { xs: '1.75rem', sm: '2rem', md: '2.25rem' },
              letterSpacing: '-0.01em',
            }}
          >
            Guest Reviews
          </Typography>
          <Box sx={{ maxWidth: 900, mx: 'auto' }}>
            <ReviewsEmptyState />
          </Box>
        </Container>
      </Box>
    );
  }

  return (
    <Box className={className} sx={{ position: 'relative', width: '100%', py: { xs: 6, md: 8 } }}>
      <Container maxWidth="lg">
        {/* Section Title */}
        <Typography
          variant="h4"
          component="h2"
          sx={{
            textAlign: 'center',
            mb: { xs: 5, md: 6 },
            fontWeight: 800,
            color: 'text.primary',
            fontSize: { xs: '1.75rem', sm: '2rem', md: '2.25rem' },
            letterSpacing: '-0.01em',
          }}
        >
          Guest Reviews
        </Typography>

        {/* Slider Container - Centered */}
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            maxWidth: 900,
            mx: 'auto',
          }}
        >
          <Box
            onTouchStart={swipeHandlers.handleTouchStart}
            onTouchMove={swipeHandlers.handleTouchMove}
            onTouchEnd={swipeHandlers.handleTouchEnd}
            sx={{
              position: 'relative',
              width: '100%',
              height: { xs: 380, sm: 380, md: 360 },
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              touchAction: 'pan-x',
            }}
          >
            {/* Review Cards */}
            {reviews.map((review, index) => (
              <ReviewCard key={review.reviewId} review={review} isActive={index === sliderState.currentIndex} />
            ))}

            {/* Navigation Buttons */}
            <NavigationButtons
              onPrevious={sliderState.prevReview}
              onNext={sliderState.nextReview}
              showButtons={reviews.length > 1}
            />

            {/* Autoplay Toggle */}
            <AutoplayButton isPlaying={sliderState.isPlaying} onToggle={sliderState.toggleAutoplay} autoPlay={autoPlay} />
          </Box>

          {/* Review Indicators */}
          <ReviewIndicators
            totalReviews={reviews.length}
            currentIndex={sliderState.currentIndex}
            onIndicatorClick={sliderState.goToReview}
          />
        </Box>
      </Container>
    </Box>
  );
}

export default MuiReviewsSlider;
