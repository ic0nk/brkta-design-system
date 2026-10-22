import {
  Component,
  ElementRef,
  HostListener,
  Input,
  OnChanges,
  Output,
  EventEmitter,
  SimpleChanges,
  inject,
} from '@angular/core';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'brkta-alert-dialog',
  standalone: true,
  imports: [ButtonComponent],
  styles: [':host { display: contents; }'],
  template: `
    <span (click)="open=true"><ng-content select="[trigger]"></ng-content></span>
    @if (open || closing) {
      <div #overlay data-brkta-dialog-overlay="" [attr.data-closing]="closing ? '' : undefined"
        (click)="onOverlayClick($event)" role="presentation">
        <div #content data-brkta-dialog-content="" [attr.data-closing]="closing ? '' : undefined"
          (keydown)="onContentKeydown($event)"
          role="alertdialog" aria-modal="true" aria-labelledby="adlg-title" aria-describedby="adlg-desc">
          <div data-brkta-dialog-header="">
            <h2 data-brkta-dialog-title="" id="adlg-title">{{ title }}</h2>
            <p data-brkta-dialog-description="" id="adlg-desc">{{ description }}</p>
          </div>
          <div data-brkta-dialog-footer="">
            <brkta-button variant="outline" size="sm" (click)="cancel()">{{ cancelLabel }}</brkta-button>
            <brkta-button [variant]="destructive ? 'destructive' : 'primary'" size="sm"
              [loading]="loading" [loadingLabel]="loadingLabel" [disabled]="disabled" (click)="confirm()">{{ confirmLabel }}</brkta-button>
          </div>
        </div>
      </div>
    }
  `,
})
export class AlertDialogComponent implements OnChanges {
  @Input() open = false;
  @Input() title = '';
  @Input() description = '';
  @Input() cancelLabel = 'Cancel';
  @Input() confirmLabel = 'Continue';
  @Input() destructive = false;
  @Input() loading = false;
  @Input() loadingLabel = 'Loading, please wait...';
  @Input() disabled = false;
  @Input() closeOnConfirm = true;
  @Output() openChange = new EventEmitter<boolean>();
  @Output() confirmAction = new EventEmitter<void>();
  @Output() cancelAction = new EventEmitter<void>();
  closing = false;
  private readonly el = inject(ElementRef<HTMLElement>);
  private previouslyFocused: HTMLElement | null = null;
  private wasOpen = false;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['open']?.currentValue === true && !this.wasOpen) {
      this.previouslyFocused = document.activeElement instanceof HTMLElement ? document.activeElement : null;
      this.wasOpen = true;
      queueMicrotask(() => this.focusInitial());
    } else if (changes['open']?.currentValue === false && this.wasOpen && !this.closing) {
      this.restoreFocus();
    }
  }

  confirm(): void {
    if (this.loading || this.disabled || this.closing) return;
    this.confirmAction.emit();
    if (this.closeOnConfirm) this.closeDialog();
  }

  cancel(): void {
    if (this.closing) return;
    this.cancelAction.emit();
    this.closeDialog();
  }

  closeDialog(): void {
    if (this.closing) return;
    this.closing = true;
    setTimeout(() => {
      this.open = false;
      this.closing = false;
      this.openChange.emit(false);
      this.restoreFocus();
    }, 200);
  }

  onOverlayClick(e: MouseEvent): void { if (e.target === e.currentTarget) this.cancel(); }

  onContentKeydown(e: KeyboardEvent): void {
    if (e.key !== 'Tab') return;
    const focusables = this.focusableElements();
    if (!focusables.length) return;
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  }

  @HostListener('document:keydown', ['$event'])
  onEscape(e: KeyboardEvent): void { if (e.key === 'Escape' && this.open && !this.closing && !this.loading) this.cancel(); }

  private focusInitial(): void { this.focusableElements()[0]?.focus(); }
  private focusableElements(): HTMLElement[] {
    const host = this.el.nativeElement as HTMLElement;
    return Array.from(host.querySelectorAll('button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])')) as HTMLElement[];
  }
  private restoreFocus(): void {
    if (!this.wasOpen) return;
    this.wasOpen = false;
    this.previouslyFocused?.focus();
    this.previouslyFocused = null;
  }
}
