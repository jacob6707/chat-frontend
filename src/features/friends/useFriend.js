import { useQuery } from "@tanstack/react-query";
import { getFriend } from "../../services/apiFriends";

export function useFriend(id) {
  const {
    data: friend,
    isPending: isLoading,
    error,
  } = useQuery({
    queryKey: ["friend", id],
    queryFn: () => getFriend(id),
  });

  return { friend, isLoading, error };
}
