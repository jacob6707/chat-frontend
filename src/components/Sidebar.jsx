import {
  HiCheckCircle,
  HiMinusCircle,
  HiOutlineArrowLeftOnRectangle,
  HiOutlineCog6Tooth,
  HiPauseCircle,
  HiStopCircle,
  HiUsers,
} from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import DirectMessages from "../features/authentication/DirectMessages";
import { useLogout } from "../features/authentication/useLogout";
import UserAvatar from "../features/user/UserAvatar";
import { useUpdateStatus } from "../features/user/useUpdateStatus";
import ContextMenu from "../ui/ContextMenu";
import Logo from "./Logo";

function Sidebar() {
  const navigate = useNavigate();
  const logout = useLogout();

  const { updateStatus, isUpdatingStatus } = useUpdateStatus();

  function handleLogout() {
    logout();
  }

  return (
    <aside className="grid h-full max-h-dvh grid-rows-[auto_auto_1fr_auto] bg-slate-950">
      <header className="mx-auto px-6 py-4">
        <Logo />
      </header>
      <nav className="border-b border-slate-700 px-4 py-3">
        <ul className="flex flex-col gap-2">
          <li>
            <button
              className="flex w-full gap-4 rounded-lg px-4 py-2 text-left text-lg font-semibold tracking-wide text-slate-300 hover:bg-slate-600 hover:bg-opacity-50 hover:text-slate-100 [&>svg]:h-7 [&>svg]:w-7"
              onClick={() => navigate("friends")}
            >
              <HiUsers className="" /> <span>Friends</span>
            </button>
          </li>
        </ul>
      </nav>
      <DirectMessages />
      <footer className="flex items-center gap-2 border-t border-slate-700 p-2">
        <ContextMenu>
          <ContextMenu.Toggle id="userMenu">
            <UserAvatar />
          </ContextMenu.Toggle>
          <ContextMenu.List id="userMenu">
            <ContextMenu.Button
              icon={<HiCheckCircle className="text-green-500" />}
              onClick={() => updateStatus("Online")}
              disabled={isUpdatingStatus}
            >
              Online
            </ContextMenu.Button>
            <ContextMenu.Button
              icon={<HiPauseCircle className="text-yellow-500" />}
              onClick={() => updateStatus("Away")}
              disabled={isUpdatingStatus}
            >
              Away
            </ContextMenu.Button>
            <ContextMenu.Button
              icon={<HiMinusCircle className="text-red-500" />}
              onClick={() => updateStatus("Do Not Disturb")}
              disabled={isUpdatingStatus}
            >
              Do Not Disturb
            </ContextMenu.Button>
            <ContextMenu.Button
              icon={<HiStopCircle className="text-slate-600" />}
              onClick={() => updateStatus("Offline")}
              disabled={isUpdatingStatus}
            >
              Invisible
            </ContextMenu.Button>
            <div className="my-2 border-t border-slate-600"></div>
            <ContextMenu.Button
              icon={<HiOutlineArrowLeftOnRectangle />}
              onClick={handleLogout}
              disabled={isUpdatingStatus}
            >
              Logout
            </ContextMenu.Button>
          </ContextMenu.List>
        </ContextMenu>
        <button
          className="rounded-full p-2 hover:cursor-pointer hover:bg-slate-600/50"
          onClick={() => {}}
        >
          <HiOutlineCog6Tooth size={24} />
        </button>
      </footer>
    </aside>
  );
}

export default Sidebar;
