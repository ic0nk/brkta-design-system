# Aspect Ratio

> A container wrapper that preserves a fixed width-to-height ratio without layout shift. Useful for media cards, video embeds, image previews, and dashboard panels.

---

## When to use

- Display media (images, videos, maps) at a consistent aspect ratio.
- Prevent cumulative layout shift (CLS) during content loading.
- Create responsive media cards and preview thumbnails.
- Dashboard widgets that need predictable dimensions.

Do not use Aspect Ratio for content that should grow with its inner content — use a regular container instead.

---

## Implementation

| Layer | Location |
|-------|----------|
| Contract | `@brkta/ui-core/aspect-ratio/aspect-ratio-contract.ts` |
| CSS | `@brkta/ui-core/aspect-ratio/aspect-ratio.css` |
| React | `@brkta/ui-react/aspect-ratio` (`AspectRatio`) |
| Angular | `@brkta/ui-angular` (`AspectRatioComponent`, selector `[brkta-aspect-ratio]`) |

---

## Supported Ratios

| Ratio | Usage |
|-------|-------|
| `1:1` | Square avatar, album art |
| `4:3` | Classic photo, presentation |
| `16:9` | Widescreen video, hero banners |
| `21:9` | Ultrawide cinematic, dashboards |

---

## React

```tsx
import { AspectRatio } from '@brkta/ui-react/aspect-ratio';

<AspectRatio ratio={[16, 9]}>
  <img src="thumbnail.jpg" alt="Preview" />
</AspectRatio>
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `ratio` | `[number, number]` | `[16, 9]` | Width-to-height ratio as `[w, h]` |
| `className` | `string` | — | Additional CSS class |
| `children` | `ReactNode` | — | Content inside the ratio box |

## Angular

```html
<brkta-aspect-ratio [ratio]="[16, 9]">
  <img brkta-aspect-ratio-inner src="thumbnail.jpg" alt="Preview" />
</brkta-aspect-ratio>
```

### Inputs

| Input | Type | Default | Description |
|-------|------|---------|-------------|
| `ratio` | `[number, number]` | `[16, 9]` | Width-to-height ratio |

The inner content must use the `brkta-aspect-ratio-inner` attribute to be positioned inside the ratio box.

---

## States

| State | CSS | Notes |
|-------|-----|-------|
| Default | `[data-brkta-aspect-ratio]` | Creates the ratio via `::before` padding-bottom |
| Inner | `[data-brkta-aspect-ratio-inner]` | Absolutely positioned inside the wrapper |

---

## Accessibility

- The wrapper is purely presentational — no ARIA attributes required.
- Ensure child media (`<img>`, `<video>`) provides its own `alt` text or accessible description.
