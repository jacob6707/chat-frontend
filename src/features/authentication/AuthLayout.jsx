import { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Logo from "../../components/Logo";

function AuthLayout({ children }) {
  const navigate = useNavigate();
  useEffect(
    function () {
      if (localStorage.getItem("token")) {
        navigate("/app");
      }
    },
    [navigate],
  );
  return (
    <div className="grid h-dvh place-items-center overflow-auto bg-slate-950 text-slate-100">
      <div className="flex w-full flex-col items-center px-8">
        <div className="mt-8">
          <NavLink to="/">
            <Logo />
          </NavLink>
        </div>
        {children}
      </div>
    </div>
  );
}

export default AuthLayout;
