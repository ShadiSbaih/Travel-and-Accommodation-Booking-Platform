import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { CartState, CartItem, AddToCartPayload } from '../types';
import { loadCartFromStorage, saveCartToStorage, calculateTotals } from '../utils/cart.utils';

const initialState: CartState = loadCartFromStorage();

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<AddToCartPayload>) => {
      const {
        room,
        hotelId,
        hotelName,
        roomImage,
        hotelAmenities,
        checkInDate,
        checkOutDate,
        numberOfNights = 1,
      } = action.payload;

      // Generate unique ID based on room and hotel
      const itemId = `${hotelId}-${room.id}`;

      // Check if item already exists - if so, don't add again
      const existingItem = state.items.find((item) => item.id === itemId);

      if (!existingItem) {
        // Add new item (only once)
        const newItem: CartItem = {
          id: itemId,
          room,
          hotelId,
          hotelName,
          roomImage,
          hotelAmenities,
          checkInDate,
          checkOutDate,
          numberOfNights,
        };
        state.items.push(newItem);

        // Recalculate totals
        const totals = calculateTotals(state.items);
        state.totalItems = totals.totalItems;
        state.totalPrice = totals.totalPrice;

        // Save to localStorage
        saveCartToStorage(state);
      }
    },

    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);

      // Recalculate totals
      const totals = calculateTotals(state.items);
      state.totalItems = totals.totalItems;
      state.totalPrice = totals.totalPrice;

      // Save to localStorage
      saveCartToStorage(state);
    },

    clearCart: (state) => {
      state.items = [];
      state.totalItems = 0;
      state.totalPrice = 0;

      // Save to localStorage
      saveCartToStorage(state);
    },

    // Update dates for a cart item
    updateCartItemDates: (
      state,
      action: PayloadAction<{
        itemId: string;
        checkInDate: string;
        checkOutDate: string;
        numberOfNights: number;
      }>
    ) => {
      const { itemId, checkInDate, checkOutDate, numberOfNights } = action.payload;
      const item = state.items.find((item) => item.id === itemId);

      if (item) {
        item.checkInDate = checkInDate;
        item.checkOutDate = checkOutDate;
        item.numberOfNights = numberOfNights;

        // Recalculate totals
        const totals = calculateTotals(state.items);
        state.totalItems = totals.totalItems;
        state.totalPrice = totals.totalPrice;

        // Save to localStorage
        saveCartToStorage(state);
      }
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  clearCart,
  updateCartItemDates,
} = cartSlice.actions;

export default cartSlice.reducer;
