import { intlFormatDistance } from "date-fns";
import { HiMiniUserCircle, HiMiniUserGroup, HiXMark } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { useDeleteChannel } from "../../features/channel/useDeleteChannel";
import { useGetChannel } from "../../features/channel/useGetChannel";
import StatusBlip from "../../features/user/StatusBlip";
import Spinner from "../../ui/Spinner";

function DMChannel({ channelId }) {
  const { channel, isLoadingChannel, error } = useGetChannel(channelId);
  const { deleteChannel, isDeletingChannel } = useDeleteChannel();

  const navigate = useNavigate();

  if (isLoadingChannel) return <Spinner />;

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
        <div className="relative">
          <HiMiniUserCircle size={64} className="text-slate-600" />
          <StatusBlip size="medium" status={channel.status} />
        </div>
      ) : (
        <div>
          <HiMiniUserGroup size={64} className="text-slate-600" />
        </div>
      )}
      <div className="w-full">
        <p>{channel.name}</p>
        <div className="flex items-center justify-between gap-4">
          {channel.messages.length > 0 ? (
            <>
              <span className="truncate text-slate-400">
                {channel.messages.at(0).content}
              </span>
              <span className="text-slate-400">
                {intlFormatDistance(
                  channel.messages.at(0).createdAt,
                  new Date(),
                  {
                    style: "narrow",
                  },
                )}
              </span>
            </>
          ) : (
            <span className="text-slate-400">
              {channel.status || "Offline"}
            </span>
          )}
        </div>
      </div>
      {!channel.isDM && (
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
