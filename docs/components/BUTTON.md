# Button

The shared content wrapper uses inline flex alignment and `--space-2` spacing so
icons and labels stay on one horizontal row in both framework wrappers.

> A clickable element that triggers an action. The Button is a foundational interactive component used in dialogs, toolbars, and forms.

The Button is a foundational shared component in the BRKTA Design System. Its architecture establishes the pattern that all other components follow: a shared contract and CSS recipe in `@brkta/ui-core` with thin framework wrappers in `@brkta/ui-react` and `@brkta/ui-angular`.

---

## Implementation

| Layer | File | Responsibility |
|-------|------|----------------|
| Core | `@brkta/ui-core/button/button.css` | Shared visual recipe — variants, sizes, states, data-attribute selectors |
| Core | `@brkta/ui-core/button/button-contract.ts` | Shared type contract — `ButtonContract` interface, variant/size literal types |
| React | `packages/ui-react/src/button/button.tsx` | React wrapper — `forwardRef`, data attributes, icon slots |
| Angular | `packages/ui-angular/src/button/button.component.ts` | Angular standalone component — data attributes, `@Input()` bindings |

---

## Usage

### React

```tsx
import { Button } from '@brkta/ui-react/button';

<Button variant="primary" size="md">Save</Button>
<Button loading={true}>Processing</Button>
<Button iconBefore={<SaveIcon />}>Save</Button>
<Button variant="destructive" onClick={handleDelete}>Delete</Button>
```

### Angular

```html
<brkta-button variant="primary" size="md">Save</brkta-button>
<brkta-button [loading]="true">Processing</brkta-button>
<brkta-button variant="destructive" (click)="handleDelete()">Delete</brkta-button>
<brkta-button appearance="glass">Over media</brkta-button>
```

---

## Variants

| Variant | Emphasis | Use Case |
|---------|----------|----------|
| `primary` | High | Main call-to-action. One per view or section. Use for primary actions like Save, Submit, Confirm, Create. |
| `secondary` | Medium | Complementary action that appears alongside a primary button. Use for secondary but important actions like Cancel in a multi-step flow, or Apply Filters. |
| `outline` | Medium | Bordered but not filled. Use for tertiary actions like Reset, Preview, or Duplicate. |
| `ghost` | Low | No background or border until hover. Use for toolbar actions, row actions in tables, dismiss buttons. |
| `link` | Lowest (text) | Text-only, underlined by default. Use for inline actions, navigation links, "Forgot password?" affordances. |
| `destructive` | High (red) | Irreversible actions — delete, remove, revoke, terminate. Requires confirmation dialog for dangerous operations. |

## Appearance

| Appearance | Use Case |
|------------|----------|
| `default` | The normal variant surface. |
| `glass` | A governed frosted surface for labelled controls floating over map, image, or video media. It composes with the Button's semantic variant, applies to the inner `[data-brkta-button]` element, and falls back to an opaque surface when `prefers-reduced-transparency: reduce` is active. |

### Rules

