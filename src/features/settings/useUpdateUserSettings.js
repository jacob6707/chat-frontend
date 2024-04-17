import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateUserSettings as updateUserSettingsApi } from "../../services/apiUser";

export function useUpdateUserSettings() {
  const queryClient = useQueryClient();

  const { mutate: updateUserSettings, isPending: isUpdatingUserSettings } =
    useMutation({
      mutationFn: (settings) => updateUserSettingsApi(settings),
      onSuccess: () => {
        toast.success("Account settings updated successfully");
        queryClient.invalidateQueries({ queryKey: ["user"] });
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });

  return { updateUserSettings, isUpdatingUserSettings };
}
