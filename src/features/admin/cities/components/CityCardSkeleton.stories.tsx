import type { Meta, StoryObj } from '@storybook/react';
import CityCardSkeleton from './CityCardSkeleton';

const meta: Meta<typeof CityCardSkeleton> = {
  title: 'Features/Admin/Cities/Skeletons/CityCardSkeleton',
  component: CityCardSkeleton,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Loading skeleton for admin city cards. Displays placeholder while city data is being fetched.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default city card loading skeleton
 */
export const Default: Story = {};
