import type { Meta, StoryObj } from '@storybook/react';
import RoomListView from './RoomListView';
import type { Room } from '../types';

const meta: Meta<typeof RoomListView> = {
  title: 'Features/Admin/Rooms/RoomListView',
  component: RoomListView,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

const mockRooms: Room[] = [
  {
    roomId: 101,
    roomNumber: 205,
    roomPhotoUrl: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800',
    roomType: 'Deluxe Suite',
    capacityOfAdults: 2,
    capacityOfChildren: 1,
    price: 250,
    availability: true,
    hotelId: 1,
    amenities: [
      { id: 1, name: 'King Bed', description: 'Comfortable king-size bed' },
      { id: 2, name: 'City View', description: 'Beautiful city views' },
    ],
  },
  {
    roomId: 102,
    roomNumber: 310,
    roomPhotoUrl: 'https://images.unsplash.com/photo-1591088398332-8a7791972843?w=800',
    roomType: 'Standard Room',
    capacityOfAdults: 2,
    capacityOfChildren: 0,
    price: 150,
    availability: true,
    hotelId: 1,
    amenities: [
      { id: 1, name: 'Queen Bed', description: 'Comfortable queen-size bed' },
    ],
  },
  {
    roomId: 103,
    roomNumber: 405,
    roomPhotoUrl: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800',
    roomType: 'Presidential Suite',
    capacityOfAdults: 4,
    capacityOfChildren: 2,
    price: 500,
    availability: false,
    hotelId: 1,
    amenities: [
      { id: 1, name: 'King Bed', description: 'Comfortable king-size bed' },
      { id: 2, name: 'Ocean View', description: 'Stunning ocean views' },
      { id: 3, name: 'Jacuzzi', description: 'Private jacuzzi' },
    ],
  },
  {
    roomId: 104,
    roomNumber: 210,
    roomPhotoUrl: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800',
    roomType: 'Family Room',
    capacityOfAdults: 3,
    capacityOfChildren: 2,
    price: 300,
    availability: true,
    hotelId: 1,
    amenities: [
      { id: 1, name: 'Two Queen Beds', description: 'Two comfortable queen beds' },
      { id: 4, name: 'Balcony', description: 'Private balcony' },
    ],
  },
];

export const Default: Story = {
  args: {
    rooms: mockRooms,
  },
};
