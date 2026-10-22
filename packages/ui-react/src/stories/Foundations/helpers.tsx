import { useEffect, useState, type ReactNode } from 'react';

export function useCSSVar(name: string): string {
  const [value, setValue] = useState('');
  useEffect(() => {
    const el = document.documentElement;
    const val = getComputedStyle(el).getPropertyValue(name).trim();
    setValue(val);
  }, [name]);
  return value;
}

export interface TokenSwatchProps {
  token: string;
  label: string;
  usage?: string;
}

export function TokenSwatch({ token, label, usage }: TokenSwatchProps) {
  const value = useCSSVar(token);
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        padding: '0.75rem 1rem',
        borderBottom: '1px solid var(--border)',
      }}
    >
      <div
        style={{
          width: 48,
          height: 48,
          borderRadius: 'var(--radius)',
          background: `var(${token})`,
          border: '1px solid var(--border)',
          flexShrink: 0,
        }}
      />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            fontWeight: 600,
            color: 'var(--foreground)',
            fontSize: 'var(--font-size-sm)',
          }}
        >
          {label}
        </div>
        <code
          style={{
            fontSize: 'var(--font-size-xs)',
            color: 'var(--muted-foreground)',
          }}
        >
          {token}
        </code>
        {value && (
          <div
            style={{
              fontSize: 'var(--font-size-xs)',
              color: 'var(--subtle-foreground)',
              marginTop: 2,
            }}
          >
            {value}
          </div>
        )}
      </div>
      {usage && (
        <div
          style={{
            fontSize: 'var(--font-size-xs)',
            color: 'var(--muted-foreground)',
            textAlign: 'right',
            maxWidth: 200,
            flexShrink: 0,
          }}
        >
          {usage}
        </div>
      )}
    </div>
  );
}

export function SectionHeading({ children }: { children: ReactNode }) {
  return (
    <h2
      style={{
        fontFamily: 'var(--font-sans)',
        fontSize: 'var(--font-size-xl)',
        fontWeight: 700,
        color: 'var(--foreground)',
        margin: '1.5rem 0 0.75rem',
        padding: '0 1rem',
      }}
    >
      {children}
    </h2>
  );
}

export function Description({ children }: { children: ReactNode }) {
  return (
    <p
      style={{
        fontSize: 'var(--font-size-sm)',
        color: 'var(--muted-foreground)',
        margin: '0 0 0.5rem',
        padding: '0 1rem',
        lineHeight: 1.6,
      }}
    >
      {children}
    </p>
  );
}
