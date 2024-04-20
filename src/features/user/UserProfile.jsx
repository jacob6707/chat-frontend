import { format } from "date-fns";
import AvatarImage from "../../components/AvatarImage";
import Spinner from "../../ui/Spinner";
import { useUser } from "../authentication/useUser";
import { useAddFriend } from "../friends/useAddFriend";
import { useRemoveFriend } from "../friends/useRemoveFriend";
import StatusBlip from "./StatusBlip";
import { useUserById } from "./useUserById";

function UserProfile({ id }) {
  const { user, isLoading, error } = useUserById(id);
  const { user: currentUser, isLoading: isLoadingCurrentUser } = useUser();
  const { addFriend, isAddingFriend } = useAddFriend();
  const { removeFriend, isRemovingFriend } = useRemoveFriend();

  if (isLoading || isLoadingCurrentUser) return <Spinner />;

  if (error) return <div>{error.message}</div>;

  const friends = currentUser.friends.find(
    (friend) => friend.recipient === user._id,
  )?.status;

  const friendButtonText = {
    0: "Add friend",
    1: "Cancel request",
    2: "Accept request",
    3: "Remove friend",
  };

  return (
    <div className="flex w-[640px] flex-col gap-4 rounded-lg bg-indigo-950 p-4">
      <div className="flex w-full items-center gap-4">
        <div className="relative">
          <AvatarImage
            size="large"
            avatarUrl={user.avatarUrl}
            displayName={user.displayName}
          />
          <StatusBlip status={user.status.current} size="large" />
        </div>
        <div>
          <h1 className="text-2xl">
            {user.displayName}{" "}
            <span className="text-lg text-slate-400">({user.username})</span>
          </h1>
          <p className="text-slate-400">{user.status.current}</p>
        </div>
        <div className="ml-auto flex items-center gap-2">
          {friends && friends === 3 && (
            <button className="rounded-lg bg-green-500 px-4 py-2 text-white hover:bg-green-600">
              Message
            </button>
          )}
          {currentUser._id !== user._id &&
            (friends ? (
              friends === 3 || friends === 1 ? (
                <button
                  className="rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-600"
                  onClick={() => removeFriend(id)}
                >
                  {friendButtonText[friends]}
                </button>
              ) : (
                <button
                  className="rounded-lg bg-green-500 px-4 py-2 text-white hover:bg-green-600"
                  onClick={() => addFriend(id)}
                >
                  {friendButtonText[friends]}
                </button>
              )
            ) : (
              <button
                className="rounded-lg bg-green-500 px-4 py-2 text-white hover:bg-green-600"
                onClick={() => addFriend(id)}
              >
                Add friend
              </button>
            ))}
        </div>
      </div>
      {user.about && (
        <div>
          <h2 className="text-xl font-semibold">About</h2>
          <p className="max-h-48 overflow-y-auto whitespace-pre-line text-wrap break-words text-base text-slate-400">
            {user.about}
          </p>
        </div>
      )}
      <div>
        <h2 className="text-xl font-semibold">Member since</h2>
        <p className="text-slate-400">{format(user.createdAt, "PP")}</p>
      </div>
    </div>
  );
}

export default UserProfile;
