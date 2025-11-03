import React, { useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardActionArea,
  Typography,
  Box,
  Rating,
} from '@mui/material';
import {
  LocationOn as LocationIcon,
  Schedule as ScheduleIcon,
 
} from '@mui/icons-material';
import { format } from 'date-fns';
import type { RecentlyVisitedCardProps } from '../types';
import { OptimizedImage } from '@/shared/components/OptimizedImage';

const RecentlyVisitedCard = React.memo(({ hotel }: RecentlyVisitedCardProps) => {
  const navigate = useNavigate();

  const handleClick = useCallback(() => {
    navigate(`/hotels/${hotel.hotelId}`);
  }, [navigate, hotel.hotelId]);

  // Safely format date with fallback
  const formattedDate = useMemo(() =>
    hotel.visitDate
      ? format(new Date(hotel.visitDate), 'MMM dd, yyyy')
      : 'Recently',
    [hotel.visitDate]
  );

  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
        willChange: 'transform',
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: '0 12px 24px rgba(0,0,0,0.15)',
        },
        width: '100%',
        maxWidth: 380,
        height: 520,
        borderRadius: 2,
        overflow: 'hidden',
      }}
    >
      <CardActionArea
        onClick={handleClick}
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'stretch',
        }}
      >
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            height: 260,
            overflow: 'hidden',
            flexShrink: 0,
            bgcolor: 'grey.200',
          }}
        >
          <OptimizedImage
            src={hotel.thumbnailUrl || ''}
            alt={hotel.hotelName || 'Hotel'}
            width={380}
            height={260}
            fallbackSrc="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&auto=format&fit=crop"
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              paddingBottom: 0,
              transition: 'transform 0.3s ease-in-out',
              '& img': {
                objectFit: 'cover',
                transition: 'transform 0.3s ease-in-out',
              },
              '&:hover img': {
                transform: 'scale(1.05)',
              },
            }}
          />

          {/* Gradient overlay for better text visibility */}
          <Box
            sx={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '50%',
              background: 'linear-gradient(to top, rgba(0,0,0,0.4), transparent)',
              pointerEvents: 'none',
            }}
          />
        </Box>

        <CardContent
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            gap: 1.5,
            p: 2.5,
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
              whiteSpace: 'nowrap',
              color: 'text.primary',
            }}
          >
            {hotel.hotelName || 'Hotel'}
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, flex: 1, minWidth: 0 }}>
              <LocationIcon sx={{ fontSize: '1.125rem', color: 'text.secondary', flexShrink: 0 }} />
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {hotel.cityName || 'Unknown location'}
              </Typography>
            </Box>

            {hotel.starRating > 0 && (
              <Rating
                value={Math.min(Math.max(hotel.starRating, 0), 5)}
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

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 0.5,
            }}
          >
            <ScheduleIcon sx={{ fontSize: '1rem', color: 'text.secondary', flexShrink: 0 }} />
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              Visited {formattedDate}
            </Typography>
          </Box>

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              mt: 'auto',
              pt: 1.5,
              borderTop: '1px solid',
              borderColor: 'divider',
            }}
          >
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ fontWeight: 500 }}
            >
              Price Range
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <Typography
                variant="body1"
                sx={{
                  fontWeight: 700,
                  color: 'success.main',
                }}
              >
                ${Math.round(hotel.priceLowerBound || 0)} - ${Math.round(hotel.priceUpperBound || 0)}
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
});

RecentlyVisitedCard.displayName = 'RecentlyVisitedCard';

export default RecentlyVisitedCard;
