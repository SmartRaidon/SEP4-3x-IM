import { useState } from "react";
import { registerUser } from "../api/authApi";
import { Link, useNavigate } from "react-router-dom";

function RegistrationPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsSubmitting(true);
    setMessage("");

    try {
      const response = await registerUser({
        name,
        email,
        password,
      });

      if (!response.success) {
        setMessage("Registration failed: " + response.message);
        setIsSubmitting(false);
        return;
      }

      setMessage(response.message || "Registration successful!");

      setTimeout(() => {
        navigate("/login");
      }, 800);

    } catch (error) {
      setMessage("Registration failed: " + error.message);
      setIsSubmitting(false);
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
              value={name}
              onChange={(e) => setName(e.target.value)}
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

          <button type="submit" className="auth-button" disabled={isSubmitting || !name || !email || !password}>
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