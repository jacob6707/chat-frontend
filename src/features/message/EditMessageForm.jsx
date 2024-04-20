import { useEffect, useRef, useState } from "react";
import useAutosizeTextArea from "../../hooks/useAutosizeTextarea";
import { MESSAGE_LENGTH_LIMIT } from "../../util/constants";

function EditMessageForm({ message = "", onReset, onSave }) {
  const messageInput = useRef();
  const [content, setContent] = useState(message);

  useAutosizeTextArea(messageInput.current, MESSAGE_LENGTH_LIMIT * 24, content);

  useEffect(() => {
    if (messageInput.current) {
      messageInput.current.style.height = "0px";
      const scrollHeight = Number(messageInput.current.scrollHeight);
      messageInput.current.style.height = scrollHeight + "px";
    }
  }, [message, messageInput]);

  function handleSubmit(e) {
    e.preventDefault();
    onSave(content);
  }

  return (
    <form className="w-full" onSubmit={handleSubmit}>
      <textarea
        ref={messageInput}
        className="w-full flex-1 resize-none rounded-lg bg-slate-800 p-2 text-base text-slate-50 focus:outline-none"
        value={content}
        rows={1}
        maxLength={MESSAGE_LENGTH_LIMIT}
        onChange={(e) => setContent(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e);
          }
          if (e.key === "Escape") {
            onReset();
          }
        }}
        autoFocus
      />
      <div className="flex justify-end gap-1 text-xs text-slate-300">
        <button className="text-blue-500" type="reset" onClick={onReset}>
          Esc
        </button>{" "}
        to cancel,
        <button className="text-blue-500" type="submit">
          Enter
        </button>{" "}
        to save
      </div>
    </form>
  );
}

export default EditMessageForm;
