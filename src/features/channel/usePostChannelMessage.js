import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postChannelMessage } from "../../services/apiChannel";

export function usePostChannelMessage(cid, author = "You") {
  const queryClient = useQueryClient();

  const { mutate: message, isPending: isSendingMessage } = useMutation({
    mutationFn: (message) => postChannelMessage(cid, message),
    onMutate: async (message) => {
      await queryClient.cancelQueries(["channelMessages", cid]);

      const previousMessages = queryClient.getQueryData([
        "channelMessages",
        cid,
      ]);

      queryClient.setQueryData(["channelMessages", cid], (old) => ({
        ...old,
        pages: [
          {
            messages: [
              {
                _id: Math.random().toString(),
                content: message,
                createdAt: new Date().toISOString(),
                author: {
                  displayName: author,
                },
                temp: true,
              },
              ...old.pages[0].messages,
            ],
            totalMessages: old.pages[0].totalMessages + 1,
          },
          ...old.pages.slice(1),
        ],
      }));

      return { previousMessages };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["channelMessages", cid] });
    },
  });

  return { message, isSendingMessage };
}
