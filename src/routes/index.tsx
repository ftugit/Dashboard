import { For } from "solid-js";
import { usePageHeader } from "~/lib/header";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "~/components/ui/card";
import { BadgeDelta } from "~/components/ui/badge-delta";

import { PrimitivesDemo } from "~/components/dashboard/PrimitivesDemo";
import { UiShowcase } from "~/components/dashboard/UiShowcase";
import { SettingsForm } from "~/components/dashboard/SettingsForm";
import { AppearanceControl } from "~/components/dashboard/AppearanceControl";
import { ComponentsGallery } from "~/components/dashboard/ComponentsGallery";
import { DashboardModal } from "~/components/dashboard/DashboardModal";

const stats = [
  { label: "Active users", value: "8,420", delta: "increase" as const },
  { label: "Revenue", value: "$32.1k", delta: "moderateIncrease" as const },
  { label: "Churn", value: "1.2%", delta: "decrease" as const },
  { label: "Open tickets", value: "37", delta: "unchanged" as const }
];

export default function Dashboard() {
  // Task 6/7: the route "passes an array" containing a `left` and a `right`
  // object of UI components. The layout merges and wraps them for the header.
  usePageHeader({
    left: [
      () => (
        <Avatar class="size-8">
          <AvatarImage src="/avatar.png" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
      )
    ],
    right: [DashboardModal]
  });

  return (
    <div class="mx-auto max-w-6xl space-y-6">
      <div>
        <h1 class="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p class="text-sm text-muted-foreground">
          SolidStart + SolidUI + Primitives + formisch/Valibot + vite-plugin-pwa.
        </p>
      </div>

      <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <For each={stats}>
          {(s) => (
            <Card>
              <CardHeader class="pb-2">
                <CardDescription>{s.label}</CardDescription>
                <CardTitle class="text-2xl">{s.value}</CardTitle>
              </CardHeader>
              <CardContent>
                <BadgeDelta deltaType={s.delta}>{s.delta}</BadgeDelta>
              </CardContent>
            </Card>
          )}
        </For>
      </div>

      <PrimitivesDemo />
      <UiShowcase />
      <SettingsForm />
      <AppearanceControl />
      <ComponentsGallery />
    </div>
  );
}
