import { Box, Typography, IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';
import { Delete } from '@mui/icons-material';
import type { CartItemHeaderProps } from '@/features/bookings/types';
import { useState } from 'react';

function CartItemHeader({ roomName, hotelName, onRemove }: CartItemHeaderProps) {
  const [openDialog, setOpenDialog] = useState(false);

  const handleDeleteClick = () => {
    setOpenDialog(true);
  };

  const handleConfirmDelete = () => {
    setOpenDialog(false);
    onRemove();
  };

  const handleCancelDelete = () => {
    setOpenDialog(false);
  };

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          mb: 1,
        }}
      >
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5 }}>
            {roomName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {hotelName}
          </Typography>
        </Box>
        <IconButton onClick={handleDeleteClick} color="error" size="small">
          <Delete />
        </IconButton>
      </Box>

      <Dialog
        open={openDialog}
        onClose={handleCancelDelete}
        aria-labelledby="delete-dialog-title"
        aria-describedby="delete-dialog-description"
        slotProps={{
          paper: {
            sx: {
              borderRadius: 2,
              minWidth: { xs: '90%', sm: 400 },
            }
          }
        }}
      >
        <DialogTitle id="delete-dialog-title" sx={{ fontWeight: 700 }}>
          Remove from Cart?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="delete-dialog-description">
            Are you sure you want to remove <strong>{roomName}</strong> from your cart? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button 
            onClick={handleCancelDelete}
            variant="outlined"
            sx={{
              textTransform: 'none',
              borderRadius: 2,
            }}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleConfirmDelete}
            variant="contained"
            color="error"
            sx={{
              textTransform: 'none',
              borderRadius: 2,
            }}
            autoFocus
          >
            Remove
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default CartItemHeader;
