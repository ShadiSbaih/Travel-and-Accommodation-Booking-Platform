import type { Room } from '../types';

/**
 * Utility functions for Rooms Admin Module
 */

/**
 * Remove duplicate rooms by roomId
 * @param rooms - Array of rooms
 * @returns Array of unique rooms
 */
export const removeDuplicateRooms = (rooms: Room[]): Room[] => {
  const seen = new Set<number>();
  return rooms.filter((room) => {
    if (seen.has(room.roomId)) {
      return false;
    }
    seen.add(room.roomId);
    return true;
  });
};

/**
 * Format room display name
 * @param room - Room object
 * @returns Formatted room name
 */
export const formatRoomName = (room: Room): string => {
  return `${room.roomType} Room #${room.roomNumber}`;
};

/**
 * Get room availability text
 * @param available - Availability status
 * @returns Availability text
 */
export const getAvailabilityText = (available: boolean): string => {
  return available ? 'Available' : 'Unavailable';
};
