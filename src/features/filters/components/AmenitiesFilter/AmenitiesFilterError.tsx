import { memo } from 'react';
import { Card, CardContent, Typography, Box, Alert } from '@mui/material';
import { Hotel, ErrorOutline } from '@mui/icons-material';

const AmenitiesFilterError = memo(() => {
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

        <Alert 
          severity="error" 
          icon={<ErrorOutline />}
          sx={{
            borderRadius: 2,
            '& .MuiAlert-message': {
              width: '100%'
            }
          }}
        >
          <Typography variant="body2" fontWeight={600} gutterBottom>
            Failed to load amenities
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Please try refreshing the page or check your connection
          </Typography>
        </Alert>
      </CardContent>
    </Card>
  );
});

AmenitiesFilterError.displayName = 'AmenitiesFilterError';

export default AmenitiesFilterError;
