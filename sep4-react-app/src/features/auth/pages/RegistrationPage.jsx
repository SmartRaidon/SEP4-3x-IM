import { useState } from "react";
import { Link } from "react-router-dom";
import { useRegister } from "../hooks/useRegister";

function RegistrationPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { handleRegister, loading, message } = useRegister();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await handleRegister({
      name,
      email,
      password,
    });
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1 className="auth-title">Register</h1>
        <form onSubmit={handleSubmit}>
          <div className="auth-form">
            <label htmlFor="name" className="auth-form-label">Username</label>
            <input
              id="name"
              className="auth-form-input"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

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
              !name ||
              !email ||
              !password
            }
          >
            {loading
              ? "Registering..."
              : "Register"}
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