import type { Meta } from '@storybook/react';
import { TokenSwatch, SectionHeading, Description } from './helpers';

const DarkSurfacesPage = () => {
  return (
    <div className="dark">
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
            Dark Surface Hierarchy
          </h1>
          <Description>
            Dark mode uses a warm charcoal surface hierarchy rather than pure black
            or cold blue-gray. Surfaces step from deep charcoal up through progressively
            lighter warm tones — card, then popover — to create visible separation.
          </Description>

          <div
            style={{
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-lg)',
              overflow: 'hidden',
              marginTop: '1.5rem',
            }}
          >
            <TokenSwatch
              token="--background"
              label="Background"
              usage="Warm charcoal page canvas (#12110E)"
            />
            <TokenSwatch
              token="--foreground"
              label="Foreground"
              usage="Cream text & icons (#F4F1EA)"
            />
            <SectionHeading>Surface Levels</SectionHeading>
            <TokenSwatch
              token="--surface"
              label="Surface"
              usage="Sidebar, grouped sections, secondary panels"
            />
            <TokenSwatch
              token="--card"
              label="Card"
              usage="Content cards, metric tiles, list items"
            />
            <TokenSwatch
              token="--popover"
              label="Popover"
              usage="Menus, dropdowns, tooltips, dialogs"
            />
          </div>

          <div
            style={{
              marginTop: '2rem',
              padding: '0 1rem',
            }}
          >
            <h3
              style={{
                fontSize: 'var(--font-size-base)',
                fontWeight: 600,
                color: 'var(--foreground)',
                marginBottom: '0.75rem',
              }}
            >
              Visual Stack
            </h3>
            <div
              style={{
                background: 'var(--background)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius)',
                padding: '1.5rem',
              }}
            >
              <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--muted-foreground)', marginBottom: '0.5rem' }}>
                background
              </div>
              <div
                style={{
                  background: 'var(--surface)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '1rem',
                }}
              >
                <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--muted-foreground)', marginBottom: '0.5rem' }}>
                  surface
                </div>
                <div
                  style={{
                    background: 'var(--card)',
                    border: '1px solid var(--border)',
                    borderRadius: 'var(--radius-sm)',
                    padding: '1rem',
                  }}
                >
                  <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--muted-foreground)', marginBottom: '0.5rem' }}>
                    card
                  </div>
                  <div
                    style={{
                      background: 'var(--popover)',
                      border: '1px solid var(--border)',
                      borderRadius: 'var(--radius-sm)',
                      padding: '0.75rem',
                    }}
                  >
                    <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--muted-foreground)' }}>
                      popover
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const meta = {
  title: 'Foundations/Dark Surfaces',
  component: DarkSurfacesPage,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof DarkSurfacesPage>;

export default meta;

export const Overview = {};
