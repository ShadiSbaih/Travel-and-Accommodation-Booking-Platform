/**
 * Cart utility functions
 */

import type { CartState, CartItem } from '../types';

/**
 * Load cart data from localStorage
 * @returns Cart state from localStorage or initial empty state
 */
export const loadCartFromStorage = (): CartState => {
  try {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      return JSON.parse(savedCart);
    }
  } catch (error) {
    console.error('Failed to load cart from localStorage:', error);
  }
  return {
    items: [],
    totalItems: 0,
    totalPrice: 0,
  };
};

/**
 * Save cart data to localStorage
 * @param state - Cart state to save
 */
export const saveCartToStorage = (state: CartState): void => {
  try {
    localStorage.setItem('cart', JSON.stringify(state));
  } catch (error) {
    console.error('Failed to save cart to localStorage:', error);
  }
};

/**
 * Calculate cart totals (items count and total price)
 * @param items - Array of cart items
 * @returns Object with totalItems and totalPrice
 */
export const calculateTotals = (items: CartItem[]): { totalItems: number; totalPrice: number } => {
  const totalItems = items.length;
  const totalPrice = items.reduce(
    (sum, item) => sum + item.room.price,
    0
  );
  return { totalItems, totalPrice };
};
