# Open design-system issues

## DS-001 — Dark-mode checkbox border contrast

- Reported by the owner during the M19 real-dashboard visual check, 2026-10-21.
- `packages/ui-core/checkbox/checkbox.css` uses `--input` for the border. The reported dark-mode border contrast is approximately 1.3:1; the required non-text contrast is 3:1.
- Scope: shared Checkbox recipe and semantic-token contrast in both frameworks.
- Acceptance: measure the rendered border against adjacent surfaces in dark mode, meet 3:1, and check matching Angular/React states without reducing other contrast requirements.
- Status: open; recorded separately, explicitly not fixed in M19. The reported ratio has not been independently remeasured in this change.

## DS-002 — App-rail Settings button clipped at 320 px

- Reported by the owner during the M19 real-dashboard visual check, 2026-10-21.
- Scope: dashboard app-rail/shell responsive layout; the Settings control is clipped at the 320 px viewport.
- Acceptance: the control remains fully visible and operable at 320 px, with the governed touch target and visible keyboard focus; recheck the supported breakpoints, RTL and reduced motion.
- Status: open; recorded separately, explicitly not fixed in M19. No shell geometry or rail styling is changed by the M19 fixes.
