import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { deleteChannel as deleteChannelApi } from "../../services/apiChannel";

export function useDeleteChannel() {
  const queryClient = useQueryClient();
  const location = useLocation();
  const navigate = useNavigate();

  const { mutate: deleteChannel, isPending: isDeletingChannel } = useMutation({
    mutationFn: deleteChannelApi,
    onSuccess: async (data) => {
      toast.success("Channel deleted");
      if (location.pathname.includes(data.channelId)) {
        navigate("/app");
      }
      await queryClient.invalidateQueries({ queryKey: ["user"] });
      await queryClient.cancelQueries({
        queryKey: ["channel", data.channelId],
      });
      queryClient.removeQueries({ queryKey: ["channel", data.channelId] });
      await queryClient.cancelQueries({
        queryKey: ["channelMessages", data.channelId],
      });
      queryClient.removeQueries({
        queryKey: ["channelMessages", data.channelId],
      });
    },
  });

  return { deleteChannel, isDeletingChannel };
}
