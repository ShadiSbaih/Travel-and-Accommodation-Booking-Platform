import { Container, Box, Skeleton } from '@mui/material';
import HotelGallerySkeleton from './HotelGallerySkeleton';
import HotelSidebarSkeleton from './HotelSidebarSkeleton';
import RoomCardSkeleton from './RoomCardSkeleton';

interface HotelDetailsPageSkeletonProps {
  roomCount?: number;
}

function HotelDetailsPageSkeleton({ roomCount = 4 }: HotelDetailsPageSkeletonProps) {
  return (
    <>
      <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', pb: 6 }}>
        <Container maxWidth="xl" sx={{ mt: 3, px: { xs: 2, md: 3 } }}>
          <Box sx={{ display: 'flex', gap: 4, flexDirection: { xs: 'column', lg: 'row' } }}>
            {/* Main Content */}
            <Box sx={{ flex: { xs: '1 1 100%', lg: '0 0 65%' } }}>
              {/* Gallery Skeleton */}
              <HotelGallerySkeleton />

              {/* Rooms Section Skeleton */}
              <Box>
                {/* Rooms Header */}
                <Box sx={{ mb: 3 }}>
                  <Skeleton variant="text" width="40%" height={40} />
                </Box>

                {/* Rooms Grid */}
                <Box
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
                    gridAutoRows: '1fr',
                    gap: 3,
                  }}
                >
                  {Array.from({ length: roomCount }).map((_, index) => (
                    <RoomCardSkeleton key={index} />
                  ))}
                </Box>
              </Box>
            </Box>

            {/* Sidebar */}
            <Box sx={{ flex: { xs: '1 1 100%', lg: '0 0 calc(35% - 32px)' } }}>
              <HotelSidebarSkeleton />
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
}

export default HotelDetailsPageSkeleton;
