import type { Meta, StoryObj } from '@storybook/react';
import RoomCard from './RoomCard';
import type { AvailableRoom } from '../../types';

const meta = {
  title: 'Features/Hotels/RoomCard',
  component: RoomCard,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Room card displaying room details including type, capacity, amenities, price, and availability. Used in hotel details pages to show available rooms with "Add to Cart" functionality.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    room: {
      control: 'object',
      description: 'Available room data including capacity, amenities, and pricing',
    },
    onBookNow: {
      control: false,
      description: 'Callback function when Add to Cart/Remove from Cart is clicked',
    },
    isInCart: {
      control: 'boolean',
      description: 'Whether the room is currently in the shopping cart',
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: '420px', padding: '20px' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof RoomCard>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockRoom: AvailableRoom = {
  roomId: 1,
  roomNumber: '101',
  roomPhotoUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&auto=format&fit=crop',
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

/**
 * Default available room
 */
export const Default: Story = {
  args: {
    room: mockRoom,
    onBookNow: (roomId) => alert(`Add to cart room: ${roomId}`),
    isInCart: false,
  },
};

/**
 * Room already in cart
 */
export const InCart: Story = {
  args: {
    room: mockRoom,
    onBookNow: (roomId) => alert(`Remove from cart room: ${roomId}`),
    isInCart: true,
  },
};

/**
 * Unavailable room
 */
export const Unavailable: Story = {
  args: {
    room: {
      ...mockRoom,
      roomId: 2,
      roomNumber: '102',
      availability: false,
    },
    onBookNow: (roomId) => alert(`Room unavailable: ${roomId}`),
    isInCart: false,
  },
};

/**
 * Luxury suite with many amenities
 */
export const LuxurySuite: Story = {
  args: {
    room: {
      roomId: 3,
      roomNumber: '501',
      roomPhotoUrl: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&auto=format&fit=crop',
      roomType: 'Presidential Suite',
      capacityOfAdults: 4,
      capacityOfChildren: 2,
      roomAmenities: [
        { id: 1, name: 'Free WiFi', description: 'Ultra-fast internet' },
        { id: 2, name: 'Jacuzzi', description: 'Private jacuzzi' },
        { id: 3, name: 'Kitchen', description: 'Full kitchen' },
        { id: 4, name: 'Balcony', description: 'Private balcony' },
        { id: 5, name: 'Smart TV', description: '75" Smart TV' },
        { id: 6, name: 'Butler', description: 'Personal butler' },
      ],
      price: 800,
      availability: true,
    },
    onBookNow: (roomId) => alert(`Add to cart room: ${roomId}`),
    isInCart: false,
  },
};

/**
 * Budget standard room
 */
export const StandardRoom: Story = {
  args: {
    room: {
      roomId: 4,
      roomNumber: '201',
      roomPhotoUrl: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&auto=format&fit=crop',
      roomType: 'Standard Room',
      capacityOfAdults: 2,
      capacityOfChildren: 0,
      roomAmenities: [
        { id: 1, name: 'Free WiFi', description: 'WiFi access' },
        { id: 2, name: 'TV', description: 'Cable TV' },
      ],
      price: 100,
      availability: true,
    },
    onBookNow: (roomId) => alert(`Add to cart room: ${roomId}`),
    isInCart: false,
  },
};

/**
 * Family room with high capacity
 */
export const FamilyRoom: Story = {
  args: {
    room: {
      roomId: 5,
      roomNumber: '305',
      roomPhotoUrl: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&auto=format&fit=crop',
      roomType: 'Family Suite',
      capacityOfAdults: 4,
      capacityOfChildren: 3,
      roomAmenities: [
        { id: 1, name: 'Free WiFi', description: 'High-speed internet' },
        { id: 2, name: 'Kids Area', description: 'Play area' },
        { id: 3, name: 'Kitchenette', description: 'Small kitchen' },
        { id: 4, name: 'Game Console', description: 'Gaming system' },
      ],
      price: 350,
      availability: true,
    },
    onBookNow: (roomId) => alert(`Add to cart room: ${roomId}`),
    isInCart: false,
  },
};

/**
 * Single occupancy room
 */
export const SingleRoom: Story = {
  args: {
    room: {
      roomId: 6,
      roomNumber: '108',
      roomPhotoUrl: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&auto=format&fit=crop',
      roomType: 'Single Room',
      capacityOfAdults: 1,
      capacityOfChildren: 0,
      roomAmenities: [
        { id: 1, name: 'Free WiFi', description: 'WiFi access' },
        { id: 2, name: 'Workspace', description: 'Work desk' },
        { id: 3, name: 'Coffee Maker', description: 'In-room coffee' },
      ],
      price: 80,
      availability: true,
    },
    onBookNow: (roomId) => alert(`Add to cart room: ${roomId}`),
    isInCart: false,
  },
};

/**
 * Honeymoon suite
 */
export const HoneymoonSuite: Story = {
  args: {
    room: {
      roomId: 7,
      roomNumber: '601',
      roomPhotoUrl: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&auto=format&fit=crop',
      roomType: 'Honeymoon Suite',
      capacityOfAdults: 2,
      capacityOfChildren: 0,
      roomAmenities: [
        { id: 1, name: 'King Bed', description: 'Luxury king bed' },
        { id: 2, name: 'Jacuzzi', description: 'Private jacuzzi' },
        { id: 3, name: 'Champagne', description: 'Complimentary champagne' },
        { id: 4, name: 'Rose Petals', description: 'Romantic setup' },
        { id: 5, name: 'City View', description: 'Panoramic views' },
      ],
      price: 450,
      availability: true,
    },
    onBookNow: (roomId) => alert(`Add to cart room: ${roomId}`),
    isInCart: false,
  },
};

/**
 * No amenities (edge case)
 */
export const NoAmenities: Story = {
  args: {
    room: {
      roomId: 8,
      roomNumber: '105',
      roomPhotoUrl: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&auto=format&fit=crop',
      roomType: 'Basic Room',
      capacityOfAdults: 2,
      capacityOfChildren: 0,
      roomAmenities: [],
      price: 60,
      availability: true,
    },
    onBookNow: (roomId) => alert(`Add to cart room: ${roomId}`),
    isInCart: false,
  },
};

/**
 * Large capacity room
 */
export const LargeCapacity: Story = {
  args: {
    room: {
      roomId: 9,
      roomNumber: '401',
      roomPhotoUrl: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800&auto=format&fit=crop',
      roomType: 'Group Suite',
      capacityOfAdults: 6,
      capacityOfChildren: 4,
      roomAmenities: [
        { id: 1, name: 'Free WiFi', description: 'High-speed internet' },
        { id: 2, name: 'Multiple Beds', description: '3 bedrooms' },
        { id: 3, name: 'Living Room', description: 'Spacious living area' },
        { id: 4, name: 'Kitchen', description: 'Full kitchen' },
      ],
      price: 600,
      availability: true,
    },
    onBookNow: (roomId) => alert(`Add to cart room: ${roomId}`),
    isInCart: false,
  },
};
