import { Fragment, useEffect, useRef, useState } from "react";
import { HiChevronDown } from "react-icons/hi2";
import { useDetectScrolledToBottom } from "../../hooks/useDetectScrolledToBottom";
import SpinnerMini from "../../ui/SpinnerMini";
import Message from "../message/Message";

function MessagesBox({
  channelId = null,
  messages,
  hasPreviousPage,
  fetchPreviousPage,
  isFetching,
}) {
  const [sentMessage, setSentMessage] = useState(false);
  const channelBox = useRef();
  const chatBox = useRef();

  const { isBottom } = useDetectScrolledToBottom(channelBox);

  useEffect(() => {
    channelBox.current.scrollIntoView({ block: "end" });
    chatBox.current.scrollIntoView({ block: "end" });
  }, [channelId]);

  useEffect(() => {
    if (isBottom) {
      chatBox.current.scrollIntoView({ block: "end" });
      setSentMessage(false);
    }
  }, [messages, isBottom]);

  return (
    <>
      <main
        className="flex flex-col overflow-y-auto overflow-x-clip"
        ref={channelBox}
      >
        <section
          className="mt-auto flex w-full flex-col gap-4 self-end px-4 "
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
          {messages?.pages.at(0).totalMessages > 0 ? (
            messages?.pages.map((page, i) => (
              <Fragment key={i}>
                {page.messages.toReversed().map((message) => (
                  <Message key={message._id} message={message} />
                ))}
              </Fragment>
            ))
          ) : (
            <div className="text-center text-slate-400">
              No messages yet. Send one to get the conversation going!
            </div>
          )}
        </section>
      </main>
      {sentMessage && (
        <button
          className="absolute bottom-20 right-8 rounded-full bg-slate-900 p-2"
          onClick={() => {
            chatBox.current?.scrollIntoView({
              block: "end",
              behavior: "smooth",
            });
            setSentMessage(false);
          }}
          disabled={isFetching}
        >
          <HiChevronDown size={24} />
        </button>
      )}
    </>
  );
}

export default MessagesBox;
