# Carousel

> An accessible image/content carousel with previous/next controls and position indicators. Supports loop and non-loop modes, keyboard navigation, and reduced motion.

---

## When to use

- Showcase a series of content slides (data visualizations, features, images).
- Guided onboarding or feature tours.
- Content galleries where manual navigation is needed.

Do not use Carousel for auto-playing ads or hero sliders that animate without user action.

---

## Implementation

| Layer | Location |
|-------|----------|
| Contract | `@brkta/ui-core/carousel/carousel-contract.ts` |
| CSS | `@brkta/ui-core/carousel/carousel.css` |
| React | `@brkta/ui-react/carousel` (`Carousel`) |
| Angular | `@brkta/ui-angular` (`CarouselComponent`, selector `brkta-carousel`) |

---

## React

```tsx
import { Carousel } from '@brkta/ui-react/carousel';

<Carousel loop>
  <div>Slide 1</div>
  <div>Slide 2</div>
  <div>Slide 3</div>
</Carousel>
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `loop` | `boolean` | `false` | Wrap from last to first and vice versa |
| `showControls` | `boolean` | `true` | Show prev/next arrow buttons |
| `showIndicators` | `boolean` | `true` | Show dot indicators |

## Angular

```html
<brkta-carousel [loop]="true">
  <div data-brkta-carousel-slide>Slide 1</div>
  <div data-brkta-carousel-slide>Slide 2</div>
</brkta-carousel>
```

### Inputs

| Input | Type | Default | Description |
|-------|------|---------|-------------|
| `loop` | `boolean` | `false` | Enable loop mode |
| `showControls` | `boolean` | `true` | Show prev/next buttons |
| `showIndicators` | `boolean` | `true` | Show dot indicators |

---

## Keyboard

| Key | Action |
|-----|--------|
| ArrowLeft | Previous slide |
| ArrowRight | Next slide |

---

## Accessibility

- `role="region"` with `aria-roledescription="carousel"`.
- Each slide has `role="group"` with `aria-roledescription="slide"` and `aria-label="Slide X of N"`.
- Prev/next buttons have `aria-label`.
- Indicators have `aria-label` and `aria-current`.
- Tab stop on the carousel container for keyboard navigation.
- `prefers-reduced-motion` disables the slide transition animation.

---

## States

| State | CSS | Notes |
|-------|-----|-------|
| Disabled control | `[data-disabled]` | Opacity 0.3, no pointer events (at boundaries when not looping) |
| Active indicator | `[data-active]` | Primary background |
