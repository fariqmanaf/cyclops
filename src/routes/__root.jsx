import {
  createRootRoute,
  Outlet,
  useLocation,
  useNavigate,
} from "@tanstack/react-router";
import "../index.css";

export const Route = createRootRoute({
  component: () => <Root />,
  // notFoundComponent: () => <NotFoundPage />,
});

function Root() {
  return (
    <>
      <div style={{ display: "flex" }}>
        {/* Main Content */}
        <div style={{ flex: 5 }}>
          <Outlet />
        </div>
      </div>
    </>
  );
}
