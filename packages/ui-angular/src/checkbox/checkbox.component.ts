import { Component, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'brkta-checkbox',
  standalone: true,
  styles: [':host { display: contents; }'],
  template: `
    <label
      data-brkta-checkbox=""
      [attr.data-disabled]="disabled || undefined"
      [attr.data-invalid]="invalid || undefined"
    >
      <input
        type="checkbox"
        [checked]="checked"
        [disabled]="disabled || undefined"
        [indeterminate]="indeterminate"
        [attr.name]="name"
        [attr.value]="value"
        [attr.aria-describedby]="ariaDescribedBy || undefined"
        (change)="onToggle()"
        #checkboxInput
      />
      <span class="brkta-checkbox-indicator" aria-hidden="true"></span>
      <ng-content></ng-content>
    </label>
  `,
})
export class CheckboxComponent {
  @Input() checked = false;
  @Input() indeterminate = false;
  @Input() disabled = false;
  @Input() invalid = false;
  @Input() required = false;
  @Input() value = '';
  @Input() name = '';
  @Input() ariaDescribedBy = '';
  @Output() checkedChange = new EventEmitter<boolean>();

  @ViewChild('checkboxInput') checkboxInput!: ElementRef<HTMLInputElement>;

  ngAfterViewInit(): void {
    this.updateIndeterminate();
  }

  ngOnChanges(): void {
    this.updateIndeterminate();
  }

  onToggle(): void {
    if (this.disabled) return;
    this.checked = !this.checked;
    this.checkedChange.emit(this.checked);
  }

  private updateIndeterminate(): void {
    if (this.checkboxInput?.nativeElement) {
      this.checkboxInput.nativeElement.indeterminate = this.indeterminate;
    }
  }
}
