import { Paper, Box, Typography, Chip, Tooltip } from '@mui/material';
import { CheckCircle, Spa } from '@mui/icons-material';
import type { AmenitiesListProps } from '../../types';
import type { Review } from '@/shared/components/MuiReviewsSlider';
import { CompactReviewsSlider } from '@/shared/components/MuiReviewsSlider';

interface AmenitiesListWithReviewsProps extends AmenitiesListProps {
  reviews?: Review[];
}

function AmenitiesList({ amenities, showTitle = true, reviews }: AmenitiesListWithReviewsProps) {
  if (!amenities || amenities.length === 0) return null;

  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: 1,
        border: '1px solid',
        borderColor: 'divider',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.06)',
      }}
    >
      {showTitle && (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2.5 }}>
          <Spa sx={{ fontSize: 24, color: 'success.main' }} />
          <Typography
            variant="h6"
            component="h2"
            sx={{
              fontWeight: 700,
              fontSize: '1.05rem',
              color: 'text.primary'
            }}
          >
            Amenities & Services
          </Typography>
        </Box>
      )}
      <Box sx={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 1.5
      }}>
        {amenities.map((amenity) => (
          <Tooltip
            key={amenity.id}
            title={amenity.description}
            arrow
            placement="top"
            enterDelay={300}
            leaveDelay={0}
            slotProps={{
              tooltip: {
                sx: {
                  bgcolor: 'grey.900',
                  color: 'white',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.25)',
                  fontSize: '0.875rem',
                  padding: '10px 14px',
                  maxWidth: 280,
                  borderRadius: 0.5,
                }
              },
              arrow: {
                sx: {
                  color: 'grey.900',
                }
              }
            }}
          >
            <Chip
              icon={<CheckCircle />}
              label={amenity.name}
              sx={{
                bgcolor: 'success.50',
                border: '1.5px solid',
                borderColor: 'success.200',
                fontWeight: 600,
                fontSize: '0.875rem',
                height: 36,
                px: 1,
                borderRadius: 0.5,
                color: 'success.800',
                '& .MuiChip-icon': {
                  color: 'success.main',
                  fontSize: '1.2rem',
                  ml: 0.5
                },
                '&:hover': {
                  bgcolor: 'success.main',
                  borderColor: 'success.main',
                  color: 'white',
                  boxShadow: '0 4px 12px rgba(76, 175, 80, 0.35)',
                  transform: 'translateY(-2px)',
                  '& .MuiChip-icon': {
                    color: 'white'
                  }
                },
                transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                cursor: 'default'
              }}
            />
          </Tooltip>
        ))}
      </Box>

      {/* Reviews Section */}
      {reviews && reviews.length > 0 && (
        <Box sx={{ mt: 3, pt: 3, borderTop: 1, borderColor: 'divider' }}>
          <CompactReviewsSlider reviews={reviews} autoPlay={true} autoPlayInterval={6000} reviewsPerSlide={2} />
        </Box>
      )}
    </Paper>
  );
}

export default AmenitiesList;
