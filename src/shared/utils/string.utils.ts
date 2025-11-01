/**
 * Utility functions for string manipulation
 */

/**
 * Get initials from a full name
 * @param name - The full name to extract initials from
 * @returns The initials (first and last name's first letters)
 */
export function getInitials(name: string): string {
  const words = name.trim().split(' ').filter(Boolean);
  return words.length > 1
    ? (words[0][0] + words[words.length - 1][0]).toUpperCase()
    : (words[0]?.[0] || 'U').toUpperCase();
}
