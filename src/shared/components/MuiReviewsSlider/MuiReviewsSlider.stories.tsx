import type { Meta, StoryObj } from '@storybook/react';
import { MuiReviewsSlider } from './MuiReviewsSlider';
import type { Review } from './types';

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
    description: 'This is a really short review!',
  },
  {
    reviewId: 7,
    customerName: 'David Wilson',
    rating: 4.5,
    description: 'Outstanding experience from start to finish! The hotel exceeded all my expectations with impeccable service, luxurious accommodations, and incredible attention to detail. The staff went above and beyond to ensure our stay was memorable. The location was perfect, the amenities were world-class, and every aspect of the hotel demonstrated exceptional quality. I cannot recommend this place highly enough and will definitely be returning for future visits!',
  },
];

const meta: Meta<typeof MuiReviewsSlider> = {
  title: 'Shared/MuiReviewsSlider',
  component: MuiReviewsSlider,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    reviews: {
      description: 'Array of review objects to display in the slider',
      control: 'object',
    },
    autoPlay: {
      description: 'Enable automatic slide transitions',
      control: 'boolean',
    },
    autoPlayInterval: {
      description: 'Time in milliseconds between automatic transitions',
      control: { type: 'number', min: 1000, max: 10000, step: 1000 },
    },
    className: {
      description: 'Additional CSS class name',
      control: 'text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof MuiReviewsSlider>;

export const Default: Story = {
  args: {
    reviews: mockReviews,
    autoPlay: true,
    autoPlayInterval: 6000,
  },
};

export const WithoutAutoplay: Story = {
  args: {
    reviews: mockReviews,
    autoPlay: false,
  },
};

export const FastAutoplay: Story = {
  args: {
    reviews: mockReviews,
    autoPlay: true,
    autoPlayInterval: 3000,
  },
};

export const SingleReview: Story = {
  args: {
    reviews: [mockReviews[0]],
    autoPlay: false,
  },
};

export const TwoReviews: Story = {
  args: {
    reviews: mockReviews.slice(0, 2),
    autoPlay: true,
    autoPlayInterval: 5000,
  },
};

export const EmptyReviews: Story = {
  args: {
    reviews: [],
    autoPlay: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Shows empty state when no reviews are available',
      },
    },
  },
};

export const HighRatingsOnly: Story = {
  args: {
    reviews: mockReviews.filter((review) => review.rating >= 4.5),
    autoPlay: true,
    autoPlayInterval: 6000,
  },
};

export const VariableContentLength: Story = {
  args: {
    reviews: [mockReviews[5], mockReviews[6], mockReviews[0]],
    autoPlay: true,
    autoPlayInterval: 5000,
  },
};

export const LongContent: Story = {
  args: {
    reviews: [mockReviews[6]],
    autoPlay: false,
  },
};
