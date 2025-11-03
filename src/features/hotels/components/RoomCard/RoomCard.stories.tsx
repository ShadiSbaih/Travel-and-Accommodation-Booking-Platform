import type { Meta, StoryObj } from '@storybook/react';
import RoomCard from './RoomCard';
import type { AvailableRoom } from '../../types';

const meta: Meta<typeof RoomCard> = {
  title: 'Features/Hotels/RoomCard',
  component: RoomCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ width: '420px', padding: '20px' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

const mockRoom: AvailableRoom = {
  roomId: 1,
  roomNumber: '101',
  roomPhotoUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
  roomType: 'Deluxe Suite',
  capacityOfAdults: 2,
  capacityOfChildren: 1,
  roomAmenities: [
    { id: 1, name: 'Free WiFi', description: 'High-speed internet' },
    { id: 2, name: 'Air Conditioning', description: 'Climate control' },
    { id: 3, name: 'Mini Bar', description: 'Stocked mini bar' },
    { id: 4, name: 'Safe', description: 'In-room safe' },
  ],
  price: 250,
  availability: true,
};

export const Default: Story = {
  args: {
    room: mockRoom,
    onBookNow: (roomId) => alert(`Add to cart room: ${roomId}`),
    isInCart: false,
  },
};
