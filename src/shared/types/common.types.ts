// Component Props Types
import type {
  SectionHeaderBase,
  StateComponentProps,
  StyledProps,
} from './base.types';

/**
 * Empty state component props
 */
export interface EmptyStateProps extends StateComponentProps, SectionHeaderBase {}

/**
 * Error severity variants
 */
export type ErrorVariant = 'error' | 'warning' | 'info';

/**
 * Retry action
 */
export interface RetryAction {
  showRetry?: boolean;
  onRetry?: () => void;
}

/**
 * Error state component props
 */
export interface ErrorStateProps extends StateComponentProps, RetryAction {
  title?: string;
  message?: string;
  variant?: ErrorVariant;
  icon?: React.ReactNode;
}

/**
 * Loading state component props
 */
export interface LoadingStateProps extends StyledProps {
  message?: string;
}

/**
 * Error fallback props for error boundaries
 */
export interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

/**
 * App error boundary props
 */
export interface AppErrorBoundaryProps {
  children: React.ReactNode;
}
