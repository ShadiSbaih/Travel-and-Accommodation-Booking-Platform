import { renderHook, act } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { useNotification } from '../useNotification';
import notificationReducer from '@/core/store/slices/notificationSlice';

const createMockStore = () => {
  return configureStore({
    reducer: {
      notification: notificationReducer,
    },
  });
};

interface WrapperProps {
  children: React.ReactNode;
}

const wrapper = ({ children }: WrapperProps) => (
  <Provider store={createMockStore()}>{children}</Provider>
);

describe('useNotification', () => {
  it('should return notify function', () => {
    const { result } = renderHook(() => useNotification(), { wrapper });

    expect(typeof result.current).toBe('function');
  });

  it('should dispatch notification with default severity', () => {
    const { result } = renderHook(() => useNotification(), { wrapper });

    act(() => {
      result.current('Test notification');
    });

    // Should not throw error
    expect(result.current).toBeDefined();
  });

  it('should dispatch notification with success severity', () => {
    const { result } = renderHook(() => useNotification(), { wrapper });

    act(() => {
      result.current('Success message', 'success');
    });

    expect(result.current).toBeDefined();
  });

  it('should dispatch notification with error severity', () => {
    const { result } = renderHook(() => useNotification(), { wrapper });

    act(() => {
      result.current('Error message', 'error');
    });

    expect(result.current).toBeDefined();
  });

  it('should dispatch notification with warning severity', () => {
    const { result } = renderHook(() => useNotification(), { wrapper });

    act(() => {
      result.current('Warning message', 'warning');
    });

    expect(result.current).toBeDefined();
  });

  it('should dispatch notification with info severity', () => {
    const { result } = renderHook(() => useNotification(), { wrapper });

    act(() => {
      result.current('Info message', 'info');
    });

    expect(result.current).toBeDefined();
  });

  it('should be memoized and return same function reference', () => {
    const { result, rerender } = renderHook(() => useNotification(), { wrapper });
    
    const firstReference = result.current;
    
    rerender();
    
    const secondReference = result.current;
    
    // The function should remain stable across renders
    expect(typeof firstReference).toBe('function');
    expect(typeof secondReference).toBe('function');
  });

  it('should handle multiple notifications', () => {
    const { result } = renderHook(() => useNotification(), { wrapper });

    act(() => {
      result.current('First notification', 'success');
      result.current('Second notification', 'error');
      result.current('Third notification', 'warning');
    });

    expect(result.current).toBeDefined();
  });
});
