# Avatar

> A circular visual representation of a user or entity. Supports images, fallback initials, and online status indicators.

---

## When to use

- Show the current user's profile picture.
- Display other users in the system (assignees, authors, approvers).
- Represent entities such as companies, teams, or bots.
- Show online/away/busy/offline status next to a user.

Avatar uses `--radius-full` (circular) because avatar is an approved semantic exception to the little-curve radius rules.

---

## Implementation

| Layer | Location |
|-------|----------|
| Contract | `@brkta/ui-core/avatar/avatar-contract.ts` |
| CSS | `@brkta/ui-core/avatar/avatar.css` |
| React | `@brkta/ui-react/avatar` (`Avatar`) |
| Angular | `@brkta/ui-angular` (`AvatarComponent`) |

---

## React

```tsx
import { Avatar } from '@brkta/ui-react/avatar';

// Image avatar
<Avatar src="/users/alice.jpg" alt="Alice Chen" />

// Fallback initials (shown when no src or image fails)
<Avatar fallback="AC" />

// With status indicator
<Avatar src="/users/alice.jpg" alt="Alice Chen" status="online" size="lg" />

// Size variants
<Avatar size="sm" fallback="JD" />
<Avatar size="md" fallback="JD" />
<Avatar size="lg" fallback="JD" status="busy" />
```

## Angular

```html
<!-- Image avatar -->
<brkta-avatar src="/users/alice.jpg" alt="Alice Chen"></brkta-avatar>

<!-- Fallback initials -->
<brkta-avatar fallback="AC"></brkta-avatar>

<!-- With status indicator -->
<brkta-avatar src="/users/alice.jpg" alt="Alice Chen" status="online" size="lg"></brkta-avatar>
```

---

## Sizes

| Size | Dimension | Font |
|------|-----------|------|
| `sm` | 24×24px | xs |
| `md` | 32×32px | sm |
| `lg` | 40×40px | base |

## Status Indicators

| Status | Color | Meaning |
|--------|-------|---------|
| `online` | Green | Active and available |
| `away` | Amber | Temporarily away |
| `busy` | Red | Do not disturb |
| `offline` | Gray | Disconnected or inactive |

## Accessibility

- Always provide `alt` text when using an image avatar.
- When using fallback initials, the avatar's parent element should provide the accessible name.
- Status indicators are decorative. Do not rely on color alone to convey status — include text elsewhere.

## Related

- **Badge** — For count indicators on avatars.
