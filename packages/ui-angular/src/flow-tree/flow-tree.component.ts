import { Component, Input } from '@angular/core';

@Component({
  selector: 'brkta-flow-tree',
  standalone: true,
  template: `
    <svg data-brkta-flow-tree="" [attr.viewBox]="viewBox" preserveAspectRatio="none" aria-hidden="true">
      <path data-brkta-flow-tree-stem="" [attr.d]="stemPath"></path>
      @for (path of limbPaths; track $index) {
        <path data-brkta-flow-tree-limb="" [attr.d]="path"></path>
      }
    </svg>
  `,
})
export class FlowTreeComponent {
  @Input() viewBox = '0 0 100 100';
  @Input() stemPath = '';
  @Input() limbPaths: readonly string[] = [];
}
