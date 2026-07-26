import { createSignal, Show } from "solid-js";
import { createForm, Field, Form } from "@formisch/solid";
import * as v from "valibot";
import { toast } from "solid-sonner";

import { Button } from "~/components/ui/button";
import { Label } from "~/components/ui/label";
import { TextField, TextFieldInput } from "~/components/ui/text-field";
import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert";

const Schema = v.object({
  email: v.pipe(v.string(), v.nonEmpty("Email is required"), v.email("Enter a valid email")),
  password: v.pipe(v.string(), v.nonEmpty("Password is required"), v.minLength(8, "Use at least 8 characters"))
});

type SchemaOutput = v.InferOutput<typeof Schema>;

/**
 * Login form — not wired to a real auth backend, but fully validated with
 * formisch + Valibot. Reused both on the /auth page and inside a modal on the
 * /test route.
 */
export function AuthForm() {
  const form = createForm({ schema: Schema });
  const [submitted, setSubmitted] = createSignal<SchemaOutput | null>(null);

  return (
    <Form
      of={form}
      onSubmit={(output) => {
        setSubmitted(output);
        toast.success("Signed in (demo)");
      }}
      class="grid gap-4"
    >
      <Field of={form} path={["email"]}>
        {(field) => (
          <TextField>
            <Label>Email</Label>
            <TextFieldInput {...field.props} value={field.input} type="email" placeholder="you@example.com" />
            <Show when={field.errors}>
              <span class="text-xs text-error-foreground">{field.errors?.[0]}</span>
            </Show>
          </TextField>
        )}
      </Field>

      <Field of={form} path={["password"]}>
        {(field) => (
          <TextField>
            <Label>Password</Label>
            <TextFieldInput {...field.props} value={field.input} type="password" placeholder="••••••••" />
            <Show when={field.errors}>
              <span class="text-xs text-error-foreground">{field.errors?.[0]}</span>
            </Show>
          </TextField>
        )}
      </Field>

      <Button type="submit">Sign in</Button>

      <Show when={submitted()}>
        <Alert variant="success">
          <AlertTitle>Validated</AlertTitle>
          <AlertDescription>
            <pre class="mt-2 overflow-auto rounded-md bg-muted p-3 text-xs">
              {JSON.stringify(submitted(), null, 2)}
            </pre>
          </AlertDescription>
        </Alert>
      </Show>
    </Form>
  );
}
