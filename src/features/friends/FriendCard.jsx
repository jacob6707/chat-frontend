import {
  HiChatBubbleOvalLeftEllipsis,
  HiCheck,
  HiMiniUserCircle,
  HiXMark,
} from "react-icons/hi2";
import { useAddFriend } from "./useAddFriend";
import { useMessageFriend } from "./useMessageFriend";
import { useRemoveFriend } from "./useRemoveFriend";

function FriendCard({ friend, status }) {
  const { addFriend, isAddingFriend } = useAddFriend();
  const { removeFriend, isRemovingFriend } = useRemoveFriend();
  const { messageFriend, isMessagingFriend } = useMessageFriend();

  const isLoading = isAddingFriend || isRemovingFriend || isMessagingFriend;

  return (
    <div className="grid grid-cols-[auto_1fr_auto] items-center gap-4">
      {friend.avatarUrl ? (
        <img
          src={friend.avatarUrl}
          alt={`Avatar of ${friend.displayName}`}
          className="m-1 h-10 w-10 rounded-full object-cover"
        />
      ) : (
        <HiMiniUserCircle className="h-12 w-12 text-slate-600" />
      )}
      <div>
        <p className="">{friend.username}</p>
        <div className="flex items-center justify-between">
          <span className="text-slate-400">{status}</span>
        </div>
      </div>
      <div className="flex flex-row items-center gap-2">
        {status === "Outgoing friend request" && (
          <button
            className="rounded-full bg-slate-900 p-2"
            onClick={() => removeFriend(friend._id)}
            disabled={isLoading}
          >
            <HiXMark />
          </button>
        )}
        {status === "Incoming friend request" && (
          <>
            <button
              className="rounded-full bg-slate-900 p-2"
              onClick={() => addFriend(friend._id)}
              disabled={isLoading}
            >
              <HiCheck />
            </button>
            <button
              className="rounded-full bg-slate-900 p-2"
              onClick={() => removeFriend(friend._id)}
              disabled={isLoading}
            >
              <HiXMark />
            </button>
          </>
        )}
        {status !== "Outgoing friend request" &&
          status !== "Incoming friend request" && (
            <>
              <button
                className="rounded-full bg-slate-900 p-2"
                onClick={() => messageFriend(friend._id)}
                disabled={isLoading}
              >
                <HiChatBubbleOvalLeftEllipsis />
              </button>
              <button
                className="rounded-full bg-slate-900 p-2"
                onClick={() => removeFriend(friend._id)}
                disabled={isLoading}
              >
                <HiXMark />
              </button>
            </>
          )}
      </div>
    </div>
  );
}

export default FriendCard;
