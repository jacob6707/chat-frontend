import { useState } from "react";
import { useAddFriend } from "./useAddFriend";

function AddFriendForm() {
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const { addFriend, isAddingFriend } = useAddFriend();

  function handleSubmit(e) {
    e.preventDefault();
    addFriend(username, {
      onSuccess: () => {
        setUsername("");
        setMessage("Friend request sent successfully.");
      },
      onError: (error) => {
        setMessage(error.message);
      },
    });
    setUsername("");
  }

  return (
    <div className="px-4 py-3">
      <h1 className="mb-2 text-xl font-semibold uppercase">Add friend</h1>
      <p className="mb-4 text-sm text-slate-400">
        Enter the username of the person you want to add as a friend.
      </p>
      <form className="flex flex-row gap-4" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter username"
          label="Username"
          value={username}
          disabled={isAddingFriend}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full rounded-lg bg-slate-800 p-2 ring-purple-700 transition-colors duration-300 hover:bg-slate-900 focus:bg-slate-900 focus:outline-none focus:ring-2 disabled:cursor-not-allowed disabled:opacity-80"
        />
        <button
          className="min-w-fit rounded-lg bg-indigo-900 px-4 py-3 text-sm hover:bg-indigo-800"
          disabled={isAddingFriend}
        >
          Send friend request
        </button>
      </form>
      {message && <p className="mt-4 text-sm text-slate-400">{message}</p>}
    </div>
  );
}

export default AddFriendForm;
