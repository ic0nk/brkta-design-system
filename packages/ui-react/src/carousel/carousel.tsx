'use client';
import { useState, useCallback, type ReactNode, Children } from 'react';

export interface CarouselProps {
  loop?: boolean;
  showControls?: boolean;
  showIndicators?: boolean;
  className?: string;
  children?: ReactNode;
}

export function Carousel({
  loop = false,
  showControls = true,
  showIndicators = true,
  className,
  children,
}: CarouselProps) {
  const slides = Children.toArray(children);
  const count = slides.length;
  const [index, setIndex] = useState(0);

  const goTo = useCallback(
    (i: number) => {
      if (count === 0) return;
      if (loop) {
        setIndex(((i % count) + count) % count);
      } else {
        setIndex(Math.max(0, Math.min(i, count - 1)));
      }
    },
    [count, loop],
  );

  const prev = useCallback(() => goTo(index - 1), [goTo, index]);
  const next = useCallback(() => goTo(index + 1), [goTo, index]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'ArrowLeft') { e.preventDefault(); prev(); }
      if (e.key === 'ArrowRight') { e.preventDefault(); next(); }
    },
    [prev, next],
  );

  const atStart = !loop && index === 0;
  const atEnd = !loop && index === count - 1;

  return (
    <div data-brkta-carousel className={className} role="region" aria-roledescription="carousel" aria-label="Carousel" onKeyDown={handleKeyDown} tabIndex={0}>
      <div data-brkta-carousel-viewport>
        <div data-brkta-carousel-slides style={{ transform: `translateX(-${index * 100}%)` }}>
          {slides.map((slide, i) => (
            <div key={i} data-brkta-carousel-slide role="group" aria-roledescription="slide" aria-label={`Slide ${i + 1} of ${count}`}>
              {slide}
            </div>
          ))}
        </div>
      </div>
      {showControls && (
        <>
          <button
            type="button"
            data-brkta-carousel-control
            data-brkta-carousel-control-prev
            data-disabled={atStart ? '' : undefined}
            aria-label="Previous slide"
            onClick={prev}
            disabled={atStart}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m15 18-6-6 6-6"/></svg>
          </button>
          <button
            type="button"
            data-brkta-carousel-control
            data-brkta-carousel-control-next
            data-disabled={atEnd ? '' : undefined}
            aria-label="Next slide"
            onClick={next}
            disabled={atEnd}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m9 18 6-6-6-6"/></svg>
          </button>
        </>
      )}
      {showIndicators && count > 0 && (
        <div data-brkta-carousel-indicators>
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              data-brkta-carousel-indicator
              data-active={i === index ? '' : undefined}
              aria-label={`Go to slide ${i + 1}`}
              aria-current={i === index ? 'true' : undefined}
              onClick={() => goTo(i)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
