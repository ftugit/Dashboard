import { For } from "solid-js";
import { useRouteHeader } from "~/lib/header";
import { MobileDrawerSidebar } from "~/components/MobileDrawerSidebar";
import { PwaUpdateButton } from "~/components/PwaUpdateButton";
import { InstallButton } from "~/components/InstallButton";
import { ThemeToggle } from "~/components/ThemeToggle";

/**
 * Bottom floating bar (mobile only). It contains the NEW sidebar trigger (a
 * SolidUI Drawer that slides up from the bottom, sized to its content) plus
 * the route-passed header actions (left + right merged), so the buttons that
 * would sit in the desktop main header appear here instead. Hidden on desktop
 * via the `float-bottom` class (`flex md:hidden`).
 */
export function BottomBar() {
  const { header } = useRouteHeader();

  return (
    <div class="float-bottom">
      <MobileDrawerSidebar />
      <For each={[...(header().left ?? []), ...(header().right ?? [])]}>{(Slot) => <Slot />}</For>
      <div class="ml-auto flex items-center gap-2">
        <PwaUpdateButton />
        <InstallButton />
        <ThemeToggle />
      </div>
    </div>
  );
}
