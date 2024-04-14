import { HiMiniUserCircle } from "react-icons/hi2";
import { useUser } from "../authentication/useUser";
import StatusBlip from "./StatusBlip";

function UserAvatar({ onClick }) {
  const { user } = useUser();

  return (
    <button
      className="flex basis-full items-center gap-2 rounded-lg py-1 text-left hover:cursor-pointer hover:bg-slate-600 hover:bg-opacity-50"
      onClick={(e) => onClick?.(e)}
    >
      <div className="relative">
        {user.avatarUrl ? (
          <img
            src={user.avatarUrl}
            alt={`Avatar of ${user.displayName}`}
            className="m-1 h-10 w-10 rounded-full object-cover"
          />
        ) : (
          <HiMiniUserCircle className="h-12 w-12 text-slate-600" />
        )}

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
