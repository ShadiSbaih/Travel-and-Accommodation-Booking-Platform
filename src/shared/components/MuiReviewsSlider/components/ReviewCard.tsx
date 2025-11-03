import { Box, Card, CardContent, Typography, Rating, Avatar } from '@mui/material';
import { FormatQuote as QuoteIcon } from '@mui/icons-material';
import type { Review } from '../types';

interface ReviewCardProps {
  review: Review;
  isActive: boolean;
}

export function ReviewCard({ review, isActive }: ReviewCardProps) {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <Box
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        opacity: isActive ? 1 : 0,
        visibility: isActive ? 'visible' : 'hidden',
        transition: 'opacity 0.6s ease-in-out, visibility 0.6s ease-in-out',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: { xs: 2, sm: 3 },
      }}
    >
      <Card
        elevation={0}
        sx={{
          width: '100%',
          maxWidth: 900,
          height: { xs: 380, sm: 380, md: 360 },
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          overflow: 'hidden',
          bgcolor: 'background.paper',
          borderRadius: { xs: 3, sm: 4 },
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.04)',
        }}
      >
        {/* Quote Icon */}
        <QuoteIcon
          sx={{
            position: 'absolute',
            top: { xs: 20, sm: 24 },
            left: { xs: 20, sm: 28 },
            fontSize: { xs: 48, sm: 56 },
            color: '#E0F7FA',
            opacity: 1,
            transform: 'rotate(180deg)',
            zIndex: 0,
          }}
        />

        <CardContent 
          sx={{ 
            flex: 1, 
            display: 'flex', 
            flexDirection: 'column', 
            justifyContent: 'space-between',
            p: { xs: 3, sm: 4 },
            position: 'relative',
            zIndex: 1,
            height: '100%',
          }}
        >
          {/* Rating Section */}
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
            <Rating 
              value={review.rating} 
              precision={0.5} 
              readOnly 
              size="large"
              sx={{
                '& .MuiRating-iconFilled': {
                  color: '#FFC107',
                  fontSize: { xs: '1.5rem', sm: '1.75rem' },
                },
                '& .MuiRating-iconEmpty': {
                  color: '#E0E0E0',
                  fontSize: { xs: '1.5rem', sm: '1.75rem' },
                },
              }}
            />
          </Box>

          {/* Description - Fixed Height with Overflow */}
          <Box
            sx={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              px: { xs: 1, sm: 3 },
              minHeight: 0,
              overflow: 'hidden',
            }}
          >
            <Typography
              sx={{
                textAlign: 'center',
                fontStyle: 'italic',
                color: 'text.secondary',
                fontSize: { xs: '0.9375rem', sm: '1rem' },
                lineHeight: 1.7,
                fontWeight: 400,
                display: '-webkit-box',
                WebkitLineClamp: 4,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                maxHeight: { xs: '102px', sm: '109px' },
              }}
            >
              "{review.description}"
            </Typography>
          </Box>

          {/* Customer Info - Fixed Height */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 2,
              pt: 3,
              mt: 2,
              borderTop: 1,
              borderColor: 'divider',
              minHeight: 80,
            }}
          >
            <Avatar
              sx={{
                bgcolor: 'primary.main',
                width: { xs: 48, sm: 56 },
                height: { xs: 48, sm: 56 },
                fontSize: { xs: '0.9375rem', sm: '1.125rem' },
                fontWeight: 700,
              }}
            >
              {getInitials(review.customerName)}
            </Avatar>
            <Box sx={{ textAlign: 'left' }}>
              <Typography 
                variant="subtitle1" 
                sx={{ 
                  fontWeight: 700, 
                  color: 'text.primary',
                  fontSize: { xs: '0.9375rem', sm: '1rem' },
                  lineHeight: 1.3,
                  mb: 0.25,
                }}
              >
                {review.customerName}
              </Typography>
              <Typography 
                variant="caption" 
                sx={{ 
                  color: 'text.secondary',
                  fontSize: { xs: '0.8125rem', sm: '0.875rem' },
                  display: 'flex',
                  alignItems: 'center',
                  gap: 0.5,
                  fontWeight: 400,
                }}
              >
                ✓ Verified Guest
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
