import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardActionArea,
  Typography,
  Box,
} from '@mui/material';
import { LocationOn as LocationIcon } from '@mui/icons-material';
import type { TrendingDestinationCardProps } from '../types';
import { OptimizedImage } from '@/shared/components/OptimizedImage';

const TrendingDestinationCard = React.memo(({ destination }: TrendingDestinationCardProps) => {
  const navigate = useNavigate();

  const handleClick = useCallback(() => {
    // Navigate to search results for this city
    const cityName = destination.cityName || '';
    if (cityName) {
      navigate(`/search-results?query=${encodeURIComponent(cityName)}`);
    }
  }, [navigate, destination.cityName]);

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
        maxWidth: 320,
        height: 480,
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
            height: 220,
            overflow: 'hidden',
            flexShrink: 0,
          }}
        >
          <OptimizedImage
            src={destination.thumbnailUrl || ''}
            alt={`${destination.cityName || 'City'}, ${destination.countryName || 'Country'}`}
            width={320}
            height={220}
            fallbackSrc="https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&auto=format&fit=crop"
            sx={{
              transition: 'transform 0.3s ease-in-out',
              '&:hover img': {
                transform: 'scale(1.05)',
              },
            }}
          />

          {/* Gradient overlay */}
          <Box
            sx={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '50%',
              background: 'linear-gradient(to top, rgba(0,0,0,0.5), transparent)',
              pointerEvents: 'none',
            }}
          />

          {/* Location badge */}
          <Box
            sx={{
              position: 'absolute',
              bottom: 16,
              left: 16,
              display: 'flex',
              alignItems: 'center',
              gap: 0.5,
              bgcolor: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(10px)',
              px: 1.5,
              py: 0.75,
              borderRadius: 2,
            }}
          >
            <LocationIcon sx={{ fontSize: '1.125rem', color: 'primary.main' }} />
            <Typography
              variant="subtitle2"
              sx={{
                fontWeight: 600,
                color: 'text.primary',
              }}
            >
              {destination.countryName || 'Country'}
            </Typography>
          </Box>
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
            variant="h5"
            component="h3"
            sx={{
              fontWeight: 700,
              fontSize: '1.5rem',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              color: 'text.primary',
            }}
          >
            {destination.cityName || 'Unknown City'}
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              overflow: 'hidden',
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              lineHeight: 1.6,
              flex: 1,
            }}
          >
            {destination.description || 'Discover this amazing destination'}
          </Typography>

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              mt: 'auto',
              pt: 1.5,
              borderTop: '1px solid',
              borderColor: 'divider',
            }}
          >
            <Typography
              variant="button"
              sx={{
                color: 'primary.main',
                fontWeight: 600,
                fontSize: '0.875rem',
              }}
            >
              Explore Destination
            </Typography>
            <Box
              component="span"
              sx={{
                display: 'flex',
                alignItems: 'center',
                color: 'primary.main',
                ml: 'auto',
              }}
            >
              →
            </Box>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
});

TrendingDestinationCard.displayName = 'TrendingDestinationCard';

export default TrendingDestinationCard;
