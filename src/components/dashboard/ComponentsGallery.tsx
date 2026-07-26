import { createSignal, For, Show } from "solid-js";
import { toast } from "solid-sonner";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Badge } from "~/components/ui/badge";
import { BadgeDelta } from "~/components/ui/badge-delta";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "~/components/ui/table";
import { Timeline } from "~/components/ui/timeline";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Tooltip, TooltipTrigger, TooltipContent } from "~/components/ui/tooltip";
import { Popover, PopoverTrigger, PopoverContent } from "~/components/ui/popover";
import { HoverCard, HoverCardTrigger, HoverCardContent } from "~/components/ui/hover-card";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "~/components/ui/dropdown-menu";
import { CommandDialog, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } from "~/components/ui/command";
import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert";
import { Progress } from "~/components/ui/progress";
import { Skeleton } from "~/components/ui/skeleton";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "~/components/ui/tabs";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "~/components/ui/accordion";

const activity = [
  { user: "Ada", action: "created a report", time: "2m" },
  { user: "Linus", action: "merged a PR", time: "18m" },
  { user: "Grace", action: "invited a member", time: "1h" }
];

const timelineItems = [
  { title: "Project created", description: "Scaffolded with SolidStart" },
  { title: "UI connected", description: "SolidUI components added via the catalog" },
  { title: "PWA enabled", description: "Installable + update toast wired" }
];

/**
 * A gallery of the remaining connected SolidUI components so the dashboard
 * shows the breadth of the kit.
 */
export function ComponentsGallery() {
  const [tab, setTab] = createSignal("overview");
  const [accordion, setAccordion] = createSignal<string[]>([]);
  const [cmdOpen, setCmdOpen] = createSignal(false);

  return (
    <div class="grid gap-4 lg:grid-cols-2">
      {/* Data: table + timeline + badge-delta */}
      <Card>
        <CardHeader>
          <CardTitle>Recent activity</CardTitle>
          <CardDescription class="mt-1">Table, timeline and delta badges.</CardDescription>
        </CardHeader>
        <CardContent class="space-y-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Action</TableHead>
                <TableHead class="text-right">When</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <For each={activity}>
                {(row) => (
                  <TableRow>
                    <TableCell class="font-medium">{row.user}</TableCell>
                    <TableCell>{row.action}</TableCell>
                    <TableCell class="text-right text-muted-foreground">{row.time}</TableCell>
                  </TableRow>
                )}
              </For>
            </TableBody>
          </Table>

          <div class="flex flex-wrap items-center gap-2">
            <BadgeDelta deltaType="increase">+12.5%</BadgeDelta>
            <BadgeDelta deltaType="moderateIncrease">+4.2%</BadgeDelta>
            <BadgeDelta deltaType="unchanged">0.0%</BadgeDelta>
            <BadgeDelta deltaType="decrease">-3.1%</BadgeDelta>
          </div>

          <Timeline items={timelineItems} activeItem={2} />
        </CardContent>
      </Card>

      {/* Overlays: tooltip, popover, hover-card, dropdown, command */}
      <Card>
        <CardHeader>
          <CardTitle>Overlays</CardTitle>
          <CardDescription class="mt-1">Tooltip, popover, hover card, dropdown and command.</CardDescription>
        </CardHeader>
        <CardContent class="flex flex-wrap gap-2">
          <Tooltip>
            <TooltipTrigger as={Button} variant="outline">
              Hover me
            </TooltipTrigger>
            <TooltipContent>Helpful tooltip text</TooltipContent>
          </Tooltip>

          <Popover>
            <PopoverTrigger as={Button} variant="outline">
              Popover
            </PopoverTrigger>
            <PopoverContent class="w-64 space-y-2">
              <p class="text-sm font-medium">Popover title</p>
              <p class="text-sm text-muted-foreground">Some supporting detail goes here.</p>
            </PopoverContent>
          </Popover>

          <HoverCard>
            <HoverCardTrigger as={Button} variant="outline">
              @solidjs
            </HoverCardTrigger>
            <HoverCardContent class="w-64">
              <div class="flex items-center gap-2">
                <Avatar>
                  <AvatarFallback>SJ</AvatarFallback>
                </Avatar>
                <div>
                  <p class="text-sm font-medium">SolidJS</p>
                  <p class="text-xs text-muted-foreground">Reactive UI library</p>
                </div>
              </div>
            </HoverCardContent>
          </HoverCard>

          <DropdownMenu>
            <DropdownMenuTrigger as={Button} variant="outline">
              Menu
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onSelect={() => toast("Profile clicked")}>Profile</DropdownMenuItem>
              <DropdownMenuItem onSelect={() => toast("Settings clicked")}>Settings</DropdownMenuItem>
              <DropdownMenuItem onSelect={() => toast("Logout clicked")}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button variant="outline" onClick={() => setCmdOpen(true)}>
            Command ⌘K
          </Button>
          <CommandDialog open={cmdOpen()} onOpenChange={setCmdOpen}>
            <CommandInput placeholder="Type a command…" />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup heading="Actions">
                <CommandItem onSelect={() => { setCmdOpen(false); toast("Navigating to Dashboard"); }}>
                  Go to Dashboard
                </CommandItem>
                <CommandItem onSelect={() => { setCmdOpen(false); toast("Navigating to Test"); }}>
                  Go to Test
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </CommandDialog>
        </CardContent>
      </Card>

      {/* Feedback: alerts + progress + skeleton + avatar */}
      <Card>
        <CardHeader>
          <CardTitle>Feedback</CardTitle>
          <CardDescription class="mt-1">Alerts, progress, skeleton and avatars.</CardDescription>
        </CardHeader>
        <CardContent class="space-y-4">
          <Alert variant="success">
            <AlertTitle>Deployed</AlertTitle>
            <AlertDescription>Your changes are live.</AlertDescription>
          </Alert>
          <Alert variant="warning">
            <AlertTitle>Heads up</AlertTitle>
            <AlertDescription>You have 2 pending invites.</AlertDescription>
          </Alert>
          <div class="space-y-2">
            <Progress value={68} />
            <Progress value={42} />
          </div>
          <div class="flex items-center gap-3">
            <Avatar>
              <AvatarImage src="/avatar.png" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarFallback>AK</AvatarFallback>
            </Avatar>
            <Skeleton class="h-10 w-40" />
          </div>
        </CardContent>
      </Card>

      {/* Tabs + Accordion */}
      <Card>
        <CardHeader>
          <CardTitle>Tabs &amp; Accordion</CardTitle>
          <CardDescription class="mt-1">Two common content patterns.</CardDescription>
        </CardHeader>
        <CardContent class="space-y-4">
          <Tabs value={tab()} onChange={setTab}>
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            <TabsContent value="overview">
              <p class="text-sm text-muted-foreground">Overview content goes here.</p>
            </TabsContent>
            <TabsContent value="activity">
              <p class="text-sm text-muted-foreground">Recent activity content.</p>
            </TabsContent>
            <TabsContent value="settings">
              <p class="text-sm text-muted-foreground">Settings content.</p>
            </TabsContent>
          </Tabs>

          <Accordion value={accordion()} onChange={setAccordion} multiple class="space-y-2">
            <AccordionItem value="faq-1">
              <AccordionTrigger>Is this built without React?</AccordionTrigger>
              <AccordionContent>Yes — SolidStart + SolidUI, no React anywhere.</AccordionContent>
            </AccordionItem>
            <AccordionItem value="faq-2">
              <AccordionTrigger>Can I install it as an app?</AccordionTrigger>
              <AccordionContent>Yes, it is a PWA via vite-plugin-pwa.</AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}
