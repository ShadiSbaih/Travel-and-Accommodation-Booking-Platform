import { useCallback } from 'react';
import { useAppDispatch } from '@/core/store/hooks';
import { showNotification } from '@/core/store/slices/notificationSlice';
import type { NotificationSeverity } from '@/core/store/slices/notificationSlice';

export const useNotification = () => {
  const dispatch = useAppDispatch();

  const notify = useCallback(
    (message: string, severity: NotificationSeverity = 'success') => {
      dispatch(showNotification({ message, severity }));
    },
    [dispatch]
  );

  return notify;
};
