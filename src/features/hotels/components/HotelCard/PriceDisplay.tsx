import { Box, Typography, Stack } from '@mui/material';
import type { PriceDisplayProps } from './types';
import { calculateDiscountedPrice } from '../../utils';

function PriceDisplay({ originalPrice, discount }: PriceDisplayProps) {
  const discountedPrice = calculateDiscountedPrice(originalPrice, discount);

  return (
    <Box sx={{ mb: 1.5 }}>
      {discount > 0 ? (
        <Stack spacing={0.5}>
          <Typography 
            variant="body2" 
            sx={{ 
              textDecoration: 'line-through',
              color: 'text.disabled',
              fontSize: '0.875rem',
              fontWeight: 500
            }}
          >
            ${originalPrice.toFixed(2)}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 0.5 }}>
            <Typography 
              variant="h4" 
              component="span"
              sx={{ 
                fontWeight: 700,
                color: 'success.main',
                lineHeight: 1
              }}
            >
              ${discountedPrice.toFixed(2)}
            </Typography>
            <Typography 
              variant="body2" 
              color="text.secondary"
              sx={{ fontWeight: 500 }}
            >
              / night
            </Typography>
          </Box>
        </Stack>
      ) : (
        <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 0.5 }}>
          <Typography 
            variant="h4" 
            component="span"
            sx={{ 
              fontWeight: 700,
              color: 'primary.main',
              lineHeight: 1
            }}
          >
            ${originalPrice.toFixed(2)}
          </Typography>
          <Typography 
            variant="body2" 
            color="text.secondary"
            sx={{ fontWeight: 500 }}
          >
            / night
          </Typography>
        </Box>
      )}
    </Box>
  );
}

export default PriceDisplay;
