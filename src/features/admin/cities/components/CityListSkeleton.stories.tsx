import type { Meta, StoryObj } from '@storybook/react';
import CityListSkeleton from './CityListSkeleton';

const meta: Meta<typeof CityListSkeleton> = {
  title: 'Features/Admin/Cities/Skeletons/CityListSkeleton',
  component: CityListSkeleton,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Loading skeleton for the admin cities list. Displays multiple city card skeletons while the list is being loaded.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default city list loading skeleton
 */
export const Default: Story = {};
