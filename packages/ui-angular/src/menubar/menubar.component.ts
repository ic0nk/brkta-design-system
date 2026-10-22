import { Component, Input, Output, EventEmitter, HostListener } from '@angular/core';

@Component({ selector: 'brkta-menubar', standalone: true,
  template: `
    <div data-brkta-menubar="" role="menubar">
      @for (item of items; track item.value) {
        <div style="position:relative">
          <button data-brkta-menubar-trigger="" [attr.data-open]="openMenu===item.value?'':undefined" [attr.data-disabled]="item.disabled?'':undefined"
            [disabled]="item.disabled" (click)="toggle(item.value)" (keydown)="onTriggerKeydown($event, item)" role="menuitem" [attr.aria-haspopup]="item.children?'true':undefined">{{item.label}}</button>
          @if (openMenu===item.value && item.children) {
            <div data-brkta-menubar-content="" role="menu">
              @for (c of item.children; track c.value) {
                <div data-brkta-menubar-item="" [attr.data-disabled]="c.disabled?'':undefined" role="menuitem"
                  [tabindex]="c.disabled?-1:0" (click)="select(c.value)" (keydown)="onItemKeydown($event, c.value)">{{c.label}}</div>
              }
            </div>
          }
        </div>
      }
    </div>`,
})
export class MenubarComponent {
  @Input() items: any[] = [];
  @Output() selectEvent = new EventEmitter<string>();
  openMenu: string|null = null;

  toggle(v:string){this.openMenu=this.openMenu===v?null:v;}
  select(v:string){this.selectEvent.emit(v);this.openMenu=null;}

  onTriggerKeydown(e:KeyboardEvent, item:any){
    if(e.key==='ArrowRight'){e.preventDefault();const idx=this.items.indexOf(item);if(idx<this.items.length-1)this.toggle(this.items[idx+1].value);}
    if(e.key==='ArrowLeft'){e.preventDefault();const idx=this.items.indexOf(item);if(idx>0)this.toggle(this.items[idx-1].value);}
    if(e.key==='Escape'){e.preventDefault();this.openMenu=null;}
  }

  onItemKeydown(e:KeyboardEvent, v:string){
    if(e.key==='Enter'){e.preventDefault();this.select(v);}
    if(e.key==='Escape'){e.preventDefault();this.openMenu=null;}
  }

  @HostListener('document:mousedown', ['$event'])
  onDocClick(e:MouseEvent){
    const el=e.target as HTMLElement;
    if(this.openMenu && !el.closest('[data-brkta-menubar]')) this.openMenu=null;
  }

  @HostListener('document:keydown.escape')
  onDocEscape(){this.openMenu=null;}
}
