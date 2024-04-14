function StatusBlip({ size = "medium", status = "Offline" }) {
  const baseStyles = {
    small:
      "absolute bottom-1 right-1 block h-3 w-3 rounded-full border-2 border-slate-950",
    medium:
      "absolute bottom-2 right-2 block h-3 w-3 rounded-full border-2 border-slate-950",
    channel: "ml-2 inline-block h-3 w-3 flex-none rounded-full",
  };

  const styles = {
    Online: `${baseStyles[size]} bg-green-500`,
    Away: `${baseStyles[size]} bg-yellow-500`,
    "Do Not Disturb": `${baseStyles[size]} bg-red-500`,
    Offline: `${baseStyles[size]} bg-slate-400`,
  };

  return <span className={styles[status]} />;
}

export default StatusBlip;
