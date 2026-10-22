// Framework-neutral Avatar contract

import type { AvatarSize } from '../types/variant';

export const avatarSizes: AvatarSize[] = ['sm', 'md', 'lg'];

export interface AvatarContract {
  size: AvatarSize;
  /** URL for the avatar image */
  src?: string;
  /** Alt text for the avatar image */
  alt?: string;
  /** Fallback text (initials) shown when no src or image fails */
  fallback?: string;
  /** Whether to show a status indicator */
  status?: 'online' | 'away' | 'busy' | 'offline';
}
