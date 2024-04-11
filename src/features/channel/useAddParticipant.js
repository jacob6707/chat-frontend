import { useMutation } from "@tanstack/react-query";
import { addParticipant as addParticipantApi } from "../../services/apiChannel";

export function useAddParticipant(cid) {
  const { mutate: addParticipant, isPending: isAddingParticipant } =
    useMutation({
      mutationFn: (uid) => addParticipantApi(cid, uid),
    });

  return { addParticipant, isAddingParticipant };
}
