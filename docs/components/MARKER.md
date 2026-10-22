# Marker

> A status indicator that pairs a colored dot with an optional label, in default, success, warning, destructive, and info variants.

---

## Implementation

| Layer | Location |
|-------|----------|
| Contract | `@brkta/ui-core/marker/marker-contract.ts` |
| CSS | `@brkta/ui-core/marker/marker.css` |
| React | `@brkta/ui-react/marker` (`Marker`) |
| Angular | `@brkta/ui-angular` (`MarkerComponent`) |

---

## Usage

### React

```tsx
import { Marker } from '@brkta/ui-react/marker';

<Marker variant="success" label="Active" />
<Marker variant="warning" label="Pending" />
<Marker variant="destructive" label="Offline" />
<Marker variant="info" label="Beta" size="lg" />
<Marker variant="success" /> {/* dot only */}
```

### Angular

```html
<brkta-marker variant="success" label="Active"></brkta-marker>
<brkta-marker variant="warning" label="Pending"></brkta-marker>
<brkta-marker variant="destructive" label="Offline"></brkta-marker>
<brkta-marker variant="info" label="Beta" size="lg"></brkta-marker>
<brkta-marker variant="success"></brkta-marker>
```

---

## Props / Inputs

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'default' \| 'success' \| 'warning' \| 'destructive' \| 'info'` | `'default'` | Dot color variant |
| `label` | `string` | — | Text shown next to the dot; when omitted, only the dot renders |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size; only `lg` has dedicated CSS (larger dot and font) |

## States

| State | Visual |
|-------|--------|
| Default | Dot in `--muted-foreground` |
| Success | Dot in `--success` |
| Warning | Dot in `--warning` |
| Destructive | Dot in `--destructive` |
| Info | Dot in `--info` |
| Size `lg` | Dot grows to `10px` and text to `0.875rem` |

## Accessibility

- Renders a `<span>` with an empty dot `<span>` and an optional text label; no ARIA roles are applied.
- When a `label` is provided, color is not the only indicator — the label text conveys the state in words.
- Dot-only usage (`label` omitted) relies on surrounding context to convey meaning.

## Related Components

- Badge — alternative status indicator
- Message — message rows that can pair with status markers
