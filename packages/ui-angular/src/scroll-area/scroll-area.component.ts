import { Component, Input } from '@angular/core';

@Component({
  selector: 'brkta-scroll-area',
  standalone: true,
  template: `
    <div
      data-brkta-scroll-area=""
      [attr.data-scroll]="horizontalScroll ? 'horizontal' : undefined"
      [style.--scroll-area-max-height]="maxHeight"
      [style.--scroll-area-max-width]="maxWidth"
    >
      <div data-brkta-scroll-area-viewport="">
        <div data-brkta-scroll-area-content="">
          <ng-content></ng-content>
        </div>
      </div>
    </div>
  `,
})
export class ScrollAreaComponent {
  @Input() maxHeight = '300px';
  @Input() maxWidth = '100%';
  @Input() horizontalScroll = false;
}
