import React, { useState } from 'react';
import { Building2 } from 'lucide-react';

interface ArchImageProps {
  src: string;
  alt: string;
  className?: string;
  lazy?: boolean;
  fallbackTitle?: string;
}

export const ArchImage: React.FC<ArchImageProps> = ({
  src,
  alt,
  className = '',
  lazy = false,
  fallbackTitle,
}) => {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-[#1A1E23] to-[#262B32] text-[#E4E5E0] p-6 ${className}`}
        role="img"
        aria-label={alt}
      >
        <Building2 className="w-8 h-8 text-[#93C5FD] mb-2 opacity-80" />
        <span className="text-xs font-medium text-center text-white/80 max-w-[200px]">
          {fallbackTitle || alt}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading="eager"
      decoding="async"
      fetchPriority={lazy === false ? 'high' : 'auto'}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
    />
  );
};
