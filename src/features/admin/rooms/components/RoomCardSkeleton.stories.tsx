import type { Meta, StoryObj } from '@storybook/react';
import RoomCardSkeleton from './RoomCardSkeleton';

const meta: Meta<typeof RoomCardSkeleton> = {
  title: 'Features/Admin/Rooms/Skeletons/RoomCardSkeleton',
  component: RoomCardSkeleton,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Loading skeleton for admin room cards. Displays placeholder while room data is being fetched.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default room card loading skeleton
 */
export const Default: Story = {};
