import { TestBed } from '@angular/core/testing';
import { ThemeToggleComponent } from './theme-toggle.component';

describe('ThemeToggleComponent', () => {
  it('renders distinct governed icons for all three modes', async () => {
    await TestBed.configureTestingModule({ imports: [ThemeToggleComponent] }).compileComponents();
    const fixture = TestBed.createComponent(ThemeToggleComponent);

    fixture.componentRef.setInput('mode', 'system');
    fixture.componentRef.setInput('ariaLabel', 'Use light theme');
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('[data-brkta-button]')?.getAttribute('aria-label')).toBe('Use light theme');
    expect(fixture.nativeElement.querySelector('.brkta-icon-motion-monitor')).toBeTruthy();

    fixture.componentRef.setInput('mode', 'light');
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.brkta-icon-motion-sun')).toBeTruthy();

    fixture.componentRef.setInput('mode', 'dark');
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.brkta-icon-motion-moon')).toBeTruthy();
  });

  it('cycles mode from the ghost icon button', async () => {
    await TestBed.configureTestingModule({ imports: [ThemeToggleComponent] }).compileComponents();
    const fixture = TestBed.createComponent(ThemeToggleComponent);
    fixture.componentRef.setInput('mode', 'system');
    fixture.detectChanges();
    let nextMode = '';
    fixture.componentInstance.modeChange.subscribe((mode) => { nextMode = mode; });

    (fixture.nativeElement.querySelector('[data-brkta-button]') as HTMLButtonElement).click();
    expect(nextMode).toBe('light');
    expect(fixture.nativeElement.querySelector('[data-brkta-toggle]')).toBeNull();
    expect(fixture.nativeElement.querySelector('[data-variant="ghost"]')).toBeTruthy();
  });
});
