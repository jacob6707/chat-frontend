import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createChannel as createChannelApi } from "../../services/apiChannel";

export function useCreateChannel() {
  const queryClient = useQueryClient();

  const {
    mutate: createChannel,
    isPending: isCreatingChannel,
    error,
  } = useMutation({
    mutationFn: ({ name, participants }) =>
      createChannelApi(name, participants),
    onSuccess: () => {
      toast.success("Channel created");
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });

  return { createChannel, isCreatingChannel, error };
}
