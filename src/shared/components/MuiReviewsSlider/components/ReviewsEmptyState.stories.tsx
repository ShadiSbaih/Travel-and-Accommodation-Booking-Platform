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

export const CustomMessage: Story = {
  args: {
    message: 'This hotel is new and has not received any guest reviews yet.',
    compact: false,
  },
};

export const Compact: Story = {
  args: {
    compact: true,
  },
};

export const CompactCustomMessage: Story = {
  args: {
    message: 'No reviews available at this time.',
    compact: true,
  },
};

export const EncouragingMessage: Story = {
  args: {
    message: 'This property has just opened! Book now and be among the first to leave a review.',
    compact: false,
  },
};

export const InSidebar: Story = {
  args: {
    message: 'Guest reviews will appear here once they are submitted.',
    compact: true,
  },
  decorators: [
    (Story) => (
      <Box sx={{ maxWidth: 400, mx: 'auto', p: 2 }}>
        <Story />
      </Box>
    ),
  ],
};
