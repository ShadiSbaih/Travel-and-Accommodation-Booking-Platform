import reducer, {
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
} from '../adminUiSlice';
import type { Room } from '@/features/admin/rooms/types';
import type { Hotel } from '@/features/admin/hotels/types';
import type { City } from '@/features/admin/cities/types';

describe('adminUiSlice', () => {
  const initialState = {
    rooms: {
      viewMode: 'grid' as const,
      selectedRoom: null,
      isDialogOpen: false,
      searchQuery: '',
      displayCount: 12,
    },
    hotels: {
      viewMode: 'grid' as const,
      selectedHotel: null,
      isDialogOpen: false,
      searchQuery: '',
      displayCount: 12,
    },
    cities: {
      viewMode: 'grid' as const,
      selectedCity: null,
      isDialogOpen: false,
      searchQuery: '',
      displayCount: 12,
    },
  };

  const mockRoom: Room = {
    roomId: 1,
    roomNumber: 101,
    roomType: 'Deluxe',
    price: 200,
    capacityOfAdults: 2,
    capacityOfChildren: 1,
    availability: true,
  };

  const mockHotel: Hotel = {
    id: 1,
    hotelName: 'Test Hotel',
    name: 'Test Hotel',
    location: 'Dubai',
    description: 'Test Description',
    hotelType: 'Resort',
    starRating: 5,
    latitude: 25.2048,
    longitude: 55.2708,
    availableRooms: 10,
    cityId: 1,
  };

  const mockCity: City = {
    id: 1,
    name: 'Dubai',
    description: 'City description',
  };

  describe('initial state', () => {
    it('should return the initial state', () => {
      expect(reducer(undefined, { type: 'unknown' })).toEqual(initialState);
    });
  });

  describe('rooms actions', () => {
    it('should handle setRoomsViewMode', () => {
      const actual = reducer(initialState, setRoomsViewMode('list'));
      expect(actual.rooms.viewMode).toBe('list');
    });

    it('should handle setSelectedRoom', () => {
      const actual = reducer(initialState, setSelectedRoom(mockRoom));
      expect(actual.rooms.selectedRoom).toEqual(mockRoom);
    });

    it('should handle openRoomDialog', () => {
      const actual = reducer(initialState, openRoomDialog(mockRoom));
      expect(actual.rooms.isDialogOpen).toBe(true);
      expect(actual.rooms.selectedRoom).toEqual(mockRoom);
    });

    it('should handle openRoomDialog with null', () => {
      const actual = reducer(initialState, openRoomDialog(null));
      expect(actual.rooms.isDialogOpen).toBe(true);
      expect(actual.rooms.selectedRoom).toBeNull();
    });

    it('should handle closeRoomDialog', () => {
      const stateWithOpenDialog = {
        ...initialState,
        rooms: {
          ...initialState.rooms,
          isDialogOpen: true,
          selectedRoom: mockRoom,
        },
      };
      const actual = reducer(stateWithOpenDialog, closeRoomDialog());
      expect(actual.rooms.isDialogOpen).toBe(false);
      expect(actual.rooms.selectedRoom).toBeNull();
    });

    it('should handle setRoomsSearchQuery', () => {
      const actual = reducer(initialState, setRoomsSearchQuery('test search'));
      expect(actual.rooms.searchQuery).toBe('test search');
      expect(actual.rooms.displayCount).toBe(12);
    });

    it('should handle incrementRoomsDisplayCount', () => {
      const actual = reducer(initialState, incrementRoomsDisplayCount());
      expect(actual.rooms.displayCount).toBe(24);
    });

    it('should handle resetRoomsDisplayCount', () => {
      const stateWithIncrementedCount = {
        ...initialState,
        rooms: { ...initialState.rooms, displayCount: 36 },
      };
      const actual = reducer(stateWithIncrementedCount, resetRoomsDisplayCount());
      expect(actual.rooms.displayCount).toBe(12);
    });
  });

  describe('hotels actions', () => {
    it('should handle setHotelsViewMode', () => {
      const actual = reducer(initialState, setHotelsViewMode('list'));
      expect(actual.hotels.viewMode).toBe('list');
    });

    it('should handle setSelectedHotel', () => {
      const actual = reducer(initialState, setSelectedHotel(mockHotel));
      expect(actual.hotels.selectedHotel).toEqual(mockHotel);
    });

    it('should handle openHotelDialog', () => {
      const actual = reducer(initialState, openHotelDialog(mockHotel));
      expect(actual.hotels.isDialogOpen).toBe(true);
      expect(actual.hotels.selectedHotel).toEqual(mockHotel);
    });

    it('should handle closeHotelDialog', () => {
      const stateWithOpenDialog = {
        ...initialState,
        hotels: {
          ...initialState.hotels,
          isDialogOpen: true,
          selectedHotel: mockHotel,
        },
      };
      const actual = reducer(stateWithOpenDialog, closeHotelDialog());
      expect(actual.hotels.isDialogOpen).toBe(false);
      expect(actual.hotels.selectedHotel).toBeNull();
    });

    it('should handle setHotelsSearchQuery', () => {
      const actual = reducer(initialState, setHotelsSearchQuery('luxury'));
      expect(actual.hotels.searchQuery).toBe('luxury');
      expect(actual.hotels.displayCount).toBe(12);
    });

    it('should handle incrementHotelsDisplayCount', () => {
      const actual = reducer(initialState, incrementHotelsDisplayCount());
      expect(actual.hotels.displayCount).toBe(24);
    });

    it('should handle resetHotelsDisplayCount', () => {
      const stateWithIncrementedCount = {
        ...initialState,
        hotels: { ...initialState.hotels, displayCount: 36 },
      };
      const actual = reducer(stateWithIncrementedCount, resetHotelsDisplayCount());
      expect(actual.hotels.displayCount).toBe(12);
    });
  });

  describe('cities actions', () => {
    it('should handle setCitiesViewMode', () => {
      const actual = reducer(initialState, setCitiesViewMode('list'));
      expect(actual.cities.viewMode).toBe('list');
    });

    it('should handle setSelectedCity', () => {
      const actual = reducer(initialState, setSelectedCity(mockCity));
      expect(actual.cities.selectedCity).toEqual(mockCity);
    });

    it('should handle openCityDialog', () => {
      const actual = reducer(initialState, openCityDialog(mockCity));
      expect(actual.cities.isDialogOpen).toBe(true);
      expect(actual.cities.selectedCity).toEqual(mockCity);
    });

    it('should handle closeCityDialog', () => {
      const stateWithOpenDialog = {
        ...initialState,
        cities: {
          ...initialState.cities,
          isDialogOpen: true,
          selectedCity: mockCity,
        },
      };
      const actual = reducer(stateWithOpenDialog, closeCityDialog());
      expect(actual.cities.isDialogOpen).toBe(false);
      expect(actual.cities.selectedCity).toBeNull();
    });

    it('should handle setCitiesSearchQuery', () => {
      const actual = reducer(initialState, setCitiesSearchQuery('dubai'));
      expect(actual.cities.searchQuery).toBe('dubai');
      expect(actual.cities.displayCount).toBe(12);
    });

    it('should handle incrementCitiesDisplayCount', () => {
      const actual = reducer(initialState, incrementCitiesDisplayCount());
      expect(actual.cities.displayCount).toBe(24);
    });

    it('should handle resetCitiesDisplayCount', () => {
      const stateWithIncrementedCount = {
        ...initialState,
        cities: { ...initialState.cities, displayCount: 48 },
      };
      const actual = reducer(stateWithIncrementedCount, resetCitiesDisplayCount());
      expect(actual.cities.displayCount).toBe(12);
    });
  });

  describe('combined operations', () => {
    it('should handle multiple room operations', () => {
      let state = reducer(initialState, setRoomsViewMode('list'));
      state = reducer(state, setRoomsSearchQuery('deluxe'));
      state = reducer(state, openRoomDialog(mockRoom));

      expect(state.rooms.viewMode).toBe('list');
      expect(state.rooms.searchQuery).toBe('deluxe');
      expect(state.rooms.isDialogOpen).toBe(true);
      expect(state.rooms.selectedRoom).toEqual(mockRoom);
    });

    it('should not affect other entities when updating rooms', () => {
      const actual = reducer(initialState, setRoomsViewMode('list'));
      expect(actual.hotels.viewMode).toBe('grid');
      expect(actual.cities.viewMode).toBe('grid');
    });

    it('should handle incrementing display count multiple times', () => {
      let state = reducer(initialState, incrementRoomsDisplayCount());
      state = reducer(state, incrementRoomsDisplayCount());
      state = reducer(state, incrementRoomsDisplayCount());

      expect(state.rooms.displayCount).toBe(48); // 12 + 12 + 12 + 12
    });
  });
});
