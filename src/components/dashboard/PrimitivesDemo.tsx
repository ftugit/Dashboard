import { createSignal } from "solid-js";
import { createTween } from "@solid-primitives/tween";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Badge } from "~/components/ui/badge";

/**
 * Task 2: a card that describes a Primitives plugin and demonstrates its work.
 * It features @solid-primitives/tween with a side-by-side "with vs. without"
 * comparison so the value of the plugin is obvious.
 */
export function PrimitivesDemo() {
  const [target, setTarget] = createSignal(0);
  // The primitive: smoothly interpolate to the new value over 900ms.
  const eased = createTween(target, { duration: 900 });

  const randomize = () => setTarget(Math.round(Math.random() * 100));
  const reset = () => setTarget(0);

  return (
    <Card>
      <CardHeader>
        <div class="flex items-start justify-between gap-3">
          <div>
            <CardTitle class="flex items-center gap-2">
              @solid-primitives/tween
            </CardTitle>
            <CardDescription class="mt-1 max-w-2xl">
              Interpolates a changing value over time with <code>requestAnimationFrame</code>, so
              counters and bars glide instead of snapping. The left side updates instantly (no
              primitive); the right side uses <code>createTween</code> and eases to the target.
            </CardDescription>
          </div>
          <Badge variant="success" class="shrink-0">
            Primitives plugin
          </Badge>
        </div>
      </CardHeader>

      <CardContent class="grid gap-4 md:grid-cols-2">
        {/* WITHOUT the primitive */}
        <div class="rounded-lg border p-4">
          <div class="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Without primitive
          </div>
          <div class="text-4xl font-bold tabular-nums">{target().toFixed(0)}</div>
          <div class="mt-3 h-3 w-full overflow-hidden rounded-full bg-muted">
            <div class="h-full bg-muted-foreground/40" style={{ width: `${target()}%` }} />
          </div>
          <p class="mt-3 text-xs text-muted-foreground">
            The value jumps straight to the target on every change — abrupt and jumpy.
          </p>
        </div>

        {/* WITH the primitive */}
        <div class="rounded-lg border border-primary/40 p-4">
          <div class="mb-2 text-xs font-semibold uppercase tracking-wide text-primary">
            With createTween
          </div>
          <div class="text-4xl font-bold tabular-nums text-primary">{eased().toFixed(0)}</div>
          <div class="mt-3 h-3 w-full overflow-hidden rounded-full bg-muted">
            <div class="h-full bg-primary" style={{ width: `${eased()}%` }} />
          </div>
          <p class="mt-3 text-xs text-muted-foreground">
            The value eases to the target over 900ms — smooth, no layout jank.
          </p>
        </div>
      </CardContent>

      <CardContent class="flex flex-wrap gap-2">
        <Button onClick={randomize}>Animate to random</Button>
        <Button variant="outline" onClick={reset}>
          Reset
        </Button>
      </CardContent>
    </Card>
  );
}
