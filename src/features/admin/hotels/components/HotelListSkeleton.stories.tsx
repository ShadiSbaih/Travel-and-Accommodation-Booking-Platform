import type { Meta, StoryObj } from '@storybook/react';
import HotelListSkeleton from './HotelListSkeleton';

const meta: Meta<typeof HotelListSkeleton> = {
  title: 'Features/Admin/Hotels/Skeletons/HotelListSkeleton',
  component: HotelListSkeleton,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Loading skeleton for the admin hotels list. Displays multiple hotel card skeletons while the list is being loaded.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default hotel list loading skeleton
 */
export const Default: Story = {};
