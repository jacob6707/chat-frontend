import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  function logout() {
    queryClient.removeQueries();
    localStorage.removeItem("token");
    navigate("/login", { replace: true });
  }

  return logout;
}
