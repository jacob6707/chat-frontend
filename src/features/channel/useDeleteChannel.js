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
    onSuccess: (data) => {
      toast.success("Channel deleted");
      if (location.pathname.includes(data.channelId)) {
        navigate("/app");
      }
      queryClient.removeQueries({ queryKey: ["channel", data.channelId] });
      queryClient.removeQueries({
        queryKey: ["channelMessages", data.channelId],
      });
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });

  return { deleteChannel, isDeletingChannel };
}