- **One primary per view.** A section or dialog must not have two `primary` buttons. The primary action is the single recommended choice. If you need two prominent actions, one is `primary` and the other is `secondary`.
- **Destructive is for irreversible actions only.** A destructive button must never appear without a confirmation dialog for operations that cannot be undone. See [Destructive Confirmation Rules](#destructive-confirmation-rules).
- **Link variant is not destructive.** Never use `link` variant for a destructive action — use `destructive` variant instead, even if you want a text-only appearance. The `destructive` variant communicates severity through color and is recognized by assistive technology.
- **Group visually related buttons.** When buttons appear together (e.g., in a dialog footer or toolbar), the visual relationship should be clear through consistent spacing.

---

## Sizes

| Size | Height | Width | Use Case |
|------|--------|-------|----------|
| `sm` | 32px | auto | Compact spaces — tables, toolbars, inline forms |
| `md` | 44px | auto | **Default.** Standard interactive size. Meets WCAG minimum touch target. |
| `lg` | 56px | auto | Hero sections, marketing pages, primary page CTAs, feature callouts |
| `icon-sm` | 32px | 32px | Compact icon buttons — small toolbars, table row actions |
| `icon-md` | 44px | 44px | Standard icon buttons — header toolbars, sidebar actions |
| `icon-lg` | 56px | 56px | Large icon buttons — prominent standalone icon actions |

### Size rules

- **`md` is the accessible default.** The legacy BRKTA V1 used a 36px default button height. V2 uses 44px (`md`) as the default for all buttons. This meets the WCAG 2.2 minimum touch target of 44px for inline interactive elements. Do not override this default without an accessibility review.
- **Use `sm` only in constrained spaces.** Tables, tight toolbars, and compact forms are valid uses. Do not use `sm` as the default size for primary page actions.
- **Icon sizes are square.** `icon-sm`, `icon-md`, and `icon-lg` produce equal width and height. These sizes have no visible label and **require an `aria-label`** on the element.

---

## States

All interactive states apply to every variant unless otherwise noted.

The hover fill reveals a surface sized to the actual button using a circular clip path. Its percentage radius covers the entire button from any pointer entry point, including wide, tall, and resized buttons. React and Angular share this recipe; server-rendered links default to a centered origin. Pointer coordinates are clamped after resizing and remain physical coordinates in RTL layouts. Keyboard focus uses the same full coverage, and reduced motion removes the transition. Disabled, loading, and text-link variants do not reveal the fill.

| State | Visual |
|-------|--------|
| **Default** | As defined by variant — filled, bordered, or text-only |
| **Hover** | Background darkens slightly. Cursor changes to `pointer`. |
| **Active** | Background darkens further (pressed state). |
| **Focus-visible** | A visible focus ring (`outline` or `box-shadow`) appears around the button. Only visible when focused via keyboard (Tab), not via mouse click. |
| **Disabled** | Opacity set to 50%. Cursor is `not-allowed`. Not clickable. Not focusable. Skipped in tab order (`tabindex="-1"` or not rendered). |
| **Loading** | A three-dot indicator replaces the content. The button text and icon remain in the DOM but are hidden (preserves layout width). The button is non-interactive while loading. |

### Disabled button rules

- **Do not disable a button without explaining why.** A disabled button with no context confuses users. If a button is disabled, provide a tooltip, help text, or inline message explaining what condition must be met to enable it.
- **Disabled buttons are skipped in tab order.** They must not receive keyboard focus.
- **Use `aria-disabled="true"`** when you need the button to remain focusable for screen reader feedback (rare — only when the disabled state must be announced). In most cases, use the native `disabled` attribute.

### Loading state rules

- The loading indicator is a CSS-only animation — no external dependency required.
- Content is hidden with `visibility: hidden` (not `display: none`) so the button maintains its dimensions.
- The button is non-interactive while loading — same behavior as disabled.
- Loading state is shown for all asynchronous operations that take longer than 300ms.

### Mutation readiness and request loading

- Persisting mutation buttons remain disabled while their working draft matches the last server state; the comparison includes values edited outside the form. The disabled state carries a translated explanation such as `feedback.noChangesToSave`.
- Any button that starts an asynchronous request must bind `loading` to that request's in-flight state. The shared component disables activation while loading and preserves the button's layout.
- Navigation, close, cancel-that-closes, add/new, search, filter, pagination, export, and refresh controls are not draft-save controls.

---

## Icon Behavior

Icons can appear in three configurations:

| Configuration | Description | Requirements |
|--------------|-------------|--------------|
| `iconBefore` | Icon appears before the label text | Label required |
| `iconAfter` | Icon appears after the label text | Label required |
| Icon-only | No label, only an icon | **`aria-label` required** on the button element |

### Rules

- **Icon-only buttons must have `aria-label`.** Without a visible label, screen readers have no way to convey the button's purpose. Every icon-only button must include an `aria-label` attribute that describes the action (e.g., `aria-label="Delete invoice"`).
- **Icons in buttons with labels are decorative.** When a visible label is present, the icon is decorative and should be hidden from screen readers (`aria-hidden="true"`).
- **Do not use icon-only for critical or primary actions.** A primary action should always have a visible label. Icon-only is acceptable for toolbar items, table row actions, and dismiss buttons.
- **Icon motion triggers from the button surface.** Hovering or focusing the button (not only the SVG) activates animated icon motion. The CSS rule `[data-brkta-button]:hover .brkta-icon-motion-*` in `icon-motion.css` powers this, matching `pointer-events: none` on SVGs inside buttons.
- **Box variants use a small moving dash on hover/focus.** A `::after` pseudo-element is a 12×2px pill-shaped dash that travels around the button border using CSS `offset-path`. No extra border highlight, glow, or outline is added on hover. Applied to primary, secondary, outline, and destructive variants. The glass appearance preserves the Button's focus ring and uses token-based border/shadow state changes over media. Not applied to ghost, link, disabled, or loading buttons. Falls back gracefully to no animation when `offset-path` is unsupported.
- **Link label shows underline by default and retracts it on hover/focus.** The underline is attached to `.brkta-button-label::after` — visible at rest (`scaleX(1)`, `transform-origin: right`) and retracts on hover/focus (`scaleX(0)`). Icon-only links (no label) naturally have no underline. Loading and disabled links also hide the underline.

---

## Destructive Confirmation Rules

Destructive buttons (variant `destructive`) require special handling:

### Confirmation dialog required

A destructive action that cannot be undone (delete, revoke, terminate) **must** be paired with a confirmation dialog (`alert-dialog`). The dialog must:

1. State clearly what action is about to happen.
2. State what the consequences are (e.g., "This will permanently delete the invoice and cannot be undone.").
3. Provide a `destructive` button in the dialog to confirm.
4. Provide a `secondary` or `outline` cancel button.

### Button ordering in destructive dialogs

```
[ Destroy ]              [ Cancel ]
  (destructive)           (secondary)
  left side               right side
```

The destructive action appears on the **left** in a dialog. The cancel (safe) action appears on the **right**.

### Single-click destructive

Single-click destructive (no confirmation dialog) is allowed **only** for non-critical actions where the user can easily undo or recover. Examples:

- Removing a filter tag
- Dismissing a notification
- Clearing a search field

### Double confirmation

Irreversible actions with significant impact (deleting a customer, voiding a posted invoice, terminating a subscription) require **double confirmation**:

1. First confirmation dialog: "Are you sure?"
2. Second input: the user must type a word or phrase (e.g., "DELETE") to confirm.

This prevents accidental destructive actions in high-impact operations.

---

## Button Ordering in Dialogs

The placement of buttons in a dialog footer follows these rules:

| Context | Order (left to right) |
|---------|----------------------|
| Standard dialog (save/cancel) | `[ Cancel ] [ Save ]` — primary on the right |
| Destructive dialog | `[ Destroy ] [ Cancel ]` — destructive on the left, cancel on the right |
| Multi-step dialog (back/next) | `[ Back ] [ Next ]` — forward action on the right |
| Three-button dialog | `[ Tertiary ] [ Cancel ] [ Primary ]` — primary on the far right |

The primary action belongs **on the right** in standard workflows. This matches platform conventions (Windows, macOS, web) and reduces the chance of accidental confirmation.

---

## Keyboard Interaction

| Key | Action |
|-----|--------|
| `Tab` | Moves focus to the next button in tab order |
| `Shift + Tab` | Moves focus to the previous button |
| `Enter` | Activates the focused button |
| `Space` | Activates the focused button |

### Focus management

- Focus moves in DOM order (not visual order). Ensure the DOM order matches the visual layout.
- When a button is clicked and triggers a dialog, focus moves to the first focusable element in the dialog (usually the cancel button for safety).
- When a dialog closes, focus returns to the button that opened it (or the next logical element if that button is no longer available).

---

## Accessibility

| Requirement | Implementation |
|-------------|----------------|
| Touch target | Minimum 44px for `md` and `icon-md` sizes (WCAG 2.2) |
| Focus indicator | Visible 2px ring at 3:1 contrast against the button background |
| Color contrast | Text on button background meets 4.5:1 (normal) or 3:1 (large text) |
| Screen reader | Icon-only buttons require `aria-label`; decorative icons use `aria-hidden="true"` |
| Disabled state | `disabled` attribute or `aria-disabled="true"` |
| Reduced motion | Loading indicator respects `prefers-reduced-motion` |

---

## All Variants and Sizes

### Primary

```html
<!-- sm --> <button data-brkta-button data-variant="primary" data-size="sm">Save</button>
<!-- md --> <button data-brkta-button data-variant="primary" data-size="md">Save</button>
<!-- lg --> <button data-brkta-button data-variant="primary" data-size="lg">Save</button>
```

### Secondary

```html
<!-- sm --> <button data-brkta-button data-variant="secondary" data-size="sm">Cancel</button>
<!-- md --> <button data-brkta-button data-variant="secondary" data-size="md">Cancel</button>
<!-- lg --> <button data-brkta-button data-variant="secondary" data-size="lg">Cancel</button>
```

### Outline

```html
<!-- sm --> <button data-brkta-button data-variant="outline" data-size="sm">Preview</button>
<!-- md --> <button data-brkta-button data-variant="outline" data-size="md">Preview</button>
<!-- lg --> <button data-brkta-button data-variant="outline" data-size="lg">Preview</button>
```

### Ghost

```html
<!-- sm --> <button data-brkta-button data-variant="ghost" data-size="sm">Dismiss</button>
<!-- md --> <button data-brkta-button data-variant="ghost" data-size="md">Dismiss</button>
<!-- lg --> <button data-brkta-button data-variant="ghost" data-size="lg">Dismiss</button>
```

### Link

```html
<!-- sm --> <button data-brkta-button data-variant="link" data-size="sm">Forgot password?</button>
<!-- md --> <button data-brkta-button data-variant="link" data-size="md">Forgot password?</button>
<!-- lg --> <button data-brkta-button data-variant="link" data-size="lg">Forgot password?</button>
```

### Destructive

```html
<!-- sm --> <button data-brkta-button data-variant="destructive" data-size="sm">Delete</button>
<!-- md --> <button data-brkta-button data-variant="destructive" data-size="md">Delete</button>
<!-- lg --> <button data-brkta-button data-variant="destructive" data-size="lg">Delete</button>
```

### Glass appearance

```html
<!-- Angular --> <brkta-button appearance="glass">Over media</brkta-button>
<!-- React --> <Button appearance="glass">Over media</Button>
```

Glass uses the existing `glass-elevated` values from `@brkta/design-tokens/glass.css` on the inner `[data-brkta-button]` element. Use it for labelled controls over media, not for form inputs or small edge-sensitive targets. It falls back to solid `--surface` with no blur when `prefers-reduced-transparency: reduce` is active.

### Icon-only sizes

```html
<!-- icon-sm (32x32) --> <button data-brkta-button data-size="icon-sm" aria-label="Search"><SearchIcon/></button>
<!-- icon-md (44x44) --> <button data-brkta-button data-size="icon-md" aria-label="Search"><SearchIcon/></button>
<!-- icon-lg (56x56) --> <button data-brkta-button data-size="icon-lg" aria-label="Search"><SearchIcon/></button>
```

---

## Anti-Patterns

| Anti-Pattern | Why It's Wrong | Correct Approach |
|--------------|----------------|------------------|
| Two primary buttons in one section | Users cannot distinguish the single recommended action. One action must be more important. | Use one `primary` and one `secondary` button. |
| Link variant for destructive action | The `link` variant does not communicate severity. Red conveys urgency; link does not. | Use `destructive` variant, even for inline or text-only destructive actions. |
| Disabled button without explanation | Users do not know why the button is disabled or what to do to enable it. | Provide a tooltip, helper text, or inline condition message. |
| Icon-only button without `aria-label` | Screen readers cannot convey the button's purpose. The action is invisible to assistive technology. | Always add `aria-label` describing the action. |
| Loading state without preserving width | Text disappearing and reappearing causes layout shift and a jarring experience. | Use `visibility: hidden` on content, keep the loading indicator in flow. |
| Primary destructive button in standard position | A user may click "Save" reflexively and accidentally destroy data. | Place destructive buttons on the **left** in dialogs. Cancel/primary goes on the right. |

---

## Related Components
- Alert Dialog — ✅ Implemented. Used for destructive confirmation dialogs. Every destructive button on an irreversible action must pair with an alert dialog. See [ALERT-DIALOG.md](ALERT-DIALOG.md).

- Tooltip — ✅ Implemented. Provides explanation for disabled buttons or icon-only buttons. See [TOOLTIP.md](TOOLTIP.md).

- Spinner — ✅ Implemented. Used for standalone circular loading indicators (global progress). See [SPINNER.md](SPINNER.md).
---

## Figma Reference



Pass a translated `loadingLabel` in both frameworks for the screen-reader request announcement. Existing English defaults are preserved.
