import { Component } from '@angular/core';
@Component({ selector: 'brkta-message-scroller', standalone: true,
  template: `<div data-brkta-message-scroller=""><ng-content></ng-content></div>`,
}) export class MessageScrollerComponent {}
