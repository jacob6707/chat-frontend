import Icon from "./Icon";

function Logo() {
  return (
    <div className="flex items-center gap-2">
      <Icon size={32} />

      <div>
        <span className="text-2xl tracking-wider">Swift</span>
        <span className="bg-gradient-to-br from-purple-100 to-purple-500 bg-clip-text text-2xl font-bold tracking-wider text-transparent">
          Chat
        </span>
      </div>
    </div>
  );
}

export default Logo;
