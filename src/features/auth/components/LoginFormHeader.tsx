import { Box, Typography } from '@mui/material';
import Plane from '@/assets/plane.svg';

const LoginFormHeader = () => {
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
            width: { xs: '8rem', sm: '10rem' },
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
            color: '#00b6ff',
          }}
        >
          Welcome
        </Typography>
        <Typography
          variant="body2"
          sx={{
            mt: 1,
            fontSize: '0.875rem',
            color: 'rgb(209, 213, 219)',
          }}
        >
          Login with Username
        </Typography>
      </Box>
    </>
  );
};

export default LoginFormHeader;
