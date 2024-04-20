import { useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { useUser } from "../features/authentication/useUser";
import ChannelHeader from "../features/channel/ChannelHeader";
import MessageField from "../features/channel/MessageField";
import MessagesBox from "../features/channel/MessagesBox";
import ParticipantsList from "../features/channel/ParticipantsList";
import { useGetChannel } from "../features/channel/useGetChannel";
import { useGetChannelMessages } from "../features/channel/useGetChannelMessages";
import Spinner from "../ui/Spinner";

function Channel() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { isLoadingChannel, channel, error } = useGetChannel(id);
  const {
    isLoadingMessages,
    messages,
    error: messagesError,
    hasPreviousPage,
    fetchPreviousPage,
    isFetching,
  } = useGetChannelMessages(id);
  const { user, isLoading: isLoadingUser } = useUser();
  const isLoading = isLoadingChannel || isLoadingUser || isLoadingMessages;

  useEffect(
    function () {
      if (channel) {
        const title = channel.isDM
          ? channel.participants.find((p) => p._id !== user._id).displayName
          : channel.name;
        document.title = `${title} - SwiftChat`;
      }
    },
    [channel, user],
  );

  useEffect(
    function () {
      if (error || messagesError) {
        toast.error("Failed to load channel");
        navigate("/app");
      }
    },
    [error, messagesError, navigate],
  );

  if (isLoading || error || messagesError) return <Spinner />;

  const channelName = channel.isDM
    ? channel.participants.find((p) => p._id !== user._id).displayName
    : channel.name;

  return (
    <div className="relative grid h-full max-h-dvh grid-cols-[1fr_auto] grid-rows-[auto_1fr_auto]">
      <ChannelHeader
        name={channelName}
        isDM={channel.isDM}
        status={channel?.status}
      />
      <MessagesBox
        channelId={id}
        messages={messages}
        hasPreviousPage={hasPreviousPage}
        fetchPreviousPage={fetchPreviousPage}
        isFetching={isFetching}
      />
      <ParticipantsList
        channel={channel}
        userId={user._id}
        ownerId={channel.owner}
      />
      <MessageField
        channelId={id}
        username={user.displayName}
        avatarUrl={user.avatarUrl}
      />
    </div>
  );
}

export default Channel;
