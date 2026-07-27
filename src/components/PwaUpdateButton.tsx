import { Button } from "~/components/ui/button";
import { toast } from "solid-sonner";
import { useRegisterSW } from "virtual:pwa-register/solid";

const RefreshIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="size-4">
    <path d="M21 12a9 9 0 1 1-2.64-6.36" />
    <path d="M21 3v6h-6" />
  </svg>
);

/**
 * PWA update button. Uses the Solid virtual module from vite-plugin-pwa.
 * Note: in the Solid variant `needRefresh`/`offlineReady` are returned as
 * Solid signal tuples `[accessor, setter]`, and the update fn is
 * `updateServiceWorker` (not `updateSW`).
 */
export function PwaUpdateButton() {
  const {
    needRefresh: [needRefresh],
    updateServiceWorker
  } = useRegisterSW({
    onNeedRefresh() {
      toast("A new version is available", {
        action: {
          label: "Reload",
          onClick: () => updateServiceWorker(true)
        }
      });
    },
    onOfflineReady() {
      toast.success("App is ready to work offline");
    }
  });

  return (
    <Button
      variant="outline"
      size="sm"
      class="h-9 px-3 text-xs gap-2"
      onClick={() => {
        if (needRefresh()) updateServiceWorker(true);
        else toast("No update available right now");
      }}
    >
      {RefreshIcon}
      Update
    </Button>
  );
}
