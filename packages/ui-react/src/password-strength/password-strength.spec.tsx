import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { PasswordStrength } from './password-strength';

describe('PasswordStrength', () => {
  it('builds on Progress and announces the localized status', () => {
    render(<PasswordStrength score={3} label="Password strength" description="Good" />);
    expect(document.querySelector('[data-brkta-password-strength]')).toBeTruthy();
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '3');
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-label', 'Password strength: Good');
    expect(screen.getByRole('status')).toHaveTextContent('Password strength: Good');
  });
});
