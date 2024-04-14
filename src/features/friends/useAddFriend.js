import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addFriend as addFriendApi } from "../../services/apiFriends";

export function useAddFriend() {
  const queryClient = useQueryClient();

  const { mutate: addFriend, isPending: isAddingFriend } = useMutation({
    mutationFn: (friend) => addFriendApi(friend),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });

  return { addFriend, isAddingFriend };
}
