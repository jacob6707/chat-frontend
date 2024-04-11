import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

function AppLayout() {
  useEffect(function () {
    document.title = "SwiftChat";
  }, []);
  return (
    <div className="grid h-dvh grid-cols-[24rem_auto] overflow-y-hidden bg-gradient-to-tr from-indigo-950 to-violet-950 text-indigo-100">
      <Sidebar />
      <main className="bg-gradient-to-tr from-indigo-950 to-violet-950">
        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;
