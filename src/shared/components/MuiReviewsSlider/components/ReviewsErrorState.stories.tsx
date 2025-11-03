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
