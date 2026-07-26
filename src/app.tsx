import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { RootLayout } from "~/components/RootLayout";
import "~/app.css";

export default function App() {
  return (
    <Router root={RootLayout}>
      <FileRoutes />
    </Router>
  );
}
