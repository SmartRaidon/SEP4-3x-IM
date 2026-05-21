import { useState } from "react";
import { Link } from "react-router-dom";
import { useLogin } from "../hooks/useLogin";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { handleLogin, loading, message } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await handleLogin({
      email,
      password,
    });
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1 className="auth-title">Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="auth-form">
            <label htmlFor="email" className="auth-form-label">Email</label>
            <input
              id="email"
              className="auth-form-input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="auth-form">
            <label htmlFor="password" className="auth-form-label">Password</label>
            <input
              id="password"
              className="auth-form-input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="auth-button"
            disabled={
              loading ||
              !email ||
              !password
            }
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <p className="auth-message">{message}</p>
        <p className="auth-link">Don't have an account?</p>
        <Link to="/register">Register here</Link>
      </div>
    </div>
  );
}

export default LoginPage;