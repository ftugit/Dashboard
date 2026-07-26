import { type JSX } from "solid-js";
import { HeaderProvider } from "~/lib/header";
import { ThemeProvider } from "~/lib/theme";
import { Toaster } from "~/components/ui/sonner";

/**
 * Global root: only provides app-wide providers and the toaster. The actual
 * page layouts live in route-group layout files:
 *   - (app)/layout.tsx  → sidebar shell for / and /test
 *   - (auth)/layout.tsx → bare layout for /auth
 * No path-string comparison happens here.
 */
export function RootLayout(props: { children?: JSX.Element }) {
  return (
    <ThemeProvider>
      <HeaderProvider>{props.children}</HeaderProvider>
      <Toaster richColors position="top-center" />
    </ThemeProvider>
  );
}
