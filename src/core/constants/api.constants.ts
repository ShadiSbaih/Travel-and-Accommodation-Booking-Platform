/**
 * API configuration constants
 */

// Use environment variable for production, fallback to localhost for development
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

export const API_HEADERS = {
  'Content-Type': 'application/json',
} as const;

