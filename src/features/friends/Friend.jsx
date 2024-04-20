import Modal from "../../ui/Modal";
import SpinnerMini from "../../ui/SpinnerMini";
import UserProfile from "../user/UserProfile";
import FriendCard from "./FriendCard";
import { useFriend } from "./useFriend";

function Friend({ id, status }) {
  const { friend, isLoading, error } = useFriend(id);

  if (isLoading) return <SpinnerMini />;

  const friendStatus = {
    1: "Outgoing friend request",
    2: "Incoming friend request",
    3: friend.status.current || "Offline",
  };

  return (
    <Modal>
      <Modal.Open opens={id}>
        <div className="border-t border-slate-950 px-2 py-1 last:border-b hover:cursor-pointer hover:rounded-lg hover:border-slate-800 hover:bg-slate-800">
          {error && <p>Friend not found</p>}
          {friend && (
            <FriendCard friend={friend} status={friendStatus[status]} />
          )}
        </div>
      </Modal.Open>
      <Modal.Window name={id}>
        <UserProfile id={id} />
      </Modal.Window>
    </Modal>
  );
}

export default Friend;
