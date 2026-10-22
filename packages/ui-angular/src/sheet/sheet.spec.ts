import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SheetComponent } from './sheet.component';

describe('SheetComponent', () => {
  let component: SheetComponent;
  let fixture: ComponentFixture<SheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [SheetComponent] }).compileComponents();
    fixture = TestBed.createComponent(SheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => expect(component).toBeTruthy());
  it('should default side to right', () => expect(component.side).toBe('right'));
  it('should default size to md', () => expect(component.size).toBe('md'));
  it('should accept all supported sizes', () => {
    for (const size of ['sm', 'md', 'lg', 'xl'] as const) {
      component.size = size;
      expect(component.size).toBe(size);
    }
  });
  it('should accept side input', () => { component.side = 'left'; expect(component.side).toBe('left'); });
  it('should accept logical side input', () => { component.side = 'start'; expect(component.side).toBe('start'); });
  it('should default open to false', () => expect(component.open).toBe(false));
  it('should have closing false by default', () => expect(component.closing).toBe(false));
});

@Component({
  standalone: true,
  imports: [SheetComponent],
  template: `<brkta-sheet [open]="true"><p>Long body</p><div footer>Actions</div></brkta-sheet>`,
})
class SheetHostComponent {}

describe('Sheet projected regions', () => {
  it('renders footer actions outside the scrolling body', async () => {
    await TestBed.configureTestingModule({ imports: [SheetHostComponent] }).compileComponents();
    const fixture = TestBed.createComponent(SheetHostComponent);
    fixture.detectChanges();
    const body = fixture.nativeElement.querySelector('[data-brkta-sheet-body]') as HTMLElement;
    const footer = fixture.nativeElement.querySelector('[data-brkta-sheet-footer]') as HTMLElement;
    expect(body.textContent).toContain('Long body');
    expect(body.textContent).not.toContain('Actions');
    expect(footer.textContent).toContain('Actions');
  });
});
