import { Component, Input, Output, EventEmitter, HostListener, ElementRef, Injector, afterNextRender, inject, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';

@Component({
  selector: 'brkta-dialog',
  standalone: true,
  styles: [':host { display: contents; }'],
  template: `
    <span (click)="show()"><ng-content select="[trigger]"></ng-content></span>
    @if (open || closing) {
      <div #overlay data-brkta-dialog-overlay="" [attr.data-closing]="closing ? '' : undefined"
        (click)="onOverlayClick($event)" role="presentation">
        <div data-brkta-dialog-content="" [attr.data-closing]="closing ? '' : undefined" (keydown)="trapFocus($event)" tabindex="-1"
          role="dialog" aria-modal="true"
          [attr.aria-labelledby]="title ? 'ng-dlg-title' : undefined"
          [attr.aria-describedby]="description ? 'ng-dlg-desc' : undefined">
          <button data-brkta-dialog-close="" [attr.aria-label]="closeLabel" (click)="close()">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
          </button>
          @if (title || description) {
            <div data-brkta-dialog-header="">
              @if (title) { <h2 data-brkta-dialog-title="" id="ng-dlg-title">{{ title }}</h2> }
              @if (description) { <p data-brkta-dialog-description="" id="ng-dlg-desc">{{ description }}</p> }
            </div>
          }
          <ng-content></ng-content>
          <ng-content select="[footer]"></ng-content>
        </div>
      </div>
    }
  `,
})
export class DialogComponent implements OnChanges, OnDestroy {
  @Input() open = false;
  @Input() closeLabel = 'Close';
  @Input() title?: string;
  @Input() description?: string;
  @Output() openChange = new EventEmitter<boolean>();
  closing = false;
  private el = inject(ElementRef);
  private readonly injector = inject(Injector);
  private previouslyFocused: HTMLElement | null = null;
  private wasOpen = false;
  private closeTimer?: ReturnType<typeof setTimeout>;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['open']?.currentValue === true) this.rememberFocus();
    else if (changes['open']?.currentValue === false) this.restoreFocus();
  }
  ngOnDestroy(): void { if (this.closeTimer) clearTimeout(this.closeTimer); this.restoreFocus(); }
  show(): void { this.open = true; this.rememberFocus(); }
  private rememberFocus(): void {
    if (this.wasOpen) return;
    this.wasOpen = true;
    this.previouslyFocused = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    afterNextRender(() => {
      if (this.open && this.wasOpen) (this.focusable()[0] ?? this.content())?.focus();
    }, { injector: this.injector });
  }
  private restoreFocus(): void {
    if (!this.wasOpen) return;
    this.wasOpen = false;
    this.previouslyFocused?.focus();
    this.previouslyFocused = null;
  }
  private content(): HTMLElement | null { return this.el.nativeElement.querySelector('[data-brkta-dialog-content]'); }
  private focusable(): HTMLElement[] {
    return Array.from(this.content()?.querySelectorAll<HTMLElement>('button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])') ?? [])
      .filter(element => !element.hidden && element.getAttribute('aria-hidden') !== 'true');
  }
  trapFocus(event: KeyboardEvent): void {
    if (event.key !== 'Tab') return;
    const items = this.focusable();
    if (!items.length) { event.preventDefault(); this.content()?.focus(); return; }
    if (event.shiftKey && document.activeElement === items[0]) { event.preventDefault(); items[items.length - 1].focus(); }
    else if (!event.shiftKey && document.activeElement === items[items.length - 1]) { event.preventDefault(); items[0].focus(); }
  }
  close(): void {
    if (this.closing) return;
    this.closing = true;
    this.closeTimer = setTimeout(() => { this.open = false; this.closing = false; this.openChange.emit(false); this.restoreFocus(); }, 200);
  }
  onOverlayClick(e: MouseEvent): void { if (e.target === (e.currentTarget as HTMLElement)) this.close(); }
  @HostListener('document:keydown', ['$event']) onEscape(e: KeyboardEvent): void { if (e.key === 'Escape' && this.open && !this.closing) this.close(); }
}
