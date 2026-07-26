import { createSignal } from "solid-js";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from "~/components/ui/dialog";
import { Button } from "~/components/ui/button";

/**
 * Modal triggered from the dashboard route's header actions. Shown both in the
 * floating main header (desktop) and the bottom floating bar (mobile).
 */
export function DashboardModal() {
  const [open, setOpen] = createSignal(false);

  return (
    <Dialog open={open()} onOpenChange={setOpen}>
      <DialogTrigger as={Button}>Open modal</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Dashboard modal</DialogTitle>
          <DialogDescription>
            This dialog is opened by a button passed from the dashboard route file into the floating
            header / bottom bar.
          </DialogDescription>
        </DialogHeader>
        <p class="text-sm text-muted-foreground">
          The same actions travel to both the desktop header and the mobile bottom bar.
        </p>
        <DialogFooter>
          <Button onClick={() => setOpen(false)}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
