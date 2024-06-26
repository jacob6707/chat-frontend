import { HiPlus, HiStar, HiXMark } from "react-icons/hi2";
import AvatarImage from "../../components/AvatarImage";
import ContextMenu from "../../ui/ContextMenu";
import Modal from "../../ui/Modal";
import Spinner from "../../ui/Spinner";
import { useUser } from "../authentication/useUser";
import StatusBlip from "../user/StatusBlip";
import UserProfile from "../user/UserProfile";
import AddParticipantButton from "./AddParticipantButton";
import { useAddParticipant } from "./useAddParticipant";
import { useRemoveParticipant } from "./useRemoveParticipant";

function ParticipantsList({ channel, userId, ownerId }) {
  const { addParticipant, isAddingParticipant } = useAddParticipant(
    channel._id,
  );
  const { removeParticipant, isRemovingParticipant } = useRemoveParticipant(
    channel._id,
  );
  const { user, isLoading: isLoadingUser } = useUser();

  if (isLoadingUser) return <Spinner />;

  function handleRemoveParticipant(participantId) {
    removeParticipant(participantId);
  }

  return (
    <aside className="row-span-2 bg-slate-950 bg-opacity-75 px-4 py-3 sm:w-80">
      <div className="flex">
        <h1 className="py-2 text-sm font-semibold uppercase text-slate-400">
          Participants &mdash; {channel.participants.length}
        </h1>
        {!channel.isDM && ownerId === userId && (
          <ContextMenu align="bottom">
            <ContextMenu.Toggle id="addParticipants">
              <button
                className="ml-auto text-slate-400 hover:text-white"
                disabled={isAddingParticipant}
              >
                <HiPlus size={24} />
              </button>
            </ContextMenu.Toggle>
            <ContextMenu.List id="addParticipants">
              <div className="flex flex-col gap-2 px-4 py-3">
                <header>
                  <h1 className="text-lg">Add participants</h1>
                  <p className="text-slate-400">Add friends to this channel</p>
                </header>
                <ul>
                  {user.friends.map(
                    (friend) =>
                      friend.status === 3 &&
                      !channel.participants.find(
                        (p) => p._id === friend.recipient,
                      ) && (
                        <AddParticipantButton
                          friendId={friend.recipient}
                          onClick={() => {
                            addParticipant(friend.recipient);
                          }}
                          key={friend._id}
                        />
                      ),
                  )}
                </ul>
              </div>
            </ContextMenu.List>
          </ContextMenu>
        )}
      </div>
      <div className="flex flex-col gap-1">
        {channel.participants.map((participant) => (
          <Modal key={participant._id}>
            <Modal.Open opens={participant._id}>
              <div className="flex items-center gap-2 rounded-lg p-1 hover:cursor-pointer hover:bg-slate-800/75">
                <div className="relative flex-none">
                  <AvatarImage
                    size="small"
                    avatarUrl={participant.avatarUrl}
                    displayName={participant.displayName}
                  />
                  <StatusBlip
                    size="small"
                    status={participant.status.current}
                  />
                </div>
                <div className="flex items-center gap-2 truncate">
                  <span className="truncate text-lg">
                    {participant.displayName}
                  </span>
                  {ownerId === participant._id && (
                    <HiStar
                      size={24}
                      className="inline-block flex-none text-yellow-400"
                    />
                  )}
                </div>
                {!channel.isDM &&
                  ownerId === userId &&
                  participant._id !== userId && (
                    <button
                      className="ml-auto text-slate-400 hover:text-white"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveParticipant(participant._id);
                      }}
                      disabled={isRemovingParticipant}
                    >
                      <HiXMark size={24} />
                    </button>
                  )}
              </div>
            </Modal.Open>
            <Modal.Window name={participant._id}>
              <UserProfile id={participant._id} />
            </Modal.Window>
          </Modal>
        ))}
      </div>
    </aside>
  );
}

export default ParticipantsList;
