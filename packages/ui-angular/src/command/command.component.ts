import { Component, Input, Output, EventEmitter, HostListener } from '@angular/core';

@Component({ selector: 'brkta-command', standalone: true,
  template: `
    <div data-brkta-command="">
      <input #inputEl data-brkta-command-input="" [value]="q" [placeholder]="placeholder"
        (input)="onInput($event)" (keydown)="onKeyDown($event)" (focus)="setOpen(true)" />
      @if (isOpen) {
        <div data-brkta-command-list="" role="listbox">
          @if (filtered.length===0) { <div data-brkta-command-empty="">{{emptyText}}</div> }
          @else {
            @for (it of filtered; track it.value; let i=$index) {
              <div data-brkta-command-item="" [attr.data-active]="i===active?'':undefined" [attr.data-disabled]="it.disabled?'':undefined"
                (click)="!it.disabled&&select(it.value)" role="option">
                <span>{{it.label}}</span>
                @if (it.shortcut) { <span data-brkta-command-item-shortcut="">{{it.shortcut}}</span> }
              </div>
            }
          }
        </div>
      }
    </div>`,
})
export class CommandComponent {
  @Input() items: {value:string;label:string;shortcut?:string;disabled?:boolean}[] = [];
  @Input() placeholder = 'Type a command...';
  @Input() emptyText = 'No results.';
  @Input() open: boolean|undefined;
  @Output() openChange = new EventEmitter<boolean>();
  @Output() selectEvent = new EventEmitter<string>();

  q = ''; active = 0; internalOpen = false;
  get isOpen() { return this.open??this.internalOpen; }
  get filtered() { return this.items.filter(i=>i.label.toLowerCase().includes(this.q.toLowerCase())); }

  setOpen(o:boolean){this.internalOpen=o;this.openChange.emit(o);}
  onInput(e:Event){this.q=(e.target as HTMLInputElement).value;this.active=0;if(!this.isOpen)this.setOpen(true);}
  select(v:string){this.selectEvent.emit(v);this.setOpen(false);this.q='';}

  onKeyDown(e:KeyboardEvent){
    if(e.key==='ArrowDown'){e.preventDefault();this.active=Math.min(this.active+1,this.filtered.length-1);}
    else if(e.key==='ArrowUp'){e.preventDefault();this.active=Math.max(this.active-1,0);}
    else if(e.key==='Enter'){e.preventDefault();if(this.filtered[this.active])this.select(this.filtered[this.active].value);}
    else if(e.key==='Escape'){this.setOpen(false);}
  }

  @HostListener('document:keydown.control.k', ['$event'])
  @HostListener('document:keydown.meta.k', ['$event'])
  onGlobalShortcut(e: Event){e.preventDefault();this.setOpen(!this.isOpen);setTimeout(()=>{const el=document.querySelector('[data-brkta-command-input]') as HTMLInputElement;if(el&&this.isOpen)el.focus();},0);}
}
