import { describe, it, expect, beforeEach } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AccordionComponent } from './accordion.component';

const items = [
  { value: 'item-1', label: 'Section 1', content: 'Content for section one.' },
  { value: 'item-2', label: 'Section 2', content: 'Content for section two.' },
  { value: 'item-3', label: 'Section 3', content: 'Content for section three.', disabled: true },
];

describe('AccordionComponent', () => {
  let component: AccordionComponent;
  let fixture: ComponentFixture<AccordionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccordionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AccordionComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('items', items);
    fixture.detectChanges();
  });

  it('should render all triggers', () => {
    const triggers = fixture.nativeElement.querySelectorAll('[data-brkta-accordion-trigger]');
    expect(triggers.length).toBe(3);
  });

  it('should open a section on click', () => {
    const triggers = fixture.nativeElement.querySelectorAll('[data-brkta-accordion-trigger]');
    (triggers[0] as HTMLElement).click();
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Content for section one.');
  });

  it('should close when clicking again', () => {
    const triggers = fixture.nativeElement.querySelectorAll('[data-brkta-accordion-trigger]');
    (triggers[0] as HTMLElement).click();
    fixture.detectChanges();
    (triggers[0] as HTMLElement).click();
    fixture.detectChanges();
    expect(triggers[0].getAttribute('aria-expanded')).toBe('false');
  });

  it('should support multiple mode', () => {
    fixture.componentRef.setInput('multiple', true);
    fixture.detectChanges();
    const triggers = fixture.nativeElement.querySelectorAll('[data-brkta-accordion-trigger]');
    (triggers[0] as HTMLElement).click();
    (triggers[1] as HTMLElement).click();
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Content for section one.');
    expect(fixture.nativeElement.textContent).toContain('Content for section two.');
  });

  it('should not open disabled items', () => {
    const triggers = fixture.nativeElement.querySelectorAll('[data-brkta-accordion-trigger]');
    (triggers[2] as HTMLElement).click();
    fixture.detectChanges();
    const panels = fixture.nativeElement.querySelectorAll('[data-brkta-accordion-panel]');
    expect(panels[2].hasAttribute('data-open')).toBe(false);
  });

  it('should have correct ARIA attributes', () => {
    const trigger = fixture.nativeElement.querySelector('[data-brkta-accordion-trigger]');
    expect(trigger.getAttribute('aria-expanded')).toBe('false');
    expect(trigger.getAttribute('aria-controls')).toContain('accordion-panel-item-1');
    (trigger as HTMLElement).click();
    fixture.detectChanges();
    expect(trigger.getAttribute('aria-expanded')).toBe('true');
  });

  it('should have data-brkta-accordion on root', () => {
    expect(fixture.nativeElement.querySelector('[data-brkta-accordion]')).toBeTruthy();
  });

  it('should support keyboard navigation', () => {
    const triggers = fixture.nativeElement.querySelectorAll('[data-brkta-accordion-trigger]');
    const event = new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true });
    triggers[0].dispatchEvent(event);
    fixture.detectChanges();
    expect(document.activeElement?.textContent).toContain('Section 2');
  });

  it('should respect defaultValue', async () => {
    const f2 = TestBed.createComponent(AccordionComponent);
    f2.componentRef.setInput('items', items);
    f2.componentRef.setInput('defaultValue', 'item-2');
    f2.detectChanges();
    expect(f2.nativeElement.textContent).toContain('Content for section two.');
  });
});
