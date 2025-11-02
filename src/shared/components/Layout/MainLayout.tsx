import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Navbar from '@/shared/components/Navbar';
import { Footer } from '@/shared/components/Footer';

export const MainLayout = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      <Navbar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Outlet />
      </Box>
      <Footer />
    </Box>
  );
};
