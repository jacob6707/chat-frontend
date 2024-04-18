import { HiMiniUserCircle } from "react-icons/hi2";

function AvatarImage({ avatarUrl, displayName, size = "small" }) {
  if (size === "small")
    return avatarUrl ? (
      <img
        src={avatarUrl}
        alt={`Avatar of ${displayName}`}
        className="m-1 h-10 w-10 self-start rounded-full object-cover"
      />
    ) : (
      <HiMiniUserCircle className="h-12 w-12 self-start text-slate-600" />
    );

  if (size === "medium")
    return avatarUrl ? (
      <img
        src={avatarUrl}
        alt={`Avatar of ${displayName}`}
        className="m-2 h-12 w-12 self-start rounded-full object-cover"
      />
    ) : (
      <HiMiniUserCircle className="h-16 w-16 self-start text-slate-600" />
    );

  return null;
}

export default AvatarImage;
