import { Link, NavLink, useNavigate } from "react-router-dom";
import Logo from "../components/Logo";
import Button from "../ui/Button";
import Form from "../ui/Form";
import Input from "../ui/Input";

function Login() {
  const navigate = useNavigate();

  return (
    <div className="grid h-dvh place-items-center overflow-auto bg-slate-950 text-slate-100">
      <div className="flex w-full flex-col items-center px-8">
        <div className="mt-8">
          <NavLink to="/">
            <Logo />
          </NavLink>
        </div>
        <Form>
          <Form.Header>
            <h1>Log in to your account</h1>
          </Form.Header>
          <Form.Row label="Username">
            <Input type="text" id="username" />
          </Form.Row>
          <Form.Row label="Password">
            <Input type="password" id="password" />
          </Form.Row>
          <Form.Footer>
            <Button className="w-full" onClick={() => navigate("/app")}>
              Log in
            </Button>
          </Form.Footer>
        </Form>
        <div className="my-4">
          <span className="text-sm sm:text-base">
            Don&apos;t have an account?{" "}
          </span>
          <Link
            to="/signup"
            className="text-sm text-blue-700 hover:text-blue-600 hover:underline sm:text-base"
          >
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
