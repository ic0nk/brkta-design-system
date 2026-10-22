import type { Meta } from '@storybook/react';

const CreamAcrossThemesPage = () => {
  return (
    <div
      style={{
        fontFamily: 'var(--font-sans)',
        minHeight: '100vh',
      }}
    >
      <div
        style={{
          maxWidth: 960,
          margin: '0 auto',
          padding: '3rem 1.5rem',
        }}
      >
        <h1
          style={{
            fontSize: 'var(--font-size-3xl)',
            fontWeight: 700,
            color: 'var(--foreground)',
            textAlign: 'center',
            marginBottom: '0.5rem',
          }}
        >
          Connecting Cream
        </h1>
        <p
          style={{
            fontSize: 'var(--font-size-base)',
            color: 'var(--muted-foreground)',
            textAlign: 'center',
            marginBottom: '2.5rem',
          }}
        >
          <code style={{ background: 'var(--muted)', padding: '0.15rem 0.4rem', borderRadius: 'var(--radius-sm)' }}>
            #F4F1EA
          </code>
          {' '}—{' '}
          <code style={{ background: 'var(--muted)', padding: '0.15rem 0.4rem', borderRadius: 'var(--radius-sm)' }}>
            oklch(0.9585 0.0098 87.5)
          </code>
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 0,
            borderRadius: 'var(--radius-lg)',
            overflow: 'hidden',
            border: '1px solid var(--border)',
            marginBottom: '2rem',
          }}
        >
          {/* Light Panel */}
          <div
            style={{
              background: '#F4F1EA',
              color: '#181713',
              padding: '2rem',
            }}
          >
            <h2
              style={{
                fontSize: 'var(--font-size-lg)',
                fontWeight: 600,
                marginBottom: '1rem',
              }}
            >
              Light Mode
            </h2>
            <div
              style={{
                background: '#F8F5EE',
                borderRadius: 'var(--radius)',
                padding: '1.25rem',
                border: '1px solid #DDD5C8',
                marginBottom: '1rem',
              }}
            >
              <div
                style={{
                  background: '#FFFCF7',
                  borderRadius: 'var(--radius)',
                  padding: '1rem',
                  border: '1px solid #DDD5C8',
                }}
              >
                <p style={{ margin: 0, fontSize: 'var(--font-size-sm)' }}>
                  <strong>Canvas:</strong> #F4F1EA cream
                </p>
                <p style={{ margin: '0.5rem 0 0', fontSize: 'var(--font-size-sm)' }}>
                  The cream serves as the <strong>application background</strong>.
                </p>
              </div>
            </div>
            <p style={{ fontSize: 'var(--font-size-xs)', color: '#68645C', margin: 0 }}>
              Surface → Card → Popover step lighter from the cream canvas
            </p>
          </div>

          {/* Dark Panel */}
          <div
            style={{
              background: '#12110E',
              color: '#F4F1EA',
              padding: '2rem',
            }}
          >
            <h2
              style={{
                fontSize: 'var(--font-size-lg)',
                fontWeight: 600,
                marginBottom: '1rem',
              }}
            >
              Dark Mode
            </h2>
            <div
              style={{
                background: '#191813',
                borderRadius: 'var(--radius)',
                padding: '1.25rem',
                border: '1px solid #474238',
                marginBottom: '1rem',
              }}
            >
              <div
                style={{
                  background: '#211F1A',
                  borderRadius: 'var(--radius)',
                  padding: '1rem',
                  border: '1px solid #474238',
                }}
              >
                <p style={{ margin: 0, fontSize: 'var(--font-size-sm)' }}>
                  <strong>Foreground:</strong> #F4F1EA cream
                </p>
                <p style={{ margin: '0.5rem 0 0', fontSize: 'var(--font-size-sm)' }}>
                  The same cream becomes the <strong>principal text and icon colour</strong>.
                </p>
              </div>
            </div>
            <p style={{ fontSize: 'var(--font-size-xs)', color: '#AAA398', margin: 0 }}>
              Same hex value — different role across themes
            </p>
          </div>
        </div>

        <div
          style={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius)',
            padding: '1.25rem 1.5rem',
          }}
        >
          <h3
            style={{
              fontSize: 'var(--font-size-base)',
              fontWeight: 600,
              color: 'var(--foreground)',
              marginBottom: '0.5rem',
            }}
          >
            Design Rationale
          </h3>
          <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--muted-foreground)', lineHeight: 1.6, margin: 0 }}>
            BRKTA uses a warm creamy neutral foundation rather than a cold zero-chroma gray
            or a pure-white/pure-black scheme. The same connecting cream (#F4F1EA) unifies both
            themes: it is the application background in light mode and the principal high-emphasis
            text and icon foreground in dark mode. This creates visual continuity and a distinctive
            warm identity across the entire platform.
          </p>
        </div>
      </div>
    </div>
  );
};

const meta = {
  title: 'Foundations/Cream Across Themes',
  component: CreamAcrossThemesPage,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof CreamAcrossThemesPage>;

export default meta;

export const Overview = {};
