import { Component, Input, Output, EventEmitter, ElementRef, ViewChild, OnInit } from '@angular/core';

type ActiveThumb = 'lower' | 'upper';

@Component({
  selector: 'brkta-slider',
  standalone: true,
  styles: [`:host { display: block; width: 100%; }`],
  template: `
    <div data-brkta-slider="" [attr.data-disabled]="disabled ? '' : undefined">
      <div #track data-brkta-slider-track="" (pointerdown)="onTrackPointerDown($event)">
        @if (range) {
          <div
            #rangeEl
            data-brkta-slider-range=""
            [style.inset-inline-start.%]="lowerPercentage"
            [style.inline-size.%]="upperPercentage - lowerPercentage"
          ></div>
        } @else {
          <div
            #rangeEl
            data-brkta-slider-range=""
            [style.inset-inline-start.%]="0"
            [style.inline-size.%]="percentage"
          ></div>
        }
      </div>
      @if (range) {
        <div
          #lowerThumbEl
          data-brkta-slider-thumb=""
          data-brkta-slider-thumb-lower=""
          role="slider"
          [attr.aria-label]="lowerAriaLabel"
          [attr.aria-labelledby]="lowerAriaLabelledby"
          [attr.aria-valuemin]="min"
          [attr.aria-valuemax]="currentUpper"
          [attr.aria-valuenow]="currentLower"
          [attr.aria-disabled]="disabled || undefined"
          [attr.tabindex]="disabled ? -1 : 0"
          (keydown)="onLowerKeyDown($event)"
          (pointerdown)="onThumbPointerDown($event)"
          [style.inset-inline-start.%]="lowerPercentage"
          [style.top.%]="50"
          [style.position]="'absolute'"
          [style.transform]="'translate(-50%, -50%)'"
        ></div>
        <div
          #upperThumbEl
          data-brkta-slider-thumb=""
          data-brkta-slider-thumb-upper=""
          role="slider"
          [attr.aria-label]="upperAriaLabel"
          [attr.aria-labelledby]="upperAriaLabelledby"
          [attr.aria-valuemin]="currentLower"
          [attr.aria-valuemax]="max"
          [attr.aria-valuenow]="currentUpper"
          [attr.aria-disabled]="disabled || undefined"
          [attr.tabindex]="disabled ? -1 : 0"
          (keydown)="onUpperKeyDown($event)"
          (pointerdown)="onThumbPointerDown($event)"
          [style.inset-inline-start.%]="upperPercentage"
          [style.top.%]="50"
          [style.position]="'absolute'"
          [style.transform]="'translate(-50%, -50%)'"
        ></div>
      } @else {
        <div
          #thumbEl
          data-brkta-slider-thumb=""
          role="slider"
          [attr.aria-label]="ariaLabel"
          [attr.aria-labelledby]="ariaLabelledby"
          [attr.aria-valuemin]="min"
          [attr.aria-valuemax]="max"
          [attr.aria-valuenow]="currentValue"
          [attr.aria-disabled]="disabled || undefined"
          [attr.tabindex]="disabled ? -1 : 0"
          (keydown)="onKeyDown($event)"
          (pointerdown)="onPointerDown($event)"
          [style.inset-inline-start.%]="percentage"
          [style.top.%]="50"
          [style.position]="'absolute'"
          [style.transform]="'translate(-50%, -50%)'"
        ></div>
      }
    </div>
  `,
})
export class SliderComponent implements OnInit {
  @Input() value: number | undefined;
  @Input() defaultValue = 50;
  @Input() min = 0;
  @Input() max = 100;
  @Input() step = 1;
  @Input() disabled = false;
  @Input() ariaLabel?: string;
  @Input() ariaLabelledby?: string;
  @Output() valueChange = new EventEmitter<number>();

  @Input() range = false;
  @Input() lowerValue: number | undefined;
  @Input() upperValue: number | undefined;
  @Input() defaultLowerValue = 25;
  @Input() defaultUpperValue = 75;
  @Input() lowerAriaLabel?: string;
  @Input() lowerAriaLabelledby?: string;
  @Input() upperAriaLabel?: string;
  @Input() upperAriaLabelledby?: string;
  @Output() rangeChange = new EventEmitter<{ lower: number; upper: number }>();

  @ViewChild('track') trackRef!: ElementRef<HTMLDivElement>;
  @ViewChild('rangeEl') rangeRef?: ElementRef<HTMLDivElement>;
  @ViewChild('thumbEl') thumbRef?: ElementRef<HTMLDivElement>;
  @ViewChild('lowerThumbEl') lowerThumbRef?: ElementRef<HTMLDivElement>;
  @ViewChild('upperThumbEl') upperThumbRef?: ElementRef<HTMLDivElement>;

  private internalValue = 50;
  private internalLower = 25;
  private internalUpper = 75;

  get currentValue(): number {
    return this.value !== undefined ? this.value : this.internalValue;
  }

  get currentLower(): number {
    return this.lowerValue !== undefined ? this.lowerValue : this.internalLower;
  }

