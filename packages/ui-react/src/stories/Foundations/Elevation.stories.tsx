import type { Meta } from '@storybook/react';
import { useCSSVar, SectionHeading, Description } from './helpers';

const shadowTokens = [
  { token: '--shadow-xs', label: 'XS', usage: 'Tiny card separation' },
  { token: '--shadow-sm', label: 'SM', usage: 'Subtle card elevation' },
  { token: '--shadow-md', label: 'MD', usage: 'Moderate card depth' },
  { token: '--shadow-lg', label: 'LG', usage: 'Floating panels, dialogs' },
  { token: '--shadow-xl', label: 'XL', usage: 'Modal windows' },
  { token: '--shadow-2xl', label: '2XL', usage: 'Highest emphasis' },
];

const zIndexTokens = [
  { token: '--z-dropdown', label: 'Dropdown', value: 100 },
  { token: '--z-sticky', label: 'Sticky', value: 200 },
  { token: '--z-fixed', label: 'Fixed', value: 300 },
  { token: '--z-modal-backdrop', label: 'Modal Backdrop', value: 400 },
  { token: '--z-modal', label: 'Modal', value: 500 },
  { token: '--z-popover', label: 'Popover', value: 600 },
  { token: '--z-tooltip', label: 'Tooltip', value: 700 },
  { token: '--z-toast', label: 'Toast', value: 800 },
];

const elevationTokens = [
  { token: '--elevation-1', label: 'Level 1', value: 1 },
  { token: '--elevation-2', label: 'Level 2', value: 10 },
  { token: '--elevation-3', label: 'Level 3', value: 100 },
  { token: '--elevation-4', label: 'Level 4', value: 1000 },
  { token: '--elevation-5', label: 'Level 5', value: 10000 },
];

function ShadowCard({ token, label, usage }: (typeof shadowTokens)[number]) {
  return (
    <div
      style={{
        background: 'var(--card)',
        borderRadius: 'var(--radius)',
        padding: '1.25rem',
        boxShadow: `var(${token})`,
        border: '1px solid var(--border)',
      }}
    >
      <div style={{ fontWeight: 600, fontSize: 'var(--font-size-sm)', color: 'var(--foreground)', marginBottom: '0.25rem' }}>
        {label}
      </div>
      <code style={{ fontSize: 'var(--font-size-xs)', color: 'var(--muted-foreground)', display: 'block', marginBottom: '0.25rem' }}>
        {token}
      </code>
      <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--subtle-foreground)' }}>
        {usage}
      </div>
    </div>
  );
}

function TokenRow({ token, label }: { token: string; label: string }) {
  const value = useCSSVar(token);
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0.5rem 1rem',
        borderBottom: '1px solid var(--border)',
        fontSize: 'var(--font-size-sm)',
      }}
    >
      <div>
        <span style={{ color: 'var(--foreground)', fontWeight: 500 }}>{label}</span>
        <code style={{ marginLeft: '0.75rem', fontSize: 'var(--font-size-xs)', color: 'var(--muted-foreground)' }}>
          {token}
        </code>
      </div>
      <code style={{ fontSize: 'var(--font-size-xs)', color: 'var(--subtle-foreground)' }}>{value}</code>
    </div>
  );
}

const ElevationPage = () => {
  return (
    <div
      style={{
        fontFamily: 'var(--font-sans)',
        background: 'var(--background)',
        color: 'var(--foreground)',
        minHeight: '100vh',
      }}
    >
      <div style={{ maxWidth: 720, margin: '0 auto', padding: '3rem 1.5rem' }}>
        <h1
          style={{
            fontSize: 'var(--font-size-3xl)',
            fontWeight: 700,
            color: 'var(--foreground)',
            marginBottom: '0.5rem',
          }}
        >
          Elevation &amp; Shadows
        </h1>
        <Description>
          Shadow tokens create physical depth surfaces. Light-theme shadows
          use the warm near-black with varying alpha. Dark-theme shadows use
          higher alpha for visibility against the dark canvas.
        </Description>

        <SectionHeading>Shadows</SectionHeading>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gap: '1rem',
            padding: '0 1rem',
          }}
        >
          {shadowTokens.map((s) => (
            <ShadowCard key={s.token} {...s} />
          ))}
        </div>

        <SectionHeading>Z-Index Layers</SectionHeading>
        <div
          style={{
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-lg)',
            overflow: 'hidden',
            margin: '0 1rem',
          }}
        >
          {zIndexTokens.map((z) => (
            <TokenRow key={z.token} token={z.token} label={z.label} />
          ))}
        </div>

        <SectionHeading>Elevation Scale</SectionHeading>
        <div
          style={{
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-lg)',
            overflow: 'hidden',
            margin: '0 1rem',
          }}
        >
          {elevationTokens.map((e) => (
            <TokenRow key={e.token} token={e.token} label={e.label} />
          ))}
        </div>
      </div>
    </div>
  );
};

const meta = {
  title: 'Foundations/Elevation',
  component: ElevationPage,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof ElevationPage>;

export default meta;

export const Overview = {};
