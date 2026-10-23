# Motion

> Purposeful animation that communicates state changes and guides attention. Motion in the BRKTA Design System is restrained — it serves a function, never decoration.

---

## Table of Contents

- [Duration Scale](#duration-scale)
- [Easing Curves](#easing-curves)
- [When to Animate](#when-to-animate)
- [When NOT to Animate](#when-not-to-animate)
- [Reduced Motion Support](#reduced-motion-support)
- [GSAP and ScrollTrigger](#gsap-and-scrolltrigger)
- [Component Animation Patterns](#component-animation-patterns)
- [Writing Animations](#writing-animations)

---

## Duration Scale

Three durations cover all animation needs. These are defined as CSS custom properties in `theme.css`.

| Token               | Duration | Use Case                                                           |
| ------------------- | -------- | ------------------------------------------------------------------ |
| `--duration-fast`   | 150ms    | Hover states, focus rings, button feedback, color transitions      |
| `--duration-normal` | 200ms    | Dropdown open/close, sidebar collapse, modal enter, tooltip show   |
| `--duration-slow`   | 300ms    | Page transitions, large panel slide-in, complex reorder animations |

```css
.button {
  transition: background-color var(--duration-fast) var(--ease-out);
}

.sidebar {
  transition: width var(--duration-normal) var(--ease-out);
}

.modal {
  transition: opacity var(--duration-slow) var(--ease-out);
}
```

### Duration Guidance

- **150ms** for micro-interactions — fast enough that users perceive the response immediately.
- **200ms** for standard UI transitions — noticeable but not distracting.
- **300ms** for large layout changes — gives the eye time to track the change.
- Never use durations below 100ms (too fast to perceive) or above 500ms (feels sluggish for UI).

---

## Easing Curves

Three easing curves provide natural, predictable motion.

| Token           | Curve                               | Visual                   | Use Case                                                  |
| --------------- | ----------------------------------- | ------------------------ | --------------------------------------------------------- |
| `--ease-out`    | `cubic-bezier(0.16, 1, 0.3, 1)`     | Fast start, slow end     | Most UI transitions — elements entering or changing state |
| `--ease-in-out` | `cubic-bezier(0.65, 0, 0.35, 1)`    | Symmetric slow start/end | Element appearing and disappearing, opacity fades         |
| `--ease-spring` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Overshoot bounce         | Playful movement, notifications, subtle emphasis          |

### When to use each

**`ease-out`** — Use for 90% of animations. Elements that appear or change state should start fast and settle slowly. This feels natural because it mimics physical objects coming to rest.

**`ease-in-out`** — Use for elements that both appear and disappear (enter + exit). The symmetric curve makes the entrance and exit feel balanced.

**`ease-spring`** — Use sparingly for moments of delight or emphasis. Not for functional UI transitions. Reserve for toast notifications appearing, completion celebrations, or subtle list-item additions.

```css
/* Standard — most transitions */
.element {
  transition: transform var(--duration-normal) var(--ease-out);
}

/* Enter + exit */
.element {
  transition: opacity var(--duration-normal) var(--ease-in-out);
}

/* Playful emphasis (use sparingly) */
.notification-enter {
  transition: transform var(--duration-slow) var(--ease-spring);
}
```

---

## When to Animate

### State Changes

- Button hover (color shift, 150ms ease-out)
- Button active (press, 150ms ease-out)
- Focus ring appearance (150ms ease-out)
- Disabled state transition (150ms ease-out)
- Toggle switch (200ms ease-out)
- Checkbox check (150ms ease-out)

### Appearance / Disappearance

- Dropdown menu opening (200ms ease-out)
- Tooltip show/hide (150ms ease-out)
- Modal/dialog enter (200ms ease-out, opacity + slight scale)
- Toast notification (300ms ease-spring for entrance, 200ms ease-in-out for exit)
- Sidebar expand/collapse (200ms ease-out)

### Reordering

- List item reorder (300ms ease-out)
- Drag-and-drop feedback (150ms ease-out, subtle scale)
- Table row sorting indicator (200ms ease-out)

### Progress

- Button loading dots (1.4s ease-in-out infinite — sequential three-dot wave)
- Progress bar fill (200ms ease-out per segment)
- Skeleton pulse animation (1500ms ease-in-out infinite)

---

## When NOT to Animate

### Immediate Feedback (Errors)

Error messages and validation feedback must appear immediately — no animation delay. The user needs to know something is wrong right away.

```css
/* ✅ Correct — immediate display */
.error-message {
  display: block;
  /* No transition on appearance */
}

/* ❌ Forbidden — animated error appearance */
.error-message {
  transition: opacity var(--duration-normal) var(--ease-out);
  opacity: 0; /* User waits 200ms to see the error */
}
```

### Critical System Messages

System-wide alerts, permission-denied notices, and critical status changes are not decorative. They should not animate.

### Elements That Should Never Animate

- Validation error messages
- Permission denied overlays
- Critical alerts (system down, security warning)
- Focus-visible ring (already 150ms via CSS default — do not add additional animation)
- Scroll position changes (respect user scroll, do not animate it)

---

## Reduced Motion Support

When the user's system has `prefers-reduced-motion: reduce` enabled, all non-essential animations must be disabled.

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

This rule is applied globally. When reduced motion is active:

- All transitions become instant (0.01ms).
- All animations complete in one frame.
- Scroll behavior becomes instant.
- Loading spinners should be replaced with static indicators or hidden.
- `prefers-reduced-motion: reduce` does NOT disable opacity changes for visibility — hidden/visible toggles still work.

## GSAP and ScrollTrigger

GSAP is approved for orchestrated public-site motion such as first-entry intros, navigation transitions, pinned sections, and footer reveals. It does not replace the shared CSS motion tokens or accessibility requirements.

Every GSAP implementation must:

- keep the default rendered content usable before the timeline starts;
- use `gsap.context()` or an equivalent cleanup boundary;
- kill timelines, ScrollTriggers, listeners, and body scroll locks on unmount;
- avoid animating layout-heavy properties when `transform` or `opacity` is sufficient;
- skip non-essential motion when `prefers-reduced-motion: reduce` matches;
- be validated at mobile, tablet, and desktop widths with no overflow or overlap.

ScrollTrigger pinning is reserved for focused sections. Do not pin the entire document or interfere with normal browser scrolling.

---

## Component Animation Patterns

### Button Hover Motion

**Box buttons** (primary, secondary, outline, destructive, glass) show a small moving dash on hover or focus-visible. No extra border highlight, glow, or outline is added.

The dash is a `::after` pseudo-element — a 12×2px pill-shaped dot (`border-radius: 999px`) that travels around the button perimeter using CSS `offset-path: inset(1px round var(--radius-lg))`.

```css
@keyframes brkta-button-border-dash {
  to {
    offset-distance: 100%;
  }
}
```

The dash uses `offset-path` (pure CSS, supported in Chrome 116+, Firefox 120+, Safari 17.2+). A `@supports (offset-path: inset(0 round 10px))` guard provides graceful fallback — when unsupported, no animation runs.

The dash starts at `opacity: 0` and transitions to `opacity: 1` on hover/focus-visible. Dash animation runs continuously at 1.8s per revolution while hovered.

Applied to all button sizes including icon-only. The dash color uses a custom property `--brkta-button-motion-color`:

- `primary` / `destructive`: `color-mix(in oklch, currentColor 70%, transparent)`
- `secondary` / `outline` / `glass`: `color-mix(in oklch, var(--foreground) 55%, transparent)`

Ghost variant is excluded — it has no visible border and uses background color change for feedback.

**Link button** label underline is **visible by default** (`scaleX(1)` with `transform-origin: right`) and **retracts** on hover/focus (`scaleX(0)`). The underline is attached to `.brkta-button-label::after`, so it only appears under the text label — icon-only links, loading links, and disabled links naturally have no underline.

Disabled and loading states suppress both dash and underline animations.

Respects `prefers-reduced-motion: reduce` — dash hidden (`opacity: 0 !important`), underline snaps without transition.

### Button Group Border Dash

When buttons are grouped inside `[data-brkta-button-group]`, individual button dashes are suppressed and a single group-level dash wraps the entire connected group:

- **Group dash**: `::after` on `[data-brkta-button-group]` with `offset-path: inset(1px round var(--radius-md))` — travels around the group's outer border
- **Trigger**: group `:hover` and `:focus-within` (focus any child button → dash appears)
- **Child dashes**: `[data-brkta-button-group] > [data-brkta-button]::after { display: none }` — individual button `::after` pseudo-elements are disables inside groups
- **Same motion language**: 12×2px pill, 1.8s revolution, `--brkta-button-motion-color` token
- **Icon motion preserved**: Only the `::after` dash is suppressed; `.brkta-icon-motion` icon animations on child buttons remain active
- **Disabled**: `[data-brkta-button-group][data-disabled]` suppresses the group dash
- **Reduced motion**: `prefers-reduced-motion: reduce` disables group dash animation
- **Horizontal and vertical** groups both supported — the `offset-path` adapts to the group's `flex-direction`

```css
@keyframes brkta-button-group-border-dash {
  to {
    offset-distance: 100%;
  }
}
```

### Page Transitions

Page transitions use a simple opacity fade (200ms ease-in-out). No slide, no complex transforms.

```css
.page-enter {
  opacity: 0;
}

.page-enter-active {
  opacity: 1;
  transition: opacity var(--duration-normal) var(--ease-in-out);
}

.page-exit-active {
  opacity: 0;
  transition: opacity var(--duration-normal) var(--ease-in-out);
}
```

### Modal Enter / Exit

Modals enter with a fade + subtle upward scale. Exit reverses.

```css
/* Enter */
.modal-overlay-enter {
  opacity: 0;
}

.modal-overlay-enter-active {
  opacity: 1;
  transition: opacity var(--duration-normal) var(--ease-out);
}

.modal-content-enter {
  opacity: 0;
  transform: scale(0.95) translateY(-10px);
}

.modal-content-enter-active {
  opacity: 1;
  transform: scale(1) translateY(0);
  transition:
    opacity var(--duration-normal) var(--ease-out),
    transform var(--duration-normal) var(--ease-out);
}

/* Exit (faster) */
.modal-overlay-exit-active {
  opacity: 0;
  transition: opacity var(--duration-fast) var(--ease-in-out);
}

.modal-content-exit-active {
  opacity: 0;
  transform: scale(0.95);
  transition:
    opacity var(--duration-fast) var(--ease-in-out),
    transform var(--duration-fast) var(--ease-in-out);
}
```

### Sidebar Collapse

Sidebar collapse uses width animation with `ease-out`. Content inside the sidebar should fade out/in rather than squish.

```css
.sidebar {
  transition: width var(--duration-normal) var(--ease-out);
}

.sidebar.collapsed .sidebar-label {
  opacity: 0;
  transition: opacity var(--duration-fast) var(--ease-out);
}

.sidebar:not(.collapsed) .sidebar-label {
  opacity: 1;
  transition: opacity var(--duration-normal) var(--ease-out);
}
```

### Loading Spinner

Spinners use a continuous linear rotation.

```css
@keyframes brkta-spin {
  to {
    transform: rotate(360deg);
  }
}

.spinner {
  width: 1rem;
  height: 1rem;
  border: 2px solid currentColor;
  border-right-color: transparent;
  border-radius: 50%;
  animation: brkta-spin 0.6s linear infinite;
}
```

When `prefers-reduced-motion: reduce` is active, spinners should be replaced with a static indicator (e.g., a simple dot or the text "Loading...").

---

## Writing Animations

### CSS Transition Pattern

```css
.element {
  /* Default (hidden/closed state) */
  opacity: 0;
  transform: translateY(-4px);
  pointer-events: none;

  /* Transition definition */
  transition:
    opacity var(--duration-normal) var(--ease-out),
    transform var(--duration-normal) var(--ease-out);
}

.element.visible {
  /* Visible/open state */
  opacity: 1;
  transform: translateY(0);
  pointer-events: auto;
}
```

### Keyframe Animation Pattern

```css
@keyframes brkta-fade-in {
  from {
    opacity: 0;
    transform: translateY(-4px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.element {
  animation: brkta-fade-in var(--duration-normal) var(--ease-out);
}
```

### CSS Custom Properties in Animations

Always use the design-token values for duration and easing — never hardcode:

```css
/* ✅ Correct */
transition: opacity var(--duration-normal) var(--ease-out);

/* ❌ Forbidden — hardcoded values */
transition: opacity 200ms cubic-bezier(0.16, 1, 0.3, 1);
```

### Keyframe naming

Prefix all custom keyframe animations with `brkta-` to avoid collisions with third-party libraries:

```css
@keyframes brkta-spin { ... }
@keyframes brkta-fade-in { ... }
@keyframes brkta-slide-up { ... }
@keyframes brkta-pulse { ... }
@keyframes brkta-toast-in { ... }
@keyframes brkta-toast-out { ... }
@keyframes brkta-sheet-in { ... }
@keyframes brkta-sheet-out { ... }
```

---

## Toast Animation Patterns

Toast notifications use slide-in/slide-out keyframe animations with glass styling:

### Toast In

```css
@keyframes brkta-toast-in {
  from {
    opacity: 0;
    transform: translateX(100%);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
```

### Toast Out

```css
@keyframes brkta-toast-out {
  from {
    opacity: 1;
    transform: translateX(0);
  }
  to {
    opacity: 0;
    transform: translateX(100%);
  }
}
```

- Duration: `var(--duration-normal)` for in, `var(--duration-fast)` for out
- Easing: `var(--ease-out)` for in, `var(--ease-in-out)` for out
- Toast viewport uses `position: fixed; bottom: 1rem; right: 1rem; z-index: var(--z-toast)`
- Closing state uses `[data-closing]` attribute to trigger out animation
- Glass styling: `color-mix(in oklch, var(--popover), transparent 5%)` + `backdrop-filter: blur(12px)`
- Stacking: `pointer-events: none` on viewport, `pointer-events: auto` on individual toasts
- Reduced motion: disables animations

## Sheet (Drawer) Animation Patterns

Sheet panels slide in from the specified edge with an overlay backdrop:

### Sheet In (right side example)

```css
@keyframes brkta-sheet-in {
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
}
```

### Sheet Out (right side example)

```css
@keyframes brkta-sheet-out {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(100%);
  }
}
```

- Duration: `var(--duration-normal)` for in, `var(--duration-fast)` for out
- Backdrop overlay fades in/out simultaneously
- Side variants (left/right/top/bottom) use different translate directions
- Reduced motion: disables animations

## Dialog Animation Patterns

Dialog modals use a fade + subtle upward scale for enter, reversed for exit:

### Dialog Enter

```css
@keyframes brkta-dialog-in {
  from {
    opacity: 0;
    transform: scale(0.95) translateY(-10px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}
```

### Dialog Exit

```css
@keyframes brkta-dialog-out {
  from {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
  to {
    opacity: 0;
    transform: scale(0.95);
  }
}
```

- Duration: `var(--duration-normal)` for enter, `var(--duration-fast)` for exit
- Overlay backdrop fades in/out simultaneously
- Reduced motion: disables animations, content appears immediately

The Tabs component uses a measurement-based moving indicator element positioned via CSS custom properties.

### Properties

| Variable                  | Used by                                  |
| ------------------------- | ---------------------------------------- |
| `--tabs-indicator-x`      | Horizontal offset from tablist left edge |
| `--tabs-indicator-width`  | Width of target tab                      |
| `--tabs-indicator-y`      | Vertical offset from tablist top edge    |
| `--tabs-indicator-height` | Height of target tab                     |

### Transitions

```
transition: left var(--duration-fast) var(--ease-out),
            top var(--duration-fast) var(--ease-out),
            width var(--duration-fast) var(--ease-out),
            height var(--duration-fast) var(--ease-out);
```

- Duration: 150ms (`--duration-fast`)
- Easing: `--ease-out`
- Triggered by: `left`, `top`, `width`, `height` updates via JavaScript measurement

### Behavior

| Event                   | Indicator position                |
| ----------------------- | --------------------------------- |
| Render / active change  | Indicator moves to active tab     |
| Hover/focus on trigger  | Indicator slides to hovered tab   |
| Mouse leave / blur      | Indicator returns to active tab   |
| Click / keyboard select | Active changes, indicator settles |

### Reduced motion

```
@media (prefers-reduced-motion: reduce) {
  [data-brkta-tabs-indicator] { transition: none; }
}
```

```

```
