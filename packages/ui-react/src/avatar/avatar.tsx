'use client';

import { useState, type HTMLAttributes } from 'react';
import type { AvatarSize } from '@brkta/ui-core/types/variant';

type AvatarStatus = 'online' | 'away' | 'busy' | 'offline';

export interface AvatarProps extends HTMLAttributes<HTMLSpanElement> {
  size?: AvatarSize;
  src?: string;
  alt?: string;
  fallback?: string;
  status?: AvatarStatus;
}

export function Avatar({
  size = 'md',
  src,
  alt = '',
  fallback,
  status,
  className = '',
  ...props
}: AvatarProps) {
  const [imgError, setImgError] = useState(false);
  const showImage = src && !imgError;

  return (
    <span data-brkta-avatar="" data-size={size} className={className} {...props}>
      {showImage ? (
        <img src={src} alt={alt} onError={() => setImgError(true)} />
      ) : fallback ? (
        <span data-brkta-avatar-fallback="" aria-hidden="true">
          {fallback.slice(0, 2)}
        </span>
      ) : null}
      {status && (
        <span data-brkta-avatar-status="" data-status={status} aria-label={status} />
      )}
    </span>
  );
}
