import { Card, CardContent, Box, Skeleton } from '@mui/material';

function RoomCardSkeleton() {
  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: 1,
        border: '1px solid',
        borderColor: 'divider',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        minHeight: 580,
      }}
    >
      {/* Image Skeleton */}
      <Box sx={{ position: 'relative' }}>
        <Skeleton variant="rectangular" height={220} sx={{ borderRadius: 0 }} />
        {/* Availability Badge Skeleton */}
        <Skeleton
          variant="rounded"
          width={90}
          height={24}
          sx={{
            position: 'absolute',
            top: 12,
            right: 12,
          }}
        />
      </Box>

      <CardContent sx={{ p: 3, display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        {/* Room Title Skeleton */}
        <Skeleton variant="text" width="80%" height={32} sx={{ mb: 2 }} />

        {/* Capacity Chips Skeleton */}
        <Box sx={{ display: 'flex', gap: 1.5, mb: 3, flexWrap: 'wrap' }}>
          <Skeleton variant="rounded" width={120} height={36} />
          <Skeleton variant="rounded" width={130} height={36} />
        </Box>

        {/* Amenities Section Skeleton */}
        <Box sx={{ mb: 3, flexGrow: 1 }}>
          <Skeleton variant="text" width="40%" height={24} sx={{ mb: 1.5 }} />
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {[1, 2, 3, 4].map((item) => (
              <Skeleton key={item} variant="rounded" width={90} height={32} />
            ))}
          </Box>
        </Box>

        {/* Price Section Skeleton */}
        <Box sx={{ mt: 'auto' }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              mb: 2,
            }}
          >
            <Box sx={{ flex: 1 }}>
              <Skeleton variant="text" width="60%" height={20} sx={{ mb: 0.5 }} />
              <Skeleton variant="text" width="80%" height={36} />
            </Box>
          </Box>

          {/* Button Skeleton */}
          <Skeleton variant="rounded" width="100%" height={48} sx={{ borderRadius: 1 }} />
        </Box>
      </CardContent>
    </Card>
  );
}

export default RoomCardSkeleton;
