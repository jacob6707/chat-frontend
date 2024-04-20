function Tooltip({ children, text, className }) {
  return (
    <div
      className={`group/tooltip relative cursor-default text-xs font-normal ${className}`}
    >
      <span className="invisible absolute bottom-6 left-1/2 z-50 min-w-fit -translate-x-1/2 transform text-nowrap rounded-lg bg-slate-800 p-2 text-slate-50 group-hover/tooltip:visible">
        {children}
      </span>
      {text}
    </div>
  );
}

export default Tooltip;
