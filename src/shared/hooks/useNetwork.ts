import { useEffect } from 'react';
import { useNotification } from './useNotification';

/**
 * Simple hook to monitor network connectivity
 * Shows toast notifications when connection status changes
 */
export const useNetwork = () => {
  const notify = useNotification();

  useEffect(() => {
    const handleOnline = () => {
      notify("You're online", 'success');
    };

    const handleOffline = () => {
      notify("You're offline", 'error');
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [notify]);
};
