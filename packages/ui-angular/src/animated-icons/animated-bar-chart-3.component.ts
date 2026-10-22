import { Component, Input } from '@angular/core';

@Component({
  selector: 'brkta-animated-bar-chart-3',
  standalone: true,
  template: `<svg class="brkta-icon-motion brkta-icon-motion-bar-chart-3" [attr.width]="size" [attr.height]="size" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 3v18h18"/><path d="M7 16v-3"/><path d="M11 16V8"/><path d="M15 16v-5"/><path d="M19 16V5"/></svg>`,
})
export class AnimatedBarChart3Component {
  @Input() size = 20;
}
