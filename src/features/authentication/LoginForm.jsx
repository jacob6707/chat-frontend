import { useState } from "react";
import Form from "../../ui/AuthForm";
import Button from "../../ui/Button";
import Input from "../../ui/Input";
import { useLogin } from "./useLogin";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { login, isLoggingIn } = useLogin();

  function handleSubmit(e) {
    e.preventDefault();
    if (!username || !password) return;
    login({ username, password });
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Header>
        <h1>Log in to your account</h1>
      </Form.Header>
      <Form.Row label="Username">
        <Input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          disabled={isLoggingIn}
          autoComplete="username"
        />
      </Form.Row>
      <Form.Row label="Password">
        <Input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoggingIn}
          autoComplete="current-password"
        />
      </Form.Row>
      <Form.Footer>
        <Button className="w-full" disabled={isLoggingIn}>
          {!isLoggingIn ? "Log in" : "Logging in..."}
        </Button>
      </Form.Footer>
    </Form>
  );
}

export default LoginForm;
