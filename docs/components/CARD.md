# Card

> A content container with optional header, content, and footer sections. Cards group related information into a visually distinct panel.

---

## When to use

- Present a distinct piece of content (feature, module, summary).
- Group related form fields or information.
- Create data widgets or stat cards.
- Display content in a grid layout.

Do not nest Cards more than one level deep. Use a single Card as the outer container.

---

## Implementation

| Layer | Location |
|-------|----------|
| Contract | `@brkta/ui-core/card/card-contract.ts` |
| CSS | `@brkta/ui-core/card/card.css` |
| React | `@brkta/ui-react/card` (`Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter`) |
| Angular | `@brkta/ui-angular` (`CardComponent`, `CardHeaderComponent`, `CardTitleComponent`, `CardDescriptionComponent`, `CardContentComponent`, `CardFooterComponent`) |

---

## React

```tsx
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@brkta/ui-react/card';

<Card variant="default">
  <CardHeader>
    <CardTitle>Revenue</CardTitle>
    <CardDescription>Monthly recurring revenue</CardDescription>
  </CardHeader>
  <CardContent>
    <p className="text-3xl font-bold">$12,450</p>
  </CardContent>
  <CardFooter>
    <Button variant="outline" size="sm">View Details</Button>
  </CardFooter>
</Card>
```

## Angular

```html
<brkta-card variant="default">
  <brkta-card-header>
    <brkta-card-title>Revenue</brkta-card-title>
    <brkta-card-description>Monthly recurring revenue</brkta-card-description>
  </brkta-card-header>
  <brkta-card-content>
    <p class="text-3xl font-bold">$12,450</p>
  </brkta-card-content>
  <brkta-card-footer>
    <brkta-button variant="outline" size="sm">View Details</brkta-button>
  </brkta-card-footer>
</brkta-card>
```

---

## Variants

| Variant | Style | Use Case |
|---------|-------|----------|
| `default` | Filled background + border + shadow | Most cards, data widgets |
| `outlined` | Transparent background + border | Cards on colored surfaces, subtle containers |
| `ghost` | No background, no border, no shadow | Nested content groups, layout only |

## Rules

- Use `default` variant for standalone cards.
- Use `outlined` when the card appears on a non-standard background.
- Use `ghost` only for layout grouping with no visual container needed.
- Cards use `--radius-lg` (10px) for consistent curvature.
- Cards are not interactive by default. For clickable cards, use a Button or link inside the card footer.

## Related

- **Dialog** — For modal content containers.
- **Button** — For actions inside a card footer.
