// Framework-neutral Skeleton contract

import type { SkeletonVariant } from '../types/variant';

export const skeletonVariants: SkeletonVariant[] = ['text', 'card', 'table'];

export interface SkeletonContract {
  variant: SkeletonVariant;
  /** Width of the skeleton element (CSS value) */
  width?: string;
  /** Height of the skeleton element (CSS value) */
  height?: string;
}
