import { formatDate, formatCurrency } from '../receipt.utils';

describe('receipt utils', () => {
  describe('formatDate', () => {
    it('should format ISO date string to readable format', () => {
      const result = formatDate('2024-01-15T10:30:00Z');
      
      expect(result).toContain('January');
      expect(result).toContain('15');
      expect(result).toContain('2024');
    });

    it('should include time in formatted output', () => {
      const result = formatDate('2024-06-20T14:45:00Z');
      
      expect(result).toMatch(/\d{1,2}:\d{2}/); // Should contain time like "14:45" or "2:45"
    });

    it('should handle different months correctly', () => {
      const januaryDate = formatDate('2024-01-01T12:00:00Z');
      const julyDate = formatDate('2024-07-15T12:00:00Z');
      
      expect(januaryDate).toContain('January');
      expect(julyDate).toContain('July');
    });

    it('should format date with correct year', () => {
      const result = formatDate('2025-03-15T12:00:00Z');
      
      expect(result).toContain('2025');
    });

    it('should handle leap year dates', () => {
      const result = formatDate('2024-02-29T10:00:00Z');
      
      expect(result).toContain('February');
      expect(result).toContain('29');
    });

    it('should format past dates correctly', () => {
      const result = formatDate('2020-05-10T08:30:00Z');
      
      expect(result).toContain('May');
      expect(result).toContain('10');
      expect(result).toContain('2020');
    });
  });

  describe('formatCurrency', () => {
    it('should format integer as currency with two decimal places', () => {
      const result = formatCurrency(100);
      
      expect(result).toBe('$100.00');
    });

    it('should format decimal number correctly', () => {
      const result = formatCurrency(99.99);
      
      expect(result).toBe('$99.99');
    });

    it('should format zero as currency', () => {
      const result = formatCurrency(0);
      
      expect(result).toBe('$0.00');
    });

    it('should format large amounts correctly', () => {
      const result = formatCurrency(1500.50);
      
      expect(result).toBe('$1500.50');
    });

    it('should round to two decimal places', () => {
      const result = formatCurrency(123.456);
      
      expect(result).toBe('$123.46');
    });

    it('should format negative amounts', () => {
      const result = formatCurrency(-50.25);
      
      expect(result).toBe('$-50.25');
    });

    it('should format very small amounts', () => {
      const result = formatCurrency(0.01);
      
      expect(result).toBe('$0.01');
    });

    it('should add .00 to whole numbers', () => {
      const result = formatCurrency(250);
      
      expect(result).toBe('$250.00');
    });

    it('should format single decimal place correctly', () => {
      const result = formatCurrency(49.5);
      
      expect(result).toBe('$49.50');
    });
  });
});
