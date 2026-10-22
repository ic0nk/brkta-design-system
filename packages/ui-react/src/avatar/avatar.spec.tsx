import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Avatar, type AvatarProps } from './avatar';

const renderAvatar = (props: Partial<AvatarProps> = {}) => {
  const { container } = render(<Avatar {...props} />);
  return { container, el: container.querySelector('[data-brkta-avatar]')! };
};

describe('Avatar', () => {
  describe('data attributes', () => {
    it('applies data-brkta-avatar', () => {
      const { el } = renderAvatar();
      expect(el).toHaveAttribute('data-brkta-avatar');
    });

    it('defaults size to "md"', () => {
      const { el } = renderAvatar();
      expect(el).toHaveAttribute('data-size', 'md');
    });

    it('applies custom size', () => {
      const { el } = renderAvatar({ size: 'lg' });
      expect(el).toHaveAttribute('data-size', 'lg');
    });
  });

  describe('image rendering', () => {
    it('renders an <img> when src is provided', () => {
      const { container } = renderAvatar({ src: 'https://example.com/photo.jpg', alt: 'User' });
      const img = container.querySelector('img')!;
      expect(img).toBeInTheDocument();
      expect(img).toHaveAttribute('src', 'https://example.com/photo.jpg');
      expect(img).toHaveAttribute('alt', 'User');
    });

    it('shows fallback when src is missing', () => {
      const { container } = renderAvatar({ fallback: 'JD' });
      expect(container.querySelector('img')).not.toBeInTheDocument();
      expect(screen.getByText('JD')).toBeInTheDocument();
    });

    it('shows fallback on image error', async () => {
      const user = userEvent.setup();
      const { container } = renderAvatar({ src: 'https://example.com/bad.jpg', alt: 'user', fallback: 'AB' });
      const img = container.querySelector('img')!;
      expect(img).toBeInTheDocument();

      // Dispatch error on the image to trigger React state change
      img.dispatchEvent(new Event('error', { bubbles: true }));
      // Wait for React to re-render after state update
      await screen.findByText('AB');
      expect(container.querySelector('img')).not.toBeInTheDocument();
    });

    it('shows fallback truncated to 2 characters', () => {
      renderAvatar({ fallback: 'ABCD' });
      expect(screen.getByText('AB')).toBeInTheDocument();
      expect(screen.queryByText('ABCD')).not.toBeInTheDocument();
    });
  });

  describe('no content', () => {
    it('renders empty when no src and no fallback', () => {
      const { el } = renderAvatar();
      expect(el.textContent).toBe('');
    });
  });

  describe('status indicator', () => {
    it('renders status element when status is provided', () => {
      renderAvatar({ status: 'online', fallback: 'JD' });
      const statusEl = screen.getByLabelText('online');
      expect(statusEl).toHaveAttribute('data-brkta-avatar-status');
      expect(statusEl).toHaveAttribute('data-status', 'online');
    });

    it('does not render status when status is omitted', () => {
      renderAvatar({ fallback: 'JD' });
      expect(screen.queryByLabelText('online')).not.toBeInTheDocument();
    });
  });
});
