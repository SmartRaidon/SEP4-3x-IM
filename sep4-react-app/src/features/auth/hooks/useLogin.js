import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

export function useLogin() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleLogin = async ({ email, password }) => {
    try {
      setLoading(true);
      setMessage("");

      await login({ email, password });

      setMessage("Login successful!");

      navigate("/main");

    } catch (error) {
      setMessage("Login failed: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    handleLogin,
    loading,
    message,
  };
}