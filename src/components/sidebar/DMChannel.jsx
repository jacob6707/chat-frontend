import { intlFormatDistance } from "date-fns";
import { HiMiniUserGroup, HiXMark } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../features/authentication/useUser";
import { useDeleteChannel } from "../../features/channel/useDeleteChannel";
import { useGetChannel } from "../../features/channel/useGetChannel";
import StatusBlip from "../../features/user/StatusBlip";
import Spinner from "../../ui/Spinner";
import AvatarImage from "../AvatarImage";

function DMChannel({ channelId }) {
  const { channel, isLoadingChannel, error } = useGetChannel(channelId);
  const { deleteChannel, isDeletingChannel } = useDeleteChannel();
  const { user, isLoading: isLoadingUser } = useUser();

  const navigate = useNavigate();

  if (isLoadingChannel || isLoadingUser) return <Spinner />;

  if (error)
    return (
      <li className="mx-2 my-2 flex max-w-full items-center gap-4 truncate rounded-xl px-2 py-1 hover:cursor-pointer hover:bg-slate-600/25">
        {error.message}
      </li>
    );

  return (
    <li
      className="group mx-2 my-2 flex max-w-full items-center gap-4 truncate rounded-xl px-2 py-1 hover:cursor-pointer hover:bg-slate-600/25"
      onClick={() => {
        navigate(`channels/${channelId}`);
      }}
    >
      {channel.isDM ? (
        <div className="relative flex-none">
          <AvatarImage
            size="medium"
            avatarUrl={
              channel.participants.find(
                (participant) => participant._id !== user._id,
              ).avatarUrl
            }
            displayName={channel.name}
          />

          {/* <HiMiniUserCircle size={64} className="text-slate-600" /> */}
          <StatusBlip size="medium" status={channel.status} />
        </div>
      ) : (
        <div>
          <HiMiniUserGroup size={64} className="text-slate-600" />
        </div>
      )}
      <div className="w-full min-w-0">
        <p className="truncate">{channel.name}</p>
        <div className="flex items-center justify-between gap-4">
          {channel.messages.length > 0 ? (
            <>
              <span className="truncate text-slate-400">
                {channel.messages.at(0).content}
              </span>
              <span className="flex-none text-slate-400">
                {intlFormatDistance(
                  channel.messages.at(0).createdAt,
                  new Date(),
                  {
                    style: "narrow",
                  },
                )}
              </span>
            </>
          ) : channel.isDM ? (
            <span className="text-slate-400">
              {channel.status || "Offline"}
            </span>
          ) : (
            <span className="text-slate-400">
              {channel.participants.length} members
            </span>
          )}
        </div>
      </div>
      {!channel.isDM && channel.owner === user._id && (
        <button
          className="hidden text-slate-300 hover:text-slate-100 group-hover:block"
          onClick={(e) => {
            e.stopPropagation();
            deleteChannel(channelId);
          }}
          disabled={isDeletingChannel}
        >
          {isDeletingChannel ? "..." : <HiXMark size={24} />}
        </button>
      )}
    </li>
  );
}

export default DMChannel;
