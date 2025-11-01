import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
} from '@mui/material';
import { Warning } from '@mui/icons-material';
import type { ClearCartDialogProps } from '../types';

/**
 * Confirmation dialog for clearing the cart
 */
function ClearCartDialog({ open, onClose, onConfirm, itemCount }: ClearCartDialogProps) {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
      aria-labelledby="clear-cart-dialog-title"
      aria-describedby="clear-cart-dialog-description"
    >
      <DialogTitle id="clear-cart-dialog-title">
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Warning color="warning" />
          <Typography variant="h6" component="span">
            Clear Cart?
          </Typography>
        </Box>
      </DialogTitle>

      <DialogContent>
        <Typography id="clear-cart-dialog-description" variant="body1" color="text.secondary">
          Are you sure you want to clear all items from your cart? This action cannot be undone.
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2, fontWeight: 600 }}>
          {itemCount} {itemCount === 1 ? 'item' : 'items'} will be removed.
        </Typography>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onClose} variant="outlined" color="inherit">
          Cancel
        </Button>
        <Button onClick={handleConfirm} variant="contained" color="error" autoFocus>
          Clear Cart
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ClearCartDialog;
