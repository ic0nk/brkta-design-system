import { describe,it,expect,beforeEach } from 'vitest';import { ComponentFixture,TestBed } from '@angular/core/testing';import { ContextMenuComponent } from './context-menu.component';
describe('ContextMenuComponent',()=>{let c:ContextMenuComponent;let f:ComponentFixture<ContextMenuComponent>;
  beforeEach(async()=>{await TestBed.configureTestingModule({imports:[ContextMenuComponent]}).compileComponents();f=TestBed.createComponent(ContextMenuComponent,{providers:[]});c=f.componentInstance;f.componentRef.setInput('items',[{label:'Edit',value:'edit',shortcut:'⌘E'},{label:'Delete',value:'delete',destructive:true},{type:'separator'},{label:'Archive',value:'archive',disabled:true}]);f.detectChanges();});
  it('renders item text from input',()=>{expect(c.items.length).toBe(4);expect(c.items[0].label).toBe('Edit');expect(c.items[3].label).toBe('Archive');});
  it('can set open property',()=>{c.open=true;expect(c.open).toBe(true);});
});
