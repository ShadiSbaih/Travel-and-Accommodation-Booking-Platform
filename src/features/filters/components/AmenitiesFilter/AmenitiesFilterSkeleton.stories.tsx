import type { Meta, StoryObj } from '@storybook/react';
import AmenitiesFilterSkeleton from './AmenitiesFilterSkeleton';

const meta: Meta<typeof AmenitiesFilterSkeleton> = {
  title: 'Features/Filters/Skeletons/AmenitiesFilterSkeleton',
  component: AmenitiesFilterSkeleton,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Loading skeleton for the amenities filter component. Displays placeholder checkboxes while amenities are being loaded.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default amenities filter loading skeleton
 */
export const Default: Story = {};
