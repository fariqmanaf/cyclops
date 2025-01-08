import { createRootRoute, Outlet } from "@tanstack/react-router";
import "../index.css";
import { Toaster } from "react-hot-toast";

export const Route = createRootRoute({
  component: () => <Root />,
  // notFoundComponent: () => <NotFoundPage />,
});

function Root() {
  return (
    <>
      <Toaster position="top-right" />
      <div style={{ display: "flex" }}>
        {/* Main Content */}
        <div style={{ flex: 5 }}>
          <Outlet />
        </div>
      </div>
    </>
  );
}
