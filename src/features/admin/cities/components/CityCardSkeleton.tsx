import { Card, CardContent, Box, Skeleton } from '@mui/material';

function CityCardSkeleton() {
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
        boxShadow: (theme) =>
          theme.palette.mode === 'dark'
            ? '0 4px 20px rgba(0, 0, 0, 0.3)'
            : '0 4px 20px rgba(0, 0, 0, 0.08)',
      }}
    >
      <CardContent sx={{ p: 3 }}>
        {/* City Icon & Name */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
          <Skeleton
            variant="rounded"
            width={48}
            height={48}
            sx={{
              borderRadius: 1.5,
              bgcolor: (theme) =>
                theme.palette.mode === 'dark'
                  ? 'rgba(51, 65, 85, 0.6)'
                  : 'rgba(0, 0, 0, 0.11)',
            }}
          />
          <Box sx={{ flex: 1 }}>
            <Skeleton
              variant="text"
              width="60%"
              height={28}
              sx={{
                bgcolor: (theme) =>
                  theme.palette.mode === 'dark'
                    ? 'rgba(51, 65, 85, 0.6)'
                    : 'rgba(0, 0, 0, 0.11)',
              }}
            />
            <Skeleton
              variant="text"
              width="30%"
              height={20}
              sx={{
                mt: 0.5,
                bgcolor: (theme) =>
                  theme.palette.mode === 'dark'
                    ? 'rgba(51, 65, 85, 0.6)'
                    : 'rgba(0, 0, 0, 0.11)',
              }}
            />
          </Box>
        </Box>

        {/* Description */}
        <Skeleton
          variant="text"
          width="100%"
          height={20}
          sx={{
            mb: 0.5,
            bgcolor: (theme) =>
              theme.palette.mode === 'dark'
                ? 'rgba(51, 65, 85, 0.6)'
                : 'rgba(0, 0, 0, 0.11)',
          }}
        />
        <Skeleton
          variant="text"
          width="90%"
          height={20}
          sx={{
            mb: 0.5,
            bgcolor: (theme) =>
              theme.palette.mode === 'dark'
                ? 'rgba(51, 65, 85, 0.6)'
                : 'rgba(0, 0, 0, 0.11)',
          }}
        />
        <Skeleton
          variant="text"
          width="70%"
          height={20}
          sx={{
            mb: 3,
            bgcolor: (theme) =>
              theme.palette.mode === 'dark'
                ? 'rgba(51, 65, 85, 0.6)'
                : 'rgba(0, 0, 0, 0.11)',
          }}
        />

        {/* Action Buttons */}
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Skeleton
            variant="rounded"
            width="50%"
            height={36}
            sx={{
              borderRadius: 1.5,
              bgcolor: (theme) =>
                theme.palette.mode === 'dark'
                  ? 'rgba(51, 65, 85, 0.6)'
                  : 'rgba(0, 0, 0, 0.11)',
            }}
          />
          <Skeleton
            variant="rounded"
            width="50%"
            height={36}
            sx={{
              borderRadius: 1.5,
              bgcolor: (theme) =>
                theme.palette.mode === 'dark'
                  ? 'rgba(51, 65, 85, 0.6)'
                  : 'rgba(0, 0, 0, 0.11)',
            }}
          />
        </Box>
      </CardContent>
    </Card>
  );
}

export default CityCardSkeleton;
