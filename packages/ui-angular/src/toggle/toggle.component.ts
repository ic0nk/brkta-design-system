import { Component, Input, output } from '@angular/core';

@Component({
  selector: 'brkta-toggle',
  standalone: true,
  template: '<ng-content></ng-content>',
  host: {
    '[attr.data-brkta-toggle]': '""',
    '[attr.data-pressed]': 'pressed ? "" : null',
    '[attr.data-disabled]': 'disabled ? "" : null',
    '[attr.aria-pressed]': 'pressed',
    '[attr.aria-label]': 'ariaLabel || null',
    '[attr.disabled]': 'disabled ? "" : null',
    '[attr.tabindex]': 'disabled ? -1 : 0',
    '(click)': 'togglePressed()',
    '(keydown.enter)': 'handleKeydown($event)',
    '(keydown.space)': 'handleKeydown($event)',
    'role': 'button',
  },
  styles: [`
    :host { display: inline-flex; align-items: center; justify-content: center; padding: var(--space-2) var(--space-3); border-radius: var(--radius-md); border: 1px solid var(--border); background: var(--card); color: var(--muted-foreground); font-size: 0.875rem; cursor: pointer; transition: all var(--duration-fast) var(--ease-out); font-family: var(--font-sans); min-height: 36px; }
    :host(:hover) { background: var(--muted); color: var(--foreground); }
    :host([data-pressed]) { background: var(--primary); color: var(--primary-foreground); border-color: var(--primary); }
    :host([data-disabled]) { opacity: 0.4; pointer-events: none; }
    :host(:focus-visible) { outline: 2px solid var(--ring); outline-offset: 2px; }
  `],
})
export class ToggleComponent {
  @Input() pressed = false;
  @Input() disabled = false;
  @Input() ariaLabel?: string;
  readonly pressedChange = output<boolean>();

  handleKeydown(event: Event): void {
    event.preventDefault();
    this.togglePressed();
  }

  togglePressed(): void {
    if (this.disabled) return;
    this.pressed = !this.pressed;
    this.pressedChange.emit(this.pressed);
  }
}
