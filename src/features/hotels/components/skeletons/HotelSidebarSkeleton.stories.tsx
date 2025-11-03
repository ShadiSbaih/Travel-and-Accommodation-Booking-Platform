import type { Meta, StoryObj } from '@storybook/react';
import HotelSidebarSkeleton from './HotelSidebarSkeleton';

const meta: Meta<typeof HotelSidebarSkeleton> = {
  title: 'Features/Hotels/Skeletons/HotelSidebarSkeleton',
  component: HotelSidebarSkeleton,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Loading skeleton for the hotel details sidebar. Displays placeholder for hotel amenities, location map, and other details.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default hotel sidebar loading skeleton
 */
export const Default: Story = {};
