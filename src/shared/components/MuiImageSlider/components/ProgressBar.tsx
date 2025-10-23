import { Box } from '@mui/material';
import { PROGRESS_BAR_STYLE } from '../constants/sliderStyles';

interface ProgressBarProps {
  progress: number;
  isVisible: boolean;
}

export function ProgressBar({ progress, isVisible }: ProgressBarProps) {
  if (!isVisible) return null;

  return (
    <Box
      sx={{
        ...PROGRESS_BAR_STYLE,
        width: `${progress}%`,
      }}
    />
  );
}
