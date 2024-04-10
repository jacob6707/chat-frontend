import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postChannelMessage } from "../../services/apiChannel";

export function usePostChannelMessage(cid) {
  const queryClient = useQueryClient();

  const { mutate: message, isPending: isSendingMessage } = useMutation({
    mutationFn: (message) => postChannelMessage(cid, message),
    onSuccess: () => {
      queryClient.invalidateQueries(["channelMessages", cid]);
    },
  });

  return { message, isSendingMessage };
}
