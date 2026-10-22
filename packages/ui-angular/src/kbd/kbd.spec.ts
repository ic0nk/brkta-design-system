import { ComponentFixture, TestBed } from '@angular/core/testing';
import { KbdComponent } from './kbd.component';

describe('KbdComponent', () => {
  let component: KbdComponent;
  let fixture: ComponentFixture<KbdComponent>;
  let kbdEl: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KbdComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(KbdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    kbdEl = fixture.nativeElement.querySelector('kbd');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should default keys to empty string', () => {
    expect(component.keys).toBe('');
  });

  it('should render keys text', () => {
    fixture.componentRef.setInput('keys', 'Ctrl+S');
    fixture.detectChanges();
    expect(kbdEl.textContent).toContain('Ctrl+S');
  });

  it('should set data-brkta-kbd', () => {
    expect(kbdEl.hasAttribute('data-brkta-kbd')).toBe(true);
  });

  it('should render a <kbd> element', () => {
    expect(kbdEl.tagName.toLowerCase()).toBe('kbd');
  });
});
