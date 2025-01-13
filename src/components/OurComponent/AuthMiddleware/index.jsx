import { useNavigate } from "@tanstack/react-router";
import { useSelector } from "react-redux";
import { useEffect } from "react";

export const Protected = ({ children, roles }) => {
  const navigate = useNavigate();
  const { token, user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!token) {
      navigate({ to: "/" });
      return;
    }

    if (token && user && roles.length > 0) {
      const isCanAccess = roles.includes(user?.role);
      if (!isCanAccess) {
        navigate({ to: "/" });
      }
    }
  }, [navigate, token, user, roles]);

  if (!token || (roles.length > 0 && user && !roles.includes(user?.role))) {
    return null;
  }

  return children;
};
