import { describe,it,expect,beforeEach } from 'vitest';import { ComponentFixture,TestBed } from '@angular/core/testing';import { MenubarComponent } from './menubar.component';
describe('MenubarComponent',()=>{let f:ComponentFixture<MenubarComponent>;
  beforeEach(async()=>{await TestBed.configureTestingModule({imports:[MenubarComponent]}).compileComponents();f=TestBed.createComponent(MenubarComponent);f.componentRef.setInput('items',[{label:'File',value:'file',children:[{label:'New',value:'new'}]},{label:'Edit',value:'edit'}]);f.detectChanges();});
  it('renders triggers',()=>{expect(f.nativeElement.querySelector('[role="menubar"]')).toBeTruthy();});
  it('renders items',()=>{expect(f.nativeElement.textContent).toContain('File');expect(f.nativeElement.textContent).toContain('Edit');});
});
