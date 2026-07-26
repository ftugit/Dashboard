import { type JSX } from "solid-js";
import { BareLayout } from "~/components/BareLayout";

/**
 * Auth layout — wraps the /auth route (the "(auth)" route group). Uses the
 * reusable BareLayout so there is no app chrome (sidebar / header / bottom
 * bar). This is a separate layout file chosen by the router for this group.
 */
export default function AuthLayout(props: { children?: JSX.Element }) {
  return <BareLayout>{props.children}</BareLayout>;
}
