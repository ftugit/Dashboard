import { createSignal, For } from "solid-js";
import { writeClipboard } from "@solid-primitives/clipboard";
import { toast } from "solid-sonner";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Badge } from "~/components/ui/badge";
import { Label } from "~/components/ui/label";
import { TextField, TextFieldInput, TextFieldTextArea } from "~/components/ui/text-field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "~/components/ui/select";
import { Switch, SwitchControl, SwitchThumb, SwitchLabel } from "~/components/ui/switch";
import { Checkbox } from "~/components/ui/checkbox";
import { RadioGroup, RadioGroupItem, RadioGroupItemLabel } from "~/components/ui/radio-group";
import { Slider, SliderTrack, SliderFill, SliderThumb, SliderLabel, SliderValueLabel } from "~/components/ui/slider";

const fruits = ["Apple", "Banana", "Cherry", "Durian"];

/**
 * Task 4: a block demonstrating the SolidUI components you connected — buttons,
 * text fields, textarea, select, switch, checkbox, radio group and slider — plus
 * a copy-to-clipboard action powered by the @solid-primitives/clipboard plugin.
 */
export function UiShowcase() {
  const [fruit, setFruit] = createSignal("Apple");
  const [agree, setAgree] = createSignal(false);
  const [notifications, setNotifications] = createSignal(true);
  const [plan, setPlan] = createSignal("free");
  const [volume, setVolume] = createSignal([60]);
  const snippet = "npm create solid@latest my-app -- --v2 --ts";

  const copy = async () => {
    await writeClipboard(snippet);
    toast.success("Copied to clipboard");
  };

  return (
    <Card>
      <CardHeader>
        <div class="flex items-start justify-between gap-3">
          <div>
            <CardTitle>UI elements</CardTitle>
            <CardDescription class="mt-1">
              Buttons, fields, select and the rest of the connected SolidUI kit.
            </CardDescription>
          </div>
          <Badge variant="outline">SolidUI</Badge>
        </div>
      </CardHeader>

      <CardContent class="grid gap-6 md:grid-cols-2">
        {/* Buttons */}
        <div class="space-y-3">
          <Label>Buttons</Label>
          <div class="flex flex-wrap gap-2">
            <Button>Default</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="link">Link</Button>
          </div>
          <div class="flex flex-wrap items-center gap-2">
            <Button size="sm">Small</Button>
            <Button size="lg">Large</Button>
            <Button size="icon" aria-label="star">★</Button>
            <Button disabled>Disabled</Button>
          </div>
        </div>

        {/* Text fields */}
        <div class="space-y-3">
          <Label>Text fields</Label>
          <TextField>
            <TextFieldInput type="email" placeholder="you@example.com" />
          </TextField>
          <TextField>
            <TextFieldTextArea placeholder="Write a message…" />
          </TextField>
        </div>

        {/* Select */}
        <div class="space-y-3">
          <Label>Select</Label>
          <Select
            options={fruits}
            value={fruit()}
            onChange={(v) => setFruit(v as string)}
            itemComponent={(props) => (
              <SelectItem item={props.item}>{props.item.rawValue}</SelectItem>
            )}
          >
            <SelectTrigger>
              <SelectValue>{fruit()}</SelectValue>
            </SelectTrigger>
            <SelectContent />
          </Select>
        </div>

        {/* Switch + Checkbox */}
        <div class="space-y-4">
          <div class="space-y-3">
            <Label>Toggles</Label>
            <Switch checked={notifications()} onChange={setNotifications}>
              <SwitchControl>
                <SwitchThumb />
              </SwitchControl>
              <SwitchLabel>Notifications {notifications() ? "on" : "off"}</SwitchLabel>
            </Switch>
            <Checkbox checked={agree()} onChange={setAgree}>
              I agree to the terms
            </Checkbox>
          </div>
          <div class="space-y-2">
            <Label>Radio group</Label>
            <RadioGroup value={plan()} onChange={setPlan} class="flex gap-4">
              <For each={["free", "pro", "team"]}>
                {(p) => (
                  <RadioGroupItem value={p}>
                    <RadioGroupItemLabel class="capitalize">{p}</RadioGroupItemLabel>
                  </RadioGroupItem>
                )}
              </For>
            </RadioGroup>
          </div>
        </div>

        {/* Slider */}
        <div class="space-y-2">
          <Slider value={volume()} onChange={setVolume} min={0} max={100} class="w-full">
            <SliderLabel>Volume</SliderLabel>
            <SliderTrack>
              <SliderFill />
              <SliderThumb />
            </SliderTrack>
            <SliderValueLabel>{volume()[0]}</SliderValueLabel>
          </Slider>
        </div>

        {/* Clipboard primitive */}
        <div class="space-y-2 md:col-span-2">
          <Label>Clipboard (@solid-primitives/clipboard)</Label>
          <div class="flex flex-wrap items-center gap-2">
            <code class="rounded-md bg-muted px-3 py-2 text-sm">{snippet}</code>
            <Button variant="outline" onClick={copy}>
              Copy
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
