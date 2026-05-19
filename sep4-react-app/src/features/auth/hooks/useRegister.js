import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export function useRegister() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleRegister = async (data) => {
    try {
      setLoading(true);
      setMessage("");

      const response = await register(data);

      if (!response.success) {
        setMessage("Registration failed");
        return;
      }

      setMessage(response.message);

      navigate("/login");

    } catch (error) {
      setMessage("Registration failed: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    handleRegister,
    loading,
    message,
  };
}