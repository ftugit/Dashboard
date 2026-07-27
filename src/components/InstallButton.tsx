import { onMount, createSignal, Show } from "solid-js";
import { Button } from "~/components/ui/button";

const InstallIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="size-4">
    <path d="M12 3v12" />
    <path d="m8 11 4 4 4-4" />
    <path d="M4 21h16" />
  </svg>
);

/**
 * Install button. The virtual PWA register (registerType "prompt") suppresses
 * the native install banner, so we capture `beforeinstallprompt` ourselves and
 * trigger `prompt()` from this button. The button only appears once the app is
 * installable.
 */
export function InstallButton() {
  const [promptEvent, setPromptEvent] = createSignal<Event | null>(null);

  onMount(() => {
    window.addEventListener("beforeinstallprompt", (e) => {
      e.preventDefault();
      setPromptEvent(e);
    });
  });

  const install = () => {
    const e = promptEvent() as (Event & { prompt: () => void; userChoice?: Promise<{ outcome: string }> });
    if (!e) return;
    e.prompt();
    e.userChoice?.then((choice) => {
      if (choice?.outcome === "accepted") setPromptEvent(null);
    });
  };

  return (
    <Show when={promptEvent()}>
      <Button variant="outline" size="sm" class="h-9 px-3 text-xs gap-2" onClick={install}>
        {InstallIcon}
        Install
      </Button>
    </Show>
  );
}
