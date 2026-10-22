import type { Meta } from '@storybook/react';
import { useCSSVar, SectionHeading, Description } from './helpers';

function SwatchRow({ token, label }: { token: string; label: string }) {
  const value = useCSSVar(token);
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        padding: '0.5rem 1rem',
        borderBottom: '1px solid var(--border)',
        fontSize: 'var(--font-size-sm)',
      }}
    >
      <div
        style={{
          width: 24,
          height: 24,
          borderRadius: 'var(--radius-sm)',
          background: `var(${token})`,
          border: '1px solid var(--border)',
          flexShrink: 0,
        }}
      />
      <span style={{ color: 'var(--foreground)', fontWeight: 500 }}>{label}</span>
      <code style={{ fontSize: 'var(--font-size-xs)', color: 'var(--muted-foreground)', marginLeft: 'auto' }}>
        {token}
      </code>
      {value && (
        <code style={{ fontSize: 'var(--font-size-xs)', color: 'var(--subtle-foreground)' }}>
          {value}
        </code>
      )}
    </div>
  );
}

const glassRecipes = [
  {
    className: 'glass-card',
    label: 'Glass Card',
    usage: 'Standard frosted card for dashboards, metric tiles',
  },
  {
    className: 'glass-elevated',
    label: 'Glass Elevated',
    usage: 'Stronger blur for modals, popovers, floating panels',
  },
  {
    className: 'glass-surface',
    label: 'Glass Surface',
    usage: 'Subtle blur for tables, section headers, secondary panels',
  },
  {
    className: 'glass-nav-pill',
    label: 'Glass Nav Pill',
    usage: 'Navigation pill / tab style for top navigation',
  },
  {
    className: 'glass-nav-menu',
    label: 'Glass Nav Menu',
    usage: 'Dropdown / flyout menu background',
  },
  {
    className: 'glass-nav-item',
    label: 'Glass Nav Item',
    usage: 'Default navigation item state',
  },
  {
    className: 'glass-nav-item-active',
    label: 'Glass Nav Item Active',
    usage: 'Selected navigation item',
  },
  {
    className: 'glass-nav-subitem',
    label: 'Glass Nav Subitem',
    usage: 'Second-level navigation item',
  },
  {
    className: 'glass-nav-subitem-active',
    label: 'Glass Nav Subitem Active',
    usage: 'Selected second-level item',
  },
];

const GlassPage = () => {
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
          Glass Effects
        </h1>
        <Description>
          Frosted-glass and blur-backdrop recipes defined in{' '}
          <code style={{ background: 'var(--muted)', padding: '0.1rem 0.3rem', borderRadius: 'var(--radius-sm)' }}>
            @brkta/design-tokens/glass.css
          </code>
          . All glass surfaces use <code>color-mix()</code> so they automatically adapt
          to the active theme. Backdrop blur is GPU-accelerated where supported.
        </Description>

        <SectionHeading>Recipes</SectionHeading>
        <div
          style={{
            display: 'grid',
            gap: '1.5rem',
            padding: '0 1rem',
          }}
        >
          {glassRecipes.slice(0, 3).map((recipe) => (
            <div
              key={recipe.className}
              className={recipe.className}
              style={{
                borderRadius: 'var(--radius)',
                padding: '1.25rem',
                minHeight: 100,
              }}
            >
              <div style={{ fontWeight: 600, fontSize: 'var(--font-size-base)', marginBottom: '0.25rem' }}>
                {recipe.label}
              </div>
              <code style={{ fontSize: 'var(--font-size-xs)', color: 'var(--muted-foreground)', display: 'block', marginBottom: '0.25rem' }}>
                .{recipe.className}
              </code>
              <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--subtle-foreground)' }}>
                {recipe.usage}
              </div>
            </div>
          ))}
        </div>

        <SectionHeading>Nav Recipes</SectionHeading>
        <div
          style={{
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-lg)',
            overflow: 'hidden',
            margin: '0 1rem',
          }}
        >
          {glassRecipes.slice(3).map((recipe) => (
            <div
              key={recipe.className}
              className={recipe.className}
              style={{
                padding: '1rem',
                borderBottom: '1px solid var(--border)',
              }}
            >
              <div style={{ fontWeight: 600, fontSize: 'var(--font-size-sm)', marginBottom: '0.15rem' }}>
                {recipe.label}
              </div>
              <code style={{ fontSize: 'var(--font-size-xs)', color: 'var(--muted-foreground)' }}>
                .{recipe.className}
              </code>
              <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--subtle-foreground)', marginTop: '0.15rem' }}>
                {recipe.usage}
              </div>
            </div>
          ))}
        </div>

        <SectionHeading>Token Reference</SectionHeading>
        <p
          style={{
            fontSize: 'var(--font-size-sm)',
            color: 'var(--muted-foreground)',
            padding: '0 1rem',
            marginBottom: '1rem',
          }}
        >
          Glass recipes use <code>color-mix()</code> with these surface tokens:
        </p>
        <div
          style={{
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-lg)',
            overflow: 'hidden',
            margin: '0 1rem',
          }}
        >
          <SwatchRow token="--surface" label="Surface" />
          <SwatchRow token="--border" label="Border" />
          <SwatchRow token="--popover" label="Popover" />
          <SwatchRow token="--accent" label="Accent" />
          <SwatchRow token="--foreground" label="Foreground" />
          <SwatchRow token="--muted-foreground" label="Muted Foreground" />
        </div>
      </div>
    </div>
  );
};

const meta = {
  title: 'Foundations/Glass',
  component: GlassPage,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof GlassPage>;

export default meta;

export const Overview = {};
