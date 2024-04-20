import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updatePassword as updatePasswordApi } from "../../services/apiAuth";

export function useUpdatePassword() {
  const { mutate: updatePassword, isPending: isUpdatingPassword } = useMutation(
    {
      mutationFn: ({ oldPassword, newPassword }) =>
        updatePasswordApi({ oldPassword, newPassword }),
      onSuccess: async ({ token }) => {
        toast.success("Password updated");
        localStorage.setItem("token", token);
      },
      onError: (error) => {
        toast.error(error.message);
      },
    },
  );

  return { updatePassword, isUpdatingPassword };
}
