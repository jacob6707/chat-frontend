import { HiMiniUserCircle } from "react-icons/hi2";
import { useUser } from "./useUser";

function UserAvatar() {
  const { user } = useUser();

  return (
    <div className="flex basis-full items-center gap-2 rounded-lg py-1 hover:cursor-pointer hover:bg-slate-600 hover:bg-opacity-50">
      <HiMiniUserCircle size={48} className="text-slate-600" />
      <div className="text-sm">
        <p>{user.displayName}</p>
        <p>{user.status ? user.status : "Online"}</p>
      </div>
    </div>
  );
}

export default UserAvatar;
