import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrikComponent } from './brik.component';

describe('BrikComponent', () => {
  let component: BrikComponent;
  let fixture: ComponentFixture<BrikComponent>;
  let svg: SVGSVGElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrikComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BrikComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    svg = fixture.nativeElement.querySelector('svg');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set data-brkta-brik', () => {
    expect(svg.hasAttribute('data-brkta-brik')).toBe(true);
  });

  it('should default state to idle', () => {
    expect(svg.getAttribute('data-state')).toBe('idle');
  });

  it('should apply a state', () => {
    fixture.componentRef.setInput('state', 'wave');
    fixture.detectChanges();
    expect(svg.getAttribute('data-state')).toBe('wave');
  });

  it('should be aria-hidden without a label', () => {
    expect(svg.getAttribute('aria-hidden')).toBe('true');
  });

  it('should expose a label as role img', () => {
    fixture.componentRef.setInput('label', 'Brik');
    fixture.detectChanges();
    expect(svg.getAttribute('role')).toBe('img');
    expect(svg.getAttribute('aria-label')).toBe('Brik');
  });
});
