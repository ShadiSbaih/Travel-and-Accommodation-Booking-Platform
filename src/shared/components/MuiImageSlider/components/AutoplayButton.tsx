import { IconButton } from '@mui/material';
import { PlayArrow, Pause } from '@mui/icons-material';
import { AUTOPLAY_BUTTON_STYLE } from '../constants/sliderStyles';

interface AutoplayButtonProps {
  isPlaying: boolean;
  onToggle: () => void;
  autoPlay: boolean;
}

export function AutoplayButton({ isPlaying, onToggle, autoPlay }: AutoplayButtonProps) {
  if (!autoPlay) return null;

  return (
    <IconButton
      onClick={onToggle}
      aria-label={isPlaying ? 'Pause' : 'Play'}
      sx={AUTOPLAY_BUTTON_STYLE}
    >
      {isPlaying ? (
        <Pause sx={{ fontSize: { xs: 14, sm: 16, md: 20 } }} />
      ) : (
        <PlayArrow sx={{ fontSize: { xs: 14, sm: 16, md: 20 } }} />
      )}
    </IconButton>
  );
}
