import { Snackbar, Alert } from '@mui/material';
import { useAppDispatch, useAppSelector } from '@/core/store/hooks';
import { hideNotification } from '@/core/store/slices/notificationSlice';

function GlobalSnackbar() {
  const dispatch = useAppDispatch();
  const { open, message, severity } = useAppSelector((state) => state.notification);

  const handleClose = () => {
    dispatch(hideNotification());
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
    >
      <Alert
        onClose={handleClose}
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
