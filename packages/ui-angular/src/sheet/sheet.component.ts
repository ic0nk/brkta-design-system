import { AfterViewChecked, Component, Input, Output, EventEmitter, HostListener, ElementRef, inject } from '@angular/core';
import type { SheetSide, SheetSize } from '@brkta/ui-core/types/variant';

@Component({
  selector: 'brkta-sheet',
  standalone: true,
  styles: [':host { display: contents; }'],
  template: `
    <span (click)="open=true"><ng-content select="[trigger]"></ng-content></span>
    @if (open || closing) {
      <div #overlay data-brkta-sheet-overlay="" [attr.data-closing]="closing ? '' : undefined"
        (click)="onOverlayClick($event)" role="presentation">
          <div data-brkta-sheet-content="" [attr.data-side]="side" [attr.data-size]="size" [attr.data-closing]="closing ? '' : undefined"
          role="dialog" aria-modal="true" [attr.aria-labelledby]="title ? 'sh-title' : undefined">
          <button data-brkta-dialog-close="" aria-label="Close" (click)="close()">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
          </button>
          @if (title) { <div data-brkta-sheet-header="" id="sh-title">{{ title }}</div> }
          @if (description) { <p data-brkta-dialog-description="">{{ description }}</p> }
          <div data-brkta-sheet-body=""><ng-content select=":not([footer])"></ng-content></div>
          <div data-brkta-sheet-footer=""><ng-content select="[footer]"></ng-content></div>
        </div>
      </div>
    }
  `,
})
export class SheetComponent implements AfterViewChecked {
  @Input() open = false;
  @Input() side: SheetSide = 'right';
  @Input() size: SheetSize = 'md';
  @Input() title?: string;
  @Input() description?: string;
  @Output() openChange = new EventEmitter<boolean>();
  closing = false;
  private el = inject(ElementRef);
  private wasOpen = false;
  private returnFocus: HTMLElement | null = null;

  ngAfterViewChecked(): void {
    if (this.open && !this.wasOpen) {
      this.wasOpen = true;
      const active = this.el.nativeElement.ownerDocument.activeElement;
      this.returnFocus = active instanceof HTMLElement && !this.el.nativeElement.contains(active) ? active : null;
      setTimeout(() => this.focusFirst(), 0);
    } else if (!this.open && !this.closing) {
      this.wasOpen = false;
    }
  }

  close(): void { this.closing = true; setTimeout(() => { this.open = false; this.closing = false; this.wasOpen = false; this.openChange.emit(false); this.returnFocus?.focus(); this.returnFocus = null; }, 200); }
  onOverlayClick(e: MouseEvent): void { if (e.target === (e.currentTarget as HTMLElement)) this.close(); }
  @HostListener('document:keydown', ['$event']) onKeydown(e: KeyboardEvent): void {
    if (!this.open || this.closing) return;
    if (e.key === 'Escape') { e.preventDefault(); this.close(); return; }
    if (e.key === 'Tab') this.trapFocus(e);
  }

  private focusFirst(): void { this.getFocusable()[0]?.focus(); }

  private trapFocus(e: KeyboardEvent): void {
    const focusable = this.getFocusable();
    if (focusable.length === 0) return;
    const active = this.el.nativeElement.ownerDocument.activeElement;
    if (!(active instanceof HTMLElement) || !this.el.nativeElement.contains(active)) { e.preventDefault(); focusable[0].focus(); return; }
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if ((e.shiftKey && active === first) || (!e.shiftKey && active === last)) { e.preventDefault(); (e.shiftKey ? last : first).focus(); }
  }

  private getFocusable(): HTMLElement[] {
    const content = this.el.nativeElement.querySelector('[data-brkta-sheet-content]') as HTMLElement | null;
    if (!content) return [];
    return Array.from(content.querySelectorAll<HTMLElement>('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')).filter((element) => !element.hasAttribute('disabled') && element.getAttribute('aria-hidden') !== 'true');
  }
}
