import React from 'react';
import type { ProgressBarProps } from './types';

const ProgressBar: React.FC<ProgressBarProps> = ({ progress, isVisible }) => {
  if (!isVisible) return null;

  return (
    <div className="absolute bottom-0 left-0 right-0 z-20">
      <div className="w-full bg-gray-800/30 h-1">
        <div
          className="bg-blue-500 h-1 transition-all duration-100"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;