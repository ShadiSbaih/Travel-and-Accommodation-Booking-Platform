/**
 * Rooms Feature Exports
 */

export { default as RoomsPage } from './components/RoomsPage';
export { roomsApi } from './api/rooms.api';
export { useRooms, useRoom } from './hooks/useRooms';
export type { Room, RoomFilters, CreateRoomDto, UpdateRoomDto } from './types';
