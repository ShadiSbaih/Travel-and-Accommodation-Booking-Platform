import { IconButton } from '@mui/material';
// Optimized icon imports
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
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
        <PauseIcon sx={{ fontSize: { xs: 14, sm: 16, md: 20 } }} />
      ) : (
        <PlayArrowIcon sx={{ fontSize: { xs: 14, sm: 16, md: 20 } }} />
      )}
    </IconButton>
  );
}
