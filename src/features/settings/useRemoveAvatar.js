import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { removeAvatar as removeAvatarApi } from "../../services/apiUser";

export function useRemoveAvatar() {
  const queryClient = useQueryClient();

  const { mutate: removeAvatar, isPending: isRemovingAvatar } = useMutation({
    mutationFn: removeAvatarApi,
    onSuccess: () => {
      toast.success("Avatar removed");
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { removeAvatar, isRemovingAvatar };
}
