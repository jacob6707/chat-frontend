import EmojiPicker, { EmojiStyle } from "emoji-picker-react";
import { useEffect, useRef, useState } from "react";
import { HiFaceSmile, HiPaperAirplane, HiPlusCircle } from "react-icons/hi2";
import useAutosizeTextArea from "../../hooks/useAutosizeTextarea";
import { usePostChannelMessage } from "./usePostChannelMessage";

function MessageField({ channelId, username }) {
  const [focusInput, setFocusInput] = useState(false);
  const [emojiPickerOpen, setEmojiPickerOpen] = useState(false);
  const [content, setContent] = useState("");

  const messageInput = useRef();

  const { message, isSendingMessage } = usePostChannelMessage(
    channelId,
    username || "You",
  );

  useAutosizeTextArea(messageInput.current, 160, content);

  useEffect(
    function () {
      if (focusInput) {
        messageInput.current.focus();
        setFocusInput(false);
      }
    },
    [focusInput],
  );

  useEffect(
    function () {
      setEmojiPickerOpen(false);
      setContent("");
    },
    [channelId],
  );

  function handleSubmit(e) {
    e.preventDefault();
    if (!content) return;
    message(content, {
      onSettled: () => {
        setFocusInput(true);
      },
    });
    setContent("");
    setFocusInput(true);
  }

  return (
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
        {/* <input
            ref={messageInput}
            type="text"
            className="flex-1 bg-transparent py-2 placeholder:text-opacity-75 focus:outline-none"
            placeholder="Message..."
            disabled={isSendingMessage}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            autoFocus
          /> */}
        <textarea
          ref={messageInput}
          type="text"
          rows={1}
          className="flex-1 resize-none bg-transparent py-2 placeholder:text-opacity-75 focus:outline-none"
          placeholder="Message..."
          disabled={isSendingMessage}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSubmit(e);
            }
          }}
          autoFocus
        />
        <div className="relative flex items-center">
          <button
            className="h-full px-4 py-2 hover:text-white"
            disabled={isSendingMessage}
            onClick={() => {
              setEmojiPickerOpen((prev) => !prev);
            }}
            type="button"
          >
            <HiFaceSmile size={28} />
          </button>
          <div className="absolute bottom-16 right-0">
            <EmojiPicker
              open={emojiPickerOpen}
              theme="dark"
              emojiStyle={EmojiStyle.TWITTER}
              onEmojiClick={(emoji, e) => {
                setContent((prev) => prev + emoji.emoji);
              }}
              lazyLoadEmojis
            />
          </div>
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
  );
}

export default MessageField;