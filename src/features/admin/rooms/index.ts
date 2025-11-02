/**
 * Rooms Feature Exports
 */

export { default as RoomsPage } from './components/RoomsPage';
export { default as RoomCardSkeleton } from './components/RoomCardSkeleton';
export { default as RoomListSkeleton } from './components/RoomListSkeleton';
export { roomsApi } from './api/rooms.api';
export { useRooms, useRoom } from './hooks/useRooms';
export type { Room, RoomFilters, CreateRoomDto, UpdateRoomDto } from './types';
