/**
 * Checkout utility functions
 */

import { TAX_RATE, SERVICE_FEE } from '../constants/checkout.constants';

/**
 * Calculate checkout totals including taxes and service fees
 * @param totalPrice - Base total price
 * @returns Object containing serviceFee, taxes, and total
 */
export const calculateCheckoutTotals = (totalPrice: number) => {
  const taxes = totalPrice * TAX_RATE;
  const total = totalPrice + taxes + SERVICE_FEE;
  
  return {
    serviceFee: SERVICE_FEE,
    taxes,
    total,
  };
};
