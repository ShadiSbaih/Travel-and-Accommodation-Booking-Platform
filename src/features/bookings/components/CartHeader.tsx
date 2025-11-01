import { Box, Typography, Button } from '@mui/material';

interface CartHeaderProps {
  totalItems: number;
  onClearCart: () => void;
}

function CartHeader({ totalItems, onClearCart }: CartHeaderProps) {
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
        <Button variant="outlined" color="error" onClick={onClearCart} size="small">
          Clear Cart
        </Button>
      </Box>
    </>
  );
}

export default CartHeader;
