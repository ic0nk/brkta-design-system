import type { Meta, StoryObj } from '@storybook/angular';

const lightTokens = [
  {
    token: '--background',
    hex: '#F4F1EA',
    oklch: 'oklch(0.9585 0.0098 87.5)',
    usage: 'Application canvas — page background',
  },
  {
    token: '--surface',
    hex: '#F8F5EE',
    oklch: 'oklch(0.9705 0.0098 87.5)',
    usage: 'Sidebars, grouped sections, secondary containers',
  },
  {
    token: '--card',
    hex: '#FFFCF7',
    oklch: 'oklch(0.9920 0.0073 80.7)',
    usage: 'Cards, content panels, elevated regions',
  },
  {
    token: '--popover',
    hex: '#FFFDF9',
    oklch: 'oklch(0.9945 0.0057 84.6)',
    usage: 'Menus, dropdowns, tooltips, dialogs',
  },
];

const meta: Meta = {
  title: 'Foundations/Light Surfaces',
  parameters: {
    options: { showPanel: false },
  },
};

export default meta;

export const LightSurfaces: StoryObj = {
  render: () => ({
    template: `
      <div class="light-surfaces">
        <h1 class="light-surfaces__title">Light Surface Hierarchy</h1>
        <p class="light-surfaces__subtitle">
          The light theme uses a warm cream-to-off-white surface stack.
          Each level is visibly distinct while remaining cohesive.
        </p>

        <div class="light-surfaces__staircase">
          ${lightTokens
            .map(
              (t, i) => `
            <div class="light-surfaces__step" style="--step-index: ${i}">
              <div class="light-surfaces__swatch" style="background: var(${t.token})"></div>
              <div class="light-surfaces__info">
                <code class="light-surfaces__var">${t.token}</code>
                <span class="light-surfaces__hex">${t.hex}</span>
                <span class="light-surfaces__oklch">${t.oklch}</span>
                <p class="light-surfaces__usage">${t.usage}</p>
              </div>
            </div>
          `
            )
            .join('')}
        </div>

        <div class="light-surfaces__note">
          <!-- brkta-allowlist: decorative typographic dingbat (U+2726), not emoji icon usage -->
          <strong>✦ Hierarchy principle:</strong>
          Surfaces step from the cream canvas (<code>var(--background)</code>)
          through increasingly lighter off-white levels so elements recede or
          elevate naturally. Pure white (<code>var(--utility-white)</code>)
          is restricted to exceptional utility use only.
        </div>
      </div>

      <style>
        .light-surfaces {
          font-family: var(--font-sans);
          max-width: 720px;
          margin: 0 auto;
          padding: 3rem 2rem;
        }
        .light-surfaces__title {
          font-size: var(--font-size-2xl);
          font-weight: var(--font-weight-semibold);
          margin: 0 0 0.5rem;
        }
        .light-surfaces__subtitle {
          color: var(--subtle-foreground);
          margin: 0 0 2rem;
          line-height: var(--line-height-relaxed);
        }
        .light-surfaces__staircase {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .light-surfaces__step {
          display: flex;
          align-items: stretch;
          gap: 1rem;
          padding: 1.25rem;
          background: var(--background);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          margin-left: calc(var(--step-index) * 1.5rem);
        }
        .light-surfaces__swatch {
          width: 3rem;
          min-height: 3rem;
          border-radius: var(--radius-sm);
          border: 1px solid var(--border);
          flex-shrink: 0;
        }
        .light-surfaces__info {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }
        .light-surfaces__var {
          font-family: var(--font-mono);
          font-size: var(--font-size-sm);
          font-weight: var(--font-weight-semibold);
        }
        .light-surfaces__hex {
          font-family: var(--font-mono);
          font-size: var(--font-size-sm);
        }
        .light-surfaces__oklch {
          font-family: var(--font-mono);
          font-size: var(--font-size-xs);
          color: var(--subtle-foreground);
        }
        .light-surfaces__usage {
          margin: 0.25rem 0 0;
          font-size: var(--font-size-sm);
          color: var(--muted-foreground);
          line-height: var(--line-height-normal);
        }
        .light-surfaces__note {
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
