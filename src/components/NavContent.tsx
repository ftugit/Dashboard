import { For } from "solid-js";
import { useLocation, useNavigate } from "@solidjs/router";
import { Button } from "~/components/ui/button";

const HomeIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="size-4">
    <path d="M3 9.5L12 3l9 6.5" />
    <path d="M5 10v10h14V10" />
  </svg>
);

const TestIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="size-4">
    <path d="M9 3h6" />
    <path d="M10 3v6l-5 9a2 2 0 0 0 1.8 3h10.4a2 2 0 0 0 1.8-3l-5-9V3" />
  </svg>
);

const AuthIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="size-4">
    <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
    <path d="M10 17l5-5-5-5" />
    <path d="M15 12H3" />
  </svg>
);

const links = [
  { href: "/", label: "Dashboard", icon: HomeIcon },
  { href: "/test", label: "Test", icon: TestIcon },
  { href: "/auth", label: "Auth", icon: AuthIcon }
];

export function NavContent() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <For each={links}>
      {(link) => (
        <Button
          variant="ghost"
          class="w-full justify-start gap-3"
          classList={{ "bg-accent text-accent-foreground": location.pathname === link.href }}
          onClick={() => navigate(link.href)}
        >
          {link.icon}
          {link.label}
        </Button>
      )}
    </For>
  );
}
