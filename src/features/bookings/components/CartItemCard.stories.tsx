import type { Meta, StoryObj } from '@storybook/react';
import CartItemCard from './CartItemCard';
import type { CartItem } from '@/features/cart/types';

const meta = {
  title: 'Features/Bookings/CartItemCard',
  component: CartItemCard,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Shopping cart item card displaying room details, hotel information, check-in/out dates, amenities, pricing breakdown, and remove button. Used in the cart page.',
      },
    },
  },
  tags: ['autodocs'],
  args: {
    onRemove: (itemId: string) => alert(`Remove item: ${itemId}`),
  },
  argTypes: {
    item: {
      control: 'object',
      description: 'Cart item data including room, hotel, and booking details',
    },
    onRemove: {
      action: 'removed',
      description: 'Callback function when remove button is clicked',
    },
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '900px', padding: '20px' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof CartItemCard>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockCartItem: CartItem = {
  id: '1-101',
  room: {
    roomId: 101,
    roomNumber: 205,
    name: 'Deluxe Suite',
    type: 'Suite',
    price: 250,
    available: true,
    maxOccupancy: 3,
  },
  hotelId: 1,
  hotelName: 'Grand Plaza Hotel',
  roomImage: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&auto=format&fit=crop',
  hotelAmenities: [
    { id: 1, name: 'Free WiFi', description: 'High-speed internet' },
    { id: 2, name: 'Swimming Pool', description: 'Outdoor pool' },
    { id: 3, name: 'Gym', description: '24/7 fitness center' },
  ],
  checkInDate: '2025-11-15',
  checkOutDate: '2025-11-18',
  numberOfNights: 3,
};

/**
 * Default cart item
 */
export const Default: Story = {
  args: {
    item: mockCartItem,
  },
};

/**
 * Long stay (7 nights)
 */
export const LongStay: Story = {
  args: {
    item: {
      ...mockCartItem,
      id: '2-102',
      checkInDate: '2025-12-01',
      checkOutDate: '2025-12-08',
      numberOfNights: 7,
    },
  },
};

/**
 * Weekend getaway (2 nights)
 */
export const WeekendGetaway: Story = {
  args: {
    item: {
      ...mockCartItem,
      id: '3-103',
      room: {
        ...mockCartItem.room,
        name: 'Standard Room',
        type: 'Standard',
        price: 120,
        maxOccupancy: 2,
      },
      checkInDate: '2025-11-22',
      checkOutDate: '2025-11-24',
      numberOfNights: 2,
    },
  },
};

/**
 * Luxury suite with many amenities
 */
export const LuxuryItem: Story = {
  args: {
    item: {
      ...mockCartItem,
      id: '4-201',
      room: {
        ...mockCartItem.room,
        roomNumber: 601,
        name: 'Presidential Suite',
        type: 'Presidential',
        price: 800,
        maxOccupancy: 6,
      },
      hotelName: 'The Ritz Carlton',
      roomImage: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&auto=format&fit=crop',
      hotelAmenities: [
        { id: 1, name: 'Free WiFi', description: 'Ultra-fast internet' },
        { id: 2, name: 'Infinity Pool', description: 'Rooftop pool' },
        { id: 3, name: 'Spa', description: 'Full-service spa' },
        { id: 4, name: 'Private Beach', description: 'Beach access' },
        { id: 5, name: 'Butler Service', description: '24/7 butler' },
        { id: 6, name: 'Helipad', description: 'Helicopter access' },
      ],
      numberOfNights: 5,
    },
  },
};

/**
 * Budget room
 */
export const BudgetItem: Story = {
  args: {
    item: {
      ...mockCartItem,
      id: '5-105',
      room: {
        ...mockCartItem.room,
        roomNumber: 110,
        name: 'Economy Room',
        type: 'Economy',
        price: 75,
        maxOccupancy: 2,
      },
      hotelName: 'Comfort Inn',
      roomImage: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&auto=format&fit=crop',
      hotelAmenities: [
        { id: 1, name: 'Free WiFi', description: 'WiFi access' },
        { id: 2, name: 'Parking', description: 'Free parking' },
      ],
      checkInDate: '2025-11-10',
      checkOutDate: '2025-11-12',
      numberOfNights: 2,
    },
  },
};

/**
 * Family suite
 */
export const FamilyItem: Story = {
  args: {
    item: {
      ...mockCartItem,
      id: '6-301',
      room: {
        ...mockCartItem.room,
        roomNumber: 305,
        name: 'Family Suite',
        type: 'Family',
        price: 350,
        maxOccupancy: 5,
      },
      hotelName: 'Family Resort & Spa',
      roomImage: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&auto=format&fit=crop',
      hotelAmenities: [
        { id: 1, name: 'Kids Club', description: 'Supervised activities' },
        { id: 2, name: 'Water Park', description: 'On-site water park' },
        { id: 3, name: 'Game Room', description: 'Arcade games' },
        { id: 4, name: 'Family Pool', description: 'Kids pool' },
      ],
      checkInDate: '2025-12-20',
      checkOutDate: '2025-12-27',
      numberOfNights: 7,
    },
  },
};

/**
 * No amenities
 */
export const NoAmenities: Story = {
  args: {
    item: {
      ...mockCartItem,
      id: '7-107',
      hotelAmenities: [],
      room: {
        ...mockCartItem.room,
        name: 'Basic Room',
        type: 'Basic',
        price: 60,
      },
    },
  },
};

/**
 * Single night stay
 */
export const SingleNight: Story = {
  args: {
    item: {
      ...mockCartItem,
      id: '8-108',
      checkInDate: '2025-11-20',
      checkOutDate: '2025-11-21',
      numberOfNights: 1,
      room: {
        ...mockCartItem.room,
        name: 'Executive Room',
        type: 'Executive',
        price: 200,
      },
    },
  },
};

/**
 * No image (fallback)
 */
export const NoImage: Story = {
  args: {
    item: {
      ...mockCartItem,
      id: '9-109',
      roomImage: undefined,
    },
  },
};
