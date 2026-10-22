# Skeleton

> A loading placeholder that pulses to indicate content is being loaded. Skeletons reduce perceived wait time and prevent layout shift.

---

## When to use

- Content is loading asynchronously (API calls, data fetching).
- The eventual content has a predictable shape (text lines, cards, table rows).
- You want to prevent layout shift by reserving space.

Do not use Skeleton for content that loads synchronously or instantly (< 300ms). The pulse animation on rapid content can feel jarring.

---

## Implementation

| Layer | Location |
|-------|----------|
| Contract | `@brkta/ui-core/skeleton/skeleton-contract.ts` |
| CSS | `@brkta/ui-core/skeleton/skeleton.css` |
| React | `@brkta/ui-react/skeleton` (`Skeleton`) |
| Angular | `@brkta/ui-angular` (`SkeletonComponent`) |

---

## React

```tsx
import { Skeleton } from '@brkta/ui-react/skeleton';

// Text placeholder (default)
<Skeleton variant="text" />
<Skeleton variant="text" width="75%" />
<Skeleton variant="text" width="50%" />

// Card placeholder
<Skeleton variant="card" />

// Table row placeholder
<Skeleton variant="table" />

// Multiple text lines for a paragraph
<div className="space-y-2">
  <Skeleton variant="text" />
  <Skeleton variant="text" width="85%" />
  <Skeleton variant="text" width="60%" />
</div>
```

## Angular

```html
<!-- Text placeholder (default) -->
<brkta-skeleton variant="text"></brkta-skeleton>
<brkta-skeleton variant="text" [width]="'75%'"></brkta-skeleton>
<brkta-skeleton variant="text" [width]="'50%'"></brkta-skeleton>

<!-- Card placeholder -->
<brkta-skeleton variant="card"></brkta-skeleton>

<!-- Table row placeholder -->
<brkta-skeleton variant="table"></brkta-skeleton>
<brkta-skeleton variant="table" [width]="'85%'"></brkta-skeleton>
```

> **Important:** Always use the `[width]` input binding (e.g. `[width]="'75%'"`) instead of `style="width: 75%"` on the host element. The `[width]` input applies the value to the inner `[style.width]` of the skeleton `<div>`, while a host `style` would target the Angular `<brkta-skeleton>` wrapper where skeleton CSS doesn't apply.

---

## Variants

| Variant | Shape | Height | Use Case |
|---------|-------|--------|----------|
| `text` | Small rounded rectangle | 12px | Text lines, labels, paragraphs |
| `card` | Large rounded rectangle | 128px | Card content, dashboard widgets |
| `table` | Medium rounded rectangle | 40px | Table rows, list items |

## Accessibility

- Skeleton has `aria-hidden="true"` — it is invisible to screen readers.
- The loading state should be announced to screen readers via a live region or `aria-busy` on the parent container.

## Reduced motion

Skeleton respects `prefers-reduced-motion: reduce`. When reduced motion is active, the pulse animation is removed.

## Token usage

- Skeleton background uses `--skeleton` (a half-alpha variant of `--muted`): `oklch(0.9352 0.0144 84.6 / 0.5)` light, `oklch(0.2979 0.0130 87.6 / 0.5)` dark.
- Do not use `--muted` directly for skeleton backgrounds; the approved `--skeleton` token provides the correct reduced opacity.

## Related

- **Spinner** — For standalone/global loading indicators.
- **Button loading** — For loading states on buttons (uses three-dot loader, not skeleton).
