/**
 * Hotel pricing utility functions
 */

/**
 * Calculates discounted price
 * @param originalPrice - Original price before discount
 * @param discount - Discount percentage (0-100)
 * @returns Discounted price
 */
export const calculateDiscountedPrice = (originalPrice: number, discount: number): number => {
  return originalPrice * (1 - discount / 100);
};

/**
 * Formats price as currency string
 * @param price - Price to format
 * @returns Formatted price string with $ symbol
 */
export const formatPrice = (price: number): string => {
  return `$${price.toFixed(2)}`;
};
