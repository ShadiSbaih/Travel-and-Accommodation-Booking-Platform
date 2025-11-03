import type { Meta, StoryObj } from '@storybook/react';
import RoomCardSkeleton from './RoomCardSkeleton';

const meta = {
  title: 'Features/Hotels/Skeletons/RoomCardSkeleton',
  component: RoomCardSkeleton,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Loading skeleton for room cards. Displays placeholder content while room data is being fetched.',
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ width: '420px', padding: '20px' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof RoomCardSkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default room card loading skeleton
 */
export const Default: Story = {};
