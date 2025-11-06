import cartReducer, {
  addToCart,
  removeFromCart,
  clearCart,
  updateCartItemDates,
} from '../cartSlice';
import type { CartState } from '../../types';

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

describe('cartSlice', () => {
  beforeEach(() => {
    localStorageMock.clear();
  });

  const initialState: CartState = {
    items: [],
    totalItems: 0,
    totalPrice: 0,
  };

  const mockRoom = {
    roomId: 1,
    roomNumber: '101',
    roomPhotoUrl: 'photo.jpg',
    roomType: 'Deluxe',
    capacityOfAdults: 2,
    capacityOfChildren: 1,
    roomAmenities: [],
    price: 100,
    availability: true,
  };

  const mockCartPayload = {
    room: mockRoom,
    hotelId: 1,
    hotelName: 'Test Hotel',
    roomImage: 'test.jpg',
    hotelAmenities: [],
    checkInDate: '2024-01-01',
    checkOutDate: '2024-01-02',
  };

  it('should return initial state', () => {
    expect(cartReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should add item to cart', () => {
    const state = cartReducer(initialState, addToCart(mockCartPayload));

    expect(state.items).toHaveLength(1);
    expect(state.items[0].hotelName).toBe('Test Hotel');
    expect(state.totalItems).toBe(1);
    expect(state.totalPrice).toBe(100);
  });

  it('should not add duplicate items', () => {
    let state = cartReducer(initialState, addToCart(mockCartPayload));
    state = cartReducer(state, addToCart(mockCartPayload));

    expect(state.items).toHaveLength(1);
    expect(state.totalItems).toBe(1);
  });

  it('should remove item from cart', () => {
    let state = cartReducer(initialState, addToCart(mockCartPayload));
    const itemId = state.items[0].id;
    state = cartReducer(state, removeFromCart(itemId));

    expect(state.items).toHaveLength(0);
    expect(state.totalItems).toBe(0);
    expect(state.totalPrice).toBe(0);
  });

  it('should clear cart', () => {
    let state = cartReducer(initialState, addToCart(mockCartPayload));
    state = cartReducer(state, clearCart());

    expect(state.items).toHaveLength(0);
    expect(state.totalItems).toBe(0);
    expect(state.totalPrice).toBe(0);
  });

  it('should update cart item dates', () => {
    let state = cartReducer(initialState, addToCart(mockCartPayload));
    const itemId = state.items[0].id;

    state = cartReducer(
      state,
      updateCartItemDates({
        itemId,
        checkInDate: '2024-02-01',
        checkOutDate: '2024-02-05',
      })
    );

    expect(state.items[0].checkInDate).toBe('2024-02-01');
    expect(state.items[0].checkOutDate).toBe('2024-02-05');
  });

  it('should calculate totals correctly with multiple items', () => {
    let state = cartReducer(initialState, addToCart(mockCartPayload));

    const secondPayload = {
      ...mockCartPayload,
      room: { ...mockRoom, roomId: 2, price: 150 },
      hotelId: 2,
    };

    state = cartReducer(state, addToCart(secondPayload));

    expect(state.items).toHaveLength(2);
    expect(state.totalItems).toBe(2);
    expect(state.totalPrice).toBe(250);
  });
});
