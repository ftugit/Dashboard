import { Button } from "~/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetDescription
} from "~/components/ui/sheet";
import { NavContent } from "~/components/NavContent";

const MenuIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="size-4">
    <path d="M3 6h18" />
    <path d="M3 12h18" />
    <path d="M3 18h18" />
  </svg>
);

/**
 * The "sidebar button" shown in the mobile bottom bar. Opening it reveals the
 * navigation inside a SolidUI Sheet (drawer). This is the `кнопка-компонент с
 * sidebar` referenced in the task — it lives only on mobile.
 */
export function MobileSidebar() {
  return (
    <Sheet>
      <SheetTrigger as={Button} variant="outline" size="icon" aria-label="Open navigation">
        {MenuIcon}
      </SheetTrigger>
      <SheetContent position="left" class="w-64 p-0">
        <SheetTitle class="sr-only">Navigation</SheetTitle>
        <SheetDescription class="sr-only">Main navigation links</SheetDescription>
        <div class="flex h-14 items-center gap-2 border-b px-4">
          <div class="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold">
            S
          </div>
          <span class="text-sm font-semibold">SolidDash</span>
        </div>
        <nav class="space-y-1 p-3">
          <NavContent />
        </nav>
      </SheetContent>
    </Sheet>
  );
}
