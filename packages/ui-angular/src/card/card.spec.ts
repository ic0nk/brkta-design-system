import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { CardComponent, CardHeaderComponent, CardTitleComponent, CardDescriptionComponent, CardContentComponent, CardFooterComponent } from './card.component';

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;
  let divEl: HTMLDivElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    divEl = fixture.nativeElement.querySelector('div');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should default variant to "default"', () => {
    expect(component.variant).toBe('default');
  });

  it('should set data-brkta-card', () => {
    expect(divEl.hasAttribute('data-brkta-card')).toBe(true);
  });

  it('should reflect default variant', () => {
    expect(divEl.getAttribute('data-variant')).toBe('default');
  });

  it('should reflect custom variant', () => {
    fixture.componentRef.setInput('variant', 'outlined');
    fixture.detectChanges();
    expect(divEl.getAttribute('data-variant')).toBe('outlined');
  });
});

describe('Card sub-components', () => {
  @Component({
    standalone: true,
    imports: [CardHeaderComponent, CardTitleComponent, CardDescriptionComponent, CardContentComponent, CardFooterComponent],
    template: `
      <brkta-card-header>Header</brkta-card-header>
      <brkta-card-title>Title</brkta-card-title>
      <brkta-card-description>Desc</brkta-card-description>
      <brkta-card-content>Content</brkta-card-content>
      <brkta-card-footer>Footer</brkta-card-footer>
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

  it('CardHeader should render with data-brkta-card-header', () => {
    const el = fixture.nativeElement.querySelector('[data-brkta-card-header]');
    expect(el).toBeTruthy();
    expect(el.textContent).toContain('Header');
  });

  it('CardTitle should render <h3> with data-brkta-card-title', () => {
    const el = fixture.nativeElement.querySelector('[data-brkta-card-title]');
    expect(el).toBeTruthy();
    expect(el.tagName.toLowerCase()).toBe('h3');
    expect(el.textContent).toContain('Title');
  });

  it('CardDescription should render <p> with data-brkta-card-description', () => {
    const el = fixture.nativeElement.querySelector('[data-brkta-card-description]');
    expect(el).toBeTruthy();
    expect(el.tagName.toLowerCase()).toBe('p');
    expect(el.textContent).toContain('Desc');
  });

  it('CardContent should render with data-brkta-card-content', () => {
    const el = fixture.nativeElement.querySelector('[data-brkta-card-content]');
    expect(el).toBeTruthy();
    expect(el.textContent).toContain('Content');
  });

  it('CardFooter should render with data-brkta-card-footer', () => {
    const el = fixture.nativeElement.querySelector('[data-brkta-card-footer]');
    expect(el).toBeTruthy();
    expect(el.textContent).toContain('Footer');
  });
});
