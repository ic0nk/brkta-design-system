# BRKTA ONE Design System - Visual Regression Testing

> **STATUS: MANUAL TESTING ONLY** — Visual regression testing is currently a manual process. No automated screenshot comparison is configured. Playwright is not yet integrated.

## Current Status

**Automated visual regression testing is NOT available.** The visual regression testing infrastructure exists only as a manual testing guide and stub script.

### What is NOT automated:
- ❌ No Playwright screenshot comparison
- ❌ No baseline images stored in repository
- ❌ No automated visual diff detection
- ❌ No CI integration for visual regression
- ❌ No automated visual regression checks — `pnpm visual:checklist` only prints the manual checklist

### What IS available:
- ✅ Manual testing checklist (this document)
- ✅ `pnpm visual:checklist` — prints the manual testing instructions
- ✅ Design system pages for visual inspection

## Manual Testing Process

All visual regression testing must be performed manually:

1. **Start development servers:**
   ```bash
   pnpm dev:website
   pnpm dev:dashboard
   ```

2. **Navigate to design system pages:**
   - Website: http://localhost:3000/design-system
   - Dashboard: http://localhost:4200/design-system

3. **Perform visual inspection:**
   - Check all component sections render correctly
   - Verify tokens display with correct values
   - Test responsive behavior at mobile/tablet/desktop breakpoints
   - Toggle dark mode and verify all components adapt
   - Verify accessibility (keyboard navigation, focus indicators, screen reader labels)
   - Compare with previous state or known baseline

4. **Document findings:**
   - Note any visual regressions
   - Report issues in pull request comments
   - Request design review if uncertain

## Future Automated Implementation (Planned — NOT YET IMPLEMENTED)

> **Planned.** None of the commands below exist today. They are illustrative examples for when automated visual regression testing is approved and Playwright is added.

When automated visual regression testing is approved and Playwright is added:

1. **Add Playwright dependency:**
   ```bash
   pnpm add -D @playwright/test
   npx playwright install
   ```

2. **Create baseline screenshots:**
   ```bash
   pnpm visual:test --update-snapshots
   ```

3. **Run automated visual regression tests:**
   ```bash
   pnpm visual:test
   ```

4. **Integrate with CI pipeline**

**Note:** This future implementation requires explicit approval and should not be added without coordination with the design system maintainers.

## Recommended Approach

### Current: Manual Verification (Phase 1)

Before merging design system changes, perform manual visual inspection:

1. **Build and preview both applications:**
   ```bash
   pnpm dev:website
   pnpm dev:dashboard
   ```

2. **Navigate to design system pages:**
   - Website: http://localhost:3000/design-system
   - Dashboard: http://localhost:4200/design-system

3. **Compare with baseline:**
   - Check all component sections render correctly
   - Verify tokens display with correct values
   - Ensure responsive behavior works at mobile/tablet/desktop
   - Test dark mode toggle
   - Verify accessibility (keyboard navigation, screen reader labels)

### Future: Automated Screenshots (Phase 2 — NOT YET IMPLEMENTED)

When Playwright is added to the project (requires explicit approval):

1. **Install Playwright:**
   ```bash
   pnpm add -D @playwright/test
   npx playwright install
   ```

2. **Create baseline screenshots:**
   ```bash
   pnpm visual:test --update-snapshots
   ```

3. **Run visual regression tests:**
   ```bash
   pnpm visual:test
   ```

4. **Review changes:**
   - Visual differences will be shown in CI
   - When implemented: approve intentional changes with the planned `--update-snapshots` flag

### Future: CI Integration (Phase 3 — NOT YET IMPLEMENTED)

Add visual regression to CI pipeline when Playwright is configured:

```yaml
- name: Run visual regression tests
  run: pnpm visual:test
  env:
    CI: true

- name: Upload visual test results
  if: failure()
  uses: actions/upload-artifact@v4
  with:
    name: visual-test-results
    path: test-results/
```

## Key Test Cases

### Design System Pages

- [ ] All 60+ components render correctly
- [ ] Token showcase displays accurate values
- [ ] Dark mode works without visual glitches
- [ ] Responsive layouts at 320px, 768px, 1024px, 1440px
- [ ] Icon gallery shows all BRKTA ONE animated icons
- [ ] Typography section displays Geist Sans/Mono correctly

### Critical Components

- [ ] Button variants (primary, secondary, ghost, etc.)
- [ ] Form controls (Input, Select, Checkbox, Radio)
- [ ] Overlay components (Modal, Tooltip, Popover)
- [ ] Data display (Table, Card, Avatar)
- [ ] Feedback components (Toast, Alert, Spinner)

### Accessibility Checks

- [ ] Focus indicators visible
- [ ] Color contrast meets WCAG AA (4.5:1 for text)
- [ ] Keyboard navigation works
- [ ] ARIA labels present
- [ ] Reduced motion respected

## Tools to Consider

### Screenshot Testing
- **Playwright** - Built-in screenshot comparison
- **Chromatic** - Visual testing for Storybook (commercial)
- **Percy** - Visual testing service (commercial)
- **BackstopJS** - Open-source visual regression

### Storybook Integration
If Storybook is added later:
```bash
pnpm add -D @storybook/react @storybook/addon-a11y @chromatic-com/storybook
```

## Manual Testing Checklist

Before merging design system PRs:

- [ ] `pnpm audit:design-system` passes
- [ ] `pnpm build:website` succeeds
- [ ] `pnpm build:dashboard` succeeds
- [ ] `pnpm test:ui` passes (all 845+ tests)
- [ ] Design system pages load without console errors
- [ ] Components work in both light and dark mode
- [ ] Components are keyboard accessible
- [ ] Color contrast meets WCAG AA
- [ ] No hydration warnings in Next.js

## Future Enhancements

1. **Automated screenshot testing** with Playwright
2. **Component-level visual tests** in Storybook
3. **Cross-browser testing** (Chrome, Firefox, Safari, Edge)
4. **Mobile device emulation** testing
5. **Performance monitoring** (Core Web Vitals)
6. **Accessibility automated testing** (axe-core integration)

## Resources

- [Playwright Visual Testing](https://playwright.dev/docs/test-snapshots)
- [Chromatic Documentation](https://www.chromatic.com/docs/)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)

## Contact

For questions about visual regression testing, contact the BRKTA ONE Design System maintainers.
