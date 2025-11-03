import type { Meta, StoryObj } from '@storybook/react';
import HotelDetailsPageSkeleton from './skeletons/HotelDetailsPageSkeleton';

const meta: Meta<typeof HotelDetailsPageSkeleton> = {
  title: 'Features/Hotels/HotelDetails/Loading States',
  component: HotelDetailsPageSkeleton,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    roomCount: {
      description: 'Number of room skeleton cards to display',
      control: { type: 'number', min: 1, max: 10 },
    },
  },
};

export default meta;
type Story = StoryObj<typeof HotelDetailsPageSkeleton>;

export const Default: Story = {
  args: {
    roomCount: 4,
  },
};
