import { ErrorBoundary } from "react-error-boundary";
import type { ReactNode } from "react";

interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

function ErrorFallback({ error, resetErrorBoundary }: ErrorFallbackProps) {
  return (
    <div role="alert" className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 max-w-md w-full text-center">
        <h2 className="text-xl font-semibold text-red-600 dark:text-red-400 mb-4">
          😵 Oops! Something went wrong
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          Sorry, an unexpected error occurred in the application:
        </p>
        <pre className="text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 p-3 rounded border mb-6 overflow-auto text-left">
          {error.message}
        </pre>
        <div className="flex gap-2 justify-center">
          <button
            onClick={resetErrorBoundary}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Try Again
          </button>
          <button
            onClick={() => window.location.href = '/'}
            className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            Go to Home
          </button>
        </div>
      </div>
    </div>
  );
}

interface AppErrorBoundaryProps {
  children: ReactNode;
}

export function AppErrorBoundary({ children }: AppErrorBoundaryProps) {
  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => {
        // Reload the page to reset the entire application state
        window.location.reload();
      }}
      onError={(error, errorInfo) => {
        // Here you can send the error to a monitoring service like Sentry
        console.error('Error caught by ErrorBoundary:', error, errorInfo);
      }}
    >
      {children}
    </ErrorBoundary>
  );
}

export default AppErrorBoundary;