export interface DirectionProps {
  dir?: 'ltr' | 'rtl';
  className?: string;
  children?: React.ReactNode;
}

export function Direction({ dir = 'ltr', className, children }: DirectionProps) {
  return (
    <div data-brkta-direction data-dir={dir} className={className}>
      {children}
    </div>
  );
}
