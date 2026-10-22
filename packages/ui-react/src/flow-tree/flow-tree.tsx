import type { SVGAttributes } from 'react';

export interface FlowTreeProps extends SVGAttributes<SVGSVGElement> {
  viewBox?: string;
  stemPath: string;
  limbPaths: readonly string[];
}

export function FlowTree({ stemPath, limbPaths, viewBox = '0 0 100 100', ...props }: FlowTreeProps) {
  return (
    <svg data-brkta-flow-tree="" viewBox={viewBox} preserveAspectRatio="none" aria-hidden="true" {...props}>
      <path data-brkta-flow-tree-stem="" d={stemPath} />
      {limbPaths.map((path, index) => <path data-brkta-flow-tree-limb="" key={`${index}-${path}`} d={path} />)}
    </svg>
  );
}