  get currentUpper(): number {
    return this.upperValue !== undefined ? this.upperValue : this.internalUpper;
  }

  get percentage(): number {
    return ((this.currentValue - this.min) / (this.max - this.min)) * 100;
  }

  get lowerPercentage(): number {
    return ((this.currentLower - this.min) / (this.max - this.min)) * 100;
  }

  get upperPercentage(): number {
    return ((this.currentUpper - this.min) / (this.max - this.min)) * 100;
  }

  private clampAndStep(raw: number, lo = this.min, hi = this.max): number {
    const clamped = Math.max(lo, Math.min(hi, raw));
    return Math.round(clamped / this.step) * this.step;
  }

  /**
   * Resolves text direction for an element. Prefers the CSS-cascade resolved
   * `direction` (correct in real browsers, including when `dir` is set on an
   * ancestor like `<html>`), falling back to walking up for the nearest
   * explicit `dir` attribute. The fallback exists because jsdom's computed
   * style does not implement the browser's `dir` attribute -> `direction`
   * property UA mapping, so it always reports an empty string in tests.
   */
  private resolveDirection(el: HTMLElement): 'ltr' | 'rtl' {
    const computed = getComputedStyle(el).direction;
    if (computed === 'rtl' || computed === 'ltr') return computed;
    const dirAncestor = el.closest('[dir]');
    return dirAncestor?.getAttribute('dir') === 'rtl' ? 'rtl' : 'ltr';
  }

