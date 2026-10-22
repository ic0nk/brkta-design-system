export interface ToggleGroupProps {
  type?: 'single' | 'multiple';
  className?: string;
  children?: React.ReactNode;
}

export function ToggleGroup({ type = 'single', className, children }: ToggleGroupProps) {
  return (
    <div
      data-brkta-toggle-group
      role="group"
      aria-multiselectable={type === 'multiple'}
      className={className}
    >
      {children}
    </div>
  );
}
