/**
 * Rooms Feature Exports
 */

// Components
export { default as RoomsPage } from './components/RoomsPage';
export { default as RoomCardSkeleton } from './components/RoomCardSkeleton';
export { default as RoomListSkeleton } from './components/RoomListSkeleton';

// Re-export from core (for backward compatibility)
export { roomsApi, useRooms, useRoom } from '../core';
export type { Room, RoomFilters, CreateRoomDto, UpdateRoomDto } from '../core';
