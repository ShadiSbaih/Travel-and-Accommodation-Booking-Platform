import type { Meta, StoryObj } from '@storybook/react';
import { ReviewsEmptyState } from './ReviewsEmptyState';
import { Box } from '@mui/material';

const meta: Meta<typeof ReviewsEmptyState> = {
  title: 'Shared/Reviews/EmptyState',
  component: ReviewsEmptyState,
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
      description: 'Empty state message to display',
      control: 'text',
    },
    compact: {
      description: 'Use compact size for smaller spaces',
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof ReviewsEmptyState>;

export const Default: Story = {
  args: {
    compact: false,
  },
};
