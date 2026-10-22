/*
 * BRKTA — Floating scrollbar
 *
 * Framework-agnostic: plain DOM, no React and no Angular. Mount it once per
 * document from whatever your app's root happens to be.
 *
 *   import { mountFloatingScrollbar } from "@brkta/ui-core/scrollbar/floating-scrollbar";
 *   import "@brkta/ui-core/scrollbar/floating-scrollbar.css";
 *
 *   const unmount = mountFloatingScrollbar();
 *
 * Pairs with floating-scrollbar.css, which hides the native scrollbar only
 * once this has run — so no JS means a real scrollbar, not a missing one.
 */

export interface FloatingScrollbarOptions {
  /* Shortest the thumb may get on a very long page. */
  minThumbSize?: number;
}

const MOUNTED_FLAG = "brktaFloatingScrollbar";
let activeMounts = 0;
let cleanupMountedScrollbar: (() => void) | null = null;

export function mountFloatingScrollbar(
  options: FloatingScrollbarOptions = {},
): () => void {
  const noop = () => {};
  if (typeof window === "undefined" || typeof document === "undefined") {
    return noop;
  }

  const root = document.documentElement;
  const host = document.body;
  /* Mounting twice retains the same rail instead of stacking another one. */
  if (!host) return noop;

  if (root.dataset[MOUNTED_FLAG] === "on") {
    if (!cleanupMountedScrollbar) return noop;
    activeMounts += 1;
    let released = false;
    return () => {
      if (released) return;
      released = true;
      activeMounts = Math.max(0, activeMounts - 1);
      if (activeMounts === 0) {
        cleanupMountedScrollbar?.();
        cleanupMountedScrollbar = null;
      }
    };
  }

  const minThumbSize = options.minThumbSize ?? 32;

  const rail = document.createElement("div");
  rail.className = "brkta-scrollbar";
  rail.setAttribute("aria-hidden", "true");
  const thumb = document.createElement("div");
  thumb.className = "brkta-scrollbar-thumb";
  rail.appendChild(thumb);
  host.appendChild(rail);
  root.dataset[MOUNTED_FLAG] = "on";

  let frame = 0;
  let thumbSize = minThumbSize;

  const scrollableDistance = () => root.scrollHeight - window.innerHeight;

  const render = () => {
    frame = 0;
    const distance = scrollableDistance();
    if (distance <= 1) {
      rail.dataset.visible = "false";
      return;
    }
    rail.dataset.visible = "true";
    const railHeight = rail.clientHeight;
    thumbSize = Math.max(
      minThumbSize,
      (window.innerHeight / root.scrollHeight) * railHeight,
    );
    const progress = Math.min(1, Math.max(0, window.scrollY / distance));
    thumb.style.height = `${thumbSize}px`;
    thumb.style.top = `${progress * (railHeight - thumbSize)}px`;
  };

  const schedule = () => {
    if (!frame) frame = window.requestAnimationFrame(render);
  };

  /*
   * Content height changes without a scroll or resize event all the time —
   * images landing, fonts swapping, routes rendering — so the body is watched
   * rather than trusting those two events alone.
   */
  const observer =
    typeof ResizeObserver === "function" ? new ResizeObserver(schedule) : null;
  observer?.observe(host);

  window.addEventListener("scroll", schedule, { passive: true });
  window.addEventListener("resize", schedule);
  render();

  let grabOffset = 0;

  const onPointerMove = (event: PointerEvent) => {
    const railBox = rail.getBoundingClientRect();
    const travel = railBox.height - thumbSize;
    if (travel <= 0) return;
    const top = event.clientY - railBox.top - grabOffset;
    const progress = Math.min(1, Math.max(0, top / travel));
    /*
     * `html` carries scroll-behavior: smooth, which would make a drag chase
     * the pointer half a second behind. Dragging has to be instant.
     */
    window.scrollTo({ top: progress * scrollableDistance(), behavior: "instant" });
  };

  const onPointerUp = () => {
    rail.dataset.dragging = "false";
    window.removeEventListener("pointermove", onPointerMove);
  };

  const onPointerDown = (event: PointerEvent) => {
    if (event.button !== 0) return;
    event.preventDefault();
    grabOffset = event.clientY - thumb.getBoundingClientRect().top;
    rail.dataset.dragging = "true";
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp, { once: true });
  };

  thumb.addEventListener("pointerdown", onPointerDown);

  const cleanup = () => {
    window.removeEventListener("scroll", schedule);
    window.removeEventListener("resize", schedule);
    window.removeEventListener("pointermove", onPointerMove);
    window.removeEventListener("pointerup", onPointerUp);
    thumb.removeEventListener("pointerdown", onPointerDown);
    observer?.disconnect();
    if (frame) window.cancelAnimationFrame(frame);
    rail.remove();
    delete root.dataset[MOUNTED_FLAG];
  };

  cleanupMountedScrollbar = cleanup;
  activeMounts = 1;
  let released = false;
  return () => {
    if (released) return;
    released = true;
    activeMounts = Math.max(0, activeMounts - 1);
    if (activeMounts === 0) {
      cleanupMountedScrollbar?.();
      cleanupMountedScrollbar = null;
    }
  };
}
