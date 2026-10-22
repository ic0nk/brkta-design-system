import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { ButtonGroup } from './button-group';
import { Button } from '../button/button';

describe('ButtonGroup', () => {
  it('renders children', () => {
    const { container } = render(
      <ButtonGroup>
        <Button variant="outline">One</Button>
        <Button variant="outline">Two</Button>
      </ButtonGroup>
    );
    expect(container.textContent).toContain('One');
    expect(container.textContent).toContain('Two');
  });

  it('has role group', () => {
    const { container } = render(
      <ButtonGroup>
        <Button variant="outline">One</Button>
      </ButtonGroup>
    );
    expect(container.querySelector('[role="group"]')).toBeTruthy();
  });

  it('has correct data attributes', () => {
    const { container } = render(
      <ButtonGroup orientation="vertical">
        <Button>Test</Button>
      </ButtonGroup>
    );
    const group = container.querySelector('[data-brkta-button-group]');
    expect(group?.getAttribute('data-orientation')).toBe('vertical');
  });

  it('supports disabled state', () => {
    const { container } = render(
      <ButtonGroup disabled>
        <Button>Test</Button>
      </ButtonGroup>
    );
    expect(container.querySelector('[data-disabled]')).toBeTruthy();
  });

  it('defaults to horizontal orientation', () => {
    const { container } = render(
      <ButtonGroup>
        <Button>Test</Button>
      </ButtonGroup>
    );
    const group = container.querySelector('[data-brkta-button-group]');
    expect(group?.getAttribute('data-orientation')).toBe('horizontal');
  });
});
