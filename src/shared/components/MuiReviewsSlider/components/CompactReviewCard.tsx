import { Box, Card, CardContent, Typography, Rating, Avatar } from '@mui/material';
import type { Review } from '../types';

interface CompactReviewCardProps {
  review: Review;
}

export function CompactReviewCard({ review }: CompactReviewCardProps) {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <Card
      elevation={0}
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: 'background.paper',
        border: 1,
        borderColor: 'divider',
        borderRadius: 1.5,
        transition: 'all 0.2s ease',
        '&:hover': {
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
        },
      }}
    >
      <CardContent sx={{ p: 2.5, display: 'flex', flexDirection: 'column', gap: 1.5, flex: 1 }}>
        {/* Rating */}
        <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
          <Rating
            value={review.rating}
            precision={0.5}
            readOnly
            size="small"
            sx={{
              '& .MuiRating-iconFilled': {
                color: '#FFC107',
              },
              '& .MuiRating-iconEmpty': {
                color: '#E0E0E0',
              },
            }}
          />
        </Box>

        {/* Description */}
        <Typography
          variant="body2"
          sx={{
            color: 'text.secondary',
            fontSize: '0.875rem',
            lineHeight: 1.6,
            fontStyle: 'italic',
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            flex: 1,
          }}
        >
          "{review.description}"
        </Typography>

        {/* Customer Info */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
            pt: 1,
            borderTop: 1,
            borderColor: 'divider',
          }}
        >
          <Avatar
            sx={{
              bgcolor: 'primary.main',
              width: 36,
              height: 36,
              fontSize: '0.875rem',
              fontWeight: 600,
            }}
          >
            {getInitials(review.customerName)}
          </Avatar>
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography
              variant="subtitle2"
              sx={{
                fontWeight: 600,
                color: 'text.primary',
                fontSize: '0.875rem',
                lineHeight: 1.3,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {review.customerName}
            </Typography>
            <Typography
              variant="caption"
              sx={{
                color: 'text.secondary',
                fontSize: '0.75rem',
                display: 'flex',
                alignItems: 'center',
                gap: 0.5,
              }}
            >
              ✓ Verified
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
