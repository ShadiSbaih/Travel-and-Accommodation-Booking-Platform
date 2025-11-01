import { Box } from '@mui/material';
import HeroSection from './HeroSection';
import LoginFormHeader from './LoginFormHeader';
import LoginForm from './LoginForm';

function LoginPage() {
  return (
    <Box
      sx={{
        display: 'flex',
        minHeight: '100vh',
        bgcolor: '#06132a',
        color: 'white',
      }}
    >
      {/* Left Section - Hero */}
      <HeroSection />

      {/* Right Section - Login Form */}
      <Box
        sx={{
          display: 'flex',
          width: { xs: '100%', lg: '50%' },
          alignItems: 'flex-start',
          justifyContent: 'center',
          px: 3,
          pt: 10,
        }}
      >
        <Box sx={{ width: '100%', maxWidth: '28rem' }}>
          <LoginFormHeader />
          <LoginForm />
        </Box>
      </Box>
    </Box>
  );
}

export default LoginPage;
