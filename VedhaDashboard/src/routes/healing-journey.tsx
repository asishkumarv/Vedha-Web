import { Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/healing-journey")({
  component: HealingJourneyLayout,
});

function HealingJourneyLayout() {
  return <Outlet />;
}
