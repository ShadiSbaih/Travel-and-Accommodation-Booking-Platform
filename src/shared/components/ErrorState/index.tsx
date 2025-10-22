import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import type { ErrorStateProps } from '@/shared/types/common.types';

function ErrorState({ 
  message = "An error occurred. Please try again.", 
  className = "",
  variant = 'error'
}: ErrorStateProps) {
  const variantClasses = {
    error: "bg-red-50 border border-red-200 text-red-700",
    warning: "bg-yellow-50 border border-yellow-200 text-yellow-700",
    info: "bg-blue-50 border border-blue-200 text-blue-700"
  };

  return (
    <div className={`flex items-center gap-3 px-6 py-4 rounded-lg ${variantClasses[variant]} ${className}`}>
      <ErrorOutlineIcon className="w-5 h-5" />
      <span>{message}</span>
    </div>
  );
}

export default ErrorState;