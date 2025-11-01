import { Box, Typography, Button } from '@mui/material';
import { useState } from 'react';
import ClearCartDialog from './ClearCartDialog';

interface CartHeaderProps {
  totalItems: number;
  onClearCart: () => void;
}

function CartHeader({ totalItems, onClearCart }: CartHeaderProps) {
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  return (
    <>
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            mb: 1,
          }}
        >
          Shopping Cart
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {totalItems} {totalItems === 1 ? 'item' : 'items'} in your cart
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Cart Items
        </Typography>
        <Button variant="outlined" color="error" onClick={handleOpenDialog} size="small">
          Clear Cart
        </Button>
      </Box>

      <ClearCartDialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        onConfirm={onClearCart}
        itemCount={totalItems}
      />
    </>
  );
}

export default CartHeader;
