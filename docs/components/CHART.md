# Chart

Visualization primitives for bar, donut, and metric card charts. Uses semantic design tokens.

## Data Attributes
| Attribute | Element | Purpose |
|-----------|---------|---------|
| `data-brkta-chart` | Root | Chart container |
| `data-brkta-chart-title` | Title | Chart title |
| `data-brkta-chart-description` | Description | Screen-reader accessible description |
| `data-brkta-chart-bars` | Bars | Bar chart container |
| `data-brkta-chart-bar` | Bar | Individual bar |
| `data-brkta-chart-bar-fill` | Fill | Bar fill area |
| `data-brkta-chart-bar-label` | Label | Bar label |
| `data-brkta-chart-donut` | Donut | Donut container |
| `data-brkta-chart-legend` | Legend | Chart legend |
| `data-brkta-chart-metric` | Metrics | Metric card grid |

## API
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `type` | `'bar'\|'donut'\|'metric'` | `'bar'` | Chart type |
| `title` | `string` | — | Chart title |
| `description` | `string` | — | Screen-reader accessible description |
| `data` | `{label,value,color?}[]` | `[]` | Chart data |
| `height` | `number` | `200` | Chart height in px |

## Accessibility
- Accessible description rendered as visible text
- Non-color-only meaning (labels and values shown)
- Data summary available for screen readers
