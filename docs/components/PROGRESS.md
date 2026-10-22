# Progress

> A determinate progress bar that shows the completion percentage of a task or process.

---

## When to use

- Show upload/download progress.
- Display form completion percentage.
- Indicate multi-step process advancement.
- Show resource usage (storage, API quota).

Do not use Progress for indeterminate loading. Use Spinner or Skeleton for unknown duration loading.

---

## Implementation

| Layer | Location |
|-------|----------|
| Contract | `@brkta/ui-core/progress/progress-contract.ts` |
| CSS | `@brkta/ui-core/progress/progress.css` |
| React | `@brkta/ui-react/progress` (`Progress`) |
| Angular | `@brkta/ui-angular` (`ProgressComponent`) |

---

## React

```tsx
import { Progress } from '@brkta/ui-react/progress';

// Basic progress
<Progress value={65} />

// With custom max
<Progress value={450} max={500} />

// Size variants
<Progress value={25} size="sm" />
<Progress value={50} size="md" /> {/* default */}
<Progress value={85} size="lg" />
```

## Angular

```html
<brkta-progress [value]="65"></brkta-progress>
<brkta-progress [value]="450" [max]="500"></brkta-progress>
<brkta-progress [value]="25" size="sm"></brkta-progress>
<brkta-progress [value]="85" size="lg"></brkta-progress>
```

---

## Sizes

| Size | Height | Use Case |
|------|--------|----------|
| `sm` | 4px | Compact progress, embedded in cards |
| `md` | 8px | Default, standalone progress bars |
| `lg` | 12px | Prominent progress, file uploads |

## Accessibility

- Progress has `role="progressbar"` with `aria-valuenow`, `aria-valuemin`, and `aria-valuemax`.
- The `aria-label` shows the current percentage.
- Ensure color is not the only way progress is communicated. The percentage value should also be displayed as text nearby when critical.

## Related

- **Spinner** — For indeterminate/unknown duration loading.
- **Skeleton** — For content-shaped loading placeholders.
