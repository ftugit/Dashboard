import { createSignal } from "solid-js";
import { usePageHeader } from "~/lib/header";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { MobileSidebar } from "~/components/MobileSidebar";
import { AuthForm } from "~/components/auth/AuthForm";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from "~/components/ui/dialog";
import { TestModal } from "~/components/dashboard/TestModal";

// Button that launches the OLD (Sheet) sidebar variant.
function OldSidebarButton() {
  return <MobileSidebar />;
}

// Button that opens the reusable auth form inside a modal.
function AuthModalTrigger() {
  const [open, setOpen] = createSignal(false);
  return (
    <Dialog open={open()} onOpenChange={setOpen}>
      <DialogTrigger as={Button} variant="secondary">
        Login form
      </DialogTrigger>
      <DialogContent class="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Sign in</DialogTitle>
          <DialogDescription>Reusable formisch + Valibot form inside a modal.</DialogDescription>
        </DialogHeader>
        <AuthForm />
        <DialogFooter>
          <Button onClick={() => setOpen(false)}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default function Test() {
  // A different route passes its own header actions. Here we add the OLD
  // sidebar (Sheet) launcher and a modal holding the auth form.
  usePageHeader({
    left: [
      () => (
        <Button variant="outline" size="icon" aria-label="test">
          ★
        </Button>
      )
    ],
    right: [OldSidebarButton, AuthModalTrigger, TestModal]
  });

  return (
    <div class="mx-auto max-w-3xl space-y-6">
      <div>
        <h1 class="text-2xl font-bold tracking-tight">Test route</h1>
        <p class="text-sm text-muted-foreground">
          A second route. Its header buttons differ from the dashboard's.
        </p>
      </div>

      <Card>
        <CardHeader>
          <div class="flex items-center justify-between gap-3">
            <div>
              <CardTitle>Sandbox</CardTitle>
              <CardDescription class="mt-1">
                Experiment with the primitives and components here.
              </CardDescription>
            </div>
            <Badge variant="outline">/test</Badge>
          </div>
        </CardHeader>
        <CardContent class="space-y-3">
          <p class="text-sm text-muted-foreground">
            The floating header (desktop) and bottom bar (mobile) both render the{" "}
            <strong>Login form</strong> and <strong>Old sidebar</strong> buttons defined in this route
            file. Switch to a phone viewport to see the layout adapt: the sidebar and main header
            hide, and the actions move into the bottom bar.
          </p>
          <div class="flex flex-wrap gap-2">
            <AuthModalTrigger />
            <OldSidebarButton />
            <TestModal />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
