# @brkta/icons — Brand Assets & Icon Governance

> Single source of truth for BRKTA brand SVG assets.

## Current Brand — BRKTA

| File | Description |
|------|-------------|
| `brkta-one-logo-light.svg` | Full BRKTA logo, cream glyphs — use on dark surfaces |
| `brkta-one-logo-dark.svg` | Full BRKTA logo, dark glyphs — use on light surfaces |
| `brkta-one-icon-light.svg` | BRKTA icon mark only, cream — favicon/app icon on dark surfaces |
| `brkta-one-icon-dark.svg` | BRKTA icon mark only, dark — favicon/app icon on light surfaces |

Source files are preserved in `packages/Brand-Logo/` (untracked source of the
approved assets). The governed copies above are the ones applications must use.

## Legacy — BRKTA

| File | Description |
|------|-------------|
| `brkta-logo.svg` | Legacy BRKTA logo (mark + wordmark) — retained for reference only |
| `brkta-mark.svg` | Legacy BRKTA icon mark — retained for reference only |

The product name is **BRKTA**. The `brkta-*` assets are legacy artifacts
kept until the BRKTA-to-BRKTA asset migration is fully closed out.

## Usage

### Next.js / React

```tsx
const logoUrl = '/assets/icons/brkta-one-logo-dark.svg';

<img src={logoUrl} alt="BRKTA" width={171} height={32} />
```

### Angular

```typescript
// In component
logoUrl = '/assets/icons/brkta-one-logo-dark.svg';

// In template
<img [src]="logoUrl" alt="BRKTA" height="32" />
```

The company website, product website, and Angular dashboard mirror the four
governed SVGs into `apps/company-website/public/assets/icons/`,
`apps/website/public/assets/icons/`, and `apps/dashboard/public/assets/icons/`
so the builds serve them at `/assets/icons/`. Keep the mirrors in sync when the
governed assets change.

Or import directly in styles:

```scss
background: url('@brkta/icons/brkta-one-icon-dark.svg') no-repeat center;
```

## Governance Rules

1. **Do not modify SVG files directly** — brand assets are approved by design. Any change requires a brand review.
2. **Do not add third-party icons here** — product UI icons use Lucide (via `lucide-react`/`lucide-angular` or equivalent). This package is for **brand assets only**. React/Next.js may additionally use Its Hover (animated icons) and React Icons (fallback) — see `docs/design-system/ICONS.md` for the full policy.
3. **Always set `alt` text** — brand images must have descriptive alt text (e.g., "BRKTA").
4. **Maintain aspect ratio** — always set either `height` or `width`, never both unless at native ratio.
5. **Dark/light variants** — the `*-light.svg`/`*-dark.svg` suffix describes the glyph color, not the surface. Cream glyphs (`*-light`) go on dark surfaces; dark glyphs (`*-dark`) go on light surfaces.
6. **No React icon libraries in Angular** — `react-icons`, `itshover-react`, and any other React icon packages must never be imported in Angular code or added to `@brkta/icons`.
