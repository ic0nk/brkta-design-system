import { TestBed } from '@angular/core/testing';
import { describe, expect, it } from 'vitest';
import { AnimatedChevronComponent } from './animated-chevron.component';

describe('AnimatedChevronComponent', () => {
  const cases: Array<['left' | 'right' | 'up' | 'down', string]> = [
    ['left', 'm15 18-6-6 6-6'],
    ['right', 'm9 18 6-6-6-6'],
    ['up', 'm18 15-6-6-6 6'],
    ['down', 'm6 9 6 6 6-6'],
  ];

  for (const [direction, path] of cases) {
    it(`renders the ${direction} path`, () => {
      const fixture = TestBed.createComponent(AnimatedChevronComponent);
      fixture.componentRef.setInput('direction', direction);
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('path')?.getAttribute('d')).toBe(path);
    });
  }
});
