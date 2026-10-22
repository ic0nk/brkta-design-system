import { describe,it,expect,beforeEach } from 'vitest';import { ComponentFixture,TestBed } from '@angular/core/testing';import { Component,signal } from '@angular/core';import { CarouselComponent } from './carousel.component';
describe('CarouselComponent',()=>{let f:ComponentFixture<CarouselComponent>;beforeEach(async()=>{await TestBed.configureTestingModule({imports:[CarouselComponent]}).compileComponents();f=TestBed.createComponent(CarouselComponent);f.detectChanges();});it('renders',()=>{expect(f.nativeElement.hasAttribute('data-brkta-carousel')).toBe(true);});});

@Component({
  standalone: true,
  imports: [CarouselComponent],
  template: `<brkta-carousel [slideCount]="count()"></brkta-carousel>`,
})
class CarouselHostComponent {
  count = signal(0);
}

describe('CarouselComponent indicator dots', () => {
  let host: ComponentFixture<CarouselHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [CarouselHostComponent] }).compileComponents();
    host = TestBed.createComponent(CarouselHostComponent);
  });

  function indicatorCount(): number {
    return host.nativeElement.querySelectorAll('[data-brkta-carousel-indicator]').length;
  }

  it('renders exactly 2 indicator dots for 2 slides', () => {
    host.componentInstance.count.set(2);
    host.detectChanges();
    expect(indicatorCount()).toBe(2);
  });

  it('renders exactly 5 indicator dots for 5 slides', () => {
    host.componentInstance.count.set(5);
    host.detectChanges();
    expect(indicatorCount()).toBe(5);
  });

  it('updates indicator dots reactively when slideCount changes after initial render', () => {
    host.componentInstance.count.set(2);
    host.detectChanges();
    expect(indicatorCount()).toBe(2);

    host.componentInstance.count.set(5);
    host.detectChanges();
    expect(indicatorCount()).toBe(5);

    host.componentInstance.count.set(1);
    host.detectChanges();
    expect(indicatorCount()).toBe(1);
  });
});
