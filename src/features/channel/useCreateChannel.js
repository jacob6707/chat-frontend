import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createChannel as createChannelApi } from "../../services/apiChannel";

export function useCreateChannel() {
  const queryClient = useQueryClient();

  const {
    mutate: createChannel,
    isPending: isCreatingChannel,
    error,
  } = useMutation({
    mutationFn: ({ name, participants }) => {
      createChannelApi(name, participants);
    },
    onSuccess: () => {
      queryClient.invalidateQueries("user");
    },
  });

  return { createChannel, isCreatingChannel, error };
}
