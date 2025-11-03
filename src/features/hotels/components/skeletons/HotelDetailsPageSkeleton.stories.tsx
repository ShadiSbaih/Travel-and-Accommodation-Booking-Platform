import type { Meta, StoryObj } from '@storybook/react';
import HotelDetailsPageSkeleton from './HotelDetailsPageSkeleton';

const meta: Meta<typeof HotelDetailsPageSkeleton> = {
  title: 'Features/Hotels/Skeletons/HotelDetailsPageSkeleton',
  component: HotelDetailsPageSkeleton,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Loading skeleton for the hotel details page. Displays placeholder for hotel gallery, information, sidebar, and available rooms.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default hotel details page loading skeleton
 */
export const Default: Story = {};
