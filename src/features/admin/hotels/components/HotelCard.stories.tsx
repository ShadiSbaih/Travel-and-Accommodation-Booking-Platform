import type { Meta, StoryObj } from '@storybook/react';
import HotelCard from './HotelCard';
import type { Hotel } from '../types';

const meta: Meta<typeof HotelCard> = {
  title: 'Features/Admin/Hotels/HotelCard',
  component: HotelCard,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '800px', padding: '20px' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

const mockHotel: Hotel = {
  id: 1,
  hotelName: 'Grand Plaza Hotel',
  name: 'Grand Plaza Hotel',
  location: 'Paris',
  description: 'A luxurious 5-star hotel in the heart of Paris with stunning city views, world-class amenities, and exceptional service.',
  hotelType: 'Luxury',
  starRating: 5,
  latitude: 48.8566,
  longitude: 2.3522,
  imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&auto=format&fit=crop',
  availableRooms: 15,
  cityId: 1,
  amenities: [
    { id: 1, name: 'Free WiFi', description: 'High-speed internet access' },
    { id: 2, name: 'Swimming Pool', description: 'Outdoor pool with city views' },
    { id: 3, name: 'Spa', description: 'Full-service spa and wellness center' },
    { id: 4, name: 'Restaurant', description: 'Fine dining restaurant' },
    { id: 5, name: 'Gym', description: '24/7 fitness center' },
  ],
  createdAt: '2024-01-15T10:00:00Z',
  updatedAt: '2024-11-01T14:30:00Z',
};

export const Default: Story = {
  args: {
    hotel: mockHotel,
  },
};
