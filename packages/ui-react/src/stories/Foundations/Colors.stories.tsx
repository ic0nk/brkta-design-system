import type { Meta } from '@storybook/react';
import { TokenSwatch, SectionHeading, Description } from './helpers';

const ColorsPage = () => {
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
          Semantic Colors
        </h1>
        <Description>
          All semantic color tokens respond to the active theme. Values shown
          reflect the currently selected theme (light or dark).
        </Description>

        <div style={{ border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', overflow: 'hidden', marginTop: '1.5rem' }}>
          <div
            style={{
              padding: '0.5rem 1rem',
              background: 'var(--surface)',
              borderBottom: '1px solid var(--border)',
              fontSize: 'var(--font-size-xs)',
              fontWeight: 600,
              color: 'var(--muted-foreground)',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}
          >
            Surface Hierarchy
          </div>
          <TokenSwatch token="--background" label="Background" usage="Page canvas" />
          <TokenSwatch token="--foreground" label="Foreground" usage="Primary text" />
          <TokenSwatch token="--surface" label="Surface" usage="Sidebar, panels" />
          <TokenSwatch token="--surface-foreground" label="Surface Foreground" usage="Text on surface" />
          <TokenSwatch token="--card" label="Card" usage="Content cards" />
          <TokenSwatch token="--card-foreground" label="Card Foreground" usage="Text on card" />
          <TokenSwatch token="--popover" label="Popover" usage="Menus, dialogs" />
          <TokenSwatch token="--popover-foreground" label="Popover Foreground" usage="Text on popover" />
        </div>

        <div style={{ border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', overflow: 'hidden', marginTop: '1.5rem' }}>
          <div
            style={{
              padding: '0.5rem 1rem',
              background: 'var(--surface)',
              borderBottom: '1px solid var(--border)',
              fontSize: 'var(--font-size-xs)',
              fontWeight: 600,
              color: 'var(--muted-foreground)',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}
          >
            Neutral Containers
          </div>
          <TokenSwatch token="--muted" label="Muted" usage="Disabled regions" />
          <TokenSwatch token="--muted-foreground" label="Muted Foreground" usage="Disabled text" />
          <TokenSwatch token="--secondary" label="Secondary" usage="Secondary controls" />
          <TokenSwatch token="--secondary-foreground" label="Secondary Foreground" usage="Text on secondary" />
          <TokenSwatch token="--input" label="Input" usage="Form control background" />
          <TokenSwatch token="--border" label="Border" usage="Dividers, outlines" />
          <TokenSwatch token="--ring" label="Ring" usage="Focus ring" />
        </div>

        <div style={{ border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', overflow: 'hidden', marginTop: '1.5rem' }}>
          <div
            style={{
              padding: '0.5rem 1rem',
              background: 'var(--surface)',
              borderBottom: '1px solid var(--border)',
              fontSize: 'var(--font-size-xs)',
              fontWeight: 600,
              color: 'var(--muted-foreground)',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}
          >
            Primary &amp; Accent
          </div>
          <TokenSwatch token="--primary" label="Primary" usage="Primary buttons" />
          <TokenSwatch token="--primary-foreground" label="Primary Foreground" usage="Text on primary" />
          <TokenSwatch token="--accent" label="Accent" usage="Brand lime, highlights" />
          <TokenSwatch token="--accent-foreground" label="Accent Foreground" usage="Text on accent" />
        </div>

        <div style={{ border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', overflow: 'hidden', marginTop: '1.5rem' }}>
          <div
            style={{
              padding: '0.5rem 1rem',
              background: 'var(--surface)',
              borderBottom: '1px solid var(--border)',
              fontSize: 'var(--font-size-xs)',
              fontWeight: 600,
              color: 'var(--muted-foreground)',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}
          >
            Status Colors
          </div>
          <TokenSwatch token="--destructive" label="Destructive" usage="Delete, error states" />
          <TokenSwatch token="--destructive-foreground" label="Destructive Foreground" usage="Text on destructive" />
          <TokenSwatch token="--success" label="Success" usage="Positive states" />
          <TokenSwatch token="--success-foreground" label="Success Foreground" usage="Text on success" />
          <TokenSwatch token="--warning" label="Warning" usage="Caution states" />
          <TokenSwatch token="--warning-foreground" label="Warning Foreground" usage="Text on warning" />
          <TokenSwatch token="--information" label="Information" usage="Info states" />
          <TokenSwatch token="--information-foreground" label="Information Foreground" usage="Text on information" />
        </div>

        <div style={{ border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', overflow: 'hidden', marginTop: '1.5rem' }}>
          <div
            style={{
              padding: '0.5rem 1rem',
              background: 'var(--surface)',
              borderBottom: '1px solid var(--border)',
              fontSize: 'var(--font-size-xs)',
              fontWeight: 600,
              color: 'var(--muted-foreground)',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}
          >
            Utility
          </div>
          <TokenSwatch token="--utility-white" label="Utility White" usage="Exceptional use only" />
          <TokenSwatch token="--utility-black" label="Utility Black" usage="Exceptional use only" />
          <TokenSwatch token="--subtle-foreground" label="Subtle Foreground" usage="Placeholder, low emphasis" />
        </div>

        <div style={{ border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', overflow: 'hidden', marginTop: '1.5rem' }}>
          <div
            style={{
              padding: '0.5rem 1rem',
              background: 'var(--surface)',
              borderBottom: '1px solid var(--border)',
              fontSize: 'var(--font-size-xs)',
              fontWeight: 600,
              color: 'var(--muted-foreground)',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}
          >
            Chart Colors
          </div>
          <TokenSwatch token="--chart-1" label="Chart 1" usage="Primary chart series" />
          <TokenSwatch token="--chart-2" label="Chart 2" usage="Secondary chart series" />
          <TokenSwatch token="--chart-3" label="Chart 3" usage="Tertiary chart series" />
          <TokenSwatch token="--chart-4" label="Chart 4" usage="Quaternary chart series" />
          <TokenSwatch token="--chart-5" label="Chart 5" usage="Quinary chart series" />
        </div>

        <div style={{ border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', overflow: 'hidden', marginTop: '1.5rem' }}>
          <div
            style={{
              padding: '0.5rem 1rem',
              background: 'var(--surface)',
              borderBottom: '1px solid var(--border)',
              fontSize: 'var(--font-size-xs)',
              fontWeight: 600,
              color: 'var(--muted-foreground)',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}
          >
            Sidebar
          </div>
          <TokenSwatch token="--sidebar" label="Sidebar" usage="Navigation sidebar" />
          <TokenSwatch token="--sidebar-foreground" label="Sidebar Foreground" usage="Sidebar text" />
          <TokenSwatch token="--sidebar-primary" label="Sidebar Primary" usage="Active item" />
          <TokenSwatch token="--sidebar-primary-foreground" label="Sidebar Primary Foreground" usage="Text on active" />
          <TokenSwatch token="--sidebar-accent" label="Sidebar Accent" usage="Highlight" />
          <TokenSwatch token="--sidebar-accent-foreground" label="Sidebar Accent Foreground" usage="Text on highlight" />
          <TokenSwatch token="--sidebar-border" label="Sidebar Border" usage="Sidebar dividers" />
          <TokenSwatch token="--sidebar-ring" label="Sidebar Ring" usage="Sidebar focus ring" />
        </div>

        <div style={{ border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', overflow: 'hidden', marginTop: '1.5rem' }}>
          <div
            style={{
              padding: '0.5rem 1rem',
              background: 'var(--surface)',
              borderBottom: '1px solid var(--border)',
              fontSize: 'var(--font-size-xs)',
              fontWeight: 600,
              color: 'var(--muted-foreground)',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}
          >
            Special
          </div>
          <TokenSwatch token="--selection" label="Selection" usage="Text selection highlight" />
          <TokenSwatch token="--overlay" label="Overlay" usage="Modal backdrops" />
          <TokenSwatch token="--disabled" label="Disabled" usage="Disabled element background" />
          <TokenSwatch token="--disabled-foreground" label="Disabled Foreground" usage="Disabled element text" />
          <TokenSwatch token="--skeleton" label="Skeleton" usage="Loading placeholder" />
          <TokenSwatch token="--table-header" label="Table Header" usage="Table header row" />
        </div>
      </div>
    </div>
  );
};

const meta = {
  title: 'Foundations/Colors',
  component: ColorsPage,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof ColorsPage>;

export default meta;

export const Overview = {};
