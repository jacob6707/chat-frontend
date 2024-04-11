import { Fragment, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import {
  HiChevronDown,
  HiFaceSmile,
  HiMiniUserCircle,
  HiPaperAirplane,
  HiPlusCircle,
} from "react-icons/hi2";
import { useNavigate, useParams } from "react-router-dom";
import { useUser } from "../features/authentication/useUser";
import Message from "../features/channel/Message";
import { useGetChannel } from "../features/channel/useGetChannel";
import { useGetChannelMessages } from "../features/channel/useGetChannelMessages";
import { usePostChannelMessage } from "../features/channel/usePostChannelMessage";
import Spinner from "../ui/Spinner";
import SpinnerMini from "../ui/SpinnerMini";

function Channel() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [focusInput, setFocusInput] = useState(false);
  const [sentMessage, setSentMessage] = useState(false);

  const { isLoadingChannel, channel, error } = useGetChannel(id);
  const {
    isLoading: isLoadingMessages,
    messages,
    error: messagesError,
    hasPreviousPage,
    fetchPreviousPage,
    hasNextPage,
    fetchNextPage,
    isFetching,
  } = useGetChannelMessages(id);
  const { user, isLoading: isLoadingUser } = useUser();
  const { message, isSendingMessage } = usePostChannelMessage(
    id,
    user.displayName || "You",
  );

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

  const [content, setContent] = useState("");

  const chatBox = useRef();
  const messageInput = useRef();

  useEffect(
    function () {
      if (focusInput) {
        messageInput.current.focus();
        chatBox.current.scrollIntoView({ block: "end" });
        setFocusInput(false);
      }
    },
    [focusInput],
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

  function handleSubmit(e) {
    e.preventDefault();
    if (!content) return;
    message(content, {
      onSettled: () => {
        setFocusInput(true);
        setSentMessage(true);
        chatBox.current?.scrollIntoView({ block: "end" });
      },
    });
    setContent("");
    setFocusInput(true);
    setSentMessage(true);
    chatBox.current?.scrollIntoView({ block: "end" });
  }

  return (
    <div className="relative grid h-full max-h-dvh grid-cols-[1fr_auto] grid-rows-[auto_1fr_auto]">
      <header className="col-span-2 w-full border-b border-slate-950 bg-indigo-950 bg-opacity-35 px-4 py-3 text-xl">
        <h1>
          {channel.isDM
            ? channel.participants.find((p) => p._id !== user._id).displayName
            : channel.name}
        </h1>
      </header>
      <main className="flex flex-col overflow-y-auto">
        <section
          className="mt-auto flex w-full flex-col gap-4 self-end px-4"
          ref={chatBox}
        >
          {hasPreviousPage && (
            <button
              className="m-auto rounded-lg bg-slate-800/90 px-4 py-2 text-center text-sm text-indigo-500 hover:bg-slate-800/50"
              onClick={() => fetchPreviousPage()}
              disabled={isFetching}
            >
              {isFetching ? <SpinnerMini /> : "Load more"}
            </button>
          )}
          {messages?.pages.length
            ? messages?.pages.map((page, i) => (
                <Fragment key={i}>
                  {page.messages.toReversed().map((message) => (
                    <Message key={message._id} message={message} />
                  ))}
                </Fragment>
              ))
            : "No messages"}
          {hasNextPage && (
            <button
              className="m-auto bg-slate-800/50 px-4 py-2 text-center text-sm text-indigo-500"
              onClick={fetchNextPage}
              disabled={isFetching}
            >
              {isFetching ? <SpinnerMini /> : "Load more"}
            </button>
          )}
        </section>
      </main>
      {sentMessage && (
        <button
          className="absolute bottom-20 right-8 rounded-full bg-slate-900 p-2"
          onClick={() => {
            chatBox.current?.scrollIntoView({ block: "end" });
            setSentMessage(false);
          }}
          disabled={isLoading}
        >
          <HiChevronDown size={24} />
        </button>
      )}
      <aside className="row-span-2 bg-slate-950 bg-opacity-75 px-4 py-3 sm:w-80">
        <h1 className="py-2 text-sm font-semibold uppercase text-slate-400">
          Participants &mdash; {channel.participants.length}
        </h1>
        <div className="flex flex-col gap-2">
          {channel.participants.map((participant) => (
            <div key={participant._id} className="flex items-center gap-2">
              {participant.avatarUrl ? (
                <img
                  src={participant.avatarUrl}
                  alt={`Avatar of ${participant.displayName}`}
                  className="h-12 w-12 flex-none rounded-full object-cover"
                />
              ) : (
                <HiMiniUserCircle className="h-12 w-12 flex-none text-slate-600" />
              )}
              <span className="truncate text-lg">
                {participant.displayName}
              </span>
            </div>
          ))}
        </div>
      </aside>
      <footer className="w-full p-4">
        <form
          className="flex w-full items-center rounded-lg bg-indigo-900"
          onSubmit={handleSubmit}
        >
          <button
            className="h-full px-4 py-2 hover:text-white"
            type="button"
            disabled={isSendingMessage}
          >
            <HiPlusCircle size={32} />
          </button>
          <input
            ref={messageInput}
            type="text"
            className="flex-1 bg-transparent py-2 placeholder:text-opacity-75 focus:outline-none"
            placeholder="Message..."
            disabled={isSendingMessage}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            autoFocus
          />
          <div className="flex items-center">
            <button
              className="h-full px-4 py-2 hover:text-white"
              disabled={isSendingMessage}
              type="button"
            >
              <HiFaceSmile size={28} />
            </button>
          </div>
          <div className="flex items-center border-l border-slate-600">
            <button
              className="h-full px-4 py-2 hover:text-white"
              disabled={isSendingMessage}
              type="submit"
            >
              <HiPaperAirplane size={24} />
            </button>
          </div>
        </form>
      </footer>
    </div>
  );
}

export default Channel;
