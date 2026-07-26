import { Suspense, type JSX } from "solid-js";
import { Sidebar } from "~/components/Sidebar";
import { FloatingHeader } from "~/components/FloatingHeader";
import { BottomBar } from "~/components/BottomBar";
import { ScrollProgress } from "~/components/ScrollProgress";

/**
 * App shell layout — wraps the / and /test routes (the "(app)" route group).
 * Provides the sidebar (desktop), floating header (desktop) and bottom bar
 * (mobile). This is a real layout file plugged in by the router, not a
 * path-string check in the global root.
 */
export default function AppLayout(props: { children?: JSX.Element }) {
  return (
    <div class="flex min-h-screen bg-background text-foreground">
      <Sidebar />
      <div class="flex min-h-screen flex-1 flex-col">
        <FloatingHeader />
        <main class="flex-1 px-4 pb-28 pt-4 md:px-8 md:pb-10">
          <Suspense>{props.children}</Suspense>
        </main>
      </div>
      <BottomBar />
    </div>
  );
}
