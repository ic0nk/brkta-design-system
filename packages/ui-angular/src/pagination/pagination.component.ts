import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'brkta-pagination',
  standalone: true,
  template: `
    <nav data-brkta-pagination="" aria-label="Pagination">
      <button data-brkta-pagination-item="" [attr.data-disabled]="current <= 1 ? 'true' : undefined"
        [disabled]="current <= 1" (click)="go(current - 1)" aria-label="Previous">‹</button>
      @for (p of visiblePages; track $index) {
        <button data-brkta-pagination-item=""
          [attr.data-active]="p === current ? 'true' : undefined"
          [disabled]="p === -1" [attr.data-disabled]="p === -1 ? 'true' : undefined"
          (click)="p > 0 && go(p)"
        >{{ p === -1 ? '…' : p }}</button>
      }
      <button data-brkta-pagination-item="" [attr.data-disabled]="current >= total ? 'true' : undefined"
        [disabled]="current >= total" (click)="go(current + 1)" aria-label="Next">›</button>
    </nav>
  `,
})
export class PaginationComponent {
  @Input() current = 1;
  @Input() total = 1;
  @Output() pageChange = new EventEmitter<number>();

  get visiblePages(): number[] {
    const c = this.current; const t = this.total;
    if (t <= 7) return Array.from({ length: t }, (_, i) => i + 1);
    const pages: number[] = [1];
    if (c > 3) pages.push(-1);
    for (let i = Math.max(2, c - 1); i <= Math.min(t - 1, c + 1); i++) pages.push(i);
    if (c < t - 2) pages.push(-1);
    pages.push(t);
    return pages;
  }

  go(page: number): void {
    if (page < 1 || page > this.total) return;
    this.current = page;
    this.pageChange.emit(page);
  }
}
