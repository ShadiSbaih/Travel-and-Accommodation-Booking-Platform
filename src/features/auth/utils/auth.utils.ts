/**
 * Authentication utility functions
 */

import type { AuthResponse } from '../types';
import { AUTH_TOKEN_KEY, AUTH_USER_KEY } from '../constants/auth.constants';

/**
 * Persist authentication data to localStorage
 * @param data - Authentication response data
 */
export const persistAuth = (data: AuthResponse): void => {
  localStorage.setItem(AUTH_TOKEN_KEY, data.authentication);
  localStorage.setItem(
    AUTH_USER_KEY,
    JSON.stringify({ role: data.userType.toLowerCase() })
  );
};

/**
 * Clear authentication data from localStorage
 */
export const clearAuth = (): void => {
  localStorage.removeItem(AUTH_TOKEN_KEY);
  localStorage.removeItem(AUTH_USER_KEY);
};
