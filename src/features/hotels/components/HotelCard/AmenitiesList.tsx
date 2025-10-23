import { Paper, Box, Typography } from '@mui/material';
import { CheckCircle } from '@mui/icons-material';
import type { Amenity } from '../../types/amenities';

interface AmenitiesListProps {
  amenities: Amenity[];
  layout?: 'vertical' | 'grid';
  showTitle?: boolean;
}

function AmenitiesList({ amenities, layout = 'vertical', showTitle = true }: AmenitiesListProps) {
  if (!amenities || amenities.length === 0) return null;

  const isVertical = layout === 'vertical';

  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: 3,
        border: '1px solid',
        borderColor: 'divider'
      }}
    >
      {showTitle && (
        <Typography
          variant="h6"
          component="h2"
          gutterBottom
          sx={{
            fontWeight: 700,
            mb: 2.5,
            fontSize: '1.1rem'
          }}
        >
          Amenities & Services
        </Typography>
      )}
      <Box sx={{
        display: isVertical ? 'flex' : 'grid',
        flexDirection: isVertical ? 'column' : undefined,
        gridTemplateColumns: isVertical ? undefined : { xs: '1fr', md: 'repeat(2, 1fr)' },
        gap: isVertical ? 2 : 3
      }}>
        {amenities.map((amenity) => (
          <Box
            key={amenity.id}
            sx={{
              p: isVertical ? 2 : 2.5,
              bgcolor: 'background.paper',
              borderRadius: 2,
              border: '1px solid',
              borderColor: 'divider',
              transition: 'all 0.3s ease',
              '&:hover': {
                borderColor: 'primary.main',
                boxShadow: isVertical 
                  ? '0 2px 8px rgba(25, 118, 210, 0.12)' 
                  : '0 4px 12px rgba(25, 118, 210, 0.15)',
                transform: isVertical ? 'translateX(4px)' : 'translateY(-2px)'
              }
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
              <CheckCircle sx={{ 
                color: 'success.main', 
                fontSize: isVertical ? 20 : 24, 
                mt: 0.2, 
                flexShrink: 0 
              }} />
              <Box sx={{ flex: 1 }}>
                <Typography
                  variant={isVertical ? 'subtitle2' : 'subtitle1'}
                  sx={{
                    fontWeight: 700,
                    color: 'text.primary',
                    mb: 0.5,
                    fontSize: isVertical ? '0.95rem' : '1.05rem'
                  }}
                >
                  {amenity.name}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: 'text.secondary',
                    lineHeight: isVertical ? 1.5 : 1.6,
                    fontSize: isVertical ? '0.85rem' : '0.9rem'
                  }}
                >
                  {amenity.description}
                </Typography>
              </Box>
            </Box>
          </Box>
        ))}
      </Box>
    </Paper>
  );
}

export default AmenitiesList;
