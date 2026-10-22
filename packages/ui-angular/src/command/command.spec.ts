import { describe,it,expect,beforeEach } from 'vitest';import { ComponentFixture,TestBed } from '@angular/core/testing';import { CommandComponent } from './command.component';
describe('CommandComponent',()=>{let f:ComponentFixture<CommandComponent>;
  beforeEach(async()=>{await TestBed.configureTestingModule({imports:[CommandComponent]}).compileComponents();f=TestBed.createComponent(CommandComponent);f.componentRef.setInput('items',[{value:'a',label:'Apple'},{value:'b',label:'Banana',disabled:true}]);f.detectChanges();});
  it('renders input',()=>{expect(f.nativeElement.querySelector('[data-brkta-command-input]')).toBeTruthy();});
  it('opens list on focus',()=>{const i=f.nativeElement.querySelector('[data-brkta-command-input]');i.dispatchEvent(new Event('focus',{bubbles:true}));f.detectChanges();expect(f.nativeElement.querySelector('[data-brkta-command-list]')).toBeTruthy();});
  it('shows open state list',()=>{f.componentRef.setInput('open',true);f.detectChanges();expect(f.nativeElement.querySelector('[data-brkta-command-list]')).toBeTruthy();});
  it('shows empty state',()=>{f.componentRef.setInput('open',true);f.componentRef.setInput('items',[]);f.componentRef.setInput('emptyText','Nothing here');f.detectChanges();expect(f.nativeElement.textContent).toContain('Nothing here');});
});
