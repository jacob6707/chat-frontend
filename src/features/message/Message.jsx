import { format, formatRelative } from "date-fns";
import { useState } from "react";
import { HiPencilAlt } from "react-icons/hi";
import { HiTrash } from "react-icons/hi2";
import AvatarImage from "../../components/AvatarImage";
import Tooltip from "../../ui/Tooltip";
import { capitalizeFirstLetter } from "../../util/helpers";
import { useUser } from "../authentication/useUser";
import EditMessageForm from "./EditMessageForm";
import { useDeleteMessage } from "./useDeleteMessage";
import { useEditMessage } from "./useEditMessage";

function Message({ message }) {
  const { user, isLoading } = useUser();
  const { editMessage, isEditingMessage } = useEditMessage(
    message.channel,
    message._id,
  );
  const { deleteMessage, isDeletingMessage } = useDeleteMessage(
    message.channel,
    message._id,
  );

  const isMutating = isEditingMessage || isDeletingMessage;

  const [isEditing, setIsEditing] = useState(false);

  if (isLoading) return null;

  const canModify = user._id === message.author._id;

  function handleEditMessage(content) {
    editMessage(content);
    setIsEditing(false);
  }

  return (
    <div
      className={`group/msg relative flex max-w-full items-center gap-2 hover:bg-slate-800/25 ${message?.temp ? "text-slate-400" : ""}`}
    >
      <AvatarImage
        avatarUrl={message.author.avatarUrl}
        displayName={message.author.displayName}
        size="small"
      />

      <div className="min-w-0 flex-1">
        <div className="flex items-end gap-2">
          <h2 className="text-base font-semibold">
            {message.author.displayName}
          </h2>
          <Tooltip
            text={capitalizeFirstLetter(
              formatRelative(message.createdAt, Date.now(), {
                weekStartsOn: 1,
              }),
            )}
            className="text-slate-400"
          >
            {format(message.createdAt, "PPPP p")}
          </Tooltip>
          {message.createdAt !== message.updatedAt && (
            <Tooltip text="(edited)" className="text-slate-600">
              {format(message.updatedAt, "PPPP p")}
            </Tooltip>
          )}
        </div>
        {isEditing ? (
          <EditMessageForm
            message={message.content}
            onReset={() => setIsEditing(false)}
            onSave={(message) => handleEditMessage(message)}
          />
        ) : (
          <p className="w-full whitespace-pre-line text-wrap break-words text-base">
            {message.content}
          </p>
        )}
      </div>
      {canModify && (
        <ul className="absolute -right-4 -top-4 hidden rounded-lg bg-slate-900 text-slate-400 group-hover/msg:flex">
          <button
            className="p-2 first:rounded-l-lg last:rounded-r-lg hover:bg-slate-800/75 hover:text-slate-50"
            title="Edit message"
            onClick={() => setIsEditing((prev) => !prev)}
            disabled={isMutating}
          >
            <HiPencilAlt size={16} />
          </button>
          <button
            className="p-2 first:rounded-l-lg last:rounded-r-lg hover:bg-slate-800/75 hover:text-slate-50"
            title="Delete message"
            onClick={() => deleteMessage()}
            disabled={isMutating}
          >
            <HiTrash size={16} />
          </button>
        </ul>
      )}
    </div>
  );
}

export default Message;
