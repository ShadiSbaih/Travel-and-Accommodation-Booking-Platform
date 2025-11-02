import { Card, CardContent, Box, Skeleton, Stack } from '@mui/material';

function RoomCardSkeleton() {
  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        background: (theme) =>
          theme.palette.mode === 'dark'
            ? 'rgba(30, 41, 59, 0.95)'
            : 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(20px)',
        borderRadius: 2,
        boxShadow: (theme) =>
          theme.palette.mode === 'dark'
            ? '0 4px 20px rgba(0, 0, 0, 0.3)'
            : '0 4px 20px rgba(0, 0, 0, 0.08)',
        border: (theme) =>
          theme.palette.mode === 'dark'
            ? '1px solid rgba(148, 163, 184, 0.1)'
            : 'none',
      }}
    >
      {/* Room Image with Badges */}
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          height: 200,
          overflow: 'hidden',
        }}
      >
        <Skeleton
          variant="rectangular"
          width="100%"
          height={200}
          sx={{
            bgcolor: (theme) =>
              theme.palette.mode === 'dark'
                ? 'rgba(51, 65, 85, 0.6)'
                : 'rgba(0, 0, 0, 0.11)',
          }}
        />
        {/* Room Number Badge */}
        <Box
          sx={{
            position: 'absolute',
            top: 12,
            left: 12,
          }}
        >
          <Skeleton
            variant="rounded"
            width={100}
            height={28}
            sx={{
              borderRadius: 1.5,
              bgcolor: (theme) =>
                theme.palette.mode === 'dark'
                  ? 'rgba(6, 182, 212, 0.3)'
                  : 'rgba(20, 184, 166, 0.3)',
            }}
          />
        </Box>
        {/* Availability Badge */}
        <Box
          sx={{
            position: 'absolute',
            top: 12,
            right: 12,
          }}
        >
          <Skeleton
            variant="rounded"
            width={80}
            height={24}
            sx={{
              borderRadius: 1,
              bgcolor: (theme) =>
                theme.palette.mode === 'dark'
                  ? 'rgba(34, 197, 94, 0.3)'
                  : 'rgba(34, 197, 94, 0.3)',
            }}
          />
        </Box>
      </Box>

      <CardContent sx={{ p: 3, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Room Type & Price */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Skeleton
            variant="text"
            width="50%"
            height={32}
            sx={{
              bgcolor: (theme) =>
                theme.palette.mode === 'dark'
                  ? 'rgba(51, 65, 85, 0.6)'
                  : 'rgba(0, 0, 0, 0.11)',
            }}
          />
          <Skeleton
            variant="text"
            width="25%"
            height={32}
            sx={{
              bgcolor: (theme) =>
                theme.palette.mode === 'dark'
                  ? 'rgba(51, 65, 85, 0.6)'
                  : 'rgba(0, 0, 0, 0.11)',
            }}
          />
        </Box>

        {/* Capacity Badges */}
        <Stack direction="row" spacing={1.5} sx={{ mb: 2.5 }}>
          <Skeleton
            variant="rounded"
            width={90}
            height={24}
            sx={{
              borderRadius: 3,
              bgcolor: (theme) =>
                theme.palette.mode === 'dark'
                  ? 'rgba(59, 130, 246, 0.3)'
                  : 'rgba(59, 130, 246, 0.2)',
            }}
          />
          <Skeleton
            variant="rounded"
            width={100}
            height={24}
            sx={{
              borderRadius: 3,
              bgcolor: (theme) =>
                theme.palette.mode === 'dark'
                  ? 'rgba(34, 197, 94, 0.3)'
                  : 'rgba(34, 197, 94, 0.2)',
            }}
          />
        </Stack>

        {/* Amenities Section */}
        <Box sx={{ mb: 3, flexGrow: 1 }}>
          <Skeleton
            variant="text"
            width="30%"
            height={20}
            sx={{
              mb: 1,
              bgcolor: (theme) =>
                theme.palette.mode === 'dark'
                  ? 'rgba(51, 65, 85, 0.6)'
                  : 'rgba(0, 0, 0, 0.11)',
            }}
          />
          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
            <Skeleton
              variant="rounded"
              width={80}
              height={24}
              sx={{
                borderRadius: 3,
                bgcolor: (theme) =>
                  theme.palette.mode === 'dark'
                    ? 'rgba(148, 163, 184, 0.3)'
                    : 'rgba(148, 163, 184, 0.2)',
              }}
            />
          </Stack>
        </Box>

        {/* Action Buttons */}
        <Stack direction="row" spacing={1.5}>
          <Skeleton
            variant="rounded"
            width="50%"
            height={40}
            sx={{
              borderRadius: 2,
              bgcolor: (theme) =>
                theme.palette.mode === 'dark'
                  ? 'rgba(51, 65, 85, 0.6)'
                  : 'rgba(0, 0, 0, 0.11)',
            }}
          />
          <Skeleton
            variant="rounded"
            width="50%"
            height={40}
            sx={{
              borderRadius: 2,
              bgcolor: (theme) =>
                theme.palette.mode === 'dark'
                  ? 'rgba(51, 65, 85, 0.6)'
                  : 'rgba(0, 0, 0, 0.11)',
            }}
          />
        </Stack>
      </CardContent>
    </Card>
  );
}

export default RoomCardSkeleton;
