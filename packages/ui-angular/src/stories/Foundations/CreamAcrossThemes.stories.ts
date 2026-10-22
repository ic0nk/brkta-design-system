import type { Meta, StoryObj } from '@storybook/angular';

const meta: Meta = {
  title: 'Foundations/Cream Across Themes',
  parameters: {
    options: { showPanel: false },
  },
};

export default meta;

export const CreamAcrossThemes: StoryObj = {
  render: () => ({
    template: `
      <div class="cream-story">
        <h1 class="cream-story__title">Connecting Cream</h1>
        <p class="cream-story__subtitle">
          The cream neutral <code>#F4F1EA</code> connects both themes —
          serving as the application background in light mode and the principal
          text/icon foreground in dark mode.
        </p>

        <div class="cream-story__grid">
          <div class="cream-story__panel cream-story__panel--light">
            <h2>Light Theme</h2>
            <div class="cream-story__swatch cream-story__swatch--canvas">
              <code>var(--background)</code>
              <span class="cream-story__value">#F4F1EA</span>
            </div>
            <div class="cream-story__card">
              <p><code>var(--card)</code> sits above the cream canvas.</p>
            </div>
          </div>

          <div class="cream-story__panel cream-story__panel--dark">
            <h2>Dark Theme</h2>
            <div class="cream-story__swatch cream-story__swatch--foreground">
              <code>var(--foreground)</code>
              <span class="cream-story__value">#F4F1EA</span>
            </div>
            <div class="cream-story__card">
              <p><code>var(--card)</code> sits above the warm charcoal.</p>
            </div>
          </div>
        </div>

        <div class="cream-story__note">
          <!-- brkta-allowlist: decorative typographic dingbat (U+2726), not emoji icon usage -->
          <strong>✦ The connecting-cream principle:</strong>
          One neutral colour — <code>#F4F1EA</code> (oklch 0.9585 0.0098 87.5) —
          bridges light and dark by serving opposite roles in each.
          This eliminates the cold gray typical of most design systems.
        </div>
      </div>

      <style>
        .cream-story {
          font-family: var(--font-sans);
          max-width: 960px;
          margin: 0 auto;
          padding: 3rem 2rem;
        }
        .cream-story__title {
          font-size: var(--font-size-2xl);
          font-weight: var(--font-weight-semibold);
          margin: 0 0 0.5rem;
        }
        .cream-story__subtitle {
          color: var(--subtle-foreground);
          margin: 0 0 2rem;
          line-height: var(--line-height-relaxed);
        }
        .cream-story__subtitle code {
          font-family: var(--font-mono);
          font-size: var(--font-size-sm);
        }
        .cream-story__grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
        }
        .cream-story__panel {
          padding: 2rem;
          border-radius: var(--radius-lg);
          border: 1px solid var(--border);
        }
        .cream-story__panel--light {
          background: var(--background);
          color: var(--foreground);
        }
        .cream-story__panel--dark {
          background: var(--background);
          color: var(--foreground);
        }
        .cream-story__panel h2 {
          font-size: var(--font-size-lg);
          margin: 0 0 1rem;
        }
        .cream-story__swatch {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1rem 1.25rem;
          border-radius: var(--radius-md);
          margin-bottom: 1rem;
          font-family: var(--font-mono);
          font-size: var(--font-size-sm);
        }
        .cream-story__swatch--canvas {
          background: var(--background);
          color: var(--foreground);
          border: 1px solid var(--border);
        }
        .cream-story__swatch--foreground {
          background: var(--background);
          color: var(--foreground);
          border: 1px solid var(--border);
        }
        .cream-story__value {
          padding: 0.25rem 0.75rem;
          background: color-mix(in oklch, var(--foreground) 8%, transparent);
          border-radius: var(--radius-sm);
        }
        .cream-story__card {
          background: var(--card);
          color: var(--card-foreground);
          padding: 1rem 1.25rem;
          border-radius: var(--radius-md);
          border: 1px solid var(--border);
        }
        .cream-story__card p {
          margin: 0;
          font-size: var(--font-size-sm);
        }
        .cream-story__note {
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
