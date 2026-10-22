import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  hsvToRgba,
  parseCssColor,
  parseHexColor,
  rgbToHsv,
  rgbaToHex,
  type HsvColor,
  type RgbaColor,
} from '@brkta/ui-core/color-picker/color-picker-contract';

const FALLBACK: RgbaColor = { red: 24, green: 23, blue: 19, alpha: 255 };

@Component({
  selector: 'brkta-color-picker',
  standalone: true,
  styles: [':host { display: block; min-inline-size: 0; }'],
  template: `
    <div
      data-brkta-color-picker=""
      [attr.data-disabled]="disabled ? '' : undefined"
      [style.--brkta-color-picker-value]="hex"
      [style.--brkta-color-picker-hue]="hueColor"
    >
      <button
        data-brkta-color-picker-trigger=""
        type="button"
        [attr.data-open]="open ? '' : undefined"
        [attr.data-invalid]="invalid ? '' : undefined"
        [attr.aria-expanded]="open"
        aria-haspopup="dialog"
        [attr.aria-label]="ariaLabel + ': ' + hex"
        [disabled]="disabled"
        (click)="toggle()"
      >
        <span data-brkta-color-picker-swatch="" aria-hidden="true"></span>
        <span data-brkta-color-picker-value="">{{ hex }}</span>
      </button>

      @if (open) {
        <div data-brkta-color-picker-popover="" role="dialog" [attr.aria-label]="ariaLabel">
          <button
            data-brkta-color-picker-plane=""
            type="button"
            [attr.aria-label]="planeLabel"
            (pointerdown)="setFromPlane($event)"
            (pointermove)="moveOnPlane($event)"
            (keydown)="onPlaneKeydown($event)"
          >
            <span
              data-brkta-color-picker-marker=""
              [style.inset-inline-start.%]="hsv.saturation"
              [style.inset-block-end.%]="hsv.value"
            ></span>
          </button>

          <div data-brkta-color-picker-slider="">
            <label [attr.for]="id + '-hue'">{{ hueLabel }}</label>
            <input
              data-brkta-color-picker-hue=""
              [id]="id + '-hue'"
              type="range"
              min="0"
              max="359"
              [value]="hsv.hue"
              [attr.aria-label]="hueLabel"
              (input)="setHue($event)"
            />
          </div>

          <div data-brkta-color-picker-controls="">
            <label data-brkta-color-picker-control="">
              <span>{{ hexLabel }}</span>
              <input
                [id]="id + '-hex'"
                type="text"
                inputmode="text"
                autocapitalize="off"
                spellcheck="false"
                [value]="hexDraft"
                [attr.aria-label]="hexLabel"
                (input)="setHex($event)"
              />
            </label>
            <span data-brkta-color-picker-swatch="" aria-hidden="true"></span>
          </div>

          <div data-brkta-color-picker-rgb="">
            @for (channel of channels; track channel.key) {
              <label data-brkta-color-picker-control="">
                <span>{{ channel.label }}</span>
                <input
                  type="number"
                  min="0"
                  max="255"
                  inputmode="numeric"
                  [value]="channelValue(channel.key)"
                  [attr.aria-label]="channel.label"
                  (input)="setChannel(channel.key, $event)"
                />
              </label>
            }
          </div>
        </div>
      }
    </div>
  `,
})
export class ColorPickerComponent {
  @Input() value: string | undefined;
  @Input() defaultValue = '#181713';
  @Input() ariaLabel = 'Colour picker';
  @Input() disabled = false;
  @Input() invalid = false;
  @Input() id = '';
  @Input() hexLabel = 'Hex';
  @Input() hueLabel = 'Hue';
  @Input() planeLabel = 'Saturation and brightness';
  @Input() redLabel = 'Red';
  @Input() greenLabel = 'Green';
  @Input() blueLabel = 'Blue';
  @Output() valueChange = new EventEmitter<string>();

  open = false;
  hexDraft = '';
  private internalValue = this.defaultValue;
  private initialized = false;
  get channels(): readonly { key: 'red' | 'green' | 'blue'; label: string }[] {
    return [
      { key: 'red', label: this.redLabel },
      { key: 'green', label: this.greenLabel },
      { key: 'blue', label: this.blueLabel },
    ];
  }

  get currentValue(): string {
    return this.value ?? this.internalValue;
  }

  get color(): RgbaColor {
    return parseCssColor(this.currentValue) ?? FALLBACK;
  }

  get hex(): string {
    return rgbaToHex(this.color);
  }

  get hsv(): HsvColor {
    return rgbToHsv(this.color);
  }

  get hueColor(): string {
    return rgbaToHex(hsvToRgba({ hue: this.hsv.hue, saturation: 100, value: 100 }));
  }

  ngOnChanges(): void {
    if (!this.initialized && this.value === undefined) this.internalValue = this.defaultValue;
    this.hexDraft = this.currentValue;
    this.initialized = true;
  }

  toggle(): void {
    if (!this.disabled) this.open = !this.open;
  }

  setFromPlane(event: PointerEvent): void {
    const target = event.currentTarget as HTMLElement;
    target.setPointerCapture?.(event.pointerId);
    this.updateFromPlane(event, target);
  }

  moveOnPlane(event: PointerEvent): void {
    if ((event.buttons & 1) !== 1) return;
    this.updateFromPlane(event, event.currentTarget as HTMLElement);
  }

  onPlaneKeydown(event: KeyboardEvent): void {
    const delta = event.shiftKey ? 10 : 2;
    const hsv = this.hsv;
    if (event.key === 'ArrowLeft') hsv.saturation -= delta;
    else if (event.key === 'ArrowRight') hsv.saturation += delta;
    else if (event.key === 'ArrowDown') hsv.value -= delta;
    else if (event.key === 'ArrowUp') hsv.value += delta;
    else if (event.key === 'Home') { hsv.saturation = 0; hsv.value = 100; }
    else if (event.key === 'End') { hsv.saturation = 100; hsv.value = 0; }
    else return;
    event.preventDefault();
    this.emitColor(hsvToRgba(hsv, this.color.alpha));
  }

  setHue(event: Event): void {
    this.emitColor(
      hsvToRgba({ ...this.hsv, hue: Number((event.target as HTMLInputElement).value) }, this.color.alpha),
    );
  }

  setHex(event: Event): void {
    this.hexDraft = (event.target as HTMLInputElement).value;
    const next = parseHexColor(this.hexDraft);
    if (next) this.emitColor(next);
  }

  setChannel(channel: 'red' | 'green' | 'blue', event: Event): void {
    const value = Number((event.target as HTMLInputElement).value);
    if (!Number.isFinite(value)) return;
    this.emitColor({ ...this.color, [channel]: value });
  }

  channelValue(channel: 'red' | 'green' | 'blue'): number {
    return this.color[channel];
  }

  private updateFromPlane(event: PointerEvent, target: HTMLElement): void {
    const box = target.getBoundingClientRect();
    if (box.width === 0 || box.height === 0) return;
    this.emitColor(hsvToRgba({
      hue: this.hsv.hue,
      saturation: ((event.clientX - box.left) / box.width) * 100,
      value: (1 - (event.clientY - box.top) / box.height) * 100,
    }, this.color.alpha));
  }

  private emitColor(color: RgbaColor): void {
    const value = rgbaToHex(color);
    if (this.value === undefined) this.internalValue = value;
    this.hexDraft = value;
    this.valueChange.emit(value);
  }
}
