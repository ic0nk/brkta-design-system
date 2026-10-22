import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PasswordStrengthComponent } from './password-strength.component';

describe('PasswordStrengthComponent', () => {
  let fixture: ComponentFixture<PasswordStrengthComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [PasswordStrengthComponent] }).compileComponents();
    fixture = TestBed.createComponent(PasswordStrengthComponent);
    fixture.componentRef.setInput('score', 3);
    fixture.componentRef.setInput('label', 'Password strength');
    fixture.componentRef.setInput('description', 'Good');
    fixture.detectChanges();
  });
  it('announces the status and delegates progress semantics', () => {
    expect(fixture.nativeElement.querySelector('[data-brkta-password-strength]')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('[role="progressbar"]')?.getAttribute('aria-valuenow')).toBe('3');
    expect(fixture.nativeElement.querySelector('[role="status"]')?.textContent).toContain('Password strength: Good');
  });
});
