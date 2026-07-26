import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { AuthHeader } from "~/components/AuthHeader";
import { BackButton } from "~/components/BackButton";
import { AuthForm } from "~/components/auth/AuthForm";

/**
 * /auth page. The bare (no-chrome) layout is provided by (auth)/layout.tsx,
 * so this file is just the centered content: a Back header sitting directly
 * ABOVE the card, then the card with the formisch + Valibot login form.
 */
export default function Auth() {
  return (
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
  );
}