  /**
   * Maps a pointer's clientX to a logical (inline-start-anchored) percentage
   * along the track, 0% = inline-start, 100% = inline-end — so it maps to
   * the visual right side under `dir="rtl"` without any direction-specific
   * math at the call site.
   */
  private getLogicalPercentage(clientX: number): number {
    const track = this.trackRef.nativeElement;
    const rect = track.getBoundingClientRect();
    const physicalPct = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100));
    const isRtl = this.resolveDirection(track) === 'rtl';
    return isRtl ? 100 - physicalPct : physicalPct;
  }

  private updateDOM(clientX: number): number {
    const thumb = this.thumbRef?.nativeElement;
    const rangeEl = this.rangeRef?.nativeElement;
    const pct = this.getLogicalPercentage(clientX);
    if (thumb) {
      thumb.style.insetInlineStart = pct + '%';
      thumb.style.top = '50%';
      thumb.style.position = 'absolute';
      thumb.style.transform = 'translate(-50%, -50%)';
    }
    if (rangeEl) {
      rangeEl.style.insetInlineStart = '0%';
      rangeEl.style.inlineSize = pct + '%';
    }
    return this.clampAndStep(this.min + (pct / 100) * (this.max - this.min));
  }

  private commitValue(v: number) {
    const stepped = this.clampAndStep(v);
    if (this.value === undefined) this.internalValue = stepped;
    this.valueChange.emit(stepped);
  }

  onPointerDown(e: PointerEvent) {
    if (this.disabled) return;
    e.preventDefault();
    const track = this.trackRef.nativeElement;
    track.setPointerCapture(e.pointerId);

    const stepped = this.updateDOM(e.clientX);
    this.commitValue(stepped);

    const onMove = (ev: PointerEvent) => {
      ev.preventDefault();
      const st = this.updateDOM(ev.clientX);
      // Emit during drag for controlled mode responsiveness
      this.valueChange.emit(st);
    };

    const onUp = (ev: PointerEvent) => {
      track.removeEventListener('pointermove', onMove);
      track.removeEventListener('pointerup', onUp);
      track.removeEventListener('pointercancel', onUp);
      const st = this.updateDOM(ev.clientX);
      this.commitValue(st);
    };

    track.addEventListener('pointermove', onMove, { passive: false });
    track.addEventListener('pointerup', onUp);
    track.addEventListener('pointercancel', onUp);
  }

  onKeyDown(e: KeyboardEvent) {
    if (this.disabled) return;
    let delta = 0;
    if (e.key === 'ArrowRight' || e.key === 'ArrowUp') delta = this.step;
    else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') delta = -this.step;
    else if (e.key === 'Home') delta = this.min - this.currentValue;
    else if (e.key === 'End') delta = this.max - this.currentValue;
    if (delta !== 0) { e.preventDefault(); this.commitValue(this.currentValue + delta); }
  }

  /**
   * Dispatches track pointerdown to either the single-thumb drag handler
   * (unchanged behavior) or the range-mode nearest-thumb handler, depending
   * on `range`. The track element is shared between both modes.
   */
  onTrackPointerDown(e: PointerEvent) {
    if (this.range) this.startRangeDrag(e);
    else this.onPointerDown(e);
  }

  onThumbPointerDown(e: PointerEvent) {
    this.startRangeDrag(e);
  }

  // ---- Range mode ----
  // Dragging, clicking the track, and keyboard interaction all move whichever
  // thumb is nearer. Nearest-thumb selection is computed from the pointer's
  // logical position, not from which DOM node the browser happened to target
  // — so it resolves correctly even when the two thumbs' 44px hit regions
  // overlap near the middle of the track. Thumbs may become exactly equal
  // (touching) but never cross; see SLIDER.md for the documented rationale.

  private commitRange(lower: number, upper: number) {
    if (this.lowerValue === undefined) this.internalLower = lower;
    if (this.upperValue === undefined) this.internalUpper = upper;
    this.rangeChange.emit({ lower, upper });
  }

  private updateRangeDOM(
    clientX: number,
    active: ActiveThumb,
    otherLower: number,
    otherUpper: number,
  ): { lower: number; upper: number } {
    const pct = this.getLogicalPercentage(clientX);
    const rawValue = this.min + (pct / 100) * (this.max - this.min);
    let lower = otherLower;
    let upper = otherUpper;
    if (active === 'lower') {
      lower = this.clampAndStep(rawValue, this.min, otherUpper);
    } else {
      upper = this.clampAndStep(rawValue, otherLower, this.max);
    }
    const lowerPct = ((lower - this.min) / (this.max - this.min)) * 100;
    const upperPct = ((upper - this.min) / (this.max - this.min)) * 100;
    const lowerThumb = this.lowerThumbRef?.nativeElement;
    const upperThumb = this.upperThumbRef?.nativeElement;
    const rangeEl = this.rangeRef?.nativeElement;
    if (lowerThumb) {
      lowerThumb.style.insetInlineStart = lowerPct + '%';
      lowerThumb.style.top = '50%';
      lowerThumb.style.position = 'absolute';
      lowerThumb.style.transform = 'translate(-50%, -50%)';
    }
    if (upperThumb) {
      upperThumb.style.insetInlineStart = upperPct + '%';
      upperThumb.style.top = '50%';
      upperThumb.style.position = 'absolute';
      upperThumb.style.transform = 'translate(-50%, -50%)';
    }
    if (rangeEl) {
      rangeEl.style.insetInlineStart = lowerPct + '%';
      rangeEl.style.inlineSize = (upperPct - lowerPct) + '%';
    }
    return { lower, upper };
  }

  private startRangeDrag(e: PointerEvent) {
    if (this.disabled) return;
    e.preventDefault();
    const track = this.trackRef.nativeElement;
    track.setPointerCapture(e.pointerId);

    // The other (non-active) thumb never moves during this gesture, so its
    // bound can be captured once up front.
    const otherLower = this.currentLower;
    const otherUpper = this.currentUpper;

    const initialPct = this.getLogicalPercentage(e.clientX);
    const initialValue = this.min + (initialPct / 100) * (this.max - this.min);
    const active: ActiveThumb =
      Math.abs(initialValue - otherLower) <= Math.abs(initialValue - otherUpper) ? 'lower' : 'upper';
    (active === 'lower' ? this.lowerThumbRef : this.upperThumbRef)?.nativeElement.focus();

    const initial = this.updateRangeDOM(e.clientX, active, otherLower, otherUpper);
    this.commitRange(initial.lower, initial.upper);

    const onMove = (ev: PointerEvent) => {
      ev.preventDefault();
      const { lower, upper } = this.updateRangeDOM(ev.clientX, active, otherLower, otherUpper);
      this.rangeChange.emit({ lower, upper });
    };

    const onUp = (ev: PointerEvent) => {
      track.removeEventListener('pointermove', onMove);
      track.removeEventListener('pointerup', onUp);
      track.removeEventListener('pointercancel', onUp);
      const { lower, upper } = this.updateRangeDOM(ev.clientX, active, otherLower, otherUpper);
      this.commitRange(lower, upper);
    };

    track.addEventListener('pointermove', onMove, { passive: false });
    track.addEventListener('pointerup', onUp);
    track.addEventListener('pointercancel', onUp);
  }

  onLowerKeyDown(e: KeyboardEvent) {
    if (this.disabled) return;
    let target: number | null = null;
    if (e.key === 'ArrowRight' || e.key === 'ArrowUp') target = this.currentLower + this.step;
    else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') target = this.currentLower - this.step;
    else if (e.key === 'Home') target = this.min;
    else if (e.key === 'End') target = this.currentUpper;
    if (target !== null) {
      e.preventDefault();
      this.commitRange(this.clampAndStep(target, this.min, this.currentUpper), this.currentUpper);
    }
  }

  onUpperKeyDown(e: KeyboardEvent) {
    if (this.disabled) return;
    let target: number | null = null;
    if (e.key === 'ArrowRight' || e.key === 'ArrowUp') target = this.currentUpper + this.step;
    else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') target = this.currentUpper - this.step;
    else if (e.key === 'Home') target = this.currentLower;
    else if (e.key === 'End') target = this.max;
    if (target !== null) {
      e.preventDefault();
      this.commitRange(this.currentLower, this.clampAndStep(target, this.currentLower, this.max));
    }
  }

  ngOnInit() {
    if (this.value === undefined) this.internalValue = this.defaultValue;
    if (this.lowerValue === undefined) this.internalLower = this.defaultLowerValue;
    if (this.upperValue === undefined) this.internalUpper = this.defaultUpperValue;
  }
}
