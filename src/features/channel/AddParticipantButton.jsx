import ContextMenu from "../../ui/ContextMenu";
import SpinnerMini from "../../ui/SpinnerMini";
import { useFriend } from "../friends/useFriend";

function AddParticipantButton({ friendId, onClick }) {
  const { friend, isLoading } = useFriend(friendId);

  if (isLoading) return <SpinnerMini />;

  return (
    <ContextMenu.Button onClick={onClick}>
      {friend.displayName}
    </ContextMenu.Button>
  );
}

export default AddParticipantButton;
