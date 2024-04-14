import { HiMiniUserCircle, HiPlus, HiStar, HiXMark } from "react-icons/hi2";
import { useAddParticipant } from "./useAddParticipant";
import { useRemoveParticipant } from "./useRemoveParticipant";

function ParticipantsList({ channel, userId, ownerId }) {
  const { addParticipant, isAddingParticipant } = useAddParticipant(
    channel._id,
  );
  const { removeParticipant, isRemovingParticipant } = useRemoveParticipant(
    channel._id,
  );

  function handleRemoveParticipant(participantId) {
    removeParticipant(participantId);
  }

  return (
    <aside className="row-span-2 bg-slate-950 bg-opacity-75 px-4 py-3 sm:w-80">
      <div className="flex">
        <h1 className="py-2 text-sm font-semibold uppercase text-slate-400">
          Participants &mdash; {channel.participants.length}
        </h1>
        {ownerId === userId && (
          <button
            className="ml-auto text-slate-400 hover:text-white"
            disabled={isAddingParticipant}
          >
            <HiPlus size={24} />
          </button>
        )}
      </div>
      <div className="flex flex-col gap-2">
        {channel.participants.map((participant) => (
          <div
            key={participant._id}
            className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-2"
          >
            {participant.avatarUrl ? (
              <img
                src={participant.avatarUrl}
                alt={`Avatar of ${participant.displayName}`}
                className="h-12 w-12 flex-none rounded-full object-cover"
              />
            ) : (
              <HiMiniUserCircle className="h-12 w-12 flex-none text-slate-600" />
            )}
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
                  className="text-slate-400 hover:text-white"
                  onClick={() => handleRemoveParticipant(participant._id)}
                  disabled={isRemovingParticipant}
                >
                  <HiXMark size={24} />
                </button>
              )}
          </div>
        ))}
      </div>
    </aside>
  );
}

export default ParticipantsList;
