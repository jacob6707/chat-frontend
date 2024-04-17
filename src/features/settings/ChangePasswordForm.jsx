import { useForm } from "react-hook-form";
import { useUpdatePassword } from "./useUpdatePassword";

function ChangePasswordForm({ onClose, username }) {
  const { updatePassword, isUpdatingPassword } = useUpdatePassword();

  const { register, handleSubmit, getValues } = useForm();

  function onSubmit(data) {
    updatePassword(data, {
      onSettled: onClose,
    });
  }

  return (
    <div className="px-4 py-2">
      <h2 className="text-lg">Change Password</h2>
      <form
        className="mt-2 flex flex-col gap-2"
        onSubmit={handleSubmit(onSubmit)}
      >
        <input
          type="hidden"
          defaultValue={username}
          {...register("username")}
        />
        <label>
          <span>Current Password</span>
          <input
            type="password"
            disabled={isUpdatingPassword}
            {...register("oldPassword", { required: true })}
            autoComplete="current-password"
            className="w-full rounded-lg bg-slate-800 p-2 text-base text-slate-50 focus:outline-none disabled:bg-slate-700 disabled:text-slate-400 disabled:hover:cursor-not-allowed"
          />
        </label>
        <label>
          <span>New Password</span>
          <input
            type="password"
            disabled={isUpdatingPassword}
            {...register("newPassword", { required: true })}
            autoComplete="new-password"
            className="w-full rounded-lg bg-slate-800 p-2 text-base text-slate-50 focus:outline-none disabled:bg-slate-700 disabled:text-slate-400 disabled:hover:cursor-not-allowed"
          />
        </label>
        <label>
          <span>Confirm New Password</span>
          <input
            type="password"
            disabled={isUpdatingPassword}
            {...register("confirmPassword", {
              required: true,
              validate: (value) =>
                getValues().newPassword === value || "Passwords need to match",
            })}
            autoComplete="new-password"
            className="w-full rounded-lg bg-slate-800 p-2 text-base text-slate-50 focus:outline-none disabled:bg-slate-700 disabled:text-slate-400 disabled:hover:cursor-not-allowed"
          />
        </label>
        <button
          className="w-full rounded-lg bg-blue-500 p-2 text-base text-white hover:bg-blue-600"
          disabled={isUpdatingPassword}
          type="submit"
        >
          Change Password
        </button>
        <button
          className="w-full rounded-lg bg-red-500 p-2 text-base text-white hover:bg-red-600"
          type="button"
          onClick={onClose}
          disabled={isUpdatingPassword}
        >
          Cancel
        </button>
      </form>
    </div>
  );
}

export default ChangePasswordForm;
