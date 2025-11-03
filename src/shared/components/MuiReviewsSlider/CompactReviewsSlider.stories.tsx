import type { Meta, StoryObj } from '@storybook/react';
import { CompactReviewsSlider } from './CompactReviewsSlider';
import type { Review } from './types';
import { Box } from '@mui/material';

const mockReviews: Review[] = [
  {
    reviewId: 1,
    customerName: 'John Doe',
    rating: 4.5,
    description: 'Great experience! The staff were friendly and the room was clean and comfortable. Will definitely return.',
  },
  {
    reviewId: 2,
    customerName: 'Jane Smith',
    rating: 5.0,
    description: 'An amazing stay! The view from the suite was breathtaking and the amenities were top-notch.',
  },
  {
    reviewId: 3,
    customerName: 'Michael Johnson',
    rating: 3.0,
    description: 'Good hotel but the check-in process was a bit slow. Overall, a decent stay.',
  },
  {
    reviewId: 4,
    customerName: 'Emily White',
    rating: 4.0,
    description: 'The resort is beautiful, and the pool area is perfect. The only downside was the food quality.',
  },
  {
    reviewId: 5,
    customerName: 'Robert Brown',
    rating: 4.8,
    description: 'Highly recommend! A wonderful stay with excellent service. The room was spacious and the beach was fantastic.',
  },
  {
    reviewId: 6,
    customerName: 'Sarah Davis',
    rating: 5.0,
    description: 'Perfect vacation spot!',
  },
];

const meta: Meta<typeof CompactReviewsSlider> = {
  title: 'Shared/CompactReviewsSlider',
  component: CompactReviewsSlider,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <Box sx={{ maxWidth: 400, mx: 'auto', p: 2 }}>
        <Story />
      </Box>
    ),
  ],
  argTypes: {
    reviews: {
      description: 'Array of review objects to display',
      control: 'object',
    },
    autoPlay: {
      description: 'Enable automatic slide transitions',
      control: 'boolean',
    },
    autoPlayInterval: {
      description: 'Time in milliseconds between transitions',
      control: { type: 'number', min: 1000, max: 10000, step: 1000 },
    },
    reviewsPerSlide: {
      description: 'Number of reviews to show per slide',
      control: { type: 'number', min: 1, max: 3 },
    },
  },
};

export default meta;
type Story = StoryObj<typeof CompactReviewsSlider>;

export const Default: Story = {
  args: {
    reviews: mockReviews,
    autoPlay: true,
    autoPlayInterval: 6000,
    reviewsPerSlide: 2,
  },
};

export const WithoutAutoplay: Story = {
  args: {
    reviews: mockReviews,
    autoPlay: false,
    reviewsPerSlide: 2,
  },
};

export const SingleReviewPerSlide: Story = {
  args: {
    reviews: mockReviews,
    autoPlay: true,
    autoPlayInterval: 5000,
    reviewsPerSlide: 1,
  },
};

export const FourReviews: Story = {
  args: {
    reviews: mockReviews.slice(0, 4),
    autoPlay: true,
    autoPlayInterval: 6000,
    reviewsPerSlide: 2,
  },
};

export const TwoReviews: Story = {
  args: {
    reviews: mockReviews.slice(0, 2),
    autoPlay: false,
    reviewsPerSlide: 2,
  },
};

export const EmptyState: Story = {
  args: {
    reviews: [],
    autoPlay: false,
    reviewsPerSlide: 2,
  },
  parameters: {
    docs: {
      description: {
        story: 'Shows compact empty state when no reviews are available',
      },
    },
  },
};
