import { describe, it, expect, beforeEach } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ScrollAreaComponent } from './scroll-area.component';

describe('ScrollAreaComponent', () => {
  let fixture: ComponentFixture<ScrollAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScrollAreaComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ScrollAreaComponent);
    fixture.detectChanges();
  });

  it('should have data-brkta-scroll-area', () => {
    expect(fixture.nativeElement.querySelector('[data-brkta-scroll-area]')).toBeTruthy();
  });

  it('should have viewport and content elements', () => {
    expect(fixture.nativeElement.querySelector('[data-brkta-scroll-area-viewport]')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('[data-brkta-scroll-area-content]')).toBeTruthy();
  });

  it('should support horizontal scroll', () => {
    fixture.componentRef.setInput('horizontalScroll', true);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('[data-scroll="horizontal"]')).toBeTruthy();
  });

  it('should apply custom max height', () => {
    fixture.componentRef.setInput('maxHeight', '200px');
    fixture.detectChanges();
    const el = fixture.nativeElement.querySelector('[data-brkta-scroll-area]');
    expect(el.style.getPropertyValue('--scroll-area-max-height')).toBe('200px');
  });
});
