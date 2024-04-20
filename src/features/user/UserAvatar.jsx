import AvatarImage from "../../components/AvatarImage";
import { useUser } from "../authentication/useUser";
import StatusBlip from "./StatusBlip";

function UserAvatar({ onClick }) {
  const { user } = useUser();

  return (
    <button
      className="flex basis-full items-center gap-2 rounded-lg py-1 text-left hover:cursor-pointer hover:bg-slate-600 hover:bg-opacity-50"
      onClick={(e) => onClick?.(e)}
    >
      <div className="relative flex-none">
        <AvatarImage
          avatarUrl={user.avatarUrl}
          displayName={user.displayName}
          size="small"
        />

        <StatusBlip status={user.status.current} size="small" />
      </div>
      <div className="text-sm">
        <p>{user.displayName}</p>
        <p>{user.status.current ? user.status.current : "Online"}</p>
      </div>
    </button>
  );
}

export default UserAvatar;
