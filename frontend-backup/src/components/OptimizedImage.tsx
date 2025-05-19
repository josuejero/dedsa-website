// =============================================
// File: frontend/src/components/OptimizedImage.tsx
// =============================================
import { IMAGE_SIZES } from '@/constants';
import Image from 'next/image';
import { useState } from 'react';

import { OptimizedImageProps } from './types';

export function OptimizedImage({
  src,
  alt,
  size = 'medium',
  className = '',
  priority = false,
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const { width, height } = IMAGE_SIZES[size];

  return (
    <div className={`relative overflow-hidden ${className}`.trim()}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        priority={priority}
        loading={priority ? 'eager' : 'lazy'}
        className={`duration-700 ease-in-out ${
          isLoading ? 'scale-110 blur-lg' : 'scale-100 blur-0'
        }`}
        onLoadingComplete={() => setIsLoading(false)}
      />
      {isLoading && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
      )}
    </div>
  );
}
