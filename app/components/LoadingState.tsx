'use client';

/**
 * LoadingState component props
 */
interface LoadingStateProps {
  message?: string;
  size?: 'small' | 'medium' | 'large';
  fullScreen?: boolean;
}

/**
 * Loading state component for the application
 * Displays a loading spinner with an optional message
 */
export default function LoadingState({
  message = 'Loading...',
  size = 'medium',
  fullScreen = false,
}: LoadingStateProps) {
  // Determine spinner size based on the size prop
  const spinnerSizeClasses = {
    small: 'w-5 h-5 border-2',
    medium: 'w-8 h-8 border-3',
    large: 'w-12 h-12 border-4',
  };
  
  // Determine container classes based on fullScreen prop
  const containerClasses = fullScreen
    ? 'fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50'
    : 'flex flex-col items-center justify-center py-8';
  
  return (
    <div className={containerClasses}>
      <div className="flex flex-col items-center">
        <div
          className={`${spinnerSizeClasses[size]} border-t-blue-500 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin`}
        ></div>
        {message && (
          <p className="mt-4 text-gray-300 text-sm md:text-base">{message}</p>
        )}
      </div>
    </div>
  );
}

