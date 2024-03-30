import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createUser } from "../../services/apiAuth";

export function useSignup() {
  const { mutate: signup, isPending: isCreatingUser } = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      toast.success("User created successfully");
    },
    onError: (error) => {
      toast.error(`Error creating user: ${error.message}`);
      console.error(error);
    },
  });

  return { signup, isCreatingUser };
}
