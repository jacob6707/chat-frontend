import { useEffect } from "react";
import { Link } from "react-router-dom";
import AuthLayout from "../features/authentication/AuthLayout";
import LoginForm from "../features/authentication/LoginForm";

function SignupLink() {
  return (
    <div className="my-4">
      <span className="text-sm sm:text-base">Don&apos;t have an account? </span>
      <Link
        to="/signup"
        className="text-sm text-blue-700 hover:text-blue-600 hover:underline sm:text-base"
      >
        Sign up
      </Link>
    </div>
  );
}

function Login() {
  useEffect(function () {
    document.title = "Log in - SwiftChat";
  }, []);
  return (
    <AuthLayout>
      <LoginForm />
      <SignupLink />
    </AuthLayout>
  );
}

export default Login;
