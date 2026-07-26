import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { BareLayout } from "~/components/BareLayout";
import { AuthHeader } from "~/components/AuthHeader";
import { BackButton } from "~/components/BackButton";
import { AuthForm } from "~/components/auth/AuthForm";

/**
 * Standalone auth template: no app chrome. The Back header sits directly above
 * the centered card (it is part of the centered column, not a window-top bar).
 * Uses the reusable BareLayout so it can be plugged into any no-sidebar route.
 */
export default function Auth() {
  return (
    <BareLayout>
      <div class="mx-auto flex min-h-screen w-full max-w-sm flex-col justify-center gap-3 p-4">
        <AuthHeader left={<BackButton />} />
        <Card>
          <CardHeader>
            <CardTitle>Sign in</CardTitle>
            <CardDescription class="mt-1">Demo form — validated with formisch + Valibot.</CardDescription>
          </CardHeader>
          <CardContent>
            <AuthForm />
          </CardContent>
        </Card>
      </div>
    </BareLayout>
  );
}
