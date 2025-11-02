import type { City } from '../types';

/**
 * Utility functions for Cities Admin Module
 */

/**
 * Remove duplicate cities by ID
 * @param cities - Array of cities
 * @returns Array of unique cities
 */
export const removeDuplicateCities = (cities: City[]): City[] => {
  const seen = new Set<number>();
  return cities.filter((city) => {
    if (seen.has(city.id)) {
      return false;
    }
    seen.add(city.id);
    return true;
  });
};

/**
 * Filter cities by search query
 * @param cities - Array of cities
 * @param query - Search query
 * @returns Filtered cities
 */
export const filterCitiesByQuery = (cities: City[], query: string): City[] => {
  if (!query.trim()) return cities;

  const lowerQuery = query.toLowerCase().trim();
  return cities.filter((city) => city.name.toLowerCase().includes(lowerQuery));
};
