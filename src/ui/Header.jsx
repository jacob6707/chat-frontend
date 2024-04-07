function Header({ children }) {
  return (
    <header className="flex w-full flex-row items-center gap-4 border-b border-slate-950 bg-indigo-950 bg-opacity-35 text-xl [&>svg]:h-7 [&>svg]:w-7 [&>svg]:text-slate-400">
      {children}
    </header>
  );
}

export default Header;
