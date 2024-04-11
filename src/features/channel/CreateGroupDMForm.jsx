import { useState } from "react";
import toast from "react-hot-toast";
import SpinnerMini from "../../ui/SpinnerMini";
import { useFriend } from "../friends/useFriend";
import { useCreateChannel } from "./useCreateChannel";

function FriendSelection({ friendId, selected, onSelect }) {
  const { friend, isLoading } = useFriend(friendId);

  if (isLoading) return <SpinnerMini />;

  return (
    <li
      className={`flex items-center gap-4 rounded-lg bg-slate-600 px-4 py-2 text-slate-100 ${
        selected ? "bg-violet-600" : ""
      }`}
      onClick={() => onSelect(friend._id)}
    >
      <input type="checkbox" checked={selected} readOnly />
      <span>{friend.displayName}</span>
    </li>
  );
}

function CreateGroupDMForm({ user, onCloseModal }) {
  const [selectedFriends, setSelectedFriends] = useState([]);
  const [groupName, setGroupName] = useState("");

  const { createChannel, isCreatingChannel } = useCreateChannel();

  function handleSubmit(e) {
    e.preventDefault();
    if (!groupName || selectedFriends.length < 1) return;
    createChannel(
      { name: groupName, participants: selectedFriends },
      {
        onSettled: () => {
          onCloseModal?.();
        },
        onError: () => {
          toast.error("Failed to create group DM");
        },
      },
    );
  }

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <h2 className="text-2xl font-semibold text-violet-100">
        Create Group DM
      </h2>
      <input
        type="text"
        placeholder="Group Name"
        value={groupName}
        onChange={(e) => setGroupName(e.target.value)}
        className="rounded-lg bg-slate-600 px-4 py-2 text-slate-100"
      />
      <h3 className="text-lg font-semibold text-violet-100">Select Friends</h3>
      <ul className="flex flex-col gap-2">
        {user.friends.map((friend) => (
          <FriendSelection
            key={friend._id}
            friendId={friend.recipient}
            selected={selectedFriends.includes(friend.recipient)}
            onSelect={(id) =>
              setSelectedFriends((friends) =>
                friends.includes(id)
                  ? friends.filter((f) => f !== id)
                  : [...friends, id],
              )
            }
          />
        ))}
      </ul>
      <button
        type="submit"
        className="rounded-lg bg-violet-600 px-4 py-2 text-violet-100"
        disabled={isCreatingChannel}
      >
        Create
      </button>
    </form>
  );
}

export default CreateGroupDMForm;
