import { TestBed } from '@angular/core/testing';
import { describe, expect, it } from 'vitest';
import { AnimatedMessageCircleComponent } from './animated-message-circle.component';
import { AnimatedInboxComponent } from './animated-inbox.component';
import { isSupportedIconName } from './supported-icons';
import { SidebarComponent } from '../sidebar/sidebar.component';

describe('messaging icons', () => {
  for (const [name, component] of [
    ['message-circle', AnimatedMessageCircleComponent],
    ['inbox', AnimatedInboxComponent],
  ] as const) {
    it(`registers ${name} and renders a decorative currentColor SVG`, () => {
      expect(isSupportedIconName(name)).toBe(true);
      const fixture = TestBed.createComponent(component);
      fixture.detectChanges();
      const svg = fixture.nativeElement.querySelector('svg');
      expect(svg.getAttribute('class')).toContain(`brkta-icon-motion-${name}`);
      expect(svg.getAttribute('stroke')).toBe('currentColor');
      expect(svg.getAttribute('aria-hidden')).toBe('true');
      expect(svg.getAttribute('width')).toBe('20');
      expect(svg.getAttribute('viewBox')).toBe('0 0 24 24');
    });

    it(`honours ${name} size and uses the Lucide geometry`, () => {
      const fixture = TestBed.createComponent(component);
      fixture.componentRef.setInput('size', 32);
      fixture.detectChanges();
      const svg = fixture.nativeElement.querySelector('svg');
      expect(svg.getAttribute('height')).toBe('32');
      expect(svg.querySelector('path').getAttribute('d')).toBe(name === 'message-circle'
        ? 'M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719'
        : 'M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z');
      if (name === 'inbox') {
        expect(svg.querySelector('polyline').getAttribute('points')).toBe('22 12 16 12 14 15 10 15 8 12 2 12');
      }
    });

    it(`renders ${name} in an embedded sidebar item`, () => {
      const fixture = TestBed.createComponent(SidebarComponent);
      fixture.componentRef.setInput('variant', 'embedded');
      fixture.componentRef.setInput('items', [{ value: name, label: name, icon: name }]);
      fixture.detectChanges();
      expect(fixture.nativeElement.querySelector(`[data-brkta-sidebar-item-icon] brkta-animated-${name} svg`)).toBeTruthy();
    });
  }
});
