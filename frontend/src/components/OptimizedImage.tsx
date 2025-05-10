import { IMAGE_SIZES } from '@/constants';
import Image from 'next/image';
import { useState } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  size?: keyof typeof IMAGE_SIZES;
  className?: string;
  priority?: boolean;
}

export function OptimizedImage({
  src,
  alt,
  size = 'medium',
  className = '',
  priority = false
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const dimensions = IMAGE_SIZES[size];

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <Image
        src={src}
        alt={alt}
        width={dimensions.width}
        height={dimensions.height}
        className={`
          duration-700 ease-in-out
          ${isLoading ? 'scale-110 blur-lg' : 'scale-100 blur-0'}
        `}
        onLoadingComplete={() => setIsLoading(false)}
        priority={priority}
      />
      {isLoading && <div className="absolute inset-0 bg-gray-200 animate-pulse" />}
    </div>
  );
}
