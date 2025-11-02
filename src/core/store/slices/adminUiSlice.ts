/**
 * Admin UI State Management Slice
 * Manages UI state for admin pages (dialogs, view modes, selections, etc.)
 */

import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Room } from '@/features/admin/rooms/types';
import type { Hotel } from '@/features/admin/hotels/types';
import type { City } from '@/features/admin/cities/types';

export type AdminViewMode = 'grid' | 'list';

interface AdminUiState {
  // Rooms
  rooms: {
    viewMode: AdminViewMode;
    selectedRoom: Room | null;
    isDialogOpen: boolean;
    searchQuery: string;
    displayCount: number;
  };
  // Hotels
  hotels: {
    viewMode: AdminViewMode;
    selectedHotel: Hotel | null;
    isDialogOpen: boolean;
    searchQuery: string;
    displayCount: number;
  };
  // Cities
  cities: {
    viewMode: AdminViewMode;
    selectedCity: City | null;
    isDialogOpen: boolean;
    searchQuery: string;
    displayCount: number;
  };
}

const ITEMS_PER_PAGE = 12;

const initialState: AdminUiState = {
  rooms: {
    viewMode: 'grid',
    selectedRoom: null,
    isDialogOpen: false,
    searchQuery: '',
    displayCount: ITEMS_PER_PAGE,
  },
  hotels: {
    viewMode: 'grid',
    selectedHotel: null,
    isDialogOpen: false,
    searchQuery: '',
    displayCount: ITEMS_PER_PAGE,
  },
  cities: {
    viewMode: 'grid',
    selectedCity: null,
    isDialogOpen: false,
    searchQuery: '',
    displayCount: ITEMS_PER_PAGE,
  },
};

const adminUiSlice = createSlice({
  name: 'adminUi',
  initialState,
  reducers: {
    // Rooms actions
    setRoomsViewMode: (state, action: PayloadAction<AdminViewMode>) => {
      state.rooms.viewMode = action.payload;
    },
    setSelectedRoom: (state, action: PayloadAction<Room | null>) => {
      state.rooms.selectedRoom = action.payload;
    },
    openRoomDialog: (state, action: PayloadAction<Room | null>) => {
      state.rooms.selectedRoom = action.payload;
      state.rooms.isDialogOpen = true;
    },
    closeRoomDialog: (state) => {
      state.rooms.isDialogOpen = false;
      state.rooms.selectedRoom = null;
    },
    setRoomsSearchQuery: (state, action: PayloadAction<string>) => {
      state.rooms.searchQuery = action.payload;
      state.rooms.displayCount = ITEMS_PER_PAGE;
    },
    incrementRoomsDisplayCount: (state) => {
      state.rooms.displayCount += ITEMS_PER_PAGE;
    },
    resetRoomsDisplayCount: (state) => {
      state.rooms.displayCount = ITEMS_PER_PAGE;
    },

    // Hotels actions
    setHotelsViewMode: (state, action: PayloadAction<AdminViewMode>) => {
      state.hotels.viewMode = action.payload;
    },
    setSelectedHotel: (state, action: PayloadAction<Hotel | null>) => {
      state.hotels.selectedHotel = action.payload;
    },
    openHotelDialog: (state, action: PayloadAction<Hotel | null>) => {
      state.hotels.selectedHotel = action.payload;
      state.hotels.isDialogOpen = true;
    },
    closeHotelDialog: (state) => {
      state.hotels.isDialogOpen = false;
      state.hotels.selectedHotel = null;
    },
    setHotelsSearchQuery: (state, action: PayloadAction<string>) => {
      state.hotels.searchQuery = action.payload;
      state.hotels.displayCount = ITEMS_PER_PAGE;
    },
    incrementHotelsDisplayCount: (state) => {
      state.hotels.displayCount += ITEMS_PER_PAGE;
    },
    resetHotelsDisplayCount: (state) => {
      state.hotels.displayCount = ITEMS_PER_PAGE;
    },

    // Cities actions
    setCitiesViewMode: (state, action: PayloadAction<AdminViewMode>) => {
      state.cities.viewMode = action.payload;
    },
    setSelectedCity: (state, action: PayloadAction<City | null>) => {
      state.cities.selectedCity = action.payload;
    },
    openCityDialog: (state, action: PayloadAction<City | null>) => {
      state.cities.selectedCity = action.payload;
      state.cities.isDialogOpen = true;
    },
    closeCityDialog: (state) => {
      state.cities.isDialogOpen = false;
      state.cities.selectedCity = null;
    },
    setCitiesSearchQuery: (state, action: PayloadAction<string>) => {
      state.cities.searchQuery = action.payload;
      state.cities.displayCount = ITEMS_PER_PAGE;
    },
    incrementCitiesDisplayCount: (state) => {
      state.cities.displayCount += ITEMS_PER_PAGE;
    },
    resetCitiesDisplayCount: (state) => {
      state.cities.displayCount = ITEMS_PER_PAGE;
    },
  },
});

export const {
  // Rooms
  setRoomsViewMode,
  setSelectedRoom,
  openRoomDialog,
  closeRoomDialog,
  setRoomsSearchQuery,
  incrementRoomsDisplayCount,
  resetRoomsDisplayCount,
  // Hotels
  setHotelsViewMode,
  setSelectedHotel,
  openHotelDialog,
  closeHotelDialog,
  setHotelsSearchQuery,
  incrementHotelsDisplayCount,
  resetHotelsDisplayCount,
  // Cities
  setCitiesViewMode,
  setSelectedCity,
  openCityDialog,
  closeCityDialog,
  setCitiesSearchQuery,
  incrementCitiesDisplayCount,
  resetCitiesDisplayCount,
} = adminUiSlice.actions;

export default adminUiSlice.reducer;
