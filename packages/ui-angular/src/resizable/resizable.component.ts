import { Component, Input, Output, EventEmitter, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'brkta-resizable',
  standalone: true,
  template: `
    <div #container data-brkta-resizable="" [attr.data-direction]="direction">
      <div data-brkta-resizable-panel="" [style.flex-basis.%]="isPercentage ? panelSize : undefined" [style.flex-grow]="isPercentage ? 0 : undefined" [style.width.px]="!isPercentage && direction === 'horizontal' ? panelSize : undefined" [style.height.px]="!isPercentage && direction === 'vertical' ? panelSize : undefined">
        <ng-content select="[first]"></ng-content>
      </div>
      <div
        #handle
        data-brkta-resizable-handle=""
        [attr.data-dragging]="dragging ? '' : undefined"
        (pointerdown)="onPointerDown($event)"
        (keydown)="onKeyDown($event)"
        role="separator"
        aria-label="Resize panels"
        [attr.aria-orientation]="direction"
        [attr.aria-valuenow]="panelSize"
        aria-valuemin="10"
        aria-valuemax="90"
        tabindex="0"
        style="touch-action: none;"
      ></div>
      <div data-brkta-resizable-panel="" [style.flex]="'1 1 0%'" [style.min-width.px]="0" [style.min-height.px]="0">
        <ng-content select="[second]"></ng-content>
      </div>
    </div>
  `,
})
export class ResizableComponent {
  @Input() direction: 'horizontal' | 'vertical' = 'horizontal';
  @Input() defaultSize = 50;
  @Input() minSize = 100;
  @Input() maxSize = Infinity;
  @Output() resizeEvent = new EventEmitter<number[]>();

  @ViewChild('container') containerRef!: ElementRef<HTMLDivElement>;
  @ViewChild('handle') handleRef!: ElementRef<HTMLDivElement>;

  panelSize: number;
  dragging = false;
  isPercentage: boolean;
  private startPos = 0;
  private startSize = 0;

  private onPointerMoveBound = this.onPointerMove.bind(this);
  private onPointerUpBound = this.onPointerUp.bind(this);

  constructor() {
    this.isPercentage = this.defaultSize <= 100 && this.defaultSize > 0;
    this.panelSize = this.defaultSize;
  }

  onPointerDown(e: PointerEvent): void {
    e.preventDefault();
    const handle = this.handleRef?.nativeElement;
    if (!handle) return;
    // setPointerCapture may not be available in test environments (jsdom)
    if (typeof handle.setPointerCapture === 'function') {
      handle.setPointerCapture(e.pointerId);
    }
    this.dragging = true;
    this.startPos = this.direction === 'horizontal' ? e.clientX : e.clientY;
    this.startSize = this.panelSize;
    document.addEventListener('pointermove', this.onPointerMoveBound);
    document.addEventListener('pointerup', this.onPointerUpBound);
    document.addEventListener('pointercancel', this.onPointerUpBound);
  }

  private onPointerMove(e: PointerEvent): void {
    const delta = this.direction === 'horizontal'
      ? e.clientX - this.startPos
      : e.clientY - this.startPos;

    let newSize: number;
    if (this.isPercentage) {
      const containerSize = this.direction === 'horizontal'
        ? this.containerRef.nativeElement.offsetWidth
        : this.containerRef.nativeElement.offsetHeight;
      const deltaPercent = (delta / containerSize) * 100;
      newSize = Math.max(10, Math.min(90, this.startSize + deltaPercent));
    } else {
      newSize = Math.max(this.minSize, Math.min(this.maxSize, this.startSize + delta));
    }

    this.panelSize = newSize;
    this.resizeEvent.emit([newSize, 100 - (this.isPercentage ? newSize : 0)]);
  }

  private onPointerUp(e?: PointerEvent): void {
    this.dragging = false;
    const handle = this.handleRef?.nativeElement;
    if (handle && e && typeof handle.releasePointerCapture === 'function') {
      handle.releasePointerCapture(e.pointerId);
    }
    document.removeEventListener('pointermove', this.onPointerMoveBound);
    document.removeEventListener('pointerup', this.onPointerUpBound);
    document.removeEventListener('pointercancel', this.onPointerUpBound);
  }

  onKeyDown(e: KeyboardEvent): void {
    let delta = 0;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') delta = 10;
    else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') delta = -10;
    if (delta === 0) return;
    e.preventDefault();
    const newSize = Math.max(this.minSize, Math.min(this.maxSize, this.panelSize + delta));
    this.panelSize = newSize;
    this.resizeEvent.emit([newSize, 100 - (this.isPercentage ? newSize : 0)]);
  }
}
