import ErrorState from '@/shared/components/ErrorState';

interface RoomErrorStateProps {
  onRetry: () => void;
  error?: Error | null;
}

function RoomErrorState({ onRetry, error }: RoomErrorStateProps) {
  const errorMessage = error?.message 
    ? `Error: ${error.message}`
    : "We couldn't load the rooms. Please try again.";
    
  return (
    <ErrorState
      title="Failed to Load Rooms"
      message={errorMessage}
      showRetry
      onRetry={onRetry}
    />
  );
}

export default RoomErrorState;
