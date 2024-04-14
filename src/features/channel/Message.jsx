import { formatRelative } from "date-fns";
import { HiUserCircle } from "react-icons/hi2";
import { capitalizeFirstLetter } from "../../util/helpers";

function Message({ message }) {
  return (
    <div
      className={`flex max-w-full items-center gap-2 hover:bg-slate-800/25 ${message?.temp ? "text-slate-400" : ""}`}
    >
      {message?.author?.avatarUrl ? (
        <img
          src={message.author.avatarUrl}
          alt={message.author.displayName}
          className="h-12 w-12 flex-none self-start rounded-full"
        />
      ) : (
        <HiUserCircle className="flex-none self-start" size={48} />
      )}

      <div className="min-w-0 flex-shrink">
        <div className="flex items-end gap-2">
          <h2 className="text-base font-semibold">
            {message.author.displayName}
          </h2>{" "}
          <span className="text-xs font-normal text-slate-400">
            {capitalizeFirstLetter(
              formatRelative(message.createdAt, Date.now(), {
                weekStartsOn: 1,
              }),
            )}
          </span>
        </div>
        <p className="w-full text-wrap break-words text-base">
          {message.content}
        </p>
      </div>
    </div>
  );
}

export default Message;
