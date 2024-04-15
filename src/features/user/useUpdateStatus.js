import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateStatus as updateStatusApi } from "../../services/apiUser";

export function useUpdateStatus() {
  const queryClient = useQueryClient();

  const { mutate: updateStatus, isPending: isUpdatingStatus } = useMutation({
    mutationFn: updateStatusApi,
    onMutate: async (status) => {
      await queryClient.cancelQueries(["user"]);

      const previousUser = queryClient.getQueryData(["user"]);

      queryClient.setQueryData(["user"], (old) => ({
        ...old,
        status: {
          ...old.status,
          current: status,
        },
      }));

      return { previousUser };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  return { updateStatus, isUpdatingStatus };
}
