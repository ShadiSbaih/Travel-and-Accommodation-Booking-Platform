/**
 * Search bar utility functions
 */

import { parseISO } from 'date-fns';
import type { SearchFormData } from '../types';

/**
 * Creates default dates for search (today and tomorrow)
 * @returns Object with today and tomorrow dates
 */
export const getDefaultDates = () => {
  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);
  return { today, tomorrow };
};

/**
 * Gets initial state from URL search params or defaults
 * @param searchParams - URLSearchParams object
 * @returns Initial search form data
 */
export const getInitialSearchState = (searchParams: URLSearchParams): SearchFormData => {
  const { today, tomorrow } = getDefaultDates();

  return {
    query: searchParams.get('query') || '',
    checkIn: searchParams.get('checkIn')
      ? parseISO(searchParams.get('checkIn')!)
      : today,
    checkOut: searchParams.get('checkOut')
      ? parseISO(searchParams.get('checkOut')!)
      : tomorrow,
    adults: parseInt(searchParams.get('adults') || '2'),
    children: parseInt(searchParams.get('children') || '0'),
    rooms: parseInt(searchParams.get('rooms') || '1'),
  };
};

/**
 * Default search form values
 */
export const DEFAULT_SEARCH_VALUES = {
  adults: 2,
  children: 0,
  rooms: 1,
} as const;
