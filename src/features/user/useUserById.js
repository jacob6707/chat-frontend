import { useQuery } from "@tanstack/react-query";
import { getUserById } from "../../services/apiUser";

export function useUserById(id) {
  const {
    data: user,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["user", id],
    queryFn: () => getUserById(id),
  });

  return { user, isLoading, error };
}
