import { Box, Typography } from '@mui/material';
import Mosque from '@/assets/mosque.svg';
import Italy from '@/assets/italy.svg';
import RoadsImage from '@/assets/roads.jpg';

const HeroSection = () => {
  return (
    <Box
      sx={{
        position: 'relative',
        display: { xs: 'none', lg: 'flex' },
        width: '50%',
        flexDirection: 'column',
        justifyContent: 'space-between',
        overflow: 'hidden',
      }}
    >
      {/* Background Image */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url(${RoadsImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      
      {/* Overlay */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          bgcolor: 'rgba(6, 19, 42, 0.7)',
        }}
      />

      {/* Content */}
      <Box
        sx={{
          position: 'relative',
          zIndex: 10,
          display: 'flex',
          height: '100%',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          p: { xs: 2, sm: 3, md: 4 },
        }}
      >
        <Box
          sx={{
            width: '100%',
            maxWidth: '48rem',
            textAlign: 'center',
          }}
        >
          <Typography
            variant="h1"
            sx={{
              fontSize: {
                xs: '2.25rem',
                sm: '3rem',
                md: '3.75rem',
                lg: '4.5rem',
                xl: '6rem',
              },
              fontFamily: 'Georgia, serif',
              fontStyle: 'italic',
              lineHeight: 1.2,
              color: 'white',
            }}
          >
            Feel at Home, Anywhere
          </Typography>
          
          <Typography
            variant="body1"
            sx={{
              mt: { xs: 3, sm: 4 },
              fontSize: {
                xs: '1rem',
                sm: '1.125rem',
                md: '1.25rem',
                lg: '1.5rem',
              },
              color: 'rgb(229, 231, 235)',
            }}
          >
            From cozy Apartments to Luxury resorts your comfort is everywhere
          </Typography>
        </Box>
      </Box>

      {/* Images positioned absolutely in corners */}
      <Box
        component="img"
        src={Mosque}
        alt="Mosque"
        sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          height: '7rem',
          opacity: 0.8,
        }}
      />
      <Box
        component="img"
        src={Italy}
        alt="Italy"
        sx={{
          position: 'absolute',
          bottom: 0,
          right: 0,
          height: '8rem',
          opacity: 0.8,
        }}
      />
    </Box>
  );
};

export default HeroSection;
