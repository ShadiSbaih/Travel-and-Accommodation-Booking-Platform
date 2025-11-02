import { IconButton } from '@mui/material';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import { FULLSCREEN_BUTTON_STYLE } from '../constants/sliderStyles';

interface FullscreenButtonProps {
  onClick: () => void;
}

export function FullscreenButton({ onClick }: FullscreenButtonProps) {
  return (
    <IconButton
      onClick={onClick}
      aria-label="View fullscreen"
      sx={FULLSCREEN_BUTTON_STYLE}
    >
      <FullscreenIcon sx={{ fontSize: { xs: 16, sm: 18, md: 24 } }} />
    </IconButton>
  );
}
