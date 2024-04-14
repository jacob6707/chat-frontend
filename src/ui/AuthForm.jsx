function Form({ children, ...props }) {
  return (
    <form
      className="mt-8 w-full rounded-2xl border-purple-900 sm:w-auto sm:border-2 sm:p-8"
      {...props}
    >
      {children}
    </form>
  );
}

function Header({ children }) {
  return (
    <header className="mb-6 flex flex-col items-center text-2xl font-semibold sm:text-3xl">
      {children}
    </header>
  );
}

function Row({ label, error, children }) {
  return (
    <div className="mt-4">
      {label && (
        <label htmlFor={children.props.id} className="block pb-1 sm:pb-2">
          {label}
        </label>
      )}
      {children}
      {error && (
        <p className="text-sm text-red-400" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

function Footer({ children }) {
  return <div className="mt-6">{children}</div>;
}

Form.Header = Header;
Form.Row = Row;
Form.Footer = Footer;

export default Form;
