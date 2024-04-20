import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { socket } from "../services/socket";

function AppLayout() {
  const queryClient = useQueryClient();

  useEffect(function () {
    document.title = "SwiftChat";
  }, []);

  // connect to socket
  useEffect(
    function () {
      socket.connect();
      socket.on("connect", function () {
        queryClient.invalidateQueries({ queryKey: ["user"] });
        console.log("Connected to socket");
      });
      socket.on("error", function (err) {
        console.error(err);
      });
      socket.on("disconnect", function () {
        console.log("Disconnected from socket");
      });
      return function () {
        socket.disconnect();
        socket.off("connect");
        socket.off("error");
        socket.off("disconnect");
      };
    },
    [queryClient],
  );

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
