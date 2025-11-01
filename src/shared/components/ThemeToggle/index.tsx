import useTheme from "@/core/context/Theme/useTheme";
import { Box, Typography, Switch } from "@mui/material";
import { 
  LightMode as LightModeIcon, 
  DarkMode as DarkModeIcon,
} from "@mui/icons-material";

export const ThemeToggle = () => {
  const { setTheme, isDark } = useTheme();

  const handleToggle = () => {
    setTheme(isDark ? 'light' : 'dark');
  };

  return (
    <Box 
      onClick={handleToggle}
      sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        width: '100%',
        gap: 1.5,
        cursor: 'pointer',
        userSelect: 'none',
        '&:hover': {
          '& .icon-container': {
            transform: 'scale(1.05)',
          },
        },
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <Box
          className="icon-container"
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 36,
            height: 36,
            borderRadius: '10px',
            backgroundColor: (theme) => 
              theme.palette.mode === 'dark' 
                ? 'rgba(20, 184, 166, 0.15)' 
                : 'rgba(20, 184, 166, 0.1)',
            color: 'primary.main',
            transition: 'all 0.3s ease',
          }}
        >
          {isDark ? <DarkModeIcon sx={{ fontSize: '1.25rem' }} /> : <LightModeIcon sx={{ fontSize: '1.25rem' }} />}
        </Box>
        <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.primary' }}>
          {isDark ? 'Dark Mode' : 'Light Mode'}
        </Typography>
      </Box>
      
      <Switch
        checked={isDark}
        onChange={handleToggle}
        onClick={(e) => e.stopPropagation()}
        sx={{
          pointerEvents: 'none',
          '& .MuiSwitch-switchBase.Mui-checked': {
            color: 'primary.main',
          },
          '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
            backgroundColor: 'primary.main',
          },
        }}
      />
    </Box>
  );
};

export default ThemeToggle;