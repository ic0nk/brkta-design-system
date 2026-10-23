# UX Patterns

> Reusable interaction patterns for forms, feedback, data display, and navigation.

---

## Table of Contents

- [Forms](#forms)
- [Validation](#validation)
- [Inline Errors](#inline-errors)
- [Page Errors](#page-errors)
- [Success Feedback](#success-feedback)
- [Drawer and Detail Actions](#drawer-and-detail-actions)
- [Loading States](#loading-states)
- [Mutation Readiness and In-Flight Actions](#mutation-readiness-and-in-flight-actions)
- [Skeletons](#skeletons)
- [Empty States](#empty-states)
- [Confirmations](#confirmations)
- [Destructive Actions](#destructive-actions)
- [Dialogs vs. Pages](#dialogs-vs-pages)
- [Tables](#tables)
- [Filtering](#filtering)
- [Search](#search)
- [Pagination](#pagination)
- [Notifications](#notifications)
- [Unsaved Changes](#unsaved-changes)
- [Permission Denied](#permission-denied)
- [Responsive Workflows](#responsive-workflows)

---

## Forms

### Label Position

- Labels are **above** the field (top-aligned), not beside it.
- Left-aligned labels create a clear vertical scan path.
- Labels are medium weight (500), 0.75rem (12px).

```html
<div class="form-field">
  <label for="invoice-number">Invoice Number</label>
  <input id="invoice-number" type="text" />
</div>
```

### Field Spacing

| Context | Gap |
|---------|-----|
| Between fields | `--space-4` (16px) |
| Inline fields (side-by-side) | `--space-3` (12px) |
| Between form sections | `--space-8` (32px) |

### Input Placeholders

- Provide a localized `placeholder` for inputs when it adds a useful example or format hint.
- Use a short example or format hint that helps the user enter the value; do not repeat the field label.
- Keep examples appropriate to the application context, and define visible strings in the consuming app's message catalog rather than inline in a template.
- Keep placeholder copy concise and localized; do not repeat the visible field label.

### Section Grouping

Use `<fieldset>` with a `<legend>` for related fields within a form:

```html
<fieldset>
  <legend>Billing Address</legend>
  <div class="form-field">
    <label for="street">Street</label>
    <input id="street" type="text" />
  </div>
  <div class="form-row">  <!-- side-by-side -->
    <div class="form-field">
      <label for="city">City</label>
      <input id="city" type="text" />
    </div>
    <div class="form-field">
      <label for="postal">Postal Code</label>
      <input id="postal" type="text" />
    </div>
  </div>
</fieldset>
```

### Submit Placement

- Primary submit button is **bottom-right** (or bottom-left for RTL).
- Cancel is to the left of submit (or right for RTL).
- On mobile, submit is full-width at the bottom of the form.

```html
<div class="form-actions">
  <button type="button" variant="outline">Cancel</button>
  <button type="submit" variant="primary">Save Invoice</button>
</div>
```

```css
.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: var(--space-3);
  margin-top: var(--space-6);
}
```

---

## Validation

### Timing

| Type | When | Behavior |
|------|------|----------|
| Inline validation | On blur (field loses focus) | Validate the field value, show error immediately |
| Real-time validation | While typing | Reserved for format-specific fields (e.g., tax ID, phone number) |
| Full validation | On submit | Validate ALL fields, show all errors simultaneously |

### Implementation

- Inline errors appear **on blur** for most fields — do not validate while the user is still typing.
- Real-time validation is reserved for fields where format feedback is critical (e.g., tax ID format).
- On submit, validate every field and scroll to the first error.

### Validation rules

- Required fields: show `This field is required`.
- Format errors: show the expected format, e.g., `Enter a valid email address`.
- Business rules: show specific guidance, e.g., `Invoice total must be greater than zero`.
- Server validation errors: show the server message verbatim below the relevant field, and display a summary banner.

---

## Inline Errors

- Error text appears **below** the field, not above or beside it.
- Text color: `--destructive`.
- Font size: 0.75rem (12px), normal weight.
- An icon is optional — the red text alone is sufficient for sighted users.
- Error message is associated with the input via `aria-describedby`.

```html
<div class="form-field">
  <label for="email">Email address</label>
  <input
    id="email"
    type="email"
    aria-invalid="true"
    aria-describedby="email-error"
    class="input-error"
  />
  <p id="email-error" class="error-message" role="alert">
    Enter a valid email address.
  </p>
</div>
```

```css
.input-error {
  border-color: var(--destructive);
}

.error-message {
  color: var(--destructive);
  font-size: 0.75rem;
  margin-top: var(--space-1);
}
```

---

## Page Errors

- A banner at the top of the page or section.
- Background color: `--destructive` (or `--warning` for warnings).
- Includes a heading and descriptive message.
- Persists until dismissed or the issue is resolved.
- Does not disappear on its own (do not auto-dismiss page errors).

```html
<div role="alert" class="error-banner">
  <AlertCircle aria-hidden="true" />
  <div>
    <h3>Unable to save invoice</h3>
    <p>The payment server did not respond. Please try again.</p>
  </div>
  <button aria-label="Dismiss" class="dismiss-button">×</button>
</div>
```

---

## Success Feedback

- Success is communicated via a **toast notification** (transient).
- The toast auto-dismisses after 4 seconds.
- The toast is subtle — it does not block the user's workflow.
- Success banners (persistent) are reserved for multi-step operations where confirmation must remain visible.

```html
<div class="toast" role="status" aria-live="polite">
  <CheckCircle aria-hidden="true" />
  <span>Invoice #1234 has been saved.</span>
</div>
```

Transient action results and transient action failures use the governed toast component
and its accessible viewport. Keep field validation, permission denials, empty states,
and guidance needed while correcting a form inline and persistent.

---

## Drawer and Detail Actions

- A `brkta-sheet` body owns scrolling; action buttons are projected into its footer slot.
- The Sheet footer stays pinned at the bottom of the surface while the body scrolls.
- Footer actions align at the inline end using logical properties so the same composition
  works in RTL; do not add physical left/right positioning in feature templates.
- On small screens the Sheet becomes full width and footer actions may stack or stretch
  to preserve a usable touch target.
- Detail-page Cancel/Save actions sit immediately above the primary card, before the
  content they control, so the action context remains visible without scrolling to the
  bottom.

---

## Loading States

| State | Visual | When to Use |
|-------|--------|-------------|
| Indeterminate | Spinner (rotating circle) | Unknown duration — API call, page transition |
| Determinate | Progress bar (filled from left) | Known duration — file upload, export generation |
| Skeleton | Gray placeholder matching layout | Known layout — page load, table load |
| Button loading | Three-dot animation inside the button | Inline action that preserves context |

```html
<!-- Spinner -->
<div class="spinner" aria-label="Loading..." role="status">
  <span class="sr-only">Loading...</span>
</div>

<!-- Progress bar -->
<div role="progressbar" aria-valuenow="65" aria-valuemin="0" aria-valuemax="100">
  <div class="progress-fill" style="width: 65%"></div>
  <span class="sr-only">65% complete</span>
</div>

<!-- Skeleton -->
<div class="skeleton" aria-hidden="true"></div>
```

### When to use each

| Situation | Loading Pattern |
|-----------|----------------|
| API call on page load | Skeleton for the page layout |
| API call on button click | Button loading dots (preserves button position) |
| File upload | Progress bar (determinate if possible) |
| Export generation | Progress bar or spinner with status text |
| Table refresh | Skeleton rows or subtle spinner overlay |

---

## Mutation Readiness and In-Flight Actions

- Mutation buttons (`Save`, `Save changes`, `Update`, and form-submit actions that persist data) are disabled while the working draft equals the last server state. Compare the complete draft, including values edited outside the form such as a map location.
- The comparison is reversible: changing a draft value enables the mutation, and changing it back disables it again.
- A disabled mutation button exposes the translated hint `feedback.noChangesToSave` (or the matching revert hint for a cancel/revert action) through the button's accessible title/description path.
- Navigation, back, close, cancel-that-closes, add/new, search, filter, pagination, export, and refresh controls are not mutation-readiness controls and remain available when their action is valid.
- Every button that starts an asynchronous request binds its `loading` state to that request's in-flight signal. Loading also disables activation through the shared Button contract. This includes row actions and small controls such as export and mark-as-read.
- Local-only selection and close actions do not claim request loading; the component that owns the request (for example, a media picker upload) owns that state.

---

## Mutation Readiness and In-Flight Actions

- Mutation buttons (`Save`, `Save changes`, `Update`, and form-submit actions that persist data) are disabled while the working draft equals the last server state. Compare the complete draft, including values edited outside the form such as a map location.
- The comparison is reversible: changing a draft value enables the mutation, and changing it back disables it again.
- A disabled mutation button exposes the translated hint `feedback.noChangesToSave` (or the matching revert hint for a cancel/revert action) through the button's accessible title/description path.
- Navigation, back, close, cancel-that-closes, add/new, search, filter, pagination, export, and refresh controls are not mutation-readiness controls and remain available when their action is valid.
- Every button that starts an asynchronous request binds its `loading` state to that request's in-flight signal. Loading also disables activation through the shared Button contract. This includes row actions and small controls such as export and mark-as-read.
- Local-only selection and close actions do not claim request loading; the component that owns the request (for example, a media picker upload) owns that state.

---

## Skeletons

- Skeletons must match the **actual proportions** of the content they replace.
- Use a pulse animation (`opacity` fade) — not a shimmer/shine effect.
- Skeletons have `aria-hidden="true"` — they are decorative placeholders.
- A `role="status"` live region announces the loading state to screen readers.

```css
@keyframes brkta-pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
}

.skeleton {
  background: var(--muted);
  border-radius: var(--radius-md);
  animation: brkta-pulse 1.5s ease-in-out infinite;
  min-height: 1rem;
}
```

```html
<div aria-busy="true">
  <!-- Skeleton card matching the actual card layout -->
  <div class="skeleton" style="height: 120px; width: 100%;" aria-hidden="true"></div>
  <div class="skeleton" style="height: 1rem; width: 60%; margin-top: 8px;" aria-hidden="true"></div>
  <div class="skeleton" style="height: 1rem; width: 40%; margin-top: 4px;" aria-hidden="true"></div>
  <span class="sr-only" role="status">Loading invoice details...</span>
</div>
```

---

## Empty States

Every empty state must include:

1. **Illustration** — a relevant icon or illustration (optional but encouraged).
2. **Message** — a clear, concise explanation of what would appear here.
3. **Action** — a call-to-action button or link (when applicable — if the user can create the thing).

```html
<div class="empty-state">
  <InboxIcon aria-hidden="true" class="empty-state-icon" />
  <h3>No invoices yet</h3>
  <p>When you create an invoice, it will appear here.</p>
  <button variant="primary">Create First Invoice</button>
</div>
```

```css
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-4);
  padding: var(--space-12);
  text-align: center;
  color: var(--muted-foreground);
}
```

### Empty state by context

| Context | Message | Action |
|---------|---------|--------|
| Empty table | "No [items] yet" | "Create First [Item]" |
| Search returns no results | "No [items] matching [query]" | "Clear filters" |
| Filter returns no results | "No [items] match the selected filters" | "Clear all filters" |
| Dashboard widget | "Data will appear once [condition]" | "Set up [feature]" |

---

## Confirmations

### Destructive Action Confirmation

Destructive actions (delete, void, cancel irreversible) require a confirmation dialog:

```html
<dialog role="alertdialog" aria-labelledby="confirm-delete-title" aria-describedby="confirm-delete-desc">
  <h2 id="confirm-delete-title">Delete Invoice #1234?</h2>
  <p id="confirm-delete-desc">This action cannot be undone. The invoice will be permanently deleted.</p>
  <div class="dialog-actions">
    <button variant="outline">Cancel</button>
    <button variant="destructive">Delete Invoice</button>
  </div>
</dialog>
```

### Non-destructive Feedback

Non-destructive actions use toast notifications — no dialog needed:

- "Invoice saved" → toast, auto-dismiss.
- "Email sent" → toast, auto-dismiss.
- "Settings updated" → toast, auto-dismiss.

---

## Destructive Actions

- Use the `destructive` variant for the confirm button (red).
- Add the specific item name to the confirmation text ("Delete Invoice #1234?" not "Delete this item?").
- For **irreversible** actions (permanent delete, void financial transaction), require a double-confirm: type the item name or check a confirmation checkbox.
- For **reversible** actions (archive, deactivate), a single confirmation dialog is sufficient.

```html
<!-- Double confirm for irreversible actions -->
<dialog role="alertdialog">
  <h2>Permanently delete Invoice #1234?</h2>
  <p>Type "DELETE" to confirm.</p>
  <input type="text" placeholder="Type DELETE to confirm" />
  <button variant="destructive" disabled>Delete Permanently</button>
</dialog>
```

---

## Dialogs vs. Pages

| Use a Dialog When | Use a Page When |
|-------------------|-----------------|
| The task is focused and quick (create, edit, confirm) | The workflow has multiple steps or sections |
| The user needs to stay in context | The user needs to navigate away from the current context |
| The task has one primary action (save, confirm) | The task has multiple actions and side effects |
| The content is small (one field to a short form) | The content is large or contains a data table |
| The task is auxiliary to the main page | The task is the main purpose of the user's visit |

### Dialog rules

- Dialogs are modal — they trap focus and block interaction with the page behind.
- Dialogs have a close button and support Escape to close.
- Dialogs have a clear title, body, and action buttons.
- Never nest dialogs — a dialog should not open another dialog.

---

## Tables

### Sticky Header

The table header row is sticky — it remains visible while scrolling through data rows.

```css
.data-table th {
  position: sticky;
  top: 0;
  z-index: 1;
  background: var(--surface);
}
```

### Column Sorting

- Click a column header to sort by that column.
- First click: ascending. Second click: descending. Third click: remove sort.
- Active sort column shows a sort indicator icon (arrow up/down).
- Sort icon uses `--muted-foreground` when inactive, `--foreground` when active.

### Row Hover

- Table rows have a subtle hover state (`background: var(--muted)`) to indicate interactivity.
- Clickable rows have a pointer cursor.
- Selected rows have a distinct background (`background: color-mix(in oklch, var(--accent) 8%, transparent)`).

### Row Selection

- Use a checkbox column for multi-select.
- Show the count of selected rows: "3 of 24 selected".
- Provide bulk actions when rows are selected.

### Pagination or Infinite Scroll

| Pattern | When to Use |
|---------|-------------|
| Pagination | Data sets where the user needs to find specific items, or where data accuracy per page matters |
| Infinite scroll | Activity streams, logs, or chronological feeds where the user scans forward |

---

## Filtering

- Filters appear **above** the table or data list.
- Common filters are visible; advanced filters are collapsible.
- Show active filter count: "Filters (3)".
- Provide a "Clear all" button when filters are active.
- Filters persist while the user navigates within the same feature.

```html
<div class="filters">
  <div class="filter-row">
    <select aria-label="Status">
      <option value="">All statuses</option>
      <option value="paid">Paid</option>
      <option value="pending">Pending</option>
      <option value="overdue">Overdue</option>
    </select>
    <input type="text" placeholder="Search by customer..." aria-label="Search customer" />
    <button variant="ghost" class="filter-toggle">Advanced Filters</button>
  </div>
  <div class="active-filters">
    <span class="filter-chip">Status: Paid <button aria-label="Remove filter">×</button></span>
    <button variant="ghost" size="sm">Clear all</button>
  </div>
</div>
```

---

## Search

- Search input is **debounced** — triggers 300ms after the user stops typing.
- Minimum **2 characters** before triggering a search.
- Show results as the user types (live results dropdown) or navigate to a search results page.
- Clear button appears when input has content.
- Search results show total count: "24 results for 'Invoice #123'".

```typescript
// Debounce implementation (React example)
const [searchTerm, setSearchTerm] = useState('');
const debouncedSearch = useDebounce(searchTerm, 300);

useEffect(() => {
  if (debouncedSearch.length >= 2) {
    performSearch(debouncedSearch);
  }
}, [debouncedSearch]);
```

---

## Pagination

- Controls: page numbers + Previous / Next buttons.
- Show total count: "Page 3 of 12 (240 results)".
- Configurable per-page: 10, 25, 50, 100 rows.
- Previous button is disabled on page 1; Next is disabled on the last page.
- Ellipsis for large page ranges: "1 ... 5 6 7 ... 12".

```html
<nav aria-label="Pagination">
  <span class="pagination-info">Page 3 of 12 (240 results)</span>
  <div class="pagination-controls">
    <button disabled>Previous</button>
    <button aria-current="page">1</button>
    <button>2</button>
    <button>3</button>
    <span>...</span>
    <button>12</button>
    <button>Next</button>
  </div>
  <select aria-label="Results per page">
    <option>10</option>
    <option selected>25</option>
    <option>50</option>
    <option>100</option>
  </select>
</nav>
```

---

## Notifications

### Toast Notifications (Transient)

| Severity | Icon | Background | Behavior |
|----------|------|------------|----------|
| Success | CheckCircle | `--success` | Auto-dismiss after 4s |
| Error | XCircle | `--destructive` | Persist until dismissed |
| Warning | AlertTriangle | `--warning` | Auto-dismiss after 6s |
| Information | Info | `--information` | Auto-dismiss after 4s |

- Position toast notifications consistently within the application and away from critical controls.
- Maximum 3 visible toasts at once — older toasts are replaced.
- Toasts do not block interaction.

### Notification Center (Persistent)

- For notifications that require action or review.
- Accessible via a bell icon in the header.
- Shows unread count badge.
- Notifications can be marked as read, archived, or actioned.
- Supports in-app + email delivery.

---

## Unsaved Changes

### Warn on Navigation

When a form has unsaved changes and the user attempts to navigate away:

1. Show a confirmation dialog: "You have unsaved changes. Do you want to leave?"
2. Options: "Stay" (keep the form) or "Discard" (lose changes).
3. Do NOT offer "Save" in the dialog — saving is the user's responsibility via the form's submit button.

### Auto-Save (Where Safe)

For long forms or data entry workflows where losing work is costly:

- Auto-save to draft after 30 seconds of inactivity.
- Show "Draft saved" indicator.
- Auto-saved drafts are explicitly labeled as drafts — never confuse with submitted data.

---

## Permission Denied

When a user attempts to access a feature or resource they do not have permission for:

1. Show an **access-denied** component with a clear explanation.
2. Include the specific permission or role required.
3. Provide a "Request access" action if applicable.
4. Do NOT show a generic "Not Found" — misrepresenting permission errors as 404s erodes trust.

```html
<div class="access-denied">
  <LockIcon aria-hidden="true" />
  <h2>Access Denied</h2>
  <p>You need the "Approve Invoices" permission to access this page.</p>
  <p class="contact">Contact your administrator to request access.</p>
  <button variant="primary">Go to Dashboard</button>
</div>
```

---

## Responsive Workflows

- **Critical actions** (approve, reject, pay, create) are available on mobile — through the action bar, FAB, or contextual actions.
- **Complex workflows** (multi-step forms, bulk operations, data heavy edits) are reserved for desktop — on mobile, show a "Use desktop for this action" message for workflows that genuinely cannot be simplified.
- Do not hide functionality on mobile unless a genuine usability constraint exists (e.g., editing a complex data table with 20 columns).
- All read operations (view, search, filter) must work on all screen sizes.
