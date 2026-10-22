export interface AspectRatioProps {
  ratio?: [number, number];
  className?: string;
  children?: React.ReactNode;
}

export function AspectRatio({ ratio = [16, 9], className, children }: AspectRatioProps) {
  return (
    <div
      data-brkta-aspect-ratio
      className={className}
      style={{ '--aspect-w': ratio[0], '--aspect-h': ratio[1] } as React.CSSProperties}
    >
      <div data-brkta-aspect-ratio-inner>{children}</div>
    </div>
  );
}
