import { useState } from "react";
import { registerUser } from "../services/authService";
import { Link, useNavigate } from "react-router-dom";

function RegistrationPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await registerUser({
        username,
        email,
        password,
      });

      if (!response.success) {
        setMessage("Registration failed");
        return;
      }

      setMessage(response.message || "Registration successful!");

      setTimeout(() => {
        navigate("/login");
      }, 800);

    } catch (error) {
      setMessage("Registration failed");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1 className="auth-title">Register</h1>

        <form onSubmit={handleSubmit}>
          <div className="auth-form">
            <label className="auth-form-label">Username</label>
            <input
              className="auth-form-input"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

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
            Register
          </button>
        </form>

        <p className="auth-message">{message}</p>

        <p className="auth-link">Already have an account?</p>
        <Link to="/login">Login here</Link>
      </div>
    </div>
  );
}

export default RegistrationPage;