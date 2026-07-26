import { Router, Route } from "@solidjs/router";
import { RootLayout } from "~/components/RootLayout";
import AppLayout from "~/layouts/AppLayout";
import AuthLayout from "~/layouts/AuthLayout";
import Dashboard from "~/routes/index";
import Test from "~/routes/test";
import Auth from "~/routes/auth";
import NotFound from "~/routes/404";
import "~/app.css";

/**
 * Routing is configured explicitly so each section plugs in its OWN layout
 * file — no path-string checks anywhere:
 *   / and /test      → AppLayout   (sidebar / floating header / bottom bar)
 *   /auth            → AuthLayout  (bare layout, no chrome)
 * The global root (RootLayout) only provides app-wide providers.
 */
export default function App() {
  return (
    <Router root={RootLayout}>
      <Route path="/" component={AppLayout}>
        <Route path="/" component={Dashboard} />
        <Route path="/test" component={Test} />
      </Route>
      <Route path="/auth" component={AuthLayout}>
        <Route path="/" component={Auth} />
      </Route>
      <Route path="*" component={NotFound} />
    </Router>
  );
}
