import { fireEvent, render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { ColorPicker } from './color-picker';

describe('ColorPicker', () => {
  it('renders an opaque swatch rather than a native colour input', () => {
    const { container } = render(<ColorPicker ariaLabel="Primary colour" value="#61161c" />);
    expect(container.querySelector('[data-brkta-color-picker-swatch]')).toBeTruthy();
    expect(container.querySelector('input[type="color"]')).toBeNull();
  });

  it('opens the visual editor and emits canonical hex values', () => {
    const onValueChange = vi.fn();
    const { container } = render(
      <ColorPicker ariaLabel="Primary colour" value="#61161c" onValueChange={onValueChange} />,
    );
    fireEvent.click(container.querySelector('[data-brkta-color-picker-trigger]')!);
    fireEvent.change(container.querySelector('input[aria-label="Red"]')!, { target: { value: '255' } });

    expect(container.querySelector('[data-brkta-color-picker-plane]')).toBeTruthy();
    expect(onValueChange).toHaveBeenLastCalledWith('#ff161c');
  });
});
