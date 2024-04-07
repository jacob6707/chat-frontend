import Spinner from "../../ui/Spinner";
import FriendCard from "./FriendCard";
import { useFriend } from "./useFriend";

function Friend({ id, status }) {
  const { friend, isLoading, error } = useFriend(id);

  if (isLoading) return <Spinner />;

  const friendStatus = {
    1: "Outgoing friend request",
    2: "Incoming friend request",
    3: friend.status,
  };

  return (
    <div className="border-t border-slate-950 px-2 py-1 hover:rounded-lg hover:border-none hover:bg-slate-800">
      {error && <p>Friend not found</p>}
      {friend && <FriendCard friend={friend} status={friendStatus[status]} />}
    </div>
  );
}

export default Friend;
