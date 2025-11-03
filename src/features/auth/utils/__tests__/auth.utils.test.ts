import { persistAuth, clearAuth } from '../auth.utils';
import type { AuthResponse } from '@/features/auth/types';

describe('auth utils', () => {
  const mockAuthData: AuthResponse = {
    authentication: 'mock-token-123',
    userType: 'Admin',
  };

  const mockUserData = {
    userId: 1,
    userName: 'Test User',
    userEmail: 'test@example.com',
  };

  beforeEach(() => {
    localStorage.clear();
  });

  describe('persistAuth', () => {
    it('should save token to localStorage', () => {
      persistAuth(mockAuthData);
      
      const storedToken = localStorage.getItem('token');
      expect(storedToken).toBe('mock-token-123');
    });

    it('should save user role to localStorage', () => {
      persistAuth(mockAuthData);
      
      const storedUser = localStorage.getItem('user');
      expect(storedUser).not.toBeNull();
      
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        expect(parsedUser.role).toBe('admin');
      }
    });

    it('should handle Admin user type', () => {
      const adminAuthData: AuthResponse = {
        authentication: 'admin-token',
        userType: 'Admin',
      };

      persistAuth(adminAuthData);
      
      const storedUser = localStorage.getItem('user');
      const storedToken = localStorage.getItem('token');
      
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        expect(parsedUser.role).toBe('admin');
      }
      expect(storedToken).toBe('admin-token');
    });

    it('should handle User type', () => {
      const regularUserData: AuthResponse = {
        authentication: 'user-token',
        userType: 'User',
      };

      persistAuth(regularUserData);
      
      const storedUser = localStorage.getItem('user');
      const storedToken = localStorage.getItem('token');
      
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        expect(parsedUser.role).toBe('user');
      }
      expect(storedToken).toBe('user-token');
    });

    it('should overwrite existing auth data', () => {
      // First save
      persistAuth(mockAuthData);
      
      // Second save with different data
      const newAuthData: AuthResponse = {
        authentication: 'new-token-456',
        userType: 'User',
      };
      persistAuth(newAuthData);
      
      const storedToken = localStorage.getItem('token');
      const storedUser = localStorage.getItem('user');
      
      expect(storedToken).toBe('new-token-456');
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        expect(parsedUser.role).toBe('user');
      }
    });

    it('should persist long tokens', () => {
      const longToken = 'a'.repeat(500);
      const authData: AuthResponse = {
        authentication: longToken,
        userType: 'Admin',
      };

      persistAuth(authData);
      
      const storedToken = localStorage.getItem('token');
      expect(storedToken).toBe(longToken);
      expect(storedToken?.length).toBe(500);
    });
  });

  describe('clearAuth', () => {
    it('should remove token from localStorage', () => {
      localStorage.setItem('token', 'mock-token-123');
      
      clearAuth();
      
      const storedToken = localStorage.getItem('token');
      expect(storedToken).toBeNull();
    });

    it('should remove user data from localStorage', () => {
      localStorage.setItem('user', JSON.stringify(mockUserData));
      
      clearAuth();
      
      const storedUser = localStorage.getItem('user');
      expect(storedUser).toBeNull();
    });

    it('should remove all auth-related items', () => {
      localStorage.setItem('token', 'mock-token-123');
      localStorage.setItem('user', JSON.stringify(mockUserData));
      
      clearAuth();
      
      expect(localStorage.getItem('token')).toBeNull();
      expect(localStorage.getItem('user')).toBeNull();
    });

    it('should not throw error when no auth data exists', () => {
      expect(() => clearAuth()).not.toThrow();
    });

    it('should leave other localStorage items untouched', () => {
      localStorage.setItem('token', 'mock-token-123');
      localStorage.setItem('otherData', 'should-remain');
      
      clearAuth();
      
      expect(localStorage.getItem('token')).toBeNull();
      expect(localStorage.getItem('otherData')).toBe('should-remain');
    });

    it('should be idempotent', () => {
      localStorage.setItem('token', 'mock-token-123');
      
      clearAuth();
      clearAuth(); // Call twice
      
      expect(localStorage.getItem('token')).toBeNull();
    });
  });
});
