import type { Meta, StoryObj } from '@storybook/react';
import { ReviewsErrorState } from './ReviewsErrorState';
import { Box } from '@mui/material';

const meta: Meta<typeof ReviewsErrorState> = {
  title: 'Shared/Reviews/ErrorState',
  component: ReviewsErrorState,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <Box sx={{ maxWidth: 600, mx: 'auto', p: 3 }}>
        <Story />
      </Box>
    ),
  ],
  argTypes: {
    message: {
      description: 'Error message to display',
      control: 'text',
    },
    onRetry: {
      description: 'Callback function when retry button is clicked',
      action: 'retry clicked',
    },
  },
};

export default meta;
type Story = StoryObj<typeof ReviewsErrorState>;

export const Default: Story = {
  args: {
    onRetry: () => console.log('Retry clicked'),
  },
};

export const CustomMessage: Story = {
  args: {
    message: 'Failed to fetch reviews from the server. Please check your internet connection.',
    onRetry: () => console.log('Retry clicked'),
  },
};

export const WithoutRetry: Story = {
  args: {
    message: 'Reviews are temporarily unavailable.',
  },
};

export const NetworkError: Story = {
  args: {
    message: 'Network error occurred while loading reviews. Please check your connection and try again.',
    onRetry: () => console.log('Retry clicked'),
  },
};

export const ServerError: Story = {
  args: {
    message: 'Server error (500). Our team has been notified and is working on a fix.',
    onRetry: () => console.log('Retry clicked'),
  },
};

export const TimeoutError: Story = {
  args: {
    message: 'Request timed out. The server took too long to respond.',
    onRetry: () => console.log('Retry clicked'),
  },
};
