import {
  createRootRoute,
  Outlet,
  useLocation,
  useNavigate,
} from "@tanstack/react-router";
import "../index.css";
import { Toaster } from "react-hot-toast";
import { NotFoundPage } from "@/components/OurComponent/notFound";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getProfile } from "@/service/auth";
import { setToken, setUser } from "@/redux/slices/auth";

export const Route = createRootRoute({
  component: () => <Root />,
  notFoundComponent: () => <NotFoundPage />,
});

function Root() {
  const token = localStorage.getItem("token");
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    data: userData,
    isError,
    isSuccess,
  } = useQuery({
    queryKey: ["user"],
    queryFn: () => getProfile(),
    enabled: !!token,
  });

  useEffect(() => {
    if (isSuccess) {
      dispatch(setUser(userData?.data));
    } else if (isError) {
      localStorage.removeItem("token");
      dispatch(setToken(null));
      dispatch(setUser(null));
      navigate({ to: "/" });
    }
  }, [isError, isSuccess, userData, dispatch, navigate]);

  useEffect(() => {
    location.pathname === "/auth/logout" && localStorage.removeItem("token");
    if (location.pathname === "/auth/logout") {
      localStorage.removeItem("token");
      navigate({ to: "/" });
    }
    if (location.pathname === "*") {
      navigate({ to: "/404" });
    }
  }, [location, navigate]);

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
