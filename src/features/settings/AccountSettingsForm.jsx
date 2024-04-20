import { useForm } from "react-hook-form";
import { useRemoveAvatar } from "./useRemoveAvatar";
import { useUpdateUserSettings } from "./useUpdateUserSettings";

function AccountSettingsForm({ user, changePassword, onCloseModal }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { updateUserSettings, isUpdatingUserSettings } =
    useUpdateUserSettings();
  const { removeAvatar, isRemovingAvatar } = useRemoveAvatar();

  function onSubmit(data) {
    updateUserSettings(data, {
      onSettled: () => onCloseModal?.(),
    });
  }

  const isUpdating = isUpdatingUserSettings || isRemovingAvatar;

  console.log(errors);

  return (
    <form
      className="flex min-h-0 flex-col gap-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h2 className="text-lg">Account Settings</h2>
      <div className="flex min-h-0 flex-col gap-2 overflow-y-auto">
        <label>
          <span>Username</span>
          <input
            type="text"
            defaultValue={user.username}
            className="w-full rounded-lg bg-slate-800 p-2 text-base text-slate-50 focus:outline-none disabled:bg-slate-700 disabled:text-slate-400 disabled:hover:cursor-not-allowed"
            disabled
          />
          {errors.username && (
            <span className="text-red-400">{errors?.username?.message}</span>
          )}
        </label>
        <label>
          <span>Email</span>
          <input
            type="email"
            defaultValue={user.email}
            className="w-full rounded-lg bg-slate-800 p-2 text-base text-slate-50 focus:outline-none disabled:bg-slate-700 disabled:text-slate-400 disabled:hover:cursor-not-allowed"
            disabled
          />
          {errors.email && (
            <span className="text-red-400">{errors?.email?.message}</span>
          )}
        </label>
        <label>
          <span>Display Name</span>
          <input
            type="text"
            defaultValue={user.displayName}
            className="w-full rounded-lg bg-slate-800 p-2 text-base text-slate-50 focus:outline-none disabled:bg-slate-700 disabled:text-slate-400 disabled:hover:cursor-not-allowed"
            {...register("displayName", {
              required: true,
              maxLength: {
                value: 30,
                message: "Display name must be at most 30 characters long",
              },
              minLength: {
                value: 3,
                message: "Display name must be at least 3 characters long",
              },
            })}
            disabled={isUpdating}
          />
          {errors.displayName && (
            <span className="text-red-400">{errors?.displayName?.message}</span>
          )}
        </label>
        <label>
          <span>About</span>
          <textarea
            type="text"
            defaultValue={user.about}
            maxLength={600}
            className="w-full rounded-lg bg-slate-800 p-2 text-base text-slate-50 focus:outline-none disabled:bg-slate-700 disabled:text-slate-400 disabled:hover:cursor-not-allowed"
            {...register("about", { maxLength: 600 })}
            disabled={isUpdating}
          />
          {errors.about && (
            <span className="text-red-400">{errors?.about?.message}</span>
          )}
        </label>
        <label>
          <span>Avatar</span>
          <div className="flex flex-row gap-2">
            <input
              type="file"
              accept="image/*"
              className="w-full rounded-lg bg-slate-800 text-base text-slate-50 file:mr-2 file:rounded-r-lg file:border-none file:bg-slate-600 file:px-4 file:py-2 file:text-base file:font-medium file:text-slate-50 file:transition-all file:duration-200 hover:file:cursor-pointer hover:file:bg-slate-500 focus:outline-none"
              {...register("avatar")}
              disabled={isUpdating}
            />
            {user.avatarUrl && (
              <button
                className="h-fit w-fit flex-none rounded-lg bg-red-500 px-4 py-2  text-base text-white hover:bg-red-600"
                onClick={removeAvatar}
                disabled={isUpdating}
                type="button"
              >
                Remove avatar
              </button>
            )}
            {errors.avatar && (
              <span className="text-red-400">{errors?.avatar?.message}</span>
            )}
          </div>
        </label>
        <button
          className="w-fit rounded-lg bg-red-500 px-4 py-2 text-base text-white hover:bg-red-600"
          onClick={changePassword}
          type="button"
          disabled={isUpdating}
        >
          Change Password
        </button>
      </div>
      <button
        className="w-full rounded-lg bg-blue-500 p-2 text-base text-white hover:bg-blue-600"
        disabled={isUpdating}
      >
        Save Changes
      </button>
    </form>
  );
}

export default AccountSettingsForm;
