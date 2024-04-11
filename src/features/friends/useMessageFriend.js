import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { messageFriend as messageFriendApi } from "../../services/apiFriends";

export function useMessageFriend() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: messageFriend, isPending: isMessagingFriend } = useMutation({
    mutationFn: messageFriendApi,
    onSuccess: (data) => {
      navigate("/app/channels/" + data.channelId);
      queryClient.invalidateQueries(["user"]);
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  return { messageFriend, isMessagingFriend };
}
