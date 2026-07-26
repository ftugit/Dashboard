import { A } from "@solidjs/router";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "~/components/ui/card";

export default function NotFound() {
  return (
    <div class="mx-auto max-w-md py-16">
      <Card>
        <CardHeader>
          <CardTitle>404</CardTitle>
          <CardDescription>This page could not be found.</CardDescription>
        </CardHeader>
        <CardContent>
          <Button as={A} href="/" class="w-full">
            Back to dashboard
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
