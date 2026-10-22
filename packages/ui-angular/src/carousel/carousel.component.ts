import { Component, Input, OnChanges, SimpleChanges, signal, computed, HostListener } from '@angular/core';

@Component({
  selector: 'brkta-carousel',
  standalone: true,
  template: `
    <div data-brkta-carousel-viewport>
      <div data-brkta-carousel-slides [style.transform]="'translateX(-' + index() * 100 + '%)'">
        <ng-content></ng-content>
      </div>
    </div>
    @if (showControls) {
      <button type="button" data-brkta-carousel-control data-brkta-carousel-control-prev
        [attr.data-disabled]="atStart() ? '' : null"
        [attr.aria-label]="previousLabel" (click)="prev()" [disabled]="atStart()">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m15 18-6-6 6-6"/></svg>
      </button>
      <button type="button" data-brkta-carousel-control data-brkta-carousel-control-next
        [attr.data-disabled]="atEnd() ? '' : null"
        [attr.aria-label]="nextLabel" (click)="next()" [disabled]="atEnd()">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m9 18 6-6-6-6"/></svg>
      </button>
    }
    @if (showIndicators) {
      <div data-brkta-carousel-indicators>
        @for (i of slides(); track i) {
          <button type="button" data-brkta-carousel-indicator
            [attr.data-active]="i === index() ? '' : null"
            [attr.aria-label]="indicatorLabel + ' ' + (i + 1)"
            [attr.aria-current]="i === index() ? 'true' : null"
            (click)="goTo(i)"></button>
        }
      </div>
    }
  `,
  host: {
    '[attr.data-brkta-carousel]': '""',
    'role': 'region',
    'aria-roledescription': 'carousel',
    'aria-label': 'Carousel',
    '[attr.tabindex]': '0',
  },
  styles: [`:host { display: block; position: relative; overflow: hidden; border-radius: var(--radius-lg); }`],
})
export class CarouselComponent implements OnChanges {
  @Input() loop = false;
  @Input() showControls = true;
  @Input() showIndicators = true;
  @Input() slideCount = 0;
  @Input() previousLabel = 'Previous slide';
  @Input() nextLabel = 'Next slide';
  @Input() indicatorLabel = 'Go to slide';

  /** Placeholder slide count used only when no slideCount input is bound (e.g. static demos). */
  private static readonly DEFAULT_SLIDE_COUNT = 3;

  index = signal(0);
  private slideCountSignal = signal(0);

  count = computed(() => this.slideCountSignal() > 0 ? this.slideCountSignal() : CarouselComponent.DEFAULT_SLIDE_COUNT);
  slides = computed(() => Array.from({ length: this.count() }, (_, i) => i));
  atStart = computed(() => !this.loop && this.index() === 0);
  atEnd = computed(() => !this.loop && this.index() === this.count() - 1);

  ngOnChanges(changes: SimpleChanges) {
    if (changes['slideCount']) {
      this.slideCountSignal.set(Math.max(0, this.slideCount || 0));
      const c = this.count();
      if (this.index() > c - 1) { this.index.set(Math.max(0, c - 1)); }
    }
  }

  goTo(i: number) {
    const c = this.count();
    if (c === 0) return;
    if (this.loop) { this.index.set(((i % c) + c) % c); }
    else { this.index.set(Math.max(0, Math.min(i, c - 1))); }
  }
  prev() { this.goTo(this.index() - 1); }
  next() { this.goTo(this.index() + 1); }

  @HostListener('keydown', ['$event'])
  onKeyDown(e: KeyboardEvent) {
    if (e.key === 'ArrowLeft') { e.preventDefault(); this.prev(); }
    if (e.key === 'ArrowRight') { e.preventDefault(); this.next(); }
  }
}
