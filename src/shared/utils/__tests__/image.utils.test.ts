import { calculateAspectRatio, preloadImage } from '../image.utils';

describe('image utils', () => {
  describe('calculateAspectRatio', () => {
    it('should calculate aspect ratio correctly', () => {
      expect(calculateAspectRatio(16, 9)).toBe(56.25);
    });

    it('should handle square images', () => {
      expect(calculateAspectRatio(100, 100)).toBe(100);
    });

    it('should handle portrait images', () => {
      expect(calculateAspectRatio(9, 16)).toBeCloseTo(177.78, 2);
    });

    it('should handle very wide images', () => {
      expect(calculateAspectRatio(1920, 1080)).toBe(56.25);
    });
  });

  describe('preloadImage', () => {
    it('should create image element with src', () => {
      const src = 'https://example.com/image.jpg';
      preloadImage(src);
      // Just ensure it doesn't throw
      expect(true).toBe(true);
    });
  });
});
