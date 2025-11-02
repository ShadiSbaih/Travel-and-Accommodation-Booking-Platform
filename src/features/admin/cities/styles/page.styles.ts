import type { SxProps, Theme } from '@mui/material';

/**
 * Styles for Cities Admin Page Components
 */

export const pageContainerSx: SxProps<Theme> = {
  p: 3,
};

export const paperSx: SxProps<Theme> = {
  p: 3,
  bgcolor: (theme) =>
    theme.palette.mode === 'dark'
      ? 'rgba(30, 41, 59, 0.95)'
      : 'rgba(255, 255, 255, 0.95)',
  backdropFilter: 'blur(20px)',
  borderRadius: 2,
  border: (theme) =>
    theme.palette.mode === 'dark' ? '1px solid rgba(148, 163, 184, 0.1)' : 'none',
};
