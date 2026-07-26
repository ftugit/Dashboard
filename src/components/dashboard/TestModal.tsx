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
import { TextField, TextFieldInput } from "~/components/ui/text-field";

/**
 * Different modal triggered from the /test route's header actions, proving each
 * route passes its own set of buttons into the header.
 */
export function TestModal() {
  const [open, setOpen] = createSignal(false);

  return (
    <Dialog open={open()} onOpenChange={setOpen}>
      <DialogTrigger as={Button} variant="secondary">
        Test action
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Test route modal</DialogTitle>
          <DialogDescription>
            A different button/modal coming from the /test route file.
          </DialogDescription>
        </DialogHeader>
        <TextField>
          <TextFieldInput placeholder="Type something to test…" />
        </TextField>
        <DialogFooter>
          <Button onClick={() => setOpen(false)}>Done</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
