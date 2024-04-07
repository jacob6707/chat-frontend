import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { login as loginApi } from "../../services/apiAuth";

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: login, isPending: isLoggingIn } = useMutation({
    mutationFn: ({ username, password }) => loginApi({ username, password }),
    onSuccess: (data) => {
      localStorage.setItem("token", data.token);
      queryClient.setQueryData(["user"], data.user);
      navigate("/app", { replace: true });
    },
    onError: () => {
      toast.error("Invalid username or password");
    },
  });

  return { login, isLoggingIn };
}
