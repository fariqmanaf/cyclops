import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/absensi/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/absensi/"!</div>;
}
