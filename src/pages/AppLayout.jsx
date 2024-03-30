import Sidebar from "../components/Sidebar";

function AppLayout() {
  return (
    <div className="grid h-dvh grid-cols-[24rem_auto] bg-violet-900 text-violet-100">
      <Sidebar />
      <main></main>
    </div>
  );
}

export default AppLayout;
