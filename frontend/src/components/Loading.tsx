interface LoadingProps {
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

export function Loading({ size = 'medium', className = '' }: LoadingProps) {
  const sizeClasses = {
    small: 'w-4 h-4',
    medium: 'w-8 h-8',
    large: 'w-12 h-12'
  };

  return (
    <div className={`flex justify-center items-center ${className}`}>
      <div
        className={`animate-spin rounded-full border-4 border-gray-200 border-t-dsa-red ${sizeClasses[size]}`}
      />
    </div>
  );
}
