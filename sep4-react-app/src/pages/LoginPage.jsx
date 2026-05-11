import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await login({ email, password });

      setMessage("Login successful!");

      setTimeout(() => {
        navigate("/main");
      }, 800);

    } catch (error) {
      setMessage("Login failed");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1 className="auth-title">Login</h1>

        <form onSubmit={handleSubmit}>
          <div className="auth-form">
            <label className="auth-form-label">Email</label>
            <input
              className="auth-form-input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="auth-form">
            <label className="auth-form-label">Password</label>
            <input
              className="auth-form-input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="auth-button">
            Login
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