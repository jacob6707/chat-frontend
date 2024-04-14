import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { HiUserGroup } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import DMChannel from "../../components/sidebar/DMChannel";
import { socket } from "../../services/socket";
import Modal from "../../ui/Modal";
import Spinner from "../../ui/Spinner";
import CreateGroupDMForm from "../channel/CreateGroupDMForm";
import { useDeleteChannel } from "../channel/useDeleteChannel";
import { useUser } from "./useUser";

function DirectMessages() {
  const { user, isLoading, error } = useUser();
  const { deleteChannel, isDeletingChannel } = useDeleteChannel();

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  useEffect(
    function () {
      if (!isLoading) {
        user.directMessages.forEach(function (dm) {
          socket.emit("joinChannel", {
            channelId: dm.channelId._id,
          });
        });
      }

      socket.on("message", (message) => {
        queryClient.invalidateQueries({
          queryKey: ["channelMessages", message.channel],
        });
        queryClient.invalidateQueries({
          queryKey: ["channel", message.channel],
        });
      });

      socket.on("userJoined", (data) => {
        queryClient.invalidateQueries({ queryKey: ["channel", data.channel] });
      });

      socket.on("userLeft", (data) => {
        queryClient.invalidateQueries({ queryKey: ["channel", data.channel] });
      });

      return function () {
        if (!isLoading) {
          user.directMessages.forEach(function (dm) {
            socket.emit("leaveChannel", { channelId: dm.channelId._id });
          });
        }
        socket.off("message");
        socket.off("userJoined");
      };
    },
    [isLoading, user.directMessages, queryClient],
  );

  if (isLoading) return <Spinner />;

  return (
    <div className="max-h-full overflow-y-auto overflow-x-hidden">
      {user.friends.length > 0 && (
        <Modal>
          <ul className="flex flex-col gap-2 px-4 py-3">
            <Modal.Open opens="groupDM">
              <button className="flex w-full gap-4 rounded-lg px-4 py-2 text-left text-lg font-semibold tracking-wide text-slate-300 hover:bg-slate-600 hover:bg-opacity-50 hover:text-slate-100 [&>svg]:h-7 [&>svg]:w-7">
                <HiUserGroup className="" /> <span>Create Group DM</span>
              </button>
            </Modal.Open>
          </ul>

          <Modal.Window name="groupDM">
            <CreateGroupDMForm user={user} />
          </Modal.Window>
        </Modal>
      )}
      <ul className="flex flex-col">
        {user.directMessages.length ? (
          user.directMessages.map((dm) => (
            <DMChannel channelId={dm.channelId._id} key={dm.channelId._id} />
          ))
        ) : (
          <p className="p-4">No direct messages</p>
        )}
      </ul>
    </div>
  );
}

export default DirectMessages;
