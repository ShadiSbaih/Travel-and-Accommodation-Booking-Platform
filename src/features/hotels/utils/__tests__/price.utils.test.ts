import { calculateDiscountedPrice, formatPrice } from '../price.utils';

describe('price utils', () => {
  describe('calculateDiscountedPrice', () => {
    it('should calculate discounted price with 10% discount', () => {
      const result = calculateDiscountedPrice(100, 10);
      expect(result).toBe(90);
    });

    it('should calculate discounted price with 25% discount', () => {
      const result = calculateDiscountedPrice(200, 25);
      expect(result).toBe(150);
    });

    it('should calculate discounted price with 50% discount', () => {
      const result = calculateDiscountedPrice(500, 50);
      expect(result).toBe(250);
    });

    it('should return original price with 0% discount', () => {
      const result = calculateDiscountedPrice(100, 0);
      expect(result).toBe(100);
    });

    it('should handle decimal prices', () => {
      const result = calculateDiscountedPrice(99.99, 10);
      expect(result).toBeCloseTo(89.99, 2);
    });

    it('should handle large discounts', () => {
      const result = calculateDiscountedPrice(1000, 75);
      expect(result).toBe(250);
    });

    it('should handle 100% discount', () => {
      const result = calculateDiscountedPrice(100, 100);
      expect(result).toBe(0);
    });

    it('should handle small prices', () => {
      const result = calculateDiscountedPrice(10, 20);
      expect(result).toBe(8);
    });
  });

  describe('formatPrice', () => {
    it('should format price with dollar sign', () => {
      const result = formatPrice(100);
      expect(result).toBe('$100.00');
    });

    it('should format decimal price', () => {
      const result = formatPrice(99.99);
      expect(result).toBe('$99.99');
    });

    it('should format large price', () => {
      const result = formatPrice(1500);
      expect(result).toBe('$1500.00');
    });

    it('should format zero price', () => {
      const result = formatPrice(0);
      expect(result).toBe('$0.00');
    });

    it('should format price with one decimal place', () => {
      const result = formatPrice(49.5);
      expect(result).toBe('$49.50');
    });

    it('should round price with many decimal places', () => {
      const result = formatPrice(123.456);
      expect(result).toBe('$123.46');
    });

    it('should handle negative price', () => {
      const result = formatPrice(-50);
      expect(result).toBe('$-50.00');
    });
  });
});
