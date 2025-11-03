import type { Meta, StoryObj } from '@storybook/react';
import { Box, Paper } from '@mui/material';
import { CompactReviewsSlider } from '../CompactReviewsSlider';
import { ReviewsErrorState } from './ReviewsErrorState';
import { ReviewsEmptyState } from './ReviewsEmptyState';
import type { Review } from '../types';

const mockReviews: Review[] = [
  {
    reviewId: 1,
    customerName: 'John Doe',
    rating: 4.5,
    description: 'Great experience! The staff were friendly and the room was clean and comfortable.',
  },
  {
    reviewId: 2,
    customerName: 'Jane Smith',
    rating: 5.0,
    description: 'An amazing stay! The view from the suite was breathtaking.',
  },
];

const meta: Meta = {
  title: 'Shared/Reviews/Complete Examples',
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

export const InSidebarWithReviews: Story = {
  render: () => (
    <Paper
      elevation={0}
      sx={{
        maxWidth: 400,
        p: 3,
        border: 1,
        borderColor: 'divider',
        mx: 'auto',
      }}
    >
      <CompactReviewsSlider reviews={mockReviews} reviewsPerSlide={2} autoPlay={true} />
    </Paper>
  ),
};

export const InSidebarEmpty: Story = {
  render: () => (
    <Paper
      elevation={0}
      sx={{
        maxWidth: 400,
        p: 3,
        border: 1,
        borderColor: 'divider',
        mx: 'auto',
      }}
    >
      <CompactReviewsSlider reviews={[]} reviewsPerSlide={2} />
    </Paper>
  ),
};

export const InSidebarError: Story = {
  render: () => (
    <Paper
      elevation={0}
      sx={{
        maxWidth: 400,
        p: 3,
        border: 1,
        borderColor: 'divider',
        mx: 'auto',
      }}
    >
      <Box sx={{ mb: 2 }}>
        <ReviewsErrorState 
          message="Failed to load reviews."
          onRetry={() => console.log('Retrying...')}
        />
      </Box>
    </Paper>
  ),
};

export const CompactEmptyInCard: Story = {
  render: () => (
    <Paper
      elevation={0}
      sx={{
        maxWidth: 400,
        p: 2.5,
        border: 1,
        borderColor: 'divider',
        mx: 'auto',
      }}
    >
      <ReviewsEmptyState compact message="No reviews yet for this hotel." />
    </Paper>
  ),
};

export const FullPageError: Story = {
  render: () => (
    <Box sx={{ maxWidth: 900, mx: 'auto', p: 4 }}>
      <ReviewsErrorState 
        message="Unable to load reviews. Please check your connection and try again."
        onRetry={() => console.log('Retrying...')}
      />
    </Box>
  ),
};

export const FullPageEmpty: Story = {
  render: () => (
    <Box sx={{ maxWidth: 900, mx: 'auto', p: 4 }}>
      <ReviewsEmptyState message="This is a brand new property. Be the first to leave a review!" />
    </Box>
  ),
};

export const LoadingToError: Story = {
  render: () => (
    <Box sx={{ maxWidth: 600, mx: 'auto', p: 3 }}>
      <ReviewsErrorState 
        message="Network timeout. Please try again."
        onRetry={() => alert('Retrying to fetch reviews...')}
      />
    </Box>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Example of error state that appears when API call fails',
      },
    },
  },
};
