import { type JSX } from "solid-js";

/**
 * Reusable layout for routes that don't need the app chrome (sidebar, floating
 * header, bottom bar). Just a full-screen, theme-aware surface. Plug it into
 * any route, e.g. the /auth page.
 */
export function BareLayout(props: { children?: JSX.Element }) {
  return (
    <div class="flex min-h-screen flex-col bg-background text-foreground">{props.children}</div>
  );
}
