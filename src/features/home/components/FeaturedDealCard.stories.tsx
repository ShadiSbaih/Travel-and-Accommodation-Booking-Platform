import type { Meta, StoryObj } from '@storybook/react';
import FeaturedDealCard from './FeaturedDealCard';
import type { FeaturedDealDto } from '../types';

const meta: Meta<typeof FeaturedDealCard> = {
  title: 'Features/Home/FeaturedDealCard',
  component: FeaturedDealCard,
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

const mockDeal: FeaturedDealDto = {
  hotelId: 1,
  originalRoomPrice: 300,
  discount: 30,
  finalPrice: 210,
  cityName: 'Paris',
  hotelName: 'Grand Plaza Hotel',
  hotelStarRating: 5,
  title: 'Luxury Suite with Eiffel Tower View',
  description: 'Enjoy breathtaking views of the Eiffel Tower from your spacious suite with premium amenities',
  roomPhotoUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
};

export const Default: Story = {
  args: {
    deal: mockDeal,
  },
};
