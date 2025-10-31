import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  Typography,
  Box,
} from '@mui/material';
import { LocationOn as LocationIcon } from '@mui/icons-material';
import type { TrendingDestinationCardProps } from '../types';

function TrendingDestinationCard({ destination }: TrendingDestinationCardProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    // Navigate to search results for this city
    const cityName = destination.cityName || '';
    if (cityName) {
      navigate(`/search-results?query=${encodeURIComponent(cityName)}`);
    }
  };

  // Default placeholder image for missing images
  const defaultImage = 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&auto=format&fit=crop';
  const imageUrl = destination.thumbnailUrl && destination.thumbnailUrl.trim() !== '' 
    ? destination.thumbnailUrl 
    : defaultImage;

  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        transition: 'all 0.3s ease-in-out',
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
          <CardMedia
            component="img"
            image={imageUrl}
            alt={`${destination.cityName || 'City'}, ${destination.countryName || 'Country'}`}
            onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
              e.currentTarget.src = defaultImage;
            }}
            sx={{ 
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'transform 0.3s ease-in-out',
              '&:hover': {
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
}export default TrendingDestinationCard;
