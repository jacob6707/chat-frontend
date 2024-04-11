import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeFriend as removeFriendApi } from "../../services/apiFriends";

export function useRemoveFriend() {
  const queryClient = useQueryClient();

  const { mutate: removeFriend, isPending: isRemovingFriend } = useMutation({
    mutationFn: removeFriendApi,
    onSettled: () => {
      queryClient.invalidateQueries(["user"]);
    },
  });

  return { removeFriend, isRemovingFriend };
}
