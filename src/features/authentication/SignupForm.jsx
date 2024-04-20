import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Form from "../../ui/AuthForm";
import Button from "../../ui/Button";
import Input from "../../ui/Input";
import { useSignup } from "./useSignup";

function SignupForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const { signup, isCreatingUser } = useSignup();

  function onSubmit(data) {
    signup(data, {
      onSuccess: ({ status }) => {
        if (status === 201) navigate("/login");
      },
    });
  }

  function onError(errors) {
    console.log(errors);
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <Form.Header>
        <h1>Create an account</h1>
      </Form.Header>
      <Form.Row label="E-mail address" error={errors?.email?.message}>
        <Input
          type="email"
          id="email"
          disabled={isCreatingUser}
          {...register("email", {
            required: "This field is required",
            pattern: {
              value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
              message: "Invalid email address",
            },
          })}
        />
      </Form.Row>
      <Form.Row label="Username" error={errors?.username?.message}>
        <Input
          type="text"
          id="username"
          disabled={isCreatingUser}
          autoComplete="username"
          {...register("username", {
            required: "This field is required",
            minLength: {
              value: 3,
              message: "Username must be at least 3 characters long",
            },
            maxLength: {
              value: 20,
              message: "Username must be at most 20 characters long",
            },
            pattern: {
              value: /^[a-z0-9]+$/i,
              message: "Username must be alphanumeric",
            },
          })}
        />
      </Form.Row>
      <Form.Row label="Password" error={errors?.password?.message}>
        <Input
          type="password"
          id="password"
          disabled={isCreatingUser}
          autoComplete="current-password"
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 4,
              message: "Password must be at least 4 characters long",
            },
          })}
        />
      </Form.Row>
      <Form.Footer>
        <Button className="w-full" disabled={isCreatingUser}>
          Sign up
        </Button>
      </Form.Footer>
    </Form>
  );
}

export default SignupForm;
