import { For } from "solid-js";
import { useRouteHeader } from "~/lib/header";
import { BreakpointBadge } from "~/components/BreakpointBadge";
import { PwaUpdateButton } from "~/components/PwaUpdateButton";
import { InstallButton } from "~/components/InstallButton";
import { ThemeToggle } from "~/components/ThemeToggle";

/**
 * Floating "main header" (desktop only). It renders the route-passed header
 * actions: `left` items on the left, and the global controls + `right` items on
 * the right. Hidden on mobile via the `float-header` class (`hidden md:flex`).
 */
export function FloatingHeader() {
  const { header } = useRouteHeader();

  return (
    <div class="float-header sticky top-4 z-30 mx-4 mt-4 md:mx-8">
      <div class="flex flex-1 items-center gap-2">
        <For each={header().left}>{(Slot) => <Slot />}</For>
      </div>
      <div class="ml-auto flex items-center gap-2">
        <BreakpointBadge />
        <PwaUpdateButton />
        <ThemeToggle />
        <For each={header().right}>{(Slot) => <Slot />}</For>
      </div>
    </div>
  );
}
