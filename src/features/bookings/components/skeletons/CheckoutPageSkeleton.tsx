import { Skeleton, Box, Container, Card, CardContent, Stack } from '@mui/material';

/**
 * Skeleton loader for Checkout Page
 */
function CheckoutPageSkeleton() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: 'background.default',
        py: 4,
      }}
    >
      <Container maxWidth="xl">
        {/* Header Skeleton */}
        <Box sx={{ mb: 3 }}>
          <Skeleton variant="text" width={200} height={40} sx={{ mb: 1 }} />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Skeleton variant="text" width={150} height={30} />
            <Skeleton variant="rectangular" width={120} height={40} sx={{ borderRadius: 1 }} />
          </Box>
        </Box>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', lg: '2fr 1fr' },
            gap: 3,
          }}
        >
          {/* Cart Items Skeleton */}
          <Box>
            <Stack spacing={2}>
              {[1, 2, 3].map((item) => (
                <Card
                  key={item}
                  elevation={0}
                  sx={{
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: 2,
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Box
                      sx={{
                        display: 'grid',
                        gridTemplateColumns: {
                          xs: '1fr',
                          sm: '1fr 2fr',
                          md: '1fr 3fr',
                        },
                        gap: 2,
                      }}
                    >
                      {/* Image Skeleton */}
                      <Skeleton
                        variant="rectangular"
                        sx={{
                          borderRadius: 2,
                          height: { xs: 200, sm: 180 },
                        }}
                      />

                      {/* Details Skeleton */}
                      <Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                          <Box sx={{ flex: 1 }}>
                            <Skeleton variant="text" width="80%" height={32} />
                            <Skeleton variant="text" width="60%" height={24} />
                          </Box>
                          <Skeleton variant="circular" width={40} height={40} />
                        </Box>

                        <Stack spacing={1} sx={{ mb: 2 }}>
                          <Skeleton variant="text" width="40%" height={20} />
                          <Skeleton variant="text" width="50%" height={20} />
                          <Skeleton variant="text" width="45%" height={20} />
                        </Stack>

                        <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                          {[1, 2, 3].map((chip) => (
                            <Skeleton key={chip} variant="rectangular" width={80} height={28} sx={{ borderRadius: 5 }} />
                          ))}
                        </Box>

                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Skeleton variant="text" width={120} height={28} />
                          <Skeleton variant="text" width={100} height={36} />
                        </Box>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </Stack>
          </Box>

          {/* Order Summary Skeleton */}
          <Box>
            <Card
              elevation={0}
              sx={{
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 2,
                position: 'sticky',
                top: 80,
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Skeleton variant="text" width="60%" height={32} sx={{ mb: 3 }} />

                <Stack spacing={2} sx={{ mb: 3 }}>
                  {[1, 2, 3, 4].map((row) => (
                    <Box key={row} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Skeleton variant="text" width="40%" height={24} />
                      <Skeleton variant="text" width="30%" height={24} />
                    </Box>
                  ))}
                </Stack>

                <Skeleton
                  variant="rectangular"
                  width="100%"
                  height={48}
                  sx={{ borderRadius: 1, mb: 2 }}
                />

                <Stack spacing={1}>
                  <Skeleton variant="text" width="80%" height={20} />
                  <Skeleton variant="text" width="70%" height={20} />
                </Stack>
              </CardContent>
            </Card>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default CheckoutPageSkeleton;
