import { Paper, Skeleton, Box } from '@mui/material';

function HotelGallerySkeleton() {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 0,
        borderRadius: 3,
        overflow: 'hidden',
        border: '1px solid',
        borderColor: 'divider',
        mb: 4,
      }}
    >
      <Skeleton
        variant="rectangular"
        height={500}
        sx={{
          borderRadius: 0,
        }}
      />
      {/* Navigation dots skeleton */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          gap: 1,
          position: 'absolute',
          bottom: 16,
          left: '50%',
          transform: 'translateX(-50%)',
        }}
      >
        {[1, 2, 3, 4, 5].map((dot) => (
          <Skeleton key={dot} variant="circular" width={10} height={10} />
        ))}
      </Box>
    </Paper>
  );
}

export default HotelGallerySkeleton;
