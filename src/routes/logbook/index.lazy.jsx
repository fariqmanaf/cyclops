import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/logbook/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/logbook/"!</div>;
}
