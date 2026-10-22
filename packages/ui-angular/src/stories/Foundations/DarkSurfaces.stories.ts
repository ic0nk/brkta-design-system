import type { Meta, StoryObj } from '@storybook/angular';

const darkTokens = [
  {
    token: '--background',
    hex: '#12110E',
    oklch: 'oklch(0.1776 0.0062 91.7)',
    usage: 'Application canvas — warm charcoal page background',
  },
  {
    token: '--surface',
    hex: '#191813',
    oklch: 'oklch(0.2083 0.0097 97.8)',
    usage: 'Sidebars, grouped sections, secondary containers',
  },
  {
    token: '--card',
    hex: '#211F1A',
    oklch: 'oklch(0.2397 0.0097 88.8)',
    usage: 'Cards, content panels, elevated regions',
  },
  {
    token: '--popover',
    hex: '#29261F',
    oklch: 'oklch(0.2694 0.0133 87.6)',
    usage: 'Menus, dropdowns, tooltips, dialogs',
  },
];

const meta: Meta = {
  title: 'Foundations/Dark Surfaces',
  parameters: {
    options: { showPanel: false },
  },
};

export default meta;

export const DarkSurfaces: StoryObj = {
  render: () => ({
    template: `
      <div class="dark-surfaces">
        <h1 class="dark-surfaces__title">Dark Surface Hierarchy</h1>
        <p class="dark-surfaces__subtitle">
          The dark theme uses a warm charcoal surface stack.
          Each level steps progressively lighter to create depth without
          relying on pure black or cold blue-gray tones.
        </p>

        <div class="dark-surfaces__staircase">
          ${darkTokens
            .map(
              (t, i) => `
            <div class="dark-surfaces__step" style="--step-index: ${i}">
              <div class="dark-surfaces__swatch" style="background: var(${t.token})"></div>
              <div class="dark-surfaces__info">
                <code class="dark-surfaces__var">${t.token}</code>
                <span class="dark-surfaces__hex">${t.hex}</span>
                <span class="dark-surfaces__oklch">${t.oklch}</span>
                <p class="dark-surfaces__usage">${t.usage}</p>
              </div>
            </div>
          `
            )
            .join('')}
        </div>

        <div class="dark-surfaces__note">
          <!-- brkta-allowlist: decorative typographic dingbat (U+2726), not emoji icon usage -->
          <strong>✦ Hierarchy principle:</strong>
          The warm charcoal palette
          (<code>var(--background)</code> → <code>var(--popover)</code>)
          creates visible separation without harsh contrast.
          The cream foreground (<code>var(--foreground)</code>) ensures
          excellent readability on every surface level.
        </div>
      </div>

      <style>
        .dark-surfaces {
          font-family: var(--font-sans);
          max-width: 720px;
          margin: 0 auto;
          padding: 3rem 2rem;
        }
        .dark-surfaces__title {
          font-size: var(--font-size-2xl);
          font-weight: var(--font-weight-semibold);
          margin: 0 0 0.5rem;
        }
        .dark-surfaces__subtitle {
          color: var(--subtle-foreground);
          margin: 0 0 2rem;
          line-height: var(--line-height-relaxed);
        }
        .dark-surfaces__staircase {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .dark-surfaces__step {
          display: flex;
          align-items: stretch;
          gap: 1rem;
          padding: 1.25rem;
          background: var(--background);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          margin-left: calc(var(--step-index) * 1.5rem);
        }
        .dark-surfaces__swatch {
          width: 3rem;
          min-height: 3rem;
          border-radius: var(--radius-sm);
          border: 1px solid var(--border);
          flex-shrink: 0;
        }
        .dark-surfaces__info {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }
        .dark-surfaces__var {
          font-family: var(--font-mono);
          font-size: var(--font-size-sm);
          font-weight: var(--font-weight-semibold);
        }
        .dark-surfaces__hex {
          font-family: var(--font-mono);
          font-size: var(--font-size-sm);
        }
        .dark-surfaces__oklch {
          font-family: var(--font-mono);
          font-size: var(--font-size-xs);
          color: var(--subtle-foreground);
        }
        .dark-surfaces__usage {
          margin: 0.25rem 0 0;
          font-size: var(--font-size-sm);
          color: var(--muted-foreground);
          line-height: var(--line-height-normal);
        }
        .dark-surfaces__note {
          margin-top: 2rem;
          padding: 1.25rem;
          background: var(--card);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          font-size: var(--font-size-sm);
          line-height: var(--line-height-relaxed);
        }
      </style>
    `,
  }),
};
