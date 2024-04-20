import { HiMiniUserCircle } from "react-icons/hi2";

function AvatarImage({ avatarUrl, displayName, size = "small", onClick }) {
  if (size === "small")
    return avatarUrl ? (
      <img
        src={avatarUrl}
        alt={`Avatar of ${displayName}`}
        className="m-1 h-10 w-10 self-start rounded-full object-cover hover:cursor-pointer"
        {...(onClick && { onClick })}
      />
    ) : (
      <HiMiniUserCircle
        className="h-12 w-12 self-start text-slate-600 hover:cursor-pointer"
        {...(onClick && { onClick })}
      />
    );

  if (size === "medium")
    return avatarUrl ? (
      <img
        src={avatarUrl}
        alt={`Avatar of ${displayName}`}
        className="m-2 h-12 w-12 self-start rounded-full object-cover hover:cursor-pointer"
        {...(onClick && { onClick })}
      />
    ) : (
      <HiMiniUserCircle
        className="h-16 w-16 self-start text-slate-600 hover:cursor-pointer"
        {...(onClick && { onClick })}
      />
    );

  if (size === "large")
    return avatarUrl ? (
      <img
        src={avatarUrl}
        alt={`Avatar of ${displayName}`}
        className="m-2 h-20 w-20 self-start rounded-full object-cover"
        {...(onClick && { onClick })}
      />
    ) : (
      <HiMiniUserCircle
        className="h-24 w-24 self-start text-slate-600"
        {...(onClick && { onClick })}
      />
    );

  return null;
}

export default AvatarImage;
