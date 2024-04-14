function ChannelHeader({ name, isDM = false, online = false }) {
  return (
    <header className="col-span-2 w-full border-b border-slate-950 bg-indigo-950 bg-opacity-35 px-4 py-3 text-xl">
      <h1>
        {name}
        {isDM && online ? (
          <span className="ml-2 inline-block h-3 w-3 rounded-full bg-green-500"></span>
        ) : (
          <span className="ml-2 inline-block h-3 w-3 rounded-full bg-slate-400"></span>
        )}
      </h1>
    </header>
  );
}

export default ChannelHeader;
