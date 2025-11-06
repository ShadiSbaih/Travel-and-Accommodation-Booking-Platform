import { renderHook, act } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { useCart } from '../useCart';
import cartReducer from '../../store/cartSlice';
import type { AvailableRoom } from '@/features/hotels/types';
import type { AddToCartPayload } from '../../types';

const createMockStore = () => {
  return configureStore({
    reducer: {
      cart: cartReducer,
    },
  });
};

interface WrapperProps {
  children: React.ReactNode;
}

const wrapper = ({ children }: WrapperProps) => (
  <Provider store={createMockStore()}>{children}</Provider>
);

describe('useCart', () => {
  const mockRoom: AvailableRoom = {
    roomId: 101,
    roomNumber: '101',
    roomType: 'Deluxe',
    roomPhotoUrl: 'photo.jpg',
    capacityOfAdults: 2,
    capacityOfChildren: 1,
    roomAmenities: [],
    price: 200,
    availability: true,
  };

  const mockCartPayload: AddToCartPayload = {
    room: mockRoom,
    hotelId: 1,
    hotelName: 'Test Hotel',
    roomImage: 'photo.jpg',
    checkInDate: '2024-01-15',
    checkOutDate: '2024-01-20',
  };

  it('should return initial cart state', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    expect(result.current.items).toEqual([]);
    expect(result.current.totalItems).toBe(0);
    expect(result.current.totalPrice).toBe(0);
  });

  it('should add item to cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addToCart(mockCartPayload);
    });

    expect(result.current.items).toHaveLength(1);
    expect(result.current.totalItems).toBe(1);
    expect(result.current.items[0].hotelId).toBe(1);
  });

  it('should remove item from cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addToCart(mockCartPayload);
    });

    expect(result.current.items).toHaveLength(1);

    const itemId = result.current.items[0].id;

    act(() => {
      result.current.removeFromCart(itemId);
    });

    expect(result.current.items).toHaveLength(0);
    expect(result.current.totalItems).toBe(0);
  });

  it('should clear entire cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    const mockRoom2: AvailableRoom = {
      ...mockRoom,
      roomId: 102,
      roomNumber: '102',
    };

    act(() => {
      result.current.addToCart(mockCartPayload);
      result.current.addToCart({ ...mockCartPayload, room: mockRoom2, hotelId: 2 });
    });

    expect(result.current.items).toHaveLength(2);

    act(() => {
      result.current.clearCart();
    });

    expect(result.current.items).toHaveLength(0);
    expect(result.current.totalItems).toBe(0);
    expect(result.current.totalPrice).toBe(0);
  });

  it('should update cart item dates', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addToCart(mockCartPayload);
    });

    const itemId = result.current.items[0].id;

    act(() => {
      result.current.updateCartItemDates(itemId, '2024-02-01', '2024-02-10');
    });

    expect(result.current.items[0].checkInDate).toBe('2024-02-01');
    expect(result.current.items[0].checkOutDate).toBe('2024-02-10');
  });

  it('should check if item is in cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    expect(result.current.isInCart(1, 101)).toBe(false);

    act(() => {
      result.current.addToCart(mockCartPayload);
    });

    // Get the actual roomId from the added item
    const addedItem = result.current.items[0];
    const actualRoomId = addedItem.room.roomId;

    expect(result.current.isInCart(1, actualRoomId)).toBe(true);
    expect(result.current.isInCart(2, 102)).toBe(false);
  });

  it('should calculate total price correctly', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    const mockRoom2: AvailableRoom = {
      ...mockRoom,
      roomId: 102,
      roomNumber: '102',
      price: 150,
    };

    act(() => {
      result.current.addToCart(mockCartPayload); // 200
      result.current.addToCart({
        ...mockCartPayload,
        room: mockRoom2,
        hotelId: 2,
      }); // 150
    });

    expect(result.current.totalPrice).toBe(350); // 200 + 150
  });

  it('should not add duplicate items', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addToCart(mockCartPayload);
      result.current.addToCart(mockCartPayload); // Try to add same item again
    });

    expect(result.current.items).toHaveLength(1);
    expect(result.current.totalItems).toBe(1);
  });
});
