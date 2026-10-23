# Site Shell

The public-site shell provides a reusable intro, responsive header, mobile navigation, and footer reveal for React-based sites.

## Package

```tsx
import { SiteExperience } from "@brkta/ui-react/site-shell";
```

The shell accepts the logo, navigation, CTA, intro copy, and footer groups as configuration. It does not hardcode application routes.

## Theme integration

`SiteExperience` mounts the shared `SiteThemeProvider`, which connects the React shell to `@brkta/platform-core` and the design-token `.dark` selector.

- The header control cycles through `system`, `light`, and `dark` modes.
- The selected mode is persisted through the platform preference store.
- System mode follows `prefers-color-scheme` changes.
- Pass both `logoSrc` and `logoSrcDark` when the brand has separate light and dark assets.
- Header menu and theme icons use the shared animated site-icon wrappers and the governed hover/focus motion classes.
- Header, hero, footer, menu, and contact CTAs use the shared `@brkta/ui-react/button` implementation. Do not add page-specific button recipes for shell actions.

## Motion

- The intro uses GSAP for the logo, message, progress line, grid drift, and exit reveal.
- The intro logo hands off to the measured header logo slot at the end of the intro, shrinking responsively while crossfading to the header theme asset.
- The startup intro intentionally uses the inverse of the selected site theme: dark in light mode and light in dark mode. Its logo asset is inverted with the surface treatment.
- The header enters after the intro and uses ScrollTrigger to detect compact scroll state.
- The mobile menu uses a GSAP stagger and locks body scrolling while open.
- The footer reveals when it reaches the viewport.
- All timelines clean up on unmount and skip non-essential motion for reduced-motion users.

## Responsive contract

The shell must remain usable at 320px, 390px, 768px, 1024px, 1280px, and 1440px or wider. It must not introduce horizontal overflow, clipped labels, overlapping controls, or touch targets below 44x44px.
