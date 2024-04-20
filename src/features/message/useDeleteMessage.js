import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteMessage as deleteMessageApi } from "../../services/apiMessage";

export function useDeleteMessage(cid, mid) {
  const queryClient = useQueryClient();

  const { mutate: deleteMessage, isPending: isDeletingMessage } = useMutation({
    mutationFn: () => deleteMessageApi(cid, mid),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["channelMessages", cid] });
      const previousMessages = queryClient.getQueryData([
        "channelMessages",
        cid,
      ]);

      queryClient.setQueryData(["channelMessages", cid], (old) => {
        const filteredMessages = old.pages.map((page) => {
          return {
            ...page,
            messages: page.messages.filter((message) => message._id !== mid),
          };
        });
        return { ...old, pages: filteredMessages };
      });

      return { previousMessages };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["channelMessages", cid] });
    },
    onError: (error, variables, context) => {
      queryClient.setQueryData(
        ["channelMessages", cid],
        context.previousMessages,
      );
      toast.error("Failed to delete message");
    },
  });

  return { deleteMessage, isDeletingMessage };
}
