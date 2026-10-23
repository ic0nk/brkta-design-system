# Border Radius — Little Curve

> BRKTA uses a "little curve" visual language — modest, precise radii that
> communicate clarity and restraint. Components feel calm and efficient rather
> than overly decorative.

---

## Design Philosophy

Buttons, inputs, cards, panels, menus, badges, and reusable components use
**modest radii** (6–10 px). The curve is just enough to soften the edges, not
enough to feel bubbly or pill-shaped.

Pill/circle radii (`border-radius: 9999px` / `50%`) are **restricted** to
semantically circular elements only.

---

## Radius Token Scale

| Token | Value | Intended Use |
|-------|-------|--------------|
| `--radius-sm` | 6 px | Small badges, tags, compact indicators |
| `--radius-md` | 8 px | Compact internal elements, secondary indicators |
| `--radius-lg` | 10 px | Default buttons, form controls, cards, panels, dialogs |
| `--radius-xl` | 14 px | Larger containers, modals, bottom sheets |
| `--radius-2xl` | 18 px | Special surfaces, marketing page containers |
| `--radius-full` | 9999 px | **Restricted** — see exceptions below |

All radius tokens are defined in `@brkta/design-tokens/theme.css` and derive
from `--radius: 0.625rem` (10 px).

---

## Rules

### Required

- Every reusable UI component must use `--radius-*` tokens for its corner
  rounding — no hardcoded values.
- Normal buttons and controls must **not** use `--radius-full` (9999 px).
- Interactive controls (buttons, inputs, selects) use `--radius-lg`
  (10 px) by default for a clearly visible, modest professional curve.
- Cards should use `--radius-lg` (10 px) or less.

### Exceptions — Pill / Circle Radius

`border-radius: 9999px` or `border-radius: 50%` is permitted only for:

| Element | Reason |
|---------|--------|
| Avatars | Circular representation of a person or entity |
| Status dots | Small online/offline/activity indicators |
| Circular icon wrappers | Icon buttons in icon-only toolbars or app launchers |
| Progress indicators | Circular spinners (global), ring progress, step indicators |
| Badge / Chip (approved only) | Badges that are explicitly documented as pill-shaped in their component spec |

Every exception must be documented in the component's specification or in an
approved design decision.

### Marketing Pages

Marketing page decorative containers (teaser cards, feature panels, hero
graphics) may use `--radius-xl` (14 px) or `--radius-2xl` (18 px) for visual
containers. Interactive controls within marketing pages must still follow the
standard component radius rules.

---

## Comparison

| Style | Radius | Character |
|-------|--------|-----------|
| None / Square | 0 px | Harsh, unfinished |
| Little curve (BRKTA) | 6–10 px | Professional, precise, calm |
| Rounded | 12–16 px | Friendly, approachable |
| Pill / Bubble | 9999 px | Playful, bubbly — use only for approved exceptions |

---

## Usage Examples

### Correct — Button using token

```css
[data-brkta-button] {
  border-radius: var(--radius-lg); /* 10 px — visible little curve */
}
```

### Correct — Card using token

```css
.my-card {
  border-radius: var(--radius-lg); /* 10 px — card radius */
}
```

### Correct — Marketing container

```css
.feature-panel {
  border-radius: var(--radius-xl); /* 14 px — larger decorative surface */
}
```

### Incorrect — Normal button as pill

```css
/* DO NOT — use --radius-md or --radius-lg instead */
.nav-button {
  border-radius: 9999px;
}
```

### Correct — Status dot (semantic exception)

```css
.status-dot {
  border-radius: 50%; /* 50% for circular indicator */
}
```

### Correct — Avatar (semantic exception)

```css
.avatar {
  border-radius: 9999px; /* or 50% for a circular avatar */
}
```

---

## Visual Review Checklist

When reviewing a component or page for radius correctness:

- [ ] Reusable components use `--radius-*` tokens, not hardcoded values.
- [ ] Normal buttons and controls do not use `--radius-full` (9999 px).
- [ ] Cards use `--radius-lg` (10 px) or less.
- [ ] Pill/circle radii are used only for semantically justified exceptions
      (avatars, status dots, circular icons, progress indicators).
- [ ] Marketing containers use larger radii only as decorative surfaces, not
      for interactive controls.
- [ ] Both light and dark themes render radii consistently (the tokens are
      theme-independent).

---

## Related Documents

- [Color System](COLORS.md)
- [Elevation and Shadows](ELEVATION.md)
- [Glass Effects](GLASS.md)
- [Component Governance](COMPONENT-GOVERNANCE.md)
- [Responsive Design](RESPONSIVE-DESIGN.md)
