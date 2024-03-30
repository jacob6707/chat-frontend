import { NavLink } from "react-router-dom";
import Logo from "./Logo";

function HomeHeader() {
  return (
    <header className="mx-auto flex w-full items-center justify-between px-4 py-3">
      <NavLink to="/">
        <Logo />
      </NavLink>
      <nav>
        <ul className="flex gap-4">
          <li>
            <NavLink
              to="/login"
              className="rounded-lg bg-purple-600 px-4 py-2 text-slate-100 transition-colors duration-300 hover:bg-purple-700"
            >
              Log in
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default HomeHeader;
