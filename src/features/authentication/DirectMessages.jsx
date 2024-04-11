import { useQueryClient } from "@tanstack/react-query";
import { intlFormatDistance } from "date-fns";
import { useEffect } from "react";
import {
  HiMiniUserCircle,
  HiMiniUserGroup,
  HiUserGroup,
} from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { socket } from "../../socket";
import Modal from "../../ui/Modal";
import Spinner from "../../ui/Spinner";
import CreateGroupDMForm from "../channel/CreateGroupDMForm";
import { useUser } from "./useUser";

function DirectMessages() {
  const { user, isLoading, error } = useUser();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  useEffect(
    function () {
      if (!isLoading) {
        user.directMessages.forEach(function (dm) {
          socket.emit("joinChannel", {
            token: localStorage.getItem("token"),
            channelId: dm.channelId._id,
          });
        });
      }

      socket.on("message", (message) => {
        console.log(message);
        queryClient.invalidateQueries(["channel", message.channel]);
      });

      return function () {
        if (!isLoading) {
          user.directMessages.forEach(function (dm) {
            socket.emit("leaveChannel", { channelId: dm.channelId._id });
          });
        }
        socket.off("message");
      };
    },
    [isLoading, user.directMessages, queryClient],
  );

  if (isLoading) return <Spinner />;

  return (
    <div>
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
      <ul className="flex max-h-full flex-col overflow-hidden overflow-y-auto">
        {user.directMessages.length ? (
          user.directMessages.map((dm) => (
            <li
              className="mx-2 my-2 grid max-w-full grid-cols-[auto_minmax(0,_1fr)] items-center gap-4 truncate rounded-xl px-2 py-1 hover:cursor-pointer hover:bg-slate-600/25"
              onClick={() => {
                navigate(`channels/${dm.channelId._id}`);
              }}
              key={dm.channelId._id}
            >
              {dm.channelId.isDM ? (
                <HiMiniUserCircle size={64} className="text-slate-600" />
              ) : (
                <HiMiniUserGroup size={64} className="text-slate-600" />
              )}
              <div>
                <p>
                  {dm.channelId.isDM
                    ? dm?.userId.displayName
                    : dm.channelId.name}
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
                      {dm?.userId.status || ""}
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
    </div>
  );
}

export default DirectMessages;
