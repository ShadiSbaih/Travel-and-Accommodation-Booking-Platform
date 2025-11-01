import { memo } from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { Hotel, SearchOff } from '@mui/icons-material';

const AmenitiesFilterEmpty = memo(() => {
  return (
    <Card
      elevation={0}
      sx={{
        overflow: 'hidden',
        borderRadius: 3,
        border: '1px solid',
        borderColor: 'divider',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 36,
              height: 36,
              borderRadius: 2,
              backgroundColor: 'primary.main',
              mr: 1.5,
            }}
          >
            <Hotel sx={{ color: 'white', fontSize: 20 }} />
          </Box>
          <Typography variant="h6" fontWeight={700}>
            Amenities
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            py: 5,
            gap: 2,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 64,
              height: 64,
              borderRadius: '50%',
              backgroundColor: 'grey.100',
            }}
          >
            <SearchOff sx={{ fontSize: 32, color: 'text.secondary' }} />
          </Box>
          <Typography 
            variant="body2" 
            color="text.secondary" 
            textAlign="center"
            fontWeight={500}
          >
            No amenities available
          </Typography>
          <Typography 
            variant="caption" 
            color="text.disabled" 
            textAlign="center"
          >
            Please check back later
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
});

AmenitiesFilterEmpty.displayName = 'AmenitiesFilterEmpty';

export default AmenitiesFilterEmpty;
