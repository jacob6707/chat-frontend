import { useState } from "react";
import { HiUsers } from "react-icons/hi2";
import { useUser } from "../features/authentication/useUser";
import AddFriendForm from "../features/friends/AddFriendForm";
import Friend from "../features/friends/Friend";
import Header from "../ui/Header";
import Spinner from "../ui/Spinner";

function Friends() {
  const [addFriend, setAddFriend] = useState(false);
  const { user, isLoading } = useUser();

  if (isLoading) return <Spinner />;

  return (
    <div>
      <Header>
        <div className="my-3 flex flex-row gap-4 border-r border-slate-600 px-4 [&>svg]:h-7 [&>svg]:w-7 [&>svg]:text-slate-400">
          <HiUsers />
          <h1>Friends</h1>
        </div>
        <div className="flex items-center">
          <button
            className="rounded-lg bg-indigo-900 px-4 py-1 text-sm hover:bg-indigo-800"
            onClick={() => setAddFriend((add) => !add)}
          >
            Add friend
          </button>
        </div>
      </Header>
      {addFriend && <AddFriendForm />}
      <div className="px-4 py-2">
        {user.friends.map((friend) => (
          <Friend
            key={friend._id}
            id={friend.recipient}
            status={friend.status}
          />
        ))}
      </div>
    </div>
  );
}

export default Friends;
