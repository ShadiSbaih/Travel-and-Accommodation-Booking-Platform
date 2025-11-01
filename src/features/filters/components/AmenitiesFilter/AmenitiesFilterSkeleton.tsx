import { Card, CardContent, Box, Skeleton } from '@mui/material';

const AmenitiesFilterSkeleton = () => {
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
      <CardContent sx={{ p: 0 }}>
        {/* Header Skeleton */}
        <Box 
          sx={{ 
            p: 2, 
            pb: 2,
            background: 'linear-gradient(135deg, rgba(25, 118, 210, 0.05) 0%, rgba(25, 118, 210, 0.02) 100%)',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Skeleton variant="rectangular" width={36} height={36} sx={{ borderRadius: 2, mr: 1.5 }} />
            <Skeleton variant="text" width={120} height={32} />
          </Box>
        </Box>

        {/* Filter Mode Switch Skeleton */}
        <Box sx={{ p: 3, pt: 2.5 }}>
          <Box sx={{ 
            display: 'flex', 
            gap: 1, 
            p: 0.5, 
            bgcolor: 'grey.100', 
            borderRadius: 2,
            mb: 2
          }}>
            <Skeleton variant="rectangular" width="50%" height={36} sx={{ borderRadius: 1.5 }} />
            <Skeleton variant="rectangular" width="50%" height={36} sx={{ borderRadius: 1.5 }} />
          </Box>

          {/* Amenities List Skeleton */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <Box key={item} sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Skeleton variant="rectangular" width={20} height={20} sx={{ borderRadius: 0.5 }} />
                <Skeleton variant="text" width={`${60 + Math.random() * 30}%`} height={24} />
              </Box>
            ))}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default AmenitiesFilterSkeleton;
