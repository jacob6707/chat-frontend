import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import {
  HiFaceSmile,
  HiPaperAirplane,
  HiPlusCircle,
  HiUserCircle,
} from "react-icons/hi2";

function Channel() {
  const [messages, setMessages] = useState([]);
  const chatBox = useRef(null);

  const { register, handleSubmit, reset } = useForm();

  useEffect(
    function () {
      chatBox.current.scrollIntoView({ behavior: "smooth", block: "end" });
    },
    [messages],
  );

  function handleClick({ content }) {
    if (!content) return;
    setMessages((prev) => [...prev, { id: Date.now(), content }]);
    reset();
  }

  return (
    <div className="grid h-full max-h-dvh grid-rows-[auto_1fr_auto]">
      <header className="w-full border-b border-slate-950 bg-indigo-950 bg-opacity-35 px-4 py-3 text-xl">
        <h1>Channel</h1>
      </header>
      <main className="flex flex-col overflow-auto">
        <section
          className="mt-auto flex w-full flex-col gap-4 self-end"
          ref={chatBox}
        >
          {messages.length
            ? messages.map((message) => (
                <div
                  className="flex items-center gap-2 bg-slate-950 bg-opacity-25 px-4"
                  key={message.id}
                >
                  <HiUserCircle size={48} />
                  <div>
                    <h2 className="text-lg font-semibold">Username</h2>
                    <p className="">{message.content}</p>
                  </div>
                </div>
              ))
            : "No messages"}
        </section>
      </main>
      <footer className="w-full p-4">
        <form
          className="flex w-full items-center rounded-lg bg-indigo-900"
          onSubmit={handleSubmit(handleClick)}
        >
          <button className="h-full px-4 py-2 hover:text-white">
            <HiPlusCircle size={32} />
          </button>
          <input
            type="text"
            className="flex-1 bg-transparent py-2 placeholder:text-opacity-75 focus:outline-none"
            placeholder="Message..."
            {...register("content")}
          />
          <div className="flex items-center">
            <button className="h-full px-4 py-2 hover:text-white">
              <HiFaceSmile size={28} />
            </button>
          </div>
          <div className="flex items-center border-l border-slate-600">
            <button className="h-full px-4 py-2 hover:text-white">
              <HiPaperAirplane size={24} />
            </button>
          </div>
        </form>
      </footer>
    </div>
  );
}

export default Channel;
