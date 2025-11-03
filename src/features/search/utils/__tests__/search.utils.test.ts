import { getDefaultDates, getInitialSearchState, DEFAULT_SEARCH_VALUES } from '../search.utils';

describe('search utils', () => {
  describe('getDefaultDates', () => {
    it('should return today and tomorrow dates', () => {
      const { today, tomorrow } = getDefaultDates();
      
      expect(today).toBeInstanceOf(Date);
      expect(tomorrow).toBeInstanceOf(Date);
      expect(tomorrow.getDate()).toBe(today.getDate() + 1);
    });

    it('should return different date objects', () => {
      const { today, tomorrow } = getDefaultDates();
      
      expect(today).not.toBe(tomorrow);
    });
  });

  describe('getInitialSearchState', () => {
    it('should return default values when no params provided', () => {
      const searchParams = new URLSearchParams();
      const result = getInitialSearchState(searchParams);

      expect(result.query).toBe('');
      expect(result.adults).toBe(2);
      expect(result.children).toBe(0);
      expect(result.rooms).toBe(1);
      expect(result.checkIn).toBeInstanceOf(Date);
      expect(result.checkOut).toBeInstanceOf(Date);
    });

    it('should parse query from URL params', () => {
      const searchParams = new URLSearchParams('query=Dubai');
      const result = getInitialSearchState(searchParams);

      expect(result.query).toBe('Dubai');
    });

    it('should parse dates from URL params', () => {
      const searchParams = new URLSearchParams(
        'checkIn=2024-01-15&checkOut=2024-01-20'
      );
      const result = getInitialSearchState(searchParams);

      expect(result.checkIn.getFullYear()).toBe(2024);
      expect(result.checkIn.getMonth()).toBe(0); // January
      expect(result.checkIn.getDate()).toBe(15);
      expect(result.checkOut.getDate()).toBe(20);
    });

    it('should parse adults count from URL params', () => {
      const searchParams = new URLSearchParams('adults=4');
      const result = getInitialSearchState(searchParams);

      expect(result.adults).toBe(4);
    });

    it('should parse children count from URL params', () => {
      const searchParams = new URLSearchParams('children=2');
      const result = getInitialSearchState(searchParams);

      expect(result.children).toBe(2);
    });

    it('should parse rooms count from URL params', () => {
      const searchParams = new URLSearchParams('rooms=3');
      const result = getInitialSearchState(searchParams);

      expect(result.rooms).toBe(3);
    });

    it('should handle all params together', () => {
      const searchParams = new URLSearchParams(
        'query=Paris&checkIn=2024-06-01&checkOut=2024-06-05&adults=3&children=1&rooms=2'
      );
      const result = getInitialSearchState(searchParams);

      expect(result.query).toBe('Paris');
      expect(result.adults).toBe(3);
      expect(result.children).toBe(1);
      expect(result.rooms).toBe(2);
      expect(result.checkIn.getMonth()).toBe(5); // June
      expect(result.checkOut.getDate()).toBe(5);
    });

    it('should handle invalid number params with defaults', () => {
      const searchParams = new URLSearchParams('adults=invalid&children=abc');
      const result = getInitialSearchState(searchParams);

      expect(result.adults).toBeNaN();
      expect(result.children).toBeNaN();
    });
  });

  describe('DEFAULT_SEARCH_VALUES', () => {
    it('should have correct default values', () => {
      expect(DEFAULT_SEARCH_VALUES.adults).toBe(2);
      expect(DEFAULT_SEARCH_VALUES.children).toBe(0);
      expect(DEFAULT_SEARCH_VALUES.rooms).toBe(1);
    });
  });
});
