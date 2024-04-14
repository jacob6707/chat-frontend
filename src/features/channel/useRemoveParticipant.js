import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { removeParticipant as removeParticipantApi } from "../../services/apiChannel";

export function useRemoveParticipant(cid) {
  const queryClient = useQueryClient();

  const { mutate: removeParticipant, isPending: isRemovingParticipant } =
    useMutation({
      mutationFn: (uid) => removeParticipantApi(cid, uid),
      onSuccess: () => {
        toast.success("Participant removed successfully");
        queryClient.invalidateQueries({ queryKey: ["channel", cid] });
      },
    });

  return { removeParticipant, isRemovingParticipant };
}
