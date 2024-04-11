import { formatRelative } from "date-fns";
import { HiUserCircle } from "react-icons/hi2";
import { capitalizeFirstLetter } from "../../util/helpers";

function Message({ message, temp }) {
  return (
    <div
      className={`flex items-center gap-2 hover:bg-slate-800/25 ${temp ? "text-slate-400" : ""}`}
    >
      {message?.author?.avatarUrl ? (
        <img
          src={message.author.avatarUrl}
          alt={message.author.displayName}
          className="h-12 w-12 rounded-full"
        />
      ) : (
        <HiUserCircle size={48} />
      )}

      <div>
        <div className="flex items-end gap-2">
          <h2 className="text-base font-semibold">
            {message.author.displayName}
          </h2>{" "}
          <span className="text-sm font-light text-slate-400">
            {capitalizeFirstLetter(
              formatRelative(message.createdAt, Date.now(), {
                weekStartsOn: 1,
              }),
            )}
          </span>
        </div>
        <p className="text-sm">{message.content}</p>
      </div>
    </div>
  );
}

export default Message;
