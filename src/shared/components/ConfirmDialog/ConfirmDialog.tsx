import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
} from '@mui/material';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
  isLoading?: boolean;
}

function ConfirmDialog({
  open,
  title,
  message,
  confirmText = 'Delete',
  cancelText = 'Cancel',
  onConfirm,
  onCancel,
  isLoading = false,
}: ConfirmDialogProps) {
  return (
    <Dialog
      open={open}
      onClose={onCancel}
      maxWidth="xs"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          bgcolor: (theme) =>
            theme.palette.mode === 'dark'
              ? 'rgba(30, 41, 59, 0.98)'
              : 'rgba(255, 255, 255, 0.98)',
          backdropFilter: 'blur(20px)',
        },
      }}
    >
      <DialogTitle
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1.5,
          pb: 2,
        }}
      >
        <Box
          sx={{
            width: 48,
            height: 48,
            borderRadius: '50%',
            bgcolor: (theme) =>
              theme.palette.mode === 'dark'
                ? 'rgba(239, 68, 68, 0.2)'
                : 'rgba(239, 68, 68, 0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <WarningAmberIcon
            sx={{
              color: (theme) =>
                theme.palette.mode === 'dark' ? '#f87171' : '#ef4444',
              fontSize: 28,
            }}
          />
        </Box>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            color: (theme) =>
              theme.palette.mode === 'dark' ? '#e2e8f0' : 'text.primary',
          }}
        >
          {title}
        </Typography>
      </DialogTitle>

      <DialogContent sx={{ pb: 3 }}>
        <Typography
          variant="body1"
          sx={{
            color: (theme) =>
              theme.palette.mode === 'dark' ? '#cbd5e1' : 'text.secondary',
            lineHeight: 1.6,
          }}
        >
          {message}
        </Typography>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 3, gap: 1 }}>
        <Button
          onClick={onCancel}
          variant="outlined"
          disabled={isLoading}
          sx={{
            flex: 1,
            textTransform: 'none',
            fontWeight: 600,
            borderRadius: 2,
            borderWidth: 2,
            borderColor: (theme) =>
              theme.palette.mode === 'dark'
                ? 'rgba(148, 163, 184, 0.4)'
                : 'rgba(148, 163, 184, 0.6)',
            color: (theme) =>
              theme.palette.mode === 'dark' ? '#cbd5e1' : '#475569',
            '&:hover': {
              borderWidth: 2,
              borderColor: (theme) =>
                theme.palette.mode === 'dark' ? '#94a3b8' : '#64748b',
              bgcolor: (theme) =>
                theme.palette.mode === 'dark'
                  ? 'rgba(148, 163, 184, 0.08)'
                  : 'rgba(148, 163, 184, 0.08)',
            },
          }}
        >
          {cancelText}
        </Button>
        <Button
          onClick={onConfirm}
          variant="contained"
          disabled={isLoading}
          sx={{
            flex: 1,
            textTransform: 'none',
            fontWeight: 600,
            borderRadius: 2,
            bgcolor: (theme) =>
              theme.palette.mode === 'dark' ? '#dc2626' : '#ef4444',
            '&:hover': {
              bgcolor: (theme) =>
                theme.palette.mode === 'dark' ? '#b91c1c' : '#dc2626',
            },
          }}
        >
          {confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ConfirmDialog;
