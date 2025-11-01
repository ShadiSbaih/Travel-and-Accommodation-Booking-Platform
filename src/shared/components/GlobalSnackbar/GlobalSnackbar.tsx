import { Snackbar, Alert } from '@mui/material';
import { useAppDispatch, useAppSelector } from '@/core/store/hooks';
import { hideNotification } from '@/core/store/slices/notificationSlice';

function GlobalSnackbar() {
  const dispatch = useAppDispatch();
  const { open, message, severity } = useAppSelector((state) => state.notification);

  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={() => dispatch(hideNotification())}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
    >
      <Alert
        onClose={() => dispatch(hideNotification())}
        severity={severity}
        variant="filled"
        sx={{ width: '100%' }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
}

export default GlobalSnackbar;
