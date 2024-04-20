import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import toast from "react-hot-toast";
import {
  HiChatBubbleOvalLeftEllipsis,
  HiUserGroup,
  HiUserMinus,
  HiUserPlus,
} from "react-icons/hi2";
import { useLocation, useNavigate } from "react-router-dom";
import DMChannel from "../../components/sidebar/DMChannel";
import { socket } from "../../services/socket";
import Modal from "../../ui/Modal";
import Spinner from "../../ui/Spinner";
import { truncate } from "../../util/helpers";
import CreateGroupDMForm from "../channel/CreateGroupDMForm";
import { useUser } from "./useUser";

function DirectMessages() {
  const { user, isLoading } = useUser();

  const navigate = useNavigate();
  const location = useLocation();
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
        if (
          message?.action === "create" &&
          !location.pathname.includes(message.channel)
        ) {
          const channelName = truncate(
            user.directMessages.find(
              (dm) => dm.channelId._id === message.channel,
            ).channelId.name,
            10,
          );
          toast(
            `[${channelName}] ${message.sender}: ${truncate(message.content, 40)}`,
            {
              icon: <HiChatBubbleOvalLeftEllipsis size={24} />,
            },
          );
        }
        queryClient.invalidateQueries({
          queryKey: ["channelMessages", message.channel],
        });
        queryClient.invalidateQueries({
          queryKey: ["channel", message.channel],
        });
      });

      socket.on("friendRequestAccepted", (data) => {
        toast(`${data.name} accepted your friend request.`, {
          icon: <HiUserPlus size={24} />,
        });
        queryClient.invalidateQueries({ queryKey: ["user"] });
      });

      socket.on("friendRequest", (data) => {
        toast(`${data.name} sent you a friend request.`, {
          icon: <HiUserPlus size={24} />,
        });
        queryClient.invalidateQueries({ queryKey: ["user"] });
      });

      socket.on("friendRemoved", (data) => {
        toast(`${data.name} removed you as a friend.`, {
          icon: <HiUserMinus size={24} />,
        });
        queryClient.invalidateQueries({ queryKey: ["user"] });
      });

      socket.on("userJoined", (data) => {
        queryClient.invalidateQueries({ queryKey: ["channel", data.channel] });
      });

      socket.on("userLeft", (data) => {
        queryClient.invalidateQueries({ queryKey: ["channel", data.channel] });
      });

      socket.on("channel", (data) => {
        queryClient.invalidateQueries({ queryKey: ["user"] });
        if (data.action === "create") {
          toast("You have been added to a new channel", {
            icon: <HiChatBubbleOvalLeftEllipsis size={24} />,
          });
        }
        if (
          data.action === "delete" &&
          location.pathname.includes(data.channel._id)
        ) {
          toast.error("The channel has been deleted");
          navigate("/app");
        }
      });

      socket.on("status", (data) => {
        if (user.friends.some((friend) => friend.recipient === data._id)) {
          queryClient.invalidateQueries({ queryKey: ["user"] });
          const channel = user.directMessages.find(
            (dm) =>
              dm.channelId.participants.includes(data._id) && dm.channelId.isDM,
          );
          if (channel)
            queryClient.invalidateQueries({
              queryKey: ["channel", channel.channelId._id],
            });
        }
      });

      return function () {
        if (!isLoading) {
          user.directMessages.forEach(function (dm) {
            socket.emit("leaveChannel", { channelId: dm.channelId._id });
          });
        }
        socket.off("message");
        socket.off("userJoined");
        socket.off("userLeft");
        socket.off("friendRequestAccepted");
        socket.off("friendRequest");
        socket.off("friendRemoved");
        socket.off("channel");
        socket.off("status");
      };
    },
    [
      isLoading,
      user.directMessages,
      location.pathname,
      queryClient,
      navigate,
      user.friends,
    ],
  );

  if (isLoading) return <Spinner />;

  return (
    <div className="max-h-full overflow-y-auto overflow-x-hidden">
      {user.friends.length > 0 && (
        <Modal>
          <ul className="flex flex-col gap-2 px-4 py-3">
            <Modal.Open opens="groupDM">
              <button className="flex w-full gap-4 rounded-lg px-4 py-2 text-left text-lg font-semibold tracking-wide text-slate-300 hover:bg-slate-600 hover:bg-opacity-50 hover:text-slate-100 [&>svg]:h-7 [&>svg]:w-7">
                <HiUserGroup className="" /> <span>Create Group</span>
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
          <p className="p-4 text-center text-slate-400">
            You have no direct messages or groups.
          </p>
        )}
      </ul>
    </div>
  );
}

export default DirectMessages;
