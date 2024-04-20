import { Navigate } from "react-router-dom";
import Icon from "../components/Icon";
import { useUser } from "../features/authentication/useUser";
import Spinner from "../ui/Spinner";

function Homepage() {
  const { user, isLoading } = useUser();

  if (isLoading)
    return (
      <div className="flex h-full items-center justify-center">
        <Spinner />
      </div>
    );

  if (user.friends.length > 0 || user.directMessages.length > 0) {
    return <Navigate to="/app/friends" />;
  }

  return (
    <div className="flex h-full items-center justify-center">
      <div className="flex flex-col items-center gap-2 text-center">
        <Icon size={128} />
        <h1 className="text-3xl font-semibold text-slate-50">
          Welcome to <span className="tracking-wider">Swift</span>
          <span className="bg-gradient-to-br from-purple-100 to-purple-500 bg-clip-text font-bold tracking-wider text-transparent">
            Chat
          </span>
        </h1>
        <p className="text-lg text-slate-400">
          Get started by adding a friend.
        </p>
      </div>
    </div>
  );
}

export default Homepage;
