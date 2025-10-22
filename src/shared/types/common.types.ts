// Component Props Types

export interface EmptyStateProps {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  className?: string;
}

export interface ErrorStateProps {
  message?: string;
  className?: string;
  variant?: 'error' | 'warning' | 'info';
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
