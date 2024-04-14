import StatusBlip from "../user/StatusBlip";

function ChannelHeader({ name, isDM = false, status = "Offline" }) {
  return (
    <header className="col-span-2 flex w-full items-center truncate border-b border-slate-950 bg-indigo-950 bg-opacity-35 px-4 py-3 text-xl">
      <h1 className="truncate">{name}</h1>
      {isDM && <StatusBlip size="channel" status={status} />}
    </header>
  );
}

export default ChannelHeader;
