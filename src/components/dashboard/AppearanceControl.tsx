import { For } from "solid-js";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Slider, SliderTrack, SliderThumb } from "~/components/ui/slider";
import { useTheme } from "~/lib/theme";

// Preset accent hues (a quick row of swatches: slate, blue, green, ...).
const presets = [
  { name: "Slate", hue: 200 },
  { name: "Blue", hue: 220 },
  { name: "Violet", hue: 280 },
  { name: "Pink", hue: 330 },
  { name: "Red", hue: 0 },
  { name: "Orange", hue: 30 },
  { name: "Green", hue: 140 },
  { name: "Teal", hue: 175 }
];

/**
 * Change the accent hue of the whole template. The hue is a plain number and is
 * written to `document.documentElement` as `--hue` (the stylesheet falls back
 * to 200). The slider track shows the full hue palette via a CSS gradient
 * (SolidUI Slider supports a custom track background, so no custom slider is
 * needed). The current value is shown in a persistent span.
 */
export function AppearanceControl() {
  const { hue, setHue } = useTheme();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Appearance</CardTitle>
        <CardDescription class="mt-1">
          Drag to change the accent <code>--hue</code> (0–360). It is stored in your browser and
          restored on load.
        </CardDescription>
      </CardHeader>
      <CardContent class="space-y-4">
        <div class="flex items-center gap-3">
          <div
            class="size-10 shrink-0 rounded-full border shadow-inner"
            style={{ "background-color": `hsl(${hue()} 84% 55%)` }}
          />
          {/* px-3 insets the track so the thumb never overflows the container. */}
          <div class="flex-1 px-3">
            <Slider value={[hue()]} onChange={(v) => setHue(v[0])} minValue={0} maxValue={360} step={1} class="w-full">
              <SliderTrack class="bg-[linear-gradient(to_right,hsl(0_84%_55%),hsl(60_84%_55%),hsl(120_84%_55%),hsl(180_84%_55%),hsl(240_84%_55%),hsl(300_84%_55%),hsl(360_84%_55%))]">
                <SliderThumb />
              </SliderTrack>
            </Slider>
          </div>
          <span class="w-12 shrink-0 text-right font-medium tabular-nums">{hue()}</span>
        </div>

        <div>
          <div class="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Presets
          </div>
          <div class="flex flex-wrap gap-2">
            <For each={presets}>
              {(p) => (
                <Button
                  variant="outline"
                  size="sm"
                  class="gap-2"
                  classList={{ "border-2": hue() === p.hue }}
                  onClick={() => setHue(p.hue)}
                >
                  <span
                    class="size-3 rounded-full"
                    style={{ "background-color": `hsl(${p.hue} 84% 55%)` }}
                  />
                  {p.name}
                </Button>
              )}
            </For>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
