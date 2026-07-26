import { createContext, useContext, createSignal, type JSX } from "solid-js";
import { createEffect, onCleanup } from "solid-js";

/**
 * A header "slot" is a zero-arg component that renders a single UI element
 * (e.g. a SolidUI <Button />, <Avatar /> or an <img />). Routes pass arrays of
 * these for the left and right sides of the (floating) main header and the
 * bottom floating bar.
 */
export type HeaderSlot = () => JSX.Element;

export interface RouteHeaderConfig {
  left?: HeaderSlot[];
  right?: HeaderSlot[];
}

interface HeaderContextValue {
  header: () => RouteHeaderConfig;
  setHeader: (config: RouteHeaderConfig) => void;
}

const HeaderContext = createContext<HeaderContextValue>();

export function HeaderProvider(props: { children: JSX.Element }) {
  const [header, setHeader] = createSignal<RouteHeaderConfig>({ left: [], right: [] });
  return (
    <HeaderContext.Provider value={{ header, setHeader }}>
      {props.children}
    </HeaderContext.Provider>
  );
}

export function useRouteHeader() {
  const ctx = useContext(HeaderContext);
  if (!ctx) throw new Error("useRouteHeader must be used inside <HeaderProvider>");
  return ctx;
}

/**
 * Called from a route file. It "passes the array" of header actions (an object
 * with a `left` and a `right` array of UI components) which the layout then
 * merges and wraps in the appropriate classes for the floating main header
 * (desktop) and the bottom floating bar (mobile).
 */
export function usePageHeader(config: RouteHeaderConfig) {
  const { setHeader } = useRouteHeader();
  createEffect(() => {
    setHeader({ left: config.left ?? [], right: config.right ?? [] });
    onCleanup(() => setHeader({ left: [], right: [] }));
  });
}
