import { getInitials } from '../string.utils';

describe('string utils', () => {
  describe('getInitials', () => {
    it('should return initials for full name', () => {
      expect(getInitials('John Doe')).toBe('JD');
    });

    it('should return initials for name with multiple spaces', () => {
      expect(getInitials('John   Doe')).toBe('JD');
    });

    it('should return single initial for single name', () => {
      expect(getInitials('John')).toBe('J');
    });

    it('should return first and last initials for three names', () => {
      expect(getInitials('John Michael Doe')).toBe('JD');
    });

    it('should handle empty string', () => {
      expect(getInitials('')).toBe('U');
    });

    it('should handle whitespace only', () => {
      expect(getInitials('   ')).toBe('U');
    });

    it('should convert to uppercase', () => {
      expect(getInitials('john doe')).toBe('JD');
    });
  });
});
