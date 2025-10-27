import { Box } from '@mui/material';
import { ErrorOutline } from '@mui/icons-material';

function ErrorIcon() {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        mb: 3,
      }}
    >
      <Box
        sx={{
          width: 80,
          height: 80,
          borderRadius: '50%',
          bgcolor: 'error.light',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          animation: 'pulse 2s infinite',
          '@keyframes pulse': {
            '0%, 100%': {
              opacity: 1,
            },
            '50%': {
              opacity: 0.7,
            },
          },
        }}
      >
        <ErrorOutline
          sx={{
            fontSize: 48,
            color: 'error.main',
          }}
        />
      </Box>
    </Box>
  );
}

export default ErrorIcon;
