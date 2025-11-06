import { loadCartFromStorage, saveCartToStorage, calculateTotals } from '../cart.utils';
import type { CartState, CartItem } from '../../types';

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

describe('cart utils', () => {
  beforeEach(() => {
    localStorageMock.clear();
  });

  describe('loadCartFromStorage', () => {
    it('should return empty cart when localStorage is empty', () => {
      const cart = loadCartFromStorage();
      expect(cart).toEqual({
        items: [],
        totalItems: 0,
        totalPrice: 0,
      });
    });

    it('should load cart from localStorage', () => {
      const mockCart: CartState = {
        items: [],
        totalItems: 1,
        totalPrice: 100,
      };
      localStorage.setItem('cart', JSON.stringify(mockCart));

      const cart = loadCartFromStorage();
      expect(cart).toEqual(mockCart);
    });

    it('should return empty cart on parse error', () => {
      localStorage.setItem('cart', 'invalid json');
      const cart = loadCartFromStorage();
      expect(cart).toEqual({
        items: [],
        totalItems: 0,
        totalPrice: 0,
      });
    });
  });

  describe('saveCartToStorage', () => {
    it('should save cart to localStorage', () => {
      const mockCart: CartState = {
        items: [],
        totalItems: 1,
        totalPrice: 100,
      };

      saveCartToStorage(mockCart);
      const saved = localStorage.getItem('cart');
      expect(JSON.parse(saved!)).toEqual(mockCart);
    });
  });

  describe('calculateTotals', () => {
    it('should return zero for empty cart', () => {
      const totals = calculateTotals([]);
      expect(totals).toEqual({
        totalItems: 0,
        totalPrice: 0,
      });
    });

    it('should calculate totals correctly', () => {
      const mockItems: CartItem[] = [
        {
          id: '1-1',
          room: {
            roomId: 1,
            roomNumber: '101',
            roomPhotoUrl: 'photo1.jpg',
            roomType: 'Deluxe',
            capacityOfAdults: 2,
            capacityOfChildren: 0,
            roomAmenities: [],
            price: 100,
            availability: true,
          },
          hotelId: 1,
          hotelName: 'Hotel 1',
          roomImage: 'img1.jpg',
          hotelAmenities: [],
          checkInDate: '2024-01-01',
          checkOutDate: '2024-01-02',
        },
        {
          id: '1-2',
          room: {
            roomId: 2,
            roomNumber: '102',
            roomPhotoUrl: 'photo2.jpg',
            roomType: 'Suite',
            capacityOfAdults: 2,
            capacityOfChildren: 1,
            roomAmenities: [],
            price: 150,
            availability: true,
          },
          hotelId: 1,
          hotelName: 'Hotel 1',
          roomImage: 'img2.jpg',
          hotelAmenities: [],
          checkInDate: '2024-01-01',
          checkOutDate: '2024-01-03',
        },
      ];

      const totals = calculateTotals(mockItems);
      expect(totals.totalItems).toBe(2);
      expect(totals.totalPrice).toBe(250); // 100 + 150
    });
  });
});
