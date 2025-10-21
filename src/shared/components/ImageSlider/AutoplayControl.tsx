import React from 'react';
import { PlayArrow, Pause } from '@mui/icons-material';
import type { AutoplayControlProps } from './types';

const AutoplayControl: React.FC<AutoplayControlProps> = ({
  isPlaying,
  onToggle,
  isEnabled
}) => {
  if (!isEnabled) return null;

  return (
    <button
      onClick={onToggle}
      className="absolute top-6 right-6 z-20 w-10 h-10 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-all duration-200 backdrop-blur-sm"
      aria-label={isPlaying ? 'Pause autoplay' : 'Start autoplay'}
    >
      {isPlaying ? <Pause sx={{ fontSize: 18 }} /> : <PlayArrow sx={{ fontSize: 18 }} />}
    </button>
  );
};

export default AutoplayControl;