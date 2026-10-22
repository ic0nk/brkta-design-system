# Design Principles

> Eleven principles govern every decision in the BRKTA ONE Design System. They apply to visual design, component architecture, interaction patterns, and documentation. If a design choice conflicts with a principle, the principle wins.

---

## Creamy Neutral Foundation

**The visual foundation is warm, approachable, and neutral — not cold, achromatic, or purely gray.**

BRKTA ONE uses a warm creamy neutral palette (`oklch(0.9585 0.0098 87.5)` / `#F4F1EA`) rather than a zero-chroma grayscale or pure-white / pure-black scheme. This choice is deliberate:

- Warm neutrals reduce eye strain during extended business use.
- They create a cohesive "cream across themes" identity — the same cream serves as the light-theme page background and the dark-theme principal text foreground.
- Pure white and pure black are restricted to utility-only roles (print, export, documented exceptions).
- Subtle warm chroma in every neutral token distinguishes BRKTA ONE from cold, technical UIs.
- Cream is a neutral canvas, NOT the corporate primary color. The brand accent is lime.
- Tenant themes remain independent — the creamy neutral foundation is the BRKTA ONE brand identity, not a customization constraint.

> *"A calm, warm canvas lets the data and the brand accent speak."*

---

## Clarity

**Every interface element communicates its purpose immediately. Remove ambiguity before removing pixels.**

Business software fails when users hesitate. Every label, icon, color, and layout choice must make the next action obvious. If a user pauses to interpret what something means, the design has failed.

- Labels are explicit — never rely on icons alone without text.
- Status is unmistakable — success, error, warning, and information are visually distinct.
- Data is formatted for scanning — numbers align, currencies have symbols, dates are unambiguous.
- Whitespace is communicative — related items group together, unrelated items separate.

---

## Consistency

**One semantic token system. One component contract. Two framework implementations — one visual outcome.**

BRKTA ONE runs two frontend frameworks — Angular and React — but users experience one product. Visual inconsistency between the dashboard and the website erodes trust.

- A button in Angular looks identical to a button in React — same tokens, same CSS, same data attributes.
- A `primary` variant means the same thing in every component and every framework.
- Colors, spacing, typography, and shadows come from a single scale — never duplicated.
- Framework wrappers are thin — they map contracts to components, they do not restyle.

---

## Hierarchy

**Visual weight matches importance. Actions, information, and navigation are distinguishable at a glance.**

Business dashboards are dense. A clear hierarchy helps users find what matters without reading everything.

- Primary actions use `--primary` background or prominent positioning.
- Secondary actions use `--secondary` or `outline` — present but not competing.
- Page titles use `h1`, section headings use `h2`, card headings use `h3` — never skip levels.
- Visual noise is controlled — borders are subtle (`--border`), backgrounds are quiet.
- The most important information on a page is the most visually prominent.

---

## Predictable Interaction

**Buttons look like buttons. Links act like links. Similar actions produce similar results.**

Users build mental models of how the system behaves. Unexpected behavior breaks flow and erodes confidence.

- Every clickable element signals its affordance — buttons have shape, links have underline, icons in buttons are decorative.
- The same action (save, delete, cancel, submit) behaves the same way everywhere.
- Variants are semantically named — `destructive` always means irreversible, `primary` always means the main call-to-action.
- Hover, focus, active, and disabled states exist for every interactive element.
- Loading states preserve layout — buttons show a loading indicator without resizing.

---

## Efficient Business Workflows

**Reduce steps, not information. Business users need speed and accuracy.**

BRKTA ONE serves businesses. Every extra click, every unnecessary scroll, every redundant confirmation slows down real work.

- Default values are pre-filled where predictable.
- Keyboard shortcuts and tab order follow logical progression.
- Forms group related fields and minimize mandatory input.
- Bulk actions are available where repetitive operations occur.
- Search is always accessible — users should never hunt for the search bar.
- Confirmation is reserved for destructive or irreversible actions only.

---

## Appropriate Information Density

**Show enough to decide. Reveal details progressively. Respect attention.**

Business data is inherently dense. The design system manages density rather than hiding it.

- Tables show the fields users need for triage; detail views show everything.
- Cards summarize; clicks expand or navigate.
- Financial data uses monospace or tabular-nums for column alignment and scanability.
- White space is proportional to information importance — critical data has room to breathe.
- Users can customize density via compact/comfortable layout modes where applicable.

---

## Progressive Disclosure

**Start simple, reveal complexity on demand. Surface the most common action, hide the rare one.**

Not every user needs every option every time. Progressive disclosure reduces cognitive load for new users without limiting power users.

- Collapsible sections group advanced settings.
- Wizards break complex workflows into focused steps.
- Tooltips and help text explain unfamiliar controls without cluttering the interface.
- Filters default to the most common view; advanced filters expand on demand.
- Pagination shows the first page by default; users navigate when ready.

---

## Accessibility

**Every component meets WCAG 2.2 AA at minimum. Accessible design is not a mode — it's the default.**

Accessibility is not an afterthought or a theme toggle. It is baked into every token, every component contract, and every interaction pattern.

- Color contrast ratios meet 4.5:1 for normal text and 3:1 for large text in both light and dark themes.
- All interactive elements are reachable and operable by keyboard.
- Focus-visible rings are visible on every focusable element.
- Screen reader support is built into component contracts — ARIA labels, landmarks, live regions.
- Reduced motion and reduced transparency preferences are respected.
- Accessible design is tested in CI, not manually verified once.

---

## Responsive Behavior

**The system works on 320px screens and 2560px screens. Layout adapts, meaning persists.**

Business users work from offices, homes, phones, and tablets. The experience must be functional everywhere.

- Mobile-first breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px), 2xl (1536px).
- Typography uses `clamp()` for fluid sizing between breakpoints.
- Touch targets are minimum 44px for interactive elements.
- Navigation collapses appropriately — sidebar becomes drawer on small screens.
- Data tables scroll horizontally or use responsive card layouts on narrow viewports.
- Critical business actions remain available on mobile — read-only is insufficient.

---

## Avoiding Decoration That Harms Usability

**Every visual choice serves communication. If it doesn't clarify, remove it.**

Decorative flourishes that add no functional value are not just neutral — they are harmful. They increase visual noise, slow comprehension, and create maintenance burden.

- Shadows indicate depth — use them only where elevation communicates hierarchy.
- Glass effects serve a purpose — mood boards and background blurs on text containers are forbidden.
- Animations communicate state changes — they are not decorative transitions.
- Every pixel of every component serves a purpose: communicate, guide, or provide feedback.
- When in doubt, remove it. Good design is subtractive.
