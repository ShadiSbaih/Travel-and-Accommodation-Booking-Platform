import { Box, Paper, Skeleton, Divider } from '@mui/material';

function HotelSidebarSkeleton() {
  return (
    <Box
      sx={{
        position: { lg: 'sticky' },
        top: { lg: 24 },
      }}
    >
      {/* Hotel Info Banner Skeleton */}
      <Paper
        elevation={0}
        sx={{
          p: 3,
          borderRadius: 2,
          border: '1px solid',
          borderColor: 'divider',
          mb: 3,
        }}
      >
        {/* Title */}
        <Skeleton variant="text" width="80%" height={32} sx={{ mb: 1 }} />
        
        {/* Location */}
        <Skeleton variant="text" width="60%" height={24} sx={{ mb: 2 }} />
        
        {/* Star Rating */}
        <Box sx={{ display: 'flex', gap: 0.5, mb: 2 }}>
          {[1, 2, 3, 4, 5].map((star) => (
            <Skeleton key={star} variant="circular" width={24} height={24} />
          ))}
        </Box>
        
        <Divider sx={{ my: 2 }} />
        
        {/* Description lines */}
        <Skeleton variant="text" width="100%" height={20} sx={{ mb: 0.5 }} />
        <Skeleton variant="text" width="100%" height={20} sx={{ mb: 0.5 }} />
        <Skeleton variant="text" width="90%" height={20} sx={{ mb: 0.5 }} />
        <Skeleton variant="text" width="75%" height={20} />
      </Paper>

      {/* Amenities for mobile/tablet */}
      <Box sx={{ display: { xs: 'block', lg: 'none' } }}>
        <Paper
          elevation={0}
          sx={{
            p: 3,
            borderRadius: 2,
            border: '1px solid',
            borderColor: 'divider',
            mb: 3,
          }}
        >
          <Skeleton variant="text" width="40%" height={28} sx={{ mb: 2 }} />
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <Skeleton key={item} variant="rounded" width={100} height={36} />
            ))}
          </Box>
        </Paper>
      </Box>

      {/* Map Skeleton */}
      <Paper
        elevation={0}
        sx={{
          p: 0,
          borderRadius: 2,
          overflow: 'hidden',
          border: '1px solid',
          borderColor: 'divider',
          mb: 3,
        }}
      >
        <Skeleton variant="rectangular" height={250} sx={{ borderRadius: 0 }} />
      </Paper>

      {/* Amenities for desktop */}
      <Box sx={{ display: { xs: 'none', lg: 'block' } }}>
        <Paper
          elevation={0}
          sx={{
            p: 3,
            borderRadius: 2,
            border: '1px solid',
            borderColor: 'divider',
          }}
        >
          <Skeleton variant="text" width="40%" height={28} sx={{ mb: 2 }} />
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <Skeleton key={item} variant="rounded" width={100} height={36} />
            ))}
          </Box>
        </Paper>
      </Box>
    </Box>
  );
}

export default HotelSidebarSkeleton;
