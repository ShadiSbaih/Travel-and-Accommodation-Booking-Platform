// Component Props Types

export interface EmptyStateProps {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  className?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export interface ErrorStateProps {
  title?: string;
  message?: string;
  className?: string;
  variant?: 'error' | 'warning' | 'info';
  icon?: React.ReactNode;
  action?: {
    label: string;
    onClick: () => void;
  };
  showRetry?: boolean;
  onRetry?: () => void;
}

export interface LoadingStateProps {
  message?: string;
  className?: string;
}

export interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

export interface AppErrorBoundaryProps {
  children: React.ReactNode;
}
