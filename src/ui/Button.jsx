import { Link } from "react-router-dom";

function Button({ className, to, buttonType, children, ...props }) {
  const baseStyles =
    "rounded-lg bg-purple-600 p-2 transition-colors duration-300 hover:bg-purple-700 focus:outline-none focus:ring focus:ring-purple-900 focus:ring-offset-2 focus:ring-offset-slate-950 disabled:opacity-50 disabled:cursor-not-allowed";

  const styles = {
    primary: baseStyles,
  };

  if (to) {
    return (
      <Link
        to={to}
        {...props}
        className={`${styles[buttonType] || baseStyles} ${className}`}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      {...props}
      className={`${styles[buttonType] || baseStyles} ${className}`}
    >
      {children}
    </button>
  );
}

export default Button;
