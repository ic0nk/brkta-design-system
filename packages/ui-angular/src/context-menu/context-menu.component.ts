import { Component, Input, HostListener } from '@angular/core';

@Component({ selector: 'brkta-context-menu', standalone: true,
  template: `
    <div data-brkta-context-menu="" (contextmenu)="onContext($event)" style="display:contents"><ng-content /></div>
    @if (open) {
      <div data-brkta-context-menu-list="" role="menu" [style.left.px]="posX" [style.top.px]="posY" style="position:fixed">
        @for (it of items; track $index) {
          @if (it.type==='separator') { <div data-brkta-context-menu-separator="" role="separator"></div> }
          @else {
            <div data-brkta-context-menu-item="" [attr.data-disabled]="it.disabled?'':undefined" [attr.data-destructive]="it.destructive?'':undefined"
              role="menuitem" (click)="select(it.value)">
              <span>{{it.label}}</span>
              @if (it.shortcut) { <span data-brkta-context-menu-shortcut="">{{it.shortcut}}</span> }
            </div>
          }
        }
      </div>
    }`,
})
export class ContextMenuComponent {
  @Input() items: any[] = [];
  open = false; posX = 0; posY = 0;

  onContext(e:MouseEvent){e.preventDefault();this.posX=e.clientX;this.posY=e.clientY;this.open=true;}
  select(v:string){this.open=false;}

  @HostListener('document:click') onDocClick(){if(this.open)this.open=false;}
}
