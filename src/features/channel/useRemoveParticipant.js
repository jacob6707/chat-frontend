import { useMutation } from "@tanstack/react-query";
import { removeParticipant as removeParticipantApi } from "../../services/apiChannel";

export function useRemoveParticipant(cid) {
  const { mutate: removeParticipant, isPending: isRemovingParticipant } =
    useMutation({
      mutationFn: (uid) => removeParticipantApi(cid, uid),
    });

  return { removeParticipant, isRemovingParticipant };
}
