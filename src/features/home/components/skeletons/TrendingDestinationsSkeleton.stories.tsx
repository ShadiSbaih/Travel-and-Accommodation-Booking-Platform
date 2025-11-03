import type { Meta, StoryObj } from '@storybook/react';
import TrendingDestinationsSkeleton from './TrendingDestinationsSkeleton';

const meta = {
  title: 'Features/Home/Skeletons/TrendingDestinationsSkeleton',
  component: TrendingDestinationsSkeleton,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Loading skeleton for the trending destinations section. Displays placeholder cards while data is being fetched.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof TrendingDestinationsSkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default trending destinations loading skeleton
 */
export const Default: Story = {};
