import { calculateCheckoutTotals } from '../checkout.utils';
import { TAX_RATE, SERVICE_FEE } from '../../constants/checkout.constants';

describe('checkout utils', () => {
  describe('calculateCheckoutTotals', () => {
    it('should calculate totals with 10% tax rate', () => {
      const result = calculateCheckoutTotals(100);
      
      expect(result.serviceFee).toBe(SERVICE_FEE);
      expect(result.taxes).toBe(10); // 10% of 100
      expect(result.total).toBe(110); // 100 + 10 + 0
    });

    it('should calculate totals for large amounts', () => {
      const result = calculateCheckoutTotals(1000);
      
      expect(result.serviceFee).toBe(0);
      expect(result.taxes).toBe(100); // 10% of 1000
      expect(result.total).toBe(1100);
    });

    it('should calculate totals for decimal amounts', () => {
      const result = calculateCheckoutTotals(99.99);
      
      expect(result.taxes).toBeCloseTo(9.999, 2);
      expect(result.total).toBeCloseTo(109.989, 2);
    });

    it('should handle zero total price', () => {
      const result = calculateCheckoutTotals(0);
      
      expect(result.serviceFee).toBe(0);
      expect(result.taxes).toBe(0);
      expect(result.total).toBe(0);
    });

    it('should use correct tax rate from constants', () => {
      const totalPrice = 200;
      const result = calculateCheckoutTotals(totalPrice);
      
      expect(result.taxes).toBe(totalPrice * TAX_RATE);
    });

    it('should include service fee in total', () => {
      const totalPrice = 150;
      const result = calculateCheckoutTotals(totalPrice);
      
      expect(result.total).toBe(totalPrice + result.taxes + SERVICE_FEE);
    });

    it('should calculate totals for small amounts', () => {
      const result = calculateCheckoutTotals(10);
      
      expect(result.taxes).toBe(1);
      expect(result.total).toBe(11);
    });

    it('should handle fractional cents correctly', () => {
      const result = calculateCheckoutTotals(50.55);
      
      expect(result.taxes).toBeCloseTo(5.055, 3);
      expect(result.total).toBeCloseTo(55.605, 3);
    });
  });
});
