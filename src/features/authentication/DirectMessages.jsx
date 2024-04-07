import { intlFormatDistance } from "date-fns";
import { HiMiniUserCircle } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import Spinner from "../../ui/Spinner";
import { useUser } from "./useUser";

function DirectMessages() {
  const { user, isLoading } = useUser();
  const navigate = useNavigate();

  if (isLoading) return <Spinner />;

  return (
    <ul className="flex max-h-full flex-col overflow-hidden overflow-y-auto">
      {user.directMessages.length ? (
        user.directMessages.map((dm) => (
          <li
            className="mx-4 my-3 grid max-w-full grid-cols-[auto_minmax(0,_1fr)] items-center gap-4 truncate rounded-xl hover:cursor-pointer hover:bg-slate-600/25"
            onClick={() => {
              navigate(`channels/${dm.channelId._id}`);
            }}
            key={dm.channelId._id}
          >
            <HiMiniUserCircle size={64} className="text-slate-600" />
            <div>
              <p>
                {dm.channelId.isDM ? dm.userId.displayName : dm.channelId.name}
              </p>
              <div className="flex items-center justify-between gap-4">
                {dm.channelId.messages.length ? (
                  <>
                    <span className="truncate text-slate-400">
                      {dm.channelId.messages.at(0).content}
                    </span>
                    <span className="text-slate-400">
                      {intlFormatDistance(
                        dm.channelId.messages.at(0).createdAt,
                        new Date(),
                        {
                          style: "narrow",
                        },
                      )}
                    </span>
                  </>
                ) : (
                  <span className="text-slate-400">
                    {dm.userId.status || "Online"}
                  </span>
                )}
              </div>
            </div>
          </li>
        ))
      ) : (
        <p className="p-4">No direct messages</p>
      )}
    </ul>
  );
}

export default DirectMessages;
