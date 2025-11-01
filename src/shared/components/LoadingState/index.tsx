import CircularProgress from "@mui/material/CircularProgress";
import type { LoadingStateProps } from '@/shared/types/common.types';

function LoadingState({ 
  message = "Loading...", 
  className = "" 
}: LoadingStateProps) {
  return (
    <div className={`flex flex-col items-center justify-center py-12 text-gray-600 ${className}`}>
      <CircularProgress className="w-8 h-8 animate-spin mb-3 text-primary-500" />
      <p className="text-lg">{message}</p>
    </div>
  );
}

export default LoadingState;