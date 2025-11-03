import type { Meta, StoryObj } from '@storybook/react';
import HotelCard from './index';
import type { SearchResultDTO } from '../../types';

const meta: Meta<typeof HotelCard> = {
  title: 'Features/Hotels/HotelCard',
  component: HotelCard,
  parameters: {
    layout: 'centered',
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

const mockHotel: SearchResultDTO = {
  hotelId: 1,
  hotelName: 'Grand Plaza Hotel',
  starRating: 5,
  latitude: 48.8566,
  longitude: 2.3522,
  roomPrice: 250,
  roomType: 'Deluxe Suite',
  cityName: 'Paris',
  roomPhotoUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
  discount: 20,
  amenities: [
    { id: 1, name: 'Free WiFi', description: 'High-speed internet' },
    { id: 2, name: 'Swimming Pool', description: 'Outdoor pool' },
    { id: 3, name: 'Gym', description: '24/7 fitness center' },
    { id: 4, name: 'Spa', description: 'Full-service spa' },
  ],
  numberOfChildren: 1,
  numberOfAdults: 2,
  numberOfRooms: 1,
  checkInDate: '2025-11-15',
  checkOutDate: '2025-11-18',
};

export const Default: Story = {
  args: {
    hotel: mockHotel,
  },
};
