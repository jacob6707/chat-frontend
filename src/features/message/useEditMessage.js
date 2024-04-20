import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { patchMessage } from "../../services/apiMessage";

export function useEditMessage(cid, mid) {
  const queryClient = useQueryClient();

  const { mutate: editMessage, isPending: isEditingMessage } = useMutation({
    mutationFn: (content) => patchMessage(cid, mid, content),
    onMutate: async (content) => {
      queryClient.cancelQueries({ queryKey: ["channelMessages", cid] });
      // optimistically edit the message
      const previousMessages = queryClient.getQueryData([
        "channelMessages",
        cid,
      ]);
      queryClient.setQueryData(["channelMessages", cid], (old) => {
        const pages = old.pages.map((page) => {
          return {
            ...page,
            messages: page.messages.map((message) => {
              if (message._id === mid) {
                return {
                  ...message,
                  content,
                  updatedAt: new Date().toISOString(),
                };
              }
              return message;
            }),
          };
        });
        return { ...old, pages };
      });

      return { previousMessages };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["channelMessages", cid] });
    },
    onError: (error, content, context) => {
      queryClient.setQueryData(
        ["channelMessages", cid],
        context.previousMessages,
      );
      toast.error("Failed to edit message");
    },
  });

  return { editMessage, isEditingMessage };
}
