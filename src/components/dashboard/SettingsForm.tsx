import { createSignal, Show, For } from "solid-js";
import { createForm, Field, Form } from "@formisch/solid";
import * as v from "valibot";
import { toast } from "solid-sonner";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Label } from "~/components/ui/label";
import { TextField, TextFieldInput, TextFieldTextArea } from "~/components/ui/text-field";
import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert";

const Schema = v.object({
  name: v.pipe(v.string(), v.nonEmpty("Name is required"), v.minLength(2, "Use at least 2 characters")),
  email: v.pipe(v.string(), v.nonEmpty("Email is required"), v.email("Enter a valid email")),
  role: v.picklist(["admin", "editor", "viewer"], "Pick a role"),
  bio: v.pipe(v.string(), v.maxLength(280, "Keep it under 280 characters")),
  subscribe: v.boolean()
});

type SchemaOutput = v.InferOutput<typeof Schema>;

/**
 * Forms via formisch, validated with Valibot (the schema is passed straight
 * into createForm). Each field is wired with <Field> + a SolidUI control.
 */
export function SettingsForm() {
  const form = createForm({ schema: Schema });
  const [saved, setSaved] = createSignal<SchemaOutput | null>(null);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile settings</CardTitle>
        <CardDescription class="mt-1">
          Validated by Valibot through <code>@formisch/solid</code>.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Form
          of={form}
          onSubmit={(output) => {
            setSaved(output);
            toast.success("Settings saved");
          }}
          class="grid gap-4"
        >
          <Field of={form} path={["name"]}>
            {(field) => (
              <TextField>
                <Label>Name</Label>
                <TextFieldInput {...field.props} value={field.input} type="text" placeholder="Jane Doe" />
                <Show when={field.errors}>
                  <span class="text-xs text-error-foreground">{field.errors?.[0]}</span>
                </Show>
              </TextField>
            )}
          </Field>

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

          <Field of={form} path={["role"]}>
            {(field) => (
              <TextField>
                <Label>Role</Label>
                <select
                  {...field.props}
                  value={field.input}
                  class="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                >
                  <option value="admin">Admin</option>
                  <option value="editor">Editor</option>
                  <option value="viewer">Viewer</option>
                </select>
                <Show when={field.errors}>
                  <span class="text-xs text-error-foreground">{field.errors?.[0]}</span>
                </Show>
              </TextField>
            )}
          </Field>

          <Field of={form} path={["bio"]}>
            {(field) => (
              <TextField>
                <Label>Bio</Label>
                <TextFieldTextArea {...field.props} value={field.input} placeholder="Tell us about you…" />
                <Show when={field.errors}>
                  <span class="text-xs text-error-foreground">{field.errors?.[0]}</span>
                </Show>
              </TextField>
            )}
          </Field>

          <Field of={form} path={["subscribe"]}>
            {(field) => (
              <label class="flex items-center gap-2 text-sm">
                <input type="checkbox" {...field.props} class="size-4 rounded border-input" />
                Subscribe to the newsletter
              </label>
            )}
          </Field>

          <div class="flex gap-2">
            <Button type="submit">Save changes</Button>
            <Button type="button" variant="outline" onClick={() => form.reset()}>
              Reset
            </Button>
          </div>

          <Show when={saved()}>
            <Alert variant="success">
              <AlertTitle>Submitted values</AlertTitle>
              <AlertDescription>
                <pre class="mt-2 overflow-auto rounded-md bg-muted p-3 text-xs">
                  {JSON.stringify(saved(), null, 2)}
                </pre>
              </AlertDescription>
            </Alert>
          </Show>
        </Form>
      </CardContent>
    </Card>
  );
}
