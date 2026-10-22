import { Component, Input } from '@angular/core';

interface BreadcrumbItem { label: string; href?: string; current?: boolean; }

@Component({
  selector: 'brkta-breadcrumb',
  standalone: true,
  template: `
    <nav data-brkta-breadcrumb="" aria-label="Breadcrumb">
      @for (item of items; track item.label; let i = $index) {
        <span>
          @if (item.href && !item.current) {
            <span data-brkta-breadcrumb-item=""><a [href]="item.href">{{ item.label }}</a></span>
          } @else {
            <span data-brkta-breadcrumb-item="" [attr.data-current]="item.current ? 'true' : undefined"
              [attr.aria-current]="item.current ? 'page' : undefined">{{ item.label }}</span>
          }
          @if (i < items.length - 1) {
            <span data-brkta-breadcrumb-separator="" aria-hidden="true">/</span>
          }
        </span>
      }
    </nav>
  `,
})
export class BreadcrumbComponent {
  @Input() items: BreadcrumbItem[] = [];
}
