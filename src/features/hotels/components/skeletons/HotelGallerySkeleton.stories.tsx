import type { Meta, StoryObj } from '@storybook/react';
import HotelGallerySkeleton from './HotelGallerySkeleton';

const meta: Meta<typeof HotelGallerySkeleton> = {
  title: 'Features/Hotels/Skeletons/HotelGallerySkeleton',
  component: HotelGallerySkeleton,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Loading skeleton for the hotel image gallery. Displays placeholder for hotel images.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default hotel gallery loading skeleton
 */
export const Default: Story = {};
