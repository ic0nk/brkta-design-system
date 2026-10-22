export type MarkerVariant = 'default'|'success'|'warning'|'destructive'|'info';
export interface MarkerContract { variant?: MarkerVariant; label?: string; size?: 'sm'|'md'|'lg'; }
