import type { Meta, StoryObj } from '@storybook/react';
import HotelListView from './HotelListView';
import type { Hotel } from '../types';

const meta: Meta<typeof HotelListView> = {
  title: 'Features/Admin/Hotels/HotelListView',
  component: HotelListView,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

const mockHotels: Hotel[] = [
  {
    id: 1,
    hotelName: 'Grand Plaza Hotel',
    name: 'Grand Plaza Hotel',
    location: 'Paris',
    description: 'A luxurious 5-star hotel in the heart of Paris',
    hotelType: 'Luxury',
    starRating: 5,
    latitude: 48.8566,
    longitude: 2.3522,
    imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
    availableRooms: 15,
    cityId: 1,
    amenities: [
      { id: 1, name: 'Free WiFi', description: 'High-speed internet' },
      { id: 2, name: 'Pool', description: 'Outdoor pool' },
    ],
  },
  {
    id: 2,
    hotelName: 'Seaside Resort',
    name: 'Seaside Resort',
    location: 'Maldives',
    description: 'Beautiful beachfront resort',
    hotelType: 'Resort',
    starRating: 5,
    latitude: 4.1755,
    longitude: 73.5093,
    imageUrl: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800',
    availableRooms: 8,
    cityId: 2,
    amenities: [
      { id: 1, name: 'Beach Access', description: 'Private beach' },
      { id: 3, name: 'Spa', description: 'Full spa service' },
    ],
  },
  {
    id: 3,
    hotelName: 'City Center Hotel',
    name: 'City Center Hotel',
    location: 'Tokyo',
    description: 'Modern hotel in downtown Tokyo',
    hotelType: 'Business',
    starRating: 4,
    latitude: 35.6762,
    longitude: 139.6503,
    imageUrl: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800',
    availableRooms: 22,
    cityId: 3,
    amenities: [
      { id: 1, name: 'Free WiFi', description: 'High-speed internet' },
      { id: 5, name: 'Gym', description: '24/7 fitness center' },
    ],
  },
];

export const Default: Story = {
  args: {
    hotels: mockHotels,
  },
};
