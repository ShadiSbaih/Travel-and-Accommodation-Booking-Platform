import { Box, Container, Typography, Paper } from '@mui/material';
import { TravelExplore as TravelIcon } from '@mui/icons-material';
import SearchBar from '@/features/search/components/SearchBar';
import type { HeroSectionProps } from '../types';

function HeroSection({ userName }: HeroSectionProps) {
  return (
    <Box
      sx={{
        background: 'linear-gradient(135deg, #14b8a6 0%, #06b6d4 50%, #0891b2 100%)',
        py: { xs: 6, sm: 8, md: 10 },
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background:
            'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.15) 0%, transparent 50%)',
        },
      }}
    >
      <Container maxWidth="lg" sx={{ position: 'relative' }}>
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 1,
              mb: 2,
            }}
          >
            <TravelIcon sx={{ fontSize: { xs: '2rem', md: '2.5rem' }, color: 'white' }} />
            <Typography
              variant="h2"
              component="h1"
              sx={{
                color: 'white',
                fontWeight: 800,
                fontSize: { xs: '1.75rem', sm: '2.5rem', md: '3rem' },
              }}
            >
              Find Your Perfect Stay
            </Typography>
          </Box>
          
          {userName && (
            <Typography
              variant="h2"
              component="h2"
              sx={{
                color: 'rgba(255, 255, 255, 0.95)',
                fontWeight: 400,
                mb: 1,
                fontSize: { xs: '1rem', sm: '1.25rem', md: '1.5rem' },
              }}
            >
              Welcome back, {userName}!
            </Typography>
          )}
          
          <Typography
            variant="body1"
            sx={{
              color: 'rgba(255, 255, 255, 0.9)',
              fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
              maxWidth: 600,
              mx: 'auto',
            }}
          >
            Discover amazing hotels and destinations for your next adventure
          </Typography>
        </Box>

        <Paper
          elevation={8}
          sx={{
            borderRadius: 2,
            overflow: 'hidden',
          }}
        >
          <SearchBar />
        </Paper>
      </Container>
    </Box>
  );
}

export default HeroSection;
