import type { Meta, StoryObj } from '@storybook/react';
import FeaturedDealsSkeleton from './FeaturedDealsSkeleton';

const meta = {
  title: 'Features/Home/Skeletons/FeaturedDealsSkeleton',
  component: FeaturedDealsSkeleton,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Loading skeleton for the featured deals section. Displays placeholder cards while data is being fetched.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof FeaturedDealsSkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default featured deals loading skeleton
 */
export const Default: Story = {};
