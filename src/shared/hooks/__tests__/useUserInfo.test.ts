/// <reference types="@testing-library/jest-dom" />
import { renderHook } from '@testing-library/react';
import { useUserInfo } from '../useUserInfo';

// Mock jwt-decode
jest.mock('jwt-decode', () => ({
  jwtDecode: jest.fn(),
}));

import { jwtDecode } from 'jwt-decode';

describe('useUserInfo', () => {
  const mockDecodedToken = {
    user_id: '123',
    given_name: 'John',
    family_name: 'Doe',
    userType: 'Admin',
    nbf: 1234567890,
    exp: 1234567890,
    iss: 'test-issuer',
  };

  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  it('should return null values when no token exists', () => {
    (jwtDecode as jest.Mock).mockReturnValue(null);

    const { result } = renderHook(() => useUserInfo());

    expect(result.current.userInfo).toBeNull();
    expect(result.current.isAuthenticated).toBe(false);
    expect(result.current.firstName).toBeUndefined();
    expect(result.current.lastName).toBeUndefined();
    expect(result.current.fullName).toBeUndefined();
    expect(result.current.userType).toBeUndefined();
    expect(result.current.userId).toBeUndefined();
  });

  it('should decode token and return user info when token exists', () => {
    localStorage.setItem('token', 'mock-jwt-token');
    (jwtDecode as jest.Mock).mockReturnValue(mockDecodedToken);

    const { result } = renderHook(() => useUserInfo());

    expect(result.current.userInfo).toEqual(mockDecodedToken);
    expect(result.current.isAuthenticated).toBe(true);
    expect(result.current.firstName).toBe('John');
    expect(result.current.lastName).toBe('Doe');
    expect(result.current.fullName).toBe('John Doe');
    expect(result.current.userType).toBe('Admin');
    expect(result.current.userId).toBe('123');
  });

  it('should handle decoding errors gracefully', () => {
    localStorage.setItem('token', 'invalid-token');
    (jwtDecode as jest.Mock).mockImplementation(() => {
      throw new Error('Invalid token');
    });

    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

    const { result } = renderHook(() => useUserInfo());

    expect(result.current.userInfo).toBeNull();
    expect(result.current.isAuthenticated).toBe(false);
    expect(consoleSpy).toHaveBeenCalled();

    consoleSpy.mockRestore();
  });

  it('should return correct fullName from token', () => {
    localStorage.setItem('token', 'mock-jwt-token');
    (jwtDecode as jest.Mock).mockReturnValue({
      ...mockDecodedToken,
      given_name: 'Jane',
      family_name: 'Smith',
    });

    const { result } = renderHook(() => useUserInfo());

    expect(result.current.fullName).toBe('Jane Smith');
    expect(result.current.firstName).toBe('Jane');
    expect(result.current.lastName).toBe('Smith');
  });

  it('should return correct userType from token', () => {
    localStorage.setItem('token', 'mock-jwt-token');
    (jwtDecode as jest.Mock).mockReturnValue({
      ...mockDecodedToken,
      userType: 'User',
    });

    const { result } = renderHook(() => useUserInfo());

    expect(result.current.userType).toBe('User');
  });

  it('should handle empty localStorage gracefully', () => {
    const { result } = renderHook(() => useUserInfo());

    expect(result.current.userInfo).toBeNull();
    expect(result.current.isAuthenticated).toBe(false);
  });

  it('should return userId from decoded token', () => {
    localStorage.setItem('token', 'mock-jwt-token');
    (jwtDecode as jest.Mock).mockReturnValue({
      ...mockDecodedToken,
      user_id: '456',
    });

    const { result } = renderHook(() => useUserInfo());

    expect(result.current.userId).toBe('456');
  });
});
