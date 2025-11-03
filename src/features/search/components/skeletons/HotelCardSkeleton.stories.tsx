import type { Meta, StoryObj } from '@storybook/react';
import HotelCardSkeleton from './HotelCardSkeleton';

const meta: Meta<typeof HotelCardSkeleton> = {
  title: 'Features/Search/Skeletons/HotelCardSkeleton',
  component: HotelCardSkeleton,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Loading skeleton for hotel search result cards. Displays placeholder content while hotel data is being fetched.',
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ width: '400px', padding: '20px' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default hotel card loading skeleton
 */
export const Default: Story = {};
