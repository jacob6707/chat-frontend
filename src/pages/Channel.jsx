import { Fragment, useEffect, useRef, useState } from "react";
import {
  HiChevronDown,
  HiFaceSmile,
  HiPaperAirplane,
  HiPlusCircle,
} from "react-icons/hi2";
import { useParams } from "react-router-dom";
import { useUser } from "../features/authentication/useUser";
import Message from "../features/channel/Message";
import { useGetChannel } from "../features/channel/useGetChannel";
import { useGetChannelMessages } from "../features/channel/useGetChannelMessages";
import { usePostChannelMessage } from "../features/channel/usePostChannelMessage";
import Spinner from "../ui/Spinner";
import SpinnerMini from "../ui/SpinnerMini";

function Channel() {
  const { id } = useParams();
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
  const { message, isSendingMessage } = usePostChannelMessage(id);
  const { user, isLoading: isLoadingUser } = useUser();

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

  const isLoading = isLoadingChannel || isLoadingUser || isLoadingMessages;

  const [content, setContent] = useState("");

  const chatBox = useRef();
  const messageInput = useRef();

  useEffect(
    function () {
      if (focusInput) {
        messageInput.current.focus();
        setFocusInput(false);
      }
    },
    [focusInput],
  );

  if (isLoading) return <Spinner />;

  function handleSubmit(e) {
    e.preventDefault();
    if (!content) return;
    message(content, {
      onSettled: () => {
        setContent("");
        setFocusInput(true);
        setSentMessage(true);
      },
    });
  }

  return (
    <div className="relative grid h-full max-h-dvh grid-rows-[auto_1fr_auto]">
      <header className="w-full border-b border-slate-950 bg-indigo-950 bg-opacity-35 px-4 py-3 text-xl">
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
