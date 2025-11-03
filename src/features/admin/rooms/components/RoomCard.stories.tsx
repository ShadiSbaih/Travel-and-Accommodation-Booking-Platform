import type { Meta, StoryObj } from '@storybook/react';
import RoomCard from './RoomCard';
import type { Room } from '../types';

const meta: Meta<typeof RoomCard> = {
  title: 'Features/Admin/Rooms/RoomCard',
  component: RoomCard,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '700px', padding: '20px' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

const mockRoom: Room = {
  roomId: 101,
  roomNumber: 205,
  roomPhotoUrl: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&auto=format&fit=crop',
  roomType: 'Deluxe Suite',
  capacityOfAdults: 2,
  capacityOfChildren: 1,
  price: 250,
  availability: true,
  hotelId: 1,
  amenities: [
    { id: 1, name: 'King Bed', description: 'Comfortable king-size bed' },
    { id: 2, name: 'City View', description: 'Beautiful city views' },
    { id: 3, name: 'Mini Bar', description: 'Stocked mini bar' },
    { id: 4, name: 'Balcony', description: 'Private balcony' },
  ],
  createdAt: '2024-01-15T10:00:00Z',
  updatedAt: '2024-11-01T14:30:00Z',
};

export const Default: Story = {
  args: {
    room: mockRoom,
  },
};
