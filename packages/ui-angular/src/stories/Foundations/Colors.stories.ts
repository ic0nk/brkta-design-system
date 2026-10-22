import type { Meta, StoryObj } from '@storybook/angular';

interface TokenEntry {
  token: string;
  label: string;
  lightHex: string;
  lightOklch: string;
  darkHex: string;
  darkOklch: string;
  category: string;
}

const tokens: TokenEntry[] = [
  {
    token: '--background',
    label: 'Background',
    lightHex: '#F4F1EA',
    lightOklch: 'oklch(0.9585 0.0098 87.5)',
    darkHex: '#12110E',
    darkOklch: 'oklch(0.1776 0.0062 91.7)',
    category: 'Surface',
  },
  {
    token: '--foreground',
    label: 'Foreground',
    lightHex: '#181713',
    lightOklch: 'oklch(0.2042 0.0079 95.4)',
    darkHex: '#F4F1EA',
    darkOklch: 'oklch(0.9585 0.0098 87.5)',
    category: 'Surface',
  },
  {
    token: '--surface',
    label: 'Surface',
    lightHex: '#F8F5EE',
    lightOklch: 'oklch(0.9705 0.0098 87.5)',
    darkHex: '#191813',
    darkOklch: 'oklch(0.2083 0.0097 97.8)',
    category: 'Surface',
  },
  {
    token: '--card',
    label: 'Card',
    lightHex: '#FFFCF7',
    lightOklch: 'oklch(0.9920 0.0073 80.7)',
    darkHex: '#211F1A',
    darkOklch: 'oklch(0.2397 0.0097 88.8)',
    category: 'Surface',
  },
  {
    token: '--popover',
    label: 'Popover',
    lightHex: '#FFFDF9',
    lightOklch: 'oklch(0.9945 0.0057 84.6)',
    darkHex: '#29261F',
    darkOklch: 'oklch(0.2694 0.0133 87.6)',
    category: 'Surface',
  },
  {
    token: '--muted',
    label: 'Muted',
    lightHex: '#EEE9DF',
    lightOklch: 'oklch(0.9352 0.0144 84.6)',
    darkHex: '#302D26',
    darkOklch: 'oklch(0.2979 0.0130 87.6)',
    category: 'Neutral',
  },
  {
    token: '--secondary',
    label: 'Secondary',
    lightHex: '#E9E4DA',
    lightOklch: 'oklch(0.9200 0.0145 84.6)',
    darkHex: '#38342C',
    darkOklch: 'oklch(0.3265 0.0148 84.6)',
    category: 'Neutral',
  },
  {
    token: '--input',
    label: 'Input',
    lightHex: '#FAF7F1',
    lightOklch: 'oklch(0.9768 0.0086 84.6)',
    darkHex: '#1E1C17',
    darkOklch: 'oklch(0.2269 0.0099 88.8)',
    category: 'Neutral',
  },
  {
    token: '--border',
    label: 'Border',
    lightHex: '#DDD5C8',
    lightOklch: 'oklch(0.8758 0.0197 80.1)',
    darkHex: '#474238',
    darkOklch: 'oklch(0.3809 0.0178 84.6)',
    category: 'Neutral',
  },
  {
    token: '--ring',
    label: 'Ring (focus)',
    lightHex: '#181713',
    lightOklch: 'oklch(0.2042 0.0079 95.4)',
    darkHex: '#F4F1EA',
    darkOklch: 'oklch(0.9585 0.0098 87.5)',
    category: 'Neutral',
  },
  {
    token: '--primary',
    label: 'Primary',
    lightHex: '#181713',
    lightOklch: 'oklch(0.2042 0.0079 95.4)',
    darkHex: '#F4F1EA',
    darkOklch: 'oklch(0.9585 0.0098 87.5)',
    category: 'Brand',
  },
  {
    token: '--accent',
    label: 'Accent (lime)',
    lightHex: '#D7FF3F',
    lightOklch: 'oklch(0.92 0.3 120)',
    darkHex: '#D7FF3F',
    darkOklch: 'oklch(0.82 0.25 120)',
    category: 'Brand',
  },
  {
    token: '--destructive',
    label: 'Destructive',
    lightHex: '#E5484D',
    lightOklch: 'oklch(0.577 0.245 27.33)',
    darkHex: '#E5484D',
    darkOklch: 'oklch(0.577 0.245 27.33)',
    category: 'Status',
  },
  {
    token: '--success',
    label: 'Success',
    lightHex: '#30A46C',
    lightOklch: 'oklch(0.72 0.2 150)',
    darkHex: '#30A46C',
    darkOklch: 'oklch(0.62 0.2 150)',
    category: 'Status',
  },
  {
    token: '--warning',
    label: 'Warning',
    lightHex: '#FFB224',
    lightOklch: 'oklch(0.85 0.2 85)',
    darkHex: '#FFB224',
    darkOklch: 'oklch(0.75 0.2 85)',
    category: 'Status',
  },
  {
    token: '--information',
    label: 'Information',
    lightHex: '#3B82F6',
    lightOklch: 'oklch(0.7 0.15 240)',
    darkHex: '#3B82F6',
    darkOklch: 'oklch(0.6 0.15 240)',
    category: 'Status',
  },
  {
    token: '--subtle-foreground',
    label: 'Subtle Foreground',
    lightHex: '#827D73',
    lightOklch: 'oklch(0.5911 0.0161 84.6)',
    darkHex: '#8D867B',
    darkOklch: 'oklch(0.6229 0.0182 79.3)',
    category: 'Utility',
  },
];

