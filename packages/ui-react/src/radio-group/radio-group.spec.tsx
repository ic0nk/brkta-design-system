import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { RadioGroup, Radio, type RadioGroupProps } from './radio-group';

const renderRadioGroup = (props: Partial<RadioGroupProps> = {}) =>
  render(
    <RadioGroup {...props}>
      <Radio value="a" label="Option A" />
      <Radio value="b" label="Option B" />
      <Radio value="c" label="Option C" />
    </RadioGroup>
  );

describe('RadioGroup', () => {
  it('applies data-brkta-radio-group', () => {
    renderRadioGroup();
    expect(screen.getByRole('radiogroup')).toHaveAttribute(
      'data-brkta-radio-group'
    );
  });

  it('renders with role="radiogroup"', () => {
    renderRadioGroup();
    expect(screen.getByRole('radiogroup')).toBeInTheDocument();
  });

  it('applies data-orientation', () => {
    renderRadioGroup({ orientation: 'horizontal' });
    expect(screen.getByRole('radiogroup')).toHaveAttribute(
      'data-orientation',
      'horizontal'
    );
  });

  it('defaults orientation to vertical', () => {
    renderRadioGroup();
    expect(screen.getByRole('radiogroup')).toHaveAttribute(
      'data-orientation',
      'vertical'
    );
  });

  it('applies data-invalid when invalid is true', () => {
    renderRadioGroup({ invalid: true });
    expect(screen.getByRole('radiogroup')).toHaveAttribute('data-invalid');
  });

  it('renders radio options', () => {
    renderRadioGroup();
    expect(screen.getByLabelText('Option A')).toBeInTheDocument();
    expect(screen.getByLabelText('Option B')).toBeInTheDocument();
    expect(screen.getByLabelText('Option C')).toBeInTheDocument();
  });

  it('checks the matching value', () => {
    renderRadioGroup({ value: 'b' });
    expect(screen.getByLabelText('Option B')).toBeChecked();
    expect(screen.getByLabelText('Option A')).not.toBeChecked();
    expect(screen.getByLabelText('Option C')).not.toBeChecked();
  });

  it('disables all radios when group is disabled', () => {
    renderRadioGroup({ disabled: true });
    expect(screen.getByLabelText('Option A')).toBeDisabled();
    expect(screen.getByLabelText('Option B')).toBeDisabled();
    expect(screen.getByLabelText('Option C')).toBeDisabled();
  });

  it('applies data-brkta-radio on each radio', () => {
    renderRadioGroup();
    const labels = document.querySelectorAll('[data-brkta-radio]');
    expect(labels).toHaveLength(3);
  });

  it('calls onValueChange when a radio is selected', async () => {
    const onValueChange = vi.fn();
    renderRadioGroup({ onValueChange });
    await userEvent.click(screen.getByLabelText('Option B'));
    expect(onValueChange).toHaveBeenCalledWith('b');
  });
});
