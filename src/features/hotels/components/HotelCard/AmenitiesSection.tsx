import { Box, Typography, Stack, Chip } from '@mui/material';
import type { AmenitiesSectionProps } from './types';

function AmenitiesSection({ amenities, maxDisplay = 2 }: AmenitiesSectionProps) {
  if (amenities.length === 0) {
    return null;
  }

  return (
    <Box sx={{ mb: 1.5 }}>
      <Typography
        variant="caption"
        sx={{
          fontWeight: 600,
          color: 'text.secondary',
          textTransform: 'uppercase',
          letterSpacing: 0.5,
          mb: 0.5,
          display: 'block',
          fontSize: '0.7rem'
        }}
      >
        Amenities
      </Typography>
      <Stack direction="row" spacing={0.5} flexWrap="wrap" useFlexGap>
        {amenities.slice(0, maxDisplay).map((amenity) => (
          <Chip
            key={amenity.id}
            label={amenity.name}
            size="small"
            variant="outlined"
            sx={{
              fontSize: '0.7rem',
              height: 22
            }}
          />
        ))}
        {amenities.length > maxDisplay && (
          <Chip
            label={`+${amenities.length - maxDisplay}`}
            size="small"
            variant="filled"
            sx={{
              fontSize: '0.7rem',
              height: 22,
              backgroundColor: 'action.hover'
            }}
          />
        )}
      </Stack>
    </Box>
  );
}

export default AmenitiesSection;
