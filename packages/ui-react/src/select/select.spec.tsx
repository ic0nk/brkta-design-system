import { describe, it, expect, vi } from 'vitest';
import { readFileSync } from 'node:fs';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Select } from './select';

const selectStyles = readFileSync('../ui-core/select/select.css', 'utf8');

const sampleOptions = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry', disabled: true },
  { value: 'date', label: 'Date' },
];

describe('Select', () => {
  describe('rendering', () => {
    it('renders with placeholder when no value selected', () => {
      render(<Select options={sampleOptions} placeholder="Pick a fruit" />);
      expect(screen.getByText('Pick a fruit')).toBeTruthy();
    });

    it('renders selected option label', () => {
      render(
        <Select options={sampleOptions} value="banana" placeholder="Pick" />,
      );
      expect(screen.getByText('Banana')).toBeTruthy();
    });

    it('renders data-brkta-select on wrapper', () => {
      const { container } = render(<Select options={sampleOptions} />);
      expect(
        container.querySelector('[data-brkta-select]'),
      ).toBeTruthy();
    });

    it('renders data-brkta-select-trigger on button', () => {
      render(<Select options={sampleOptions} />);
      expect(
        screen.getByRole('combobox').hasAttribute('data-brkta-select-trigger'),
      ).toBe(true);
    });

    it('renders placeholder text when no value', () => {
      render(<Select options={sampleOptions} placeholder="Choose…" />);
      const valueEl = screen.getByText('Choose…');
      expect(valueEl).toBeTruthy();
    });

    it('renders with correct aria attributes when closed', () => {
      render(<Select options={sampleOptions} />);
      const trigger = screen.getByRole('combobox');
      expect(trigger.getAttribute('aria-expanded')).toBe('false');
      expect(trigger.getAttribute('aria-haspopup')).toBe('listbox');
    });

    it('connects the trigger to an external accessible label', () => {
      render(<Select options={sampleOptions} ariaLabelledBy="workspace-label" />);
      expect(screen.getByRole('combobox').getAttribute('aria-labelledby')).toBe(
        'workspace-label',
      );
    });
  });

  describe('opening and closing', () => {
    it('opens menu on trigger click', async () => {
      render(<Select options={sampleOptions} />);
      const trigger = screen.getByRole('combobox');
      await userEvent.click(trigger);
      expect(screen.getByRole('listbox')).toBeTruthy();
      expect(trigger.getAttribute('aria-expanded')).toBe('true');
    });

    it('sets data-open on wrapper when open', async () => {
      const { container } = render(<Select options={sampleOptions} />);
      await userEvent.click(screen.getByRole('combobox'));
      const wrapper = container.querySelector('[data-brkta-select]');
      expect(wrapper?.hasAttribute('data-open')).toBe(true);
    });

    it('uses the emitted boolean open attribute in the shared recipe', async () => {
      render(<Select options={sampleOptions} />);
      await userEvent.click(screen.getByRole('combobox'));
      expect(selectStyles).toContain('[data-brkta-select][data-open]');
      expect(selectStyles).not.toContain('[data-open="true"]');
      expect(selectStyles).toContain('z-index: var(--z-dropdown);');
    });

    it('closes menu on Escape', async () => {
      render(<Select options={sampleOptions} />);
      await userEvent.click(screen.getByRole('combobox'));
      expect(screen.getByRole('listbox')).toBeTruthy();
      await userEvent.keyboard('{Escape}');
      await waitFor(() => {
        expect(screen.queryByRole('listbox')).toBeNull();
      });
    });

    it('does not open when disabled', async () => {
      render(<Select options={sampleOptions} disabled />);
      await userEvent.click(screen.getByRole('combobox'));
      expect(screen.queryByRole('listbox')).toBeNull();
    });
  });

  describe('option selection', () => {
    it('selects an option and shows its label', async () => {
      render(<Select options={sampleOptions} placeholder="Pick" />);
      const trigger = screen.getByRole('combobox');
      await userEvent.click(trigger);
      const option = screen.getByRole('option', { name: 'Banana' });
      await userEvent.click(option);
      // The trigger value should update immediately
      await waitFor(() => {
        expect(screen.getByRole('combobox').textContent).toContain('Banana');
      });
      // The dropdown should close after animation
      await waitFor(() => {
        expect(screen.queryByRole('listbox')).toBeNull();
      });
    });

    it('does not select a disabled option', async () => {
      const { container } = render(
        <Select options={sampleOptions} placeholder="Pick" />,
      );
      await userEvent.click(screen.getByRole('combobox'));
      const cherry = screen.getByRole('option', { name: 'Cherry' });
      await userEvent.click(cherry);
      // Cherry is disabled, so the listbox should still be open (nothing selected)
      expect(screen.getByRole('listbox')).toBeTruthy();
    });

    it('fires onValueChange with selected value', async () => {
      let value = '';
      render(
        <Select
          options={sampleOptions}
          onValueChange={(v) => {
            value = v;
          }}
        />,
      );
      await userEvent.click(screen.getByRole('combobox'));
      await userEvent.click(screen.getByRole('option', { name: 'Date' }));
      expect(value).toBe('date');
    });
  });

  describe('keyboard navigation', () => {
    it('opens menu with ArrowDown', async () => {
      render(<Select options={sampleOptions} />);
      const trigger = screen.getByRole('combobox');
      trigger.focus();
      fireEvent.keyDown(trigger, { key: 'ArrowDown' });
      expect(screen.getByRole('listbox')).toBeTruthy();
    });

    it('opens menu with Enter', async () => {
      render(<Select options={sampleOptions} />);
      const trigger = screen.getByRole('combobox');
      trigger.focus();
      fireEvent.keyDown(trigger, { key: 'Enter' });
      expect(screen.getByRole('listbox')).toBeTruthy();
    });

    it('selects active option with Enter in listbox', async () => {
      render(<Select options={sampleOptions} placeholder="Pick" />);
      await userEvent.click(screen.getByRole('combobox'));
      // First ArrowDown to move to first enabled option
      const listbox = screen.getByRole('listbox');
      fireEvent.keyDown(listbox, { key: 'ArrowDown' });
      fireEvent.keyDown(listbox, { key: 'ArrowDown' }); // moves past Apple to Banana
      fireEvent.keyDown(listbox, { key: 'Enter' });
      await waitFor(() => {
        expect(screen.queryByRole('listbox')).toBeNull();
      });
      expect(screen.getByText('Banana')).toBeTruthy();
    });
  });

  describe('invalid state', () => {
    it('sets data-invalid and aria-invalid', () => {
      render(<Select options={sampleOptions} invalid />);
      const trigger = screen.getByRole('combobox');
      expect(trigger.getAttribute('data-invalid')).toBe('true');
      expect(trigger.getAttribute('aria-invalid')).toBe('true');
    });
  });

  describe('data attributes', () => {
    it('sets data-brkta-select-option on options', async () => {
      render(<Select options={sampleOptions} />);
      await userEvent.click(screen.getByRole('combobox'));
      const options = screen.getAllByRole('option');
      expect(options.length).toBe(4);
      options.forEach((opt) => {
        expect(opt.hasAttribute('data-brkta-select-option')).toBe(true);
      });
    });

    it('chevron icon exists with data-brkta-select-icon', () => {
      const { container } = render(<Select options={sampleOptions} />);
      const icon = container.querySelector('[data-brkta-select-icon]');
      expect(icon).toBeTruthy();
    });
  });
});
