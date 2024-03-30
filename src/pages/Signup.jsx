import { Link, NavLink } from "react-router-dom";
import Logo from "../components/Logo";
import SignupForm from "../features/signup/SignupForm";

function Signup() {
  return (
    <div className="grid h-dvh place-items-center overflow-auto bg-slate-950 text-slate-100">
      <div className="flex w-full flex-col items-center px-8">
        <div className="mt-8">
          <NavLink to="/">
            <Logo />
          </NavLink>
        </div>
        <SignupForm />
        <div className="my-4">
          <span className="text-sm sm:text-base">
            Already have an account?{" "}
          </span>
          <Link
            to="/login"
            className="text-sm text-blue-700 hover:text-blue-600 hover:underline sm:text-base"
          >
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Signup;
