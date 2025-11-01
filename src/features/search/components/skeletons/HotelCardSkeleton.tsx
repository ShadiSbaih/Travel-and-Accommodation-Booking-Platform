import { Card, CardContent, Box, Skeleton, Divider } from '@mui/material';

function HotelCardSkeleton() {
  return (
    <Card 
      sx={{ 
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Image Skeleton */}
      <Box sx={{ position: 'relative', pt: '56.25%' }}>
        <Skeleton 
          variant="rectangular" 
          sx={{ 
            position: 'absolute', 
            top: 0, 
            left: 0, 
            width: '100%', 
            height: '100%' 
          }} 
        />
      </Box>
      
      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', p: 2, '&:last-child': { pb: 2 } }}>
        {/* Header Skeleton */}
        <Skeleton variant="text" width="70%" height={28} sx={{ mb: 0.5 }} />
        <Skeleton variant="text" width="40%" height={20} sx={{ mb: 1 }} />
        
        <Divider sx={{ my: 1 }} />

        {/* Booking Details Badges Skeleton */}
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 1.5 }}>
          <Skeleton variant="rounded" width={70} height={24} />
          <Skeleton variant="rounded" width={60} height={24} />
          <Skeleton variant="rounded" width={80} height={24} />
        </Box>

        {/* Amenities Skeleton */}
        <Box sx={{ mb: 2 }}>
          <Skeleton variant="text" width="30%" height={20} sx={{ mb: 0.5 }} />
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            <Skeleton variant="rounded" width={80} height={28} />
            <Skeleton variant="rounded" width={90} height={28} />
          </Box>
        </Box>

        <Box sx={{ mt: 'auto' }}>
          <Divider sx={{ mb: 1.5 }} />
          
          {/* Price Skeleton */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5 }}>
            <Skeleton variant="text" width="40%" height={32} />
            <Skeleton variant="text" width="30%" height={28} />
          </Box>

          {/* Button Skeleton */}
          <Skeleton variant="rounded" width="100%" height={40} />
        </Box>
      </CardContent>
    </Card>
  );
}

export default HotelCardSkeleton;
