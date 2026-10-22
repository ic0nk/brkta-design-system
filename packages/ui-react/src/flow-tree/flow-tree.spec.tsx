import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { FlowTree } from './flow-tree';
import { createFlowTreeGeometry } from '@brkta/ui-core/flow-geometry';

describe('FlowTree', () => {
  it('renders the shared SVG slots', () => {
    render(<FlowTree stemPath="M 0 100 L 0 0" limbPaths={['M 0 50 L 40 50']} />);
    expect(document.querySelector('[data-brkta-flow-tree-stem]')).toBeTruthy();
    expect(document.querySelectorAll('[data-brkta-flow-tree-limb]')).toHaveLength(1);
  });

  it('uses deterministic recursive limb geometry shared by both renderers', () => {
    const options = { width: 640, height: 360, stemX: 0 } as const;
    const first = createFlowTreeGeometry(options);
    const second = createFlowTreeGeometry(options);
    expect(first.limbPaths.length).toBeGreaterThan(3);
    expect(first.limbPaths.length).toBeLessThanOrEqual(46);
    expect(first).toEqual(second);
    expect(first.limbPaths.some((path) => path.includes(' Q '))).toBe(true);
  });

  it('supports a top-origin branch without changing the default geometry', () => {
    const topOrigin = createFlowTreeGeometry({ width: 1024, height: 720, stemX: 0, branchOriginY: 0 });
    const websiteDefault = createFlowTreeGeometry({ width: 1024, height: 720, stemX: 0 });

    expect(topOrigin.limbPaths.some((path) => path.startsWith('M 0.00 0.00'))).toBe(true);
    expect(topOrigin.limbPaths.every((path) => path.length > 0)).toBe(true);
    expect(websiteDefault.limbPaths.some((path) => path.startsWith('M 0.00 108.00'))).toBe(true);
  });
});
