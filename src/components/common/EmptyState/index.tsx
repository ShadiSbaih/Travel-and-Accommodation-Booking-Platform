import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

interface EmptyStateProps {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  className?: string;
}

function EmptyState({ 
  title, 
  subtitle, 
  icon,
  className = "" 
}: EmptyStateProps) {
  const defaultIcon = <ErrorOutlineIcon className="w-12 h-12 mx-auto text-gray-400 mb-2" />;
  
  return (
    <div className={`text-center py-12 text-gray-600 ${className}`}>
      <div className="mb-4">
        {icon || defaultIcon}
        <p className="text-lg">{title}</p>
        {subtitle && (
          <p className="text-sm text-gray-500 mt-2">{subtitle}</p>
        )}
      </div>
    </div>
  );
}

export default EmptyState;