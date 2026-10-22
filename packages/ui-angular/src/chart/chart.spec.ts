import { describe,it,expect,beforeEach } from 'vitest';import { ComponentFixture,TestBed } from '@angular/core/testing';import { ChartComponent } from './chart.component';
describe('ChartComponent',()=>{let f:ComponentFixture<ChartComponent>;
  beforeEach(async()=>{await TestBed.configureTestingModule({imports:[ChartComponent]}).compileComponents();f=TestBed.createComponent(ChartComponent);f.detectChanges();});
  it('renders',()=>{expect(f.nativeElement.querySelector('[data-brkta-chart]')).toBeTruthy();});
  it('renders bars',()=>{f.componentRef.setInput('data',[{label:'A',value:50}]);f.detectChanges();expect(f.nativeElement.querySelector('[data-brkta-chart-bar]')).toBeTruthy();});
  it('renders title',()=>{f.componentRef.setInput('title','Sales');f.detectChanges();expect(f.nativeElement.textContent).toContain('Sales');});
});
