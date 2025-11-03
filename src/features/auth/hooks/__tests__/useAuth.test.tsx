// src/features/auth/hooks/__tests__/useAuth.test.tsx
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useLogin, useLogout } from '../useAuth';
import { loginRequest } from '../../api/auth.api';
import { persistAuth, clearAuth } from '../../utils/auth.utils';
import type { AuthResponse } from '../../types';

// Mock dependencies
jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));

jest.mock('../../api/auth.api');
jest.mock('../../utils/auth.utils');

// Helper to create a new QueryClient for each test
const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });

// Helper wrapper with QueryClient
const createWrapper = () => {
  const queryClient = createTestQueryClient();
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe('useLogin', () => {
  const mockNavigate = jest.fn();
  const mockLoginRequest = loginRequest as jest.MockedFunction<typeof loginRequest>;
  const mockPersistAuth = persistAuth as jest.MockedFunction<typeof persistAuth>;

  beforeEach(() => {
    jest.clearAllMocks();
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
  });

  it('should successfully login as User and navigate to /home', async () => {
    const mockUserResponse: AuthResponse = {
      authentication:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMiIsImdpdmVuX25hbWUiOiJNYXplbiIsImZhbWlseV9uYW1lIjoiU2FtaSIsInVzZXJUeXBlIjoiVXNlciIsIm5iZiI6MTczMjExNTQyMCwiZXhwIjoxNzMyMTE5MDIwLCJpc3MiOiJodHRwczovL2FwcC1ob3RlbC1yZXNlcnZhdGlvbi13ZWJhcGktdWFlLWRldi0wMDEuYXp1cmV3ZWJzaXRlcy5uZXQifQ.SosxseAWXFuoNqSkeeurjet6FiqEX-4Mheo4o1DbCYc',
      userType: 'User',
    };

    mockLoginRequest.mockResolvedValue(mockUserResponse);

    const { result } = renderHook(() => useLogin(), {
      wrapper: createWrapper(),
    });

    // Trigger login mutation
    result.current.mutate({
      userName: 'user',
      password: 'user',
    });

    // Wait for mutation to complete
    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    // Verify persistAuth was called with the response
    expect(mockPersistAuth).toHaveBeenCalledWith(mockUserResponse);
    expect(mockPersistAuth).toHaveBeenCalledTimes(1);

    // Verify navigation to /home for User
    expect(mockNavigate).toHaveBeenCalledWith('/home');
    expect(mockNavigate).toHaveBeenCalledTimes(1);
  });

  it('should successfully login as Admin and navigate to /admin/hotels', async () => {
    const mockAdminResponse: AuthResponse = {
      authentication:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMSIsImdpdmVuX25hbWUiOiJNb2hhbWFkIiwiZmFtaWx5X25hbWUiOiJNaWxoZW0iLCJ1c2VyVHlwZSI6IkFkbWluIiwibmJmIjoxNzMyNjQ4ODU5LCJleHAiOjE3MzI2NTI0NTksImlzcyI6Imh0dHBzOi8vYXBwLWhvdGVsLXJlc2VydmF0aW9uLXdlYmFwaS11YWUtZGV2LTAwMS5henVyZXdlYnNpdGVzLm5ldCJ9.IJ-ekmzr0FF1oNSrjDwElMZhoyc42H7nFq-3bWKuG8Q',
      userType: 'Admin',
    };

    mockLoginRequest.mockResolvedValue(mockAdminResponse);

    const { result } = renderHook(() => useLogin(), {
      wrapper: createWrapper(),
    });

    // Trigger login mutation
    result.current.mutate({
      userName: 'admin',
      password: 'admin',
    });

    // Wait for mutation to complete
    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    // Verify persistAuth was called with the response
    expect(mockPersistAuth).toHaveBeenCalledWith(mockAdminResponse);
    expect(mockPersistAuth).toHaveBeenCalledTimes(1);

    // Verify navigation to /admin/hotels for Admin
    expect(mockNavigate).toHaveBeenCalledWith('/admin/hotels');
    expect(mockNavigate).toHaveBeenCalledTimes(1);
  });

  it('should handle login failure', async () => {
    const mockError = new Error('Invalid user or password');
    mockLoginRequest.mockRejectedValue(mockError);

    const { result } = renderHook(() => useLogin(), {
      wrapper: createWrapper(),
    });

    // Trigger login mutation
    result.current.mutate({
      userName: 'wronguser',
      password: 'wrongpass',
    });

    // Wait for mutation to fail
    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    // Verify error state
    expect(result.current.error).toBe(mockError);

    // Verify persistAuth and navigate were NOT called
    expect(mockPersistAuth).not.toHaveBeenCalled();
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it('should set loading state during login', async () => {
    const mockUserResponse: AuthResponse = {
      authentication: 'token123',
      userType: 'User',
    };

    // Add delay to make loading state observable
    mockLoginRequest.mockImplementation(
      () =>
        new Promise((resolve) => {
          setTimeout(() => resolve(mockUserResponse), 100);
        })
    );

    const { result } = renderHook(() => useLogin(), {
      wrapper: createWrapper(),
    });

    // Initially not loading
    expect(result.current.isPending).toBe(false);

    // Trigger login mutation
    result.current.mutate({
      userName: 'user',
      password: 'user',
    });

    // Should be loading immediately after mutation
    await waitFor(() => {
      expect(result.current.isPending).toBe(true);
    });

    // Wait for completion
    await waitFor(() => {
      expect(result.current.isPending).toBe(false);
      expect(result.current.isSuccess).toBe(true);
    });
  });

  it('should pass correct credentials to loginRequest', async () => {
    const mockResponse: AuthResponse = {
      authentication: 'token',
      userType: 'User',
    };

    mockLoginRequest.mockResolvedValue(mockResponse);

    const { result } = renderHook(() => useLogin(), {
      wrapper: createWrapper(),
    });

    const credentials = {
      userName: 'testuser',
      password: 'testpass',
    };

    result.current.mutate(credentials);

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    // Verify loginRequest was called with correct credentials
    expect(mockLoginRequest).toHaveBeenCalledWith(credentials);
    expect(mockLoginRequest).toHaveBeenCalledTimes(1);
  });
});

describe('useLogout', () => {
  const mockNavigate = jest.fn();
  const mockClearAuth = clearAuth as jest.MockedFunction<typeof clearAuth>;

  beforeEach(() => {
    jest.clearAllMocks();
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
  });

  it('should clear auth and navigate to /login on logout', async () => {
    const { result } = renderHook(() => useLogout(), {
      wrapper: createWrapper(),
    });

    // Trigger logout mutation
    result.current.mutate();

    // Wait for mutation to complete
    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    // Verify clearAuth was called
    expect(mockClearAuth).toHaveBeenCalledTimes(1);

    // Verify navigation to /login
    expect(mockNavigate).toHaveBeenCalledWith('/login');
    expect(mockNavigate).toHaveBeenCalledTimes(1);
  });

  it('should handle logout state correctly', async () => {
    const { result } = renderHook(() => useLogout(), {
      wrapper: createWrapper(),
    });

    // Initially idle
    expect(result.current.isPending).toBe(false);
    expect(result.current.isSuccess).toBe(false);

    // Trigger logout mutation
    result.current.mutate();

    // Wait for completion
    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    // Verify final state
    expect(result.current.isPending).toBe(false);
    expect(mockClearAuth).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith('/login');
  });

  it('should navigate even if clearAuth throws error', async () => {
    // Mock clearAuth to throw error
    mockClearAuth.mockImplementation(() => {
      throw new Error('LocalStorage error');
    });

    const { result } = renderHook(() => useLogout(), {
      wrapper: createWrapper(),
    });

    // Trigger logout mutation
    result.current.mutate();

    // Wait for mutation - it should still succeed because we handle the error
    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    // Even on error, clearAuth should have been attempted
    expect(mockClearAuth).toHaveBeenCalledTimes(1);
  });
});
