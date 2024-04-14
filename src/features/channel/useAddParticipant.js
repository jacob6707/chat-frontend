import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { addParticipant as addParticipantApi } from "../../services/apiChannel";

export function useAddParticipant(cid) {
  const queryClient = useQueryClient();

  const { mutate: addParticipant, isPending: isAddingParticipant } =
    useMutation({
      mutationFn: (uid) => addParticipantApi(cid, uid),
      onSuccess: () => {
        toast.success("Participant added successfully");
        queryClient.invalidateQueries({ queryKey: ["channel", cid] });
      },
    });

  return { addParticipant, isAddingParticipant };
}
