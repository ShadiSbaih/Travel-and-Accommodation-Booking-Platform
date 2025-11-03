import { renderHook } from '@testing-library/react';
import { useInfiniteScroll } from '../useInfiniteScroll';
import { useRef } from 'react';

describe('useInfiniteScroll', () => {
  let observeMock: jest.Mock;
  let disconnectMock: jest.Mock;

  beforeEach(() => {
    observeMock = jest.fn();
    disconnectMock = jest.fn();

    window.IntersectionObserver = jest.fn().mockImplementation(() => ({
      observe: observeMock,
      disconnect: disconnectMock,
      unobserve: jest.fn(),
      takeRecords: jest.fn(),
    })) as unknown as typeof IntersectionObserver;
  });

  it('should setup observer when conditions are met', () => {
    const onLoadMore = jest.fn();
    renderHook(() => {
      const ref = useRef<HTMLDivElement>(document.createElement('div'));
      useInfiniteScroll({
        ref,
        hasMore: true,
        isLoading: false,
        onLoadMore,
      });
      return ref;
    });

    expect(window.IntersectionObserver).toHaveBeenCalled();
    expect(observeMock).toHaveBeenCalled();
  });

  it('should not setup observer when ref is null', () => {
    const onLoadMore = jest.fn();
    renderHook(() => {
      const ref = useRef<HTMLDivElement>(null);
      useInfiniteScroll({
        ref,
        hasMore: true,
        isLoading: false,
        onLoadMore,
      });
      return ref;
    });

    expect(observeMock).not.toHaveBeenCalled();
  });

  it('should not setup observer when hasMore is false', () => {
    const onLoadMore = jest.fn();
    renderHook(() => {
      const ref = useRef<HTMLDivElement>(document.createElement('div'));
      useInfiniteScroll({
        ref,
        hasMore: false,
        isLoading: false,
        onLoadMore,
      });
      return ref;
    });

    expect(observeMock).not.toHaveBeenCalled();
  });

  it('should not setup observer when isLoading is true', () => {
    const onLoadMore = jest.fn();
    renderHook(() => {
      const ref = useRef<HTMLDivElement>(document.createElement('div'));
      useInfiniteScroll({
        ref,
        hasMore: true,
        isLoading: true,
        onLoadMore,
      });
      return ref;
    });

    expect(observeMock).not.toHaveBeenCalled();
  });

  it('should disconnect observer on cleanup', () => {
    const onLoadMore = jest.fn();
    const { unmount } = renderHook(() => {
      const ref = useRef<HTMLDivElement>(document.createElement('div'));
      useInfiniteScroll({
        ref,
        hasMore: true,
        isLoading: false,
        onLoadMore,
      });
      return ref;
    });

    unmount();
    expect(disconnectMock).toHaveBeenCalled();
  });
});
