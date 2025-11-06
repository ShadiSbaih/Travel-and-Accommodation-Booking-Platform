import type { Meta, StoryObj } from '@storybook/react';
import CartItemCard from './CartItemCard';
import type { CartItem } from '@/features/cart/types';

const meta: Meta<typeof CartItemCard> = {
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
};

export default meta;
type Story = StoryObj<typeof meta>;

const mockCartItem: CartItem = {
  id: '1-101',
  room: {
    roomId: 101,
    roomNumber: '205',
    roomPhotoUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&auto=format&fit=crop',
    roomType: 'Suite',
    capacityOfAdults: 2,
    capacityOfChildren: 1,
    roomAmenities: [],
    price: 250,
    availability: true,
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
};

/**
 * Default cart item
 */
export const Default: Story = {
  args: {
    item: mockCartItem,
  },
};
