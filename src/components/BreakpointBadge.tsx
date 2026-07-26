import { createMediaQuery } from "@solid-primitives/media";
import { Badge } from "~/components/ui/badge";

/**
 * Uses the @solid-primitives/media plugin (`createMediaQuery`) to show the
 * current layout mode. Genuinely drives UI state from a media query instead of
 * re-implementing matchMedia listeners by hand.
 */
export function BreakpointBadge() {
  const isDesktop = typeof window !== "undefined" ? createMediaQuery("(min-width: 768px)") : () => true;
  return (
    <Badge variant="secondary" class="hidden sm:inline-flex">
      {isDesktop() ? "Desktop" : "Mobile"}
    </Badge>
  );
}
