import { IconButton, Tooltip } from '@mui/material';
import { PlayArrow, Pause } from '@mui/icons-material';

interface AutoplayButtonProps {
  isPlaying: boolean;
  onToggle: () => void;
  autoPlay: boolean;
}

export function AutoplayButton({ isPlaying, onToggle, autoPlay }: AutoplayButtonProps) {
  if (!autoPlay) return null;

  return (
    <Tooltip title={isPlaying ? 'Pause autoplay' : 'Resume autoplay'} placement="top" arrow>
      <IconButton
        onClick={onToggle}
        aria-label={isPlaying ? 'Pause autoplay' : 'Resume autoplay'}
        sx={{
          position: 'absolute',
          bottom: { xs: 16, sm: 20 },
          right: { xs: 16, sm: 20 },
          bgcolor: 'background.paper',
          color: 'primary.main',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
          border: 1,
          borderColor: 'divider',
          zIndex: 2,
          width: { xs: 44, sm: 48 },
          height: { xs: 44, sm: 48 },
          transition: 'all 0.25s ease',
          '&:hover': {
            bgcolor: 'background.paper',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.12)',
            borderColor: 'primary.main',
          },
        }}
      >
        {isPlaying ? <Pause sx={{ fontSize: 22 }} /> : <PlayArrow sx={{ fontSize: 22 }} />}
      </IconButton>
    </Tooltip>
  );
}
