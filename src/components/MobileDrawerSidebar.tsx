import { createSignal } from "solid-js";
import { Button } from "~/components/ui/button";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerClose,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription
} from "~/components/ui/drawer";
import { NavContent } from "~/components/NavContent";

const MenuIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="size-4">
    <path d="M3 6h18" />
    <path d="M3 12h18" />
    <path d="M3 18h18" />
  </svg>
);

/**
 * NEW mobile navigation: a SolidUI Drawer that slides up from the bottom and is
 * only as tall as its content (h-auto). Used as the sidebar trigger in the
 * bottom bar. The previous Sheet-based variant is kept in MobileSidebar.tsx.
 */
export function MobileDrawerSidebar() {
  const [open, setOpen] = createSignal(false);

  return (
    <Drawer open={open()} onOpenChange={setOpen}>
      <DrawerTrigger as={Button} variant="outline" size="icon" aria-label="Open navigation">
        {MenuIcon}
      </DrawerTrigger>
      <DrawerContent class="max-h-[85vh]">
        <DrawerHeader class="sr-only">
          <DrawerTitle>Navigation</DrawerTitle>
          <DrawerDescription>Main navigation links</DrawerDescription>
        </DrawerHeader>
        <div class="p-3">
          <NavContent />
        </div>
        <DrawerClose as={Button} variant="outline" class="m-3 mt-0">
          Close
        </DrawerClose>
      </DrawerContent>
    </Drawer>
  );
}
