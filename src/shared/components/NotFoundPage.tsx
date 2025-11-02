
import { Box, Button, Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ExploreIcon from '@mui/icons-material/Explore';
import HomeIcon from '@mui/icons-material/Home';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';

function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          py: 4,
        }}
      >
        {/* Animated Icon */}
        <Box
          sx={{
            position: 'relative',
            mb: 4,
            animation: 'float 3s ease-in-out infinite',
            '@keyframes float': {
              '0%, 100%': { transform: 'translateY(0)' },
              '50%': { transform: 'translateY(-20px)' },
            },
          }}
        >
          <TravelExploreIcon
            sx={{
              fontSize: 120,
              color: 'primary.main',
              filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.2))',
            }}
          />
        </Box>

        {/* 404 Text */}
        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: '6rem', sm: '8rem', md: '10rem' },
            fontWeight: 800,
            background: (theme) => 
              `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            mb: 2,
            lineHeight: 1,
          }}
        >
          404
        </Typography>

        {/* Main Message */}
        <Typography
          variant="h4"
          sx={{
            fontWeight: 600,
            color: 'text.primary',
            mb: 2,
            fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' },
          }}
        >
          Oops! Lost in Transit
        </Typography>

        <Typography
          variant="body1"
          sx={{
            color: 'text.secondary',
            mb: 4,
            maxWidth: 500,
            fontSize: { xs: '0.95rem', sm: '1.1rem' },
            px: 2,
          }}
        >
          Looks like this destination doesn't exist on our map. Let's get you back on track to your next adventure!
        </Typography>

        {/* Decorative Elements */}
        <Box
          sx={{
            display: 'flex',
            gap: 2,
            mb: 5,
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          {[...Array(5)].map((_, index) => (
            <Box
              key={index}
              sx={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                bgcolor: 'primary.main',
                opacity: 0.6,
                animation: `pulse 2s ease-in-out infinite ${index * 0.2}s`,
                '@keyframes pulse': {
                  '0%, 100%': {
                    transform: 'scale(1)',
                    opacity: 0.6,
                  },
                  '50%': {
                    transform: 'scale(1.5)',
                    opacity: 1,
                  },
                },
              }}
            />
          ))}
        </Box>

        {/* Action Buttons */}
        <Box
          sx={{
            display: 'flex',
            gap: 2,
            flexDirection: { xs: 'column', sm: 'row' },
            width: { xs: '100%', sm: 'auto' },
            px: 2,
          }}
        >
          <Button
            variant="contained"
            size="large"
            startIcon={<HomeIcon />}
            onClick={() => navigate('/')}
            sx={{
              px: 4,
              py: 1.5,
              borderRadius: 2,
              textTransform: 'none',
              fontSize: '1rem',
              fontWeight: 600,
              boxShadow: 4,
              '&:hover': {
                boxShadow: 8,
                transform: 'translateY(-2px)',
              },
              transition: 'all 0.3s ease',
            }}
          >
            Back to Home
          </Button>

          <Button
            variant="outlined"
            size="large"
            startIcon={<ExploreIcon />}
            onClick={() => navigate(-1)}
            sx={{
              px: 4,
              py: 1.5,
              borderRadius: 2,
              textTransform: 'none',
              fontSize: '1rem',
              fontWeight: 600,
              borderWidth: 2,
              '&:hover': {
                borderWidth: 2,
                transform: 'translateY(-2px)',
              },
              transition: 'all 0.3s ease',
            }}
          >
            Go Back
          </Button>
        </Box>

        {/* Footer Text */}
        <Typography
          variant="caption"
          sx={{
            mt: 6,
            color: 'text.disabled',
            fontStyle: 'italic',
          }}
        >
          Error Code: 404 - Page Not Found
        </Typography>
      </Box>
    </Container>
  );
}

export default NotFoundPage;