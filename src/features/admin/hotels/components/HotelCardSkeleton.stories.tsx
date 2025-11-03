import type { Meta, StoryObj } from '@storybook/react';
import HotelCardSkeleton from './HotelCardSkeleton';

const meta: Meta<typeof HotelCardSkeleton> = {
  title: 'Features/Admin/Hotels/Skeletons/HotelCardSkeleton',
  component: HotelCardSkeleton,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Loading skeleton for admin hotel cards. Displays placeholder while hotel data is being fetched.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default hotel card loading skeleton
 */
export const Default: Story = {};
