import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

function AppLayout() {
  return (
    <div className="grid h-dvh grid-cols-[24rem_auto] bg-gradient-to-tr from-indigo-950 to-violet-950 text-indigo-100">
      <Sidebar />
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;
