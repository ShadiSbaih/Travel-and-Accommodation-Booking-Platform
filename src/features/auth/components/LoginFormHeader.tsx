import { Box, Typography, useTheme } from '@mui/material';
import Plane from '@/assets/plane.svg';

const LoginFormHeader = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  return (
    <>
      {/* Plane Icon */}
      <Box
        sx={{
          position: 'relative',
          mb: 6,
          display: 'flex',
          justifyContent: 'flex-end',
        }}
      >
        <Box
          component="img"
          src={Plane}
          alt="Plane"
          sx={{
            height: { xs: '8rem', sm: '10rem' },
            width: { xs: '16rem', sm: '20rem' },
            filter: isDark ? 'none' : 'brightness(0.7)',
          }}
        />
      </Box>

      {/* Welcome Header */}
      <Box sx={{ textAlign: 'center' }}>
        <Typography
          variant="h2"
          sx={{
            fontSize: { xs: '2.5rem', sm: '3rem' },
            fontWeight: 'bold',
            color: '#14b8a6',
          }}
        >
          Welcome
        </Typography>
        <Typography
          variant="body2"
          sx={{
            mt: 1,
            fontSize: '0.875rem',
            color: isDark ? 'rgb(209, 213, 219)' : 'rgb(100, 116, 139)',
          }}
        >
          Login with Username
        </Typography>
      </Box>
    </>
  );
};

export default LoginFormHeader;
