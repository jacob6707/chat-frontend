import { NavLink } from "react-router-dom";
import Logo from "../components/Logo";

function Signup() {
  return (
    <div className="grid h-dvh place-items-center overflow-auto bg-slate-950 text-slate-100">
      <div className="flex w-full flex-col items-center px-8">
        <div className="mt-8">
          <NavLink to="/">
            <Logo />
          </NavLink>
        </div>
        <form className="mt-8 w-full rounded-2xl border-purple-900 sm:w-auto sm:border-2 sm:p-8">
          <header className="flex flex-col items-center">
            <h1 className="text-2xl font-semibold sm:text-3xl">
              Create an account
            </h1>
          </header>
          <div className="mt-7">
            <label className="mb-1 block sm:mb-2">E-mail address</label>
            <input
              type="text"
              className="w-full rounded-lg bg-slate-800 p-2 ring-purple-700 transition-colors duration-300 hover:bg-slate-900 focus:bg-slate-900 focus:outline-none focus:ring-2 sm:w-96 "
            />
          </div>
          <div className="mt-4">
            <label className="mb-1 block sm:mb-2">Username</label>
            <input
              type="text"
              className="w-full rounded-lg bg-slate-800 p-2 ring-purple-700 transition-colors duration-300 hover:bg-slate-900 focus:bg-slate-900 focus:outline-none focus:ring-2 sm:w-96 "
            />
          </div>
          <div className="mt-4">
            <label className="mb-1 block sm:mb-2">Password</label>
            <input
              type="password"
              className="w-full rounded-lg bg-slate-800 p-2 ring-purple-700 transition-colors duration-300 hover:bg-slate-900 focus:bg-slate-900 focus:outline-none focus:ring-2 sm:w-96 "
            />
          </div>
          <div>
            <button
              className="mt-6 w-full rounded-lg bg-purple-600 p-2 transition-colors duration-300 hover:bg-purple-700 focus:outline-none focus:ring focus:ring-purple-900 focus:ring-offset-2 focus:ring-offset-slate-950"
              onClick={(e) => e.preventDefault()}
            >
              Sign up
            </button>
          </div>
        </form>
        <div className="my-4">
          <span className="text-sm sm:text-base">
            Already have an account?{" "}
          </span>
          <a
            href="/login"
            className="text-sm text-blue-700 hover:text-blue-600 hover:underline sm:text-base"
          >
            Log in
          </a>
        </div>
      </div>
    </div>
  );
}

export default Signup;
