import { NavContent } from "~/components/NavContent";

/**
 * Desktop sidebar. Hidden on mobile via Tailwind's `hidden md:flex` (pure CSS
 * class-based responsive visibility, as required). The same <NavContent /> is
 * reused inside the mobile Sheet (see MobileSidebar).
 */
export function Sidebar() {
  return (
    <aside class="hidden w-64 shrink-0 flex-col border-r bg-card/40 md:flex">
      <div class="flex h-14 items-center gap-2 border-b px-4">
        <div class="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold">
          S
        </div>
        <span class="text-sm font-semibold">SolidDash</span>
      </div>
      <nav class="flex-1 space-y-1 overflow-y-auto p-3">
        <NavContent />
      </nav>
      <div class="border-t p-3 text-xs text-muted-foreground">
        SolidStart · SolidUI · Primitives
      </div>
    </aside>
  );
}
