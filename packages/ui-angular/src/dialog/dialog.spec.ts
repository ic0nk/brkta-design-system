import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DialogComponent } from './dialog.component';

describe('DialogComponent', () => {
  let component: DialogComponent;
  let fixture: ComponentFixture<DialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [DialogComponent] }).compileComponents();
    fixture = TestBed.createComponent(DialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('accepts a translated closeLabel', () => {
    fixture.componentRef.setInput('closeLabel', 'إغلاق');
    fixture.componentRef.setInput('open', true);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('[data-brkta-dialog-close]').getAttribute('aria-label')).toBe('إغلاق');
  });

  it('should create', () => expect(component).toBeTruthy());
  it('focuses after the internal trigger renders the dialog content', async () => {
    const trigger = fixture.nativeElement.querySelector('span') as HTMLSpanElement;
    trigger.click(); fixture.detectChanges(); await fixture.whenStable();
    expect(document.activeElement).toBe(fixture.nativeElement.querySelector('[data-brkta-dialog-close]'));
  });
  it('focuses the modal, traps Tab and restores the opener on external close', async () => {
    const opener = document.createElement('button');
    document.body.appendChild(opener); opener.focus();
    fixture.componentRef.setInput('open', true); fixture.detectChanges();
    await Promise.resolve();
    const close = fixture.nativeElement.querySelector('[data-brkta-dialog-close]') as HTMLButtonElement;
    expect(document.activeElement).toBe(close);
    const last = document.createElement('button');
    fixture.nativeElement.querySelector('[data-brkta-dialog-content]').appendChild(last); last.focus();
    const forward = new KeyboardEvent('keydown', { key: 'Tab', cancelable: true });
    component.trapFocus(forward);
    expect(forward.defaultPrevented).toBe(true); expect(document.activeElement).toBe(close);
    const backward = new KeyboardEvent('keydown', { key: 'Tab', shiftKey: true, cancelable: true });
    component.trapFocus(backward);
    expect(backward.defaultPrevented).toBe(true); expect(document.activeElement).toBe(last);
    fixture.componentRef.setInput('open', false); fixture.detectChanges();
    expect(document.activeElement).toBe(opener); opener.remove();
  });
  it('should default open to false', () => expect(component.open).toBe(false));
  it('should set open when true', () => { component.open = true; expect(component.open).toBe(true); });
  it('should have closing false by default', () => expect(component.closing).toBe(false));
  it('should emit openChange on close', (done) => {
    component.openChange.subscribe(v => { expect(v).toBe(false); done(); });
    component.open = true;
    component.close();
  });
});
