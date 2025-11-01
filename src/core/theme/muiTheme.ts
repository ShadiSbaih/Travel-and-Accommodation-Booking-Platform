import { createTheme } from '@mui/material/styles';

// 🌴 Tropical Paradise Theme
export const createAppTheme = (isDark: boolean) => {
  return createTheme({
    palette: {
      mode: isDark ? 'dark' : 'light',
      primary: {
        main: '#14b8a6', // Teal
        light: '#2dd4bf',
        dark: '#0d9488',
        contrastText: '#ffffff',
      },
      secondary: {
        main: '#06b6d4', // Cyan
        light: '#22d3ee',
        dark: '#0891b2',
        contrastText: '#ffffff',
      },
      error: {
        main: '#ef4444',
        light: '#f87171',
        dark: '#dc2626',
      },
      warning: {
        main: '#f97316', // Orange accent
        light: '#fb923c',
        dark: '#ea580c',
      },
      info: {
        main: '#0ea5e9',
        light: '#38bdf8',
        dark: '#0284c7',
      },
      success: {
        main: '#22c55e',
        light: '#4ade80',
        dark: '#16a34a',
      },
      background: {
        default: isDark ? '#0f172a' : '#fafaf9', // Darker slate for better contrast
        paper: isDark ? '#1e293b' : '#ffffff', // Lighter paper for cards
      },
      text: {
        primary: isDark ? '#f0fdfa' : '#134e4a',
        secondary: isDark ? '#99f6e4' : '#0f766e', // Brighter teal for better readability
      },
      divider: isDark ? 'rgba(20, 184, 166, 0.12)' : 'rgba(0, 0, 0, 0.12)',
    },
    typography: {
      fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
      h1: {
        fontWeight: 700,
      },
      h2: {
        fontWeight: 600,
      },
      h3: {
        fontWeight: 600,
      },
      button: {
        textTransform: 'none',
        fontWeight: 600,
      },
    },
    shape: {
      borderRadius: 16,
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: '16px',
            padding: '10px 24px',
            fontWeight: 600,
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: isDark 
                ? '0 4px 20px rgba(20, 184, 166, 0.4)' 
                : '0 4px 12px rgba(20, 184, 166, 0.3)',
            },
          },
          contained: {
            boxShadow: isDark 
              ? '0 2px 8px rgba(20, 184, 166, 0.3)' 
              : '0 2px 8px rgba(20, 184, 166, 0.2)',
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: () => ({
            borderRadius: '20px',
            boxShadow: isDark 
              ? '0 4px 16px rgba(0, 0, 0, 0.4), 0 0 1px rgba(20, 184, 166, 0.3)' 
              : '0 2px 12px rgba(0, 0, 0, 0.08)',
            transition: 'all 0.3s ease',
            border: isDark ? '1px solid rgba(20, 184, 166, 0.2)' : 'none',
            backgroundColor: isDark ? '#1e293b' : '#ffffff',
            '&:hover': {
              boxShadow: isDark 
                ? '0 8px 32px rgba(20, 184, 166, 0.25), 0 0 2px rgba(20, 184, 166, 0.5)' 
                : '0 8px 24px rgba(20, 184, 166, 0.15)',
              transform: 'translateY(-4px)',
              borderColor: isDark ? 'rgba(20, 184, 166, 0.4)' : undefined,
            },
          }),
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            // Glassy effect is now applied directly in Navbar component
            background: 'transparent',
            boxShadow: 'none',
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            borderRadius: '12px',
            fontWeight: 600,
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            '& .MuiOutlinedInput-root': {
              borderRadius: '16px',
              backgroundColor: isDark ? 'rgba(30, 41, 59, 0.5)' : 'transparent',
              '&:hover fieldset': {
                borderColor: '#14b8a6',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#14b8a6',
                borderWidth: '2px',
              },
            },
            '& .MuiInputLabel-root.Mui-focused': {
              color: '#14b8a6',
            },
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: isDark 
              ? 'linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05))' 
              : 'none',
          },
        },
      },
    },
  });
};
