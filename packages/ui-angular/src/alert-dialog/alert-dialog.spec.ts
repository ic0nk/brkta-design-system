import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AlertDialogComponent } from './alert-dialog.component';

describe('AlertDialogComponent', () => {
  let component: AlertDialogComponent;
  let fixture: ComponentFixture<AlertDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [AlertDialogComponent] }).compileComponents();
    fixture = TestBed.createComponent(AlertDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('passes a translated pending announcement to its confirmation button', () => {
    fixture.componentRef.setInput('open', true);
    fixture.componentRef.setInput('loading', true);
    fixture.componentRef.setInput('loadingLabel', 'جار التنفيذ');
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.brkta-button-sr-loading')?.textContent).toBe('جار التنفيذ');
  });

  it('should create', () => expect(component).toBeTruthy());
  it('should default destructive to false', () => expect(component.destructive).toBe(false));
  it('should emit confirmAction', () => {
    let emitted = false;
    component.confirmAction.subscribe(() => emitted = true);
    component.confirm();
    expect(emitted).toBe(true);
  });
  it('should emit cancelAction', () => {
    let emitted = false;
    component.cancelAction.subscribe(() => emitted = true);
    component.cancel();
    expect(emitted).toBe(true);
  });
  it('should not emit confirmAction while loading', () => {
    let emitted = false;
    component.loading = true;
    component.confirmAction.subscribe(() => emitted = true);
    component.confirm();
    expect(emitted).toBe(false);
  });
});
