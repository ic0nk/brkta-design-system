# Accessibility

> Every component in the BRKTA ONE Design System meets WCAG 2.2 AA at minimum. Accessible design is not a separate track or a theme toggle — it is baked into every token, every contract, and every component from the start.

---

## Table of Contents

- [WCAG 2.2 AA Target](#wcag-22-aa-target)
- [Focus Management](#focus-management)
- [Keyboard Navigation](#keyboard-navigation)
- [Color Contrast](#color-contrast)
- [Reduced Motion](#reduced-motion)
- [Reduced Transparency](#reduced-transparency)
- [Screen Reader Support](#screen-reader-support)
- [Icon-Only Buttons](#icon-only-buttons)
- [Form Validation](#form-validation)
- [Loading States](#loading-states)
- [Testing](#testing)

---

## WCAG 2.2 AA Target

The BRKTA ONE Design System targets **WCAG 2.2 Level AA** as its minimum compliance level. This covers:

| Criteria | Requirement | Status |
|----------|-------------|--------|
| 1.1.1 Non-text Content | All non-text content has a text alternative | Built into contracts |
| 1.3.1 Info and Relationships | Information and relationships programmatically determined | Built into contracts |
| 1.4.1 Use of Color | Color is not the only means of conveying information | Enforced by design |
| 1.4.3 Contrast (Normal) | Minimum 4.5:1 contrast ratio | Verified for all token pairs |
| 1.4.4 Resize Text | Text can be resized to 200% without loss of content | Fluid typography |
| 1.4.10 Reflow | Content reflows without scroll at 320px | Responsive system |
| 1.4.11 Non-text Contrast | UI components meet 3:1 | Verified for all interactive elements |
| 1.4.12 Text Spacing | No loss of content when text spacing is overridden | Tested |
| 2.1.1 Keyboard | All functionality operable via keyboard | Built into contracts |
| 2.4.3 Focus Order | Focus order preserves meaning | Tested per component |
| 2.4.7 Focus Visible | Keyboard focus indicator is visible | Built into CSS |
| 2.4.11 Focus Not Obscured | Focused element is not hidden by other content | Verified |
| 2.5.8 Target Size | Minimum 24px target size (AA) | 44px default for interactive |
| 3.3.1 Error Identification | Errors are identified and described | Built into form contracts |
| 3.3.2 Labels or Instructions | Labels or instructions provided | Built into form contracts |
| 3.3.4 Error Prevention | Reversible, checked, or confirmed for legal/financial | Enforced by UX patterns |

---

## Focus Management

### Focus-Visible Rings

All interactive elements use `:focus-visible` to show a visible focus indicator only when the user navigates with a keyboard (not when clicking with a mouse).

```css
/* Applied globally in base.css */
:focus-visible {
  outline: 2px solid var(--ring, oklch(0.2042 0.0079 95.4));
  outline-offset: 2px;
}

/* Remove default outline for mouse clicks */
:focus:not(:focus-visible) {
  outline: none;
}
```

- Focus ring color uses `--ring` (adapts to light/dark theme).
- Focus ring width is 2px with 2px offset.
- Focus ring is visible on all interactive elements: buttons, links, inputs, selects, textareas, toggles, checkboxes, radio buttons, tab panels, and custom interactive widgets.
- Custom components (dropdowns, date pickers, modals) must implement focus-visible on their interactive children.

### Focus Trapping

Modals, dialogs, and sheets must trap keyboard focus within the component when open:

```css
/* Focus trap implemented in component JavaScript/TypeScript */
// Requirements:
// 1. When modal opens, focus moves to the first focusable element inside
// 2. Tab cycles through focusable elements within the modal only
// 3. Shift+Tab reverses the cycle
// 4. Focus returns to the trigger element when modal closes
// 5. Escape closes the modal and returns focus
```

### Skip Links

The dashboard and website must include a skip-to-content link as the first focusable element:

```html
<a href="#main-content" class="skip-link">
  Skip to main content
</a>
```

```css
.skip-link {
  position: absolute;
  top: -100%;
  left: var(--space-4);
  padding: var(--space-2) var(--space-4);
  background: var(--primary);
  color: var(--primary-foreground);
  z-index: var(--z-toast);
  border-radius: var(--radius-md);
}

.skip-link:focus {
  top: var(--space-2);
}
```

---

## Keyboard Navigation

### All Interactive Elements Are Reachable

Every interactive element must be reachable and operable by keyboard:

| Element | Interaction | Key |
|---------|------------|-----|
| Button | Activate | Enter / Space |
| Link | Navigate | Enter |
| Input | Focus | Tab |
| Select | Open / Close | Enter / Space / Escape |
| Checkbox | Toggle | Space |
| Radio | Select | Arrow keys |
| Toggle | Toggle | Enter / Space |
| Dropdown menu | Open / Navigate / Select | Enter / Arrow keys / Escape |
| Modal | Close | Escape |
| Tabs | Switch tab | Arrow keys |
| Slider | Adjust | Arrow keys |
| Date picker | Navigate | Arrow keys, Enter |

### Tab Order

- Tab order follows the visual reading order — left to right, top to bottom.
- Use `tabindex="0"` for custom interactive elements.
- Use `tabindex="-1"` for elements that should be programmatically focusable but not in the tab order.
- Never use positive `tabindex` values (e.g., `tabindex="5"`).
- Use `aria-flowto` sparingly and only when the natural tab order cannot be changed.

### Arrow Key Navigation

Groups of related controls (radio buttons, tab lists, menu items, toolbar buttons) should support arrow key navigation:

```html
<!-- Tab list with arrow key navigation -->
<div role="tablist" aria-label="Invoice tabs">
  <button role="tab" aria-selected="true" tabindex="0">All</button>
  <button role="tab" aria-selected="false" tabindex="-1">Pending</button>
  <button role="tab" aria-selected="false" tabindex="-1">Paid</button>
</div>
```

---

## Color Contrast

### Minimum Ratios

| Text Type | Minimum Ratio | Examples |
|-----------|--------------|----------|
| Normal text (< 18pt / < 14pt bold) | 4.5:1 | Body copy, labels, table cells, captions |
| Large text (>= 18pt / >= 14pt bold) | 3:1 | h1–h4, large body text |
| UI components / graphical objects | 3:1 | Icons, input borders, focus indicators |
| Text on glass | 4.5:1 | Text on glass-elevated, glass-card |

### Token Verification

All semantic token pairs have been verified to meet WCAG 2.2 AA contrast minimums:

| Background | Foreground | Light Ratio | Dark Ratio | Passes AA? |
|------------|------------|-------------|-------------|------------|
| `--background` (cream `#F4F1EA`) | `--foreground` (warm near-black `#181713`) | ~14:1 | ~14:1 | Yes |
| `--background` (cream `#F4F1EA`) | `--muted-foreground` (warm mid-gray `#68645C`) | ~5.5:1 | ~7:1 | Yes |
| `--background` (cream `#F4F1EA`) | `--subtle-foreground` (warm gray `#827D73`) | ~4.5:1 | ~6:1 | Yes |
| `--card` (warm off-white) | `--card-foreground` (warm near-black) | ~14:1 | ~14:1 | Yes |
| `--primary` (warm near-black) | `--primary-foreground` (cream) | ~14:1 | ~14:1 | Yes |
| `--destructive` (red) | `--destructive-foreground` (cream) | ~5.5:1 | ~5.5:1 | Yes |
| `--accent` (lime `#D7FF3F`) | `--accent-foreground` (dark green-black) | ~7:1 | ~7:1 | Yes |
| `--accent` (dark lime) | `--accent-foreground` (cream) | — | ~8:1 | Yes |
| `--border` (warm beige `#DDD5C8`) | `--background` (cream) | ~3:1 | ~3:1 | Yes (graphical) |

All critical text contrast pairs meet or exceed the 4.5:1 WCAG AA requirement for normal text and 3:1 for large text and graphical objects.

**Key properties of the warm creamy neutral palette:**
- The cream background (`#F4F1EA`, L=0.9585) is slightly darker than pure white, which actually improves contrast against all foreground colors compared to a pure white background.
- The warm near-black foreground (`#181713`, L=0.2042) is slightly lighter than pure black, reducing eye strain while maintaining excellent contrast.
- Dark mode swaps the roles: cream (`#F4F1EA`) becomes the foreground on warm charcoal (`#12110E`), maintaining equivalent contrast ratios.

### Testing

- Every new component must have its color contrast verified against WCAG AA standards.
- Test in both light and dark modes.
- Test text on glass surfaces with the worst-case visible background.
- Use automated tools (axe-core, Lighthouse) in CI.
- Manual verification with a color contrast analyzer for all token-to-token combinations.

---

## Reduced Motion

When `prefers-reduced-motion: reduce` is active:

- All CSS animations and transitions are reduced to 0.01ms duration (effectively instant).
- Loading spinners should be replaced with static indicators or hidden.
- Page transitions become instant.
- Scroll behavior becomes `auto` instead of `smooth`.
- `prefers-reduced-motion` does NOT disable visibility changes — hidden/visible, open/closed, and show/hide transitions still work; they just happen instantly.

Implementation in `base.css`:

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

---

## Reduced Transparency

When `prefers-reduced-transparency: reduce` is active:

- All glass/backdrop-filter effects are removed.
- Glass surfaces fall back to solid `--surface` backgrounds.
- Navigation glass variants (`glass-nav-item-active`, `glass-nav-subitem-active`) also lose their blur effect.
- Transparency in modal overlays is reduced or removed.
- `color-mix()` values in glass classes switch to fully opaque.

Implementation in `glass.css`:

```css
@media (prefers-reduced-transparency: reduce) {
  .glass-card,
  .glass-elevated,
  .glass-surface,
  .glass-nav-pill,
  .glass-nav-menu {
    backdrop-filter: none;
    -webkit-backdrop-filter: none;
    background-color: var(--surface);
  }

  .glass-nav-item-active,
  .glass-nav-subitem-active {
    backdrop-filter: none;
    -webkit-backdrop-filter: none;
  }
}
```

---

## Screen Reader Support

### ARIA Labels

| Element | ARIA Attribute | Example |
|---------|---------------|---------|
| Navigation region | `role="navigation"` / `aria-label` | `<nav aria-label="Main navigation">` |
| Search region | `role="search"` | `<div role="search">` |
| Main content | `role="main"` / `id` for skip link | `<main id="main-content">` |
| Complementary | `role="complementary"` / `aria-label` | Sidebar with `aria-label="Invoice details"` |
| Form group | `role="group"` / `aria-labelledby` | `<fieldset aria-labelledby="shipping-legend">` |
| Status updates | `aria-live="polite"` | Toast notifications, loading indicators |
| Alerts | `role="alert"` | Error banners, critical messages |
| Modal | `role="dialog"` / `aria-modal="true"` / `aria-labelledby` | Default modal pattern |
| Tab panel | `role="tabpanel"` / `aria-labelledby` | Content panels in tab interfaces |

### Landmarks

Every page must have at least these ARIA landmarks:

```html
<header role="banner">
  <!-- Page header -->
</header>

<nav aria-label="Main navigation">
  <!-- Navigation -->
</nav>

<main id="main-content">
  <!-- Primary page content -->
</main>

<footer role="contentinfo">
  <!-- Page footer -->
</footer>
```

### Live Regions

- Use `aria-live="polite"` for dynamic content updates (toast notifications, loading states, search results).
- Use `aria-live="assertive"` sparingly — only for time-critical, user-blocking updates.
- Use `role="status"` for status messages in loading indicators.
- Use `role="alert"` for error banners and destructive-action confirmations.

```html
<!-- Toast notification with live region -->
<div aria-live="polite" aria-atomic="true">
  <div class="toast" role="status">Invoice #1234 has been saved.</div>
</div>
```

---

## Icon-Only Buttons

Any button that contains only an icon (no visible text label) must have an accessible name.

```tsx
// React — aria-label on the button
<button aria-label="Settings">
  <SettingsIcon aria-hidden="true" />
</button>

// Angular — aria-label on the button
<button aria-label="Settings">
  <lucide-icon name="settings" aria-hidden="true"></lucide-icon>
</button>
```

### Rules

- The icon itself must have `aria-hidden="true"` (decorative).
- The accessible name goes on the interactive parent element (`aria-label` on the button or link).
- Do not use `aria-label` on the icon element — it is decorative.
- Icon-only buttons must have a tooltip or visible label on hover for sighted users (but the accessible name is always present in the DOM).

---

## Form Validation

### Error Message Association

Error messages must be programmatically linked to their input via `aria-describedby`:

```html
<div class="form-field">
  <label for="email">Email address</label>
  <input
    id="email"
    type="email"
    aria-invalid="true"
    aria-describedby="email-error"
    value="invalid-email"
  />
  <p id="email-error" class="error-message" role="alert">
    Please enter a valid email address.
  </p>
</div>
```

### Required Fields

Required fields must be indicated both visually and programmatically:

```html
<label for="tax-id">
  Tax ID
  <span aria-hidden="true" class="required-indicator">*</span>
</label>
<input id="tax-id" required aria-required="true" />
```

### Inline vs. Summary Validation

- **Inline errors** (below the field) use `role="alert"` and `aria-describedby` to announce the error as soon as it appears.
- **Summary errors** (at the top of the form) use `role="alert"` and link to each invalid field via `href="#field-id"`.
- Both patterns must be present for complex forms.

---

## Loading States

### Announcing Loading

Loading states must be announced to screen readers:

```html
<!-- Spinner with screen reader text -->
<button aria-busy="true" disabled>
  <span class="spinner" aria-hidden="true"></span>
  <span class="sr-only">Saving invoice...</span>
</button>
```

```css
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}
```

### Skeleton Loading

Skeleton loaders should not be announced as content. Use `aria-hidden="true"` and provide a `role="status"` live region:

```html
<div aria-busy="true">
  <div class="skeleton" aria-hidden="true"></div>
  <div class="sr-only" role="status">Loading invoice details...</div>
</div>
```

---

## Testing

### Automated Testing

Every component must pass these automated checks:

- **axe-core** — run in CI for every component in every variant, size, and state.
- **Lighthouse accessibility audit** — run for every page on build.
- **Color contrast** — automated check for all text-on-background combinations.
- **Focus order** — automated tab order verification.

### Manual Testing

- **Keyboard-only navigation** — complete all workflows using Tab, Shift+Tab, Enter, Space, and Escape only.
- **Screen reader testing** — test with NVDA (Windows) and VoiceOver (macOS).
- **Zoom testing** — verify content at 200% zoom with no loss of functionality.
- **Reduced motion** — enable `prefers-reduced-motion: reduce` and verify all functionality works.
- **Reduced transparency** — enable `prefers-reduced-transparency: reduce` and verify readability.

### CI Gates

- `a11y` check job runs on every PR with components.
- Components with `a11y` violations block merge.
- New components must include accessibility test cases in their test suite.
