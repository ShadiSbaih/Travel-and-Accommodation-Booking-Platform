import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Box,
  Button,
  Rating,
} from '@mui/material';
import {
  LocationOn as LocationIcon,
  LocalOffer as OfferIcon,
  ArrowForward as ArrowIcon,
} from '@mui/icons-material';
import type { FeaturedDealCardProps } from '../types';
import { OptimizedImage } from '@/shared/components/OptimizedImage';

const FeaturedDealCard = React.memo(({ deal }: FeaturedDealCardProps) => {
  const navigate = useNavigate();

  const handleViewDeal = useCallback(() => {
    navigate(`/hotels/${deal.hotelId}`);
  }, [navigate, deal.hotelId]);

  return (
    <Card
      sx={{
        display: 'grid',
        gridTemplateRows: '220px 1fr auto',
        transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
        willChange: 'transform',
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: '0 12px 24px rgba(0,0,0,0.15)',
        },
        width: '100%',
        maxWidth: 320,
        height: 480,
        borderRadius: 2,
        overflow: 'hidden',
      }}
    >
      {/* Image Section */}
      <Box 
        sx={{ 
          position: 'relative', 
          overflow: 'hidden',
          bgcolor: 'grey.200',
        }}
      >
        <OptimizedImage
          src={deal.roomPhotoUrl || ''}
          alt={deal.title || 'Hotel deal'}
          width={320}
          height={220}
          fallbackSrc="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&auto=format&fit=crop"
        />
        
        {/* Discount badge */}
        {deal.discount > 0 && (
          <Box
            sx={{
              position: 'absolute',
              top: 16,
              right: 16,
              bgcolor: 'warning.main',
              color: 'white',
              px: 1.5,
              py: 0.75,
              borderRadius: 2,
              display: 'flex',
              alignItems: 'center',
              gap: 0.5,
              boxShadow: '0 4px 12px rgba(249, 115, 22, 0.4)',
            }}
          >
            <OfferIcon sx={{ fontSize: '1rem' }} />
            <Typography
              variant="subtitle2"
              component="span"
              sx={{
                fontWeight: 700,
                fontSize: '0.875rem',
              }}
            >
              {Math.round(deal.discount)}% OFF
            </Typography>
          </Box>
        )}
      </Box>

      <CardContent 
        sx={{ 
          display: 'flex',
          flexDirection: 'column',
          gap: 1.25,
          p: 2.5,
          pb: 2,
          overflow: 'hidden',
        }}
      >
        <Typography
          variant="h6"
          component="h3"
          sx={{
            fontWeight: 700,
            fontSize: '1.125rem',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            lineHeight: 1.3,
            minHeight: '2.6rem',
          }}
        >
          {deal.title || 'Special Deal'}
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 1 }}>
          <Typography 
            variant="subtitle2" 
            sx={{ 
              fontWeight: 600,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              flex: 1,
              minWidth: 0,
            }}
          >
            {deal.hotelName || 'Hotel'}
          </Typography>
          {deal.hotelStarRating > 0 && (
            <Rating
              value={Math.min(Math.max(deal.hotelStarRating, 0), 5)}
              readOnly
              size="small"
              sx={{ 
                '& .MuiRating-iconFilled': {
                  color: 'warning.main',
                },
              }}
            />
          )}
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <LocationIcon sx={{ fontSize: '1rem', color: 'text.secondary' }} />
          <Typography 
            variant="body2" 
            color="text.secondary"
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {deal.cityName || 'Location'}
          </Typography>
        </Box>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            overflow: 'hidden',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            lineHeight: 1.5,
            minHeight: '3rem',
          }}
        >
          {deal.description || 'Amazing deal on this property'}
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
          {deal.discount > 0 && deal.originalRoomPrice > 0 && (
            <Typography
              variant="body2"
              sx={{
                textDecoration: 'line-through',
                color: 'text.secondary',
              }}
            >
              ${Math.round(deal.originalRoomPrice)}
            </Typography>
          )}
          <Typography
            variant="h5"
            component="span"
            sx={{
              fontWeight: 700,
              color: 'primary.main',
            }}
          >
            ${Math.round(deal.finalPrice || 0)}
          </Typography>
          <Typography variant="body2" color="text.secondary" component="span">
            /night
          </Typography>
        </Box>
      </CardContent>

      <CardActions sx={{ p: 2.5, pt: 1 }}>
        <Button
          variant="contained"
          fullWidth
          endIcon={<ArrowIcon />}
          onClick={handleViewDeal}
          sx={{
            py: 1.125,
            fontWeight: 600,
            textTransform: 'none',
          }}
        >
          View Deal
        </Button>
      </CardActions>
    </Card>
  );
});

FeaturedDealCard.displayName = 'FeaturedDealCard';

export default FeaturedDealCard;