const categories = ['Surface', 'Neutral', 'Brand', 'Status', 'Utility'];

const meta: Meta = {
  title: 'Foundations/Colors',
  parameters: {
    options: { showPanel: false },
  },
};

export default meta;

export const Colors: StoryObj = {
  render: () => ({
    template: `
      <div class="colors-story">
        <h1 class="colors-story__title">Semantic Colour Tokens</h1>
        <p class="colors-story__subtitle">
          Every semantic colour token in the BRKTA system.
          Swatches render using <code>var(--token)</code> and respond to
          the active theme. Light and dark reference values are listed.
        </p>

        ${categories
          .map(
            (cat) => `
          <h2 class="colors-story__category">${cat}</h2>
          <div class="colors-story__grid">
            ${tokens
              .filter((t) => t.category === cat)
              .map(
                (t) => `
              <div class="colors-story__card">
                <div class="colors-story__swatch" style="background: var(${t.token}); color: var(${t.token}-foreground, var(--foreground)); border: 1px solid var(--border);">
                  <span class="colors-story__var">${t.token}</span>
                </div>
                <div class="colors-story__info">
                  <strong class="colors-story__label">${t.label}</strong>
                  <div class="colors-story__values">
                    <span class="colors-story__value-row">
                      <span class="colors-story__mode">Light</span>
                      <code>${t.lightHex}</code>
                    </span>
                    <span class="colors-story__oklch">${t.lightOklch}</span>
                    <span class="colors-story__value-row">
                      <span class="colors-story__mode">Dark</span>
                      <code>${t.darkHex}</code>
                    </span>
                    <span class="colors-story__oklch">${t.darkOklch}</span>
                  </div>
                </div>
              </div>
            `
              )
              .join('')}
          </div>
        `
          )
          .join('')}
      </div>

      <style>
        .colors-story {
          font-family: var(--font-sans);
          max-width: 1200px;
          margin: 0 auto;
          padding: 3rem 2rem;
        }
        .colors-story__title {
          font-size: var(--font-size-2xl);
          font-weight: var(--font-weight-semibold);
          margin: 0 0 0.5rem;
        }
        .colors-story__subtitle {
          color: var(--subtle-foreground);
          margin: 0 0 2rem;
          line-height: var(--line-height-relaxed);
        }
        .colors-story__subtitle code {
          font-family: var(--font-mono);
          font-size: var(--font-size-sm);
        }
        .colors-story__category {
          font-size: var(--font-size-lg);
          font-weight: var(--font-weight-semibold);
          margin: 2rem 0 1rem;
          padding-bottom: 0.5rem;
          border-bottom: 1px solid var(--border);
        }
        .colors-story__grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 1rem;
        }
        .colors-story__card {
          background: var(--card);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          overflow: hidden;
        }
        .colors-story__swatch {
          display: flex;
          align-items: flex-end;
          padding: 1rem;
          min-height: 4rem;
        }
        .colors-story__var {
          font-family: var(--font-mono);
          font-size: var(--font-size-xs);
          padding: 0.2rem 0.5rem;
          border-radius: var(--radius-sm);
          background: color-mix(in oklch, var(--foreground) 10%, transparent);
          color: var(--foreground);
        }
        .colors-story__info {
          padding: 0.75rem 1rem;
        }
        .colors-story__label {
          font-size: var(--font-size-sm);
          display: block;
          margin-bottom: 0.5rem;
        }
        .colors-story__values {
          display: flex;
          flex-direction: column;
          gap: 0.15rem;
        }
        .colors-story__value-row {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-family: var(--font-mono);
          font-size: var(--font-size-xs);
        }
        .colors-story__mode {
          font-weight: var(--font-weight-medium);
          min-width: 2.5rem;
          font-family: var(--font-sans);
          font-size: var(--font-size-xs);
          color: var(--subtle-foreground);
        }
        .colors-story__oklch {
          font-family: var(--font-mono);
          font-size: var(--font-size-xs);
          color: var(--muted-foreground);
          margin-left: 3rem;
        }
      </style>
    `,
  }),
};
