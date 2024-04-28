import { HiDocumentMinus } from "react-icons/hi2";
import Logo from "../components/Logo";

function PageNotFound() {
  return (
    <div className="flex h-dvh w-dvw items-center justify-center bg-slate-800 text-slate-50">
      <div
        className="absolute top-8 m-auto cursor-pointer p-4"
        onClick={() => (window.location.href = "/")}
      >
        <Logo />
      </div>
      <div className="flex flex-col items-center gap-4 text-center">
        <HiDocumentMinus className="text-8xl text-red-400" />
        <div className="ml-4 text-3xl text-white">
          <p>Looks like this page is not available.</p>
          <p>Click on the logo to go back to the main page.</p>
        </div>
      </div>
    </div>
  );
}

export default PageNotFound;
