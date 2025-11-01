import { IconButton, Badge } from '@mui/material';
// Optimized icon import
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
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
      aria-label={`View cart with ${totalItems} item${totalItems !== 1 ? 's' : ''}`}
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
        <ShoppingCartIcon />
      </Badge>
    </IconButton>
  );
}

export default CartIcon;
