import { AfterViewInit, Component, ElementRef, EventEmitter, Input, NgZone, OnChanges, OnDestroy, Output, SimpleChanges, TemplateRef, ViewChild, inject } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';

export interface TabItem { label: string; value: string; disabled?: boolean; content?: string | TemplateRef<unknown>; }

@Component({
  selector: 'brkta-tabs',
  standalone: true,
  imports: [NgTemplateOutlet],
  template: `
    <div data-brkta-tabs="" [attr.data-variant]="variant" [attr.data-orientation]="orientation">
      <div #listRef data-brkta-tabs-list="" role="tablist" [attr.aria-orientation]="orientation"
        (mouseleave)="hoveredIdx = null; updateIndicator()">
        <span data-brkta-tabs-indicator="" aria-hidden="true"></span>
        @for (item of items; track item.value; let i = $index) {
          <button data-brkta-tabs-trigger="" role="tab"
            [attr.data-active]="item.value === activeValue ? 'true' : undefined"
            [attr.data-disabled]="item.disabled || undefined"
            [attr.aria-selected]="item.value === activeValue"
            [attr.aria-disabled]="item.disabled || undefined"
            [attr.tabindex]="item.value === activeValue ? 0 : -1"
            [disabled]="item.disabled || undefined"
            (click)="!item.disabled && select(item.value)"
            (focus)="!item.disabled && (hoveredIdx = i); updateIndicator()"
            (mouseenter)="!item.disabled && (hoveredIdx = i); updateIndicator()"
            (keydown)="onKeyDown($event, i)"
          >{{ item.label }}</button>
        }
      </div>
      @if (activeItem) {
        <div data-brkta-tabs-panel="" role="tabpanel">
          @if (isTemplate(activeItem.content)) {
            <ng-container *ngTemplateOutlet="activeItem.content"></ng-container>
          } @else {
            {{ activeItem.content }}
          }
        </div>
      }
    </div>
  `,
})
export class TabsComponent implements AfterViewInit, OnChanges, OnDestroy {
  @Input() items: TabItem[] = [];
  @Input() value?: string;
  @Input() variant: 'default' | 'segmented' = 'default';
  @Input() orientation: 'horizontal' | 'vertical' = 'horizontal';
  @Output() valueChange = new EventEmitter<string>();

  @ViewChild('listRef') listRef!: ElementRef<HTMLDivElement>;
  hoveredIdx: number | null = null;
  private readonly zone = inject(NgZone);
  private observer?: ResizeObserver;
  private directionObserver?: MutationObserver;
  private destroyed = false;
  private readonly measure = () => this.updateIndicator();
  private itemsSignature = '';

  get activeValue(): string { return this.value ?? (this.items[0]?.value ?? ''); }
  get activeItem(): TabItem | undefined { return this.items.find(i => i.value === this.activeValue); }
  get activeIndex(): number { return this.items.findIndex(i => i.value === this.activeValue); }
  isTemplate(content: TabItem['content']): content is TemplateRef<unknown> {
    return typeof content !== 'string' && !!content;
  }
  get indicatorIdx(): number {
    if (this.hoveredIdx !== null) return this.hoveredIdx;
    const idx = this.activeIndex;
    return idx >= 0 ? idx : -1;
  }

  ngAfterViewInit(): void {
    this.zone.runOutsideAngular(() => {
      if (typeof ResizeObserver !== 'undefined') this.observer = new ResizeObserver(this.measure);
      if (typeof MutationObserver !== 'undefined') {
        this.directionObserver = new MutationObserver(this.measure);
        // Direction may be set by either the document or a nested workspace shell.
        for (let ancestor: HTMLElement | null = this.listRef.nativeElement; ancestor; ancestor = ancestor.parentElement) {
          this.directionObserver.observe(ancestor, { attributes: true, attributeFilter: ['dir'] });
        }
      }
      window.addEventListener('resize', this.measure);
      this.observeTriggers();
      this.updateIndicator();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    const signature = JSON.stringify(this.items.map(({ label, value, disabled }) => [label, value, !!disabled]));
    if (signature !== this.itemsSignature || changes['value'] || changes['orientation']) {
      this.hoveredIdx = null;
      this.itemsSignature = signature;
    }
    // Outside Angular so fresh item-array inputs cannot schedule change-detection loops.
    this.zone.runOutsideAngular(() => queueMicrotask(() => {
      if (this.destroyed) return;
      this.observeTriggers();
      this.updateIndicator();
    }));
  }

  ngOnDestroy(): void {
    this.destroyed = true;
    this.observer?.disconnect();
    this.directionObserver?.disconnect();
    window.removeEventListener('resize', this.measure);
  }

  private observeTriggers(): void {
    if (!this.listRef || !this.observer) return;
    this.observer.disconnect();
    this.observer.observe(this.listRef.nativeElement);
    this.listRef.nativeElement.querySelectorAll('[data-brkta-tabs-trigger]').forEach((trigger) => this.observer!.observe(trigger));
  }

  select(val: string): void { this.value = val; this.valueChange.emit(val); this.hoveredIdx = null; this.updateIndicator(); }

  updateIndicator(): void {
    if (!this.listRef) return;
    const list = this.listRef.nativeElement;
    const idx = this.indicatorIdx;
    if (idx < 0) return;
    const triggers = list.querySelectorAll<HTMLElement>('[data-brkta-tabs-trigger]');
    const target = triggers[idx];
    if (!target) return;
    const lr = list.getBoundingClientRect();
    const tr = target.getBoundingClientRect();
    if (this.orientation === 'horizontal') {
      list.style.setProperty('--tabs-indicator-x', `${tr.left - lr.left}px`);
      list.style.setProperty('--tabs-indicator-width', `${tr.width}px`);
    } else {
      list.style.setProperty('--tabs-indicator-y', `${tr.top - lr.top}px`);
      list.style.setProperty('--tabs-indicator-height', `${tr.height}px`);
    }
  }

  onKeyDown(e: KeyboardEvent, idx: number): void {
    const enabled = this.items.filter(i => !i.disabled);
    if (!enabled.length) return;
    const current = enabled.findIndex(i => i.value === this.items[idx].value);
    let next = current;
    const list = this.listRef.nativeElement;
    const rtl = getComputedStyle(list).direction === 'rtl' || list.closest('[dir]')?.getAttribute('dir') === 'rtl';
    if (this.orientation === 'horizontal') {
      if (e.key === 'ArrowRight') next = (current + (rtl ? -1 : 1) + enabled.length) % enabled.length;
      else if (e.key === 'ArrowLeft') next = (current + (rtl ? 1 : -1) + enabled.length) % enabled.length;
      else if (e.key !== 'Home' && e.key !== 'End') return;
    } else {
      if (e.key === 'ArrowDown') next = (current + 1) % enabled.length;
      else if (e.key === 'ArrowUp') next = (current - 1 + enabled.length) % enabled.length;
      else if (e.key !== 'Home' && e.key !== 'End') return;
    }
    if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = enabled.length - 1;
    e.preventDefault();
    this.select(enabled[next].value);
    const nextIndex = this.items.findIndex(item => item.value === enabled[next].value);
    list.querySelectorAll<HTMLButtonElement>('[data-brkta-tabs-trigger]')[nextIndex]?.focus();
  }
}
