import type { SxProps, Theme } from '@mui/material';

export const MIN_SWIPE_DISTANCE = 50;

export const MOBILE_HEIGHT = 300;
export const TABLET_HEIGHT = 400;

export const NAVIGATION_BUTTON_STYLE: SxProps<Theme> = {
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  zIndex: 20,
  width: { xs: 32, md: 48 },
  height: { xs: 32, md: 48 },
  bgcolor: 'rgba(0, 0, 0, 0.5)',
  backdropFilter: 'blur(4px)',
  color: 'white',
  transition: 'all 0.2s',
  '&:hover': { bgcolor: 'rgba(0, 0, 0, 0.7)' },
};

export const AUTOPLAY_BUTTON_STYLE: SxProps<Theme> = {
  position: 'absolute',
  bottom: { xs: 4, sm: 8, md: 16 },
  right: { xs: 4, sm: 8, md: 16 },
  zIndex: 20,
  width: { xs: 28, sm: 32, md: 40 },
  height: { xs: 28, sm: 32, md: 40 },
  bgcolor: 'rgba(0, 0, 0, 0.5)',
  backdropFilter: 'blur(4px)',
  color: 'white',
  '&:hover': { bgcolor: 'rgba(0, 0, 0, 0.7)' },
};

export const FULLSCREEN_BUTTON_STYLE: SxProps<Theme> = {
  position: 'absolute',
  top: { xs: 8, sm: 12, md: 16 },
  right: { xs: 8, sm: 12, md: 16 },
  zIndex: 20,
  width: { xs: 32, sm: 36, md: 44 },
  height: { xs: 32, sm: 36, md: 44 },
  bgcolor: 'rgba(0, 0, 0, 0.5)',
  backdropFilter: 'blur(4px)',
  color: 'white',
  transition: 'all 0.2s',
  '&:hover': { 
    bgcolor: 'rgba(0, 0, 0, 0.7)',
    transform: 'scale(1.05)',
  },
};

export const PROGRESS_BAR_STYLE: SxProps<Theme> = {
  position: 'absolute',
  bottom: 0,
  left: 0,
  height: { xs: 3, md: 3 },
  bgcolor: 'primary.main',
  transition: 'width 0.1s linear',
  zIndex: 20,
};

export const MOBILE_INDICATORS_CONTAINER_STYLE: SxProps<Theme> = {
  display: { xs: 'flex', sm: 'none' },
  position: 'absolute',
  bottom: 12,
  left: '50%',
  transform: 'translateX(-50%)',
  gap: 1,
  zIndex: 20,
};
