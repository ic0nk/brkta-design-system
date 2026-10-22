import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { BadgeComponent } from './badge.component';

describe('BadgeComponent', () => {
  let component: BadgeComponent;
  let fixture: ComponentFixture<BadgeComponent>;
  let spanEl: HTMLSpanElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BadgeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    spanEl = fixture.nativeElement.querySelector('span');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('defaults', () => {
    it('should default variant to "default"', () => {
      expect(component.variant).toBe('default');
    });

    it('should default size to "md"', () => {
      expect(component.size).toBe('md');
    });
  });

  describe('data attributes', () => {
    it('should set data-brkta-badge', () => {
      expect(spanEl.hasAttribute('data-brkta-badge')).toBe(true);
    });

    it('should reflect default variant', () => {
      expect(spanEl.getAttribute('data-variant')).toBe('default');
    });

    it('should reflect custom variant', () => {
      fixture.componentRef.setInput('variant', 'destructive');
      fixture.detectChanges();
      expect(spanEl.getAttribute('data-variant')).toBe('destructive');
    });

    it('should reflect custom size', () => {
      fixture.componentRef.setInput('size', 'lg');
      fixture.detectChanges();
      expect(spanEl.getAttribute('data-size')).toBe('lg');
    });
  });

  it('should render a <span>', () => {
    expect(spanEl.tagName.toLowerCase()).toBe('span');
  });
});

describe('BadgeComponent content projection', () => {
  @Component({
    standalone: true,
    imports: [BadgeComponent],
    template: `<brkta-badge>Projected</brkta-badge>`,
  })
  class TestHost {}

  let fixture: ComponentFixture<TestHost>;
  let spanEl: HTMLSpanElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHost],
    }).compileComponents();
    fixture = TestBed.createComponent(TestHost);
    fixture.detectChanges();
    spanEl = fixture.nativeElement.querySelector('span');
  });

  it('should project content', () => {
    expect(spanEl.textContent).toContain('Projected');
  });
});
