# Consent Banner

Approved by the user for optional analytics consent. The React `ConsentBanner`
(`@brkta/ui-react/consent-banner`) and Angular `ConsentBannerComponent`
(`brkta-consent-banner`, exported by `@brkta/ui-angular`) use one shared CSS recipe.

Supply localized `title`, `description`, `acceptLabel`, `rejectLabel`, `policyLabel`,
and `policyHref`. React emits `onAccept`/`onReject`; Angular emits
`accepted`/`rejected`. Neither wrapper persists preferences or loads trackers.
Consumers own consent state and must provide a persistent way to reopen choices.

`placement` is `fixed` (default) or `embedded` for inventories and stories.
The fixed region uses the fixed elevation token, logical insets, a bounded width,
and viewport-constrained scrolling. Its 40rem maximum width and 12rem action wrap
basis are component layout dimensions, not theme values. Controls wrap at narrow
widths and with longer translations; interactive targets are at least 44px tall.
Inherited direction supports RTL. There is no entrance motion or focus trap.

Both actions use the same secondary Button variant, without preselecting consent.
The region has an accessible name and native keyboard controls; the privacy link
has a visible focus ring. It remains nonmodal and does not block the rest of the
page. Colors, spacing, typography, radii, shadows, and elevation use semantic tokens.

Tests cover independent actions, React keyboard traversal, equivalent choice
styles, long RTL text, and embedded placement. These source tests do not establish
screen-reader or viewport screenshot verification; review the two app inventories
at the mandatory responsive widths before claiming that verification.
