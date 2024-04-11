import { HiOutlineCog6Tooth, HiUsers } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import DirectMessages from "../features/authentication/DirectMessages";
import { useLogout } from "../features/authentication/useLogout";
import UserAvatar from "../features/authentication/UserAvatar";
import Logo from "./Logo";

function Sidebar() {
  const navigate = useNavigate();
  const logout = useLogout();

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
      {/* <div className="border-b border-slate-700">
        <div className="px-4 py-3">
          <h2 className="text-2xl font-semibold text-violet-100">Chats</h2>
        </div>
      </div>
      <ul className="flex max-h-full flex-col overflow-auto">
        <li
          className="grid grid-cols-[auto_1fr_auto] items-center gap-4 px-4 py-3 hover:cursor-pointer hover:bg-slate-600/25"
          onClick={() => navigate("1")}
        >
          <HiMiniUserCircle size={64} className="text-slate-600" />
          <div>
            <p className="">Username</p>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Last message</span>
              <span className="text-slate-400">2d</span>
            </div>
          </div>
        </li>
        <li
          className="grid grid-cols-[auto_1fr_auto] items-center gap-4 px-4 py-3 hover:cursor-pointer hover:bg-slate-600/25"
          onClick={() => navigate("1")}
        >
          <HiMiniUserCircle size={64} className="text-slate-600" />
          <div>
            <p className="">Username</p>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Last message</span>
              <span className="text-slate-400">2d</span>
            </div>
          </div>
        </li>
        <li
          className="grid grid-cols-[auto_1fr_auto] items-center gap-4 px-4 py-3 hover:cursor-pointer hover:bg-slate-600/25"
          onClick={() => navigate("1")}
        >
          <HiMiniUserCircle size={64} className="text-slate-600" />
          <div>
            <p className="">Username</p>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Last message</span>
              <span className="text-slate-400">2d</span>
            </div>
          </div>
        </li>
        <li
          className="grid grid-cols-[auto_1fr_auto] items-center gap-4 px-4 py-3 hover:cursor-pointer hover:bg-slate-600/25"
          onClick={() => navigate("1")}
        >
          <HiMiniUserCircle size={64} className="text-slate-600" />
          <div>
            <p className="">Username</p>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Last message</span>
              <span className="text-slate-400">2d</span>
            </div>
          </div>
        </li>
        <li
          className="grid grid-cols-[auto_1fr_auto] items-center gap-4 px-4 py-3 hover:cursor-pointer hover:bg-slate-600/25"
          onClick={() => navigate("1")}
        >
          <HiMiniUserCircle size={64} className="text-slate-600" />
          <div>
            <p className="">Username</p>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Last message</span>
              <span className="text-slate-400">2d</span>
            </div>
          </div>
        </li>
      </ul> */}
      <footer className="flex items-center gap-2 border-t border-slate-700 p-2">
        <UserAvatar />
        <button
          className="rounded-full p-2 hover:cursor-pointer hover:bg-slate-600/50"
          onClick={logout}
        >
          <HiOutlineCog6Tooth size={24} />
        </button>
      </footer>
    </aside>
  );
}

export default Sidebar;
