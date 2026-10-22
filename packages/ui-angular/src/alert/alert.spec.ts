import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { AlertComponent, AlertTitleComponent, AlertDescriptionComponent } from './alert.component';

describe('AlertComponent', () => {
  let component: AlertComponent;
  let fixture: ComponentFixture<AlertComponent>;
  let divEl: HTMLDivElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlertComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    divEl = fixture.nativeElement.querySelector('div');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should default variant to "information"', () => {
    expect(component.variant).toBe('information');
  });

  it('should set data-brkta-alert', () => {
    expect(divEl.hasAttribute('data-brkta-alert')).toBe(true);
  });

  it('should reflect default variant', () => {
    expect(divEl.getAttribute('data-variant')).toBe('information');
  });

  it('should reflect custom variant', () => {
    fixture.componentRef.setInput('variant', 'destructive');
    fixture.detectChanges();
    expect(divEl.getAttribute('data-variant')).toBe('destructive');
  });

  it('should have role="alert"', () => {
    expect(divEl.getAttribute('role')).toBe('alert');
  });
});

describe('Alert sub-components', () => {
  @Component({
    standalone: true,
    imports: [AlertTitleComponent, AlertDescriptionComponent],
    template: `
      <brkta-alert-title>Title</brkta-alert-title>
      <brkta-alert-description>Desc</brkta-alert-description>
    `,
  })
  class TestHost {}

  let fixture: ComponentFixture<TestHost>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHost],
    }).compileComponents();
    fixture = TestBed.createComponent(TestHost);
    fixture.detectChanges();
  });

  it('AlertTitle should render <h5> with data-brkta-alert-title', () => {
    const el = fixture.nativeElement.querySelector('[data-brkta-alert-title]');
    expect(el).toBeTruthy();
    expect(el.tagName.toLowerCase()).toBe('h5');
    expect(el.textContent).toContain('Title');
  });

  it('AlertDescription should render with data-brkta-alert-description', () => {
    const el = fixture.nativeElement.querySelector('[data-brkta-alert-description]');
    expect(el).toBeTruthy();
    expect(el.textContent).toContain('Desc');
  });
});
