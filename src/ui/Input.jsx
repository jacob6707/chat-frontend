import { forwardRef } from "react";

const Input = forwardRef(function Input({ className, ...props }, ref) {
  return (
    <input
      ref={ref}
      {...props}
      className="w-full rounded-lg bg-slate-800 p-2 ring-purple-700 transition-colors duration-300 hover:bg-slate-900 focus:bg-slate-900 focus:outline-none focus:ring-2 disabled:cursor-not-allowed disabled:opacity-80 sm:w-96"
    />
  );
});

export default Input;
