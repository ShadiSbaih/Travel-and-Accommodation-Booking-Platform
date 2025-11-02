import { Card, CardContent, Box, Skeleton } from '@mui/material';

function HotelCardSkeleton() {
  return (
    <Card
      sx={{
        height: '100%',
        background: (theme) =>
          theme.palette.mode === 'dark'
            ? 'rgba(30, 41, 59, 0.95)'
            : 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(20px)',
        borderRadius: 2,
      }}
    >
      {/* Image Skeleton */}
      <Skeleton
        variant="rectangular"
        height={200}
        sx={{
          bgcolor: (theme) =>
            theme.palette.mode === 'dark' ? 'rgba(51, 65, 85, 0.5)' : 'grey.200',
        }}
      />
      
      <CardContent sx={{ p: 3 }}>
        {/* Header Skeleton */}
        <Box sx={{ display: 'flex', gap: 1.5, mb: 2 }}>
          <Skeleton
            variant="rounded"
            width={48}
            height={48}
            sx={{
              bgcolor: (theme) =>
                theme.palette.mode === 'dark' ? 'rgba(51, 65, 85, 0.5)' : 'grey.200',
            }}
          />
          <Box sx={{ flex: 1 }}>
            <Skeleton
              variant="text"
              width="70%"
              sx={{
                bgcolor: (theme) =>
                  theme.palette.mode === 'dark' ? 'rgba(51, 65, 85, 0.5)' : 'grey.200',
              }}
            />
            <Skeleton
              variant="text"
              width="40%"
              sx={{
                bgcolor: (theme) =>
                  theme.palette.mode === 'dark' ? 'rgba(51, 65, 85, 0.5)' : 'grey.200',
              }}
            />
          </Box>
        </Box>

        {/* Location & Rooms Skeleton */}
        <Box sx={{ mb: 2 }}>
          <Skeleton
            variant="text"
            width="60%"
            sx={{
              bgcolor: (theme) =>
                theme.palette.mode === 'dark' ? 'rgba(51, 65, 85, 0.5)' : 'grey.200',
              mb: 1,
            }}
          />
          <Skeleton
            variant="text"
            width="50%"
            sx={{
              bgcolor: (theme) =>
                theme.palette.mode === 'dark' ? 'rgba(51, 65, 85, 0.5)' : 'grey.200',
            }}
          />
        </Box>

        {/* Description Skeleton */}
        <Box sx={{ mb: 3 }}>
          <Skeleton
            variant="text"
            sx={{
              bgcolor: (theme) =>
                theme.palette.mode === 'dark' ? 'rgba(51, 65, 85, 0.5)' : 'grey.200',
            }}
          />
          <Skeleton
            variant="text"
            sx={{
              bgcolor: (theme) =>
                theme.palette.mode === 'dark' ? 'rgba(51, 65, 85, 0.5)' : 'grey.200',
            }}
          />
          <Skeleton
            variant="text"
            width="80%"
            sx={{
              bgcolor: (theme) =>
                theme.palette.mode === 'dark' ? 'rgba(51, 65, 85, 0.5)' : 'grey.200',
            }}
          />
        </Box>

        {/* Buttons Skeleton */}
        <Box sx={{ display: 'flex', gap: 1, pt: 2 }}>
          <Skeleton
            variant="rounded"
            height={36}
            sx={{
              flex: 1,
              bgcolor: (theme) =>
                theme.palette.mode === 'dark' ? 'rgba(51, 65, 85, 0.5)' : 'grey.200',
            }}
          />
          <Skeleton
            variant="rounded"
            height={36}
            sx={{
              flex: 1,
              bgcolor: (theme) =>
                theme.palette.mode === 'dark' ? 'rgba(51, 65, 85, 0.5)' : 'grey.200',
            }}
          />
        </Box>
      </CardContent>
    </Card>
  );
}

export default HotelCardSkeleton;
