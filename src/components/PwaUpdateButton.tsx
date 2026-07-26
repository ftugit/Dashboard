import { createSignal, onMount, Show } from "solid-js";
import { Button } from "~/components/ui/button";
import { toast } from "solid-sonner";

type RegisterSW = {
  needRefresh: () => boolean;
  offlineReady: () => boolean;
  updateSW: (reload?: boolean) => Promise<void>;
};

const RefreshIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="size-4">
    <path d="M21 12a9 9 0 1 1-2.64-6.36" />
    <path d="M21 3v6h-6" />
  </svg>
);

/**
 * Task 3: lets the user install the site as an app (handled by the manifest +
 * service worker from vite-plugin-pwa) and shows a PWA update notification via
 * a toast when a new version is available. The registration is loaded lazily on
 * the client (virtual:pwa-register/solid) so SSR is unaffected.
 */
export function PwaUpdateButton() {
  const [available, setAvailable] = createSignal(false);
  let reg: RegisterSW | undefined;

  onMount(async () => {
    const { useRegisterSW } = await import("virtual:pwa-register/solid");
    reg = useRegisterSW({
      onNeedRefresh() {
        setAvailable(true);
        toast("A new version of the app is available", {
          action: {
            label: "Reload",
            onClick: () => reg?.updateSW(true)
          }
        });
      },
      onOfflineReady() {
        toast.success("App is ready to work offline");
      }
    });
  });

  const onClick = () => {
    if (reg?.needRefresh()) {
      toast("Reloading to the latest version…");
      reg.updateSW(true);
    } else {
      toast.success("You are on the latest version.");
    }
  };

  return (
    <Button variant="outline" size="sm" class="gap-2" onClick={onClick}>
      {RefreshIcon}
      <Show when={available()}>
        <span class="size-2 rounded-full bg-success" />
      </Show>
      Update
    </Button>
  );
}
