import { useEffect } from "react";
import { Link } from "react-router-dom";
import AuthLayout from "../features/authentication/AuthLayout";
import SignupForm from "../features/authentication/SignupForm";

function LoginLink() {
  return (
    <div className="my-4">
      <span className="text-sm sm:text-base">Already have an account? </span>
      <Link
        to="/login"
        className="text-sm text-blue-700 hover:text-blue-600 hover:underline sm:text-base"
      >
        Log in
      </Link>
    </div>
  );
}

function Signup() {
  useEffect(function () {
    document.title = "Sign up - SwiftChat";
  }, []);
  return (
    <AuthLayout>
      <SignupForm />
      <LoginLink />
    </AuthLayout>
  );
}

export default Signup;
