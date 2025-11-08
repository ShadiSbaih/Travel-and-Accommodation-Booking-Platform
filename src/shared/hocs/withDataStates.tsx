import type { ComponentType, ReactElement } from 'react';
import ErrorState from '@/shared/components/ErrorState';
import EmptyState from '@/shared/components/EmptyState';
import { ErrorOutline as ErrorIcon } from '@mui/icons-material';

/**
 * Configuration options for the withDataStates HOC
 */
export interface WithDataStatesConfig<T> {
  // Loading state configuration
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  LoadingSkeleton: ComponentType<any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  skeletonProps?: Record<string, any>;
  
  // Error state configuration
  errorTitle?: string;
  errorMessage?: string;
  errorIcon?: ReactElement;
  errorVariant?: 'error' | 'warning' | 'info';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  customErrorComponent?: ComponentType<any>;
  
  // Empty state configuration
  emptyTitle?: string;
  emptySubtitle?: string;
  emptyIcon?: ReactElement;
  emptyAction?: { label: string; onClick: () => void };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  customEmptyComponent?: ComponentType<any>;
  
  // Data validation function
  isEmpty?: (data: T) => boolean;
  
  // Display options
  showRetryButton?: boolean;
}

/**
 * Props that components using this HOC should accept
 */
export interface DataProps<T> {
  data?: T;
  isLoading?: boolean;
  isError?: boolean;
  error?: Error | unknown;
  refetch?: () => void;
}

/**
 * Higher-Order Component that handles loading, error, and empty states
 * 
 * @example
 * ```tsx
 * const MyComponentWithStates = withDataStates(MyComponent, {
 *   LoadingSkeleton: MyComponentSkeleton,
 *   errorTitle: 'Failed to load data',
 *   emptyTitle: 'No data available',
 *   isEmpty: (data) => !data || data.length === 0,
 * });
 * ```
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function withDataStates<T, P extends Record<string, any> = Record<string, any>>(
  WrappedComponent: ComponentType<P & { data?: T }>,
  config: WithDataStatesConfig<T>
) {
  const WithDataStatesComponent = (props: P & DataProps<T>) => {
    const {
      data,
      isLoading = false,
      isError = false,
      error,
      refetch,
      ...restProps
    } = props;

    const {
      LoadingSkeleton,
      skeletonProps = {},
      errorTitle = 'Unable to Load Data',
      errorMessage = 'We encountered an error while loading the data. Please try again.',
      errorIcon = <ErrorIcon sx={{ fontSize: '3rem', color: 'error.main' }} />,
      errorVariant = 'error',
      customErrorComponent: CustomErrorComponent,
      emptyTitle = 'No Data Available',
      emptySubtitle = 'There is no data to display at the moment.',
      emptyIcon = <ErrorIcon sx={{ fontSize: '3rem', color: 'text.secondary' }} />,
      emptyAction,
      customEmptyComponent: CustomEmptyComponent,
      isEmpty = (data) => !data || (Array.isArray(data) && data.length === 0),
      showRetryButton = true,
    } = config;

    // Loading state
    if (isLoading) {
      return <LoadingSkeleton {...skeletonProps} />;
    }

    // Error state
    if (isError || error) {
      if (CustomErrorComponent) {
        return <CustomErrorComponent error={error} refetch={refetch} />;
      }
      
      return (
        <ErrorState
          title={errorTitle}
          message={errorMessage}
          variant={errorVariant}
          icon={errorIcon}
          showRetry={showRetryButton && !!refetch}
          onRetry={refetch}
        />
      );
    }

    // Empty state
    if (isEmpty(data as T)) {
      if (CustomEmptyComponent) {
        return <CustomEmptyComponent />;
      }
      
      return (
        <EmptyState
          title={emptyTitle}
          subtitle={emptySubtitle}
          icon={emptyIcon}
          action={emptyAction}
        />
      );
    }

    // Render the actual component with data
    return <WrappedComponent {...(restProps as P)} data={data} />;
  };

  WithDataStatesComponent.displayName = `WithDataStates(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

  return WithDataStatesComponent as ComponentType<P & DataProps<T>>;
}
