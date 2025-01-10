import { useNavigate } from "@tanstack/react-router";

export const Protected = ({ children }) => {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  if (!token) {
    navigate({ to: "/" });
    return;
  }

  return children;
};
