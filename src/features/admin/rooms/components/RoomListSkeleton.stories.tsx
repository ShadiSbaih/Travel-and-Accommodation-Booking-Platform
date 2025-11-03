import type { Meta, StoryObj } from '@storybook/react';
import RoomListSkeleton from './RoomListSkeleton';

const meta: Meta<typeof RoomListSkeleton> = {
  title: 'Features/Admin/Rooms/Skeletons/RoomListSkeleton',
  component: RoomListSkeleton,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Loading skeleton for the admin rooms list. Displays multiple room card skeletons while the list is being loaded.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default room list loading skeleton
 */
export const Default: Story = {};
