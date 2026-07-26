import { Suspense, type JSX } from "solid-js";
import { useLocation } from "@solidjs/router";
import { HeaderProvider } from "~/lib/header";
import { ThemeProvider } from "~/lib/theme";
import { Sidebar } from "~/components/Sidebar";
import { FloatingHeader } from "~/components/FloatingHeader";
import { BottomBar } from "~/components/BottomBar";
import { ScrollProgress } from "~/components/ScrollProgress";
import { Toaster } from "~/components/ui/sonner";

export function RootLayout(props: { children?: JSX.Element }) {
  const loc = useLocation();
  const isAuth = () => loc.pathname.startsWith("/auth");

  return (
    <ThemeProvider>
      <HeaderProvider>
        <ScrollProgress />
        {/*
          `props.children` (the matched route) must be referenced directly in
          JSX and exactly once — capturing it into a variable or passing it
          through both branches of <Show> empties it during SSR. For /auth we
          render ONLY the route (no sidebar / header / bottom bar in the DOM);
          every other route gets the full app shell.
        */}
        {isAuth() ? (
          <Suspense>{props.children}</Suspense>
        ) : (
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
        )}
        <Toaster richColors position="top-center" />
      </HeaderProvider>
    </ThemeProvider>
  );
}
