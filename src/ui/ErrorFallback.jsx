import { HiWrenchScrewdriver } from "react-icons/hi2";
import Logo from "../components/Logo";

function ErrorFallback({ error }) {
  return (
    <div className="flex h-dvh w-dvw items-center justify-center bg-slate-800 text-slate-50">
      <div
        className="absolute top-8 m-auto cursor-pointer p-4"
        onClick={() => (window.location.href = "/")}
      >
        <Logo />
      </div>
      <div className="flex flex-col items-center gap-4 text-center">
        <HiWrenchScrewdriver className="text-9xl text-red-400" />
        <div className="ml-4 text-3xl text-white">
          <p>Oops! An error has occured. Sorry for the inconvenience.</p>
          <p>Please report the message below to the developer.</p>
          <p className="text-base text-gray-400">{error.message}</p>
        </div>
      </div>
    </div>
  );
}

export default ErrorFallback;
