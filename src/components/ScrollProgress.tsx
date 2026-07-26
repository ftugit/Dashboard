import { createSignal, createEffect, onMount } from "solid-js";
import { createScrollPosition } from "@solid-primitives/scroll";

/**
 * Uses the @solid-primitives/scroll plugin (`createScrollPosition`) to render a
 * thin reading-progress bar at the very top of the page. Replaces a hand-rolled
 * scroll event listener + manual rAF throttling.
 */
export function ScrollProgress() {
  const [progress, setProgress] = createSignal(0);

  onMount(() => {
    const pos = createScrollPosition();
    createEffect(() => {
      const max = document.documentElement.scrollHeight - window.innerHeight || 1;
      const pct = (pos.y / max) * 100;
      setProgress(Math.min(100, Math.max(0, pct)));
    });
  });

  return (
    <div class="fixed inset-x-0 top-0 z-50 h-1 bg-transparent">
      <div
        class="h-full bg-primary transition-[width] duration-75 ease-out"
        style={{ width: `${progress()}%` }}
      />
    </div>
  );
}
