import { IconButton, Badge } from '@mui/material';
import { ShoppingCart } from '@mui/icons-material';
import { useAppSelector } from '@/core/store/hooks';
import { useNavigate } from 'react-router-dom';

function CartIcon() {
  const navigate = useNavigate();
  const totalItems = useAppSelector((state) => state.cart.totalItems);

  const handleCartClick = () => {
    navigate('/checkout');
  };

  return (
    <IconButton
      onClick={handleCartClick}
      sx={{
        color: 'inherit',
        '&:hover': {
          bgcolor: 'rgba(255, 255, 255, 0.1)',
        },
      }}
    >
      <Badge
        badgeContent={totalItems}
        color="error"
        sx={{
          '& .MuiBadge-badge': {
            fontWeight: 700,
          },
        }}
      >
        <ShoppingCart />
      </Badge>
    </IconButton>
  );
}

export default CartIcon;
