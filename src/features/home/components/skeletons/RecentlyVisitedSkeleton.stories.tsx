import type { Meta, StoryObj } from '@storybook/react';
import RecentlyVisitedSkeleton from './RecentlyVisitedSkeleton';

const meta: Meta<typeof RecentlyVisitedSkeleton> = {
  title: 'Features/Home/Skeletons/RecentlyVisitedSkeleton',
  component: RecentlyVisitedSkeleton,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Loading skeleton for the recently visited hotels section. Displays placeholder cards while data is being fetched.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default recently visited loading skeleton
 */
export const Default: Story = {};
