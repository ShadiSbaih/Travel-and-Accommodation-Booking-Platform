import type { Meta, StoryObj } from '@storybook/react';
import RecentlyVisitedCard from './RecentlyVisitedCard';
import type { RecentlyVisitedHotelDto } from '../types';

const meta: Meta<typeof RecentlyVisitedCard> = {
  title: 'Features/Home/RecentlyVisitedCard',
  component: RecentlyVisitedCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ width: '380px', padding: '20px' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

const mockHotel: RecentlyVisitedHotelDto = {
  hotelId: 1,
  hotelName: 'Grand Plaza Hotel',
  starRating: 5,
  visitDate: '2025-10-15T10:30:00Z',
  cityName: 'Paris',
  thumbnailUrl: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800',
  priceLowerBound: 150,
  priceUpperBound: 450,
};

export const Default: Story = {
  args: {
    hotel: mockHotel,
  },
};
