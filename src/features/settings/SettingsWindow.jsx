import { useState } from "react";
import { useUser } from "../authentication/useUser";
import AccountSettingsForm from "./AccountSettingsForm";
import ChangePasswordForm from "./ChangePasswordForm";

function SettingsWindow({ onCloseModal }) {
  const { user, isLoading } = useUser();

  const [selectedTab, setSelectedTab] = useState("account-settings");
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  if (isLoading) return null;

  return isChangingPassword ? (
    <ChangePasswordForm
      onClose={() => setIsChangingPassword(false)}
      username={user.username}
    />
  ) : (
    <div className="grid h-full grid-cols-[auto_minmax(0,1fr)]">
      <aside className="border-r border-slate-400">
        <ul className="flex flex-col gap-2 py-2 pr-2">
          <button
            className={`rounded-lg px-4 py-3 hover:bg-slate-400/75 ${selectedTab === "account-settings" ? "bg-slate-400/25" : ""}`}
            onClick={() => setSelectedTab("account-settings")}
          >
            Account Settings
          </button>
          {/* <button
            className={`rounded-lg px-4 py-3 hover:bg-slate-400/75 ${selectedTab === "app-settings" ? "bg-slate-400/25" : ""}`}
            onClick={() => setSelectedTab("app-settings")}
          >
            App Settings
          </button> */}
        </ul>
      </aside>
      <div className="max-h-[70vh] min-h-0 overflow-y-auto px-4 py-2">
        <h1 className="text-xl">Settings</h1>
        <div className="mt-4 grid w-96 min-w-96 gap-4">
          {selectedTab === "account-settings" && (
            <AccountSettingsForm
              user={user}
              changePassword={() => setIsChangingPassword(true)}
              onCloseModal={onCloseModal}
            />
          )}
          {selectedTab === "app-settings" && (
            <div>
              <h2 className="text-lg">App Settings</h2>
              <div className="mt-2 grid gap-2">
                <label>
                  <span>Theme</span>
                  <select className="w-full rounded-lg bg-slate-800 p-2 text-base text-slate-50 focus:outline-none">
                    <option>Dark</option>
                    <option>Light</option>
                  </select>
                </label>
                <label>
                  <span>Language</span>
                  <select className="w-full rounded-lg bg-slate-800 p-2 text-base text-slate-50 focus:outline-none">
                    <option>English</option>
                    <option>Spanish</option>
                  </select>
                </label>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SettingsWindow;
