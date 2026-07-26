import { type JSX } from "solid-js";

/**
 * Lightweight header row used by the /auth template. It is meant to sit
 * directly ABOVE the card (inside the centered column), not as a full-width
 * bar pinned to the top of the window. Like the route header it accepts
 * `left`/`right` elements so callers can pass in controls such as Back.
 */
export function AuthHeader(props: { left?: JSX.Element; right?: JSX.Element }) {
  return (
    <div class="flex items-center justify-between gap-2">
      <div class="flex items-center gap-2">{props.left}</div>
      <div class="flex items-center gap-2">{props.right}</div>
    </div>
  );
}
